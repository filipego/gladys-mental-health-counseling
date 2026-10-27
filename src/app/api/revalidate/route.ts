import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST() {
  // Called by the Prismic publish webhook. Expire immediately so the next visit
  // to any page renders the newly published content instead of a stale copy.
  revalidateTag("prismic", { expire: 0 });

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
