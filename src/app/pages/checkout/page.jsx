import React, { Suspense } from "react";
import ClientCheckout from "./ClientCheckout";

const page = () => {
  return (
    <Suspense fallback={<div style={{ color: "#fff", textAlign: "center", padding: "2rem" }}>جاري التحميل...</div>}>
      <ClientCheckout />
    </Suspense>
  );
};

export default page;
