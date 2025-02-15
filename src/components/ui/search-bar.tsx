"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState("");

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(!showSearch)}
            >
                {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>

            {showSearch && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-md rounded-md p-2">
                    <Input
                        type="text"
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full"
                    />
                </div>
            )}
        </div>
    );
}
