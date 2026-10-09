import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import Logo from './Logo';
import { 
  Menu, 
  X, 
  Home, 
  Newspaper, 
  FlaskConical, 
  Info, 
  LogIn, 
  UserPlus, 
  LayoutDashboard,
  ChevronRight,
  Sparkles
} from 'lucide-react';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navItems: { id: PageId; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'news', label: 'News & Events', icon: Newspaper },
    { id: 'project', label: 'Project', icon: FlaskConical },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (id: PageId) => {
    setCurrentPage(id);
    setIsMobileMenuOpen(false);
  };

  const handleLoginClick = () => {
    setIsMobileMenuOpen(false);
    if (onOpenLogin) {
      onOpenLogin();
    } else {
      setCurrentPage('login');
    }
  };

  const handleJoinClick = () => {
    setIsMobileMenuOpen(false);
    onOpenJoin();
  };

  const handlePortalClick = () => {
    setIsMobileMenuOpen(false);
    setCurrentPage('dashboard');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md transition-shadow duration-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:py-4 sm:px-6 lg:px-8">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="cursor-pointer group select-none shrink-0"
            id="navbar-logo-container"
          >
            <Logo variant="navbar" />
          </div>

          {/* Desktop Navigation Links (Visible on md: 768px+) */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8" id="desktop-navbar-nav">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative font-sans text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer py-1 ${
                    isActive 
                      ? 'text-teal-700 font-bold' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA Action Buttons (Visible on md: 768px+) */}
          <div className="hidden md:flex items-center gap-2.5 lg:gap-3 shrink-0" id="navbar-cta-container">
            {isLoggedIn ? (
              <button
                onClick={handlePortalClick}
                id="lab-portal-navbar-button"
                className="rounded-full bg-[#0A5247] hover:bg-[#073d34] px-4 lg:px-5 py-2 text-xs lg:text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Lab Portal</span>
                {currentUserRole && (
                  <span className="text-[10px] font-mono uppercase bg-white/20 px-2 py-0.5 rounded-full">
                    {currentUserRole}
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={handleLoginClick}
                id="login-navbar-button"
                className="rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 px-4 lg:px-5 py-2 text-xs lg:text-sm font-semibold text-slate-200 transition-all duration-300 hover:text-white cursor-pointer"
              >
                <span>Lab Login</span>
              </button>
            )}

            <button
              onClick={handleJoinClick}
              id="join-us-navbar-button"
              className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-4 lg:px-6 py-2 text-xs lg:text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md shadow-emerald-600/10 flex items-center gap-1.5"
            >
              <span>Join Us!</span>
            </button>
          </div>

          {/* Mobile Hamburger Button (Visible on mobile/tablet < 768px) */}
          <div className="flex md:hidden items-center gap-2">
            {/* Quick mini-status if logged in on mobile */}
            {isLoggedIn && (
              <button
                onClick={handlePortalClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Portal</span>
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Buka menu navigasi"
              aria-expanded={isMobileMenuOpen}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all active:scale-95 cursor-pointer shadow-xs bg-white"
            >
              <Menu className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE SIDEBAR / DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-in Sidebar Panel */}
          <aside 
            className="fixed inset-y-0 right-0 w-[84%] max-w-sm bg-white shadow-2xl flex flex-col justify-between z-50 border-l border-slate-100 animate-slide-left overflow-y-auto"
            aria-label="Navigasi Mobile"
          >
            {/* Top Drawer Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div onClick={() => handleNavClick('home')} className="cursor-pointer">
                <Logo variant="navbar" />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Tutup menu"
                className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Middle Nav Links */}
            <div className="p-5 space-y-2 flex-1 overflow-y-auto">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
                Menu Utama
              </p>
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-left font-sans text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 shadow-xs border border-emerald-200/60 font-bold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>

            {/* Bottom Actions & CTAs */}
            <div className="p-5 border-t border-slate-100 bg-slate-50/50 space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                Akses Lab & Keanggotaan
              </p>

              {isLoggedIn ? (
                <button
                  onClick={handlePortalClick}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0A5247] hover:bg-[#073d34] text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                  <span>Masuk Lab Portal</span>
                  {currentUserRole && (
                    <span className="text-[10px] uppercase font-mono bg-white/20 px-2 py-0.5 rounded-full ml-1">
                      {currentUserRole}
                    </span>
                  )}
                </button>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-sm transition-all active:scale-95 cursor-pointer border border-slate-700"
                >
                  <LogIn className="w-4 h-4 text-slate-300" />
                  <span>Lab Login</span>
                </button>
              )}

              <button
                onClick={handleJoinClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all active:scale-95 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Join Us (Daftar Tim Lab)</span>
              </button>

              <div className="pt-2 text-center">
                <p className="text-[10px] text-slate-400 font-medium">
                  Smart Agriculture & IoT Research • Telkom University
                </p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
