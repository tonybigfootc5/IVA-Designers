import { NextResponse } from "next/server";
import { normalizeMuxWebhook } from "@/lib/services/mux";

export async function POST(request: Request) {
  const body = await request.json();
  const normalizedState = normalizeMuxWebhook(body?.type ?? "unknown");

  return NextResponse.json({
    ok: true,
    normalizedState,
    nextStep: "Persist live session update and attach archive asset when ready.",
  });
}
