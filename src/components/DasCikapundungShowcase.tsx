import React, { useState } from 'react';
import { 
  Maximize2, 
  X, 
  Send, 
  MessageSquare, 
  Sun,
  ShieldCheck,
  ShieldAlert,
  Zap,
  Waves,
  ArrowLeft,
  Share2,
  Check,
  Download,
  AlertTriangle,
  Activity,
  Layers,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  Info,
  Cpu,
  BatteryCharging,
  Droplets,
  Thermometer,
  Radio,
  FileText,
  Users,
  Award
} from 'lucide-react';
import { ProjectItem, Comment } from '../types';

interface DasCikapundungShowcaseProps {
  item?: ProjectItem;
  comments?: Comment[];
  onBack: () => void;
  onAddComment?: (name: string, email: string, content: string) => void;
}

export default function DasCikapundungShowcase({ 
  item, 
  comments = [], 
  onBack, 
  onAddComment 
}: DasCikapundungShowcaseProps) {
  
  const panelImageUrl = '/images/das-cikapundung/das-cikapundung-panel.jpg';
  const posterImageUrl = '/images/das-cikapundung/das-cikapundung-poster.png';

  const [modalImage, setModalImage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);


  // Comment Form States
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

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

  const defaultComments: Comment[] = [
    {
      id: 'c_das1',
      name: 'Tim Monitoring DAS BBWS Citarum',
      email: 'telemetry@bbws-citarum.go.id',
      content: 'Instalasi solar box outdoor mandiri ini sangat praktis dan kokoh untuk penempatan di bantaran Sungai Cikapundung yang jauh dari jala-jala listrik PLN. Desain proteksi MCB dan dual battery-nya handal menjaga kontinuitas pengiriman data.',
      timestamp: '2026-10-15 09:20'
    },
    {
      id: 'c_das2',
      name: 'Dr. Eng. Ir. Suryadi',
      email: 'suryadi@telkomuniversity.ac.id',
      content: 'Kombinasi sensor ketinggian muka air ultrasonik dengan sistem transmisi LoRaWAN berdaya rendah menghasilkan efisiensi energi yang optimal. Sangat layak untuk direplikasi di titik rawan limpasan lainnya.',
      timestamp: '2026-10-16 14:45'
    }
  ];

  const allComments = comments.length > 0 ? comments : defaultComments;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in text-slate-800 dark:text-slate-100 pb-12 bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-xs">
      
      {/* TOP NAVIGATION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 sm:pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-teal-500 hover:text-teal-700 dark:hover:text-teal-400 transition-all cursor-pointer shadow-2xs group"
          id="das-cikapundung-back-btn"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Kembali ke Daftar Proyek</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            title="Salin tautan proyek ini"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-teal-600" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan'}</span>
          </button>
        </div>
      </div>

      {/* HERO BANNER SECTION (Teal, Ocean Blue & Solar Gold) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0f4c5c] via-[#006466] to-[#065a60] text-white p-6 sm:p-8 shadow-xl border border-teal-600/30">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/70 border border-teal-400/40 text-teal-200 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sun className="h-3.5 w-3.5 text-amber-300" />
              Off-Grid Solar PV Powered
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-mono text-xs font-semibold">
              <MapPin className="h-3.5 w-3.5 text-cyan-200" />
              Bantaran Sungai Cikapundung, Kota Bandung
            </span>
          </div>

          {/* Dokumentasi Alat & Poster PKM Thumbnails + Project Title Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-1">
            <div className="flex items-center gap-3 shrink-0">
              {/* Thumbnail 1: Alat & Panel */}
              <div 
                onClick={() => setModalImage(panelImageUrl)}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900 p-1 shadow-2xl border-2 border-teal-300/80 cursor-zoom-in shrink-0 hover:scale-105 transition-all flex flex-col items-center justify-center group/panel relative overflow-hidden"
                title="Klik untuk membuka foto dokumentasi alat resolusi penuh"
              >
                <img 
                  src={panelImageUrl} 
                  alt="Dokumentasi Alat & Panel DAS Cikapundung" 
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-teal-950/20 group-hover/panel:bg-teal-950/40 transition-colors flex items-center justify-center">
                  <Maximize2 className="h-4 w-4 text-white opacity-0 group-hover/panel:opacity-100 transition-opacity drop-shadow" />
                </div>
                <span className="absolute bottom-1 bg-slate-950/85 text-[9px] font-mono font-bold text-teal-300 px-1.5 py-0.5 rounded shadow">
                  Alat & Panel
                </span>
              </div>

              {/* Thumbnail 2: Poster PKM */}
              <div 
                onClick={() => setModalImage(posterImageUrl)}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900 p-1 shadow-2xl border-2 border-amber-300/80 cursor-zoom-in shrink-0 hover:scale-105 transition-all flex flex-col items-center justify-center group/poster relative overflow-hidden"
                title="Klik untuk membuka poster resmi PKM Kemdiktisaintek 2025"
              >
                <img 
                  src={posterImageUrl} 
                  alt="Poster Resmi PKM DAS Cikapundung" 
                  className="w-full h-full object-cover object-top rounded-xl"
                />
                <div className="absolute inset-0 bg-teal-950/20 group-hover/poster:bg-teal-950/40 transition-colors flex items-center justify-center">
                  <Maximize2 className="h-4 w-4 text-white opacity-0 group-hover/poster:opacity-100 transition-opacity drop-shadow" />
                </div>
                <span className="absolute bottom-1 bg-slate-950/85 text-[9px] font-mono font-bold text-amber-300 px-1.5 py-0.5 rounded shadow">
                  Poster PKM
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-sm">
                Proyek DAS Cikapundung
              </h1>
              <p className="text-sm sm:text-base text-teal-100 font-mono font-medium flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                Sistem Pemantau Catu Daya Mandiri Surya & Digital Twin Mitigasi Banjir
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-teal-50/95 font-medium leading-relaxed max-w-3xl">
            Stasiun monitoring terintegrasi daerah aliran sungai (DAS) Cikapundung berbasis Internet of Things (IoT) dengan catu daya mandiri tenaga surya (*Off-Grid Clean Energy*). Menghadirkan pemantauan ketinggian muka air, laju sedimentasi, dan kualitas air secara real-time guna mendukung sistem peringatan dini banjir (*Early Warning System*) Kota Bandung.
          </p>
        </div>
      </section>

      {/* LATAR BELAKANG & URGENSI PEMANTAUAN DAS CIKAPUNDUNG */}
      <section id="urgensi-section" className="bg-gradient-to-br from-slate-50 via-teal-50/20 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-teal-600 dark:text-teal-400">
              Konteks Wilayah & Urgensi Lapangan
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-display text-slate-900 dark:text-white">
              Sistem Pemantauan DAS Cikapundung Berbasis IoT & Catu Daya Surya
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-3xl leading-relaxed">
              Inovasi stasiun pemantauan terdesentralisasi ramah lingkungan (*Off-Grid Clean Energy*) yang dirancang khusus oleh Smart Grow Laboratory untuk kawasan sungai kritis perkotaan.
            </p>
          </div>
          <span className="self-start md:self-auto px-3.5 py-1.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 font-mono text-xs font-bold border border-teal-300/60 shrink-0">
            Sungai Ikonik Bandung
          </span>
        </div>

        {/* 3 Kotak Kartu Naratif yang Menarik & Tidak Monoton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-2xs space-y-3 relative overflow-hidden group hover:border-teal-400 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-300 flex items-center justify-center font-bold shadow-2xs group-hover:scale-110 transition-transform">
              <Waves className="w-5 h-5" />
            </div>
            <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-white">
              Arteri Vital Metropolitan Bandung
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Sungai Cikapundung membelah jantung metropolitan Bandung Raya, berperan vital sebagai sumber air baku, saluran drainase alami, dan koridor ekosistem lingkungan hidup perkotaan yang padat.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-2xs space-y-3 relative overflow-hidden group hover:border-rose-400 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 flex items-center justify-center font-bold shadow-2xs group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-white">
              Jalur Limpasan Banjir Hulu Lembang
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Menjadi jalur utama limpasan banjir saat intensitas hujan tinggi terjadi di kawasan hulu Lembang. Peningkatan debit air yang mendadak menuntut sistem peringatan dini (*Early Warning*) berkecepatan tinggi.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800/90 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 shadow-2xs space-y-3 relative overflow-hidden group hover:border-amber-400 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300 flex items-center justify-center font-bold shadow-2xs group-hover:scale-110 transition-transform">
              <Sun className="w-5 h-5" />
            </div>
            <h4 className="font-display font-extrabold text-base text-slate-900 dark:text-white">
              Catu Daya Mandiri Nonstop 24 Jam
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
              Sistem beroperasi secara mandiri 24 jam nonstop tanpa bergantung pada jaringan listrik PLN berkat integrasi instalasi panel surya fotovoltaik dan panel enclosure catu daya protektif outdoor.
            </p>
          </div>

        </div>
      </section>

      {/* POSTER & PROGRAM PENGABDIAN MASYARAKAT (PKM) SECTION */}
      <section id="poster-section" className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 rounded-3xl p-6 sm:p-8 text-white border border-teal-500/30 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-teal-800/60 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              Pengabdian Masyarakat DPPM Kemdiktisaintek Tahun 2025
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Poster Resmi Program PKM DAS Cikapundung
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/80 max-w-3xl leading-relaxed">
              Skema Pemberdayaan Kemitraan Masyarakat (PKM): Implementasi Teknologi IoT dalam Optimalisasi Sistem Hidrologi Berbasis AI dengan Digital Twin untuk Mitigasi Banjir di Lingkungan Imersif 3D.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={posterImageUrl}
              download="poster-resmi-das-cikapundung.png"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-slate-950" />
              <span>Unduh Poster</span>
            </a>
            <button
              onClick={() => setModalImage(posterImageUrl)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
            >
              <Maximize2 className="h-3.5 w-3.5 text-cyan-300" />
              <span>Perbesar</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Poster Image Display with interactive zoom */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div 
              onClick={() => setModalImage(posterImageUrl)}
              className="group relative w-full rounded-2xl overflow-hidden bg-slate-950 border-2 border-teal-400/40 shadow-2xl cursor-zoom-in transition-all duration-300 hover:border-cyan-300 hover:scale-[1.01]"
              title="Klik untuk membuka poster resolusi penuh"
            >
              <img 
                src={posterImageUrl} 
                alt="Poster Resmi PKM DAS Cikapundung Kemdiktisaintek 2025"
                className="w-full h-auto object-contain max-h-[640px] rounded-xl"
              />
              <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs shadow-2xl">
                  <Maximize2 className="h-4 w-4 text-teal-600" />
                  Buka Resolusi Penuh HD
                </span>
              </div>
            </div>
            <p className="text-[11px] font-mono text-cyan-300/70 mt-2 text-center">
              *Klik gambar poster untuk memperbesar dan membaca seluruh teks detail
            </p>
          </div>

          {/* Right: Structured Overview of the Poster */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Header Title Box from Poster */}
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2 backdrop-blur-sm">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                Fokus Riset & Pengabdian 2025
              </span>
              <h3 className="font-bold text-base sm:text-lg text-white leading-snug">
                Optimalisasi Sistem Hidrologi Berbasis AI & Digital Twin Imersif 3D
              </h3>
              <p className="text-xs text-teal-100/90 leading-relaxed">
                Program pengabdian masyarakat terapan oleh Telkom University berkolaborasi dengan DPPM Kemdiktisaintek melalui skema PKM untuk penguatan mitigasi bencana banjir di sepanjang DAS Cikapundung, selaras dengan capaian SDGs 4 (Quality Education) & SDGs 11 (Sustainable Cities and Communities).
              </p>
            </div>

            {/* Tim Pengabdi & Institusi */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-cyan-400" />
                Tim Pelaksana & Peneliti
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Indrarini Dyah Irawati',
                  'Ruminik Machfiroh',
                  'Bayu Erfianto',
                  'Fathir Adjie',
                  'Asimbi Dwi Syahillah',
                  'Hannani Syadzwana'
                ].map((member, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl bg-white/10 border border-white/15 text-[11px] font-medium text-slate-200">
                    {member}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-teal-200/70 pt-1">
                DPPM Kemdiktisaintek Tahun 2025 • Telkom University • Diktisaintek Berdampak • BIMA
              </p>
            </div>

            {/* Lokasi & Mitra */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Lokasi Pelaksanaan
                </span>
                <p className="text-xs font-bold text-white">Jl. Jajaway RT.02 / RW.01</p>
                <p className="text-[11px] text-slate-300">
                  Dago Atas, Kel. Dago, Kec. Coblong, Kota Bandung (Luas Kawasan Rawan Banjir: 1.010,28 Ha).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  Mitra Program
                </span>
                <p className="text-xs font-bold text-white">Perhimpunan Warga Pemerhati Lingkungan</p>
                <p className="text-[11px] text-slate-300">
                  Komunitas lokal DAS Cikapundung sebagai garda terdepan literasi & kader mitigasi bencana.
                </p>
              </div>
            </div>

            {/* Metode & Tahapan Implementasi */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                Tahapan Utama PKM (Mei - November 2025)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                <div className="flex items-start gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded shrink-0">01</span>
                  <span>Survei lapangan, FGD, dan identifikasi kondisi eksisting DAS</span>
                </div>
                <div className="flex items-start gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded shrink-0">02</span>
                  <span>Pelatihan & literasi teknologi sistem hidrologi untuk warga</span>
                </div>
                <div className="flex items-start gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded shrink-0">03</span>
                  <span>Model AI generatif & simulasi Digital Twin 3D genangan banjir</span>
                </div>
                <div className="flex items-start gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="font-mono text-[10px] font-bold text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded shrink-0">04</span>
                  <span>Pembentukan Kader Banjir Digital & simulasi tanggap darurat</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TECHNICAL DIAGRAM & EQUIPMENT DOCUMENTATION SECTION */}
      <section id="technical-diagram-section" className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700/60 pb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Dokumentasi & Instalasi Panel Enclosure Catu Daya Surya DAS Cikapundung
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Dokumentasi fisik perangkat, diagram perkabelan, proteksi kelistrikan MCB, Solar Charge Controller, dan bank baterai cadangan.
            </p>
          </div>
        </div>

        {/* Media & Equipment Breakdown View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Infographic Image Container with Zoom & Download */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div 
                onClick={() => setModalImage(panelImageUrl)}
                className="group relative w-full rounded-3xl overflow-hidden bg-slate-900 border-2 border-teal-200/80 shadow-xl cursor-zoom-in flex items-center justify-center transition-all duration-300 hover:scale-[1.01]"
                title="Klik untuk melihat diagram resolusi penuh"
              >
                <img 
                  src={panelImageUrl} 
                  alt="Diagram Skematik Panel Catu Daya Surya DAS Cikapundung"
                  className="w-full h-auto object-contain max-h-[620px]"
                />
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-teal-900 font-bold text-xs shadow-2xl">
                    <Maximize2 className="h-4 w-4 text-teal-600" />
                    Buka Resolusi Penuh HD
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4">
                <a 
                  href={panelImageUrl}
                  download="diagram-catu-daya-das-cikapundung.jpg"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Unduh Diagram Teknis</span>
                </a>
                <button
                  onClick={() => setModalImage(panelImageUrl)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer"
                >
                  <Maximize2 className="h-3.5 w-3.5 text-teal-600" />
                  <span>Perbesar</span>
                </button>
              </div>
            </div>

            {/* Right: Component Detail Cards from Infographic */}
            <div className="lg:col-span-6 space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Spesifikasi Komponen Kelistrikan
                </span>
                <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                  Bedah Komponen Enclosure Box
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Struktur instalasi tertata rapi memenuhi standar outdoor IP65 tahan cuaca untuk operasional kontinu di tepi sungai.
                </p>
              </div>

              {/* 1. Solar Charge Controller */}
              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-bold text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <h4>Solar Charge Controller (SCC)</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Mengatur proses pengisian daya cerdas dari panel surya fotovoltaik ke baterai dan beban. Dilengkapi layar digital untuk memantau tegangan sel, arus pengisian, serta proteksi *overcharge* dan *deep discharge*.
                </p>
              </div>

              {/* 2. MCB */}
              <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 space-y-1.5">
                <div className="flex items-center gap-2 text-rose-900 dark:text-rose-300 font-bold text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                  <h4>MCB (Miniature Circuit Breaker)</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Melindungi rangkaian telemetri dan kontroler dari lonjakan arus lebih (*overcurrent*) dan hubung singkat (*short circuit*), memutus aliran seketika untuk mencegah kebakaran komponen.
                </p>
              </div>

              {/* 3. Terminal Block */}
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300 font-bold text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <h4>Terminal Block Busbar</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Sebagai penghubung dan distributor antar jalur kabel kelistrikan secara rapi, aman, dan modular. Mempermudah proses pengukuran voltase dan *maintenance* berkala.
                </p>
              </div>

              {/* 4. Dual Battery */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-bold text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <h4>Dual Deep-Cycle Battery (VRLA/Gel)</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Menyimpan cadangan energi listrik dari panel surya untuk menyuplai mikrokontroler IoT, sensor ketinggian air, dan modem transmisi 24 jam nonstop saat malam atau cuaca hujan lebat.
                </p>
              </div>

              {/* 5. Wiring Color Code Standard */}
              <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                <h5 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 text-teal-600" />
                  <span>Keterangan Standar Warna Kabel:</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                  <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200/60 dark:border-slate-700">
                    <span className="w-3.5 h-3.5 rounded-full bg-red-600 shrink-0" />
                    <span><strong>Merah</strong> : Positif (+)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200/60 dark:border-slate-700">
                    <span className="w-3.5 h-3.5 rounded-full bg-slate-950 shrink-0" />
                    <span><strong>Hitam</strong> : Negatif (-)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200/60 dark:border-slate-700">
                    <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-red-600 to-black shrink-0" />
                    <span><strong>Kabel Rangkaian</strong> : Ke Beban IoT</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
      </section>

      {/* 4 KOMPONEN INTI PANEL CATU DAYA SURYA */}
      <section id="komponen-inti-section" className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-700/80 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Catu Daya Mandiri Nonstop
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Komponen Inti Panel Catu Daya Surya
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
              Arsitektur proteksi kelistrikan dan manajemen daya industri yang dirancang oleh Smart Grow Laboratory untuk menjamin kontinuitas stasiun telemetri 24 jam nonstop tanpa ketergantungan PLN.
            </p>
          </div>
          <span className="shrink-0 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-500" />
            4 Modul Protektif Utama
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. SCC */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-50/60 to-white dark:from-slate-800/80 dark:to-slate-900 border border-amber-200/80 dark:border-amber-900/40 hover:border-amber-400 dark:hover:border-amber-500 transition-all flex flex-col justify-between shadow-xs hover:shadow-md group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center text-amber-600 dark:text-amber-300 group-hover:scale-110 transition-transform shadow-xs">
                  <Sun className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200/50">
                  MODUL 01
                </span>
              </div>
              
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                  Solar Charge Controller (SCC)
                </h4>
                <p className="text-[11px] font-mono text-slate-400">Smart Photovoltaic Regulator</p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Mengatur regulasi pengisian daya cerdas dari modul panel surya fotovoltaik (PV) ke bank baterai dengan efisiensi tinggi serta multi-proteksi kelistrikan:
              </p>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span>Proteksi Overload & Short Circuit</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span>Pencegahan Overcharge Baterai</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span>Deep Discharge Protection (LVD)</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">Tegangan Sistem:</span>
              <span className="font-bold font-mono text-amber-700 dark:text-amber-300">12V / 24V Auto</span>
            </div>
          </div>

          {/* 2. MCB */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-rose-50/60 to-white dark:from-slate-800/80 dark:to-slate-900 border border-rose-200/80 dark:border-rose-900/40 hover:border-rose-400 dark:hover:border-rose-500 transition-all flex flex-col justify-between shadow-xs hover:shadow-md group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-rose-100 dark:bg-rose-900/60 flex items-center justify-center text-rose-600 dark:text-rose-300 group-hover:scale-110 transition-transform shadow-xs">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-100/60 dark:bg-rose-950/60 px-2.5 py-0.5 rounded-full border border-rose-200/50">
                  MODUL 02
                </span>
              </div>
              
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-rose-600 transition-colors">
                  Miniature Circuit Breaker (MCB)
                </h4>
                <p className="text-[11px] font-mono text-slate-400">Electrical Overcurrent Protection</p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Pemutus sirkuit proteksi arus lebih (overcurrent) dan hubung singkat (short circuit) untuk menjamin keselamatan modul telemetri dan baterai dari anomali:
              </p>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                  <span>Proteksi Modul Telemetri & IoT</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                  <span>Trip Cepat Saat Hubung Singkat</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                  <span>Saklar Manual Isolasi Servis</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-rose-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">Standar Keamanan:</span>
              <span className="font-bold font-mono text-rose-700 dark:text-rose-300">DIN Rail DC Spec</span>
            </div>
          </div>

          {/* 3. DUAL VRLA BATTERY */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-teal-50/60 to-white dark:from-slate-800/80 dark:to-slate-900 border border-teal-200/80 dark:border-teal-900/40 hover:border-teal-400 dark:hover:border-teal-500 transition-all flex flex-col justify-between shadow-xs hover:shadow-md group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-teal-100 dark:bg-teal-900/60 flex items-center justify-center text-teal-600 dark:text-teal-300 group-hover:scale-110 transition-transform shadow-xs">
                  <BatteryCharging className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-teal-600 dark:text-teal-400 bg-teal-100/60 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200/50">
                  MODUL 03
                </span>
              </div>
              
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                  Dual Deep-Cycle Battery (VRLA)
                </h4>
                <p className="text-[11px] font-mono text-slate-400">Chemical Energy Storage Bank</p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Bank penyimpan energi kimia berkapasitas tinggi untuk menjamin kontinuitas suplai daya transmisi IoT saat malam hari atau cuaca mendung berkepanjangan:
              </p>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-500 shrink-0" />
                  <span>Kontinuitas Suplai 24 Jam Nonstop</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-500 shrink-0" />
                  <span>Siklus Deep-Discharge Tahan Lama</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-500 shrink-0" />
                  <span>Bebas Perawatan & Anti Bocor Gas</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-teal-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">Autonomi Cuaca:</span>
              <span className="font-bold font-mono text-teal-700 dark:text-teal-300">3 - 5 Hari Cadangan</span>
            </div>
          </div>

          {/* 4. TERMINAL BLOCK */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-blue-50/60 to-white dark:from-slate-800/80 dark:to-slate-900 border border-blue-200/80 dark:border-blue-900/40 hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between shadow-xs hover:shadow-md group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-blue-600 dark:text-blue-300 group-hover:scale-110 transition-transform shadow-xs">
                  <Cpu className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-100/60 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200/50">
                  MODUL 04
                </span>
              </div>
              
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  Terminal Block Terisolasi
                </h4>
                <p className="text-[11px] font-mono text-slate-400">Industrial Wiring Distribution</p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Sistem manajemen pengkabelan rapi dengan kode warna standar industri untuk menjamin keamanan operasional dan kemudahan inspeksi:
              </p>

              <div className="space-y-2 pt-1 font-mono text-[11px]">
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200/60 text-red-700 dark:text-red-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" />
                  <span><strong>Merah</strong> : Positif (+) Panel/Bat</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-300/60 text-slate-800 dark:text-slate-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-black shrink-0" />
                  <span><strong>Hitam</strong> : Negatif (-) Ground</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200/60 text-amber-800 dark:text-amber-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-red-600 to-black shrink-0" />
                  <span><strong>Merah-Hitam</strong> : Beban Telemetri</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-blue-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">Dudukan:</span>
              <span className="font-bold font-mono text-blue-700 dark:text-blue-300">Flame-Retardant DIN</span>
            </div>
          </div>
        </div>
      </section>

      {/* SENSOR & TELEMETRI TERINTEGRASI */}
      <section id="sensor-telemetri-section" className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-teal-500/30 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-teal-800/60 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-cyan-400">
              Akuisisi Data Hidrometeorologi Real-Time
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Sensor & Telemetri Terintegrasi DAS Cikapundung
            </h2>
            <p className="text-xs sm:text-sm text-teal-200/80 max-w-3xl leading-relaxed">
              Instrumen hidrometri dan kualitas air presisi tinggi yang terkoneksi langsung ke gateway nirkabel untuk mitigasi dini banjir dan pemantauan kelestarian sungai.
            </p>
          </div>
          <span className="shrink-0 px-3 py-1.5 rounded-xl bg-teal-900/60 border border-teal-400/40 text-cyan-300 font-mono text-xs font-bold flex items-center gap-1.5">
            <Radio className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            5 Node Telemetri Terhubung
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {/* Sensor 1: Water Level */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/60 hover:bg-white/10 transition-all flex flex-col justify-between space-y-3 group backdrop-blur-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Waves className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300">
                  EWS BANJIR
                </span>
              </div>
              <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                Ketinggian Muka Air (TMA)
              </h4>
              <p className="text-[11px] font-mono text-cyan-200/70">Ultrasonic Water Level Sensor</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pemantauan fluktuasi elevasi muka air sungai tanpa sentuhan (non-contact) untuk mendeteksi ambang siaga banjir bandang dari kawasan hulu Lembang.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-cyan-300/90 flex justify-between">
              <span className="text-slate-400">Rentang:</span>
              <span>0.0 - 5.0 Meter</span>
            </div>
          </div>

          {/* Sensor 2: Turbidity */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/60 hover:bg-white/10 transition-all flex flex-col justify-between space-y-3 group backdrop-blur-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Droplets className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-950/80 border border-amber-400/30 text-amber-300">
                  SEDIMENTASI
                </span>
              </div>
              <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                Kekeruhan Air (Turbidity)
              </h4>
              <p className="text-[11px] font-mono text-amber-200/70">Optical Nephelometric 90°</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mengukur tingkat konsentrasi partikel terlarut dan laju sedimentasi akibat erosi lapisan tanah di bantaran sungai secara kontinu.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-amber-300/90 flex justify-between">
              <span className="text-slate-400">Rentang:</span>
              <span>0 - 1000 NTU</span>
            </div>
          </div>

          {/* Sensor 3: pH */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-400/60 hover:bg-white/10 transition-all flex flex-col justify-between space-y-3 group backdrop-blur-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Activity className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-400/30 text-emerald-300">
                  MUTU AIR
                </span>
              </div>
              <h4 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors">
                Keasaman Air (pH)
              </h4>
              <p className="text-[11px] font-mono text-emerald-200/70">Industrial Glass Electrode</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluasi mutu baku air minum & ekosistem lingkungan serta deteksi dini indikasi kontaminasi limbah kimia cair industri maupun domestik.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-emerald-300/90 flex justify-between">
              <span className="text-slate-400">Rentang:</span>
              <span>0.0 - 14.0 pH</span>
            </div>
          </div>

          {/* Sensor 4: Temperature */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-400/60 hover:bg-white/10 transition-all flex flex-col justify-between space-y-3 group backdrop-blur-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Thermometer className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-950/80 border border-purple-400/30 text-purple-300">
                  KLIMATOLOGI
                </span>
              </div>
              <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                Suhu Air & Lingkungan
              </h4>
              <p className="text-[11px] font-mono text-purple-200/70">High-Precision Digital Probe</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Merekam suhu fluida air sungai serta mikroklimat sekitar yang mempengaruhi kelarutan oksigen (Dissolved Oxygen) dan kelestarian biota sungai.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-purple-300/90 flex justify-between">
              <span className="text-slate-400">Rentang:</span>
              <span>-20°C s/d +80°C</span>
            </div>
          </div>

          {/* Sensor 5: LoRaWAN / GSM 4G */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-teal-400/60 hover:bg-white/10 transition-all flex flex-col justify-between space-y-3 group backdrop-blur-sm sm:col-span-2 lg:col-span-1">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Radio className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-950/80 border border-teal-400/30 text-teal-300">
                  CLOUD UPLINK
                </span>
              </div>
              <h4 className="font-bold text-sm text-white group-hover:text-teal-300 transition-colors">
                Transmisi LoRa & 4G
              </h4>
              <p className="text-[11px] font-mono text-teal-200/70">LoRaWAN / Cellular Gateway</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pengiriman data telemetri otomatis ke Cloud Dashboard Smart Grow Lab dengan enkripsi aman, hemat daya, serta latensi rendah untuk visualisasi publik.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-teal-300/90 flex justify-between">
              <span className="text-slate-400">Protokol:</span>
              <span>MQTT / TLS Cloud</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4 PILAR TEKNOLOGI DAS CIKAPUNDUNG */}
      <section id="pilar-teknologi-section" className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold font-mono uppercase tracking-widest text-teal-600 dark:text-teal-400">
            Arsitektur Solusi
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
            4 Pilar Ekosistem Proyek DAS Cikapundung
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/80 dark:border-slate-700 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-700 dark:text-teal-300">
              <Sun className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">100% Mandiri Energi Surya</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Panel PV fotovoltaik dengan proteksi MCB dan baterai VRLA beroperasi terus-menerus tanpa ketergantungan daya listrik PLN.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/80 dark:border-slate-700 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-700 dark:text-blue-300">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Early Warning Banjir</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Deteksi dini kenaikan debit air hulu Cikapundung memberikan jeda waktu mitigasi kritis bagi warga bantaran kota Bandung.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/80 dark:border-slate-700 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-700 dark:text-amber-300">
              <Activity className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Transmisi Nirkabel IoT</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Protokol transmisi jarak jauh LoRaWAN dan GSM multi-operator menjamin ketahanan paket data di lembah dan celah sungai.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/80 dark:border-slate-700 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Kualitas & Kejernihan Air</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Pemantauan sedimentasi lumpur (turbidity) dan pH secara berkala untuk mendukung pelestarian ekosistem Cikapundung bersih.
            </p>
          </div>
        </div>
      </section>

      {/* COMMENTS & DISCUSSION SECTION */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5">
          <MessageSquare className="h-5 w-5 text-teal-600" />
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
            Diskusi & Masukan Proyek DAS Cikapundung ({allComments.length})
          </h2>
        </div>

        {/* Comment list */}
        <div className="space-y-4">
          {allComments.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">{c.name}</span>
                <span className="text-slate-400 font-mono text-[11px]">{c.timestamp}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{c.content}</p>
            </div>
          ))}
        </div>

        {/* Comment Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tinggalkan Masukan untuk Proyek Ini</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input 
              type="text" 
              placeholder="Nama Lengkap Anda" 
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              required
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:outline-teal-500 text-slate-900 dark:text-white"
            />
            <input 
              type="email" 
              placeholder="Alamat Email (Opsional)" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:outline-teal-500 text-slate-900 dark:text-white"
            />
          </div>

          <textarea 
            rows={3} 
            placeholder="Tuliskan masukan teknis, saran riset, atau pertanyaan terkait instalasi DAS Cikapundung..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:outline-teal-500 text-slate-900 dark:text-white"
          />

          <div className="flex items-center justify-between">
            {commentSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Terima kasih! Masukan Anda telah berhasil dicatat.
              </span>
            )}
            <button
              type="submit"
              className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Kirim Masukan</span>
            </button>
          </div>
        </form>
      </section>

      {/* FULLSCREEN IMAGE MODAL */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
            <img 
              src={modalImage} 
              alt="Resolusi Penuh DAS Cikapundung"
              className="max-h-[80vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain bg-white/10 border border-white/20 p-2"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex flex-wrap items-center justify-between gap-3 w-full max-w-2xl mt-4 px-2">
              <span className="text-xs text-slate-300 font-mono">
                {modalImage === posterImageUrl
                  ? 'Poster Resmi Pengabdian Masyarakat PKM Kemdiktisaintek 2025 - DAS Cikapundung'
                  : 'Dokumentasi & Diagram Skematik Enclosure Catu Daya Surya DAS Cikapundung'}
              </span>
              <a 
                href={modalImage} 
                download={modalImage === posterImageUrl ? 'poster-resmi-das-cikapundung.png' : 'dokumentasi-panel-das-cikapundung.jpg'}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <Download className="h-3.5 w-3.5" />
                <span>Unduh Gambar</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
