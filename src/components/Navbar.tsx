import React from 'react';
import { PageId } from '../types';
import Logo from './Logo';

interface NavbarProps {
  currentPage: PageId;
  setCurrentPage: (page: PageId) => void;
  onOpenJoin: () => void;
  isLoggedIn?: boolean;
  currentUserRole?: string;
  onOpenLogin?: () => void;
}

export default function Navbar({ 
  currentPage, 
  setCurrentPage, 
  onOpenJoin,
  isLoggedIn,
  currentUserRole,
  onOpenLogin 
}: NavbarProps) {

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'news', label: 'News & Events' },
    { id: 'project', label: 'Project' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:py-4 sm:px-6 lg:px-8">
        
        {/* Logo matching exact Smart Grow Laboratory brand emblem */}
        <div 
          onClick={() => setCurrentPage('home')}
          className="cursor-pointer group select-none shrink-0"
          id="navbar-logo-container"
        >
          <Logo variant="navbar" />
        </div>

        {/* Desktop Navigation — only visible on lg (1024px+) to avoid overlap on tablets/large phones */}
        <nav className="hidden lg:flex items-center gap-8" id="desktop-navbar-nav">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => setCurrentPage(item.id)}
                className={`font-sans text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-teal-600 border-b-2 border-teal-600 pb-1' : 'text-slate-500 hover:text-slate-900 pb-1'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA Buttons — hidden on mobile (shown in bottom nav instead), visible on sm+ in header */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3 shrink-0" id="navbar-cta-container">
          {isLoggedIn ? (
            <button
              onClick={() => setCurrentPage('dashboard')}
              id="lab-portal-navbar-button"
              className="rounded-full bg-[#0A5247] hover:bg-[#073d34] px-4 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md flex items-center gap-1.5 sm:gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Lab Portal</span>
              {currentUserRole && (
                <span className="hidden md:inline-block text-[10px] font-mono uppercase bg-white/20 px-2 py-0.5 rounded-full">
                  {currentUserRole}
                </span>
              )}
            </button>
          ) : (
            <button
              onClick={() => onOpenLogin ? onOpenLogin() : setCurrentPage('login')}
              id="login-navbar-button"
              className="rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-semibold text-slate-200 transition-all duration-300 hover:text-white cursor-pointer"
            >
              <span>Lab Login</span>
            </button>
          )}

          <button
            onClick={onOpenJoin}
            id="join-us-navbar-button"
            className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-4 sm:px-6 py-1.5 sm:py-2.5 text-[11px] sm:text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md shadow-emerald-600/10"
          >
            <span>Join Us!</span>
          </button>
        </div>

      </div>

      {/* Mobile & Tablet Bottom Nav Rail — visible below lg (< 1024px) */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-100 bg-white py-2.5 px-1 fixed bottom-0 left-0 right-0 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex flex-col items-center gap-0.5 transition-colors px-2 py-1 rounded-xl ${
                isActive ? 'text-teal-600 font-bold' : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              <span className="text-[11px] font-sans tracking-wide font-semibold">
                {item.label === 'News & Events' ? 'News' : item.label}
              </span>
              {isActive && (
                <span className="h-1 w-5 rounded-full bg-teal-600 mt-0.5"></span>
              )}
            </button>
          );
        })}

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 shrink-0"></div>

        {/* Login / Portal button in bottom nav for mobile */}
        {isLoggedIn ? (
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-emerald-700"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-wide">Portal</span>
          </button>
        ) : (
          <button
            onClick={() => onOpenLogin ? onOpenLogin() : setCurrentPage('login')}
            className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl text-slate-500 hover:text-slate-800"
          >
            <span className="text-[11px] font-semibold tracking-wide">Login</span>
          </button>
        )}

        {/* Join Us button in bottom nav for mobile */}
        <button
          onClick={onOpenJoin}
          className="px-3 py-1.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold shadow-sm hover:bg-emerald-700 transition-all active:scale-95 shrink-0"
        >
          Join Us!
        </button>
      </div>
    </header>
  );
}
