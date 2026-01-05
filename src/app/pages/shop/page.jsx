import React, { Suspense } from "react";
import ClientShop from "./ClientShop";

const page = () => {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <ClientShop />
    </Suspense>
  );
};

export default page;
