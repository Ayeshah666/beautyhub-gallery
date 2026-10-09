import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle, Quote } from "lucide-react";
import { BookingCTA, Btn, Rating } from "@/components/site";
import { business, gallery, images, mapsEmbed, mapsUrl, reviews, services, telUrl, whatsappUrl } from "@/lib/business";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Beauty With Jackie | Hair Salon, Barbershop & Spa in Nairobi" },
      {
        name: "description",
        content: "Braids, haircuts, hair color, manicures, pedicures, facials and massage in Nairobi. Rated 5.0 on Google. Book on WhatsApp.",
      },
      { property: "og:title", content: "Beauty With Jackie — Salon, Barbershop & Spa, Nairobi" },
      { property: "og:description", content: "Beauty, care & confidence — all in one place. Book on WhatsApp." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-8 pb-20 md:grid-cols-2 md:gap-16 md:px-8 md:pt-16">
        <div className="reveal">
          <p className="eyebrow">Your beauty, your moment</p>
          <h1 className="mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            Beauty, Care <em className="text-accent">&amp;</em> Confidence — All in One Place.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            From beautiful braids and precision haircuts to rejuvenating facials and relaxing spa treatments, discover a beauty
            experience designed around you.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Btn href={whatsappUrl()} external>
              Book Your Appointment
            </Btn>
            <Btn href="/services" variant="outline">
              Explore Our Services
            </Btn>
          </div>
          <div className="mt-8">
            <Rating />
          </div>
        </div>
        <div className="relative">
          <img
            src={images.hero}
            alt="Woman with long knotless braids in a warm salon setting"
            width={1024}
            height={1280}
            fetchPriority="high"
            className="aspect-[4/5] w-full object-cover shadow-soft"
          />
          <div className="absolute -bottom-6 -left-4 hidden bg-background px-6 py-4 shadow-soft md:block">
            <p className="font-display text-3xl">{business.rating}<span className="text-accent">★</span></p>
            <p className="text-xs text-muted-foreground">{business.reviewCount} Google reviews</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-card py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">Services</p>
            <h2 className="mt-4 text-4xl md:text-6xl">Your Complete Beauty Destination</h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to look refreshed, feel relaxed, and leave with confidence.
            </p>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} to="/services" hash={s.slug} className="group block">
                <div className="overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  Explore Service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-8">
        <div className="relative md:col-span-7">
          <img src={images.interior} alt="Warm modern salon styling station" loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full object-cover" />
          <img
            src={images.nails}
            alt="Freshly finished manicure"
            loading="lazy"
            width={1024}
            height={1024}
            className="absolute -right-4 -bottom-10 hidden w-2/5 border-8 border-background object-cover md:block"
          />
        </div>
        <div className="self-center md:col-span-5 md:pl-6">
          <p className="eyebrow">The experience</p>
          <h2 className="mt-4 text-4xl leading-tight md:text-5xl">More Than a Salon. A Moment for You.</h2>
          <p className="mt-6 text-muted-foreground">
            Beauty should feel as good as it looks. Whether you're refreshing your hairstyle, perfecting your nails, or taking time
            to unwind, we're here to make every visit feel personal.
          </p>
          <ul className="mt-8 divide-y border-y">
            {["Attentive service", "Detail-focused beauty care", "A welcoming experience"].map((v, i) => (
              <li key={v} className="flex items-baseline gap-5 py-4">
                <span className="font-display text-xl text-accent">0{i + 1}</span>
                <span className="font-display text-2xl">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="scroll-mt-20 bg-primary py-24 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Selected customer reviews</p>
              <h2 className="mt-4 text-4xl md:text-6xl">Loved by Our Clients</h2>
            </div>
            <Rating light />
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.author} className="flex flex-col border border-primary-foreground/15 p-8">
                <Quote className="h-8 w-8 text-accent" aria-hidden />
                <blockquote className="mt-6 flex-1 font-display text-xl leading-relaxed">“{r.text}”</blockquote>
                <figcaption className="mt-8 text-sm tracking-wide text-primary-foreground/70">— {r.author}</figcaption>
              </figure>
            ))}
          </div>
          {business.googleReviewsUrl && (
            <div className="mt-12">
              <Btn href={business.googleReviewsUrl} variant="light" external>
                Read More Reviews
              </Btn>
            </div>
          )}
        </div>
      </section>

      {/* Gallery preview */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Gallery</p>
            <h2 className="mt-4 text-4xl md:text-6xl">A Little Look at Beauty</h2>
          </div>
          <Btn href="/gallery" variant="outline">
            Explore Our Gallery
          </Btn>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {gallery.slice(0, 6).map((g, i) => (
            <Link
              key={g.alt}
              to="/gallery"
              className={`group relative overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`}
            >
              <img src={g.src} alt={g.alt} loading="lazy" className="aspect-square h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-primary/80 px-4 py-3 text-xs tracking-widest text-primary-foreground uppercase opacity-0 transition-opacity group-hover:opacity-100">
                {g.category}
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Illustrative imagery — real salon photos coming soon.</p>
      </section>

      <BookingCTA />

      {/* Location */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-2 md:px-8">
        <div>
          <p className="eyebrow">Visit us</p>
          <h2 className="mt-4 text-4xl md:text-5xl">Find the Salon</h2>
          <p className="mt-6 font-display text-2xl">{business.name}</p>
          <p className="mt-3 text-muted-foreground">{business.plusCode}</p>
          <a href={telUrl} className="mt-1 block text-muted-foreground hover:text-foreground">{business.phoneDisplay}</a>
          <p className="mt-1 text-sm text-muted-foreground">{business.hours}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Btn href={mapsUrl} external>Get Directions</Btn>
            <Btn href={whatsappUrl()} variant="outline" external>
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Btn>
          </div>
        </div>
        <iframe
          title="Map to Beauty With Jackie, Nairobi"
          src={mapsEmbed}
          loading="lazy"
          className="aspect-[4/3] w-full border-0 grayscale-[40%]"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
