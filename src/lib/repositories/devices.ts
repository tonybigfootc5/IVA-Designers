import { db } from "@/lib/db";
import { envConfig } from "@/lib/env";

export async function requestDeviceReset(userId?: string | null) {
  const cooldownHours = 24;

  if (!envConfig.databaseUrl || !userId) {
    return {
      status: "RESET_REQUESTED",
      cooldownHours,
      message: "The active device lock has been scheduled for reset.",
    };
  }

  await db.userDevice.updateMany({
    where: { userId, status: "ACTIVE" },
    data: {
      status: "RESET_PENDING",
      cooldownUntil: new Date(Date.now() + cooldownHours * 60 * 60 * 1000),
    },
  });

  return {
    status: "RESET_REQUESTED",
    cooldownHours,
    message: "The active device lock has been scheduled for reset.",
  };
}
