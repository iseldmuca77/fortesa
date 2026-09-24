import PageHeader from "../components/PageHeader";
import Services from "../components/Services";
import CtaBand from "../components/CtaBand";
import JsonLd from "../components/JsonLd";
import { ROUTES, SITE } from "../lib/site";
import { pageMetadata } from "../lib/seo";
import { breadcrumbSchema, graph, servicesListSchema } from "../lib/schema";

const CRUMBS = [
  { name: "Kreu", href: ROUTES.home },
  { name: "Shërbimet", href: ROUTES.services },
];

export const metadata = pageMetadata({
  title: "Shërbimet",
  description:
    "Të gjitha shërbimet e Fortesa në Tiranë: kamera sigurie, alarme, instalime elektrike, GPS, tra parkimi, porta automatike, detektim zjarri, brava, Wi-Fi, telefoni dhe audio.",
  path: ROUTES.services,
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={graph(servicesListSchema(), breadcrumbSchema(CRUMBS))} />
      <PageHeader
        eyebrow="Shërbimet"
        title="Çfarë ofrojmë"
        lead={`Nga kamerat e sigurisë dhe alarmet te GPS, portat automatike, rrjetet dhe zgjidhjet për hoteleri: montim, monitorim dhe mirëmbajtje nga një ekip i vetëm, ${SITE.serviceAreaText}.`}
        breadcrumbs={CRUMBS}
      />
      <Services showHeading={false} />
      <CtaBand />
    </>
  );
}
