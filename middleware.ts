import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, type NextRequest } from "next/server";

import { authRoutes, publicRoutes, apiAuthPrefix } from "@/lib/routes";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

export default async function middleware(
  req: NextApiRequest & NextRequest,
  res: NextApiResponse
) {
  const pathname = req.nextUrl.pathname;
  const session = await getToken({ req, secret: process.env.JWT_SECRET });

  if (publicRoutes.includes(pathname as string)) {
    return;
  } else if (authRoutes.includes(pathname as string)) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } else if (pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    return;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/signin", "/auth/signup", "/dashboard"],
};
