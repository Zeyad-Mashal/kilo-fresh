"use client";
import React from "react";
import "./shop.css";
import Image from "next/image";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";
import { useRouter } from "next/navigation";
const ClientShop = () => {
  const router = useRouter();
  const shopItems = [
    {
      id: 1,
      image: "/images/p1.png",
      title: "الدجاج المشوي",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 2,
      image: "/images/p1.png",
      title: "الدجاج المشوي",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 3,
      image: "/images/p1.png",
      title: "الدجاج المشوي",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 4,
      image: "/images/p1.png",
      title: "الدجاج المشوي",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 5,
      image: "/images/p1.png",
      title: "الدجاج المشوي",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 6,
      image: "/images/p1.png",
      title: "الدجاج المشوي",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 7,
      image: "/images/p1.png",
      title: "الدجاج المشوي",
      price: "100 ج.م",
      oldPrice: "120 ج.م",
    },
    {
      id: 8,
      image: "/images/p1.png",
      title: "الدجاج المشوي",
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
        className={`shop_item scroll-animate ${
          isVisible ? "visible" : ""
        } ${delayClass}`}
        onClick={() => router.push("/pages/product")}
      >
        <Image src={item.image} alt="chicken" width={100} height={100} />
        <h2>{item.title}</h2>
        <div className="shop_item_price">
          <p>{item.price}</p>
          <p>{item.oldPrice}</p>
        </div>
        <button>اشتري الآن</button>
      </div>
    );
  };

  return (
    <div className="shop_page">
      <div className="shop_page_container">
        <div className="shop_title">
          <h1>الدجاج</h1>
        </div>
        <div className="shop_list">
          {shopItems.map((item, index) => (
            <ProductCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => router.push("/pages/product")}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientShop;
