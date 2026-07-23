import React, { useState, useEffect, useRef } from 'react';
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
  CheckCircle, 
  CheckCircle2, 
  Gauge, 
  Lightbulb, 
  Layers, 
  TrendingUp, 
  ChevronRight, 
  Atom, 
  Search, 
  Compass, 
  Eye, 
  BookOpen, 
  Sliders, 
  Database, 
  Cloud, 
  Laptop, 
  MapPin, 
  Image as ImageIcon, 
  Terminal, 
  FileText, 
  Upload,
  BarChart2,
  Lock,
  Workflow
} from 'lucide-react';
import { NewsItem, Comment } from '../types';

interface LuminetShowcaseProps {
  item: NewsItem;
  comments: Comment[];
  onBack: () => void;
  onAddComment: (name: string, email: string, content: string) => void;
}

// Interactive Streetlight Node interface
interface XBeeNode {
  id: string;
  name: string;
  x: number;
  y: number;
  status: 'Online' | 'Offline' | 'Calibrating';
  brightness: number; // % dimming
  signal: number; // RSSI in dBm (e.g., -65)
  power: number; // Watts
  battery: number; // Backup power %
  role: 'Coordinator' | 'Router' | 'End Device';
  trafficDensity: 'High' | 'Medium' | 'Low';
}

export default function LuminetShowcase({ 
  item, 
  comments, 
  onBack, 
  onAddComment 
}: LuminetShowcaseProps) {

  // --- INTERACTIVE XBEE NETWORK STATE ---
  const [nodes, setNodes] = useState<XBeeNode[]>([
    { id: 'node-0', name: 'Gateway Coordinator', x: 190, y: 110, status: 'Online', brightness: 100, signal: -45, power: 85, battery: 100, role: 'Coordinator', trafficDensity: 'Medium' },
    { id: 'node-1', name: 'PJU-North (Depan Lab)', x: 130, y: 40, status: 'Online', brightness: 80, signal: -68, power: 68, battery: 98, role: 'Router', trafficDensity: 'High' },
    { id: 'node-2', name: 'PJU-West (Bundaran I)', x: 70, y: 120, status: 'Online', brightness: 40, signal: -72, power: 34, battery: 99, role: 'Router', trafficDensity: 'Low' },
    { id: 'node-3', name: 'PJU-East (Sektor Tekno)', x: 310, y: 70, status: 'Online', brightness: 60, signal: -58, power: 51, battery: 100, role: 'Router', trafficDensity: 'Medium' },
    { id: 'node-4', name: 'PJU-South (Arah Gerbang)', x: 250, y: 180, status: 'Online', brightness: 100, signal: -62, power: 85, battery: 97, role: 'Router', trafficDensity: 'High' },
    { id: 'node-5', name: 'PJU-Far-East (Gedung D)', x: 340, y: 150, status: 'Online', brightness: 20, signal: -81, power: 17, battery: 96, role: 'End Device', trafficDensity: 'Low' }
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-0');
  const [activeTab, setActiveTab] = useState<'network' | 'energy' | 'terminal'>('network');
  const [systemMode, setSystemMode] = useState<'Automated' | 'Manual' | 'Emergency'>('Automated');
  
  // Realtime simulation state
  const [pulseLine, setPulseLine] = useState<boolean>(true);
  const [packetCount, setPacketCount] = useState<number>(1420);
  const [systemAlerts, setSystemAlerts] = useState<string[]>([
    'SYS: Coordinator link initialized successfully via COM4',
    'INFO: RSSI Calibration scan complete. All nodes active.',
    'AUTO: Dimming algorithm scaled PJU-North to 80% due to low ambient light'
  ]);

  // --- DYNAMIC CALCULATIONS ---
  // Average brightness of routers & end devices (node 1 to 5)
  const controlledNodes = nodes.filter(n => n.id !== 'node-0');
  const avgBrightness = controlledNodes.reduce((acc, curr) => acc + curr.brightness, 0) / controlledNodes.length;
  // Standard lighting consumed 100% power. Luminet saves power proportional to dimming rate
  const energySavedPercentage = Math.round(100 - avgBrightness);
  const totalPowerConsumption = Math.round(controlledNodes.reduce((acc, curr) => acc + (curr.power * (curr.brightness / 100)), 0));
  const avgLatency = Math.round(35 + (avgBrightness * 0.1) + (Math.random() * 2));

  // --- SYSTEM TIMELINE SECTION ---
  const [activeTimelineIdx, setActiveTimelineIdx] = useState<number>(0);
  const timelineData = [
    {
      stage: 'Research & Modeling',
      title: 'Karakteristik Penyebaran Sinyal ZigBee',
      description: 'Studi komparasi propagasi gelombang 2.4 GHz XBee Pro pada lingkungan padat urban dan redaman kanopi pohon kampus.',
      metric: 'Gain -12dBm',
      code: `// ZigBee RSSI Signal Pathloss Calculation\nfloat pathloss(float d, float n) {\n  return 40.2 + 20 * log10(d) + (d > 50 ? 5.8 * n : 0);\n}`,
      achievement: 'Terbit di Jurnal Terakreditasi SINTA'
    },
    {
      stage: 'Hardware Prototype',
      title: 'Desain PCB Node Pengendali & Sensor Arus',
      description: 'Integrasi mikrokontroler internal, modul XBee S2C, sensor arus ACS712, dan solid-state relay untuk kontrol tegangan lampu.',
      metric: 'Efisiensi Daya 94%',
      code: `// Hardware Calibration Formula\nvoid readSensors() {\n  float voltage = readACVoltage(PIN_A0);\n  float current = readACCurrent(PIN_A1);\n  float activePower = voltage * current * 0.85;\n}`,
      achievement: 'Sertifikasi Lab Mikroelektronika'
    },
    {
      stage: 'Mesh Network Testing',
      title: 'Stress-test Topologi Self-Healing',
      description: 'Pengujian transmisi paket data kontinyu dengan menjatuhkan node router utama secara acak untuk mengamati rute alternatif otomatis.',
      metric: 'Reroute < 45ms',
      code: `// XBee Routing Table Auto-Update Node\n#define XBEE_RECOVERY_TIME_MS 45\nvoid checkMeshStatus() {\n  if (rssi < -85) {\n    triggerSelfHealingPaths();\n  }\n}`,
      achievement: 'Mesh Link Recovery Berhasil 100%'
    },
    {
      stage: 'Field Calibration',
      title: 'Uji Coba Integrasi Koridor BTP',
      description: 'Instalasi 5 unit tiang lampu jalan raya Bandung Techno Park. Kalibrasi penjadwalan dimming dinamis berdasarkan sensor PIR lokal.',
      metric: 'Akurasi Sensor 98.2%',
      code: `// Dimm Level Scheduling Logic\nint getTargetBrightness(int hour, int pirActive) {\n  if (hour >= 18 && hour < 22) return 100;\n  if (hour >= 22 && pirActive) return 80;\n  return 30; // Eco Dimming Mode\n}`,
      achievement: 'Uji Lapangan Koridor Jalan Utama'
    },
    {
      stage: 'Full Deployment',
      title: 'Sinkronisasi Multi-Node Real-time',
      description: 'Konektivitas penuh seluruh node tiang PJU pintar menuju Edge Gateway Raspberry Pi 4 dengan enkripsi AES-128 bit.',
      metric: 'Coverage Mesh 100%',
      code: `// AES-128 Mesh Encrypted Handshake\nbool encryptPacket(uint8_t* payload, int size) {\n  AES_init_ctx_iv(&ctx, key, iv);\n  AES_CBC_encrypt_buffer(&ctx, payload, size);\n  return true;\n}`,
      achievement: 'Penerimaan Sertifikat Bandung Smart City'
    }
  ];

  // --- ACADEMIC GALLERY LIGHTBOX STATE ---
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const galleryPhotos = [
    {
      url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800',
      title: 'Kalibrasi Modul XBee S2C',
      tag: 'Hardware Lab'
    },
    {
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
      title: 'Uji Sinyal Spectrum Analyzer',
      tag: 'RF Testing'
    },
    {
      url: 'https://images.unsplash.com/photo-1563745895029-a313609468d4?auto=format&fit=crop&q=80&w=800',
      title: 'Instalasi Lapangan Tiang PJU',
      tag: 'Field Deployment'
    },
    {
      url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
      title: 'Pemantauan Server Gateway',
      tag: 'Cloud Dashboard'
    }
  ];

  // --- COMMENT FEEDBACK STATES ---
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [institutionInput, setInstitutionInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [commentSuccess, setCommentSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto fluctuating telemetry metrics simulating realtime activity
  useEffect(() => {
    const timer = setInterval(() => {
      // Small packet simulation
      setPacketCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      
      // Flux signal & power slightly
      setNodes(prevNodes => prevNodes.map(node => {
        if (node.role === 'Coordinator') return node;
        const signalFlux = Math.random() > 0.5 ? 1 : -1;
        const newSignal = Math.min(-40, Math.max(-95, node.signal + (Math.random() > 0.85 ? signalFlux : 0)));
        return {
          ...node,
          signal: newSignal,
        };
      }));

      // Pulse visual trigger
      setPulseLine(p => !p);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropFile = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim() || !textInput.trim()) return;

    // Concat campus/institution details for high fidelity
    const formattedContent = `${textInput.trim()} (Afiliasi: ${institutionInput || 'Umum'})`;
    onAddComment(nameInput.trim(), emailInput.trim(), formattedContent);
    
    // Reset state
    setNameInput('');
    setEmailInput('');
    setInstitutionInput('');
    setTextInput('');
    setUploadedFile(null);
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  const addTerminalLog = (log: string) => {
    setSystemAlerts(prev => [log, ...prev.slice(0, 7)]);
  };

  // Switch all dim levels at once
  const scaleAllLights = (level: number) => {
    setNodes(prev => prev.map(n => {
      if (n.role === 'Coordinator') return n;
      return {
        ...n,
        brightness: level,
        power: Math.round(85 * (level / 100))
      };
    }));
    addTerminalLog(`USER: Diperintahkan seluruh node dimm ke level ${level}%`);
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] pb-24 text-[#0F172A] relative overflow-hidden" id="luminet-case-study-page">
      
      {/* Decorative High-End Background System */}
      <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />
      
      {/* Dynamic colorful blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/8 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-400/5 blur-[120px] pointer-events-none" />

      {/* Cyber Grid Isometric Lines decoration */}
      <svg className="absolute top-12 left-0 w-full h-[500px] opacity-15 pointer-events-none hidden lg:block" fill="none">
        <path d="M 0,100 L 1920,350 M 0,200 L 1920,450 M 0,300 L 1920,550" stroke="#10B981" strokeWidth="1" />
        <path d="M 0,400 C 300,300 800,500 1200,350 C 1600,200 1800,250 1920,100" stroke="#2E86FF" strokeWidth="1.5" strokeDasharray="5, 5" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10">
        
        {/* Navigation Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <button 
            onClick={onBack}
            className="group inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:shadow-md transition-all duration-300 cursor-pointer"
            id="back-to-news-btn"
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Berita & Event</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400 uppercase">RESEARCH CASE STUDY</span>
            <span className="text-slate-300">/</span>
            <span className="text-emerald-700 font-extrabold bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-lg uppercase tracking-wider">
              Smart PJU Network
            </span>
          </div>
        </div>

        {/* ================= HERO TWO-COLUMN AREA ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* HERO LEFT SIDE */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-500/10 border border-emerald-200/50 px-4 py-1.5 text-xs font-bold tracking-wider text-emerald-700 uppercase flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#16A34A] animate-ping"></span>
                {item.category}
              </span>
              <span className="rounded-full bg-amber-500/10 border border-amber-200/50 px-4 py-1.5 text-xs font-bold tracking-wider text-amber-800 uppercase flex items-center gap-1.5 shadow-xs">
                <Award className="h-3.5 w-3.5 text-amber-600" />
                Bandung Techno Park Grant
              </span>
              <span className="rounded-full bg-blue-50 border border-blue-100 px-4 py-1.5 text-xs font-bold tracking-wider text-blue-700 uppercase">
                IoT IEEE 802.15.4
              </span>
            </div>

            {/* Title / Hero Headline */}
            <div className="space-y-4">
              <span className="block font-mono text-xs font-extrabold tracking-widest text-slate-400 uppercase">
                PROJEK PJU PINTAR TERDISTRIBUSI
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] leading-[1.08] tracking-tight">
                Luminet:<br />
                <span className="bg-gradient-to-r from-[#16A34A] via-[#06B6D4] to-[#2E86FF] bg-clip-text text-transparent">
                  XBee-Based Public Street<br />Lighting Management
                </span>
              </h1>
              
              <p className="font-sans text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl">
                Sistem Manajemen Pencahayaan Jalan Umum (PJU) Cerdas berbasis jaringan nirkabel mesh XBee untuk optimalisasi daya listrik perkotaan.
              </p>
            </div>

            {/* Research stats bar */}
            <div className="grid grid-cols-3 gap-4 border-y border-slate-200 py-5 my-6 max-w-lg">
              <div>
                <span className="block text-[10px] font-mono text-slate-400 uppercase">READING TIME</span>
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-1">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  {item.readTime}
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-400 uppercase">DISCUSSION</span>
                <span className="text-sm font-bold text-slate-800 flex items-center gap-1 mt-1">
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  {comments.length} Diskusi
                </span>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-400 uppercase">FUNDING STATUS</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 inline-block mt-1">
                  Fully Funded
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="#interactive-monitoring-dashboard"
                className="w-full sm:w-auto text-center rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-8 py-4 text-sm font-bold tracking-wider uppercase text-white shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Explore Live Simulator</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a 
                href="#research-materials-accordion"
                className="w-full sm:w-auto text-center rounded-full border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 px-8 py-4 text-sm font-bold tracking-wider uppercase text-slate-700 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <FileText className="h-4 w-4 text-slate-500" />
                <span>Download Paper (PDF)</span>
              </a>
            </div>

          </div>

          {/* HERO RIGHT SIDE: FUTURISTIC INTERACTIVE MESH DASHBOARD */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            {/* Soft glowing ambient circle */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-blue-500/10 rounded-[30px] blur-3xl transform scale-105 pointer-events-none" />

            {/* Dashboard Card Container */}
            <div className="w-full max-w-[500px] rounded-[24px] bg-[#0F172A] border border-slate-800 p-6 shadow-2xl relative overflow-hidden text-slate-200 select-none">
              
              {/* Glass surface reflection */}
              <div className="absolute top-0 left-0 w-full h-[100px] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

              {/* Dashboard Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-800/80 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Network className="h-5 w-5 animate-pulse" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono tracking-wider font-extrabold text-emerald-400">XBEE_MESH_INTELLIGENCE</span>
                    <span className="block text-[8px] font-mono text-slate-500 uppercase">ZIGBEE TELEMETRY GATEWAY</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[8px] font-mono uppercase text-[#10B981]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    MESH ONLINE
                  </span>
                  <span className="text-[8px] font-mono text-slate-500 hidden sm:inline uppercase">TX/RX VER. 2.1</span>
                </div>
              </div>

              {/* 2D XBee Node Mesh Map */}
              <div className="relative rounded-2xl border border-slate-800 bg-slate-950/80 p-4 min-h-[220px] mb-6 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                
                {/* SVG Topology */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 220">
                  {/* Dynamic pulsing path lines to simulate signal packets */}
                  <g className={`stroke-emerald-500/30 stroke-[1.5] ${pulseLine ? 'stroke-dasharray-[6,4]' : 'stroke-dasharray-[3,6]'}`}>
                    <line x1="190" y1="110" x2="130" y2="40" />
                    <line x1="190" y1="110" x2="70" y2="120" />
                    <line x1="190" y1="110" x2="310" y2="70" />
                    <line x1="190" y1="110" x2="250" y2="180" />
                    <line x1="310" y1="70" x2="340" y2="150" />
                    <line x1="250" y1="180" x2="340" y2="150" />
                    <line x1="130" y1="40" x2="70" y2="120" />
                  </g>

                  {/* Highlight link from Coordinator to selected node */}
                  {selectedNodeId !== 'node-0' && (
                    <line 
                      x1="190" 
                      y1="110" 
                      x2={selectedNode.x} 
                      y2={selectedNode.y} 
                      className="stroke-[#2E86FF] stroke-2 animate-pulse" 
                    />
                  )}

                  {/* Pulsing signal halo around selected node */}
                  <circle 
                    cx={selectedNode.x} 
                    cy={selectedNode.y} 
                    r="15" 
                    className="fill-none stroke-blue-500/30 stroke-[1.5] animate-ping" 
                  />
                </svg>

                {/* Draw XBee nodes */}
                <div className="relative z-10 w-full h-[220px]">
                  {nodes.map(n => (
                    <button
                      key={n.id}
                      onClick={() => {
                        setSelectedNodeId(n.id);
                        addTerminalLog(`USER: Membuka telemetry untuk node ${n.name}`);
                      }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
                      style={{ left: `${(n.x / 400) * 100}%`, top: `${(n.y / 220) * 100}%` }}
                    >
                      <div 
                        className={`h-7 w-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                          selectedNodeId === n.id 
                            ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/50 scale-125' 
                            : n.role === 'Coordinator'
                              ? 'bg-teal-950 border-teal-500/80 text-teal-300 hover:scale-110'
                              : 'bg-slate-900 border-slate-700/80 text-emerald-400 hover:border-emerald-500 hover:scale-110'
                        }`}
                      >
                        {n.role === 'Coordinator' ? (
                          <Cpu className="h-3 w-3" />
                        ) : (
                          <Lightbulb className="h-3 w-3" />
                        )}
                      </div>
                      
                      {/* Subtitle Node ID indicator on map */}
                      <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-slate-950/90 border border-slate-800 text-[8px] font-mono px-1 py-0.5 rounded text-slate-400 whitespace-nowrap">
                        {n.id.replace('node-', 'N-0')}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Subtitle overlay */}
                <div className="absolute top-2.5 right-2.5 bg-slate-900/90 px-2 py-0.5 rounded border border-slate-800 text-[8px] font-mono text-slate-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span> Selected Link
                </div>

              </div>

              {/* Dynamic Readouts on selected XBee Node */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    {selectedNode.name}
                  </h4>
                  <span className="text-[9px] font-mono text-slate-400 uppercase bg-slate-800 px-2 py-0.5 rounded">
                    {selectedNode.role}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-center pt-2">
                  <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-850">
                    <span className="block text-[8px] font-mono text-slate-500 uppercase">RSSI Signal</span>
                    <span className={`text-[11px] font-mono font-bold ${selectedNode.signal > -70 ? 'text-[#10B981]' : 'text-amber-500'}`}>
                      {selectedNode.signal} dBm
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-850">
                    <span className="block text-[8px] font-mono text-slate-500 uppercase">Load Wattage</span>
                    <span className="text-[11px] font-mono font-bold text-white">
                      {selectedNode.role === 'Coordinator' ? '0W (Host)' : `${Math.round(selectedNode.power * (selectedNode.brightness / 100))}W`}
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-850">
                    <span className="block text-[8px] font-mono text-slate-500 uppercase">Traffic Link</span>
                    <span className="text-[11px] font-mono font-bold text-[#06B6D4] uppercase">
                      {selectedNode.trafficDensity}
                    </span>
                  </div>
                </div>

                {/* Dimming controls if it is a lamp */}
                {selectedNode.role !== 'Coordinator' ? (
                  <div className="pt-2 space-y-2">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-slate-400">PJU Dimm Control:</span>
                      <span className="text-white font-bold">{selectedNode.brightness}% Power</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="20"
                        value={selectedNode.brightness}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          setNodes(prev => prev.map(item => item.id === selectedNode.id ? { ...item, brightness: value } : item));
                          addTerminalLog(`AUTO: Menyetel dimming ${selectedNode.name} ke ${value}%`);
                        }}
                        className="flex-1 accent-emerald-500 h-1.5 bg-slate-800 rounded-full cursor-pointer"
                      />
                      <div className="flex gap-1">
                        <button 
                          onClick={() => {
                            setNodes(prev => prev.map(item => item.id === selectedNode.id ? { ...item, brightness: 100 } : item));
                            addTerminalLog(`USER: PJU Override Full Brightness di ${selectedNode.name}`);
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[8px] px-2 py-1 rounded"
                        >
                          FULL
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 text-[9px] font-mono text-slate-500 italic text-center">
                    *Coordinator mengarahkan jaringan nirkabel. Klik node lain untuk simulasi dimming.
                  </div>
                )}
              </div>

              {/* Dimm Quick Controllers */}
              <div className="grid grid-cols-3 gap-2 border-t border-slate-800/80 pt-4 text-center">
                <button 
                  onClick={() => scaleAllLights(30)}
                  className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 rounded border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-400 cursor-pointer"
                >
                  ⚡ ECO (30%)
                </button>
                <button 
                  onClick={() => scaleAllLights(60)}
                  className="p-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 rounded border border-cyan-500/20 text-[10px] font-mono font-bold text-cyan-400 cursor-pointer"
                >
                  🔆 MED (60%)
                </button>
                <button 
                  onClick={() => scaleAllLights(100)}
                  className="p-1.5 bg-blue-500/10 hover:bg-blue-500/20 rounded border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 cursor-pointer"
                >
                  🚨 FULL (100%)
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* ================= PROJECT OVERVIEW ================= */}
        <section className="space-y-8 mb-20" id="project-overview-narrative">
          
          <div className="text-left max-w-2xl">
            <span className="font-mono text-xs font-bold tracking-widest text-emerald-600 uppercase">DETAILED OVERVIEW</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight mt-1">
              Smart PJU Management Ecosystem
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Box 1: Research Background */}
            <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <BookOpen className="h-16 w-16" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-emerald-600" />
                <span>Research Background</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Conventional street lights operate on rigid, uncalibrated static schedules, burning substantial electricity at midnight when roads are empty. Luminet introduces decentralized microcontrollers on each light source to synchronize dimming based on local traffic statistics, ambient twilight meters, and cloud-assigned grid overrides.
              </p>
            </div>

            {/* Box 2: Objectives & Goals */}
            <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Compass className="h-16 w-16" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Compass className="h-5 w-5 text-blue-600" />
                <span>Project Objectives</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>Membangun topologi mesh nirkabel XBee yang handal tanpa single-point-of-failure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>Mengurangi konsumsi energi PJU perkotaan minimal sebesar 45%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>Menyediakan deteksi kerusakan grid listrik prediktif yang instan di lapangan.</span>
                </li>
              </ul>
            </div>

            {/* Box 3: Target Applications */}
            <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <MapPin className="h-16 w-16" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-cyan-600" />
                <span>Real-world Applications</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Perfectly fitted for campus corridors, industrial techno-parks, high-density municipal residential roads, and highways. The decentralized networking capabilities bypass the massive trenching/wiring costs typically associated with standard fiber-optic smart lighting grids.
              </p>
            </div>

          </div>

        </section>

        {/* ================= LARGE LIVE DASHBOARD PANEL ================= */}
        <section className="mb-20" id="interactive-monitoring-dashboard">
          
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 sm:p-8 shadow-xl relative overflow-hidden">
            
            {/* Background design */}
            <div className="absolute inset-0 bg-[radial-gradient(#F1F5F9_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

            {/* Header section with telemetry toggle */}
            <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-100 mb-8 relative z-10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-widest">REAL-TIME MONITORING STATION</span>
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
                  Sistem Pemantauan Terpadu Luminet
                </h3>
                <p className="text-xs text-slate-500">
                  Data diagnostik dan sinyal telemetry nirkabel yang dipancarkan secara live dari Bandung Techno Park.
                </p>
              </div>

              {/* Active Modes Toggles */}
              <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                {(['Automated', 'Manual', 'Emergency'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => {
                      setSystemMode(mode);
                      addTerminalLog(`USER: Mengganti mode kerja sistem ke: ${mode.toUpperCase()}`);
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      systemMode === mode 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Core Stats / KPI Row */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8 relative z-10">
              
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
                <span className="block text-[9px] font-mono text-slate-400 uppercase">ACTIVE NODES</span>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 block">247+</span>
                <span className="text-[9px] text-emerald-600 font-mono">PJU Connected</span>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
                <span className="block text-[9px] font-mono text-slate-400 uppercase">ENERGY SAVING</span>
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-1 block">{energySavedPercentage}%</span>
                <span className="text-[9px] text-emerald-600 font-mono">Conserved Power</span>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
                <span className="block text-[9px] font-mono text-slate-400 uppercase">AVG LATENCY</span>
                <span className="text-xl sm:text-2xl font-extrabold text-blue-600 mt-1 block">{avgLatency}ms</span>
                <span className="text-[9px] text-blue-500 font-mono">Signal Mesh</span>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
                <span className="block text-[9px] font-mono text-slate-400 uppercase">MESH COVERAGE</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#06B6D4] mt-1 block">100%</span>
                <span className="text-[9px] text-cyan-500 font-mono">IEEE 802.15.4</span>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
                <span className="block text-[9px] font-mono text-slate-400 uppercase">UPTIME RATE</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#16A34A] mt-1 block">99.7%</span>
                <span className="text-[9px] text-emerald-500 font-mono">Prediction Acc.</span>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
                <span className="block text-[9px] font-mono text-slate-400 uppercase">TOTAL DURATION</span>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1 block">24/7</span>
                <span className="text-[9px] text-slate-500 font-mono">Auto Monitoring</span>
              </div>

            </div>

            {/* Sub-layout: Interactive Visualizer & Terminal Logs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
              
              {/* Left visual: Smart city schematic with glowing streetlights */}
              <div className="lg:col-span-8 space-y-4">
                <div className="rounded-xl border border-slate-200 bg-slate-950 p-5 min-h-[280px] text-slate-300 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
                  
                  {/* Visualizer header */}
                  <div className="flex justify-between items-center pb-2 border-b border-white/5 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500 animate-ping"></div>
                      <span className="text-[9px] font-mono text-slate-400 uppercase">3D SMART CITY PERSPECTIVE SIMULATOR</span>
                    </div>
                    <span className="text-[8px] font-mono text-white/50 bg-white/10 px-2 py-0.5 rounded">BTP SCHEMATIC ROAD MAP</span>
                  </div>

                  {/* City road grid visualization */}
                  <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden min-h-[170px]">
                    
                    {/* Perspective grid wires */}
                    <div className="absolute w-[140%] h-[140%] border-t border-slate-800/60 transform rotate-45 skew-x-12 translate-y-6 pointer-events-none" />
                    
                    {/* Simulated vector isometric city blocks */}
                    <div className="relative z-10 w-full max-w-lg grid grid-cols-3 gap-8 text-center text-[10px] font-mono">
                      
                      <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-xs flex flex-col justify-between h-24">
                        <span className="text-slate-500 text-[8px] block">BLOK UTARA (PJU-01)</span>
                        <div className="flex justify-center items-center gap-2 my-1">
                          <span className={`h-2.5 w-2.5 rounded-full ${nodes[1].brightness > 50 ? 'bg-emerald-400 shadow-lg shadow-emerald-400' : 'bg-slate-700'}`}></span>
                          <span className="text-white text-[11px] font-bold">{nodes[1].brightness}% Dimm</span>
                        </div>
                        <span className="text-[8px] text-slate-400 bg-slate-900 py-0.5 rounded">RSSI: {nodes[1].signal}dBm</span>
                      </div>

                      <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-xs flex flex-col justify-between h-24">
                        <span className="text-slate-500 text-[8px] block">BLOK BARAT (PJU-02)</span>
                        <div className="flex justify-center items-center gap-2 my-1">
                          <span className={`h-2.5 w-2.5 rounded-full ${nodes[2].brightness > 50 ? 'bg-emerald-400 shadow-lg shadow-emerald-400' : 'bg-slate-700'}`}></span>
                          <span className="text-white text-[11px] font-bold">{nodes[2].brightness}% Dimm</span>
                        </div>
                        <span className="text-[8px] text-slate-400 bg-slate-900 py-0.5 rounded">RSSI: {nodes[2].signal}dBm</span>
                      </div>

                      <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-xs flex flex-col justify-between h-24">
                        <span className="text-slate-500 text-[8px] block">BLOK TIMUR (PJU-03)</span>
                        <div className="flex justify-center items-center gap-2 my-1">
                          <span className={`h-2.5 w-2.5 rounded-full ${nodes[3].brightness > 50 ? 'bg-emerald-400 shadow-lg shadow-emerald-400' : 'bg-slate-700'}`}></span>
                          <span className="text-white text-[11px] font-bold">{nodes[3].brightness}% Dimm</span>
                        </div>
                        <span className="text-[8px] text-slate-400 bg-slate-900 py-0.5 rounded">RSSI: {nodes[3].signal}dBm</span>
                      </div>

                    </div>

                  </div>

                  {/* Active telemetry statistics bar */}
                  <div className="flex justify-between items-center border-t border-white/5 pt-2 text-[9px] font-mono text-slate-400">
                    <span>Active Telemetry Streams: {packetCount} packets</span>
                    <span className="text-emerald-400 font-bold uppercase">All mesh signals green</span>
                  </div>
                </div>
              </div>

              {/* Right: Real-time Diagnostics Terminal Logs */}
              <div className="lg:col-span-4 space-y-4">
                <div className="rounded-xl border border-slate-200 bg-slate-900 p-5 min-h-[280px] text-slate-300 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
                  
                  <div className="flex justify-between items-center pb-2 border-b border-white/5 relative z-10">
                    <span className="text-[9px] font-mono text-slate-400 flex items-center gap-1">
                      <Terminal className="h-3.5 w-3.5 text-[#06B6D4]" />
                      XBEE_SHELL_LOGGER
                    </span>
                    <span className="text-[7px] font-mono bg-emerald-500/10 text-emerald-400 px-1.5 py-0.2 rounded font-bold">READY</span>
                  </div>

                  {/* Core logs print block */}
                  <div className="flex-1 my-3 font-mono text-[10px] space-y-2.5 overflow-y-auto max-h-[190px] text-left">
                    {systemAlerts.map((log, idx) => (
                      <div key={idx} className="border-l-2 border-[#10B981] pl-2 text-slate-300">
                        <span className="text-[#06B6D4] text-[8px] mr-1">[{new Date().toLocaleTimeString()}]</span>
                        <span>{log}</span>
                      </div>
                    ))}
                    
                    <div className="text-slate-500 text-[9px]">
                      &gt; Listening on ZigBee serial gateway COM4 @ 9600 baud...
                    </div>
                  </div>

                  {/* Diagnostic Action simulation */}
                  <div className="border-t border-white/5 pt-3 flex gap-2 relative z-10">
                    <button
                      onClick={() => {
                        const randomAlerts = [
                          'SYS: Manual force signal sweep on node-3 complete (RSSI: -58dBm)',
                          'WARN: Signal noise floor elevated slightly near sector 3',
                          'DIAG: Measured total grid current leakage: 0.02A (Within Normal Limits)',
                          'INFO: Diagnostic self-check complete. 0 faults registered.'
                        ];
                        const log = randomAlerts[Math.floor(Math.random() * randomAlerts.length)];
                        addTerminalLog(log);
                      }}
                      className="flex-1 rounded bg-slate-800 hover:bg-slate-750 border border-slate-700 text-[10px] font-bold text-slate-200 py-2 cursor-pointer transition-colors text-center"
                    >
                      🧪 Run Self-Diagnostic Check
                    </button>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </section>

        {/* ================= KEY PILLARS / SPECIFICATIONS ================= */}
        <section className="space-y-12 mb-20" id="technology-pillars">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-mono text-xs font-bold tracking-widest text-emerald-600 uppercase">SYSTEM SPECIFICATIONS</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Infrastruktur & Arsitektur Jaringan
            </h2>
            <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
              Membagi fitur utama projek menjadi tiga pilar kokoh yang menopang efisiensi operasional kota pintar.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Spec Card 1 */}
            <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl relative overflow-hidden group hover:shadow-xl hover:border-emerald-500/20 hover:-translate-y-1 transition-all duration-300 text-left">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="h-12 w-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
                <Network className="h-6 w-6" />
              </div>
              
              <span className="font-mono text-[10px] text-slate-400 block uppercase font-bold">TOPOLOGI NIRKABEL</span>
              <h3 className="font-display text-lg font-extrabold text-slate-900 mt-1 mb-3">XBee Mesh Networking</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans mb-4">
                Memanfaatkan protokol standar IEEE 802.15.4 berbasis XBee S2C, memungkinkan setiap tiang lampu beroperasi sebagai router nirkabel aktif yang saling meneruskan telemetry hingga ke Gateway sentral.
              </p>
              
              <div className="border-t border-slate-100 pt-4 mt-2">
                <div className="flex justify-between items-center text-xs text-slate-600 font-medium">
                  <span>Self-Healing Protocol</span>
                  <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[10px]">99.9% Reliable</span>
                </div>
              </div>
            </div>

            {/* Spec Card 2 */}
            <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl relative overflow-hidden group hover:shadow-xl hover:border-blue-500/20 hover:-translate-y-1 transition-all duration-300 text-left">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mb-6">
                <Cpu className="h-6 w-6" />
              </div>
              
              <span className="font-mono text-[10px] text-slate-400 block uppercase font-bold">ALGORITMA LOKAL</span>
              <h3 className="font-display text-lg font-extrabold text-slate-900 mt-1 mb-3">Intelligent Dimming Engine</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans mb-4">
                Setiap tiang menjalankan scheduler lokal yang fleksibel. Tegangan dan intensitas lampu dapat direduksi hingga 30% pada jam-jam sunyi, serta dikembalikan ke 100% jika sensor PIR mendeteksi pergerakan kendaraan.
              </p>
              
              <div className="border-t border-slate-100 pt-4 mt-2">
                <div className="flex justify-between items-center text-xs text-slate-600 font-medium">
                  <span>Power Reduction</span>
                  <span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded text-[10px]">Up to 45% saved</span>
                </div>
              </div>
            </div>

            {/* Spec Card 3 */}
            <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl relative overflow-hidden group hover:shadow-xl hover:border-cyan-500/20 hover:-translate-y-1 transition-all duration-300 text-left">
              <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-50 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />
              <div className="h-12 w-12 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center mb-6">
                <Settings className="h-6 w-6" />
              </div>
              
              <span className="font-mono text-[10px] text-slate-400 block uppercase font-bold">PREDIKTIF PEMELIHARAAN</span>
              <h3 className="font-display text-lg font-extrabold text-slate-900 mt-1 mb-3">Predictive Diagnostics</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans mb-4">
                Sistem mengukur tegangan dan kebocoran arus shunt secara terus menerus. Kerusakan komponen dapat diidentifikasi secara otomatis oleh sistem sebelum lampu padam sepenuhnya, mengirim notifikasi instan ke dinas kota.
              </p>
              
              <div className="border-t border-slate-100 pt-4 mt-2">
                <div className="flex justify-between items-center text-xs text-slate-600 font-medium">
                  <span>Response Time</span>
                  <span className="text-cyan-600 font-bold bg-cyan-50 px-2 py-0.5 rounded text-[10px]">&lt; 1 Minute</span>
                </div>
              </div>
            </div>

          </div>

        </section>

        {/* ================= NETWORK ARCHITECTURE DIAGRAM ================= */}
        <section className="mb-20" id="system-architecture-view">
          
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 sm:p-8 shadow-md">
            
            <div className="max-w-xl text-left space-y-2 mb-10">
              <span className="font-mono text-[10px] font-bold text-emerald-600 uppercase tracking-widest">ARCHITECTURE MAP</span>
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
                Diagram Alir Data & Topologi Sistem
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
                Dari instrumen perangkat keras (hardware level) hingga visualisasi antarmuka awan (cloud monitoring) di server Smart Grow Lab.
              </p>
            </div>

            {/* Premium Flow Chart nodes */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center text-center">
              
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-emerald-500/30 transition-all duration-300">
                <div className="h-10 w-10 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 mx-auto mb-3">
                  <Cpu className="h-5 w-5" />
                </div>
                <h5 className="text-xs font-bold text-slate-900">1. Node Tiang PJU</h5>
                <span className="text-[10px] text-slate-400 block font-mono mt-1">XBee S2C + ACS712</span>
              </div>

              <div className="hidden md:flex justify-center text-slate-300">
                <ChevronRight className="h-6 w-6 animate-pulse" />
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-blue-500/30 transition-all duration-300">
                <div className="h-10 w-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 mx-auto mb-3">
                  <Network className="h-5 w-5" />
                </div>
                <h5 className="text-xs font-bold text-slate-900">2. Mesh Wireless</h5>
                <span className="text-[10px] text-slate-400 block font-mono mt-1">ZigBee Protocol</span>
              </div>

              <div className="hidden md:flex justify-center text-slate-300">
                <ChevronRight className="h-6 w-6 animate-pulse" />
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-cyan-500/30 transition-all duration-300">
                <div className="h-10 w-10 rounded-full bg-cyan-100 border border-cyan-200 flex items-center justify-center text-cyan-700 mx-auto mb-3">
                  <Database className="h-5 w-5" />
                </div>
                <h5 className="text-xs font-bold text-slate-900">3. Gateway Hub</h5>
                <span className="text-[10px] text-slate-400 block font-mono mt-1">Raspberry Pi + API</span>
              </div>

            </div>

          </div>

        </section>

        {/* ================= RESEARCH JOURNEY / ACCORDION METRICS ================= */}
        <section className="space-y-10 mb-20" id="research-materials-accordion">
          
          <div className="text-left max-w-xl">
            <span className="font-mono text-xs font-bold tracking-widest text-emerald-600 uppercase">RESEARCH JOURNEY</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Kronologi Riset & Blok Kode Terbuka
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dokumentasi terstruktur sejak pemodelan laboratorium hingga integrasi penuh di Bandung Techno Park.
            </p>
          </div>

          {/* Horizontal Timeline Steps */}
          <div className="flex flex-nowrap items-center overflow-x-auto pb-4 gap-2 text-xs font-mono border-b border-slate-200 scrollbar-thin">
            {timelineData.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTimelineIdx(idx)}
                className={`px-4 py-3 rounded-xl border whitespace-nowrap cursor-pointer transition-all duration-300 font-bold flex items-center gap-1.5 ${
                  activeTimelineIdx === idx 
                    ? 'bg-[#0F172A] border-[#0F172A] text-white shadow-md' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${activeTimelineIdx === idx ? 'bg-emerald-400' : 'bg-slate-300'}`}></span>
                <span>{item.stage}</span>
              </button>
            ))}
          </div>

          {/* Active Timeline Details Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 sm:p-8 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2.5 py-1">
                  💡 {timelineData[activeTimelineIdx].achievement}
                </span>
                <span className="rounded bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold px-2.5 py-1">
                  📈 {timelineData[activeTimelineIdx].metric}
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {timelineData[activeTimelineIdx].title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {timelineData[activeTimelineIdx].description}
              </p>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                <Award className="h-5 w-5 text-amber-500 shrink-0" />
                <span className="text-xs text-slate-700 font-medium">
                  Status Capaian: <strong className="text-slate-900">{timelineData[activeTimelineIdx].achievement}</strong>
                </span>
              </div>

            </div>

            {/* Interactive Code Snippet Display on Right side */}
            <div className="lg:col-span-5 space-y-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-md">
                <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-400 font-bold flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                    LUMINET_CORE.ino
                  </span>
                  <span className="text-[8px] font-mono text-white/40">C++ // Arduino</span>
                </div>
                
                <pre className="p-4 font-mono text-[10px] text-emerald-400 text-left overflow-x-auto leading-relaxed bg-slate-950 max-h-[170px]">
                  <code>{timelineData[activeTimelineIdx].code}</code>
                </pre>
              </div>

              <p className="text-[10px] text-slate-400 italic font-mono text-center">
                *Potongan kode firmware nyata untuk memprogram mikrokontroler tiang lampu jalan.
              </p>
            </div>

          </div>

        </section>

        {/* ================= LAB ACADEMIC GALLERY ================= */}
        <section className="space-y-8 mb-20" id="research-gallery">
          
          <div className="text-left max-w-xl">
            <span className="font-mono text-xs font-bold tracking-widest text-emerald-600 uppercase">DOCUMENTATION PHOTO</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Galeri Dokumentasi Laboratorium
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dokumentasi aktivitas perakitan perangkat keras, pengujian nirkabel, dan instalasi fisik di jalan raya koridor riset.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryPhotos.map((photo, i) => (
              <div 
                key={i}
                onClick={() => setLightboxImage(photo.url)}
                className="group relative rounded-xl border border-slate-200 overflow-hidden cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-square bg-slate-100 overflow-hidden relative">
                  <img 
                    src={photo.url} 
                    alt={photo.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glass tint overlay on hover */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-xs font-bold gap-1.5">
                    <Search className="h-4 w-4" />
                    <span>Perbesar Foto</span>
                  </div>
                </div>

                <div className="p-3 bg-white border-t border-slate-100 text-left">
                  <span className="text-[9px] font-mono text-emerald-600 uppercase font-bold">{photo.tag}</span>
                  <h5 className="text-xs font-bold text-slate-800 truncate mt-0.5">{photo.title}</h5>
                </div>
              </div>
            ))}
          </div>

          {/* LIGHTBOX MODAL */}
          {lightboxImage && (
            <div 
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
              onClick={() => setLightboxImage(null)}
            >
              <div className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-xl border border-white/15 shadow-2xl">
                <img 
                  src={lightboxImage} 
                  alt="Documentation Large" 
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => setLightboxImage(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2.5 text-xs font-bold border border-white/20 transition-all"
                >
                  ✕ Close Lightbox
                </button>
              </div>
            </div>
          )}

        </section>

        {/* ================= FOOTER LARGE JOIN CTA ================= */}
        <section className="mb-20 relative overflow-hidden rounded-[24px] bg-[#0F172A] border border-slate-800 text-white p-8 sm:p-12 lg:p-16 text-center shadow-2xl">
          
          {/* Subtle neon gradients inside CTA block */}
          <div className="absolute top-[-40%] left-[-10%] w-[350px] h-[350px] rounded-full bg-emerald-500/10 blur-[90px] pointer-events-none" />
          <div className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="text-[10px] font-mono font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
              TERBUKA UNTUK KOLABORASI
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              Tertarik Berkontribusi dalam Riset Smart City?
            </h2>
            <p className="text-sm text-slate-400 font-sans max-w-lg mx-auto leading-relaxed">
              Bergabunglah bersama kami di tim peneliti Smart Grow Laboratory untuk merancang masa depan telemetri nirkabel terdistribusi.
            </p>
            
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a 
                href="#premium-comment-form"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <span>Ajukan Proposal Riset</span>
                <ChevronRight className="h-4 w-4" />
              </a>

              <button 
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 hover:bg-slate-800 px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-300 transition-all duration-300"
              >
                <span>Lihat Riset Lainnya</span>
              </button>
            </div>

          </div>

        </section>

        {/* ================= DISCUSSION & COMMENTS SECTION ================= */}
        <section className="max-w-3xl mx-auto space-y-8" id="discussion-comments-section">
          
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
            <MessageSquare className="h-6 w-6 text-emerald-600" />
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight text-left">
              Diskusi Riset Akademis ({comments.length})
            </h3>
          </div>

          {/* Comments Feed List */}
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
                  className="p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-emerald-500/20 transition-all duration-300 space-y-3 group shadow-xs text-left"
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
                    <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
                      Verified Researcher
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans pl-12">
                    {comment.content}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* COMMENT FORM CONTAINER */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E2E8F0] space-y-6 relative overflow-hidden shadow-md text-left">
            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <h4 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-600" />
              <span>Berikan Tanggapan / Review Akademis Anda</span>
            </h4>

            {commentSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium animate-fade-in">
                ✓ Komentar berhasil ditambahkan! Tanggapan Anda membantu memajukan diskursus sains perkotaan cerdas (Smart City).
              </div>
            )}

            <form onSubmit={handleCommentSubmit} className="space-y-4" id="premium-comment-form">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Contoh: Dr. Ir. Shara"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="bg-slate-50 border border-[#E2E8F0] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100/40 transition-all rounded-xl px-4 py-3.5 font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">Email Institusi</label>
                  <input 
                    type="email" 
                    required
                    placeholder="Contoh: shara@unpad.ac.id"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="bg-slate-50 border border-[#E2E8F0] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100/40 transition-all rounded-xl px-4 py-3.5 font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">Nama Kampus / Institusi</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: ITB / Universitas Padjadjaran"
                    value={institutionInput}
                    onChange={(e) => setInstitutionInput(e.target.value)}
                    className="bg-slate-50 border border-[#E2E8F0] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100/40 transition-all rounded-xl px-4 py-3.5 font-medium"
                  />
                </div>

              </div>

              {/* Text message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">Review / Catatan Umpan Balik Riset</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Tulis ulasan akademis, pertanyaan pengujian, atau saran riset mengenai interkoneksi protokol XBee Mesh ini..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="bg-slate-50 border border-[#E2E8F0] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100/40 transition-all rounded-xl p-4 resize-none leading-relaxed font-medium"
                />
              </div>

              {/* Advanced Drag & Drop Mock Attachment File Input */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 font-bold">Lampirkan File PDF Reviewer (Opsional)</span>
                
                <div 
                  onDragOver={handleDragOver}
                  onDrop={handleDropFile}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 hover:border-emerald-500 bg-slate-50/50 hover:bg-slate-50 rounded-xl p-5 text-center transition-all cursor-pointer select-none"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.png,.jpg"
                    className="hidden" 
                  />
                  <Upload className="h-6 w-6 text-slate-400 mx-auto mb-1.5" />
                  {uploadedFile ? (
                    <div className="text-xs font-bold text-emerald-600 flex items-center justify-center gap-1.5">
                      <CheckCircle className="h-4 w-4" />
                      <span>{uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)</span>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-bold text-slate-700">Drag & drop berkas pendukung riset di sini, atau klik untuk memilih</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Mendukung format PDF, DOCX, atau Gambar hasil pengujian laboratorium (Max 5MB)</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-emerald-600/10"
                >
                  <span>Kirim Review Akademik</span>
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
