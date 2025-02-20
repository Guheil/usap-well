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

        // Create a response first
        const response = NextResponse.redirect(new URL("/home", request.url));

        // Get cookie store and await it
        const cookieStore = await cookies();

        // Create the Supabase client with the awaited cookie store
        const supabase = createRouteHandlerClient({
            cookies: () => cookieStore
        });

        // Exchange the code for a session
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
            console.error('Session exchange error:', error);
            return NextResponse.redirect(
                new URL(`/login?error=${encodeURIComponent(error.message)}`, request.url)
            );
        }

        return response;

    } catch (error) {
        console.error('Callback handler error:', error);
        return NextResponse.redirect(
            new URL(`/login?error=${encodeURIComponent(error instanceof Error ? error.message : 'Unknown error')}`, request.url)
        );
    }
}