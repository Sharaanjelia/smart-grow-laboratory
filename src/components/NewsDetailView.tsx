import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Send, 
  Award, 
  Zap, 
  Network, 
  Cpu, 
  Settings, 
  Activity, 
  Sun, 
  Droplet, 
  CheckCircle
} from 'lucide-react';
import { NewsItem, Comment } from '../types';
import SmartHydroponicsShowcase from './SmartHydroponicsShowcase';
import LuminetShowcase from './LuminetShowcase';

interface NewsDetailViewProps {
  item: NewsItem;
  comments: Comment[];
  onBack: () => void;
  onAddComment: (name: string, email: string, content: string) => void;
}

export default function NewsDetailView({ item, comments, onBack, onAddComment }: NewsDetailViewProps) {
  // If it is the smart hydroponics article, render our high-fidelity premium showcase!
  if (item.id === 'smart-hydroponics') {
    return (
      <SmartHydroponicsShowcase 
        item={item} 
        comments={comments} 
        onBack={onBack} 
        onAddComment={onAddComment} 
      />
    );
  }

  // If it is the luminet street lighting article, render our premium immersive showcase!
  if (item.id === 'luminet-btp') {
    return (
      <LuminetShowcase 
        item={item} 
        comments={comments} 
        onBack={onBack} 
        onAddComment={onAddComment} 
      />
    );
  }

  // State for active feature tab
  const [activeTab, setActiveTab] = useState<number>(0);

  // Form State
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // --- 1. LUMINET SIMULATOR STATE ---
  const [luminetNodes, setLuminetNodes] = useState([
    { id: 1, name: 'Main Coordinator', x: 120, y: 70, brightness: 100, role: 'Coordinator' },
    { id: 2, name: 'PJU-North Node', x: 280, y: 50, brightness: 100, role: 'Router' },
    { id: 3, name: 'PJU-West Node', x: 90, y: 160, brightness: 100, role: 'Router' },
    { id: 4, name: 'PJU-South Node', x: 220, y: 180, brightness: 100, role: 'Router' },
    { id: 5, name: 'PJU-East Node', x: 310, y: 150, brightness: 100, role: 'End Device' },
  ]);
  const [selectedLuminetNode, setSelectedLuminetNode] = useState<number | null>(null);

  // --- 2. SMART HYDROPONICS STATE ---
  const [ledSpectrum, setLedSpectrum] = useState(660); // 660nm is default red grow spectrum
  const [nutrientRate, setNutrientRate] = useState(1.8); // 1.8 mS/cm EC rate

  // --- 3. AQUAPONICS MONITOR STATE ---
  const [feedingFrequency, setFeedingFrequency] = useState(2); // times per day
  const [filterStrength, setFilterStrength] = useState(80); // percentage power

  // Form Submission
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim() || !textInput.trim()) return;

    onAddComment(nameInput.trim(), emailInput.trim(), textInput.trim());
    
    setNameInput('');
    setEmailInput('');
    setTextInput('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  // Compute Simulated Metrics for Luminet
  const avgLuminetBrightness = luminetNodes.reduce((acc, n) => acc + n.brightness, 0) / luminetNodes.length;
  const simulatedLuminetSavings = Math.round(100 - avgLuminetBrightness);

  // Compute Simulated Metrics for Hydroponics
  // Photosynthesis efficiency peaks at 450nm (blue) and 660nm (red)
  const calculatePhotosynthesisEff = () => {
    const distToRed = Math.abs(ledSpectrum - 660);
    const distToBlue = Math.abs(ledSpectrum - 450);
    const minCloseness = Math.min(distToRed, distToBlue);
    const baseEff = Math.max(30, 100 - (minCloseness * 0.6));
    const ecMultiplier = nutrientRate >= 1.4 && nutrientRate <= 2.0 ? 1.15 : 0.85;
    return Math.min(100, Math.round(baseEff * ecMultiplier));
  };
  const hydroponicsGrowthEff = calculatePhotosynthesisEff();

  // Compute Simulated Metrics for Aquaponics
  // Symbiotic balance logic
  const calculateEcologicalStatus = () => {
    const ammoniaLoad = (feedingFrequency * 18) - (filterStrength * 0.45);
    const phBalance = 7.0 - (feedingFrequency * 0.15) + (filterStrength * 0.02);
    const bioClarity = Math.max(5, Math.round(100 - (feedingFrequency * 15) + (filterStrength * 0.3)));
    
    let safetyLevel = 'SANGAT BAIK';
    let alertColor = 'text-emerald-600';
    if (ammoniaLoad > 20 || phBalance < 6.4 || phBalance > 7.6) {
      safetyLevel = 'PERINGATAN';
      alertColor = 'text-amber-600';
    }
    if (ammoniaLoad > 40 || phBalance < 5.8 || phBalance > 8.2) {
      safetyLevel = 'KRITIS';
      alertColor = 'text-rose-600';
    }

    return {
      ammonia: Math.max(0, parseFloat(ammoniaLoad.toFixed(2))),
      ph: parseFloat(phBalance.toFixed(1)),
      clarity: Math.min(100, bioClarity),
      safetyLevel,
      alertColor
    };
  };
  const aquaponicsStatus = calculateEcologicalStatus();

  // Parse Key Highlights/Pillars dynamically from news items for tab content
  const getPillarData = () => {
    if (item.id === 'luminet-btp') {
      return [
        {
          title: 'XBee Mesh Networking',
          subtitle: 'Resilient node-to-node telemetry',
          statValue: '< 50ms',
          statLabel: 'Latency Rate',
          icon: Network,
          desc: 'Luminet utilizes ZigBee-based XBee modules to build a self-healing mesh topology. Streetlight nodes act as active routers, automatically mapping telemetry pathways so that if a node drops, data instantly reroutes.',
          points: ['Auto-discovery of physical paths', 'Low bandwidth optimization', 'Ultra-low node hardware footprints']
        },
        {
          title: 'Intelligent Dimming Engine',
          subtitle: 'Micro-scheduled power conservation',
          statValue: '45%',
          statLabel: 'Energy Saved',
          icon: Cpu,
          desc: 'Each lamp node runs localized logic to scale voltage loads based on vehicular activity, ambient weather thresholds, and clock schedules, moving away from crude binary on/off timers.',
          points: ['Direct-to-controller firmware schedules', 'Ambient twilight lux adaptation', 'Over-the-air firmware dim profiles']
        },
        {
          title: 'Predictive Diagnostics',
          subtitle: 'Pre-emptive municipal alerts',
          statValue: '99.7%',
          statLabel: 'Lighting Uptime',
          icon: Settings,
          desc: 'Current sensors analyze the spectral electrical signatures of the light modules. Incipient faults are compiled and dispatched directly to local field engineers before citizen complaints register.',
          points: ['Shunt current leak diagnosis', 'Active grid voltage surge protection', 'Dynamic hardware health metrics']
        }
      ];
    } else if (item.id === 'smart-hydroponics') {
      return [
        {
          title: 'Spectra LED Automation',
          subtitle: 'Adaptive horticultural wavelengths',
          statValue: '30%',
          statLabel: 'Growth Acceleration',
          icon: Sun,
          desc: 'Crops respond to specific spectrum wavelengths. Smart Hydroponics delivers calibrated photon bursts to mimic solar cycles, accelerating vegetative growth rates up to 30% compared to typical greenhouse filters.',
          points: ['Calibrated red-to-blue ratios', 'Pulse-width modulation heat safety', 'Accelerated root photosynthetic triggers']
        },
        {
          title: 'Peristaltic Dosing Systems',
          subtitle: 'Precision mineral liquid injectors',
          statValue: '1.8 EC',
          statLabel: 'Perfect Balance',
          icon: Droplet,
          desc: 'Dual dosing pump channels inject custom macro-nutrient compositions based on real-time reservoir EC readings, ensuring plants receive correct nourishment without chemical shock.',
          points: ['Real-time electrical conductivity feedback', 'Automated acid/base balance corrections', 'Anti-clog continuous injection firmware']
        },
        {
          title: 'Modular Stackable Trays',
          subtitle: 'Vertical urban space optimization',
          statValue: '3x',
          statLabel: 'Yield Capacity',
          icon: Cpu,
          desc: 'By vertical layering, Smart Hydroponics fits high-density harvest volumes inside tiny urban laboratory boundaries. Shelving panels include integrated water drainage guides.',
          points: ['Space-saving architectural design', 'Integrated plumbing manifolds', 'Uniform light distribution panels']
        }
      ];
    } else {
      // Aquaponics Monitor
      return [
        {
          title: 'Ecosystem Telemetry',
          subtitle: 'Multi-parameter water metrics',
          statValue: '24/7',
          statLabel: 'Active Safety',
          icon: Activity,
          desc: 'Symbiotic balances require rigorous surveillance. The Aquaponik telemetry node monitors water temperature, chemical pH levels, and solid waste turbidity to keep tilapia and crops safe.',
          points: ['Continuous pH level tracking', 'Turbidity and clarity calculations', 'Instant Wi-Fi dashboard sync']
        },
        {
          title: 'Bio-filtration Tracking',
          subtitle: 'Organic nutrient extraction',
          statValue: '<15 NTU',
          statLabel: 'Water Turbidity',
          icon: Settings,
          desc: 'Waste from fish tanks is pumped to mineral extraction beds where organic microbes convert complex ammonia into rich nitrogen fertilizers suitable for plant absorption.',
          points: ['Calibrated bacterial conversion', 'Mechanical filtration health reports', 'Root cell respiration support']
        },
        {
          title: 'Intelligent Warning System',
          subtitle: 'SMS/Email failure avoidance',
          statValue: '< 1s',
          statLabel: 'Alert Latency',
          icon: Zap,
          desc: 'Should water parameters exceed bio-tolerance thresholds, the edge gateway transmits warnings to operators, avoiding mass flora or fauna death.',
          points: ['Automated pump cutoff guards', 'Ecosystem balance anomaly alerts', 'Mobile notifications system']
        }
      ];
    }
  };

  const pillars = getPillarData();

  return (
    <div className="bg-white text-slate-700 min-h-screen relative overflow-hidden" id="news-detail-view-container">
      {/* Decorative background circles */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 pt-12 pb-24 sm:px-6 lg:px-8 relative z-10">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 shadow-sm cursor-pointer mb-12"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Berita & Event</span>
        </button>

        {/* --- DUAL COLUMN HEADER & SIMULATOR --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: Metadata & Article Overview */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Grant / Status Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-wider text-emerald-700 uppercase">
                {item.category} · {item.date}
              </span>
              
              {item.id === 'luminet-btp' && (
                <span className="rounded-full bg-amber-50 border border-amber-200 px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-wider text-amber-800 uppercase flex items-center gap-1.5 shadow-xs">
                  <Award className="h-3.5 w-3.5 text-amber-600" />
                  Bandung Techno Park (BTP) Grant
                </span>
              )}

              <span className="rounded-full bg-teal-50 border border-teal-100 px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-wider text-teal-700 uppercase">
                Smart Grow Lab
              </span>
            </div>

            {/* Title styled with Slate hierarchy */}
            <h1 className="font-outfit text-3xl font-extrabold sm:text-4xl lg:text-5xl leading-[1.15] text-slate-900 tracking-[-0.02em]">
              {item.id === 'luminet-btp' ? (
                <>
                  Luminet: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">XBee-Based Public Street Lighting</span> Management Intelligence System
                </>
              ) : item.id === 'smart-hydroponics' ? (
                <>
                  Smart Hydroponik: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Modular Automated Grow</span> System
                </>
              ) : (
                <>
                  Aquaponik Monitor: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Multi-Sensor Ecological Telemetry</span> Node
                </>
              )}
            </h1>

            {/* Authors & Stats Metrics */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 pb-6 border-b border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                  SG
                </div>
                <div>
                  <span className="block text-slate-800 font-semibold">Smart Grow Lab</span>
                  <span className="block text-[10px] text-slate-400 font-mono uppercase">Research & Development</span>
                </div>
              </div>

              <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-emerald-600" />
                <span>{item.readTime} baca</span>
              </div>

              <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

              <div className="flex items-center gap-1.5">
                <MessageSquare className="h-3.5 w-3.5 text-teal-600" />
                <span>{comments.length} komentar</span>
              </div>
            </div>

            {/* Description Text */}
            <div className="space-y-6 text-slate-600 text-sm sm:text-base leading-relaxed">
              {item.excerpt && <p className="font-semibold text-slate-800 leading-relaxed text-base sm:text-lg">{item.excerpt}</p>}
              
              {item.content.split('\n\n').map((para, i) => {
                const trimmedPara = para.trim();
                if (!trimmedPara) return null;

                // 1. Heading starting with ###
                if (trimmedPara.startsWith('###')) {
                  return (
                    <h3 key={i} className="font-outfit text-xl sm:text-2xl font-bold text-slate-900 pt-6 pb-2 border-b border-slate-100 flex items-center gap-2">
                      <span className="h-4.5 w-1.5 bg-emerald-500 rounded-full"></span>
                      {trimmedPara.replace('###', '').trim()}
                    </h3>
                  );
                }
                
                // 2. List starting with *
                if (trimmedPara.startsWith('*')) {
                  return (
                    <div key={i} className="grid grid-cols-1 gap-3.5 my-6">
                      {trimmedPara.split('\n').map((li, idx) => {
                        const cleanLi = li.replace(/^\*\s*/, '').trim();
                        // Check if it has bold text **Title:** Description
                        const boldMatch = cleanLi.match(/^\*\*(.*?)\*\*(.*)/);
                        if (boldMatch) {
                          const [_, boldPart, normalPart] = boldMatch;
                          return (
                            <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-emerald-50/25 border border-emerald-100/50 hover:bg-emerald-50/50 transition-colors duration-200 shadow-xs">
                              <div className="flex-1">
                                <span className="font-sans font-bold text-emerald-900 text-sm block sm:inline mr-1.5">{boldPart}</span>
                                <span className="text-sm text-slate-600 leading-relaxed font-sans">{normalPart}</span>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/50 border border-slate-100/45">
                            <span className="h-2 w-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                            <span className="text-sm text-slate-600 leading-relaxed font-sans">{cleanLi}</span>
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                // 3. Normal paragraph - parse inline bold **text**
                const parts = [];
                let currentText = trimmedPara;
                let keyIdx = 0;
                while (currentText.includes('**')) {
                  const startIndex = currentText.indexOf('**');
                  const endIndex = currentText.indexOf('**', startIndex + 2);
                  if (endIndex === -1) break;

                  // Add normal text before **
                  if (startIndex > 0) {
                    parts.push(<span key={keyIdx++}>{currentText.substring(0, startIndex)}</span>);
                  }
                  // Add bold text
                  parts.push(
                    <strong key={keyIdx++} className="font-bold text-slate-900">
                      {currentText.substring(startIndex + 2, endIndex)}
                    </strong>
                  );
                  currentText = currentText.substring(endIndex + 2);
                }
                if (currentText) {
                  parts.push(<span key={keyIdx++}>{currentText}</span>);
                }

                return (
                  <p key={i} className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                    {parts}
                  </p>
                );
              })}
            </div>

          </div>

          {/* Right Column: Dynamic Simulation Playground */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="w-full max-w-[450px] aspect-square rounded-3xl bg-white border border-slate-150 p-6 shadow-xl shadow-slate-100/70 relative group overflow-hidden text-slate-700">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

              {/* 1. LUMINET INTERACTIVE MESH SIMULATOR */}
              {item.id === 'luminet-btp' && (
                <div className="h-full flex flex-col justify-between">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      XBEE_MESH_INTELLIGENCE
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 uppercase">ACTIVE SIMULATOR</span>
                  </div>

                  {/* SVG Map of nodes */}
                  <div className="relative flex-1 min-h-[180px] my-4 bg-slate-50/80 rounded-2xl border border-slate-100 overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 380 220">
                      {/* Lines */}
                      <g className="stroke-emerald-600/20 stroke-1.5 stroke-dasharray-[4_4]">
                        <line x1="120" y1="60" x2="260" y2="40" />
                        <line x1="120" y1="60" x2="80" y2="130" />
                        <line x1="120" y1="60" x2="200" y2="150" />
                        <line x1="260" y1="40" x2="200" y2="150" />
                        <line x1="260" y1="40" x2="300" y2="120" />
                        <line x1="80" y1="130" x2="200" y2="150" />
                        <line x1="300" y1="120" x2="200" y2="150" />
                      </g>

                      {/* Transmitting ping loops */}
                      <circle cx="120" cy="60" r="14" className="fill-none stroke-teal-500/35 stroke-[1.5] animate-ping" style={{ animationDuration: '3s' }}></circle>
                      <circle cx="260" cy="40" r="11" className="fill-none stroke-emerald-500/30 stroke-[1] animate-ping" style={{ animationDuration: '4s' }}></circle>

                      {/* Render nodes */}
                      {luminetNodes.map(node => (
                        <g 
                          key={node.id} 
                          className="cursor-pointer group/node"
                          onClick={() => setSelectedLuminetNode(node.id)}
                        >
                          <circle 
                            cx={node.x} 
                            cy={node.y} 
                            r={selectedLuminetNode === node.id ? "15" : "11"} 
                            className={`transition-all duration-300 stroke-[2] ${
                              selectedLuminetNode === node.id 
                                ? 'stroke-amber-500 fill-teal-100/70' 
                                : 'stroke-emerald-500/50 fill-white group-hover/node:stroke-emerald-600 group-hover/node:fill-emerald-50/50'
                            }`}
                          />
                          <circle cx={node.x} cy={node.y} r="4" className={node.role === 'Coordinator' ? 'fill-teal-600' : 'fill-emerald-500'} />
                          <text x={node.x} y={node.y - 15} textAnchor="middle" className="fill-slate-600 text-[9px] font-mono font-medium tracking-wide">
                            {node.name.split(' ')[0]}
                          </text>
                        </g>
                      ))}
                    </svg>

                    {/* Interactive Slider Panel */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white border border-slate-100 rounded-xl p-2.5 text-[10px] shadow-lg shadow-slate-100">
                      {selectedLuminetNode ? (
                        (() => {
                          const n = luminetNodes.find(item => item.id === selectedLuminetNode);
                          if (!n) return null;
                          return (
                            <div className="space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-teal-700">{n.name}</span>
                                <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-1.5 py-0.2 rounded text-[8px] uppercase tracking-wider">{n.role}</span>
                              </div>
                              <div className="flex items-center justify-between gap-4">
                                <span className="text-slate-500">Tingkat Dimming: <strong className="text-slate-800">{n.brightness}%</strong></span>
                                <input 
                                  type="range" 
                                  min="0" 
                                  max="100" 
                                  step="20"
                                  value={n.brightness}
                                  onChange={(e) => {
                                    setLuminetNodes(luminetNodes.map(curr => curr.id === n.id ? { ...curr, brightness: parseInt(e.target.value) } : curr));
                                  }}
                                  className="w-24 accent-emerald-500 h-1 rounded bg-slate-100"
                                />
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="text-slate-500 text-center text-[10px] py-1">
                          💡 <span className="font-semibold text-slate-700">Klik lingkaran node</span> untuk mengubah parameter dimming!
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Savings Readout */}
                  <div className="bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl flex items-center justify-between text-xs font-mono text-emerald-700">
                    <span>⚡ ENERGY GRIDS SAVED:</span>
                    <span className="font-bold text-emerald-900 text-xs bg-emerald-100/50 px-2.5 py-0.5 rounded border border-emerald-200">
                      Hemat {simulatedLuminetSavings}%
                    </span>
                  </div>
                </div>
              )}

              {/* 2. SMART HYDROPONICS LED SPECTRA SIMULATOR */}
              {item.id === 'smart-hydroponics' && (
                <div className="h-full flex flex-col justify-between">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-teal-600 font-bold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
                      GROW_SPECTRA_CONTROLLER
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 uppercase">ACTIVE SIMULATOR</span>
                  </div>

                  {/* Grow Light Bulb Glow Canvas representation */}
                  <div className="relative flex-1 min-h-[180px] my-4 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col items-center justify-center p-4 overflow-hidden">
                    
                    {/* Glowing color based on spectrum wavelength */}
                    <div 
                      className="w-24 h-24 rounded-full blur-[35px] transition-all duration-500 absolute opacity-70"
                      style={{
                        backgroundColor: ledSpectrum < 500 
                          ? 'rgba(6, 182, 212, 0.25)' // Cyan/Blue
                          : ledSpectrum < 600 
                            ? 'rgba(234, 179, 8, 0.2)' // Yellow
                            : 'rgba(239, 68, 68, 0.25)' // Red
                      }}
                    />

                    {/* Virtual Plant Container illustration */}
                    <div className="relative z-10 text-center space-y-3">
                      <div className="h-6 w-16 mx-auto rounded bg-white border border-slate-250 flex items-center justify-center text-[9px] font-bold text-slate-700 tracking-widest uppercase shadow-xs">
                        LAMPU LED
                      </div>
                      
                      <div className="animate-bounce text-2xl" style={{ animationDuration: '3s' }}>
                        🌱
                      </div>

                      <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                        Panjang Gelombang: <span className="text-slate-800 font-bold">{ledSpectrum}nm</span>
                      </div>
                    </div>

                    {/* Wavelength Color spectrum background visual */}
                    <div className="absolute bottom-3 left-4 right-4 h-1.5 rounded-full bg-gradient-to-r from-cyan-500 via-amber-400 to-red-500"></div>
                  </div>

                  {/* Controller variables */}
                  <div className="space-y-3">
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-slate-500 text-[10px]">
                        <span>Spektrum LED: <strong className="text-slate-800">{ledSpectrum}nm</strong></span>
                        <span className="text-amber-600 font-medium">Klorofil: 450nm & 660nm</span>
                      </div>
                      <input 
                        type="range" 
                        min="400" 
                        max="720" 
                        value={ledSpectrum} 
                        onChange={(e) => setLedSpectrum(parseInt(e.target.value))}
                        className="w-full accent-emerald-500 h-1 bg-slate-100 rounded-full"
                      />
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-slate-500 text-[10px]">
                        <span>Nutrisi (EC): <strong className="text-slate-800">{nutrientRate} mS/cm</strong></span>
                        <span>Aman: 1.2 - 2.2</span>
                      </div>
                      <input 
                        type="range" 
                        min="0.8" 
                        max="2.8" 
                        step="0.2"
                        value={nutrientRate} 
                        onChange={(e) => setNutrientRate(parseFloat(e.target.value))}
                        className="w-full accent-teal-500 h-1 bg-slate-100 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Simulated Metrics Readout */}
                  <div className="bg-emerald-50/60 border border-emerald-100 p-2.5 mt-3 rounded-xl flex items-center justify-between text-[11px] font-mono text-emerald-700">
                    <span>🪴 FOTOSINTESIS MODEL:</span>
                    <span className="font-bold text-emerald-800 bg-emerald-100/50 px-2 py-0.5 rounded border border-emerald-200">
                      Tumbuh +{hydroponicsGrowthEff}%
                    </span>
                  </div>
                </div>
              )}

              {/* 3. AQUAPONICS MONITOR TELEMETRY PANEL */}
              {item.id === 'aquaponics-monitor' && (
                <div className="h-full flex flex-col justify-between animate-fade-in">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-lime-600 font-bold flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-lime-500 animate-pulse"></span>
                      ECOLOGICAL_BALANCER
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 uppercase">ACTIVE SIMULATOR</span>
                  </div>

                  {/* Live Telemetry monitor */}
                  <div className="relative flex-1 min-h-[160px] my-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 font-mono text-[10px] text-slate-700 space-y-2">
                    <div className="flex justify-between pb-1.5 border-b border-slate-150 mb-2 text-slate-400">
                      <span>Saluran Sensor</span>
                      <span>Nilai Real-time</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>&gt; pH Air:</span>
                      <span className={aquaponicsStatus.ph >= 6.5 && aquaponicsStatus.ph <= 7.5 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                        {aquaponicsStatus.ph} pH
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>&gt; Kekeruhan Air (Turbidity):</span>
                      <span className="text-slate-800 font-bold">
                        {aquaponicsStatus.clarity} NTU (Bagus)
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>&gt; Kadar Amonia:</span>
                      <span className={aquaponicsStatus.ammonia < 20 ? 'text-emerald-600 font-bold' : aquaponicsStatus.ammonia < 40 ? 'text-amber-600 font-bold' : 'text-rose-600 font-bold'}>
                        {aquaponicsStatus.ammonia} mg/L
                      </span>
                    </div>

                    <div className="flex justify-between pt-1 border-t border-slate-150 mt-2 font-bold">
                      <span>&gt; Status Ekologis:</span>
                      <span className={aquaponicsStatus.alertColor}>
                        {aquaponicsStatus.safetyLevel}
                      </span>
                    </div>

                    {/* Floating water ripples visual representation */}
                    <div className="absolute right-4 bottom-4 flex items-center gap-1 opacity-25">
                      <span className="w-1.5 h-6 bg-teal-500 rounded animate-pulse animate-duration-1000"></span>
                      <span className="w-1.5 h-10 bg-emerald-500 rounded animate-pulse animate-duration-700"></span>
                      <span className="w-1.5 h-4 bg-lime-500 rounded animate-pulse animate-duration-1200"></span>
                    </div>
                  </div>

                  {/* Sliders for aquaponic environment */}
                  <div className="space-y-3">
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-slate-500 text-[10px]">
                        <span>Frekuensi Pakan Ikan: <strong className="text-slate-800">{feedingFrequency} kali/hari</strong></span>
                        <span>Meningkatkan nutrisi organik</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="5" 
                        value={feedingFrequency} 
                        onChange={(e) => setFeedingFrequency(parseInt(e.target.value))}
                        className="w-full accent-emerald-500 h-1 bg-slate-100 rounded-full"
                      />
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between text-slate-500 text-[10px]">
                        <span>Kekuatan Bio-filter: <strong className="text-slate-800">{filterStrength}%</strong></span>
                        <span>Mengurangi amonia toksik</span>
                      </div>
                      <input 
                        type="range" 
                        min="20" 
                        max="100" 
                        step="10"
                        value={filterStrength} 
                        onChange={(e) => setFilterStrength(parseInt(e.target.value))}
                        className="w-full accent-teal-500 h-1 bg-slate-100 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="text-[9px] text-slate-400 italic text-center pt-2">
                    *Gunakan slider untuk menyeimbangkan ekosistem secara harmonis.
                  </div>
                </div>
              )}

            </div>

            {/* Simulation legend */}
            <div className="mt-4 text-xs text-slate-400 font-sans flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Visualisasi Data Kalibrasi Lab Cerdas</span>
            </div>
          </div>

        </div>

        {/* --- STATS BAR SECTION --- */}
        <section className="bg-slate-50 border border-slate-100 rounded-3xl py-10 px-4 sm:px-6 lg:px-8 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
            
            {/* Stat 1 */}
            <div className="space-y-1.5">
              <span className="block text-[10px] font-mono tracking-widest text-emerald-700 uppercase font-bold">
                {item.id === 'luminet-btp' ? 'Nodes Deployed' : item.id === 'smart-hydroponics' ? 'Grow Shelves' : 'Sensors Integrated'}
              </span>
              <p className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {item.id === 'luminet-btp' ? '247+' : item.id === 'smart-hydroponics' ? '12 Racks' : '4 Channels'}
              </p>
              <span className="block text-[10px] text-slate-500 font-sans">
                {item.id === 'luminet-btp' ? 'PJU Streetlight Nodes' : item.id === 'smart-hydroponics' ? 'Calibrated vertical panels' : 'pH, Temperature, TDS, Turbidity'}
              </span>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1.5">
              <span className="block text-[10px] font-mono tracking-widest text-emerald-700 uppercase font-bold">
                {item.id === 'luminet-btp' ? 'Energy Saved' : item.id === 'smart-hydroponics' ? 'Growth Booster' : 'Turbidity Goal'}
              </span>
              <p className="font-outfit text-3xl sm:text-4xl font-extrabold text-teal-600 tracking-tight">
                {item.id === 'luminet-btp' ? '45%' : item.id === 'smart-hydroponics' ? '+30%' : '< 15 NTU'}
              </p>
              <span className="block text-[10px] text-slate-500 font-sans">
                {item.id === 'luminet-btp' ? 'Against Astronomical Timers' : item.id === 'smart-hydroponics' ? 'calibrated led spectra output' : 'Crystal clear biological filtration'}
              </span>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1.5">
              <span className="block text-[10px] font-mono tracking-widest text-emerald-700 uppercase font-bold">
                {item.id === 'luminet-btp' ? 'Response Latency' : item.id === 'smart-hydroponics' ? 'Eco Footprint' : 'Alert Trigger'}
              </span>
              <p className="font-outfit text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">
                {item.id === 'luminet-btp' ? '< 50ms' : item.id === 'smart-hydroponics' ? '100% Organik' : '< 1s Delay'}
              </p>
              <span className="block text-[10px] text-slate-500 font-sans">
                {item.id === 'luminet-btp' ? 'Immediate XBee node hop' : item.id === 'smart-hydroponics' ? 'No chemical growth hormones' : 'Immediate Telegram / SMS alerts'}
              </span>
            </div>

            {/* Stat 4 */}
            <div className="space-y-1.5">
              <span className="block text-[10px] font-mono tracking-widest text-teal-700 uppercase font-bold">
                Live Monitoring
              </span>
              <p className="font-outfit text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                24/7 Live
              </p>
              <span className="block text-[10px] text-slate-500 font-sans">
                Continuous hardware diagnostic loops
              </span>
            </div>

          </div>
        </section>

        {/* --- FULL WIDTH IMMERSIVE IMAGE BANNER --- */}
        <section className="relative w-full h-[280px] sm:h-[350px] overflow-hidden rounded-3xl border border-slate-100 mb-16 shadow-lg">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover object-center scale-[1.01]"
          />
          {/* Elegant image gradient overlay to support readable text */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent" />

          {/* Overlay Title badge */}
          <div className="absolute bottom-6 left-6 sm:left-10 max-w-xl space-y-2 z-10 text-left">
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-amber-400 px-2.5 py-1 rounded bg-black/60 border border-white/10 shadow-lg">
              SYSTEM ARCHITECTURE OVERVIEW
            </span>
            <h4 className="font-outfit text-xl sm:text-2xl font-bold text-white leading-tight">
              Calibrated parameters for automated micro-farming and public infrastructure telemetry.
            </h4>
          </div>
        </section>

        {/* --- CORE CONTENT BREAKDOWN: INTERACTIVE TECH TABS --- */}
        <section className="space-y-8 mb-16">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-mono text-xs font-bold tracking-widest text-emerald-600 uppercase">TECH ARCHITECTURE</span>
            <h2 className="font-outfit text-2xl font-bold sm:text-3xl text-slate-900 tracking-tight">
              Deep-Dive Core System Pillars
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-sans">
              Click on each structural pillar to examine our embedded hardware configurations and telemetry algorithms.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Tab Selectors */}
            <div className="lg:col-span-4 space-y-4">
              {pillars.map((p, idx) => {
                const IconComponent = p.icon;
                const isActive = activeTab === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer outline-none ${
                      isActive 
                        ? 'bg-emerald-50/50 border-emerald-500/30 shadow-sm' 
                        : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/40'
                    }`}
                  >
                    <div className={`p-3 rounded-xl border ${
                      isActive 
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm shadow-emerald-600/10' 
                        : 'bg-slate-50 text-emerald-600 border-slate-100'
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    
                    <div className="space-y-1 flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-outfit text-sm font-bold text-slate-900">{p.title}</span>
                        <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {p.statValue}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{p.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Tab Details Display */}
            <div className="lg:col-span-8">
              <div className="rounded-2xl border border-slate-150 bg-white p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-md shadow-slate-100/50">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-bold">RESEARCH BLOCK</span>
                    <h3 className="font-outfit text-lg sm:text-xl font-bold text-slate-900 mt-1">
                      {pillars[activeTab].title}
                    </h3>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-400">Target Telemetri</span>
                    <span className="text-2xl font-outfit font-extrabold text-emerald-600 block mt-0.5">
                      {pillars[activeTab].statValue}
                    </span>
                    <span className="text-[9px] text-slate-400 font-sans">{pillars[activeTab].statLabel}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  {pillars[activeTab].desc}
                </p>

                <div className="space-y-3 pt-2">
                  <h4 className="text-[9px] font-mono uppercase tracking-widest text-amber-600 font-bold">Indikator Kinerja Utama (KPI)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {pillars[activeTab].points.map((pt, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                        <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span className="text-slate-700 font-medium">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* --- PREMIUM COMMENTS DISCUSSION SECTION --- */}
        <section className="max-w-3xl mx-auto space-y-8">
          
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <MessageSquare className="h-6 w-6 text-emerald-600" />
            <h3 className="font-outfit text-2xl font-bold text-slate-900 tracking-tight">
              Diskusi & Tanggapan ({comments.length})
            </h3>
          </div>

          {/* List of comments */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <MessageSquare className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">
                  Belum ada tanggapan. Berikan opini riset Anda pertama kali!
                </p>
              </div>
            ) : (
              comments.map((comment) => (
                <div 
                  key={comment.id}
                  className="p-6 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 transition-all duration-300 space-y-3 group"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs uppercase">
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
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
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

          {/* Modern comment entry form */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

            <h4 className="font-outfit text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-600" />
              <span>Tulis Tanggapan Akademis Anda</span>
            </h4>

            {commentSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-850 text-xs font-medium animate-fade-in">
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
                    placeholder="Contoh: Shara Anjelia"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all rounded-xl px-4 py-3 shadow-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">Email Kampus / Umum</label>
                  <input 
                    type="email" 
                    required
                    placeholder="Contoh: shara@student.edu"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all rounded-xl px-4 py-3 shadow-xs"
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
                  className="bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all rounded-xl p-4 resize-none leading-relaxed shadow-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-8 py-3 text-xs font-bold uppercase tracking-wider text-white hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-emerald-600/10"
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
