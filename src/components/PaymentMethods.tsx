
import React from 'react';

interface PaymentMethodsProps {
  methods: string[];
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ methods }) => {
  return (
    <div className="flex justify-center items-center gap-3">
      <p className="text-sm text-gray-400 font-semibold">Accepted:</p>
      {methods.map(method => (
        <div key={method} className="h-8 px-3 flex items-center justify-center text-xs font-semibold text-white bg-white/10 rounded-lg border border-white/10">
          {method}
        </div>
      ))}
    </div>
  );
};

export default PaymentMethods;
