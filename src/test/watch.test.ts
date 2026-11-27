import { describe, expect, it } from "vitest";
import { WATCH_ANIME, filterWatch } from "@/lib/watch";

describe("watch page filters", () => {
  it("Romance shows only romance anime", () => {
    expect(filterWatch(WATCH_ANIME, "Romance", "").map((a) => a.title)).toEqual(["Your Name"]);
  });
  it("search matches title ignoring case", () => {
    expect(filterWatch(WATCH_ANIME, "All", "naruto").map((a) => a.title)).toEqual(["Naruto"]);
  });
  it("every full-episode link goes to Crunchyroll", () => {
    for (const a of WATCH_ANIME) expect(new URL(a.link).hostname).toBe("www.crunchyroll.com");
  });
});
