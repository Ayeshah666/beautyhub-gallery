import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { BookingCTA, Btn, PageHeader } from "@/components/site";
import { services, whatsappUrl } from "@/lib/business";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Braids, Barbering, Nails, Facials & Massage — Beauty With Jackie Nairobi" },
      { name: "description", content: "Hair braiding, haircuts, hair coloring, manicure, pedicure, facials and massage in Nairobi. Ask on WhatsApp for pricing." },
      { property: "og:title", content: "Services — Beauty With Jackie, Nairobi" },
      { property: "og:description", content: "Hair, barbering, nails, skincare and spa services in Nairobi." },
    ],
  }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHeader eyebrow="Our services" title="Care for Every Part of You" text="Hair, grooming, nails, skin and relaxation — all under one roof." />
      <nav aria-label="Service categories" className="sticky top-[72px] z-20 overflow-x-auto border-b bg-background">
        <ul className="mx-auto flex max-w-7xl gap-6 px-5 py-4 text-sm whitespace-nowrap md:px-8">
          {services.map((s) => (
            <li key={s.slug}>
              <a href={`#${s.slug}`} className="link-underline">{s.title}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} className="grid scroll-mt-36 items-center gap-10 border-b py-20 md:grid-cols-2 md:gap-16">
            <img
              src={s.image}
              alt={s.title}
              loading="lazy"
              width={1024}
              height={1024}
              className={`aspect-[4/3] w-full object-cover ${i % 2 ? "md:order-2" : ""}`}
            />
            <div>
              <p className="eyebrow">0{i + 1}</p>
              <h2 className="mt-3 text-4xl md:text-5xl">{s.title}</h2>
              <p className="mt-5 text-muted-foreground">{s.description}</p>
              <dl className="mt-8 space-y-5 text-sm">
                <div>
                  <dt className="font-semibold">Who it may suit</dt>
                  <dd className="mt-1 text-muted-foreground">{s.suits}</dd>
                </div>
                <div>
                  <dt className="font-semibold">What to expect</dt>
                  <dd className="mt-1 text-muted-foreground">{s.expect}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Pricing &amp; duration</dt>
                  <dd className="mt-1 text-muted-foreground">{s.price}</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Btn href={whatsappUrl(`Hello Beauty With Jackie! I'd like to book ${s.title}. What times are available?`)} external>
                  <MessageCircle className="h-4 w-4" /> Enquire to Book
                </Btn>
                <Btn
                  href={whatsappUrl(`Hello Beauty With Jackie! Could you share the current price and duration for ${s.title}?`)}
                  variant="outline"
                  external
                >
                  Ask Price &amp; Duration
                </Btn>
              </div>
            </div>
          </section>
        ))}
      </div>
      <BookingCTA />
    </>
  );
}
