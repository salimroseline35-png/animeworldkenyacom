export function SiteFooter() {
  return (
    <footer className="mt-20 border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg">
            Anime World <span className="text-secondary">Kenya</span>
          </p>
          <p className="text-sm opacity-80">Your friendly corner for finding the next great anime.</p>
        </div>
        <p className="text-xs opacity-70">
          Anime info &amp; artwork from{" "}
          <a href="https://anilist.co" target="_blank" rel="noreferrer" className="underline">
            AniList
          </a>
        </p>
      </div>
    </footer>
  );
}
