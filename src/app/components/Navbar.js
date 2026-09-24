"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { MenuIcon, PhoneIcon, XIcon } from "./Icons";
import { NAV_LINKS, SITE } from "../lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-ink/95 text-cream backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Fortesa, faqja kryesore" className="flex items-center">
          <Logo variant="dark" size="md" />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Navigimi kryesor" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-sm font-semibold tracking-wide transition-colors ${
                isActive(link.href) ? "text-gold" : "text-cream/75 hover:text-cream"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-cream/80 transition-colors hover:text-gold"
          >
            <PhoneIcon className="h-4 w-4 text-gold" />
            {SITE.phoneDisplay}
          </a>
          <Link href="/kontakt" className="btn btn-gold btn-sm">
            Na Kontaktoni
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Mbyll menunë" : "Hap menunë"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-cream/80 transition-colors hover:text-gold md:hidden"
        >
          {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile navigation */}
      {open && (
        <div id="mobile-nav" className="border-t border-gold/20 bg-ink md:hidden">
          <nav aria-label="Navigimi mobil" className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`block rounded-md px-3 py-3 text-base font-semibold transition-colors ${
                  isActive(link.href) ? "bg-ink-2 text-gold" : "text-cream/80 hover:bg-ink-2 hover:text-cream"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3 border-t border-ink-3 pt-4">
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 px-3 text-sm font-semibold text-cream/80"
              >
                <PhoneIcon className="h-4 w-4 text-gold" />
                {SITE.phoneDisplay}
              </a>
              <Link href="/kontakt" onClick={() => setOpen(false)} className="btn btn-gold">
                Na Kontaktoni
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
