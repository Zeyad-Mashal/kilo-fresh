"use client";
import React, { useState, useEffect } from "react";
import "./offers.css";
import Image from "next/image";
import Link from "next/link";
import GetProductsOffers from "../../API/Products/GetProductsOffers";

const ClientOffers = () => {
  const [offers, setAllOffers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetProductsOffers(setAllOffers, setError, setLoading);
  }, []);

  // Calculate discount percentage if originalPrice and price exist
  const calculateDiscount = (price, originalPrice) => {
    if (originalPrice && price) {
      const discount = ((originalPrice - price) / originalPrice) * 100;
      return `-${Math.round(discount)}%`;
    }
    return "-10%";
  };

  return (
    <div className="offers">
      <div className="offers_container">
        <h1>عروضنا</h1>
        {loading ? (
          <div className="offers_empty">
            <div className="offers_empty_icon">⏳</div>
            <h2>جاري التحميل...</h2>
          </div>
        ) : error ? (
          <div className="offers_empty">
            <div className="offers_empty_icon">⚠️</div>
            <h2>حدث خطأ</h2>
            <p>{error}</p>
          </div>
        ) : offers.length === 0 ? (
          <div className="offers_empty">
            <div className="offers_empty_icon">🎁</div>
            <h2>لا توجد عروض متاحة حالياً</h2>
            <p>سنضيف عروض جديدة قريباً، تابعونا!</p>
          </div>
        ) : (
          <div className="offers_list">
            {offers.map((offer) => (
              <Link
                key={offer._id}
                href={`/pages/product?id=${offer._id}`}
                className="offers_item"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Image
                  src={offer?.images?.[0]?.url || "/images/p1.png"}
                  alt={offer.name || "offer image"}
                  width={2000}
                  height={2000}
                />
                <span>
                  {offer.discount ||
                    calculateDiscount(offer.priceAfter, offer.priceBefore)}
                </span>
                <h2>{offer.name}</h2>
                <div className="offers_item_price">
                  <p>{offer.priceAfter} ج.م</p>
                  <p>{offer.priceBefore} ج.م</p>
                </div>
                <button>اشتري الآن</button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientOffers;
