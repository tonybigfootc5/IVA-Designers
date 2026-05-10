import { CheckCircle2 } from "lucide-react";
import { CheckoutPanel } from "@/components/checkout-panel";
import { SectionHeading } from "@/components/section-heading";
import { listCatalogCourses } from "@/lib/repositories/catalog";
import { formatCurrency } from "@/lib/utils";

const offers = [
  {
    name: "Single Flagship Course",
    price: 14999,
    perks: ["Protected VOD access", "Progress sync", "Lesson discussions", "Certificate milestones"],
  },
  {
    name: "Bridal Bundle",
    price: 21999,
    perks: ["Two bundled tracks", "Launch-only pricing", "Priority support", "Replay archive access"],
  },
  {
    name: "Flash Sale Architecture",
    price: 9999,
    perks: ["Timed discount windows", "Coupon support", "PhonePe checkout", "Webhook reconciliation"],
  },
];

export const metadata = {
  title: "Pricing",
  description: "IVA pricing architecture with bundles, flash sales, and PhonePe-first checkout flows.",
};

export default async function PricingPage() {
  const courses = await listCatalogCourses();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Commerce"
        title="Pricing primitives designed for launches, bundles, and seasonal drops."
        body="This scaffold ships with configuration-ready discount support, timed promotions, and a PhonePe-first checkout interface for UPI and cards."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {offers.map((offer) => (
          <article key={offer.name} className="rounded-[2rem] border border-line bg-card p-6 shadow-glow">
            <p className="text-sm uppercase tracking-[0.24em] text-gold">{offer.name}</p>
            <p className="mt-5 font-display text-5xl text-gold-soft">{formatCurrency(offer.price)}</p>
            <div className="mt-6 space-y-3">
              {offer.perks.map((perk) => (
                <div key={perk} className="flex items-start gap-3 text-sm text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-gold" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-12 max-w-2xl">
        <CheckoutPanel courses={courses} />
      </div>
    </div>
  );
}
