import { CourseCard } from "@/components/course-card";
import { SectionHeading } from "@/components/section-heading";
import { listCatalogCourses } from "@/lib/repositories/catalog";

export const metadata = {
  title: "Courses",
  description: "See IVA stitching courses for beginners, blouse work, dresses, and party wear.",
};

export default async function CoursesPage() {
  const courses = await listCatalogCourses();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="All Courses"
        title="Pick the class that matches what you want to stitch."
        body="Start with basics, move into blouse work, or learn dresses and party wear. Everything is arranged in a simple way so choosing feels easy."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
