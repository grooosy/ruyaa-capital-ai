import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import FuturisticBackground from '@/components/FuturisticBackground';

const SettingsPage = () => (
  <div className="relative min-h-screen bg-[#0D0D0D]">
    <FuturisticBackground />
    <ParticleBackground />
    <Navbar />
    <main className="pt-32 pb-20 w-full max-w-4xl mx-auto px-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <p>Manage your preferences here.</p>
    </main>
  </div>
);

export default SettingsPage;
