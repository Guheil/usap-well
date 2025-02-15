"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    Bell,
    Search as SearchIcon,
    MessageCircle,
    Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const SearchNotificationsMessages = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("search");

    // Mock data
    const searchResults = {
        people: [
            { id: 1, name: "Alex Johnson", username: "alexj", avatar: "/api/placeholder/40/40", bio: "Full-stack developer | React & Node.js" },
            { id: 2, name: "Sarah Parker", username: "sparker", avatar: "/api/placeholder/40/40", bio: "UX Designer | Creative thinker" }
        ],
        posts: [
            { id: 1, content: "Just launched my new portfolio website! #webdev", user: "alexj", timestamp: "2h ago" },
            { id: 2, content: "Amazing conference about React 19! #reactjs", user: "techie", timestamp: "5h ago" }
        ]
    };

    const notifications = [
        { id: 1, type: "like", user: "Sarah Parker", action: "liked your post", timestamp: "2m ago", unread: true },
        { id: 2, type: "follow", user: "Mike Ross", action: "started following you", timestamp: "1h ago", unread: true },
        { id: 3, type: "mention", user: "Emily Chen", action: "mentioned you in a post", timestamp: "3h ago", unread: false }
    ];

    const messages = [
        {
            id: 1,
            user: "Alex Johnson",
            avatar: "/api/placeholder/40/40",
            lastMessage: "Hey, how's the new project coming along?",
            timestamp: "2m ago",
            unread: 2
        },
        {
            id: 2,
            user: "Sarah Parker",
            avatar: "/api/placeholder/40/40",
            lastMessage: "Thanks for the feedback on the design!",
            timestamp: "1h ago",
            unread: 0
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-10 bg-card border-b">
                <div className="container mx-auto px-4">
                    <div className="flex h-16 items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.back()}
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>

                        <Tabs
                            defaultValue={activeTab}
                            className="w-full"
                            onValueChange={setActiveTab}
                        >
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="search">
                                    <SearchIcon className="h-5 w-5" />
                                </TabsTrigger>
                                <TabsTrigger value="notifications">
                                    <Bell className="h-5 w-5" />
                                </TabsTrigger>
                                <TabsTrigger value="messages">
                                    <MessageCircle className="h-5 w-5" />
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6">
                <Tabs value={activeTab}>
                    <TabsContent value="search" className="mt-0">
                        <div className="flex gap-2 mb-6">
                            <div className="relative flex-1">
                                <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input className="pl-9" placeholder="Search people, posts, and tags..." />
                            </div>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="font-semibold mb-4">People</h2>
                                <div className="space-y-4">
                                    {searchResults.people.map(person => (
                                        <Card key={person.id}>
                                            <CardContent className="p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar>
                                                            <AvatarImage src={person.avatar} />
                                                            <AvatarFallback>{person.name[0]}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-semibold">{person.name}</p>
                                                            <p className="text-sm text-muted-foreground">@{person.username}</p>
                                                            <p className="text-sm mt-1">{person.bio}</p>
                                                        </div>
                                                    </div>
                                                    <Button>Follow</Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="font-semibold mb-4">Posts</h2>
                                <div className="space-y-4">
                                    {searchResults.posts.map(post => (
                                        <Card key={post.id}>
                                            <CardContent className="p-4">
                                                <p>{post.content}</p>
                                                <p className="text-sm text-muted-foreground mt-2">
                                                    @{post.user} · {post.timestamp}
                                                </p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="notifications" className="mt-0">
                        <div className="space-y-4">
                            {notifications.map(notification => (
                                <Card key={notification.id} className={notification.unread ? "bg-accent" : ""}>
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-3">
                                            <Avatar>
                                                <AvatarImage src="/api/placeholder/40/40" />
                                                <AvatarFallback>{notification.user[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <p>
                                                    <span className="font-semibold">{notification.user}</span>{" "}
                                                    {notification.action}
                                                </p>
                                                <p className="text-sm text-muted-foreground">{notification.timestamp}</p>
                                            </div>
                                            {notification.unread && (
                                                <Badge variant="secondary" className="rounded-full">New</Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="messages" className="mt-0">
                        <div className="space-y-4">
                            {messages.map(message => (
                                <Card key={message.id} className="cursor-pointer hover:bg-accent">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={message.avatar} />
                                                <AvatarFallback>{message.user[0]}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <p className="font-semibold">{message.user}</p>
                                                    <p className="text-sm text-muted-foreground">{message.timestamp}</p>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{message.lastMessage}</p>
                                            </div>
                                            {message.unread > 0 && (
                                                <Badge className="rounded-full">{message.unread}</Badge>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {activeTab === "messages" && (
                            <Link href="/message">
                            <Button
                                className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg"
                            >
                                <MessageCircle className="h-6 w-6" />
                            </Button>
                            </Link>
                        )}
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default SearchNotificationsMessages;