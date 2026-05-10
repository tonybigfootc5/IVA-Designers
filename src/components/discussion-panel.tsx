"use client";

import { useState } from "react";
import type { ThreadPreview } from "@/lib/data/mock-platform";

export function DiscussionPanel({
  lessonId,
  initialThreads,
}: {
  lessonId: string;
  initialThreads: ThreadPreview[];
}) {
  const [body, setBody] = useState("");
  const [threads, setThreads] = useState(initialThreads);
  const [status, setStatus] = useState<string | null>(null);

  async function submitThread() {
    if (!body.trim()) {
      setStatus("Add a message before posting.");
      return;
    }

    setStatus("Submitting to moderation queue...");

    const response = await fetch("/api/discussions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId, body }),
    });

    if (!response.ok) {
      setStatus("Could not submit your message.");
      return;
    }

    setThreads((current) => [
      {
        id: `local-${Date.now()}`,
        author: "You",
        lesson: lessonId,
        body,
        createdAt: "just now",
      },
      ...current,
    ]);
    setBody("");
    setStatus("Thread submitted successfully.");
  }

  return (
    <div className="rounded-[2rem] border border-line bg-card p-6">
      <p className="text-sm uppercase tracking-[0.24em] text-gold">Community thread</p>
      <div className="mt-5 space-y-4">
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Ask a lesson-specific question..."
          className="min-h-28 w-full rounded-[1.5rem] border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted"
        />
        <button onClick={submitThread} className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-slate">
          Post to discussion
        </button>
        <p className="text-sm text-muted">{status ?? "Localized discussion stays attached to this lesson."}</p>
      </div>
      <div className="mt-8 space-y-4">
        {threads.map((thread) => (
          <div key={thread.id} className="rounded-[1.5rem] border border-line bg-white/5 p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-foreground">{thread.author}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-muted">{thread.createdAt}</p>
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-gold">{thread.lesson}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{thread.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
