import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// middleware.ts
export async function middleware(req: NextRequest) {
    try {
        const res = NextResponse.next();
        const supabase = createMiddlewareClient({ req, res });

        const { data: { session }, error } = await supabase.auth.getSession();

        console.log('Middleware check:', {
            path: req.nextUrl.pathname,
            hasSession: !!session,
            error: error || 'none'
        });

        const isProtectedRoute = req.nextUrl.pathname.startsWith('/home');
        const isAuthRoute = req.nextUrl.pathname === '/login';

        if (isProtectedRoute && !session) {
            console.log('Redirecting to login - no session');
            return NextResponse.redirect(new URL('/login', req.url));
        }

        if (isAuthRoute && session) {
            console.log('Redirecting to home - has session');
            return NextResponse.redirect(new URL('/home', req.url));
        }

        return res;
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: [
        '/home/:path*',
        '/login',
        '/((?!auth/callback|api|_next/static|_next/image|favicon.ico).*)',
    ],
};