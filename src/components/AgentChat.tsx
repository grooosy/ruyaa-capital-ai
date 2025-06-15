
import React, { useRef, useEffect } from 'react';
import { Bot, User } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import Linkify from 'linkify-react';
import { cn } from '@/lib/utils';
import LoadingBubble from './chat/LoadingBubble';
import ChatInput from './chat/ChatInput';
import { ScrollArea } from "@/components/ui/scroll-area";
import { AgentId } from '@/context/ChatContext';
import { Auth } from './Auth';
import { Toaster } from './ui/toaster';

interface AgentChatProps {
    agentId: AgentId;
}

const AgentChat: React.FC<AgentChatProps> = ({ agentId }) => {
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
    } = useChat(agentId);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const linkifyOptions = (isUser: boolean) => ({
        target: '_blank',
        rel: 'noopener noreferrer',
        className: isUser ? 'underline' : 'text-gold underline hover:text-gold/80',
    });

    if (authRequired) {
        return (
            <div className="w-full h-[600px] bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col items-center justify-center overflow-hidden">
                <Auth onSuccess={clearAuthRequired} />
                <Toaster />
            </div>
        )
    }

    return (
        <div className="w-full h-[600px] bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {messages.map((message) => {
                    const isUser = message.role === 'user';
                    return (
                        <div
                          key={message.id}
                          className={cn(
                            'flex items-start gap-3',
                            isUser ? 'justify-end' : 'justify-start'
                          )}
                        >
                          {!isUser && (
                            <div className="w-8 h-8 rounded-full bg-primary-accent/20 flex items-center justify-center shrink-0">
                              <Bot className="w-5 h-5 text-primary-accent" />
                            </div>
                          )}
                          <div
                            className={cn(
                              'p-3 rounded-xl max-w-lg break-words whitespace-pre-wrap',
                              isUser
                                ? 'bg-gold/90 text-dark-charcoal rounded-br-none'
                                : 'bg-card text-white rounded-bl-none'
                            )}
                          >
                            <Linkify options={linkifyOptions(isUser)}>{message.content}</Linkify>
                          </div>
                          {isUser && (
                            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                              <User className="w-5 h-5 text-gold" />
                            </div>
                          )}
                        </div>
                    );
                })}
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

export default AgentChat;
