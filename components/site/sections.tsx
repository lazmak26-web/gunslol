import { Layers, MapPin, RefreshCw, Ruler, Shirt, Wallet, WashingMachine } from "lucide-react";
import { Newsletter } from "./newsletter";

export function Perks() {
  // Placeholder policies: change them to the shop's real ones.
  const perks = [
    { icon: MapPin, title: "Delivery across Morocco", body: "Straight to your door." },
    { icon: Wallet, title: "Pay on delivery", body: "Pay when the parcel lands." },
    { icon: RefreshCw, title: "Easy size swaps", body: "Too small already? We swap it." },
  ];
  return (
    <section aria-label="Why shop with us" className="border-y border-border">
      <ul className="mx-auto grid max-w-7xl divide-border sm:grid-cols-3 sm:divide-x">
        {perks.map(({ icon: Icon, title, body }) => (
          <li key={title} data-reveal className="flex items-center gap-4 px-4 py-6 sm:px-6">
            <span className="flex size-11 shrink-0 items-center justify-center border border-primary/40 text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-widest">{title}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

const MARQUEE_WORDS = ["Almero Store", "Drop 001", "Mini bosses only", "Ages 2–14", "Built tough", "Pay on delivery"];

/** Two crossed tapes; GSAP loops the first and speeds it up with scroll velocity (see page-motion.tsx). */
export function Marquee() {
  const row = (hidden: boolean, dark: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {MARQUEE_WORDS.map((w) => (
        <li key={w} className="flex items-center gap-6 pr-6 font-display text-3xl uppercase sm:text-5xl">
          {w}
          <span className={dark ? "text-primary" : "text-primary-foreground"} aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Highlights" className="relative overflow-hidden py-14 sm:py-20">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[3deg] bg-foreground py-3 text-background" aria-hidden="true">
        <div data-marquee-rev className="flex w-max will-change-transform">{row(true, true)}{row(true, true)}</div>
      </div>
      <div className="relative -rotate-[2deg] bg-primary py-3 text-primary-foreground shadow-[0_10px_30px_-10px_rgb(0_0_0/0.6)]">
        <div data-marquee className="flex w-max will-change-transform">
          {row(false, false)}
          {row(true, false)}
        </div>
      </div>
    </section>
  );
}

export function Story() {
  const stats = [
    { value: 6, suffix: "", label: "pieces in drop 001" },
    { value: 14, suffix: "", label: "the oldest boss we dress" },
    { value: 1, suffix: "", label: "crew" },
  ];
  return (
    <section id="story" aria-labelledby="story-heading" className="relative scroll-mt-28 overflow-hidden bg-primary py-20 text-primary-foreground sm:py-28">
      <p aria-hidden="true" className="pointer-events-none absolute -bottom-6 left-0 select-none whitespace-nowrap font-display text-[30vw] uppercase leading-none text-outline opacity-20">
        Almero
      </p>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em]">The crew</p>
          <h2 id="story-heading" data-split className="mt-3 font-display text-5xl uppercase leading-[0.9] sm:text-7xl">
            Big style. Small sizes. Zero excuses.
          </h2>
        </div>
        <div className="space-y-6 text-base font-medium leading-relaxed text-primary-foreground/80">
          <p data-reveal>
            Almero Store dresses the kids who run the playground. Real streetwear cuts, scaled down: boxy tees, heavy
            hoodies, overshirts and jackets that look like the ones on their older brothers.
          </p>
          <p data-reveal>
            Everything is picked to take a beating. Roomy enough to grow into, tough enough to hand down, and loud enough
            to spot from across the park.
          </p>
          <dl data-reveal className="grid grid-cols-3 gap-4 border-t-2 border-primary-foreground/80 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd data-count={s.value} data-suffix={s.suffix} className="font-display text-5xl tabular-nums sm:text-7xl">
                  {s.value}
                  {s.suffix}
                </dd>
                <dd className="mt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-primary-foreground/70">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Care() {
  const steps = [
    { icon: Layers, title: "Heavy fabrics", body: "Thick cotton and fleece that keep their shape wash after wash." },
    { icon: Ruler, title: "Room to grow", body: "Cut a little roomy, so one size lasts more than one season." },
    { icon: WashingMachine, title: "Machine washable", body: "30°C, inside out. No special care, because kids." },
    { icon: Shirt, title: "Hand-me-down ready", body: "Built to survive one kid, then the next one." },
  ];
  return (
    <section id="care" aria-labelledby="care-heading" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">Built tough</p>
          <h2 id="care-heading" data-split className="mt-3 font-display text-5xl uppercase leading-[0.9] sm:text-7xl">
            Made for real kids.
          </h2>
        </div>
        <ul className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <li key={title} data-reveal className="group bg-background p-6 transition-colors duration-300 hover:bg-card sm:p-8 motion-reduce:transition-none">
              <div className="flex items-center justify-between">
                <Icon className="size-6 text-primary" aria-hidden="true" />
                <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
              </div>
              <h3 className="mt-8 font-display text-2xl uppercase">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section id="newsletter" aria-labelledby="newsletter-heading" className="scroll-mt-28 px-4 pb-20 sm:px-6 sm:pb-28">
      <div data-reveal className="relative mx-auto max-w-7xl overflow-hidden border-2 border-foreground bg-card px-6 py-14 shadow-[8px_8px_0_0_var(--primary)] sm:px-12 sm:py-16">
        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 id="newsletter-heading" data-split className="font-display text-5xl uppercase leading-[0.9] sm:text-6xl">
              Join the crew.
            </h2>
            <p className="mt-3 text-muted-foreground">One message when a new drop lands. Nothing else.</p>
          </div>
          <Newsletter />
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const cols = [
    { title: "Shop", links: ["Drop 001", "Hoodies", "Tees", "Jackets"] },
    { title: "Help", links: ["Delivery", "Size swaps", "Size guide", "Contact"] },
    { title: "Almero", links: ["The crew", "Instagram", "WhatsApp"] },
  ];
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <p className="font-display text-5xl uppercase leading-none">Almero</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Store</p>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">Streetwear for mini bosses, ages 2 to 14.</p>
        </div>
        {cols.map((col) => (
          <nav key={col.title} aria-label={col.title} data-reveal>
            <p className="font-mono text-xs font-bold uppercase tracking-widest">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#top" className="text-sm text-muted-foreground transition-colors hover:text-primary">{l}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Almero Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
