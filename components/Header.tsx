
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-8">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Gemini Image Restyler
      </h1>
      <p className="mt-2 text-lg text-gray-400">
        Transform your photos with the power of generative AI.
      </p>
    </header>
  );
};

export default Header;
