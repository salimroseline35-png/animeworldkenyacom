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
    slug: "watch-epic-demon-slayer-fight-video",
    title: "WATCH: The Most Epic Anime Fight Ever - Demon Slayer Will Give You Goosebumps",
    date: "2026-11-23",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Tanjiro fighting in Demon Slayer epic battle",
    intro: "You HAVE to watch this fight. Watch the video here first: https://www.youtube.com/watch?v=ATJYac_dORs - Then read why it is so crazy below.",
    list: ["Tanjiro vs Rui - The fight that broke the internet", "Nezuko saves Tanjiro - Best sister moment ever", "The animation is on another level", "The music + fight together = goosebumps", "If you haven't watched Demon Slayer, start TODAY"],
    outro: "Did you watch the video? Rate this fight 1-10 in the comments. Share this with that friend who still hasn't watched Demon Slayer!",
  },
  {
    slug: "best-anime-with-best-friend",
    title: "Best Anime To Watch With Your Best Friend",
    date: "2026-11-23",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Best friends watching anime together and laughing",
    intro: "Grab your bestie, get some snacks, and press play. These are the best anime to watch together - full of laughs, tears, and unforgettable moments.",
    list: ["Naruto & Naruto Shippuden", "Demon Slayer", "One Piece", "Jujutsu Kaisen", "Haikyuu!!", "Spy x Family", "Attack on Titan"],
    outro: "Pick one, buy some bhajia or smokies, put your phones on silent, and enjoy. Which one will you and your best friend watch first?",
  },
  {
    slug: "top-5-anime-every-kenyan-must-watch",
    title: "Top 5 Anime Every Kenyan Must Watch",
    date: "2026-11-23",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Kenyan friends cheering while watching anime together in a Nairobi living room",
    intro: "Karibu! These are the top 5 anime we love in Kenya right now.",
    list: ["One Piece", "Naruto", "Attack on Titan", "Jujutsu Kaisen", "Frieren"],
    outro: "Which one is your number 1? Comment below!",
  },
  {
    slug: "best-anime-movies-to-watch-with-friends",
    title: "5 Best Anime Movies To Watch With Friends In Nairobi",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Friends watching anime movie together",
    intro: "Karibu! Looking for a movie night idea? These 5 anime movies are perfect to watch with your friends in Nairobi",
    list: ["Your Name", "Spirited Away", "Demon Slayer: Mugen Train", "Jujutsu Kaisen 0", "A Silent Voice"],
    outro: "Which one will you watch first this weekend? Tell us in the comments!",
  },
    {
    slug: "top-5-anime-villains-who-are-actually-right",
    title: "Top 5 Anime Villains Who Are Actually Right",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Anime villains standing together looking powerful",
    intro: "Madara wanted peace. Pain wanted to end war. Eren wanted freedom. Are these villains... or are they heroes? This list will change how you see anime forever.",
    list: ["Pain", "Madara Uchiha", "Eren Yeager", "Light Yagami", "Sukuna"],
    outro: "Which villain do you think was actually right? Comment below and defend your villain!",
  },
    {
    slug: "top-5-anime-villains-who-are-actually-right",
    title: "Top 5 Anime Villains Who Are Actually Right",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Anime villains standing together looking powerful",
    intro: "Madara wanted peace. Pain wanted to end war. Eren wanted freedom. Are these villains... or are they heroes?",
    list: ["Pain", "Madara Uchiha", "Eren Yeager", "Light Yagami", "Sukuna"],
    outro: "Which villain do you think was actually right? Comment below!",
    videoUrl: "https://www.youtube.com/embed/6kI8VjwQ0xE",
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
  const list = p.list?.length ? ` (${p.list.map((t, i) => `${i + 1}. ${t}`).join(" ")})` : "";
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
