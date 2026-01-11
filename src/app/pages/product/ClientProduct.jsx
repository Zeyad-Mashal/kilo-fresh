"use client";
import React, { useState, useEffect } from "react";
import "./product.css";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import GetProductById from "../../API/Products/GetProductById";

const ClientProduct = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [viewingCount, setViewingCount] = useState(13);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
      setError("Product ID is required");
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
    // Add to cart logic
    console.log("Added to cart");
  };

  const handleCheckout = () => {
    // Checkout logic
    console.log("Checkout");
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
                width={600}
                height={600}
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
                    width={100}
                    height={100}
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

            {/* Action Buttons */}
            <div className="product_actions">
              <button className="btn_checkout" onClick={handleCheckout}>
                إتمام الطلب
              </button>
              <button className="btn_add_to_cart" onClick={handleAddToCart}>
                أضف للسلة
              </button>
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
