import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  // const isAuthenticated = false
  // if (isAuthenticated) {
  //   return NextResponse.redirect(new URL('/blogs', request.url))
  // }
  // return NextResponse.redirect(new URL('auth/sign-in', request.url))

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/blogs'],
}