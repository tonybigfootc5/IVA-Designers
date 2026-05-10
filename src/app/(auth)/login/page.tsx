"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("123456");
  const [status, setStatus] = useState<string | null>(null);

  async function onOtpLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Signing in...");

    const result = await signIn("phone-otp", {
      phone,
      otp,
      callbackUrl: "/dashboard",
      redirect: false,
    });

    if (result?.ok) {
      window.location.href = "/dashboard";
      return;
    }

    setStatus("OTP sign-in failed. In local demo mode, use 123456.");
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-6 py-16 lg:grid-cols-2">
      <div className="rounded-[2rem] border border-line bg-card p-8">
        <p className="text-sm uppercase tracking-[0.28em] text-gold">Google SSO</p>
        <h1 className="mt-4 font-display text-5xl text-foreground">Account linking starts here.</h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          Production mode expects Google OAuth credentials. Without them, the OTP route below remains available for local development.
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="mt-8 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-slate"
        >
          Continue with Google
        </button>
      </div>
      <form onSubmit={onOtpLogin} className="rounded-[2rem] border border-line bg-card p-8">
        <p className="text-sm uppercase tracking-[0.28em] text-gold">Mobile OTP</p>
        <h2 className="mt-4 font-display text-4xl text-foreground">Lean sign-in for mobile students.</h2>
        <div className="mt-8 space-y-4">
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="10-digit phone number"
            className="w-full rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted"
          />
          <input
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
            placeholder="OTP"
            className="w-full rounded-2xl border border-line bg-[#071019] px-4 py-3 text-sm outline-none placeholder:text-muted"
          />
        </div>
        <button type="submit" className="mt-6 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-gold-soft">
          Sign in with OTP
        </button>
        <p className="mt-4 text-sm text-muted">{status ?? "Demo OTP is 123456 in local development."}</p>
      </form>
    </div>
  );
}
