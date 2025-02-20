"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PostCard } from "@/components/ui/post-card";
import { CreatePost } from "@/components/ui/create-post";
import {
    Home, MessageCircle, Search, User, Settings, LogOut, PlusCircle,
    Menu, Settings2Icon, TrendingUp, Bookmark, Users, Calendar,
    Hash, Star, Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NotificationPopup from "@/components/ui/notification-popup";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
    Sheet, SheetContent, SheetTitle, SheetTrigger
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import SearchBar from "@/components/ui/search-bar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const initialPosts = [
    {
        id: 1,
        user: {
            name: "Alex Johnson",
            username: "alexj",
            avatar: "https://picsum.photos/900/800"
        },
        content: "Just finished building my new portfolio website using Next.js and Tailwind CSS. Check it out!",
        image: "https://picsum.photos/700/600",
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
            avatar: "https://picsum.photos/700/200"
        },
        content: "Beautiful day for hiking! 🏔️ #nature #outdoors",
        image: "https://picsum.photos/700/700",
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
            avatar: "https://picsum.photos/700/500"
        },
        content: "Working on a new project using React and TypeScript. Loving the type safety!",
        timestamp: "6h ago",
        likes: 18,
        comments: 4,
        shares: 1
    },
    {
        id: 4,
        user: {
            name: "Biancakes",
            username: "celebiii",
            avatar: "https://picsum.photos/800/500"
        },
        image: "https://picsum.photos/900/700",
        content: "WHERES MAH BF AT?",
        timestamp: "6h ago",
        likes: 128,
        comments: 12,
        shares: 6
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
const quickStats = [
    { label: "Posts", value: "2.4k", icon: Hash },
    { label: "Following", value: "1.2k", icon: Users },
    { label: "Engagement", value: "85%", icon: Activity }
];

const upcomingEvents = [
    { title: "Team Meeting", date: "Today, 2:00 PM", type: "work" },
    { title: "Project Deadline", date: "Tomorrow, 5:00 PM", type: "deadline" },
    { title: "Tech Conference", date: "Next Week", type: "event" }
];

export default function HomePage() {
    const router = useRouter();
    const [posts, setPosts] = useState(initialPosts);

    const [currentUser, setCurrentUser] = useState({
        name: "User",
        username: "user",
        avatar: "/api/placeholder/32/32"
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();

                if (!session) {
                    console.log("No active session found");
                    router.push("/home");
                    return;
                }

                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('full_name, email, avatar_url')
                    .eq('id', session.user.id)
                    .single();

                if (error) {
                    console.error("Error fetching profile:", error);
                    return;
                }

                if (profile) {
                    // Safely access email with fallback
                    const email = session.user?.email || 'user@example.com';
                    const username = email.split('@')[0];

                    setCurrentUser({
                        name: profile.full_name || username,
                        username: username,
                        avatar: profile.avatar_url || "/api/placeholder/32/32"
                    });
                }
            } catch (error) {
                console.error("Session error:", error);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        try {
            console.log("Logging out user...");

            localStorage.removeItem("authToken");
            localStorage.removeItem("userData");

            document.cookie.split(";").forEach(cookie => {
                const [name] = cookie.trim().split("=");
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            });

            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            router.push("/login");
        }
    };

    const handleCreatePost = (content: string, imageFile?: File) => {
        const newPost = {
            id: Date.now(),
            user: {
                name: "Current User",
                username: "currentuser",
                avatar: "/api/placeholder/40/40"
            },
            content,
            image: imageFile ? URL.createObjectURL(imageFile) : undefined,
            timestamp: "Just now",
            likes: 0,
            comments: 0,
            shares: 0
        };
        setPosts(prev => [newPost, ...prev]);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-16 lg:pb-0">
            {/* Header */}
            {/* Main Header */}
            <header className="bg-white dark:bg-zinc-900 sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center">
                        <div className="w-96 md:w-64 flex items-center gap-4">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="md:hidden">
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-64 bg-white dark:bg-zinc-900">
                                    <SheetTitle></SheetTitle>
                                    <div className="flex flex-col space-y-4 pt-4">
                                        <div className="px-4 py-2">
                                            <h2 className="text-lg font-semibold">Menu</h2>
                                        </div>
                                        <ScrollArea className="h-[calc(100vh-8rem)] px-2">
                                            <div className="space-y-2">
                                                <Link href="/profile" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                    <User className="h-5 w-5" />
                                                    <span>Profile</span>
                                                </Link>
                                                <Link href="/settings" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                                    <Settings className="h-5 w-5" />
                                                    <span>Settings</span>
                                                </Link>
                                                <button onClick={handleLogout} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 w-full text-left">
                                                    <LogOut className="h-5 w-5" />
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        </ScrollArea>
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <Link href="/home" className="font-bold text-xl text-zinc-900 dark:text-white">
                                Gael<span className="text-primary">.</span>
                            </Link>
                        </div>

                        {/* Desktop Search - hidden on mobile */}
                        <div className="hidden md:block flex-1">
                            <div className="max-w-lg mx-auto">
                                <SearchBar />
                            </div>
                        </div>

                        {/* Right section with fixed width */}
                        <div className="w-64 md:w-48 flex justify-end">
                            <nav className="flex items-center space-x-3">
                                <Link href="/home" className="hidden md:block">
                                    <Button variant="ghost" size="icon" className="text-zinc-700 dark:text-zinc-300">
                                        <Home className="h-5 w-5" />
                                    </Button>
                                </Link>

                                <NotificationPopup />
                                <Link href="/message">
                                    <Button variant="ghost" size="icon" className="relative">
                                        <MessageCircle className="h-5 w-5" />
                                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full text-[10px] text-white flex items-center justify-center">
                                            2
                                        </span>
                                    </Button>
                                </Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="relative">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src="/api/placeholder/32/32" />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <div className="flex items-center space-x-2 p-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={currentUser.avatar} />
                                                <AvatarFallback>{currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{currentUser.name}</span>
                                                <span className="text-xs text-zinc-500">@{currentUser.username}</span>
                                            </div>
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/profile" className="flex items-center">
                                                <User className="mr-2 h-4 w-4" />
                                                <span>Profile</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/settings" className="flex items-center">
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Settings</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Logout</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Search Container */}
            <div className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex justify-center">
                <div className="container mx-auto px-4 py-2 flex justify-center">
                    <div className="max-w-lg w-full">
                        <SearchBar />
                    </div>
                </div>
            </div>


            {/* Main Content */}
            <main className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Sidebar */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="space-y-6">
                            <Card className="bg-white dark:bg-zinc-900">
                                <CardHeader>
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src="/api/placeholder/48/48" />
                                            <AvatarFallback>U</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold">Current User</h3>
                                            <p className="text-sm text-zinc-500">@currentuser</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-3 gap-4 mt-4">
                                        {quickStats.map((stat, index) => (
                                            <div key={index} className="text-center">
                                                <stat.icon className="h-5 w-5 mx-auto mb-1 text-zinc-400" />
                                                <div className="font-semibold">{stat.value}</div>
                                                <div className="text-xs text-zinc-500">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                                <Separator />
                                <CardFooter className="flex justify-between py-4">
                                    <Link href="/profile">
                                        <Button variant="outline" size="sm" className="w-full">
                                            <User className="mr-2 h-4 w-4" />
                                            View Profile
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>

                            <Card className="bg-white dark:bg-zinc-900">
                                <CardHeader>
                                    <h3 className="font-semibold flex items-center">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        Upcoming Events
                                    </h3>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {upcomingEvents.map((event, index) => (
                                            <div key={index} className="flex items-start space-x-3">
                                                <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                                                <div>
                                                    <p className="font-medium">{event.title}</p>
                                                    <p className="text-sm text-zinc-500">{event.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </aside>

                    {/* Main Feed */}
                    <div className="lg:col-span-6 space-y-6">
                        <CreatePost onCreatePost={handleCreatePost} />

                        <Card className="bg-white dark:bg-zinc-900 p-4">
                            <div className="flex space-x-4 overflow-x-auto pb-2">
                                <Badge variant="outline" className="rounded-full px-4 py-1 whitespace-nowrap">
                                    All Posts
                                </Badge>
                                <Badge variant="secondary" className="rounded-full px-4 py-1 whitespace-nowrap">
                                    Popular
                                </Badge>
                                <Badge variant="secondary" className="rounded-full px-4 py-1 whitespace-nowrap">
                                    Following
                                </Badge>
                                <Badge variant="secondary" className="rounded-full px-4 py-1 whitespace-nowrap">
                                    Latest
                                </Badge>
                            </div>
                        </Card>

                        <div className="space-y-6">
                            {posts.map(post => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <aside className="hidden lg:block lg:col-span-3">
                        <div className="space-y-6">
                            <Card className="bg-white dark:bg-zinc-900">
                                <CardHeader>
                                    <h3 className="font-semibold flex items-center">
                                        <Star className="mr-2 h-4 w-4" />
                                        Suggested for you
                                    </h3>
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
                                                    <p className="text-xs text-zinc-500">@{suggestion.username}</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm">Follow</Button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card className="bg-white dark:bg-zinc-900">
                                <CardHeader>
                                    <h3 className="font-semibold flex items-center">
                                        <TrendingUp className="mr-2 h-4 w-4" />
                                        Trending Topics
                                    </h3>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {trendingTopics.map((topic, index) => (
                                            <div key={index}>
                                                <Link href="#" className="block hover:bg-zinc-100 dark:hover:bg-zinc-800 -mx-2 p-2 rounded-lg">
                                                    <p className="font-medium text-primary">{topic.topic}</p>
                                                    <p className="text-xs text-zinc-500">{topic.posts} posts</p>
                                                </Link>
                                                {index < trendingTopics.length - 1 && (
                                                    <Separator className="my-2" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="bg-white dark:bg-zinc-900">
                                <CardHeader>
                                    <h3 className="font-semibold flex items-center">
                                        <Bookmark className="mr-2 h-4 w-4" />
                                        Saved Posts
                                    </h3>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="text-sm text-zinc-500">
                                            You have not saved any posts yet. Save posts to read them later.
                                        </div>
                                        <Button variant="outline" className="w-full">
                                            Browse Popular Posts
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Mobile Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 lg:hidden">
                <div className="grid grid-cols-5 h-16">
                    <Link href="/home" className="flex flex-col items-center justify-center text-primary hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <Home className="h-5 w-5" />
                        <span className="text-xs mt-1">Home</span>
                    </Link>

                    <Link href="/search" className="flex flex-col items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <Search className="h-5 w-5" />
                        <span className="text-xs mt-1">Search</span>
                    </Link>

                    <Link href="#" className="flex flex-col items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                        <PlusCircle className="h-5 w-5" />
                        <span className="text-xs mt-1">Create</span>
                    </Link>

                    <Link href="/search-and-notif" className="flex flex-col items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 relative">
                        <Settings2Icon className="h-5 w-5" />
                        <span className="text-xs mt-1">Control</span>
                        <span className="absolute top-2 right-4 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                            3
                        </span>
                    </Link>

                    <Link href="/message" className="flex flex-col items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 relative">
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-xs mt-1">Messages</span>
                        <span className="absolute top-2 right-4 bg-primary text-white text-xs rounded-full px-1.5 py-0.5">
                            2
                        </span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}