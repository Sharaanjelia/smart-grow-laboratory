import React from 'react';

interface TelkomLogoProps {
  className?: string;
  variant?: 'full' | 'icon-only';
  showText?: boolean;
}

export default function TelkomLogo({ className = 'h-9', variant = 'full', showText = true }: TelkomLogoProps) {
  const telkomLogoPath = '/images/telkom-university-logo.png';

  return (
    <img 
      src={telkomLogoPath} 
      alt="Telkom University Logo" 
      className={`object-contain select-none ${className}`} 
    />
  );
}
