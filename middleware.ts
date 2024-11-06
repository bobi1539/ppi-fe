import { NextResponse } from "next/server";
import { userRoleMenuFindByHeader } from "./app/backend-api/user-role-menu";

export async function middleware(request: Request) {
  const { pathname } = new URL(request.url);

  const allowedUrls = await fetchAllowedUrls();

  console.log(allowedUrls);

  const isAllowed = allowedUrls.some((allowedUrl) => pathname.startsWith(allowedUrl));
  if (!isAllowed) {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  return NextResponse.next();
}

async function fetchAllowedUrls(): Promise<string[]> {
  try {
    const allowedUrls: string[] = [];
    const response = await userRoleMenuFindByHeader();
    response.menus.forEach((menu) => {
      allowedUrls.push(menu.route);
      menu.subMenus.forEach((subMenu) => {
        allowedUrls.push(subMenu.route);
      });
    });
    return allowedUrls;
  } catch (error) {
    console.error("Error fetching allowed URLs:", error);
    return [];
  }
}

export const config = {
  matcher: ["/office/:path*"],
};
