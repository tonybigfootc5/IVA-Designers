import { db } from "@/lib/db";
import { envConfig } from "@/lib/env";

type LinkedUser = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  role: "STUDENT" | "ADMIN";
};

export async function syncOAuthUser(profile: {
  email?: string | null;
  name?: string | null;
  image?: string | null;
}): Promise<LinkedUser> {
  if (!envConfig.databaseUrl) {
    return {
      id: "demo-google-user",
      name: profile.name ?? "IVA Student",
      email: profile.email,
      phone: null,
      role: "STUDENT",
    };
  }

  const user = await db.user.upsert({
    where: { email: profile.email ?? "" },
    create: {
      name: profile.name ?? "IVA Student",
      email: profile.email,
      avatarUrl: profile.image,
    },
    update: {
      name: profile.name ?? undefined,
      avatarUrl: profile.image ?? undefined,
    },
  });

  return {
    id: user.id,
    name: user.name ?? "IVA Student",
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
}

export async function verifyOtpUser(phone: string, otp: string): Promise<LinkedUser | null> {
  const isDemoPass = envConfig.isDemoAuthEnabled && otp === "123456";
  if (!isDemoPass && process.env.NODE_ENV !== "production") {
    return null;
  }

  if (!envConfig.databaseUrl) {
    return {
      id: "demo-otp-user",
      name: "IVA Mobile Student",
      email: "demo@student.iva",
      phone,
      role: "STUDENT",
    };
  }

  const user = await db.user.upsert({
    where: { phone },
    create: {
      name: "IVA Mobile Student",
      phone,
    },
    update: {},
  });

  return {
    id: user.id,
    name: user.name ?? "IVA Mobile Student",
    email: user.email,
    phone: user.phone,
    role: user.role,
  };
}
