"use client";

import * as React from "react";
import gsap from "gsap";
import { Check, Plus } from "lucide-react";
import { GarmentIllustration, type RailGarment } from "@/components/ui/product-rail-gallery";
import { useCart } from "./cart";

export function ProductGrid({ products }: { products: RailGarment[] }) {
  return (
    <section id="shop" aria-labelledby="shop-heading" className="scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary">Drop 001 · {products.length} pieces</p>
            <h2 id="shop-heading" data-split className="mt-3 font-display text-5xl uppercase leading-[0.9] sm:text-7xl">
              Built for the playground.
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-sm text-muted-foreground">
            Heavy fabrics, roomy cuts and loud colours. Made to be climbed in, fallen in and handed down.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Clones the product art and flies it into the bag icon, then calls done. */
function flyToBag(from: HTMLElement | null, done: () => void) {
  const bag = document.getElementById("bag-button");
  if (!from || !bag || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return done();
  const a = from.getBoundingClientRect();
  const b = bag.getBoundingClientRect();
  const ghost = from.cloneNode(true) as HTMLElement;
  Object.assign(ghost.style, {
    position: "fixed", left: `${a.left}px`, top: `${a.top}px`, width: `${a.width}px`, height: `${a.height}px`,
    margin: "0", zIndex: "60", pointerEvents: "none",
  });
  document.body.appendChild(ghost);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  gsap.timeline({ onComplete: () => { ghost.remove(); done(); } })
    .to(ghost, { x: dx, duration: 0.7, ease: "power2.inOut" }, 0)
    .to(ghost, { y: dy, duration: 0.7, ease: "back.in(1.4)" }, 0)
    .to(ghost, { scale: 0.08, rotate: -20, duration: 0.7, ease: "power2.in" }, 0)
    .to(ghost, { autoAlpha: 0, duration: 0.15 }, 0.55);
}

function ProductCard({ product, index }: { product: RailGarment; index: number }) {
  const { items, add } = useCart();
  const [justAdded, setJustAdded] = React.useState(false);
  const [side, setSide] = React.useState<"front" | "back">("front");
  const artRef = React.useRef<HTMLDivElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const inBag = items.filter((id) => id === product.id).length;

  React.useEffect(() => {
    if (!justAdded) return;
    const t = window.setTimeout(() => setJustAdded(false), 1400);
    return () => window.clearTimeout(t);
  }, [justAdded]);

  // Subtle 3D tilt that follows the pointer (mouse only)
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !cardRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(cardRef.current, { rotateY: px * 8, rotateX: -py * 8, duration: 0.6, ease: "power3.out", transformPerspective: 900 });
  };
  const onPointerLeave = () => {
    setSide("front");
    if (cardRef.current) gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
  };

  const [name, variant] = product.name.split(" · ");
  const sku = `ALM-${String(index + 1).padStart(3, "0")}`;

  return (
    <li data-reveal className="group">
      <div
        ref={cardRef}
        onPointerMove={onPointerMove}
        onPointerEnter={(e) => e.pointerType === "mouse" && setSide("back")}
        onPointerLeave={onPointerLeave}
        className="relative aspect-[4/5] overflow-hidden border border-border bg-card transition-colors duration-300 will-change-transform group-hover:border-primary"
      >
        {/* colour glow behind the piece */}
        <div
          aria-hidden="true"
          className="absolute inset-x-[15%] bottom-[12%] top-[18%] rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
          style={{ background: product.color }}
        />
        <span aria-hidden="true" className="absolute left-3 top-10 font-display text-7xl uppercase leading-none text-foreground/[0.04] sm:text-8xl">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div data-parallax className="absolute inset-0 flex items-center justify-center p-[10%]">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-contain" />
          ) : (
            <div ref={artRef} className="h-full transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none">
              <GarmentIllustration kind={product.kind} color={product.color} trim={product.trim} side={side} className="h-full" />
            </div>
          )}
        </div>
        <span className="pointer-events-none absolute left-0 top-0 bg-foreground px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-background">
          {sku}
        </span>
        {product.tag && (
          <span className="pointer-events-none absolute right-2 top-2 -rotate-3 bg-primary px-2 py-1 font-mono text-[11px] font-bold tabular-nums text-primary-foreground sm:right-3 sm:top-3 sm:text-xs">
            {product.tag}
          </span>
        )}
        {product.details?.[0] && (
          <span className="pointer-events-none absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {product.details[0]}
          </span>
        )}
        <button
          type="button"
          onClick={() =>
            flyToBag(artRef.current, () => {
              add(product.id);
              setJustAdded(true);
            })
          }
          aria-label={`Add ${product.name} to bag`}
          className="absolute bottom-2 right-2 inline-flex size-10 items-center justify-center bg-primary text-primary-foreground shadow-[3px_3px_0_0_var(--foreground)] outline-none transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_var(--foreground)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-x-0.5 active:translate-y-0.5 active:shadow-none sm:bottom-3 sm:right-3 motion-reduce:transition-none"
        >
          {justAdded ? <Check className="size-4" strokeWidth={3} /> : <Plus className="size-4" strokeWidth={3} />}
        </button>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg uppercase leading-tight sm:text-xl">{name}</h3>
          {variant && <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{variant}</p>}
        </div>
        {inBag > 0 && (
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-primary">{inBag} in bag</span>
        )}
      </div>
      {product.description && <p className="mt-1.5 line-clamp-2 hidden text-sm text-muted-foreground sm:block">{product.description}</p>}
    </li>
  );
}
