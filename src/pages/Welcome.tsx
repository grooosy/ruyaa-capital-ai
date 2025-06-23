import { UseState, useEffect } from 'react';

// A clean basic modern monochrome welcome page with no purple, no gradients, no colored layers

function Welcome() {
  return (
    <div className="bg-black text-white min-h-screen pb6 flex justify-center">
      <h1 className="font-semibold text-4Xl gray-100 leading-tight">Ruyaa Capital Ai Flow!</h1>
      <p className="text-lg gray-500">The AI where money flows as easy as water</p>
      <div className="pt-5">
        <button className="bg-white text-black rounded py4-6 text-lg showdow">Start</button>
      </div>
    </div>
  );
}

export default Welcome;
