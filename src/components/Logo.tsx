import React from 'react';

interface LogoProps {
  variant?: 'navbar' | 'footer' | 'icon-only' | 'sidebar';
  className?: string;
}

export default function Logo({ variant = 'navbar', className = '' }: LogoProps) {
  const smartGrowLogo = '/images/smart-grow-logo.png?v=3';

  if (variant === 'icon-only') {
    return (
      <div className={`relative inline-flex items-center justify-center rounded-full bg-[#0A5247] p-1.5 overflow-hidden shadow-sm ${className}`}>
        <img 
          src={smartGrowLogo} 
          alt="Smart Grow Laboratory Icon" 
          className="h-full w-auto object-contain filter brightness-0 invert" 
        />
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex items-center select-none ${className}`}>
        <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 shadow-sm flex items-center">
          <img 
            src={smartGrowLogo} 
            alt="Smart Grow Laboratory" 
            className="h-10 sm:h-12 w-auto object-contain" 
          />
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`flex items-center select-none ${className}`}>
        <div className="bg-white/95 px-3 py-1.5 rounded-xl shadow-xs flex items-center">
          <img 
            src={smartGrowLogo} 
            alt="Smart Grow Laboratory" 
            className="h-7 sm:h-8 w-auto object-contain" 
          />
        </div>
      </div>
    );
  }

  // Navbar default variant
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img 
        src={smartGrowLogo} 
        alt="Smart Grow Laboratory" 
        className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
      />
    </div>
  );
}




