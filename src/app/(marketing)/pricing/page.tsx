import { CheckCircle2 } from "lucide-react";
import { CheckoutPanel } from "@/components/checkout-panel";
import { SectionHeading } from "@/components/section-heading";
import { listCatalogCourses } from "@/lib/repositories/catalog";
import { formatCurrency } from "@/lib/utils";

const offers = [
  {
    name: "Basic Tailoring Start",
    price: 14999,
    perks: ["Learn measuring and drafting", "Blouse and sleeve basics", "Neat finishing lessons", "Course certificate"],
  },
  {
    name: "Full Stitching Bundle",
    price: 21999,
    perks: ["Basic tailoring plus extra classes", "Special blouse details", "Dress and party wear lessons", "Priority support"],
  },
  {
    name: "Blouse Special Course",
    price: 9999,
    perks: ["Princess cut and dart shaping", "Collars and back neck designs", "Sleeve finishing", "Fitting correction help"],
  },
];

export const metadata = {
  title: "Pricing",
  description: "Easy-to-understand course fees for basic stitching, blouse work, and full bundles.",
};

export default async function PricingPage() {
  const courses = await listCatalogCourses();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <SectionHeading
        eyebrow="Course Fees"
        title="Choose the course that fits your need and your budget."
        body="See clear pricing for beginner stitching, blouse classes, and full bundles. Simple options, no confusing words."
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
