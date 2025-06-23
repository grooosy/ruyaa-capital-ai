import React from 'react';

interface Feature3DCardProps {
  imageSrc: string;
  title: string;
  description?: string;
}

const Feature3DCard: React.FC<Feature3DCardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="feature-3d-card group perspective">
      <div className="relative w-64 h-80 bg-white rounded-xl shadow-xl transform transition-transform duration-300 group-hover:rotate-y-6 group-hover:-rotate-x-3 group-hover:scale-105">
        <img
          src={imageSrc}
          alt={title}
          className="w-24 h-24 object-contain mx-auto mt-8 mb-4 drop-shadow-lg"
        />
        <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
        {description && <p className="text-gray-500 text-center px-4">{description}</p>}
      </div>
    </div>
  );
};

export default Feature3DCard;
