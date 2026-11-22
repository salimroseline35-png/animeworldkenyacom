import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { displayTitle, formatLabel, type AnimeCard } from "@/lib/anilist";

export function AnimeCardTile({ anime, className }: { anime: AnimeCard; className?: string }) {
  const title = displayTitle(anime);
  const meta = [anime.format ? formatLabel[anime.format] ?? anime.format : null, anime.seasonYear]
    .filter(Boolean)
    .join(" · ");

  return (
    <Link
      to="/anime/$id"
      params={{ id: String(anime.id) }}
      className={cn("group block focus-visible:outline-none", className)}
    >
      <div className="sticker pop-hover relative aspect-[2/3] overflow-hidden rounded-2xl bg-muted">
        {anime.coverImage.large && (
          <img
            src={anime.coverImage.extraLarge ?? anime.coverImage.large}
            alt={`${title} poster`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {anime.averageScore != null && (
          <Badge variant="score" className="absolute top-2 left-2 gap-1 px-2 text-xs">
            <Star className="size-3 fill-current" />
            {anime.averageScore}%
          </Badge>
        )}
      </div>
      <h3 className="mt-3 line-clamp-2 font-sans text-sm font-extrabold leading-snug">{title}</h3>
      {meta && <p className="text-xs font-semibold text-muted-foreground">{meta}</p>}
    </Link>
  );
}

export function AnimeCardSkeleton() {
  return (
    <div>
      <div className="aspect-[2/3] animate-pulse rounded-2xl border-2 border-ink bg-muted" />
      <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-muted" />
    </div>
  );
}
