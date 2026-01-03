"use client";
import React, { useState, useEffect } from "react";
import "./shop.css";
import Image from "next/image";
import GetAllProducts from "../../API/Products/GetProducts";
const ClientShop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetAllProducts(setAllProducts, setError, setLoading);
  }, []);

  return (
    <div className="shop_page">
      <div className="shop_page_container">
        <div className="shop_title">
          <h1>الدجاج</h1>
        </div>
        <div className="shop_list">
          {loading
            ? "جاري التحميل"
            : allProducts.map((item) => {
                return (
                  <div className="shop_item" key={item._id}>
                    <Image
                      src={item?.images[0].url}
                      alt="chicken"
                      width={100}
                      height={100}
                    />
                    <h2>{item.name}</h2>
                    <div className="shop_item_price">
                      <p>{item.priceAfter} ج.م</p>
                      <p>{item.priceBefore} ج.م</p>
                    </div>
                    <button>اشتري الآن</button>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default ClientShop;
