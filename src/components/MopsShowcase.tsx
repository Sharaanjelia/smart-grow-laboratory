import React, { useState } from 'react';
import { 
  Send, 
  MessageSquare, 
  CheckCircle2,
  Users, 
  Building2, 
  Calendar, 
  Share2, 
  ArrowLeft, 
  ExternalLink, 
  ShieldCheck, 
  Check, 
  Truck, 
  Eye, 
  Ruler,
  BarChart3,
  HelpCircle,
  FileText,
  Maximize2,
  X,
  Camera,
  Zap,
  Cpu
} from 'lucide-react';
import { ProjectItem, Comment } from '../types';

interface MopsShowcaseProps {
  item?: ProjectItem;
  comments?: Comment[];
  onBack: () => void;
  onAddComment?: (name: string, email: string, content: string) => void;
}

export default function MopsShowcase({ 
  item, 
  comments = [], 
  onBack, 
  onAddComment 
}: MopsShowcaseProps) {
  
  const hardwareImageUrl = '/images/mops/mops-hardware-installation.png';
  const officialWebUrl = 'https://mops-5f51b.web.app/';
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

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
      id: 'c_mops1',
      name: 'Dinas Lingkungan Hidup (DLH) Kota Bandung',
      email: 'bidang.kebersihan@bandung.go.id',
      content: 'Inovasi MOPS sangat membantu pengawasan TPS padat penduduk di Kota Bandung. Data sensor ToF dan feed visual CCTV memungkinkan kami mengarahkan rute truk sampah sebelum terjadi luberan ke jalan raya.',
      timestamp: '2026-09-14 08:30'
    },
    {
      id: 'c_mops2',
      name: 'Rahmat Subagja (Koordinator TPS Coblong)',
      email: 'rahmat.subagja@gmail.com',
      content: 'Sebagai operator di lapangan, dashboard peran MOPS mempermudah konfirmasi jadwal pengangkutan armada penjemput. Alert kritis langsung masuk ketika bak penampungan mendekati 85%.',
      timestamp: '2026-09-14 09:15'
    },
    {
      id: 'c_mops3',
      name: 'Siti Rahmawati (Warga Bandung)',
      email: 'siti.rahma@student.telkomuniversity.ac.id',
      content: 'Portal publiknya sangat transparan! Warga bisa melihat langsung TPS mana yang sedang penuh atau siap menerima sampah rumah tangga secara real-time, plus ada menu aduan cepat.',
      timestamp: '2026-09-14 10:05'
    }
  ];

  const allComments = comments.length > 0 ? comments : defaultComments;

  return (
    <div className="space-y-10 animate-fade-in text-slate-800 dark:text-slate-100 pb-16">
      
      {/* TOP NAVIGATION BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Kembali ke Daftar Proyek</span>
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={officialWebUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm hover:scale-105 cursor-pointer"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Kunjungi Website Resmi MOPS</span>
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

      {/* HERO BANNER SECTION (Rich Emerald Gradient Card) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#0f766e] text-white p-8 sm:p-12 shadow-xl border border-emerald-600/30">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-teal-300/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">

          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-sm">
            MOPS: Sistem Monitoring & Operasional Persampahan Kota Bandung
          </h1>

          <p className="text-base sm:text-lg text-emerald-50/95 font-medium leading-relaxed max-w-3xl">
            Platform Smart City berbasis IoT dan Web yang dirancang secara komprehensif untuk memantau kondisi volume sampah di Tempat Pembuangan Sementara (TPS) se-Kota Bandung secara real-time, mencegah terjadinya luberan sampah, dan mengefisiensikan rute logistik armada truk sampah Dinas Lingkungan Hidup (DLH).
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-emerald-200 font-mono">
            <span>Riset & Inovasi: <strong>Smart Grow Laboratory</strong> (Telkom University)</span>
            <span>Target Wilayah: <strong>TPS Prioritas Kota Bandung</strong></span>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <a
              href={officialWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-xl transition-all hover:scale-105"
            >
              <Eye className="h-4 w-4 text-slate-950" />
              <span>Buka Website Resmi MOPS (mops-5f51b.web.app)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <button
              onClick={() => {
                const el = document.getElementById('hardware-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            >
              <Maximize2 className="h-4 w-4 text-emerald-300" />
              <span>Lihat Dokumentasi Tiang Hardware</span>
            </button>
          </div>
        </div>
      </section>

      {/* QUICK METRICS ROW (Clean Light Cards) */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase block">Status Jaringan</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">99.8%</div>
          <span className="text-[11px] text-slate-500">Uptime Telemetri Cloud</span>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase block">Waktu Tanggap</span>
          <div className="text-2xl font-black text-teal-600 dark:text-teal-400">&lt; 35 mnt</div>
          <span className="text-[11px] text-slate-500">Dispatch Armada Cepat</span>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase block">Akurasi Jarak Laser</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">± 1.2 cm</div>
          <span className="text-[11px] text-slate-500">Sensor ToF TOF400F</span>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase block">Pencegahan Luberan</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">78%</div>
          <span className="text-[11px] text-slate-500">Reduksi Sampah Meluap</span>
        </div>
      </section>



      {/* ========================================================================= */}
      {/* DOKUMENTASI FISIK TIANG PEMANTAU MOPS */}
      {/* ========================================================================= */}
      <section id="hardware-section" className="space-y-6 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
              Dokumentasi & Desain Teknis
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Instalasi Fisik Tiang Pemantau MOPS
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mt-1">
              Struktur modular tiang baja galvanis yang dipasang pada bibir Tempat Pembuangan Sementara (TPS) untuk mengintegrasikan kamera, sensor jarak ToF laser, edge computing box, dan catu daya listrik PLN.
            </p>
          </div>

          <button
            onClick={() => setModalImage(hardwareImageUrl)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-800 transition-all cursor-pointer shadow-2xs"
          >
            <Maximize2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>Perbesar Gambar Lengkap</span>
          </button>
        </div>

        {/* Hardware Infographic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          
          {/* Left: The uploaded Image Diagram */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div 
              onClick={() => setModalImage(hardwareImageUrl)}
              className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-2 shadow-sm cursor-pointer group hover:border-emerald-500 transition-all"
            >
              <img
                src={hardwareImageUrl}
                alt="Instalasi Fisik Tiang Hardware MOPS (Tampak Depan, Tampak Samping, Tampak Atas)"
                className="w-full h-auto object-contain rounded-xl group-hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-emerald-950/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900/90 text-white text-xs font-bold border border-white/20 shadow-lg">
                  <Maximize2 className="h-4 w-4 text-emerald-400" />
                  Klik untuk Memperbesar Resolusi Penuh
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-3 text-center">
              Dokumentasi Teknis Tiang Pemantau MOPS: Tampak Depan, Tampak Samping, dan Tampak Atas Lapangan TPS.
            </p>
          </div>

          {/* Right: Component Descriptions matching the diagram */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Item 1: IP Camera */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all space-y-1">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <Camera className="h-4 w-4" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">IP Camera Outdoor (TP-Link VIGI C340)</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Monitoring visual TPS beresolusi tinggi, memantau aktivitas pembuangan warga, kedisiplinan petugas, serta pencatatan plat dan durasi kedatangan kendaraan pengangkut.
              </p>
            </div>

            {/* Item 2: Sensor Node ToF */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-amber-500 transition-all space-y-1">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <Ruler className="h-4 w-4" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Sensor Node ToF (TOF400F)</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Sensor jarak laser Time-of-Flight presisi tinggi untuk mengukur jarak permukaan timbunan sampah ke sensor, menghasilkan estimasi persentase tingkat kepenuhan volume TPS secara continuous.
              </p>
            </div>

            {/* Item 3: Control Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all space-y-1">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <Cpu className="h-4 w-4" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Control Box & Edge Gateway</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Pusat pemrosesan komputasi edge di lapangan, modul komunikasi data (4G/Wi-Fi) ke cloud backend, manajemen power supply, dan pengaman korsleting listrik.
              </p>
            </div>

            {/* Item 4: Sumber Daya Listrik */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-teal-500 transition-all space-y-1">
              <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400">
                <Zap className="h-4 w-4" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Sumber Daya Listrik (Kabel PLN)</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Pasokan daya utama kabel PLN dengan kabel standar outdoor dan surge protector untuk menjamin pengoperasian sistem nonstop 24 jam 7 hari seminggu di segala cuaca.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4 PILAR TEKNOLOGI MOPS */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">Architecture Core</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            4 Pilar Teknologi Ekosistem MOPS
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Membangun rantai tata kelola persampahan kota yang cerdas, mulai dari sensor permukaan TPS hingga otomatisasi logistik armada truk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pilar 1 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 transition-all hover:scale-[1.02] flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Ruler className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Pilar 01</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                Sensor IoT Ultrasonik & ToF
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Pengukuran continuous ketinggian volume sampah secara presisi tanpa kontak langsung, tahan debu, dan tahan perubahan cuaca ekstrem di TPS terbuka.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono font-medium">
              ✓ Akurasi Laser TOF400F
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-teal-500/50 transition-all hover:scale-[1.02] flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <BarChart3 className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold uppercase">Pilar 02</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                Dashboard Central Command
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Pusat kendali visual berbasis GIS (peta sebaran) untuk DLH Kota Bandung dalam memantau tren sampah per kecamatan, anomali lonjakan, dan kinerja operasional.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-teal-700 dark:text-teal-400 font-mono font-medium">
              ✓ Central Command DLH
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-sky-500/50 transition-all hover:scale-[1.02] flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
                <Users className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-sky-600 dark:text-sky-400 font-bold uppercase">Pilar 03</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                Pelaporan & Transparansi Warga
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Keterlibatan warga dalam menjaga kebersihan lingkungan dengan akses publik status TPS, formulir aduan luberan sampah, dan edukasi pemilahan sampah.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-sky-700 dark:text-sky-400 font-mono font-medium">
              ✓ Portal Partisipasi Warga
            </div>
          </div>

          {/* Pilar 4 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-amber-500/50 transition-all hover:scale-[1.02] flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Truck className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase">Pilar 04</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                Logistik Armada Dinamis
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Optimalisasi jalur penjemputan armada truk sampah berdasarkan prioritas TPS berkategori Kritis, menghemat bahan bakar dan waktu tempuh pengangkutan.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-amber-700 dark:text-amber-400 font-mono font-medium">
              ✓ Dynamic Fleet Routing
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* DASHBOARD INTERNAL BERBASIS PERAN (ROLE-BASED) */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">Role-Based Security</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Dashboard Internal Berbasis Peran
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            MOPS dilengkapi sistem autentikasi login (LoginView.tsx) dengan pembagian hak akses terstruktur untuk 3 peran operasional:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Super Admin */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Role 1: Global Ops</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Super Admin
              </h3>
              <span className="text-[11px] font-mono text-slate-400 block">AdminRoleDashboard.tsx</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Manajemen registrasi & kalibrasi perangkat sensor IoT, hak akses staf/petugas dinas, analisis komprehensif seluruh data kota, dan pengaturan global sistem MOPS.
              </p>
            </div>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
              <li className="flex items-center gap-2">✓ Manajemen Perangkat Sensor</li>
              <li className="flex items-center gap-2">✓ Tata Kelola Hak Akses Petugas</li>
              <li className="flex items-center gap-2">✓ Pengaturan Global Sistem</li>
            </ul>
          </div>

          {/* Supervisor */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-teal-500/50 transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <Users className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold uppercase">Role 2: Area Supervision</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Supervisor
              </h3>
              <span className="text-[11px] font-mono text-slate-400 block">SupervisorRoleDashboard.tsx</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Pengawasan performa TPS per kecamatan, pemantauan utilisasi armada truk DLH, serta rekapitulasi laporan harian dan mingguan volume sampah tertangani.
              </p>
            </div>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
              <li className="flex items-center gap-2">✓ Monitoring TPS per Kecamatan</li>
              <li className="flex items-center gap-2">✓ Utilisasi & Jalur Truk Sampah</li>
              <li className="flex items-center gap-2">✓ Rekapitulasi Laporan Harian/Mingguan</li>
            </ul>
          </div>

          {/* Operator Lapangan */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Truck className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase">Role 3: Field Crew</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Operator Lapangan
              </h3>
              <span className="text-[11px] font-mono text-slate-400 block">OperatorRoleDashboard.tsx</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Pemantauan instan TPS yang berada dalam status kritis (alert trigger), konfirmasi kedatangan jadwal angkut truk penjemput, serta pembaruan data kondisi fisik di lapangan.
              </p>
            </div>
            <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
              <li className="flex items-center gap-2">✓ Alert Trigger TPS Kritis</li>
              <li className="flex items-center gap-2">✓ Konfirmasi Jadwal Angkut Truk</li>
              <li className="flex items-center gap-2">✓ Pembaruan Kondisi Lapangan</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* TEKNOLOGI YANG DIGUNAKAN */}
      {/* ========================================================================= */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">Tech Specifications</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Teknologi & Instrumen yang Digunakan
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Frontend Core</span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">React 19 & TypeScript</h4>
            <p className="text-xs text-slate-500">Arsitektur komponen modular ultra-cepat ditenagai oleh Vite bundler.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <span className="text-[10px] font-mono text-teal-600 dark:text-teal-400 font-bold uppercase">Styling & UI</span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Tailwind CSS</h4>
            <p className="text-xs text-slate-500">Desain antarmuka modern, clean white light mode, and full responsif.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase">Visualisasi & Gerak</span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">Recharts & Motion</h4>
            <p className="text-xs text-slate-500">Grafik riwayat kapasitas sampah real-time, Lucide React icons, dan animasi dinamis.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
            <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase">IoT & Hardware</span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">TOF400F + VIGI C340</h4>
            <p className="text-xs text-slate-500">Integrasi telemetri laser jarak presisi, CCTV outdoor IP67, dan edge control box.</p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DISCUSSION & COMMENTS SECTION */}
      {/* ========================================================================= */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Tanggapan & Diskusi Pengujian Sistem MOPS ({allComments.length})
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
                    <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-xs">
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
              Kirim Masukan atau Laporan Lapangan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Berikan tanggapan teknis mengenai implementasi sensor ToF, feed CCTV, atau usulan integrasi TPS baru di wilayah Kota Bandung.
            </p>

            {commentSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Komentar berhasil dikirim dan tersimpan!</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-mono text-slate-600 dark:text-slate-300 mb-1">Nama Lengkap / Instansi</label>
                <input
                  type="text"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Contoh: Petugas DLH / Warga Coblong"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-600 dark:text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-600 dark:text-slate-300 mb-1">Pesan / Masukan</label>
                <textarea
                  required
                  rows={4}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Tuliskan catatan teknis atau laporan kondisi TPS..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all hover:scale-[1.01] active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Kirim Masukan</span>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* FINAL CTA BANNER */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-8 sm:p-12 text-center space-y-6 shadow-xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-200 uppercase">Live Smart City Deployment</span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Akses Langsung Sistem MOPS Kota Bandung
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Jelajahi peta interaktif, status real-time TPS, kamera outdoor, dan fitur aduan warga langsung pada tautan website resmi.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={officialWebUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-extrabold tracking-wider uppercase shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Buka Website Resmi (mops-5f51b.web.app)</span>
            <ExternalLink className="h-4 w-4 text-slate-950" />
          </a>

          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-bold border border-white/25 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Hub Laboratorium</span>
          </button>
        </div>
      </section>



      {/* FULL-SCREEN IMAGE MODAL */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl p-3 shadow-2xl overflow-hidden flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/20 transition-all z-20 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={modalImage}
              alt="Diagram Instalasi Hardware Tiang MOPS"
              className="w-full max-h-[82vh] object-contain rounded-2xl"
            />
            <div className="py-2 text-center text-xs font-mono text-slate-600 dark:text-slate-400">
              Dokumentasi Instalasi Tiang Hardware MOPS (Tampak Depan, Samping, dan Atas)
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
