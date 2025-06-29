import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";

interface OptionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
  comingSoon?: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({
  icon: Icon,
  title,
  description,
  href,
  comingSoon,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    whileHover={{ scale: 1.02, y: -5 }}
    className="relative group"
  >
    <Card
      className={`bg-[#1a1a1a] border border-[#3f352e] hover:border-[#57493e] transition-all duration-300 h-full ${comingSoon ? "opacity-75" : ""}`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
            <Icon className="w-6 h-6 text-white" />
          </div>
          {comingSoon && (
            <span className="px-2 py-1 text-xs bg-gold/20 text-gold rounded-full border border-gold/30">
              Coming Soon
            </span>
          )}
        </div>
        <CardTitle className="text-white text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        {href ? (
          <a
            href={href}
            className={`inline-flex items-center justify-center w-full py-2 rounded-md bg-[#1f1b18] hover:bg-[#2a2623] text-white border border-[#3f352e] hover:border-[#57493e] transition-all duration-300 ${comingSoon ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {comingSoon ? "Coming Soon" : "Select"}
            {!comingSoon && <ArrowRight className="w-4 h-4 ml-2" />}
          </a>
        ) : (
          <Button
            className={`w-full bg-[#1f1b18] hover:bg-[#2a2623] text-white border border-[#3f352e] hover:border-[#57493e] transition-all duration-300 ${comingSoon ? "cursor-not-allowed opacity-50" : ""}`}
            disabled={comingSoon}
          >
            {comingSoon ? "Coming Soon" : "Select"}
            {!comingSoon && <ArrowRight className="w-4 h-4 ml-2" />}
          </Button>
        )}
      </CardContent>
    </Card>
    <div
      className="absolute inset-0 bg-black rounded-lg blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"
    />
  </motion.div>
);

export default OptionCard;
