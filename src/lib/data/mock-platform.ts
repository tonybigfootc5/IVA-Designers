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
    id: "course-basic-tailoring",
    slug: "basic-tailoring-program",
    title: "Basic Tailoring Program",
    tagline: "Learn stitching from home and make clothes with confidence.",
    description:
      "A simple beginner course covering measurements, tools, drafting, blouse stitching, sleeves, dresses, kids wear, lehengas, bottom wear, and finishing.",
    level: "Beginner",
    duration: "13 guided topics",
    price: 14999,
    bundlePrice: 21999,
    progress: 78,
    lessonCount: 34,
    moduleCount: 6,
    drmProtected: true,
    categories: ["Measurements", "Blouses", "Finishing"],
  },
  {
    id: "course-blouse-atelier",
    slug: "blouse-atelier",
    title: "Blouse and Neck Design Course",
    tagline: "Learn to cut, shape, and finish blouses in a neat and stylish way.",
    description:
      "Focused lessons on blouse types, collars, back neck designs, dart shaping, lining, sleeve joining, and pattern correction.",
    level: "Intermediate",
    duration: "8 styling blocks",
    price: 9999,
    lessonCount: 22,
    moduleCount: 4,
    drmProtected: true,
    categories: ["Princess Cut", "Necklines", "Sleeves"],
  },
  {
    id: "course-occasion-wear",
    slug: "occasion-wear-studio",
    title: "Dress, Lehenga and Daily Wear Course",
    tagline: "Learn to stitch frocks, lehengas, palazzos, and more with a good fit.",
    description:
      "A practical course with frocks, baby wear, lehengas, straight pants, palazzos, waistbands, pockets, and neat finishing.",
    level: "Intermediate",
    duration: "10 applied units",
    price: 7999,
    lessonCount: 26,
    moduleCount: 5,
    drmProtected: true,
    categories: ["Kidswear", "Lehengas", "Bottom Wear"],
  },
];

export const courseDetails: CourseDetail[] = [
  {
    ...featuredCourses[0],
    heroLessonTitle: "Measurement Techniques",
    modules: [
      {
        id: "mod-1",
        title: "Foundation & Measurements",
        position: 1,
        lessons: [
          { id: "l1", title: "Introduction to Tailoring", duration: "18 min", type: "VIDEO", progressPercent: 100 },
          { id: "l2", title: "Measurement Techniques", duration: "22 min", type: "VIDEO", progressPercent: 92 },
          { id: "l3", title: "Sewing Tools and Their Uses", duration: "16 min", type: "VIDEO", progressPercent: 75 },
        ],
      },
      {
        id: "mod-2",
        title: "Blouse Construction",
        position: 2,
        lessons: [
          { id: "l4", title: "Basic Blouse Drafting", duration: "31 min", type: "VIDEO", progressPercent: 78 },
          { id: "l5", title: "Princess Cut & Shape Belt", duration: "27 min", type: "VIDEO", progressPercent: 52 },
          { id: "l6", title: "Sleeve Attachment & Finishing", duration: "24 min", type: "VIDEO", progressPercent: 0 },
        ],
      },
      {
        id: "mod-3",
        title: "Garments, Fittings & Outcome",
        position: 3,
        lessons: [
          { id: "l7", title: "Dress Designing Basics", duration: "28 min", type: "VIDEO", progressPercent: 0 },
          { id: "l8", title: "Lehenga & Bottom Wear Foundations", duration: "30 min", type: "VIDEO", progressPercent: 0 },
          { id: "l9", title: "Finishing and Fittings", duration: "18 min", type: "VIDEO", progressPercent: 0 },
        ],
      },
    ],
    threads: [
      {
        id: "t1",
        author: "Rhea",
        lesson: "Measurement Techniques",
        body: "Can you show the easiest way to avoid bust and waist measurement mistakes for beginners?",
        createdAt: "2h ago",
      },
      {
        id: "t2",
        author: "Aarohi",
        lesson: "Princess Cut & Shape Belt",
        body: "The shape-belt explanation was clear. Could we get one more example for deep-neck finishing?",
        createdAt: "5h ago",
      },
    ],
  },
  {
    ...featuredCourses[1],
    heroLessonTitle: "Three-Darted Cross Cut",
    modules: [
      {
        id: "mod-4",
        title: "Blouse Varieties",
        position: 1,
        lessons: [
          { id: "l10", title: "Three-Darted Cross Cut", duration: "21 min", type: "VIDEO", progressPercent: 34 },
          { id: "l11", title: "Deep Neck with Lining", duration: "26 min", type: "VIDEO", progressPercent: 20 },
          { id: "l12", title: "Single Dart & Sleeveless Styles", duration: "19 min", type: "VIDEO", progressPercent: 0 },
        ],
      },
      {
        id: "mod-5",
        title: "Collars & Back Necklines",
        position: 2,
        lessons: [
          { id: "l13", title: "Basic & Round Collars", duration: "18 min", type: "VIDEO", progressPercent: 0 },
          { id: "l14", title: "Peter Pan Collar", duration: "16 min", type: "VIDEO", progressPercent: 0 },
          { id: "l15", title: "Keyhole, Loop Back & Potli Button", duration: "20 min", type: "VIDEO", progressPercent: 0 },
        ],
      },
    ],
    threads: [
      {
        id: "t3",
        author: "Megha",
        lesson: "Deep Neck with Lining",
        body: "Please add one more close-up on how you keep the neckline clean when attaching lining.",
        createdAt: "1d ago",
      },
    ],
  },
  {
    ...featuredCourses[2],
    heroLessonTitle: "Umbrella Frock",
    modules: [
      {
        id: "mod-6",
        title: "Kidswear & Occasion Wear",
        position: 1,
        lessons: [
          { id: "l16", title: "Basic Frock", duration: "19 min", type: "VIDEO", progressPercent: 61 },
          { id: "l17", title: "Umbrella Frock", duration: "17 min", type: "VIDEO", progressPercent: 44 },
          { id: "l18", title: "Yoke Dress", duration: "18 min", type: "VIDEO", progressPercent: 0 },
        ],
      },
      {
        id: "mod-7",
        title: "Lehengas & Bottom Wear",
        position: 2,
        lessons: [
          { id: "l19", title: "Basic Lehenga", duration: "22 min", type: "VIDEO", progressPercent: 0 },
          { id: "l20", title: "Palazzo & Umbrella Palazzo", duration: "20 min", type: "VIDEO", progressPercent: 0 },
          { id: "l21", title: "Pockets, Zips & Waistbands", duration: "24 min", type: "VIDEO", progressPercent: 0 },
        ],
      },
    ],
    threads: [
      {
        id: "t4",
        author: "Naina",
        lesson: "Umbrella Frock",
        body: "Would love a little more guidance on fabric fall so the umbrella shape stays elegant after stitching.",
        createdAt: "8h ago",
      },
    ],
  },
];

export const blogPosts = [
  {
    slug: "beginner-tailoring-roadmap",
    title: "A Beginner Tailoring Roadmap That Actually Builds Confidence",
    excerpt: "What to learn first, what to practice repeatedly, and how to avoid the messy beginner phase feeling overwhelming.",
    publishedAt: "2026-04-28",
  },
  {
    slug: "blouse-fitting-mistakes",
    title: "Blouse Fitting Mistakes That Instantly Reduce the Finish",
    excerpt: "Small drafting and finishing errors that change how a blouse sits, moves, and looks when worn.",
    publishedAt: "2026-04-15",
  },
  {
    slug: "finishing-techniques-that-look-premium",
    title: "Finishing Techniques That Make Tailoring Look Expensive",
    excerpt: "From hemming and hook placement to ironing discipline, the final polish customers notice first.",
    publishedAt: "2026-03-30",
  },
];

export const dashboardOverview: DashboardOverview = {
  learnerName: "IVA Student",
  watermark: "student@iva • +91 9876543210",
  metrics: [
    { label: "Completion", value: "78%", detail: "Across enrolled programs" },
    { label: "Continue Watching", value: "3 tracks", detail: "Resume from synced timestamps" },
    { label: "Certificates", value: "1 unlocked", detail: "Basic Tailoring Milestone" },
    { label: "Devices", value: "1 active", detail: "Reset available in 11 hours" },
  ],
  continueWatching: [
    {
      courseId: "course-basic-tailoring",
      title: "Basic Tailoring Program",
      lessonCount: 34,
      progressPercent: 78,
      nextLesson: "Sleeve Attachment & Finishing",
    },
    {
      courseId: "course-blouse-atelier",
      title: "Blouse Atelier & Neckline Studio",
      lessonCount: 22,
      progressPercent: 20,
      nextLesson: "Deep Neck with Lining",
    },
    {
      courseId: "course-occasion-wear",
      title: "Occasion Wear & Everyday Tailoring",
      lessonCount: 26,
      progressPercent: 44,
      nextLesson: "Umbrella Frock",
    },
  ],
  certificates: [{ id: "cert-1", title: "Basic Tailoring Milestone", issuedAt: "May 2, 2026" }],
  activeDevice: {
    label: "Chrome on Android",
    trustScore: 100,
    cooldownLabel: "Reset available in 11 hours",
  },
};

export const adminOverview: AdminOverview = {
  metrics: [
    { label: "Gross Revenue", value: "Rs 4.8L", detail: "Last 30 days" },
    { label: "Active Students", value: "842", detail: "Across all enrollments" },
    { label: "Live Classes", value: "4 scheduled", detail: "Tailoring demo sessions" },
    { label: "Flagged Threads", value: "7 pending", detail: "Requires moderation" },
  ],
  courses: [
    { title: "Basic Tailoring Program", status: "Published", enrollments: "412", revenue: "Rs 18.7L" },
    { title: "Blouse Atelier & Neckline Studio", status: "Published", enrollments: "230", revenue: "Rs 8.9L" },
    { title: "Occasion Wear & Everyday Tailoring", status: "Featured", enrollments: "200", revenue: "Rs 5.1L" },
  ],
  liveSessions: [
    { title: "Blouse Fitting Doubt Clinic", startsAt: "May 12, 2026 • 7:30 PM", state: "Scheduled" },
    { title: "Lehenga & Bottom Wear Breakdown", startsAt: "May 14, 2026 • 8:00 PM", state: "Scheduled" },
  ],
  flaggedThreads: [
    {
      id: "ft1",
      author: "Arohi",
      lesson: "Measurement Techniques",
      body: "Duplicate promotional comment awaiting removal.",
      createdAt: "38m ago",
      flagged: true,
    },
    {
      id: "ft2",
      author: "Devika",
      lesson: "Deep Neck with Lining",
      body: "Needs admin reply on fitting correction note.",
      createdAt: "3h ago",
      flagged: true,
    },
  ],
  deviceAlerts: [
    { user: "rhea@client.com", state: "Review", detail: "New browser fingerprint attempted playback." },
    { user: "aarohi@artist.com", state: "Cooldown", detail: "Self-reset requested, unlock in 14 hours." },
  ],
};
