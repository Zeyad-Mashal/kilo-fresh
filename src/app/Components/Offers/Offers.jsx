"use client";
import React from "react";
import "./Offers.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
const Offers = () => {
  const router = useRouter();
  const offersItems = [
    {
      id: 1,
      image: "/images/p1.png",
      discount: "-10%",
      title: "بوكس الصفقة من طازة",
      price: "100 ج.م",
      oldPrice: "100 ج.م",
    },
    {
      id: 2,
      image: "/images/p1.png",
      discount: "-10%",
      title: "بوكس الصفقة من طازة",
      price: "100 ج.م",
      oldPrice: "100 ج.م",
    },
    {
      id: 3,
      image: "/images/p1.png",
      discount: "-10%",
      title: "بوكس الصفقة من طازة",
      price: "100 ج.م",
      oldPrice: "100 ج.م",
    },
    {
      id: 4,
      image: "/images/p1.png",
      discount: "-10%",
      title: "بوكس الصفقة من طازة",
      price: "100 ج.م",
      oldPrice: "100 ج.م",
    },
    {
      id: 5,
      image: "/images/p1.png",
      discount: "-10%",
      title: "بوكس الصفقة من طازة",
      price: "100 ج.م",
      oldPrice: "100 ج.م",
    },
    {
      id: 6,
      image: "/images/p1.png",
      discount: "-10%",
      title: "بوكس الصفقة من طازة",
      price: "100 ج.م",
      oldPrice: "100 ج.م",
    },
  ];

  return (
    <div className="offers">
      <div className="offers_container">
        <h2>العروض</h2>
        <div className="offers_list">
          <div className="offers_box">
            <Image
              src={"/images/offers.jpg"}
              alt="offers"
              width={100}
              height={100}
            />
            <h2>العروض الحاليه</h2>
            <p>30 منتج</p>
            <button>عرض الكل</button>
          </div>
          {offersItems.map((item) => (
            <div
              key={item.id}
              className="offers_item offers_item_desktop"
              onClick={() => router.push(`/pages/product`)}
            >
              <Image src={item.image} alt="offers" width={100} height={100} />
              <span>{item.discount}</span>
              <h2>{item.title}</h2>
              <div className="item_price">
                <p>{item.price}</p>
                <p>{item.oldPrice}</p>
              </div>
              <button>اشتري الآن</button>
            </div>
          ))}
          <div className="offers_items_mobile">
            <Swiper
              slidesPerView={1.5}
              spaceBetween={10}
              className="offers_swiper"
            >
              {offersItems.map((item) => (
                <SwiperSlide key={item.id}>
                  <div
                    className="offers_item"
                    onClick={() => router.push(`/pages/product`)}
                  >
                    <Image
                      src={item.image}
                      alt="offers"
                      width={100}
                      height={100}
                    />
                    <span>{item.discount}</span>
                    <h2>{item.title}</h2>
                    <div className="item_price">
                      <p>{item.price}</p>
                      <p>{item.oldPrice}</p>
                    </div>
                    <button>اشتري الآن</button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
