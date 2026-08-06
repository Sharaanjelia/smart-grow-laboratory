import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MessageSquare, 
  Send, 
  Sprout, 
  Droplet, 
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
  Wind, 
  Smartphone, 
  Globe, 
  Maximize2,
  X
} from 'lucide-react';
import { NewsItem, Comment, ProjectItem } from '../types';

interface HycosmartsShowcaseProps {
  item?: NewsItem | ProjectItem;
  comments?: Comment[];
  onBack: () => void;
  onAddComment?: (name: string, email: string, content: string) => void;
}

export default function HycosmartsShowcase({ 
  item, 
  comments = [], 
  onBack, 
  onAddComment 
}: HycosmartsShowcaseProps) {
  
  // Real images uploaded by user
  const galleryImages = [
    {
      url: '/images/hycosmarts/hycosmarts-3.png',
      caption: '3D Exterior Render of standard repurposed ISO shipping container modified into a cleanroom farm.',
      title: 'Container Modular Exterior'
    },
    {
      url: '/images/hycosmarts/hycosmarts-2.png',
      caption: 'Indoor hydroponic vertical racks illuminated with specialized pink/purple spectrum grow LEDs & climate fans.',
      title: 'Multi-Tier Vertical Rack & Grow LEDs'
    },
    {
      url: '/images/hycosmarts/hycosmarts-5.png',
      caption: '3D Architectural Floorplan showing cleanroom partitioning, nutrient mixing zone, & control desk.',
      title: 'Interior Floorplan Layout'
    },
    {
      url: '/images/hycosmarts/hycosmarts-4.png',
      caption: 'Smart Grow Lab technician assembling frame structure, sensor wiring, and hydroponic tubing.',
      title: 'Hardware & Sensor Integration'
    },
    {
      url: '/images/hycosmarts/hycosmarts-1.png',
      caption: 'Lab researcher monitoring real-time container microclimate and hydroponic telemetry at control desk.',
      title: 'Real-Time Operator Station'
    }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Interactive Live Telemetry State
  const [phVal, setPhVal] = useState<number>(6.2);
  const [tdsVal, setTdsVal] = useState<number>(1150);
  const [doVal, setDoVal] = useState<number>(7.8);
  const [ecVal, setEcVal] = useState<number>(1.8);
  const [ultrasonicLevel, setUltrasonicLevel] = useState<number>(88);
  const [mode3T, setMode3T] = useState<boolean>(true);
  const [aiDiagnosticState, setAiDiagnosticState] = useState<'optimal' | 'warning' | 'calibrating'>('optimal');

  // Comment Form States
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Auto simulated telemetry fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setPhVal(prev => parseFloat((prev + (Math.random() - 0.5) * 0.05).toFixed(2)));
      setTdsVal(prev => Math.round(prev + (Math.random() - 0.5) * 8));
      setDoVal(prev => parseFloat((prev + (Math.random() - 0.5) * 0.04).toFixed(1)));
      setEcVal(prev => parseFloat((prev + (Math.random() - 0.5) * 0.02).toFixed(2)));
      setUltrasonicLevel(prev => parseFloat((prev + (Math.random() - 0.5) * 0.2).toFixed(1)));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

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

  const getStatusBadge = (val: number, min: number, max: number) => {
    if (val >= min && val <= max) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Optimal
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300/40">
        <AlertTriangle className="w-3 h-3 text-amber-600" />
        Alert
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-20 animate-fade-in space-y-12">
      
      {/* Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <button 
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300 shadow-sm hover:shadow hover:border-emerald-500 cursor-pointer self-start"
        >
          <ChevronLeft className="h-4 w-4 text-emerald-600 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Hub Utama</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-extrabold border border-emerald-200/50">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
            Smart Container Hydroponics
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300 text-xs font-extrabold border border-cyan-200/50">
            <Globe className="w-3.5 h-3.5 text-cyan-600" />
            3T Region Suitable
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 text-xs font-extrabold border border-purple-200/50">
            <Cpu className="w-3.5 h-3.5 text-purple-600" />
            AI Failure Early Alert
          </span>
        </div>
      </div>

      {/* Hero Showcase Title Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></span>
            <span className="font-mono text-xs font-extrabold tracking-widest text-emerald-600 uppercase">
              FLAGSHIP INNOVATION // HYCOSMARTS
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
            HYCOSMARTS
          </h1>
          <p className="text-lg font-sans font-bold text-teal-600 dark:text-teal-400">
            Smart Container-Based Intelligent Farming System
          </p>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans pt-2">
            HYCOSMARTS is a smart container-based intelligent farming system designed to manage indoor hydroponic farming automatically, efficiently, and sustainably. The system is equipped with various important sensors such as pH, TDS, DO, EC, and ultrasonic sensors to monitor water quality, nutrient availability, and growing conditions in real time.
          </p>
        </div>

        {/* Highlight Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-emerald-500/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
                Smart Farming Specs
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                v2.4 Active
              </span>
            </div>
            
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                <span className="text-slate-300">Form Factor:</span>
                <span className="font-bold text-white">20ft / 40ft ISO Shipping Container</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                <span className="text-slate-300">Telemetry Nodes:</span>
                <span className="font-bold text-emerald-400">pH, TDS, DO, EC, Ultrasonic</span>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-white/10 pb-2">
                <span className="text-slate-300">Control System:</span>
                <span className="font-bold text-white">Edge AI + Web/Mobile Apps</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300">Target Region:</span>
                <span className="font-bold text-teal-300">3T & Urban Microclimates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Photo Gallery */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            Galeri Dokumentasi & Arsitektur HYCOSMARTS
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
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-md hover:shadow-2xl hover:scale-105 hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-end p-3 text-left"
            >
              <img 
                src={img.url} 
                alt={img.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent group-hover:from-emerald-950/90 transition-colors"></div>
              
              <div className="relative z-10 space-y-0.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400">
                  <Maximize2 className="w-3 h-3 text-emerald-400" /> Lihat Foto
                </span>
                <h4 className="font-display text-xs font-bold text-white line-clamp-1 group-hover:text-emerald-300">
                  {img.title}
                </h4>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Sensor Telemetry & Diagnostics Section */}
      <div className="space-y-6 pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-6 rounded bg-emerald-500"></span>
              <span className="font-mono text-xs font-bold text-emerald-600 uppercase tracking-widest">
                REAL-TIME TELEMETRY SENSORS
              </span>
            </div>
            <h2 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white mt-1">
              Instrumen & Sensor Kualitas Air Real-Time
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl self-start">
            <button
              onClick={() => setAiDiagnosticState('optimal')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                aiDiagnosticState === 'optimal' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Kondisi Normal
            </button>
            <button
              onClick={() => setAiDiagnosticState('warning')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                aiDiagnosticState === 'warning' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Simulasi Peringatan Dini (AI Alert)
            </button>
          </div>
        </div>

        {/* AI Early Alert Banner if active */}
        {aiDiagnosticState === 'warning' && (
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start gap-4 animate-fade-in">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <h4 className="font-bold font-display text-amber-700 dark:text-amber-300">
                Peringatan Dini Artificial Intelligence Detected!
              </h4>
              <p className="text-xs text-amber-800 dark:text-amber-300/80 leading-relaxed">
                Modul Edge AI mendeteksi penurunan Dissolved Oxygen (DO) mendadak ke 5.2 mg/L dan kenaikan pH ke 7.1 pH. Sistem HYCOSMARTS secara otomatis mengaktifkan pompa aerasi tambahan dan mengirim notifikasi darurat ke Aplikasi Mobile & Web Dashboard operator.
              </p>
            </div>
          </div>
        )}

        {/* Sensor Grid (5 Main Sensors requested by user: pH, TDS, DO, EC, Ultrasonic) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. pH Sensor */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Sensor pH Air</h4>
                  <p className="text-[11px] text-slate-400">Derajat Keasaman Solution</p>
                </div>
              </div>
              {getStatusBadge(phVal, 5.5, 6.5)}
            </div>

            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-3xl font-mono font-black text-slate-900 dark:text-white">
                {phVal}
              </span>
              <span className="text-xs font-bold text-slate-500">pH</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Min: 5.5 pH</span>
                <span>Max: 6.5 pH</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(0, ((phVal - 4) / 4) * 100))}%` }}
                ></div>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              Memantau keasaman air agar penyerapan unsur hara makro dan mikro oleh akar tanaman optimal.
            </p>
          </div>

          {/* 2. TDS Sensor */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                  <Gauge className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Sensor TDS</h4>
                  <p className="text-[11px] text-slate-400">Total Dissolved Solids</p>
                </div>
              </div>
              {getStatusBadge(tdsVal, 800, 1400)}
            </div>

            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-3xl font-mono font-black text-slate-900 dark:text-white">
                {tdsVal}
              </span>
              <span className="text-xs font-bold text-slate-500">ppm</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Min: 800 ppm</span>
                <span>Max: 1400 ppm</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-500 transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(0, (tdsVal / 1800) * 100))}%` }}
                ></div>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              Mengukur konsentrasi kepadatan nutrisi larutan hara AB Mix dalam tangki penampung.
            </p>
          </div>

          {/* 3. DO (Dissolved Oxygen) Sensor */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Sensor DO</h4>
                  <p className="text-[11px] text-slate-400">Dissolved Oxygen</p>
                </div>
              </div>
              {getStatusBadge(doVal, 6.0, 9.0)}
            </div>

            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-3xl font-mono font-black text-slate-900 dark:text-white">
                {doVal}
              </span>
              <span className="text-xs font-bold text-slate-500">mg/L</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Min: 6.0 mg/L</span>
                <span>Max: 9.0 mg/L</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(0, (doVal / 10) * 100))}%` }}
                ></div>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              Memantau kadar oksigen terlarut untuk mencegah pembusukan akar dan memacu pertumbuhan cepat.
            </p>
          </div>

          {/* 4. EC (Electrical Conductivity) Sensor */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Sensor EC</h4>
                  <p className="text-[11px] text-slate-400">Electrical Conductivity</p>
                </div>
              </div>
              {getStatusBadge(ecVal, 1.2, 2.2)}
            </div>

            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-3xl font-mono font-black text-slate-900 dark:text-white">
                {ecVal}
              </span>
              <span className="text-xs font-bold text-slate-500">mS/cm</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Min: 1.2 mS/cm</span>
                <span>Max: 2.2 mS/cm</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-500 rounded-full"
                  style={{ width: `${Math.min(100, Math.max(0, (ecVal / 3) * 100))}%` }}
                ></div>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              Menghitung daya hantar listrik ion terlarut untuk kalibrasi kepekatan garam nutrisi.
            </p>
          </div>

          {/* 5. Ultrasonic Water Level Sensor */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4 hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">Sensor Ultrasonik</h4>
                  <p className="text-[11px] text-slate-400">Water Tank Reservoir Level</p>
                </div>
              </div>
              {getStatusBadge(ultrasonicLevel, 30, 100)}
            </div>

            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-3xl font-mono font-black text-slate-900 dark:text-white">
                {ultrasonicLevel}%
              </span>
              <span className="text-xs font-bold text-slate-500">Kapasitas Tangki</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Batas Kritis: 20%</span>
                <span>Penuh: 100%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-500 rounded-full"
                  style={{ width: `${ultrasonicLevel}%` }}
                ></div>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              Sensor non-kontak ultrasonik untuk mengukur stok air dan mencegah pompa terbakar akibat kering.
            </p>
          </div>

          {/* 6. AI Microclimate Controller */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 shadow-sm space-y-4 border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
                  <Thermometer className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Mikroklimat Container</h4>
                  <p className="text-[11px] text-slate-400">HVAC & LED Control</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Auto HVAC
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <p className="text-[10px] text-slate-400 font-mono">Suhu Ruang</p>
                <p className="text-2xl font-mono font-black text-white">23.5 °C</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-mono">Kelembapan Air</p>
                <p className="text-2xl font-mono font-black text-emerald-400">65.0 %</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 pt-1">
              Pengondisian suhu AC dan exhaust fans terhubung dengan sensor suhu untuk menjaga stabilitas transpirasi daun.
            </p>
          </div>

        </div>
      </div>

      {/* Deep-Dive Architectural Features Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
        
        {/* Left Card: 3T Region Suitability & Energy Self-Sufficiency */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-display font-extrabold text-slate-900 dark:text-white">
                Solusi Mandiri Daerah 3T
              </h3>
              <p className="text-xs font-mono font-bold text-emerald-600">
                TERDEPAN, TERLUAR, DAN TERTINGGAL (3T) READY
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            Sistem container mandiri HYCOSMARTS dirancang secara portabel sehingga sangat cocok diimplementasikan di wilayah 3T. Tanpa memerlukan lahan subur tradisional, container ini dapat diletakkan di pulau terluar, daerah konflik lingkungan, maupun wilayah maritim.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Hemat Energi & Mandiri:</strong> Kompatibel dengan instalasi Solar PV Panel & battery storage off-grid.</span>
            </div>
            <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Kemandirian Pangan Lokal:</strong> Menghasilkan sayuran segar sepanjang tahun tanpa bergantung musim atau impor pasokan.</span>
            </div>
            <div className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Sirkulasi Air Tertutup:</strong> Efisiensi penggunaan air hingga 95% dibandingkan pertanian konvensional.</span>
            </div>
          </div>
        </div>

        {/* Right Card: Multi-Platform Dashboard & Mobile Integration */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-display font-extrabold text-slate-900 dark:text-white">
                Web Dashboard & Mobile App Integration
              </h3>
              <p className="text-xs font-mono font-bold text-cyan-600">
                REAL-TIME CROSS-PLATFORM CONTROL
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            HYCOSMARTS terhubung secara langsung dengan Dashboard berbasis Web dan Aplikasi Mobile Android/iOS. Pengelola laboratorium atau petani modern dapat secara presisi mengatur jadwal pemupukan, memantau grafik sensor historis, dan menerima push notification instan.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <Cpu className="w-4 h-4 text-emerald-500" />
                <span>AI Presisi</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Penyesuaian kebutuhan nutrisi tanaman otomatis secara real-time.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <ShieldCheck className="w-4 h-4 text-cyan-500" />
                <span>Early Warning</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Notifikasi awal ancaman kegagalan panen via SMS & Push App.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Discussion & Comments Section */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-emerald-600" />
            Diskusi & Diskusi Riset HYCOSMARTS ({comments.length})
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
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input 
              type="email" 
              placeholder="Alamat Email (opsional)" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <textarea
            rows={3}
            placeholder="Tuliskan apresiasi, masukan sensor, atau pertanyaan teknis mengenai HYCOSMARTS..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Komentar</span>
          </button>
        </form>

        {/* List of comments */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-xs text-slate-400 italic">Belum ada komentar. Jadilah yang pertama berdiskusi mengenai HYCOSMARTS!</p>
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
                  <h4 className="font-display text-lg font-bold text-emerald-400">{matched.title}</h4>
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
