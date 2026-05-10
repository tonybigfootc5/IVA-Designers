"use client";

import { useState } from "react";

type AdminCourse = {
  title: string;
  status: string;
  enrollments: string;
  revenue: string;
};

type AdminLiveSession = {
  title: string;
  startsAt: string;
  state: string;
};

type CourseOption = {
  id: string;
  title: string;
};

type ModuleOption = {
  id: string;
  title: string;
  courseTitle: string;
};

type CouponSummary = {
  code: string;
  type: string;
  amount: string;
  status: string;
};

export function AdminOpsConsole({
  initialCourses,
  initialLiveSessions,
  initialCourseOptions,
  initialModuleOptions,
  initialCoupons,
}: {
  initialCourses: AdminCourse[];
  initialLiveSessions: AdminLiveSession[];
  initialCourseOptions: CourseOption[];
  initialModuleOptions: ModuleOption[];
  initialCoupons: CouponSummary[];
}) {
  const [courses, setCourses] = useState(initialCourses);
  const [liveSessions, setLiveSessions] = useState(initialLiveSessions);
  const [courseOptions, setCourseOptions] = useState(initialCourseOptions);
  const [moduleOptions, setModuleOptions] = useState(initialModuleOptions);
  const [coupons, setCoupons] = useState(initialCoupons);
  const [courseStatus, setCourseStatus] = useState<string | null>(null);
  const [liveStatus, setLiveStatus] = useState<string | null>(null);
  const [moduleStatus, setModuleStatus] = useState<string | null>(null);
  const [lessonStatus, setLessonStatus] = useState<string | null>(null);
  const [couponStatus, setCouponStatus] = useState<string | null>(null);
  const [courseForm, setCourseForm] = useState({
    title: "",
    slug: "",
    description: "",
    tagline: "",
    basePrice: "14999",
    bundlePrice: "",
    visibility: "DRAFT",
  });
  const [liveForm, setLiveForm] = useState({
    title: "",
    startsAt: "",
    muxLiveStreamId: "",
    muxPlaybackId: "",
  });
  const [moduleForm, setModuleForm] = useState({
    courseId: initialCourseOptions[0]?.id ?? "",
    title: "",
    position: "1",
  });
  const [lessonForm, setLessonForm] = useState({
    moduleId: initialModuleOptions[0]?.id ?? "",
    title: "",
    slug: "",
    lessonType: "VIDEO",
    position: "1",
    durationSeconds: "1200",
    vdoCipherVideoId: "",
    muxAssetId: "",
  });
  const [couponForm, setCouponForm] = useState({
    code: "BRIDAL10",
    couponType: "PERCENTAGE",
    amount: "10",
    activeFrom: "",
    activeUntil: "",
    maxRedemptions: "",
  });

  async function submitCourse() {
    setCourseStatus("Creating course...");
    const response = await fetch("/api/admin/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courseForm),
    });

    if (!response.ok) {
      setCourseStatus("Course creation failed.");
      return;
    }

    const payload = (await response.json()) as { course: { id?: string; title: string; visibility?: string } };
    setCourses((current) => [
      {
        title: payload.course.title,
        status: payload.course.visibility ?? courseForm.visibility,
        enrollments: "0",
        revenue: "₹0",
      },
      ...current,
    ]);
    setCourseOptions((current) => [
      { id: payload.course.id ?? `demo-course-${Date.now()}`, title: payload.course.title },
      ...current,
    ]);
    setCourseForm({
      title: "",
      slug: "",
      description: "",
      tagline: "",
      basePrice: "14999",
      bundlePrice: "",
      visibility: "DRAFT",
    });
    setCourseStatus("Course created.");
  }

  async function submitLiveSession() {
    setLiveStatus("Scheduling live session...");
    const response = await fetch("/api/admin/live-sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(liveForm),
    });

    if (!response.ok) {
      setLiveStatus("Live session scheduling failed.");
      return;
    }

    const payload = (await response.json()) as { liveSession: { title: string; startsAt: string } };
    setLiveSessions((current) => [
      {
        title: payload.liveSession.title,
        startsAt: new Date(payload.liveSession.startsAt).toLocaleString(),
        state: "Scheduled",
      },
      ...current,
    ]);
    setLiveForm({
      title: "",
      startsAt: "",
      muxLiveStreamId: "",
      muxPlaybackId: "",
    });
    setLiveStatus("Live session scheduled.");
  }

  async function submitModule() {
    setModuleStatus("Creating module...");
    const response = await fetch("/api/admin/modules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(moduleForm),
    });

    if (!response.ok) {
      setModuleStatus("Module creation failed.");
      return;
    }

    const payload = (await response.json()) as { module: { id?: string; title: string } };
    const parentCourse = courseOptions.find((course) => course.id === moduleForm.courseId);
    setModuleOptions((current) => [
      {
        id: payload.module.id ?? `demo-module-${Date.now()}`,
        title: payload.module.title,
        courseTitle: parentCourse?.title ?? "Selected course",
      },
      ...current,
    ]);
    setLessonForm((current) => ({
      ...current,
      moduleId: payload.module.id ?? current.moduleId,
    }));
    setModuleForm((current) => ({
      ...current,
      title: "",
      position: "1",
    }));
    setModuleStatus("Module created.");
  }

  async function submitLesson() {
    setLessonStatus("Creating lesson...");
    const response = await fetch("/api/admin/lessons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lessonForm),
    });

    if (!response.ok) {
      setLessonStatus("Lesson creation failed.");
      return;
    }

    await response.json();
    setLessonForm((current) => ({
      ...current,
      title: "",
      slug: "",
      position: "1",
      durationSeconds: "1200",
      vdoCipherVideoId: "",
      muxAssetId: "",
    }));
    setLessonStatus("Lesson created.");
  }

  async function submitCoupon() {
    setCouponStatus("Creating coupon...");
    const response = await fetch("/api/admin/coupons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(couponForm),
    });

    if (!response.ok) {
      setCouponStatus("Coupon creation failed.");
      return;
    }

    await response.json();
    setCoupons((current) => [
      {
        code: couponForm.code,
        type: couponForm.couponType,
        amount: couponForm.amount,
        status: couponForm.activeFrom ? "Scheduled" : "Active",
      },
      ...current,
    ]);
    setCouponForm({
      code: "BRIDAL10",
      couponType: "PERCENTAGE",
      amount: "10",
      activeFrom: "",
      activeUntil: "",
      maxRedemptions: "",
    });
    setCouponStatus("Coupon created.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-[1.75rem] border border-line bg-card p-5">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Create course</p>
        <div className="mt-5 grid gap-3">
          <input value={courseForm.title} onChange={(e) => setCourseForm((c) => ({ ...c, title: e.target.value }))} placeholder="Course title" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
          <input value={courseForm.slug} onChange={(e) => setCourseForm((c) => ({ ...c, slug: e.target.value }))} placeholder="course-slug" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
          <textarea value={courseForm.description} onChange={(e) => setCourseForm((c) => ({ ...c, description: e.target.value }))} placeholder="Description" className="min-h-24 rounded-[1.5rem] border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
          <input value={courseForm.tagline} onChange={(e) => setCourseForm((c) => ({ ...c, tagline: e.target.value }))} placeholder="Tagline" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
          <div className="grid gap-3 md:grid-cols-3">
            <input value={courseForm.basePrice} onChange={(e) => setCourseForm((c) => ({ ...c, basePrice: e.target.value }))} placeholder="Base price" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
            <input value={courseForm.bundlePrice} onChange={(e) => setCourseForm((c) => ({ ...c, bundlePrice: e.target.value }))} placeholder="Bundle price" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
            <select value={courseForm.visibility} onChange={(e) => setCourseForm((c) => ({ ...c, visibility: e.target.value }))} className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm text-foreground outline-none">
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <button onClick={submitCourse} className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-slate">Save course</button>
          <p className="text-sm text-muted">{courseStatus ?? "Creates a course and its starter module through the backend API."}</p>
        </div>
        <div className="mt-6 space-y-3">
          {courses.slice(0, 4).map((course) => (
            <div key={`${course.title}-${course.status}`} className="rounded-[1.25rem] border border-line bg-white/5 p-4">
              <p className="font-semibold text-foreground">{course.title}</p>
              <p className="mt-1 text-sm text-muted">{course.status} • {course.enrollments} enrollments • {course.revenue}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[1.75rem] border border-line bg-card p-5">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Schedule live class</p>
        <div className="mt-5 grid gap-3">
          <input value={liveForm.title} onChange={(e) => setLiveForm((c) => ({ ...c, title: e.target.value }))} placeholder="Live session title" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
          <input value={liveForm.startsAt} onChange={(e) => setLiveForm((c) => ({ ...c, startsAt: e.target.value }))} type="datetime-local" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none" />
          <input value={liveForm.muxLiveStreamId} onChange={(e) => setLiveForm((c) => ({ ...c, muxLiveStreamId: e.target.value }))} placeholder="Mux live stream id (optional)" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
          <input value={liveForm.muxPlaybackId} onChange={(e) => setLiveForm((c) => ({ ...c, muxPlaybackId: e.target.value }))} placeholder="Mux playback id (optional)" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
          <button onClick={submitLiveSession} className="rounded-full border border-gold/40 px-5 py-3 text-sm font-semibold text-gold-soft">Schedule session</button>
          <p className="text-sm text-muted">{liveStatus ?? "Creates a scheduled live session through the backend API."}</p>
        </div>
        <div className="mt-6 space-y-3">
          {liveSessions.slice(0, 4).map((session) => (
            <div key={`${session.title}-${session.startsAt}`} className="rounded-[1.25rem] border border-line bg-white/5 p-4">
              <p className="font-semibold text-foreground">{session.title}</p>
              <p className="mt-1 text-sm text-muted">{session.startsAt}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold">{session.state}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[1.75rem] border border-line bg-card p-5">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Structure catalog</p>
        <div className="mt-5 grid gap-6">
          <div className="grid gap-3">
            <select value={moduleForm.courseId} onChange={(e) => setModuleForm((c) => ({ ...c, courseId: e.target.value }))} className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm text-foreground outline-none">
              {courseOptions.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
            <input value={moduleForm.title} onChange={(e) => setModuleForm((c) => ({ ...c, title: e.target.value }))} placeholder="Module title" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
            <input value={moduleForm.position} onChange={(e) => setModuleForm((c) => ({ ...c, position: e.target.value }))} placeholder="Module position" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
            <button onClick={submitModule} className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-slate">Create module</button>
            <p className="text-sm text-muted">{moduleStatus ?? "Attach new modules to existing courses."}</p>
          </div>
          <div className="grid gap-3 border-t border-line/70 pt-6">
            <select value={lessonForm.moduleId} onChange={(e) => setLessonForm((c) => ({ ...c, moduleId: e.target.value }))} className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm text-foreground outline-none">
              {moduleOptions.map((module) => (
                <option key={module.id} value={module.id}>
                  {module.courseTitle} • {module.title}
                </option>
              ))}
            </select>
            <input value={lessonForm.title} onChange={(e) => setLessonForm((c) => ({ ...c, title: e.target.value }))} placeholder="Lesson title" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
            <div className="grid gap-3 md:grid-cols-3">
              <input value={lessonForm.slug} onChange={(e) => setLessonForm((c) => ({ ...c, slug: e.target.value }))} placeholder="lesson-slug" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
              <select value={lessonForm.lessonType} onChange={(e) => setLessonForm((c) => ({ ...c, lessonType: e.target.value }))} className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm text-foreground outline-none">
                <option value="VIDEO">Video</option>
                <option value="LIVE_REPLAY">Live replay</option>
                <option value="RESOURCE">Resource</option>
              </select>
              <input value={lessonForm.position} onChange={(e) => setLessonForm((c) => ({ ...c, position: e.target.value }))} placeholder="Lesson position" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <input value={lessonForm.durationSeconds} onChange={(e) => setLessonForm((c) => ({ ...c, durationSeconds: e.target.value }))} placeholder="Duration seconds" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
              <input value={lessonForm.vdoCipherVideoId} onChange={(e) => setLessonForm((c) => ({ ...c, vdoCipherVideoId: e.target.value }))} placeholder="VdoCipher video id" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
              <input value={lessonForm.muxAssetId} onChange={(e) => setLessonForm((c) => ({ ...c, muxAssetId: e.target.value }))} placeholder="Mux asset id" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
            </div>
            <button onClick={submitLesson} className="rounded-full border border-gold/40 px-5 py-3 text-sm font-semibold text-gold-soft">Create lesson</button>
            <p className="text-sm text-muted">{lessonStatus ?? "Create individual learning units with media identifiers."}</p>
          </div>
        </div>
      </div>
      <div className="rounded-[1.75rem] border border-line bg-card p-5 lg:col-span-2">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Coupons and offers</p>
        <div className="mt-5 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="grid gap-3">
            <input value={couponForm.code} onChange={(e) => setCouponForm((c) => ({ ...c, code: e.target.value.toUpperCase() }))} placeholder="Coupon code" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
            <div className="grid gap-3 md:grid-cols-3">
              <select value={couponForm.couponType} onChange={(e) => setCouponForm((c) => ({ ...c, couponType: e.target.value }))} className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm text-foreground outline-none">
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED">Fixed</option>
              </select>
              <input value={couponForm.amount} onChange={(e) => setCouponForm((c) => ({ ...c, amount: e.target.value }))} placeholder="Amount" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
              <input value={couponForm.maxRedemptions} onChange={(e) => setCouponForm((c) => ({ ...c, maxRedemptions: e.target.value }))} placeholder="Max redemptions" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted" />
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <input value={couponForm.activeFrom} onChange={(e) => setCouponForm((c) => ({ ...c, activeFrom: e.target.value }))} type="datetime-local" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none" />
              <input value={couponForm.activeUntil} onChange={(e) => setCouponForm((c) => ({ ...c, activeUntil: e.target.value }))} type="datetime-local" className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none" />
            </div>
            <button onClick={submitCoupon} className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-slate">Create coupon</button>
            <p className="text-sm text-muted">{couponStatus ?? "Manage flash sales, launch codes, and fixed-value offers."}</p>
          </div>
          <div className="grid gap-3">
            {coupons.slice(0, 6).map((coupon) => (
              <div key={`${coupon.code}-${coupon.status}`} className="rounded-[1.25rem] border border-line bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-foreground">{coupon.code}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-gold">{coupon.status}</p>
                </div>
                <p className="mt-2 text-sm text-muted">{coupon.type} • {coupon.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
