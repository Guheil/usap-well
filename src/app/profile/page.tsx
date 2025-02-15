"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Calendar,
    Edit,
    Globe,
    LinkIcon,
    MapPin,
    MoreHorizontal,
    Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const userData = {
    name: "Alex Johnson",
    username: "alexjohnson",
    avatar: "https://picsum.photos/200/300",
    coverImage: "https://picsum.photos/800/200",
    bio: "Full-stack developer | Open source contributor | Building things with React, Node.js, and TypeScript",
    location: "San Francisco, CA",
    website: "https://github.com",
    joinDate: "January 2020",
    following: 892,
    followers: 1243,
    posts: [
        {
            id: 1,
            content: "Just launched my new portfolio website! Built with Next.js 14 and Tailwind CSS. Check it out!",
            image: "https://picsum.photos/700/300",
            likes: 124,
            comments: 18,
            shares: 5,
            timestamp: "2h ago"
        },
        {
            id: 2,
            content: "Excited to announce that I'm joining the team at @TechCorp as a Senior Frontend Developer! 🎉",
            likes: 243,
            comments: 32,
            shares: 12,
            timestamp: "2d ago"
        }
    ]
};

export default function ProfilePage() {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-background pb-16 lg:pb-0">
            {/* Header */}
            
            
            <header className="bg-card sticky top-0 z-10 border-b">
                
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push('/home')}
                            className="mr-2"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <Link href="/home" className="lg:hidden">
                        
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-semibold">{userData.name}</h1>
                            <p className="text-sm text-muted-foreground">
                                {userData.posts.length} posts
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <main>
                {/* Cover Image */}
                <div className="relative h-48 lg:h-64 w-full bg-muted">
                    <Image
                        src={userData.coverImage}
                        alt="Cover"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Profile Section */}
                <div className="container mx-auto px-4">
                    <div className="relative">
                        {/* Avatar */}
                        <div className="absolute -top-20 left-4 flex items-end gap-4">
                            <Avatar className="h-32 w-32 border-4 border-background">
                                <AvatarImage src={userData.avatar} alt={userData.name} />
                                <AvatarFallback>{userData.name[0]}</AvatarFallback>
                            </Avatar>
                        </div>

                        {/* Profile Actions */}
                        <div className="flex justify-end gap-2 py-4">
                            <Button variant="outline">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit profile
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <MoreHorizontal className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Globe className="mr-2 h-4 w-4" />
                                        Share profile
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Profile Info */}
                        <div className="mt-4 space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold">{userData.name}</h2>
                                <p className="text-muted-foreground">@{userData.username}</p>
                            </div>

                            <p className="text-base">{userData.bio}</p>

                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {userData.location}
                                </div>
                                <div className="flex items-center gap-1">
                                    <LinkIcon className="h-4 w-4" />
                                    <a href={userData.website} className="text-primary hover:underline">
                                        {userData.website.replace('https://', '')}
                                    </a>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    Joined {userData.joinDate}
                                </div>
                            </div>

                            <div className="flex gap-4 text-sm">
                                <Link href="#" className="hover:underline">
                                    <span className="font-semibold">{userData.following}</span>{" "}
                                    <span className="text-muted-foreground">Following</span>
                                </Link>
                                <Link href="#" className="hover:underline">
                                    <span className="font-semibold">{userData.followers}</span>{" "}
                                    <span className="text-muted-foreground">Followers</span>
                                </Link>
                            </div>
                        </div>

                        {/* Content Tabs */}
                        <Tabs defaultValue="posts" className="mt-6">
                            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                                <TabsTrigger
                                    value="posts"
                                    className="rounded-none border-b-2 border-transparent px-4 pb-2 pt-2 data-[state=active]:border-primary"
                                >
                                    Posts
                                </TabsTrigger>
                                <TabsTrigger
                                    value="replies"
                                    className="rounded-none border-b-2 border-transparent px-4 pb-2 pt-2 data-[state=active]:border-primary"
                                >
                                    Replies
                                </TabsTrigger>
                                <TabsTrigger
                                    value="media"
                                    className="rounded-none border-b-2 border-transparent px-4 pb-2 pt-2 data-[state=active]:border-primary"
                                >
                                    Media
                                </TabsTrigger>
                                <TabsTrigger
                                    value="likes"
                                    className="rounded-none border-b-2 border-transparent px-4 pb-2 pt-2 data-[state=active]:border-primary"
                                >
                                    Likes
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="posts" className="mt-6">
                                <div className="space-y-4">
                                    {userData.posts.map((post) => (
                                        <Card key={post.id}>
                                            <CardHeader className="flex flex-row items-start justify-between space-y-0 p-4">
                                                <div className="flex items-start gap-3">
                                                    <Avatar>
                                                        <AvatarImage src={userData.avatar} alt={userData.name} />
                                                        <AvatarFallback>{userData.name[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="flex items-center gap-1">
                                                            <span className="font-semibold">{userData.name}</span>
                                                            <span className="text-sm text-muted-foreground">
                                                                @{userData.username}
                                                            </span>
                                                            <span className="text-sm text-muted-foreground">·</span>
                                                            <span className="text-sm text-muted-foreground">
                                                                {post.timestamp}
                                                            </span>
                                                        </div>
                                                        <p className="mt-1">{post.content}</p>
                                                    </div>
                                                </div>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-5 w-5" />
                                                </Button>
                                            </CardHeader>
                                            {post.image && (
                                                <CardContent className="p-0">
                                                    <Image
                                                        src={post.image}
                                                        alt="Post attachment"
                                                        className="w-full"
                                                    />
                                                </CardContent>
                                            )}
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="replies">
                                <div className="flex items-center justify-center py-8 text-muted-foreground">
                                    No replies yet
                                </div>
                            </TabsContent>
                            <TabsContent value="media">
                                <div className="flex items-center justify-center py-8 text-muted-foreground">
                                    No media posts
                                </div>
                            </TabsContent>
                            <TabsContent value="likes">
                                <div className="flex items-center justify-center py-8 text-muted-foreground">
                                    No liked posts
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
        </div>
    );
}