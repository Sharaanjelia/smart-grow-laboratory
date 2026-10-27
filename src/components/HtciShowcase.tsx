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
  Cpu,
  Download,
  Sparkles,
  FileText,
  Recycle
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
  
  // High-res logo and brochure images
  const logoImage = '/images/htci/htci-logo.png';
  const brochureImage = '/images/htci/htci-poster.jpg';
  const fallbackImage = '/images/htci/htci-logo.png';
  
  const [activeImage, setActiveImage] = useState(logoImage);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Comment Form States
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

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
    <div className="space-y-6 sm:space-y-8 animate-fade-in text-slate-800 dark:text-slate-100 pb-12">
      
      {/* TOP NAVIGATION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3 sm:pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-teal-500 hover:text-teal-700 dark:hover:text-teal-400 transition-all cursor-pointer shadow-2xs"
          id="htci-back-to-projects"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Daftar Proyek</span>
        </button>

        <div className="flex items-center gap-2.5">
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
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c3937] via-[#0d4f4c] to-[#145d58] text-white p-6 sm:p-8 shadow-xl border border-teal-600/30">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-400/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-emerald-300/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/70 border border-teal-400/40 text-teal-300 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Flame className="h-3.5 w-3.5 text-amber-400" />
                Riset Teknologi Termal & IoT • Waste to Energy
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

              <a
                href={logoImage}
                download="htci-official-logo.png"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs backdrop-blur-md border border-white/20 transition-all cursor-pointer"
              >
                <Download className="h-4 w-4 text-amber-300" />
                <span>Unduh Logo HTCI (PNG)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero HTCI Logo Card */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div 
              onClick={() => {
                setActiveImage(logoImage);
                setModalOpen(true);
              }}
              className="group relative cursor-pointer w-full max-w-[270px] bg-white rounded-3xl p-5 shadow-2xl border-2 border-teal-400/50 hover:border-teal-300 hover:scale-[1.03] transition-all duration-300 text-center"
              title="Klik untuk perbesar Logo HTCI resolusi tinggi"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-500 -z-10" />

              <div className="relative aspect-square w-full rounded-2xl bg-white flex items-center justify-center p-3 overflow-hidden">
                <img
                  src={logoImage}
                  alt="Logo Resmi HTCI"
                  className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-teal-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/90 text-white text-[11px] font-bold shadow-lg">
                    <Maximize2 className="h-3.5 w-3.5 text-teal-400" />
                    Perbesar Logo
                  </span>
                </div>
              </div>

              <div className="mt-3 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-slate-800 tracking-wide uppercase">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
                  Logo Resmi Proyek
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5 font-sans leading-snug">
                  Hydrothermal Cogeneration Incinerator
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN SHOWCASE: VERTICAL POSTER & LIVE TELEMETRY SIMULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: HIGH-RES FULL VERTICAL BROCHURE POSTER OR LOGO */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Media Switcher Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-fit">
            <button
              onClick={() => setActiveImage(logoImage)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeImage === logoImage
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Logo Resmi HTCI</span>
            </button>

            <button
              onClick={() => setActiveImage(brochureImage)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeImage === brochureImage
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Brosur Lengkap Reaktor</span>
            </button>
          </div>

          <div className={`relative group rounded-3xl overflow-hidden border-2 border-teal-700/30 shadow-2xl p-2 sm:p-3 transition-colors ${
            activeImage === logoImage ? 'bg-white' : 'bg-slate-950'
          }`}>
            <div className={`relative w-full overflow-hidden rounded-2xl flex items-center justify-center ${
              activeImage === logoImage ? 'bg-white min-h-[380px] p-6' : 'bg-slate-900'
            }`}>
              <img 
                src={activeImage} 
                alt="Visual Resmi Hydrothermal Cogeneration (HTC) Incinerator" 
                className={`w-full object-contain cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.01] ${
                  activeImage === logoImage ? 'max-h-[380px]' : 'h-auto'
                }`}
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


        </div>

        {/* RIGHT: LIVE TELEMETRY SIMULATOR & HIGHLIGHTS */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* 4-Step Brochure Workflow Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest block">
                    Alur Kerja Sistem Sesuai Brosur
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    4 Langkah Pemrosesan Reaktor HTCI
                  </h3>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Standar Brosur
              </span>
            </div>

            {/* Key Brochure Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-teal-600 text-white shrink-0">
                    <TrendingDown className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-teal-800 dark:text-teal-300 font-bold block uppercase tracking-wider">
                      Reduksi Volume
                    </span>
                    <span className="text-base font-extrabold text-teal-950 dark:text-teal-100">
                      80% – 90%
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-teal-800/80 dark:text-teal-300/80 mt-2 leading-relaxed">
                  Meringankan beban transportasi sampah dan menjaga daya tampung TPA.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-emerald-800 dark:text-emerald-300 font-bold block uppercase tracking-wider">
                      Emisi Gas Buang
                    </span>
                    <span className="text-base font-extrabold text-emerald-950 dark:text-emerald-100">
                      Nol Asap Berbahaya
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80 mt-2 leading-relaxed">
                  Sistem tertutup kedap udara tanpa asap hitam dan tanpa racun dioksin.
                </p>
              </div>
            </div>

            {/* 4 Steps Workflow Cards */}
            <div className="space-y-3.5">
              
              {/* Step 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 hover:border-teal-500/50 transition-all flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  1
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Pilah Sampah Organik & Fraksi Inert
                    </h4>
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 bg-slate-200/60 dark:bg-slate-700/60 px-2 py-0.5 rounded">
                      Input Bersih
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Pemisahan awal sampah organik basah/kering dan fraksi inert sebagai bahan baku biomassa sebelum dimasukkan ke dalam ruang reaktor.
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-mono text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-200/60 dark:border-teal-800/50">
                      Sampah Rumah Tangga
                    </span>
                    <span className="text-[10px] font-mono text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-200/60 dark:border-teal-800/50">
                      Limbah Pasar & Organik
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 hover:border-teal-500/50 transition-all flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  2
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Reaktor Hidrotermal Bertekanan Subkritis
                    </h4>
                    <span className="text-[10px] font-mono uppercase font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-0.5 rounded border border-teal-200/60 dark:border-teal-800/50">
                      Reaksi Hijau
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Air panas fase subkritis pada suhu 180°C – 250°C bertindak sebagai pelarut sekaligus reaktan biomassa dalam tabung kedap udara tanpa pembakaran langsung.
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-mono text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200/60 dark:border-amber-800/50">
                      Suhu 180°C - 250°C
                    </span>
                    <span className="text-[10px] font-mono text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200/60 dark:border-amber-800/50">
                      Tekanan 2 - 3 MPa (Subkritis)
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 hover:border-teal-500/50 transition-all flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  3
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Hasil Olahan: Biochar, Bio-oil, & Gas
                    </h4>
                    <span className="text-[10px] font-mono uppercase font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-800/50">
                      Sirkular Ekonomi
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Dikonversi menjadi 3 produk bernilai ekonomi tinggi: Biochar padat pembenah tanah, Bio-oil cair pengganti bahan bakar, dan Gas sintetis energi.
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-1.5 text-center">
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200 block">Biochar</span>
                      <span className="text-[9px] text-emerald-600 font-medium">Pupuk Pertanian</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200 block">Bio-oil</span>
                      <span className="text-[9px] text-amber-600 font-medium">Bahan Bakar</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-mono font-bold text-slate-800 dark:text-slate-200 block">Syngas</span>
                      <span className="text-[9px] text-indigo-600 font-medium">Kogenerasi Energi</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 hover:border-teal-500/50 transition-all flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  4
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Diawasi Otomatis oleh Smart IoT
                    </h4>
                    <span className="text-[10px] font-mono uppercase font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200/60 dark:border-indigo-800/50">
                      Smart Automation
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Seluruh siklus reaksi dikendalikan otomatis menggunakan sensor suhu, tekanan, dan telemetri digital terintegrasi ke sistem pemantauan online.
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200/60 dark:border-indigo-800/50">
                      Sensor Subkritis Terkalibrasi
                    </span>
                    <span className="text-[10px] font-mono text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-200/60 dark:border-indigo-800/50">
                      Telemetri Terintegrasi Cloud
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Direct Platform Link Banner inside Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 text-white flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div>
                <p className="text-xs font-bold text-teal-200">Platform Resmi HTCI Online</p>
                <p className="text-[11px] text-slate-300 font-mono">htci.netlify.app</p>
              </div>
              <a
                href="https://htci.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm hover:scale-105"
              >
                <span>Buka Dashboard HTCI</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>

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
                {activeImage === logoImage ? 'Logo Resmi HTCI (High-Resolution View)' : 'Brosur Resmi HTC Incinerator (High-Resolution View)'}
              </h3>
              <span className="px-2 py-0.5 rounded bg-teal-600/30 border border-teal-500/40 text-teal-300 font-mono text-xs">
                {Math.round(zoomLevel * 100)}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={activeImage}
                download={activeImage === logoImage ? 'htci-official-logo.png' : 'htci-brochure.jpg'}
                className="p-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                title="Unduh File"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Unduh</span>
              </a>
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
