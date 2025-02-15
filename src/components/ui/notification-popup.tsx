"use client";

import { useState } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function NotificationPopup() {
    const [isOpen, setIsOpen] = useState(false);

    const notifications = [
        "New message from admin",
        "Job application approved",
        "Scheduled interview tomorrow",
        "System update completed",
    ];

    const friendRequests = [
        {
            name: "John Doe",
            profile: `https://picsum.photos/40?random=${Math.floor(Math.random() * 1000)}`,
        },
        {
            name: "Jane Smith",
            profile: `https://picsum.photos/40?random=${Math.floor(Math.random() * 1000)}`,
        },
    ];

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center">
                        12
                    </Badge>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
                <div className="flex justify-between items-center px-3 py-2 border-b">
                    <span className="font-medium text-sm">Notifications</span>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Friend Requests */}
                {friendRequests.length > 0 && (
                    <div className="border-b">
                        <span className="block px-3 py-1 text-xs text-muted-foreground">Friend Requests</span>
                        {friendRequests.map((friend, index) => (
                            <DropdownMenuItem key={index} className="py-2 px-3 flex items-center gap-3">
                                <Image
                                    src={friend.profile}
                                    alt={friend.name}
                                    width={32}
                                    height={32}
                                    className="rounded-full"
                                />
                                <span className="text-sm">{friend.name} sent you a request</span>
                            </DropdownMenuItem>
                        ))}
                    </div>
                )}

                {/* General Notifications */}
                <span className="block px-3 py-1 text-xs text-muted-foreground">Recent</span>
                {notifications.map((notif, index) => (
                    <DropdownMenuItem key={index} className="py-2 px-3">
                        {notif}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
