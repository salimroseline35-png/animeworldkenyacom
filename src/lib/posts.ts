import top5Cover from "@/assets/post-top-5-anime-kenya.jpg";

/**
 * Blog posts for "Latest Posts from Kenya".
 * Each post's body is split into an intro, an optional numbered list and an outro,
 * so the post page can show the list as a pretty ranking.
 */
export type Post = {
  slug: string;
  title: string;
  /** ISO date, e.g. "2026-11-23" */
  date: string;
  author: string;
  image: string;
  imageAlt: string;
  intro: string;
  list: string[];
  outro: string;
};

export const POSTS: Post[] = [
  {
    slug: "top-5-anime-every-kenyan-must-watch",
    title: "Top 5 Anime Every Kenyan Must Watch",
    date: "2026-11-23",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Kenyan friends cheering while watching anime together in a Nairobi living room",
    intro: "Karibu! These are the top 5 anime we love in Kenya right now:",
    list: ["One Piece", "Naruto", "Attack on Titan", "Jujutsu Kaisen", "Frieren"],
    outro: "Which one is your number 1? Comment below!",
  },
];

/** Newest first. */
export function latestPosts(limit?: number): Post[] {
  const sorted = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  return limit ? sorted.slice(0, limit) : sorted;
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** One-line preview used on cards and in share previews. */
export function postExcerpt(p: Post): string {
  const list = p.list.length ? `${p.list.map((t, i) => `${i + 1}. ${t}`).join(" ")}.` : "";
  return [p.intro, list, p.outro].filter(Boolean).join(" ");
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
