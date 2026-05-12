import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Play,
  Ruler,
  Scissors,
  Shirt,
  Sparkles,
  Trophy,
} from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { SectionHeading } from "@/components/section-heading";
import { featuredCourses } from "@/lib/data/mock-platform";

const atelierFeatures = [
  {
    icon: Ruler,
    title: "Perfect Measuring",
    body: "Learn how to take body measurements the right way and make clothes that fit well from the start.",
  },
  {
    icon: Shirt,
    title: "Beautiful Stitching",
    body: "Learn blouse, sleeve, dress, and party wear stitching in a simple step-by-step way.",
  },
  {
    icon: Scissors,
    title: "Neat Final Finish",
    body: "Learn lining, hemming, shaping, and clean finishing so every dress looks tidy and professional.",
  },
];

const courseCollections = [
  { name: "Advanced Draping", progress: "82%" },
  { name: "Bridal Wear", progress: "64%" },
  { name: "Luxury Blouse Craft", progress: "91%" },
  { name: "Finishing Discipline", progress: "58%" },
];

const curriculumMoments = [
  "Measurement Techniques",
  "Sewing Tools & Uses",
  "Blouse Designing & Stitching",
  "Sleeve Designing",
  "Dress Designing",
  "Baby Girl Wear",
  "Lehengas",
  "Bottom Wear",
  "Finishing & Fittings",
];

const outcomes = [
  "Easy for beginners",
  "From first stitch to final finish",
  "Learn from home with confidence",
];

export default function MarketingHomePage() {
  return (
    <div className="pb-10">
      <section className="mx-auto max-w-7xl px-6 pb-14 pt-10 md:pt-14">
        <div className="relative overflow-hidden rounded-[2.9rem] border border-white/10 bg-[linear-gradient(145deg,rgba(11,19,30,0.96),rgba(5,10,18,0.92))] px-6 py-8 shadow-glow md:px-10 md:py-10 lg:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(243,223,176,0.14),transparent_24%),radial-gradient(circle_at_80%_18%,rgba(255,255,255,0.06),transparent_18%)]" />
          <div className="absolute inset-y-0 right-[-14%] hidden w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(194,168,126,0.12),transparent_70%)] blur-3xl lg:block" />

          <div className="relative grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div className="max-w-xl">
              <div className="liquid-glass glass-panel inline-flex rounded-full px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.34em] text-gold-soft">Premium Tailoring Classes</p>
                  <p className="mt-1 text-sm text-white/68">Simple learning for women who want real stitching skills.</p>
                </div>
              </div>

              <h1 className="mt-8 font-display text-5xl leading-[0.9] md:text-7xl">
                <span className="block text-foreground">Learn stitching that</span>
                <span className="mt-2 block text-gold-soft">looks rich, neat, and smart.</span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-8 text-white/78 md:text-lg">
                IVA Designer&apos;s Cult helps you learn tailoring in a simple way. From measuring to cutting to final
                stitching, every lesson is made to help you understand fast and create beautiful clothes with confidence.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/courses"
                  className="rounded-full bg-[linear-gradient(180deg,#f1ddb3,#c2a87e)] px-7 py-3 text-sm font-semibold text-[#131c27] transition hover:brightness-105"
                >
                  See all courses
                </Link>
                <Link
                  href="/pricing"
                  className="liquid-glass glass-panel rounded-full px-7 py-3 text-sm font-semibold text-gold-soft"
                >
                  Check fees
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {outcomes.map((item) => (
                  <div key={item} className="glass-panel liquid-glass rounded-[1.4rem] px-4 py-4 text-sm leading-6 text-white/78">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="melt-frame relative overflow-hidden rounded-[2.7rem]">
                <div className="absolute inset-0 z-20 melt-vignette" />
                <video autoPlay loop muted playsInline className="h-[28rem] w-full object-cover md:h-[38rem]">
                  <source src="/brand/hero-reel.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(5,10,18,0.28)_70%)]" />
                <button
                  type="button"
                  aria-label="Play showcase reel"
                  className="liquid-glass glass-panel absolute left-1/2 top-1/2 z-30 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 text-gold-soft"
                >
                  <Play className="ml-1 h-8 w-8 fill-current" />
                </button>
                <div className="absolute inset-x-6 bottom-6 z-30">
                  <div className="glass-panel liquid-glass rounded-[1.8rem] p-5 md:p-6">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="text-xs uppercase tracking-[0.34em] text-gold-soft">Masterclass Reel</p>
                        <p className="mt-3 max-w-md font-display text-3xl leading-tight text-foreground">
                          Watch how cloth becomes a beautiful dress, one smart cut at a time.
                        </p>
                      </div>
                      <Sparkles className="mt-1 hidden h-5 w-5 shrink-0 text-gold-soft md:block" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -bottom-8 left-8 right-8 hidden h-24 rounded-full bg-[radial-gradient(circle,rgba(194,168,126,0.16),transparent_70%)] blur-2xl md:block" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeading
              eyebrow="Why People Love IVA"
              title="Easy to follow. Beautiful to watch. Powerful to learn."
              body="Everything is arranged in a clear and stylish way, so students can focus on learning stitching without feeling lost or confused."
            />

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {atelierFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article key={feature.title} className="glass-panel liquid-glass rounded-[2rem] p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10">
                      <Icon className="h-5 w-5 text-gold-soft" />
                    </div>
                    <h3 className="mt-6 font-display text-3xl leading-tight text-foreground">{feature.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-white/72">{feature.body}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="glass-panel liquid-glass rounded-[2.4rem] p-7 md:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Popular Classes</p>
            <h2 className="mt-5 font-display text-4xl leading-tight text-foreground">
              Top lessons people want to learn first.
            </h2>
            <div className="mt-8 space-y-6">
              {courseCollections.map((collection) => (
                <div key={collection.name}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm uppercase tracking-[0.18em] text-white/78">{collection.name}</p>
                    <p className="text-xs tracking-[0.2em] text-gold-soft">{collection.progress}</p>
                  </div>
                  <div className="mt-3 h-px bg-white/10">
                    <div className="gold-progress h-px" style={{ width: collection.progress }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-[1.8rem] border border-white/10 bg-black/20 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-gold-soft">Our Promise</p>
              <p className="mt-3 text-sm leading-7 text-white/74">
                Every lesson is shown in a clean and attractive way, so learning feels easy, premium, and enjoyable.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="glass-panel liquid-glass rounded-[2.5rem] p-8 md:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Main Course</p>
            <h2 className="mt-5 max-w-3xl font-display text-5xl leading-tight text-foreground md:text-6xl">
              The best starting course for anyone who wants to learn stitching from zero.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
              This course starts with the basics and takes you slowly into blouses, sleeves, dresses, kids wear,
              lehengas, bottom wear, and neat finishing. It is simple to follow and packed with useful skills.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {curriculumMoments.map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-gold-soft" />
                    <span className="text-sm text-white/76">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-gold/15 bg-[linear-gradient(155deg,rgba(194,168,126,0.14),rgba(8,14,24,0.94)_36%,rgba(8,14,24,0.98))] p-8 shadow-glow md:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">What You Get</p>
            <div className="mt-10 space-y-8">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-6xl text-gold-soft">13</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.26em] text-white/48">Easy learning topics</p>
                </div>
                <div className="liquid-glass glass-panel flex h-14 w-14 items-center justify-center rounded-2xl">
                  <Trophy className="h-5 w-5 text-gold-soft" />
                </div>
              </div>
              <div>
                <p className="font-display text-4xl text-foreground">From body measuring to final finishing.</p>
                <p className="mt-4 text-sm leading-7 text-white/82">
                  You will learn drafting, cutting, stitching order, lining, sleeve joining, fitting correction,
                  hemming, hook setting, ironing, and the neat finish that people notice right away.
                </p>
              </div>
              <div className="glass-panel liquid-glass rounded-[1.7rem] p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-gold-soft">Result</p>
                <p className="mt-3 text-sm leading-7 text-white/84">
                  After learning, you can take measurements well, make blouse patterns, stitch neatly, try new designs,
                  and even start small tailoring work with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <SectionHeading
          eyebrow="Top Courses"
          title="Courses made simple, stylish, and easy to choose."
          body="Pick the course that matches what you want to learn first, whether it is basic tailoring, blouse work, or dress and lehenga stitching."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 overflow-hidden rounded-[2.8rem] border border-white/10 bg-[linear-gradient(140deg,rgba(10,19,30,0.98),rgba(5,10,18,0.98))] p-6 shadow-glow lg:grid-cols-[0.82fr_1.18fr] lg:p-8">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-gold/15 bg-[#0a1419]">
            <Image
              src="/brand/owner-tony.jpg"
              alt="Founder portrait"
              width={1316}
              height={1958}
              className="h-full min-h-[420px] w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(7,16,25,0.94)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="glass-panel liquid-glass rounded-[1.7rem] p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-gold">Designer & Master</p>
                <p className="mt-2 text-sm leading-7 text-white/82">
                  Teaching built on patience, neat work, and the kind of finishing that makes clothes look valuable.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-[2.2rem] border border-white/8 bg-white/[0.03] p-6 lg:p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">About Bobby John</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-foreground md:text-5xl">
              Bobby John teaches stitching in a way that is simple to learn and beautiful to see.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-8 text-white/74">
              <p>
                Bobby John does not teach in a rushed or confusing way. The focus is on clear steps, proper fitting,
                neat lines, and clean finishing.
              </p>
              <p>
                That is what makes IVA special. Students do not just watch videos. They learn how to notice mistakes,
                fix them, improve their work, and stitch with more confidence.
              </p>
              <p>
                The result is a learning space that feels warm, clear, and inspiring, not crowded or hard to understand.
              </p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {outcomes.map((item) => (
                <div key={item} className="glass-panel liquid-glass rounded-[1.35rem] p-4 text-sm leading-7 text-white/82">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-8">
        <div className="glass-panel liquid-glass rounded-[2.6rem] px-6 py-8 md:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.28em] text-gold">Start Today</p>
              <h2 className="mt-4 font-display text-4xl text-foreground md:text-5xl">
                Learn from home. Stitch with style. Build clothes people love.
              </h2>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-gold-soft transition hover:bg-gold/10"
            >
              See all courses <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
