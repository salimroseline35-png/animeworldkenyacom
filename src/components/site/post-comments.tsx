import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MessageCircle, Send } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  COMMENT_BODY_MAX,
  COMMENT_NAME_MAX,
  addComment,
  commentsQuery,
  timeAgo,
  validateComment,
} from "@/lib/comments";

const NAME_KEY = "awk-comment-name";
const avatarColors = ["bg-secondary", "bg-accent", "bg-primary text-primary-foreground", "bg-kenya text-kenya-foreground"];

export function PostComments({ slug }: { slug: string }) {
  const queryClient = useQueryClient();
  const comments = useQuery(commentsQuery(slug));
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    setName(window.localStorage.getItem(NAME_KEY) ?? "");
  }, []);

  const post = useMutation({
    mutationFn: () => addComment(slug, name, body),
    onSuccess: async () => {
      window.localStorage.setItem(NAME_KEY, name.trim());
      setBody("");
      setPosted(true);
      await queryClient.invalidateQueries({ queryKey: commentsQuery(slug).queryKey });
    },
    onError: (e: Error) => setFormError(e.message),
  });

  function submit(e: FormEvent) {
    e.preventDefault();
    setPosted(false);
    const problem = validateComment(name, body);
    setFormError(problem);
    if (!problem) post.mutate();
  }

  const list = comments.data ?? [];

  return (
    <section id="comments" className="mt-12 scroll-mt-24" aria-labelledby="comments-title">
      <h2 id="comments-title" className="flex items-center gap-2 text-2xl sm:text-3xl">
        <MessageCircle className="size-7 text-primary" />
        Comments {list.length > 0 && <span className="text-muted-foreground">({list.length})</span>}
      </h2>

      <form onSubmit={submit} className="sticker mt-5 grid gap-3 rounded-3xl bg-paper p-4 sm:p-6">
        <label className="grid gap-1.5">
          <span className="text-sm font-extrabold">Your name</span>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={COMMENT_NAME_MAX}
            placeholder="e.g. Wanjiru from Nakuru"
            className="h-11 rounded-xl border-2 bg-background text-base"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-extrabold">Your comment</span>
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={COMMENT_BODY_MAX}
            rows={3}
            placeholder="My number 1 is…"
            className="rounded-xl border-2 bg-background text-base"
          />
        </label>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-bold text-muted-foreground">
            {body.length}/{COMMENT_BODY_MAX} · Everyone can see your name and comment.
          </p>
          <Button type="submit" variant="pop" size="xl" disabled={post.isPending}>
            <Send /> {post.isPending ? "Posting…" : "Post comment"}
          </Button>
        </div>
        {formError && (
          <p role="alert" className="text-sm font-extrabold text-destructive">
            {formError}
          </p>
        )}
        {posted && !formError && (
          <p role="status" className="text-sm font-extrabold text-kenya">
            Asante! Your comment is live.
          </p>
        )}
      </form>

      <div className="mt-6 grid gap-3">
        {comments.isPending && <p className="font-bold text-muted-foreground">Loading comments…</p>}
        {comments.isError && (
          <p className="font-bold text-destructive">
            Comments could not load right now.{" "}
            <button type="button" className="underline" onClick={() => comments.refetch()}>
              Try again
            </button>
          </p>
        )}
        {comments.isSuccess && list.length === 0 && (
          <p className="rounded-2xl border-2 border-dashed border-ink/40 p-5 text-center font-bold text-muted-foreground">
            No comments yet — be the first to share your number 1!
          </p>
        )}
        {list.map((c, i) => (
          <article key={c.id} className="flex gap-3 rounded-2xl border-2 border-ink bg-paper p-4">
            <span
              aria-hidden
              className={`grid size-10 shrink-0 place-items-center rounded-full border-2 border-ink font-display ${avatarColors[i % avatarColors.length]}`}
            >
              {c.name.trim().charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-extrabold">{c.name}</span>
                <span className="text-xs font-bold text-muted-foreground">{timeAgo(c.created_at)}</span>
              </p>
              <p className="mt-1 whitespace-pre-line break-words font-semibold">{c.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
