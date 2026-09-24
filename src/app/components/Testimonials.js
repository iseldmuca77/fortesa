"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SectionHeading from "./SectionHeading";
import TestimonialCard from "./TestimonialCard";

// TODO: replace these placeholder quotes with real client testimonials.
const TESTIMONIALS = [
  {
    text: "Montimi i kamerave u krye shpejt dhe me profesionalizëm. Tani e monitoroj dyqanin nga telefoni kudo që jam.",
    author: "Pronar dyqani",
    rating: 5,
  },
  {
    text: "Sistemi i alarmit na jep qetësi të plotë. Ekipi ishte i saktë, i sjellshëm dhe gjithmonë i gatshëm për ndihmë.",
    author: "Klient privat",
    rating: 5,
  },
  {
    text: "Instalimet elektrike u bënë me korrektësi dhe brenda afatit. I rekomandojmë pa hezitim.",
    author: "Administrator biznesi",
    rating: 5,
  },
  {
    text: "Shërbim i shpejtë dhe çmime korrekte. Mirëmbajtja periodike na ka kursyer shumë probleme.",
    author: "Menaxher hoteli",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream-2/60 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Klientët tanë"
          title="Çfarë thonë klientët për ne"
          lead="Mbi 250 klientë na kanë besuar sigurinë e shtëpive dhe bizneseve të tyre."
        />
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          spaceBetween={24}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
          className="testimonials-swiper mt-14"
        >
          {TESTIMONIALS.map((item) => (
            <SwiperSlide key={item.author}>
              <TestimonialCard text={item.text} author={item.author} rating={item.rating} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
