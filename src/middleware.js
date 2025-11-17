import { NextResponse } from "next/server";
import { verifyJWT } from "@/lib/jwt";

export async function middleware(req) {
  const token = req.cookies.get("session")?.value;
  const path = req.nextUrl.pathname;

  // ========== ممنوع الدخول على /login لو بالفعل مسجل ==========
  if (path === "/login" || path === "/admin-login") {
    if (token) {
      const payload = await verifyJWT(token);

      if (payload) {
        // Redirect حسب الـ role
        if (payload.role === "admin") {
          return NextResponse.redirect(new URL("/admin", req.url));
        }
        if (payload.role === "StoreAdmin") {
          return NextResponse.redirect(new URL("/store/dashboard", req.url));
        }
        return NextResponse.redirect(new URL("/user", req.url));
      }
    }
    // لو مفيش توكن → يدخل صفحة اللوجين طبيعي
    return NextResponse.next();
  }

  // ========== الحماية الأساسية لباقي الصفحات ==========
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const payload = await verifyJWT(token);

  if (!payload) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const role = payload.role;

  // Admin ONLY
  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }

  // Store Admin ONLY
  if (path.startsWith("/store") && role !== "StoreAdmin") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Normal User ONLY
  if (path.startsWith("/user") && role !== "user") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// ========== الأماكن اللي الميدل وير يشتغل فيها ==========
export const config = {
  matcher: [
    "/login",
    "/admin-login",
    "/admin/:path*",
    "/store/:path*",
    "/user/:path*",
  ],
};
