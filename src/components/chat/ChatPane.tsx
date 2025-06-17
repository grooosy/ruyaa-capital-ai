
import React, { useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { useGuestChat } from '@/hooks/chat/useGuestChat';
import { useChatContext } from '@/context/ChatContext';
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
        clearAuthRequired,
        session
    } = useChat();
    const { selectedAgent } = useChatContext();
    const guestChat = useGuestChat(selectedAgent);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inGuestMode = !session;

    const scrollMessages = inGuestMode ? guestChat.messages : messages;
    const loadingState = inGuestMode ? guestChat.isLoading : isLoading;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [scrollMessages, loadingState]);

    if (authRequired) {
        return (
            <div className="w-full h-full bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                <Auth onSuccess={clearAuthRequired} />
                <Toaster />
            </div>
        );
    }
    const displayMessages = inGuestMode ? guestChat.messages : messages;
    const currentInput = inGuestMode ? guestChat.input : input;
    const handleChange = inGuestMode ? guestChat.handleInputChange : handleInputChange;
    const handleSubmitForm = inGuestMode ? guestChat.handleSubmit : handleSubmit;
    const sending = inGuestMode ? guestChat.isLoading : isLoading;

    return (
        <div className="w-full h-full bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <ChatHeader />

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {displayMessages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                ))}
                {sending && <LoadingBubble />}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <ChatInput
                input={currentInput}
                onInputChange={handleChange}
                onSubmit={handleSubmitForm}
                onVoiceRecording={handleVoiceRecording}
                onFileUpload={handleFileUpload}
                isLoading={sending}
            />

            <Toaster />
        </div>
    );
};

export default ChatPane;
