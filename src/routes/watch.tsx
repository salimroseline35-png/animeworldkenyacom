import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Play, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { WATCH_ANIME, WATCH_FILTERS, filterWatch, type WatchFilter } from "@/lib/watch";

export const Route = createFileRoute("/watch")({
  head: () => ({
    meta: [
      { title: "Watch Anime FREE - Legal | Anime World Kenya" },
      { name: "description", content: "Watch official anime trailers here, then watch full episodes legally on Crunchyroll." },
      { property: "og:title", content: "Watch Anime FREE - Legal | Anime World Kenya" },
      { property: "og:description", content: "Official YouTube trailers and legal Crunchyroll links for your favourite anime." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: WatchPage,
});

function WatchPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<WatchFilter>("All");
  const [playing, setPlaying] = useState<number | null>(null);
  const items = filterWatch(WATCH_ANIME, filter, search);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl sm:text-5xl">▶️ Watch Anime FREE - Legal</h1>
      <p className="mt-3 font-semibold text-muted-foreground">
        Watch official trailers here, then watch FULL episodes FREE on Crunchyroll!
      </p>

      <label className="sticker mt-6 flex items-center gap-2 rounded-full bg-paper px-4 py-1.5">
        <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search anime..."
          aria-label="Search anime"
          className="min-w-0 flex-1 bg-transparent py-2 text-base font-semibold outline-none placeholder:text-muted-foreground"
        />
      </label>

      <div className="mt-5 flex flex-wrap gap-2">
        {WATCH_FILTERS.map((c) => (
          <Button key={c} variant={filter === c ? "pop" : "outline"} className="rounded-full" aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {c}
          </Button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-10 font-bold">No anime found. Try another search.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <article key={a.id} className="sticker overflow-hidden rounded-2xl bg-card">
              <div className="aspect-video border-b-2 border-ink bg-muted">
                {playing === a.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${a.youtube}?autoplay=1`}
                    title={`${a.title} official trailer`}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    className="size-full"
                  />
                ) : (
                  <button type="button" onClick={() => setPlaying(a.id)} className="group relative block size-full" aria-label={`Play ${a.title} trailer`}>
                    <img src={`https://i.ytimg.com/vi/${a.youtube}/hqdefault.jpg`} alt={`${a.title} trailer`} loading="lazy" className="size-full object-cover" />
                    <span className="sticker absolute inset-0 m-auto grid size-14 place-items-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                      <Play className="size-6 fill-current" />
                    </span>
                  </button>
                )}
              </div>
              <div className="space-y-2 p-4">
                <h3 className="font-sans text-lg font-extrabold">{a.title}</h3>
                <p className="text-sm font-bold text-muted-foreground">{a.cat}</p>
                <Button variant="pop" className="w-full" onClick={() => setPlaying(a.id)}>▶️ Play Trailer</Button>
                <Button asChild variant="outline" className="w-full bg-ink text-paper hover:bg-ink/90 hover:text-paper">
                  <a href={a.link} target="_blank" rel="noopener noreferrer">
                    <span className="whitespace-normal">Watch Full Episodes FREE on Crunchyroll</span> <ExternalLink />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
