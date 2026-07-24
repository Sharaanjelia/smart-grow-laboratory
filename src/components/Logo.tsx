import React from 'react';

interface LogoProps {
  variant?: 'navbar' | 'footer' | 'icon-only' | 'sidebar';
  className?: string;
}

export default function Logo({ variant = 'navbar', className = '' }: LogoProps) {
  const logoPath = '/images/smart-grow-logo.png';

  if (variant === 'icon-only') {
    return (
      <div className={`relative inline-flex items-center justify-center rounded-full bg-[#1F4E4F] p-1.5 overflow-hidden shadow-sm ${className}`}>
        <img 
          src={logoPath} 
          alt="Smart Grow Laboratory Icon" 
          className="h-full w-auto object-contain filter brightness-0 invert" 
        />
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex items-center select-none ${className}`}>
        <div className="bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/20 shadow-sm">
          <img 
            src={logoPath} 
            alt="Smart Grow Laboratory" 
            className="h-12 sm:h-14 w-auto object-contain" 
          />
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`flex items-center select-none ${className}`}>
        <div className="bg-white/95 px-3 py-1.5 rounded-xl shadow-xs">
          <img 
            src={logoPath} 
            alt="Smart Grow Laboratory" 
            className="h-7 sm:h-8 w-auto object-contain" 
          />
        </div>
      </div>
    );
  }

  // Navbar default variant matching uploaded image brand identity
  return (
    <div className={`flex items-center select-none ${className}`}>
      <img 
        src={logoPath} 
        alt="Smart Grow Laboratory" 
        className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
      />
    </div>
  );
}
