import { createServerFn } from "@tanstack/react-start";

import { validateMatchInput } from "./matchmaker";
import { recommendAnime } from "./matchmaker.server";

export const getAnimeMatches = createServerFn({ method: "POST" })
  .inputValidator(validateMatchInput)
  .handler(({ data }) => recommendAnime(data.prompt));
