
import { useState } from 'react';

export const useChatInput = () => {
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const clearInput = () => setInput('');

  const handleVoiceRecording = () => {
    console.log("Voice recording initiated.");
    alert("Voice recording is not yet implemented.");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log("File selected:", file.name);
      alert(`File "${file.name}" attached (upload functionality not implemented).`);
    }
  };

  return {
    input,
    handleInputChange,
    clearInput,
    handleVoiceRecording,
    handleFileUpload,
  };
};
