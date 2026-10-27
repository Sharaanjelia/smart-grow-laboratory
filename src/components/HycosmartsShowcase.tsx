import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MessageSquare, 
  Send, 
  Sprout, 
  Droplet, 
  TrendingUp, 
  Zap, 
  Thermometer, 
  Activity, 
  CheckCircle2, 
  Cpu, 
  Gauge, 
  AlertTriangle, 
  Layers, 
  ShieldCheck, 
  Radio, 
  Wind, 
  Smartphone, 
  Globe, 
  Maximize2,
  X
} from 'lucide-react';
import { NewsItem, Comment, ProjectItem } from '../types';

interface HycosmartsShowcaseProps {
  item?: NewsItem | ProjectItem;
  comments?: Comment[];
  onBack: () => void;
  onAddComment?: (name: string, email: string, content: string) => void;
}

export default function HycosmartsShowcase({ 
  item, 
  comments = [], 
  onBack, 
  onAddComment 
}: HycosmartsShowcaseProps) {
  
  // Real images uploaded by user
  const galleryImages = [
    {
      url: '/images/hycosmarts/hycosmarts-logo.png',
      caption: 'Official HYCOSMARTS Identity Logo - Kolaborasi Telkom University, AKAR, & APTI (Asosiasi Pertanian Teknologi Indonesia).',
      title: 'HYCOSMARTS Official Logo & Identity'
    },
    {
      url: '/images/hycosmarts/hycosmarts-3.png',
      caption: '3D Exterior Render of standard repurposed ISO shipping container modified into a cleanroom farm.',
      title: 'Container Modular Exterior'
    },
    {
      url: '/images/hycosmarts/hycosmarts-2.png',
      caption: 'Indoor hydroponic vertical racks illuminated with specialized pink/purple spectrum grow LEDs & climate fans.',
      title: 'Multi-Tier Vertical Rack & Grow LEDs'
    },
    {
      url: '/images/hycosmarts/hycosmarts-5.png',
      caption: '3D Architectural Floorplan showing cleanroom partitioning, nutrient mixing zone, & control desk.',
      title: 'Interior Floorplan Layout'
    },
    {
      url: '/images/hycosmarts/hycosmarts-4.png',
      caption: 'Smart Grow Lab technician assembling frame structure, sensor wiring, and hydroponic tubing.',
      title: 'Hardware & Sensor Integration'
    },
    {
      url: '/images/hycosmarts/hycosmarts-1.png',
      caption: 'Lab researcher monitoring real-time container microclimate and hydroponic telemetry at control desk.',
      title: 'Real-Time Operator Station'
    }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  // Comment Form States
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !textInput.trim()) return;
    if (onAddComment) {
      onAddComment(nameInput, emailInput || 'anon@smartgrow.id', textInput);
    }
    setNameInput('');
    setEmailInput('');
    setTextInput('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8 animate-fade-in pb-12">
      
      {/* Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 sm:pb-4">
        <button 
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 shadow-sm hover:shadow hover:border-emerald-500 cursor-pointer self-start"
        >
          <ChevronLeft className="h-4 w-4 text-emerald-600 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Hub Utama</span>
        </button>
      </div>

      {/* Hero Showcase Title Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-10 rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-teal-500"></span>
            <span className="font-mono text-xs font-extrabold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
              FLAGSHIP INNOVATION // HYCOSMARTS
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
            <div 
              onClick={() => setModalImage('/images/hycosmarts/hycosmarts-logo.png')}
              className="h-20 w-36 sm:h-24 sm:w-48 bg-white rounded-2xl p-2.5 border border-red-200 shadow-md flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 transition-transform"
              title="Klik untuk memperbesar Logo HYCOSMARTS"
            >
              <img 
                src="/images/hycosmarts/hycosmarts-logo.png" 
                alt="HYCOSMARTS Official Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                HYCOSMARTS
              </h1>
              <p className="text-base sm:text-lg font-sans font-bold text-red-600 dark:text-red-400 mt-1">
                Smart Container-Based Intelligent Farming System
              </p>
            </div>
          </div>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans pt-2">
            HYCOSMARTS is a smart container-based intelligent farming system designed to manage indoor hydroponic farming automatically, efficiently, and sustainably. The system is equipped with various important sensors such as pH, TDS, DO, EC, and ultrasonic sensors to monitor water quality, nutrient availability, and growing conditions in real time.
          </p>
        </div>

        {/* Highlight Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-emerald-500/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                
                Smart Farming Specs
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                v2.4 Active
              </span>
            </div>
            
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                <span className="text-slate-300">Form Factor:</span>
                <span className="font-bold text-white">20ft / 40ft ISO Shipping Container</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                <span className="text-slate-300">Telemetry Nodes:</span>
                <span className="font-bold text-emerald-400">pH, TDS, DO, EC, Ultrasonic</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                <span className="text-slate-300">Control System:</span>
                <span className="font-bold text-white">Edge AI + Web/Mobile Apps</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Target Region:</span>
                <span className="font-bold text-teal-300">3T & Urban Microclimates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery & Solusi Mandiri Daerah 3T (Side-by-Side Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Segi Empat (Square) Interactive Photo Gallery */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              Galeri Dokumentasi & Arsitektur
            </h3>
            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              {activeImageIndex + 1} / {galleryImages.length}
            </span>
          </div>

          {/* Square Photo Carousel Container */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl group select-none">
            {/* Main Photo (Click to zoom in lightbox modal) */}
            <div 
              onClick={() => setModalImage(galleryImages[activeImageIndex].url)}
              className="w-full h-full cursor-pointer relative"
              title="Klik untuk memperbesar foto"
            >
              <img 
                key={activeImageIndex}
                src={galleryImages[activeImageIndex].url} 
                alt={galleryImages[activeImageIndex].title} 
                className={`w-full h-full transition-all duration-500 animate-fade-in group-hover:scale-105 ${
                  galleryImages[activeImageIndex].url.includes('logo')
                    ? 'object-contain p-8 sm:p-12 bg-white'
                    : 'object-cover'
                }`} 
              />
              
              {/* Top-Right Expand Lightbox Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalImage(galleryImages[activeImageIndex].url);
                }}
                aria-label="Perbesar gambar"
                className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-slate-950/60 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer z-10"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

            </div>

            {/* Left Navigation Chevron Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Foto Sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer z-10"
            >
              <ChevronLeft className="w-5 h-5 -ml-0.5" />
            </button>

            {/* Right Navigation Chevron Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Foto Berikutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-emerald-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer z-10"
            >
              <ChevronRight className="w-5 h-5 -mr-0.5" />
            </button>

            {/* Interactive Navigation Dots */}
            <div className="absolute bottom-3.5 inset-x-0 flex items-center justify-center gap-2 z-10 pointer-events-auto">
              <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 flex items-center gap-2 shadow-lg">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImageIndex(idx);
                    }}
                    aria-label={`Foto ke-${idx + 1}`}
                    className={`transition-all duration-300 cursor-pointer rounded-full ${
                      activeImageIndex === idx
                        ? 'w-6 h-2 bg-emerald-400 shadow-md shadow-emerald-400/50'
                        : 'w-2 h-2 bg-white/40 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Clean Description Card Below Image */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <p className="text-slate-900 dark:text-white text-sm font-bold font-display">
              {galleryImages[activeImageIndex].title}
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed font-sans">
              {galleryImages[activeImageIndex].caption}
            </p>
          </div>

          {/* Quick Thumbnail Strip */}
          <div className="grid grid-cols-5 gap-2 pt-1">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                title={img.title}
                className={`aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-emerald-500 ring-2 ring-emerald-500/30 scale-102 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className={`w-full h-full ${img.url.includes('logo') ? 'object-contain p-1 bg-white' : 'object-cover'}`} 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Solusi Mandiri Daerah 3T Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Solusi Mandiri Daerah 3T
                </h3>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  TERDEPAN, TERLUAR, DAN TERTINGGAL (3T) READY
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Sistem kontainer cerdas HYCOSMARTS dirancang secara mandiri dan portabel sehingga sangat siap diimplementasikan di wilayah 3T. Tanpa memerlukan lahan subur tradisional, fasilitas ini dapat ditempatkan di pulau terluar, daerah minim sumber air, hingga pos terpencil untuk menjamin ketahanan pangan berkelanjutan.
            </p>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center space-y-0.5">
                <p className="text-lg font-black font-display text-emerald-600 dark:text-emerald-400">95%</p>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight">Hemat Air (Tertutup)</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center space-y-0.5">
                <p className="text-lg font-black font-display text-teal-600 dark:text-teal-400">100%</p>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight">Off-Grid Solar Ready</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center space-y-0.5">
                <p className="text-lg font-black font-display text-cyan-600 dark:text-cyan-400">365 Hari</p>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight">Panen Tanpa Musim</p>
              </div>
            </div>

            {/* Feature Points */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Hemat Energi & Mandiri:</strong> Kompatibel penuh dengan instalasi Solar PV Panel serta battery storage off-grid.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Kemandirian Pangan Lokal:</strong> Menghasilkan sayuran segar bergizi sepanjang tahun tanpa bergantung pasokan logistik laut/udara.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Sirkulasi Air Tertutup:</strong> Sistem sirkulasi air presisi meminimalkan penguapan dan menghemat kebutuhan air drastis.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Modular & Tahan Cuaca Ekstrem:</strong> Bodi kontainer terisolasi termal menjaga iklim mikro optimal terlepas dari cuaca luar.</span>
              </div>
            </div>
          </div>

          {/* Bottom Highlight Callout */}
          <div className="pt-2">
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
              <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Inovasi terdepan untuk kedaulatan pangan wilayah perbatasan & kepulauan nusantara.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Multi-Platform Dashboard & Mobile Integration Showcase Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white">
                  Web Dashboard & Mobile App Integration
                </h3>
                <p className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                  REAL-TIME CROSS-PLATFORM CONTROL
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              HYCOSMARTS terhubung secara langsung dengan Dashboard berbasis Web dan Aplikasi Mobile Android/iOS. Pengelola laboratorium atau petani modern dapat secara presisi mengatur jadwal pemupukan, memantau grafik sensor historis, dan menerima push notification instan kapan saja dan di mana saja.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">
                MQTT Protocol
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">
                LoRaWAN / 4G LTE
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">
                Firebase Cloud Sync
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <Cpu className="w-4 h-4" />
                </div>
                <span>AI Presisi & Auto Dosing</span>
              </div>
              <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Penyesuaian kebutuhan nutrisi tanaman (pH & TDS) loop tertutup secara otomatis berbasis kecerdasan buatan.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Early Warning System</span>
              </div>
              <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Notifikasi instan ancaman kegagalan panen, kelainan suhu, atau penurunan oksigen terlarut via Push Notif & SMS.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-500">
                  <Activity className="w-4 h-4" />
                </div>
                <span>Telemetri & Analitik 24/7</span>
              </div>
              <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Visualisasi grafik fluktuasi mikroklimat historis untuk kebutuhan validasi dan publikasi riset ilmiah.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                  <Wind className="w-4 h-4" />
                </div>
                <span>Aktuator Terkendali Jauh</span>
              </div>
              <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Kendali saklar ventilasi, pompa aerasi, dan spektrum lampu LED langsung dari layar smartphone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Discussion & Comments Section */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-emerald-600" />
            Diskusi & Diskusi Riset HYCOSMARTS ({comments.length})
          </h3>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Tinggalkan Pertanyaan atau Komentar Riset
          </h4>

          {commentSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              Komentar Anda berhasil dikirim dan ditambahkan ke diskusi!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Nama Lengkap" 
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              required
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input 
              type="email" 
              placeholder="Alamat Email (opsional)" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <textarea
            rows={3}
            placeholder="Tuliskan apresiasi, masukan sensor, atau pertanyaan teknis mengenai HYCOSMARTS..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Komentar</span>
          </button>
        </form>

        {/* List of comments */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-xs text-slate-400 italic">Belum ada komentar. Jadilah yang pertama berdiskusi mengenai HYCOSMARTS!</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{c.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{c.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {c.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Image Zoom Lightbox Modal */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full overflow-hidden rounded-3xl border border-white/20 bg-slate-900 shadow-2xl space-y-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 p-3 rounded-full bg-slate-950/80 text-white hover:bg-red-600 transition-all z-20 cursor-pointer border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className={`relative aspect-[16/9] w-full flex items-center justify-center overflow-hidden ${modalImage.includes('logo') ? 'bg-white p-6' : 'bg-slate-950'}`}>
              <img src={modalImage} alt="Expanded View" className="w-full h-full object-contain max-h-[75vh]" />
            </div>

            {(() => {
              const matched = galleryImages.find(g => g.url === modalImage);
              if (!matched) return null;
              return (
                <div className="p-5 bg-slate-900 text-white border-t border-slate-800 space-y-1">
                  <h4 className="font-display text-lg font-bold text-emerald-400">{matched.title}</h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{matched.caption}</p>
                </div>
              );
            })()}
          </div>
        </div>
      )}

    </div>
  );
}
