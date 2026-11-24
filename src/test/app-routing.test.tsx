import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it("matches a page for / instead of falling back to not found", () => {
    expect(router.matchRoutes("/").at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches the browse page", () => {
    expect(router.matchRoutes("/browse").at(-1)?.routeId).toBe("/browse");
  });

  it("matches the matchmaker page", () => {
    expect(router.matchRoutes("/match").at(-1)?.routeId).toBe("/match");
  });

  it("matches the blog page", () => {
    expect(router.matchRoutes("/posts").at(-1)?.routeId).toBe("/posts/");
  });

  it("matches a blog post page", () => {
    expect(router.matchRoutes("/posts/top-5-one-piece-arcs-you-must-watch").at(-1)?.routeId).toBe("/posts/$slug");
  });

  it("matches an anime detail page", () => {
    expect(router.matchRoutes("/anime/21").at(-1)?.routeId).toBe("/anime/$id");
  });
});
