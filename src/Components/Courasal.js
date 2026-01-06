"use client";

import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";

const HomeCarousel = ({ section_images }) => {
  const swiperRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mediaQuery.matches);

    const handler = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={false}
        loop
        onBeforeInit={(swiper) => (swiperRef.current = swiper)}
        autoplay={
          !isDesktop
            ? { delay: 3000, disableOnInteraction: false }
            : false
        }
        className="rounded-[20px] overflow-hidden"
      >
        {section_images.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Link href={slide?.desktop_banner?.redirect_url || "#"}>
              <img
                src={baseUrl + slide?.desktop_banner?.original}
                alt={slide?.desktop_banner?.title || "Promotional banner"}
                className="hidden lg:block w-full object-cover rounded-xl"
              />
            </Link>

            <Link href={slide?.mobile_banner?.redirect_url || "#"}>
              <img
                src={baseUrl + slide?.mobile_banner?.original}
                alt={slide?.mobile_banner?.title || "Promotional banner"}
                className="block lg:hidden w-full object-cover rounded-xl"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="hidden md:flex absolute top-1/2 left-4 -translate-y-1/2 bg-white shadow-md hover:bg-gray-50 p-2 rounded-full z-10"
      >
        <IoChevronBack size={22} className="text-gray-700" />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="hidden md:flex absolute top-1/2 right-4 -translate-y-1/2 bg-white shadow-md hover:bg-gray-50 p-2 rounded-full z-10"
      >
        <IoChevronForward size={22} className="text-gray-700" />
      </button>
    </div>
  );
};

export default HomeCarousel;
