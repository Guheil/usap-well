"use client";

import {
    Heart,
    MessageSquare,
    Repeat2,
    Share2,
    MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

export interface Post {
    id: number;
    user: {
        name: string;
        username: string;
        avatar: string;
    };
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
}

export function PostCard({ post }: { post: Post }) {
    return (
        <Card>
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
                    <div className="relative rounded-md overflow-hidden aspect-video">
                        <Image
                            src={post.image}
                            alt="Post attachment"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 700px"
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
    );
}