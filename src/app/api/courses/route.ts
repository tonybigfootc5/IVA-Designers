import { NextResponse } from "next/server";
import { listCatalogCourses } from "@/lib/repositories/catalog";

export async function GET() {
  const courses = await listCatalogCourses();

  return NextResponse.json({
    ok: true,
    courses,
  });
}
