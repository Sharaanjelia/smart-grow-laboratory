import React from 'react';
import Logo from './Logo';

interface FooterProps {
  setCurrentPage?: (page: any) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  return (
    <footer className="relative w-full bg-[#090C12] text-slate-300 pt-16 pb-20 border-t border-slate-900/80 font-sans overflow-hidden" id="main-footer">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-start">
          
          {/* Logo & Branding Column */}
          <div className="lg:col-span-3 flex flex-col items-start pr-0 lg:pr-4 min-w-0">
            <div 
              onClick={() => setCurrentPage?.('home')}
              className="group cursor-pointer select-none"
            >
              <Logo variant="footer" />
            </div>
          </div>

          {/* Office Address Column */}
          <div className="lg:col-span-3 space-y-3 pt-1 min-w-0">
            <h3 className="text-white font-bold text-base sm:text-lg tracking-wide">
              Office Address
            </h3>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Jl.+Telekomunikasi+No.1+Sukapura+Dayeuhkolot+Bandung"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-400 transition-colors block text-sm leading-relaxed space-y-1 font-sans cursor-pointer group"
              title="Open location in Google Maps"
            >
              <p className="group-hover:underline">Bandung Techno Park, Telkom University</p>
              <p className="group-hover:underline">Jl. Telekomunikasi No.1, Sukapura,</p>
              <p className="group-hover:underline">Kec. Dayeuhkolot, Kab. Bandung,</p>
              <p className="group-hover:underline">Jawa Barat 40257</p>
            </a>
          </div>

          {/* Research & Innovation Column */}
          <div className="lg:col-span-3 space-y-3 pt-1 min-w-0">
            <h3 className="text-white font-bold text-base sm:text-lg tracking-wide">
              Research & Innovation
            </h3>
            <div className="text-slate-400 text-sm leading-relaxed space-y-3 font-sans">
              <div>
                <p>Bagian Penelitian dan Pengabdian</p>
                <p>Masyarakat</p>
              </div>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Bandung+Techno+Park"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-400 transition-colors inline-block cursor-pointer underline decoration-slate-600 hover:decoration-teal-400"
                title="Open Bandung Techno Park in Google Maps"
              >
                Bandung Techno Park
              </a>
            </div>
          </div>

          {/* Contact Us Column */}
          <div className="lg:col-span-3 space-y-3 pt-1 min-w-0">
            <h3 className="text-white font-bold text-base sm:text-lg tracking-wide">
              Contact Us
            </h3>
            <div className="text-slate-400 text-sm leading-relaxed space-y-2 font-sans">
              <a 
                href="mailto:smartgrowlaboratory@gmail.com" 
                className="hover:text-white transition-colors block break-all font-mono text-xs sm:text-sm text-slate-300 font-medium"
              >
                smartgrowlaboratory@gmail.com
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Telkom+University"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-teal-400 transition-colors inline-block cursor-pointer underline decoration-slate-600 hover:decoration-teal-400 font-sans"
                title="Open Telkom University in Google Maps"
              >
                Telkom University
              </a>
            </div>

            {/* Social Media Links */}
            <div className="pt-2.5 border-t border-slate-900/90 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
                Media Sosial
              </span>
              <div className="flex flex-col gap-2">
                <a
                  href="https://www.instagram.com/smart_growlab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-pink-400 transition-colors group cursor-pointer"
                  title="Instagram Smart Grow Lab: @smart_growlab"
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-pink-500/50 flex items-center justify-center text-slate-400 group-hover:text-pink-400 transition-colors shrink-0 shadow-xs">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </span>
                  <span className="group-hover:underline">@smart_growlab</span>
                </a>

                <a
                  href="https://www.youtube.com/@indrarinidyahirawati543"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-red-400 transition-colors group cursor-pointer"
                  title="YouTube Pembina Lab: @indrarinidyahirawati543"
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-red-500/50 flex items-center justify-center text-slate-400 group-hover:text-red-400 transition-colors shrink-0 shadow-xs">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </span>
                  <span className="group-hover:underline">@indrarinidyahirawati543</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Smart Grow Laboratory • Telkom University. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/smart_growlab/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-pink-400 transition-colors"
            >
              Instagram
            </a>
            <span>•</span>
            <a
              href="https://www.youtube.com/@indrarinidyahirawati543"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-red-400 transition-colors"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

