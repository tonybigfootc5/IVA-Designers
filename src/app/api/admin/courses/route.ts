import { NextResponse } from "next/server";
import { createAdminCourse, listAdminCourses } from "@/lib/repositories/admin";
import { createCourseSchema } from "@/lib/validators/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const courses = await listAdminCourses();

  return NextResponse.json({
    ok: true,
    courses,
  });
}

export async function POST(request: Request) {
  const payload = createCourseSchema.parse(await request.json());
  const course = await createAdminCourse(payload);

  return NextResponse.json({
    ok: true,
    course,
  });
}
