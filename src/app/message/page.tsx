"use client"

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ChevronLeft, Search, Circle, Phone, Video, MoreVertical, Paperclip, Image as ImageIcon, Smile, Link } from "lucide-react";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type User = {
    id: number;
    name: string;
    profile: string;
    online: boolean;
    lastSeen?: Date;
};

type Message = {
    id: number;
    sender: number;
    text: string;
    timestamp: Date;
    status: 'sent' | 'delivered' | 'read';
    attachments?: string[];
};

type Conversation = User & {
    lastMessage?: {
        text: string;
        timestamp: Date;
    };
    unreadCount: number;
};

export default function Messenger() {
    const router = useRouter();
    const [selectedChat, setSelectedChat] = useState<number | null>(null);
    const [messageInput, setMessageInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [conversations, setConversations] = useState<Conversation[]>([
        {
            id: 1,
            name: "John Doe",
            profile: "https://picsum.photos/700/700",
            online: true,
            lastMessage: { text: "Hey, how are you?", timestamp: new Date() },
            unreadCount: 2,
            lastSeen: new Date()
        },
        {
            id: 2,
            name: "Jane Smith",
            profile: "https://picsum.photos/700/700",
            online: false,
            lastMessage: { text: "Let's meet up tomorrow!", timestamp: new Date(Date.now() - 3600000) },
            unreadCount: 0,
            lastSeen: new Date(Date.now() - 7200000)
        }
    ]);

    const [messages, setMessages] = useState<Message[]>([
        { id: 1, sender: 1, text: "Hey, how are you?", timestamp: new Date(Date.now() - 3600000), status: 'read' },
        { id: 2, sender: 0, text: "I'm good! How about you?", timestamp: new Date(Date.now() - 3500000), status: 'delivered' },
        { id: 3, sender: 1, text: "Just working on some projects. Want to catch up later?", timestamp: new Date(Date.now() - 3400000), status: 'sent' }
    ]);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            const newMessage: Message = {
                id: messages.length + 1,
                sender: 0,
                text: messageInput,
                timestamp: new Date(),
                status: 'sent'
            };
            setMessages([...messages, newMessage]);
            setMessageInput("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatMessageTime = (date: Date) => {
        return format(date, 'HH:mm');
    };

    const formatLastSeen = (date: Date) => {
        return format(date, 'dd MMM, HH:mm');
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <Card className={`w-80 border-r ${selectedChat !== null ? "hidden lg:flex" : "flex"} flex-col`}>
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push('/home')}
                            className="mr-2"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <h2 className="text-xl font-bold">Messages</h2>
                        <Button variant="ghost" size="icon">
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="relative mb-4">
                        <Input
                            placeholder="Search conversations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                    </div>

                    <ScrollArea className="h-[calc(100vh-180px)]">
                        {conversations
                            .filter(chat => chat.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map(chat => (
                                <div
                                    key={chat.id}
                                    onClick={() => setSelectedChat(chat.id)}
                                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                    ${selectedChat === chat.id
                                            ? 'bg-primary/10 dark:bg-primary/20'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                                >
                                    <div className="relative">
                                        <Image
                                            src={chat.profile}
                                            alt={chat.name}
                                            width={48}
                                            height={48}
                                            className="rounded-full"
                                        />
                                        {chat.online && (
                                            <Circle className="w-3 h-3 text-green-500 absolute bottom-0 right-0 fill-green-500" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline">
                                            <p className="font-semibold truncate">{chat.name}</p>
                                            {chat.lastMessage && (
                                                <span className="text-xs text-gray-500">
                                                    {formatMessageTime(chat.lastMessage.timestamp)}
                                                </span>
                                            )}
                                        </div>
                                        {chat.lastMessage && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                                {chat.lastMessage.text}
                                            </p>
                                        )}
                                    </div>
                                    {chat.unreadCount > 0 && (
                                        <div className="bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">
                                            {chat.unreadCount}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </ScrollArea>
                </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className={`flex-1 flex flex-col ${selectedChat === null ? "hidden lg:flex" : "flex"}`}>
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <CardContent className="p-4 border-b flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSelectedChat(null)}>
                                    <ChevronLeft className="w-5 h-5" />
                                </Button>
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Image
                                            src={conversations.find(c => c.id === selectedChat)?.profile || ""}
                                            alt="Profile"
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                        {conversations.find(c => c.id === selectedChat)?.online && (
                                            <Circle className="w-3 h-3 text-green-500 absolute bottom-0 right-0 fill-green-500" />
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="font-semibold">
                                            {conversations.find(c => c.id === selectedChat)?.name}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {conversations.find(c => c.id === selectedChat)?.online
                                                ? "Online"
                                                : `Last seen ${formatLastSeen(conversations.find(c => c.id === selectedChat)?.lastSeen || new Date())}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon">
                                    <Phone className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <Video className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical className="w-5 h-5" />
                                </Button>
                            </div>
                        </CardContent>

                        {/* Messages Area */}
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                {messages.map((message, index) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === 0 ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`max-w-[70%] ${message.sender === 0 ? "order-1" : "order-2"}`}>
                                            <div
                                                className={`px-4 py-2 rounded-2xl ${message.sender === 0
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-gray-100 dark:bg-gray-800"
                                                    }`}
                                            >
                                                {message.text}
                                            </div>
                                            <div className={`text-xs text-gray-500 mt-1 flex items-center gap-1
                        ${message.sender === 0 ? "justify-end" : "justify-start"}`}>
                                                {formatMessageTime(message.timestamp)}
                                                {message.sender === 0 && (
                                                    <span className="text-blue-500">
                                                        {message.status === 'sent' && '✓'}
                                                        {message.status === 'delivered' && '✓✓'}
                                                        {message.status === 'read' && '✓✓'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </ScrollArea>

                        {/* Message Input Area */}
                        <div className="p-4 border-t">
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                    <Paperclip className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <ImageIcon className="w-5 h-5" />
                                </Button>
                                <Input
                                    placeholder="Type a message..."
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="flex-1"
                                />
                                <Button variant="ghost" size="icon">
                                    <Smile className="w-5 h-5" />
                                </Button>
                                <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                                    <Send className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <h3 className="text-xl font-semibold mb-2">Select a Conversation</h3>
                            <p className="text-gray-500">Choose a chat from the sidebar to start messaging</p>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
