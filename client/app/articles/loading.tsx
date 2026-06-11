import { ArticleGridSkeleton } from "@/components/articles/ArticleSkeleton";

export default function ArticlesLoading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">

        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-12 animate-pulse">
          <div>
            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded mb-2" />
            <div className="h-10 w-48 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-72 bg-zinc-200 dark:bg-zinc-800 rounded mt-3" />
          </div>
        </header>

        <ArticleGridSkeleton count={6} />

      </div>
    </div>
  );
}
