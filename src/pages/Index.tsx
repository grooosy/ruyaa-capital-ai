
import React from "react";
import Navbar from "@/components/Navbar";
import VariableDeposit from "@/components/VariableDeposit";
import LogoCloud from "@/components/LogoCloud";
import PathModal from "@/components/PathModal";
import AIGrid from "@/components/AIGrid";

const Index = () => {
  const [deposit, setDeposit] = React.useState(3000);
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen bg-bg">
      <Navbar />
      <main className="pt-36 pb-20 flex flex-col items-center justify-center w-full">
        <section className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
          <h1
            className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            style={{ letterSpacing: "-0.04em" }}
          >
            Open a Verified <span className="text-green">MT4 / MT5</span> or{" "}
            <span className="text-gold">Crypto</span> Account in 1 Minute.
          </h1>
          <p className="text-xl max-w-xl mx-auto text-gray-300 mb-7">
            Trade on your own terms — Ruyaa AI scales with your deposit.
          </p>
          <button
            id="open-path-modal"
            onClick={() => setModalOpen(true)}
            className="mt-7 bg-green text-[#181711] px-8 py-3 rounded-xl text-lg font-bold shadow-green hover:scale-105 transition-all duration-200 tracking-wider"
          >
            Open Account Now
          </button>
          <div className="mt-10 w-full">
            <VariableDeposit deposit={deposit} setDeposit={setDeposit} />
          </div>
        </section>
        <LogoCloud />
        {/* Replace how-it-works section with AIGrid */}
        <section className="w-full max-w-5xl mx-auto mt-24 flex flex-col items-center">
          <AIGrid />
        </section>
      </main>
      {/* Path Modal overlay */}
      <PathModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Index;
