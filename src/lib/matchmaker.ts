// Shared, browser-safe types and input rules for the AI anime matchmaker.

export const MATCH_MAX_CHARS = 800;
export const MATCH_PICK_COUNT = 6;

export type MatchInput = { prompt: string };
export type MatchPick = { title: string; why: string };
export type MatchResult =
  | { ok: true; intro: string; picks: MatchPick[] }
  | { ok: false; error: string };

export function validateMatchInput(input: unknown): MatchInput {
  const prompt =
    typeof input === "object" && input !== null && "prompt" in input
      ? String((input as { prompt: unknown }).prompt ?? "").trim()
      : "";
  if (prompt.length < 3) throw new Error("Tell us a little about what you'd like to watch.");
  if (prompt.length > MATCH_MAX_CHARS) throw new Error(`Please keep it under ${MATCH_MAX_CHARS} characters.`);
  return { prompt };
}

export const MOODS = [
  "Need a good laugh",
  "Ready to cry",
  "Hype battles",
  "Cozy & chill",
  "Mind-bending",
  "Romance feels",
  "Spooky night",
  "Short & sweet",
] as const;

/** Build one request text from the fan's chips and free text. */
export function buildMatchPrompt(moods: string[], genres: string[], text: string): string {
  const parts: string[] = [];
  if (moods.length) parts.push(`Mood: ${moods.join(", ")}.`);
  if (genres.length) parts.push(`Favourite genres: ${genres.join(", ")}.`);
  if (text.trim()) parts.push(text.trim());
  return parts.join("\n");
}
