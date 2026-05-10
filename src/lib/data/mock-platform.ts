export type ThreadPreview = {
  id: string;
  author: string;
  lesson: string;
  body: string;
  createdAt: string;
  flagged?: boolean;
};

export type LessonPreview = {
  id: string;
  title: string;
  duration: string;
  type: "VIDEO" | "LIVE_REPLAY" | "RESOURCE";
  progressPercent?: number;
};

export type ModulePreview = {
  id: string;
  title: string;
  position: number;
  lessons: LessonPreview[];
};

export type CourseSummary = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  level: string;
  duration: string;
  price: number;
  bundlePrice?: number;
  progress?: number;
  lessonCount: number;
  moduleCount: number;
  drmProtected: boolean;
  categories: string[];
};

export type CourseDetail = CourseSummary & {
  heroLessonTitle: string;
  modules: ModulePreview[];
  threads: ThreadPreview[];
};

export type DashboardOverview = {
  learnerName: string;
  watermark: string;
  metrics: Array<{ label: string; value: string; detail: string }>;
  continueWatching: Array<{
    courseId: string;
    title: string;
    lessonCount: number;
    progressPercent: number;
    nextLesson: string;
  }>;
  certificates: Array<{
    id: string;
    title: string;
    issuedAt: string;
  }>;
  activeDevice: {
    label: string;
    trustScore: number;
    cooldownLabel: string;
  };
};

export type AdminOverview = {
  metrics: Array<{ label: string; value: string; detail: string }>;
  courses: Array<{ title: string; status: string; enrollments: string; revenue: string }>;
  liveSessions: Array<{ title: string; startsAt: string; state: string }>;
  flaggedThreads: ThreadPreview[];
  deviceAlerts: Array<{ user: string; state: string; detail: string }>;
};

export const featuredCourses: CourseSummary[] = [
  {
    id: "course-bridal-mastery",
    slug: "bridal-mastery",
    title: "Bridal Artistry Mastery",
    tagline: "Ceremony-ready looks for high-ticket bridal clients.",
    description:
      "A flagship bridal track covering consultations, skin prep, layered finishes, and signature looks for different ceremonies.",
    level: "Intermediate",
    duration: "18 hours",
    price: 14999,
    bundlePrice: 21999,
    progress: 78,
    lessonCount: 32,
    moduleCount: 6,
    drmProtected: true,
    categories: ["Bridal", "Client Workflow", "High Conversion"],
  },
  {
    id: "course-editorial-core",
    slug: "editorial-core",
    title: "Editorial Core Lab",
    tagline: "Mood-led beauty storytelling for shoots and campaigns.",
    description:
      "Editorial composition, lighting-aware makeup direction, and set etiquette for designers and beauty teams.",
    level: "Advanced",
    duration: "11 hours",
    price: 9999,
    lessonCount: 24,
    moduleCount: 5,
    drmProtected: true,
    categories: ["Editorial", "Creative Direction", "Campaigns"],
  },
  {
    id: "course-salon-scale",
    slug: "salon-scale",
    title: "Salon Scale Systems",
    tagline: "Repeatable premium experiences for beauty businesses.",
    description:
      "Service menus, upsell scripts, operational systems, and team playbooks for scaling a beauty brand.",
    level: "Beginner",
    duration: "9 hours",
    price: 7999,
    lessonCount: 20,
    moduleCount: 4,
    drmProtected: true,
    categories: ["Business", "Salon Ops", "Retention"],
  },
];

export const courseDetails: CourseDetail[] = [
  {
    ...featuredCourses[0],
    heroLessonTitle: "Longwear Bridal Base",
    modules: [
      {
        id: "mod-1",
        title: "Client Prep and Consultation",
        position: 1,
        lessons: [
          { id: "l1", title: "Consultation Framework", duration: "18 min", type: "VIDEO", progressPercent: 100 },
          { id: "l2", title: "Skin Prep Ritual", duration: "22 min", type: "VIDEO", progressPercent: 92 },
        ],
      },
      {
        id: "mod-2",
        title: "Signature Bridal Finishes",
        position: 2,
        lessons: [
          { id: "l3", title: "Longwear Bridal Base", duration: "31 min", type: "VIDEO", progressPercent: 78 },
          { id: "l4", title: "Soft Glam Eye Sculpt", duration: "27 min", type: "VIDEO", progressPercent: 52 },
          { id: "l5", title: "Sangeet Replay Breakdown", duration: "46 min", type: "LIVE_REPLAY", progressPercent: 0 },
        ],
      },
    ],
    threads: [
      {
        id: "t1",
        author: "Rhea",
        lesson: "Longwear Bridal Base",
        body: "What brush pressure are you using for the under-eye correction layer?",
        createdAt: "2h ago",
      },
      {
        id: "t2",
        author: "Aarohi",
        lesson: "Consultation Framework",
        body: "Would love a downloadable prep checklist for destination weddings.",
        createdAt: "5h ago",
      },
    ],
  },
  {
    ...featuredCourses[1],
    heroLessonTitle: "Lighting-Aware Complexion",
    modules: [
      {
        id: "mod-3",
        title: "Creative Direction",
        position: 1,
        lessons: [
          { id: "l6", title: "Moodboarding for Beauty Sets", duration: "21 min", type: "VIDEO", progressPercent: 34 },
          { id: "l7", title: "Lighting-Aware Complexion", duration: "26 min", type: "VIDEO", progressPercent: 20 },
        ],
      },
    ],
    threads: [
      {
        id: "t3",
        author: "Megha",
        lesson: "Moodboarding for Beauty Sets",
        body: "Can you add your preferred shot list template to resources?",
        createdAt: "1d ago",
      },
    ],
  },
  {
    ...featuredCourses[2],
    heroLessonTitle: "Premium Service Menu Design",
    modules: [
      {
        id: "mod-4",
        title: "Salon Systems",
        position: 1,
        lessons: [
          { id: "l8", title: "Premium Service Menu Design", duration: "19 min", type: "VIDEO", progressPercent: 61 },
          { id: "l9", title: "Retention Scripts", duration: "17 min", type: "VIDEO", progressPercent: 44 },
        ],
      },
    ],
    threads: [
      {
        id: "t4",
        author: "Naina",
        lesson: "Retention Scripts",
        body: "This upsell script is strong. Could you add a WhatsApp follow-up example?",
        createdAt: "8h ago",
      },
    ],
  },
];

export const blogPosts = [
  {
    slug: "bridal-trial-conversion-playbook",
    title: "The Bridal Trial Conversion Playbook",
    excerpt: "How premium bridal artists move a trial into a booked package without sounding salesy.",
    publishedAt: "2026-04-28",
  },
  {
    slug: "fashion-course-seo-landing-pages",
    title: "Building SEO Pages for Fashion Education",
    excerpt: "A landing page system designed for organic discovery and high-intent tutorial previews.",
    publishedAt: "2026-04-15",
  },
  {
    slug: "protecting-premium-video-courses",
    title: "Protecting Premium Video Courses Without Hurting UX",
    excerpt: "A practical approach to DRM, watermarking, and device controls for paid education.",
    publishedAt: "2026-03-30",
  },
];

export const dashboardOverview: DashboardOverview = {
  learnerName: "IVA Student",
  watermark: "student@iva • +91 9876543210",
  metrics: [
    { label: "Completion", value: "78%", detail: "Across enrolled programs" },
    { label: "Continue Watching", value: "3 lessons", detail: "Resume from synced timestamps" },
    { label: "Certificates", value: "1 unlocked", detail: "Bridal Foundation Milestone" },
    { label: "Devices", value: "1 active", detail: "Reset available in 11 hours" },
  ],
  continueWatching: [
    {
      courseId: "course-bridal-mastery",
      title: "Bridal Artistry Mastery",
      lessonCount: 32,
      progressPercent: 78,
      nextLesson: "Soft Glam Eye Sculpt",
    },
    {
      courseId: "course-editorial-core",
      title: "Editorial Core Lab",
      lessonCount: 24,
      progressPercent: 20,
      nextLesson: "Lighting-Aware Complexion",
    },
    {
      courseId: "course-salon-scale",
      title: "Salon Scale Systems",
      lessonCount: 20,
      progressPercent: 44,
      nextLesson: "Retention Scripts",
    },
  ],
  certificates: [{ id: "cert-1", title: "Bridal Foundation Milestone", issuedAt: "May 2, 2026" }],
  activeDevice: {
    label: "Chrome on Android",
    trustScore: 100,
    cooldownLabel: "Reset available in 11 hours",
  },
};

export const adminOverview: AdminOverview = {
  metrics: [
    { label: "Gross Revenue", value: "₹4.8L", detail: "Last 30 days" },
    { label: "Active Students", value: "842", detail: "Across all enrollments" },
    { label: "Live Classes", value: "4 scheduled", detail: "Mux-backed sessions" },
    { label: "Flagged Threads", value: "7 pending", detail: "Requires moderation" },
  ],
  courses: [
    { title: "Bridal Artistry Mastery", status: "Published", enrollments: "412", revenue: "₹18.7L" },
    { title: "Editorial Core Lab", status: "Published", enrollments: "230", revenue: "₹8.9L" },
    { title: "Salon Scale Systems", status: "Flash sale", enrollments: "200", revenue: "₹5.1L" },
  ],
  liveSessions: [
    { title: "Bridal Doubt Clinic", startsAt: "May 12, 2026 • 7:30 PM", state: "Scheduled" },
    { title: "Editorial Look Breakdown", startsAt: "May 14, 2026 • 8:00 PM", state: "Scheduled" },
  ],
  flaggedThreads: [
    {
      id: "ft1",
      author: "Arohi",
      lesson: "Consultation Framework",
      body: "Duplicate promotional comment awaiting removal.",
      createdAt: "38m ago",
      flagged: true,
    },
    {
      id: "ft2",
      author: "Devika",
      lesson: "Lighting-Aware Complexion",
      body: "Needs admin reply on camera settings note.",
      createdAt: "3h ago",
      flagged: true,
    },
  ],
  deviceAlerts: [
    { user: "rhea@client.com", state: "Review", detail: "New browser fingerprint attempted playback." },
    { user: "aarohi@artist.com", state: "Cooldown", detail: "Self-reset requested, unlock in 14 hours." },
  ],
};
