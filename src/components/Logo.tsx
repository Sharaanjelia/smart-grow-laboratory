import React from 'react';

interface LogoProps {
  variant?: 'navbar' | 'footer' | 'icon-only' | 'sidebar';
  className?: string;
}

export default function Logo({ variant = 'navbar', className = '' }: LogoProps) {
  if (variant === 'icon-only') {
    return (
      <div className={`relative inline-flex items-center justify-center rounded-full bg-[#1F4E4F] text-white overflow-hidden shadow-sm ${className}`}>
        <svg 
          viewBox="0 0 200 200" 
          className="w-full h-full text-white fill-current" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular Background */}
          <circle cx="100" cy="100" r="100" fill="#1F4E4F" />

          {/* Emblem Group */}
          <g fill="#FFFFFF">
            {/* Center Vertical Leaf */}
            <path d="M100 20 C92 42 94 68 100 84 C106 68 108 42 100 20 Z" />
            <path d="M100 28 L100 76" stroke="#1F4E4F" strokeWidth="2.5" strokeLinecap="round" />

            {/* Left Leaf */}
            <path d="M94 72 C70 42 32 46 32 46 C32 46 48 80 88 82 Z" />
            
            {/* Right Leaf */}
            <path d="M106 72 C130 42 168 46 168 46 C168 46 152 80 112 82 Z" />

            {/* Base Triangle Outline */}
            <path d="M28 158 L172 158 L100 134 Z" fill="#FFFFFF" />
            <path d="M42 154 L158 154 L100 139 Z" fill="#1F4E4F" />

            {/* Left 2 / S Swirl Monogram */}
            <path d="M42 126 C42 100 70 88 88 106 C78 116 64 128 52 140 L94 140 L94 150 L36 150 C36 134 56 120 72 108 C60 98 52 104 52 112 C52 120 62 126 62 126 Z" />

            {/* Right G Swirl Monogram */}
            <path d="M158 108 C158 92 138 84 118 84 C98 84 82 100 82 124 C82 148 100 158 124 158 C146 158 164 142 164 118 L124 118 L124 108 L172 108 C172 144 148 168 122 168 C88 168 70 146 70 124 C70 94 96 72 124 72 C152 72 174 90 174 108 Z" />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex flex-col items-start select-none ${className}`}>
        <div className="relative mb-2 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F4E4F] text-white shadow-sm shrink-0">
            <svg 
              viewBox="0 0 200 200" 
              className="w-8 h-8 fill-current text-white" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="100" r="100" fill="#1F4E4F" />
              <g fill="#FFFFFF">
                <path d="M100 20 C92 42 94 68 100 84 C106 68 108 42 100 20 Z" />
                <path d="M100 28 L100 76" stroke="#1F4E4F" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M94 72 C70 42 32 46 32 46 C32 46 48 80 88 82 Z" />
                <path d="M106 72 C130 42 168 46 168 46 C168 46 152 80 112 82 Z" />
                <path d="M28 158 L172 158 L100 134 Z" fill="#FFFFFF" />
                <path d="M42 154 L158 154 L100 139 Z" fill="#1F4E4F" />
                <path d="M42 126 C42 100 70 88 88 106 C78 116 64 128 52 140 L94 140 L94 150 L36 150 C36 134 56 120 72 108 C60 98 52 104 52 112 C52 120 62 126 62 126 Z" />
                <path d="M158 108 C158 92 138 84 118 84 C98 84 82 100 82 124 C82 148 100 158 124 158 C146 158 164 132 164 108 L124 108 L124 98 L172 98 C172 134 148 158 122 158 C88 158 70 136 70 114 C70 84 96 62 124 62 C152 62 174 80 174 98 Z" />
              </g>
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-black text-xl text-white tracking-[0.10em] leading-none font-sans">
              SMART GROW
            </span>
            <span className="font-bold text-xs text-slate-300 tracking-[0.38em] leading-tight font-sans mt-1">
              LABORATORY
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1F4E4F] shadow-md shrink-0 transition-transform duration-300">
          <svg 
            viewBox="0 0 200 200" 
            className="w-6 h-6 fill-[#1F4E4F]" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="100" fill="#1F4E4F" />
            <g fill="#FFFFFF">
              <path d="M100 20 C92 42 94 68 100 84 C106 68 108 42 100 20 Z" />
              <path d="M100 28 L100 76" stroke="#1F4E4F" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M94 72 C70 42 32 46 32 46 C32 46 48 80 88 82 Z" />
              <path d="M106 72 C130 42 168 46 168 46 C168 46 152 80 112 82 Z" />
              <path d="M28 158 L172 158 L100 134 Z" fill="#FFFFFF" />
              <path d="M42 154 L158 154 L100 139 Z" fill="#1F4E4F" />
              <path d="M42 126 C42 100 70 88 88 106 C78 116 64 128 52 140 L94 140 L94 150 L36 150 C36 134 56 120 72 108 C60 98 52 104 52 112 C52 120 62 126 62 126 Z" />
              <path d="M158 108 C158 92 138 84 118 84 C98 84 82 100 82 124 C82 148 100 158 124 158 C146 158 164 142 164 118 L124 118 L124 108 L172 108 C172 144 148 168 122 168 C88 168 70 146 70 124 C70 94 96 72 124 72 C152 72 174 90 174 108 Z" />
            </g>
          </svg>
        </div>
        <div className="flex flex-col text-left">
          <span className="font-black text-sm sm:text-base tracking-[0.10em] text-white uppercase leading-none font-sans">
            SMART GROW
          </span>
          <span className="font-bold text-[9px] sm:text-[10px] tracking-[0.38em] text-teal-100 uppercase leading-tight font-sans mt-0.5">
            LABORATORY
          </span>
        </div>
      </div>
    );
  }

  // Navbar default variant matching uploaded image brand identity
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Dark Teal Circular Icon Badge */}
      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#1F4E4F] text-white shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-105">
        <svg 
          viewBox="0 0 200 200" 
          className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-current" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circle background */}
          <circle cx="100" cy="100" r="100" fill="#1F4E4F" />

          {/* Emblem */}
          <g fill="#FFFFFF">
            {/* Center Vertical Leaf */}
            <path d="M100 20 C92 42 94 68 100 84 C106 68 108 42 100 20 Z" />
            <path d="M100 28 L100 76" stroke="#1F4E4F" strokeWidth="3" strokeLinecap="round" />

            {/* Left Leaf */}
            <path d="M94 72 C70 42 32 46 32 46 C32 46 48 80 88 82 Z" />
            
            {/* Right Leaf */}
            <path d="M106 72 C130 42 168 46 168 46 C168 46 152 80 112 82 Z" />

            {/* Base Triangle Outline */}
            <path d="M28 158 L172 158 L100 134 Z" fill="#FFFFFF" />
            <path d="M42 154 L158 154 L100 139 Z" fill="#1F4E4F" />

            {/* Monogram Swirls */}
            <path d="M42 126 C42 100 70 88 88 106 C78 116 64 128 52 140 L94 140 L94 150 L36 150 C36 134 56 120 72 108 C60 98 52 104 52 112 C52 120 62 126 62 126 Z" />
            <path d="M158 108 C158 92 138 84 118 84 C98 84 82 100 82 124 C82 148 100 158 124 158 C146 158 164 142 164 118 L124 118 L124 108 L172 108 C172 144 148 168 122 168 C88 168 70 146 70 124 C70 94 96 72 124 72 C152 72 174 90 174 108 Z" />
          </g>
        </svg>
      </div>

      {/* Dark Teal Text Branding */}
      <div className="flex flex-col text-left">
        <span className="font-black text-base sm:text-lg tracking-[0.10em] text-[#1F4E4F] uppercase leading-none font-sans">
          SMART GROW
        </span>
        <span className="font-bold text-[10px] sm:text-[11px] tracking-[0.38em] text-[#1F4E4F] uppercase leading-tight font-sans mt-0.5">
          LABORATORY
        </span>
      </div>
    </div>
  );
}

