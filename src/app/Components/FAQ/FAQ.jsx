"use client";
import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "كيف يمكنني الشراء من الموقع؟",
      answer:
        "يمكنك الشراء من الموقع عن طريق الانترنت عبر الضغط على الزر 'الشراء' واتباع الخطوات المبينة. يمكنك اختيار المنتجات المطلوبة وإضافتها إلى سلة التسوق، ثم إتمام عملية الشراء بسهولة وأمان.",
    },
    {
      question: "كم تستغرق عملية التوصيل؟",
      answer:
        "نقوم بتوصيل الطلبات خلال 24-48 ساعة في معظم المناطق. قد تختلف مدة التوصيل حسب موقعك الجغرافي. يمكنك متابعة حالة طلبك عبر الموقع أو الاتصال بنا للاستفسار عن موعد التوصيل الدقيق.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq">
      <div className="faq_container">
        <h1 className="faq_title">الأسئلة الشائعة</h1>
        <div className="faq_items">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq_item ${openIndex === index ? "active" : ""}`}
            >
              <button
                className="faq_question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="faq_question_text">{item.question}</span>
                <span className="faq_icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 7.5L10 12.5L15 7.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <div className="faq_answer_wrapper">
                <div className="faq_answer">{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="faq_contact">
        <p className="faq_contact_title">للشكاوي و الاقتراحات</p>
        <a
          href="https://wa.me/201155551847"
          target="_blank"
          rel="noopener noreferrer"
          className="faq_whatsapp_link"
        >
          <svg
            className="whatsapp_icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.77.966-.94 1.164-.17.199-.34.223-.63.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
              fill="currentColor"
            />
          </svg>
          تواصل معنا عبر الواتساب
        </a>
      </div>
    </div>
  );
};

export default FAQ;
