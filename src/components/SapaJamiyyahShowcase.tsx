import React, { useState } from 'react';
import { 
  Maximize2, 
  X, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  Users,
  Building2,
  Calendar,
  Share2,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Clock,
  Check,
  Heart,
  FileText,
  HelpCircle,
  Vote,
  Newspaper,
  ChevronRight,
  TrendingUp,
  Award,
  Lock,
  MessageCircle,
  Layers,
  Sparkle
} from 'lucide-react';
import { ProjectItem, Comment } from '../types';

interface SapaJamiyyahShowcaseProps {
  item?: ProjectItem;
  comments?: Comment[];
  onBack: () => void;
  onAddComment?: (name: string, email: string, content: string) => void;
}

interface AspirasiTicket {
  id: string;
  sender: string;
  category: string;
  title: string;
  date: string;
  status: 'Diterima' | 'Diproses' | 'Selesai';
  response?: string;
}

const INITIAL_ASPIRASI: AspirasiTicket[] = [
  {
    id: 'ASP-2026-081',
    sender: 'Bunda Rayyan (Kelas 8A)',
    category: 'Akademik & Riset',
    title: 'Penambahan Jam Ekskul Koding & Robotika Laboratorium Sains',
    date: '12 Sep 2026',
    status: 'Selesai',
    response: 'Alhamdulillah telah disetujui pihak sekolah dan akan dimulai awal Oktober 2026 bersama instruktur Smart Grow Lab.'
  },
  {
    id: 'ASP-2026-085',
    sender: 'Ayah Fatih (Kelas 7B)',
    category: 'Fasilitas & Lingkungan',
    title: 'Usulan Penyediaan Dispenser Air Bersih Higienis di Tiap Selasar Kelas',
    date: '13 Sep 2026',
    status: 'Diproses',
    response: 'Sedang dilakukan pengadaan 6 unit filter UV bersama divisi sarpras sekolah.'
  },
  {
    id: 'ASP-2026-089',
    sender: 'Mama Zahra (Kelas 9C)',
    category: 'Kegiatan Parenting',
    title: 'Seminar Parenting: Pendampingan Mental Remaja di Era Kecerdasan Buatan',
    date: 'Hari ini',
    status: 'Diterima',
    response: 'Aspirasi masuk ke agenda rapat pleno Jamiyyah 2024–2026.'
  }
];

export default function SapaJamiyyahShowcase({ 
  item, 
  comments = [], 
  onBack, 
  onAddComment 
}: SapaJamiyyahShowcaseProps) {
  
  const heroImageUrl = '/images/sapa-jamiyyah/sapa-jamiyyah-hero.png';
  const officialWebUrl = 'https://www.sapajamiyyah.com/';

  const [modalImage, setModalImage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'aspirasi' | 'donasi' | 'catatan' | 'berita' | 'angket'>('aspirasi');

  // Interactive Aspirasi State
  const [aspirasiList, setAspirasiList] = useState<AspirasiTicket[]>(INITIAL_ASPIRASI);
  const [newSender, setNewSender] = useState('');
  const [newCategory, setNewCategory] = useState('Akademik & Riset');
  const [newTitle, setNewTitle] = useState('');
  const [aspirasiSuccess, setAspirasiSuccess] = useState(false);

  // Interactive Donasi State
  const [donasiRaised, setDonasiRaised] = useState(42750000);
  const donasiTarget = 50000000;
  const [lastDonationAmount, setLastDonationAmount] = useState<number | null>(null);
  const [donasiDonorCount, setDonasiDonorCount] = useState(168);

  // Interactive Poll / Angket State
  const [pollVoted, setPollVoted] = useState<string | null>(null);
  const [pollVotes, setPollVotes] = useState({
    opt1: 84, // Koding & AI Robotika
    opt2: 45, // Public Speaking & Bahasa Arab
    opt3: 38  // Panahan & Olahraga Sunnah
  });

  // Comment Form States
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Default initial comments
  const defaultComments: Comment[] = [
    {
      id: 'c_sapa1',
      name: 'Hj. Ratna Sari Dewi',
      email: 'ratnasari@alazhar36.sch.id',
      content: 'Inisiatif SAPA Jam\'iyyah ini sangat luar biasa. Komunikasi antara orang tua dan pihak sekolah kini jauh lebih transparan, mudah diakses kapan saja, dan laporan donasi tercatat dengan rapi.',
      timestamp: '2026-09-14 08:30'
    },
    {
      id: 'c_sapa2',
      name: 'Dr. Ir. Hendra Prasetyo',
      email: 'hendra.p@alazhar.or.id',
      content: 'Kanal aspirasi digitalnya sangat membantu kami para wali murid menyampaikan masukan konstruktif untuk kurikulum dan fasilitas santri tanpa perlu menunggu rapat tahunan.',
      timestamp: '2026-09-14 09:45'
    },
    {
      id: 'c_sapa3',
      name: 'Pengurus Jam\'iyyah 2024–2026',
      email: 'admin@sapajamiyyah.com',
      content: 'Jazakumullah khairan katsiran kepada seluruh keluarga besar SMPI Al Azhar 36 Bandung yang terus aktif berpartisipasi mewujudkan sinergi sekolah unggul.',
      timestamp: '2026-09-14 10:15'
    }
  ];

  const allComments = comments.length > 0 ? comments : defaultComments;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleKirimAspirasi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSender.trim() || !newTitle.trim()) return;

    const newTicket: AspirasiTicket = {
      id: `ASP-2026-${Math.floor(100 + Math.random() * 900)}`,
      sender: newSender.trim(),
      category: newCategory,
      title: newTitle.trim(),
      date: 'Baru saja',
      status: 'Diterima',
      response: 'Terima kasih atas masukan berharga Anda. Tiket diteruskan ke tim pengurus Jam\'iyyah.'
    };

    setAspirasiList([newTicket, ...aspirasiList]);
    setNewSender('');
    setNewTitle('');
    setAspirasiSuccess(true);
    setTimeout(() => setAspirasiSuccess(false), 4000);
  };

  const handleSimulasiDonasi = (nominal: number) => {
    setDonasiRaised(prev => prev + nominal);
    setDonasiDonorCount(prev => prev + 1);
    setLastDonationAmount(nominal);
    setTimeout(() => setLastDonationAmount(null), 3000);
  };

  const handleVotePoll = (optionKey: 'opt1' | 'opt2' | 'opt3') => {
    if (pollVoted) return;
    setPollVotes(prev => ({
      ...prev,
      [optionKey]: prev[optionKey] + 1
    }));
    setPollVoted(optionKey);
  };

  const totalPollVotes = pollVotes.opt1 + pollVotes.opt2 + pollVotes.opt3;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !textInput.trim()) return;

    if (onAddComment) {
      onAddComment(nameInput.trim(), emailInput.trim(), textInput.trim());
    }
    setNameInput('');
    setEmailInput('');
    setTextInput('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3500);
  };

  const donasiPercent = Math.min(100, Math.round((donasiRaised / donasiTarget) * 100));

  return (
    <div className="space-y-10 animate-fade-in text-slate-800 dark:text-slate-100 pb-16 bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-xs">
      
      {/* TOP NAVIGATION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Kembali ke Daftar Proyek</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span>Projek Unggulan</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">SAPA Jam'iyyah Al Azhar 36</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={officialWebUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm hover:scale-105 cursor-pointer"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Kunjungi Website sapajamiyyah.com</span>
          </a>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            title="Salin tautan projek ini"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan'}</span>
          </button>
        </div>
      </div>

      {/* HERO BANNER SECTION (Emerald & Gold Al Azhar Identity) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#0f766e] text-white p-8 sm:p-12 shadow-xl border border-emerald-600/30">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-emerald-200 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkle className="w-3.5 h-3.5 text-amber-300" />
              Program Unggulan Jam'iyyah 2024–2026
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-mono text-xs font-semibold">
              <Building2 className="h-3.5 w-3.5 text-emerald-200" />
              SMPI Al Azhar 36 Bandung
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-300/30 text-amber-200 font-mono text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-300" />
              Transparan & Terpercaya
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-sm">
            SAPA Jam'iyyah SMPI Al Azhar 36 Bandung
          </h1>

          <p className="text-base sm:text-lg text-emerald-50/95 font-medium leading-relaxed max-w-3xl">
            Media komunikasi resmi dan terintegrasi antara Orang Tua dan Pihak Sekolah — memfasilitasi penyampaian aspirasi dua arah, transparansi penggalangan donasi & infaq kegiatan santri, publikasi catatan musyawarah pleno, warta berita terkini, serta pengisian angket kebijakan secara terbuka dan bermakna.
          </p>

          {/* Quick CTA Action Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={officialWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all shadow-lg hover:scale-105 cursor-pointer"
            >
              <span>Kunjungi Website sapajamiyyah.com</span>
              <ExternalLink className="h-4 w-4" />
            </a>

            <button
              onClick={() => {
                const el = document.getElementById('demo-interactive-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition-all cursor-pointer"
            >
              <span>Coba Demo Interaktif Platform</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4 CORE KPI METRICS (Clean White Cards) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Resolusi Aspirasi</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">94.8%</div>
          <p className="text-[11px] text-slate-500 mt-1">Aspirasi wali murid terselesaikan tepat waktu</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Audit Donasi</span>
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">100%</div>
          <p className="text-[11px] text-slate-500 mt-1">Transparansi penyaluran infaq & dana sosial</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Partisipasi Angket</span>
            <Vote className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">88.5%</div>
          <p className="text-[11px] text-slate-500 mt-1">Keterlibatan orang tua dalam survei kebijakan</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-emerald-400 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">Respon Cepat</span>
            <Clock className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">&lt; 2 Jam</div>
          <p className="text-[11px] text-slate-500 mt-1">Rata-rata waktu tanggapan pengurus Jam'iyyah</p>
        </div>
      </section>

      {/* SCREENSHOT & VISUAL PREVIEW SECTION */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Visual Platform Live
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Tangkapan Layar Antarmuka SAPA Jam'iyyah
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Desain modern berkarakter Islami, responsif pada ponsel pintar dan peramban desktop wali murid.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setModalImage(heroImageUrl)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all cursor-pointer"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Perbesar Tangkapan Layar</span>
            </button>
            <a
              href={officialWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 text-xs font-bold border border-emerald-200 dark:border-emerald-800 transition-all cursor-pointer"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>sapajamiyyah.com</span>
            </a>
          </div>
        </div>

        {/* Screenshot Image Container */}
        <div 
          onClick={() => setModalImage(heroImageUrl)}
          className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-900 shadow-md cursor-pointer aspect-video sm:aspect-21/9"
        >
          <img 
            src={heroImageUrl} 
            alt="Tampilan Antarmuka Beranda SAPA Jam'iyyah SMPI Al Azhar 36 Bandung"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/95 text-slate-900 font-bold text-xs shadow-xl">
              <Maximize2 className="h-4 w-4 text-emerald-600" />
              Klik untuk Melihat Resolusi Penuh
            </span>
          </div>
        </div>

        {/* Highlight Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200/60 dark:border-slate-700">
            <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Aman & Terverifikasi</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Akses terproteksi bagi wali murid aktif dan manajemen sekolah dengan enkripsi data SSL.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200/60 dark:border-slate-700">
            <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Transparansi Real-Time</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Setiap rupiah infaq dan nomor tiket aspirasi dapat dilacak status dan realisasinya secara terbuka.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200/60 dark:border-slate-700">
            <div className="h-9 w-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Kolaborasi Dua Arah</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Menghubungkan orang tua, guru, dan pengurus Jam'iyyah secara harmonis demi kemajuan santri.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 PILAR EKOSISTEM INTERAKTIF (Demo Simulation) */}
      <section id="demo-interactive-section" className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            Interaktif & Eksploratif
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
            5 Pilar Utama Platform SAPA Jam'iyyah
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Silakan pilih fitur di bawah untuk mencoba simulasi alur kerja interaktif platform:
          </p>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
          {[
            { id: 'aspirasi', label: '💬 Aspirasi Orang Tua', badge: `${aspirasiList.length} Tiket` },
            { id: 'donasi', label: '🤝 Donasi & Infaq', badge: `${donasiPercent}% Tercapai` },
            { id: 'catatan', label: '📋 Catatan & Notulensi', badge: 'Arsip Pleno' },
            { id: 'berita', label: '📰 Warta Berita Sekolah', badge: 'Info Terkini' },
            { id: 'angket', label: '📊 Angket & Polling', badge: 'Live Vote' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-emerald-900/60 text-emerald-100' : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
                }`}>
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ASPIRASI */}
        {activeTab === 'aspirasi' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Form Simulasi Kirim Aspirasi */}
              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-700/40 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  <MessageSquare className="h-4 w-4" />
                  <span>Simulasi Kirim Aspirasi Wali Murid</span>
                </div>
                <p className="text-xs text-slate-500">
                  Uji coba bagaimana aspirasi atau masukan dari orang tua murid dicatat ke sistem pelacakan tiket pengurus.
                </p>

                {aspirasiSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center gap-2 animate-bounce">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Aspirasi berhasil dicatat ke sistem dan nomor tiket diterbitkan!</span>
                  </div>
                )}

                <form onSubmit={handleKirimAspirasi} className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">
                      Identitas / Perwakilan Wali
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Bunda Hanif (Kelas 7C)"
                      value={newSender}
                      onChange={(e) => setNewSender(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-emerald-600 text-slate-800 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">
                      Kategori Aspirasi
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-emerald-600 text-slate-800 dark:text-white cursor-pointer"
                    >
                      <option value="Akademik & Riset">Akademik & Riset</option>
                      <option value="Fasilitas & Lingkungan">Fasilitas & Lingkungan</option>
                      <option value="Kegiatan Parenting">Kegiatan Parenting</option>
                      <option value="Karakter & Keagamaan">Karakter & Keagamaan</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-600 dark:text-slate-300 mb-1">
                      Uraian Aspirasi / Masukan
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tuliskan usulan atau masukan konstruktif untuk kemajuan santri..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 focus:outline-emerald-600 text-slate-800 dark:text-white resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Terbitkan Tiket Aspirasi Baru</span>
                  </button>
                </form>
              </div>

              {/* Daftar Tiket Aspirasi */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Pelacakan Status Aspirasi Real-Time
                  </h3>
                  <span className="text-[11px] text-emerald-600 font-semibold font-mono">
                    {aspirasiList.length} Masukan Tercatat
                  </span>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {aspirasiList.map((ticket) => {
                    const statusClass = 
                      ticket.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                      ticket.status === 'Diproses' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                      'bg-sky-100 text-sky-800 border-sky-300';

                    return (
                      <div key={ticket.id} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-2 hover:border-emerald-300 transition-all">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                                {ticket.id}
                              </span>
                              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                                {ticket.sender}
                              </span>
                            </div>
                            <span className="text-[10px] text-slate-400 mt-0.5 inline-block">
                              Kategori: {ticket.category} • {ticket.date}
                            </span>
                          </div>

                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusClass}`}>
                            {ticket.status}
                          </span>
                        </div>

                        <p className="text-xs font-medium text-slate-900 dark:text-white leading-relaxed">
                          "{ticket.title}"
                        </p>

                        {ticket.response && (
                          <div className="text-[11px] p-2.5 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 border-l-2 border-emerald-500 flex items-start gap-1.5">
                            <span className="font-bold text-emerald-700 dark:text-emerald-400 shrink-0">Tanggapan Pengurus:</span>
                            <span>{ticket.response}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DONASI */}
        {activeTab === 'donasi' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl p-6 sm:p-8 border border-emerald-200 dark:border-emerald-800/60 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
                    <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
                    Kampanye Donasi Aktif
                  </span>
                  <h3 className="text-xl font-bold font-display text-slate-900 dark:text-white">
                    Infaq Pengembangan Sarana Riset & Laboratorium Santri
                  </h3>
                  <p className="text-xs text-slate-500 max-w-2xl">
                    Dukungan fasilitas teknologi pembelajaran cerdas, peralatan riset, serta pembaruan laboratorium sains dan koding SMPI Al Azhar 36 Bandung.
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Donatur</div>
                  <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-display">
                    {donasiDonorCount} Wali Murid
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-end text-xs">
                  <div>
                    <span className="text-slate-400 font-mono">Terkumpul: </span>
                    <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                      Rp {donasiRaised.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 font-mono">Target: </span>
                    <span className="font-bold text-slate-700 dark:text-slate-200 font-mono">
                      Rp {donasiTarget.toLocaleString('id-ID')}
                    </span>
                    <span className="ml-2 font-bold text-emerald-700 dark:text-emerald-400">({donasiPercent}%)</span>
                  </div>
                </div>

                <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-400 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${donasiPercent}%` }}
                  />
                </div>
              </div>

              {/* Simulasi Quick Infaq Buttons */}
              <div className="pt-2 border-t border-emerald-200/60 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    Simulasi Tambah Infaq Digital (Klik untuk menguji respon live counter):
                  </span>
                  {lastDonationAmount && (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
                      + Rp {lastDonationAmount.toLocaleString('id-ID')} berhasil disimulasikan!
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {[25000, 50000, 100000, 250000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => handleSimulasiDonasi(amt)}
                      className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-800 dark:text-white border border-emerald-300 dark:border-emerald-800 text-xs font-bold transition-all shadow-2xs hover:scale-105 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>+ Rp {amt.toLocaleString('id-ID')}</span>
                    </button>
                  ))}

                  <a
                    href="https://www.sapajamiyyah.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm ml-auto flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Salurkan Donasi Resmi</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CATATAN & NOTULENSI */}
        {activeTab === 'catatan' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Dokumentasi & Notulensi Resmi Musyawarah Jam'iyyah
              </h3>
              <span className="text-[11px] text-slate-400">Periode Kepengurusan 2024–2026</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600">
                  <FileText className="h-4 w-4" />
                  <span className="text-xs font-mono font-bold">NOT-PLENO-01</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Rapat Kerja Pleno Awal Tahun Ajaran 2024/2025
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Penetapan program kerja bidang pendidikan, dakwah keislaman, hubungan masyarakat, dan sarana prasarana sekolah.
                </p>
                <div className="pt-2 text-[10px] text-slate-400 font-mono">
                  Dipublikasikan: 28 Juli 2024 • Status: LPJ Disahkan
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600">
                  <FileText className="h-4 w-4" />
                  <span className="text-xs font-mono font-bold">NOT-EVAL-02</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Evaluasi Semester Ganjil & Laporan Keuangan Terbuka
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Rekapitulasi penggunaan dana infaq kegiatan santri, santunan dhuafa, dan persiapan Milad Al Azhar 36 Bandung.
                </p>
                <div className="pt-2 text-[10px] text-slate-400 font-mono">
                  Dipublikasikan: 15 Januari 2025 • Status: Terverifikasi
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600">
                  <FileText className="h-4 w-4" />
                  <span className="text-xs font-mono font-bold">NOT-PROGRAM-03</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Pengembangan Platform Digital SAPA Jam'iyyah
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Persetujuan adopsi portal web resmi sapajamiyyah.com sebagai kanal tunggal informasi dan transparansi donasi komite.
                </p>
                <div className="pt-2 text-[10px] text-slate-400 font-mono">
                  Dipublikasikan: 10 September 2026 • Status: Aktif & Live
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BERITA SEKOLAH */}
        {activeTab === 'berita' && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Warta Berita & Prestasi Santri SMPI Al Azhar 36 Bandung
              </h3>
              <a 
                href="https://www.sapajamiyyah.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
                <span>Lihat Seluruh Berita</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 flex gap-4">
                <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0">
                  <Award className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase font-mono">Prestasi Akademik</span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    Santri SMPI Al Azhar 36 Raih Medali Emas Olimpiade Sains & Robotika Pelajar Nasional
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Apresiasi tinggi kepada tim riset koding santri yang berhasil mengharumkan nama sekolah di kancah nasional.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 flex gap-4">
                <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-700 dark:text-amber-300 shrink-0">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-amber-600 uppercase font-mono">Agenda Mendatang</span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                    Kajian Akbar Parenting Bersama Jam'iyyah & Wisuda Tahfidz Al-Qur'an Juz 30 & 29
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Mengundang seluruh ayah bunda wali murid untuk hadir mempererat ukhuwah dan menyemarakkan syiar Islam.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ANGKET & POLLING */}
        {activeTab === 'angket' && (
          <div className="space-y-5 animate-fade-in bg-slate-50 dark:bg-slate-700/30 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full">
                  <Vote className="h-3 w-3" />
                  Polling Aktif Wali Murid
                </span>
                <h3 className="text-base font-bold font-display text-slate-900 dark:text-white mt-1">
                  Prioritas Peminatan Ekstrakurikuler Unggulan Santri Semester Depan
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Total {totalPollVotes} Suara Masuk
              </span>
            </div>

            {pollVoted && (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Terima kasih! Pilihan suara Anda telah berhasil disimpan ke tabulasi angket.</span>
              </div>
            )}

            <div className="space-y-3">
              {[
                { key: 'opt1', label: 'Koding, AI & Robotika Cerdas Laboratorium', votes: pollVotes.opt1 },
                { key: 'opt2', label: 'Public Speaking, Bahasa Arab & Bahasa Inggris Internasional', votes: pollVotes.opt2 },
                { key: 'opt3', label: 'Panahan, Berkuda Sunnah & Olahraga Bela Diri', votes: pollVotes.opt3 },
              ].map((opt) => {
                const percent = Math.round((opt.votes / totalPollVotes) * 100);
                const isSelected = pollVoted === opt.key;

                return (
                  <div
                    key={opt.key}
                    onClick={() => handleVotePoll(opt.key as any)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs font-bold mb-2">
                      <span className="text-slate-800 dark:text-slate-200">{opt.label}</span>
                      <span className="font-mono text-emerald-700 dark:text-emerald-400">
                        {opt.votes} Suara ({percent}%)
                      </span>
                    </div>

                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            
            <p className="text-[11px] text-slate-400 text-center">
              Hasil polling otomatis dirangkum ke agenda laporan pleno pengurus Jam'iyyah bersama pimpinan sekolah.
            </p>
          </div>
        )}
      </section>

      {/* STRUKTUR TATA KELOLA PERAN (ROLE-BASED GOVERNANCE) */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            Tata Kelola Keamanan & Hak Akses
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
            Hirarki Akses Multi-Level SAPA Jam'iyyah
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Menjamin kerahasiaan identitas wali murid dan akuntabilitas tindak lanjut kebijakan sekolah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                01
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Super Admin Jam'iyyah</h4>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Kelola akun pengurus & hak akses</li>
              <li>Validasi verifikasi rekening donasi</li>
              <li>Publikasi laporan pertanggungjawaban</li>
              <li>Monitoring seluruh tiket aduan masuk</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold text-xs">
                02
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Manajemen Sekolah & Guru</h4>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Merespon tiket aspirasi bidang kurikulum</li>
              <li>Koordinasi sarana prasarana kelas</li>
              <li>Pembaruan kalender akademik & event</li>
              <li>Kajian hasil angket wali murid</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-700 dark:text-amber-300 font-bold text-xs">
                03
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Orang Tua / Wali Murid</h4>
            </div>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc list-inside">
              <li>Menyampaikan aspirasi secara aman</li>
              <li>Salurkan infaq dengan bukti digital</li>
              <li>Akses notulensi dan arsip pleno</li>
              <li>Partisipasi dalam angket berkala</li>
            </ul>
          </div>
        </div>
      </section>

      {/* DISKUSI & KOMENTAR PENGUNJUNG */}
      <section className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
              Umpan Balik & Tanggapan
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white">
              Diskusi Komunitas & Evaluasi Projek
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {allComments.length} Pesan
          </span>
        </div>

        {/* Comment Input Form */}
        <form onSubmit={handleCommentSubmit} className="space-y-3 bg-slate-50 dark:bg-slate-700/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <h4 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-200">
            Tinggalkan Masukan untuk Proyek SAPA Jam'iyyah
          </h4>

          {commentSuccess && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Komentar Anda berhasil ditambahkan!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Nama Lengkap / Identitas Wali"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-emerald-600"
              required
            />
            <input
              type="email"
              placeholder="Email (Opsional)"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-emerald-600"
            />
          </div>

          <textarea
            rows={3}
            placeholder="Tuliskan komentar atau apresiasi Anda terkait platform ini..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-emerald-600 resize-none"
            required
          />

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Kirim Komentar</span>
          </button>
        </form>

        {/* Comment List */}
        <div className="space-y-3">
          {allComments.map((c) => (
            <div key={c.id} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">{c.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">{c.timestamp}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {c.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL BOTTOM CALL-TO-ACTION */}
      <section className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-8 text-center space-y-4 shadow-lg">
        <h3 className="text-xl sm:text-2xl font-bold font-display">
          Akses Langsung Portal SAPA Jam'iyyah
        </h3>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
          Kunjungi situs resmi sapajamiyyah.com untuk berpartisipasi dalam program unggulan Jam'iyyah SMPI Al Azhar 36 Bandung periode 2024–2026.
        </p>
        <div>
          <a
            href={officialWebUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-sm transition-all shadow-xl hover:scale-105 cursor-pointer"
          >
            <span>Buka Website sapajamiyyah.com</span>
            <ExternalLink className="h-4 w-4 text-emerald-700" />
          </a>
        </div>
      </section>

      {/* FULLSCREEN IMAGE MODAL */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
            <img 
              src={modalImage} 
              alt="Resolusi Penuh SAPA Jam'iyyah"
              className="max-h-[85vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
            <span className="text-xs text-slate-300 mt-3 font-mono">
              Tangkapan Layar SAPA Jam'iyyah SMPI Al Azhar 36 Bandung (sapajamiyyah.com)
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
