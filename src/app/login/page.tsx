"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { supabase } from '@/lib/supabase';
import {
  GalleryVerticalEnd,
  Loader2,
  KeyRound,
  Mail,
  Github,
  Chrome,
  AlertCircle
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

const DUMMY_EMAIL = "test@example.com";
const DUMMY_PASSWORD = "password123";

interface FormErrors {
  email?: string;
  password?: string;
  form?: string;
}

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

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

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        setErrors({ form: error.message });
        return;
      }

      if (data?.user) {
        router.push("/home");
      }
    } catch (error) {
      setErrors({ form: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      console.log('Starting Google OAuth with client component client...');

      const supabase = createClientComponentClient();

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
        setErrors({ form: error.message || "Failed to sign in with Google" });
        setIsLoading(false);
      }


    } catch (error) {
      console.error('Sign in error:', error);
      setErrors({ form: "Failed to sign in with Google. Please try again." });
      setIsLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });
    } catch (error) {
      setErrors({ form: "Failed to sign in with GitHub. Please try again." });
      setIsLoading(false);
    }
  };


  const fillDummyAccount = () => {
    setFormData({
      email: DUMMY_EMAIL,
      password: DUMMY_PASSWORD
    });
    setErrors({});
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800" />
           <Image
          src={rightBg}
          alt="Login background"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 mix-blend-overlay opacity-20"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-md text-white space-y-6">
            <Badge variant="outline" className="px-4 py-1 text-sm border-zinc-700 text-zinc-300">
              Welcome Back
            </Badge>
            <h1 className="text-5xl font-bold tracking-tight">Gael Platform</h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Experience seamless collaboration and productivity with our modern platform.
              Join thousands of teams already using Gael.
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
              <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
              <CardDescription className="text-center text-zinc-600">
                Enter your credentials to access your account
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
                      className={`pl-10 h-12 border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 ${errors.email ? "border-red-500" : ""
                        }`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-zinc-700">
                      Password
                    </Label>
                    <a href="#" className="text-sm text-zinc-600 hover:text-zinc-900">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 size-4 text-zinc-500" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`pl-10 h-12 border-zinc-200 focus:border-zinc-400 focus:ring-zinc-400 ${errors.password ? "border-red-500" : ""
                        }`}
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
                </div>

                <Button
                  className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full border-zinc-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-zinc-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-12 border-zinc-200 hover:bg-zinc-50"
                  onClick={handleGitHubSignIn}
                >
                  <Github className="mr-2 size-4" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  className="h-12 border-zinc-200 hover:bg-zinc-50"
                  onClick={handleGoogleSignIn}
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
                Don&apos;t have an account?{" "}
                <a
                  className="font-medium text-zinc-900 hover:underline"
                  href="/register"
                >
                  Create one now
                </a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}