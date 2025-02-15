"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SettingsPage = () => {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background pb-16">
            {/* Header */}
            <header className="bg-card sticky top-0 z-10 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push('/profile')}
                            className="mr-2"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-semibold">Settings</h1>
                            <p className="text-sm text-muted-foreground">
                                Manage your account preferences
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                <Tabs defaultValue="account" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 gap-2 lg:grid-cols-4">
                        <TabsTrigger value="account" className="text-xs sm:text-sm">
                            Account
                        </TabsTrigger>
                        <TabsTrigger value="privacy" className="text-xs sm:text-sm">
                            Privacy
                        </TabsTrigger>
                        <TabsTrigger value="notifications" className="text-xs sm:text-sm">
                            Notifications
                        </TabsTrigger>
                        <TabsTrigger value="appearance" className="text-xs sm:text-sm">
                            Appearance
                        </TabsTrigger>
                    </TabsList>

                    {/* Account Settings */}
                    <TabsContent value="account">
                        <Card>
                            <CardHeader>
                                <CardTitle>Account Settings</CardTitle>
                                <CardDescription>
                                    Manage your account information and preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage
                                            src="https://picsum.photos/200/300"
                                            alt="Profile"
                                            width={80}
                                            height={80}
                                        />
                                        <AvatarFallback>AJ</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2 text-center sm:text-left">
                                        <Button className="w-full sm:w-auto">Change Avatar</Button>
                                        <p className="text-sm text-muted-foreground">
                                            JPG, GIF or PNG. Max size 2MB.
                                        </p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label>Username</Label>
                                        <p className="text-sm text-muted-foreground">@alexjohnson</p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label>Email</Label>
                                        <p className="text-sm text-muted-foreground">alex.johnson@example.com</p>
                                    </div>
                                    <Button variant="outline" className="w-full sm:w-auto">
                                        Update Email
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Privacy Settings */}
                    <TabsContent value="privacy">
                        <Card>
                            <CardHeader>
                                <CardTitle>Privacy Settings</CardTitle>
                                <CardDescription>
                                    Control your privacy and security preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <Label>Private Account</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Only approved followers can see your posts
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                                <Separator />
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <Label>Two-Factor Authentication</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Add an extra layer of security to your account
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Notification Settings */}
                    <TabsContent value="notifications">
                        <Card>
                            <CardHeader>
                                <CardTitle>Notification Preferences</CardTitle>
                                <CardDescription>
                                    Choose what notifications you receive
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <Label>Push Notifications</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Receive notifications on your device
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                                <Separator />
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <Label>Email Notifications</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Receive notifications via email
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Appearance Settings */}
                    <TabsContent value="appearance">
                        <Card>
                            <CardHeader>
                                <CardTitle>Appearance Settings</CardTitle>
                                <CardDescription>
                                    Customize how the app looks and feels
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <Label>Dark Mode</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Toggle between light and dark theme
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                                <Separator />
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="space-y-1">
                                        <Label>Compact View</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Show more content with less spacing
                                        </p>
                                    </div>
                                    <Switch />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default SettingsPage;