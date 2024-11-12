import { NextRequest, NextResponse } from "next/server";
import { getSessionForClient } from "./app/login/helper";

export const middleware = async (request: NextRequest) => {
  try {
    const session = await getSessionForClient();
    if (!session?.loginData?.routes) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const allowedPaths = session.loginData.routes;
    const isAllowed = allowedPaths.some((path) => {
      return request.nextUrl.pathname.startsWith(path);
    });

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/error", request.url));
  }
};

export const config = {
  matcher: ["/office/:path*"],
};
