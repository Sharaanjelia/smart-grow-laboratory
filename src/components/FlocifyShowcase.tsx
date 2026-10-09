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
  FlaskConical
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
  
  // 3D Render images uploaded by user for FLOCIFY
  const galleryImages = [
    {
      url: '/images/flocify/flocify-biofloc-tank-iso.png',
      caption: 'Isometric 3D Architectural Model of Flocify Biofloc Round Tank featuring central bio-settling container, automated carbon dosing unit, and circular mesh support.',
      title: 'Isometric 3D Biofloc Tank Unit'
    },
    {
      url: '/images/flocify/flocify-topview-tank.png',
      caption: "Bird's Eye Top View showing biofloc brown water circulation, central vortex aerator mixer, and real-time multi-probe sensor array.",
      title: 'Top-Down Circulation & Aerator View'
    },
    {
      url: '/images/flocify/flocify-perspective-tank.png',
      caption: 'Perspective View showcasing Flocify smart sensing module, automated feeding hoppers, and external sludge drain bypass.',
      title: 'Perspective Tank & Automated Dosing'
    }
  ];

  const [modalImage, setModalImage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Live Telemetry & Deep Learning AI States
  const [doValue, setDoValue] = useState<number>(6.8);
  const [ammoniaValue, setAmmoniaValue] = useState<number>(0.08);
  const [tempValue, setTempValue] = useState<number>(28.5);
  const [phValue, setPhValue] = useState<number>(7.4);
  const [flocDensity, setFlocDensity] = useState<number>(15);
  const [aiSpikeRisk, setAiSpikeRisk] = useState<boolean>(false);
  const [autoDosingActive, setAutoDosingActive] = useState<boolean>(false);
  const [autoAerationActive, setAutoAerationActive] = useState<boolean>(true);

  // Comment Form States
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Real-time telemetry fluctuation simulation
  useEffect(() => {
    const timer = setInterval(() => {
      if (!aiSpikeRisk) {
        setDoValue(prev => parseFloat((prev + (Math.random() - 0.5) * 0.1).toFixed(2)));
        setAmmoniaValue(prev => parseFloat((prev + (Math.random() - 0.5) * 0.01).toFixed(3)));
        setTempValue(prev => parseFloat((prev + (Math.random() - 0.5) * 0.05).toFixed(1)));
        setPhValue(prev => parseFloat((prev + (Math.random() - 0.5) * 0.03).toFixed(2)));
        setFlocDensity(prev => parseFloat((prev + (Math.random() - 0.5) * 0.4).toFixed(1)));
      } else {
        setAmmoniaValue(prev => parseFloat((prev + Math.random() * 0.04).toFixed(3)));
        setDoValue(prev => parseFloat((prev - Math.random() * 0.08).toFixed(2)));
      }
    }, 2500);
    return () => clearInterval(timer);
  }, [aiSpikeRisk]);

  const handleToggleAmmoniaSpike = () => {
    if (!aiSpikeRisk) {
      setAiSpikeRisk(true);
      setAmmoniaValue(0.32);
      setDoValue(4.2);
      setAutoDosingActive(true);
    } else {
      setAiSpikeRisk(false);
      setAmmoniaValue(0.08);
      setDoValue(6.8);
      setAutoDosingActive(false);
    }
  };

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
    <div className="space-y-10 animate-fade-in text-slate-800 dark:text-slate-100 pb-16">
      
      {/* ========================================================================= */}
      {/* TOP NAVIGATION BAR */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-400 transition-all cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Kembali ke Daftar Proyek</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-mono">
            <span>Projek R&D</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-indigo-700 dark:text-indigo-400 font-bold">FLOCIFY Biofloc AI</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
            title="Salin tautan projek ini"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-indigo-600" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copiedLink ? 'Link Tersalin!' : 'Bagikan'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HERO BANNER SECTION (Rich Indigo/Blue Gradient Card) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#1e3a5f] text-white p-8 sm:p-12 shadow-xl border border-indigo-600/30">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-400/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-20 w-80 h-80 rounded-full bg-cyan-300/15 blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-400/40 text-indigo-200 font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
              Biofloc Aquaculture • Deep Learning AI
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-mono text-xs font-semibold">
              <Cpu className="h-3.5 w-3.5 text-cyan-300" />
              ResNet / LSTM Neural Networks
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-300/30 text-cyan-200 font-mono text-xs font-semibold">
              <Radio className="h-3.5 w-3.5 text-cyan-300" />
              LoRaWAN IoT Telemetry
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight drop-shadow-sm">
            FLOCIFY: Sistem Monitoring & Optimasi Budidaya Biofloc Berbasis IoT & Deep Learning
          </h1>

          <p className="text-base sm:text-lg text-indigo-50/95 font-medium leading-relaxed max-w-3xl">
            Platform IoT cerdas yang mengintegrasikan Deep Learning untuk monitoring kualitas air real-time, prediksi risiko amonia, otomasi dosing probiotik, dan optimasi pakan pada budidaya ikan biofloc. Dirancang untuk meningkatkan survival rate, efisiensi pakan (FCR), dan keberlanjutan akuakultur modern.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-indigo-200 font-mono">
            <span>Riset & Inovasi: <strong>Smart Grow Laboratory</strong> (Telkom University)</span>
            <span>Target: <strong>Pembudidaya Ikan Biofloc Indonesia</strong></span>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById('telemetry-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-xl transition-all hover:scale-105"
            >
              <Eye className="h-4 w-4 text-slate-950" />
              <span>Lihat Live Telemetry & AI Simulator</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('architecture-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs backdrop-blur-md border border-white/20 transition-all cursor-pointer"
            >
              <Layers className="h-4 w-4 text-indigo-300" />
              <span>Lihat Arsitektur & 3D Model</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* QUICK METRICS ROW (4 Clean Light Cards) */}
      {/* ========================================================================= */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase block">Survival Rate (SR)</span>
          <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">96.8%</div>
          <span className="text-[11px] text-slate-500">Kelangsungan Hidup Ikan</span>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase block">Efisiensi Pakan</span>
          <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400">+28.4%</div>
          <span className="text-[11px] text-slate-500">Feed Conversion Ratio (FCR)</span>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase block">Prediksi AI Akurasi</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white">94.2%</div>
          <span className="text-[11px] text-slate-500">Deteksi Anomali Amonia</span>
        </div>
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase block">Penghematan Biaya</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">~30%</div>
          <span className="text-[11px] text-slate-500">Reduksi Biaya Pakan Pelet</span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3D MODEL PHOTO GALLERY & ARCHITECTURE SECTION */}
      {/* ========================================================================= */}
      <section id="architecture-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-600" />
              <span className="text-xs font-mono font-bold tracking-widest text-indigo-700 dark:text-indigo-400 uppercase">3D Architecture & Design</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Galeri 3D Render Model & Arsitektur Tank FLOCIFY
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mt-1">
              Dokumentasi arsitektur tank biofloc modular berupa render 3D isometric, top-view, dan perspective yang memperlihatkan komponen sensor, aerator vortex, dan sistem dosing otomatis.
            </p>
          </div>

          <span className="text-xs font-mono font-bold text-slate-400">
            {galleryImages.length} Foto Dokumentasi (Klik untuk memperbesar)
          </span>
        </div>

        {/* Gallery Grid with Hardware-style presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-sm">
          
          {/* Left: Main Gallery Image */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setModalImage(img.url)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-md hover:shadow-2xl hover:scale-105 hover:border-indigo-500 transition-all cursor-pointer flex flex-col justify-end p-3 text-left"
                >
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="absolute inset-0 w-full h-full object-contain p-2 bg-slate-950 transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent group-hover:from-indigo-950/90 transition-colors"></div>
                  
                  <div className="relative z-10 space-y-0.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-indigo-400">
                      <Maximize2 className="w-3 h-3 text-indigo-400" /> Lihat Foto
                    </span>
                    <h4 className="font-display text-xs font-bold text-white line-clamp-1 group-hover:text-indigo-300">
                      {img.title}
                    </h4>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 font-mono mt-3 text-center">
              Gambar 1–3. Render 3D Tank Biofloc FLOCIFY: Isometric View, Top View, dan Perspective View.
            </p>
          </div>

          {/* Right: Tank Component Descriptions */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Component 1: Multi-Probe Sensor Array */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all space-y-1">
              <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
                <Gauge className="h-4 w-4" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Multi-Probe Sensor Array (DO, pH, NH3, Temp)</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Modul sensor terintegrasi untuk monitoring kontinu kualitas air biofloc: dissolved oxygen, derajat keasaman, konsentrasi amonia, dan suhu air secara real-time.
              </p>
            </div>

            {/* Component 2: Vortex Aerator */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 transition-all space-y-1">
              <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400">
                <Waves className="h-4 w-4" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Vortex Aerator Mixer & Sirkulasi Air</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Sistem aerasi pusat yang menciptakan aliran vortex untuk distribusi oksigen merata dan menjaga suspensi partikel biofloc dalam kolom air.
              </p>
            </div>

            {/* Component 3: Automated Dosing Unit */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all space-y-1">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <FlaskConical className="h-4 w-4" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Automated Carbon & Probiotic Dosing</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Unit dosing otomatis untuk penambahan molase (sumber karbon) dan probiotik bakteri heterotrofik berdasarkan rasio C:N yang direkomendasikan AI.
              </p>
            </div>

            {/* Component 4: Bio-Settling Container */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-amber-500 transition-all space-y-1">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <Database className="h-4 w-4" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Central Bio-Settling Container & Sludge Drain</h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Wadah pengendapan sentral untuk pemisahan lumpur biofloc berlebih dengan bypass drain eksternal, menjaga densitas flok optimal 15–25 mL/L.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SIMULATED LIVE WATER QUALITY TELEMETRY & AI ANALYTICS */}
      {/* ========================================================================= */}
      <section id="telemetry-section" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
              <span className="text-xs font-mono font-bold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                Interactive Lab Telemetry
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Monitoring Kualitas Air Biofloc & Prediksi Risiko AI
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mt-1">
              Simulasi interaktif Deep Learning engine FLOCIFY yang menganalisis tren perubahan kualitas air secara kontinu. Klik tombol simulasi untuk menguji respons AI terhadap lonjakan amonia.
            </p>
          </div>

          <button
            onClick={handleToggleAmmoniaSpike}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs shadow-md transition-all cursor-pointer ${
              aiSpikeRisk
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-rose-600 hover:bg-rose-700 text-white'
            }`}
          >
            <Brain className="w-4 h-4 animate-bounce" />
            <span>{aiSpikeRisk ? 'Pulihkan Kondisi Air Biofloc' : 'Simulasi Lonjakan Amonia (AI Risk)'}</span>
          </button>
        </div>

        {/* Telemetry Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Real-Time Water Quality Gauges */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 sm:p-8 text-white border-4 border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${aiSpikeRisk ? 'bg-rose-500 animate-ping' : 'bg-emerald-400 animate-pulse'}`}></div>
                <span className="font-mono text-sm font-bold tracking-wider text-indigo-300">
                  Telemetry Tank [FLOCIFY-Node-01]
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                Biofloc Aquaculture
              </span>
            </div>

            {/* 5 Primary Water Quality Meters */}
            <div className="grid grid-cols-2 gap-4">
              
              {/* Ammonia Meter */}
              <div className={`p-4 rounded-2xl border transition-all ${
                aiSpikeRisk 
                  ? 'bg-rose-950/60 border-rose-500/80 animate-pulse' 
                  : 'bg-slate-900 border-indigo-500/20'
              }`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Ammonia (NH3/NH4+)</span>
                  <AlertTriangle className={`w-4 h-4 ${aiSpikeRisk ? 'text-rose-400' : 'text-slate-600'}`} />
                </div>
                <p className={`text-3xl font-mono font-black ${aiSpikeRisk ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {ammoniaValue}
                </p>
                <span className="text-[10px] font-mono text-slate-400">mg/L (Batas Aman: &lt; 0.20)</span>
              </div>

              {/* Dissolved Oxygen Meter */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-indigo-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Dissolved Oxygen (DO)</span>
                  <Droplet className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-3xl font-mono font-black text-cyan-300">
                  {doValue}
                </p>
                <span className="text-[10px] font-mono text-slate-400">mg/L (Target: &gt; 5.0)</span>
              </div>

              {/* Water Temperature */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-indigo-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Suhu Air</span>
                  <Thermometer className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-3xl font-mono font-black text-amber-400">
                  {tempValue} °C
                </p>
                <span className="text-[10px] font-mono text-slate-400">Stabil (Optimal 28-30°C)</span>
              </div>

              {/* pH Meter */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-indigo-500/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Derajat Keasaman (pH)</span>
                  <Activity className="w-4 h-4 text-indigo-400" />
                </div>
                <p className="text-3xl font-mono font-black text-indigo-300">
                  {phValue}
                </p>
                <span className="text-[10px] font-mono text-slate-400">pH Level (Aman 7.2 - 7.8)</span>
              </div>

            </div>

            {/* Floc Density + Actuator Status */}
            <div className="grid grid-cols-3 gap-3 text-[11px] font-mono">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
                <span className="text-slate-400">Densitas Flok</span>
                <span className="text-lg font-black text-indigo-300 mt-0.5">{flocDensity} <span className="text-[10px] text-slate-500">mL/L</span></span>
                <span className="text-[9px] text-slate-500">Optimal: 15–25 mL/L</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Pompa Aerasi VORTEX:</span>
                <span className="text-emerald-400 font-bold">ACTIVE (100%)</span>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Dosing Molase / Bakteri:</span>
                <span className={autoDosingActive ? "text-amber-400 font-bold animate-pulse" : "text-slate-500 font-bold"}>
                  {autoDosingActive ? "DOSING ON" : "STANDBY"}
                </span>
              </div>
            </div>

          </div>

          {/* Right Panel: Deep Learning AI Prediction & Action Recommendations */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-extrabold text-slate-900 dark:text-white">
                    Deep Learning Predictive Engine
                  </h3>
                  <p className="text-xs font-mono font-bold text-indigo-600">
                    ANOMALY DETECTION & AUTOMATED CONTROL
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                Algoritma Deep Learning Flocify menganalisis tren perubahan kualitas air secara kontinu untuk memprediksi risiko penumpukan amonia sebelum berpotensi membahayakan benih ikan. Model ResNet/LSTM dilatih dengan data historis 6 bulan untuk mengenali pola degradasi air.
              </p>

              {/* Status Box */}
              {aiSpikeRisk ? (
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold">
                    <AlertTriangle className="w-4 h-4 animate-bounce" />
                    <span>PREDIKSI RISIKO: Lonjakan Amonia Terdeteksi!</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Sistem otomatis mengaktifkan penambahan molase karbon (C:N ratio tuning) & menyalakan aerator sekunder untuk mencegah mortalitas ikan. AI confidence: 97.3%.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>STATUS OPTIMAL: Ekosistem Biofloc Sehat</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Kepadatan bakteri heterotrofik stabil. Konversi limbah pakan menjadi biofloc protein berjalan sempurna. Rasio C:N dalam rentang ideal (12:1 – 15:1).
                  </p>
                </div>
              )}

              <div className="space-y-2.5 pt-1 text-xs">
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-sans">
                  <span className="text-slate-600 dark:text-slate-300 font-bold">Estimasi Penghematan Pakan (FCR):</span>
                  <span className="font-mono font-bold text-emerald-600">+28.4% Efficiency</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-sans">
                  <span className="text-slate-600 dark:text-slate-300 font-bold">Tingkat Kelangsungan Hidup (SR):</span>
                  <span className="font-mono font-bold text-indigo-600">96.8% Survival</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800 font-sans">
                  <span className="text-slate-600 dark:text-slate-300 font-bold">Model AI Confidence Level:</span>
                  <span className="font-mono font-bold text-cyan-600">94.2% Accuracy</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-900 dark:text-indigo-200 text-xs leading-relaxed font-sans">
              <strong>Solusi Pembudidaya:</strong> FLOCIFY dirancang untuk memperkuat daya saing pembudidaya ikan skala kecil-menengah melalui digitalisasi tambak biofloc modern dengan investasi terjangkau.
            </div>
          </div>

        </div>
      </section>

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
