import React, { Suspense } from "react";
import ClientProduct from "./ClientProduct";

const page = () => {
  return (
    <Suspense
      fallback={
        <div style={{ color: "#fff", textAlign: "center", padding: "2rem" }}>
          جاري التحميل...
        </div>
      }
    >
      <ClientProduct />
    </Suspense>
  );
};

export default page;
