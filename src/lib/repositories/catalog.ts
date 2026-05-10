import { db } from "@/lib/db";
import { envConfig } from "@/lib/env";
import { courseDetails, featuredCourses } from "@/lib/data/mock-platform";

export async function listCatalogCourses() {
  if (!envConfig.databaseUrl) {
    return featuredCourses;
  }

  const courses = await db.course.findMany({
    orderBy: { createdAt: "desc" },
    include: { modules: { include: { lessons: true } } },
  });

  return courses.map((course) => ({
    id: course.id,
    slug: course.slug,
    title: course.title,
    tagline: course.tagline ?? "Premium IVA learning track.",
    description: course.description,
    level: "Premium",
    duration: `${course.modules.reduce((acc, module) => acc + module.lessons.length, 0)} lessons`,
    price: course.basePrice,
    bundlePrice: course.bundlePrice ?? undefined,
    progress: 0,
    lessonCount: course.modules.reduce((acc, module) => acc + module.lessons.length, 0),
    moduleCount: course.modules.length,
    drmProtected: true,
    categories: ["IVA", "Protected"],
  }));
}

export async function getCatalogCourse(slug: string) {
  if (!envConfig.databaseUrl) {
    return courseDetails.find((course) => course.slug === slug) ?? null;
  }

  const course = await db.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { position: "asc" },
        include: {
          lessons: { orderBy: { position: "asc" } },
        },
      },
    },
  });

  if (!course) {
    return null;
  }

  const lessonCount = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);

  return {
    id: course.id,
    slug: course.slug,
    title: course.title,
    tagline: course.tagline ?? "Premium IVA learning track.",
    description: course.description,
    level: "Premium",
    duration: `${lessonCount} lessons`,
    price: course.basePrice,
    bundlePrice: course.bundlePrice ?? undefined,
    lessonCount,
    moduleCount: course.modules.length,
    drmProtected: true,
    categories: ["IVA", "Protected"],
    heroLessonTitle: course.modules[0]?.lessons[0]?.title ?? "Featured Lesson",
    modules: course.modules.map((module) => ({
      id: module.id,
      title: module.title,
      position: module.position,
      lessons: module.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        duration: lesson.durationSeconds ? `${Math.ceil(lesson.durationSeconds / 60)} min` : "20 min",
        type: lesson.lessonType,
      })),
    })),
    threads: [],
  };
}
