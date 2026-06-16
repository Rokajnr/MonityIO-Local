import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const secret =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ??
    request.nextUrl.searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const tag = request.nextUrl.searchParams.get("tag") ?? "articles";
  revalidateTag(tag, "max");

  return NextResponse.json({ revalidated: true, tag, now: Date.now() });
}
