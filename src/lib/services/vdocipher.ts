import { envConfig } from "@/lib/env";

export function buildWatermarkPayload(user: { email?: string | null; phone?: string | null }) {
  return {
    overlayText: [user.email, user.phone].filter(Boolean).join(" • "),
    movement: "floating-diagonal",
    opacity: 0.2,
  };
}

export async function getPlaybackAuthorization(videoId: string, user: { email?: string | null; phone?: string | null }) {
  return {
    provider: "VdoCipher",
    configured: Boolean(envConfig.vdoCipherSecret),
    videoId,
    otp: envConfig.vdoCipherSecret ? "signed-otp-placeholder" : "demo-otp",
    playbackInfo: envConfig.vdoCipherSecret ? "signed-playback-placeholder" : "demo-playback",
    watermark: buildWatermarkPayload(user),
  };
}
