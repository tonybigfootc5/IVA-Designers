import { NextResponse } from "next/server";
import { createAdminLesson } from "@/lib/repositories/admin";
import { createLessonSchema } from "@/lib/validators/admin";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const payload = createLessonSchema.parse(await request.json());
  const lesson = await createAdminLesson(payload);

  return NextResponse.json({
    ok: true,
    lesson,
  });
}
