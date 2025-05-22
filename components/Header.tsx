
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary-400">
          F0Z Agent Simulation Explorer
        </h1>
        <div className="text-sm text-gray-400">
          Exploring Complex Systems
        </div>
      </div>
    </header>
  );
};

export default Header;
