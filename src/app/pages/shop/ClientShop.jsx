"use client";
import React, { useState, useEffect } from "react";
import "./shop.css";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { getCartId } from "../../utils/cartId";
import GetAllProducts from "../../API/Products/GetProducts";
import GetByCategory from "../../API/Products/GetByCategory";
import { getAllCategories } from "../../API/Categories/GetCategories";
import AddToCart from "../../API/Cart/AddToCart";

const ClientShop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("المنتجات");
  const [addingToCart, setAddingToCart] = useState({});
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
          {loading ? (
            "جاري التحميل"
          ) : error ? (
            <p>{error}</p>
          ) : allProducts.length === 0 ? (
            <p>لا توجد منتجات</p>
          ) : (
            allProducts.map((item) => {
              const isAdding = addingToCart[item._id] || false;

              const handleAddToCart = (e) => {
                e.preventDefault();
                e.stopPropagation();

                if (isAdding) {
                  return;
                }

                const cartId = getCartId();
                if (!cartId) {
                  toast.error("لا يمكن الوصول للسلة");
                  return;
                }

                setAddingToCart((prev) => ({ ...prev, [item._id]: true }));

                const addToCart = () => {
                  return new Promise((resolve) => {
                    let resolved = false;
                    const setSuccess = (message) => {
                      if (!resolved) {
                        toast.success(message || "تمت الإضافة للسلة بنجاح");
                        resolved = true;
                        setAddingToCart((prev) => {
                          const newState = { ...prev };
                          delete newState[item._id];
                          return newState;
                        });
                        resolve();
                      }
                    };

                    const setError = (errorMessage) => {
                      if (!resolved) {
                        toast.error(errorMessage || "فشلت العملية");
                        resolved = true;
                        setAddingToCart((prev) => {
                          const newState = { ...prev };
                          delete newState[item._id];
                          return newState;
                        });
                        resolve();
                      }
                    };

                    const setLoadingState = () => {};

                    AddToCart(
                      item._id,
                      cartId,
                      1,
                      setSuccess,
                      setError,
                      setLoadingState
                    );
                  });
                };

                addToCart();
              };

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
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    style={{
                      opacity: isAdding ? 0.6 : 1,
                      cursor: isAdding ? "not-allowed" : "pointer",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    {isAdding ? (
                      <>
                        <span>جاري الإضافة...</span>
                        <span
                          style={{
                            display: "inline-block",
                            width: "14px",
                            height: "14px",
                            border: "2px solid #fff",
                            borderTopColor: "transparent",
                            borderRadius: "50%",
                            animation: "spin 0.6s linear infinite",
                          }}
                        />
                      </>
                    ) : (
                      "اشتري الآن"
                    )}
                  </button>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientShop;
