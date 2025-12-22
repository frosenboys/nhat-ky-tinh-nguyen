import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


function decodeJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  // -----------------------------------------------------------
  // 1. CẤU HÌNH CÁC PATH CÔNG KHAI (PUBLIC PATHS)
  // -----------------------------------------------------------

  // Cho phép truy cập /news/post và tất cả các path con của nó
  if (pathname.startsWith('/news/post')) {
    return NextResponse.next()
  }

  // -----------------------------------------------------------
  // 2. LOGIC TRANG LOGIN
  // -----------------------------------------------------------

  if (pathname === '/login') {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  // -----------------------------------------------------------
  // 3. CÁC TRANG CÒN LẠI (PROTECTED ROUTES)
  // -----------------------------------------------------------

  // Check token tồn tại và hợp lệ
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  else if (token) {
    const payload = decodeJwt(token);
    const isExpired = payload && payload.exp ? (Date.now() / 1000) > payload.exp : true;

    if (isExpired) {
      // Nếu hết hạn: Xóa cookie và redirect về login
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('token');
      response.cookies.delete('fullName');
      response.cookies.delete('avatarUrl');
      response.cookies.delete('monthNow');
      return response;
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}