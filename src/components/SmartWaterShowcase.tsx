import React, { useState } from 'react';
import { 
  Maximize2, 
  X, 
  Send, 
  MessageSquare, 
  Droplets, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  Camera,
  QrCode,
  Smartphone,
  Download,
  Share2,
  ArrowLeft,
  ShieldCheck,
  Check,
  ExternalLink,
  MapPin,
  Clock,
  FileCheck,
  TrendingDown,
  Database,
  BarChart3,
  DollarSign,
  Users
} from 'lucide-react';
import { ProjectItem, Comment } from '../types';

interface SmartWaterShowcaseProps {
  item?: ProjectItem;
  comments?: Comment[];
  onBack: () => void;
  onAddComment?: (name: string, email: string, content: string) => void;
}

export default function SmartWaterShowcase({ 
  item, 
  comments = [], 
  onBack, 
  onAddComment 
}: SmartWaterShowcaseProps) {
  
  const appImageUrl = '/images/smart-water/smart-water-app.jpg';
  const downloadUrl = 'https://drive.google.com/file/d/1NNfvmh80qbw0Gg1aB26Eod8DEh-26mh7/view?usp=sharing';

  const [modalOpen, setModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // AI-OCR Simulation States
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [meterValue, setMeterValue] = useState(428.7);
  const [prevMeterValue] = useState(404.5);
  const [cubicRate] = useState(4000); // Rp 4.000 / m³

  // Comment Form States
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScanStep('scanning');
    setTimeout(() => {
      setIsScanning(false);
      setScanStep('success');
      setMeterValue(prev => parseFloat((prev + Math.floor(Math.random() * 5 + 1) * 0.1).toFixed(1)));
    }, 1800);
  };

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (e) {
      console.warn('Share notice:', e);
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

  const usageCubic = parseFloat((meterValue - prevMeterValue).toFixed(1));
  const estimatedBill = Math.round(usageCubic * cubicRate);

  const defaultComments: Comment[] = [
    {
      id: 'c_water1',
      name: 'Ir. Hendra Kusuma',
      email: 'hendra.kusuma@perumda-air.co.id',
      content: 'Implementasi AI-OCR untuk meter air ini sangat memangkas biaya operasional petugas lapangan PDAM. Akurasi pembacaan foto disertai GPS membuat proses audit tagihan jauh lebih transparan.',
      timestamp: '2026-09-09 10:15'
    },
    {
      id: 'c_water2',
      name: 'Pelanggan Perumda Tirta',
      email: 'pelanggan@tirta.id',
      content: 'Aplikasinya simpel dan praktis. Tinggal foto meteran air tiap akhir bulan, tagihan langsung otomatis keluar tanpa harus tunggu petugas datang.',
      timestamp: '2026-09-09 16:30'
    }
  ];

  const allComments = comments.length > 0 ? comments : defaultComments;

  return (
    <div className="space-y-10 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* TOP NAVIGATION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-sky-500 hover:text-sky-700 dark:hover:text-sky-400 transition-all cursor-pointer shadow-2xs"
          id="smart-water-back-to-projects"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Daftar Proyek</span>
        </button>

        <div className="flex items-center gap-2.5">
          <a
            href={downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all shadow-md hover:scale-105 cursor-pointer"
            id="smart-water-download-btn"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Unduh Aplikasi Smart Water</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            title="Salin tautan projek ini"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-sky-600" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan'}</span>
          </button>
        </div>
      </div>

      {/* HERO BANNER SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0369a1] via-[#0284c7] to-[#0c4a6e] text-white p-8 sm:p-12 shadow-xl border border-sky-500/30">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-sky-300/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-teal-300/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/70 border border-sky-400/40 text-sky-200 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Droplets className="h-3.5 w-3.5 text-cyan-300" />
              Smart Utility & AI • Perumda Air Minum (PDAM)
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-mono text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              AI-OCR Self Meter Reading
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/30 text-emerald-200 font-mono text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
              Validasi Bukti Foto & GPS
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-sm">
            Smart Water: Smart Self Meter Reading Berbasis AI
          </h1>

          <p className="text-base sm:text-lg text-sky-100/95 font-medium leading-relaxed max-w-3xl">
            Transformasi Digital Perumda Air Minum melalui platform Self Meter Reading berbasis AI-OCR yang memungkinkan pelanggan melakukan pencatatan angka meter air secara mandiri melalui smartphone dengan validasi foto, timestamp, dan koordinat GPS.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-sky-200 font-mono">
            <span>Tim Riset: <strong>Smart Grow Laboratory</strong> (Telkom University)</span>
            <span>Lead Researcher: <strong>Prof. Dr. Indrarini Dyah Irawati S.T., M.T.</strong></span>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-xl transition-all hover:scale-105"
            >
              <Download className="h-4 w-4 text-slate-950" />
              <span>Unduh File Aplikasi Smart Water (APK)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <span className="text-xs text-sky-200 font-mono">
              Google Drive Cloud Storage Verified
            </span>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN SHOWCASE: APP INTERFACE & INTERACTIVE AI-OCR SIMULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: SMARTPHONE APP SCREEN VIEW */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between pb-3 text-white border-b border-slate-800 text-xs">
              <span className="flex items-center gap-1.5 font-bold text-sky-400">
                <Smartphone className="h-4 w-4" />
                Aplikasi Mobile Smart Water
              </span>
              <button
                onClick={() => setModalOpen(true)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                title="Perbesar Tampilan Layar"
              >
                <Maximize2 className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Phone Frame Mockup */}
            <div className="relative mt-4 w-full max-w-[280px] rounded-[2.5rem] p-3 bg-slate-950 border-4 border-slate-800 shadow-2xl overflow-hidden group">
              <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2" />
              
              <div className="relative rounded-[2rem] overflow-hidden bg-white aspect-[9/18]">
                <img 
                  src={appImageUrl} 
                  alt="Aplikasi Smart Water - Smart Self Meter Reading"
                  className="w-full h-full object-contain cursor-zoom-in transition-transform duration-500 group-hover:scale-102"
                  onClick={() => setModalOpen(true)}
                />
              </div>

              <div className="w-24 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
            </div>

            <div className="w-full pt-4 text-center">
              <a
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download File Aplikasi (.apk)</span>
              </a>
            </div>

          </div>

          <div className="p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/60 text-xs text-sky-900 dark:text-sky-200 flex items-center justify-between">
            <span className="font-semibold">Versi Aplikasi: Mobile Client v1.2.0 (Android)</span>
            <span className="text-[10px] font-mono font-bold bg-sky-200/80 dark:bg-sky-900 px-2 py-0.5 rounded">AI-OCR Ready</span>
          </div>
        </div>

        {/* RIGHT: INTERACTIVE AI-OCR METER SIMULATOR */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400">
                  <Camera className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Simulasi Pembacaan Meter Mandiri (AI-OCR)
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">Uji coba algoritma pengenalan angka meter dari foto kamera smartphone</p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold border border-emerald-300 dark:border-emerald-700">
                AI ENGINE ACTIVE
              </span>
            </div>

            {/* Meter Analog Display Box */}
            <div className="p-5 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400 flex items-center gap-1">
                  <Activity className="h-3.5 w-3.5 text-sky-400" />
                  Visual Dial Meter Pelanggan (Simulasi)
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                  GPS: -6.974, 107.630 (Terverifikasi)
                </span>
              </div>

              {/* Digital Dial Counter Mock */}
              <div className="flex items-center justify-center gap-1.5 py-4 bg-slate-900/90 rounded-xl border border-slate-800">
                {String(meterValue.toFixed(1)).padStart(7, '0').split('').map((char, i) => (
                  <div 
                    key={i} 
                    className={`w-9 h-14 rounded-lg flex items-center justify-center font-mono font-black text-2xl shadow-inner ${
                      char === '.' 
                        ? 'w-4 text-slate-500 bg-transparent text-lg' 
                        : i >= 5 
                          ? 'bg-rose-950 text-rose-300 border border-rose-800' 
                          : 'bg-slate-800 text-white border border-slate-700'
                    }`}
                  >
                    {char}
                  </div>
                ))}
                <span className="font-mono text-sm text-slate-400 ml-2 font-bold">m³</span>
              </div>

              {/* AI Scan Overlay */}
              {isScanning && (
                <div className="absolute inset-0 bg-sky-950/85 backdrop-blur-xs flex flex-col items-center justify-center text-sky-300 space-y-2 animate-fade-in">
                  <RefreshCw className="h-8 w-8 animate-spin text-sky-400" />
                  <p className="text-xs font-mono font-bold">Memproses Citra Meter dengan AI-OCR Deep Learning...</p>
                  <span className="text-[10px] text-slate-400">Deteksi angka & kalibrasi perspektif</span>
                </div>
              )}
            </div>

            {/* Scan Action & Output Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">Angka Terdeteksi AI</span>
                <span className="text-lg font-mono font-black text-slate-900 dark:text-white">{meterValue} m³</span>
                <span className="text-[9px] text-emerald-600 block mt-0.5">Confidence: 99.6%</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">Pemakaian Bulan Ini</span>
                <span className="text-lg font-mono font-black text-sky-600 dark:text-sky-400">{usageCubic} m³</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Bulan Lalu: {prevMeterValue} m³</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 font-mono block">Tagihan Otomatis</span>
                <span className="text-lg font-mono font-black text-emerald-600 dark:text-emerald-400">Rp {estimatedBill.toLocaleString('id-ID')}</span>
                <span className="text-[9px] text-emerald-600 block mt-0.5">Billing Real-Time</span>
              </div>
            </div>

            {/* Trigger Button */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs">
                <p className="font-bold text-slate-800 dark:text-slate-200">Uji Coba Pengenalan AI</p>
                <p className="text-[10px] text-slate-500 font-mono">Klik tombol untuk mensimulasikan foto meter mandiri</p>
              </div>

              <button
                onClick={handleSimulateScan}
                disabled={isScanning}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
              >
                <Camera className="h-4 w-4" />
                <span>{isScanning ? 'Membaca Citra...' : 'Ambil Foto & Scan AI'}</span>
              </button>
            </div>

          </div>

          {/* 3 MANFAAT STRATEGIS BAGI PERUMDA */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              3 Manfaat Utama untuk Perumda Air Minum (PDAM):
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200/60 dark:border-sky-800/50 space-y-1">
                <span className="font-mono font-bold text-sky-700 dark:text-sky-300 block">01. Hemat Biaya</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Pengurangan biaya operasional petugas meter hingga puluhan persen per bulan.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/50 space-y-1">
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300 block">02. Nol Human Error</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Menghilangkan salah ketik angka meter manual melalui pembacaan otomatis AI.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/50 space-y-1">
                <span className="font-mono font-bold text-amber-700 dark:text-amber-300 block">03. Fast Cash Flow</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Percepatan proses billing penagihan dan rekonsiliasi kas pembayaran pelanggan.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* MASALAH SAAT INI VS 4 SOLUSI SMART WATER */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* MASALAH SAAT INI */}
        <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/70 dark:border-rose-900/40 space-y-4">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
            <AlertTriangle className="h-5 w-5" />
            <h3>Masalah yang Dihadapi PDAM Saat Ini:</h3>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
            {[
              'Petugas harus datang fisik ke rumah pelanggan satu per satu.',
              'Biaya operasional transportasi dan upah pembacaan meter tinggi.',
              'Human error dalam pencatatan angka meter secara manual.',
              'Data konsumsi terlambat masuk ke sistem database penagihan.',
              'Timbul komplain pelanggan terkait tagihan yang tidak transparan.',
              'Sulit menjangkau pelanggan di kawasan permukiman terpencil atau berjarak jauh.'
            ].map((prob, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-rose-100 dark:border-rose-900/30">
                <span className="w-4 h-4 rounded-full bg-rose-500/10 text-rose-600 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">✕</span>
                <span>{prob}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4 SOLUSI SMART WATER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-sky-50/40 dark:bg-sky-950/20 border border-sky-200/70 dark:border-sky-900/40 space-y-4">
          <div className="flex items-center gap-2 text-sky-700 dark:text-sky-400 font-bold text-sm">
            <Sparkles className="h-5 w-5" />
            <h3>4 Pilar Solusi Smart Water untuk Perumda:</h3>
          </div>

          <div className="space-y-3 text-xs">
            
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900/40 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-lg bg-sky-600 text-white flex items-center justify-center text-[10px] font-mono font-bold">1</span>
                Self Meter Reading Berbasis AI-OCR
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                Pelanggan cukup memfoto meter air. AI secara otomatis mengenali angka meter, mengurangi kunjungan petugas lapangan dan mempercepat pengumpulan data.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900/40 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-lg bg-sky-600 text-white flex items-center justify-center text-[10px] font-mono font-bold">2</span>
                Tagihan Otomatis Real-Time
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                Setelah angka terbaca, pemakaian dihitung otomatis, tagihan langsung muncul di aplikasi, mempercepat proses billing dan cash flow perusahaan.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900/40 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-lg bg-sky-600 text-white flex items-center justify-center text-[10px] font-mono font-bold">3</span>
                Validasi Bukti Foto & GPS
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                Setiap pembacaan disertai foto meter, timestamp waktu nyata, dan lokasi GPS untuk mencegah manipulasi data serta bukti autentik saat audit.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900/40 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded-lg bg-sky-600 text-white flex items-center justify-center text-[10px] font-mono font-bold">4</span>
                Dashboard Monitoring Manajemen
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                Direksi PDAM dapat memantau jumlah pelanggan yang lapor, konsumsi air bulanan, tren pemakaian, serta deteksi dini anomali kebocoran.
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* TIM RISET SMART GROW LAB */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <span className="text-xs font-mono font-bold text-sky-600 uppercase tracking-widest">
            Tim Peneliti & Pengembang
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Team: Smart Grow Laboratory (Telkom University)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Member 1: Prof. Indrarini */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border-2 border-sky-400">
              <img 
                src="/images/team/indrarini-clean.png" 
                alt="Prof. Dr. Indrarini Dyah Irawati S.T., M.T."
                className="w-full h-full object-cover object-top"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/team/indrarini.jpg'; }}
              />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Prof. Dr. Indrarini Dyah Irawati S.T., M.T.</h4>
              <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 block">Lead Researcher & Mentor</span>
              <p className="text-[11px] text-slate-500 mt-1">Pakar Sistem Cerdas & Pengolahan Sinyal Digital Telkom University.</p>
            </div>
          </div>

          {/* Member 2: Shara Anjelia */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border-2 border-emerald-400">
              <img 
                src="/images/team/shara.jpg" 
                alt="Shara Anjelia"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Shara Anjelia</h4>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 block">Researcher & Software Developer</span>
              <p className="text-[11px] text-slate-500 mt-1">Riset Arsitektur Sistem, Integrasi AI-OCR, dan Data Engineering.</p>
            </div>
          </div>

          {/* Member 3: M. Chico DwiKasa */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-200 shrink-0 border-2 border-amber-400">
              <img 
                src="/images/team/chiko.jpg" 
                alt="M. Chico DwiKasa"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">M. Chico DwiKasa</h4>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 block">Researcher & Mobile Engineer</span>
              <p className="text-[11px] text-slate-500 mt-1">Pengembangan Mobile App, Pipeline AI-OCR, dan Cloud Integration.</p>
            </div>
          </div>

        </div>
      </section>

      {/* COMMENTS & PUBLIC FEEDBACK */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-sky-600" />
              Tanggapan & Diskusi Proyek Smart Water ({allComments.length})
            </h3>
            <p className="text-xs text-slate-500">Komentar publik, mitra Perumda Air Minum, dan akademisi seputar teknologi self-metering.</p>
          </div>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleFormSubmit} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
          <h4 className="font-bold text-xs text-slate-700 dark:text-slate-200 font-mono uppercase">
            Tinggalkan Pertanyaan atau Masukan:
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Nama Lengkap</label>
              <input 
                type="text" 
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Contoh: Ir. Budi Santoso"
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
                placeholder="budi@perumda.id"
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
              placeholder="Tuliskan pertanyaan mengenai integrasi billing PDAM, akurasi OCR, atau peluang kemitraan..."
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
              className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
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

      {/* FULL-SCREEN IMAGE MODAL */}
      {modalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 animate-fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div 
            className="w-full max-w-4xl flex items-center justify-between text-white py-2 border-b border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-sm sm:text-base">
              Aplikasi Smart Water - Smart Self Meter Reading (Mobile View)
            </h3>
            <button
              onClick={() => setModalOpen(false)}
              className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div 
            className="w-full flex-1 overflow-auto flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={appImageUrl} 
              alt="Aplikasi Smart Water Fullscreen"
              className="max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>

          <div className="text-center text-xs text-slate-400 font-mono py-2">
            Klik di luar gambar atau tombol silang untuk menutup
          </div>
        </div>
      )}

    </div>
  );
}
