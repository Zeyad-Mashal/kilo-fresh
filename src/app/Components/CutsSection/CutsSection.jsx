"use client";
import React, { useState, useEffect } from "react";
import "./CutsSection.css";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/navigation";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { FaRegEye } from "react-icons/fa";
import { getAllCategories } from "../../API/Categories/GetCategories";
import GetByCategory from "../../API/Products/GetByCategory";

const CutsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("المجزءات");
  const router = useRouter();

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      setLoading(true);
      const categoriesResult = await getAllCategories();
      
      if (categoriesResult.success && categoriesResult.categories) {
        const category = categoriesResult.categories.find(
          (cat) => cat.name === "المجزءات" || cat.name?.includes("مجزء") || cat.name?.includes("قطع")
        );
        
        if (category) {
          const foundCategoryId = category._id || category.id;
          setCategoryId(foundCategoryId);
          setCategoryName(category.name);
          
          const fetchProducts = () => {
            return new Promise((resolve) => {
              let resolved = false;
              const setProductsData = (productsData) => {
                if (!resolved) {
                  const latestProducts = (productsData || []).slice(0, 8);
                  setProducts(latestProducts);
                  resolved = true;
                  setLoading(false);
                  resolve();
                }
              };
              
              const setError = () => {
                if (!resolved) {
                  setProducts([]);
                  resolved = true;
                  setLoading(false);
                  resolve();
                }
              };
              
              GetByCategory(setProductsData, setError, () => {}, foundCategoryId);
            });
          };
          
          await fetchProducts();
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, []);

  const handleViewAll = () => {
    if (categoryId) {
      router.push(`/pages/shop?category=${categoryId}`);
    }
  };

  return (
    <div className="CutsSection">
      <div className="CutsSection_container">
        <h1>{categoryName}</h1>
        <div className="CutsSection_list">
          {loading ? (
            <p style={{ color: "#fff", textAlign: "center", width: "100%" }}>
              جاري التحميل...
            </p>
          ) : products.length > 0 ? (
            <>
              {products.map((item) => (
                <Link
                  key={item._id}
                  href={`/pages/product?id=${item._id}`}
                  className="CutsSection_item CutsSection_item_desktop"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Image
                    src={item?.images?.[0]?.url || "/images/p1.png"}
                    alt={item.name || "product"}
                    width={100}
                    height={100}
                  />
                  {item.discount && <span>{item.discount}</span>}
                  <h2>{item.name}</h2>
                  <div className="CutsSection_item_price">
                    <p>{item.priceAfter} ج.م</p>
                    {item.priceBefore && <p>{item.priceBefore} ج.م</p>}
                  </div>
                  <button>اشتري الآن</button>
                </Link>
              ))}
              <div className="CutsSection_items_mobile">
                <Swiper
                  slidesPerView={1.5}
                  spaceBetween={10}
                  className="CutsSection_swiper"
                >
                  {products.map((item) => (
                    <SwiperSlide key={item._id}>
                      <Link
                        href={`/pages/product?id=${item._id}`}
                        className="CutsSection_item"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Image
                          src={item?.images?.[0]?.url || "/images/p1.png"}
                          alt={item.name || "product"}
                          width={100}
                          height={100}
                        />
                        {item.discount && <span>{item.discount}</span>}
                        <h2>{item.name}</h2>
                        <div className="CutsSection_item_price">
                          <p>{item.priceAfter} ج.م</p>
                          {item.priceBefore && <p>{item.priceBefore} ج.م</p>}
                        </div>
                        <button>اشتري الآن</button>
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          ) : (
            <p style={{ color: "#fff", textAlign: "center", width: "100%" }}>
              لا توجد منتجات
            </p>
          )}
          {products.length > 0 && (
            <button onClick={handleViewAll}>
              عرض الكل
              <FaRegEye />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CutsSection;

