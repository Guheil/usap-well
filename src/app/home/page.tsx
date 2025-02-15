"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Bell,
    Home,
    MessageCircle,
    Search,
    User,
    Settings,
    LogOut,
    PlusCircle,
    Heart,
    MessageSquare,
    Repeat2,
    Share2,
    MoreHorizontal,
    Menu
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock data for posts
const posts = [
    {
        id: 1,
        user: {
            name: "Alex Johnson",
            username: "alexj",
            avatar: "/api/placeholder/50/50"
        },
        content: "Just finished building my new portfolio website using Next.js and Tailwind CSS. Check it out!",
        image: "/api/placeholder/600/400",
        timestamp: "2h ago",
        likes: 24,
        comments: 3,
        shares: 2
    },
    {
        id: 2,
        user: {
            name: "Sam Rivera",
            username: "samr",
            avatar: "/api/placeholder/50/50"
        },
        content: "Beautiful day for hiking! 🏔️ #nature #outdoors",
        image: "/api/placeholder/600/400",
        timestamp: "4h ago",
        likes: 56,
        comments: 8,
        shares: 5
    },
    {
        id: 3,
        user: {
            name: "Jordan Lee",
            username: "jlee",
            avatar: "/api/placeholder/50/50"
        },
        content: "Working on a new project using React and TypeScript. Loving the type safety!",
        timestamp: "6h ago",
        likes: 18,
        comments: 4,
        shares: 1
    }
];

// Mock data for suggestions
const suggestions = [
    { name: "Taylor Smith", username: "tsmith", avatar: "/api/placeholder/40/40" },
    { name: "Jamie Rodriguez", username: "jrod", avatar: "/api/placeholder/40/40" },
    { name: "Casey Wilson", username: "cwilson", avatar: "/api/placeholder/40/40" }
];

// Mock data for trending topics
const trendingTopics = [
    { topic: "#WebDevelopment", posts: "12.4k" },
    { topic: "#ReactJS", posts: "8.2k" },
    { topic: "#TailwindCSS", posts: "6.7k" },
    { topic: "#NextJS", posts: "5.3k" }
];

export default function HomePage() {
    const router = useRouter();

    const handleLogout = () => {
        console.log("Logging out...");
        router.push("/login");
    };

    return (
        <div className="min-h-screen bg-background pb-16 lg:pb-0">
            {/* Header/Navigation */}
            <header className="bg-card sticky top-0 z-10 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="md:hidden">
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-64">
                                    <div className="flex flex-col space-y-4 pt-4">
                                        <Link href="/profile" className="flex items-center space-x-3 p-2">
                                            <User className="h-5 w-5" />
                                            <span>Profile</span>
                                        </Link>
                                        <Link href="/settings" className="flex items-center space-x-3 p-2">
                                            <Settings className="h-5 w-5" />
                                            <span>Settings</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-3 p-2 w-full text-left"
                                        >
                                            <LogOut className="h-5 w-5" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <Link href="/home" className="font-bold text-xl text-primary">
                                Gael.
                            </Link>
                        </div>

                        <nav className="hidden md:flex items-center space-x-4">
                            <Link href="/home">
                                <Button variant="ghost" size="icon" className="text-primary">
                                    <Home className="h-5 w-5" />
                                </Button>
                            </Link>
                            <Button variant="ghost" size="icon">
                                <Search className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <MessageCircle className="h-5 w-5" />
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile">Profile</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/settings">Settings</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout}>
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Sidebar - Desktop Only */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <Card className="sticky top-20">
                            <CardContent className="p-4">
                                <nav className="space-y-2">
                                    <Link
                                        href="/profile"
                                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent"
                                    >
                                        <User className="h-5 w-5 text-muted-foreground" />
                                        <span>Profile</span>
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent"
                                    >
                                        <Settings className="h-5 w-5 text-muted-foreground" />
                                        <span>Settings</span>
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent w-full text-left"
                                    >
                                        <LogOut className="h-5 w-5 text-muted-foreground" />
                                        <span>Logout</span>
                                    </button>
                                </nav>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* Main Feed */}
                    <div className="lg:col-span-6">
                        {/* Create Post */}
                        <Card className="mb-6">
                            <CardContent className="p-4">
                                <div className="flex items-start space-x-3">
                                    <Avatar>
                                        <AvatarImage src="/api/placeholder/40/40" alt="Your profile" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <Textarea
                                            className="resize-none"
                                            placeholder="What's on your mind?"
                                            rows={2}
                                        />
                                        <div className="flex justify-end mt-3">
                                            <Button>
                                                Post
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Posts Feed */}
                        <div className="space-y-6">
                            {posts.map(post => (
                                <Card key={post.id}>
                                    <CardHeader className="px-4 pt-4 pb-0">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Avatar>
                                                    <AvatarImage src={post.user.avatar} alt={post.user.name} />
                                                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">{post.user.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        @{post.user.username} · {post.timestamp}
                                                    </p>
                                                </div>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>Save</DropdownMenuItem>
                                                    <DropdownMenuItem>Report</DropdownMenuItem>
                                                    <DropdownMenuItem>Hide</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="px-4 pt-2">
                                        <p className="mb-3">{post.content}</p>
                                        {post.image && (
                                            <div className="relative rounded-md overflow-hidden">
                                                <img
                                                    src={post.image}
                                                    alt="Post attachment"
                                                    className="w-full h-auto"
                                                />
                                            </div>
                                        )}
                                    </CardContent>

                                    <CardFooter className="px-4 pb-4 pt-0">
                                        <div className="flex justify-between w-full">
                                            <Button variant="ghost" size="sm" className="space-x-1">
                                                <Heart className="h-4 w-4" />
                                                <span>{post.likes}</span>
                                            </Button>
                                            <Button variant="ghost" size="sm" className="space-x-1">
                                                <MessageSquare className="h-4 w-4" />
                                                <span>{post.comments}</span>
                                            </Button>
                                            <Button variant="ghost" size="sm" className="space-x-1">
                                                <Repeat2 className="h-4 w-4" />
                                                <span>{post.shares}</span>
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Share2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar - Desktop Only */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <h2 className="font-semibold text-lg">Suggested for you</h2>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {suggestions.map((suggestion, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Avatar>
                                                    <AvatarImage src={suggestion.avatar} alt={suggestion.name} />
                                                    <AvatarFallback>{suggestion.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-sm">{suggestion.name}</p>
                                                    <p className="text-xs text-muted-foreground">@{suggestion.username}</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">Follow</Button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <h2 className="font-semibold text-lg">Trending</h2>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {trendingTopics.map((topic, index) => (
                                        <div key={index}>
                                            <Link href="#" className="block hover:bg-accent -m-2 p-2 rounded-md">
                                                <p className="font-medium text-primary">{topic.topic}</p>
                                                <p className="text-xs text-muted-foreground">{topic.posts} posts</p>
                                            </Link>
                                            {index < trendingTopics.length - 1 && (
                                                <Separator className="my-2" />
                                            )}
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Mobile Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-background border-t lg:hidden">
                <div className="grid grid-cols-5 h-16">
                    <Link href="/home" className="flex items-center justify-center text-primary">
                        <Home className="h-6 w-6" />
                    </Link>
                    <Button variant="ghost" className="h-full rounded-none flex items-center justify-center">
                        <Search className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" className="h-full rounded-none flex items-center justify-center">
                        <PlusCircle className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" className="h-full rounded-none flex items-center justify-center">
                        <Bell className="h-6 w-6" />
                    </Button>
                    <Link href="/profile" className="flex items-center justify-center">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/api/placeholder/50/50" alt="Profile" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </Link>
                </div>
            </nav>
        </div>
    );
}