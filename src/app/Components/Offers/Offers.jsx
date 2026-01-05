"use client";
import React, { useState, useEffect } from "react";
import "./Offers.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";
import GetProductsOffers from "@/app/API/Products/GetProductsOffers";
const Offers = () => {
  const router = useRouter();
  const [offersItems, setOffersItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetProductsOffers(setOffersItems, setError, setLoading);
  }, []);

  const calculateDiscount = (priceAfter, priceBefore) => {
    return ((priceBefore - priceAfter) / priceBefore) * 100;
  };

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
            <p>{offersItems.length} منتج</p>
            <button>عرض الكل</button>
          </div>
          {offersItems.map((item) => (
            <div
              key={item._id}
              className="offers_item offers_item_desktop"
              onClick={() => router.push(`/pages/product`)}
            >
              <Image
                src={item?.images[0]?.url}
                alt="offers"
                width={100}
                height={100}
              />
              <span>
                {item.discount ||
                  calculateDiscount(item.priceAfter, item.priceBefore)}
                %
              </span>
              <h2>{item.name || "المنتج"}</h2>
              <div className="item_price">
                <p>{item.priceAfter} ج.م</p>
                <p>{item.priceBefore} ج.م</p>
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
                <SwiperSlide key={item._id}>
                  <div
                    className="offers_item"
                    onClick={() => router.push(`/pages/product`)}
                  >
                    <Image
                      src={item?.images[0]?.url}
                      alt="offers"
                      width={100}
                      height={100}
                    />
                    <span>
                      {item.discount ||
                        calculateDiscount(item.priceAfter, item.priceBefore)}
                      %
                    </span>
                    <h2>{item.name || "المنتج"}</h2>
                    <div className="item_price">
                      <p>{item.priceAfter} ج.م</p>
                      <p>{item.priceBefore} ج.م</p>
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
