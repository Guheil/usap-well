"use client"

import React, { useState, useEffect } from 'react';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

interface ResendStatus {
    success: boolean;
    error: string | null;
}

const VerificationPage = () => {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const [isResending, setIsResending] = useState(false);
    const [resendStatus, setResendStatus] = useState<ResendStatus>({ success: false, error: null });
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user?.email) {
                setUserEmail(session.user.email);
            }
        };
        getSession();
    }, [supabase.auth]);

    const handleResendEmail = async () => {
        if (!userEmail) {
            setResendStatus({
                success: false,
                error: 'No email address found. Please try signing up again.'
            });
            return;
        }

        try {
            setIsResending(true);
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: userEmail,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`
                }
            });

            if (error) throw error;

            setResendStatus({
                success: true,
                error: null
            });
        } catch (error) {
            setResendStatus({
                success: false,
                error: 'Failed to resend verification email. Please try again.'
            });
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
            <div className="w-full max-w-md space-y-8">
                <Card className="border-0 shadow-lg">
                    <CardHeader className="space-y-3 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                            <Mail className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
                        <CardDescription className="text-base text-zinc-600">
                            We've sent you a verification link to {userEmail ? <strong>{userEmail}</strong> : 'your email address'}.
                            Please click the link to verify your account.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {resendStatus.error && (
                            <Alert variant="destructive">
                                <AlertDescription>{resendStatus.error}</AlertDescription>
                            </Alert>
                        )}

                        {resendStatus.success && (
                            <Alert className="border-green-200 bg-green-50 text-green-800">
                                <AlertDescription>Verification email has been resent successfully.</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-4">
                            <div className="text-sm text-zinc-600 text-center">
                                Didn't receive the email? Check your spam folder or click below to resend.
                            </div>

                            <Button
                                className="w-full h-12"
                                variant="outline"
                                onClick={handleResendEmail}
                                disabled={isResending || !userEmail}
                            >
                                {isResending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Resending verification email...
                                    </>
                                ) : (
                                    'Resend verification email'
                                )}
                            </Button>

                            <Button
                                variant="ghost"
                                className="w-full h-12 text-zinc-600 hover:text-zinc-900"
                                onClick={() => router.push('/login')}
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to login
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default VerificationPage;