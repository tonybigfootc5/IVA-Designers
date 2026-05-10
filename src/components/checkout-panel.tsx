"use client";

import { useState } from "react";
import type { CourseSummary } from "@/lib/data/mock-platform";
import { formatCurrency } from "@/lib/utils";

type CheckoutResponse = {
  ok: boolean;
  pricing: {
    subtotal: number;
    discount: number;
    total: number;
    appliedCoupon?: string;
  };
  checkout: {
    provider: string;
    mode: string;
    redirectUrl: string;
    total: number;
  };
};

export function CheckoutPanel({ courses }: { courses: CourseSummary[] }) {
  const [courseSlug, setCourseSlug] = useState(courses[0]?.slug ?? "");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [couponCode, setCouponCode] = useState("BRIDAL10");
  const [result, setResult] = useState<CheckoutResponse | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function submitCheckout() {
    setStatus("Preparing secure checkout...");

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseSlug, email, phone, couponCode }),
    });

    if (!response.ok) {
      setStatus("Checkout request failed. Please verify your details.");
      return;
    }

    const payload = (await response.json()) as CheckoutResponse;
    setResult(payload);
    setStatus(`Checkout prepared via ${payload.checkout.provider}.`);
  }

  return (
    <div className="rounded-[2rem] border border-line bg-card p-6 shadow-glow">
      <p className="text-sm uppercase tracking-[0.24em] text-gold">Launch checkout</p>
      <h3 className="mt-3 font-display text-3xl text-foreground">PhonePe-first commerce flow</h3>
      <div className="mt-6 grid gap-4">
        <select
          value={courseSlug}
          onChange={(event) => setCourseSlug(event.target.value)}
          className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm text-foreground outline-none"
        >
          {courses.map((course) => (
            <option key={course.id} value={course.slug}>
              {course.title}
            </option>
          ))}
        </select>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted"
        />
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone"
          className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted"
        />
        <input
          value={couponCode}
          onChange={(event) => setCouponCode(event.target.value)}
          placeholder="Coupon code"
          className="rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted"
        />
      </div>
      <button onClick={submitCheckout} className="mt-6 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-slate">
        Prepare checkout
      </button>
      <p className="mt-4 text-sm text-muted">{status ?? "Use this panel to exercise the backend pricing and checkout APIs."}</p>
      {result ? (
        <div className="mt-6 rounded-[1.5rem] border border-line bg-white/5 p-4 text-sm text-muted">
          <p>Subtotal: <span className="text-foreground">{formatCurrency(result.pricing.subtotal)}</span></p>
          <p>Discount: <span className="text-foreground">{formatCurrency(result.pricing.discount)}</span></p>
          <p>Total: <span className="font-semibold text-gold-soft">{formatCurrency(result.pricing.total)}</span></p>
          <p>Mode: <span className="text-foreground">{result.checkout.mode}</span></p>
          <p>Redirect: <span className="text-foreground">{result.checkout.redirectUrl}</span></p>
        </div>
      ) : null}
    </div>
  );
}
