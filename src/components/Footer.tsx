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
              href="https://www.google.com/maps/search/?api=1&query=Bandung+Techno+Park+Telkom+University"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-400 transition-colors block text-sm leading-relaxed space-y-1 font-sans cursor-pointer group"
              title="Open location in Google Maps"
            >
              <p className="group-hover:underline">Bandung Techno Park, Telkom</p>
              <p className="group-hover:underline">University, Jl. Telekomunikasi,</p>
              <p className="group-hover:underline">Terusan Buah Batu Kab. Bandung,</p>
              <p className="group-hover:underline">40257</p>
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
            <div className="text-slate-400 text-sm leading-relaxed space-y-3 font-sans">
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
          </div>

        </div>
      </div>
    </footer>
  );
}

