
import React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { type Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";

import { formatDistanceToNow } from "date-fns";

interface SessionsCardProps {
  sessions: Tables<"arbitrage_sessions">[] | null | undefined;
  onStartNow: () => void;
}

const getStatusClass = (status: string | null) => {
  switch (status) {
    case "active":
      return "bg-green-500/15 text-green-300 border border-green-400";
    case "pending":
      return "bg-black/40 text-white border border-gray-600";
    case "closed":
      return "bg-red-500/10 text-red-300 border border-red-400";
    default:
      return "bg-gray-800/25 text-white border border-gray-600";
  }
};

const SessionsCard: React.FC<SessionsCardProps> = ({ sessions, onStartNow }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, boxShadow: "0 0 20px rgba(255,255,255,0.15)" }}
      transition={{ type: "spring", stiffness: 50 }}
      className="relative bg-[#1A1A1A] backdrop-blur-sm rounded-xl p-6 overflow-hidden focus-within:ring-2 focus-within:ring-green-400 outline-none group before:absolute before:inset-0 before:rounded-xl before:pointer-events-none before:bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.1),transparent)]"
      tabIndex={0}
      aria-label="Arbitrage sessions"
    >
      <div className="absolute inset-0 bg-black/40 blur-xl -z-10" aria-hidden />
      <div className="flex items-center mb-4 gap-2">
        <ArrowUp className="w-6 h-6 text-green-400" strokeWidth={2.2} />
        <h3 className="text-xl font-bold text-white tracking-tight">Arbitrage Sessions</h3>
      </div>
      {sessions && sessions.length > 0 ? (
        <div className="space-y-4">
          {sessions.slice(0, 3).map((session) => (
            <div
              key={session.id}
              className={`flex justify-between items-center px-3 py-2 rounded-lg ${getStatusClass(session.status)} shadow-sm`}
            >
              <div>
                <p className="font-semibold text-white">
                  ${session.amount_usd} <span className="ml-1 text-xs text-green-300/80">({session.duration_days}d)</span>
                </p>
                <p className="text-sm text-green-100/70">
                  Mode: {session.mode}&nbsp;|&nbsp;
                  {session.created_at ? (
                    <>Started {formatDistanceToNow(new Date(session.created_at), { addSuffix: true })}</>
                  ) : null}
                </p>
              </div>
              <span className="ml-2 rounded-full px-3 py-1 font-semibold text-xs text-green-100 bg-green-500/15 border border-green-400">{session.status?.toUpperCase()}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[110px] gap-4">
          <p className="text-green-100 text-base">No active arbitrage.</p>
          <Button
            onClick={onStartNow}
            className="rounded-full px-7 py-3 font-semibold text-base"
            tabIndex={0}
          >
            Start Now<span className="ml-2"><ArrowUp className="w-4 h-4" /></span>
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default SessionsCard;
