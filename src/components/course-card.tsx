import Link from "next/link";
import { Layers3, TvMinimalPlay } from "lucide-react";
import type { CourseSummary } from "@/lib/data/mock-platform";
import { formatCurrency } from "@/lib/utils";

export function CourseCard({ course }: { course: CourseSummary }) {
  return (
    <article className="glass-panel liquid-glass rounded-[2rem] p-6 shadow-glow">
      <div className="flex items-center justify-between">
        <span className="rounded-full border border-gold/25 bg-white/[0.04] px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold-soft">
          {course.level}
        </span>
        <span className="text-sm text-white/60">{course.duration}</span>
      </div>
      <h3 className="mt-6 font-display text-3xl text-foreground">{course.title}</h3>
      <p className="mt-2 text-sm uppercase tracking-[0.18em] text-gold">{course.tagline}</p>
      <p className="mt-4 text-sm leading-7 text-white/72">{course.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {course.categories.map((category) => (
          <span key={category} className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-xs text-white/62">
            {category}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-4 text-sm text-white/62">
        <span className="flex items-center gap-2">
          <TvMinimalPlay className="h-4 w-4 text-gold" />
          {course.lessonCount} lessons
        </span>
        <span className="flex items-center gap-2">
          <Layers3 className="h-4 w-4 text-gold" />
          {course.moduleCount} modules
        </span>
      </div>
      <div className="mt-8 flex items-end justify-between">
        <div>
          <p className="text-sm text-white/56">Fee</p>
          <p className="font-display text-3xl text-gold-soft">{formatCurrency(course.price)}</p>
        </div>
        <Link
          href={`/learn/${course.slug}`}
          className="rounded-full border border-gold/40 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-gold-soft transition hover:bg-gold/10"
        >
          See course
        </Link>
      </div>
    </article>
  );
}
