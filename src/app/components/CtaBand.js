import Link from "next/link";
import { PhoneIcon } from "./Icons";
import { ROUTES, SITE } from "../lib/site";

/** Gold call-to-action band, echoing the bar at the bottom of the business card. */
export default function CtaBand({
  title = "Keni një instalim apo riparim për të planifikuar?",
  description = "Na tregoni punën dhe vendndodhjen për të diskutuar kërkesën tuaj.",
  contactHref = ROUTES.contact,
  contactLabel = "Përshkruani projektin",
}) {
  return (
    <section className="bg-gold text-ink">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-base font-medium text-ink/75">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-3 font-display text-2xl font-extrabold tracking-wide transition-opacity hover:opacity-80"
          >
            <PhoneIcon className="h-6 w-6" />
            {SITE.phoneDisplay}
          </a>
          <Link href={contactHref} className="btn btn-dark whitespace-normal text-center">
            {contactLabel}
          </Link>
          {SITE.whatsappHref && (
            <a href={SITE.whatsappHref} className="inline-flex min-h-11 items-center text-sm font-bold underline underline-offset-4 transition-opacity hover:opacity-80">
              Shkruani në WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
