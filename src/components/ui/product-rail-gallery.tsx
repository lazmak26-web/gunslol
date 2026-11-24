"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { ART, VB_H, VB_W, mix, sideShapes, type Art, type GarmentKind } from "./garment-art";

export type { GarmentKind } from "./garment-art";

export interface RailGarment {
  id: string;
  /** Accessible name, caption and detail title. */
  name: string;
  description?: string;
  /** Built-in illustration. */
  kind: GarmentKind;
  /** Fabric colour of the illustration (any CSS colour). */
  color: string;
  /** Trim colour for ribs, cords and buttons. */
  trim?: string;
  /** Short graphic printed on the chest. */
  print?: string;
  /** Short graphic printed across the back. */
  backPrint?: string;
  /** Colour of the printed graphics. */
  ink?: string;
  /** Short hang-tag text such as a price or a size. */
  tag?: string;
  /** Short facts listed in the detail view. */
  details?: string[];
}

export interface ClothingRailHeroLabels {
  front: string;
  back: string;
  close: string;
  show: string;
}

export interface ClothingRailHeroProps extends Omit<React.ComponentProps<"section">, "children"> {
  items: RailGarment[];
  eyebrow?: string;
  heading?: React.ReactNode;
  /** Shown under the rail while nothing is turned to the front. */
  caption?: string;
  /** Call to action rendered under the caption and in the detail view. */
  action?: React.ReactNode;
  /** Turns the pieces to the front one by one until the visitor interacts. */
  autoplay?: boolean;
  /** Milliseconds each piece faces the front during autoplay. */
  interval?: number;
  labels?: ClothingRailHeroLabels;
  onOpenChange?: (index: number | null) => void;
}

const DEFAULT_LABELS: ClothingRailHeroLabels = { front: "Front", back: "Back", close: "Close", show: "Show" };
const EASE = "cubic-bezier(.2,.8,.2,1)";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function useSafeId() {
  return React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
}

/* ---------- drawing ---------- */

function Hanger({ side = false }: { side?: boolean }) {
  return (
    <g>
      <path
        d="M100,3 C94,3 92,9 96,12 C99,14 100,17 100,22"
        fill="none"
        stroke="var(--hanger-metal,#cfd3d8)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {side ? (
        <rect x="95" y="22" width="10" height="26" rx="3" fill="var(--hanger,#1a1a1a)" />
      ) : (
        <path d="M100,22 L40,45 C36,47 37,50 41,50 L159,50 C163,50 164,47 160,45 Z" fill="var(--hanger,#1a1a1a)" />
      )}
    </g>
  );
}

export function GarmentFace({
  item,
  side,
  className,
  style,
}: {
  item: RailGarment;
  side: "front" | "back";
  className?: string;
  style?: React.CSSProperties;
}) {
  const uid = useSafeId();
  const art: Art = ART[item.kind][side];
  const c = item.color;
  const trim = item.trim ?? mix(c, -0.18);
  const line = mix(c, -0.32);
  const silhouette = [art.body, ...art.sleeves, ...(art.hood ? [art.hood] : [])];
  const print = side === "front" ? item.print : item.backPrint;
  const ink = item.ink ?? "#fff";
  const printY = side === "front" ? (item.kind === "hoodie" ? 128 : 118) : 110;

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMin meet"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <defs>
        <clipPath id={`${uid}-clip`}>
          {silhouette.map((d) => (
            <path key={d} d={d} />
          ))}
        </clipPath>
        <linearGradient id={`${uid}-vol`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="black" stopOpacity="0.34" />
          <stop offset="0.16" stopColor="black" stopOpacity="0.1" />
          <stop offset="0.42" stopColor="white" stopOpacity="0.08" />
          <stop offset="0.58" stopColor="white" stopOpacity="0.04" />
          <stop offset="0.84" stopColor="black" stopOpacity="0.12" />
          <stop offset="1" stopColor="black" stopOpacity="0.38" />
        </linearGradient>
        <linearGradient id={`${uid}-drape`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="black" stopOpacity="0" />
          <stop offset="1" stopColor="black" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      <Hanger />
      {art.hood && <path d={art.hood} fill={mix(c, -0.1)} />}
      {art.under && <path d={art.under} fill={mix(c, -0.45)} />}
      {art.sleeves.map((d) => (
        <path key={d} d={d} fill={mix(c, -0.04)} />
      ))}
      <path d={art.body} fill={c} />
      {art.panels.map((p) => (
        <path key={p.d} d={p.d} fill={mix(c, p.t * 2)} />
      ))}
      {art.ribs.map((d) => (
        <path key={d} d={d} fill={trim} />
      ))}

      {print && (
        <text
          x="100"
          y={printY}
          textAnchor="middle"
          fill={ink}
          style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
          fontSize={print.length > 6 ? 22 : 30}
          letterSpacing="1"
          transform={`rotate(-4 100 ${printY})`}
        >
          {print}
        </text>
      )}

      <g clipPath={`url(#${uid}-clip)`}>
        <g fill="none" strokeLinecap="round">
          {art.folds.map((d) => (
            <path key={d} d={d} stroke="black" strokeOpacity="0.1" strokeWidth="3" />
          ))}
          {art.seams.map((d) => (
            <path key={d} d={d} stroke={line} strokeWidth="0.9" />
          ))}
          {art.stitches.map((d) => (
            <path key={d} d={d} stroke={line} strokeWidth="0.8" strokeDasharray="2 2" />
          ))}
        </g>
        <rect width={VB_W} height={VB_H} fill={`url(#${uid}-vol)`} />
        <rect width={VB_W} height={VB_H} fill={`url(#${uid}-drape)`} />
      </g>

      {art.cords?.map((d) => (
        <path key={d} d={d} fill="none" stroke={trim} strokeWidth="2.4" strokeLinecap="round" />
      ))}
      {art.buttons?.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.8" fill={trim} stroke={line} strokeWidth=".5" />
      ))}
    </svg>
  );
}

function GarmentSide({ item, style }: { item: RailGarment; style?: React.CSSProperties }) {
  const uid = useSafeId();
  const s = sideShapes(item.kind);
  const c = item.color;
  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMin meet" aria-hidden="true" style={style}>
      <defs>
        <linearGradient id={`${uid}-side`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="black" stopOpacity="0.35" />
          <stop offset="0.45" stopColor="white" stopOpacity="0.08" />
          <stop offset="1" stopColor="black" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {s.hood && <path d={s.hood} fill={mix(c, -0.22)} />}
      <path d={s.body} fill={mix(c, -0.14)} />
      <path d={s.body} fill={`url(#${uid}-side)`} />
      <path d={s.sleeve} fill={c} />
      <path d={s.sleeve} fill={`url(#${uid}-side)`} />
      <Hanger side />
    </svg>
  );
}

/* ---------- rail ---------- */

export function ClothingRailHero({
  items,
  eyebrow,
  heading,
  caption,
  action,
  autoplay = true,
  interval = 2600,
  labels = DEFAULT_LABELS,
  onOpenChange,
  className,
  ...props
}: ClothingRailHeroProps) {
  const [active, setActive] = React.useState<number | null>(null);
  const [open, setOpen] = React.useState<number | null>(null);
  const [touched, setTouched] = React.useState(false);
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    if (!autoplay || touched || reduced || items.length === 0) return;
    const id = window.setInterval(() => {
      setActive((i) => (i === null ? 0 : (i + 1) % items.length));
    }, interval);
    return () => window.clearInterval(id);
  }, [autoplay, touched, reduced, interval, items.length]);

  const openPiece = React.useCallback(
    (index: number | null) => {
      setOpen(index);
      onOpenChange?.(index);
    },
    [onOpenChange],
  );

  const current = active === null ? null : items[active];
  const t = (p: string) => (reduced ? "none" : `${p} 650ms ${EASE}`);

  return (
    <section
      className={cn("relative w-full [--h:clamp(230px,62vw,330px)]", className)}
      aria-roledescription="carousel"
      {...props}
    >
      {(eyebrow || heading) && (
        <header className="mx-auto mb-8 max-w-3xl px-4 text-center">
          {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.3em] text-[var(--rail-accent,#c6ff3d)]">{eyebrow}</p>}
          {heading && <h2 className="mt-3 font-display text-5xl uppercase leading-none sm:text-6xl">{heading}</h2>}
        </header>
      )}

      <div className="relative mx-auto max-w-6xl px-2 sm:px-6">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 z-0 mx-2 h-[8px] rounded-full sm:mx-6"
          style={{ background: "linear-gradient(180deg,#f2f4f6 0%,#9aa1a9 55%,#5b6168 100%)", boxShadow: "0 5px 12px rgba(0,0,0,.45)" }}
        />
        <ul
          className="relative z-[1] flex justify-start overflow-x-auto pb-2 [scrollbar-width:none] sm:justify-center sm:overflow-visible"
          style={{ perspective: 1100 }}
          onMouseLeave={() => setActive(null)}
        >
          {items.map((item, i) => {
            const facing = active === i;
            const w = facing ? "calc(var(--h) * 0.645)" : "calc(var(--h) * 0.2)";
            const layer: React.CSSProperties = {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              transformOrigin: "50% 0",
              transition: `${t("opacity")}, ${t("transform")}`,
            };
            return (
              <li
                key={item.id}
                className="relative shrink-0"
                style={{ width: w, height: "var(--h)", transition: t("width"), zIndex: facing ? 5 : 1 }}
              >
                <button
                  type="button"
                  aria-label={`${labels.show} ${item.name}`}
                  aria-pressed={facing}
                  onMouseEnter={() => {
                    setTouched(true);
                    setActive(i);
                  }}
                  onFocus={() => {
                    setTouched(true);
                    setActive(i);
                  }}
                  onClick={() => {
                    setTouched(true);
                    if (facing) openPiece(i);
                    else setActive(i);
                  }}
                  className="absolute inset-0 cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[var(--rail-accent,#c6ff3d)]"
                >
                  <span
                    className="pointer-events-none absolute left-1/2 top-0 block h-full -translate-x-1/2"
                    style={{ width: "calc(var(--h) * 0.645)", transformStyle: "preserve-3d" }}
                  >
                    <GarmentSide
                      item={item}
                      style={{
                        ...layer,
                        opacity: facing ? 0 : 1,
                        transform: `rotateY(${facing ? 70 : 0}deg)`,
                        filter: "drop-shadow(0 12px 10px rgba(0,0,0,.35))",
                      }}
                    />
                    <GarmentFace
                      item={item}
                      side="front"
                      style={{
                        ...layer,
                        opacity: facing ? 1 : 0,
                        transform: `rotateY(${facing ? 0 : -70}deg)`,
                        filter: "drop-shadow(0 22px 20px rgba(0,0,0,.45))",
                        animation: facing && !reduced ? "rail-sway 3.4s ease-in-out infinite" : undefined,
                      }}
                    />
                  </span>
                  {item.tag && (
                    <span
                      className="pointer-events-none absolute right-[4%] top-[17%] rotate-6 bg-[var(--rail-accent,#c6ff3d)] px-2 py-1 font-display text-xs uppercase tracking-wider text-black shadow-lg"
                      style={{ opacity: facing ? 1 : 0, transition: t("opacity") }}
                    >
                      {item.tag}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mx-auto mt-6 min-h-[130px] max-w-xl px-4 text-center" aria-live="polite">
        {current ? (
          <>
            <p className="font-display text-3xl uppercase">{current.name}</p>
            {current.description && <p className="mt-2 text-sm opacity-70">{current.description}</p>}
            <button
              type="button"
              onClick={() => active !== null && openPiece(active)}
              className="mt-4 border-b-2 border-[var(--rail-accent,#c6ff3d)] pb-1 text-xs font-bold uppercase tracking-[0.25em]"
            >
              {labels.show} →
            </button>
          </>
        ) : (
          <>
            {caption && <p className="text-sm opacity-70">{caption}</p>}
            {action && <div className="mt-6 flex justify-center">{action}</div>}
          </>
        )}
      </div>

      {open !== null && <DetailDialog item={items[open]} labels={labels} action={action} onClose={() => openPiece(null)} />}

      <style>{`@keyframes rail-sway{0%,100%{transform:rotateY(0deg) rotateZ(-.8deg)}50%{transform:rotateY(5deg) rotateZ(.8deg)}}`}</style>
    </section>
  );
}

/* ---------- detail ---------- */

function DetailDialog({
  item,
  labels,
  action,
  onClose,
}: {
  item: RailGarment;
  labels: ClothingRailHeroLabels;
  action?: React.ReactNode;
  onClose: () => void;
}) {
  const [side, setSide] = React.useState<"front" | "back">("front");
  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative grid max-h-[92dvh] w-full max-w-3xl overflow-auto border-2 border-black bg-[#f2f0ea] text-[#0d0d0d] shadow-[8px_8px_0_var(--rail-accent,#c6ff3d)] sm:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex items-start justify-center bg-[#dcd9d0] px-6 pb-16 pt-8" style={{ perspective: 900 }}>
          <div className="relative h-[min(52dvh,380px)] w-[calc(min(52dvh,380px)*0.645)]" style={{ transformStyle: "preserve-3d" }}>
            {(["front", "back"] as const).map((s) => (
              <GarmentFace
                key={s}
                item={item}
                side={s}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  transform: `rotateY(${(s === "front" ? 0 : 180) + (side === "back" ? 180 : 0)}deg)`,
                  transition: `transform 700ms ${EASE}`,
                  filter: "drop-shadow(0 18px 16px rgba(0,0,0,.3))",
                }}
              />
            ))}
          </div>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 border-2 border-black bg-white p-1 text-xs font-bold uppercase">
            {(["front", "back"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSide(s)}
                aria-pressed={side === s}
                className={cn("px-3 py-1 tracking-wider", side === s && "bg-black text-[var(--rail-accent,#c6ff3d)]")}
              >
                {labels[s]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6 sm:p-8">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="self-end text-xs font-bold uppercase tracking-[0.2em] opacity-70 hover:opacity-100"
          >
            {labels.close} ✕
          </button>
          {item.tag && (
            <p className="w-fit -rotate-2 bg-black px-2 py-1 font-display text-sm uppercase tracking-wider text-[var(--rail-accent,#c6ff3d)]">
              {item.tag}
            </p>
          )}
          <h3 className="font-display text-4xl uppercase leading-none">{item.name}</h3>
          {item.description && <p className="text-sm leading-relaxed opacity-80">{item.description}</p>}
          {item.details && item.details.length > 0 && (
            <ul className="space-y-2 border-t-2 border-black pt-4 text-sm">
              {item.details.map((d) => (
                <li key={d} className="flex gap-3">
                  <span aria-hidden="true">✚</span>
                  {d}
                </li>
              ))}
            </ul>
          )}
          {action && (
            <div
              className="mt-auto pt-2"
              onClickCapture={(e) => {
                const a = (e.target as HTMLElement).closest("a");
                if (a?.getAttribute("href")?.startsWith("#")) onClose();
              }}
            >
              {action}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ClothingRailHero;
