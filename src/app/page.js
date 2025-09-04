"use client";

import Link from "next/link";
import ServicesSection from "./components/ServicesSection";
import Services from "./components/Services";
import SectorsWeCover from "./components/SectorsWeCover";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Grid } from 'swiper/modules';
import TestimonialCard from "./components/TestimonialCard";
import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/grid';

export default function Home() {

  return (
    <main>
      <div
        className="bg-blue-400 w-full bg-cover bg-center bg-no-repeat min-h-[24rem] sm:min-h-[28rem] md:min-h-[32rem] lg:min-h-[40rem]"
        style={{ backgroundImage: "url('/images/home-wallpaper-3.jpg')" }}
      >
        <div className="flex flex-col w-full px-4 py-12 sm:px-8 md:px-16 lg:px-24 xl:px-48">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mt-8 text-white my-4 text-center md:text-left">Siguria juaj, prioriteti ynë</h1>
          <p className="text-white my-4 text-base sm:text-lg md:text-xl text-center md:text-left">Mbrojtje e sigurt, teknologji moderne</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 items-center md:items-start justify-center md:justify-start">
            <Link href="/contact">
              <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-[#3b82f6] text-white rounded font-semibold relative overflow-hidden group text-base sm:text-lg">
                <span className="relative z-10">Na kontakto</span>
                <div className="absolute inset-0 bg-[#363aad] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1200 origin-left"></div>
                <div className="absolute inset-0 bg-[#363aad] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1200 origin-right"></div>
              </button>
            </Link>
            <Link href="/about">
              <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-[#3b82f6] text-white rounded font-semibold relative overflow-hidden group text-base sm:text-lg">
                <span className="relative z-10">Rreth Nesh</span>
                <div className="absolute inset-0 bg-[#363aad] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1200 origin-left"></div>
                <div className="absolute inset-0 bg-[#363aad] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1200 origin-right"></div>
              </button>
            </Link>
          </div>
          {/*<ServicesSection /> */}
        </div>
      </div>
      <Services />
      <SectorsWeCover />
      <section className="bg-black bg-cover bg-center bg-no-repeat mt-12"
        style={{ backgroundImage: "url('/images/home-wallpaper-1.jpg')" }}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-white font-bold text-center pt-8 sm:pt-12">Çfarë thonë klientët për ne</h1>
        <p className="text-white text-center px-4 sm:px-12 md:px-24 lg:px-122 mt-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus quam neque quibusdam corrupti aspernatur corporis alias nisi dolorum expedita veritatis voluptates minima.</p>
        <div className="px-2 sm:px-8 md:px-24 lg:mx-48 pb-8 sm:pb-12 mb-12 sm:mb-24">
          <Swiper
            slidesPerView={1}
            breakpoints={{
              1024: { slidesPerView: 3 }
            }}
            spaceBetween={20}
            modules={[Pagination]}
            className="mySwiper"
          >
            {[...Array(6)].map((_, i) => (
              <SwiperSlide key={i} className="!h-auto flex">
                <div className="h-full my-6 sm:my-12 pt-6 sm:pt-12">
                  <TestimonialCard
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor incididunt ut labore et dolore."
                    rating={5}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </main>
  );
}
