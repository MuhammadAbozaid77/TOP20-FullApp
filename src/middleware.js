import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/jwt";

export async function middleware(req) {
  const token = req.cookies.get("session")?.value;
  const path = req.nextUrl.pathname;

  // ========== لو المستخدم على الصفحة الرئيسية "/" ==========
  if (path === "/") {
    if (token) {
      const payload = await verifyJWT(token);

      if (payload) {
        // redirect to dashboard حسب ال role
        if (payload.role === "GeneralAdmin") {
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
        if (payload.role === "StoreAdmin") {
          return NextResponse.redirect(new URL("/store/dashboard", req.url));
        }
        return NextResponse.redirect(new URL("/user/dashboard", req.url));
      }
    }

    // لو مفيش token → يكمل عادي لصفحة الهوم
    return NextResponse.next();
  }

  // ========== ممنوع الدخول على /login لو بالفعل مسجل ==========
  if (path === "/login" || path === "/admin-login") {
    if (token) {
      const payload = await verifyJWT(token);

      if (payload) {
        if (payload.role === "GeneralAdmin") {
          return NextResponse.redirect(new URL("/admin/dashboard", req.url));
        }
        if (payload.role === "StoreAdmin") {
          return NextResponse.redirect(new URL("/store/dashboard", req.url));
        }
        return NextResponse.redirect(new URL("/user/dashboard", req.url));
      }
    }
    return NextResponse.next();
  }

  // ========== الحماية الأساسية ==========
  if (path.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }
  if (path.startsWith("/store") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (path.startsWith("/user") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const payload = await verifyJWT(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = payload.role;

  // Admin ONLY
  if (path.startsWith("/admin") && role !== "GeneralAdmin") {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }

  // Store Admin ONLY
  if (path.startsWith("/store") && role !== "StoreAdmin") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // User ONLY
  if (path.startsWith("/user") && role !== "user") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// ========== الأماكن اللي الميدل وير يشتغل فيها ==========
export const config = {
  matcher: [
    "/",
    "/login",
    "/admin-login",
    "/admin/:path*",
    "/store/:path*",
    "/user/:path*",
  ],
};
