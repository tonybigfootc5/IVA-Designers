import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    received: true,
    provider: "PhonePe",
    event: body?.code ?? "unknown",
    nextStep: "Reconcile order status and update enrollment records.",
  });
}
