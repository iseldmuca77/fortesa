import SectionHeading from "./SectionHeading";
import Faq from "./Faq";
import JsonLd from "./JsonLd";
import { faqSchema, graph } from "../lib/schema";

/** A titled FAQ block with matching FAQPage structured data. */
export default function FaqSection({ eyebrow = "Pyetje të shpeshta", title, lead, items }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <JsonLd data={graph(faqSchema(items))} />
      <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />
      <Faq items={items} className="mx-auto mt-14 max-w-3xl" />
    </section>
  );
}
