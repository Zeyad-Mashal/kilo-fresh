"use client";
import React, { useState, useEffect } from "react";
import "./product.css";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { getCartId } from "../../utils/cartId";
import GetProductById from "../../API/Products/GetProductById";
import AddToCart from "../../API/Cart/AddToCart";

const ClientProduct = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [viewingCount, setViewingCount] = useState(13);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  useEffect(() => {
    if (productId) {
      const fetchProduct = () => {
        return new Promise((resolve) => {
          let resolved = false;
          const setProductData = (productData) => {
            if (!resolved) {
              setProduct(productData);
              resolved = true;
              setLoading(false);
              resolve();
            }
          };

          const setErrorData = (errorMessage) => {
            if (!resolved) {
              setError(errorMessage);
              resolved = true;
              setLoading(false);
              resolve();
            }
          };

          GetProductById(setProductData, setErrorData, () => {}, productId);
        });
      };

      fetchProduct();
    } else {
      setError("معرف المنتج مطلوب");
      setLoading(false);
    }
  }, [productId]);

  // Related products - can be fetched from category later
  const relatedProducts = [];

  // Update viewing count every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setViewingCount(Math.floor(Math.random() * 31)); // 0 to 30
    }, 5000); // 1 minute

    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = () => {
    if (!product || !product._id) {
      toast.error("المنتج غير متاح");
      return;
    }

    if (addingToCart) {
      return;
    }

    const cartId = getCartId();
    if (!cartId) {
      toast.error("لا يمكن الوصول للسلة");
      return;
    }

    setAddingToCart(true);

    const addToCart = () => {
      return new Promise((resolve) => {
        let resolved = false;
        const setSuccess = (message) => {
          if (!resolved) {
            toast.success(message || "تمت الإضافة للسلة بنجاح");
            resolved = true;
            setAddingToCart(false);
            resolve();
          }
        };

        const setError = (errorMessage) => {
          if (!resolved) {
            toast.error(errorMessage || "فشلت العملية");
            resolved = true;
            setAddingToCart(false);
            resolve();
          }
        };

        const setLoadingState = () => {};

        AddToCart(
          product._id,
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

  const handleCheckout = () => {
    if (!product || !product._id) {
      toast.error("المنتج غير متاح");
      return;
    }

    // Navigate to checkout with product ID for direct checkout
    router.push(`/pages/checkout?productId=${product._id}`);
  };

  if (loading) {
    return (
      <div className="product_page">
        <div className="product_container">
          <div style={{ color: "#fff", textAlign: "center", padding: "2rem" }}>
            جاري التحميل...
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product_page">
        <div className="product_container">
          <div style={{ color: "#fff", textAlign: "center", padding: "2rem" }}>
            {error || "المنتج غير موجود"}
          </div>
        </div>
      </div>
    );
  }

  const productImages = product.images?.map((img) => img.url) || [
    "/images/p1.png",
  ];
  const discount =
    product.isOffer && product.priceBefore
      ? `-${Math.round(
          ((product.priceBefore - product.priceAfter) / product.priceBefore) *
            100
        )}%`
      : null;

  return (
    <div className="product_page">
      <div className="product_container">
        {/* Product Main Section */}
        <div className="product_main">
          {/* Image Gallery */}
          <div className="product_images">
            <div className="product_main_image">
              <Image
                src={productImages[selectedImage] || productImages[0]}
                alt={product.name}
                width={1000}
                height={1000}
                priority
              />
              {discount && (
                <span className="product_discount_badge">{discount}</span>
              )}
            </div>
            <div className="product_thumbnails">
              {productImages.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={1000}
                    height={1000}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product_info">
            <h1 className="product_title">{product.name}</h1>

            {/* Viewing Counter */}
            <div className="product_viewing">
              <span className="viewing_icon">👁️</span>
              <span className="viewing_text">
                يشاهد هذا المنتج الآن {viewingCount} عميل
              </span>
            </div>

            {/* Price Section */}
            <div className="product_pricing">
              <div className="price_current">
                <span className="price_label">السعر:</span>
                <span className="price_value">{product.priceAfter} ج.م</span>
              </div>
              {product.priceBefore && (
                <div className="price_old">
                  <span className="old_price_value">
                    {product.priceBefore} ج.م
                  </span>
                </div>
              )}
            </div>

            
            {/* Description */}
            <div className="product_description">
              <h2 className="description_title">وصف المنتج</h2>
              <div className="description_content">
                {product.description ? (
                  product.description
                    .split("\n\n")
                    .map((paragraph, index) => <p key={index}>{paragraph}</p>)
                ) : (
                  <p>لا يوجد وصف متاح لهذا المنتج</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product_actions">
              <button
                className="btn_checkout"
                onClick={handleCheckout}
                disabled={addingToCart}
              >
                إتمام الطلب
              </button>
              <button
                className="btn_add_to_cart"
                onClick={handleAddToCart}
                disabled={addingToCart}
                style={{
                  opacity: addingToCart ? 0.6 : 1,
                  cursor: addingToCart ? "not-allowed" : "pointer",
                  position: "relative",
                }}
              >
                {addingToCart ? (
                  <>
                    <span style={{ marginLeft: "8px" }}>جاري الإضافة...</span>
                    <span
                      style={{
                        display: "inline-block",
                        width: "14px",
                        height: "14px",
                        border: "2px solid #fff",
                        borderTopColor: "transparent",
                        borderRadius: "50%",
                        animation: "spin 0.6s linear infinite",
                        marginRight: "8px",
                      }}
                    />
                  </>
                ) : (
                  "أضف للسلة"
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related_products">
            <h2 className="related_title">منتجات ذات صلة</h2>
            <div className="related_products_list">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/pages/product?id=${item.id}`}
                  className="related_product_item"
                >
                  <div className="related_product_image">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={200}
                      height={200}
                    />
                    {item.discount && (
                      <span className="related_discount">{item.discount}</span>
                    )}
                  </div>
                  <h3 className="related_product_title">{item.title}</h3>
                  <div className="related_product_price">
                    <span className="related_price_current">
                      {item.price} ج.م
                    </span>
                    {item.oldPrice && (
                      <span className="related_price_old">
                        {item.oldPrice} ج.م
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientProduct;
