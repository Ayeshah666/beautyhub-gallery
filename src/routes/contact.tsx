import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { Btn, PageHeader } from "@/components/site";
import { business, mapsEmbed, mapsUrl, services, telUrl, whatsappUrl } from "@/lib/business";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Appointments | Beauty With Jackie Nairobi" },
      { name: "description", content: "Book at Beauty With Jackie in Nairobi via WhatsApp or call +254 720 010061. PQPM+CRJ, Nairobi." },
      { property: "og:title", content: "Contact & Appointments — Beauty With Jackie" },
      { property: "og:description", content: "Send an appointment enquiry on WhatsApp." },
    ],
  }),
  component: Contact,
});

type Errors = Partial<Record<"name" | "phone" | "service" | "date" | "time", string>>;

function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = Object.fromEntries(f) as { name: string; phone: string; service: string; date: string; time: string; message: string };
    const err: Errors = {};
    if (!v.name?.trim()) err.name = "Please enter your name.";
    const phone = (v.phone || "").replace(/[\s-]/g, "");
    if (!/^(\+254|0)?7\d{8}$|^(\+254|0)?1\d{8}$/.test(phone)) err.phone = "Enter a valid Kenyan number, e.g. +254 7XX XXX XXX.";
    if (!v.service) err.service = "Please choose a service.";
    if (!v.date) err.date = "Please choose a date.";
    if (!v.time) err.time = "Please choose a time.";
    setErrors(err);
    if (Object.keys(err).length) return;
    const msg = `Hello Beauty With Jackie! I'd like to enquire about an appointment.\n\nName: ${v.name.trim()}\nPhone: ${phone}\nService: ${v.service}\nPreferred date: ${v.date}\nPreferred time: ${v.time}${v.message?.trim() ? `\nMessage: ${v.message.trim().slice(0, 500)}` : ""}`;
    window.open(whatsappUrl(msg), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const field = "mt-2 block min-h-12 w-full border bg-card px-4 text-base focus:border-accent focus:outline-none";
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <PageHeader eyebrow="Contact & appointments" title="Let's Plan Your Visit" text="WhatsApp is the quickest way to book." />
      <section className="mx-auto grid max-w-7xl gap-16 px-5 py-20 md:grid-cols-5 md:px-8">
        <div className="space-y-8 md:col-span-2">
          <div className="flex gap-4"><Phone className="mt-1 h-5 w-5 text-accent" /><div><p className="font-semibold">Phone / WhatsApp</p><a href={telUrl} className="text-muted-foreground hover:text-foreground">{business.phoneDisplay}</a></div></div>
          <div className="flex gap-4"><MapPin className="mt-1 h-5 w-5 text-accent" /><div><p className="font-semibold">Location</p><p className="text-muted-foreground">{business.plusCode}</p></div></div>
          <div className="flex gap-4"><Clock className="mt-1 h-5 w-5 text-accent" /><div><p className="font-semibold">Hours</p><p className="text-muted-foreground">{business.hours}</p></div></div>
          <div className="flex flex-col gap-3">
            <Btn href={whatsappUrl()} external><MessageCircle className="h-4 w-4" /> Book on WhatsApp</Btn>
            <Btn href={mapsUrl} variant="outline" external>Get Directions</Btn>
          </div>
          <iframe title="Map to Beauty With Jackie" src={mapsEmbed} loading="lazy" className="aspect-square w-full border-0" referrerPolicy="no-referrer-when-downgrade" />
        </div>

        <div className="md:col-span-3">
          <h2 className="text-4xl">Send an Enquiry</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            This opens WhatsApp with your details filled in. An enquiry is not a confirmed appointment until the salon replies.
          </p>
          {sent && (
            <div role="status" className="mt-6 border border-sage bg-sage/15 p-4 text-sm">
              WhatsApp should now be open with your message. Tap send there — the salon will reply to confirm.{" "}
              <button className="underline" onClick={() => setSent(false)}>Send another</button>
            </div>
          )}
          <form onSubmit={submit} noValidate className="mt-8 grid gap-6 sm:grid-cols-2">
            <Field label="Name" error={errors.name} id="name">
              <input id="name" name="name" autoComplete="name" maxLength={80} className={field} aria-invalid={!!errors.name} />
            </Field>
            <Field label="Phone number" error={errors.phone} id="phone">
              <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+254 7XX XXX XXX" className={field} aria-invalid={!!errors.phone} />
            </Field>
            <Field label="Preferred service" error={errors.service} id="service" wide>
              <select id="service" name="service" defaultValue="" className={field} aria-invalid={!!errors.service}>
                <option value="" disabled>Choose a service</option>
                {services.map((s) => <option key={s.slug}>{s.title}</option>)}
                <option>Not sure yet</option>
              </select>
            </Field>
            <Field label="Preferred date" error={errors.date} id="date">
              <input id="date" name="date" type="date" min={today} className={field} aria-invalid={!!errors.date} />
            </Field>
            <Field label="Preferred time" error={errors.time} id="time">
              <input id="time" name="time" type="time" className={field} aria-invalid={!!errors.time} />
            </Field>
            <Field label="Message (optional)" id="message" wide>
              <textarea id="message" name="message" rows={4} maxLength={500} className={`${field} py-3`} />
            </Field>
            <div className="sm:col-span-2">
              <button type="submit" className="inline-flex min-h-12 items-center gap-2 bg-primary px-8 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85">
                <MessageCircle className="h-4 w-4" /> Send via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, id, error, wide, children }: { label: string; id: string; error?: string | undefined; wide?: boolean; children: React.ReactNode }) {
  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="text-sm font-semibold">{label}</label>
      {children}
      {error && <p className="mt-1 text-sm text-destructive" role="alert">{error}</p>}
    </div>
  );
}
