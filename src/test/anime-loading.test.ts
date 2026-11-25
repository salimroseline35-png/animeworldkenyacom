import { QueryClient } from "@tanstack/react-query";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ANIME_RETRIES, ANIME_TIMEOUT_MS, animeQuery, browseQuery, homeQuery, resolveTitles } from "@/lib/anilist";
import { fallbackBrowse, POPULAR_ANIME } from "@/lib/anime-fallback";

afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });

describe("anime loading reliability", () => {
  it("renders ten popular backups without making a blocked SSR list request", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const client = new QueryClient();
    const home = await client.ensureQueryData(homeQuery());
    expect(home.trending.media).toHaveLength(10);
    expect(home.trending.media.map((a) => a.id)).toContain(21);
    expect(home.fallback).toBe(true);
    expect((await client.ensureQueryData(browseQuery({ sort: "popular", page: 1 }))).Page.media).toHaveLength(10);
    expect(fetch).not.toHaveBeenCalled();
    client.clear();
  });

  it("retries a failed list request twice and keeps the backup after failure", async () => {
    const fetch = vi.fn().mockRejectedValue(new Error("Service blocked"));
    vi.stubGlobal("fetch", fetch);
    const client = new QueryClient();
    const options = homeQuery();
    await client.ensureQueryData(options);
    await expect(client.fetchQuery({ ...options, retryDelay: 0 })).rejects.toThrow("Service blocked");
    expect(ANIME_RETRIES).toBe(2);
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(client.getQueryData(options.queryKey)?.trending.media).toHaveLength(10);
    client.clear();
  });

  it("replaces backups with real results when a retry succeeds", async () => {
    const live = { trending: { media: [POPULAR_ANIME[0]] }, season: { media: [] }, top: { media: [] } };
    const fetch = vi.fn().mockRejectedValueOnce(new Error("Offline"))
      .mockResolvedValue(new Response(JSON.stringify({ data: live }), { status: 200 }));
    vi.stubGlobal("fetch", fetch);
    const client = new QueryClient();
    const data = await client.fetchQuery({ ...homeQuery(), retryDelay: 0 });
    expect(data.trending.media).toHaveLength(1);
    expect(data.fallback).toBeUndefined();
    expect(fetch).toHaveBeenCalledTimes(2);
    client.clear();
  });

  it("bounds slow requests to twelve seconds", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn((_url: string, init: RequestInit) => new Promise((_resolve, reject) => {
      init.signal?.addEventListener("abort", () => reject(new Error("Timed out")));
    })));
    const client = new QueryClient();
    const request = client.fetchQuery({ ...homeQuery(), retry: false });
    const assertion = expect(request).rejects.toThrow("Timed out");
    expect(ANIME_TIMEOUT_MS).toBe(12_000);
    await vi.advanceTimersByTimeAsync(12_000);
    await assertion;
    client.clear();
  });

  it("backup search and genre filters do not return unrelated anime", () => {
    const data = fallbackBrowse({ q: "Naruto", genre: "Action", sort: "popular", page: 8 });
    expect(data.Page.media.map((a) => a.id)).toEqual([20]);
    expect(data.Page.pageInfo).toEqual({ currentPage: 1, hasNextPage: false });
    expect(fallbackBrowse({ q: "no-such-show", sort: "popular", page: 1 }).Page.media).toHaveLength(0);
  });

  it("saved anime detail opens without a hosting-server request", async () => {
    const fetch = vi.fn();
    vi.stubGlobal("fetch", fetch);
    const client = new QueryClient();
    expect((await client.ensureQueryData(animeQuery(21)))?.id).toBe(21);
    expect(fetch).not.toHaveBeenCalled();
    client.clear();
  });

  it("match title lookups keep valid partial results and remove duplicates", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({
      data: { p0: POPULAR_ANIME[0], p1: null, p2: POPULAR_ANIME[0] },
    }), { status: 404 })));
    const found = await resolveTitles(["ONE PIECE", "not-found", "ONE PIECE"]);
    expect(found.map((a) => a?.id ?? null)).toEqual([21, null, null]);
  });
});