import { LoaderCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AnimeLoadStatus({ fetching, fallback, failed, retry }: {
  fetching: boolean;
  fallback: boolean;
  failed: boolean;
  retry: () => void;
}) {
  if (!fetching && !fallback && !failed) return null;
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-bold" role="status" aria-live="polite">
      {fetching && <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />}
      <span>{fetching ? "Refreshing anime…" : "Live anime is taking a break."}{fallback ? " Showing saved popular picks, not live rankings." : failed ? " Your previous picks are still here." : ""}</span>
      {!fetching && (fallback || failed) && (
        <Button variant="paper" size="sm" onClick={retry}><RefreshCw className="size-4" /> Try again</Button>
      )}
    </div>
  );
}