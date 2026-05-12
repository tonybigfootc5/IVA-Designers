"use client";

import { useState } from "react";
import { Maximize, Play, StickyNote } from "lucide-react";

export function VideoExperience({
  title,
  watermark,
}: {
  title: string;
  watermark: string;
}) {
  const [speed, setSpeed] = useState("1x");

  return (
    <div className="rounded-[2rem] border border-line bg-card p-4 shadow-glow">
      <div className="relative aspect-video rounded-[1.5rem] bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.18),_rgba(6,11,18,1)_42%)] p-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-soft">
            <Play className="ml-1 h-6 w-6" />
          </button>
        </div>
        <div className="absolute left-4 top-4 rounded-full border border-gold/25 bg-[#071019]/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-gold-soft">
          Signature lesson
        </div>
        <div className="absolute right-5 top-8 -rotate-12 text-xs uppercase tracking-[0.24em] text-white/35">
          {watermark}
        </div>
        <div className="absolute bottom-4 left-4 text-sm text-muted">{title}</div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {["0.5x", "1x", "1.5x"].map((item) => (
            <button
              key={item}
              onClick={() => setSpeed(item)}
              className={`rounded-full px-3 py-1 text-sm ${
                speed === item ? "bg-gold/20 text-gold-soft" : "bg-white/5 text-muted"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex gap-3 text-sm text-muted">
          <span className="flex items-center gap-2">
            <StickyNote className="h-4 w-4 text-gold" />
            Timestamp notes
          </span>
          <span className="flex items-center gap-2">
            <Maximize className="h-4 w-4 text-gold" />
            Fullscreen ready
          </span>
        </div>
      </div>
    </div>
  );
}
