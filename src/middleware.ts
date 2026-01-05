import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Redirect to dashboard if logged in and trying to access login
    if (pathname === '/login' && token) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow access to login page without token
        if (pathname === '/login') {
          return true
        }

        // Require token for all other protected routes
        return !!token
      },
    },
  }
)

export const config = {
  // Only protect admin routes - public routes (/, /onboarding) are excluded
  matcher: ['/dashboard/:path*', '/login', '/leads/:path*', '/companies/:path*', '/admin/:path*', '/submissions/:path*'],
}
