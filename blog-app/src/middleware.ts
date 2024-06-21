import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function  middleware(request: NextRequest) {

  const path = request.nextUrl.pathname
  const getCookies = cookies()
  const token = getCookies.get('token')?.value || ''
  
  const publicPath = path === '/auth/sign-in' || '/auth/sign-up'

  if (publicPath && !!token) {
    return Response.redirect(new URL('/blogs', request.nextUrl))
  }

  if (!publicPath && !token) {
    return Response.redirect(new URL('/auth/sign-in', request.nextUrl))
  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/auth/sign-in', '/auth/sign-up'],
};
