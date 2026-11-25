import snapshot from "./anime-fallback.json";
import type { AnimeDetail, BrowseParams } from "./anilist";

// Real AniList metadata saved on 2026-11-25; never presented as live rankings.
export const POPULAR_ANIME: AnimeDetail[] = snapshot;

export function fallbackHome() {
  return {
    fallback: true,
    trending: { media: POPULAR_ANIME },
    season: { media: POPULAR_ANIME },
    top: { media: [...POPULAR_ANIME].sort((a, b) => (b.averageScore ?? 0) - (a.averageScore ?? 0)) },
  };
}

export function fallbackBrowse(p: BrowseParams) {
  const media = POPULAR_ANIME.filter((a) => {
    const title = `${a.title.english ?? ""} ${a.title.romaji ?? ""}`.toLowerCase();
    return (!p.q || title.includes(p.q.toLowerCase())) &&
      (!p.genre || a.genres.includes(p.genre)) &&
      (p.sort !== "airing" || a.status === "RELEASING");
  });
  if (p.sort === "top") media.sort((a, b) => (b.averageScore ?? 0) - (a.averageScore ?? 0));
  return { fallback: true, Page: { media, pageInfo: { currentPage: 1, hasNextPage: false } } };
}