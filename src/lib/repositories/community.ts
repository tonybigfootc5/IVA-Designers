import { db } from "@/lib/db";
import { courseDetails } from "@/lib/data/mock-platform";
import { envConfig } from "@/lib/env";

export async function createDiscussion(input: { lessonId: string; body: string; userId?: string | null }) {
  if (!envConfig.databaseUrl || !input.userId) {
    return {
      id: `demo-${Date.now()}`,
      lessonId: input.lessonId,
      body: input.body,
      moderated: true,
    };
  }

  const lesson = await db.lesson.findFirst({
    where: {
      OR: [{ id: input.lessonId }, { slug: input.lessonId }],
    },
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  const thread = await db.discussionThread.create({
    data: {
      lessonId: lesson.id,
      userId: input.userId,
      body: input.body,
    },
  });

  return {
    id: thread.id,
    lessonId: thread.lessonId,
    body: thread.body,
    moderated: !thread.isFlagged,
  };
}

export async function listDiscussionPreview(courseSlug: string) {
  if (!envConfig.databaseUrl) {
    return courseDetails.find((course) => course.slug === courseSlug)?.threads ?? [];
  }

  const course = await db.course.findUnique({
    where: { slug: courseSlug },
    include: {
      modules: {
        include: {
          lessons: {
            include: {
              discussions: {
                include: { user: true },
                take: 6,
                orderBy: { createdAt: "desc" },
              },
            },
          },
        },
      },
    },
  });

  if (!course) {
    return [];
  }

  return course.modules.flatMap((module) =>
    module.lessons.flatMap((lesson) =>
      lesson.discussions.map((discussion) => ({
        id: discussion.id,
        author: discussion.user.name ?? "Student",
        lesson: lesson.title,
        body: discussion.body,
        createdAt: discussion.createdAt.toLocaleString(),
      })),
    ),
  );
}
