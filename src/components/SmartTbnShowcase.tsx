import React, { useState } from 'react';
import { 
  Maximize2, 
  X, 
  Send, 
  CheckCircle2,
  Camera,
  MapPin,
  Users,
  Building2,
  Calendar,
  Share2,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Clock,
  Check,
  Download,
  Sparkles,
  Leaf,
  Wifi,
  Image as ImageIcon,
  Activity,
  Phone,
  Instagram,
  MessageSquare
} from 'lucide-react';
import { ProjectItem, Comment } from '../types';

interface SmartTbnShowcaseProps {
  item?: ProjectItem;
  comments?: Comment[];
  onBack: () => void;
  onAddComment?: (name: string, email: string, content: string) => void;
}

export default function SmartTbnShowcase({ 
  item, 
  comments = [], 
  onBack, 
  onAddComment 
}: SmartTbnShowcaseProps) {
  
  const logoImage = '/images/smart-tbn/smart-tbn-logo.png';
  const posterImage = '/images/smart-tbn/smart-tbn-poster.png';
  const [activeMediaTab, setActiveMediaTab] = useState<'poster' | 'logo'>('poster');
  const [modalImage, setModalImage] = useState<{ url: string; title: string; subtitle?: string } | null>(null);

  // Comment & Share States
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
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
      id: 'c_tbn1',
      name: 'Masyarakat Kampung Raja Prailiu',
      email: 'warga.prailiu@sumba.id',
      content: 'Terima kasih banyak tim Telkom University dan PT Tigaresi atas sosialisasi dan implementasi Smart TBN. Sangat membantu kebersihan dan kenyamanan wisatawan di desa adat kami!',
      timestamp: '2026-07-28 09:30'
    },
    {
      id: 'c_tbn2',
      name: 'Pengelola Desa Wisata Waingapu',
      email: 'wisata@sumbatimur.go.id',
      content: 'Inovasi yang luar biasa! Notifikasi langsung ke petugas pengangkut sampah membuat lingkungan desa adat tetap asri tanpa ada sampah yang menumpuk atau meluap.',
      timestamp: '2026-07-29 14:15'
    }
  ];

  const allComments = comments.length > 0 ? comments : defaultComments;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in text-slate-800 dark:text-slate-100 pb-12">
      
      {/* TOP NAVIGATION BAR */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 sm:pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Daftar Proyek</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan'}</span>
          </button>
        </div>
      </div>

      {/* HERO BANNER SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#0f766e] text-white p-6 sm:p-8 shadow-xl border border-emerald-600/30">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 rounded-full bg-teal-300/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Riset Pengabdian Masyarakat • Sumba NTT
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 font-mono text-xs font-semibold">
              <MapPin className="h-3.5 w-3.5 text-amber-300" />
              Kampung Raja Prailiu, Waingapu
            </span>
          </div>

          {/* Logo & Project Title Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 pt-1">
            <div 
              onClick={() => setModalImage({ 
                url: logoImage, 
                title: 'Logo Resmi Smart TBN', 
                subtitle: 'Smart Trash Bin Network • Riset Pengabdian Telkom University & PT Tigaresi' 
              })}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-2.5 shadow-2xl border-2 border-emerald-300/80 cursor-zoom-in shrink-0 hover:scale-105 transition-all flex items-center justify-center group/logo relative overflow-hidden"
              title="Klik untuk membuka Logo Smart TBN resolusi penuh"
            >
              <img 
                src={logoImage} 
                alt="Logo Resmi Smart TBN" 
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-emerald-950/0 group-hover/logo:bg-emerald-950/20 transition-colors flex items-center justify-center">
                <Maximize2 className="h-4 w-4 text-emerald-800 opacity-0 group-hover/logo:opacity-100 transition-opacity drop-shadow" />
              </div>
            </div>

            <div>
              <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-sm">
                Smart TBN Goes to Sumba
              </h1>
              <p className="text-xs sm:text-sm text-emerald-200 font-mono font-medium mt-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Smart Trash Bin Network • Notifikasi Real-Time Berbasis IoT
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-emerald-100/90 font-medium leading-relaxed max-w-3xl">
            Implementasi Tempat Sampah Pintar Berbasis Internet of Things (IoT) untuk Pengelolaan Sampah dan Pelestarian Lingkungan di Desa Wisata Kampung Raja Prailiu.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-emerald-200 font-mono">
            <span>Kolaborasi: <strong>Telkom University</strong> × <strong>PT Tigaresi Bangun Nusaperdana</strong></span>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://smarttrash.devtbn.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-lg transition-all hover:scale-105"
            >
              <span>Buka Platform SmartTBN</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN SHOWCASE: MEDIA SWITCHER & HIGHLIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: INTERACTIVE MEDIA SHOWCASE (POSTER & LOGO TABS) */}
        <div className="lg:col-span-6 space-y-4">
          
          {/* Media Switcher Tab Header */}
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveMediaTab('poster')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMediaTab === 'poster'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <ImageIcon className="h-3.5 w-3.5" />
                <span>Poster Infografis</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMediaTab('logo')}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMediaTab === 'logo'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Leaf className="h-3.5 w-3.5" />
                <span>Logo Resmi Smart TBN</span>
              </button>
            </div>

            <button
              onClick={() => setModalImage({
                url: activeMediaTab === 'poster' ? posterImage : logoImage,
                title: activeMediaTab === 'poster' ? 'Poster Resmi Smart TBN' : 'Logo Resmi Smart TBN',
                subtitle: activeMediaTab === 'poster' ? 'Infografis Sosialisasi & Implementasi di Kampung Raja Prailiu Sumba' : 'Smart Trash Bin Network • Vektor Resolusi Tinggi'
              })}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Perbesar HD</span>
            </button>
          </div>

          {/* Active Media Container */}
          {activeMediaTab === 'poster' ? (
            <div className="relative group rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-xl">
              <img 
                src={posterImage} 
                alt="Poster Smart TBN - Tempat Sampah Pintar dengan Notifikasi Real-Time" 
                className="w-full h-auto object-contain cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.02]"
                onClick={() => setModalImage({
                  url: posterImage,
                  title: 'Poster Resmi Smart TBN',
                  subtitle: 'Infografis Sosialisasi & Implementasi di Kampung Raja Prailiu Sumba'
                })}
              />
              
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={() => setModalImage({
                    url: posterImage,
                    title: 'Poster Resmi Smart TBN',
                    subtitle: 'Infografis Sosialisasi & Implementasi di Kampung Raja Prailiu Sumba'
                  })}
                  className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
                  title="Perbesar Poster Infografis"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-4 text-white flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold">Poster Resmi Smart TBN</p>
                  <p className="text-[10px] text-slate-300 font-mono">Klik gambar untuk melihat detail infografis resolusi penuh</p>
                </div>
                <button
                  onClick={() => setModalImage({
                    url: posterImage,
                    title: 'Poster Resmi Smart TBN',
                    subtitle: 'Infografis Sosialisasi & Implementasi di Kampung Raja Prailiu Sumba'
                  })}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-[11px] font-bold transition-all cursor-pointer"
                >
                  Perbesar
                </button>
              </div>
            </div>
          ) : (
            <div className="relative group rounded-3xl overflow-hidden border-2 border-emerald-500/20 bg-white dark:bg-slate-900 shadow-xl p-8 flex flex-col items-center justify-between min-h-[420px]">
              <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-800">
                  Visual Branding Primer
                </span>
                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                  <Maximize2 className="h-3.5 w-3.5" /> Klik untuk Zoom
                </span>
              </div>

              <div 
                className="w-full max-w-[280px] aspect-square flex items-center justify-center cursor-zoom-in my-auto group/img"
                onClick={() => setModalImage({
                  url: logoImage,
                  title: 'Logo Resmi Smart TBN (Smart Trash Bin Network)',
                  subtitle: 'Format Resolusi Tinggi • Telkom University × PT Tigaresi'
                })}
              >
                <img 
                  src={logoImage} 
                  alt="Logo Resmi Smart TBN - Smart Trash Bin Network" 
                  className="w-full h-full object-contain transition-transform duration-500 group-hover/img:scale-105"
                />
              </div>

              <div className="w-full mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Smart Trash Bin Network</h4>
                  <p className="text-[11px] text-slate-500 font-mono">Logo Resmi Brand & Publikasi</p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={logoImage}
                    download="smart-tbn-logo.png"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition-all cursor-pointer"
                    title="Unduh Logo Resolusi Tinggi"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Unduh</span>
                  </a>
                  <button
                    onClick={() => setModalImage({
                      url: logoImage,
                      title: 'Logo Resmi Smart TBN',
                      subtitle: 'Smart Trash Bin Network • Vektor Resolusi Tinggi'
                    })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all cursor-pointer shadow-sm"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>Zoom</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT: PLATFORM INFO & HIGHLIGHTS */}
        <div className="lg:col-span-6 space-y-6">

          {/* Quick Features List */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-3">
            <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
              6 Fitur Utama Smart TBN:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { title: 'Monitoring IoT Real-Time', desc: 'Pemantauan kontinyu via cloud gateway' },
                { title: 'Deteksi Tinggi & Berat Sampah', desc: 'Sensor ultrasonik & Load Cell terintegrasi' },
                { title: 'Kamera Pemantauan Langsung', desc: 'Visual verifikasi jenis dan tumpukan' },
                { title: 'Dashboard Berbasis Web', desc: 'Antarmuka multi-titik terpusat' },
                { title: 'Notifikasi Langsung Petugas', desc: 'Alert instan sebelum sampah meluap' },
                { title: 'Catu Daya Surya Mandiri', desc: 'Efisiensi energi untuk kawasan outdoor' }
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-100 block">{f.title}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* IDENTITAS VISUAL & FILOSOFI LOGO SMART TBN */}
      <section id="logo-section" className="space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              Identitas Visual & Branding Riset
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Logo Resmi & Filosofi Visual Smart TBN
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mt-1 leading-relaxed">
              Identitas visual resmi Smart Trash Bin Network (Smart TBN) yang dirancang untuk merepresentasikan perpaduan inovasi Internet of Things (IoT), kecerdasan visual telemetri, dan komitmen pelestarian keasrian lingkungan desa wisata budaya.
            </p>
          </div>
        </div>

        {/* Logo Card & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Main Logo Showcase Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div 
              onClick={() => setModalImage({
                url: logoImage,
                title: 'Logo Resmi Smart TBN (Smart Trash Bin Network)',
                subtitle: 'Master Vektor Resolusi Tinggi • Telkom University × PT Tigaresi'
              })}
              className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500/20 hover:border-emerald-500 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-between text-center relative overflow-hidden h-full"
            >
              <div className="w-full flex items-center justify-between mb-4 text-[11px] font-mono font-bold text-slate-400">
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Logo Primer Resmi
                </span>
                <span className="flex items-center gap-1 text-emerald-600 font-bold">
                  <Maximize2 className="h-3.5 w-3.5" /> Zoom HD
                </span>
              </div>

              <div className="w-full aspect-square max-w-[260px] bg-slate-50/50 dark:bg-slate-800/40 rounded-2xl p-6 flex items-center justify-center my-auto border border-slate-100 dark:border-slate-800">
                <img
                  src={logoImage}
                  alt="Logo Resmi Smart TBN"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 w-full text-center space-y-2">
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Smart TBN (Smart Trash Bin Network)
                  </h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Format Resolusi Tinggi • Standar Publikasi & Branding
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <a
                    href={logoImage}
                    download="smart-tbn-logo.png"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-700 dark:text-slate-300 hover:text-emerald-700 text-xs font-bold transition-all"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Unduh Logo</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setModalImage({
                      url: logoImage,
                      title: 'Logo Resmi Smart TBN (Smart Trash Bin Network)',
                      subtitle: 'Master Vektor Resolusi Tinggi • Telkom University × PT Tigaresi'
                    })}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    <span>Perbesar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 4 Philosophy Breakdown Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Filosofi 1: Smart Trash Bin & IoT Camera */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 transition-all space-y-2.5 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Camera className="h-5 w-5" />
              </div>
              <div className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Elemen Visual 01
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                Tempat Sampah Pintar & Modul Kamera IoT
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Siluet tempat sampah modern dengan kamera di bagian atas mencerminkan integrasi sensor ultrasonik, load cell, dan transmisi visual telemetri secara real-time ke petugas.
              </p>
            </div>

            {/* Filosofi 2: Daun Hijau & Kelestarian */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 transition-all space-y-2.5 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Leaf className="h-5 w-5" />
              </div>
              <div className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Elemen Visual 02
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                Daun Hijau & Keberlanjutan Ekosistem
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Elemen dedaunan hijau di dasar tempat sampah menyimbolkan komitmen pelestarian alam desa adat Sumba, kebersihan sanitasi, dan prinsip ekonomi sirkular yang ramah lingkungan.
              </p>
            </div>

            {/* Filosofi 3: Busur Sirkular Jaringan */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 transition-all space-y-2.5 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Wifi className="h-5 w-5" />
              </div>
              <div className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Elemen Visual 03
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                Busur Jaringan (Smart Trash Bin Network)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Garis sirkular hijau yang membingkai unit tempat sampah merepresentasikan <em>Network</em> (jaringan terpadu) yang menghubungkan multi-titik tempat sampah ke cloud server secara otomatis.
              </p>
            </div>

            {/* Filosofi 4: Bintang Kilau & Gelombang Hijau */}
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 transition-all space-y-2.5 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Sparkles className="h-5 w-5 text-amber-500" />
              </div>
              <div className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Elemen Visual 04
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                Bintang Kilau & Gelombang Keasrian
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Kilauan bintang emas dan garis gelombang dinamis melambangkan lingkungan desa adat yang bersih bercahaya, bebas sampah meluap, serta kenyamanan maksimal bagi para wisatawan.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* DETAILED PROJECT DESCRIPTION & BACKGROUND STORY */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="font-display text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Latar Belakang & Implementasi di Kampung Raja Prailiu
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Menjaga kebersihan dan kelestarian desa wisata berbasis budaya melalui sentuhan teknologi cerdas
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
          <p>
            <strong>Smart Trash Bin Notification (Smart TBN)</strong> hadir di <strong>Kampung Raja Prailiu, Waingapu, Sumba, Nusa Tenggara Timur</strong>.
          </p>
          <p>
            Pada <strong>27 Juli 2026</strong>, tim peneliti <strong>Telkom University</strong> bersama <strong>PT Tigaresi Bangun Nusaperdana</strong> melaksanakan sosialisasi dan implementasi Smart TBN bersama masyarakat Kampung Raja Prailiu. Smart TBN merupakan tempat sampah pintar berbasis <em>Internet of Things (IoT)</em> yang memantau kondisi tempat sampah secara real-time melalui ketinggian dan kapasitas timbunan sampah, serta informasi visual dari kamera. Sistem juga dapat memberikan notifikasi ketika kondisi sampah mencapai ambang yang telah ditentukan.
          </p>

          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
            <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
              Mengapa Kampung Raja Prailiu Dipilih?
            </h4>
            <p className="text-xs text-emerald-800/90 dark:text-emerald-300 leading-relaxed">
              Kampung Raja Prailiu dipilih karena merupakan desa wisata berbasis budaya dengan rumah adat yang megah, tradisi tenun ikat dengan alat tenun gedogan tradisional, dan berbagai kerajinan masyarakat yang menjadi daya tarik utama bagi wisatawan lokal maupun mancanegara. Dalam kawasan seperti ini, kebersihan lingkungan tidak hanya berkaitan dengan pengelolaan sampah, tetapi juga berpengaruh langsung terhadap kenyamanan pengunjung, kualitas lingkungan, citra destinasi, pelestarian lingkungan, serta keberlanjutan aktivitas wisata dan ekonomi masyarakat setempat.
            </p>
          </div>

          <p>
            Rangkaian kegiatan meliputi sosialisasi, demonstrasi Smart TBN, penjelasan sistem pemantauan, hingga serah terima unit Smart TBN. Kegiatan ini juga memperlihatkan kekayaan Kampung Raja Prailiu melalui rumah adat, tenun ikat dengan alat tenun gedogan, kerajinan masyarakat, serta bentang alam khas Sumba yang memukau.
          </p>
        </div>
      </section>

      {/* MANFAAT & AREA APLIKASI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Manfaat Pengelola */}
        <section className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
          <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
            Manfaat untuk Pengelola Kawasan
          </h3>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700">
              <Clock className="h-5 w-5 text-emerald-600 mb-1" />
              <div className="font-bold text-xs text-slate-900 dark:text-white">Hemat Waktu</div>
              <p className="text-[11px] text-slate-500 leading-normal mt-0.5">Tidak perlu inspeksi manual setiap saat ke seluruh titik.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700">
              
              <div className="font-bold text-xs text-slate-900 dark:text-white">Lebih Bersih</div>
              <p className="text-[11px] text-slate-500 leading-normal mt-0.5">Mencegah sampah meluap dan menimbulkan bau tidak sedap.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700">
              <Activity className="h-5 w-5 text-emerald-600 mb-1" />
              <div className="font-bold text-xs text-slate-900 dark:text-white">Jadwal Efisien</div>
              <p className="text-[11px] text-slate-500 leading-normal mt-0.5">Jadwal pengangkutan berdasarkan kondisi nyata di lapangan.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700">
              <Activity className="h-5 w-5 text-emerald-600 mb-1" />
              <div className="font-bold text-xs text-slate-900 dark:text-white">Data Terukur</div>
              <p className="text-[11px] text-slate-500 leading-normal mt-0.5">Seluruh log aktivitas pengosongan tercatat rapi di dashboard.</p>
            </div>
          </div>
        </section>

        {/* Cocok Digunakan Untuk */}
        <section className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4">
          <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="h-5 w-5 text-emerald-600" />
            Cocok Diimplementasikan Untuk:
          </h3>
          <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs">
            {[
              'Desa Wisata Budaya & Alam',
              'Kampus & Lingkungan Sekolah',
              'Perkantoran & Gedung Publik',
              'Pusat Perbelanjaan & Mall',
              'Kawasan Rumah Sakit & Medis',
              'Kawasan Industri & Pergudangan',
              'Taman Kota & Jalur Pedestrian',
              'Program Smart City Nasional'
            ].map((area, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-semibold text-slate-700 dark:text-slate-200">{area}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* RESEARCH TEAM & INDUSTRIAL PARTNERS */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <h2 className="font-display text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-600" />
            Tim Peneliti & Mitra Industri
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Kolaborasi akademisi Telkom University, praktisi industri PT Tigaresi, dan masyarakat lokal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Researchers List */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider">
              Tim Peneliti Telkom University:
            </h4>
            <div className="space-y-2.5">
              {[
                { name: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.', role: 'Ketua Tim Peneliti & Direktur Smart Grow Lab' },
                { name: 'Vivi Monika, S.T., M.T.', role: 'Dosen Peneliti & Spesialis Instrumentasi' },
                { name: 'Prof. Dr. Augustine Asih Rumanti, S.T., M.T.', role: 'Dosen Peneliti & Pakar Rekayasa Industri' },
                { name: 'Mohammad As’ad Rosyadi, S.Pd., M.T.', role: 'Dosen Peneliti & Pengembangan Sistem' }
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{r.name}</h5>
                    <p className="text-[11px] text-slate-500 font-medium">{r.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Partner & Contact Card */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="text-xs font-mono font-bold text-teal-800 dark:text-teal-400 uppercase tracking-wider">
                Mitra Industri Kerjasama:
              </h4>
              <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  PT Tigaresi Bangun Nusaperdana
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Mitra strategis perancangan konstruksi fisik, fabrikasi unit Smart Trash Bin, dan pengujian durabilitas outdoor.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#064e3b] to-[#047857] text-white space-y-3 shadow-lg">
              <h4 className="font-display font-bold text-sm">Tertarik Mencoba atau Menerapkan Smart TBN?</h4>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Hubungi kami untuk informasi lebih lanjut, konsultasi teknis, demo produk, dan implementasi Smart TBN di kawasan Anda.
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-3 text-xs font-mono">
                <a 
                  href="https://wa.me/62895360799127" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-3.5 py-2 rounded-xl bg-white text-emerald-900 font-bold flex items-center gap-1.5 hover:bg-emerald-50 transition-all cursor-pointer"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-600" />
                  <span>+62 895-3607-99127</span>
                </a>
                <a 
                  href="https://instagram.com/smart_growlab" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-3.5 py-2 rounded-xl bg-emerald-950/60 border border-emerald-400/30 text-white font-bold flex items-center gap-1.5 hover:bg-emerald-950 transition-all cursor-pointer"
                >
                  <Instagram className="h-3.5 w-3.5 text-pink-400" />
                  <span>@smart_growlab</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* DISCUSSION & COMMENTS SECTION */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-emerald-600" />
              Diskusi & Komentar Inovasi ({allComments.length})
            </h2>
            <p className="text-xs text-slate-500 font-medium">Sampaikan tanggapan, pertanyaan, atau masukan untuk implementasi Smart TBN</p>
          </div>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleFormSubmit} className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input 
              type="text" 
              required
              placeholder="Nama Lengkap Anda"
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
            />
            <input 
              type="email" 
              placeholder="Email (opsional)"
              value={emailInput}
              onChange={e => setEmailInput(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <textarea 
            rows={3}
            required
            placeholder="Tulis tanggapan atau pertanyaan mengenai proyek Smart TBN Sumba..."
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            className="w-full p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:border-emerald-500 resize-none"
          />
          <div className="flex items-center justify-between pt-1">
            {commentSuccess && (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Komentar Anda berhasil dikirimkan!
              </span>
            )}
            <button
              type="submit"
              className="ml-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Kirim Komentar</span>
            </button>
          </div>
        </form>

        {/* Comments Feed */}
        <div className="space-y-3 pt-2">
          {allComments.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                    {c.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{c.name}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{c.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-9">
                {c.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FULLSCREEN LIGHTBOX MODAL FOR POSTER & LOGO */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setModalImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[95vh] w-full flex flex-col items-center bg-slate-950/90 p-5 rounded-3xl border border-white/10 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-white">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white">{modalImage.title}</h3>
                {modalImage.subtitle && (
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{modalImage.subtitle}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={modalImage.url}
                  download={modalImage.url.includes('logo') ? 'smart-tbn-logo.png' : 'smart-tbn-poster.png'}
                  className="px-3 py-1.5 text-white/90 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold"
                  title="Unduh File Resolusi Tinggi"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Unduh</span>
                </a>
                <button
                  onClick={() => setModalImage(null)}
                  className="p-1.5 text-white/80 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
                  title="Tutup Modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="w-full flex items-center justify-center overflow-auto p-2">
              <img 
                src={modalImage.url} 
                alt={modalImage.title} 
                className={`max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl ${
                  modalImage.url.includes('logo') ? 'bg-white p-6 sm:p-8' : ''
                }`}
              />
            </div>
            
            <p className="text-center text-xs font-mono text-slate-400 mt-2">
              {modalImage.url.includes('logo') 
                ? 'Master Visual Branding Smart TBN • Smart Trash Bin Network' 
                : 'Infografis Resmi: Smart TBN - Tempat Sampah Pintar dengan Notifikasi Real-Time (Sumba NTT)'}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
