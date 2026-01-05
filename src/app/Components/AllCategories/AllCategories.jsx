"use client";
import React, { useState, useEffect } from "react";
import "./AllCategories.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAllCategories } from "../../API/Categories/GetCategories";
const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getAllCategories();
      if (result.success && result.categories) {
        setCategories(result.categories);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    router.push(`/pages/shop?category=${categoryId}`);
  };

  return (
    <section className="all_categories">
      <div className="all_categories_container">
        <h2>الأقسام</h2>
        <p>لكل انواع اللحوم و الدواجن البلدي</p>
        <div className="all_categories_list">
          {loading ? (
            <p>جاري التحميل...</p>
          ) : (
            categories.map((category, index) => (
              <div
                key={category._id || index}
                className="all_categories_item"
                onClick={() => handleCategoryClick(category._id || category.id)}
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={category.image.url || "/images/c1.jpg"}
                  alt={category.name || "category"}
                  width={100}
                  height={100}
                />
                <h3>{category.name || "اللحوم"}</h3>
                <p>
                  {category.productCount
                    ? `${category.productCount} منتج`
                    : "لكل انواع اللحوم البلدي"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AllCategories;
