import React from "react";

const TIERS = [
  { min: 100, max: 999, label: "Starter", color: "bg-green", badge: "#16C784" },
  { min: 1000, max: 4999, label: "Pro", color: "bg-gold", badge: "#E6C419" },
  { min: 5000, max: 10000, label: "Elite", color: "bg-purple-500", badge: "#8B5CF6" },
];

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(v, min));

const VariableDeposit: React.FC<{
  deposit: number;
  setDeposit: (v: number) => void;
}> = ({ deposit, setDeposit }) => {
  const tier = TIERS.find(t => deposit >= t.min && deposit <= t.max) || TIERS[0];
  return (
    <div className="bg-card px-6 py-5 rounded-2xl w-full max-w-md mx-auto flex flex-col items-center gap-4 border border-[#26241c] shadow-green">
      <div className="flex justify-between w-full mb-2 text-sm text-muted-foreground">
        <span>Min $100</span>
        <span>Max $10,000</span>
      </div>
      <input
        type="range"
        min={100}
        max={10000}
        step={1}
        value={deposit}
        onChange={e => setDeposit(Number(e.target.value))}
        className="w-full accent-green"
      />
      <div className="flex justify-between items-center w-full">
        <span className="font-bold text-2xl text-green">${deposit}</span>
        <span
          className={`rounded-full px-4 py-1 font-semibold text-sm shadow`}
          style={{
            background: tier.badge,
            color: "#181711",
            boxShadow: tier.color === "bg-green" ? "0 0 8px #16C78466" :
              tier.color === "bg-gold" ? "0 0 8px #E6C41966" : "0 0 10px #8B5CF666"
          }}
        >
          {tier.label}
        </span>
      </div>
    </div>
  );
};

export default VariableDeposit;
