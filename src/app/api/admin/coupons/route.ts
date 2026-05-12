import { NextResponse } from "next/server";
import { createAdminCoupon, listAdminCoupons } from "@/lib/repositories/admin";
import { createCouponSchema } from "@/lib/validators/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const coupons = await listAdminCoupons();

  return NextResponse.json({
    ok: true,
    coupons,
  });
}

export async function POST(request: Request) {
  const payload = createCouponSchema.parse(await request.json());
  const coupon = await createAdminCoupon(payload);

  return NextResponse.json({
    ok: true,
    coupon,
  });
}
