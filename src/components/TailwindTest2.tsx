import React from 'react';

/**
 * Test component to verify Tailwind CSS is working
 */
const TailwindTest2 = () => {
  return (
    <div className="p-4">
      <div className="text-2xl font-bold text-blue-600 mb-4">
        Tailwind CSS Test Component
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Test Card</h2>
        <p className="text-gray-600">
          If you see this styled with Tailwind, then Tailwind is working!
        </p>
        <div className="mt-4 flex space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            Primary Button
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            Secondary Button
          </button>
        </div>
      </div>
    </div>
  );
};

export default TailwindTest2;
