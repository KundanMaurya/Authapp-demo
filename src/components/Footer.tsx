import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">Auth App</p>
            <p className="text-sm text-gray-300">© {new Date().getFullYear()} All rights reserved</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;