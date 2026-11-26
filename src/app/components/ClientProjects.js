import Link from "next/link";
import ProjectGallery from "./ProjectGallery";
import { CLIENT_PROJECTS } from "../lib/client-projects";
import { ArrowRightIcon } from "./Icons";

export default function ClientProjects() {
  return (
    <section id="klientet" aria-labelledby="client-projects-heading" className="scroll-mt-24 bg-ink text-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Punime nga terreni</p>
            <h2 id="client-projects-heading" className="mt-5 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
              Klientët dhe projektet tona
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
              Pamje nga punimet e Fortesa-s në biznese, hotele, institucione dhe automjete.
            </p>
          </div>
          <p className="text-sm font-semibold text-gold">Foto dhe video nga instalimet tona</p>
        </div>

        <ProjectGallery projects={CLIENT_PROJECTS} />

        <div className="mt-10 flex flex-col justify-between gap-5 border-t border-gold/25 pt-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-bold">Ju duhet një instalim i ngjashëm?</p>
            <p className="mt-2 text-sm leading-relaxed text-cream/70">Na tregoni objektin dhe punën që ju nevojitet.</p>
          </div>
          <Link href="/kontakt" className="btn btn-gold shrink-0">
            Na kontaktoni <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
