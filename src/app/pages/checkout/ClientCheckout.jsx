"use client";
import React, { useState } from "react";
import "./checkout.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

const ClientCheckout = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  // Sample cart items - in real app, this would come from state management
  const cartItems = [
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
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 50;
  const total = subtotal + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "رقم الهاتف غير صحيح";
    }
    if (!formData.address.trim()) {
      newErrors.address = "العنوان مطلوب";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleCompleteOrder = () => {
    // In real app, send order to backend
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="checkout_page">
      <div className="checkout_container">
        <h1 className="checkout_title">إتمام الطلب</h1>

        <div className="checkout_content">
          {/* Order Summary Section */}
          <div className="checkout_summary_section">
            <div className="summary_card">
              <h2 className="summary_card_title">ملخص الطلب</h2>
              <div className="summary_items_list">
                {cartItems.map((item) => (
                  <div key={item.id} className="summary_item">
                    <div className="summary_item_image">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                      />
                      {item.discount && (
                        <span className="summary_item_discount">
                          {item.discount}
                        </span>
                      )}
                    </div>
                    <div className="summary_item_details">
                      <h3>{item.title}</h3>
                      <div className="summary_item_price_info">
                        <span className="summary_item_price">
                          {item.price} ج.م
                        </span>
                        {item.oldPrice && (
                          <span className="summary_item_old_price">
                            {item.oldPrice} ج.م
                          </span>
                        )}
                      </div>
                      <span className="summary_item_quantity">
                        الكمية: {item.quantity}
                      </span>
                    </div>
                    <div className="summary_item_total">
                      {item.price * item.quantity} ج.م
                    </div>
                  </div>
                ))}
              </div>
              <div className="summary_totals">
                <div className="summary_total_row">
                  <span>عدد المنتجات:</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="summary_total_row">
                  <span>الكمية الإجمالية:</span>
                  <span>{totalQuantity}</span>
                </div>
                <div className="summary_total_row">
                  <span>المجموع الفرعي:</span>
                  <span>{subtotal} ج.م</span>
                </div>
                <div className="summary_total_row">
                  <span>تكلفة الشحن:</span>
                  <span>{shipping} ج.م</span>
                </div>
                <div className="summary_divider"></div>
                <div className="summary_total_row summary_final_total">
                  <span>الإجمالي:</span>
                  <span>{total} ج.م</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form Section */}
          <div className="checkout_form_section">
            <div className="form_card">
              <h2 className="form_card_title">معلومات التوصيل</h2>
              <form onSubmit={handleCheckout} className="checkout_form">
                <div className="form_group">
                  <label htmlFor="name">الاسم الكامل *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="أدخل اسمك الكامل"
                    className={errors.name ? "input_error" : ""}
                  />
                  {errors.name && (
                    <span className="error_message">{errors.name}</span>
                  )}
                </div>

                <div className="form_group">
                  <label htmlFor="phone">رقم الهاتف *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="01XXXXXXXXX"
                    className={errors.phone ? "input_error" : ""}
                  />
                  {errors.phone && (
                    <span className="error_message">{errors.phone}</span>
                  )}
                </div>

                <div className="form_group">
                  <label htmlFor="address">العنوان الكامل *</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="أدخل عنوان التوصيل الكامل"
                    rows="4"
                    className={errors.address ? "input_error" : ""}
                  ></textarea>
                  {errors.address && (
                    <span className="error_message">{errors.address}</span>
                  )}
                </div>

                <button type="submit" className="checkout_submit_btn">
                  إتمام الطلب
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal_overlay" onClick={() => setShowModal(false)}>
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal_close_btn"
              onClick={() => setShowModal(false)}
            >
              <FaTimes />
            </button>
            <div className="modal_success_icon">
              <FaCheckCircle />
            </div>
            <h2 className="modal_title">تم إتمام الطلب بنجاح!</h2>
            <p className="modal_subtitle">
              شكراً لك على طلبك. سيتم التواصل معك قريباً
            </p>

            {/* Order Summary in Modal */}
            <div className="modal_order_summary">
              <h3 className="modal_summary_title">ملخص الطلب</h3>
              <div className="modal_customer_info">
                <div className="modal_info_row">
                  <span>الاسم:</span>
                  <span>{formData.name}</span>
                </div>
                <div className="modal_info_row">
                  <span>الهاتف:</span>
                  <span>{formData.phone}</span>
                </div>
                <div className="modal_info_row">
                  <span>العنوان:</span>
                  <span>{formData.address}</span>
                </div>
              </div>
              <div className="modal_items_summary">
                {cartItems.map((item) => (
                  <div key={item.id} className="modal_item_row">
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>{item.price * item.quantity} ج.م</span>
                  </div>
                ))}
              </div>
              <div className="modal_total_section">
                <div className="modal_total_row">
                  <span>المجموع الفرعي:</span>
                  <span>{subtotal} ج.م</span>
                </div>
                <div className="modal_total_row">
                  <span>الشحن:</span>
                  <span>{shipping} ج.م</span>
                </div>
                <div className="modal_total_row modal_final_total">
                  <span>الإجمالي:</span>
                  <span>{total} ج.م</span>
                </div>
              </div>
            </div>

            <button
              className="modal_complete_btn"
              onClick={handleCompleteOrder}
            >
              العودة للصفحة الرئيسية
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientCheckout;
