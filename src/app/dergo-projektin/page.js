import Link from "next/link";
import PageHeader from "../components/PageHeader";
import ProjectUploadForm from "../components/ProjectUploadForm";
import { SITE } from "../lib/site";
import { pageMetadata } from "../lib/seo";
import { getProjectUploadAvailability } from "../lib/project-upload-server";

export const metadata = { ...pageMetadata({
  title: "Dërgoni projektin për ofertë",
  description: "Dërgoni planet në PDF ose DWG dhe numrin tuaj të WhatsApp. Fortesa shqyrton projektin dhe përgatit ofertë të detajuar për shërbimet e kërkuara.",
  path: "/dergo-projektin",
}), ...(!getProjectUploadAvailability() ? { robots: { index: false, follow: true } } : {}) };

const STEPS = [
  { title: "Dërgoni planet", text: "Ngarkoni skedarët e projektit dhe shënoni shërbimet për të cilat kërkoni ofertë." },
  { title: "Sqarojmë projektin", text: "Shqyrtojmë planet dhe ju kontaktojmë për detajet që duhen sqaruar." },
  { title: "Merrni ofertën në WhatsApp", text: "Përgatisim ofertën me zërat dhe kostot përkatëse për shërbimet e kërkuara." },
];

export default async function ProjectUploadPage() {
  const enabled = await getProjectUploadAvailability();
  return (
    <>
      <PageHeader
        eyebrow="Për arkitektë dhe studio projektimi"
        title="Nga plani te oferta e detajuar"
        lead="Dërgoni projektin në PDF ose DWG dhe lini numrin tuaj të WhatsApp. Fortesa shqyrton planet dhe përgatit ofertën për instalimet dhe sistemet që ju nevojiten."
        breadcrumbs={[{ name: "Kreu", href: "/" }, { name: "Dërgo projektin", href: "/dergo-projektin" }]}
      >
        <div className="flex flex-wrap gap-3 text-xs font-semibold tracking-wide">
          <span className="rounded-full border border-gold/30 px-4 py-2 text-cream/85">PDF / DWG</span>
          <span className="rounded-full border border-gold/30 px-4 py-2 text-cream/85">Shqyrtim nga ekipi</span>
          <span className="rounded-full border border-gold/30 px-4 py-2 text-cream/85">Ofertë në WhatsApp</span>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 rounded-2xl border border-cream-3 bg-white p-5 shadow-sm sm:p-8 lg:col-span-7 lg:p-10">
            <h2 className="font-display text-2xl font-extrabold">Dërgoni projektin për ofertë</h2>
            <p className="mb-8 mt-3 text-sm leading-relaxed text-muted">Përfshini planet dhe informacionin që na ndihmon të kuptojmë punën. Ju kontaktojmë në WhatsApp për sqarimet dhe ofertën.</p>
            <ProjectUploadForm enabled={enabled} />
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-gold/25 bg-ink p-6 text-cream sm:p-8">
              <p className="eyebrow">Si funksionon</p>
              <ol className="mt-7 space-y-7">
                {STEPS.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/40 text-sm font-bold text-gold">{index + 1}</span>
                    <div><h3 className="font-bold">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-dark">{step.text}</p></div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-cream-3 bg-cream-2/50 p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold">Çfarë përfshin oferta?</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">Oferta lidhet me punimet dhe sistemet që kërkoni nga Fortesa: instalime elektrike, kamera, alarme dhe shërbime të tjera sipas projektit. Pajisjet, sasitë dhe punimet sqarohen gjatë shqyrtimit.</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">Kostot përgatiten nga ekipi pas shqyrtimit të planeve dhe sqarimit të kërkesës.</p>
              <Link href="/sherbimet" className="mt-4 inline-flex text-sm font-bold text-gold-deep underline underline-offset-4">Shikoni shërbimet e Fortesa</Link>
            </div>

            <div className="px-2 text-sm leading-relaxed text-muted">
              <h2 className="font-bold text-ink">Skedarët e projektit mbeten privatë</h2>
              <p className="mt-2">Skedarët dhe të dhënat tuaja përdoren për shqyrtimin e kërkesës dhe komunikimin për ofertën. Projektet e ngarkuara nuk publikohen në faqe.</p>
              <p className="mt-4">Keni një pyetje përpara se ta dërgoni? <a href={SITE.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline underline-offset-4">Na shkruani në WhatsApp</a>.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
