
import React, { useRef } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatInputProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onVoiceRecording: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  input,
  onInputChange,
  onSubmit,
  onVoiceRecording,
  onFileUpload,
  isLoading,
  placeholder = "Ask anything..."
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 border-t border-white/10 shrink-0 bg-card/50">
      <form onSubmit={onSubmit} className="flex items-center gap-2">
        <Input
          type="text"
          value={input}
          onChange={onInputChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent border-white/20 focus-visible:ring-gold"
          disabled={isLoading}
          autoComplete="off"
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              type="submit" 
              size="icon" 
              className="bg-gold hover:bg-gold/90 shrink-0" 
              disabled={isLoading || !input.trim()}
            >
              <Send className="w-4 h-4 text-dark-charcoal" />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>Send Message</p></TooltipContent>
        </Tooltip>
      </form>
      
      <div className="flex items-center justify-end gap-1 mt-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onVoiceRecording} 
              disabled={isLoading}
            >
              <Mic className="w-4 h-4 text-gray-400 hover:text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>Record Voice (coming soon)</p></TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={triggerFileUpload} 
              disabled={isLoading}
            >
              <Paperclip className="w-4 h-4 text-gray-400 hover:text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent><p>Attach File</p></TooltipContent>
        </Tooltip>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={onFileUpload} 
          className="hidden" 
          accept="image/*, .pdf, .doc, .docx" 
        />
      </div>
    </div>
  );
};

export default ChatInput;
