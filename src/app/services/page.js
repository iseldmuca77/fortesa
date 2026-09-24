import PageHeader from "../components/PageHeader";
import Services from "../components/Services";
import CtaBand from "../components/CtaBand";

export const metadata = {
  title: "Shërbimet",
  description:
    "Kamera sigurie, sisteme alarmi, instalime elektrike, GPS për makina, sisteme parkingu, porta automatike, detektim zjarri, brava elektrike, rrjete Wi-Fi, telefoni dhe audio nga Fortesa.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Shërbimet"
        title="Çfarë ofrojmë"
        lead="Nga kamerat e sigurisë dhe alarmet te GPS, portat automatike, rrjetet dhe zgjidhjet për hoteleri: montim, monitorim dhe mirëmbajtje nga një ekip i vetëm."
      />
      <Services showHeading={false} />
      <CtaBand />
    </>
  );
}
