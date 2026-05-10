import type { ModulePreview } from "@/lib/data/mock-platform";

export function CourseCurriculum({ modules }: { modules: ModulePreview[] }) {
  return (
    <div className="rounded-[2rem] border border-line bg-card p-6">
      <p className="text-sm uppercase tracking-[0.24em] text-gold">Curriculum</p>
      <div className="mt-6 space-y-5">
        {modules.map((module) => (
          <div key={module.id} className="rounded-[1.5rem] border border-line bg-white/5 p-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-display text-2xl text-foreground">{module.title}</h3>
              <span className="text-sm text-muted">Module {module.position}</span>
            </div>
            <div className="mt-4 space-y-3">
              {module.lessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center justify-between gap-4 rounded-2xl border border-line/60 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{lesson.title}</p>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">{lesson.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gold-soft">{lesson.duration}</p>
                    <p className="text-xs text-muted">{lesson.progressPercent ?? 0}% complete</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
