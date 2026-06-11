/**
 * Skeleton Loader Component matching the ArticleCard size and structure.
 * Uses animation classes to create a shimmering skeleton loader.
 */
export function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm min-h-[220px] animate-pulse">
      <div className="space-y-4">
        {/* Date skeleton */}
        <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
        
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-5 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-5 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
        
        {/* Description skeleton */}
        <div className="space-y-2 pt-2">
          <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800/60 rounded" />
          <div className="h-3 w-11/12 bg-zinc-100 dark:bg-zinc-800/60 rounded" />
        </div>
      </div>
      
      {/* Link skeleton */}
      <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded mt-6" />
    </div>
  );
}

interface ArticleGridSkeletonProps {
  count?: number;
}

/**
 * Grid of ArticleCardSkeletons matching the ArticleGrid structure.
 */
export function ArticleGridSkeleton({ count = 6 }: ArticleGridSkeletonProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <ArticleCardSkeleton key={index} />
      ))}
    </div>
  );
}
