import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth
  const isAuthRoute = req.nextUrl.pathname.startsWith("/sign-in") || req.nextUrl.pathname.startsWith("/sign-up")

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/", req.nextUrl))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn) {
    let callbackUrl = req.nextUrl.pathname
    if (req.nextUrl.search) {
      callbackUrl += req.nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return NextResponse.redirect(new URL(`/sign-in?callbackUrl=${encodedCallbackUrl}`, req.nextUrl))
  }

  return NextResponse.next()
})

export default proxy;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
