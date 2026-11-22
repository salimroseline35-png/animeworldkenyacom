import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SearchBox({
  initial = "",
  genre,
  className,
}: {
  initial?: string;
  genre?: string | undefined;
  className?: string;
}) {
  const [q, setQ] = useState(initial);
  const navigate = useNavigate();

  return (
    <form
      role="search"
      className={cn(
        "sticker flex w-full items-center gap-2 rounded-full bg-paper p-1.5 pl-4",
        className,
      )}
      onSubmit={(e) => {
        e.preventDefault();
        const term = q.trim();
        void navigate({
          to: "/browse",
          search: { q: term || undefined, genre, sort: "trending", page: 1 },
        });
      }}
    >
      <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search Naruto, One Piece, Frieren…"
        aria-label="Search anime"
        className="min-w-0 flex-1 bg-transparent py-2 text-base font-semibold outline-none placeholder:text-muted-foreground"
      />
      <Button type="submit" variant="pop" className="h-10 px-5">
        Search
      </Button>
    </form>
  );
}
