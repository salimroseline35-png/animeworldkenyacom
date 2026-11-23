import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, MessageCircleHeart, Search } from "lucide-react";

import { PostComments } from "@/components/site/post-comments";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPostDate, getPost, postExcerpt } from "@/lib/posts";

export const Route = createFileRoute("/posts/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Post not found — Anime World Kenya" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} — Anime World Kenya`;
    const description = postExcerpt(loaderData).slice(0, 160);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: PostPage,
});

const rankColors = ["bg-secondary", "bg-primary text-primary-foreground", "bg-accent", "bg-kenya text-kenya-foreground", "bg-paper"];

function PostPage() {
  const post = Route.useLoaderData();

  return (
    <article className="mx-auto max-w-3xl px-4 pt-6 pb-10 sm:pt-10">
      <Link
        to="/"
        className="mb-5 inline-flex items-center gap-1 text-sm font-extrabold text-primary hover:underline"
      >
        <ArrowLeft className="size-4" /> Back to home
      </Link>

      <div className="sticker overflow-hidden rounded-3xl bg-ink">
        <img src={post.image} alt={post.imageAlt} className="aspect-[16/9] w-full object-cover" />
      </div>

      <header className="mt-7">
        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-muted-foreground">
          <Badge variant="kenya">Latest Posts from Kenya</Badge>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            {formatPostDate(post.date)}
          </span>
          <span>by {post.author}</span>
        </div>
        <h1 className="animate-float-up mt-4 text-3xl leading-tight sm:text-5xl">{post.title}</h1>
      </header>

      <p className="mt-6 text-lg font-bold sm:text-xl">{post.intro}</p>

      {post.list.length > 0 && (
        <ol className="mt-6 grid gap-3">
          {post.list.map((title, i) => (
            <li key={title}>
              <Link
                to="/browse"
                search={{ q: title, sort: "trending", page: 1 }}
                className="sticker pop-hover flex items-center gap-4 rounded-2xl bg-paper p-3 sm:p-4"
              >
                <span
                  className={`sticker grid size-12 shrink-0 place-items-center rounded-xl font-display text-xl ${rankColors[i % rankColors.length]} ${i % 2 ? "rotate-3" : "-rotate-3"}`}
                >
                  {i + 1}
                </span>
                <span className="flex-1 text-lg font-extrabold sm:text-xl">{title}</span>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-muted-foreground">
                  <Search className="size-4" />
                  <span className="hidden sm:inline">Find it</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      )}

      {post.outro && (
        <div className="sticker mt-8 flex items-center gap-4 rounded-3xl bg-secondary p-5 sm:p-6">
          <span className="sticker grid size-12 shrink-0 -rotate-6 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <MessageCircleHeart className="size-6" />
          </span>
          <p className="flex-1 text-lg font-extrabold sm:text-xl">{post.outro}</p>
          <Button asChild variant="paper" className="hidden shrink-0 sm:inline-flex">
            <a href="#comments">Comment</a>
          </Button>
        </div>
      )}

      <PostComments slug={post.slug} />

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild variant="pop" size="xl">
          <Link to="/match">Get AI picks for you</Link>
        </Button>
        <Button asChild variant="paper" size="xl">
          <Link to="/">More from Anime World Kenya</Link>
        </Button>
      </div>
    </article>
  );
}

function PostNotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="text-3xl">Post not found</h1>
      <p className="mt-3 font-semibold text-muted-foreground">This post may have moved. Try the homepage instead.</p>
      <Button asChild variant="pop" size="xl" className="mt-6">
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  );
}
