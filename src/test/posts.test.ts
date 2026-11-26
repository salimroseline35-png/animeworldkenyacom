import { describe, expect, it } from "vitest";

import { getPost, latestPosts, posts } from "@/lib/posts";

/** Videos that must never appear on the site (not anime). */
const BANNED_VIDEO_IDS = ["dQw4w9WgXcQ", "9bZkp7q19f0"];

const videoIdOf = (url: string) => url.match(/^https:\/\/www\.youtube\.com\/embed\/([A-Za-z0-9_-]{11})$/)?.[1];

describe("Latest Posts from Kenya", () => {
  it("has posts to show", () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it("finds a post by its slug", () => {
    expect(getPost("one-piece-kenya-hype")?.title).toBe("Why One Piece Is The Best Anime For Kenyans");
  });

  it("returns nothing for an unknown post", () => {
    expect(getPost("does-not-exist")).toBeUndefined();
  });

  it("shows the newest post first", () => {
    const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
    expect(latestPosts(1)[0]?.slug).toBe(sorted[0]?.slug);
  });

  it("every post video is a playable youtube embed link", () => {
    for (const p of posts) {
      expect(videoIdOf(p.videoUrl), `post ${p.slug} has a bad video link: ${p.videoUrl}`).toBeTruthy();
    }
  });

  it("no post video is a banned non-anime clip", () => {
    for (const p of posts) {
      const id = videoIdOf(p.videoUrl);
      expect(BANNED_VIDEO_IDS, `post ${p.slug} shows a banned video`).not.toContain(id);
    }
  });

  it("no two posts share the same video", () => {
    const ids = posts.map((p) => videoIdOf(p.videoUrl));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every post cover picture belongs to its own video", () => {
    for (const p of posts) {
      const id = videoIdOf(p.videoUrl);
      expect(p.image, `post ${p.slug} cover does not match its video`).toBe(
        `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
      );
    }
  });
});
