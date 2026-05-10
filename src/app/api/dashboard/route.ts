import { NextResponse } from "next/server";
import { getServerAuthSession } from "@/lib/auth";
import { getStudentDashboard } from "@/lib/repositories/dashboard";

export async function GET() {
  const session = await getServerAuthSession();
  const overview = await getStudentDashboard(session?.user?.id);

  return NextResponse.json({
    ok: true,
    overview,
  });
}
