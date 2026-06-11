import { Article } from "@/api/articles";
import { ArticleCard } from "./ArticleCard";

interface ArticleGridProps {
  articles: Article[];
}

export function ArticleGrid({ articles }: ArticleGridProps) {
  if (articles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-zinc-300 dark:border-zinc-800 rounded-3xl">
        <h3 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">No articles available</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">Publish some contents in your Strapi Admin panel.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.documentId} article={article} />
      ))}
    </div>
  );
}
