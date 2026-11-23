import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPostDate, latestPosts, postExcerpt } from "@/lib/posts";

export function LatestPosts() {
  const [featured, ...rest] = latestPosts(3);
  if (!featured) return null;

  return (
    <section className="mx-auto mt-14 max-w-6xl px-4" aria-labelledby="latest-posts-title">
      <div className="mb-5">
        <Badge variant="kenya" className="mb-2 gap-1">
          <Newspaper className="size-3.5" /> Blog
        </Badge>
        <h2 id="latest-posts-title" className="text-2xl sm:text-3xl">
          Latest Posts from <span className="text-kenya">Kenya</span>
        </h2>
      </div>

      <article className="sticker group grid overflow-hidden rounded-3xl bg-paper lg:grid-cols-[1.35fr_1fr]">
        <Link
          to="/posts/$slug"
          params={{ slug: featured.slug }}
          className="relative block overflow-hidden border-b-2 border-ink lg:border-r-2 lg:border-b-0"
          tabIndex={-1}
          aria-hidden
        >
          <img
            src={featured.image}
            alt=""
            loading="lazy"
            className="aspect-[16/9] h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge variant="score" className="absolute top-4 left-4 -rotate-3 px-3 py-1 text-sm">
            New post!
          </Badge>
        </Link>

        <div className="flex flex-col justify-center gap-4 p-5 sm:p-8">
          <p className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground">
            <CalendarDays className="size-4" />
            {formatPostDate(featured.date)}
          </p>
          <h3 className="text-2xl leading-tight sm:text-4xl">
            <Link to="/posts/$slug" params={{ slug: featured.slug }} className="hover:text-primary">
              {featured.title}
            </Link>
          </h3>
          <p className="line-clamp-4 text-base font-semibold text-muted-foreground">{postExcerpt(featured)}</p>
          <Button asChild variant="pop" size="xl" className="self-start">
            <Link to="/posts/$slug" params={{ slug: featured.slug }}>
              Read More <ArrowRight />
            </Link>
          </Button>
        </div>
      </article>

      {rest.length > 0 && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {rest.map((p) => (
            <Link
              key={p.slug}
              to="/posts/$slug"
              params={{ slug: p.slug }}
              className="sticker pop-hover flex items-center gap-4 rounded-2xl bg-paper p-3"
            >
              <img
                src={p.image}
                alt=""
                loading="lazy"
                className="h-20 w-32 shrink-0 rounded-xl border-2 border-ink object-cover"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-muted-foreground">{formatPostDate(p.date)}</p>
                <p className="line-clamp-2 font-extrabold leading-snug">{p.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
