import { queryOptions } from "@tanstack/react-query";

import { supabase } from "@/integrations/supabase/client";

export const COMMENT_NAME_MAX = 40;
export const COMMENT_BODY_MAX = 600;

export type PostComment = { id: string; name: string; body: string; created_at: string };

/** Returns an error message, or null when the comment can be posted. Same limits as the database. */
export function validateComment(name: string, body: string): string | null {
  const n = name.trim();
  const b = body.trim();
  if (!n) return "Please add your name.";
  if (n.length > COMMENT_NAME_MAX) return `Your name can be up to ${COMMENT_NAME_MAX} characters.`;
  if (!b) return "Please write a comment.";
  if (b.length > COMMENT_BODY_MAX) return `Comments can be up to ${COMMENT_BODY_MAX} characters.`;
  return null;
}

export const commentsQuery = (slug: string) =>
  queryOptions({
    queryKey: ["comments", slug],
    queryFn: async (): Promise<PostComment[]> => {
      const { data, error } = await supabase
        .from("post_comments")
        .select("id, name, body, created_at")
        .eq("post_slug", slug)
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw new Error("Comments could not load right now.");
      return data;
    },
  });

export async function addComment(slug: string, name: string, body: string): Promise<void> {
  const { error } = await supabase
    .from("post_comments")
    .insert({ post_slug: slug, name: name.trim(), body: body.trim() });
  if (error) throw new Error("Your comment could not be posted. Please try again.");
}

export function timeAgo(iso: string, now = Date.now()): string {
  const s = Math.max(0, Math.round((now - new Date(iso).getTime()) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hr${h > 1 ? "s" : ""} ago`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d} day${d > 1 ? "s" : ""} ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
