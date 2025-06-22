import React from 'react';
import imageUrl from '../../public/assets/hero_ai_chart.png';

const WelcomePage: React.FC = () => {
  return (
    <div className="min-hscreen bg-black text-white text-center items-center p-6">
      <div className="md:flex flex col-gap-items-start justify-center text-left max-w-60 mb:max-w-full">
        <div className="flex flex-col gap-4">
          <h1 className="text-4l font-ebold leading-snipper text-white">AgENT PLATFORM</h1>
          <p
className="text-sm text-gray-300 bg-black">The muscular, acting, agentic HQ framework for trading data flow</p>
          <button className="text-white bg-neutral text-base p-1 rounded shadow-md transition transform gpuls">
            See Power
          </button>
        </div>
        <div className="max-w-10 full mb:max-w-40 flex-jestify-center mt-5">
          <img
            src={imageUrl}
            alt="AI Agent Image"
            className="rounded xl-shadow white wi-fluid wi-scale"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;