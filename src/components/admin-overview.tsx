import type { AdminOverview } from "@/lib/data/mock-platform";

export function AdminOverviewPanel({ overview }: { overview: AdminOverview }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-[1.75rem] border border-line bg-card p-5 lg:col-span-2">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Catalog and revenue</p>
        <div className="mt-5 overflow-hidden rounded-[1.25rem] border border-line">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Course</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Enrollments</th>
                <th className="px-4 py-3 font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {overview.courses.map((course) => (
                <tr key={course.title} className="border-t border-line/60">
                  <td className="px-4 py-3 text-foreground">{course.title}</td>
                  <td className="px-4 py-3 text-muted">{course.status}</td>
                  <td className="px-4 py-3 text-muted">{course.enrollments}</td>
                  <td className="px-4 py-3 text-gold-soft">{course.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-[1.75rem] border border-line bg-card p-5">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Live sessions</p>
        <div className="mt-5 space-y-4">
          {overview.liveSessions.map((session) => (
            <div key={session.title} className="rounded-[1.25rem] border border-line bg-white/5 p-4">
              <p className="font-semibold text-foreground">{session.title}</p>
              <p className="mt-2 text-sm text-muted">{session.startsAt}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold">{session.state}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[1.75rem] border border-line bg-card p-5">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Moderation queue</p>
        <div className="mt-5 space-y-4">
          {overview.flaggedThreads.map((thread) => (
            <div key={thread.id} className="rounded-[1.25rem] border border-line bg-white/5 p-4">
              <p className="text-sm font-semibold text-foreground">{thread.author}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold">{thread.lesson}</p>
              <p className="mt-3 text-sm text-muted">{thread.body}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[1.75rem] border border-line bg-card p-5 lg:col-span-2">
        <p className="text-sm uppercase tracking-[0.24em] text-gold">Device alerts</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {overview.deviceAlerts.map((alert) => (
            <div key={alert.user} className="rounded-[1.25rem] border border-line bg-white/5 p-4">
              <p className="font-semibold text-foreground">{alert.user}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-gold">{alert.state}</p>
              <p className="mt-3 text-sm text-muted">{alert.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
