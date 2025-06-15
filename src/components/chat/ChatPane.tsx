
import React, { useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import ChatMessage from './ChatMessage';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import LoadingBubble from './LoadingBubble';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Auth } from '../Auth';
import { Toaster } from '../ui/toaster';

const ChatPane = () => {
    const { 
        messages, 
        input, 
        isLoading, 
        handleInputChange, 
        handleSubmit, 
        handleVoiceRecording, 
        handleFileUpload, 
        authRequired, 
        clearAuthRequired 
    } = useChat();
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

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
            <ChatHeader />

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && <LoadingBubble />}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <ChatInput
                input={input}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                onVoiceRecording={handleVoiceRecording}
                onFileUpload={handleFileUpload}
                isLoading={isLoading}
            />
            
            <Toaster />
        </div>
    );
};

export default ChatPane;
