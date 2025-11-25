"use client";

import { Suspense } from "react";
import Details from "./PageDetails";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Đang tải...</div>}>
      <Details />
    </Suspense>
  );
}
