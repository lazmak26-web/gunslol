# Almero Store

Kids streetwear store demo (ages 2–14), built with Next.js 15, Tailwind CSS v4, TypeScript and a shadcn-style structure.
Smooth scrolling uses Lenis and scroll animations use GSAP (`components/site/smooth-scroll.tsx`, `components/site/page-motion.tsx`).
The hero is an interactive clothing rail (`components/ui/product-rail-gallery.tsx`).

## Edit products

Names, prices and details live in `lib/products.ts`. Pieces without an `image` are drawn from their `kind` and `color`.
To use a real photo, put a transparent cut-out in `public/products/` (a 200 × 310 portrait canvas works best) and set `image`.

## Run locally

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```

`npm start` listens on `$PORT` (Railway sets it automatically).
