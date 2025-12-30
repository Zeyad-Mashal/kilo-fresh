"use client";
import React from "react";
import "./CutsSection.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { FaRegEye } from "react-icons/fa";

const CutsSection = () => {
  const cutsItems = [
    {
      id: 1,
      image: "/images/p1.png",
      discount: "-10%",
      title: "المجزءات",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 2,
      image: "/images/p1.png",
      discount: "-10%",
      title: "المجزءات",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 3,
      image: "/images/p1.png",
      discount: "-10%",
      title: "المجزءات",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 4,
      image: "/images/p1.png",
      discount: "-10%",
      title: "المجزءات",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 5,
      image: "/images/p1.png",
      discount: "-10%",
      title: "المجزءات",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 6,
      image: "/images/p1.png",
      discount: "-10%",
      title: "المجزءات",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 7,
      image: "/images/p1.png",
      discount: "-10%",
      title: "المجزءات",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 8,
      image: "/images/p1.png",
      discount: "-10%",
      title: "المجزءات",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
  ];

  return (
    <div className="CutsSection">
      <div className="CutsSection_container">
        <h1>المجزءات</h1>
        <div className="CutsSection_list">
          {cutsItems.map((item) => (
            <div
              key={item.id}
              className="CutsSection_item CutsSection_item_desktop"
            >
              <Image
                src={item.image}
                alt="CutsSection_item"
                width={100}
                height={100}
              />
              <span>{item.discount}</span>
              <h2>{item.title}</h2>
              <div className="CutsSection_item_price">
                <p>{item.price}</p>
                <p>{item.oldPrice}</p>
              </div>
              <button>اشتري الآن</button>
            </div>
          ))}
          <div className="CutsSection_items_mobile">
            <Swiper
              slidesPerView={1.5}
              spaceBetween={10}
              className="CutsSection_swiper"
            >
              {cutsItems.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="CutsSection_item">
                    <Image
                      src={item.image}
                      alt="CutsSection_item"
                      width={100}
                      height={100}
                    />
                    <span>{item.discount}</span>
                    <h2>{item.title}</h2>
                    <div className="CutsSection_item_price">
                      <p>{item.price}</p>
                      <p>{item.oldPrice}</p>
                    </div>
                    <button>اشتري الآن</button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <button>
            عرض الكل
            <FaRegEye />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CutsSection;

