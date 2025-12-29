"use client";
import React, { useState } from "react";
import "./Navbar.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3); // Example cart count
  const router = useRouter();
  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "المنتجات", href: "/pages/shop" },
    { name: "عروضنا", href: "/pages/offers" },
    { name: "اتصل بنا", href: "/contact" },
  ];

  const slidingTexts = [
    "🚚 توصيل مجاني للطلبات فوق 100 جنيه",
    "✨ خصم 20% على جميع المنتجات",
    "🎉 عروض خاصة لفترة محدودة",
  ];

  return (
    <nav className="navbar">
      {/* Top Navbar - Sliding Text */}
      <div className="navbar-top">
        <div className="sliding-text-container">
          <div className="sliding-text-wrapper">
            {[...slidingTexts, ...slidingTexts].map((text, index) => (
              <span key={index} className="sliding-text-item">
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Navbar - Logo, Search, Cart */}
      <div className="navbar-middle">
        <div className="navbar-middle-container">
          {/* Logo */}
          <div className="navbar-logo">
            <a href="/">
              <Image
                src={"/images/logo.png"}
                alt="logo"
                width={100}
                height={100}
              />
            </a>
          </div>

          {/* Search Bar - Desktop */}
          <div className="navbar-search">
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              className="search-input"
            />
            <button className="search-button">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>

          {/* Right Side - Cart and Menu (Mobile) */}
          <div className="navbar-right">
            {/* Cart Icon with Counter */}
            <div className="navbar-cart">
              <button
                className="cart-button"
                onClick={() => router.push("/pages/cart")}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {cartCount > 0 && (
                  <span className="cart-counter">{cartCount}</span>
                )}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={isMenuOpen ? "open" : ""}></span>
              <span className={isMenuOpen ? "open" : ""}></span>
              <span className={isMenuOpen ? "open" : ""}></span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mobile-search-container">
          <div className="mobile-search">
            <button className="mobile-search-button">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
            <input
              type="text"
              placeholder="أبحث عن..."
              className="mobile-search-input"
            />
          </div>
        </div>
      </div>

      {/* Bottom Navbar - Navigation Links */}
      <div className={`navbar-bottom ${isMenuOpen ? "open" : ""}`}>
        <ul className="nav-links">
          {navLinks.map((link, index) => (
            <li key={index}>
              <a href={link.href} onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
