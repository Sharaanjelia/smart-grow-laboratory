import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MessageSquare, 
  Send, 
  Sprout, 
  Droplets, 
  TrendingUp, 
  Zap, 
  Thermometer, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Gauge, 
  AlertTriangle, 
  Layers, 
  ShieldCheck, 
  Radio, 
  Smartphone, 
  Globe, 
  Maximize2,
  X,
  Fish,
  Sun,
  Server
} from 'lucide-react';
import { NewsItem, Comment, ProjectItem } from '../types';

interface SimonaShowcaseProps {
  item?: NewsItem | ProjectItem;
  comments?: Comment[];
  onBack: () => void;
  onAddComment?: (name: string, email: string, content: string) => void;
}

export default function SimonaShowcase({ 
  item, 
  comments = [], 
  onBack, 
  onAddComment 
}: SimonaShowcaseProps) {
  
  // Real images uploaded by user for SIMONA
  const galleryImages = [
    {
      url: '/images/simona/simona-hardware-blynk.png',
      caption: 'SIMONA Hardware Monitoring Controller with LCD Display (TDS: 154 ppm, pH: 9.61, Temp: 27.25°C) & Blynk Mobile App Integration.',
      title: 'Hardware Controller & Mobile App Sync'
    },
    {
      url: '/images/simona/simona-control-box-farm.jpg',
      caption: 'Outdoor Aquaponics Installation with white weather-proof IoT control box, Telkom Indonesia branding, and lush lettuce crop rack.',
      title: 'Aquaponics Control Box & Rack Setup'
    },
    {
      url: '/images/simona/simona-outdoor-farm.jpg',
      caption: 'Wide view of the SIMONA smart aquaponics research farm located at Bumi Panyileukan with protective shade netting.',
      title: 'Bumi Panyileukan Research Site'
    },
    {
      url: '/images/simona/simona-crops-close.jpg',
      caption: 'High-density hydroponic pipe channels growing fresh pakcoy and green lettuce fertilized by bio-filtered fish waste.',
      title: 'Hydroponic Crop Channel Detail'
    },
    {
      url: '/images/simona/simona-logo.png',
      caption: 'Official SIMONA Logo representing the symbiotic harmony between aquaculture (fish), hydroponics (leaf), and cloud IoT technology.',
      title: 'Official SIMONA Brand Logo'
    }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Real LCD Values from User's Physical Unit
  const [tdsVal, setTdsVal] = useState<number>(154);
  const [phVal, setPhVal] = useState<number>(7.2);
  const [tempVal, setTempVal] = useState<number>(27.25);
  const [waterLevelVal, setWaterLevelVal] = useState<number>(85);
  const [fishFeederActive, setFishFeederActive] = useState<boolean>(false);
  const [simulatedCycleState, setSimulatedCycleState] = useState<'normal' | 'feeding' | 'aerating'>('normal');

  // Comment Form States
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Auto simulated telemetry fluctuation for live realism
  useEffect(() => {
    const timer = setInterval(() => {
      setTdsVal(prev => Math.round(prev + (Math.random() - 0.5) * 3));
      setPhVal(prev => parseFloat((prev + (Math.random() - 0.5) * 0.04).toFixed(2)));
      setTempVal(prev => parseFloat((prev + (Math.random() - 0.5) * 0.05).toFixed(2)));
      setWaterLevelVal(prev => parseFloat((prev + (Math.random() - 0.5) * 0.2).toFixed(1)));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleTriggerFeeder = () => {
    setFishFeederActive(true);
    setSimulatedCycleState('feeding');
    setTimeout(() => {
      setFishFeederActive(false);
      setSimulatedCycleState('normal');
    }, 4000);
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

  const getStatusBadge = (isGood: boolean, labelGood = 'Optimal', labelWarn = 'Alert') => {
    if (isGood) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {labelGood}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300/40">
        <AlertTriangle className="w-3 h-3 text-amber-600" />
        {labelWarn}
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-20 animate-fade-in space-y-12">
      
      {/* Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <button 
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-all duration-300 shadow-sm hover:shadow hover:border-cyan-500 cursor-pointer self-start"
        >
          <ChevronLeft className="h-4 w-4 text-cyan-600 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Hub Utama</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 text-xs font-extrabold border border-cyan-200/50">
            <Fish className="w-3.5 h-3.5 text-cyan-600" />
            Aquaponics Symbiosis
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-extrabold border border-emerald-200/50">
            <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
            Blynk & Web Remote Access
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 text-xs font-extrabold border border-blue-200/50">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            Arduino / Raspberry Pi Microcontroller
          </span>
        </div>
      </div>

      {/* Hero Showcase Title Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-3">
            <img src="/images/simona/simona-logo.png" alt="SIMONA Logo" className="h-12 w-auto object-contain" />
            <div>
              <span className="font-mono text-xs font-extrabold tracking-widest text-cyan-600 uppercase">
                ECO-FARMING INNOVATION // SIMONA
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none mt-1">
                SIMONA
              </h1>
            </div>
          </div>
          
          <p className="text-lg font-sans font-bold text-cyan-600 dark:text-cyan-400">
            Aquaponics Monitoring System
          </p>
          
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans pt-2">
            SIMONA (Aquaponics Monitoring System) is an integrated smart system designed to support sustainable farming by combining aquaculture and hydroponics in a mutually beneficial ecosystem. It utilizes a range of sensors to monitor key environmental parameters such as water level, pH, temperature, and Total Dissolved Solids (TDS), ensuring optimal conditions for both fish and plant growth.
          </p>
        </div>

        {/* Highlight Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-cyan-900 via-teal-900 to-slate-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-cyan-500/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                SIMONA System Specs
              </span>
              <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-400/30">
                IoT Active
              </span>
            </div>
            
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                <span className="text-slate-300">Architecture:</span>
                <span className="font-bold text-white">Closed-Loop Aquaponics</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                <span className="text-slate-300">Microcontroller:</span>
                <span className="font-bold text-cyan-300">Arduino / Raspberry Pi / ESP32</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                <span className="text-slate-300">Cloud Platform:</span>
                <span className="font-bold text-white">Blynk App & Web Portal</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Location:</span>
                <span className="font-bold text-emerald-300">Bumi Panyileukan Research Site</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Photo Gallery */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-600" />
            Galeri Dokumentasi & Hardware SIMONA
          </h3>
          <span className="text-xs font-mono font-bold text-slate-400">
            {galleryImages.length} Foto Dokumentasi (Klik foto untuk memperbesar)
          </span>
        </div>

        {/* Small Horizontal Thumbnail Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-2">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setModalImage(img.url)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-md hover:shadow-2xl hover:scale-105 hover:border-cyan-500 transition-all cursor-pointer flex flex-col justify-end p-3 text-left"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent group-hover:from-cyan-950/90 transition-colors"></div>
              
              <div className="relative z-10 space-y-0.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-400">
                  <Maximize2 className="w-3 h-3 text-cyan-400" /> Lihat Foto
                </span>
                <h4 className="font-display text-xs font-bold text-white line-clamp-1 group-hover:text-cyan-300">
                  {img.title}
                </h4>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Physical Hardware Controller & Blynk Integration */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-6 rounded bg-cyan-500"></span>
              <span className="font-mono text-xs font-bold text-cyan-600 uppercase tracking-widest">
                LIVE HARDWARE LCD & TELEMETRY
              </span>
            </div>
            <h2 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white mt-1">
              Instrumen Kontroler SIMONA & Aplikasi Blynk
            </h2>
          </div>

          <button
            onClick={handleTriggerFeeder}
            disabled={fishFeederActive}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Fish className="w-4 h-4 animate-bounce" />
            <span>{fishFeederActive ? 'Memberi Pakan Ikan...' : 'Simulasi Feeder Ikan Otomatis'}</span>
          </button>
        </div>

        {/* Realistic Physical Box Simulator Matching User's Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Box: Physical Control Display Box (Replicating LCD Unit from Photo) */}
          <div className="lg:col-span-7 bg-slate-950 rounded-3xl p-6 sm:p-8 text-white border-4 border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                <span className="font-mono text-sm font-bold tracking-wider text-cyan-400">
                  Monitoring Aquaponik [SIMONA-Node1]
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                Telkom Univ Research
              </span>
            </div>

            {/* LCD Screen Display Card (Matching user photo exactly: TDS, PH, Temp) */}
            <div className="bg-slate-900 border-2 border-cyan-500/40 rounded-2xl p-6 space-y-6 shadow-inner relative">
              <div className="grid grid-cols-2 gap-6">
                
                {/* TDS Gauge */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/20 text-center space-y-1">
                  <p className="text-[10px] font-mono font-bold text-cyan-400 uppercase">TDS</p>
                  <p className="text-4xl font-mono font-black text-white">{tdsVal}</p>
                  <p className="text-[10px] font-mono text-slate-400">ppm</p>
                </div>

                {/* pH Gauge */}
                <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/20 text-center space-y-1">
                  <p className="text-[10px] font-mono font-bold text-cyan-400 uppercase">PH</p>
                  <p className="text-4xl font-mono font-black text-emerald-400">{phVal}</p>
                  <p className="text-[10px] font-mono text-slate-400">pH level</p>
                </div>
              </div>

              {/* Temperature Bar */}
              <div className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Thermometer className="w-6 h-6 text-amber-400 animate-pulse" />
                  <div>
                    <p className="text-[10px] font-mono text-slate-400">Temperature</p>
                    <p className="text-xs font-mono font-bold text-slate-200">Suhu Air Akuakultur</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-mono font-black text-amber-400">{tempVal}</span>
                  <span className="text-xs font-mono font-bold text-slate-400"> °C</span>
                </div>
              </div>
            </div>

            {/* BNC Connector Status Badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-mono text-slate-400">
              <div className="bg-slate-900/60 p-2 rounded-lg text-center border border-slate-800">
                Probe BNC 1: <span className="text-emerald-400 font-bold">pH Active</span>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-lg text-center border border-slate-800">
                Probe BNC 2: <span className="text-cyan-400 font-bold">TDS Active</span>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-lg text-center border border-slate-800">
                Probe BNC 3: <span className="text-amber-400 font-bold">Temp Active</span>
              </div>
            </div>
          </div>

          {/* Right Box: Blynk Mobile App Sync Representation */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-extrabold text-slate-900 dark:text-white">
                    Blynk Mobile & Web IoT Sync
                  </h3>
                  <p className="text-xs font-mono font-bold text-cyan-600">
                    REMOTE CONTROL ANYTIME, ANYWHERE
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                SIMONA terintegrasi dengan ekosistem IoT Blynk dan platform web responsif. Pengguna dapat memantau grafik riwayat suhu, pH, dan TDS secara cepat, serta mengatur jadwal pompa & feeder dari smartphone.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-sans">
                  <span className="text-slate-600 dark:text-slate-300 font-bold">Level Air (Ultrasonic):</span>
                  <span className="font-mono font-bold text-cyan-600">{waterLevelVal}%</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-sans">
                  <span className="text-slate-600 dark:text-slate-300 font-bold">Konektivitas Wi-Fi IoT:</span>
                  <span className="font-mono font-bold text-emerald-600">Online (RSSI -58dBm)</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-sans">
                  <span className="text-slate-600 dark:text-slate-300 font-bold">Otomatisasi Pompa:</span>
                  <span className="font-mono font-bold text-blue-600">Active Recirculation</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-900 dark:text-cyan-200 text-xs leading-relaxed font-sans">
              <strong>Kemitraan Riset:</strong> Implementasi lapangan SIMONA didukung oleh laboratorium Smart Grow Telkom University dan diuji coba langsung di situs Bumi Panyileukan.
            </div>
          </div>

        </div>
      </div>

      {/* Symbiotic Aquaponics Cycle Feature */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-display font-extrabold text-slate-900 dark:text-white">
              Siklus Simbiosis Akuaponik Berkelanjutan
            </h3>
            <p className="text-xs font-mono font-bold text-emerald-600">
              CLOSED-LOOP SUSTAINABLE ECOSYSTEM
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-cyan-600 font-bold text-sm">
              <Fish className="w-5 h-5" />
              <span>1. Budidaya Ikan (Aquaculture)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ikan menghasilkan limbah organik kaya amonia. Sensor SIMONA memantau suhu dan pH agar habitat ikan tetap sehat.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-teal-600 font-bold text-sm">
              <Cpu className="w-5 h-5" />
              <span>2. Bio-Filtrasi & Telemetri</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Bakteri pengurai mengubah amonia menjadi nitrat yang aman. Mikrokontroler SIMONA memantau TDS & menyaring air secara otomatis.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
              <Sprout className="w-5 h-5" />
              <span>3. Tanaman Hidroponik</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Akar tanaman menyerap nitrat alami sebagai pupuk organik cair, sehingga air kembali bersih mengalir ke kolam ikan.
            </p>
          </div>

        </div>
      </div>

      {/* Discussion & Comments Section */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-cyan-600" />
            Diskusi Riset SIMONA ({comments.length})
          </h3>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Tinggalkan Pertanyaan atau Komentar Riset
          </h4>

          {commentSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              Komentar Anda berhasil dikirim dan ditambahkan ke diskusi!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Nama Lengkap" 
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              required
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input 
              type="email" 
              placeholder="Alamat Email (opsional)" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <textarea
            rows={3}
            placeholder="Tuliskan apresiasi atau pertanyaan teknis mengenai sistem akuaponik SIMONA..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          ></textarea>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Komentar</span>
          </button>
        </form>

        {/* List of comments */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-xs text-slate-400 italic">Belum ada komentar. Jadilah yang pertama berdiskusi mengenai SIMONA!</p>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white">{c.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{c.timestamp}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {c.content}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Image Zoom Lightbox Modal */}
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
              className="absolute top-4 right-4 p-3 rounded-full bg-slate-950/80 text-white hover:bg-red-600 transition-all z-20 cursor-pointer border border-white/10"
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
                  <h4 className="font-display text-lg font-bold text-cyan-400">{matched.title}</h4>
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
