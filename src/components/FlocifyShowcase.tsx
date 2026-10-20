import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Send, 
  MessageSquare, 
  Droplet, 
  Cpu, 
  Brain, 
  Activity, 
  AlertTriangle, 
  Thermometer, 
  CheckCircle2,
  RefreshCw,
  Layers,
  Fish,
  Share2,
  ExternalLink,
  ArrowLeft,
  Check,
  Eye,
  Radio,
  Waves,
  Gauge,
  Settings2,
  Database,
  BarChart3,
  Shield,
  Wifi,
  Zap,
  GitBranch,
  FlaskConical,
  Smartphone,
  Wind,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { NewsItem, Comment } from '../types';

interface FlocifyShowcaseProps {
  item?: NewsItem;
  comments?: Comment[];
  onBack: () => void;
  onAddComment?: (name: string, email: string, content: string) => void;
}

export default function FlocifyShowcase({ 
  item, 
  comments = [], 
  onBack, 
  onAddComment 
}: FlocifyShowcaseProps) {
  
  // 3D Render images uploaded by user for FLOCIFY (HD 3D Renders)
  const galleryImages = [
    {
      url: '/images/flocify/flocify-biofloc-tank-iso.jpg',
      caption: 'Model arsitektur 3D isometrik unit tank biofloc FLOCIFY dengan hopper dosing sentral, aerasi vortex mikrobiologi, dan rangka jaring baja sirkular.',
      title: 'Isometric 3D Biofloc Tank Unit'
    },
    {
      url: '/images/flocify/flocify-topview-tank.jpg',
      caption: 'Pandangan atas (top-down view) sirkulasi air biofloc, vortex aerator mixer di pusat tangki, dan susunan sensor multi-probe terkalibrasi.',
      title: 'Top-Down Circulation & Aerator View'
    },
    {
      url: '/images/flocify/flocify-perspective-tank.jpg',
      caption: 'Sudut pandang perspektif unit filtrasi bertingkat, bypass drain endapan lumpur flok, dan aktuator dosing otomatis berbasis Deep Learning.',
      title: 'Perspective Tank & Automated Dosing'
    }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

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

  // Default comments for FLOCIFY
  const defaultComments: Comment[] = [
    {
      id: 'c_flocify1',
      name: 'Dr. Ahmad Fauzi (Dosen Akuakultur, Telkom University)',
      email: 'ahmad.fauzi@telkomuniversity.ac.id',
      content: 'Integrasi Deep Learning untuk prediksi spike amonia di biofloc sangat menarik. Dengan ResNet/LSTM yang menganalisis multi-parameter sensor secara kontinu, mortalitas ikan bisa ditekan signifikan dibanding metode threshold konvensional.',
      timestamp: '2026-09-20 09:30'
    },
    {
      id: 'c_flocify2',
      name: 'Rina Susanti (Pembudidaya Ikan Lele Biofloc, Garut)',
      email: 'rina.biofloc@gmail.com',
      content: 'Sebagai pembudidaya kecil, saya sangat terbantu dengan adanya monitoring otomatis. Sebelumnya harus cek air tiap 2 jam secara manual. Dengan Flocify, saya bisa tahu kondisi kolam langsung dari HP dan dosing probiotik jalan otomatis.',
      timestamp: '2026-09-21 14:15'
    },
    {
      id: 'c_flocify3',
      name: 'Budi Hartono (Mahasiswa Riset IoT, S2 Informatika)',
      email: 'budi.hartono@student.telkomuniversity.ac.id',
      content: 'Arsitektur modular tank Flocify yang bisa di-scale up sangat menjanjikan. Kombinasi LoRaWAN untuk komunikasi nirkabel antar-node sensor dengan edge computing di setiap kolam membuat sistem ini cocok untuk tambak multi-kolam di daerah pedesaan.',
      timestamp: '2026-09-22 11:45'
    }
  ];

  const allComments = comments.length > 0 ? comments : defaultComments;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-20 animate-fade-in space-y-12">
      
      {/* Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <button 
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm hover:shadow hover:border-indigo-500 cursor-pointer self-start"
        >
          <ChevronLeft className="h-4 w-4 text-indigo-600 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Hub Utama</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all cursor-pointer border border-slate-200 dark:border-slate-700 shadow-xs"
            title="Salin tautan projek ini"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-indigo-600" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan'}</span>
          </button>
        </div>
      </div>

      {/* Hero Showcase Title Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"></span>
            <span className="font-mono text-xs font-extrabold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
              FLAGSHIP INNOVATION // FLOCIFY
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            FLOCIFY
          </h1>
          <p className="text-lg font-sans font-bold text-indigo-600 dark:text-indigo-400">
            Smart Biofloc Aquaculture Monitoring & Deep Learning Optimization
          </p>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans pt-2">
            FLOCIFY adalah sistem monitoring dan optimasi budidaya akuakultur biofloc cerdas berbasis IoT dan Deep Learning (ResNet + LSTM). Platform ini dirancang untuk memantau kualitas air secara real-time, mendeteksi risiko amonia sebelum mencapai ambang kritis, mengotomasi penambahan karbon & probiotik, serta menjaga rasio C:N kolam secara presisi.
          </p>
        </div>

        {/* Highlight Card matching HYCOSMARTS Specs */}
        <div className="lg:col-span-4 bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-indigo-500/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                Biofloc AI Specs
              </span>
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-400/30">
                v2.4 Active
              </span>
            </div>
            
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                <span className="text-slate-300">Form Factor:</span>
                <span className="font-bold text-white">Modular Round Tank (Dia. 3m - 5m)</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                <span className="text-slate-300">Telemetry Nodes:</span>
                <span className="font-bold text-cyan-400">DO, pH, ORP, Temp, NH3 (Amonia)</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                <span className="text-slate-300">AI Deep Learning:</span>
                <span className="font-bold text-white">ResNet + LSTM Anomaly Detection</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Target Species:</span>
                <span className="font-bold text-indigo-300">Lele, Nila, Udang Vaname</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Gallery & Solusi Closed-Loop (Side-by-Side Layout matching HYCOSMARTS) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Column: Segi Empat (Square) Interactive Photo Gallery */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Galeri Dokumentasi & Arsitektur 3D
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
                className="w-full h-full object-cover transition-all duration-500 animate-fade-in group-hover:scale-105" 
              />
              
              {/* Top-Right Expand Lightbox Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalImage(galleryImages[activeImageIndex].url);
                }}
                aria-label="Perbesar gambar"
                className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-slate-950/60 hover:bg-indigo-600 text-white backdrop-blur-md border border-white/20 transition-all opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer z-10"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Title & Caption Bottom Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 pt-16 pb-12 px-5 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-transparent pointer-events-none">
                <p className="text-white text-sm sm:text-base font-bold font-display line-clamp-1">
                  {galleryImages[activeImageIndex].title}
                </p>
                <p className="text-slate-300 text-xs line-clamp-2 mt-1 font-sans">
                  {galleryImages[activeImageIndex].caption}
                </p>
              </div>
            </div>

            {/* Left Navigation Chevron Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Foto Sebelumnya"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-indigo-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer z-10"
            >
              <ChevronLeft className="w-5 h-5 -ml-0.5" />
            </button>

            {/* Right Navigation Chevron Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Foto Berikutnya"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-950/70 hover:bg-indigo-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-110 shadow-lg cursor-pointer z-10"
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
                        ? 'w-6 h-2 bg-indigo-400 shadow-md shadow-indigo-400/50'
                        : 'w-2 h-2 bg-white/40 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Thumbnail Strip matching HYCOSMARTS */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                title={img.title}
                className={`aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer relative group ${
                  activeImageIndex === idx
                    ? 'border-indigo-500 ring-2 ring-indigo-500/30 scale-[1.02] shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Solusi Closed-Loop Akuakultur Biofloc Card matching HYCOSMARTS */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/15 to-blue-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
                <Waves className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Solusi Closed-Loop Akuakultur
                </h3>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  ZERO WATER EXCHANGE & HIGH DENSITY READY
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Sistem FLOCIFY dirancang untuk menciptakan ekosistem budidaya biofloc mandiri dan berkelanjutan. Dengan memadukan sensor multi-parameter presisi tinggi dan model kecerdasan buatan, kolam dapat beroperasi tanpa pergantian air berulang (zero water exchange), sekaligus mendaur ulang limbah nitrogen beracun menjadi biomassa protein pakan alami.
            </p>

            {/* Quick Metrics Badges */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center space-y-0.5">
                <p className="text-lg font-black font-display text-indigo-600 dark:text-indigo-400">96.8%</p>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight">Survival Rate (SR)</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center space-y-0.5">
                <p className="text-lg font-black font-display text-cyan-600 dark:text-cyan-400">+28.4%</p>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight">Efisiensi Pakan (FCR)</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center space-y-0.5">
                <p className="text-lg font-black font-display text-emerald-600 dark:text-emerald-400">94.2%</p>
                <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight">Akurasi Prediksi AI</p>
              </div>
            </div>

            {/* Feature Points */}
            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Sirkulasi Vortex Aerasi:</strong> Distribusi oksigen merata dan suspensi flok mikroba konstan tanpa pengendapan lumpur anaerobik.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Dosing Karbon & Probiotik Cerdas:</strong> Penambahan molase otomatis menjaga rasio C:N optimal (15:1 hingga 20:1) sesuai rekomendasi AI.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Zero Water Exchange:</strong> Menjaga kestabilan mikrobiologi kolam tanpa boros air, menghemat konsumsi air hingga 90%.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Early Warning System Amonia:</strong> Peringatan dini lonjakan amonia dan penurunan DO melalui notifikasi push instan.</span>
              </div>
            </div>
          </div>

          {/* Bottom Highlight Callout */}
          <div className="pt-2">
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-800 dark:text-indigo-300 font-medium">
              <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Inovasi terdepan untuk modernisasi akuakultur biofloc presisi ramah lingkungan.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Multi-Platform Dashboard & Mobile Integration Showcase Card matching HYCOSMARTS */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white">
                  Web Dashboard & Mobile App Integration
                </h3>
                <p className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  REAL-TIME CROSS-PLATFORM CONTROL
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              FLOCIFY terhubung secara langsung dengan Dashboard berbasis Web dan Aplikasi Mobile Android/iOS. Pembudidaya atau peneliti dapat memantau telemetri kolam, mengatur jadwal aerator vortex, dan menerima push notification ancaman amonia 24/7.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">
                MQTT Protocol
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">
                LoRaWAN Telemetry
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">
                Firebase Cloud Sync
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                  <Cpu className="w-4 h-4" />
                </div>
                <span>AI Presisi & Auto Dosing</span>
              </div>
              <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Penyesuaian kebutuhan molase karbon & probiotik loop tertutup secara otomatis berbasis estimasi rasio C:N.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Early Warning System Amonia</span>
              </div>
              <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Deteksi lonjakan gas amonia beracun (NH3) dan drop oksigen terlarut sebelum membahayakan mortalitas ikan.
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
                Visualisasi data kontinu fluktuasi parameter air untuk validasi pertumbuhan bobot ikan dan efisiensi pakan FCR.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                  <Wind className="w-4 h-4" />
                </div>
                <span>Aktuator Aerator Terkendali</span>
              </div>
              <p className="text-[12px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Kendali saklar aerator vortex mikroba, pompa drain sludge, dan dosing hoppers langsung dari HP/Web.
              </p>
            </div>
          </div>
        </div>
      </div>



      {/* ========================================================================= */}
      {/* 5 PILAR TEKNOLOGI FLOCIFY */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">Architecture Core</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            5 Pilar Teknologi Ekosistem FLOCIFY
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Membangun rantai akuakultur biofloc cerdas, mulai dari sensor air multi-parameter hingga prediksi AI dan otomasi dosing probiotik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          
          {/* Pilar 1 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-indigo-500/50 transition-all hover:scale-[1.02] flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Gauge className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase">Pilar 01</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                Sensor IoT Multi-Parameter
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Monitoring kontinu DO, pH, suhu, amonia, dan densitas flok menggunakan probe sensor terkalibrasikan.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-indigo-700 dark:text-indigo-400 font-mono font-medium">
              ✓ 5 Parameter Sensor Real-Time
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-cyan-500/50 transition-all hover:scale-[1.02] flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Brain className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase">Pilar 02</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                Deep Learning Analytics
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                ResNet & LSTM neural network untuk pattern recognition, anomaly detection, dan prediksi risiko amonia.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-cyan-700 dark:text-cyan-400 font-mono font-medium">
              ✓ Predictive AI Engine
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 transition-all hover:scale-[1.02] flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <RefreshCw className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Pilar 03</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                Automated Dosing System
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Otomasi penambahan molase karbon & probiotik berdasarkan rekomendasi AI untuk menjaga rasio C:N optimal.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono font-medium">
              ✓ C:N Ratio Auto-Tuning
            </div>
          </div>

          {/* Pilar 4 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-amber-500/50 transition-all hover:scale-[1.02] flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <BarChart3 className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase">Pilar 04</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                Dashboard Monitoring Web
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Antarmuka web real-time untuk visualisasi data sensor, riwayat telemetri, dan kontrol jarak jauh aktuator.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-amber-700 dark:text-amber-400 font-mono font-medium">
              ✓ Real-Time Web Interface
            </div>
          </div>

          {/* Pilar 5 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-violet-500/50 transition-all hover:scale-[1.02] flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
                <Wifi className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-violet-600 dark:text-violet-400 font-bold uppercase">Pilar 05</span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                LoRaWAN Edge Computing
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Komunikasi nirkabel jarak jauh antar-node sensor dengan edge computing di tiap kolam untuk multi-tank farming.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-violet-700 dark:text-violet-400 font-mono font-medium">
              ✓ Multi-Tank Scalable
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SYSTEM SPECIFICATIONS CARD */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-br from-indigo-950 via-slate-950 to-blue-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-indigo-500/30">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">

                FLOCIFY Technical Specifications
              </span>
              <h2 className="text-2xl font-black text-white">Spesifikasi Teknis Sistem</h2>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
              AI Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-slate-400 text-[10px] font-mono uppercase">Model AI</span>
              <div className="font-mono font-bold text-indigo-300">ResNet / LSTM Deep Learning</div>
              <p className="text-slate-400 text-[10px]">Time-series prediction & anomaly detection neural networks</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-slate-400 text-[10px] font-mono uppercase">Sensor Utama</span>
              <div className="font-mono font-bold text-cyan-300">DO, pH, Temp, NH3/NH4+, Floc</div>
              <p className="text-slate-400 text-[10px]">Multi-probe calibrated sensor array terintegrasi</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-slate-400 text-[10px] font-mono uppercase">Otomatisasi</span>
              <div className="font-mono font-bold text-emerald-400">Molase & Probiotic Dosing</div>
              <p className="text-slate-400 text-[10px]">AI-driven C:N ratio tuning & automated control</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-slate-400 text-[10px] font-mono uppercase">Tipe Kolam</span>
              <div className="font-mono font-bold text-white">Biofloc Round Tank Modular</div>
              <p className="text-slate-400 text-[10px]">Scalable multi-tank architecture via LoRaWAN mesh</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-200 leading-relaxed font-sans">
            <strong>Efisiensi Pakan FCR:</strong> Deep Learning Flocify mengoptimalkan konsumsi biofloc bakteri sehingga menekan biaya pakan pelet hingga 30%. Densitas flok optimal dijaga antara 15–25 mL/L untuk performa biokonversi maksimal.
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TEKNOLOGI & INSTRUMEN YANG DIGUNAKAN */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">Tech Specifications</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Teknologi & Instrumen yang Digunakan
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase">Frontend & Dashboard</span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">React 19 & TypeScript</h4>
            <p className="text-xs text-slate-500">Dashboard monitoring real-time ditenagai oleh Vite bundler dengan komponen modular.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase">AI & Machine Learning</span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">TensorFlow / PyTorch</h4>
            <p className="text-xs text-slate-500">Deep Learning ResNet & LSTM untuk prediksi anomali dan pattern recognition kualitas air.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Backend & Cloud</span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Firebase & Node.js</h4>
            <p className="text-xs text-slate-500">Firestore Realtime Database, Cloud Functions, dan MQTT broker untuk telemetri IoT.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase">IoT & Hardware</span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">ESP32 & LoRaWAN SX1276</h4>
            <p className="text-xs text-slate-500">Mikrokontroler sensor node dengan komunikasi nirkabel jarak jauh dan edge computing.</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DISCUSSION & COMMENTS SECTION */}
      {/* ========================================================================= */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Tanggapan & Diskusi Riset FLOCIFY ({allComments.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Comments List */}
          <div className="lg:col-span-7 space-y-4">
            {allComments.map((comment) => (
              <div 
                key={comment.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-300 dark:border-indigo-500/40 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-xs">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{comment.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400">{comment.email}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{comment.timestamp}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Form to add comment */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Kirim Pertanyaan atau Masukan Riset Biofloc AI
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Berikan tanggapan teknis mengenai implementasi sensor, model Deep Learning, atau potensi kolaborasi riset FLOCIFY.
            </p>

            {commentSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Komentar berhasil dikirim dan tersimpan!</span>
              </div>
            )}

            <form onSubmit={handleSubmitComment} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-mono text-slate-600 dark:text-slate-300 mb-1">Nama Lengkap / Instansi</label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Contoh: Dosen Akuakultur / Pembudidaya Ikan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-600 dark:text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="nama@email.com (opsional)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-600 dark:text-slate-300 mb-1">Pesan / Masukan</label>
                <textarea
                  required
                  rows={4}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Tuliskan apresiasi atau pertanyaan teknis mengenai teknologi biofloc Deep Learning FLOCIFY..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Kirim Komentar</span>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-800 via-indigo-700 to-blue-800 text-white p-8 sm:p-12 text-center space-y-6 shadow-xl">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-60 h-60 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-indigo-200 uppercase">Smart Aquaculture Innovation</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Revolusi Budidaya Biofloc dengan Kecerdasan Buatan
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
            FLOCIFY menghadirkan solusi digital transformatif bagi pembudidaya ikan Indonesia. Dari monitoring air otomatis hingga prediksi AI real-time — jadikan tambak biofloc Anda lebih produktif dan berkelanjutan.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => {
              const el = document.getElementById('telemetry-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-extrabold tracking-wider uppercase shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Coba Live AI Simulator</span>
            <Brain className="h-4 w-4 text-slate-950" />
          </button>

          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold border border-white/25 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Hub Laboratorium</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FULL-SCREEN IMAGE MODAL */}
      {/* ========================================================================= */}
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
              className="absolute top-4 right-4 p-3 rounded-full bg-slate-950/80 text-white hover:bg-rose-600 transition-all z-20 cursor-pointer border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="relative aspect-[16/9] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
              <img src={modalImage} alt="Expanded View" className="w-full h-full object-contain max-h-[75vh]" />
            </div>

            {(() => {
              const matched = galleryImages.find(g => g.url === modalImage);
              if (!matched) return null;
              return (
                <div className="p-5 bg-slate-900 text-white border-t border-slate-800 space-y-1">
                  <h4 className="font-display text-lg font-bold text-indigo-400">{matched.title}</h4>
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
