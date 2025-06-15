
import React, { useRef, useEffect } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import ChatMessage from './ChatMessage';
import LoadingBubble from './LoadingBubble';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Auth } from '../Auth';
import { Toaster } from '../ui/toaster';

const ChatPane = () => {
    const { messages, input, isLoading, handleInputChange, handleSubmit, handleVoiceRecording, handleFileUpload, authRequired, clearAuthRequired } = useChat();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const triggerFileUpload = () => {
      fileInputRef.current?.click();
    };

    if (authRequired) {
        return (
            <div className="w-full h-full bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                <Auth onSuccess={clearAuthRequired} />
                <Toaster />
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center gap-3 shrink-0">
                <div className="relative">
                  <Avatar>
                      <AvatarFallback className="bg-gold text-dark-charcoal font-bold">AI</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green ring-2 ring-card" />
                </div>
                <div>
                    <h3 className="font-bold text-white">AI Assistant</h3>
                    <p className="text-xs text-green">Online</p>
                </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && <LoadingBubble />}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t border-white/10 shrink-0 bg-card/50">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                    <Input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ask anything..."
                        className="flex-1 bg-transparent border-white/20 focus-visible:ring-gold"
                        disabled={isLoading}
                        autoComplete="off"
                    />
                     <Tooltip>
                      <TooltipTrigger asChild>
                        <Button type="submit" size="icon" className="bg-gold hover:bg-gold/90 shrink-0" disabled={isLoading || !input.trim()}>
                            <Send className="w-4 h-4 text-dark-charcoal" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Send Message</p></TooltipContent>
                    </Tooltip>
                </form>
                <div className="flex items-center justify-end gap-1 mt-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={handleVoiceRecording} disabled={isLoading}>
                            <Mic className="w-4 h-4 text-gray-400 hover:text-white" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Record Voice (coming soon)</p></TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={triggerFileUpload} disabled={isLoading}>
                            <Paperclip className="w-4 h-4 text-gray-400 hover:text-white" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Attach File</p></TooltipContent>
                    </Tooltip>
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*, .pdf, .doc, .docx" />
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default ChatPane;
