import Link from "next/link";
import { getArticles } from "@/api/articles";
import { ArticleGrid } from "@/components/articles/ArticleGrid";

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-12">
          <div>
            <Link
              href="/"
              className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors flex items-center gap-1 mb-2"
            >
              ← Back to Home
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-50 dark:to-zinc-400">
              Articles
            </h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Explore the latest stories and insights from the Strapi backend.
            </p>
          </div>
        </header>

        {/* Content list */}
        <ArticleGrid articles={articles} />

      </div>
    </div>
  );
}
