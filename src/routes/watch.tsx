import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { displayTitle, watchQuery, type WatchFilter } from "@/lib/anilist";

const FILTERS: { key: WatchFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "Action", label: "Action" },
  { key: "Romance", label: "Romance" },
  { key: "Comedy", label: "Comedy" },
  { key: "trending", label: "Trending" },
];

export const Route = createFileRoute("/watch")({
  head: () => ({
    meta: [
      { title: "Watch Anime FREE - Legal | Anime World Kenya" },
      { name: "description", content: "Watch official anime trailers free on YouTube, then stream full episodes legally on Crunchyroll." },
      { property: "og:title", content: "Watch Anime FREE - Legal | Anime World Kenya" },
      { property: "og:description", content: "Official YouTube trailers and legal Crunchyroll links for your favourite anime." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WatchPage,
});

function WatchPage() {
  const [filter, setFilter] = useState<WatchFilter>("all");
  const [input, setInput] = useState("");
  const [q, setQ] = useState("");
  const { data, isFetching } = useQuery(watchQuery(filter, q));
  const items = data ?? [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl sm:text-5xl">Watch Anime FREE - Legal</h1>
      <p className="mt-3 font-semibold text-muted-foreground">
        Official YouTube trailers only — then watch full episodes legally on Crunchyroll.
      </p>

      <form
        role="search"
        className="sticker mt-6 flex items-center gap-2 rounded-full bg-paper p-1.5 pl-4"
        onSubmit={(e) => {
          e.preventDefault();
          setQ(input.trim());
        }}
      >
        <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search anime to watch…"
          aria-label="Search anime to watch"
          className="min-w-0 flex-1 bg-transparent py-2 text-base font-semibold outline-none placeholder:text-muted-foreground"
        />
        <Button type="submit" variant="pop" className="h-10 px-5">Search</Button>
      </form>

      <div className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Button
            key={f.key}
            variant={filter === f.key ? "pop" : "outline"}
            className="rounded-full"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {isFetching && <p className="mt-4 text-sm font-bold text-muted-foreground">Loading more anime…</p>}

      {items.length === 0 && !isFetching ? (
        <p className="mt-10 font-bold">No trailers found. Try another search or <Link to="/watch" className="underline" onClick={() => { setQ(""); setInput(""); setFilter("all"); }}>show all</Link>.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => {
            const title = displayTitle(a);
            return (
              <article key={a.id} className="sticker overflow-hidden rounded-2xl bg-card">
                <div className="flex items-center gap-3 p-3">
                  {a.coverImage.large && (
                    <img src={a.coverImage.large} alt={`${title} cover`} loading="lazy" className="h-20 w-14 rounded-lg border-2 border-ink object-cover" />
                  )}
                  <Link to="/anime/$id" params={{ id: String(a.id) }} className="line-clamp-2 font-sans text-base font-extrabold hover:underline">
                    {title}
                  </Link>
                </div>
                <div className="aspect-video border-y-2 border-ink bg-muted">
                  <iframe
                    src={`https://www.youtube.com/embed/${a.trailer?.id}`}
                    title={`${title} official trailer`}
                    loading="lazy"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    className="size-full"
                  />
                </div>
                <div className="p-3">
                  <Button asChild variant="pop" className="w-full">
                    <a href={`https://www.crunchyroll.com/search?q=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer">
                      <span className="whitespace-normal">Watch Full Episodes on Crunchyroll FREE</span> <ExternalLink className="size-4" />
                    </a>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
