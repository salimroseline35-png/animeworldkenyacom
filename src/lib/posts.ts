import top5Cover from "../assets/top5-cover.jpg";
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
    outro: "Which AOT twist shocked you the most? No spoilers...
