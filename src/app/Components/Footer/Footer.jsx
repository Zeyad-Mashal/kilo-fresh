import React from "react";
import "./Footer.css";
import Image from "next/image";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_container">
        <Image src="/images/logo.png" alt="logo" width={100} height={100} />
        <div className="footer_container_links">
          <div className="footer_links_item">
            <h3>كيلو فريش</h3>
            <ul>
              <li>الرئيسية</li>
              <li>من نحن</li>
              <li>سياسة الشحن</li>
              <li>سياسة الاستبدال والإرجاع</li>
            </ul>
          </div>
          <div className="footer_links_item">
            <h3>الاقسام</h3>
            <ul>
              <li>الرئيسية</li>
              <li>الدجاج</li>
              <li>البط</li>
              <li>العروض</li>
            </ul>
          </div>
          <div className="footer_links_item">
            <h3>تواصل معنا</h3>
            <ul>
              <li>
                <a
                  href="https://wa.me/201033910978"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  01033910978
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/201156617722"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  01156617722
                </a>
              </li>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  اللوكشين
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>جميع الحقوق محفوظة لكيلو فريش © 2025</p>
          <span>Created by Zeyad Mashaal.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
