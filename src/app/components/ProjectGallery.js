"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, XIcon } from "./Icons";

function PlayIcon({ className = "h-5 w-5" }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}><path d="m8 5 11 7-11 7V5Z" /></svg>;
}

function mediaCount(media) {
  const photos = media.filter((item) => item.type === "image").length;
  const videos = media.filter((item) => item.type === "video").length;
  return [photos ? `${photos} foto` : null, videos ? `${videos} video` : null].filter(Boolean).join(" · ");
}

export default function ProjectGallery({ projects }) {
  const [activeProject, setActiveProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef(null);
  const openerRef = useRef(null);
  const activeMedia = activeProject?.media[activeIndex];

  useEffect(() => {
    if (!activeProject) return;
    const dialog = dialogRef.current;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      openerRef.current?.focus({ preventScroll: true });
    };
  }, [activeProject]);

  function openProject(project, event) {
    openerRef.current = event.currentTarget;
    setActiveIndex(0);
    setActiveProject(project);
  }

  function closeGallery() {
    dialogRef.current?.close();
    setActiveProject(null);
  }

  function moveMedia(direction) {
    setActiveIndex((index) => (index + direction + activeProject.media.length) % activeProject.media.length);
  }

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const cover = project.media[0];
          return (
            <article id={`projekt-${project.id}`} key={project.id} className={`group flex scroll-mt-24 flex-col overflow-hidden rounded-xl border border-cream/15 bg-ink-2 ${index === projects.length - 1 ? "md:col-span-2 md:flex-row lg:col-span-3" : ""}`}>
              <button
                type="button"
                onClick={(event) => openProject(project, event)}
                aria-label={`Shiko projektin: ${project.title}`}
                className={`relative block aspect-[4/3] w-full shrink-0 overflow-hidden bg-black text-left focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-gold ${index === projects.length - 1 ? "md:w-1/2 lg:w-1/3" : ""}`}
              >
                <Image src={cover.src} alt={cover.alt} fill sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.035]" style={{ objectPosition: cover.position || "center" }} />
                <span className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />
                <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/60 px-3 py-1.5 text-xs font-semibold text-white">{mediaCount(project.media)}</span>
                <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-gold text-ink" aria-hidden="true"><ArrowRightIcon className="h-4 w-4" /></span>
              </button>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4 text-xs font-semibold">
                  <span className="text-gold">{project.category}</span>
                  <span className="tabular-nums text-cream/40" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold leading-snug">{project.title}</h3>
                <p className="mb-5 mt-3 text-sm leading-relaxed text-cream/70">{project.description}</p>
                <button type="button" onClick={(event) => openProject(project, event)} aria-label={`Hap galerinë: ${project.title}`} className="mt-auto inline-flex min-h-11 items-center gap-2 self-start rounded text-sm font-bold text-gold hover:text-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
                  Shiko projektin <ArrowRightIcon className="h-4 w-4" />
                </button>
                <noscript><a href={cover.src} className="text-sm text-gold underline">Hap foton e projektit</a></noscript>
              </div>
            </article>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        onCancel={closeGallery}
        onClose={() => setActiveProject(null)}
        aria-labelledby="project-gallery-title"
        aria-describedby="project-gallery-description"
        onKeyDown={(event) => {
          if (!activeProject) return;
          if (event.key === "Tab") {
            const controls = [...event.currentTarget.querySelectorAll("button:not([disabled]), a[href], video[controls]")];
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last?.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first?.focus();
            }
            return;
          }
          if (event.target.closest("video")) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            moveMedia(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        className="project-dialog m-auto w-[calc(100%_-_1rem)] max-w-6xl overflow-hidden rounded-xl border border-gold/30 bg-ink text-cream shadow-2xl backdrop:bg-black/85"
      >
        {activeProject && (
          <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-cream/15 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gold">{activeProject.category}</p>
                <h2 id="project-gallery-title" className="mt-1 font-display text-lg font-bold sm:text-2xl">{activeProject.title}</h2>
              </div>
              <button type="button" onClick={closeGallery} aria-label="Mbyll galerinë" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cream/25 text-cream hover:bg-ink-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"><XIcon className="h-5 w-5" /></button>
            </div>

            <div className="min-h-0 overflow-y-auto overscroll-contain">
              <figure>
                <div className="relative flex h-[44dvh] min-h-48 items-center justify-center bg-black sm:h-[55dvh]">
                  {activeMedia.type === "video" ? (
                    <video key={activeMedia.src} controls playsInline muted preload="none" poster={activeMedia.poster} width={activeMedia.width} height={activeMedia.height} aria-label={activeMedia.alt} className="h-full w-full object-contain">
                      <source src={activeMedia.src} type="video/mp4" />
                      Shfletuesi juaj nuk e mbështet videon. <a href={activeMedia.src}>Hap videon</a>.
                    </video>
                  ) : (
                    <Image key={activeMedia.src} src={activeMedia.src} alt={activeMedia.alt} fill sizes="(min-width: 1280px) 1152px, 100vw" className="object-contain" />
                  )}
                </div>
                <figcaption className="px-4 pt-4 text-sm leading-relaxed text-cream/80 sm:px-6">{activeMedia.alt}</figcaption>
              </figure>

              <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
                <button type="button" onClick={() => moveMedia(-1)} aria-label="Pamja e mëparshme" className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 hover:bg-ink-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"><ArrowRightIcon className="h-5 w-5 rotate-180" /></button>
                <p aria-live="polite" aria-atomic="true" className="text-center text-sm text-cream/70">{activeMedia.type === "video" ? "Video" : "Foto"} · {activeIndex + 1} / {activeProject.media.length}</p>
                <button type="button" onClick={() => moveMedia(1)} aria-label="Pamja tjetër" className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 hover:bg-ink-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"><ArrowRightIcon className="h-5 w-5" /></button>
              </div>

              <div aria-label="Zgjidhni pamjen" className="flex gap-2 overflow-x-auto px-4 pb-4 sm:px-6">
                {activeProject.media.map((item, index) => (
                  <button key={item.src} type="button" onClick={() => setActiveIndex(index)} aria-label={`${item.type === "video" ? "Video" : "Foto"} ${index + 1}: ${item.alt}`} aria-pressed={index === activeIndex} className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-md border-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${index === activeIndex ? "border-gold" : "border-transparent opacity-65 hover:opacity-100"}`}>
                    <Image src={item.type === "video" ? item.poster : item.src} alt="" fill sizes="80px" className="object-cover" />
                    {item.type === "video" && <span className="absolute inset-0 flex items-center justify-center bg-black/25 text-white"><PlayIcon className="h-6 w-6" /></span>}
                  </button>
                ))}
              </div>

              <div className="flex flex-col justify-between gap-4 border-t border-cream/15 px-4 py-4 sm:flex-row sm:items-center sm:px-6">
                <p id="project-gallery-description" className="max-w-2xl text-sm leading-relaxed text-cream/70">{activeProject.description}</p>
                <Link href={activeProject.href} onClick={closeGallery} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded text-sm font-bold text-gold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">{activeProject.linkLabel}<ArrowRightIcon className="h-4 w-4" /></Link>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
