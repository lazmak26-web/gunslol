import { ClothingRailHero, type RailGarment } from "@/components/ui/product-rail-gallery";

/** Set NEXT_PUBLIC_WHATSAPP (international format, digits only) to turn the order buttons into WhatsApp links. */
const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP?.replace(/\D/g, "") || null;
const orderHref = WHATSAPP
  ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Salam Almero Store, je veux commander une pièce du drop.")}`
  : "#commande";

const DROP: RailGarment[] = [
  {
    id: "box-tee",
    name: "Box Tee ALM",
    kind: "tee",
    color: "#ff5a1f",
    trim: "#e14a12",
    print: "ALM",
    backPrint: "ALMERO",
    ink: "#0e0e0e",
    tag: "2 – 14 ans",
    description: "Le tee carré du drop : coupe boxy, col côtelé épais et gros logo devant.",
    details: ["Coton épais 220 g", "Coupe oversize, épaules tombantes", "Logo ALM devant, ALMERO dans le dos", "Lavable en machine à 30°"],
  },
  {
    id: "mini-boss",
    name: "Hoodie Mini Boss",
    kind: "hoodie",
    color: "#1c1c1c",
    trim: "#c6ff3d",
    print: "MINI BOSS",
    backPrint: "ALMERO",
    ink: "#c6ff3d",
    tag: "Best seller",
    description: "Molleton brossé, cordons acid et poche kangourou pour tout ranger.",
    details: ["Molleton brossé intérieur", "Capuche doublée, cordons fluo", "Poche kangourou", "Bords côtes aux poignets et en bas"],
  },
  {
    id: "crew-ciment",
    name: "Sweat Crew Ciment",
    kind: "knit",
    color: "#8a8c87",
    trim: "#6f716c",
    print: "ALM°",
    backPrint: "CREW",
    ink: "#0e0e0e",
    tag: "4 – 14 ans",
    description: "Le sweat de tous les jours, gris béton, souple et facile à porter.",
    details: ["Maille douce, ne gratte pas", "Col, poignets et bas en côtes", "Se porte seul ou sous la veste", "Coloris qui ne bouge pas au lavage"],
  },
  {
    id: "overshirt",
    name: "Overshirt Cargo",
    kind: "shirt",
    color: "#5b6a3a",
    trim: "#2a2f1b",
    tag: "Nouveau",
    description: "Surchemise kaki épaisse, deux poches poitrine, à porter ouverte sur un tee.",
    details: ["Twill de coton résistant", "Deux poches à rabat", "Boutons pression faciles pour les petits", "Coupe droite et ample"],
  },
  {
    id: "worker",
    name: "Veste Worker Denim",
    kind: "jacket",
    color: "#3d5f8f",
    trim: "#d9a441",
    backPrint: "ALMERO",
    ink: "#f2f0ea",
    tag: "6 – 14 ans",
    description: "La veste de chantier version cour de récré : denim brut et boutons cuivre.",
    details: ["Denim 12 oz prélavé", "Trois poches plaquées", "Boutons cuivre", "Logo ALMERO brodé dans le dos"],
  },
  {
    id: "parka",
    name: "Parka Night Shift",
    kind: "coat",
    color: "#262b36",
    trim: "#c6ff3d",
    backPrint: "NIGHT",
    ink: "#c6ff3d",
    tag: "Hiver",
    description: "Longue parka coupe-vent pour l'hiver, détails fluo pour être vu la nuit.",
    details: ["Toile déperlante", "Doublure chaude", "Poches basses à rabat", "Boutons fluo, bien visibles le soir"],
  },
];

const PERKS = [
  { k: "01", t: "Coton épais", d: "Des matières qui tiennent aux lavages, aux glissades et aux matchs de foot." },
  { k: "02", t: "Coupes oversize", d: "Le look streetwear des grands, en version confortable pour bouger." },
  { k: "03", t: "Tailles 2 – 14 ans", d: "Un guide des tailles simple, et l'échange si ça ne va pas." },
  { k: "04", t: "Drops limités", d: "Petites séries : quand c'est parti, c'est parti." },
];

const TICKER = ["DROP 01", "STREETWEAR KIDS", "2 – 14 ANS", "MINI BOSS ONLY", "ALMERO"];

function OrderButton({ dark = false }: { dark?: boolean }) {
  return (
    <a
      href={orderHref}
      {...(WHATSAPP ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={
        "inline-flex w-fit items-center gap-3 border-2 px-7 py-3 font-display text-lg uppercase tracking-wider transition-transform hover:-translate-y-0.5 " +
        (dark
          ? "border-black bg-black text-[var(--acid)]"
          : "border-[var(--acid)] bg-[var(--acid)] text-black shadow-[5px_5px_0_var(--blaze)]")
      }
    >
      {WHATSAPP ? "Commander sur WhatsApp" : "Commander le drop"} <span aria-hidden="true">→</span>
    </a>
  );
}

function Ticker() {
  const row = [...TICKER, ...TICKER, ...TICKER];
  return (
    <div className="overflow-hidden border-y-2 border-black bg-[var(--acid)] py-2 text-black" aria-hidden="true">
      <div className="marquee-track flex w-max gap-8 whitespace-nowrap font-display text-lg uppercase tracking-wider">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            {w} <span>✚</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="grain overflow-x-hidden">
      <Ticker />

      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <a href="#" className="font-display text-3xl uppercase tracking-wide">
          Almero <span className="text-[var(--acid)]">Store</span>
        </a>
        <nav className="hidden gap-8 text-sm font-semibold uppercase tracking-wider sm:flex">
          <a href="#drop" className="hover:text-[var(--acid)]">Le drop</a>
          <a href="#pourquoi" className="hover:text-[var(--acid)]">Pourquoi</a>
          <a href="#commande" className="hover:text-[var(--acid)]">Commander</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="grid-lines relative px-4 pb-10 pt-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <p className="font-tag text-xl text-[var(--blaze)] sm:text-2xl">streetwear pour les mini boss</p>
          <h1 className="mt-2 font-display text-[22vw] uppercase leading-[0.85] tracking-tight sm:text-[11rem]">
            Almero
            <span className="block text-[11vw] sm:text-[5.5rem]">
              <span className="outline-text">store</span> <span className="text-[var(--acid)]">kids</span>
            </span>
          </h1>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md text-base leading-relaxed opacity-80">
              Tees, hoodies, vestes et parkas taillés comme ceux des grands. Coton épais, coupes amples et couleurs qui
              claquent, pour les enfants de 2 à 14 ans.
            </p>
            <OrderButton />
          </div>
        </div>
      </section>

      <div className="tape h-4" aria-hidden="true" />

      {/* Rail */}
      <section id="drop" className="scroll-mt-4 py-16 sm:px-6">
        <ClothingRailHero
          items={DROP}
          eyebrow="Drop 01 · sur le portant"
          heading={
            <>
              Choisis ta <span className="text-[var(--acid)]">pièce</span>
            </>
          }
          caption="Survole ou touche une pièce pour la tourner vers toi, puis ouvre-la pour voir le devant et le dos."
          action={<OrderButton />}
          labels={{ front: "Devant", back: "Dos", close: "Fermer", show: "Voir la pièce" }}
        />
      </section>

      {/* Perks */}
      <section id="pourquoi" className="scroll-mt-4 border-y-2 border-white/10 bg-[var(--concrete)] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-5xl uppercase leading-none sm:text-7xl">
              Pensé pour <br />
              <span className="text-[var(--blaze)]">jouer dehors</span>
            </h2>
            <p className="rotate-[-3deg] bg-[var(--acid)] px-3 py-1 font-tag text-xl text-black">que du solide</p>
          </div>
          <ul className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((p) => (
              <li key={p.k} className="bg-[var(--concrete)] p-6">
                <span className="font-display text-5xl text-[var(--acid)]">{p.k}</span>
                <h3 className="mt-4 font-display text-2xl uppercase">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-75">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Order */}
      <section id="commande" className="scroll-mt-4 bg-[var(--acid)] px-4 py-20 text-black sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-6xl uppercase leading-[0.9] sm:text-8xl">
            Commander,
            <br />
            c&apos;est simple
          </h2>
          <ol className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              ["Choisis", "Ta pièce et ta couleur dans le drop."],
              ["Envoie la taille", "L'âge ou la taille de l'enfant : on te conseille."],
              ["Reçois", "Livraison à domicile, paiement à la livraison."],
            ].map(([t, d], i) => (
              <li key={t} className="border-2 border-black bg-[var(--foreground)] p-5 shadow-[6px_6px_0_#0e0e0e]">
                <span className="font-display text-4xl text-[var(--blaze)]">0{i + 1}</span>
                <p className="mt-2 font-display text-2xl uppercase">{t}</p>
                <p className="mt-1 text-sm opacity-80">{d}</p>
              </li>
            ))}
          </ol>
          {WHATSAPP && (
            <div className="mt-10">
              <OrderButton dark />
            </div>
          )}
        </div>
      </section>

      <footer className="px-4 py-12 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <p className="font-display text-7xl uppercase leading-none sm:text-9xl">
            Almero
            <br />
            <span className="text-[var(--acid)]">Store</span>
          </p>
          <p className="text-xs uppercase tracking-widest opacity-60">© {new Date().getFullYear()} Almero Store · Streetwear kids</p>
        </div>
      </footer>
    </main>
  );
}
