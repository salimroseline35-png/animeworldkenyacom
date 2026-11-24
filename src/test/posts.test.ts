import { describe, expect, it } from "vitest";

import { getPost, latestPosts, posts } from "@/lib/posts";

describe("Latest Posts from Kenya", () => {
  it("has posts to show", () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it("finds a post by its slug", () => {
    expect(getPost("top-5-one-piece-arcs-you-must-watch")?.title).toBe("Top 5 One Piece Arcs You MUST Watch");
  });

  it("returns nothing for an unknown post", () => {
    expect(getPost("does-not-exist")).toBeUndefined();
  });

  it("shows the newest post first", () => {
    const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
    expect(latestPosts(1)[0]?.slug).toBe(sorted[0]?.slug);
  });

  it("every post has a video to watch", () => {
    for (const p of posts) {
      expect(p.videoUrl, `post ${p.slug} is missing a video`).toBeTruthy();
    }
  });
});
