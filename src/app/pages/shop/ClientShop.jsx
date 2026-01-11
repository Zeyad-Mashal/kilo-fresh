"use client";
import React, { useState, useEffect } from "react";
import "./shop.css";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import GetAllProducts from "../../API/Products/GetProducts";
import GetByCategory from "../../API/Products/GetByCategory";
import { getAllCategories } from "../../API/Categories/GetCategories";

const ClientShop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("المنتجات");
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  useEffect(() => {
    const fetchData = async () => {
      if (categoryId) {
        // Fetch products by category
        GetByCategory(setAllProducts, setError, setLoading, categoryId);
        
        // Fetch category name
        const categoriesResult = await getAllCategories();
        if (categoriesResult.success && categoriesResult.categories) {
          const category = categoriesResult.categories.find(
            (cat) => cat._id === categoryId || cat.id === categoryId
          );
          if (category) {
            setCategoryName(category.name);
          }
        }
      } else {
        // Fetch all products
        GetAllProducts(setAllProducts, setError, setLoading);
        setCategoryName("المنتجات");
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <div className="shop_page">
      <div className="shop_page_container">
        <div className="shop_title">
          <h1>{categoryName}</h1>
        </div>
        <div className="shop_list">
          {loading
            ? "جاري التحميل"
            : error
            ? <p>{error}</p>
            : allProducts.length === 0
            ? <p>لا توجد منتجات</p>
            : allProducts.map((item) => {
                return (
                  <Link
                    key={item._id}
                    href={`/pages/product?id=${item._id}`}
                    className="shop_item"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Image
                      src={item?.images?.[0]?.url || "/images/p1.png"}
                      alt={item.name || "product"}
                      width={100}
                      height={100}
                    />
                    <h2>{item.name}</h2>
                    <div className="shop_item_price">
                      <p>{item.priceAfter} ج.م</p>
                      <p>{item.priceBefore} ج.م</p>
                    </div>
                    <button>اشتري الآن</button>
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default ClientShop;
