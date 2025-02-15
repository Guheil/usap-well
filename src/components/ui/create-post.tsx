"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";

export function CreatePost({ onCreatePost }: {
    onCreatePost: (content: string, image?: File) => void
}) {
    const [content, setContent] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please upload an image file");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("File size should be less than 5MB");
            return;
        }

        setSelectedImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const removeImage = () => {
        setSelectedImage(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = () => {
        if (!content.trim() && !selectedImage) return;

        onCreatePost(content.trim(), selectedImage || undefined);
        setContent("");
        removeImage();
    };

    return (
        <Card className="mb-6">
            <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                    <Avatar>
                        <AvatarImage src="/api/placeholder/40/40" alt="Your profile" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-4">
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What's on your mind?"
                            rows={3}
                            className="resize-none min-h-[100px]"
                        />

                        {preview && (
                            <div className="relative rounded-md overflow-hidden aspect-video border">
                                <Image
                                    src={preview}
                                    alt="Selected image"
                                    fill
                                    className="object-cover"
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                                    onClick={removeImage}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}

                        <div className="flex justify-between items-center">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                accept="image/*"
                                hidden
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <ImagePlus className="h-4 w-4 mr-2" />
                                Add Image
                            </Button>

                            <Button onClick={handleSubmit} disabled={!content.trim() && !selectedImage}>
                                Post
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}