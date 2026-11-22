import { describe, expect, it } from "vitest";

import { cleanDescription, getSeason } from "@/lib/anilist";

describe("getSeason", () => {
  it("puts November in the Fall season", () => {
    expect(getSeason(new Date("2026-11-22T00:00:00Z"))).toEqual({ season: "FALL", year: 2026 });
  });
  it("puts January in the Winter season", () => {
    expect(getSeason(new Date("2027-01-05T00:00:00Z")).season).toBe("WINTER");
  });
});

describe("cleanDescription", () => {
  it("strips tags and splits on line breaks", () => {
    expect(cleanDescription("Hello <i>world</i><br><br>Second &amp; last")).toEqual([
      "Hello world",
      "Second & last",
    ]);
  });
});
