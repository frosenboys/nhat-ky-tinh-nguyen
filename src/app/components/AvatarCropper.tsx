"use client";

import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

export default function AvatarCropper({ imageSrc, onCancel, onCropDone }: any) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropComplete = useCallback((_:any, areaPixels:any) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const getCroppedImage = async () => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const { width, height, x, y } = croppedAreaPixels as any;

    canvas.width = width;
    canvas.height = height;

    ctx!.drawImage(image, x, y, width, height, 0, 0, width, height);

    canvas.toBlob((blob) => {
      if (blob) onCropDone(blob);
    }, "image/jpeg");
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-[9999]">
      <div className="relative w-[90vw] h-[70vh] bg-black rounded-xl overflow-hidden">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          minZoom={1}
          maxZoom={3}
          zoomSpeed={0.1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          objectFit="contain"
          showGrid={false}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 mt-5">
        <input
          type="range"
          min={1}
          max={3}
          step={0.01}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-40"
        />
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={onCancel}
          className="px-5 py-2 bg-gray-300 rounded-lg text-black"
        >
          Huỷ
        </button>

        <button
          onClick={getCroppedImage}
          className="px-5 py-2 bg-blue-600 rounded-lg text-white"
        >
          Xác nhận
        </button>
      </div>
    </div>
  );
}



// -------- Helper Load Image ----------
function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
  });
}
