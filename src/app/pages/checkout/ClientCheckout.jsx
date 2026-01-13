"use client";
import React, { useState, useEffect, useRef } from "react";
import "./checkout.css";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { getCartId } from "../../utils/cartId";
import GetCartItems from "../../API/Cart/GetCartItems";
import GetProductById from "../../API/Products/GetProductById";
import AddToCart from "../../API/Cart/AddToCart";
import Checkout from "../../API/Order/Checkout";

const ClientCheckout = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const hasFetchedRef = useRef(false);
  const hasAddedProductRef = useRef(false);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchCheckoutItems();
    }
  }, [productId]);

  const fetchCheckoutItems = async () => {
    setLoading(true);
    const cartId = getCartId();
    
    if (!cartId) {
      toast.error("لا يمكن الوصول للسلة");
      setLoading(false);
      return;
    }

    // First, get current cart items
    const fetchItems = () => {
      return new Promise((resolve) => {
        let resolved = false;
        const setItems = (items) => {
          if (!resolved) {
            resolved = true;
            resolve(items || []);
          }
        };
        
        const setErrorData = (errorMessage) => {
          if (!resolved) {
            toast.error(errorMessage || "فشل تحميل السلة");
            resolved = true;
            resolve([]);
          }
        };
        
        GetCartItems(cartId, setItems, setErrorData, () => {});
      });
    };
    
    let items = await fetchItems();
    
    // If productId exists and product is not in cart, add it (only once)
    if (productId && !hasAddedProductRef.current) {
      // Check if product exists in cart - check multiple possible fields
      const productExists = items.some(item => {
        if (!item) return false;
        const product = item.product || {};
        const itemProductId = product._id || product.id || item.productId;
        // Convert both to strings for comparison
        return String(itemProductId) === String(productId);
      });
      
      if (!productExists) {
        // Mark as added to prevent duplicate
        hasAddedProductRef.current = true;
        
        // Product not in cart, add it only once
        const addToCartFirst = () => {
          return new Promise((resolve) => {
            let resolved = false;
            const setSuccess = () => {
              if (!resolved) {
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
            
            AddToCart(productId, cartId, 1, setSuccess, setError, () => {});
          });
        };
        
        await addToCartFirst();
        // Wait a bit for the backend to process and update
        await new Promise(resolve => setTimeout(resolve, 500));
        // Fetch cart items again after adding
        items = await fetchItems();
      } else {
        // Product already exists, just use current items
        hasAddedProductRef.current = true;
      }
    }
    
    setCartItems(items);
    setLoading(false);
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const product = item.product || item;
    const price = product?.priceAfter || item.priceAfter || item.price || 0;
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);
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

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    if (cartItems.length === 0) {
      toast.error("السلة فارغة");
      return;
    }

    const cartId = getCartId();
    if (!cartId) {
      toast.error("لا يمكن الوصول للسلة");
      return;
    }

    setSubmitting(true);

    const checkoutOrder = () => {
      return new Promise((resolve) => {
        let resolved = false;
        const setSuccess = (message) => {
          if (!resolved) {
            toast.success(message || "تم إتمام الطلب بنجاح");
            setShowModal(true);
            setSubmitting(false);
            resolved = true;
            resolve();
          }
        };
        
        const setError = (errorMessage) => {
          if (!resolved) {
            toast.error(errorMessage || "فشلت العملية");
            setSubmitting(false);
            resolved = true;
            resolve();
          }
        };
        
        const orderData = {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          cartId: cartId,
          shipping: shipping
        };
        
        Checkout(orderData, setSuccess, setError, () => {});
      });
    };

    await checkoutOrder();
  };

  const handleCompleteOrder = () => {
    router.push("/");
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  if (loading) {
    return (
      <div className="checkout_page">
        <div className="checkout_container">
          <div style={{ color: "#fff", textAlign: "center", padding: "2rem" }}>
            جاري التحميل...
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout_page">
        <div className="checkout_container">
          <div style={{ color: "#fff", textAlign: "center", padding: "2rem" }}>
            <h2>السلة فارغة</h2>
            <button
              onClick={() => router.push("/pages/shop")}
              style={{
                marginTop: "1rem",
                padding: "0.75rem 2rem",
                background: "#d4af37",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              متابعة التسوق
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                {cartItems.map((item) => {
                  const itemId = item._id || item.id;
                  const product = item.product || item;
                  const itemPrice = product?.priceAfter || item.priceAfter || item.price || 0;
                  const itemOldPrice = product?.priceBefore || item.priceBefore || item.oldPrice;
                  const itemQuantity = item.quantity || 1;
                  const itemImage = product?.images?.[0]?.url || item.images?.[0]?.url || item.image || "/images/p1.png";
                  const itemName = product?.name || item.name || item.title || "منتج";
                  
                  return (
                    <div key={itemId} className="summary_item">
                      <div className="summary_item_image">
                        <Image
                          src={itemImage}
                          alt={itemName}
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
                        <h3>{itemName}</h3>
                        <div className="summary_item_price_info">
                          <span className="summary_item_price">
                            {itemPrice} ج.م
                          </span>
                          {itemOldPrice && (
                            <span className="summary_item_old_price">
                              {itemOldPrice} ج.م
                            </span>
                          )}
                        </div>
                        <span className="summary_item_quantity">
                          الكمية: {itemQuantity}
                        </span>
                      </div>
                      <div className="summary_item_total">
                        {itemPrice * itemQuantity} ج.م
                      </div>
                    </div>
                  );
                })}
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

                <button 
                  type="submit" 
                  className="checkout_submit_btn"
                  disabled={submitting}
                  style={{
                    opacity: submitting ? 0.6 : 1,
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  {submitting ? (
                    <>
                      <span>جاري المعالجة...</span>
                      <span 
                        style={{
                          display: 'inline-block',
                          width: '14px',
                          height: '14px',
                          border: '2px solid #fff',
                          borderTopColor: 'transparent',
                          borderRadius: '50%',
                          animation: 'spin 0.6s linear infinite'
                        }}
                      />
                    </>
                  ) : (
                    'إتمام الطلب'
                  )}
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
                {cartItems.map((item) => {
                  const itemId = item._id || item.id;
                  const product = item.product || item;
                  const itemName = product?.name || item.name || item.title || "منتج";
                  const itemPrice = product?.priceAfter || item.priceAfter || item.price || 0;
                  const itemQuantity = item.quantity || 1;
                  
                  return (
                    <div key={itemId} className="modal_item_row">
                      <span>
                        {itemName} × {itemQuantity}
                      </span>
                      <span>{itemPrice * itemQuantity} ج.م</span>
                    </div>
                  );
                })}
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
