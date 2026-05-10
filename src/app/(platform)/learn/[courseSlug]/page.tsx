import { CourseCurriculum } from "@/components/course-curriculum";
import { DiscussionPanel } from "@/components/discussion-panel";
import { notFound } from "next/navigation";
import { VideoExperience } from "@/components/video-experience";
import { listCatalogCourses, getCatalogCourse } from "@/lib/repositories/catalog";
import { listDiscussionPreview } from "@/lib/repositories/community";
import { formatCurrency } from "@/lib/utils";

type Props = {
  params: Promise<{ courseSlug: string }>;
};

export async function generateStaticParams() {
  const courses = await listCatalogCourses();
  return courses.map((course) => ({ courseSlug: course.slug }));
}

export default async function CourseDetailPage({ params }: Props) {
  const { courseSlug } = await params;
  const course = await getCatalogCourse(courseSlug);

  if (!course) {
    notFound();
  }

  const threads = await listDiscussionPreview(courseSlug);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-gold">{course.level} track</p>
          <h1 className="mt-4 font-display text-6xl text-foreground">{course.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{course.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {course.categories.map((category) => (
              <span key={category} className="rounded-full border border-line px-4 py-2 text-sm text-muted">
                {category}
              </span>
            ))}
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-line bg-card p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">Price</p>
              <p className="mt-3 font-display text-3xl text-gold-soft">{formatCurrency(course.price)}</p>
            </div>
            <div className="rounded-[1.5rem] border border-line bg-card p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">Modules</p>
              <p className="mt-3 font-display text-3xl text-gold-soft">{course.moduleCount}</p>
            </div>
            <div className="rounded-[1.5rem] border border-line bg-card p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">Device Policy</p>
              <p className="mt-3 font-display text-3xl text-gold-soft">1 active</p>
            </div>
          </div>
        </div>
        <VideoExperience title={course.heroLessonTitle} watermark="student@iva • +91 9876543210" />
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <CourseCurriculum modules={course.modules} />
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-line bg-card p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Lesson Features</p>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-muted">
            <li>Protected VdoCipher playback with floating watermark payloads.</li>
            <li>Continue watching and per-lesson progress syncing.</li>
            <li>Timestamped notes and immersive fullscreen controls.</li>
            <li>Localized lesson threads and moderation-ready discussion records.</li>
          </ul>
        </div>
          <DiscussionPanel lessonId={course.heroLessonTitle} initialThreads={threads} />
        </div>
      </div>
    </div>
  );
}
