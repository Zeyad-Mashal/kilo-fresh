"use client";
import React from "react";
import "./DuckSection.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { FaRegEye } from "react-icons/fa";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useRouter } from "next/navigation";
const DuckSection = () => {
  const router = useRouter();
  const duckItems = [
    {
      id: 1,
      image: "/images/p1.png",
      discount: "-10%",
      title: "البط",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 2,
      image: "/images/p1.png",
      discount: "-10%",
      title: "البط",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 3,
      image: "/images/p1.png",
      discount: "-10%",
      title: "البط",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 4,
      image: "/images/p1.png",
      discount: "-10%",
      title: "البط",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 5,
      image: "/images/p1.png",
      discount: "-10%",
      title: "البط",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 6,
      image: "/images/p1.png",
      discount: "-10%",
      title: "البط",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 7,
      image: "/images/p1.png",
      discount: "-10%",
      title: "البط",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 8,
      image: "/images/p1.png",
      discount: "-10%",
      title: "البط",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
  ];

  const ProductCard = ({ item, index }) => {
    const [ref, isVisible] = useScrollAnimation({ once: false });
    const delayClass = `scroll-animate-delay-${(index % 6) + 1}`;

    return (
      <div
        ref={ref}
        className={`DuckSection_item DuckSection_item_desktop scroll-animate ${
          isVisible ? "visible" : ""
        } ${delayClass}`}
        onClick={() => router.push("/pages/product")}
      >
        <Image
          src={item.image}
          alt="DuckSection_item"
          width={100}
          height={100}
        />
        <span>{item.discount}</span>
        <h2>{item.title}</h2>
        <div className="DuckSection_item_price">
          <p>{item.price}</p>
          <p>{item.oldPrice}</p>
        </div>
        <button>اشتري الآن</button>
      </div>
    );
  };

  const MobileCard = ({ item, index }) => {
    const [ref, isVisible] = useScrollAnimation({ once: false });
    return (
      <SwiperSlide key={item.id}>
        <div
          ref={ref}
          className={`DuckSection_item scroll-animate ${
            isVisible ? "visible" : ""
          } scroll-animate-delay-${(index % 6) + 1}`}
          onClick={() => router.push("/pages/product")}
        >
          <Image
            src={item.image}
            alt="DuckSection_item"
            width={100}
            height={100}
          />
          <span>{item.discount}</span>
          <h2>{item.title}</h2>
          <div className="DuckSection_item_price">
            <p>{item.price}</p>
            <p>{item.oldPrice}</p>
          </div>
          <button>اشتري الآن</button>
        </div>
      </SwiperSlide>
    );
  };

  return (
    <div className="DuckSection">
      <div className="DuckSection_container">
        <h1>البط</h1>
        <div className="DuckSection_list">
          {duckItems.map((item, index) => (
            <ProductCard key={item.id} item={item} index={index} />
          ))}
          <div className="DuckSection_items_mobile">
            <Swiper
              slidesPerView={1.5}
              spaceBetween={10}
              className="DuckSection_swiper"
            >
              {duckItems.map((item, index) => (
                <MobileCard
                  key={item.id}
                  item={item}
                  index={index}
                  onClick={() => router.push("/pages/product")}
                />
              ))}
            </Swiper>
          </div>
          <button onClick={() => router.push("/pages/shop")}>
            عرض الكل
            <FaRegEye />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DuckSection;
