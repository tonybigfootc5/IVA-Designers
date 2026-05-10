import { PrismaClient, CourseVisibility, LessonType, OrderStatus, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@iva.local" },
    update: { role: UserRole.ADMIN, name: "IVA Admin" },
    create: {
      email: "admin@iva.local",
      name: "IVA Admin",
      phone: "9999999999",
      role: UserRole.ADMIN,
    },
  });

  const student = await prisma.user.upsert({
    where: { email: "student@iva.local" },
    update: { name: "IVA Student" },
    create: {
      email: "student@iva.local",
      name: "IVA Student",
      phone: "8888888888",
    },
  });

  const bridalCourse = await prisma.course.upsert({
    where: { slug: "bridal-mastery" },
    update: {
      title: "Bridal Artistry Mastery",
      description: "Flagship bridal artistry program with high-conversion client systems.",
      tagline: "Ceremony-ready looks for high-ticket bridal clients.",
      visibility: CourseVisibility.PUBLISHED,
      basePrice: 14999,
      bundlePrice: 21999,
    },
    create: {
      slug: "bridal-mastery",
      title: "Bridal Artistry Mastery",
      description: "Flagship bridal artistry program with high-conversion client systems.",
      tagline: "Ceremony-ready looks for high-ticket bridal clients.",
      visibility: CourseVisibility.PUBLISHED,
      basePrice: 14999,
      bundlePrice: 21999,
    },
  });

  const seedModule = await prisma.courseModule.upsert({
    where: { id: "seed-module-bridal-1" },
    update: {
      title: "Client Prep and Consultation",
      position: 1,
      courseId: bridalCourse.id,
    },
    create: {
      id: "seed-module-bridal-1",
      title: "Client Prep and Consultation",
      position: 1,
      courseId: bridalCourse.id,
    },
  });

  await prisma.lesson.upsert({
    where: { moduleId_slug: { moduleId: seedModule.id, slug: "consultation-framework" } },
    update: {
      title: "Consultation Framework",
      lessonType: LessonType.VIDEO,
      position: 1,
      durationSeconds: 1080,
    },
    create: {
      moduleId: seedModule.id,
      slug: "consultation-framework",
      title: "Consultation Framework",
      lessonType: LessonType.VIDEO,
      position: 1,
      durationSeconds: 1080,
    },
  });

  await prisma.lesson.upsert({
    where: { moduleId_slug: { moduleId: seedModule.id, slug: "longwear-bridal-base" } },
    update: {
      title: "Longwear Bridal Base",
      lessonType: LessonType.VIDEO,
      position: 2,
      durationSeconds: 1860,
    },
    create: {
      moduleId: seedModule.id,
      slug: "longwear-bridal-base",
      title: "Longwear Bridal Base",
      lessonType: LessonType.VIDEO,
      position: 2,
      durationSeconds: 1860,
    },
  });

  await prisma.enrollment.upsert({
    where: {
      userId_courseId: {
        userId: student.id,
        courseId: bridalCourse.id,
      },
    },
    update: {},
    create: {
      userId: student.id,
      courseId: bridalCourse.id,
    },
  });

  await prisma.order.create({
    data: {
      userId: student.id,
      provider: "PhonePe",
      amount: 14999,
      status: OrderStatus.PAID,
      couponCode: "BRIDAL10",
    },
  }).catch(() => undefined);

  await prisma.liveSession.create({
    data: {
      title: "Bridal Doubt Clinic",
      startsAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      muxLiveStreamId: "mux-live-seed-1",
      muxPlaybackId: "mux-playback-seed-1",
    },
  }).catch(() => undefined);

  console.log("Seed complete.");
  console.log(`Admin login target: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
