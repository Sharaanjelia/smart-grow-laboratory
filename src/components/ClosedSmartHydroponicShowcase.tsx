import React, { useState } from 'react';
import { 
  Maximize2, 
  X, 
  Send, 
  MessageSquare, 
  ArrowLeft, 
  Share2, 
  Check, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Calendar, 
  Instagram,
  Sparkles,
  Layers,
  Leaf,
  Wind,
  SunMedium
} from 'lucide-react';
import { ProjectItem, Comment } from '../types';

interface ClosedSmartHydroponicShowcaseProps {
  item?: ProjectItem;
  comments?: Comment[];
  onBack: () => void;
  onAddComment?: (name: string, email: string, content: string) => void;
}

export default function ClosedSmartHydroponicShowcase({ 
  item, 
  comments = [], 
  onBack, 
  onAddComment 
}: ClosedSmartHydroponicShowcaseProps) {
  
  const thumbnailImageUrl = '/images/closed-smart-hydroponic/closed-smart-hydroponic.jpg';
  const reelUrl = 'https://www.instagram.com/reel/CwpE-96NzPK/?utm_source=ig_web_copy_link&exln=MzRlODBiNWFlZA%3D%3D&srtk=MzRlODBiNWFlZA%3D%3D';
  const reelEmbedUrl = 'https://www.instagram.com/reel/CwpE-96NzPK/embed/';

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
      id: 'c_csh1',
      name: 'Smart Grow Lab Enthusiast',
      email: 'visitor@smartgrow.id',
      content: 'Inovasi Smart Cabinet Closed Hydroponic yang sangat menarik untuk pertanian perkotaan (urban farming) di ruang terbatas dengan pencahayaan buatan terkontrol.',
      timestamp: '2023-09-02 11:30'
    }
  ];

  const allComments = comments.length > 0 ? comments : defaultComments;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in text-slate-800 dark:text-slate-100 pb-12 bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-xs">
      
      {/* TOP NAVIGATION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 sm:pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-purple-500 hover:text-purple-700 dark:hover:text-purple-400 transition-all cursor-pointer shadow-2xs group"
          id="closed-hydroponic-back-btn"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Kembali ke Daftar Proyek</span>
        </button>

        <div className="flex items-center gap-2.5">
          <a
            href={reelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-800 text-xs font-semibold hover:bg-pink-100 dark:hover:bg-pink-900/60 transition-all cursor-pointer"
          >
            <Instagram className="h-3.5 w-3.5 text-pink-600" />
            <span>Tonton Reel di Instagram</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            title="Salin tautan proyek ini"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-purple-600" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan'}</span>
          </button>
        </div>
      </div>

      {/* HERO BANNER SECTION (Purple / Fuchsia / Emerald Theme) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4c1d95] via-[#5b21b6] to-[#0f172a] text-white p-6 sm:p-8 shadow-xl border border-purple-500/30">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-purple-500/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-400/40 text-purple-200 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Leaf className="h-3.5 w-3.5 text-emerald-300" />
              Smart Agriculture & Green Technology
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-mono text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-pink-300" />
              Fakultas Ilmu Terapan, Telkom University
            </span>
          </div>

          {/* Thumbnail & Project Title Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-1">
            <div 
              onClick={() => window.open(reelUrl, '_blank', 'noopener,noreferrer')}
              className="w-20 h-28 sm:w-24 sm:h-32 rounded-2xl bg-slate-900 p-1 shadow-2xl border-2 border-purple-300/80 cursor-pointer shrink-0 hover:scale-105 transition-all flex flex-col items-center justify-center group/thumb relative overflow-hidden"
              title="Klik untuk langsung menonton Reel di Instagram"
            >
              <img 
                src={thumbnailImageUrl} 
                alt="Closed Smart Hydroponic Smart Cabinet" 
                className="w-full h-full object-cover object-center rounded-xl"
              />
              <div className="absolute inset-0 bg-purple-950/20 group-hover/thumb:bg-purple-950/40 transition-colors flex items-center justify-center">
                <ExternalLink className="h-4 w-4 text-white opacity-0 group-hover/thumb:opacity-100 transition-opacity drop-shadow" />
              </div>
              <span className="absolute bottom-1 bg-slate-950/85 text-[9px] font-mono font-bold text-purple-200 px-1.5 py-0.5 rounded shadow">
                Tonton Reel
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-sm">
                Closed Smart Hydroponic
              </h1>
              <p className="text-sm sm:text-base text-purple-200 font-mono font-medium flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                Smart Cabinet & Green Technology
              </p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-purple-100/95 font-medium leading-relaxed max-w-3xl">
            Dokumentasi sistem Closed Smart Hydroponic (Smart Cabinet) untuk budidaya tanaman presisi di dalam ruang tertutup dengan pencahayaan buatan LED grow light dan sirkulasi udara terkontrol.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={reelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs shadow-lg transition-all hover:scale-105 cursor-pointer"
            >
              <Instagram className="h-4 w-4" />
              <span>Tonton Reel di Instagram</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* DOKUMENTASI REEL & SMART CABINET SECTION */}
      <section id="dokumentasi-reel-section" className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-700/80 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
              <Instagram className="h-3.5 w-3.5 text-pink-500" />
              Dokumentasi Publikasi Instagram Reel
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Dokumentasi Closed Smart Hydroponic Cabinet
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
              Dipublikasikan melalui akun Instagram resmi @indrarini_dya (1 September 2023) dalam rangkaian penelitian dan edukasi green technology di Fakultas Ilmu Terapan, Telkom University.
            </p>
          </div>

          <a
            href={reelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold hover:bg-purple-100 transition-all cursor-pointer"
          >
            <span>Buka Tautan Asli</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Instagram Embed & Video Player Container */}
          <div className="lg:col-span-6 flex flex-col items-center space-y-3">
            <div className="w-full max-w-sm rounded-2xl overflow-hidden border-2 border-purple-200 dark:border-purple-800 shadow-xl bg-slate-950 relative">
              <iframe
                src={reelEmbedUrl}
                title="Instagram Reel - Closed Smart Hydroponic"
                className="w-full h-[520px] border-0"
                allowFullScreen
              />
            </div>
            <p className="text-[11px] font-mono text-slate-400 text-center">
              Tautan Reel: <a href={reelUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">instagram.com/reel/CwpE-96NzPK/</a>
            </p>
          </div>

          {/* Right: Original Post Content & Technical Features */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Original Caption Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-50/60 to-white dark:from-slate-800 dark:to-slate-900 border border-purple-200/80 dark:border-purple-900/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950 px-2.5 py-0.5 rounded-full">
                  Caption Postingan Resmi
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-purple-400" />
                  <span>1 September 2023</span>
                </span>
              </div>
              <blockquote className="text-sm italic font-serif text-slate-800 dark:text-slate-200 border-l-4 border-purple-500 pl-3 py-1">
                &ldquo;Never stop learning because life will never stop teaching.<br />
                Let's use every opportunity to learn something new anytime and anywhere.&rdquo;
              </blockquote>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-purple-100 dark:border-slate-700">
                {[
                  '#closed',
                  '#smarthydroponic',
                  '#smartcabinet',
                  '#greentechnology',
                  '#fakultasilmuterapan',
                  '#telkomuniversity'
                ].map((tag, i) => (
                  <span key={i} className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-purple-100/70 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Factual Visible Components in Documentation */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Komponen Sistem pada Smart Cabinet:
              </h4>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/80 dark:border-slate-700 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                  <SunMedium className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white">Pencahayaan LED Grow Light</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Instalasi lampu LED buatan dengan spektrum warna merah dan biru (merah keunguan) untuk menyuplai fotosintesis tanaman hidroponik di dalam kabinet tertutup.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/80 dark:border-slate-700 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Wind className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white">Kipas Sirkulasi Udara (Air Circulation Fan)</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Kipas sirkulasi udara di bagian atas kabinet untuk mengatur aliran udara segar dan mencegah kelembapan berlebih di ruang tumbuh tertutup.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/80 dark:border-slate-700 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white">Dual-Tier Hydroponic Tray</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Dua tingkat rak wadah penampung larutan nutrisi dan netpot tempat pertumbuhan bibit dan tanaman selada.
                  </p>
                </div>
              </div>
            </div>

            {/* Click to Zoom Thumbnail Button */}
            <div className="pt-2">
              <button
                onClick={() => setModalImage(thumbnailImageUrl)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
              >
                <Maximize2 className="h-3.5 w-3.5 text-purple-600" />
                <span>Lihat Foto Dokumentasi Resolusi Penuh</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* COMMENTS & COMMUNITY FEEDBACK */}
      <section className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-purple-600" />
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
              Diskusi & Masukan Proyek ({allComments.length})
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
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-purple-500"
              required
            />
            <input 
              type="email" 
              placeholder="Email (Opsional)" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-purple-500"
            />
          </div>
          <textarea 
            placeholder="Tuliskan komentar atau apresiasi Anda untuk proyek Closed Smart Hydroponic..." 
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            rows={3}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-purple-500"
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
              className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
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
          <div className="relative max-w-lg w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
            <img 
              src={modalImage} 
              alt="Resolusi Penuh Closed Smart Hydroponic"
              className="max-h-[80vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain bg-white/10 border border-white/20 p-2"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex flex-wrap items-center justify-between gap-3 w-full mt-4 px-2">
              <span className="text-xs text-slate-300 font-mono">
                Closed Smart Hydroponic - Smart Cabinet (@indrarini_dya)
              </span>
              <a 
                href={modalImage} 
                download="closed-smart-hydroponic.jpg"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
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
