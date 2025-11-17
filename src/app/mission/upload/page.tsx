"use client";

import { Suspense } from "react";
import UploadPageContent from "./UploadPageContent";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Đang tải...</div>}>
      <UploadPageContent />
    </Suspense>
  );
}
