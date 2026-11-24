import top5Cover from "../assets/post-top-5-anime-kenya.jpg";
export type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  image: string;
  imageAlt: string;
  intro: string;
  list: string[];
  outro: string;
  videoUrl?: string;
};

export const posts: Post[] = [
  {
    slug: "top-5-demon-slayer-fights",
    title: "Top 5 Demon Slayer Fights That Gave Us Goosebumps",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Tanjiro and Nezuko from Demon Slayer",
    intro: "Demon Slayer is not just an anime, it is an experience. These 5 fights had the whole of Kenya shouting at their screens!",
    list: ["Tanjiro vs Rui", "Rengoku vs Akaza", "Tengen vs Gyutaro", "Muichiro vs Gyokko", "Tanjiro & Nezuko vs Daki"],
    outro: "Which Demon Slayer fight is your number 1? Comment below!",
    videoUrl: "https://www.youtube.com/embed/ATJYac_dORw",
  },
  {
    slug: "best-anime-to-watch-with-your-friend",
    title: "Best Anime To Watch With Your Friend",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Friends watching anime together and laughing",
    intro: "Anime is 10x better with your best friend! These shows will have you both laughing, crying and shouting together.",
    list: ["Haikyuu", "One Piece", "Spy x Family", "Jujutsu Kaisen", "Naruto"],
    outro: "Tag that one friend you always watch anime with!",
    videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
  },
  {
    slug: "top-5-anime-every-kenyan-should-watch",
    title: "Top 5 Anime Every Kenyan Should Watch",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Popular anime characters collage",
    intro: "If you live in Kenya and you have not watched these 5 anime, you are missing out! Start here, thank us later.",
    list: ["Naruto", "Attack on Titan", "Demon Slayer", "One Piece", "Death Note"],
    outro: "How many of these have you watched? Be honest in the comments!",
    videoUrl: "https://www.youtube.com/embed/d6kBeJjhvyc",
  },
  {
    slug: "top-5-best-anime-movies-of-all-time",
    title: "Top 5 Best Anime Movies Of All Time",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Anime movie poster with beautiful sky",
    intro: "Forget Hollywood! These 5 anime movies will make you cry, smile and think for days. Perfect for movie night in Nairobi!",
    list: ["Your Name", "Spirited Away", "A Silent Voice", "Demon Slayer Mugen Train", "Jujutsu Kaisen 0"],
    outro: "Which anime movie made YOU cry the most?",
    videoUrl: "https://www.youtube.com/embed/xU47nhruN-Q",
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
    outro: "Which villain do you think was actually right? Comment below and defend your villain!",
    videoUrl: "https://www.youtube.com/embed/6kI8VjwQ0xE",
  },
  {
    slug: "top-5-naruto-moments-that-broke-our-hearts",
    title: "Top 5 Naruto Moments That Broke Our Hearts",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Naruto Uzumaki looking sad and determined",
    intro: "Naruto made us laugh, made us cry, made us believe. These 5 moments had the whole of Kenya in tears - especially number 1!",
    list: ["Jiraiya's Death", "Naruto Meets His Mother Kushina", "Itachi's Truth Revealed", "Hinata Confesses to Naruto", "Naruto Becomes Hokage"],
    outro: "Which Naruto moment made YOU cry? Tell us in the comments!",
    videoUrl: "https://www.youtube.com/embed/-G9BqkgZXRA",
  },
  {
    slug: "top-5-one-piece-arcs-you-must-watch",
    title: "Top 5 One Piece Arcs You MUST Watch",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Luffy and Straw Hat crew sailing on Thousand Sunny",
    intro: "1000+ episodes and still the best anime ever? These 5 arcs prove why One Piece is KING. If you haven't watched these, you haven't watched One Piece!",
    list: ["Marineford War", "Enies Lobby", "Wano Country", "Water 7", "Dressrosa"],
    outro: "What is your favourite One Piece arc? Luffy fans, defend your arc!",
    videoUrl: "https://www.youtube.com/embed/MCb13lbVGE0",
  },
  {
    slug: "top-5-solo-leveling-fights-that-broke-the-internet",
    title: "Top 5 Solo Leveling Fights That Broke The Internet",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Sung Jinwoo with purple aura and shadow army",
    intro: "Sung Jinwoo went from weakest hunter to SHADOW MONARCH! These 5 fights had TikTok, YouTube and all of Kenya going crazy!",
    list: ["Jinwoo vs Igris", "Jinwoo vs Ant King Beru", "Jinwoo vs Demon King Baran", "Jinwoo vs Job-Change Knights", "Jinwoo vs Kamish"],
    outro: "Which Jinwoo fight is the GOAT? Arise and comment below!",
    videoUrl: "https://www.youtube.com/embed/91M9W2hSn7o",
  },
  {
    slug: "top-5-attack-on-titan-moments-that-shocked-everyone",
    title: "Top 5 Attack On Titan Moments That Shocked Everyone",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Eren Yeager with Titans behind him",
    intro: "Attack on Titan broke us! No anime has ever had plot twists like this. These 5 moments left Kenya speechless!",
    list: ["Eren's Basement Reveal", "Reiner Is The Armored Titan", "Eren Starts The Rumbling", "Levi vs Beast Titan", "Sasha's Death"],
    outro: "Which Attack on Titan moment shocked you the most? No spoilers in the comments...",
    videoUrl: "https://www.youtube.com/embed/A75q2q5nW34",
  },
  {
    slug: "top-5-jujutsu-kaisen-fights-that-are-pure-cinema",
    title: "Top 5 Jujutsu Kaisen Fights That Are Pure Cinema",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Gojo Satoru with blindfold and purple Hollow Purple",
    intro: "JJK fights are not fights, they are MOVIES! MAPPA went crazy with these 5 battles. Gojo, Sukuna, Yuji - pure cinema!",
    list: ["Gojo vs Sukuna", "Yuji & Todo vs Mahito", "Gojo vs Toji", "Yuta vs Geto", "Megumi vs Toji"],
    outro: "Gojo vs Sukuna - who REALLY won? Debate in the comments!",
    videoUrl: "https://www.youtube.com/embed/Upb5LdhA7-M",
  },
    {
    slug: "one-piece-film-red-shanks-daughter",
    title: "One Piece Film: Red - Why Shanks' Daughter Broke The Internet",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Luffy and Uta in One Piece Film Red",
    intro: "Uta's songs, Shanks' secret, and Luffy's most emotional fight ever. WATCH the trailer below first, then read why this movie broke the internet.",
    list: ["Uta is Shanks' daughter - The secret nobody expected", "Her songs are REAL bangers - Ado did magic", "Luffy vs Shanks moment - Most emotional scene", "The final fight with the whole crew together", "If you haven't watched Red, watch it TODAY"],
    outro: "Have you watched One Piece Red? Which Uta song is your favourite? Tell us in the comments!",
    videoUrl: "https://www.youtube.com/embed/9oD7TQDZcgs",
  },
  {
    slug: "one-piece-gear-5-episodes-you-must-watch",
    title: "One Piece Episodes You MUST Watch - Luffy Gear 5 Will Give You Goosebumps",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Luffy in Gear 5 laughing with white hair",
    intro: "From Episode 1017 to 1071, this is the best One Piece run EVER. WATCH Gear 5 below first, then read why the whole world stopped for this.",
    list: ["Episode 1017 - Luffy vs Kaido starts", "Episode 1044 - GEAR 5 IS HERE - Joy Boy is back!", "Episode 1062 - Luffy's dream moment", "Episode 1071 - The fight that broke the internet", "If you haven't watched One Piece, start TODAY"],
    outro: "Did Gear 5 give you goosebumps? Rate it 1-10 in the comments and share with a One Piece fan!",
    videoUrl: "https://www.youtube.com/embed/_G8pLhJm6d0",
  },
    {
    slug: "demon-slayer-infinity-castle-movie",
    title: "Demon Slayer Infinity Castle - The Movie Everyone Is Crying About",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Tanjiro fighting in Infinity Castle",
    intro: "WATCH the trailer below first. This is the movie that made the whole world cry. Infinity Castle is here and it is INSANE.",
    list: ["Tanjiro vs Akaza - The rematch everyone waited for", "The animation is on another level - Ufotable did magic", "Nezuko moment that will make you cry", "The music + fight together = goosebumps", "If you haven't watched Demon Slayer, start TODAY"],
    outro: "Have you watched Infinity Castle? Rate it 1-10 in the comments!",
    videoUrl: "https://www.youtube.com/embed/ATJYac_dORs",
  },
    {
    slug: "naruto-vs-sasuke-final-fight-episodes",
    title: "Naruto vs Sasuke Final Fight - The Best Anime Fight Ever?",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Naruto vs Sasuke final valley fight",
    intro: "WATCH the fight below first. Naruto vs Sasuke at the Valley of the End. This is the fight every anime fan MUST watch.",
    list: ["Naruto vs Sasuke - Brothers, rivals, legends", "The final Rasengan vs Chidori clash", "The ending that made everyone cry", "Why this fight is still number 1 after 10 years", "If you haven't watched Naruto, start TODAY"],
    outro: "Who won in your heart - Naruto or Sasuke? Tell us in the comments!",
    videoUrl: "https://www.youtube.com/embed/5R6F-0e3n5w",
  },
  {
    slug: "solo-leveling-season-2-episodes",
    title: "Solo Leveling Season 2 - Jinwoo Is Now TOO Powerful!",
    date: "2026-11-24",
    author: "Anime World Kenya",
    image: top5Cover,
    imageAlt: "Sung Jinwoo with purple aura in Solo Leveling",
    intro: "WATCH below first. Jinwoo is back and he is NOT playing. Season 2 has the craziest fights in anime right now.",
    list: ["Jinwoo vs Ant King - The fight that broke the internet", "Arise! - The most iconic moment in anime", "Jinwoo's new shadow army is crazy", "The animation is pure fire", "If you haven't watched Solo Leveling, start TODAY"],
    outro: "Is Jinwoo the strongest anime character now? Tell us in the comments!",
    videoUrl: "https://www.youtube.com/embed/0kYvYpV8_8k",
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function latestPosts(count: number): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);
}

export function formatPostDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function postExcerpt(post: Post): string {
  return post.intro;
}
