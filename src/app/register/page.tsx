"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    GalleryVerticalEnd,
    Loader2,
    KeyRound,
    Mail,
    User,
    Github,
    Chrome,
    AlertCircle,
    Check,
    Briefcase,
    Building
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import backgroundImage from "@/app/public/assets/img/endless-constellation.svg";
import rightBg from "@/app/public/assets/img/endless-constellation-bg.svg";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const DUMMY_NAME = "John Doe";
const DUMMY_EMAIL = "test@example.com";
const DUMMY_PASSWORD = "Password123!";
const DUMMY_COMPANY = "Acme Inc";
const DUMMY_JOB_TITLE = "Product Manager";

interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    company?: string;
    jobTitle?: string;
    form?: string;
}

export default function RegisterPage() {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        company: "",
        jobTitle: ""
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [registrationComplete, setRegistrationComplete] = useState(false);

    const validateEmail = (email: string): boolean => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password: string): boolean => {
        return password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^a-zA-Z0-9]/.test(password);
    };

    const checkPasswordStrength = (password: string): number => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (password.match(/[A-Z]/)) strength += 1;
        if (password.match(/[0-9]/)) strength += 1;
        if (password.match(/[^a-zA-Z0-9]/)) strength += 1;
        return strength;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === "password") {
            setPasswordStrength(checkPasswordStrength(value));
        }

        if (errors[name as keyof FormErrors]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name as keyof FormErrors];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (!validatePassword(formData.password)) {
            newErrors.password = "Password does not meet all requirements";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            // 1. Sign up the user with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.name,
                    },
                    emailRedirectTo: `${window.location.origin}/auth/callback`
                }
            });

            if (authError) {
                throw authError;
            }

            if (!authData.user) {
                throw new Error("Failed to create user account");
            }

            // 2. Update the profile with additional information
            // Note: The basic profile is created by the database trigger,
            // but we need to update with the additional fields
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    full_name: formData.name,
                    company: formData.company,
                    job_title: formData.jobTitle
                })
                .eq('id', authData.user.id);

            if (profileError) {
                console.error("Error updating profile:", profileError);
                // We won't throw here since the auth part worked
            }

            // Show success message and redirect
            setRegistrationComplete(true);

            // Wait 2 seconds then redirect to verification page
            setTimeout(() => {
                router.push("/verification");
            }, 2000);

        } catch (error: any) {
            console.error("Registration error:", error);
            setErrors({
                form: error.message || "Registration failed. Please try again."
            });
            setIsLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            setIsLoading(true);
            console.log('Starting Google OAuth sign up...');

            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                    queryParams: {
                        prompt: 'select_account',
                        access_type: 'offline'
                    }
                }
            });

            if (error) {
                console.error('OAuth error:', error);
                setErrors({ form: error.message || "Failed to sign up with Google" });
                setIsLoading(false);
            }

        } catch (error) {
            console.error('Sign up error:', error);
            setErrors({ form: "Failed to sign up with Google. Please try again." });
            setIsLoading(false);
        }
    };

    const handleGitHubSignUp = async () => {
        try {
            setIsLoading(true);
            await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                }
            });
        } catch (error) {
            setErrors({ form: "Failed to sign up with GitHub. Please try again." });
            setIsLoading(false);
        }
    };

    const fillDummyAccount = () => {
        setFormData({
            name: DUMMY_NAME,
            email: DUMMY_EMAIL,
            password: DUMMY_PASSWORD,
            confirmPassword: DUMMY_PASSWORD,
            company: DUMMY_COMPANY,
            jobTitle: DUMMY_JOB_TITLE
        });
        setPasswordStrength(checkPasswordStrength(DUMMY_PASSWORD));
        setErrors({});
    };

    if (registrationComplete) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
                <Card className="w-full max-w-md border-0 shadow-lg">
                    <CardHeader className="space-y-2 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                            <Check className="size-6 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Registration Successful</CardTitle>
                        <CardDescription>
                            Please check your email to verify your account. You will be redirected shortly.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Loader2 className="mx-auto size-6 animate-spin text-zinc-500" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800" />
                <Image
                    src={rightBg}
                    alt="Registration background"
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 mix-blend-overlay opacity-20"
                    priority
                />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="max-w-md text-white space-y-6">
                        <Badge variant="outline" className="px-4 py-1 text-sm border-zinc-700 text-zinc-300">
                            Get Started
                        </Badge>
                        <h1 className="text-5xl font-bold tracking-tight">Gael Platform</h1>
                        <p className="text-lg text-zinc-400 leading-relaxed">
                            Join our growing community of professionals and teams. Create an account today and
                            experience the power of collaborative productivity.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold">10k+</div>
                                <div className="text-sm text-zinc-400">Active Users</div>
                            </div>
                            <Separator orientation="vertical" className="h-16 bg-zinc-700" />
                            <div className="text-center">
                                <div className="text-3xl font-bold">95%</div>
                                <div className="text-sm text-zinc-400">Satisfaction</div>
                            </div>
                            <Separator orientation="vertical" className="h-16 bg-zinc-700" />
                            <div className="text-center">
                                <div className="text-3xl font-bold">24/7</div>
                                <div className="text-sm text-zinc-400">Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center p-8 bg-zinc-50">
                <div className="mx-auto w-full max-w-md space-y-8">
                    <div className="flex items-center justify-center gap-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900">
                            <GalleryVerticalEnd className="size-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-zinc-900">Gael.</h2>
                    </div>

                    <Card className="border-0 shadow-lg">
                        <CardHeader className="space-y-2 pb-6">
                            <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
                            <CardDescription className="text-center text-zinc-600">
                                Fill in your details to get started with Gael
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {errors.form && (
                                <Alert variant="destructive" className="text-sm">
                                    <AlertCircle className="size-4" />
                                    <AlertDescription>{errors.form}</AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-sm font-medium text-zinc-700">
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 size-4 text-zinc-500" />
                                        <Input
                                            id="name"
                                            placeholder="John Doe"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`pl-10 h-12 border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 ${errors.name ? "border-red-500" : ""}`}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-zinc-700">
                                        Email address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 size-4 text-zinc-500" />
                                        <Input
                                            id="email"
                                            placeholder="name@example.com"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`pl-10 h-12 border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 ${errors.email ? "border-red-500" : ""}`}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="company" className="text-sm font-medium text-zinc-700">
                                            Company (Optional)
                                        </Label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-3 size-4 text-zinc-500" />
                                            <Input
                                                id="company"
                                                placeholder="Company name"
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="pl-10 h-12 border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400"
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="jobTitle" className="text-sm font-medium text-zinc-700">
                                            Job Title (Optional)
                                        </Label>
                                        <div className="relative">
                                            <Briefcase className="absolute left-3 top-3 size-4 text-zinc-500" />
                                            <Input
                                                id="jobTitle"
                                                placeholder="Your role"
                                                type="text"
                                                name="jobTitle"
                                                value={formData.jobTitle}
                                                onChange={handleChange}
                                                className="pl-10 h-12 border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400"
                                                disabled={isLoading}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium text-zinc-700">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <KeyRound className="absolute left-3 top-3 size-4 text-zinc-500" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={`pl-10 h-12 border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 ${errors.password ? "border-red-500" : ""}`}
                                            disabled={isLoading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-700"
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                                    )}

                                    {formData.password && (
                                        <div className="mt-2">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="text-xs text-zinc-600">Password strength:</div>
                                                <div className="flex gap-1">
                                                    {[...Array(4)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`h-1 w-5 rounded-full ${i < passwordStrength
                                                                    ? passwordStrength === 1
                                                                        ? "bg-red-500"
                                                                        : passwordStrength === 2
                                                                            ? "bg-yellow-500"
                                                                            : passwordStrength === 3
                                                                                ? "bg-green-400"
                                                                                : "bg-green-500"
                                                                    : "bg-zinc-200"
                                                                }`}
                                                        />
                                                    ))}
                                                </div>
                                                <div className="text-xs text-zinc-600">
                                                    {passwordStrength === 0 && "Weak"}
                                                    {passwordStrength === 1 && "Fair"}
                                                    {passwordStrength === 2 && "Good"}
                                                    {passwordStrength === 3 && "Strong"}
                                                    {passwordStrength === 4 && "Excellent"}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 text-xs">
                                                <div className={`flex items-center gap-1 ${formData.password.length >= 8 ? "text-green-600" : "text-zinc-500"}`}>
                                                    {formData.password.length >= 8 ? <Check className="size-3" /> : <div className="size-3" />}
                                                    8+ characters
                                                </div>
                                                <div className={`flex items-center gap-1 ${formData.password.match(/[A-Z]/) ? "text-green-600" : "text-zinc-500"}`}>
                                                    {formData.password.match(/[A-Z]/) ? <Check className="size-3" /> : <div className="size-3" />}
                                                    Uppercase
                                                </div>
                                                <div className={`flex items-center gap-1 ${formData.password.match(/[0-9]/) ? "text-green-600" : "text-zinc-500"}`}>
                                                    {formData.password.match(/[0-9]/) ? <Check className="size-3" /> : <div className="size-3" />}
                                                    Number
                                                </div>
                                                <div className={`flex items-center gap-1 ${formData.password.match(/[^a-zA-Z0-9]/) ? "text-green-600" : "text-zinc-500"}`}>
                                                    {formData.password.match(/[^a-zA-Z0-9]/) ? <Check className="size-3" /> : <div className="size-3" />}
                                                    Special char
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-zinc-700">
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <KeyRound className="absolute left-3 top-3 size-4 text-zinc-500" />
                                        <Input
                                            id="confirmPassword"
                                            type={showPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className={`pl-10 h-12 border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 ${errors.confirmPassword ? "border-red-500" : ""}`}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 mt-4">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500"
                                        required
                                    />
                                    <Label htmlFor="terms" className="text-sm text-zinc-700">
                                        I agree to the <a href="#" className="font-medium text-zinc-900 hover:underline">Terms of Service</a> and <a href="#" className="font-medium text-zinc-900 hover:underline">Privacy Policy</a>
                                    </Label>
                                </div>

                                <Button
                                    className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 size-4 animate-spin" />
                                            Creating account...
                                        </>
                                    ) : (
                                        "Create account"
                                    )}
                                </Button>
                            </form>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <Separator className="w-full border-zinc-200" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-zinc-500">
                                        Or sign up with
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    variant="outline"
                                    className="h-12 border-zinc-200 hover:bg-zinc-50"
                                    onClick={handleGitHubSignUp}
                                    disabled={isLoading}
                                >
                                    <Github className="mr-2 size-4" />
                                    GitHub
                                </Button>
                                <Button
                                    variant="outline"
                                    className="h-12 border-zinc-200 hover:bg-zinc-50"
                                    onClick={handleGoogleSignUp}
                                    disabled={isLoading}
                                >
                                    <Chrome className="mr-2 size-4" />
                                    Google
                                </Button>
                            </div>

                            <Button
                                variant="outline"
                                onClick={fillDummyAccount}
                                className="w-full h-12 border-zinc-200 hover:bg-zinc-50"
                                disabled={isLoading}
                            >
                                Use Demo Account
                            </Button>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-4 border-t border-zinc-100 bg-zinc-50/50">
                            <div className="text-sm text-center text-zinc-600">
                                Already have an account?{" "}
                                <a
                                    className="font-medium text-zinc-900 hover:underline"
                                    href="/login"
                                >
                                    Sign in instead
                                </a>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}