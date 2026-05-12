import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(3),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/),
  description: z.string().min(12),
  tagline: z.string().min(6),
  basePrice: z.coerce.number().int().nonnegative(),
  bundlePrice: z.coerce.number().int().nonnegative().optional(),
  visibility: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
});

export const createLiveSessionSchema = z.object({
  title: z.string().min(3),
  startsAt: z.string().min(1),
  muxLiveStreamId: z.string().optional(),
  muxPlaybackId: z.string().optional(),
});

export const createModuleSchema = z.object({
  courseId: z.string().min(1),
  title: z.string().min(3),
  position: z.coerce.number().int().positive(),
});

export const createLessonSchema = z.object({
  moduleId: z.string().min(1),
  title: z.string().min(3),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/),
  lessonType: z.enum(["VIDEO", "LIVE_REPLAY", "RESOURCE"]),
  position: z.coerce.number().int().positive(),
  durationSeconds: z.coerce.number().int().nonnegative().optional(),
  vdoCipherVideoId: z.string().optional(),
  muxAssetId: z.string().optional(),
});

export const createCouponSchema = z.object({
  code: z
    .string()
    .min(4)
    .regex(/^[A-Z0-9_-]+$/),
  couponType: z.enum(["PERCENTAGE", "FIXED"]),
  amount: z.coerce.number().int().positive(),
  activeFrom: z.string().optional(),
  activeUntil: z.string().optional(),
  maxRedemptions: z.coerce.number().int().positive().optional(),
});
