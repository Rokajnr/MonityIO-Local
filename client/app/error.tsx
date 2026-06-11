"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Next.js Error Boundary caught an unhandled error:", error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[400px] px-6 text-center">
      <div className="max-w-md space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Something went wrong!
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          We encountered an unexpected error while loading this page. Please try reloading or check back later.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => reset()}
            className="flex h-10 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="flex h-10 items-center justify-center rounded-full border border-zinc-200 px-6 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
