import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getArticles, getArticleBySlug } from "@/api/articles";
import { formatDate } from "@/lib/format";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Generate Dynamic Metadata for SEO
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (article) {
    return {
      title: `${article.title} | Monityio Blog`,
      description: article.description || "Read our latest article",
    };
  }

  return {
    title: "Article Not Found | Monityio Blog",
  };
}

/**
 * Pre-render known article slugs at build time.
 */
export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const formattedDate = formatDate(article.createdAt);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">

        {/* Back navigation */}
        <Link
          href="/articles"
          className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors flex items-center gap-1 mb-8"
        >
          ← Back to Articles
        </Link>

        {/* Main Article Section */}
        <article className="space-y-6">
          <header className="space-y-3">
            <time className="text-sm font-mono text-zinc-400 dark:text-zinc-500">
              Published on {formattedDate}
            </time>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl text-zinc-900 dark:text-zinc-50 leading-tight">
              {article.title}
            </h1>
            <div className="h-1 w-20 bg-zinc-900 dark:bg-zinc-50 rounded" />
          </header>

          <section className="prose prose-zinc dark:prose-invert max-w-none pt-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p className="whitespace-pre-wrap">{article.description}</p>
          </section>
        </article>

      </div>
    </div>
  );
}
