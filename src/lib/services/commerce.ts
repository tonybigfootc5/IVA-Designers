import { z } from "zod";

export const checkoutSchema = z.object({
  courseSlug: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  couponCode: z.string().optional(),
});

export type CheckoutPayload = z.infer<typeof checkoutSchema>;

export type PricingBreakdown = {
  subtotal: number;
  discount: number;
  total: number;
  appliedCoupon?: string;
};

export function calculatePricing(payload: CheckoutPayload): PricingBreakdown {
  const subtotal = payload.courseSlug === "bridal-mastery" ? 14999 : 9999;
  const appliedCoupon = payload.couponCode?.toUpperCase();
  const discount = appliedCoupon === "BRIDAL10" ? Math.round(subtotal * 0.1) : 0;

  return {
    subtotal,
    discount,
    total: subtotal - discount,
    appliedCoupon,
  };
}
