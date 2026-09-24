import Link from "next/link";
import { PhoneIcon } from "./Icons";
import { SITE } from "../lib/site";

/** Gold call-to-action band, echoing the bar at the bottom of the business card. */
export default function CtaBand() {
  return (
    <section className="bg-gold text-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            Gati për të siguruar shtëpinë apo biznesin tuaj?
          </h2>
          <p className="mt-3 max-w-xl text-base font-medium text-ink/75">
            Na telefononi ose na shkruani dhe do t&#39;ju përgjigjemi sa më shpejt.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-3 font-display text-2xl font-extrabold tracking-wide transition-opacity hover:opacity-80"
          >
            <PhoneIcon className="h-6 w-6" />
            {SITE.phoneDisplay}
          </a>
          <Link href="/kontakt" className="btn btn-dark">
            Na Kontaktoni
          </Link>
        </div>
      </div>
    </section>
  );
}
