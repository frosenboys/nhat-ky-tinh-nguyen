"use client";

import { Suspense } from "react";
import NewsDetail from "./NewsDetails";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Đang tải...</div>}>
      <NewsDetail />
    </Suspense>
  );
}
