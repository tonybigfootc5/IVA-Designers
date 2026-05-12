"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Journal" },
  { href: "/#founder", label: "Founder" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-end lg:gap-8">
        <Link
          href="/"
          className={`group shrink-0 px-1 py-1 transition-all duration-700 ease-out lg:origin-left ${
            isScrolled
              ? "pointer-events-none opacity-0 lg:w-0 lg:-translate-x-8 lg:scale-95"
              : "opacity-100 lg:w-auto lg:translate-x-0 lg:scale-100"
          }`}
        >
          <div className="flex flex-col items-start">
            <span className="font-display text-[3.25rem] leading-[0.82] tracking-[0.12em] text-white drop-shadow-[0_2px_18px_rgba(255,255,255,0.12)] md:text-[4rem] lg:text-[4.6rem]">
              IVA
            </span>
            <span className="mt-2 text-[0.82rem] font-medium uppercase leading-none tracking-[0.58em] text-[#d7c19a] transition group-hover:text-[#f3dfb0] md:text-[0.95rem] lg:text-[1.02rem]">
              Designer&apos;
              <span
                className={`tracking-[0.58em] ${
                  isScrolled ? "text-white" : "animate-designer-s-blink text-white"
                }`}
              >
                S
              </span>
              {" "}Cult
            </span>
          </div>
        </Link>

        <div className="liquid-glass glass-panel flex-1 rounded-[2rem]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-6">
            <Link
              href="/"
              className={`hidden items-center overflow-hidden whitespace-nowrap transition-all duration-700 ease-out lg:flex ${
                isScrolled
                  ? "mr-4 max-w-[13rem] opacity-100 translate-x-0"
                  : "mr-0 max-w-0 opacity-0 -translate-x-6"
              }`}
            >
              <div className="flex flex-col items-start">
                <span className="font-display text-[2.15rem] leading-[0.9] tracking-[0.12em] text-white">
                  IVA
                </span>
                <span className="mt-1 text-[0.62rem] font-medium uppercase leading-none tracking-[0.38em] text-[#d7c19a]">
                  Designer&apos;<span className="text-white">S</span> Cult
                </span>
              </div>
            </Link>
            <nav className="hidden flex-1 items-center justify-center gap-3 text-sm text-slate-200 lg:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-transparent px-4 py-2 transition hover:border-white/10 hover:bg-white/5 hover:text-gold-soft"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/login"
              className="ml-auto rounded-full border border-gold/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(194,168,126,0.14))] px-5 py-2 text-sm font-semibold text-gold-soft transition hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(194,168,126,0.22))]"
            >
              Student login
            </Link>
          </div>
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-5 pb-4 text-xs text-muted lg:hidden md:px-6">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-2 whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
