import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Send, 
  MessageSquare, 
  Zap, 
  Radio, 
  MapPin, 
  Activity, 
  AlertTriangle, 
  Sliders, 
  Sun, 
  Eye, 
  CheckCircle2, 
  Sparkles,
  Power,
  Layers,
  Cpu
} from 'lucide-react';
import { NewsItem, Comment } from '../types';

interface LuminetShowcaseProps {
  item?: NewsItem;
  comments?: Comment[];
  onBack: () => void;
  onAddComment?: (name: string, email: string, content: string) => void;
}

export default function LuminetShowcase({ 
  item, 
  comments = [], 
  onBack, 
  onAddComment 
}: LuminetShowcaseProps) {
  
  // Real images uploaded by user for LUMINET
  const galleryImages = [
    {
      url: '/images/luminet/luminet-logo.jpg',
      caption: 'Official LUMINET Logo - XBee Mesh Powered Smart Street Lighting System.',
      title: 'Official LUMINET Brand Emblem'
    },
    {
      url: '/images/luminet/luminet-pju-map-dashboard.png',
      caption: 'PJU Web Dashboard Interface featuring interactive GIS Leaflet map, live telemetry for node SDM-001 (Voltage, Current, Luminance, Dimming level), and device count overview (60 nodes total).',
      title: 'GIS Map & Telemetry Dashboard'
    },
    {
      url: '/images/luminet/luminet-hardware-box-lcd.jpg',
      caption: 'LUMINET Central Gateway Controller with backlit LCD screen ("MENUNGGU PERINTAH SERVER"), status LEDs, and manual override button.',
      title: 'XBee Master Gateway Box'
    },
    {
      url: '/images/luminet/luminet-interluc-street-light.jpg',
      caption: 'Interluc High-Efficiency LED Street Light Luminaire fixture connected with XBee wireless RF module and weather-sealed driver box.',
      title: 'Interluc Smart LED Street Luminaire'
    }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Live Telemetry States for Node SDM-001
  const [selectedNode, setSelectedNode] = useState<string>('SDM-001');
  const [isPowerOn, setIsPowerOn] = useState<boolean>(true);
  const [dimmingLevel, setDimmingLevel] = useState<number>(39);
  const [cctKelvin, setCctKelvin] = useState<number>(4000);
  const [voltage, setVoltage] = useState<number>(220);
  const [currentVal, setCurrentVal] = useState<number>(0.45);
  const [luminance, setLuminance] = useState<number>(420);
  const [anomalyTriggered, setAnomalyTriggered] = useState<boolean>(false);
  const [autoLdrActive, setAutoLdrActive] = useState<boolean>(true);

  // Comment Form States
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Fluctuating real-time telemetry simulator
  useEffect(() => {
    const timer = setInterval(() => {
      if (isPowerOn && !anomalyTriggered) {
        const baseCurrent = 0.45 * (dimmingLevel / 100);
        setCurrentVal(parseFloat((baseCurrent + (Math.random() - 0.5) * 0.02).toFixed(2)));
        setVoltage(Math.round(220 + (Math.random() - 0.5) * 4));
        setLuminance(Math.round(1100 * (dimmingLevel / 100) + (Math.random() - 0.5) * 15));
      } else {
        setCurrentVal(0);
        setVoltage(anomalyTriggered ? 0 : 220);
        setLuminance(0);
      }
    }, 2500);
    return () => clearInterval(timer);
  }, [isPowerOn, dimmingLevel, anomalyTriggered]);

  const handleSimulateAnomaly = () => {
    setAnomalyTriggered(prev => !prev);
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

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-20 animate-fade-in space-y-12 font-sans">
      
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <button 
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 transition-all duration-300 shadow-sm hover:shadow hover:border-amber-500 cursor-pointer self-start"
        >
          <ChevronLeft className="h-4 w-4 text-amber-500 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Hub Utama</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 text-xs font-extrabold border border-blue-200/50">
            <Radio className="w-3.5 h-3.5 text-blue-600" />
            XBee Mesh RF 2.4GHz
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 text-xs font-extrabold border border-amber-200/50">
            <Sun className="w-3.5 h-3.5 text-amber-600" />
            LDR / CCT Adaptive Dimming
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-extrabold border border-emerald-200/50">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            45% Energy Optimization
          </span>
        </div>
      </div>

      {/* Hero Header Section with Logo & Description */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-slate-950 p-2.5 border border-slate-800 shadow-md shrink-0">
              <img src="/images/luminet/luminet-logo.jpg" alt="LUMINET Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <span className="font-mono text-xs font-extrabold tracking-widest text-amber-500 uppercase">
                SMART CITY PJU INTELLIGENCE // LUMINET
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none mt-1">
                LUMINET
              </h1>
            </div>
          </div>
          
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            Smart Street Lighting Management System (PJU Telemetry)
          </p>
          
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
            LUMINET (Smart Street Lighting Management System) is an Internet of Things (IoT)-based smart system for automatically and efficiently managing public street lighting (PJU). The system uses XBee communication for centralized monitoring and control via a web dashboard and mobile app. LUMINET supports multi-point control with automation logic based on time, light intensity (LDR), and Correlated Color Temperature (CCT). The system also monitors electrical conditions (power, voltage, current) in real-time and is equipped with GPS for PJU location identification. Anomaly notifications are automatically sent to expedite issue resolution. With its modular design, LUMINET is suitable for implementation by local governments, industrial zones, and smart city managers to enhance energy efficiency, reduce operational costs, and accelerate on-site repair responses.
          </p>
        </div>

        {/* Highlight Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-blue-500/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                LUMINET System Specs
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                XBee Mesh Online
              </span>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Komunikasi Nirkabel:</span>
                <span className="font-mono font-bold text-blue-400">XBee Mesh 2.4 GHz</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Penghematan Energi:</span>
                <span className="font-mono font-bold text-emerald-400">Hingga 45% Efficiency</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Kontrol Otomatisasi:</span>
                <span className="font-mono font-bold text-amber-400">LDR Sensor & CCT Tuning</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Telemetri Listrik:</span>
                <span className="font-mono font-bold text-white">Tegangan, Arus, Daya (RMS)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lokasi Geografis:</span>
                <span className="font-mono font-bold text-cyan-400">GPS Node Mapping</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-200 leading-relaxed font-sans">
              <strong>Solusi Smart City PJU:</strong> Terintegrasi penuh dengan peta GIS untuk deteksi dini pemadaman atau keandalan penerangan jalan umum secara presisi.
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Photo Gallery */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            Galeri Dokumentasi & Hardware LUMINET
          </h3>
          <span className="text-xs font-mono font-bold text-slate-400">
            {activeImageIndex + 1} / {galleryImages.length}
          </span>
        </div>

        {/* Featured Big Image Display */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-2xl group">
          <img 
            src={galleryImages[activeImageIndex].url}
            alt={galleryImages[activeImageIndex].title}
            className="w-full h-full object-contain p-4 bg-slate-950 transition-transform duration-700 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>

          {/* Zoom Modal Trigger */}
          <button
            onClick={() => setModalImage(galleryImages[activeImageIndex].url)}
            className="absolute top-4 right-4 p-3 rounded-full bg-slate-950/70 text-white backdrop-blur-md hover:bg-amber-500 transition-all border border-white/20 cursor-pointer"
            title="Perbesar Foto"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          {/* Next / Previous Controls */}
          <button
            onClick={() => setActiveImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 text-white backdrop-blur-md hover:bg-amber-500 transition-all border border-white/20 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => setActiveImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 text-white backdrop-blur-md hover:bg-amber-500 transition-all border border-white/20 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bottom Caption overlay */}
          <div className="absolute bottom-6 left-6 right-6 bg-slate-950/85 backdrop-blur-md border border-white/10 p-5 rounded-2xl text-white space-y-1">
            <h4 className="font-display text-lg font-bold text-amber-400">
              {galleryImages[activeImageIndex].title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {galleryImages[activeImageIndex].caption}
            </p>
          </div>
        </div>

        {/* Thumbnail Selector Grid */}
        <div className="grid grid-cols-4 gap-3 pt-2">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-video rounded-xl overflow-hidden border-2 bg-slate-950 p-1 transition-all cursor-pointer ${
                activeImageIndex === idx 
                  ? 'border-amber-500 ring-4 ring-amber-500/20 scale-105' 
                  : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.url} alt={img.title} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Live PJU GIS Map & Telemetry Dashboard matching User's Image */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-6 rounded bg-amber-500"></span>
              <span className="font-mono text-xs font-bold text-amber-500 uppercase tracking-widest">
                INTERACTIVE WEB DASHBOARD SIMULATOR
              </span>
            </div>
            <h2 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white mt-1">
              PJU Monitoring Dashboard & Kontrol Node GIS
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSimulateAnomaly}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs shadow-sm transition-all cursor-pointer ${
                anomalyTriggered
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{anomalyTriggered ? 'Pulihkan Jaringan Normal' : 'Simulasi Anomali/Putus Listrik'}</span>
            </button>
          </div>
        </div>

        {/* Dashboard Frame (Replicating exact user screenshot theme: Dark PJU Monitoring Dashboard) */}
        <div className="bg-slate-950 rounded-3xl border-4 border-slate-800 p-6 shadow-2xl text-white space-y-6">
          
          {/* Dashboard Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-600 text-white font-mono font-bold text-xs flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-300" />
                PJU Monitoring
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold hidden sm:inline">
                Dashboard &gt; GIS Map Node Overview
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="text-slate-400">Gateway Status: <span className="text-emerald-400 font-bold">XBee Mesh Online</span></span>
              <span className="text-slate-400">Total Nodes: <span className="text-white font-bold">60</span></span>
            </div>
          </div>

          {/* Top 3 Stat Cards (Matching User's screenshot: Active Devices 5, Inactive Devices 55, Total Devices 60) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-xs font-mono text-slate-400 font-bold">Active Devices</span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-mono font-black text-amber-400">
                  {isPowerOn && !anomalyTriggered ? '60' : '5'}
                </span>
                <Sun className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-xs font-mono text-slate-400 font-bold">Inactive Devices</span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-mono font-black text-slate-400">
                  {isPowerOn && !anomalyTriggered ? '0' : '55'}
                </span>
                <Power className="w-6 h-6 text-slate-500" />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-xs font-mono text-slate-400 font-bold">Total Devices</span>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-mono font-black text-white">60</span>
                <Radio className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Main Map View & Telemetry Popup Overlay (Replicating User's Map Popup) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* GIS Map Canvas Simulator */}
            <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-4 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
              
              {/* Map Canvas Background (Simulating Jalan Cikutra Barat & Jalan Sido Mukti map) */}
              <div className="absolute inset-0 bg-slate-950 opacity-90 p-4 font-mono text-[10px] text-slate-700 space-y-8 pointer-events-none select-none">
                <div className="border-b border-slate-900 pb-2 flex justify-between">
                  <span>Jalan Cikutra Barat</span>
                  <span>Jalan Sido Mukti</span>
                  <span>Jalan Taman Sido Luhur</span>
                </div>
                <div className="grid grid-cols-3 gap-6 pt-12">
                  <div className="p-4 border border-dashed border-slate-900 rounded">Gedung Adda'wah</div>
                  <div className="p-4 border border-dashed border-slate-900 rounded">STIE Al Jabbar</div>
                  <div className="p-4 border border-dashed border-slate-900 rounded">Kesehatan Unisba</div>
                </div>
              </div>

              {/* Node Marker & Animated Map Pin */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto space-y-4">
                <div className="relative cursor-pointer group" onClick={() => setSelectedNode('SDM-001')}>
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all shadow-xl ${
                    isPowerOn && !anomalyTriggered 
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 animate-pulse' 
                      : 'bg-rose-500/20 border-rose-500 text-rose-400'
                  }`}>
                    <Sun className="w-7 h-7" />
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono font-bold text-amber-300 whitespace-nowrap">
                    PJU Node: SDM-001
                  </span>
                </div>
              </div>

              {/* Map Footer Info */}
              <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  Lokasi Node: Jl. Cikutra Barat No. 84, Bandung
                </span>
                <span>OpenStreetMap / Leaflet GIS</span>
              </div>
            </div>

            {/* Live Control & Telemetry Panel for Node SDM-001 (Matching user photo popup) */}
            <div className="lg:col-span-5 bg-slate-900 rounded-2xl border-2 border-amber-500/30 p-6 space-y-5 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-amber-400" />
                    <span className="font-mono font-black text-lg text-white">{selectedNode}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    anomalyTriggered
                      ? 'bg-rose-950 text-rose-300 border border-rose-700 animate-bounce'
                      : isPowerOn 
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' 
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {anomalyTriggered ? 'ANOMALI ANOMALY' : isPowerOn ? 'POWER: ON' : 'POWER: OFF'}
                  </span>
                </div>

                {/* Voltage, Current, Luminance telemetry metrics */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Voltage (Tegangan)</span>
                    <span className="text-lg font-bold text-white">{voltage} V</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Current (Arus)</span>
                    <span className="text-lg font-bold text-cyan-400">{currentVal} A</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Luminance (Sensor LDR)</span>
                    <span className="text-lg font-bold text-amber-400">{luminance} lux</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Dimming Level</span>
                    <span className="text-lg font-bold text-emerald-400">{dimmingLevel}%</span>
                  </div>
                </div>

                {/* Interactive Dimming Slider */}
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 font-bold">Level Redup (Dimming):</span>
                    <span className="text-amber-400 font-bold">{dimmingLevel}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={dimmingLevel}
                    onChange={(e) => setDimmingLevel(Number(e.target.value))}
                    disabled={!isPowerOn || anomalyTriggered}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 disabled:opacity-40"
                  />
                </div>

                {/* CCT Spectrum Temperature Control */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 font-bold">Warna Cahaya CCT:</span>
                    <span className="text-cyan-400 font-bold">{cctKelvin}K ({cctKelvin < 3500 ? 'Warm' : cctKelvin > 5000 ? 'Cool White' : 'Natural Daylight'})</span>
                  </div>
                  <input 
                    type="range" 
                    min="2700" 
                    max="6500" 
                    step="100"
                    value={cctKelvin}
                    onChange={(e) => setCctKelvin(Number(e.target.value))}
                    disabled={!isPowerOn || anomalyTriggered}
                    className="w-full h-2 bg-gradient-to-r from-amber-500 via-yellow-200 to-cyan-300 rounded-lg appearance-none cursor-pointer accent-cyan-400 disabled:opacity-40"
                  />
                </div>
              </div>

              {/* Power Control Toggle Buttons */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  onClick={() => setIsPowerOn(prev => !prev)}
                  disabled={anomalyTriggered}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isPowerOn 
                      ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <Power className="w-4 h-4" />
                  <span>{isPowerOn ? 'Matikan Lampu PJU' : 'Nyalakan Lampu PJU'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Anomaly Notification Box */}
          {anomalyTriggered && (
            <div className="p-4 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-3 animate-pulse">
              <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
              <div>
                <strong className="block text-rose-300 font-mono text-sm">PERINGATAN OTOMATIS ANOMALI DITERIMA!</strong>
                <span>Node SDM-001 mengalami penurunan arus drastis. Tiket perbaikan teknisi lapangan otomatis dibuat & notifikasi dikirim ke smartphone pengelola PJU.</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Discussion & Comments Section */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-amber-500" />
            Diskusi Riset LUMINET ({comments.length})
          </h3>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Tinggalkan Pertanyaan atau Komentar Riset PJU
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
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <input 
              type="email" 
              placeholder="Alamat Email (opsional)" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <textarea
            rows={3}
            placeholder="Tuliskan apresiasi atau pertanyaan teknis mengenai sistem penerangan jalan umum cerdas LUMINET..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          ></textarea>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Komentar</span>
          </button>
        </form>

        {/* List of comments */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-xs text-slate-400 italic">Belum ada komentar. Jadilah yang pertama berdiskusi mengenai LUMINET!</p>
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

      {/* Image Zoom Modal */}
      {modalImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl border border-white/20 bg-slate-950 p-2">
            <button
              onClick={() => setModalImage(null)}
              className="absolute top-4 right-4 p-3 rounded-full bg-slate-950/80 text-white hover:bg-rose-600 transition-all z-10 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={modalImage} alt="Expanded View" className="w-full h-full object-contain max-h-[85vh]" />
          </div>
        </div>
      )}

    </div>
  );
}
