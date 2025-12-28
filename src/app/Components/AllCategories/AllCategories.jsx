import React from "react";
import "./AllCategories.css";
import Image from "next/image";
const AllCategories = () => {
  return (
    <section className="all_categories">
      <div className="all_categories_container">
        <h2>الأقسام</h2>
        <p>لكل انواع اللحوم و الدواجن البلدي</p>
        <div className="all_categories_list">
          <div className="all_categories_item">
            <Image
              src={"/images/c1.jpg"}
              alt="category"
              width={100}
              height={100}
            />
            <h3>اللحوم</h3>
            <p>لكل انواع اللحوم البلدي</p>
          </div>
          <div className="all_categories_item">
            <Image
              src={"/images/c1.jpg"}
              alt="category"
              width={100}
              height={100}
            />
            <h3>اللحوم</h3>
            <p>20 منتج</p>
          </div>
          <div className="all_categories_item">
            <Image
              src={"/images/c1.jpg"}
              alt="category"
              width={100}
              height={100}
            />
            <h3>اللحوم</h3>
            <p>11 منتج</p>
          </div>
          <div className="all_categories_item">
            <Image
              src={"/images/c1.jpg"}
              alt="category"
              width={100}
              height={100}
            />
            <h3>اللحوم</h3>
            <p>10 منتج</p>
          </div>
          <div className="all_categories_item">
            <Image
              src={"/images/c1.jpg"}
              alt="category"
              width={100}
              height={100}
            />
            <h3>اللحوم</h3>
            <p>15 منتج</p>
          </div>
          <div className="all_categories_item">
            <Image
              src={"/images/c1.jpg"}
              alt="category"
              width={100}
              height={100}
            />
            <h3>اللحوم</h3>
            <p>5 منتج</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllCategories;
