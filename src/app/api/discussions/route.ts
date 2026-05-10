import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerAuthSession } from "@/lib/auth";
import { createDiscussion } from "@/lib/repositories/community";

const discussionSchema = z.object({
  lessonId: z.string().min(1),
  body: z.string().min(3).max(1000),
});

export async function POST(request: Request) {
  const session = await getServerAuthSession();
  const body = discussionSchema.parse(await request.json());
  const thread = await createDiscussion({
    lessonId: body.lessonId,
    body: body.body,
    userId: session?.user?.id,
  });

  return NextResponse.json({
    ok: true,
    lessonId: body.lessonId,
    thread,
    message: "Thread message accepted for moderation pipeline.",
  });
}
