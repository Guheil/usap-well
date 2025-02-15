"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GalleryVerticalEnd, Loader2, KeyRound, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import backgroundImage from "@/app/public/assets/img/endless-constellation.svg";

const DUMMY_EMAIL = "test@example.com";
const DUMMY_PASSWORD = "password123";

interface FormErrors {
  email?: string;
  password?: string;
  form?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});

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
      if (formData.email === DUMMY_EMAIL && formData.password === DUMMY_PASSWORD) {
        await new Promise(resolve => setTimeout(resolve, 800));
        router.push("/home");
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      setErrors({ form: "Invalid credentials. Try the dummy account: test@example.com / password123" });

    } catch (error) {
      setErrors({ form: "Login failed. Please try again." });
    } finally {
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
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600" />
        <Image
          src={backgroundImage}
          alt="Login background"
          layout="fill" 
          objectFit="cover" 
          className="absolute inset-0 mix-blend-overlay" 
          priority 
        />
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="max-w-md text-white">
            <h1 className="mb-4 text-4xl font-bold">Welcome to Gael</h1>
            <p className="text-lg opacity-90">Experience seamless collaboration and productivity with our modern platform.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center p-8">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="flex items-center justify-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <GalleryVerticalEnd className="size-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Gael.</h2>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Sign in</CardTitle>
              <CardDescription className="text-center">
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-3 size-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                      disabled={isLoading}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500">{errors.password}</p>
                  )}
                </div>

                {errors.form && (
                  <p className="text-sm text-red-500 text-center">{errors.form}</p>
                )}

                <Button className="w-full" type="submit" disabled={isLoading}>
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

              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  onClick={fillDummyAccount}
                  className="mt-4 w-full"
                  disabled={isLoading}
                >
                  Use Demo Account
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <a
                  className="underline text-primary hover:text-primary/90"
                  href="#"
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