import { NextResponse } from "next/server";
import { getAdminDashboard } from "@/lib/repositories/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const overview = await getAdminDashboard();

  return NextResponse.json({
    ok: true,
    overview,
  });
}
