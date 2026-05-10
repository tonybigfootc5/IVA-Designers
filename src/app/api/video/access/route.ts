import { NextResponse } from "next/server";
import { getPlaybackAuthorization } from "@/lib/services/vdocipher";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    videoId?: string;
    email?: string | null;
    phone?: string | null;
  };

  const auth = await getPlaybackAuthorization(body.videoId ?? "demo-video", {
    email: body.email,
    phone: body.phone,
  });

  return NextResponse.json(auth);
}
