import React, { useRef, useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  Sprout,
  Radio,
  Brain,
  ShieldCheck,
  Activity,
  Heart,
  Network,
  Zap
} from 'lucide-react';

interface ResearchItem {
  id: number;
  number: string;
  code: string;
  title: string;
  description: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  techTags: string[];
}

const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: 1,
    number: '01',
    code: 'AGRI-TECH',
    title: 'Smart Farming & Precision Agriculture',
    description: 'Optimasi fertigasi otomatis, mikroklimat cerdas greenhouse, dan pemantauan fisiologi tanaman real-time.',
    image: '/images/research/precision-farming.jpg',
    icon: Sprout,
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-950/80 border-emerald-400/40',
    techTags: ['Greenhouse Automation', 'pH/EC Closed-Loop']
  },
  {
    id: 2,
    number: '02',
    code: 'IOT-NODES',
    title: 'Internet of Things (IoT) & Sensor Networks',
    description: 'Transmisi telemetri nirkabel multi-node jarak jauh, sensor mesh, dan integrasi edge gateway berdaya rendah.',
    image: '/images/research/iot-protocols.jpg',
    icon: Radio,
    iconColor: 'text-teal-400',
    iconBg: 'bg-teal-950/80 border-teal-400/40',
    techTags: ['LoRaWAN • ESP32', 'Edge Gateway']
  },
  {
    id: 3,
    number: '03',
    code: 'AI-VISION',
    title: 'Artificial Intelligence & Machine Learning',
    description: 'Computer vision pengenal kematangan tanaman, deteksi hama otomatis, dan model prediktif hasil panen.',
    image: '/images/research/ai-deeplearning.jpg',
    icon: Brain,
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-950/80 border-purple-400/40',
    techTags: ['Computer Vision', 'YOLOv8 • PyTorch']
  },
  {
    id: 4,
    number: '04',
    code: 'CYBER-SEC',
    title: 'Quantum & Information Security',
    description: 'Protokol enkripsi telemetri sensor cloud, proteksi firmware mikrokontroler, dan integritas data riset.',
    image: '/images/research/cybersecurity.jpg',
    icon: ShieldCheck,
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-950/80 border-blue-400/40',
    techTags: ['Post-Quantum Crypto', 'End-to-End Security']
  },
  {
    id: 5,
    number: '05',
    code: 'DSP-SIGNAL',
    title: 'Signal Processing & Compressive Sensing',
    description: 'Reduksi derau frekuensi multi-probe, kompresi paket sensor nirkabel berkecepatan tinggi, dan analisis spektral.',
    image: '/images/research/dsp-telemetry.jpg',
    icon: Activity,
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-950/80 border-sky-400/40',
    techTags: ['Wavelet Filter', 'High-Speed Telemetry']
  },
  {
    id: 6,
    number: '06',
    code: 'HEALTH-TECH',
    title: 'Telemedicine & Health Technology',
    description: 'Riset biosensor terintegrasi, pemantauan kualitas nutrisi pangan fungsional, dan telemetri kesehatan modern.',
    image: '/images/research/health-tech.jpg',
    icon: Heart,
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-950/80 border-rose-400/40',
    techTags: ['Bio-Sensors', 'Vital Telemetry']
  },
  {
    id: 7,
    number: '07',
    code: 'SDN-NETWORK',
    title: 'Networking & Software Defined Networks (SDN)',
    description: 'Virtualisasi infrastruktur jaringan lab terdistribusi, routing bandwidth adaptif, dan manajemen throughput QoS.',
    image: '/images/research/sdn-networking.jpg',
    icon: Network,
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-950/80 border-indigo-400/40',
    techTags: ['SDN Controller', 'Virtual Infrastructure']
  },
  {
    id: 8,
    number: '08',
    code: 'GREEN-TECH',
    title: 'Green Technology & Sustainable Systems',
    description: 'Integrasi panel surya mikro agrivoltaik, resirkulasi air tertutup, dan teknologi agrikultur ramah lingkungan.',
    image: '/images/research/sustainable-tech.jpg',
    icon: Zap,
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-950/80 border-amber-400/40',
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
      className="w-full bg-slate-50/50 dark:bg-slate-950/60 py-10 px-0 my-4 sm:my-6 relative overflow-hidden select-none border-t border-b border-slate-200/80 dark:border-slate-800" 
      id="research-interests"
    >
      {/* Soft Ambient Background Accents */}
      <div className="absolute top-0 right-1/4 h-96 w-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 h-96 w-96 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Section Header: Aligned cleanly with the website's main 7xl container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Research Interest
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-medium">
              Fokus kepakaran dan kelompok laboratorium riset terpadu dalam memajukan teknologi pertanian cerdas, otomasi biosistem, dan sistem siber.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center sm:justify-end gap-3.5 shrink-0">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs font-mono shadow-xs">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-500 dark:text-slate-400">
                {String(RESEARCH_ITEMS.length).padStart(2, '0')}
              </span>
            </div>

            <button
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-900 hover:bg-emerald-600 dark:hover:bg-emerald-600 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-600 text-slate-700 dark:text-slate-200 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-slate-200/50 dark:shadow-none cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next slide"
              className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-900 hover:bg-emerald-600 dark:hover:bg-emerald-600 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-600 text-slate-700 dark:text-slate-200 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-slate-200/50 dark:shadow-none cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* FULL-BLEED EDGE-TO-EDGE SLIDER TRACK (With Modern CSS Mask Fade) */}
      <div 
        className="relative w-full overflow-hidden py-3"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 2.5%, black 97.5%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 2.5%, black 97.5%, transparent 100%)'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setIsDragging(false);
        }}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
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
          className={`flex gap-6 overflow-x-auto no-scrollbar py-6 px-4 sm:px-8 lg:px-12 scroll-smooth cursor-grab ${
            isDragging ? 'cursor-grabbing select-none' : ''
          }`}
        >
          {RESEARCH_ITEMS.map((item, idx) => {
            const isActive = idx === activeIndex;
            const IconComp = item.icon;

            return (
              <div
                key={item.id}
                data-slider-card
                onClick={() => {
                  if (!hasMoved) {
                    scrollToIndex(idx);
                  }
                }}
                className={`w-[85vw] max-w-[340px] sm:w-[360px] md:w-[380px] shrink-0 snap-center sm:snap-start group relative overflow-hidden rounded-[2rem] flex flex-col justify-between p-5 sm:p-6 border transition-all duration-500 cursor-pointer bg-white dark:bg-slate-900 ${
                  isActive
                    ? 'border-emerald-500 shadow-2xl shadow-emerald-600/20 scale-[1.01]'
                    : 'border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/80 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-600/10'
                }`}
              >
                {/* Glowing Top Neon Line on Hover */}
                <div className="absolute inset-x-6 top-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                {/* HD DEDICATED IMAGE HEADER */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 mb-4 shadow-sm border border-slate-100 dark:border-slate-800">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10 pointer-events-none" />

                  {/* Floating Badges over the HD Image */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className={`w-10 h-10 rounded-xl ${item.iconBg} border ${item.iconColor} backdrop-blur-md flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                    <span className="font-mono text-xs font-black text-white bg-slate-950/70 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-lg shadow-sm">
                      {item.number}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-md text-emerald-300 text-[11px] font-mono font-bold border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {item.code}
                    </span>
                  </div>
                </div>

                {/* CARD CONTENT: Title & Description */}
                <div className="space-y-2 mb-4 flex-1">
                  <h3 className="font-display text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* CARD BOTTOM: Tech Tags */}
                <div className="pt-3 flex flex-wrap gap-1.5 border-t border-slate-100 dark:border-slate-800">
                  {item.techTags.map((tech, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 group-hover:border-emerald-300/50 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Pagination Pill Indicators */}
      <div className="mt-8 flex items-center justify-center gap-2.5">
        {RESEARCH_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => scrollToIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
              activeIndex === idx 
                ? 'w-10 bg-emerald-600 shadow-md shadow-emerald-600/30' 
                : 'w-2.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
