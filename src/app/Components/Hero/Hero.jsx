"use client";
import React from "react";
import "./Hero.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Hero = () => {
  return (
    <section className="hero">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image
            src="/images/banner1.jpg"
            alt="hero"
            width={1000}
            height={1000}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/banner2.jpg"
            alt="hero"
            width={1000}
            height={1000}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/banner3.jpg"
            alt="hero"
            width={1000}
            height={1000}
          />
        </SwiperSlide>
      </Swiper>{" "}
    </section>
  );
};

export default Hero;
