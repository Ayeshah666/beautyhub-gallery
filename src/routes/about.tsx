import { createFileRoute } from "@tanstack/react-router";
import { Camera, UserRound } from "lucide-react";
import { BookingCTA, PageHeader } from "@/components/site";
import { images } from "@/lib/business";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story | Beauty With Jackie Salon & Spa, Nairobi" },
      { name: "description", content: "A welcoming Nairobi salon, barbershop and spa focused on attentive, personal beauty care." },
      { property: "og:title", content: "Our Story — Beauty With Jackie" },
      { property: "og:description", content: "A beauty experience that puts you first." },
    ],
  }),
  component: About,
});

const values = [
  { t: "Attentive service", d: "Clients regularly mention staff who are professional, friendly and attentive." },
  { t: "Detail-focused care", d: "From braids to color correction, we take time to get it right." },
  { t: "Room to relax", d: "Massages, facials and pedicures in a calm, welcoming space." },
];

function About() {
  return (
    <>
      <PageHeader eyebrow="Our story" title="A Beauty Experience That Puts You First." />
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8">
        <img src={images.interior} alt="Warm, modern salon interior" loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full object-cover" />
        <div>
          <p className="font-display text-3xl leading-snug">
            At Beauty With Jackie Kenya Barbershop Salon and Spa, we believe every visit should leave you feeling cared for and
            confident.
          </p>
          <p className="mt-6 text-muted-foreground">
            From hair and grooming services to nail care and spa treatments, our aim is to make your beauty routine feel personal,
            welcoming, and worth your time.
          </p>
        </div>
      </section>
      <section className="bg-card py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-3 md:px-8">
          {values.map((v, i) => (
            <div key={v.t} className="border-t pt-6">
              <span className="font-display text-xl text-accent">0{i + 1}</span>
              <h2 className="mt-3 text-3xl">{v.t}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-24 md:grid-cols-2 md:px-8">
        <div className="flex flex-col items-center justify-center border border-dashed p-12 text-center">
          <UserRound className="h-8 w-8 text-accent" />
          <h2 className="mt-4 text-3xl">Meet Jackie</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">An introduction from the owner is coming soon.</p>
        </div>
        <div className="flex flex-col items-center justify-center border border-dashed p-12 text-center">
          <Camera className="h-8 w-8 text-accent" />
          <h2 className="mt-4 text-3xl">Our Team</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">Team photos will be added here soon.</p>
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
