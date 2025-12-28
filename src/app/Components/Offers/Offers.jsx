import React from "react";
import "./Offers.css";
import Image from "next/image";
const Offers = () => {
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
          <div className="offers_item">
            <Image
              src={"/images/p1.png"}
              alt="offers"
              width={100}
              height={100}
            />
            <span>-10%</span>
            <h2>بوكس الصفقة من طازة</h2>
            <div className="item_price">
              <p>100 ج.م</p>
              <p>100 ج.م</p>
            </div>
            <button>اشتري الآن</button>
          </div>
          <div className="offers_item">
            <Image
              src={"/images/p1.png"}
              alt="offers"
              width={100}
              height={100}
            />
            <span>-10%</span>
            <h2>بوكس الصفقة من طازة</h2>
            <div className="item_price">
              <p>100 ج.م</p>
              <p>100 ج.م</p>
            </div>
            <button>اشتري الآن</button>
          </div>
          <div className="offers_item">
            <Image
              src={"/images/p1.png"}
              alt="offers"
              width={100}
              height={100}
            />
            <span>-10%</span>
            <h2>بوكس الصفقة من طازة</h2>
            <div className="item_price">
              <p>100 ج.م</p>
              <p>100 ج.م</p>
            </div>
            <button>اشتري الآن</button>
          </div>
          <div className="offers_item">
            <Image
              src={"/images/p1.png"}
              alt="offers"
              width={100}
              height={100}
            />
            <span>-10%</span>
            <h2>بوكس الصفقة من طازة</h2>
            <div className="item_price">
              <p>100 ج.م</p>
              <p>100 ج.م</p>
            </div>
            <button>اشتري الآن</button>
          </div>
          <div className="offers_item">
            <Image
              src={"/images/p1.png"}
              alt="offers"
              width={100}
              height={100}
            />
            <span>-10%</span>
            <h2>بوكس الصفقة من طازة</h2>
            <div className="item_price">
              <p>100 ج.م</p>
              <p>100 ج.م</p>
            </div>
            <button>اشتري الآن</button>
          </div>
          <div className="offers_item">
            <Image
              src={"/images/p1.png"}
              alt="offers"
              width={100}
              height={100}
            />
            <span>-10%</span>
            <h2>بوكس الصفقة من طازة</h2>
            <div className="item_price">
              <p>100 ج.م</p>
              <p>100 ج.م</p>
            </div>
            <button>اشتري الآن</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
