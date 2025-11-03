// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/admin/:path*", "/store/:path*", "/user/:path*"],
// };

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // لو مفيش token => login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // role-based routes
    if (path.startsWith("/admin") && token.role !== "GeneralAdmin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (path.startsWith("/store") && token.role !== "StoreAdmin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (path.startsWith("/user") && token.role !== "User") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/store/:path*", "/user/:path*"],
};
