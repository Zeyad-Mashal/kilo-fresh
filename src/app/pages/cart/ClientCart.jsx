"use client";
import React, { useState, useEffect } from "react";
import "./cart.css";
import Image from "next/image";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { getCartId } from "../../utils/cartId";
import GetCartItems from "../../API/Cart/GetCartItems";
import UpdateQuantity from "../../API/Cart/UpdateQuantity";
import DeleteItem from "../../API/Cart/DeleteItem";
import ClearCart from "../../API/Cart/ClearCart";

const ClientCart = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    const id = getCartId();
    setCartId(id);
    if (id) {
      fetchCartItems(id);
    } else {
      setLoading(false);
      setError("لا يمكن الوصول للسلة");
    }
  }, []);

  const fetchCartItems = (id) => {
    const fetchItems = () => {
      return new Promise((resolve) => {
        let resolved = false;
        const setItems = (items) => {
          if (!resolved) {
            setCartItems(items || []);
            resolved = true;
            setLoading(false);
            resolve();
          }
        };

        const setErrorData = (errorMessage) => {
          if (!resolved) {
            setError(errorMessage);
            setCartItems([]);
            resolved = true;
            setLoading(false);
            resolve();
          }
        };

        GetCartItems(id, setItems, setErrorData, () => {});
      });
    };

    fetchItems();
  };

  const updateQuantity = (itemId, change) => {
    const item = cartItems.find(
      (item) => item._id === itemId || item.id === itemId
    );
    if (!item) return;

    const newQuantity = item.quantity + change;
    if (newQuantity < 1) {
      toast.error("الكمية يجب أن تكون 1 على الأقل");
      return;
    }

    const update = () => {
      return new Promise((resolve) => {
        let resolved = false;
        const setSuccess = (message) => {
          if (!resolved) {
            toast.success(message || "تم التحديث بنجاح");
            if (cartId) {
              fetchCartItems(cartId);
            }
            resolved = true;
            resolve();
          }
        };

        const setErrorData = (errorMessage) => {
          if (!resolved) {
            toast.error(errorMessage || "فشلت العملية");
            resolved = true;
            resolve();
          }
        };

        UpdateQuantity(itemId, newQuantity, setSuccess, setErrorData, () => {});
      });
    };

    update();
  };

  const removeItem = (itemId) => {
    const deleteItem = () => {
      return new Promise((resolve) => {
        let resolved = false;
        const setSuccess = (message) => {
          if (!resolved) {
            toast.success(message || "تم الحذف بنجاح");
            if (cartId) {
              fetchCartItems(cartId);
            }
            resolved = true;
            resolve();
          }
        };

        const setErrorData = (errorMessage) => {
          if (!resolved) {
            toast.error(errorMessage || "فشلت العملية");
            resolved = true;
            resolve();
          }
        };

        DeleteItem(itemId, setSuccess, setErrorData, () => {});
      });
    };

    deleteItem();
  };

  const clearCart = () => {
    if (cartItems.length === 0) {
      toast.error("السلة فارغة بالفعل");
      return;
    }

    if (!cartId) {
      toast.error("لا يمكن الوصول للسلة");
      return;
    }

    const clear = () => {
      return new Promise((resolve) => {
        let resolved = false;
        const setSuccess = (message) => {
          if (!resolved) {
            toast.success(message || "تم تفريغ السلة بنجاح");
            if (cartId) {
              fetchCartItems(cartId);
            }
            resolved = true;
            resolve();
          }
        };

        const setErrorData = (errorMessage) => {
          if (!resolved) {
            toast.error(errorMessage || "فشلت العملية");
            resolved = true;
            resolve();
          }
        };

        ClearCart(cartId, setSuccess, setErrorData, () => {});
      });
    };

    if (confirm("هل أنت متأكد من تفريغ السلة؟")) {
      clear();
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const product = item.product || item;
    const price = product?.priceAfter || item.priceAfter || item.price || 0;
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);
  const shipping = 50;
  const total = subtotal + shipping;

  if (loading) {
    return (
      <div className="cart_page">
        <div className="cart_container">
          <div style={{ color: "#fff", textAlign: "center", padding: "2rem" }}>
            جاري التحميل...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart_page">
      <div className="cart_container">
        <h1 className="cart_title">سلة التسوق</h1>

        {cartItems.length === 0 ? (
          <div className="cart_empty">
            <p>سلة التسوق فارغة</p>
            <button
              className="cart_continue_shopping"
              onClick={() => router.push("/pages/shop")}
            >
              متابعة التسوق
            </button>
          </div>
        ) : (
          <div className="cart_content">
            {/* Cart Items */}
            <div className="cart_items_section">
              <div className="cart_items_header">
                <h2>المنتجات ({cartItems.length})</h2>
              </div>
              <div className="cart_items_list">
                {cartItems.map((item) => {
                  const itemId = item._id || item.id;
                  const product = item.product || item;
                  const itemPrice =
                    product?.priceAfter || item.priceAfter || item.price || 0;
                  const itemOldPrice =
                    product?.priceBefore || item.priceBefore || item.oldPrice;
                  const itemQuantity = item.quantity || 1;
                  const itemImage =
                    product?.images?.[0]?.url ||
                    item.images?.[0]?.url ||
                    item.image ||
                    "/images/p1.png";
                  const itemName =
                    product?.name || item.name || item.title || "منتج";

                  return (
                    <div key={itemId} className="cart_item">
                      <div className="cart_item_image">
                        <Image
                          src={itemImage}
                          alt={itemName}
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
                        <h3>{itemName}</h3>
                        <div className="cart_item_price_info">
                          <span className="cart_item_price">
                            {itemPrice} ج.م
                          </span>
                          {itemOldPrice && (
                            <span className="cart_item_old_price">
                              {itemOldPrice} ج.م
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="cart_item_controls">
                        <div className="cart_item_quantity">
                          <button
                            onClick={() => updateQuantity(itemId, -1)}
                            className="quantity_btn"
                          >
                            <FaMinus />
                          </button>
                          <span className="quantity_value">{itemQuantity}</span>
                          <button
                            onClick={() => updateQuantity(itemId, 1)}
                            className="quantity_btn"
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <div className="cart_item_total">
                          <span className="item_total_label">المجموع:</span>
                          <span className="item_total_price">
                            {itemPrice * itemQuantity} ج.م
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(itemId)}
                          className="remove_item_btn"
                          title="حذف المنتج"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  );
                })}
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
                <button
                  className="continue_shopping_btn"
                  onClick={() => router.push("/pages/shop")}
                >
                  متابعة التسوق
                </button>
                <button
                  className="clear_cart_btn"
                  onClick={clearCart}
                  style={{
                    marginTop: "1rem",
                    padding: "0.75rem",
                    background: "transparent",
                    border: "1px solid #ef4444",
                    color: "#ef4444",
                    borderRadius: "8px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  تفريغ السلة
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientCart;
