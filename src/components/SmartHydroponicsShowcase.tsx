import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  Clock, 
  MessageSquare, 
  Send, 
  Sprout, 
  Sun, 
  Droplet, 
  Layers, 
  TrendingUp, 
  Zap, 
  Thermometer, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Gauge, 
  Lightbulb,
  ChevronRight,
  Droplets,
  Atom
} from 'lucide-react';
import { NewsItem, Comment } from '../types';

interface SmartHydroponicsShowcaseProps {
  item: NewsItem;
  comments: Comment[];
  onBack: () => void;
  onAddComment: (name: string, email: string, content: string) => void;
}

export default function SmartHydroponicsShowcase({ 
  item, 
  comments, 
  onBack, 
  onAddComment 
}: SmartHydroponicsShowcaseProps) {
  
  // Interactive IoT state
  const [ledSpectrum, setLedSpectrum] = useState<number>(660); // 400nm to 720nm
  const [nutrientRate, setNutrientRate] = useState<number>(1.8); // 0.8 to 2.8 EC
  const [waterLevel, setWaterLevel] = useState<number>(85); // %
  const [aiStatus, setAiStatus] = useState<'Active' | 'Optimizing' | 'Calibrating'>('Active');
  
  // Comment states
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Auto trigger status fluctuation for realism
  useEffect(() => {
    const timer = setInterval(() => {
      // Small randomized fluctuations for visual feedback
      setWaterLevel(prev => {
        const diff = (Math.random() - 0.5) * 0.4;
        const next = prev + diff;
        return parseFloat(Math.min(100, Math.max(0, next)).toFixed(1));
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Compute interactive formulas
  // Photosynthesis efficiency peaks at 450nm (blue) and 660nm (red)
  const calculatePhotosynthesisEff = () => {
    const distToRed = Math.abs(ledSpectrum - 660);
    const distToBlue = Math.abs(ledSpectrum - 450);
    const minCloseness = Math.min(distToRed, distToBlue);
    const baseEff = Math.max(30, 100 - (minCloseness * 0.55));
    const ecMultiplier = nutrientRate >= 1.4 && nutrientRate <= 2.2 ? 1.2 : 0.75;
    return Math.min(135, Math.round(baseEff * ecMultiplier));
  };

  const currentGrowthEff = calculatePhotosynthesisEff();
  
  // pH scales slightly with nutrient concentration to simulate fluid dynamics
  const currentPh = parseFloat((6.5 - (nutrientRate - 1.8) * 0.4 + (Math.sin(ledSpectrum / 100) * 0.1)).toFixed(2));
  const currentTemp = parseFloat((23.8 + (ledSpectrum > 600 ? (ledSpectrum - 600) * 0.015 : 0) + (nutrientRate * 0.1)).toFixed(1));
  const currentHumidity = parseFloat((64 + (currentTemp - 24) * 1.5).toFixed(1));

  // Determine LED wave colors dynamically for high-fidelity rendering
  const getSpectrumColor = () => {
    if (ledSpectrum < 490) return 'from-blue-600 via-cyan-500 to-emerald-400';
    if (ledSpectrum < 570) return 'from-emerald-500 via-teal-400 to-lime-400';
    if (ledSpectrum < 610) return 'from-lime-500 via-yellow-500 to-amber-500';
    return 'from-rose-500 via-red-500 to-orange-400';
  };

  const getSpectrumGlow = () => {
    if (ledSpectrum < 490) return 'shadow-blue-500/30 text-blue-400';
    if (ledSpectrum < 570) return 'shadow-teal-500/30 text-teal-400';
    if (ledSpectrum < 610) return 'shadow-amber-500/30 text-amber-400';
    return 'shadow-rose-500/30 text-rose-400';
  };

  // Comments submit
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim() || !textInput.trim()) return;

    onAddComment(nameInput.trim(), emailInput.trim(), textInput.trim());
    setNameInput('');
    setEmailInput('');
    setTextInput('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3500);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] pb-24 text-[#0F172A] relative overflow-hidden" id="hydroponics-showcase-container">
      
      {/* Premium Background Blurs, Grids & Curved Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-emerald-400/10 blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-blue-400/10 blur-[160px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-cyan-400/8 blur-[120px] pointer-events-none" />

      {/* Decorative Curving Circuit Line Overlays (SVGs) */}
      <svg className="absolute top-10 right-0 w-[40%] h-[300px] opacity-25 pointer-events-none hidden lg:block" fill="none">
        <path d="M 100 0 C 200 150, 50 100, 400 200" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6, 6" />
        <path d="M 0 50 C 150 120, 180 30, 350 180" stroke="#2E86FF" strokeWidth="1" />
        <circle cx="350" cy="180" r="4" fill="#2E86FF" className="animate-ping" />
        <circle cx="400" cy="200" r="4" fill="#10B981" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10">
        
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <button 
            onClick={onBack}
            className="group inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:shadow-md transition-all duration-300 cursor-pointer"
            id="back-to-news-btn"
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Berita & Event</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400 uppercase">Research</span>
            <span className="text-slate-300">/</span>
            <span className="text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg uppercase tracking-wider">
              Smart Hydroponic Center
            </span>
          </div>
        </div>

        {/* ================= HERO TWO-COLUMN SHOWCASE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* LEFT COLUMN: Premium Copywriting & Metadata */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Category Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-emerald-500/10 border border-emerald-200/50 px-4 py-1.5 text-xs font-semibold tracking-wider text-emerald-700 uppercase flex items-center gap-1.5 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse"></span>
                {item.category}
              </span>
              <span className="rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-700 uppercase">
                IoT Automation
              </span>
              <span className="rounded-full bg-slate-100 border border-slate-200 px-4 py-1.5 text-xs font-semibold tracking-wider text-slate-600 uppercase">
                Smart Grow Lab
              </span>
            </div>

            {/* Large Hero Title */}
            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-[1.08] tracking-tight">
                Smart Hydroponic:<br />
                <span className="bg-gradient-to-r from-[#22C55E] via-[#10B981] to-[#2E86FF] bg-clip-text text-transparent">
                  Modular Automated<br />Grow System
                </span>
              </h1>
              
              {/* Micro Metadata */}
              <div className="flex items-center gap-6 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span>{item.readTime} Bacaan</span>
                </div>
                <div className="h-4 w-px bg-slate-300"></div>
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  <span>{comments.length} Diskusi</span>
                </div>
              </div>
            </div>

            {/* Product Description with comfortable whitespace */}
            <div className="space-y-6 text-slate-600 font-sans text-base sm:text-lg leading-relaxed max-w-xl">
              <p className="font-medium text-[#0F172A]">
                Modular hydroponic system with <span className="text-emerald-600 font-semibold border-b-2 border-emerald-200 pb-0.5">customized planting racks</span>. Perfectly calibrated for high-density indoor space farming, integrated with IoT sensing nodes for autonomous macro-nutrient delivery and optimal spectral photon support.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed">
                By modeling natural solar wavelengths with solid-state LEDs and tracking electro-conductivity (EC) indexes continuously, the system achieves unprecedented precision. The automated nutrient delivery eliminates manual calibration error, letting crops grow up to 30% faster inside tight vertical urban layouts.
              </p>
            </div>

            {/* Dynamic Interactive Call-to-Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="#premium-comment-form"
                className="w-full sm:w-auto text-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-8 py-4 text-sm font-bold tracking-wider uppercase text-white shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Explore Smart Hydroponics</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a 
                href="#features-grid-section"
                className="w-full sm:w-auto text-center rounded-full border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 px-8 py-4 text-sm font-bold tracking-wider uppercase text-slate-700 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Lihat Fitur Spesifikasi</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive Dark Futuristic IoT Dashboard Card */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            {/* Glowing blur orb behind the dashboard */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-blue-500/10 rounded-[30px] blur-2xl transform scale-105 pointer-events-none" />

            {/* Floating Circuit Connection Node Decoration */}
            <div className="absolute left-[-20px] top-12 hidden sm:flex flex-col gap-2 opacity-55 animate-bounce" style={{ animationDuration: '6s' }}>
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <div className="h-16 w-[2px] bg-gradient-to-b from-emerald-500 to-transparent ml-[3px]"></div>
            </div>

            <div className="absolute right-[-20px] bottom-12 hidden sm:flex flex-col gap-2 opacity-55 animate-bounce" style={{ animationDuration: '8s' }}>
              <div className="h-16 w-[2px] bg-gradient-to-t from-blue-500 to-transparent mr-[3px] self-end"></div>
              <div className="h-2 w-2 rounded-full bg-blue-500 self-end"></div>
            </div>

            {/* Main Premium Dark Dashboard Card */}
            <div className="w-full max-w-[490px] rounded-[24px] bg-[#0F172A] border border-slate-800 p-6 sm:p-7 shadow-2xl relative overflow-hidden text-slate-200 select-none transform hover:scale-[1.01] transition-transform duration-500">
              
              {/* Glass subtle gradient reflection overlay */}
              <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Dashboard Header Bar */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-800/80 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#22C55E]">
                    <Atom className="h-4.5 w-4.5 animate-spin-slow" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono tracking-wider font-extrabold text-emerald-400">GROW_SPECTRA_CONTROLLER</span>
                    <span className="block text-[8px] font-mono text-slate-500 uppercase">SYS VER 4.12 // HYDROPONIK</span>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-[9px] font-mono font-bold uppercase text-[#22C55E]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E] animate-ping"></span>
                    🟢 Active
                  </span>
                  <span className="text-[9px] font-mono text-slate-500 hidden sm:inline uppercase">STATUS: LIVE</span>
                </div>
              </div>

              {/* Main Visualization Visual Block: Calibrated LED Chamber */}
              <div className="relative rounded-2xl border border-slate-800/80 bg-slate-950/70 p-5 overflow-hidden flex flex-col items-center justify-center min-h-[190px] mb-6">
                
                {/* Cyber Matrix Dot grid background inside chamber */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                
                {/* Real-time spectrum dynamic neon glow */}
                <div 
                  className={`absolute w-36 h-36 rounded-full blur-[45px] transition-all duration-700 opacity-30 pointer-events-none`}
                  style={{
                    backgroundColor: ledSpectrum < 490 
                      ? '#3B82F6' // Blue
                      : ledSpectrum < 570 
                        ? '#14B8A6' // Teal
                        : ledSpectrum < 610 
                          ? '#EAB308' // Yellow
                          : '#EF4444' // Red
                  }}
                />

                {/* Virtual Hanging LED Lamp */}
                <div className="relative z-10 text-center space-y-4 w-full flex flex-col items-center">
                  <div className="flex flex-col items-center relative">
                    {/* Hanging Cord */}
                    <div className="w-[1.5px] h-4 bg-slate-700" />
                    {/* Futuristic Lamp Cap */}
                    <div className="h-6 w-16 rounded-t-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[8px] font-bold text-slate-300 tracking-widest uppercase shadow-md">
                      LAMPU LED
                    </div>
                    {/* Radiant glowing halo under lamp cap */}
                    <div 
                      className={`h-2.5 w-16 rounded-b bg-gradient-to-r ${getSpectrumColor()} transition-all duration-500 ${getSpectrumGlow()} shadow-lg`}
                    />
                  </div>

                  {/* Gorgeous Plant Icon and container base */}
                  <div className="relative flex flex-col items-center justify-center mt-2 group/plant cursor-pointer">
                    <div className="text-4xl filter drop-shadow-[0_0_12px_rgba(34,197,94,0.3)] animate-bounce duration-1000" style={{ animationDuration: '3.5s' }}>
                      🪴
                    </div>
                    {/* Digital wave circle indicator under plant */}
                    <div className="w-10 h-[3px] bg-emerald-500/20 rounded-full mt-1.5 animate-pulse" />
                  </div>

                  {/* Real-time wavelength label */}
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-1.5 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-800">
                    <span className="text-slate-500">Panjang Gelombang:</span> 
                    <span className="text-white font-extrabold">{ledSpectrum} nm</span>
                  </div>
                </div>

                {/* Interactive Rainbow spectrum guide bar inside chamber */}
                <div className="absolute bottom-4 left-5 right-5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-teal-400 via-lime-400 via-amber-400 to-rose-500 border border-black/30 shadow-inner" />
              </div>

              {/* Dynamic Readouts: Growth rate and efficiency */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-3.5">
                  <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-wider">Growth Efficiency</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-extrabold text-[#22C55E] tracking-tight">+{currentGrowthEff}%</span>
                    <span className="text-[9px] text-emerald-500/80 font-mono">TUMBUH</span>
                  </div>
                  <p className="text-[9px] text-slate-400 font-sans mt-1">Calibrated photosynthetic rate</p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-3.5">
                  <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-wider">AI System Status</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-sm font-bold text-white tracking-wide uppercase font-mono">Optimal</span>
                  </div>
                  <p className="text-[9px] text-slate-400 font-sans mt-2.5">Macro dosing algorithm</p>
                </div>

              </div>

              {/* Real-time Sliders Panel - Highly calibrated */}
              <div className="space-y-4 pt-1 pb-2">
                
                {/* 1. Led Spectrum Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400 font-semibold flex items-center gap-1">
                      <Sun className="h-3.5 w-3.5 text-amber-500" />
                      Spektrum LED (Wavelength)
                    </span>
                    <span className="text-white font-bold">{ledSpectrum}nm</span>
                  </div>
                  <input 
                    type="range" 
                    min="400" 
                    max="720" 
                    value={ledSpectrum} 
                    onChange={(e) => setLedSpectrum(parseInt(e.target.value))}
                    className="w-full accent-[#22C55E] h-1.5 bg-slate-800 rounded-full cursor-pointer hover:bg-slate-750 transition-all"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-500">
                    <span>400nm (Blue)</span>
                    <span>560nm (Green)</span>
                    <span>720nm (Far-Red)</span>
                  </div>
                </div>

                {/* 2. Nutrient Rate Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400 font-semibold flex items-center gap-1">
                      <Droplet className="h-3.5 w-3.5 text-blue-400" />
                      Nutrisi Hidroponik (EC)
                    </span>
                    <span className="text-white font-bold">{nutrientRate} mS/cm</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.8" 
                    max="2.8" 
                    step="0.1"
                    value={nutrientRate} 
                    onChange={(e) => setNutrientRate(parseFloat(e.target.value))}
                    className="w-full accent-[#2E86FF] h-1.5 bg-slate-800 rounded-full cursor-pointer hover:bg-slate-750 transition-all"
                  />
                  <div className="flex justify-between text-[8px] font-mono text-slate-500">
                    <span>0.8 Low EC</span>
                    <span>1.8 Perfect</span>
                    <span>2.8 High EC</span>
                  </div>
                </div>

              </div>

              {/* Live Multi-Metrics Matrix Section */}
              <div className="grid grid-cols-3 gap-2.5 border-t border-slate-800/80 pt-5 mt-4 text-center">
                
                <div className="p-2 bg-slate-900/30 rounded-lg border border-slate-850">
                  <span className="block text-[8px] font-mono text-slate-500 uppercase">pH Level</span>
                  <span className="text-xs font-bold font-mono text-teal-400">{currentPh} pH</span>
                </div>

                <div className="p-2 bg-slate-900/30 rounded-lg border border-slate-850">
                  <span className="block text-[8px] font-mono text-slate-500 uppercase">Temperature</span>
                  <span className="text-xs font-bold font-mono text-amber-500">{currentTemp}°C</span>
                </div>

                <div className="p-2 bg-slate-900/30 rounded-lg border border-slate-850">
                  <span className="block text-[8px] font-mono text-slate-500 uppercase">Humidity</span>
                  <span className="text-xs font-bold font-mono text-[#2E86FF]">{currentHumidity}%</span>
                </div>

              </div>

              {/* Bottom watermark / annotation */}
              <div className="text-[9px] font-mono text-slate-500 italic text-center pt-4">
                *Tarik slider untuk mengkalibrasi sensor lingkungan lab secara real-time.
              </div>

            </div>

          </div>

        </div>

        {/* ================= FEATURE CARDS SECTION ================= */}
        <section className="space-y-12 mb-24" id="features-grid-section">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-mono text-xs font-extrabold tracking-widest text-emerald-600 uppercase">TECHNOLOGY ARCHITECTURE</span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Modular Automated Ecosystem
            </h2>
            <p className="text-sm text-slate-500 font-sans max-w-xl mx-auto leading-relaxed">
              Replacing conventional agriculture with high-fidelity, sensor-rich modules engineered for maximum vertical space productivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1 */}
            <div className="group bg-white hover:bg-slate-50/50 border border-[#E5E7EB] rounded-[20px] p-6 hover:shadow-xl hover:border-emerald-500/20 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="h-12 w-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300 shadow-sm shadow-emerald-500/5">
                <Sun className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-2">Spectra Optimized Lighting</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                Tailored pulse-width modulated purple/blue bands targeting chlorophyll photosynthetic peaks to accelerate growth cycles up to 30%.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white hover:bg-slate-50/50 border border-[#E5E7EB] rounded-[20px] p-6 hover:shadow-xl hover:border-blue-500/20 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50/50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm shadow-blue-500/5">
                <Droplet className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-2">Precision Nutrient Dosing</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                Continuous EC & pH tracking with automatic peristaltic micro-pump injections to maintain optimal mineral concentrations without chemical shock.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white hover:bg-slate-50/50 border border-[#E5E7EB] rounded-[20px] p-6 hover:shadow-xl hover:border-teal-500/20 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-teal-50/50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="h-12 w-12 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center mb-5 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-2">Modular Rack Design</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                Highly stackable and customizable geometric racking frames designed for high density vertical configurations inside restricted laboratory rooms.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group bg-white hover:bg-slate-50/50 border border-[#E5E7EB] rounded-[20px] p-6 hover:shadow-xl hover:border-[#10B981]/20 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50/30 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="h-12 w-12 rounded-xl bg-emerald-50 border border-emerald-100 text-[#10B981] flex items-center justify-center mb-5 group-hover:bg-[#10B981] group-hover:text-white transition-colors duration-300 shadow-sm">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-2">High Productivity</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                Maximizes daily harvest output and minimizes resource waste by recycling 95% of reservoir water inside a closed ecological loop.
              </p>
            </div>

            {/* Card 5 */}
            <div className="group bg-white hover:bg-slate-50/50 border border-[#E5E7EB] rounded-[20px] p-6 hover:shadow-xl hover:border-amber-500/20 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-amber-50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="h-12 w-12 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center mb-5 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-2">Smart Automation</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                Fully automated lighting schedules, micro-climate fans, and irrigation flushes powered by localized edge controllers.
              </p>
            </div>

            {/* Card 6 */}
            <div className="group bg-white hover:bg-slate-50/50 border border-[#E5E7EB] rounded-[20px] p-6 hover:shadow-xl hover:border-cyan-500/20 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="h-12 w-12 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center mb-5 group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                <Sprout className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-slate-900 mb-2">Compact Vertical Farming</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
                Optimizes standard indoor spaces, making hyper-local fresh crop yield achievable inside residential, urban, or educational contexts.
              </p>
            </div>

          </div>

        </section>

        {/* ================= MODERN PREMIUM CTA SECTION ================= */}
        <section className="mb-24 relative overflow-hidden rounded-[24px] bg-[#0F172A] border border-slate-800 text-white p-8 sm:p-12 lg:p-16 text-center shadow-2xl">
          
          {/* Subtle neon gradients inside CTA block */}
          <div className="absolute top-[-40%] left-[-10%] w-[350px] h-[350px] rounded-full bg-emerald-500/10 blur-[90px] pointer-events-none" />
          <div className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-[10px] font-mono font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
              FUTURE OF AGRICULTURE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Engineering the Future <br className="hidden sm:inline" />
              of Sustainable Agriculture
            </h2>
            <p className="text-sm text-slate-400 font-sans max-w-lg mx-auto leading-relaxed">
              Bergabunglah dengan program riset Smart Grow Lab untuk mengimplementasikan sensor otomatisasi hidroponik di komunitas lokal Anda.
            </p>
            <div className="pt-4">
              <a 
                href="#premium-comment-form"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>Explore Smart Hydroponics</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>

        </section>

        {/* ================= COMMENTS & ACADEMIC DISCUSSION SECTION ================= */}
        <section className="max-w-3xl mx-auto space-y-8" id="discussion-comments-section">
          
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <MessageSquare className="h-6 w-6 text-[#22C55E]" />
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
              Academic Discussion ({comments.length})
            </h3>
          </div>

          {/* Comment list */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-300 rounded-2xl bg-white shadow-xs">
                <MessageSquare className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                  Belum ada tanggapan. Berikan opini riset Anda pertama kali!
                </p>
              </div>
            ) : (
              comments.map((comment) => (
                <div 
                  key={comment.id}
                  className="p-6 rounded-2xl bg-white border border-[#E5E7EB] hover:border-emerald-500/20 transition-all duration-300 space-y-3 group shadow-xs"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-extrabold text-sm uppercase">
                        {comment.name.substring(0, 2)}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                          {comment.name}
                        </h5>
                        <span className="text-[10px] text-slate-400 font-sans">
                          {comment.timestamp}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#22C55E] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
                      Verified Academic
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans pl-12">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E5E7EB] space-y-6 relative overflow-hidden shadow-md shadow-slate-100/30">
            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <h4 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-600" />
              <span>Tulis Tanggapan Akademis Anda</span>
            </h4>

            {commentSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium animate-fade-in">
                ✓ Komentar berhasil ditambahkan! Tanggapan Anda membantu memajukan diskursus sains pertanian digital.
              </div>
            )}

            <form onSubmit={handleSubmitComment} className="space-y-4" id="premium-comment-form">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: Nama Lengkap Anda"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="bg-slate-50 border border-[#E5E7EB] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100/40 transition-all rounded-xl px-4 py-3.5 font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">Email Kampus / Umum</label>
                  <input 
                    type="email" 
                    required
                    placeholder="Contoh: email@student.edu"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="bg-slate-50 border border-[#E5E7EB] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100/40 transition-all rounded-xl px-4 py-3.5 font-medium"
                  />
                </div>

              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">Catatan Tanggapan Riset</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Tulis opini, feedback teknis, atau pertanyaan akademis Anda mengenai inovasi projek ini..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="bg-slate-50 border border-[#E5E7EB] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100/40 transition-all rounded-xl p-4 resize-none leading-relaxed font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-emerald-600/10"
                >
                  <span>Kirim Komentar</span>
                  <Send className="h-4 w-4" />
                </button>
              </div>

            </form>
          </div>

        </section>

      </div>
    </div>
  );
}
