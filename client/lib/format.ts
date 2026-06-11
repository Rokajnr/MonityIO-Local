/**
 * Format an ISO date string as a human-readable date (e.g. "June 11, 2026").
 */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
