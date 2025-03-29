import jwt from "jsonwebtoken";
import { Payload } from "@/types/payload";
import { NextResponse, NextRequest } from "next/server";

const userRoutes = ["/dashboard", "/market"];
const publicRoutes = ["/login", "/signup", "/"];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const accessToken = request.cookies.get("accessToken")?.value;
  const decodedToken = jwt.decode(accessToken || "") as Payload;
  const isLoggedIn = decodedToken?.userId;

  console.log("accessToken", accessToken);

  const isUserRoute = userRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  //if user route and no session redirect to login
  if (isUserRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    //exclude svg, png, and ico routes
    "/((?!api|_next/static|_next/image|.*\\.png$|.*\\.ico$|.*\\.svg$).*)",
  ],
};
