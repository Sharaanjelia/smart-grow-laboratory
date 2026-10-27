import React, { useState } from 'react';
import { 
  Maximize2, 
  X, 
  Send, 
  MessageSquare, 
  Store,
  ShoppingBag,
  ArrowLeft, 
  Share2, 
  Check, 
  Download, 
  Play,
  Video,
  ExternalLink,
  CheckCircle2, 
  Info, 
  Calendar, 
  MapPin, 
  Users, 
  Award, 
  FileText, 
  Sparkles, 
  Layers, 
  Smartphone, 
  Receipt, 
  BarChart3, 
  GraduationCap
} from 'lucide-react';
import { ProjectItem, Comment } from '../types';

interface SmartMinimarketShowcaseProps {
  item?: ProjectItem;
  comments?: Comment[];
  onBack: () => void;
  onAddComment?: (name: string, email: string, content: string) => void;
}

export default function SmartMinimarketShowcase({ 
  item, 
  comments = [], 
  onBack, 
  onAddComment 
}: SmartMinimarketShowcaseProps) {
  
  const posterImageUrl = '/images/smart-minimarket/smart-minimarket-poster.jpg';
  const videoTutorialUrl = 'https://drive.google.com/file/d/1SUrLFZs9dJEY4fxmZWkd6TtP2E5-ndTk/view';
  const videoEmbedUrl = 'https://drive.google.com/file/d/1SUrLFZs9dJEY4fxmZWkd6TtP2E5-ndTk/preview';

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
      id: 'c_smk1',
      name: 'Drs. H. Mamat Rohimat, M.M.Pd.',
      email: 'kepsek@smkkaryaabadi.sch.id',
      content: 'Aplikasi Smart Minimarket QMART dan model Teaching Factory ini membawa lompatan besar bagi siswa kami di SMK Karya Abadi Sumedang. Siswa tidak hanya belajar teori ritel, tapi langsung mempraktikkan transaksi kasir POS, audit stok, dan manajemen keuangan modern.',
      timestamp: '2025-08-26 13:40'
    },
    {
      id: 'c_smk2',
      name: 'Tim Pengabdian Telkom University',
      email: 'indrarini@telkomuniversity.ac.id',
      content: 'Kolaborasi antara Telkom University, PT. STA, dan SMK Karya Abadi ini membuktikan bahwa integrasi teknologi digital pada pendidikan vokasi mampu mencetak lulusan yang siap bersaing di industri ritel 4.0.',
      timestamp: '2025-08-27 10:15'
    }
  ];

  const allComments = comments.length > 0 ? comments : defaultComments;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in text-slate-800 dark:text-slate-100 pb-12 bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-xs">
      
      {/* TOP NAVIGATION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 sm:pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-sky-500 hover:text-sky-700 dark:hover:text-sky-400 transition-all cursor-pointer shadow-2xs group"
          id="smart-minimarket-back-btn"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Kembali ke Daftar Proyek</span>
        </button>

        <div className="flex items-center gap-2.5">
          <a
            href={videoTutorialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 text-xs font-semibold hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-all cursor-pointer"
          >
            <Video className="h-3.5 w-3.5 text-sky-600" />
            <span>Video Tutorial GDrive</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            title="Salin tautan proyek ini"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-sky-600" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan'}</span>
          </button>
        </div>
      </div>

      {/* HERO BANNER SECTION (Modern Sky Blue & Indigo Retail Theme) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0284c7] via-[#0369a1] to-[#0f172a] text-white p-6 sm:p-8 shadow-xl border border-sky-400/30">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-cyan-300/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-sky-300/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-950/70 border border-sky-300/40 text-sky-200 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Store className="h-3.5 w-3.5 text-cyan-300" />
              Teaching Factory Vokasi SMK
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-mono text-xs font-semibold">
              <MapPin className="h-3.5 w-3.5 text-cyan-200" />
              SMK Karya Abadi Sumedang
            </span>
          </div>

          {/* Poster Thumbnail & Project Title Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-1">
            <div className="flex items-center gap-3 shrink-0">
              {/* Thumbnail: Poster Resmi PKM */}
              <div 
                onClick={() => setModalImage(posterImageUrl)}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-900 p-1 shadow-2xl border-2 border-sky-300/80 cursor-zoom-in shrink-0 hover:scale-105 transition-all flex flex-col items-center justify-center group/poster relative overflow-hidden"
                title="Klik untuk membuka poster resmi resolusi penuh"
              >
                <img 
                  src={posterImageUrl} 
                  alt="Poster Resmi Smart Minimarket QMART SMK Karya Abadi" 
                  className="w-full h-full object-cover object-top rounded-xl"
                />
                <div className="absolute inset-0 bg-sky-950/20 group-hover/poster:bg-sky-950/40 transition-colors flex items-center justify-center">
                  <Maximize2 className="h-4 w-4 text-white opacity-0 group-hover/poster:opacity-100 transition-opacity drop-shadow" />
                </div>
                <span className="absolute bottom-1 bg-slate-950/85 text-[9px] font-mono font-bold text-sky-300 px-1.5 py-0.5 rounded shadow">
                  Poster TEFA
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-sm">
                Smart Minimarket-QMART
              </h1>
              <p className="text-sm sm:text-base text-sky-100 font-mono font-medium flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-cyan-300 animate-pulse" />
                Model Inovatif Pengelolaan Teaching Factory & Retail Digital SMK
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-sky-50/95 font-medium leading-relaxed max-w-3xl">
            Model pembelajaran Teaching Factory terpadu berbasis ritel digital di SMK Karya Abadi Sumedang. Mengintegrasikan aplikasi Point of Sales (POS) bersama PT. STA, manajemen rak modern, papan harga digital, dan video tutorial interaktif guna membekali siswa dengan kompetensi kewirausahaan masa kini.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <a
              href="https://drive.google.com/file/d/1SUrLFZs9dJEY4fxmZWkd6TtP2E5-ndTk/view"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 fill-slate-950 text-slate-950" />
              <span>Buka Video Tutorial QMART</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* VIDEO TUTORIAL SECTION */}
      <section id="video-tutorial-section" className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-sky-500/30 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sky-800/60 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
              <Video className="h-3.5 w-3.5 text-amber-400" />
              Panduan Praktik Digital Siswa
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Video Tutorial Aplikasi Smart Minimarket-QMART
            </h2>
            <p className="text-xs sm:text-sm text-sky-200/80 max-w-3xl leading-relaxed">
              Panduan langkah demi langkah pengoperasian aplikasi kasir POS, barcode scanning produk, manajemen katalog harga, dan pembukuan transaksi harian mini market teaching factory.
            </p>
          </div>

          <a
            href={videoTutorialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer hover:scale-105"
          >
            <Play className="h-3.5 w-3.5 fill-slate-950 text-slate-950" />
            <span>Buka Video di Google Drive</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Google Drive Video Embed Player */}
          <div className="lg:col-span-7 flex flex-col space-y-3">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border-2 border-sky-400/40 shadow-2xl">
              <iframe
                src={videoEmbedUrl}
                title="Video Tutorial Smart Minimarket-QMART"
                className="w-full h-full border-0"
                allow="autoplay"
                allowFullScreen
              />
            </div>
            <div className="flex items-center justify-between text-xs text-sky-300/80 font-mono px-1">
              <span className="flex items-center gap-1.5">
                <Info className="h-3.5 w-3.5 text-cyan-300" />
                Player Google Drive Interaktif
              </span>
              <a
                href={videoTutorialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1 text-amber-300 font-semibold"
              >
                <span>Unduh / Tonton Layar Penuh</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Right: Step-by-Step Training Modules */}
          <div className="lg:col-span-5 space-y-3">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
                Materi Pelatihan Vokasi
              </span>
              <h4 className="font-bold text-sm text-white">4 Modul Pembelajaran dalam Video</h4>
              <p className="text-xs text-sky-100/80 leading-relaxed">
                Panduan praktis terstruktur yang dipelajari langsung oleh para siswa SMK Karya Abadi dalam kurikulum TEFA:
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 hover:bg-white/10 transition-colors">
                <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-cyan-300 font-mono font-bold flex items-center justify-center shrink-0">
                  01
                </span>
                <div>
                  <h5 className="font-bold text-white">Autentikasi & Akun Kasir</h5>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Pengenalan antarmuka aplikasi QMART, manajemen hak akses kasir & supervisor, serta pembukaan shift kasir.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 hover:bg-white/10 transition-colors">
                <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-cyan-300 font-mono font-bold flex items-center justify-center shrink-0">
                  02
                </span>
                <div>
                  <h5 className="font-bold text-white">Scan Barcode & Transaksi POS</h5>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Operasional barcode scanner, input manual produk, penerapan diskon promo, dan pencetakan struk belanja.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 hover:bg-white/10 transition-colors">
                <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-cyan-300 font-mono font-bold flex items-center justify-center shrink-0">
                  03
                </span>
                <div>
                  <h5 className="font-bold text-white">Manajemen Stok & Papan Harga</h5>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Pencatatan barang masuk/keluar, audit stok fisik (stock opname), dan sinkronisasi papan harga digital.
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 hover:bg-white/10 transition-colors">
                <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-cyan-300 font-mono font-bold flex items-center justify-center shrink-0">
                  04
                </span>
                <div>
                  <h5 className="font-bold text-white">Rekonsiliasi Kas & Laporan Penjualan</h5>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Penutupan shift harian, rekonsiliasi uang kas fisik terhadap catatan sistem POS, serta rekapitulasi laba kotor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POSTER RESMI TEACHING FACTORY SECTION */}
      <section id="poster-section" className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-700/80 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-amber-500" />
              Publikasi Program Pengabdian Masyarakat
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Poster Resmi: Implementasi Smart Mini Market
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
              Model Inovatif Pengelolaan Teaching Factory di SMK Karya Abadi Sumedang oleh Tim Pengabdian Masyarakat Telkom University bersama PT. STA.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={posterImageUrl}
              download="poster-smart-minimarket-qmart.jpg"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Unduh Poster</span>
            </a>
            <button
              onClick={() => setModalImage(posterImageUrl)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs transition-all cursor-pointer"
            >
              <Maximize2 className="h-3.5 w-3.5 text-sky-600" />
              <span>Perbesar</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Poster Image Display with interactive zoom */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div 
              onClick={() => setModalImage(posterImageUrl)}
              className="group relative w-full rounded-2xl overflow-hidden bg-slate-950 border-2 border-sky-200 dark:border-sky-800 shadow-xl cursor-zoom-in transition-all duration-300 hover:scale-[1.01]"
              title="Klik untuk membuka poster resolusi penuh"
            >
              <img 
                src={posterImageUrl} 
                alt="Poster Resmi Implementasi Smart Mini Market SMK Karya Abadi" 
                className="w-full h-auto object-contain max-h-[640px] rounded-xl"
              />
              <div className="absolute inset-0 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs shadow-2xl">
                  <Maximize2 className="h-4 w-4 text-sky-600" />
                  Buka Resolusi Penuh HD
                </span>
              </div>
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-2 text-center">
              *Klik gambar poster untuk memperbesar dan membaca seluruh teks detail
            </p>
          </div>

          {/* Right: Detailed Structured Information from the Poster */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Latar Belakang */}
            <div className="p-5 rounded-2xl bg-sky-50/60 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/40 space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                Latar Belakang & Urgensi
              </span>
              <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                Pendidikan Vokasi Berbasis Praktik Industri Ritel Modern
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Smart Mini Market merupakan salah satu model Teaching Factory yang dirancang untuk mendukung pembelajaran berbasis praktik di SMK. Melalui pengelolaan mini market berbasis digital, siswa dapat belajar langsung mengenai manajemen ritel, penggunaan teknologi informasi, hingga strategi pemasaran. Program ini hadir untuk menjawab kebutuhan pendidikan vokasi yang relevan dengan perkembangan industri serta membekali siswa dengan keterampilan kewirausahaan modern.
              </p>
            </div>

            {/* Hasil yang Diharapkan */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                Hasil yang Diharapkan
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 pt-1">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Meningkatnya kompetensi siswa dalam pengelolaan ritel modern.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Terciptanya model teaching factory berbasis Smart Mini Market.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Tersusunnya modul pembelajaran berbasis praktik nyata.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Peningkatan kerjasama strategis antara SMK dengan perguruan tinggi.</span>
                </div>
              </div>
            </div>

            {/* Kesimpulan Program */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/80 dark:border-slate-700 space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 text-[10px] font-mono font-bold uppercase tracking-wider">
                Kesimpulan Program
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Program ini menjadi inovasi dalam pengembangan teaching factory di SMK, dengan mengintegrasikan teknologi digital dalam praktik bisnis ritel. Melalui pendampingan dari Prof. Indrarini (Telkom University), kegiatan ini diharapkan mampu memperkuat kompetensi siswa, menumbuhkan jiwa kewirausahaan, serta menciptakan lulusan yang siap menghadapi tantangan industri di era digital.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* FASILITAS RITEL & FITUR POS */}
      <section id="fasilitas-ritel-section" className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-700/80 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400">
              Sarana Prasarana Teaching Factory
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Fasilitas Ritel Modern & Ekosistem QMART
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
              Integrasi perangkat keras dan perangkat lunak ritel standar industri untuk menciptakan simulasi toko mini market yang realistis di lingkungan sekolah.
            </p>
          </div>
          <span className="shrink-0 px-3 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 font-mono text-xs font-bold flex items-center gap-1.5">
            <Store className="h-3.5 w-3.5 text-sky-500" />
            4 Pilar Fasilitas Ritel
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* 1. Aplikasi POS */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-sky-50/60 to-white dark:from-slate-800/80 dark:to-slate-900 border border-sky-200/80 dark:border-sky-900/40 hover:border-sky-400 dark:hover:border-sky-500 transition-all flex flex-col justify-between shadow-xs hover:shadow-md group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-sky-100 dark:bg-sky-900/60 flex items-center justify-center text-sky-600 dark:text-sky-300 group-hover:scale-110 transition-transform shadow-xs">
                  <Smartphone className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-100/60 dark:bg-sky-950/60 px-2.5 py-0.5 rounded-full border border-sky-200/50">
                  MODUL 01
                </span>
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-sky-600 transition-colors">
                  Aplikasi POS QMART
                </h4>
                <p className="text-[11px] font-mono text-slate-400">Software Point of Sales Terpadu</p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Dikembangkan bersama PT. STA untuk mendukung transaksi kasir instan, integrasi barcode scanner, cetak nota struk belanja, dan pencatatan kas otomatis.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-sky-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">Mitra Pengembang:</span>
              <span className="font-bold font-mono text-sky-700 dark:text-sky-300">PT. STA & Tel-U</span>
            </div>
          </div>

          {/* 2. Papan Harga Digital & Signage */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-50/60 to-white dark:from-slate-800/80 dark:to-slate-900 border border-amber-200/80 dark:border-amber-900/40 hover:border-amber-400 dark:hover:border-amber-500 transition-all flex flex-col justify-between shadow-xs hover:shadow-md group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center text-amber-600 dark:text-amber-300 group-hover:scale-110 transition-transform shadow-xs">
                  <Receipt className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200/50">
                  MODUL 02
                </span>
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                  Papan Harga & Signage
                </h4>
                <p className="text-[11px] font-mono text-slate-400">Digital Price Tag & Promotion</p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Penandaan harga produk yang tersinkronisasi dengan database kasir serta signage promosi visual untuk menarik minat pembeli di lingkungan sekolah.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">Katalog Produk:</span>
              <span className="font-bold font-mono text-amber-700 dark:text-amber-300">Dynamic Pricing</span>
            </div>
          </div>

          {/* 3. Rak Display & Gudang Mini */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-teal-50/60 to-white dark:from-slate-800/80 dark:to-slate-900 border border-teal-200/80 dark:border-teal-900/40 hover:border-teal-400 dark:hover:border-teal-500 transition-all flex flex-col justify-between shadow-xs hover:shadow-md group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-teal-100 dark:bg-teal-900/60 flex items-center justify-center text-teal-600 dark:text-teal-300 group-hover:scale-110 transition-transform shadow-xs">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-teal-600 dark:text-teal-400 bg-teal-100/60 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200/50">
                  MODUL 03
                </span>
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                  Ruang Display & Rak Produk
                </h4>
                <p className="text-[11px] font-mono text-slate-400">Modern Layout & Warehousing</p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Penataan rak display ergonomis standar retail, area gudang kecil, meja kasir representatif, dan penerapan manajemen perputaran barang (FIFO).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-teal-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">Standar Penataan:</span>
              <span className="font-bold font-mono text-teal-700 dark:text-teal-300">FIFO Merchandising</span>
            </div>
          </div>

          {/* 4. Infrastruktur Jaringan & Lighting */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-indigo-50/60 to-white dark:from-slate-800/80 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-900/40 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col justify-between shadow-xs hover:shadow-md group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-300 group-hover:scale-110 transition-transform shadow-xs">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100/60 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-200/50">
                  MODUL 04
                </span>
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                  Infrastruktur Wi-Fi & Fasilitas
                </h4>
                <p className="text-[11px] font-mono text-slate-400">Network & Clean Store Facility</p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Konektivitas Wi-Fi stabil untuk mesin POS dan sinkronisasi cloud, tata pencahayaan toko yang terang, serta perlengkapan kebersihan toko ritel.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-indigo-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400 font-mono">Koneksi:</span>
              <span className="font-bold font-mono text-indigo-700 dark:text-indigo-300">Dedicated Wi-Fi POS</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 TAHAPAN METODE IMPLEMENTASI */}
      <section id="tahapan-section" className="bg-slate-50 dark:bg-slate-800/60 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 space-y-6">
        <div>
          <span className="text-xs font-bold font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400">
            Roadmap & Metodologi Pelaksanaan
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
            3 Tahapan Metode Implementasi (Maret – Agustus 2025)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
            Siklus pengembangan dan pendampingan terstruktur mulai dari perencanaan sistem hingga integrasi kurikulum mandiri di SMK Karya Abadi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tahap 1 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3 relative overflow-hidden group hover:border-sky-400 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200/60">
                FASE 1
              </span>
              <span className="text-[11px] font-mono text-slate-400">Maret – Mei 2025</span>
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">
              Planning & Development
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Pembuatan aplikasi Smart Mini Market (QMART).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Penyusunan modul pembelajaran & video tutorial interaktif.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Pengadaan barang dan perlengkapan display ritel.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Identifikasi kebutuhan teaching factory sekolah.</span>
              </li>
            </ul>
          </div>

          {/* Tahap 2 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3 relative overflow-hidden group hover:border-sky-400 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200/60">
                FASE 2
              </span>
              <span className="text-[11px] font-mono text-slate-400">Juni – Juli 2025</span>
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">
              Implementation & Pelatihan
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Penyediaan fasilitas ritel modern (display, rak, gudang kecil).</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Instalasi sistem POS bersama PT. STA & meja kasir.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Papan harga digital, pencahayaan, Wi-Fi, dan signage promosi.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Pelatihan dan simulasi transaksi bagi guru dan siswa.</span>
              </li>
            </ul>
          </div>

          {/* Tahap 3 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-3 relative overflow-hidden group hover:border-sky-400 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200/60">
                FASE 3
              </span>
              <span className="text-[11px] font-mono text-slate-400">Agustus 2025</span>
            </div>
            <h4 className="font-bold text-base text-slate-900 dark:text-white">
              Evaluation & Sustainability
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Monitoring dan evaluasi keberlanjutan program toko mini market.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Integrasi ke dalam kurikulum Teaching Factory reguler.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Kolaborasi berkelanjutan dengan Tel-U, mitra industri, dan UMKM lokal.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Pelaksanaan utama seremoni & diseminasi: Selasa, 26 Agustus 2025.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* PROFIL MITRA & TIM PENGABDI */}
      <section id="mitra-section" className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold font-mono uppercase tracking-widest text-sky-600 dark:text-sky-400">
            Kolaborasi Institusi
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white mt-1">
            Mitra Sekolah & Tim Pengabdian Masyarakat
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mitra Sekolah: SMK Karya Abadi */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-50/50 to-white dark:from-slate-800 dark:to-slate-900 border border-sky-200/80 dark:border-sky-900/40 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900/60 flex items-center justify-center text-sky-600 dark:text-sky-300 shrink-0">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  SMK Karya Abadi Sumedang
                </h4>
                <p className="text-xs text-slate-500 font-mono">Mitra Utama Teaching Factory</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Sekolah Menengah Kejuruan yang berkomitmen menghadirkan kurikulum berbasis kompetensi kerja dan wirausaha modern, menjadi laboratorium hidup praktik ritel digital bagi siswa.
            </p>
            <div className="pt-2 border-t border-sky-100 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                <span>Jl. Raya Cijelag No. 329, Desa Cijelag, Kec. Pamulihan, Kab. Sumedang 45365</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-sky-600 shrink-0" />
                <span>Pelaksanaan Utama: Selasa, 26 Agustus 2025</span>
              </div>
            </div>
          </div>

          {/* Tim Pengabdi Telkom University */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-white dark:from-slate-800 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-900/40 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 flex items-center justify-center text-indigo-600 dark:text-indigo-300 shrink-0">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  Tim Dosen & Mahasiswa
                </h4>
                <p className="text-xs text-slate-500 font-mono">Telkom University & PT. STA</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Program pengabdian masyarakat skema pemberdayaan kemitraan masyarakat yang diketuai oleh Prof. Indrarini Dyah Irawati bersama dosen dan mahasiswa vokasi Telkom University.
            </p>
            <div className="pt-2 border-t border-indigo-100 dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                Susunan Tim Pelaksana:
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  'Indrarini Dyah Irawati',
                  'Dadan Nur Ramadhan',
                  'Didi Supriyadi',
                  'Arimbi Dwi Syabillah',
                  'Hannani Syadzwana Nur Ritonga',
                  'Muhammad Alfachri Akbar'
                ].map((member, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-lg bg-indigo-100/60 dark:bg-indigo-950/60 border border-indigo-200/50 text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                    {member}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMENTS & COMMUNITY FEEDBACK */}
      <section className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-sky-600" />
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Tanggapan & Diskusi Proyek Teaching Factory ({allComments.length})
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Dikelola oleh Administrator Smart Grow Lab
          </span>
        </div>

        {/* Existing Comments */}
        <div className="space-y-4">
          {allComments.map((comment) => (
            <div key={comment.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 space-y-1.5 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-xs text-slate-900 dark:text-white">
                  {comment.name}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {comment.timestamp}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {comment.content}
              </p>
            </div>
          ))}
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleFormSubmit} className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 font-mono">
            Beri Tanggapan / Masukan untuk Proyek Ini:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input 
              type="text" 
              placeholder="Nama Lengkap *" 
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-sky-500"
              required
            />
            <input 
              type="email" 
              placeholder="Email (Opsional)" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-sky-500"
            />
          </div>
          <textarea 
            placeholder="Tuliskan komentar atau pertanyaan Anda mengenai implementasi Smart Minimarket-QMART..." 
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            rows={3}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-sky-500"
            required
          />
          <div className="flex items-center justify-between pt-1">
            {commentSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Terima kasih! Masukan Anda telah berhasil dicatat.
              </span>
            )}
            <button
              type="submit"
              className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
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
              alt="Resolusi Penuh Poster Smart Minimarket QMART"
              className="max-h-[80vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain bg-white/10 border border-white/20 p-2"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex flex-wrap items-center justify-between gap-3 w-full max-w-2xl mt-4 px-2">
              <span className="text-xs text-slate-300 font-mono">
                Poster Resmi Implementasi Smart Mini Market Teaching Factory - SMK Karya Abadi
              </span>
              <a 
                href={modalImage} 
                download="poster-smart-minimarket-qmart.jpg"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <Download className="h-3.5 w-3.5" />
                <span>Unduh Poster</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
