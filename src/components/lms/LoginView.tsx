import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, UserRole } from '../../types';
import { initialUsers } from '../../data/lmsData';
import Logo from '../Logo';
import TelkomLogo from '../TelkomLogo';
import { 
  Lock, 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Eye,
  EyeOff,
  Users,
  FlaskConical,
  ClipboardCheck,
  Cpu,
  Sprout,
  ArrowRight,
  Building2,
  BookOpen,
  Maximize2
} from 'lucide-react';

// Telkom University Smart Grow Laboratory Hydroponic Harvest Team Photo Background SVG
export const TELKOM_HYDROPONIC_TEAM_PHOTO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <linearGradient id="bgWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4F6068" />
      <stop offset="50%" stop-color="#78909C" />
      <stop offset="100%" stop-color="#37474F" />
    </linearGradient>
    <linearGradient id="bannerBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E0F2F1" />
      <stop offset="50%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#E8F5E9" />
    </linearGradient>
    <linearGradient id="kangkungGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#AEEA00" />
      <stop offset="40%" stop-color="#76FF03" />
      <stop offset="100%" stop-color="#1B5E20" />
    </linearGradient>
    <linearGradient id="pakcoyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#B2FF59" />
      <stop offset="50%" stop-color="#4CAF50" />
      <stop offset="100%" stop-color="#2E7D32" />
    </linearGradient>
    <linearGradient id="vestGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2E7D32" />
      <stop offset="100%" stop-color="#1B5E20" />
    </linearGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- Greenhouse Background Wall & Roof Mesh Structure -->
  <rect width="1920" height="1080" fill="url(#bgWall)"/>
  <rect width="1920" height="160" fill="#1A2024" opacity="0.9"/>
  <path d="M0 0 L1920 0 L1920 160 M0 40 L1920 40 M0 80 L1920 80 M0 120 L1920 120" stroke="#37474F" stroke-width="3"/>
  <path d="M0 0 L1920 160 M1920 0 L0 160" stroke="#263238" stroke-width="2" opacity="0.6"/>

  <!-- TELKOM UNIVERSITY BANNER: "Panen Hasil Hidroponik" -->
  <g transform="translate(420, 120)" filter="url(#dropShadow)">
    <rect width="1080" height="420" rx="16" fill="url(#bannerBg)" stroke="#4DB6AC" stroke-width="4"/>
    
    <!-- Banner Header Logos: DCS, Fakultas Ilmu Terapan, Telkom University -->
    <circle cx="70" cy="55" r="24" fill="#0288D1"/>
    <text x="70" y="61" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="14" fill="#FFFFFF">DCS</text>

    <text x="860" y="45" font-family="sans-serif" font-weight="bold" font-size="15" fill="#00695C">Fakultas Ilmu Terapan</text>
    <text x="860" y="63" font-family="sans-serif" font-size="12" fill="#546E7A">School of Applied Science</text>
    <text x="1000" y="45" font-family="sans-serif" font-weight="900" font-size="20" fill="#C62828">Telkom</text>
    <text x="1000" y="63" font-family="sans-serif" font-weight="bold" font-size="13" fill="#37474F">University</text>
    
    <!-- Banner Title text -->
    <text x="540" y="195" text-anchor="middle" font-family="'Times New Roman', serif" font-weight="bold" font-size="52" fill="#1B5E20">🌿 Panen Hasil Hidroponik 🌿</text>
    <text x="540" y="240" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="22" font-style="italic" fill="#004D40">TIM RISET SMART GROW LABORATORY</text>
    <text x="540" y="275" text-anchor="middle" font-family="sans-serif" font-weight="600" font-size="16" fill="#00796B">TELKOM UNIVERSITY • BANDUNG</text>

    <!-- Sprout Icon on Banner -->
    <circle cx="540" cy="330" r="32" fill="#81C784" opacity="0.3"/>
    <path d="M540 310 C520 325 520 350 540 355 C560 350 560 325 540 310 Z" fill="#2E7D32"/>
  </g>

  <!-- RESEARCHERS & TEAM (6 FIGURES IN CENTER) -->
  
  <!-- Person 1: Male Researcher Far Left (Holding Kangkung) -->
  <g transform="translate(140, 390)">
    <path d="M70 170 C20 170 0 250 0 380 L180 380 C180 250 120 170 70 170 Z" fill="url(#vestGrad)"/>
    <circle cx="90" cy="90" r="52" fill="#D7CCC8"/>
    <path d="M45 80 C45 40 135 40 135 80 Z" fill="#3E2723"/>
    <!-- Kangkung Bunch -->
    <path d="M120 220 Q180 130 200 160 Q180 240 120 250 Z" fill="url(#kangkungGrad)"/>
  </g>

  <!-- Person 2: Prof. Dr. Indrarini (Female Director with Pink Blazer & Pink Hijab) -->
  <g transform="translate(380, 410)">
    <!-- Pink Hijab -->
    <path d="M90 20 C35 20 15 70 15 150 C15 250 45 290 90 290 C135 290 165 250 165 150 C165 70 145 20 90 20 Z" fill="#F48FB1"/>
    <!-- Black Undercap (Ciput) -->
    <path d="M60 70 C60 55 75 48 90 48 C105 48 120 55 120 70 Z" fill="#212121"/>
    <!-- Face -->
    <ellipse cx="90" cy="115" rx="38" ry="46" fill="#FADBC8"/>
    <!-- Lipstick Smile -->
    <path d="M76 138 C83 148 97 148 104 138 C97 143 83 143 76 138 Z" fill="#D81B60"/>
    <!-- Tailored Pink Blazer & Dark Top -->
    <path d="M25 230 L155 230 L165 380 L15 380 Z" fill="#F06292"/>
    <path d="M60 230 L90 280 L120 230 Z" fill="#1A237E"/>
    <!-- Chanel Style Brooch -->
    <circle cx="48" cy="260" r="7" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
    <circle cx="54" cy="260" r="7" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
  </g>

  <!-- Person 3: Male Researcher Center Left (Holding Fresh Selada) -->
  <g transform="translate(620, 370)">
    <path d="M80 180 C30 180 0 260 0 380 L190 380 C190 260 130 180 80 180 Z" fill="#B71C1C"/>
    <path d="M20 210 L170 210 L180 380 L10 380 Z" fill="url(#vestGrad)"/>
    <circle cx="95" cy="95" r="55" fill="#D7CCC8"/>
    <path d="M48 82 C48 40 142 40 142 82 Z" fill="#212121"/>
    <!-- Glasses -->
    <rect x="66" y="86" width="24" height="16" rx="3" fill="none" stroke="#212121" stroke-width="3"/>
    <rect x="100" y="86" width="24" height="16" rx="3" fill="none" stroke="#212121" stroke-width="3"/>
    <line x1="90" y1="94" x2="100" y2="94" stroke="#212121" stroke-width="3"/>
    <!-- Smile -->
    <path d="M80 120 Q95 132 110 120" stroke="#3E2723" stroke-width="3" fill="none"/>
    <!-- Holding Selada Hydroponic -->
    <circle cx="120" cy="220" r="50" fill="#AEEA00"/>
    <circle cx="100" cy="210" r="38" fill="#76FF03"/>
    <circle cx="135" cy="215" r="38" fill="#64DD17"/>
  </g>

  <!-- Person 4: Male Researcher Center Right (Holding Pakcoy + Thumbs Up) -->
  <g transform="translate(880, 360)">
    <path d="M80 180 C30 180 0 260 0 380 L190 380 C190 260 130 180 80 180 Z" fill="#6A1B9A"/>
    <path d="M18 210 L172 210 L182 380 L8 380 Z" fill="url(#vestGrad)"/>
    <circle cx="95" cy="95" r="54" fill="#FFE0B2"/>
    <path d="M50 80 C50 40 140 40 140 80 Z" fill="#3E2723"/>
    <path d="M78 122 Q95 134 112 122" stroke="#3E2723" stroke-width="3.5" fill="none"/>
    <!-- Thumbs Up Hand -->
    <path d="M-10 220 L-25 180 L-10 170 L5 200 Z" fill="#FFE0B2" stroke="#5D4037" stroke-width="2"/>
    <!-- Fresh Pakcoy in Hand -->
    <path d="M130 230 Q180 160 200 210 Q180 270 130 250 Z" fill="url(#pakcoyGrad)"/>
  </g>

  <!-- Person 5: Male Researcher Right (Thumbs Up) -->
  <g transform="translate(1140, 380)">
    <path d="M80 170 C30 170 0 250 0 380 L190 380 C190 250 130 170 80 170 Z" fill="url(#vestGrad)"/>
    <circle cx="95" cy="95" r="52" fill="#D7CCC8"/>
    <path d="M48 80 C48 40 142 40 142 80 Z" fill="#212121"/>
    <!-- Thumbs Up Hand -->
    <path d="M-5 210 L-20 180 L-10 170 L10 195 Z" fill="#D7CCC8"/>
    <!-- Holding Pakcoy Plastic Container -->
    <path d="M120 210 C160 170 180 210 150 250 Z" fill="#00E676" opacity="0.9"/>
  </g>

  <!-- Person 6: Male Senior Researcher Far Right -->
  <g transform="translate(1400, 380)">
    <path d="M80 170 C30 170 0 250 0 380 L190 380 C190 250 130 170 80 170 Z" fill="url(#vestGrad)"/>
    <circle cx="95" cy="95" r="52" fill="#D7CCC8"/>
    <path d="M48 80 C48 40 142 40 142 80 Z" fill="#37474F"/>
    <path d="M-5 200 L-20 170 L-10 160 L10 185 Z" fill="#D7CCC8"/>
    <circle cx="130" cy="220" r="45" fill="#B2FF59"/>
  </g>

  <!-- FOREGROUND: DENSE VIBRANT LUSH GREEN HYDROPONIC KANGKUNG & PAKCOY CROPS -->
  <g transform="translate(0, 680)">
    <!-- Base Hydroponic PVC Tubes -->
    <rect x="0" y="280" width="1920" height="120" fill="#ECEFF1" stroke="#B0BEC5" stroke-width="4"/>
    
    <!-- Dense Plant Layer 1 (Dark Emerald Leaves) -->
    <path d="M-20 100 C120 -10 240 150 360 30 C480 160 600 0 720 70 C840 -20 960 130 1080 20 C1200 150 1320 10 1440 80 C1560 -10 1680 140 1800 30 C1880 70 1920 100 1940 80 L1940 400 L-20 400 Z" fill="#1B5E20"/>

    <!-- Dense Plant Layer 2 (Vibrant Leafy Green) -->
    <path d="M-20 160 C100 40 220 200 340 70 C460 210 580 50 700 130 C820 20 940 180 1060 60 C1180 200 1300 40 1420 120 C1540 30 1660 190 1780 70 C1860 120 1920 160 1940 140 L1940 400 L-20 400 Z" fill="#2E7D32"/>

    <!-- Dense Plant Layer 3 (Ultra-Vibrant Lime Kangkung & Pakcoy Tops) -->
    <path d="M-20 220 C80 90 180 250 280 110 C380 240 480 80 580 170 C680 60 780 220 880 100 C980 230 1080 80 1180 160 C1280 70 1380 230 1480 110 C1580 240 1680 90 1780 160 C1860 130 1920 180 1940 160 L1940 400 L-20 400 Z" fill="#76FF03"/>

    <!-- Kangkung Sharp Blade Spreads -->
    <path d="M80 220 L110 70 L140 220 M280 240 L310 90 L340 240 M520 230 L550 60 L580 230 M760 250 L790 80 L820 250 M1020 240 L1050 70 L1080 240 M1280 230 L1310 60 L1340 230 M1560 250 L1590 80 L1620 250 M1780 240 L1810 70 L1840 240" stroke="#CCFF90" stroke-width="9" stroke-linecap="round" fill="none"/>
  </g>
</svg>
`)}`;

interface LoginViewProps {
  onLogin: (user: User) => void;
  users?: User[];
  onBackToSite?: () => void;
  onBack?: () => void;
}

type AuthTab = 'login' | 'register' | 'forgot';

export default function LoginView({ onLogin, users = initialUsers, onBackToSite, onBack }: LoginViewProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('director');
  const [isBlurActive, setIsBlurActive] = useState(true);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  
  // Register Form states
  const [regFullName, setRegFullName] = useState('');
  const [regUniversity, setRegUniversity] = useState('Telkom University');
  const [regStudyProgram, setRegStudyProgram] = useState('S1 Informatika');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  // Forgot Password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Quick switch demo role preset handler
  const handleSelectPreset = (role: UserRole) => {
    setSelectedRole(role);
    setError('');
    const targetUser = users.find(u => u.role === role) || initialUsers.find(u => u.role === role);
    if (targetUser) {
      setEmail(targetUser.email);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      setIsLoading(false);
      const cleanEmail = email.trim().toLowerCase();
      
      // 1. Search by exact email match in users or initialUsers
      let foundUser = users.find(u => u.email.toLowerCase() === cleanEmail) 
        || initialUsers.find(u => u.email.toLowerCase() === cleanEmail);

      // 2. If not found by exact email, check domain or email keywords
      if (!foundUser) {
        if (cleanEmail.includes('azliny') || cleanEmail.includes('assistant') || cleanEmail.includes('asisten')) {
          foundUser = users.find(u => u.role === 'assistant') || initialUsers.find(u => u.role === 'assistant');
        } else if (cleanEmail.includes('shara') || cleanEmail.includes('student') || cleanEmail.includes('mahasiswa') || cleanEmail.endsWith('@student.telkomuniversity.ac.id')) {
          foundUser = users.find(u => u.email.toLowerCase().includes('shara')) 
            || users.find(u => u.role === 'student') 
            || initialUsers.find(u => u.role === 'student');
        } else if (cleanEmail.includes('indrarini') || cleanEmail.includes('director') || cleanEmail.includes('direktur')) {
          foundUser = users.find(u => u.role === 'director') || initialUsers.find(u => u.role === 'director');
        } else if (cleanEmail.includes('admin')) {
          foundUser = users.find(u => u.role === 'admin') || initialUsers.find(u => u.role === 'admin');
        }
      }

      if (foundUser) {
        onLogin(foundUser);
      } else {
        setError('Pengguna dengan email tersebut tidak ditemukan. Silakan periksa kembali email Anda.');
      }
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      setError('Password dan Konfirmasi Password tidak cocok!');
      return;
    }
    setIsLoading(true);
    setError('');
    setTimeout(() => {
      setIsLoading(false);
      setRegSuccess(true);
      setTimeout(() => {
        setRegSuccess(false);
        setActiveTab('login');
        setEmail(regEmail || 'azlinyazreen@student.telkomuniversity.ac.id');
      }, 1500);
    }, 800);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResetSent(true);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between items-center py-6 px-4 overflow-x-hidden font-sans text-[#1F2937] selection:bg-[#2E7D32] selection:text-white bg-slate-900">
      
      {/* 1. FULL-SCREEN SMART GROW LABORATORY TEAM HARVEST PHOTO BACKGROUND */}
      <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <img 
          src={TELKOM_HYDROPONIC_TEAM_PHOTO_SVG}
          alt="Foto Tim Riset Panen Hasil Hidroponik Telkom University"
          className={`w-full h-full object-cover transition-all duration-700 ${
            isBlurActive ? 'blur-[6px] scale-105 brightness-95 contrast-[1.05]' : 'blur-0 scale-100 brightness-100'
          }`}
        />
        
        {/* Soft emerald dark tint overlay (instead of washed-out white) to bring out background colors */}
        <div className="absolute inset-0 bg-emerald-950/20 backdrop-brightness-95" />
        
        {/* Soft green ambient gradient light accents */}
        <div className="absolute top-10 left-10 w-[500px] h-[500px] bg-[#66BB6A]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[#2E7D32]/25 rounded-full blur-[120px]" />
      </div>

      {/* 2. TOP FLOATING BAR WITH BACKGROUND TOGGLE */}
      <header className="relative z-20 max-w-[1100px] w-full flex flex-wrap items-center justify-between gap-3 mb-4 px-2">
        <button
          onClick={onBack || onBackToSite}
          className="group flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/85 hover:bg-white border border-white/80 text-xs font-semibold text-slate-800 hover:text-[#2E7D32] transition-all cursor-pointer shadow-md backdrop-blur-md"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform text-[#2E7D32]" />
          <span>Kembali ke Website Utama</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white/90 border border-emerald-300 px-3.5 py-1.5 rounded-full text-[11px] font-mono text-[#2E7D32] shadow-md backdrop-blur-md font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2E7D32] animate-pulse"></span>
            <span>TIM PANEN HIDROPONIK TELKOM UNIVERSITY</span>
          </div>
        </div>
      </header>

      {/* 3. MAIN GLASSMORPHISM AUTHENTICATION CARD (1100px x 650px) */}
      <main className="relative z-20 w-full max-w-[1100px] my-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full min-h-[640px] rounded-[32px] bg-white/85 backdrop-blur-xl border border-white/80 shadow-2xl shadow-emerald-950/30 overflow-hidden flex flex-col lg:flex-row relative"
        >
          {/* TWO PANELS WITH SMOOTH SLIDING LAYOUT TRANSITION */}
          <div className={`w-full flex flex-col lg:flex-row transition-all duration-700 ease-in-out ${
            activeTab === 'register' ? 'lg:flex-row-reverse' : 'lg:flex-row'
          }`}>

            {/* LEFT PANEL (45% Width) - Branding, Logos, Hydroponic Illustration & Decorative Blobs */}
            <motion.div 
              layout
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full lg:w-[45%] p-8 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-white/90 via-emerald-50/70 to-teal-50/60 backdrop-blur-md relative overflow-hidden border-b lg:border-b-0 lg:border-r border-emerald-100 min-h-[500px] lg:min-h-[640px]"
            >
              {/* Background Organic Shapes & Leaves Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#66BB6A]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-[#2E7D32]/15 rounded-full blur-3xl pointer-events-none" />
              
              {/* Top Branding Logos */}
              <div className="relative z-10 flex items-center justify-between gap-4 pb-6 border-b border-emerald-900/10">
                {/* Smart Grow Lab Brand Logo matching main website */}
                <div className="flex items-center">
                  <Logo variant="navbar" />
                </div>

                {/* Telkom University Official Logo */}
                <div className="flex items-center px-3 py-1.5 rounded-2xl bg-white/95 border border-slate-200/80 shadow-xs backdrop-blur-md">
                  <TelkomLogo className="h-8 sm:h-9" />
                </div>
              </div>

              {/* Title, Subtitle & Tagline */}
              <div className="relative z-10 my-auto py-6 space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E7D32]/10 border border-[#2E7D32]/20 text-[#2E7D32] text-xs font-mono font-bold">
                      <Sparkles className="h-3.5 w-3.5 text-[#2E7D32]" />
                      <span>
                        {activeTab === 'login' && 'Smart Grow Research Portal'}
                        {activeTab === 'register' && 'New Intern Registration'}
                        {activeTab === 'forgot' && 'Account Security Recovery'}
                      </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-black text-[#1F2937] font-display tracking-tight leading-none">
                      Smart Grow <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E7D32] via-[#388E3C] to-[#66BB6A]">
                        Laboratory
                      </span>
                    </h1>

                    <p className="text-base font-semibold text-[#2E7D32]">
                      Research Portal
                    </p>

                    <div className="inline-block px-3 py-1 rounded-lg bg-emerald-100/80 border border-emerald-200 text-[11px] font-bold text-[#2E7D32] tracking-wide">
                      Research • Innovation • Sustainable Agriculture
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans pt-1 max-w-sm">
                      Akses terpadu alur kerja magang, presensi mahasiswa, telemetri sensor hidroponik, dan verifikasi riset Pembina Lab.
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Hydroponic Greenhouse Visual Card - Telkom Indonesia Smart Grow System */}
                <div className="relative rounded-2xl overflow-hidden border border-emerald-200/80 bg-white/60 p-2.5 shadow-md group">
                  <div className="relative h-36 w-full rounded-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
                      alt="Smart Grow Hydroponic System Telkom University"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Top Telkom Indonesia Hydroponic Tag Overlay */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-emerald-300/60 shadow-xs">
                      <TelkomLogo variant="icon-only" className="h-3.5 w-auto shrink-0" />
                      <span className="text-[10px] font-bold text-slate-800 tracking-tight">Telkom University Hydroponic Rack</span>
                    </div>

                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-[9px] font-mono font-bold backdrop-blur-md border border-emerald-500/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>LIVE TELEMETRY</span>
                    </div>

                    {/* Bottom Gradient Text Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-3 text-white flex items-end justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-emerald-300 font-bold block uppercase tracking-wider">LABORATORY FEATURE</span>
                        <span className="text-xs font-bold font-display">IoT Hydroponic Telemetry & Automation</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-300 font-semibold bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-400/30">
                        Panen Hidroponik
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Decorative Footer */}
              <div className="relative z-10 pt-4 border-t border-emerald-900/10 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Telkom University Research Center</span>
                <span className="text-[#2E7D32] font-bold">v3.8 Stable</span>
              </div>
            </motion.div>

            {/* RIGHT PANEL (55% Width) - Auth Tabs & Interactive Forms */}
            <div className="w-full lg:w-[55%] p-8 sm:p-10 flex flex-col justify-between bg-white/70 backdrop-blur-xl relative">
              
              {/* Navigation Tabs Header */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-200/80 pb-3 mb-6">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => { setActiveTab('login'); setError(''); }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
                        activeTab === 'login' 
                          ? 'text-[#2E7D32] bg-emerald-50 border border-emerald-200/80 shadow-xs' 
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
                      }`}
                    >
                      <span>Login</span>
                      {activeTab === 'login' && (
                        <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#2E7D32] rounded-full" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => { setActiveTab('register'); setError(''); }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
                        activeTab === 'register' 
                          ? 'text-[#2E7D32] bg-emerald-50 border border-emerald-200/80 shadow-xs' 
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
                      }`}
                    >
                      <span>Register</span>
                      {activeTab === 'register' && (
                        <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#2E7D32] rounded-full" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => { setActiveTab('forgot'); setError(''); }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer relative ${
                        activeTab === 'forgot' 
                          ? 'text-[#2E7D32] bg-emerald-50 border border-emerald-200/80 shadow-xs' 
                          : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
                      }`}
                    >
                      <span>Forgot Password</span>
                      {activeTab === 'forgot' && (
                        <motion.div layoutId="tabUnderline" className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#2E7D32] rounded-full" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Animated Form Content Container */}
                <AnimatePresence mode="wait">
                  
                  {/* TAB 1: LOGIN FORM */}
                  {activeTab === 'login' && (
                    <motion.div
                      key="loginForm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div>
                        <h2 className="text-2xl font-bold text-[#1F2937] font-display">
                          Welcome Back!
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                          Sign in to continue to Smart Grow Laboratory Research Portal.
                        </p>
                      </div>


                      {error && (
                        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0" />
                          <span>{error}</span>
                        </div>
                      )}

                      <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div className="space-y-1">
                          <label className="block text-xs font-semibold text-slate-700">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input 
                              type="email"
                              required
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              placeholder="Masukkan email Anda"
                              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#E5E7EB] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-xs font-semibold text-slate-700">
                            Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input 
                              type={showPassword ? 'text' : 'password'}
                              required
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                              placeholder="Masukkan password Anda"
                              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white border border-[#E5E7EB] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 transition-all"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1">
                          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-medium">
                            <input 
                              type="checkbox"
                              checked={rememberMe}
                              onChange={e => setRememberMe(e.target.checked)}
                              className="rounded border-slate-300 text-[#2E7D32] focus:ring-[#2E7D32]"
                            />
                            <span>Remember me</span>
                          </label>

                          <button
                            type="button"
                            onClick={() => setActiveTab('forgot')}
                            className="text-[#2E7D32] hover:underline font-semibold cursor-pointer"
                          >
                            Forgot Password?
                          </button>
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full py-3.5 rounded-2xl bg-[#2E7D32] hover:bg-[#1b5e20] active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-800/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
                        >
                          {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <Sprout className="h-4 w-4" />
                              <span>Enter Laboratory Portal</span>
                            </>
                          )}
                        </button>
                      </form>

                      {/* Social SSO login options */}
                      <div className="pt-2">
                        <div className="relative flex items-center justify-center my-3">
                          <div className="border-t border-slate-200 w-full" />
                          <span className="bg-white px-3 text-[10px] font-mono text-slate-400 uppercase tracking-widest shrink-0">
                            OR CONTINUE WITH
                          </span>
                          <div className="border-t border-slate-200 w-full" />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <button 
                            type="button"
                            onClick={() => handleSelectPreset('student')}
                            className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                            </svg>
                            <span>Google</span>
                          </button>

                          <button 
                            type="button"
                            onClick={() => handleSelectPreset('assistant')}
                            className="py-2.5 px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 23 23">
                              <path fill="#f35325" d="M1 1h10v10H1z"/>
                              <path fill="#81bc06" d="M12 1h10v10H12z"/>
                              <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                              <path fill="#ffba08" d="M12 12h10v10H12z"/>
                            </svg>
                            <span>365</span>
                          </button>

                          <button 
                            type="button"
                            onClick={() => handleSelectPreset('director')}
                            className="py-2.5 px-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-xs font-bold text-[#2E7D32] flex items-center justify-center gap-2 transition-all cursor-pointer"
                          >
                            <Sprout className="h-4 w-4" />
                            <span>Telkom</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: REGISTER FORM */}
                  {activeTab === 'register' && (
                    <motion.div
                      key="registerForm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <h2 className="text-2xl font-bold text-[#1F2937] font-display">
                          Pendaftaran Mahasiswa Magang
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                          Buat akun baru untuk mengajukan magang riset di Smart Grow Laboratory.
                        </p>
                      </div>

                      {regSuccess ? (
                        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                          <CheckCircle2 className="h-10 w-10 text-[#2E7D32] mx-auto animate-bounce" />
                          <h3 className="font-bold text-sm text-[#2E7D32]">Pendaftaran Berhasil!</h3>
                          <p className="text-xs text-slate-600">
                            Akun Anda telah terdaftar. Mengalihkan Anda ke halaman login...
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleRegisterSubmit} className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="block text-[11px] font-semibold text-slate-700">Nama Lengkap</label>
                              <input 
                                type="text"
                                required
                                value={regFullName}
                                onChange={e => setRegFullName(e.target.value)}
                                placeholder="e.g. Shara Anjelia"
                                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2E7D32]"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[11px] font-semibold text-slate-700">Asal Universitas</label>
                              <input 
                                type="text"
                                required
                                value={regUniversity}
                                onChange={e => setRegUniversity(e.target.value)}
                                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] text-xs text-slate-800 focus:outline-none focus:border-[#2E7D32]"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-semibold text-slate-700">Program Studi</label>
                            <input 
                              type="text"
                              required
                              value={regStudyProgram}
                              onChange={e => setRegStudyProgram(e.target.value)}
                              placeholder="e.g. S1 Informatika / S1 Teknik Telekomunikasi"
                              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] text-xs text-slate-800 focus:outline-none focus:border-[#2E7D32]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[11px] font-semibold text-slate-700">Email Instansi / Kampus</label>
                            <input 
                              type="email"
                              required
                              value={regEmail}
                              onChange={e => setRegEmail(e.target.value)}
                              placeholder="shara@student.telkomuniversity.ac.id"
                              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] text-xs text-slate-800 focus:outline-none focus:border-[#2E7D32]"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="block text-[11px] font-semibold text-slate-700">Password</label>
                              <input 
                                type="password"
                                required
                                value={regPassword}
                                onChange={e => setRegPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] text-xs text-slate-800 focus:outline-none focus:border-[#2E7D32]"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="block text-[11px] font-semibold text-slate-700">Konfirmasi Password</label>
                              <input 
                                type="password"
                                required
                                value={regConfirmPassword}
                                onChange={e => setRegConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E5E7EB] text-xs text-slate-800 focus:outline-none focus:border-[#2E7D32]"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 rounded-2xl bg-[#2E7D32] hover:bg-[#1b5e20] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer mt-2"
                          >
                            {isLoading ? 'Memproses Registrasi...' : 'Daftar Sekarang'}
                          </button>
                        </form>
                      )}
                    </motion.div>
                  )}

                  {/* TAB 3: FORGOT PASSWORD */}
                  {activeTab === 'forgot' && (
                    <motion.div
                      key="forgotForm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div>
                        <h2 className="text-2xl font-bold text-[#1F2937] font-display">
                          Reset Password Akun
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                          Masukkan email institusi yang terdaftar untuk menerima tautan pemulihan kata sandi.
                        </p>
                      </div>

                      {resetSent ? (
                        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                          <CheckCircle2 className="h-10 w-10 text-[#2E7D32] mx-auto" />
                          <h3 className="font-bold text-sm text-[#2E7D32]">Link Reset Dikirim!</h3>
                          <p className="text-xs text-slate-600">
                            Silakan periksa kotak masuk email <span className="font-bold">{forgotEmail}</span> untuk instruksi pemulihan.
                          </p>
                          <button
                            type="button"
                            onClick={() => { setActiveTab('login'); setResetSent(false); }}
                            className="px-4 py-2 rounded-xl bg-[#2E7D32] text-white font-bold text-xs cursor-pointer"
                          >
                            Kembali ke Login
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleForgotSubmit} className="space-y-4">
                          <div className="space-y-1">
                            <label className="block text-xs font-semibold text-slate-700">Email Address</label>
                            <div className="relative">
                              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                              <input 
                                type="email"
                                required
                                value={forgotEmail}
                                onChange={e => setForgotEmail(e.target.value)}
                                placeholder="indrarini@telkomuniversity.ac.id"
                                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#E5E7EB] text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2E7D32]"
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3.5 rounded-2xl bg-[#2E7D32] hover:bg-[#1b5e20] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                          >
                            {isLoading ? 'Sending Link...' : 'Send Reset Link'}
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveTab('login')}
                            className="w-full py-2.5 rounded-2xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 cursor-pointer"
                          >
                            Back to Login
                          </button>
                        </form>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Panel Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-sans">
                <span>© 2026 Smart Grow Laboratory</span>
                <span className="flex items-center gap-1 font-semibold text-[#2E7D32]">
                  <ShieldCheck className="h-3.5 w-3.5" /> Encrypted Connection
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </main>

      {/* 4. BOTTOM FLOATING GLASS STATISTIC CARDS (4 CARDS) */}
      <footer className="relative z-20 max-w-[1100px] w-full mt-6 mb-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5"
        >
          {/* Card 1 */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-lg hover:bg-white/60 transition-all flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/90 border border-emerald-300/60 text-[#2E7D32] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-black font-display text-[#1F2937] leading-none block">32</span>
              <span className="text-[11px] font-semibold text-slate-600 leading-tight block mt-0.5">Active Internship Students</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-lg hover:bg-white/60 transition-all flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/90 border border-emerald-300/60 text-[#2E7D32] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <FlaskConical className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-black font-display text-[#1F2937] leading-none block">18</span>
              <span className="text-[11px] font-semibold text-slate-600 leading-tight block mt-0.5">Research Projects</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-lg hover:bg-white/60 transition-all flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/90 border border-emerald-300/60 text-[#2E7D32] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ClipboardCheck className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-black font-display text-[#1F2937] leading-none block">245</span>
              <span className="text-[11px] font-semibold text-slate-600 leading-tight block mt-0.5">Completed Tasks</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-4 shadow-lg hover:bg-white/60 transition-all flex items-center gap-3.5 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/90 border border-emerald-300/60 text-[#2E7D32] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Sprout className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-black font-display text-[#1F2937] leading-none block">6</span>
              <span className="text-[11px] font-semibold text-slate-600 leading-tight block mt-0.5">Active Laboratories</span>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-[11px] font-sans text-slate-500 mt-4">
          © 2026 Smart Grow Laboratory • Telkom University Research Center
        </p>
      </footer>

    </div>
  );
}
