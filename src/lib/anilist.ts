import { queryOptions } from "@tanstack/react-query";
import { fallbackBrowse, fallbackHome, POPULAR_ANIME } from "./anime-fallback";

const ENDPOINT = "https://graphql.anilist.co";

export type AnimeCard = {
  id: number;
  title: { romaji: string | null; english: string | null };
  coverImage: { extraLarge: string | null; large: string | null; color: string | null };
  bannerImage: string | null;
  averageScore: number | null;
  genres: string[];
  episodes: number | null;
  seasonYear: number | null;
  format: string | null;
  status: string | null;
};

export type AnimeDetail = AnimeCard & {
  description: string | null;
  duration: number | null;
  popularity: number | null;
  studios: { nodes: { name: string }[] };
  trailer: { id: string; site: string } | null;
  nextAiringEpisode: { episode: number; airingAt: number } | null;
  characters: {
    edges: { role: string; node: { id: number; name: { full: string }; image: { large: string | null } } }[];
  };
  recommendations: { nodes: { mediaRecommendation: AnimeCard | null }[] };
};

const CARD_FIELDS = `
  id
  title { romaji english }
  coverImage { extraLarge large color }
  bannerImage
  averageScore
  genres
  episodes
  seasonYear
  format
  status
`;

export const ANIME_TIMEOUT_MS = 12_000;
export const ANIME_RETRIES = 2;
const requestOptions = {
  retry: ANIME_RETRIES,
  retryDelay: (attempt: number) => Math.min(1000 * 2 ** attempt, 4000),
  refetchOnWindowFocus: false,
};

async function anilist<T>(query: string, variables: Record<string, unknown> = {}, signal?: AbortSignal, allowPartial = false): Promise<T> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) abort();
  signal?.addEventListener("abort", abort, { once: true });
  const timeout = setTimeout(abort, ANIME_TIMEOUT_MS);
  try {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    signal: controller.signal,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if ((!res.ok && !allowPartial) || !json.data) {
    throw new Error(json.errors?.[0]?.message ?? `Anime data unavailable (${res.status})`);
  }
  return json.data;
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", abort);
  }
}

export type Season = "WINTER" | "SPRING" | "SUMMER" | "FALL";

/** Anime seasons: Winter = Jan–Mar, Spring = Apr–Jun, Summer = Jul–Sep, Fall = Oct–Dec. */
export function getSeason(date: Date): { season: Season; year: number } {
  const m = date.getUTCMonth();
  const season: Season = m < 3 ? "WINTER" : m < 6 ? "SPRING" : m < 9 ? "SUMMER" : "FALL";
  return { season, year: date.getUTCFullYear() };
}

export function displayTitle(a: Pick<AnimeCard, "title">): string {
  return a.title.english ?? a.title.romaji ?? "Untitled";
}

/** AniList descriptions contain light HTML (<br>, <i>, <b>); turn them into plain paragraphs. */
export function cleanDescription(html: string | null): string[] {
  if (!html) return [];
  const text = html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&mdash;/g, "—");
  return text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export const formatLabel: Record<string, string> = {
  TV: "TV",
  TV_SHORT: "TV Short",
  MOVIE: "Movie",
  SPECIAL: "Special",
  OVA: "OVA",
  ONA: "ONA",
  MUSIC: "Music",
};

export const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Romance",
  "Slice of Life",
  "Sports",
  "Sci-Fi",
  "Mystery",
  "Supernatural",
  "Horror",
  "Mecha",
  "Music",
  "Psychological",
  "Thriller",
] as const;

export const SORTS = {
  trending: { label: "Trending", value: "TRENDING_DESC" },
  popular: { label: "Most popular", value: "POPULARITY_DESC" },
  top: { label: "Top rated", value: "SCORE_DESC" },
  airing: { label: "Airing now", value: "POPULARITY_DESC" },
} as const;
export type SortKey = keyof typeof SORTS;

type HomeData = {
  fallback?: boolean;
  trending: { media: AnimeCard[] };
  season: { media: AnimeCard[] };
  top: { media: AnimeCard[] };
};

export const homeQuery = () => {
  const { season, year } = getSeason(new Date());
  return queryOptions({
    ...requestOptions,
    queryKey: ["home", season, year],
    initialData: fallbackHome,
    initialDataUpdatedAt: 0,
    staleTime: 5 * 60_000,
    queryFn: ({ signal }) =>
      anilist<HomeData>(
        `query ($season: MediaSeason, $year: Int) {
          trending: Page(perPage: 12) { media(type: ANIME, sort: TRENDING_DESC, isAdult: false) { ${CARD_FIELDS} } }
          season: Page(perPage: 12) { media(type: ANIME, season: $season, seasonYear: $year, sort: POPULARITY_DESC, isAdult: false) { ${CARD_FIELDS} } }
          top: Page(perPage: 10) { media(type: ANIME, sort: SCORE_DESC, isAdult: false) { ${CARD_FIELDS} } }
        }`,
        { season, year },
        signal,
      ),
  });
};

export type BrowseParams = { q?: string | undefined; genre?: string | undefined; sort: SortKey; page: number };

type BrowseData = {
  fallback?: boolean;
  Page: { pageInfo: { currentPage: number; hasNextPage: boolean }; media: AnimeCard[] };
};

export const browseQuery = (p: BrowseParams) =>
  queryOptions({
    ...requestOptions,
    queryKey: ["browse", p],
    initialData: () => fallbackBrowse(p),
    initialDataUpdatedAt: 0,
    staleTime: 5 * 60_000,
    queryFn: ({ signal }) =>
      anilist<BrowseData>(
        `query ($page: Int, $search: String, $genre: String, $sort: [MediaSort], $status: MediaStatus) {
          Page(page: $page, perPage: 24) {
            pageInfo { currentPage hasNextPage }
            media(type: ANIME, search: $search, genre: $genre, sort: $sort, status: $status, isAdult: false) { ${CARD_FIELDS} }
          }
        }`,
        {
          page: p.page,
          search: p.q || undefined,
          genre: p.genre || undefined,
          sort: p.q && p.sort === "trending" ? ["SEARCH_MATCH"] : [SORTS[p.sort].value],
          status: p.sort === "airing" ? "RELEASING" : undefined,
        },
        signal,
      ),
  });

export const animeQuery = (id: number) =>
  queryOptions({
    ...requestOptions,
    queryKey: ["anime", id],
    initialData: () => POPULAR_ANIME.find((a) => a.id === id),
    initialDataUpdatedAt: 0,
    staleTime: 10 * 60_000,
    queryFn: async ({ signal }) => {
      const data = await anilist<{ Media: AnimeDetail | null }>(
        `query ($id: Int) {
          Media(id: $id, type: ANIME) {
            ${CARD_FIELDS}
            description(asHtml: false)
            duration
            popularity
            studios(isMain: true) { nodes { name } }
            trailer { id site }
            nextAiringEpisode { episode airingAt }
            characters(sort: [ROLE, RELEVANCE], perPage: 8) {
              edges { role node { id name { full } image { large } } }
            }
            recommendations(sort: RATING_DESC, perPage: 6) {
              nodes { mediaRecommendation { ${CARD_FIELDS} } }
            }
          }
        }`,
        { id },
        signal,
      );
      return data.Media;
    },
  });

/**
 * Look up several titles at once (one request, one alias per title).
 * Titles AniList can't find are dropped; duplicates are removed.
 * Runs in the browser.
 */
export async function resolveTitles(titles: string[]): Promise<(AnimeCard | null)[]> {
  if (!titles.length) return [];
  const vars = titles.map((_, i) => `$t${i}: String`).join(", ");
  const fields = titles
    .map((_, i) => `p${i}: Media(search: $t${i}, type: ANIME, isAdult: false) { ${CARD_FIELDS} }`)
    .join("\n");
  const variables = Object.fromEntries(titles.map((t, i) => [`t${i}`, t]));
  let data: Record<string, AnimeCard | null> | undefined;
  for (let attempt = 0; attempt <= ANIME_RETRIES; attempt++) {
    try {
      // Missing titles may return 404 with valid partial data.
      data = await anilist<Record<string, AnimeCard | null>>(`query (${vars}) { ${fields} }`, variables, undefined, true);
      break;
    } catch (error) {
      if (attempt === ANIME_RETRIES) {
        const saved = titles.map((title) => POPULAR_ANIME.find((a) =>
          [a.title.english, a.title.romaji].some((t) => t?.toLowerCase() === title.toLowerCase())) ?? null);
        if (!saved.some(Boolean)) throw error;
        data = Object.fromEntries(saved.map((a, i) => [`p${i}`, a]));
      } else {
        await new Promise((resolve) => setTimeout(resolve, requestOptions.retryDelay(attempt)));
      }
    }
  }
  const seen = new Set<number>();
  return titles.map((_, i) => {
    const m = data?.[`p${i}`] ?? null;
    if (!m || seen.has(m.id)) return null;
    seen.add(m.id);
    return m;
  });
}

