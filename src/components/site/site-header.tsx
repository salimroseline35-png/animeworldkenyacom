import { Link, useRouterState } from "@tanstack/react-router";
import { Search } from "lucide-react";

export function SiteHeader() {
  const loading = useRouterState({ select: (s) => s.status === "pending" });
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-background/90 backdrop-blur">
      {loading && (
        <div className="absolute inset-x-0 -bottom-[2px] h-1 overflow-hidden" aria-hidden>
          <div className="animate-loading-bar h-full w-1/3 rounded-full bg-primary" />
        </div>
      )}
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link to="/" className="group flex items-center gap-2" aria-label="Anime World Kenya home">
          <span className="sticker grid size-10 place-items-center rounded-xl bg-primary font-display text-sm text-primary-foreground transition-transform group-hover:-rotate-6">
            AW
          </span>
          <span className="font-display text-base leading-none sm:text-lg">
            Anime World <span className="text-kenya">Kenya</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-extrabold sm:gap-2">
          <Link
            to="/"
            className="hidden rounded-full px-3 py-2 transition-colors hover:bg-secondary sm:inline-flex"
            activeProps={{ className: "bg-secondary" }}
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/browse"
            search={{ sort: "trending", page: 1 }}
            className="sticker pop-hover inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2"
          >
            <Search className="size-4" />
            Browse
          </Link>
        </nav>
      </div>
    </header>
  );
}
