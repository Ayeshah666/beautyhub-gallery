import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Phone, MessageCircle, MapPin, Star } from "lucide-react";
import { business, mapsUrl, telUrl, whatsappUrl, services } from "@/lib/business";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "Our Story" },
  { to: "/gallery", label: "Gallery" },
  { to: "/", hash: "reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function Btn({
  href,
  children,
  variant = "solid",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "rose" | "light";
  external?: boolean;
}) {
  const styles = {
    solid: "bg-primary text-primary-foreground hover:bg-primary/85",
    outline: "border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
    rose: "bg-accent text-accent-foreground hover:bg-accent/85",
    light: "border border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground hover:text-primary",
  }[variant];
  const cls = `inline-flex min-h-12 items-center justify-center gap-2 px-7 text-sm font-semibold tracking-wide transition-colors duration-300 ${styles}`;
  if (href.startsWith("/"))
    return (
      <Link to={href} className={cls}>
        {children}
      </Link>
    );
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}

export function Rating({ light }: { light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 text-sm ${light ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
      <span className="flex text-accent" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </span>
      <span>
        Rated {business.rating}/5 on Google · {business.reviewCount} Reviews
      </span>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "border-b bg-background/95 backdrop-blur" : "bg-background"}`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="font-display text-2xl leading-none" onClick={() => setOpen(false)}>
          Beauty <em className="text-accent">with</em> Jackie
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              hash={"hash" in n ? n.hash : undefined}
              className="link-underline text-sm"
              activeOptions={{ exact: true, includeHash: true }}
              activeProps={{ className: "text-accent" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Btn href={whatsappUrl()} external>
            Book an Appointment
          </Btn>
        </div>
        <button
          className="flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div
        className={`fixed inset-x-0 top-[72px] bottom-0 bg-background transition-all duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible -translate-y-2 opacity-0"}`}
      >
        <nav className="flex flex-col gap-1 px-6 py-8" aria-label="Mobile">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              hash={"hash" in n ? n.hash : undefined}
              onClick={() => setOpen(false)}
              className="border-b py-4 font-display text-3xl"
            >
              {n.label}
            </Link>
          ))}
          <div className="mt-8">
            <Btn href={whatsappUrl()} external>
              Book an Appointment
            </Btn>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-primary pb-28 text-primary-foreground md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <p className="font-display text-3xl">Beauty with Jackie</p>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">{business.name}</p>
          <p className="mt-6 flex items-start gap-2 text-sm text-primary-foreground/80">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {business.plusCode}
          </p>
          <a href={telUrl} className="mt-2 flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground">
            <Phone className="h-4 w-4" /> {business.phoneDisplay}
          </a>
          <div className="mt-6 flex flex-wrap gap-3">
            <Btn href={whatsappUrl()} variant="rose" external>
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Btn>
            <Btn href={mapsUrl} variant="light" external>
              Get Directions
            </Btn>
          </div>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            {nav.map((n) => (
              <li key={n.label}>
                <Link to={n.to} hash={"hash" in n ? n.hash : undefined} className="link-underline">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services" hash={s.slug} className="link-underline">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-6 text-center text-xs text-primary-foreground/60">
        © {new Date().getFullYear()} {business.name}. Photos are illustrative.
      </div>
    </footer>
  );
}

function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t bg-background md:hidden">
      <a href={telUrl} className="flex min-h-14 items-center justify-center gap-2 text-sm font-semibold">
        <Phone className="h-4 w-4" /> Call
      </a>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 items-center justify-center gap-2 bg-primary text-sm font-semibold text-primary-foreground"
      >
        <MessageCircle className="h-4 w-4" /> WhatsApp
      </a>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-3">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}

export function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="border-b bg-muted">
      <div className="reveal mx-auto max-w-4xl px-5 py-20 text-center md:py-28">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 text-5xl leading-[1.05] md:text-7xl">{title}</h1>
        {text && <p className="mx-auto mt-6 max-w-xl text-muted-foreground">{text}</p>}
      </div>
    </section>
  );
}

export function BookingCTA() {
  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <p className="eyebrow">Book with us</p>
        <h2 className="mt-5 text-4xl leading-tight md:text-6xl">Your Next Self-Care Moment Starts Here.</h2>
        <p className="mx-auto mt-6 max-w-xl text-secondary-foreground/80">
          Ready for a fresh look or a little time to unwind? Get in touch and let us help you find the right service.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Btn href={whatsappUrl()} external>
            <MessageCircle className="h-4 w-4" /> Book on WhatsApp
          </Btn>
          <Btn href={telUrl} variant="outline">
            <Phone className="h-4 w-4" /> Call the Salon
          </Btn>
        </div>
      </div>
    </section>
  );
}
