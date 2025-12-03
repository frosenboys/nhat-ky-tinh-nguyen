'use client'
import Image from 'next/image'
import { FaSearch } from 'react-icons/fa'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import toast from "react-hot-toast";

export default function BottomNav() {
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token && pathName !== '/news/post') {
      router.push('/login')
    }

    // ======================================
    // Detect internet connection status
    // ======================================

    const handleOffline = () => {
      toast.error("Mất kết nối mạng. Một số chức năng có thể không hoạt động.", {
        id: "network-status",
      });
    };

    const handleOnline = () => {
      toast.success("Đã khôi phục kết nối mạng! Hãy reload lại trang!", {
        id: "network-status",
      });
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [router]);

  return (
    <div className="flex items-center gap-3 mt-3 mb-4">
      <Image
        src="/icons/fist.svg"
        alt="fist"
        width={70}
        height={70}
        onClick={() => { location.href = '/' }}
      />

      {/* Search Bar */}
      <div
        className="bg-white flex items-center rounded-full px-3 py-2 mb-3 w-full mt-3 hover:cursor-pointer"
        onClick={() => { location.href = "/chatbot" }}
      >
        <div className="flex-1 text-sm text-gray-400 focus:outline-none px-2">
          Bạn muốn tìm gì ?
        </div>
        <FaSearch className="text-gray-500" />
      </div>
      

      <Link href={"/notifications"} className="flex items-center absolute right-5 top-30">
        <div className="ml-auto relative bg-white p-1 pt-1.5 rounded-full shadow-md">
          <FontAwesomeIcon icon={faBell} className="text-[20px] text-gray-700 p-1" />
          {/* <span className="absolute top-0 right-1 block w-2.5 h-2.5 bg-yellow-400 rounded-full ring-2 ring-white"></span> */}
        </div>
      </Link>
    </div>
  )
}
