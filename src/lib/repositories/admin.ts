import { adminOverview } from "@/lib/data/mock-platform";
import { db } from "@/lib/db";
import { envConfig } from "@/lib/env";
import { formatCurrency } from "@/lib/utils";
import type { z } from "zod";
import {
  createCouponSchema,
  createCourseSchema,
  createLessonSchema,
  createLiveSessionSchema,
  createModuleSchema,
} from "@/lib/validators/admin";

export async function getAdminDashboard() {
  if (!envConfig.databaseUrl) {
    return adminOverview;
  }

  const [users, orders, courses, liveSessions, devices] = await Promise.all([
    db.user.count(),
    db.order.findMany(),
    db.course.findMany({ include: { enrollments: true } }),
    db.liveSession.findMany({ take: 5, orderBy: { startsAt: "asc" } }),
    db.userDevice.findMany({ where: { status: { in: ["RESET_PENDING", "BLOCKED"] } }, take: 5 }),
  ]);

  const revenue = orders.reduce((sum, order) => sum + order.amount, 0);

  return {
    metrics: [
      { label: "Gross Revenue", value: formatCurrency(revenue), detail: "Across all reconciled orders" },
      { label: "Active Students", value: String(users), detail: "Registered platform users" },
      { label: "Live Classes", value: String(liveSessions.length), detail: "Mux-backed sessions" },
      { label: "Flagged Threads", value: "0", detail: "No DB moderation queue yet" },
    ],
    courses: courses.map((course) => ({
      title: course.title,
      status: course.visibility,
      enrollments: String(course.enrollments.length),
      revenue: formatCurrency(course.basePrice * course.enrollments.length),
    })),
    liveSessions: liveSessions.map((session) => ({
      title: session.title,
      startsAt: session.startsAt.toLocaleString(),
      state: session.archivedLessonId ? "Archived" : "Scheduled",
    })),
    flaggedThreads: [],
    deviceAlerts: devices.map((device) => ({
      user: device.userId,
      state: device.status,
      detail: `Trust score ${device.trustScore}`,
    })),
  };
}

export async function listAdminCourses() {
  if (!envConfig.databaseUrl) {
    return adminOverview.courses;
  }

  const courses = await db.course.findMany({
    include: { enrollments: true },
    orderBy: { createdAt: "desc" },
  });

  return courses.map((course) => ({
    title: course.title,
    status: course.visibility,
    enrollments: String(course.enrollments.length),
    revenue: formatCurrency(course.basePrice * course.enrollments.length),
  }));
}

export async function listAdminLiveSessions() {
  if (!envConfig.databaseUrl) {
    return adminOverview.liveSessions;
  }

  const liveSessions = await db.liveSession.findMany({
    orderBy: { startsAt: "asc" },
    take: 10,
  });

  return liveSessions.map((session) => ({
    title: session.title,
    startsAt: session.startsAt.toLocaleString(),
    state: session.archivedLessonId ? "Archived" : "Scheduled",
  }));
}

export async function createAdminCourse(input: z.infer<typeof createCourseSchema>) {
  if (!envConfig.databaseUrl) {
    return {
      id: `demo-course-${Date.now()}`,
      ...input,
    };
  }

  const course = await db.course.create({
    data: {
      title: input.title,
      slug: input.slug,
      description: input.description,
      tagline: input.tagline,
      basePrice: input.basePrice,
      bundlePrice: input.bundlePrice,
      visibility: input.visibility,
    },
  });

  await db.courseModule.create({
    data: {
      courseId: course.id,
      title: "Getting Started",
      position: 1,
    },
  });

  return course;
}

export async function createAdminLiveSession(input: z.infer<typeof createLiveSessionSchema>) {
  if (!envConfig.databaseUrl) {
    return {
      id: `demo-live-${Date.now()}`,
      ...input,
    };
  }

  return db.liveSession.create({
    data: {
      title: input.title,
      startsAt: new Date(input.startsAt),
      muxLiveStreamId: input.muxLiveStreamId || null,
      muxPlaybackId: input.muxPlaybackId || null,
    },
  });
}

export async function listAdminCourseOptions() {
  if (!envConfig.databaseUrl) {
    return [
      { id: "course-bridal-mastery", title: "Bridal Artistry Mastery" },
      { id: "course-editorial-core", title: "Editorial Core Lab" },
      { id: "course-salon-scale", title: "Salon Scale Systems" },
    ];
  }

  const courses = await db.course.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true },
  });

  return courses;
}

export async function listAdminModuleOptions() {
  if (!envConfig.databaseUrl) {
    return [
      { id: "mod-1", title: "Client Prep and Consultation", courseTitle: "Bridal Artistry Mastery" },
      { id: "mod-2", title: "Signature Bridal Finishes", courseTitle: "Bridal Artistry Mastery" },
      { id: "mod-3", title: "Creative Direction", courseTitle: "Editorial Core Lab" },
    ];
  }

  const modules = await db.courseModule.findMany({
    include: { course: { select: { title: true } } },
    orderBy: [{ course: { title: "asc" } }, { position: "asc" }],
  });

  return modules.map((module) => ({
    id: module.id,
    title: module.title,
    courseTitle: module.course.title,
  }));
}

export async function listAdminCoupons() {
  if (!envConfig.databaseUrl) {
    return [
      { code: "BRIDAL10", type: "PERCENTAGE", amount: "10", status: "Active" },
      { code: "BUNDLE1500", type: "FIXED", amount: "1500", status: "Scheduled" },
    ];
  }

  const coupons = await db.coupon.findMany({
    orderBy: { code: "asc" },
    take: 20,
  });

  const now = Date.now();

  return coupons.map((coupon) => ({
    code: coupon.code,
    type: coupon.couponType,
    amount: String(coupon.amount),
    status:
      coupon.activeUntil && coupon.activeUntil.getTime() < now
        ? "Expired"
        : coupon.activeFrom && coupon.activeFrom.getTime() > now
          ? "Scheduled"
          : "Active",
  }));
}

export async function createAdminModule(input: z.infer<typeof createModuleSchema>) {
  if (!envConfig.databaseUrl) {
    return {
      id: `demo-module-${Date.now()}`,
      ...input,
    };
  }

  return db.courseModule.create({
    data: {
      courseId: input.courseId,
      title: input.title,
      position: input.position,
    },
  });
}

export async function createAdminLesson(input: z.infer<typeof createLessonSchema>) {
  if (!envConfig.databaseUrl) {
    return {
      id: `demo-lesson-${Date.now()}`,
      ...input,
    };
  }

  return db.lesson.create({
    data: {
      moduleId: input.moduleId,
      title: input.title,
      slug: input.slug,
      lessonType: input.lessonType,
      position: input.position,
      durationSeconds: input.durationSeconds ?? null,
      vdoCipherVideoId: input.vdoCipherVideoId || null,
      muxAssetId: input.muxAssetId || null,
    },
  });
}

export async function createAdminCoupon(input: z.infer<typeof createCouponSchema>) {
  if (!envConfig.databaseUrl) {
    return {
      id: `demo-coupon-${Date.now()}`,
      ...input,
    };
  }

  return db.coupon.create({
    data: {
      code: input.code,
      couponType: input.couponType,
      amount: input.amount,
      activeFrom: input.activeFrom ? new Date(input.activeFrom) : null,
      activeUntil: input.activeUntil ? new Date(input.activeUntil) : null,
      maxRedemptions: input.maxRedemptions ?? null,
    },
  });
}
