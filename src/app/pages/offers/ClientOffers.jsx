import React from "react";
import "./offers.css";
import Image from "next/image";
const ClientOffers = ({
  offers = [
    {
      image: "/images/p1.png",
      title: "فراخ بلدي",
      price: 90,
      originalPrice: 100,
      discount: "-10%",
    },
    {
      image: "/images/p1.png",
      title: "فراخ بلدي",
      price: 90,
      originalPrice: 100,
      discount: "-10%",
    },
    {
      image: "/images/p1.png",
      title: "فراخ بلدي",
      price: 90,
      originalPrice: 100,
      discount: "-10%",
    },
    {
      image: "/images/p1.png",
      title: "فراخ بلدي",
      price: 90,
      originalPrice: 100,
      discount: "-10%",
    },
  ],
}) => {
  return (
    <div className="offers">
      <div className="offers_container">
        <h1>عروضنا</h1>
        {offers.length === 0 ? (
          <div className="offers_empty">
            <div className="offers_empty_icon">🎁</div>
            <h2>لا توجد عروض متاحة حالياً</h2>
            <p>سنضيف عروض جديدة قريباً، تابعونا!</p>
          </div>
        ) : (
          <div className="offers_list">
            {offers.map((offer, index) => (
              <div key={index} className="offers_item">
                <Image
                  src={offer.image || "/images/p1.png"}
                  alt="offer image"
                  width={100}
                  height={100}
                />
                <span>{offer.discount || "-10%"}</span>
                <h2>{offer.title || "فراخ بلدي"}</h2>
                <div className="offers_item_price">
                  <p>{offer.price || "90 جنيه"}</p>
                  <p>{offer.originalPrice || "100 جنيه"}</p>
                </div>
                <button>اشتري الآن</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientOffers;
