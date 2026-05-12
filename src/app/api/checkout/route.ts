import { NextResponse } from "next/server";
import { calculatePricing, checkoutSchema } from "@/lib/services/commerce";
import { createPhonePeCheckout } from "@/lib/services/phonepe";

export async function GET() {
  return NextResponse.json({
    ok: true,
    provider: "PhonePe",
    capabilities: ["UPI", "Cards", "Coupons", "Bundle pricing"],
  });
}

export async function POST(request: Request) {
  const payload = checkoutSchema.parse(await request.json());
  const pricing = calculatePricing(payload);
  const checkout = await createPhonePeCheckout(payload, pricing.total);

  return NextResponse.json({
    ok: true,
    pricing,
    checkout,
  });
}
