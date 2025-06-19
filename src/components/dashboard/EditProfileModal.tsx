
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: { full_name: string | null; avatar_url: string | null } | null | undefined;
  email: string | undefined;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ open, onOpenChange, profile, email }) => {
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [username, setUsername] = useState(email || "");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSaveProfile = async () => {
    setSaving(true);
    const { error } = await supabase.from("profiles").update({ full_name: fullName }).eq("id", (await supabase.auth.getUser()).data.user?.id);
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated", description: "Your name was updated!" });
      onOpenChange(false); // Close on success
    }
  };

  const handleChangePassword = async () => {
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password changed", description: "Your password was updated!" });
      setPassword("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#1a1a1a]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Change your profile details below.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <Input value={fullName} onChange={e => setFullName(e.target.value)} disabled={saving} />
          </div>
          <div>
            <label className="block mb-1 font-medium">Username/Email</label>
            <Input value={username} disabled className="opacity-60 cursor-not-allowed" />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSaveProfile}
            disabled={saving}
            className="w-full bg-gray-800 border border-gray-600 text-white hover:bg-gray-700"
          >
            Save Profile
          </Button>
        </DialogFooter>
        <div className="mt-4 pt-4 border-t border-gray-600">
          <label className="block mb-2 font-medium">Change Password</label>
          <Input
            value={password}
            type="password"
            minLength={6}
            onChange={e => setPassword(e.target.value)}
            placeholder="New password"
            disabled={saving}
          />
          <Button
            onClick={handleChangePassword}
            disabled={saving || !password}
            className="w-full mt-2 bg-gray-800 border border-gray-600 text-white hover:bg-gray-700"
          >
            Change Password
          </Button>
        </div>
        <DialogClose asChild>
          <Button variant="outline" className="absolute top-3 right-3" size="icon" aria-label="Close">×</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
