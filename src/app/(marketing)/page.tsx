import Link from "next/link";
import { ArrowRight, BadgeCheck, LockKeyhole, Smartphone } from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { SectionHeading } from "@/components/section-heading";
import { courseDetails, featuredCourses } from "@/lib/data/mock-platform";
import { formatCurrency } from "@/lib/utils";

export default function MarketingHomePage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-gold">Resonant Stark Learning Platform</p>
            <h1 className="mt-6 max-w-4xl font-display text-6xl leading-none text-balance text-foreground md:text-8xl">
              Secure premium fashion education built for scale, conversion, and retention.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">
              IVA combines SEO-first discovery, DRM-secured playback, PhonePe commerce, live classes, and a
              high-touch student journey designed for serious beauty professionals.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-slate transition hover:bg-gold-soft"
              >
                Browse flagship courses
              </Link>
              <Link
                href="/pricing"
                className="rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-gold-soft"
              >
                View launch pricing
              </Link>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-3">
              {[
                "Next.js 15 SSR + PWA",
                "Google SSO + OTP-ready auth",
                "VdoCipher watermark-secured playback",
              ].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-line bg-card p-4 text-sm text-muted">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-line bg-gold-mist p-6 shadow-glow">
            <div className="rounded-[1.5rem] border border-gold/20 bg-[#050b12]/90 p-6">
              <p className="text-sm uppercase tracking-[0.28em] text-gold">Launch Snapshot</p>
              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3">
                  <BadgeCheck className="mt-1 h-5 w-5 text-gold" />
                  <div>
                    <p className="font-semibold text-foreground">SEO-first public surfaces</p>
                    <p className="text-sm text-muted">Landing pages, previews, blog architecture, and metadata.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <LockKeyhole className="mt-1 h-5 w-5 text-gold" />
                  <div>
                    <p className="font-semibold text-foreground">Protected learning experiences</p>
                    <p className="text-sm text-muted">DRM, watermark overlays, progress sync, and device policy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Smartphone className="mt-1 h-5 w-5 text-gold" />
                  <div>
                    <p className="font-semibold text-foreground">App-like installability</p>
                    <p className="text-sm text-muted">PWA shell for frictionless mobile access outside app stores.</p>
                  </div>
                </div>
              </div>
              <div className="mt-10 rounded-[1.5rem] border border-gold/20 bg-gold/10 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">Bridal bundle launch</p>
                <p className="mt-2 font-display text-4xl text-gold-soft">{formatCurrency(21999)}</p>
                <p className="mt-2 text-sm text-muted">Includes flagship bridal mastery, templates, and certificate track.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Flagship Catalog"
          title="Courses shaped like premium products, not upload folders."
          body="Catalog, pricing, and lesson progression are modeled explicitly so commerce, student experience, and admin workflows stay coherent as the platform grows."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] border border-line bg-card p-8">
          <SectionHeading
            eyebrow="Student Experience"
            title="Progress, notes, resume queues, and lesson threads are first-class."
            body="IVA is structured for completion and retention, with timestamps, certificates, localized discussions, and device-aware playback controls."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {courseDetails.flatMap((course) => course.threads).slice(0, 2).map((thread) => (
              <div key={thread.id} className="rounded-[1.5rem] border border-line bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-gold">{thread.lesson}</p>
                <p className="mt-3 text-sm leading-7 text-muted">&quot;{thread.body}&quot;</p>
                <p className="mt-4 text-sm font-semibold text-foreground">{thread.author}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-line bg-card p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-gold">Launch sequence</p>
          <div className="mt-8 space-y-6">
            {[
              "Foundation: Next.js, SSR marketing, PWA shell, SEO and performance baseline.",
              "Commerce: auth, PhonePe checkout, VdoCipher protection, watermarking, discounts.",
              "Experience: continue watching, notes, progress, certificates, lesson discussions.",
              "Operations: Mux live classes, lean admin, device reset, observability layers.",
            ].map((step, index) => (
              <div key={step} className="flex items-start gap-4">
                <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 text-sm text-gold-soft">
                  {index + 1}
                </span>
                <p className="text-sm leading-7 text-muted">{step}</p>
              </div>
            ))}
          </div>
          <Link href="/dashboard" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-gold-soft">
            Explore the student shell <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
