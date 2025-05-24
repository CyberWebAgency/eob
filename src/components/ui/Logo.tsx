import React from 'react';
import { Dna } from 'lucide-react';

interface LogoProps {
  scrolled?: boolean;
}

const Logo: React.FC<LogoProps> = ({ scrolled = false }) => {
  return (
    <a href="#home" className="flex items-center space-x-2">
      <img src="/logo.png" alt="EastOcyonBio" className="w-20 h-20" />
      <span className={`font-bold text-2xl ${scrolled ? 'text-gray-900' : 'text-white'} transition-colors duration-300`}>
        East<span className="text-primary-500">Ocyon</span>Bio
      </span>
    </a>
  );
};

export default Logo;