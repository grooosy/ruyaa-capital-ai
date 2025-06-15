
import React from "react";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import AuthCard from "@/components/AuthCard";

const AuthPage = () => (
  <div className="relative min-h-screen bg-[#0A0A0A] font-spacegrotesk">
    <ParticleBackground />
    <Navbar />
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <AuthCard />
    </div>
  </div>
);

export default AuthPage;
