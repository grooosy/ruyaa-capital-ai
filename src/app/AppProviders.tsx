import { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ChatProvider } from "@/context/ChatContext";
import { WalletProvider } from "@/context/WalletProvider";

// Centralised wrapper for all global providers. Import once in App.tsx.

const queryClient = new QueryClient();

const AppProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ChatProvider>
          <WalletProvider>{children}</WalletProvider>
        </ChatProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
