
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8 mt-12">
      <div className="container mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} F0Z Simulation Explorer. All rights reserved (conceptually).</p>
        <p className="text-sm mt-1">Powered by React, Tailwind CSS, and Gemini AI.</p>
      </div>
    </footer>
  );
};

export default Footer;
