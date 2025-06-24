
import React from 'react';
import { Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const LoadingBubble = () => (
    <div className="flex items-start gap-3 justify-start animate-fade-in">
        <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-gold text-primary-foreground">
                <Bot className="w-4 h-4" />
            </AvatarFallback>
        </Avatar>
        <div className="bg-white/10 rounded-xl p-3 flex items-center space-x-1 shadow-md">
            <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse [animation-delay:-0.3s]" />
            <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse [animation-delay:-0.15s]" />
            <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse" />
        </div>
    </div>
);

export default LoadingBubble;
