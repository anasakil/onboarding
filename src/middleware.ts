import { withAuth } from 'next-auth/middleware';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './navigation';

const intlMiddleware = createMiddleware(routing);

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Check if the path is the login page (considering locale prefixes)
    const isLoginPage = pathname === '/login' || pathname.match(/^\/(en|it)\/login$/);

    // Redirect to dashboard if logged in and trying to access login
    if (isLoginPage && token) {
      // We need to keep the locale if present, or default to en
      // Simple strategy: let intl middleware handle the locale part, but we need to change target path
      // For simplicity, just redirect to /dashboard which triggers a redirect to /[locale]/dashboard
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Pass the request to next-intl middleware for locale handling
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // Allow access to login page without token (checking localized paths too)
        const isPublicPage =
          pathname === '/login' ||
          pathname.match(/^\/(en|it)\/login$/) ||
          pathname.startsWith('/onboarding') ||
          pathname.match(/^\/(en|it)\/onboarding/) ||
          pathname === '/' ||
          pathname.match(/^\/(en|it)$/);

        if (isPublicPage) {
          return true;
        }

        // Require token for all other protected routes
        return !!token;
      },
    },
  }
);

export const config = {
  // Update matcher to include locale prefixes and exclude api/static
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
