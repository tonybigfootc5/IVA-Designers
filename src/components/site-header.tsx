import Link from "next/link";
import { Sparkles } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Journal" },
  { href: "/dashboard", label: "Student" },
  { href: "/admin", label: "Admin" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-slate/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold">
            <Sparkles className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-2xl tracking-[0.2em] text-gold-soft">IVA</p>
            <p className="text-xs uppercase tracking-[0.32em] text-muted">Designer&apos;s Cult</p>
          </div>
        </Link>
        <nav className="hidden gap-6 text-sm text-slate-200 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-gold-soft">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/login"
          className="rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-sm font-semibold text-gold-soft transition hover:bg-gold/20"
        >
          Sign in
        </Link>
      </div>
      <div className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-6 pb-3 text-xs text-muted lg:hidden">
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
