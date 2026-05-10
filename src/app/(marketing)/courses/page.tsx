import { CourseCard } from "@/components/course-card";
import { SectionHeading } from "@/components/section-heading";
import { listCatalogCourses } from "@/lib/repositories/catalog";

export const metadata = {
  title: "Courses",
  description: "Explore IVA programs across bridal, editorial, and salon business tracks.",
};

export default async function CoursesPage() {
  const courses = await listCatalogCourses();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Course Library"
        title="A premium catalog shaped for specialists, not casual viewers."
        body="Every course is designed around progression, enrollments, protected playback, and community discussion at the lesson level."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
