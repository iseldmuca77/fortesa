import { ROUTES, SERVICES, SITE, serviceHref } from "./site";
import { SEO_KEYWORDS } from "./seo";

/** Absolute URL for a site path. */
export const abs = (path = "/") => new URL(path, SITE.url).toString();

export const BUSINESS_ID = `${SITE.url}/#business`;
export const WEBSITE_ID = `${SITE.url}/#website`;

const WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AREA_SERVED = [
  { "@type": "City", name: SITE.city },
  { "@type": "Country", name: "Albania" },
];

/** The company itself: a local business in Tiranë offering the services catalogue. */
export function businessSchema() {
  const node = {
    "@type": ["LocalBusiness", "ProfessionalService", "Electrician"],
    "@id": BUSINESS_ID,
    name: SITE.name,
    alternateName: ["Fortesa Albania", "Fortesa.al"],
    slogan: SITE.tagline,
    description: SITE.description,
    url: abs("/"),
    telephone: SITE.phoneE164,
    email: SITE.email,
    image: abs("/opengraph-image"),
    logo: abs("/icon.svg"),
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.street,
      addressLocality: SITE.city,
      addressCountry: SITE.countryCode,
    },
    areaServed: AREA_SERVED,
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: WEEK, opens: "00:00", closes: "23:59" },
    ],
    knowsAbout: SEO_KEYWORDS,
    knowsLanguage: ["sq", "en"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Shërbimet e Fortesa",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          "@id": `${abs(serviceHref(service.slug))}#service`,
          name: service.title,
          description: service.description,
          url: abs(serviceHref(service.slug)),
        },
      })),
    },
  };
  if (SITE.socials.length > 0) node.sameAs = SITE.socials;
  return node;
}

export function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: abs("/"),
    name: SITE.name,
    inLanguage: "sq",
    publisher: { "@id": BUSINESS_ID },
  };
}

/** One service page. */
export function serviceSchema(service, details) {
  const url = abs(serviceHref(service.slug));
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    serviceType: service.title,
    description: details.seoDescription,
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed: AREA_SERVED,
    inLanguage: "sq",
  };
}

export function faqSchema(faqs) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** items: [{ name, href }] from the home page down to the current page. */
export function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(item.href),
    })),
  };
}

/** The services index as an ordered list of the service pages. */
export function servicesListSchema() {
  return {
    "@type": "ItemList",
    "@id": `${abs(ROUTES.services)}#list`,
    name: "Shërbimet e Fortesa",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: abs(serviceHref(service.slug)),
    })),
  };
}

/** Wrap nodes in a single JSON-LD graph. */
export function graph(...nodes) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
