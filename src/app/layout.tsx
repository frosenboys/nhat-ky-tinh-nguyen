import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import LoadingOverlay from "./components/LoadingOverlay";
import LayoutClient from "./LayoutClient";
import { Toaster } from "react-hot-toast";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nhật kí tình nguyện | THPT Bình Long",
  description: "Nhật kí tình nguyện cho học sinh trường THPT Bình Long"
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" >
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <body className={`${inter.variable} ${interTight.variable} `}>
        <LayoutClient>
          <LoadingOverlay />
          {children}
          <Toaster position="bottom-center"/>
        </LayoutClient>
      </body>
    </html>
  );
}
