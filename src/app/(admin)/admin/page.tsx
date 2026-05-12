import { AdminOpsConsole } from "@/components/admin-ops-console";
import { AdminOverviewPanel } from "@/components/admin-overview";
import { MetricCard } from "@/components/metric-card";
import {
  getAdminDashboard,
  listAdminCoupons,
  listAdminCourseOptions,
  listAdminCourses,
  listAdminLiveSessions,
  listAdminModuleOptions,
} from "@/lib/repositories/admin";

export const metadata = {
  title: "Admin Dashboard",
  description: "Lean admin controls for catalog, revenue ops, devices, and live classes.",
};

export default async function AdminPage() {
  const [overview, courses, liveSessions, courseOptions, moduleOptions, coupons] = await Promise.all([
    getAdminDashboard(),
    listAdminCourses(),
    listAdminLiveSessions(),
    listAdminCourseOptions(),
    listAdminModuleOptions(),
    listAdminCoupons(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-sm uppercase tracking-[0.28em] text-gold">Admin Surface</p>
      <h1 className="mt-4 font-display text-5xl text-foreground">Lean operations before analytics sprawl.</h1>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {overview.metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>
      <div className="mt-10">
        <AdminOverviewPanel overview={overview} />
      </div>
      <div className="mt-10">
        <AdminOpsConsole
          initialCourses={courses}
          initialLiveSessions={liveSessions}
          initialCourseOptions={courseOptions}
          initialModuleOptions={moduleOptions}
          initialCoupons={coupons}
        />
      </div>
    </div>
  );
}
