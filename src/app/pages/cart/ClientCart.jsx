"use client";
import React, { useState } from "react";
import "./cart.css";
import Image from "next/image";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
const ClientCart = () => {
  const router = useRouter();
  // Sample cart data - in real app, this would come from state management
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: "/images/p1.png",
      title: "الدجاج المشوي",
      price: 100,
      oldPrice: 120,
      discount: "-10%",
      quantity: 2,
    },
    {
      id: 2,
      image: "/images/p1.png",
      title: "الطيور البلدي",
      price: 150,
      oldPrice: 180,
      discount: "-15%",
      quantity: 1,
    },
    {
      id: 3,
      image: "/images/p1.png",
      title: "البط",
      price: 200,
      oldPrice: 250,
      discount: "-20%",
      quantity: 3,
    },
  ]);

  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return {
            ...item,
            quantity: newQuantity > 0 ? newQuantity : 1,
          };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 50; // Fixed shipping cost
  const total = subtotal + shipping;

  return (
    <div className="cart_page">
      <div className="cart_container">
        <h1 className="cart_title">سلة التسوق</h1>

        {cartItems.length === 0 ? (
          <div className="cart_empty">
            <p>سلة التسوق فارغة</p>
            <button className="cart_continue_shopping">متابعة التسوق</button>
          </div>
        ) : (
          <div className="cart_content">
            {/* Cart Items */}
            <div className="cart_items_section">
              <div className="cart_items_header">
                <h2>المنتجات ({cartItems.length})</h2>
              </div>
              <div className="cart_items_list">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart_item">
                    <div className="cart_item_image">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={120}
                        height={120}
                      />
                      {item.discount && (
                        <span className="cart_item_discount">
                          {item.discount}
                        </span>
                      )}
                    </div>
                    <div className="cart_item_details">
                      <h3>{item.title}</h3>
                      <div className="cart_item_price_info">
                        <span className="cart_item_price">
                          {item.price} ج.م
                        </span>
                        {item.oldPrice && (
                          <span className="cart_item_old_price">
                            {item.oldPrice} ج.م
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="cart_item_controls">
                      <div className="cart_item_quantity">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="quantity_btn"
                        >
                          <FaMinus />
                        </button>
                        <span className="quantity_value">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="quantity_btn"
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <div className="cart_item_total">
                        <span className="item_total_label">المجموع:</span>
                        <span className="item_total_price">
                          {item.price * item.quantity} ج.م
                        </span>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="remove_item_btn"
                        title="حذف المنتج"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="cart_summary_section">
              <div className="cart_summary_card">
                <h2>ملخص الطلب</h2>
                <div className="summary_details">
                  <div className="summary_row">
                    <span>عدد المنتجات:</span>
                    <span>{cartItems.length}</span>
                  </div>
                  <div className="summary_row">
                    <span>الكمية الإجمالية:</span>
                    <span>
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                  <div className="summary_row">
                    <span>المجموع الفرعي:</span>
                    <span>{subtotal} ج.م</span>
                  </div>
                  <div className="summary_row">
                    <span>تكلفة الشحن:</span>
                    <span>{shipping} ج.م</span>
                  </div>
                  <div className="summary_divider"></div>
                  <div className="summary_row summary_total">
                    <span>الإجمالي:</span>
                    <span>{total} ج.م</span>
                  </div>
                </div>
                <button
                  className="checkout_btn"
                  onClick={() => router.push("/pages/checkout")}
                >
                  إتمام الطلب
                </button>
                <button className="continue_shopping_btn">متابعة التسوق</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientCart;
