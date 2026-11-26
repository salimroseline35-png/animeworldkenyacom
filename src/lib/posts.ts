export type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  intro: string;
  body: string;
  tags: string[];
  image: string;
  imageAlt: string;
  videoUrl: string;
};

/** Cover picture for a YouTube video, in 16:9 so it fills the post cards. */
function thumb(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

/** Build a youtube.com/embed URL from a video id. */
function embed(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}`;
}

export const posts: Post[] = [
  {
    slug: "demon-slayer-fights",
    title: "Top 5 Demon Slayer Fights That Gave Us Goosebumps",
    date: "2026-11-24",
    author: "Anime World Kenya",
    intro: "Demon Slayer is not just an anime, it is a full experience.",
    body: "From Tanjiro vs Rui to the Infinity Castle, these fights made us scream in our houses in Kisumu and Nairobi. The animation, the music, the emotion - no other anime does it like this.",
    tags: ["Demon Slayer", "Top 5"],
    image: thumb("x7uLutVRBfI"),
    imageAlt: "Demon Slayer Infinity Castle video cover",
    videoUrl: embed("x7uLutVRBfI"),
  },
  {
    slug: "best-anime-with-friends",
    title: "Best Anime To Watch With Your Friend",
    date: "2026-11-24",
    author: "Anime World Kenya",
    intro: "Watching anime alone is good, but with your best friend? 10x better!",
    body: "Haikyuu, Jujutsu Kaisen, and Spy x Family are perfect for group watch. Bring popcorn, bring sodas, and get ready to argue about who is the best character.",
    tags: ["Friends", "Recommendations"],
    image: thumb("KJVwP8ioVRw"),
    imageAlt: "Best anime to watch with your friends video cover",
    videoUrl: embed("KJVwP8ioVRw"),
  },
  {
    slug: "top-5-anime-every-kenyan",
    title: "Top 5 Anime Every Kenyan Should Watch",
    date: "2026-11-24",
    author: "Anime World Kenya",
    intro: "If you live in Kenya and you love anime, you MUST watch these 5.",
    body: "Naruto teaches never give up. One Piece teaches friendship. Attack on Titan teaches freedom. These stories feel like our own hustle in Kenya.",
    tags: ["Kenya", "Top 5"],
    image: thumb("wyiZWYMilgk"),
    imageAlt: "Top 5 anime every Kenyan should watch video cover",
    videoUrl: embed("wyiZWYMilgk"),
  },
  {
    slug: "top-5-anime-movies",
    title: "Top 5 Best Anime Movies Of All Time",
    date: "2026-11-24",
    author: "Anime World Kenya",
    intro: "Some anime movies are better than Hollywood movies!",
    body: "Your Name, Spirited Away, A Silent Voice, Jujutsu Kaisen 0, and Demon Slayer Mugen Train. If you have not watched these, you are missing out big time.",
    tags: ["Movies", "Top 5"],
    image: thumb("QczGoCmX-pI"),
    imageAlt: "Top 5 best anime movies of all time video cover",
    videoUrl: embed("QczGoCmX-pI"),
  },
  {
    slug: "top-5-anime-villains-right",
    title: "Top 5 Anime Villains Who Are Actually Right",
    date: "2026-11-24",
    author: "Anime World Kenya",
    intro: "Sometimes the villain makes more sense than the hero!",
    body: "Pain from Naruto, Eren Yeager, Light Yagami - they wanted to change a broken world. Were they wrong? Or were they just too honest?",
    tags: ["Villains", "Top 5"],
    image: thumb("-G9BqkgZXRA"),
    imageAlt: "Anime villains who were actually right video cover",
    videoUrl: embed("-G9BqkgZXRA"),
  },
  {
    slug: "top-5-naruto-moments",
    title: "Top 5 Naruto Moments That Broke Our Hearts",
    date: "2026-11-24",
    author: "Anime World Kenya",
    intro: "Naruto is the anime that raised all of us in Kenya.",
    body: "Jiraiya's death, Naruto meeting his mother, Itachi's truth, Lee vs Gaara - we cried like babies. Naruto taught us never to give up, even when life is hard.",
    tags: ["Naruto", "Top 5"],
    image: thumb("YXBsw73_zpk"),
    imageAlt: "Iconic Naruto moments video cover",
    videoUrl: embed("YXBsw73_zpk"),
  },
  {
    slug: "one-piece-kenya-hype",
    title: "Why One Piece Is The Best Anime For Kenyans",
    date: "2026-11-25",
    author: "Anime World Kenya",
    intro: "1000+ episodes and still we are not tired!",
    body: "Luffy is like a Kenyan hustler - he never gives up on his dream. The crew is family. If you start One Piece today, you will be hooked for life.",
    tags: ["One Piece"],
    image: thumb("6XsEtyeEdag"),
    imageAlt: "One Piece video cover",
    videoUrl: embed("6XsEtyeEdag"),
  },
  {
    slug: "attack-on-titan-ending-explained",
    title: "Attack On Titan Ending Explained - Did Eren Do Right?",
    date: "2026-11-25",
    author: "Anime World Kenya",
    intro: "The ending broke the whole internet!",
    body: "Eren wanted freedom for his friends, but at what cost? Let's break down the final episode in simple words every fan can understand.",
    tags: ["Attack on Titan"],
    image: thumb("zVXKN5pxbcI"),
    imageAlt: "Attack on Titan ending explained video cover",
    videoUrl: embed("zVXKN5pxbcI"),
  },
  {
    slug: "jujutsu-kaisen-gojo-vs-sukuna",
    title: "Gojo Vs Sukuna - The Fight That Shook Anime",
    date: "2026-11-25",
    author: "Anime World Kenya",
    intro: "The strongest vs the King of Curses!",
    body: "Gojo vs Sukuna was not just a fight, it was history. Domain Expansion, Hollow Purple, Mahoraga - this fight had everything.",
    tags: ["Jujutsu Kaisen"],
    image: thumb("S-XxKVxZ2fU"),
    imageAlt: "Gojo versus Sukuna fight video cover",
    videoUrl: embed("S-XxKVxZ2fU"),
  },
  {
    slug: "solo-leveling-sung-jinwoo",
    title: "Solo Leveling: Why Sung Jinwoo Is The Coolest MC Ever",
    date: "2026-11-25",
    author: "Anime World Kenya",
    intro: "From weakest hunter to Shadow Monarch!",
    body: "Sung Jinwoo started as nobody. Now he is the strongest. His glow-up is the biggest motivation for every Kenyan youth hustling.",
    tags: ["Solo Leveling"],
    image: thumb("PKHQuQF1S8k"),
    imageAlt: "Solo Leveling Sung Jinwoo video cover",
    videoUrl: embed("PKHQuQF1S8k"),
  },
  {
    slug: "dragon-ball-z-goku-kenya",
    title: "Dragon Ball Z: Why Goku Is Still The GOAT",
    date: "2026-11-25",
    author: "Anime World Kenya",
    intro: "We grew up watching Goku on TV!",
    body: "Goku vs Vegeta, Goku vs Frieza, Goku vs Cell - every Kenyan kid knows Kamehameha! Dragon Ball Z is the father of all anime.",
    tags: ["Dragon Ball"],
    image: thumb("VEjVqXiiUNY"),
    imageAlt: "Goku transformations video cover",
    videoUrl: embed("VEjVqXiiUNY"),
  },
  {
    slug: "my-hero-academia-deku",
    title: "My Hero Academia: Deku's Journey Will Make You Cry",
    date: "2026-11-25",
    author: "Anime World Kenya",
    intro: "A boy with no power becomes the greatest hero!",
    body: "Deku had nothing, but he had heart. Just like many of us in Kenya, he proved that hard work beats talent.",
    tags: ["My Hero Academia"],
    image: thumb("RYI-WG_HFV8"),
    imageAlt: "My Hero Academia Deku video cover",
    videoUrl: embed("RYI-WG_HFV8"),
  },
  {
    slug: "death-note-light-vs-L",
    title: "Death Note: Light Vs L - Who Was Smarter?",
    date: "2026-11-25",
    author: "Anime World Kenya",
    intro: "The greatest mind game in anime history!",
    body: "Light Yagami vs L is like chess, but with lives. Every episode makes you think. Who was right? Let's debate in the comments!",
    tags: ["Death Note"],
    image: thumb("_f6-MqeqhN4"),
    imageAlt: "Death Note Light versus L video cover",
    videoUrl: embed("_f6-MqeqhN4"),
  },
  {
    slug: "spy-x-family-anya",
    title: "Spy x Family: Anya Is The Cutest Anime Character Ever",
    date: "2026-11-25",
    author: "Anime World Kenya",
    intro: "Anya's face says everything!",
    body: "Anya Forger stole our hearts. Her funny faces, her peanuts, her mind-reading - Spy x Family is pure happiness for the whole family.",
    tags: ["Spy x Family"],
    image: thumb("AwaHrHMgz5Q"),
    imageAlt: "Spy x Family Anya video cover",
    videoUrl: embed("AwaHrHMgz5Q"),
  },
  {
    slug: "haikyuu-volleyball-hype",
    title: "Haikyuu: The Anime That Made Kenyans Love Volleyball",
    date: "2026-11-25",
    author: "Anime World Kenya",
    intro: "Even if you hate sports, you will love Haikyuu!",
    body: "Hinata is small but he jumps like a beast! Haikyuu teaches teamwork, never giving up, and believing in yourself.",
    tags: ["Haikyuu", "Sports"],
    image: thumb("GDMXGzjJzS4"),
    imageAlt: "Haikyuu volleyball video cover",
    videoUrl: embed("GDMXGzjJzS4"),
  },
  {
    slug: "chainsaw-man-denji",
    title: "Chainsaw Man: Is Denji The Craziest MC Ever?",
    date: "2026-11-25",
    author: "Anime World Kenya",
    intro: "A boy who becomes a chainsaw devil!",
    body: "Chainsaw Man is wild, funny, and bloody. Denji just wants food and a normal life, but the world keeps pulling him into chaos.",
    tags: ["Chainsaw Man"],
    image: thumb("sqtIagL463A"),
    imageAlt: "Chainsaw Man Denji video cover",
    videoUrl: embed("sqtIagL463A"),
  },
  {
    slug: "black-clover-asta",
    title: "Black Clover: Asta Proves Hard Work Beats Magic",
    date: "2026-11-25",
    author: "Anime World Kenya",
    intro: "A boy with NO magic becomes the Wizard King!",
    body: "Asta has zero magic in a world of magic. But he trains harder than anyone. His story is for every Kenyan who was told they can't make it.",
    tags: ["Black Clover"],
    image: thumb("OdQrlp3uYQM"),
    imageAlt: "Black Clover Asta video cover",
    videoUrl: embed("OdQrlp3uYQM"),
  },
  {
    slug: "hunter-x-hunter-gon",
    title: "Hunter x Hunter: The Most Underrated Anime Ever",
    date: "2026-11-25",
    author: "Anime World Kenya",
    intro: "Gon and Killua are the best duo in anime!",
    body: "Hunter x Hunter has the best fights, best villains, and best story. If you slept on this anime, wake up now!",
    tags: ["Hunter x Hunter"],
    image: thumb("d6kBeJjTGnY"),
    imageAlt: "Hunter x Hunter Gon and Killua video cover",
    videoUrl: embed("d6kBeJjTGnY"),
  },
  {
    slug: "bleach-ichigo-bankai",
    title: "Bleach: Ichigo's Bankai Still Gives Goosebumps",
    date: "2026-11-25",
    author: "Anime World Kenya",
    intro: "Bankai! The word that made us all shout!",
    body: "Bleach is back and better than ever. Ichigo vs Byakuya, Ichigo vs Ulquiorra - these fights are legendary.",
    tags: ["Bleach"],
    image: thumb("1HBGXgjZEGk"),
    imageAlt: "Bleach Ichigo Bankai video cover",
    videoUrl: embed("1HBGXgjZEGk"),
  },
  {
    slug: "anime-in-kenya-community",
    title: "Anime In Kenya Is Growing Fast - And We Are Proud!",
    date: "2026-11-25",
    author: "Anime World Kenya",
    intro: "From Nairobi to Kisumu, anime fans are everywhere!",
    body: "Anime conventions, cosplay, watch parties - Kenya's anime community is growing every day. We are not alone anymore. We are Anime World Kenya!",
    tags: ["Kenya", "Community"],
    image: thumb("HGCsAcFzaFw"),
    imageAlt: "Anime in Kenya community video cover",
    videoUrl: embed("HGCsAcFzaFw"),
  },
];

/** Newest first. */
export function latestPosts(limit = 3): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(date: string): string {
  const d = new Date(`${date}T12:00:00`);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export function postExcerpt(post: Post, max = 180): string {
  const text = `${post.intro} ${post.body}`.trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const at = Math.max(cut.lastIndexOf(" "), cut.lastIndexOf("."));
  return `${cut.slice(0, at > 40 ? at : max).trimEnd()}.`;
}
