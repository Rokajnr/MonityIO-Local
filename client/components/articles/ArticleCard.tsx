import Link from "next/link";
import { Article } from "@/api/articles";
import { formatDate } from "@/lib/format";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = formatDate(article.createdAt);

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div>
        <time className="text-xs text-zinc-400 dark:text-zinc-500 mb-3 block font-mono">
          {formattedDate}
        </time>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors mb-3 leading-snug">
          {article.title}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed mb-6">
          {article.description}
        </p>
      </div>
      
      <Link 
        href={`/articles/${article.slug}`}
        className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:gap-2 transition-all mt-auto"
      >
        Read Article <span className="transition-transform group-hover:translate-x-0.5">→</span>
      </Link>
    </article>
  );
}
