import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/70 bg-[#04090f]/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl text-gold-soft">{siteConfig.shortName}</p>
          <p className="mt-3 max-w-sm text-sm text-muted">{siteConfig.description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted">
            <Link href="/courses">Courses</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/blog">Journal</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">Contact</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted">
            <p>Help for joining classes and new admissions</p>
            <p>{siteConfig.supportEmail}</p>
            <p>Easy learning on mobile from home</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
