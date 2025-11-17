export async function uploadToCloudinary(blob: Blob) {
  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!preset || !cloudName) {
    throw new Error("Missing Cloudinary ENV");
  }

  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", preset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message || "Upload error");
  }

  return data.secure_url;
}
