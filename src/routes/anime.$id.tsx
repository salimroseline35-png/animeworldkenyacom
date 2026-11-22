import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, Clock, Clapperboard, Heart, Star, Tv } from "lucide-react";

import { AnimeCardTile } from "@/components/site/anime-card";
import { DataError } from "@/components/site/data-error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { animeQuery, cleanDescription, displayTitle, formatLabel } from "@/lib/anilist";

export const Route = createFileRoute("/anime/$id")({
  loader: async ({ context, params }) => {
    const id = Number(params.id);
    if (!Number.isInteger(id) || id <= 0) throw notFound();
    const anime = await context.queryClient.ensureQueryData(animeQuery(id));
    if (!anime) throw notFound();
    return anime;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Anime — Anime World Kenya" }] };
    const title = `${displayTitle(loaderData)} — Anime World Kenya`;
    const desc =
      cleanDescription(loaderData.description)[0]?.slice(0, 155) ??
      `Everything about ${displayTitle(loaderData)}.`;
    const image = loaderData.bannerImage ?? loaderData.coverImage.extraLarge;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "video.tv_show" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
    };
  },
  errorComponent: DataError,
  notFoundComponent: () => (
    <div className="mx-auto mt-20 max-w-md px-4 text-center">
      <h1 className="text-3xl">This anime ran away</h1>
      <p className="mt-2 text-muted-foreground">We couldn't find that title.</p>
      <Button asChild variant="pop" size="xl" className="mt-6">
        <Link to="/browse" search={{ sort: "trending", page: 1 }}>
          Browse anime
        </Link>
      </Button>
    </div>
  ),
  component: AnimePage,
});

const statusLabel: Record<string, string> = {
  RELEASING: "Airing now",
  FINISHED: "Finished",
  NOT_YET_RELEASED: "Coming soon",
  CANCELLED: "Cancelled",
  HIATUS: "On break",
};

function AnimePage() {
  const { id } = Route.useParams();
  const { data } = useSuspenseQuery(animeQuery(Number(id)));
  if (!data) return null;
  const a = data;
  const title = displayTitle(a);
  const paragraphs = cleanDescription(a.description);
  const recs = a.recommendations.nodes
    .map((n) => n.mediaRecommendation)
    .filter((m): m is NonNullable<typeof m> => m != null);

  const facts = [
    a.format && { icon: Tv, label: "Type", value: formatLabel[a.format] ?? a.format },
    a.episodes && { icon: Clapperboard, label: "Episodes", value: String(a.episodes) },
    a.duration && { icon: Clock, label: "Length", value: `${a.duration} min` },
    a.seasonYear && { icon: CalendarDays, label: "Year", value: String(a.seasonYear) },
    a.popularity && {
      icon: Heart,
      label: "Fans",
      value: new Intl.NumberFormat("en", { notation: "compact" }).format(a.popularity),
    },
  ].filter(Boolean) as { icon: typeof Tv; label: string; value: string }[];

  return (
    <article>
      {/* Banner */}
      <div className="relative h-48 overflow-hidden border-b-2 border-ink bg-ink sm:h-72">
        {(a.bannerImage ?? a.coverImage.extraLarge) && (
          <img
            src={a.bannerImage ?? a.coverImage.extraLarge ?? ""}
            alt=""
            className="size-full object-cover opacity-90"
          />
        )}
        <div className="bg-sunset-fade absolute inset-0" />
        <div className="absolute top-4 left-0 w-full">
          <div className="mx-auto max-w-6xl px-4">
            <Button asChild variant="paper" size="sm">
              <Link to="/browse" search={{ sort: "trending", page: 1 }}>
                <ArrowLeft /> Browse
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="-mt-24 flex flex-col gap-6 sm:-mt-32 sm:flex-row sm:gap-10">
          {/* Poster */}
          <div className="relative w-40 shrink-0 sm:w-60">
            {a.coverImage.extraLarge && (
              <img
                src={a.coverImage.extraLarge}
                alt={`${title} poster`}
                className="sticker aspect-[2/3] w-full -rotate-2 rounded-2xl object-cover"
              />
            )}
            {a.averageScore != null && (
              <Badge variant="score" className="absolute -right-4 -bottom-3 rotate-3 gap-1 px-3 py-1 text-base">
                <Star className="size-4 fill-current" /> {a.averageScore}%
              </Badge>
            )}
          </div>

          {/* Title + facts */}
          <div className="min-w-0 flex-1 sm:pt-36">
            <div className="flex flex-wrap gap-2">
              {a.status && (
                <Badge variant={a.status === "RELEASING" ? "kenya" : "tag"}>
                  {statusLabel[a.status] ?? a.status}
                </Badge>
              )}
              {a.studios.nodes[0] && <Badge variant="tag">{a.studios.nodes[0].name}</Badge>}
            </div>
            <h1 className="mt-3 text-3xl leading-tight sm:text-5xl">{title}</h1>
            {a.title.romaji && a.title.romaji !== title && (
              <p className="mt-1 font-bold text-muted-foreground">{a.title.romaji}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {a.genres.map((g) => (
                <Button key={g} asChild variant="chip" size="sm">
                  <Link to="/browse" search={{ genre: g, sort: "popular", page: 1 }}>
                    {g}
                  </Link>
                </Button>
              ))}
            </div>

            {a.nextAiringEpisode && (
              <p className="mt-4 inline-flex rounded-full border-2 border-ink bg-secondary px-4 py-1.5 text-sm font-extrabold">
                Episode {a.nextAiringEpisode.episode} drops{" "}
                {new Date(a.nextAiringEpisode.airingAt * 1000).toLocaleDateString("en-KE", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </p>
            )}
          </div>
        </div>

        {facts.length > 0 && (
          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {facts.map((f) => (
              <div key={f.label} className="sticker rounded-2xl bg-paper p-4">
                <dt className="flex items-center gap-1.5 text-xs font-extrabold uppercase text-muted-foreground">
                  <f.icon className="size-3.5" /> {f.label}
                </dt>
                <dd className="mt-1 font-display text-xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          <section>
            <h2 className="text-2xl">The story</h2>
            <div className="mt-3 space-y-3 text-base leading-relaxed">
              {paragraphs.length ? (
                paragraphs.map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <p className="text-muted-foreground">No story summary yet.</p>
              )}
            </div>
          </section>

          {a.trailer?.site === "youtube" && (
            <section>
              <h2 className="text-2xl">Trailer</h2>
              <div className="sticker mt-3 aspect-video overflow-hidden rounded-2xl bg-ink">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${a.trailer.id}`}
                  title={`${title} trailer`}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="size-full"
                />
              </div>
            </section>
          )}
        </div>

        {a.characters.edges.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl">Meet the characters</h2>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {a.characters.edges.map((c) => (
                <li key={c.node.id} className="sticker flex items-center gap-3 rounded-2xl bg-paper p-2">
                  {c.node.image.large && (
                    <img
                      src={c.node.image.large}
                      alt={c.node.name.full}
                      loading="lazy"
                      className="size-14 shrink-0 rounded-xl border-2 border-ink object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-extrabold leading-tight">{c.node.name.full}</p>
                    <p className="text-xs font-semibold capitalize text-muted-foreground">
                      {c.role.toLowerCase()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {recs.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl">If you like this, try…</h2>
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
              {recs.map((r) => (
                <AnimeCardTile key={r.id} anime={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
