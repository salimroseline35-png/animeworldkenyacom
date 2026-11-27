export const WATCH_FILTERS = ["All", "Action", "Romance", "Comedy", "Trending"] as const;
export type WatchFilter = (typeof WATCH_FILTERS)[number];
export type WatchItem = { id: number; title: string; cat: Exclude<WatchFilter, "All">; youtube: string; link: string };

// Official, checked-playable YouTube trailers; full episodes link to Crunchyroll only.
export const WATCH_ANIME: WatchItem[] = [
  { id: 1, title: "One Piece", cat: "Action", youtube: "6XsEtyeEdag", link: "https://www.crunchyroll.com/series/GRMG8ZQZR/one-piece" },
  { id: 2, title: "Naruto", cat: "Action", youtube: "-G9BqkgZXRA", link: "https://www.crunchyroll.com/series/GYQ4MW246/naruto" },
  { id: 3, title: "Demon Slayer", cat: "Action", youtube: "x7uLutVRBfI", link: "https://www.crunchyroll.com/series/GY5P48XEY/demon-slayer-kimetsu-no-yaiba" },
  { id: 4, title: "Jujutsu Kaisen", cat: "Action", youtube: "RIyb52EMx8c", link: "https://www.crunchyroll.com/series/GRDV0019R/jujutsu-kaisen" },
  { id: 5, title: "Frieren", cat: "Trending", youtube: "tR8YH0G67Rk", link: "https://www.crunchyroll.com/series/GKEH2G3JX/frieren-beyond-journeys-end" },
  { id: 6, title: "Spy x Family", cat: "Comedy", youtube: "ofXigq9aIpo", link: "https://www.crunchyroll.com/series/G4PH0WEKE/spy-x-family" },
  { id: 7, title: "Your Name", cat: "Romance", youtube: "xU47nhruN-Q", link: "https://www.crunchyroll.com/series/GY8VEQ95Y/your-name" },
  { id: 8, title: "Haikyu!!", cat: "Trending", youtube: "JOGp2c7-cKc", link: "https://www.crunchyroll.com/series/GY8V4W2MX/haikyu" },
];

export function filterWatch(list: WatchItem[], filter: WatchFilter, search: string) {
  const q = search.trim().toLowerCase();
  return list.filter((a) => (filter === "All" || a.cat === filter) && a.title.toLowerCase().includes(q));
}
