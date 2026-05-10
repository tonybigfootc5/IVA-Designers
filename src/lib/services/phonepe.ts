import { envConfig } from "@/lib/env";
import type { CheckoutPayload } from "@/lib/services/commerce";

export async function createPhonePeCheckout(payload: CheckoutPayload, total: number) {
  if (!envConfig.phonePeMerchantId || !envConfig.phonePeSaltKey) {
    return {
      provider: "PhonePe",
      mode: "sandbox-placeholder",
      redirectUrl: `/pricing?checkout=demo&course=${payload.courseSlug}`,
      total,
    };
  }

  return {
    provider: "PhonePe",
    mode: "live-configured",
    redirectUrl: `/pricing?checkout=pending&course=${payload.courseSlug}`,
    total,
  };
}
