// Edit business info, services, images and hours here.
import hero from "@/assets/hero.jpg";
import barber from "@/assets/barber.jpg";
import nails from "@/assets/nails.jpg";
import massage from "@/assets/massage.jpg";
import facial from "@/assets/facial.jpg";
import color from "@/assets/color.jpg";
import interior from "@/assets/interior.jpg";

export const business = {
  name: "Beauty With Jackie Kenya Barbershop Salon and Spa",
  shortName: "Beauty With Jackie",
  plusCode: "PQPM+CRJ, Nairobi, Kenya",
  phoneDisplay: "+254 720 010061",
  phoneE164: "+254720010061",
  rating: "5.0",
  reviewCount: 148,
  hours: "Open 24 hours (as listed — please call to confirm)",
  googleReviewsUrl: "" as string, // add verified Google review link when available
};

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "PQPM+CRJ Nairobi Kenya",
)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent("PQPM+CRJ Nairobi Kenya")}&output=embed`;
export const telUrl = `tel:${business.phoneE164}`;

export const defaultWhatsAppMessage =
  "Hello Beauty With Jackie! I'd like to enquire about an appointment. Please share your available services and booking times.";
export const whatsappUrl = (msg = defaultWhatsAppMessage) =>
  `https://wa.me/254720010061?text=${encodeURIComponent(msg)}`;

export const images = { hero, barber, nails, massage, facial, color, interior };

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  suits: string;
  expect: string;
  image: string;
  price: string;
};

export const services: Service[] = [
  {
    slug: "hair-braiding",
    title: "Hair Styling & Braiding",
    short: "Beautiful styles, detailed braiding, and hair care tailored to your look.",
    description:
      "From neat everyday styles to detailed braids, we take time to understand the look you want and work carefully to achieve it.",
    suits: "Anyone wanting a fresh protective style, a new braided look, or general hair styling.",
    expect: "A consultation on your preferred style, followed by careful, attentive styling.",
    image: hero,
    price: "Contact us for current pricing",
  },
  {
    slug: "barbering",
    title: "Haircuts & Barbering",
    short: "Fresh cuts, neat finishes, and attention to every detail.",
    description: "Clean haircuts and grooming with a focus on neat lines and a finish you're happy with.",
    suits: "Clients looking for a regular trim, a new cut, or a sharp fresh finish.",
    expect: "A quick chat about the cut you want, then precise cutting and tidy finishing.",
    image: barber,
    price: "Contact us for current pricing",
  },
  {
    slug: "hair-coloring",
    title: "Hair Coloring",
    short: "Personalized color services and careful color-correction consultations.",
    description: "Whether you want a new shade or help correcting previous color, we start with a careful consultation.",
    suits: "Clients wanting a new color or needing advice on correcting existing color.",
    expect: "A consultation on your hair and goals before any color work begins.",
    image: color,
    price: "Request a quote",
  },
  {
    slug: "nails",
    title: "Manicure & Pedicure",
    short: "Give your hands and feet the care and finishing touches they deserve.",
    description: "Relaxing manicures and pedicures with neat, careful finishing for hands and feet.",
    suits: "Anyone wanting tidy, cared-for nails or a relaxing treat.",
    expect: "Nail shaping, care and finishing in a calm, comfortable setting.",
    image: nails,
    price: "Contact us for current pricing",
  },
  {
    slug: "facials",
    title: "Facials & Skincare",
    short: "Refresh your skincare routine with facial treatments tailored to your needs.",
    description: "Relaxing facial treatments chosen around your skin and what you'd like to focus on.",
    suits: "Clients wanting to refresh their skin or simply enjoy a calming treatment.",
    expect: "A short conversation about your skin, followed by a relaxing facial.",
    image: facial,
    price: "Contact us for current pricing",
  },
  {
    slug: "massage-spa",
    title: "Massage & Spa",
    short: "Make room for relaxation with soothing massage and spa experiences.",
    description: "Soothing massages, including deep-tissue options our clients often mention, to help you unwind.",
    suits: "Anyone needing time to relax and reset.",
    expect: "A quiet, comfortable space and a massage adjusted to your preferred pressure.",
    image: massage,
    price: "Contact us for current pricing",
  },
];

export const reviews = [
  {
    author: "Styled by Josie",
    text: "I had an amazing experience at Beauty with Jackie Barbershop, Salon and Spa. I received a healing massage, a perfect haircut, and a very relaxing manicure and pedicure. The staff were professional, friendly, and attentive throughout my visit.",
  },
  {
    author: "Luane de Oliveira Lucas",
    text: "Had an excellent service, got my hair color corrected and braided for the first time. The team was so attentive to perfection. I love it and highly recommend.",
  },
  {
    author: "Dorice Namukhasi",
    text: "Very good deep tissue massage by Jackie and relaxing facial treatment. My pedicure was awesome too — it was worth spending my money.",
  },
];

export type GalleryCategory = "Hair & Braiding" | "Haircuts & Barbering" | "Nails" | "Skincare & Facials" | "Massage & Spa" | "Salon Environment";

export const gallery: { src: string; alt: string; category: GalleryCategory }[] = [
  { src: hero, alt: "Long knotless braids styled in soft natural light", category: "Hair & Braiding" },
  { src: barber, alt: "Barber shaping a clean fade haircut", category: "Haircuts & Barbering" },
  { src: nails, alt: "Neat nude rose manicure on linen", category: "Nails" },
  { src: facial, alt: "Relaxing facial treatment", category: "Skincare & Facials" },
  { src: massage, alt: "Calming back massage with warm candlelight", category: "Massage & Spa" },
  { src: interior, alt: "Warm, modern salon styling station", category: "Salon Environment" },
  { src: color, alt: "Rich warm hair color on natural curls", category: "Hair & Braiding" },
];
