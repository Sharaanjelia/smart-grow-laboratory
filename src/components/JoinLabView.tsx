import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Briefcase, 
  Heart, 
  Github, 
  Instagram, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  Sprout, 
  Network, 
  Users, 
  ArrowRight, 
  Check, 
  RotateCcw, 
  Cpu, 
  Activity, 
  Layers,
  FileText
} from 'lucide-react';

interface JoinLabViewProps {
  onBack: () => void;
  onAddApplicant?: (app: {
    fullName: string;
    email: string;
    roleInterest: string;
    motivation: string;
    github?: string;
    instagram?: string;
  }) => void;
}

export default function JoinLabView({ onBack, onAddApplicant }: JoinLabViewProps) {
  // Navigation inside Join page
  const [activeTab, setActiveTab] = useState<'app' | 'showcase'>('app');

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('IoT Specialist / Hardware Engineer');
  const [motivation, setMotivation] = useState('');
  const [github, setGithub] = useState('');
  const [instagram, setInstagram] = useState('');

  // Form submission feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);

  // Form completion progress trackers for checklist UI
  const isNameFilled = fullName.trim().length > 0;
  const isEmailFilled = email.trim().length > 0 && email.includes('@');
  const isMotivationFilled = motivation.trim().length > 15;

  // Local storage persistence of applications
  useEffect(() => {
    const count = localStorage.getItem('smart_grow_apps_count');
    if (count) setSubmissionCount(parseInt(count));
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    setIsSubmitting(true);
    
    // Simulate premium server-side submission API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      const newCount = submissionCount + 1;
      setSubmissionCount(newCount);
      localStorage.setItem('smart_grow_apps_count', newCount.toString());

      if (onAddApplicant) {
        onAddApplicant({
          fullName,
          email,
          roleInterest: role,
          motivation,
          github,
          instagram
        });
      }

      // Save application details in local history list
      const existing = localStorage.getItem('smart_grow_applications') || '[]';
      try {
        const parsed = JSON.parse(existing);
        parsed.unshift({
          id: `app_${Date.now()}`,
          fullName,
          email,
          role,
          motivation,
          github,
          instagram,
          timestamp: new Date().toLocaleString()
        });
        localStorage.setItem('smart_grow_applications', JSON.stringify(parsed));
      } catch (e) {
        console.error(e);
      }
    }, 1500);
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setRole('IoT Specialist / Hardware Engineer');
    setMotivation('');
    setGithub('');
    setInstagram('');
    setIsSuccess(false);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col font-sans" id="join-view-container">
      
      {/* 1. HERO BACKGROUND IMAGE - NOW BRIGHT, SHARP, AND FULLY VISIBLE */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none z-0" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1628102479107-d1a10057b5da?auto=format&fit=crop&q=80&w=1920')`,
          filter: 'brightness(0.85) contrast(1.05)'
        }}
      />

      {/* Balanced elegant transparent overlay to keep text highly legible while keeping the green agricultural image completely clear */}
      <div className="absolute inset-0 bg-slate-950/45 pointer-events-none z-1"></div>
      
      {/* Edge Softening Overlay (very soft) */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-slate-950/30 pointer-events-none z-1"></div>

      {/* Decorative subtle ambient glows (greatly reduced blur strength and opacity for maximum background clarity) */}
      <div className="absolute top-[15%] left-[5%] w-[350px] h-[350px] rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none z-1" style={{ animationDuration: '6s' }}></div>
      <div className="absolute bottom-[10%] right-[10%] w-[450px] h-[450px] rounded-full bg-blue-500/5 blur-[90px] pointer-events-none z-1" style={{ animationDuration: '9s' }}></div>

      {/* 2. DYNAMIC VISUAL EFFECTS OVERLAY */}
      
      {/* Grid Network Lines Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none z-1 opacity-80"></div>

      {/* Floating Sparkle Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
        <div className="absolute top-1/4 left-[15%] w-1.5 h-1.5 rounded-full bg-[#22C55E]/40 animate-particle-drift-1"></div>
        <div className="absolute top-2/3 left-[35%] w-1.5 h-1.5 rounded-full bg-blue-400/30 animate-particle-drift-2"></div>
        <div className="absolute top-1/3 left-[50%] w-1 h-1 rounded-full bg-[#10B981]/35 animate-particle-drift-1" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 left-[75%] w-1.5 h-1.5 rounded-full bg-[#2E86FF]/40 animate-particle-drift-2" style={{ animationDelay: '5s' }}></div>
        <div className="absolute top-1/2 left-[85%] w-1 h-1 rounded-full bg-[#22C55E]/30 animate-particle-drift-1" style={{ animationDelay: '7s' }}></div>
      </div>

      {/* Interactive IoT Network Connections (SVG Lines & Pulse Nodes) */}
      <div className="absolute inset-0 pointer-events-none z-1 opacity-75">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Circuit connection paths */}
          <path d="M 150,220 L 220,290 L 350,290" fill="none" stroke="rgba(34, 197, 94, 0.12)" strokeWidth="1.5" />
          <path d="M 850,150 L 980,240 L 980,380" fill="none" stroke="rgba(46, 134, 255, 0.15)" strokeWidth="1.5" strokeDasharray="5,5" className="animate-network-dash" />
          <path d="M 980,240 L 1150,240" fill="none" stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1.5" />
          <path d="M 700,550 L 820,630 L 940,630" fill="none" stroke="rgba(34, 197, 94, 0.1)" strokeWidth="1.5" />

          {/* Pulsing connection points */}
          <circle cx="220" cy="290" r="3" fill="#22C55E" className="animate-ping" />
          <circle cx="220" cy="290" r="2" fill="#22C55E" />
          <circle cx="980" cy="240" r="3.5" fill="#2E86FF" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="980" cy="240" r="2.5" fill="#2E86FF" />
          <circle cx="820" cy="630" r="3" fill="#10B981" />
        </svg>
      </div>

      {/* HOVERING DRONE ILLUSTRATION WITH HARDWARE TELEMETRY PANEL (From user's image) */}
      <div className="hidden xl:flex absolute top-[14%] right-[33%] z-10 flex-col items-center animate-drone-wobble pointer-events-auto">
        <div className="relative flex flex-col items-center">
          
          {/* SVG Smart Drone */}
          <svg className="w-48 h-24 drop-shadow-[0_15px_30px_rgba(0,0,0,0.65)]" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Propellers Left and Right (Spinning effect) */}
            <ellipse cx="25" cy="25" rx="20" ry="2" fill="rgba(255,255,255,0.3)" className="animate-spin" style={{ transformOrigin: '25px 25px', animationDuration: '0.15s' }} />
            <ellipse cx="175" cy="25" rx="20" ry="2" fill="rgba(255,255,255,0.3)" className="animate-spin" style={{ transformOrigin: '175px 25px', animationDuration: '0.12s' }} />
            
            {/* Propeller Mounts */}
            <path d="M 40,40 L 25,25" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
            <path d="M 160,40 L 175,25" stroke="#E2E8F0" strokeWidth="4" strokeLinecap="round" />
            
            {/* Drone Legs / Skids */}
            <path d="M 75,75 L 60,90 L 45,90" stroke="#94A3B8" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 125,75 L 140,90 L 155,90" stroke="#94A3B8" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 50,90 L 150,90" stroke="#64748B" strokeWidth="3.5" strokeLinecap="round" />

            {/* Drone Core Body */}
            <rect x="65" y="35" width="70" height="40" rx="20" fill="#F8FAFC" className="stroke-slate-200" strokeWidth="2" />
            
            {/* Camera Gimbal Hub */}
            <circle cx="100" cy="80" r="14" fill="#334155" />
            {/* Glowing Camera Lens */}
            <circle cx="100" cy="80" r="6" fill="#06B6D4" />
            <circle cx="98" cy="78" r="2" fill="#FFFFFF" />

            {/* Status Indicator Lights */}
            <circle cx="75" cy="55" r="3.5" fill="#EF4444" className="animate-pulse" />
            <circle cx="125" cy="55" r="3.5" fill="#10B981" className="animate-pulse" />
            
            {/* Core Drone Logo/Decal */}
            <path d="M 95,50 L 105,50 M 100,45 L 100,55" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          {/* Glowing IoT Connection Lines originating from drone */}
          <div className="absolute top-[80px] w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></div>
          
          {/* Miniature Floating Drone Telemetry Badge */}
          <div className="absolute top-[105px] bg-slate-900/90 backdrop-blur-md border border-white/15 rounded-xl px-3 py-1.5 text-[9px] font-mono font-bold tracking-wider text-cyan-400 shadow-xl flex items-center gap-2 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>UAV_ONLINE // GPS_LOCK // 4K_FEED</span>
          </div>
        </div>
      </div>

      {/* 3. BREADCRUMB / TOP GLASS CONTROLLER BAR */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="backdrop-blur-md bg-slate-900/35 border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-lg">
          
          {/* Logo Brand / Back link */}
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="group flex items-center gap-2 px-3.5 py-2 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
              <span>Back to Laboratory</span>
            </button>
            <span className="text-slate-700 font-mono text-sm">|</span>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-mono font-extrabold text-emerald-400 tracking-widest uppercase">
                RECRUITMENT PORTAL
              </span>
            </div>
          </div>

          {/* Glassmorphism Navigation Tab Bar */}
          <div className="flex bg-slate-950/65 p-1 rounded-xl border border-white/5 shadow-inner self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('app')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'app'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-600/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Interactive Application</span>
            </button>
            <button
              onClick={() => setActiveTab('showcase')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'showcase'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-600/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Mockup Presentation</span>
            </button>
          </div>

        </div>
      </header>

      {/* 4. MAIN LAYOUT: SPLIT SCREEN (HERO CONTENT LEFT vs. GLASSMOCK FORM RIGHT) */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10 flex flex-col justify-center">
        
        {activeTab === 'app' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* ============================================== */}
            {/* LEFT COL: HERO CONTENT SECTION (7 Columns)     */}
            {/* ============================================== */}
            <div className="lg:col-span-7 space-y-8 text-left animate-fade-in">
              
              {/* Small Glowing Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 backdrop-blur-md border border-emerald-500/20 rounded-full px-4 py-1.5 shadow-lg select-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-mono font-extrabold tracking-wider text-emerald-400 uppercase">
                  🚀 Join Smart Grow Laboratory
                </span>
              </div>

              {/* Large Display Heading */}
              <div className="space-y-4">
                <h1 className="font-display text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                  Build the Future <br />
                  of Smart Agriculture <br />
                  <span className="bg-gradient-to-r from-[#22C55E] via-[#10B981] to-[#2E86FF] bg-clip-text text-transparent">
                    with AI & IoT
                  </span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-sans leading-relaxed max-w-2xl font-medium">
                  Join a multidisciplinary research laboratory focused on Artificial Intelligence, Internet of Things, Smart Farming, Automation, Robotics, and Sustainable Agriculture. Collaborate with researchers, lecturers, and students to develop real-world innovations.
                </p>
              </div>

              {/* Visual mini-statistics or highlights inside hero banner */}
              <div className="grid grid-cols-3 gap-4 py-4 max-w-md border-t border-b border-white/5">
                <div className="space-y-1">
                  <span className="text-xl sm:text-2xl font-extrabold font-display bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">100%</span>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Real Hardware</p>
                </div>
                <div className="space-y-1 border-l border-white/5 pl-4">
                  <span className="text-xl sm:text-2xl font-extrabold font-display bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">IoT + AI</span>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Core Focus</p>
                </div>
                <div className="space-y-1 border-l border-white/5 pl-4">
                  <span className="text-xl sm:text-2xl font-extrabold font-display bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">3+</span>
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Active Grants</p>
                </div>
              </div>

              {/* Primary / Secondary CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a 
                  href="#application-form-card"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-6 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
                <button 
                  onClick={() => setActiveTab('showcase')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>Explore Our Research</span>
                </button>
              </div>

            </div>

            {/* ============================================== */}
            {/* RIGHT COL: APPLICATION FORM CARD (5 Columns)   */}
            {/* ============================================== */}
            <div className="lg:col-span-5 flex items-center justify-center" id="application-form-card">
              <div className="w-full max-w-lg rounded-[24px] bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-emerald-500/20">
                
                {/* Decorative scanning line effect across top of card */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-pulse"></div>
                
                {/* Visual form success state */}
                {isSuccess ? (
                  <div className="text-center py-8 space-y-6 animate-scale-up">
                    <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/5">
                      <CheckCircle2 className="h-10 w-10 animate-bounce" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-display text-xl font-bold text-white">Application Sent!</h3>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-md mx-auto">
                        Thank you for your interest in joining Smart Grow Laboratory. Your information has been safely registered in our local system database. Our research Leads will reach out to you via email.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={handleResetForm}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-bold text-slate-200 hover:bg-white/10 transition-all cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Submit Another</span>
                      </button>
                      <button
                        onClick={onBack}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 text-xs font-bold hover:shadow-lg transition-all cursor-pointer"
                      >
                        <span>Back to Home</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    
                    {/* Form header inside card */}
                    <div className="border-b border-white/5 pb-4 mb-2 flex items-center justify-between">
                      <div>
                        <h2 className="font-display text-base font-bold text-white">Application Form</h2>
                        <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Secure Cloud Database Sync</p>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                        <FileText className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Full Name field */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono font-extrabold tracking-wider text-slate-400 uppercase flex items-center gap-1.5 px-0.5">
                        <User className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Full Name</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="text"
                          required
                          placeholder="e.g. Shara Anjelia"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full rounded-[14px] border border-white/10 bg-slate-950/40 hover:bg-slate-950/60 focus:bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 font-medium"
                        />
                        {isNameFilled && (
                          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 animate-scale-up">
                            <Check className="h-4 w-4 stroke-[3]" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Email field */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono font-extrabold tracking-wider text-slate-400 uppercase flex items-center gap-1.5 px-0.5">
                        <Mail className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Student / General Email</span>
                      </label>
                      <div className="relative">
                        <input 
                          type="email"
                          required
                          placeholder="e.g. shara@student.telkomuniversity.ac.id"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-[14px] border border-white/10 bg-slate-950/40 hover:bg-slate-950/60 focus:bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 font-medium"
                        />
                        {isEmailFilled && (
                          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400 animate-scale-up">
                            <Check className="h-4 w-4 stroke-[3]" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Role field */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono font-extrabold tracking-wider text-slate-400 uppercase flex items-center gap-1.5 px-0.5">
                        <Briefcase className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Role of Interest</span>
                      </label>
                      <div className="relative">
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full appearance-none rounded-[14px] border border-white/10 bg-slate-950/40 hover:bg-slate-950/60 focus:bg-slate-950 px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 font-medium cursor-pointer pr-10"
                        >
                          <option value="IoT Specialist / Hardware Engineer" className="bg-slate-900 text-white">IoT Specialist / Hardware Engineer</option>
                          <option value="Machine Learning / AI Developer" className="bg-slate-900 text-white">Machine Learning / AI Developer</option>
                          <option value="Smart Agriculture & Agronomy Researcher" className="bg-slate-900 text-white">Smart Agriculture & Agronomy Researcher</option>
                          <option value="Full-stack Cyber-Physical Web Developer" className="bg-slate-900 text-white">Full-stack Cyber-Physical Web Developer</option>
                          <option value="Hardware Instrumentation Engineer" className="bg-slate-900 text-white">Hardware Instrumentation Engineer</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 text-[9px]">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Motivation field */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono font-extrabold tracking-wider text-slate-400 uppercase flex items-center gap-1.5 px-0.5">
                        <Heart className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Motivation Statement</span>
                      </label>
                      <div className="relative">
                        <textarea
                          required
                          rows={3}
                          placeholder="Briefly describe your skillsets and why you want to collaborate on smart agricultural solutions."
                          value={motivation}
                          onChange={(e) => setMotivation(e.target.value)}
                          className="w-full rounded-[14px] border border-white/10 bg-slate-950/40 hover:bg-slate-950/60 focus:bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 font-medium leading-relaxed"
                        />
                        {isMotivationFilled && (
                          <span className="absolute right-3.5 top-4 text-emerald-400 animate-scale-up">
                            <Check className="h-4 w-4 stroke-[3]" />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Github & Instagram field group */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono font-extrabold tracking-wider text-slate-400 uppercase flex items-center gap-1.5 px-0.5">
                          <Github className="h-3.5 w-3.5 text-slate-400" />
                          <span>Github Account</span>
                        </label>
                        <input 
                          type="url"
                          placeholder="https://github.com/username"
                          value={github}
                          onChange={(e) => setGithub(e.target.value)}
                          className="w-full rounded-[14px] border border-white/10 bg-slate-950/40 hover:bg-slate-950/60 focus:bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 font-medium"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono font-extrabold tracking-wider text-slate-400 uppercase flex items-center gap-1.5 px-0.5">
                          <Instagram className="h-3.5 w-3.5 text-slate-400" />
                          <span>Instagram Account</span>
                        </label>
                        <input 
                          type="text"
                          placeholder="@your_username"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                          className="w-full rounded-[14px] border border-white/10 bg-slate-950/40 hover:bg-slate-950/60 focus:bg-slate-950 px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 font-medium"
                        />
                      </div>
                    </div>

                    {/* Submit Button with Custom Gradient */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative w-full overflow-hidden rounded-[14px] bg-gradient-to-r from-emerald-500 via-[#10B981] to-[#2E86FF] hover:opacity-95 px-8 py-3.5 text-xs font-extrabold tracking-wider uppercase text-white shadow-xl shadow-emerald-500/15 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                            <span>Registering Profile...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit Application</span>
                            <Send className="h-3.5 w-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Progress micro checklist indicator */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-slate-400">
                      <div className="flex gap-2">
                        <span className={isNameFilled ? 'text-emerald-400' : ''}>[NAME]</span>
                        <span className={isEmailFilled ? 'text-emerald-400' : ''}>[EMAIL]</span>
                        <span className={isMotivationFilled ? 'text-emerald-400' : ''}>[MOTIVATION]</span>
                      </div>
                      <span className="animate-pulse text-cyan-400 font-bold">● ACTIVE SYNC</span>
                    </div>

                  </form>
                )}

              </div>
            </div>

          </div>
        ) : (
          /* ==============================================
             VIEW 2: PRESENTATION BOARD SHOWCASE
             ============================================== */
          <div className="animate-fade-in space-y-12">
            <div className="relative w-full rounded-[24px] bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 sm:p-10 lg:p-14 shadow-2xl overflow-hidden flex flex-col gap-12">
              
              {/* Board Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-extrabold text-emerald-400 uppercase tracking-widest">HI-FI CASE STUDY MOCKUP</span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">Presentation Showcase</h2>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Active Live Device Sync</span>
                </div>
              </div>

              {/* Grid: Mockup Screens */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Board Left Container (7 Cols) */}
                <div className="lg:col-span-7 bg-slate-950/60 rounded-[20px] p-6 shadow-xl border border-white/5 space-y-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center text-xs font-bold">
                        <Sprout className="h-4 w-4" />
                      </div>
                      <span className="text-[11px] font-mono font-extrabold tracking-widest text-white uppercase">SMART GROW LAB</span>
                    </div>
                    <span className="h-5 w-5 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-slate-500">✕</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-7 space-y-4">
                      <h3 className="font-display text-2xl font-extrabold text-white leading-tight">
                        APPLY TO <br />
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">JOIN THE LAB</span>
                      </h3>
                      <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                        Join our multidisciplinary research laboratory bridging advanced hardware instrumentation, cloud automation, AI systems and agronomic research.
                      </p>

                      {/* Mock Form visual placeholders */}
                      <div className="space-y-2 pt-2 text-[9px] font-mono">
                        <div className="bg-white/5 rounded-lg p-2 border border-white/5">NAMA LENGKAP: e.g. Shara Anjelia</div>
                        <div className="bg-white/5 rounded-lg p-2 border border-white/5">EMAIL: e.g. shara@student</div>
                      </div>
                    </div>

                    <div className="md:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between aspect-square">
                      <div className="flex gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500/40"></span>
                        <span className="w-2 h-2 rounded-full bg-teal-500/40"></span>
                      </div>
                      <div className="text-center py-4">
                        <span className="text-3xl select-none animate-bounce" style={{ animationDuration: '3s' }}>🪴</span>
                        <p className="font-mono text-[9px] text-slate-400 mt-2 font-bold uppercase">DIGITAL_FORM_V2</p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-1 w-full bg-white/10 rounded"></div>
                        <div className="h-1 w-[80%] bg-white/10 rounded"></div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 text-white py-3 rounded-xl font-bold text-xs shadow-md uppercase tracking-wider flex items-center justify-center gap-1.5" disabled>
                    <span>Submit Application</span>
                    <Send className="h-3 w-3" />
                  </button>
                </div>

                {/* Device Mockups (5 Cols) */}
                <div className="lg:col-span-5 flex flex-col sm:flex-row gap-8 justify-center items-center">
                  
                  {/* Laptop Mockup */}
                  <div className="w-full max-w-[280px] flex flex-col items-center">
                    <span className="text-[10px] font-mono text-slate-400 mb-1.5 uppercase tracking-wide">Desktop Layout</span>
                    <div className="relative w-full aspect-[16/10] rounded-t-[14px] bg-slate-800 p-2.5 shadow-2xl border border-white/10">
                      <div className="w-full h-full rounded-[8px] bg-slate-950 border border-slate-900 overflow-hidden p-2 text-[6px] space-y-1 text-slate-300">
                        <div className="flex justify-between items-center border-b border-white/5 pb-1">
                          <span className="font-extrabold text-[5px]">SMART GROW LAB</span>
                          <span className="bg-emerald-500 px-1 rounded-full text-[4px]">Apply</span>
                        </div>
                        <div className="text-center py-1 font-display">
                          <h4 className="font-extrabold text-white text-[8px]">APPLY NOW</h4>
                          <p className="text-[4px] text-slate-500">Research Center</p>
                        </div>
                        <div className="h-2.5 bg-white/5 rounded-[4px] border border-white/5"></div>
                        <div className="h-2.5 bg-white/5 rounded-[4px] border border-white/5"></div>
                        <div className="h-2.5 bg-emerald-500 rounded-[4px]"></div>
                      </div>
                    </div>
                    <div className="w-[105%] h-2 bg-slate-700 rounded-b-[6px] border-t border-slate-600"></div>
                  </div>

                  {/* Smartphone Mockup */}
                  <div className="relative w-full max-w-[150px] flex flex-col items-center">
                    <span className="text-[10px] font-mono text-slate-400 mb-1.5 uppercase tracking-wide">Mobile Layout</span>
                    <div className="relative w-full aspect-[9/19] rounded-[24px] bg-slate-800 border-[4px] border-slate-950 p-2 shadow-2xl border-white/10">
                      <div className="w-full h-full rounded-[18px] bg-slate-950 overflow-hidden p-2 text-[6px] flex flex-col justify-between text-slate-300">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center border-b border-white/5 pb-1">
                            <span className="font-extrabold text-[5px]">SMART GROW</span>
                          </div>
                          <h4 className="font-extrabold text-[7px] text-white">Join Lab</h4>
                          <div className="space-y-1">
                            <div className="h-2 border border-white/5 rounded"></div>
                            <div className="h-2 border border-white/5 rounded"></div>
                          </div>
                        </div>
                        <div className="bg-emerald-500 text-white rounded py-1 text-center text-[4px] uppercase font-bold">Submit</div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Grid: Design Highlights Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
                <div className="space-y-4">
                  <span className="text-[10px] font-mono font-extrabold text-[#2E86FF] uppercase tracking-widest">DESIGN HIGHLIGHTS</span>
                  <ul className="space-y-2 text-xs text-slate-300 font-sans font-medium">
                    <li className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-[8px] font-bold">✓</span>
                      <span>Startup landing page aesthetics conforming to Apple & Stripe standards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-[8px] font-bold">✓</span>
                      <span>Vivid full-bleed backgrounds layered with high-fidelity UI overlays</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-[8px] font-bold">✓</span>
                      <span>Glassmorphism backdrop filters for elegant layout visual hierarchy</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-mono font-extrabold text-emerald-400 uppercase tracking-widest">COLOR SCHEME PALETTE</span>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { hex: '#22C55E', label: 'Primary', desc: 'Lime Green' },
                      { hex: '#10B981', label: 'Secondary', desc: 'Mint Teal' },
                      { hex: '#2E86FF', label: 'Accent', desc: 'High Blue' },
                      { hex: '#020617', label: 'BG Dark', desc: 'Slate-950' },
                      { hex: '#FFFFFF', label: 'Text Light', desc: 'White' }
                    ].map((color) => (
                      <div key={color.hex} className="flex flex-col items-center gap-1 p-1.5 bg-slate-950/60 rounded-xl border border-white/5 shadow-sm min-w-[65px]">
                        <div className="h-6 w-6 rounded shadow-inner" style={{ backgroundColor: color.hex }}></div>
                        <div className="text-center leading-tight">
                          <span className="font-bold text-[8px] text-slate-200 block">{color.label}</span>
                          <span className="font-mono text-[7px] text-slate-400 block">{color.hex}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* 5. BOTTOM CARDS BAR SECTION */}
      {activeTab === 'app' && (
        <section className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Collaborate & Learn */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:shadow-xl hover:border-emerald-500/20 hover:-translate-y-1 transition-all duration-300">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-white mb-1.5">Collaborate & Learn</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Work directly with field experts and senior specialists on innovative engineering and cyber-agricultural projects.
              </p>
            </div>

            {/* Card 2: Impactful Research */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:shadow-xl hover:border-emerald-500/20 hover:-translate-y-1 transition-all duration-300">
              <div className="h-10 w-10 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] flex items-center justify-center mb-4">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-white mb-1.5">Impactful Research</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Build solutions targeting real global agriculture challenges including water conservation and smart automation.
              </p>
            </div>

            {/* Card 3: Hands-on Experience */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:shadow-xl hover:border-[#2E86FF]/20 hover:-translate-y-1 transition-all duration-300">
              <div className="h-10 w-10 rounded-xl bg-[#2E86FF]/10 border border-[#2E86FF]/20 text-[#2E86FF] flex items-center justify-center mb-4">
                <Network className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-white mb-1.5">Hands-on Experience</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Explore real cybernetic hardware instrumentation, wireless sensor networks, and IoT control nodes.
              </p>
            </div>

            {/* Card 4: Supportive Community */}
            <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:shadow-xl hover:border-emerald-500/20 hover:-translate-y-1 transition-all duration-300">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Users className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-bold text-white mb-1.5">Supportive Community</h3>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Be part of a highly passionate, multidisciplinary, and rapidly growing collaborative research team.
              </p>
            </div>

          </div>
        </section>
      )}

    </div>
  );
}
