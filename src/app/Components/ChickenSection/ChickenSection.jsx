"use client";
import React from "react";
import "./ChickenSection.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { FaRegEye } from "react-icons/fa";

const ChickenSection = () => {
  const chickenItems = [
    {
      id: 1,
      image: "/images/p1.png",
      discount: "-10%",
      title: "الدجاج المشوي",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 2,
      image: "/images/p1.png",
      discount: "-10%",
      title: "الدجاج المشوي",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 3,
      image: "/images/p1.png",
      discount: "-10%",
      title: "الدجاج المشوي",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 4,
      image: "/images/p1.png",
      discount: "-10%",
      title: "الدجاج المشوي",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 5,
      image: "/images/p1.png",
      discount: "-10%",
      title: "الدجاج المشوي",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 6,
      image: "/images/p1.png",
      discount: "-10%",
      title: "الدجاج المشوي",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 7,
      image: "/images/p1.png",
      discount: "-10%",
      title: "الدجاج المشوي",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 8,
      image: "/images/p1.png",
      discount: "-10%",
      title: "الدجاج المشوي",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
  ];

  return (
    <div className="ChickenSection">
      <div className="ChickenSection_container">
        <h1>الدجاج</h1>
        <div className="ChickenSection_list">
          {chickenItems.map((item) => (
            <div
              key={item.id}
              className="ChickenSection_item ChickenSection_item_desktop"
            >
              <Image
                src={item.image}
                alt="ChickenSection_item"
                width={100}
                height={100}
              />
              <span>{item.discount}</span>
              <h2>{item.title}</h2>
              <div className="ChickenSection_item_price">
                <p>{item.price}</p>
                <p>{item.oldPrice}</p>
              </div>
              <button>اشتري الآن</button>
            </div>
          ))}
          <div className="ChickenSection_items_mobile">
            <Swiper
              slidesPerView={1.5}
              spaceBetween={10}
              className="ChickenSection_swiper"
            >
              {chickenItems.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="ChickenSection_item">
                    <Image
                      src={item.image}
                      alt="ChickenSection_item"
                      width={100}
                      height={100}
                    />
                    <span>{item.discount}</span>
                    <h2>{item.title}</h2>
                    <div className="ChickenSection_item_price">
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

export default ChickenSection;
