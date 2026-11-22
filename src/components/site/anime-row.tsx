import type { ReactNode } from "react";

import { AnimeCardTile } from "@/components/site/anime-card";
import type { AnimeCard } from "@/lib/anilist";

export function AnimeRow({
  title,
  kicker,
  action,
  items,
}: {
  title: string;
  kicker?: ReactNode;
  action?: ReactNode;
  items: AnimeCard[];
}) {
  return (
    <section className="mx-auto mt-14 max-w-6xl px-4">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          {kicker && <div className="mb-2">{kicker}</div>}
          <h2 className="text-2xl sm:text-3xl">{title}</h2>
        </div>
        {action}
      </div>
      <div className="scrollbar-none -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pt-1 pb-4 sm:gap-5">
        {items.map((a) => (
          <AnimeCardTile key={a.id} anime={a} className="w-36 shrink-0 snap-start sm:w-44" />
        ))}
      </div>
    </section>
  );
}
