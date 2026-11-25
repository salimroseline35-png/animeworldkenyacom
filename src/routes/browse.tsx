import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { AnimeCardTile } from "@/components/site/anime-card";
import { AnimeLoadStatus } from "@/components/site/anime-load-status";
import { DataError } from "@/components/site/data-error";
import { SearchBox } from "@/components/site/search-box";
import { Button } from "@/components/ui/button";
import { GENRES, SORTS, browseQuery, type BrowseParams, type SortKey } from "@/lib/anilist";

function validateBrowse(search: Record<string, unknown>): BrowseParams {
  const q = typeof search["q"] === "string" && search["q"].trim() ? search["q"].trim() : undefined;
  const genre =
    typeof search["genre"] === "string" && (GENRES as readonly string[]).includes(search["genre"])
      ? search["genre"]
      : undefined;
  const sort: SortKey =
    typeof search["sort"] === "string" && search["sort"] in SORTS
      ? (search["sort"] as SortKey)
      : "trending";
  const pageNum = Number(search["page"]);
  const page = Number.isInteger(pageNum) && pageNum > 0 ? pageNum : 1;
  return { ...(q ? { q } : {}), ...(genre ? { genre } : {}), sort, page };
}

export const Route = createFileRoute("/browse")({
  validateSearch: validateBrowse,
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) => context.queryClient.ensureQueryData(browseQuery(deps)),
  head: () => ({
    meta: [
      { title: "Browse anime — Anime World Kenya" },
      {
        name: "description",
        content: "Search thousands of anime and filter by genre: action, romance, comedy, fantasy and more.",
      },
      { property: "og:title", content: "Browse anime — Anime World Kenya" },
      {
        property: "og:description",
        content: "Search thousands of anime and filter by genre on Anime World Kenya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  errorComponent: DataError,
  notFoundComponent: DataError,
  component: Browse,
});

function Browse() {
  const search = Route.useSearch();
  const { data, isFetching, isError, refetch } = useSuspenseQuery(browseQuery(search));
  const { media, pageInfo } = data.Page;

  const heading = search.q
    ? `Results for “${search.q}”`
    : search.genre
      ? `${search.genre} anime`
      : SORTS[search.sort].label;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8">
      <SearchBox key={search.q ?? ""} initial={search.q ?? ""} genre={search.genre} />

      {/* Sort tabs */}
      <div className="scrollbar-none -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1">
        {(Object.keys(SORTS) as SortKey[]).map((key) => (
          <Button
            key={key}
            asChild
            size="chip"
            variant={search.sort === key ? "chipActive" : "chip"}
            className="shrink-0"
          >
            <Link to="/browse" search={{ ...search, sort: key, page: 1 }}>
              {SORTS[key].label}
            </Link>
          </Button>
        ))}
      </div>

      {/* Genre chips */}
      <div className="scrollbar-none -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1">
        {GENRES.map((g) => {
          const active = search.genre === g;
          return (
            <Button
              key={g}
              asChild
              size="sm"
              variant={active ? "sunny" : "chip"}
              className="shrink-0 rounded-full"
            >
              <Link
                to="/browse"
                search={{ ...search, genre: active ? undefined : g, page: 1 }}
              >
                {g}
                {active && <X className="size-3.5" />}
              </Link>
            </Button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-3xl sm:text-4xl">{heading}</h1>
        {(search.q || search.genre) && (
          <Link
            to="/browse"
            search={{ sort: search.sort, page: 1 }}
            className="text-sm font-extrabold text-primary hover:underline"
          >
            Clear filters
          </Link>
        )}
      </div>

      <AnimeLoadStatus fetching={isFetching} fallback={Boolean(data.fallback)} failed={isError} retry={() => { void refetch(); }} />

      {media.length === 0 ? (
        <div className="sticker mt-8 rounded-3xl bg-paper p-10 text-center">
          <p className="font-display text-2xl">{isFetching ? "Loading anime…" : "Nothing found!"}</p>
          <p className="mt-2 text-muted-foreground">{data.fallback ? "No saved picks match these filters. Try again for live results or remove a filter." : "Try another name or remove a filter."}</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {media.map((a) => (
            <AnimeCardTile key={a.id} anime={a} />
          ))}
        </div>
      )}

      {(pageInfo.currentPage > 1 || pageInfo.hasNextPage) && (
        <div className="mt-12 flex items-center justify-center gap-4">
          {pageInfo.currentPage > 1 ? (
            <Button asChild variant="paper" size="lg">
              <Link to="/browse" search={{ ...search, page: search.page - 1 }}>
                <ChevronLeft /> Back
              </Link>
            </Button>
          ) : (
            <span />
          )}
          <span className="font-display text-lg">Page {pageInfo.currentPage}</span>
          {pageInfo.hasNextPage && (
            <Button asChild variant="pop" size="lg">
              <Link to="/browse" search={{ ...search, page: search.page + 1 }}>
                More <ChevronRight />
              </Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
