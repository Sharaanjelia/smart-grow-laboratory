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
  Sliders, 
  Thermometer, 
  CheckCircle2, 
  Sparkles,
  RefreshCw,
  Layers,
  Fish
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
      caption: 'Bird’s Eye Top View showing biofloc brown water circulation, central vortex aerator mixer, and real-time multi-probe sensor array.',
      title: 'Top-Down Circulation & Aerator View'
    },
    {
      url: '/images/flocify/flocify-perspective-tank.png',
      caption: 'Perspective View showcasing Flocify smart sensing module, automated feeding hoppers, and external sludge drain bypass.',
      title: 'Perspective Tank & Automated Dosing'
    }
  ];

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Live Telemetry & Deep Learning AI States
  const [doValue, setDoValue] = useState<number>(6.8);
  const [ammoniaValue, setAmmoniaValue] = useState<number>(0.08);
  const [tempValue, setTempValue] = useState<number>(28.5);
  const [phValue, setPhValue] = useState<number>(7.4);
  const [flocDensity, setFlocDensity] = useState<number>(15); // mL/L
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
      
      {/* Top Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <button 
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-sm hover:shadow hover:border-indigo-500 cursor-pointer self-start"
        >
          <ChevronLeft className="h-4 w-4 text-indigo-600 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Hub Utama</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 text-xs font-extrabold border border-indigo-200/50">
            <Brain className="w-3.5 h-3.5 text-indigo-600" />
            Deep Learning AI Analytics
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 text-xs font-extrabold border border-blue-200/50">
            <Droplet className="w-3.5 h-3.5 text-blue-600" />
            Biofloc Ammonia Telemetry
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-extrabold border border-emerald-200/50">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
            Automated Probiotic Dosing
          </span>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-indigo-950 p-2 border border-indigo-800 shadow-md shrink-0 flex items-center justify-center">
              <img src="/images/flocify/flocify-biofloc-tank-iso.png" alt="FLOCIFY Tank" className="h-full w-full object-contain" />
            </div>
            <div>
              <span className="font-mono text-xs font-extrabold tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                BIOFLOC AQUACULTURE AI // FLOCIFY
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none mt-1">
                FLOCIFY
              </h1>
            </div>
          </div>
          
          <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
            IoT & Deep Learning-Based Solution for Biofloc Fish Farming Optimization
          </p>
          
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
            Flocify is an innovative Internet of Things (IoT) and Deep Learning-based solution designed to optimize fish farming in biofloc systems. The platform integrates smart sensing technologies, real-time monitoring, artificial intelligence-driven analytics, and automated control mechanisms to maintain sustainable aquaculture environments. Through continuous monitoring of critical water quality parameters, including temperature, pH, dissolved oxygen (DO), ammonia concentration, and other relevant environmental indicators, Flocify enables the acquisition of real-time data to support adaptive aquaculture management. The integration of Deep Learning algorithms facilitates pattern recognition, anomaly detection, and predictive analysis of environmental conditions, thereby enabling early identification of potential risks and supporting evidence-based decision-making. Furthermore, the system can provide automated recommendations and control mechanisms to maintain optimal culture conditions, improve production performance, and enhance the sustainability of biofloc-based fish farming operations.
          </p>
        </div>

        {/* System Specs Highlight Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-indigo-950 via-slate-950 to-blue-950 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden border border-indigo-500/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
                FLOCIFY Biofloc Specs
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-400/30">
                AI Active
              </span>
            </div>

            <div className="space-y-3 pt-2 text-xs font-sans">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Model AI:</span>
                <span className="font-mono font-bold text-indigo-300">ResNet / LSTM Deep Learning</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Sensor Utama:</span>
                <span className="font-mono font-bold text-cyan-300">DO, pH, Temp, NH3/NH4+, Floc</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Otomatisasi:</span>
                <span className="font-mono font-bold text-emerald-400">Molase & Probiotic Dosing</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Manfaat Utama:</span>
                <span className="font-mono font-bold text-amber-300">Turunkan Mortalitas Ikan</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tipe Kolam:</span>
                <span className="font-mono font-bold text-white">Biofloc Round Tank Modular</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-200 leading-relaxed font-sans">
              <strong>Efisiensi Pakan FCR:</strong> Deep Learning Flocify mengoptimalkan konsumsi biofloc bakteri sehingga menekan biaya pakan pelet hingga 30%.
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive 3D Model Photo Gallery */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            Galeri 3D Render Model & Arsitektur Tank FLOCIFY
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
            className="w-full h-full object-contain p-6 bg-slate-950 transition-transform duration-700 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>

          {/* Zoom Modal Trigger */}
          <button
            onClick={() => setModalImage(galleryImages[activeImageIndex].url)}
            className="absolute top-4 right-4 p-3 rounded-full bg-slate-950/70 text-white backdrop-blur-md hover:bg-indigo-600 transition-all border border-white/20 cursor-pointer"
            title="Perbesar Foto Model"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          {/* Next / Previous Controls */}
          <button
            onClick={() => setActiveImageIndex(prev => (prev === 0 ? galleryImages.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 text-white backdrop-blur-md hover:bg-indigo-600 transition-all border border-white/20 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => setActiveImageIndex(prev => (prev === galleryImages.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-950/70 text-white backdrop-blur-md hover:bg-indigo-600 transition-all border border-white/20 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bottom Caption overlay */}
          <div className="absolute bottom-6 left-6 right-6 bg-slate-950/85 backdrop-blur-md border border-white/10 p-5 rounded-2xl text-white space-y-1">
            <h4 className="font-display text-lg font-bold text-indigo-400">
              {galleryImages[activeImageIndex].title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {galleryImages[activeImageIndex].caption}
            </p>
          </div>
        </div>

        {/* Thumbnail Selector Grid */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-video rounded-2xl overflow-hidden border-2 bg-slate-950 p-2 transition-all cursor-pointer ${
                activeImageIndex === idx 
                  ? 'border-indigo-500 ring-4 ring-indigo-500/20 scale-105' 
                  : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.url} alt={img.title} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Live Water Quality Telemetry & Deep Learning AI Analytics */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-6 rounded bg-indigo-500"></span>
              <span className="font-mono text-xs font-bold text-indigo-500 uppercase tracking-widest">
                DEEP LEARNING AI TELEMETRY & PATTERN RECOGNITION
              </span>
            </div>
            <h2 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white mt-1">
              Monitoring Kualitas Air Biofloc & Prediksi Risiko AI
            </h2>
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

            {/* 4 Primary Water Quality Meters */}
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

            {/* Actuator Status Summary */}
            <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
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
                Algoritma Deep Learning Flocify menganalisis tren perubahan kualitas air secara kontinu untuk memprediksi risiko penumpukan amonia sebelum berpotensi membahayakan benih ikan.
              </p>

              {/* Status Box */}
              {aiSpikeRisk ? (
                <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold">
                    <AlertTriangle className="w-4 h-4 animate-bounce" />
                    <span>PREDIKSI RISIKO: Lonjakan Amonia Terdeteksi!</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Sistem otomatis mengaktifkan penambahan molase karbon (C:N ratio tuning) & menyalakan aerator sekunder untuk mencegah mortalitas ikan.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>STATUS OPTIMAL: Ekosistem Biofloc Sehat</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Kepadatan bakteri heterotrofik stabil. Konversi limbah pakan menjadi biofloc protein berjalan sempurna.
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
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-900 dark:text-indigo-200 text-xs leading-relaxed font-sans">
              <strong>Solusi Pembudidaya:</strong> FLOCIFY dirancang untuk memperkuat daya saing pembudidaya ikan skala kecil-menengah melalui digitalisasi tambak biofloc modern.
            </div>
          </div>

        </div>
      </div>

      {/* Discussion & Comments Section */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-600" />
            Diskusi Riset FLOCIFY ({comments.length})
          </h3>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Tinggalkan Pertanyaan atau Komentar Riset Biofloc AI
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
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input 
              type="email" 
              placeholder="Alamat Email (opsional)" 
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <textarea
            rows={3}
            placeholder="Tuliskan apresiasi atau pertanyaan teknis mengenai teknologi biofloc Deep Learning FLOCIFY..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Kirim Komentar</span>
          </button>
        </form>

        {/* List of comments */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-xs text-slate-400 italic">Belum ada komentar. Jadilah yang pertama berdiskusi mengenai FLOCIFY!</p>
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
