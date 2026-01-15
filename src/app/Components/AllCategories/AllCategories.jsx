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
    if (categoryId) {
      router.push(`/pages/shop?category=${categoryId}`);
    }
  };
  console.log(categories);

  return (
    <section className="all_categories">
      <div className="all_categories_container">
        <h2>الأقسام</h2>
        <p>لكل انواع اللحوم و الدواجن البلدي</p>
        <div className="all_categories_list">
          {loading ? (
            <p>جاري التحميل...</p>
          ) : (
            categories.map((category, index) => {
              const categoryId = category._id;
              const imageUrl = category.image?.url;

              return (
                <div
                  key={categoryId || index}
                  className="all_categories_item"
                  onClick={() => handleCategoryClick(categoryId)}
                  style={{ cursor: "pointer" }}
                >
                  <Image
                    src={imageUrl}
                    alt={category.name || "category"}
                    width={2000}
                    height={2000}
                  />
                  <h3>{category.name || "اللحوم"}</h3>
                  <p>كيلو فريش</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default AllCategories;
