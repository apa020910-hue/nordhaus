/**
 * Central place for business details.
 * Replace the placeholders below when you adapt this demo for a real client.
 */
export const site = {
  name: "NORDHAUS",
  tagline: "Construction & Renovation",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  phone: "+371 20 555 555",
  phoneHref: "tel:+37120555555",
  whatsappHref: "https://wa.me/37120555555",
  email: "info@nordhaus.lv",
  address: {
    street: "Ganību dambis 24",
    postalCode: "LV-1005",
    city: "Rīga",
    country: "LV",
  },
  mapsHref: "https://www.google.com/maps/search/?api=1&query=Gan%C4%ABbu+dambis+24%2C+R%C4%ABga",
  hours: "Mon–Fri, 08:00–18:00",
  instagramHref: "https://www.instagram.com/",
  linkedinHref: "https://www.linkedin.com/",
  rating: 4.9,
  reviewCount: 70,
  stats: {
    years: "10+",
    projects: "150+",
    specialists: "20+",
    satisfaction: "98%",
  },
} as const;
