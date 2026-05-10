import { NextResponse } from "next/server";
import { createAdminModule, listAdminModuleOptions } from "@/lib/repositories/admin";
import { createModuleSchema } from "@/lib/validators/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const modules = await listAdminModuleOptions();

  return NextResponse.json({
    ok: true,
    modules,
  });
}

export async function POST(request: Request) {
  const payload = createModuleSchema.parse(await request.json());
  const courseModule = await createAdminModule(payload);

  return NextResponse.json({
    ok: true,
    module: courseModule,
  });
}
