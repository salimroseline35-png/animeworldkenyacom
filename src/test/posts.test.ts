import { describe, expect, it } from "vitest";

import { getPost, latestPosts } from "@/lib/posts";

describe("Latest Posts from Kenya", () => {
  it("has the first post with the owner's title", () => {
    expect(getPost("top-5-anime-every-kenyan-must-watch")?.title).toBe("Top 5 Anime Every Kenyan Must Watch");
  });

  it("lists the top 5 anime in the owner's order", () => {
    expect(getPost("top-5-anime-every-kenyan-must-watch")?.list).toEqual([
      "One Piece",
      "Naruto",
      "Attack on Titan",
      "Jujutsu Kaisen",
      "Frieren",
    ]);
  });

  it("returns nothing for an unknown post", () => {
    expect(getPost("does-not-exist")).toBeUndefined();
  });

  it("shows the newest post first", () => {
    expect(latestPosts(1)[0]?.slug).toBe("top-5-anime-every-kenyan-must-watch");
  });
});
