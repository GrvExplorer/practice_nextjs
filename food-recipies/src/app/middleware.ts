import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest) {
  const isAuthenticated = false;

  if (!isAuthenticated) {
    console.log('not redirected');
    return NextResponse.redirect(new URL('/home', request.url));
  }

  console.log('not redirected');
  

  return NextResponse.next()
}

export const config = {
  matcher: ["/recipes"],
};

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// };