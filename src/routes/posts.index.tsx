import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Newspaper, Play } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatPostDate, postExcerpt, posts } from "@/lib/posts";

export const Route = createFileRoute("/posts/")({
  head: () => ({
    meta: [
      { title: "Blog — Latest Posts from Kenya | Anime World Kenya" },
      {
        name: "description",
        content:
          "Top 5 lists, anime fights, movies and moments — fun anime posts made for Kenyan fans, with videos to watch.",
      },
      { property: "og:title", content: "Blog — Latest Posts from Kenya | Anime World Kenya" },
      {
        property: "og:description",
        content: "Fun anime posts made for Kenyan fans, with videos to watch.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-6 pb-10 sm:pt-10">
      <Badge variant="kenya" className="mb-2 gap-1">
        <Newspaper className="size-3.5" /> Blog
      </Badge>
      <h1 className="animate-float-up text-3xl sm:text-5xl">
        Latest Posts from <span className="text-kenya">Kenya</span>
      </h1>
      <p className="mt-3 max-w-xl text-base font-bold text-muted-foreground sm:text-lg">
        Top 5 lists, epic fights and anime moments we love — with videos to watch. Karibu!
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            to="/posts/$slug"
            params={{ slug: p.slug }}
            className="sticker pop-hover group flex flex-col overflow-hidden rounded-3xl bg-paper"
          >
            <div className="relative overflow-hidden border-b-2 border-ink">
              <img
                src={p.image}
                alt={p.imageAlt}
                loading="lazy"
                className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {p.videoUrl && (
                <Badge variant="score" className="absolute top-3 left-3 -rotate-3 gap-1 px-3 py-1 text-sm">
                  <Play className="size-3.5" /> Video
                </Badge>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <p className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                <CalendarDays className="size-3.5" />
                {formatPostDate(p.date)}
              </p>
              <h2 className="text-xl leading-tight group-hover:text-primary">{p.title}</h2>
              <p className="line-clamp-3 text-sm font-semibold text-muted-foreground">{postExcerpt(p)}</p>
              <span className="mt-auto inline-flex items-center gap-1 pt-1 text-sm font-extrabold text-primary">
                Read More <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
