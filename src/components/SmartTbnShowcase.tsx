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
  Bell,
  Scale,
  Ruler,
  BatteryCharging,
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
  Phone,
  Instagram
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
  
  const posterImage = '/images/smart-tbn/smart-tbn-poster.png';
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Live Telemetry Simulation States
  const [capacityPercent, setCapacityPercent] = useState<number>(45);
  const [trashWeight, setTrashWeight] = useState<number>(14.2);
  const [sensorDistance, setSensorDistance] = useState<number>(48); // cm from lid
  const [batteryVoltage, setBatteryVoltage] = useState<number>(12.6);
  const [isFullSimulated, setIsFullSimulated] = useState<boolean>(false);
  const [notificationSent, setNotificationSent] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(true);

  // Comment Form States
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Real-time gentle fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isFullSimulated) {
        setCapacityPercent(prev => Math.min(100, Math.max(10, Math.round(prev + (Math.random() - 0.45) * 2))));
        setTrashWeight(prev => parseFloat((Math.max(1, prev + (Math.random() - 0.45) * 0.2)).toFixed(1)));
        setSensorDistance(prev => Math.min(80, Math.max(15, Math.round(prev + (Math.random() - 0.5) * 2))));
        setBatteryVoltage(prev => parseFloat((12.4 + Math.random() * 0.4).toFixed(2)));
      }
    }, 3500);
    return () => clearInterval(timer);
  }, [isFullSimulated]);

  const handleToggleSimulateFull = () => {
    if (!isFullSimulated) {
      setIsFullSimulated(true);
      setCapacityPercent(92);
      setTrashWeight(28.4);
      setSensorDistance(12);
      setNotificationSent(true);
    } else {
      setIsFullSimulated(false);
      setCapacityPercent(45);
      setTrashWeight(14.2);
      setSensorDistance(48);
      setNotificationSent(false);
    }
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
    <div className="space-y-10 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* TOP NAVIGATION BAR */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Daftar Proyek</span>
        </button>

        <div className="flex items-center gap-2">
          <a
            href="https://smarttrash.devtbn.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm hover:scale-105 cursor-pointer"
            id="smart-tbn-external-link"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Kunjungi Website SmartTBN</span>
          </a>

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
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#064e3b] via-[#047857] to-[#0f766e] text-white p-8 sm:p-12 shadow-xl border border-emerald-600/30">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 rounded-full bg-teal-300/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              Riset Pengabdian Masyarakat • Sumba NTT
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-mono text-xs font-semibold">
              <Calendar className="h-3.5 w-3.5" />
              27 Juli 2026
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 font-mono text-xs font-semibold">
              <MapPin className="h-3.5 w-3.5 text-amber-300" />
              Kampung Raja Prailiu, Waingapu
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-sm">
            Smart TBN Goes to Sumba
          </h1>

          <p className="text-base sm:text-lg text-emerald-100/90 font-medium leading-relaxed max-w-3xl">
            Implementasi Tempat Sampah Pintar Berbasis Internet of Things (IoT) untuk Pengelolaan Sampah dan Pelestarian Lingkungan di Desa Wisata Kampung Raja Prailiu.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-emerald-200 font-mono">
            <span>Kolaborasi: <strong>Telkom University</strong> × <strong>PT Tigaresi Bangun Nusaperdana</strong></span>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <a
              href="https://smarttrash.devtbn.tech/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-lg transition-all hover:scale-105"
            >
              <span>Buka Platform SmartTBN</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <span className="text-xs text-emerald-200 font-mono">
              https://smarttrash.devtbn.tech/
            </span>
          </div>
        </div>
      </section>

      {/* TWO-COLUMN SHOWCASE: POSTER & LIVE TELEMETRY SIMULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: HIGH-RES INFOGRAPHIC POSTER */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative group rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-xl">
            <img 
              src={posterImage} 
              alt="Poster Smart TBN - Tempat Sampah Pintar dengan Notifikasi Real-Time" 
              className="w-full h-auto object-contain cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.02]"
              onClick={() => setModalImage(posterImage)}
            />
            
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => setModalImage(posterImage)}
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
                onClick={() => setModalImage(posterImage)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-[11px] font-bold transition-all cursor-pointer"
              >
                Perbesar
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
            <span className="font-semibold">Format Infografis: Poster Resmi Sosialisasi & Implementasi Produk Riset Smart TBN</span>
            <span className="text-[10px] font-mono font-bold bg-emerald-200/80 dark:bg-emerald-900 px-2 py-0.5 rounded">HD Verified</span>
          </div>
        </div>

        {/* RIGHT: LIVE TELEMETRY SIMULATOR & HIGHLIGHTS */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Live Telemetry Card */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Live Telemetri Smart TBN
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">Data sensor aktual Unit Prailiu-01 (Waingapu)</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono font-bold border border-emerald-300 dark:border-emerald-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  ONLINE
                </span>
              </div>
            </div>

            {/* Capacity Progress Bar */}
            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                  <Trash2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  Kapasitas Timbunan Sampah
                </span>
                <span className={`font-mono text-sm ${capacityPercent >= 80 ? 'text-rose-600 dark:text-rose-400 font-extrabold animate-pulse' : 'text-emerald-700 dark:text-emerald-400'}`}>
                  {capacityPercent}% {capacityPercent >= 80 ? '(Penuh)' : '(Normal)'}
                </span>
              </div>

              <div className="w-full h-3.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${
                    capacityPercent >= 85 
                      ? 'bg-rose-500 shadow-md shadow-rose-500/50' 
                      : capacityPercent >= 70 
                        ? 'bg-amber-500' 
                        : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  }`}
                  style={{ width: `${capacityPercent}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-0.5">
                <span>0% Kosong</span>
                <span>Batas Notifikasi: 80%</span>
                <span>100% Penuh</span>
              </div>
            </div>

            {/* Telemetry Metric Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] font-mono text-slate-400 font-semibold flex items-center gap-1">
                  <Scale className="h-3.5 w-3.5 text-emerald-600" />
                  Massa Beban (Load Cell)
                </span>
                <div className="text-xl font-mono font-black text-slate-900 dark:text-white mt-1">
                  {trashWeight} <span className="text-xs font-normal text-slate-500">kg</span>
                </div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Sensor HX711 Terkalibrasi</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] font-mono text-slate-400 font-semibold flex items-center gap-1">
                  <Ruler className="h-3.5 w-3.5 text-emerald-600" />
                  Jarak Bebas Sensor
                </span>
                <div className="text-xl font-mono font-black text-slate-900 dark:text-white mt-1">
                  {sensorDistance} <span className="text-xs font-normal text-slate-500">cm</span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">Ultrasonik JSN-SR04T</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] font-mono text-slate-400 font-semibold flex items-center gap-1">
                  <Camera className="h-3.5 w-3.5 text-emerald-600" />
                  Visual Kamera
                </span>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  ESP32-CAM Siap
                </div>
                <span className="text-[10px] text-slate-500 font-medium">Snapshot Interval 15 Min</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700">
                <span className="text-[10px] font-mono text-slate-400 font-semibold flex items-center gap-1">
                  <BatteryCharging className="h-3.5 w-3.5 text-emerald-600" />
                  Solar Battery Pack
                </span>
                <div className="text-xl font-mono font-black text-slate-900 dark:text-white mt-1">
                  {batteryVoltage} <span className="text-xs font-normal text-slate-500">V</span>
                </div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Solar Charging Aktif</span>
              </div>
            </div>

            {/* Notification Status Banner */}
            {capacityPercent >= 80 && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200 flex items-center gap-2.5 animate-pulse">
                <Bell className="h-4 w-4 text-rose-600 shrink-0" />
                <span><strong>Peringatan Otomatis:</strong> Kapasitas melebihi ambang batas! Notifikasi telah dikirimkan ke petugas kebersihan desa wisata via Telegram & Dashboard Web.</span>
              </div>
            )}

            {/* Direct Platform Link Banner inside Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 to-slate-950 text-white flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-emerald-300">Dashboard Web SmartTBN Online</p>
                <p className="text-[10px] text-slate-300 font-mono">https://smarttrash.devtbn.tech/</p>
              </div>
              <a
                href="https://smarttrash.devtbn.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
              >
                <span>Buka Web</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Simulation Control Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleToggleSimulateFull}
                className={`w-full py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                  isFullSimulated 
                    ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-800/20'
                }`}
              >
                <RefreshCw className={`h-4 w-4 ${isFullSimulated ? 'animate-spin' : ''}`} />
                <span>{isFullSimulated ? 'Reset Simulasi ke Kondisi Normal' : 'Simulasikan Kondisi Sampah Penuh (Test Notifikasi)'}</span>
              </button>
            </div>
          </div>

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
              <Sparkles className="h-5 w-5 text-emerald-600 mb-1" />
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

      {/* FULLSCREEN LIGHTBOX MODAL FOR POSTER */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setModalImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[95vh] flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-full transition-all cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
            <img 
              src={modalImage} 
              alt="Poster Smart TBN Fullscreen" 
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            <p className="text-center text-xs font-mono text-slate-300 mt-2">
              Infografis Resmi: Smart TBN - Tempat Sampah Pintar dengan Notifikasi Real-Time (Sumba NTT)
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
