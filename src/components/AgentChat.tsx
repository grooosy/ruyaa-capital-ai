
import React, { useRef, useEffect } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import ChatMessage from './chat/ChatMessage';
import LoadingBubble from './chat/LoadingBubble';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AgentId } from '@/context/ChatContext';

interface AgentChatProps {
    agentId: AgentId;
}

const AgentChat: React.FC<AgentChatProps> = ({ agentId }) => {
    const { messages, input, isLoading, handleInputChange, handleSubmit, handleVoiceRecording, handleFileUpload } = useChat(agentId);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const triggerFileUpload = () => {
      fileInputRef.current?.click();
    };

    return (
        <div className="w-full h-[600px] bg-card/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
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
        </div>
    );
};

export default AgentChat;
