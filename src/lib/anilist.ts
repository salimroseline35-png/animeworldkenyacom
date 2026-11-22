import { queryOptions } from "@tanstack/react-query";

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

async function anilist<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (!res.ok || !json.data) {
    throw new Error(json.errors?.[0]?.message ?? `Anime data unavailable (${res.status})`);
  }
  return json.data;
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
  trending: { media: AnimeCard[] };
  season: { media: AnimeCard[] };
  top: { media: AnimeCard[] };
};

export const homeQuery = () => {
  const { season, year } = getSeason(new Date());
  return queryOptions({
    queryKey: ["home", season, year],
    staleTime: 5 * 60_000,
    queryFn: () =>
      anilist<HomeData>(
        `query ($season: MediaSeason, $year: Int) {
          trending: Page(perPage: 12) { media(type: ANIME, sort: TRENDING_DESC, isAdult: false) { ${CARD_FIELDS} } }
          season: Page(perPage: 12) { media(type: ANIME, season: $season, seasonYear: $year, sort: POPULARITY_DESC, isAdult: false) { ${CARD_FIELDS} } }
          top: Page(perPage: 10) { media(type: ANIME, sort: SCORE_DESC, isAdult: false) { ${CARD_FIELDS} } }
        }`,
        { season, year },
      ),
  });
};

export type BrowseParams = { q?: string | undefined; genre?: string | undefined; sort: SortKey; page: number };

type BrowseData = {
  Page: { pageInfo: { currentPage: number; hasNextPage: boolean }; media: AnimeCard[] };
};

export const browseQuery = (p: BrowseParams) =>
  queryOptions({
    queryKey: ["browse", p],
    staleTime: 5 * 60_000,
    queryFn: () =>
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
      ),
  });

export const animeQuery = (id: number) =>
  queryOptions({
    queryKey: ["anime", id],
    staleTime: 10 * 60_000,
    queryFn: async () => {
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
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query: `query (${vars}) { ${fields} }`, variables }),
  });
  // A missing title makes AniList answer 404 with partial data, so read data either way.
  const json = (await res.json().catch(() => null)) as { data?: Record<string, AnimeCard | null> | null } | null;
  if (!json?.data) throw new Error(`Anime data unavailable (${res.status})`);
  const seen = new Set<number>();
  return titles.map((_, i) => {
    const m = json.data?.[`p${i}`] ?? null;
    if (!m || seen.has(m.id)) return null;
    seen.add(m.id);
    return m;
  });
}
