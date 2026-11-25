import type { RailGarment } from "@/components/ui/product-rail-gallery";

/**
 * The drop. Pieces without an `image` are drawn by the rail itself from `kind` + `color`;
 * add a transparent photo in /public/products and set `image` to replace a drawing.
 */
export const PRODUCTS: RailGarment[] = [
  {
    id: "box-tee-black",
    name: "Box tee · Washed black",
    kind: "tee",
    color: "#232325",
    trim: "#2f2f32",
    tag: "149 DH",
    description: "Boxy heavyweight tee with a dropped shoulder, cut roomy so it lasts a growth spurt.",
    details: ["Ages 2–14", "Heavy cotton", "Boxy fit"],
  },
  {
    id: "mini-boss-hoodie-acid",
    name: "Mini Boss hoodie · Acid",
    kind: "hoodie",
    color: "#C9F23D",
    trim: "#1b1b1b",
    tag: "249 DH",
    description: "Loud acid hoodie with black cords and a kangaroo pocket for snacks and secrets.",
    details: ["Ages 2–14", "Brushed fleece", "Kangaroo pocket"],
  },
  {
    id: "crew-sweat-cement",
    name: "Crew sweat · Cement",
    kind: "knit",
    color: "#9C9B96",
    tag: "199 DH",
    description: "Cement-grey crewneck with ribbed trims. Goes with everything, survives everything.",
    details: ["Ages 4–14", "Ribbed trims", "Relaxed fit"],
  },
  {
    id: "cargo-overshirt-olive",
    name: "Cargo overshirt · Olive",
    kind: "shirt",
    color: "#5A6136",
    trim: "#2f3320",
    tag: "229 DH",
    description: "Olive overshirt in sturdy twill. Wear it open over a tee or buttoned up.",
    details: ["Ages 4–14", "Cotton twill", "Chest pocket"],
  },
  {
    id: "worker-jacket-denim",
    name: "Worker jacket · Denim",
    kind: "jacket",
    color: "#3C5A85",
    trim: "#C99A4E",
    tag: "299 DH",
    description: "Mid-blue denim worker jacket with copper-tone buttons, made for scraped knees and long days.",
    details: ["Ages 6–14", "Rigid denim", "Metal buttons"],
  },
  {
    id: "night-shift-parka-blaze",
    name: "Night Shift parka · Blaze",
    kind: "coat",
    color: "#FF5B1F",
    trim: "#1b1b1b",
    tag: "349 DH",
    description: "Blaze-orange parka that you can spot across the playground. Warm, padded, impossible to lose.",
    details: ["Ages 6–14", "Padded", "Easy to spot"],
  },
];
