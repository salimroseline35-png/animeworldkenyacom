<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules
- Anime data comes live from the public AniList GraphQL API via `src/lib/anilist.ts` (queryOptions used in route loaders + `useSuspenseQuery`); no backend or API key needed, so keep it keyless and client/SSR-safe.
- Styling uses the sticker-pop design tokens and utilities in `src/styles.css` (`sticker`, `pop-hover`, button/badge variants); add new looks there, not as ad-hoc classes.
- AI matchmaker: the model call lives server-side (`src/lib/matchmaker.server.ts` via `matchmaker.functions.ts`) and returns only titles + reasons; the browser then resolves titles against AniList (`resolveTitles`), because AniList blocks requests from the hosting server.
- Blog posts ("Latest Posts from Kenya") are static entries in `src/lib/posts.ts` with images in `src/assets/`; the homepage section and `/posts/$slug` page read from it, so adding a post needs no backend.
