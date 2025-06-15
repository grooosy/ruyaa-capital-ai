
import React from "react";
import Navbar from "@/components/Navbar";
import VariableDeposit from "@/components/VariableDeposit";
import LogoCloud from "@/components/LogoCloud";

const Index = () => {
  const [deposit, setDeposit] = React.useState(3000);
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen bg-bg">
      <Navbar />
      <main className="pt-36 pb-20 flex flex-col items-center justify-center w-full">
        <section className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight" style={{ letterSpacing: "-0.04em" }}>
            Open a Verified <span className="text-green">MT4 / MT5</span> or <span className="text-gold">Crypto Account</span> in 1 Minute.
          </h1>
          <p className="text-xl max-w-xl mx-auto text-gray-300 mb-7">
            Trade on your own terms — Ruyaa AI scales with your deposit.
          </p>
          <div id="deposit">
            <VariableDeposit deposit={deposit} setDeposit={setDeposit} />
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-7 bg-green text-[#181711] px-8 py-3 rounded-xl text-lg font-bold shadow-green hover:scale-105 transition-all duration-200 tracking-wider"
          >
            Open Account Now
          </button>
        </section>
        <LogoCloud />
      </main>
      {/* Path Modal stub, conditional render */}
      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-md bg-[#0f0e0bcc] animate-fade-in">
          {/* PathModal will be implemented here */}
          <div className="bg-card rounded-2xl p-10 min-w-[340px] shadow-green">
            <p className="text-xl text-center text-green mb-2 font-semibold">Modal coming soon!</p>
            <button
              className="mt-5 px-4 py-2 bg-gold text-[#181711] rounded-xl font-semibold hover:bg-yellow-400"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
