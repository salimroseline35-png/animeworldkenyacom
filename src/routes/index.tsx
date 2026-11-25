import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Flame, Sparkles, Trophy, Wand2 } from "lucide-react";

import heroImage from "@/assets/hero-anime-nairobi.jpg";
import { AnimeRow } from "@/components/site/anime-row";
import { AnimeLoadStatus } from "@/components/site/anime-load-status";
import { DataError } from "@/components/site/data-error";
import { LatestPosts } from "@/components/site/latest-posts";
import { SearchBox } from "@/components/site/search-box";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GENRES, displayTitle, getSeason, homeQuery } from "@/lib/anilist";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Anime World Kenya — Find your next favourite anime" },
      {
        name: "description",
        content:
          "Trending anime, this season's hits and all-time favourites in one easy, fun place. Karibu to Anime World Kenya!",
      },
      { property: "og:title", content: "Anime World Kenya — Find your next favourite anime" },
      {
        property: "og:description",
        content: "Trending anime, this season's hits and all-time favourites in one easy, fun place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(homeQuery()),
  errorComponent: DataError,
  notFoundComponent: DataError,
  component: Home,
});

const seasonName = { WINTER: "Winter", SPRING: "Spring", SUMMER: "Summer", FALL: "Fall" } as const;

function Home() {
  const { data, isFetching, isError, refetch } = useSuspenseQuery(homeQuery());
  const { season, year } = getSeason(new Date());

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-6 sm:pt-10">
        <div className="sticker relative overflow-hidden rounded-3xl bg-ink">
          <img
            src={heroImage}
            alt="Three happy anime fans cheering on a Nairobi rooftop at sunset"
            className="h-[420px] w-full object-cover object-[60%_center] sm:h-[480px]"
          />
          <div className="bg-sunset-fade absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-10">
            <Badge variant="kenya" className="mb-3 -rotate-2 px-3 py-1 text-sm">
              Karibu, otaku!
            </Badge>
            <h1 className="animate-float-up max-w-2xl text-4xl leading-[1.05] text-paper sm:text-6xl">
              Anime World <span className="text-secondary">Kenya</span>
            </h1>
            <p className="mt-3 max-w-lg text-base font-bold text-paper/90 sm:text-lg">
              Find your next favourite anime — what's hot, what's new and what everyone loves.
            </p>
            <SearchBox className="mt-5 max-w-xl" />
          </div>
        </div>
      </section>

      {/* AI matchmaker promo */}
      <section className="mx-auto mt-8 max-w-6xl px-4">
        <Link
          to="/match"
          className="sticker pop-hover flex flex-col gap-4 rounded-3xl bg-secondary p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div className="flex items-center gap-4">
            <span className="sticker grid size-14 shrink-0 -rotate-6 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Wand2 className="size-7" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl">Not sure what to watch?</h2>
              <p className="font-bold">Tell our AI Matchmaker your mood and get 6 picks made for you.</p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 self-start rounded-full border-2 border-ink bg-paper px-4 py-2 font-extrabold sm:self-auto">
            Try it <ArrowRight className="size-4" />
          </span>
        </Link>
      </section>

      <LatestPosts />

      {/* Genres */}
      <section className="mx-auto mt-10 max-w-6xl px-4">
        <h2 className="mb-4 text-xl sm:text-2xl">Pick a vibe</h2>
        <div className="flex flex-wrap gap-2">
          {GENRES.map((g, i) => (
            <Button key={g} asChild variant="chip" size="chip">
              <Link
                to="/browse"
                search={{ genre: g, sort: "popular", page: 1 }}
                className={i % 3 === 0 ? "rotate-1" : i % 3 === 1 ? "-rotate-1" : ""}
              >
                {g}
              </Link>
            </Button>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <AnimeLoadStatus fetching={isFetching} fallback={Boolean(data.fallback)} failed={isError} retry={() => { void refetch(); }} />
      </div>
      <AnimeRow
        title="Trending right now"
        kicker={
          <Badge variant="score" className="gap-1">
            <Flame className="size-3.5" /> Hot
          </Badge>
        }
        action={<SeeAll sort="trending" />}
        items={data.trending.media}
      />

      <AnimeRow
        title={`${seasonName[season]} ${year} season`}
        kicker={
          <Badge variant="kenya" className="gap-1">
            <Sparkles className="size-3.5" /> Fresh
          </Badge>
        }
        action={<SeeAll sort="airing" />}
        items={data.season.media}
      />

      {/* Top rated ranking */}
      <section className="mx-auto mt-14 max-w-6xl px-4">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <Badge variant="score" className="mb-2 gap-1">
              <Trophy className="size-3.5" /> Hall of fame
            </Badge>
            <h2 className="text-2xl sm:text-3xl">Top 10 of all time</h2>
          </div>
          <SeeAll sort="top" />
        </div>
        <ol className="grid gap-3 sm:grid-cols-2">
          {data.top.media.map((a, i) => (
            <li key={a.id}>
              <Link
                to="/anime/$id"
                params={{ id: String(a.id) }}
                className="sticker pop-hover flex items-center gap-4 rounded-2xl bg-paper p-3"
              >
                <span className="text-outline w-10 shrink-0 text-center font-display text-3xl text-secondary">
                  {i + 1}
                </span>
                {a.coverImage.large && (
                  <img
                    src={a.coverImage.large}
                    alt=""
                    loading="lazy"
                    className="h-20 w-14 shrink-0 rounded-lg border-2 border-ink object-cover"
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 font-extrabold leading-snug">{displayTitle(a)}</p>
                  <p className="mt-1 truncate text-xs font-semibold text-muted-foreground">
                    {a.genres.slice(0, 3).join(" · ")}
                  </p>
                </div>
                {a.averageScore != null && (
                  <Badge variant="score" className="shrink-0">
                    {a.averageScore}%
                  </Badge>
                )}
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

function SeeAll({ sort }: { sort: "trending" | "airing" | "top" }) {
  return (
    <Link
      to="/browse"
      search={{ sort, page: 1 }}
      className="inline-flex shrink-0 items-center gap-1 text-sm font-extrabold text-primary hover:underline"
    >
      See all <ArrowRight className="size-4" />
    </Link>
  );
}
