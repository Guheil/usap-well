import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchBar = () => {
    return (
        <div className="relative w-full max-w-md">
            <div className="relative">
                <Input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-4 pr-10 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-100/50 dark:bg-zinc-800/50 focus:bg-white dark:focus:bg-zinc-900"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-500" />
            </div>
        </div>
    );
};

export default SearchBar;