"use client";
import React, { useState, useEffect } from "react";
import "./product.css";
import Image from "next/image";
import Link from "next/link";

const ClientProduct = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [viewingCount, setViewingCount] = useState(13);

  // Sample product data
  const product = {
    id: 1,
    title: "الدجاج المشوي الطازج",
    description: `هذا منتج عالي الجودة من الدجاج المشوي الطازج، يتم تحضيره بعناية فائقة باستخدام أفضل المكونات الطبيعية. يتم تتبيل الدجاج بمزيج من التوابل المميزة والبهارات العطرية التي تعطيه نكهة لا تقاوم.

الدجاج المشوي لدينا يتم تحضيره يومياً في مطابخنا المطهرة والمعتمدة، مما يضمن لك الحصول على منتج طازج وصحي. نستخدم فقط الدجاج الطازج من المزارع الموثوقة التي تتبع أعلى معايير الجودة والسلامة.

يتم شوي الدجاج على نار هادئة لضمان نضجه بشكل متساوي مع الحفاظ على العصارة الطبيعية والطعم اللذيذ. النتيجة هي دجاج مشوي طري من الداخل ومقرمش من الخارج، مليء بالنكهات الرائعة.

هذا المنتج مثالي للوجبات العائلية، المناسبات الخاصة، أو حتى كوجبة سريعة وصحية. يمكنك تناوله ساخناً مباشرة بعد الشراء، أو تسخينه لاحقاً مع الحفاظ على طعمه الرائع.

نضمن لك الجودة والطعم المميز في كل قطعة.`,
    price: 100,
    oldPrice: 120,
    discount: "-10%",
    images: [
      "/images/p1.png",
      "/images/p1.png",
      "/images/p1.png",
      "/images/p1.png",
      "/images/p1.png",
    ],
  };

  const relatedProducts = [
    {
      id: 2,
      image: "/images/p1.png",
      title: "الطيور البلدي",
      price: 150,
      oldPrice: 180,
      discount: "-15%",
    },
    {
      id: 3,
      image: "/images/p1.png",
      title: "البط المشوي",
      price: 200,
      oldPrice: 250,
      discount: "-20%",
    },
    {
      id: 4,
      image: "/images/p1.png",
      title: "المجزءات الطازجة",
      price: 80,
      oldPrice: 100,
      discount: "-20%",
    },
    {
      id: 5,
      image: "/images/p1.png",
      title: "الدجاج الكامل",
      price: 120,
      oldPrice: 150,
      discount: "-20%",
    },
  ];

  // Update viewing count every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setViewingCount(Math.floor(Math.random() * 31)); // 0 to 30
    }, 60000); // 1 minute

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

  return (
    <div className="product_page">
      <div className="product_container">
        {/* Product Main Section */}
        <div className="product_main">
          {/* Image Gallery */}
          <div className="product_images">
            <div className="product_main_image">
              <Image
                src={product.images[selectedImage]}
                alt={product.title}
                width={600}
                height={600}
                priority
              />
              {product.discount && (
                <span className="product_discount_badge">
                  {product.discount}
                </span>
              )}
            </div>
            <div className="product_thumbnails">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product_info">
            <h1 className="product_title">{product.title}</h1>

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
                <span className="price_value">{product.price} ج.م</span>
              </div>
              {product.oldPrice && (
                <div className="price_old">
                  <span className="old_price_value">
                    {product.oldPrice} ج.م
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
                {product.description.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
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
      </div>
    </div>
  );
};

export default ClientProduct;
