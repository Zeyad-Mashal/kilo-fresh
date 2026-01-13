"use client";
import React, { useState, useEffect } from "react";
import "./OrderNotifications.css";
import Image from "next/image";
import namesData from "@/names.json";
import GetAllProducts from "../../API/Products/GetProducts";

const OrderNotifications = () => {
  const [currentNotification, setCurrentNotification] = useState(null);
  const [products, setProducts] = useState([]);
  const [timeAgo, setTimeAgo] = useState(0);
  const [notificationKey, setNotificationKey] = useState(0);

  useEffect(() => {
    // Fetch products once
    const fetchProducts = () => {
      return new Promise((resolve) => {
        let resolved = false;
        const setProductsData = (productsData) => {
          if (!resolved) {
            setProducts(productsData || []);
            resolved = true;
            resolve();
          }
        };

        const setError = () => {
          if (!resolved) {
            resolved = true;
            resolve();
          }
        };

        GetAllProducts(setProductsData, setError, () => {});
      });
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

    let hideTimeoutId;
    let showTimeoutId;

    const showNotification = () => {
      // Get random name
      const allNames = [...namesData.male, ...namesData.female];
      const randomName = allNames[Math.floor(Math.random() * allNames.length)];

      // Get random product
      const randomProduct =
        products[Math.floor(Math.random() * products.length)];

      if (randomProduct) {
        const product = randomProduct;
        const productName = product.name || "منتج";
        const productImage = product.images?.[0]?.url || "/images/p1.png";
        const productPrice = product.priceAfter || 0;
        const isOffer = product.isOffer || false;

        // Generate offer text
        const offerTexts = [
          `اشتري ${productName}`,
          `عرض ${productName}`,
          `${productName} - عرض خاص`,
        ];
        const randomOfferText =
          offerTexts[Math.floor(Math.random() * offerTexts.length)];

        setCurrentNotification({
          name: randomName,
          productName: productName,
          productImage: productImage,
          productPrice: productPrice,
          offerText: randomOfferText,
          isOffer: isOffer,
        });
        setNotificationKey((prev) => prev + 1);
        setTimeAgo(0);

        // Hide notification after 5 seconds
        hideTimeoutId = setTimeout(() => {
          setCurrentNotification(null);

          // After hiding, wait 30 seconds (0.5 min) then show next notification
          showTimeoutId = setTimeout(() => {
            showNotification();
          }, 30000);
        }, 5000);
      }
    };

    // Show first notification after 1 second
    showTimeoutId = setTimeout(() => {
      showNotification();
    }, 1000);

    return () => {
      if (hideTimeoutId) clearTimeout(hideTimeoutId);
      if (showTimeoutId) clearTimeout(showTimeoutId);
    };
  }, [products]);

  useEffect(() => {
    if (!currentNotification) return;

    // Update time ago every minute
    const timeInterval = setInterval(() => {
      setTimeAgo((prev) => prev + 1);
    }, 60000);

    return () => clearInterval(timeInterval);
  }, [currentNotification]);

  if (!currentNotification) return null;

  const getTimeAgoText = (minutes) => {
    if (minutes === 0) return "الآن";
    if (minutes === 1) return "قبل دقيقة";
    if (minutes < 60) return `قبل ${minutes} دقيقة`;
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return "قبل ساعة";
    return `قبل ${hours} ساعة`;
  };

  return (
    <div className="order_notification_container">
      <div key={notificationKey} className="order_notification_card">
        <div className="notification_header">
          <span className="notification_name">{currentNotification.name}</span>
        </div>
        <div className="notification_content">
          <div className="notification_text">
            <p className="notification_offer_text">
              {currentNotification.offerText}
            </p>
            {currentNotification.isOffer && (
              <p className="notification_family_offer">(عرض العيلة)</p>
            )}
            <span className="notification_time">{getTimeAgoText(timeAgo)}</span>
          </div>
          <div className="notification_product_image">
            <div className="notification_image_wrapper">
              <span className="notification_offer_badge">عرض</span>
              <Image
                src={currentNotification.productImage}
                alt={currentNotification.productName}
                width={90}
                height={90}
              />
              <div className="notification_price">
                {currentNotification.productPrice} ج.م
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderNotifications;
