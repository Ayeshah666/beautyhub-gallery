import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { BookingCTA, PageHeader } from "@/components/site";
import { gallery, type GalleryCategory } from "@/lib/business";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Braids, Cuts, Nails & Spa — Beauty With Jackie Nairobi" },
      { name: "description", content: "A look at hair, braiding, barbering, nails, skincare and spa at Beauty With Jackie in Nairobi." },
      { property: "og:title", content: "Gallery — Beauty With Jackie" },
      { property: "og:description", content: "A little look at beauty." },
    ],
  }),
  component: Gallery,
});

const cats: ("All" | GalleryCategory)[] = [
  "All",
  "Hair & Braiding",
  "Haircuts & Barbering",
  "Nails",
  "Skincare & Facials",
  "Massage & Spa",
  "Salon Environment",
];

function Gallery() {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const [idx, setIdx] = useState<number | null>(null);
  const items = cat === "All" ? gallery : gallery.filter((g) => g.category === cat);
  const touch = useRef<number | null>(null);

  const move = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (idx === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", on);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", on);
      document.body.style.overflow = "";
    };
  }, [idx, move]);

  return (
    <>
      <PageHeader eyebrow="Gallery" title="A Little Look at Beauty" text="Illustrative imagery — real salon photos will be added soon." />
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter gallery">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={`min-h-11 border px-4 text-sm transition-colors ${cat === c ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}
            >
              {c}
            </button>
          ))}
        </div>
        {items.length === 0 ? (
          <p className="py-24 text-center text-muted-foreground">No photos in this category yet.</p>
        ) : (
          <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {items.map((g, i) => (
              <button
                key={g.alt}
                onClick={() => setIdx(i)}
                className="group relative mb-4 block w-full overflow-hidden break-inside-avoid"
                aria-label={`Open image: ${g.alt}`}
              >
                <img src={g.src} alt={g.alt} loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-primary/80 px-4 py-3 text-left text-xs tracking-widest text-primary-foreground uppercase opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  {g.category}
                </span>
              </button>
            ))}
          </div>
        )}
      </section>

      {idx !== null && items[idx] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/95 p-4"
          onClick={() => setIdx(null)}
          onTouchStart={(e) => (touch.current = e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = (e.changedTouches[0]?.clientX ?? touch.current) - touch.current;
            if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1);
            touch.current = null;
          }}
        >
          <button autoFocus aria-label="Close" className="absolute top-4 right-4 p-3 text-primary-foreground" onClick={() => setIdx(null)}>
            <X />
          </button>
          <button aria-label="Previous" className="absolute left-2 p-3 text-primary-foreground" onClick={(e) => (e.stopPropagation(), move(-1))}>
            <ChevronLeft className="h-8 w-8" />
          </button>
          <figure className="max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={items[idx].src} alt={items[idx].alt} className="max-h-[80vh] w-auto object-contain" />
            <figcaption className="mt-3 text-center text-sm text-primary-foreground/80">{items[idx].alt}</figcaption>
          </figure>
          <button aria-label="Next" className="absolute right-2 p-3 text-primary-foreground" onClick={(e) => (e.stopPropagation(), move(1))}>
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
      <BookingCTA />
    </>
  );
}
