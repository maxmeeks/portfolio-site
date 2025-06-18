import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black-soft text-cream py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="w-8 h-8 bg-cream rounded-full mb-4 md:mb-0"></div>
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-gray-warm">
              © 2024 Max Meekhoff. Crafted with attention to detail.
            </p>
          </div>
          
          <div className="flex space-x-6 mt-6 md:mt-0">
            <span className="text-sm text-gray-warm">NATIONAL BANK</span>
            <span className="text-sm text-gray-warm">mattered.</span>
            <span className="text-sm text-gray-warm">Coca-Cola</span>
            <span className="text-sm text-gray-warm">Adobe</span>
            <span className="text-sm text-gray-warm">SUBWAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;