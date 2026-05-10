import Link from "next/link";
import { DeviceResetCard } from "@/components/device-reset-card";
import { MetricCard } from "@/components/metric-card";
import { VideoExperience } from "@/components/video-experience";
import { getServerAuthSession } from "@/lib/auth";
import { getStudentDashboard } from "@/lib/repositories/dashboard";

export const metadata = {
  title: "Student Dashboard",
  description: "Continue watching, track completion, and manage devices.",
};

export default async function DashboardPage() {
  const session = await getServerAuthSession();
  const overview = await getStudentDashboard(session?.user?.id);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-gold">Student Experience</p>
          <h1 className="mt-4 font-display text-5xl text-foreground">Resume exactly where you left off, {overview.learnerName}.</h1>
        </div>
        <Link href="/admin" className="text-sm font-semibold text-gold-soft">
          View admin surface
        </Link>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {overview.metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <VideoExperience title="Longwear Bridal Base" watermark={overview.watermark} />
        <div className="rounded-[2rem] border border-line bg-card p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Continue Watching</p>
          <div className="mt-6 space-y-4">
            {overview.continueWatching.map((course) => (
              <div key={course.courseId} className="rounded-[1.5rem] border border-line bg-white/5 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-foreground">{course.title}</p>
                    <p className="text-sm text-muted">{course.lessonCount} lessons • Next: {course.nextLesson}</p>
                  </div>
                  <span className="text-sm text-gold-soft">{course.progressPercent}%</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-white/5">
                  <div className="h-2 rounded-full bg-gold" style={{ width: `${course.progressPercent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <DeviceResetCard {...overview.activeDevice} />
        <div className="rounded-[2rem] border border-line bg-card p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-gold">Certificates</p>
          <div className="mt-6 space-y-4">
            {overview.certificates.map((certificate) => (
              <div key={certificate.id} className="rounded-[1.5rem] border border-line bg-white/5 p-4">
                <p className="font-semibold text-foreground">{certificate.title}</p>
                <p className="mt-2 text-sm text-muted">Issued {certificate.issuedAt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
