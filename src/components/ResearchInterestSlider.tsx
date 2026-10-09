import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

interface ResearchItem {
  id: number;
  title: string;
  description: string;
  image: string;
  techTags: string[];
}

const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: 1,
    title: 'Smart Farming & Precision Agriculture',
    description: 'Optimasi fertigasi otomatis, mikroklimat cerdas greenhouse, dan pemantauan fisiologi tanaman real-time.',
    image: '/images/research/precision-farming.jpg',
    techTags: ['Greenhouse Automation', 'pH/EC Closed-Loop']
  },
  {
    id: 2,
    title: 'Internet of Things (IoT) & Sensor Networks',
    description: 'Transmisi telemetri nirkabel multi-node jarak jauh, sensor mesh, dan integrasi edge gateway berdaya rendah.',
    image: '/images/research/iot-protocols.jpg',
    techTags: ['LoRaWAN • ESP32', 'Edge Gateway']
  },
  {
    id: 3,
    title: 'Artificial Intelligence & Machine Learning',
    description: 'Computer vision pengenal kematangan tanaman, deteksi hama otomatis, dan model prediktif hasil panen.',
    image: '/images/research/ai-deeplearning.jpg?v=2',
    techTags: ['Computer Vision', 'YOLOv8 • PyTorch']
  },
  {
    id: 4,
    title: 'Quantum & Information Security',
    description: 'Protokol enkripsi telemetri sensor cloud, proteksi firmware mikrokontroler, dan integritas data riset.',
    image: '/images/research/cybersecurity.jpg',
    techTags: ['Post-Quantum Crypto', 'End-to-End Security']
  },
  {
    id: 5,
    title: 'Signal Processing & Compressive Sensing',
    description: 'Reduksi derau frekuensi multi-probe, kompresi paket sensor nirkabel berkecepatan tinggi, dan analisis spektral.',
    image: '/images/research/dsp-telemetry.jpg',
    techTags: ['Wavelet Filter', 'High-Speed Telemetry']
  },
  {
    id: 6,
    title: 'Telemedicine & Health Technology',
    description: 'Riset biosensor terintegrasi, pemantauan kualitas nutrisi pangan fungsional, dan telemetri kesehatan modern.',
    image: '/images/research/health-tech.jpg',
    techTags: ['Bio-Sensors', 'Vital Telemetry']
  },
  {
    id: 7,
    title: 'Networking & Software Defined Networks (SDN)',
    description: 'Virtualisasi infrastruktur jaringan lab terdistribusi, routing bandwidth adaptif, dan manajemen throughput QoS.',
    image: '/images/research/sdn-networking.jpg',
    techTags: ['SDN Controller', 'Virtual Infrastructure']
  },
  {
    id: 8,
    title: 'Green Technology & Sustainable Systems',
    description: 'Integrasi panel surya mikro agrivoltaik, resirkulasi air tertutup, dan teknologi agrikultur ramah lingkungan.',
    image: '/images/research/sustainable-tech.jpg',
    techTags: ['Agrivoltaics', 'Zero-Carbon Power']
  }
];

export default function ResearchInterestSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  // Update active index based on scroll position
  const handleScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft: sLeft, scrollWidth, clientWidth } = sliderRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setActiveIndex(0);
      return;
    }
    const ratio = sLeft / maxScroll;
    const targetIdx = Math.round(ratio * (RESEARCH_ITEMS.length - 1));
    setActiveIndex(Math.min(RESEARCH_ITEMS.length - 1, Math.max(0, targetIdx)));
  }, []);

  const getScrollAmount = () => {
    if (!sliderRef.current) return 380;
    const firstCard = sliderRef.current.querySelector<HTMLElement>('[data-slider-card]');
    if (firstCard) {
      return firstCard.offsetWidth + 24; // card width + gap (gap-6 = 24px)
    }
    return 380;
  };

  const scrollPrev = () => {
    if (!sliderRef.current) return;
    const amount = getScrollAmount();
    sliderRef.current.scrollBy({ left: -amount, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (!sliderRef.current) return;
    const { scrollLeft: sLeft, scrollWidth, clientWidth } = sliderRef.current;
    const amount = getScrollAmount();

    // Loop back smoothly to start if reached end
    if (sLeft + clientWidth >= scrollWidth - 40) {
      sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      sliderRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return;
    const cards = sliderRef.current.querySelectorAll<HTMLElement>('[data-slider-card]');
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  // Smooth Auto-Play (pauses gracefully on hover or dragging)
  useEffect(() => {
    if (isPaused || isDragging) return;
    const timer = setInterval(() => {
      scrollNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, isDragging]);

  // Drag-to-scroll mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.35;
    if (Math.abs(walk) > 5) {
      setHasMoved(true);
    }
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section 
      className="w-full bg-white py-20 px-4 sm:px-6 lg:px-12 my-10 relative overflow-hidden select-none border-t border-b border-slate-100" 
      id="research-interests"
    >
      {/* Soft Ambient Accents on Clean White */}
      <div className="absolute top-0 right-1/4 h-96 w-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 h-96 w-96 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Widescreen Container: expands comfortably on desktop monitors */}
      <div className="mx-auto max-w-[1536px] relative z-10">
        
        {/* Section Header: White Background & Black Text */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-3.5 text-center lg:text-left">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Research Interest
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans max-w-2xl">
              Fokus kepakaran dan kelompok laboratorium riset terpadu dalam memajukan teknologi pertanian cerdas, otomasi biosistem, dan sistem siber.
            </p>
          </div>

          {/* Navigation Controls: Clean White Theme */}
          <div className="flex items-center justify-center lg:justify-end gap-3.5 shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs font-mono shadow-xs">
              <span className="font-bold text-emerald-700 text-sm">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-500">
                {String(RESEARCH_ITEMS.length).padStart(2, '0')}
              </span>
            </div>

            <button
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="h-12 w-12 rounded-2xl bg-white hover:bg-emerald-600 border border-slate-200 hover:border-emerald-600 text-slate-700 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-slate-200/50 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next slide"
              className="h-12 w-12 rounded-2xl bg-white hover:bg-emerald-600 border border-slate-200 hover:border-emerald-600 text-slate-700 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-slate-200/50 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Slider Track Wrapper with Soft White Side Fade Overlays */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setIsDragging(false);
          }}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Side Vignette Gradients for Smooth In/Out Transition */}
          <div className="hidden lg:block pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/70 to-transparent z-20" />
          <div className="hidden lg:block pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/70 to-transparent z-20" />

          {/* Smooth Scrollable Slider Track */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
              scrollSnapType: isDragging ? 'none' : 'x mandatory'
            }}
            className={`flex gap-6 overflow-x-auto no-scrollbar py-4 px-2 sm:px-4 scroll-smooth cursor-grab ${
              isDragging ? 'cursor-grabbing select-none' : ''
            }`}
          >
            {RESEARCH_ITEMS.map((item, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={item.id}
                  data-slider-card
                  onClick={() => {
                    if (!hasMoved) {
                      scrollToIndex(idx);
                    }
                  }}
                  className={`w-[82vw] max-w-[340px] sm:w-[350px] md:w-[380px] shrink-0 snap-center sm:snap-start group relative overflow-hidden rounded-[2rem] min-h-[380px] sm:min-h-[400px] flex flex-col justify-between p-6 sm:p-7 border transition-all duration-500 cursor-pointer ${
                    isActive
                      ? 'border-emerald-500 shadow-2xl shadow-emerald-600/20 scale-[1.01]'
                      : 'border-slate-200/60 hover:border-emerald-500/80 hover:scale-[1.02] hover:shadow-xl hover:shadow-slate-300/40'
                  }`}
                >
                  {/* REAL PHOTOGRAPHY BACKGROUND */}
                  <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.70] group-hover:brightness-[0.80] contrast-105"
                    />
                    {/* Cinematic Multi-Layer Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20 z-10" />
                  </div>



                  {/* Card Bottom: Title, Description & Tech Tags (No logo, No category tag like 'Deep Learning') */}
                  <div className="relative z-20 space-y-3 mt-auto pt-10">
                    <h3 className="font-display text-xl sm:text-2xl font-black text-white leading-snug tracking-tight group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-sans line-clamp-2">
                      {item.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="pt-2.5 flex flex-wrap gap-2 border-t border-white/15">
                      {item.techTags.map((tech, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-md text-[10px] font-mono font-medium text-slate-200 border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pagination Pill Indicators: Clean Slate & Emerald Theme */}
        <div className="mt-10 flex items-center justify-center gap-2.5">
          {RESEARCH_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                activeIndex === idx 
                  ? 'w-10 bg-emerald-600 shadow-md shadow-emerald-600/30' 
                  : 'w-2.5 bg-slate-200 hover:bg-slate-300 border border-slate-300'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
