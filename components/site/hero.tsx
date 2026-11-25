"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ClothingRailHero from "@/components/ui/product-rail-gallery";
import { PRODUCTS } from "@/lib/products";
import { useLenis } from "./smooth-scroll";

gsap.registerPlugin(useGSAP);

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M50 0 L58 30 L88 12 L70 42 L100 50 L70 58 L88 88 L58 70 L50 100 L42 70 L12 88 L30 58 L0 50 L30 42 L12 12 L42 30 Z"
      />
    </svg>
  );
}

export function Hero() {
  const lenis = useLenis();
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-word]", { yPercent: 110, duration: 1.1, stagger: 0.08, ease: "expo.out", delay: 0.15 });
        gsap.from("[data-sticker]", { scale: 0, rotation: -40, duration: 0.9, stagger: 0.12, ease: "back.out(2.2)", delay: 0.7 });
        gsap.to("[data-spin]", { rotation: 360, duration: 14, ease: "none", repeat: -1 });
        gsap.to("[data-wiggle]", { rotation: "+=6", duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-14">
        <p className="pr-28 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground sm:pr-0">
          <span className="text-primary">●</span> Kids streetwear · Ages 2–14 · Drop 001
        </p>
        <h1 className="mt-4 font-display uppercase leading-[0.85] tracking-tight">
          <span className="block overflow-hidden">
            <span data-hero-word className="block text-[clamp(3.6rem,15vw,12rem)]">Streetwear</span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-word className="block text-[clamp(3.6rem,15vw,12rem)] text-outline-foreground">
              for mini <span className="text-primary [-webkit-text-stroke:0]">bosses</span>
            </span>
          </span>
        </h1>

        {/* Stickers */}
        <div data-sticker className="absolute right-4 top-8 sm:right-10 sm:top-12" aria-hidden="true">
          <div className="relative grid size-24 place-items-center sm:size-36">
            <span data-spin className="absolute inset-0">
              <Star className="size-full text-primary" />
            </span>
            <span className="relative -rotate-12 text-center font-display text-sm uppercase leading-none text-primary-foreground sm:text-xl">
              Drop
              <br />
              001
            </span>
          </div>
        </div>
        <div
          data-sticker
          data-wiggle
          aria-hidden="true"
          className="absolute -bottom-6 right-6 hidden -rotate-6 bg-blaze px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-black shadow-[4px_4px_0_0_var(--foreground)] md:block"
        >
          Playground approved
        </div>
      </div>

      <ClothingRailHero
        items={PRODUCTS}
        hanger="matte"
        autoplay
        caption="Brush along the rail, slide a hanger, tap a piece to see the back."
        className="pb-10 pt-2 sm:pb-16"
        // Pause smooth scrolling while the detail view is open so the wheel doesn't move the page behind it.
        onOpenChange={(index) => (index === null ? lenis?.start() : lenis?.stop())}
        action={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#shop"
              className="bg-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-[4px_4px_0_0_var(--foreground)] outline-none transition-[transform,box-shadow] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--foreground)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-x-1 active:translate-y-1 active:shadow-none motion-reduce:transition-none"
            >
              Shop the drop
            </a>
            <a
              href="#story"
              className="border border-foreground/30 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] outline-none transition-colors hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
            >
              The crew
            </a>
          </div>
        }
      />
    </div>
  );
}
