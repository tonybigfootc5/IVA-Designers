import { NextResponse } from "next/server";
import { createAdminLiveSession, listAdminLiveSessions } from "@/lib/repositories/admin";
import { createLiveSessionSchema } from "@/lib/validators/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const liveSessions = await listAdminLiveSessions();

  return NextResponse.json({
    ok: true,
    liveSessions,
  });
}

export async function POST(request: Request) {
  const payload = createLiveSessionSchema.parse(await request.json());
  const liveSession = await createAdminLiveSession(payload);

  return NextResponse.json({
    ok: true,
    liveSession,
  });
}
