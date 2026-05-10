import { db } from "@/lib/db";
import { dashboardOverview } from "@/lib/data/mock-platform";
import { envConfig } from "@/lib/env";

export async function getStudentDashboard(userId?: string | null) {
  if (!envConfig.databaseUrl || !userId) {
    return dashboardOverview;
  }

  const [user, enrollments, certificates, devices] = await Promise.all([
    db.user.findUnique({ where: { id: userId } }),
    db.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            modules: { include: { lessons: true } },
          },
        },
      },
    }),
    db.certificate.findMany({ where: { userId }, take: 3, orderBy: { issuedAt: "desc" } }),
    db.userDevice.findMany({ where: { userId, status: "ACTIVE" }, take: 1, orderBy: { updatedAt: "desc" } }),
  ]);

  return {
    learnerName: user?.name ?? "IVA Student",
    watermark: [user?.email, user?.phone].filter(Boolean).join(" • ") || dashboardOverview.watermark,
    metrics: [
      { label: "Completion", value: `${Math.round((enrollments.length / Math.max(enrollments.length, 1)) * 100)}%`, detail: "Across enrolled programs" },
      { label: "Continue Watching", value: `${enrollments.length} courses`, detail: "Resume from synced timestamps" },
      { label: "Certificates", value: `${certificates.length} unlocked`, detail: "Latest milestone awards" },
      { label: "Devices", value: `${devices.length} active`, detail: devices[0]?.cooldownUntil ? "Cooldown in effect" : "Playback ready" },
    ],
    continueWatching: enrollments.map((enrollment) => ({
      courseId: enrollment.course.id,
      title: enrollment.course.title,
      lessonCount: enrollment.course.modules.reduce((acc, module) => acc + module.lessons.length, 0),
      progressPercent: 35,
      nextLesson: enrollment.course.modules[0]?.lessons[0]?.title ?? "Start course",
    })),
    certificates: certificates.map((certificate) => ({
      id: certificate.id,
      title: certificate.templateKey,
      issuedAt: certificate.issuedAt.toDateString(),
    })),
    activeDevice: {
      label: devices[0] ? "Registered secure device" : "No trusted device yet",
      trustScore: devices[0]?.trustScore ?? 42,
      cooldownLabel: devices[0]?.cooldownUntil ? `Reset unlocks ${devices[0].cooldownUntil.toDateString()}` : "Reset available in 24 hours",
    },
  };
}
