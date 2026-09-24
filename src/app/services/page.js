import PageHeader from "../components/PageHeader";
import Services from "../components/Services";
import CtaBand from "../components/CtaBand";

export const metadata = {
  title: "Shërbimet",
  description:
    "Kamera sigurie, sisteme alarmi dhe instalime elektrike nga Fortesa: montim, monitorim dhe mirëmbajtje për shtëpi dhe biznese.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shërbimet"
        title="Çfarë ofrojmë"
        lead="Kamera sigurie, sisteme alarmi dhe instalime elektrike: montim, monitorim dhe mirëmbajtje nga një ekip i vetëm."
      />
      <Services showHeading={false} />
      <CtaBand />
    </>
  );
}
