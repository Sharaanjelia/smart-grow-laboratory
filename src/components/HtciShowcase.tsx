import React, { useState, useEffect } from 'react';
import { 
  Maximize2, 
  X, 
  Send, 
  MessageSquare, 
  Flame, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  Gauge,
  Thermometer,
  Wind,
  Layers,
  Zap,
  TrendingDown,
  MapPin,
  Users,
  Building2,
  Calendar,
  Share2,
  ArrowLeft,
  ShieldCheck,
  Check,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sliders,
  Droplets,
  Leaf,
  ExternalLink,
  Truck,
  Phone,
  Cpu
} from 'lucide-react';
import { ProjectItem, Comment } from '../types';

interface HtciShowcaseProps {
  item?: ProjectItem;
  comments?: Comment[];
  onBack: () => void;
  onAddComment?: (name: string, email: string, content: string) => void;
}

export default function HtciShowcase({ 
  item, 
  comments = [], 
  onBack, 
  onAddComment 
}: HtciShowcaseProps) {
  
  // High-res full vertical brochure image (uploaded by user)
  const brochureImage = '/images/htci/htci-poster.jpg';
  const fallbackImage = '/images/htci/htci-poster.jpg';
  
  const [activeImage, setActiveImage] = useState(brochureImage);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Live Subcritical Hydrothermal Telemetry Simulator States
  const [reactorTemp, setReactorTemp] = useState<number>(212.5); // °C (Subcritical water 180 - 250°C)
  const [reactorPressure, setReactorPressure] = useState<number>(2.45); // MPa (24.5 Bar)
  const [volumeReduction, setVolumeReduction] = useState<number>(86.4); // % (80 - 90%)
  const [biocharOutput, setBiocharOutput] = useState<number>(34.8); // kg
  const [bioOilOutput, setBioOilOutput] = useState<number>(18.5); // Liters
  const [syngasOutput, setSyngasOutput] = useState<number>(14.2); // m³
  const [emissionLevel, setEmissionLevel] = useState<number>(0.02); // mg/m³ (Zero hazardous smoke)
  
  // Interactive Reaction Mode
  const [isProcessingCycle, setIsProcessingCycle] = useState<boolean>(true);

  // Comment Form States
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Gentle Real-time Fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      if (isProcessingCycle) {
        setReactorTemp(prev => parseFloat((Math.min(240, Math.max(185, prev + (Math.random() - 0.48) * 1.5))).toFixed(1)));
        setReactorPressure(prev => parseFloat((Math.min(2.8, Math.max(2.1, prev + (Math.random() - 0.5) * 0.05))).toFixed(2)));
        setVolumeReduction(prev => parseFloat((Math.min(89.5, Math.max(82.0, prev + (Math.random() - 0.5) * 0.3))).toFixed(1)));
        setBiocharOutput(prev => parseFloat((prev + (Math.random() > 0.6 ? 0.1 : 0)).toFixed(1)));
        setBioOilOutput(prev => parseFloat((prev + (Math.random() > 0.7 ? 0.1 : 0)).toFixed(1)));
        setSyngasOutput(prev => parseFloat((prev + (Math.random() > 0.6 ? 0.1 : 0)).toFixed(1)));
        setEmissionLevel(parseFloat((0.01 + Math.random() * 0.02).toFixed(3)));
      }
    }, 3200);
    return () => clearInterval(timer);
  }, [isProcessingCycle]);

  const handleToggleCycle = () => {
    if (isProcessingCycle) {
      setIsProcessingCycle(false);
      setReactorTemp(45.0);
      setReactorPressure(0.1);
    } else {
      setIsProcessingCycle(true);
      setReactorTemp(212.5);
      setReactorPressure(2.45);
    }
  };

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      console.warn('Share copy notice:', e);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !textInput.trim()) return;

    if (onAddComment) {
      onAddComment(nameInput, emailInput, textInput);
    }
    setCommentSuccess(true);
    setNameInput('');
    setEmailInput('');
    setTextInput('');
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  const defaultComments: Comment[] = [
    {
      id: 'c_htci1',
      name: 'Tim Dinas Lingkungan Hidup Desa',
      email: 'dlh.desa@sumedangkab.go.id',
      content: 'Teknologi HTCI ini luar biasa solutif! Reduksi volume 80-90% tanpa menghasilkan asap beracun sangat dibutuhkan untuk mengatasi gunungan sampah di TPS desa tanpa membebani TPA kabupaten.',
      timestamp: '2026-09-09 14:20'
    },
    {
      id: 'c_htci2',
      name: 'Dr. Ir. Wahyu Subekti',
      email: 'wahyu.subekti@energy-research.org',
      content: 'Pemanfaatan air subkritis pada suhu 180-250°C untuk memecah selulosa dan biomassa menjadi biochar serta bio-oil merupakan langkah nyata circular economy berbasis sains terapan.',
      timestamp: '2026-09-09 17:45'
    }
  ];

  const allComments = comments.length > 0 ? comments : defaultComments;

  return (
    <div className="space-y-10 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* TOP NAVIGATION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-teal-500 hover:text-teal-700 dark:hover:text-teal-400 transition-all cursor-pointer shadow-2xs"
          id="htci-back-to-projects"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Daftar Proyek</span>
        </button>

        <div className="flex items-center gap-2.5">
          <a
            href="https://htci.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-md hover:scale-105 cursor-pointer"
            id="htci-external-link"
          >
            <span>Kunjungi Website HTCI</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            title="Salin tautan projek ini"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-teal-600" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan'}</span>
          </button>
        </div>
      </div>

      {/* HERO BANNER SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c3937] via-[#0d4f4c] to-[#145d58] text-white p-8 sm:p-12 shadow-xl border border-teal-600/30">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-400/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-emerald-300/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/70 border border-teal-400/40 text-teal-300 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Flame className="h-3.5 w-3.5 text-amber-400" />
              Riset Teknologi Termal & IoT • Waste to Energy
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-mono text-xs font-semibold">
              <Calendar className="h-3.5 w-3.5" />
              9 September 2026
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 font-mono text-xs font-semibold">
              <Zap className="h-3.5 w-3.5 text-amber-300" />
              Reduksi Volume 80-90%
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-sm">
            Hydrothermal Cogeneration (HTC) Incinerator
          </h1>

          <p className="text-base sm:text-lg text-teal-100/90 font-medium leading-relaxed max-w-3xl">
            Teknologi pengolahan sampah yang mengubah sampah organik dan inert menjadi produk bernilai ekonomi — tanpa asap dan tanpa emisi berbahaya seperti pembakaran konvensional.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-4 text-xs text-teal-200 font-mono">
            <span className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-teal-300" />
              Inovasi: <strong>Smart Grow Laboratory</strong> × <strong>Telkom University</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-4 w-4 text-amber-300" />
              Contact Person: <strong>+62 895-3607-99127</strong>
            </span>
          </div>

          {/* Direct CTA to live web app */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <a
              href="https://htci.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-xl transition-all hover:scale-105"
            >
              <span>Buka Platform Sistem HTCI</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <span className="text-xs text-teal-200 font-mono">
              https://htci.netlify.app/
            </span>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN SHOWCASE: VERTICAL POSTER & LIVE TELEMETRY SIMULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: HIGH-RES FULL VERTICAL BROCHURE POSTER */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative group rounded-3xl overflow-hidden border-2 border-teal-700/30 bg-slate-950 shadow-2xl p-2 sm:p-3">
            <div className="relative w-full overflow-hidden rounded-2xl bg-slate-900 flex items-center justify-center">
              <img 
                src={activeImage} 
                alt="Brosur Resmi Hydrothermal Cogeneration (HTC) Incinerator" 
                className="w-full h-auto object-contain cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.01]"
                onClick={() => {
                  setModalOpen(true);
                  setZoomLevel(1);
                }}
                onError={() => {
                  if (activeImage !== fallbackImage) {
                    setActiveImage(fallbackImage);
                  }
                }}
              />

              {/* Floating Zoom Button */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => {
                    setModalOpen(true);
                    setZoomLevel(1);
                  }}
                  className="p-3 rounded-2xl bg-slate-950/85 hover:bg-teal-600 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-xl"
                  title="Perbesar Brosur Resolusi Penuh"
                  id="btn-zoom-htci"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent p-4 sm:p-5 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-teal-300 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-teal-400" />
                    Brosur Resmi HTCI Telkom University
                  </p>
                  <p className="text-[11px] text-slate-300 font-mono">Klik gambar untuk melihat detail infografis resolusi penuh</p>
                </div>
                <button
                  onClick={() => {
                    setModalOpen(true);
                    setZoomLevel(1);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all cursor-pointer shrink-0"
                >
                  Perbesar
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 text-xs text-teal-900 dark:text-teal-200 flex flex-wrap items-center justify-between gap-2">
            <span className="font-semibold">Format Infografis: Brosur Resmi HTC Incinerator Waste to Energy</span>
            <span className="text-[10px] font-mono font-bold bg-teal-200/80 dark:bg-teal-900 text-teal-900 dark:text-teal-200 px-2 py-0.5 rounded">
              Original HD Poster
            </span>
          </div>
        </div>

        {/* RIGHT: LIVE TELEMETRY SIMULATOR & HIGHLIGHTS */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Telemetry Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-5">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-700 dark:text-teal-400">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Live Telemetri Reaktor HTCI
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">Monitoring parameter subkritis & efisiensi konversi</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${
                  isProcessingCycle 
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isProcessingCycle ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                  {isProcessingCycle ? 'REAKSI AKTIF' : 'STANDBY'}
                </span>
              </div>
            </div>

            {/* Volume Reduction Highlight Progress */}
            <div className="space-y-2 p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-800/60">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-teal-900 dark:text-teal-200">
                  <TrendingDown className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                  Tingkat Reduksi Volume Sampah (Brosur: 80–90%)
                </span>
                <span className="font-mono text-sm text-teal-700 dark:text-teal-300 font-extrabold">
                  {volumeReduction}%
                </span>
              </div>

              <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-teal-500 via-emerald-400 to-amber-400 transition-all duration-700"
                  style={{ width: `${volumeReduction}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-0.5">
                <span>Meringankan beban transportasi</span>
                <span>Optimal: 80 - 90%</span>
                <span>Efisiensi TPA Terjaga</span>
              </div>
            </div>

            {/* 4 Sensor Metric Cards */}
            <div className="grid grid-cols-2 gap-3">
              
              {/* Temp Sensor */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 font-semibold flex items-center gap-1">
                  <Thermometer className="h-3.5 w-3.5 text-amber-500" />
                  Suhu Reaktor Subkritis
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-mono font-extrabold text-slate-900 dark:text-white">
                    {reactorTemp}
                  </span>
                  <span className="text-xs font-mono text-slate-500">°C</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block">
                  Range: 180°C - 250°C
                </span>
              </div>

              {/* Pressure Sensor */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 font-semibold flex items-center gap-1">
                  <Gauge className="h-3.5 w-3.5 text-teal-600" />
                  Tekanan Hidrotermal
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-mono font-extrabold text-slate-900 dark:text-white">
                    {reactorPressure}
                  </span>
                  <span className="text-xs font-mono text-slate-500">MPa (24.5 Bar)</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block">
                  Kondisi Fase Subkritis
                </span>
              </div>

              {/* Smoke & Emission */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 font-semibold flex items-center gap-1">
                  <Wind className="h-3.5 w-3.5 text-indigo-500" />
                  Emisi Gas Buang
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                    {emissionLevel}
                  </span>
                  <span className="text-xs font-mono text-slate-500">mg/m³</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-300 font-bold block">
                  Tanpa Asap Berbahaya
                </span>
              </div>

              {/* Energy Recovery */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 font-semibold flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  Output Syngas Bersih
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-mono font-extrabold text-slate-900 dark:text-white">
                    {syngasOutput}
                  </span>
                  <span className="text-xs font-mono text-slate-500">m³ / batch</span>
                </div>
                <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 block">
                  Kogenerasi Energi Mandiri
                </span>
              </div>

            </div>

            {/* Yield Output Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700 space-y-2.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Leaf className="h-4 w-4 text-emerald-600" />
                Hasil Olahan Siklus Saat Ini (Yield Akumulatif)
              </span>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono block">Biochar</span>
                  <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-100">{biocharOutput} kg</span>
                  <span className="text-[9px] text-emerald-600 block mt-0.5">Untuk Pupuk</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono block">Bio-oil</span>
                  <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-100">{bioOilOutput} L</span>
                  <span className="text-[9px] text-amber-600 block mt-0.5">Untuk Bahan Bakar</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 font-mono block">Gas</span>
                  <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-100">{syngasOutput} m³</span>
                  <span className="text-[9px] text-indigo-600 block mt-0.5">Untuk Energi</span>
                </div>
              </div>
            </div>

            {/* Direct Platform Link Banner inside Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-900 to-slate-900 text-white flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-teal-200">Dashboard Resmi HTCI Online</p>
                <p className="text-[10px] text-slate-300 font-mono">https://htci.netlify.app/</p>
              </div>
              <a
                href="https://htci.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
              >
                <span>Buka Web</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Interactive Control Toggle */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Simulasi Operasional Reaktor</p>
                <p className="text-[10px] text-slate-400 font-mono">Uji siklus pemanasan subkritis & recovery</p>
              </div>

              <button
                onClick={handleToggleCycle}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm flex items-center gap-1.5 ${
                  isProcessingCycle 
                    ? 'bg-slate-800 hover:bg-slate-900 text-white' 
                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                }`}
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isProcessingCycle ? 'animate-spin' : ''}`} />
                <span>{isProcessingCycle ? 'Hentikan Siklus' : 'Mulai Reaksi Subkritis'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* 4-STAGE SYSTEM WORKFLOW SINKRON DENGAN BROSUR */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold text-teal-600 uppercase tracking-widest">
            Alur Kerja Sistem Sesuai Brosur
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            4 Langkah Pemrosesan Reaktor HTCI
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Stage 1 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 hover:border-teal-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-mono font-black text-sm flex items-center justify-center">
                1
              </span>
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Input Material</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Pilah Sampah Organik & Inert</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Pemisahan awal sampah organik dan fraksi inert untuk dimasukkan ke dalam ruang reaktor.
            </p>
          </div>

          {/* Stage 2 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 hover:border-teal-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-mono font-black text-sm flex items-center justify-center">
                2
              </span>
              <span className="text-[10px] font-mono uppercase text-teal-600 font-bold">Reaksi Termal</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Reaktor Hidrotermal</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Air panas subkritis bertindak sebagai reaktan sekaligus pelarut biomassa dalam wadah tertutup kedap udara.
            </p>
          </div>

          {/* Stage 3 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 hover:border-teal-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-mono font-black text-sm flex items-center justify-center">
                3
              </span>
              <span className="text-[10px] font-mono uppercase text-emerald-600 font-bold">Yield Produk</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Hasil Olahan Biochar, Bio-oil, Gas</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Menghasilkan biochar untuk pupuk pertanian, bio-oil untuk bahan bakar, dan gas sintetis untuk energi.
            </p>
          </div>

          {/* Stage 4 */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2 hover:border-teal-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-mono font-black text-sm flex items-center justify-center">
                4
              </span>
              <span className="text-[10px] font-mono uppercase text-indigo-600 font-bold">Smart IoT</span>
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Diawasi Otomatis oleh IoT</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Monitoring suhu, tekanan, dan emisi buang secara real-time via telemetri terintegrasi ke cloud.
            </p>
          </div>

        </div>
      </section>

      {/* 6 KEUNGGULAN UTAMA SESUAI BROSUR */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold text-teal-600 uppercase tracking-widest">
            Fitur & Keunggulan Reaktor
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            6 Pilar Keunggulan Teknologi HTC Incinerator
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 shrink-0">
              <Thermometer className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Suhu & Tekanan Subkritis</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Air sebagai reaktan sekaligus pelarut biomassa tanpa pembakaran langsung.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tanpa Asap & Emisi Berbahaya</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Reaktor tertutup, bukan pembakaran langsung — minim asap hitam & jelaga.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 shrink-0">
              <TrendingDown className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Reduksi Volume 80–90%</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Meringankan beban transportasi & tempat pembuangan akhir secara drastis.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 shrink-0">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Biochar, Bio-oil & Gas</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Biochar untuk pupuk, bio-oil untuk bahan bakar, gas untuk energi mandiri.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 shrink-0">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Otomasi IoT</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Pantau suhu, tekanan, dan emisi secara real-time via telemetri nirkabel.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 shrink-0">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Unit Portabel Beroda</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Troli beroda terkunci, mudah dipindah antar titik pengumpulan sampah desa.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4 NILAI TAMBAH SESUAI BROSUR BAWAH */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-mono font-bold text-teal-600 uppercase">
            Solusi Sampah Cerdas untuk Lingkungan
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Solusi untuk Lingkungan yang Lebih Bersih & Mandiri Energi
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center pt-2">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 mx-auto flex items-center justify-center mb-2">
              <Droplets className="h-5 w-5" />
            </div>
            <h5 className="font-bold text-xs text-slate-900 dark:text-white">Ramah Lingkungan</h5>
            <p className="text-[11px] text-slate-500 mt-0.5">Minim asap & emisi berbahaya</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center mb-2">
              <TrendingDown className="h-5 w-5" />
            </div>
            <h5 className="font-bold text-xs text-slate-900 dark:text-white">Produk Bernilai Ekonomi</h5>
            <p className="text-[11px] text-slate-500 mt-0.5">Biochar, bio-oil & gas siap manfaat</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 mx-auto flex items-center justify-center mb-2">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h5 className="font-bold text-xs text-slate-900 dark:text-white">Aman & Andal</h5>
            <p className="text-[11px] text-slate-500 mt-0.5">Sesuai SOP & standar K3</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 mx-auto flex items-center justify-center mb-2">
              <Leaf className="h-5 w-5" />
            </div>
            <h5 className="font-bold text-xs text-slate-900 dark:text-white">Ekonomi Sirkular</h5>
            <p className="text-[11px] text-slate-500 mt-0.5">Sampah jadi sumber daya</p>
          </div>
        </div>
      </section>

      {/* COMMENTS & FEEDBACK */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-teal-600" />
              Tanggapan & Diskusi Proyek HTCI ({allComments.length})
            </h3>
            <p className="text-xs text-slate-500">Komentar publik, mitra desa, dan akademisi terkait implementasi teknologi hidrotermal.</p>
          </div>
        </div>

        {/* Comment Input Form */}
        <form onSubmit={handleFormSubmit} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
          <h4 className="font-bold text-xs text-slate-700 dark:text-slate-200 font-mono uppercase">
            Tinggalkan Masukan atau Pertanyaan:
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Contoh: Dr. Budi Santoso"
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Email / Kontak</label>
              <input 
                type="email" 
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="budi@instansi.ac.id"
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1 text-xs">Pesan Komentar</label>
            <textarea 
              rows={3}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Tuliskan pertanyaan mengenai pengujian emisi, spesifikasi reaktor, atau potensi kemitraan..."
              required
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            {commentSuccess ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Komentar Anda berhasil dikirim!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Kirim Komentar</span>
            </button>
          </div>
        </form>

        {/* Comments Feed List */}
        <div className="space-y-3 pt-2">
          {allComments.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">{c.name}</span>
                <span className="text-[10px] font-mono text-slate-400">{c.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{c.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FULL-SCREEN LIGHTBOX MODAL WITH ZOOM CONTROLS */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 animate-fade-in"
          onClick={() => setModalOpen(false)}
        >
          {/* Modal Header */}
          <div 
            className="w-full max-w-6xl flex items-center justify-between text-white py-2 border-b border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <h3 className="font-bold text-sm sm:text-base">
                Brosur Resmi HTC Incinerator (High-Resolution View)
              </h3>
              <span className="px-2 py-0.5 rounded bg-teal-600/30 border border-teal-500/40 text-teal-300 font-mono text-xs">
                {Math.round(zoomLevel * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel(prev => Math.min(3.0, prev + 0.25))}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer"
                title="Perbesar (Zoom In)"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.25))}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer"
                title="Perkecil (Zoom Out)"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-all cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white transition-all cursor-pointer ml-2"
                title="Tutup (ESC)"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Modal Image Body with Zoom */}
          <div 
            className="w-full flex-1 overflow-auto flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={activeImage} 
              alt="Brosur HTCI Fullscreen" 
              className="max-w-none transition-transform duration-300 object-contain rounded-xl shadow-2xl"
              style={{
                transform: `scale(${zoomLevel})`,
                maxHeight: zoomLevel <= 1 ? '88vh' : 'none',
                maxWidth: zoomLevel <= 1 ? '92vw' : 'none'
              }}
            />
          </div>

          {/* Modal Footer Controls */}
          <div 
            className="text-center text-xs text-slate-400 font-mono py-2"
            onClick={(e) => e.stopPropagation()}
          >
            Gunakan tombol zoom untuk membaca alur teks secara detail • Tekan tombol X atau area luar untuk menutup
          </div>
        </div>
      )}

    </div>
  );
}
