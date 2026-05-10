import { NextResponse } from "next/server";
import { getServerAuthSession } from "@/lib/auth";
import { requestDeviceReset } from "@/lib/repositories/devices";

export async function POST() {
  const session = await getServerAuthSession();
  const reset = await requestDeviceReset(session?.user?.id);

  return NextResponse.json({
    ok: true,
    ...reset,
  });
}
