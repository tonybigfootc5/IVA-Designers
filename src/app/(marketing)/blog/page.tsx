import { blogPosts } from "@/lib/data/mock-platform";

export const metadata = {
  title: "Journal",
  description: "SEO-oriented articles and previews for IVA's fashion education platform.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-sm uppercase tracking-[0.28em] text-gold">Journal</p>
      <h1 className="mt-4 font-display text-5xl text-foreground md:text-6xl">Organic discovery built into the platform.</h1>
      <div className="mt-12 space-y-6">
        {blogPosts.map((post) => (
          <article key={post.slug} className="rounded-[2rem] border border-line bg-card p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-muted">{post.publishedAt}</p>
            <h2 className="mt-3 font-display text-3xl text-gold-soft">{post.title}</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
