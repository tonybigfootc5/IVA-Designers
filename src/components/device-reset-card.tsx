"use client";

import { useState } from "react";

export function DeviceResetCard({
  label,
  trustScore,
  cooldownLabel,
}: {
  label: string;
  trustScore: number;
  cooldownLabel: string;
}) {
  const [status, setStatus] = useState<string | null>(null);

  async function requestReset() {
    setStatus("Submitting reset request...");

    const response = await fetch("/api/devices/reset", {
      method: "POST",
    });

    const payload = (await response.json()) as { message: string; cooldownHours: number };
    setStatus(`${payload.message} Cooldown: ${payload.cooldownHours} hours.`);
  }

  return (
    <div className="rounded-[2rem] border border-line bg-card p-6">
      <p className="text-sm uppercase tracking-[0.24em] text-gold">Secure device</p>
      <h3 className="mt-3 font-display text-3xl text-foreground">{label}</h3>
      <p className="mt-3 text-sm text-muted">Trust score: {trustScore}/100</p>
      <p className="mt-2 text-sm text-muted">{cooldownLabel}</p>
      <button onClick={requestReset} className="mt-6 rounded-full border border-gold/40 px-5 py-3 text-sm font-semibold text-gold-soft">
        Request device reset
      </button>
      <p className="mt-4 text-sm text-muted">{status ?? "Use this if you need to unlock a new device after the cooldown window."}</p>
    </div>
  );
}
