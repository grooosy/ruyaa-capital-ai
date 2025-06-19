import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type SubmitFn = (content: string) => Promise<boolean>;
export const useChatInput = (submitMessage: SubmitFn) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const clearInput = () => setInput('');

  const handleVoiceRecording = async () => {
    try {
      if (isRecording) {
        mediaRecorderRef.current?.stop();
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        setIsRecording(false);
        stream.getTracks().forEach(t => t.stop());
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setIsUploading(true);
        const filePath = `voice-${Date.now()}.webm`;
        const { error } = await supabase.storage
          .from('chat-uploads')
          .upload(filePath, blob, { contentType: 'audio/webm' });
        if (!error) {
          const { data } = supabase.storage
            .from('chat-uploads')
            .getPublicUrl(filePath);
          await submitMessage(data.publicUrl);
        } else {
          console.error('Audio upload error', error);
        }
        setIsUploading(false);
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Voice recording error', err);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const filePath = `upload-${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from('chat-uploads')
        .upload(filePath, file, { contentType: file.type });
      if (!error) {
        const { data } = supabase.storage
          .from('chat-uploads')
          .getPublicUrl(filePath);
        await submitMessage(data.publicUrl);
      } else {
        console.error('File upload error', error);
      }
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  return {
    input,
    setInput,
    handleInputChange,
    clearInput,
    handleVoiceRecording,
    handleFileUpload,
    isRecording,
    isUploading,
  };
};
