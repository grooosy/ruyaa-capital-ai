
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { type Tables } from "@/integrations/supabase/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import EditProfileModal from "./EditProfileModal";

interface ProfileCardProps {
  profile: Tables<"profiles"> | null | undefined;
  email: string | undefined;
  onEdit?: () => void;
}

const getInitials = (name: string | null | undefined) =>
  !name
    ? "U"
    : name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("");

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, email }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: "0 0 28px #00FF9D99" }}
      transition={{ type: "spring", stiffness: 50, damping: 16 }}
      className="relative bg-[#1A1A1A] backdrop-blur-sm rounded-xl p-6 overflow-hidden focus-within:ring-2 focus-within:ring-green-400 outline-none group"
      tabIndex={0}
      aria-label="Profile information"
    >
      <div className="absolute inset-0 bg-green-500/10 blur-2xl -z-10 transition-all duration-300 group-hover:blur-xl" aria-hidden />
      <div className="absolute top-4 left-4 text-green-400 drop-shadow-[0_0_10px_#00FF9D]">
        <User strokeWidth={2.2} className="w-6 h-6" />
      </div>
      <div className="flex items-center gap-5 mt-2 mb-6">
        <div className="flex-shrink-0">
          <Avatar className="h-16 w-16 ring-2 ring-green-400 shadow-green-glow transition-shadow animate-pulse-slow">
            <AvatarImage src={profile?.avatar_url ?? undefined} alt={profile?.full_name ?? "User"} />
            <AvatarFallback className="bg-gray-800 text-white font-bold">{getInitials(profile?.full_name)}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="text-xl font-bold text-white">{profile?.full_name || "No Name"}</div>
          <div className="text-sm text-green-200">{email}</div>
        </div>
      </div>
      <Button
        variant="ghost"
        onClick={() => setModalOpen(true)}
        className="px-6 py-2 rounded-full border border-green-400 text-green-300 hover:bg-green-500/10 hover:text-white focus-visible:ring-2 focus-visible:ring-green-400 transition-all font-semibold text-base shadow-green-glow"
        tabIndex={0}
      >
        Edit Profile
      </Button>
      <EditProfileModal open={modalOpen} onOpenChange={setModalOpen} profile={profile} email={email} />
    </motion.div>
  );
};
export default ProfileCard;
