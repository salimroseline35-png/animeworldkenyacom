import { useMutation } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { RotateCcw, Sparkles, Star, Wand2 } from "lucide-react";
import { useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GENRES, displayTitle, resolveTitles, type AnimeCard } from "@/lib/anilist";
import { MATCH_MAX_CHARS, MOODS, buildMatchPrompt } from "@/lib/matchmaker";
import { getAnimeMatches } from "@/lib/matchmaker.functions";

export const Route = createFileRoute("/match")({
  head: () => ({
    meta: [
      { title: "AI Anime Matchmaker — Anime World Kenya" },
      {
        name: "description",
        content:
          "Tell us your mood, favourite genres or shows you loved and get 6 anime picks with a quick reason for each.",
      },
      { property: "og:title", content: "AI Anime Matchmaker — Anime World Kenya" },
      {
        property: "og:description",
        content: "Describe your vibe and get personal anime picks in seconds.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MatchPage,
});

type Match = { anime: AnimeCard; why: string };
type Outcome = { intro: string; matches: Match[] };

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function MatchPage() {
  const [moods, setMoods] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [text, setText] = useState("");
  const askMatches = useServerFn(getAnimeMatches);
  const resultsRef = useRef<HTMLElement>(null);
  const showResults = () =>
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));

  const match = useMutation({
    onMutate: showResults,
    mutationFn: async (prompt: string): Promise<Outcome> => {
      const result = await askMatches({ data: { prompt } });
      if (!result.ok) throw new Error(result.error);
      const found = await resolveTitles(result.picks.map((p) => p.title));
      const matches = result.picks.flatMap((p, i) => {
        const anime = found[i];
        return anime ? [{ anime, why: p.why }] : [];
      });
      if (!matches.length) throw new Error("We couldn't find those shows. Try again with a bit more detail.");
      return { intro: result.intro, matches };
    },
  });

  const prompt = buildMatchPrompt(moods, genres, text);
  const canSubmit = prompt.trim().length >= 3 && !match.isPending;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8">
      <header className="text-center">
        <Badge variant="kenya" className="-rotate-2 gap-1 px-3 py-1 text-sm">
          <Sparkles className="size-3.5" /> AI powered
        </Badge>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
          Anime <span className="text-primary">Matchmaker</span>
        </h1>
        <p className="mx-auto mt-2 max-w-md font-semibold text-muted-foreground">
          Tell us how you feel or what you loved, and we'll find your next favourite anime.
        </p>
      </header>

      <form
        className="sticker mx-auto mt-8 max-w-3xl rounded-3xl bg-paper p-5 sm:p-7"
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) match.mutate(prompt);
        }}
      >
        <fieldset>
          <legend className="font-display text-lg">1. What's the mood?</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {MOODS.map((m) => (
              <Button
                key={m}
                type="button"
                size="chip"
                variant={moods.includes(m) ? "chipActive" : "chip"}
                aria-pressed={moods.includes(m)}
                onClick={() => setMoods((v) => toggle(v, m))}
              >
                {m}
              </Button>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-6">
          <legend className="font-display text-lg">2. Favourite genres</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {GENRES.map((g) => (
              <Button
                key={g}
                type="button"
                size="sm"
                variant={genres.includes(g) ? "sunny" : "chip"}
                className="rounded-full"
                aria-pressed={genres.includes(g)}
                onClick={() => setGenres((v) => toggle(v, g))}
              >
                {g}
              </Button>
            ))}
          </div>
        </fieldset>

        <label className="mt-6 block">
          <span className="font-display text-lg">3. Shows you loved (or anything else)</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 600))}
            rows={3}
            placeholder="e.g. I loved Haikyuu and Spy x Family, want something funny with a found-family vibe"
            className="mt-3 w-full resize-none rounded-2xl border-2 border-ink bg-background p-4 text-base font-semibold outline-none placeholder:text-muted-foreground focus:bg-paper focus:shadow-pop-sm"
          />
        </label>

        <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs font-semibold text-muted-foreground">
            Pick a mood, a genre, or write something — any one works.
          </p>
          <Button type="submit" variant="pop" size="xl" disabled={!canSubmit || prompt.length > MATCH_MAX_CHARS}>
            <Wand2 className="size-5" />
            {match.isPending ? "Matching…" : "Find my anime"}
          </Button>
        </div>
      </form>

      <section ref={resultsRef} aria-live="polite" className="mt-12 scroll-mt-24">
        {match.isPending && <MatchLoading />}

        {match.isError && !match.isPending && (
          <div className="sticker mx-auto max-w-xl rounded-3xl bg-secondary p-6 text-center">
            <p className="font-display text-xl">Hmm, no match yet</p>
            <p className="mt-1 font-semibold">{match.error.message}</p>
            <Button variant="paper" className="mt-4" onClick={() => match.mutate(prompt)} disabled={!canSubmit}>
              <RotateCcw /> Try again
            </Button>
          </div>
        )}

        {match.isSuccess && !match.isPending && (
          <>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl">Your matches</h2>
              {match.data.intro && <p className="mt-2 text-lg font-bold text-muted-foreground">{match.data.intro}</p>}
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {match.data.matches.map(({ anime, why }, i) => (
                <li key={anime.id} className="animate-float-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <MatchCard anime={anime} why={why} />
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <Button variant="sunny" size="lg" onClick={() => match.mutate(prompt)} disabled={!canSubmit}>
                <RotateCcw /> Show me different picks
              </Button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function MatchCard({ anime, why }: { anime: AnimeCard; why: string }) {
  const title = displayTitle(anime);
  return (
    <Link
      to="/anime/$id"
      params={{ id: String(anime.id) }}
      className="sticker pop-hover flex h-full gap-4 rounded-3xl bg-paper p-3"
    >
      {anime.coverImage.large && (
        <img
          src={anime.coverImage.large}
          alt={`${title} poster`}
          loading="lazy"
          className="aspect-[2/3] w-24 shrink-0 rounded-2xl border-2 border-ink object-cover"
        />
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="line-clamp-2 font-extrabold leading-snug">{title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          {anime.averageScore != null && (
            <Badge variant="score" className="gap-1 px-2 text-xs">
              <Star className="size-3 fill-current" /> {anime.averageScore}%
            </Badge>
          )}
          {anime.genres.slice(0, 2).map((g) => (
            <span key={g} className="text-xs font-bold text-muted-foreground">
              {g}
            </span>
          ))}
        </div>
        <p className="mt-2 rounded-2xl border-2 border-ink bg-background px-3 py-2 text-sm font-semibold leading-snug">
          {why}
        </p>
      </div>
    </Link>
  );
}

function MatchLoading() {
  return (
    <div className="text-center">
      <div className="sticker mx-auto grid size-20 animate-wiggle place-items-center rounded-3xl bg-secondary">
        <Sparkles className="size-9" />
      </div>
      <p className="mt-4 font-display text-xl">Matching your vibe…</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex h-40 animate-pulse gap-4 rounded-3xl border-2 border-ink bg-muted p-3">
            <div className="w-24 rounded-2xl bg-background" />
            <div className="flex-1 space-y-2 pt-2">
              <div className="h-4 w-3/4 rounded bg-background" />
              <div className="h-16 rounded-2xl bg-background" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
