import { useRouter } from "@tanstack/react-router";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

export function DataError() {
  const router = useRouter();
  const { reset } = useQueryErrorResetBoundary();
  return (
    <div className="mx-auto mt-20 max-w-md px-4 text-center">
      <div className="sticker mx-auto mb-6 grid size-20 animate-wiggle place-items-center rounded-3xl bg-secondary font-display text-3xl">
        ?!
      </div>
      <h1 className="text-2xl">Oops, the anime train is late</h1>
      <p className="mt-2 text-muted-foreground">
        We couldn't load anime right now. Give it a second and try again.
      </p>
      <Button
        variant="pop"
        size="xl"
        className="mt-6"
        onClick={() => {
          reset();
          void router.invalidate();
        }}
      >
        Try again
      </Button>
    </div>
  );
}
