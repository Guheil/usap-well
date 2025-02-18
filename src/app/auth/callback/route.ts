// app/auth/callback/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const requestUrl = new URL(request.url);
        const code = requestUrl.searchParams.get("code");

        if (!code) {
            console.error('Missing code parameter in callback');
            return NextResponse.redirect(new URL("/login?error=Missing+code+parameter", request.url));
        }

        // Create the Supabase client with await for the cookies
        const cookieStore = cookies();
        const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

        // Exchange the code for a session
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
            console.error('Session exchange error:', error);
            return NextResponse.redirect(
                new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url)
            );
        }

        return NextResponse.redirect(new URL("/home", request.url));
    } catch (error) {
        console.error('Callback handler error:', error);
        return NextResponse.redirect(
            new URL(`/login?error=${encodeURIComponent(error instanceof Error ? error.message : 'Unknown error')}`, request.url)
        );
    }
}