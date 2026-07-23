import React from 'react';

interface TelkomLogoProps {
  className?: string;
  variant?: 'full' | 'icon-only';
  showText?: boolean;
}

export default function TelkomLogo({ className = 'h-9', variant = 'full', showText = true }: TelkomLogoProps) {
  if (variant === 'icon-only') {
    return (
      <svg
        viewBox="0 0 100 115"
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Red Open Book / Wings Emblem */}
        <path
          d="M 10 16 C 30 16 42 22 50 36 C 58 22 70 16 90 16 L 90 32 C 72 32 60 40 50 54 C 40 40 28 32 10 32 Z"
          fill="#CE1126"
        />
        <path
          d="M 10 16 C 30 22 42 28 50 46 C 58 28 70 22 90 16 C 70 14 58 20 50 32 C 42 20 30 14 10 16 Z"
          fill="#E52335"
        />

        {/* Outer Grey U-Shape Shield Base */}
        <path
          d="M 10 44 L 28 44 L 28 72 C 28 84 38 94 50 94 C 62 94 72 84 72 72 L 72 44 L 90 44 L 90 72 C 90 96 72 114 50 114 C 28 114 10 96 10 72 Z"
          fill="#707372"
        />

        {/* Dark Shading on Left Side of U */}
        <path
          d="M 10 44 L 28 44 L 28 72 C 28 84 38 94 50 94 L 50 114 C 28 114 10 96 10 72 Z"
          fill="#4D504F"
        />
      </svg>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Icon Emblem */}
      <svg
        viewBox="0 0 100 115"
        className="h-full w-auto shrink-0 drop-shadow-2xs"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top Red Open Book / Wings Emblem */}
        <path
          d="M 10 16 C 30 16 42 22 50 36 C 58 22 70 16 90 16 L 90 32 C 72 32 60 40 50 54 C 40 40 28 32 10 32 Z"
          fill="#CE1126"
        />
        <path
          d="M 10 16 C 30 22 42 28 50 46 C 58 28 70 22 90 16 C 70 14 58 20 50 32 C 42 20 30 14 10 16 Z"
          fill="#E52335"
        />

        {/* Outer Grey U-Shape Shield Base */}
        <path
          d="M 10 44 L 28 44 L 28 72 C 28 84 38 94 50 94 C 62 94 72 84 72 72 L 72 44 L 90 44 L 90 72 C 90 96 72 114 50 114 C 28 114 10 96 10 72 Z"
          fill="#707372"
        />

        {/* Dark Shading on Left Side of U */}
        <path
          d="M 10 44 L 28 44 L 28 72 C 28 84 38 94 50 94 L 50 114 C 28 114 10 96 10 72 Z"
          fill="#4D504F"
        />
      </svg>

      {/* Typography matching uploaded image */}
      {showText && (
        <div className="flex flex-col text-left leading-none justify-center">
          <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg font-sans leading-none">
            Telkom
          </span>
          <span className="font-bold text-slate-900 tracking-tight text-xs sm:text-sm font-sans mt-0.5 leading-none">
            University
          </span>
        </div>
      )}
    </div>
  );
}
