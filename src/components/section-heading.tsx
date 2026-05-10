export function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm uppercase tracking-[0.28em] text-gold">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl text-balance text-foreground md:text-5xl">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-muted">{body}</p>
    </div>
  );
}
