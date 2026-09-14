import React, { useState, useEffect } from 'react';
import { 
  Maximize2, 
  X, 
  Send, 
  MessageSquare, 
  Trash2, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  Camera,
  Scale,
  Ruler,
  Zap,
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
  Cpu,
  Radio,
  FileText,
  HelpCircle,
  Truck,
  Eye,
  ChevronRight,
  Layers,
  BarChart3
} from 'lucide-react';
import { ProjectItem, Comment } from '../types';

interface MopsShowcaseProps {
  item?: ProjectItem;
  comments?: Comment[];
  onBack: () => void;
  onAddComment?: (name: string, email: string, content: string) => void;
}

interface TpsLocation {
  id: string;
  name: string;
  district: string;
  capacity: number;
  tofDistanceCm: number;
  weightTon: number;
  cctvFps: number;
  status: 'Normal' | 'Hampir Penuh' | 'Kritis';
  address: string;
  lastEmptied: string;
}

const INITIAL_TPS_LIST: TpsLocation[] = [
  {
    id: 'tps-baksil',
    name: 'TPS Babakan Siliwangi',
    district: 'Kecamatan Coblong',
    capacity: 74,
    tofDistanceCm: 124,
    weightTon: 3.8,
    cctvFps: 30,
    status: 'Hampir Penuh',
    address: 'Jl. Tamansari No. 73, Lb. Siliwangi, Coblong, Kota Bandung',
    lastEmptied: 'Hari ini, 06:15 WIB'
  },
  {
    id: 'tps-dago',
    name: 'TPS Dago Elos',
    district: 'Kecamatan Coblong',
    capacity: 92,
    tofDistanceCm: 38,
    weightTon: 5.4,
    cctvFps: 29,
    status: 'Kritis',
    address: 'Jl. Ir. H. Juanda No. 340, Dago, Coblong, Kota Bandung',
    lastEmptied: 'Kemarin, 17:30 WIB'
  },
  {
    id: 'tps-pasar-baru',
    name: 'TPS Pasar Baru Trade Center',
    district: 'Kecamatan Andir',
    capacity: 48,
    tofDistanceCm: 210,
    weightTon: 2.3,
    cctvFps: 30,
    status: 'Normal',
    address: 'Jl. Otto Iskandardinata No. 70, Kebon Jeruk, Andir, Kota Bandung',
    lastEmptied: 'Hari ini, 08:45 WIB'
  },
  {
    id: 'tps-gedebage',
    name: 'TPS Pasar Induk Gedebage',
    district: 'Kecamatan Panyileukan',
    capacity: 63,
    tofDistanceCm: 158,
    weightTon: 3.2,
    cctvFps: 30,
    status: 'Normal',
    address: 'Jl. Soekarno-Hatta No. 785, Babakan Penghulu, Cinambo / Panyileukan',
    lastEmptied: 'Hari ini, 05:30 WIB'
  }
];

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

  // Active Selected TPS for interactive telemetry simulation
  const [selectedTpsId, setSelectedTpsId] = useState<string>('tps-baksil');
  const [tpsState, setTpsState] = useState<TpsLocation[]>(INITIAL_TPS_LIST);
  const [truckDispatchNotice, setTruckDispatchNotice] = useState<string | null>(null);
  const [activePublicTab, setActivePublicTab] = useState<'monitoring' | 'home' | 'about' | 'news' | 'faq'>('monitoring');

  // Comment Form States
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Current active TPS data
  const currentTps = tpsState.find(t => t.id === selectedTpsId) || tpsState[0];

  // Gentle live fluctuation to simulate real IoT telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      setTpsState(prev => prev.map(t => {
        const newDistance = Math.min(280, Math.max(25, Math.round(t.tofDistanceCm + (Math.random() - 0.5) * 3)));
        const newFps = Math.min(30, Math.max(26, 28 + Math.floor(Math.random() * 3)));
        return {
          ...t,
          tofDistanceCm: newDistance,
          cctvFps: newFps
        };
      }));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Action: Empty TPS (Armada Truk Pengangkut Tiba)
  const handleEmptyCurrentTps = () => {
    setTpsState(prev => prev.map(t => {
      if (t.id === selectedTpsId) {
        return {
          ...t,
          capacity: 12,
          tofDistanceCm: 285,
          weightTon: 0.6,
          status: 'Normal',
          lastEmptied: 'Baru saja diangkut (Live Update)'
        };
      }
      return t;
    }));
    setTruckDispatchNotice(`Truk sampah armada DLH berhasil mengosongkan ${currentTps.name}! Kapasitas kembali normal 12%.`);
    setTimeout(() => setTruckDispatchNotice(null), 5000);
  };

  // Action: Trigger Surge / Overflow Alert
  const handleTriggerOverflowAlert = () => {
    setTpsState(prev => prev.map(t => {
      if (t.id === selectedTpsId) {
        return {
          ...t,
          capacity: 96,
          tofDistanceCm: 22,
          weightTon: 5.9,
          status: 'Kritis'
        };
      }
      return t;
    }));
    setTruckDispatchNotice(`⚠️ PERINGATAN KRITIS: ${currentTps.name} melebihi kapasitas batas 90%! Sistem mengirim alert dispatching darurat.`);
    setTimeout(() => setTruckDispatchNotice(null), 6000);
  };

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

  const getStatusBadge = (status: 'Normal' | 'Hampir Penuh' | 'Kritis') => {
    switch (status) {
      case 'Normal':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Hampir Penuh':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Kritis':
        return 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

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
          
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span>Projek R&D</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">MOPS Kota Bandung</span>
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
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-emerald-200 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Smart City • Kota Bandung
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-mono text-xs font-semibold">
              <Cpu className="h-3.5 w-3.5 text-emerald-300" />
              Sensor ToF (TOF400F) & IP Camera (VIGI C340)
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-teal-400/20 border border-teal-300/30 text-teal-200 font-mono text-xs font-semibold">
              <Radio className="h-3.5 w-3.5 text-cyan-300" />
              Telemetri Real-Time & Live CCTV
            </span>
          </div>

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
              <Layers className="h-4 w-4 text-emerald-300" />
              <span>Lihat Spesifikasi Tiang Hardware</span>
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
      {/* INTERACTIVE TPS MONITORING & SIMULATOR SECTION */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">Interactive Lab Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Simulasi Monitoring TPS Real-Time
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mt-1">
              Pilih salah satu Tempat Pembuangan Sementara di Kota Bandung untuk menguji pembacaan sensor ToF, video CCTV outdoor, dan trigger aksi penjemputan armada truk.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono shadow-2xs">
            <span className="text-slate-500">TPS Aktif:</span>
            <span className="text-slate-900 dark:text-white font-bold">{currentTps.name}</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(currentTps.status)}`}>
              {currentTps.status}
            </span>
          </div>
        </div>

        {/* Alert Banner if present */}
        {truckDispatchNotice && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-700/50 text-emerald-900 dark:text-emerald-200 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 animate-bounce shrink-0" />
              <span>{truckDispatchNotice}</span>
            </div>
            <button 
              onClick={() => setTruckDispatchNotice(null)} 
              className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* TPS Selector Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tpsState.map((tps) => {
            const isSelected = tps.id === selectedTpsId;
            return (
              <div
                key={tps.id}
                onClick={() => setSelectedTpsId(tps.id)}
                className={`p-5 rounded-3xl border transition-all cursor-pointer text-left ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md scale-[1.02]'
                    : 'bg-white dark:bg-slate-900/60 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">{tps.district}</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight mt-0.5">{tps.name}</h4>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${getStatusBadge(tps.status)}`}>
                    {tps.status}
                  </span>
                </div>

                {/* Mini Capacity Bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-500">Volume Terisi:</span>
                    <span className="text-slate-900 dark:text-white font-bold">{tps.capacity}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-700 rounded-full ${
                        tps.capacity >= 85 
                          ? 'bg-rose-500' 
                          : tps.capacity >= 70 
                          ? 'bg-amber-500' 
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${tps.capacity}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>Jarak ToF: {tps.tofDistanceCm} cm</span>
                  <span>Beban: {tps.weightTon} Ton</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active TPS Telemetry Detail Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          
          {/* Left: Live Simulated CCTV Feed (TP-Link VIGI C340) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                <Camera className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-bold">LIVE FEED: TP-Link VIGI C340 Outdoor</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-400 text-[10px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                REC • {currentTps.cctvFps} FPS
              </span>
            </div>

            {/* Camera Viewport */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-inner group">
              <img
                src={hardwareImageUrl}
                alt="TP-Link VIGI Camera Surveillance"
                className="w-full h-full object-cover opacity-90 filter contrast-105 group-hover:scale-105 transition-transform duration-700"
              />

              {/* CCTV Overlays */}
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-[10px] font-mono text-emerald-400 space-y-0.5">
                <div className="font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  CAM_01 • {currentTps.name.toUpperCase()}
                </div>
                <div className="text-slate-400 text-[9px]">{new Date().toLocaleDateString('id-ID')} • REAL-TIME RTSP</div>
              </div>

              {/* Top Right ToF Target Overlay */}
              <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-[10px] font-mono text-right text-slate-300">
                <span className="text-slate-400 block text-[9px]">TOF400F RAY</span>
                <span className="text-cyan-400 font-bold">{currentTps.tofDistanceCm} cm to debris</span>
              </div>

              {/* Center Reticle / Bounding Box */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-40 h-28 border-2 rounded-lg transition-all duration-500 flex flex-col justify-between p-1.5 ${
                  currentTps.status === 'Kritis' 
                    ? 'border-rose-500/80 bg-rose-500/10' 
                    : 'border-cyan-400/60 bg-cyan-500/5'
                }`}>
                  <div className="flex justify-between text-[8px] font-mono text-cyan-300">
                    <span>DEBRIS_VOLUME</span>
                    <span>{currentTps.capacity}%</span>
                  </div>
                  <div className="text-[8px] font-mono text-right text-emerald-400">
                    TRACKING OK
                  </div>
                </div>
              </div>

              {/* Bottom Bar in Camera View */}
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-300 truncate max-w-[60%]">{currentTps.address}</span>
                <span className="text-emerald-400 font-bold">PLN 220V STABLE</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 font-mono pt-1">
              <span>Terakhir dikosongkan: <strong className="text-slate-800 dark:text-slate-200">{currentTps.lastEmptied}</strong></span>
              <span className="text-slate-400">Node ID: {currentTps.id.toUpperCase()}</span>
            </div>
          </div>

          {/* Right: Telemetry Gauges & Interactive Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            <div>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block font-bold">Live Parameter Analysis</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Telemetri Sensor Node & Edge Controller
              </h3>
            </div>

            {/* 4 Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              
              {/* Metric 1: Capacity */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span className="text-xs font-mono">Kapasitas TPS</span>
                  <Trash2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {currentTps.capacity}%
                </div>
                <div className="text-[10px] text-slate-500">
                  Ambang Kritis: &gt; 85%
                </div>
              </div>

              {/* Metric 2: ToF Distance */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span className="text-xs font-mono">Jarak Sensor ToF</span>
                  <Ruler className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-cyan-700 dark:text-cyan-300">
                  {currentTps.tofDistanceCm} <span className="text-sm font-normal text-slate-500">cm</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Sensor: TOF400F Laser
                </div>
              </div>

              {/* Metric 3: Weight Load */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span className="text-xs font-mono">Beban Timbunan</span>
                  <Scale className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {currentTps.weightTon} <span className="text-sm font-normal text-slate-500">Ton</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Kapasitas Maks: 6.0 Ton
                </div>
              </div>

              {/* Metric 4: Power System */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                  <span className="text-xs font-mono">Catu Daya Listrik</span>
                  <Zap className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">
                  220 <span className="text-sm font-normal text-slate-500">V</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Kabel PLN + Surge Guard
                </div>
              </div>

            </div>

            {/* Action Buttons for Simulation */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">
                Uji Skenario Interaktif Lapangan:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleEmptyCurrentTps}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm"
                >
                  <Truck className="h-4 w-4" />
                  <span>Truk Angkut Tiba (Kosongkan)</span>
                </button>

                <button
                  onClick={handleTriggerOverflowAlert}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold transition-all hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>Simulasi Luberan (96% Kritis)</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* HARDWARE POLE INSTALLATION (WHITE THEME BASED ON USER'S DIAGRAM) */}
      {/* ========================================================================= */}
      <section id="hardware-section" className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-600" />
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-700 dark:text-cyan-400 uppercase">Hardware Architecture</span>
            </div>
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
            <Maximize2 className="h-3.5 w-3.5 text-cyan-600" />
            <span>Perbesar Diagram Lengkap</span>
          </button>
        </div>

        {/* Hardware Infographic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          
          {/* Left: The uploaded Image Diagram */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div 
              onClick={() => setModalImage(hardwareImageUrl)}
              className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-2 shadow-sm cursor-pointer group hover:border-cyan-500 transition-all"
            >
              <img
                src={hardwareImageUrl}
                alt="Instalasi Fisik Tiang Hardware MOPS (Tampak Depan, Tampak Samping, Tampak Atas)"
                className="w-full h-auto object-contain rounded-xl group-hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900/90 text-white text-xs font-bold border border-white/20 shadow-lg">
                  <Maximize2 className="h-4 w-4 text-cyan-400" />
                  Klik untuk Memperbesar Resolusi Penuh
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-3 text-center">
              Gambar 1. Dokumentasi Teknis Tiang Pemantau MOPS: Tampak Depan, Tampak Samping, dan Tampak Atas Lapangan TPS.
            </p>
          </div>

          {/* Right: Component Descriptions matching the diagram */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Item 1: IP Camera */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 transition-all space-y-1">
              <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
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
                Pusat pemrosesan komputasi edge di lapangan, modul komunikasi data telemetri (4G/Wi-Fi) ke cloud backend, manajemen power supply, dan pengaman korsleting listrik.
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
      {/* FITUR HALAMAN PUBLIK WARGA */}
      {/* ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">Public Experience</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Fitur Portal Publik Warga Kota Bandung
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mt-1">
              Arsitektur komponen portal publik (React 19 & TypeScript) yang dirancang untuk kemudahan warga dalam mengakses informasi kebersihan kota.
            </p>
          </div>

          <a
            href={officialWebUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-800 transition-all cursor-pointer shadow-2xs"
          >
            <span>Uji Portal Publik</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Navigation Pill Tabs */}
        <div className="flex flex-wrap gap-2 pb-2">
          {[
            { id: 'monitoring', label: 'Monitoring Real-Time (PublicMonitoring.tsx & TPSDetailView.tsx)' },
            { id: 'home', label: 'Beranda (PublicHome.tsx)' },
            { id: 'about', label: 'Tentang Platform (PublicAbout.tsx)' },
            { id: 'news', label: 'Berita & Edukasi (PublicNews.tsx)' },
            { id: 'faq', label: 'FAQ & Aduan Warga (PublicFAQ.tsx & PublicContact.tsx)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActivePublicTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activePublicTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Public Tab Content Display */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          {activePublicTab === 'monitoring' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <Activity className="h-5 w-5" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Monitoring Real-Time & Peta Sebaran TPS</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Menyajikan daftar lengkap dan peta interaktif Tempat Pembuangan Sementara (TPS) di seluruh kecamatan Kota Bandung. Dilengkapi status warna visual: 
                <span className="text-emerald-600 font-bold ml-1">Normal (0–69%)</span>, 
                <span className="text-amber-600 font-bold ml-1">Hampir Penuh (70–84%)</span>, dan 
                <span className="text-rose-600 font-bold ml-1">Penuh / Kritis (&ge;85%)</span>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
                  <span className="font-mono text-slate-400 block text-[10px]">DATA SENSORIK</span>
                  <strong className="text-slate-900 dark:text-white block mt-1">ToF & Ultrasonic Telemetry</strong>
                  <span className="text-slate-500 text-[11px]">Jarak akurat permukaan sampah dalam satuan centimeter.</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
                  <span className="font-mono text-slate-400 block text-[10px]">CCTV STREAMING</span>
                  <strong className="text-slate-900 dark:text-white block mt-1">Outdoor Feed (30 FPS)</strong>
                  <span className="text-slate-500 text-[11px]">Pantauan visual langsung kondisi bak sampah dan aktivitas angkut.</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs">
                  <span className="font-mono text-slate-400 block text-[10px]">ESTIMASI MASSA</span>
                  <strong className="text-slate-900 dark:text-white block mt-1">Beban Berat (Kg / Ton)</strong>
                  <span className="text-slate-500 text-[11px]">Kalkulasi muatan sampah untuk alokasi kapasitas bak truk DLH.</span>
                </div>
              </div>
            </div>
          )}

          {activePublicTab === 'home' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400">
                <Building2 className="h-5 w-5" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Beranda Publik (PublicHome.tsx)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Menyajikan dashboard ringkasan statistik kebersihan kota Bandung terkini untuk masyarakat: total TPS yang terhubung secara daring, rata-rata persentase kapasitas sampah kota hari ini, jumlah TPS berstatus kritis yang membutuhkan perhatian, serta quick overview dan kampanye ajakan warga memilah sampah dari sumbernya.
              </p>
            </div>
          )}

          {activePublicTab === 'about' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
                <Layers className="h-5 w-5" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tentang Platform (PublicAbout.tsx)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Halaman penjelasan komprehensif mengenai visi Smart City Bandung, latar belakang perancangan sistem MOPS, serta elaborasi mendalam tentang 4 pilar arsitektur teknologi: Sensor IoT Ultrasonik/ToF, Dashboard Central Command, Pelaporan Warga Interaktif, dan Sistem Logistik Armada Truk Dinamis.
              </p>
            </div>
          )}

          {activePublicTab === 'news' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <FileText className="h-5 w-5" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Berita & Edukasi Warga (PublicNews.tsx)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Kanal publikasi artikel edukasi kebersihan lingkungan, rilis program resmi Dinas Lingkungan Hidup (DLH) Kota Bandung, panduan pemilahan sampah organik vs anorganik (3R), serta jadwal reguler operasional penjemputan truk sampah di tiap kelurahan.
              </p>
            </div>
          )}

          {activePublicTab === 'faq' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
                <HelpCircle className="h-5 w-5" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">FAQ & Kontak Aduan Luberan Sampah (PublicFAQ.tsx & PublicContact.tsx)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Menampung pertanyaan umum masyarakat seputar tata cara pembuangan sampah berjadwal, serta formulir pengaduan instan ketika warga menemukan luberan sampah di lingkungan sekitar atau mengajukan pemasangan modul TPS Pintar MOPS di tingkat RW/Kelurahan.
              </p>
            </div>
          )}
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
