import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { 
  User, 
  Task, 
  AttendanceRecord, 
  LmsProject, 
  Announcement, 
  TaskStatus 
} from '../../types';
import ProfileView from './ProfileView';
import CheckInCameraModal from './CheckInCameraModal';
import RevisionDetailModal from './RevisionDetailModal';
import AttendanceView from './AttendanceView';
import { 
  Clock, 
  CheckSquare, 
  FolderKanban, 
  Megaphone, 
  UserCheck, 
  CheckCircle2, 
  Upload, 
  Github, 
  FileText, 
  Send, 
  AlertCircle, 
  X, 
  RotateCcw,
  Sparkles,
  Zap,
  Flame,
  Trophy,
  ArrowUpRight,
  TrendingUp,
  Code2,
  Cpu,
  Layers,
  Terminal,
  Activity,
  Award,
  Link,
  MessageCircle,
  Calendar,
  BookOpen,
  FileCheck,
  ChevronRight,
  Download,
  ExternalLink,
  GraduationCap,
  Users,
  Search,
  Filter,
  Plus,
  Settings as SettingsIcon,
  Bell,
  Shield,
  Moon,
  Sun,
  Globe
} from 'lucide-react';

interface StudentDashboardProps {
  currentUser: User;
  activeTab: string;
  tasks: Task[];
  attendance: AttendanceRecord[];
  projects: LmsProject[];
  announcements: Announcement[];
  onCheckIn: (studentId: string, studentName: string, photoUrl?: string, locationName?: string) => void;
  onCheckOut: (studentId: string) => void;
  onSubmitTaskProgress: (
    taskId: string, 
    notes: string, 
    links: { github?: string; docs?: string; fileUrl?: string }
  ) => void;
  onUpdateUser?: (user: User) => void;
  darkMode?: boolean;
  language?: 'id' | 'en';
}

export default function StudentDashboard({
  currentUser,
  activeTab,
  tasks,
  attendance,
  projects,
  announcements,
  onCheckIn,
  onCheckOut,
  onSubmitTaskProgress,
  onUpdateUser,
  darkMode = false,
  language = 'id'
}: StudentDashboardProps) {

  const isProfileComplete = (user: User): boolean => {
    if (!user) return false;
    const cleanId = (user.studentId || '').trim();
    const cleanPhone = (user.phone || '').trim();
    const cleanAddress = (user.address || '').trim();
    const cleanBio = (user.bio || '').trim();
    const cleanAvatar = (user.avatar || '').trim();
    return Boolean(cleanId && cleanPhone && cleanAddress && cleanBio && cleanAvatar);
  };

  const profileComplete = isProfileComplete(currentUser);

  // Render Profile View if profile tab is active
  if (activeTab === 'profile') {
    return <ProfileView currentUser={currentUser} onUpdateProfile={onUpdateUser} darkMode={darkMode} />;
  }

  const myTasks = tasks.filter(t => 
    t.assignedStudentId === currentUser.id || 
    (currentUser.name && t.assignedStudentName?.toLowerCase() === currentUser.name.toLowerCase())
  );
  const myProjects = projects.filter(p => 
    p.assignedStudentIds?.includes(currentUser.id)
  );
  const myAttendance = attendance.filter(a => 
    a.studentId === currentUser.id || 
    (currentUser.name && a.studentName?.toLowerCase() === currentUser.name.toLowerCase())
  );

  const isNewStudent = currentUser.isNewStudent || (myTasks.length === 0 && myAttendance.length === 0);

  const today = new Date().toISOString().split('T')[0];
  const myTodayAtt = myAttendance.find(a => a.date === today);

  const [submitTaskModal, setSubmitTaskModal] = useState<Task | null>(null);
  const [selectedTaskForRevision, setSelectedTaskForRevision] = useState<Task | null>(null);
  const [taskFilter, setTaskFilter] = useState<'all' | 'in_progress' | 'review' | 'revision' | 'completed'>('all');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  // Check-In Photo & BTP Geolocation Modal State
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  // Custom tasks created by student & default tasks fallback
  const [customTasks, setCustomTasks] = useState<Task[]>([]);
  const [realtimeStudentTasks, setRealtimeStudentTasks] = useState<Task[]>([]);
  const [newProgressStatus, setNewProgressStatus] = useState<TaskStatus>('in_progress');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Feature-scoped realtime listener for student tasks (filtered by assignedStudentId)
  useEffect(() => {
    if (!currentUser?.id) return;

    const q = query(
      collection(db, 'tasks'),
      where('assignedStudentId', '==', currentUser.id)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const fetchedTasks = snapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data()
        })) as Task[];
        setRealtimeStudentTasks(fetchedTasks);
      }
    }, (err) => {
      console.warn('Student tasks feature-scoped listener notice:', err?.message);
    });

    return () => unsub();
  }, [currentUser?.id]);

  const defaultStudentTasks: Task[] = [
    {
      id: `task_default_1`,
      taskNumber: 'TGS-2026-001',
      title: 'Integrasi Modul Telemetry Gateway Sensor pH/EC & XBee Mesh',
      description: 'Pengembangan arsitektur akuisisi data sensor dan kalibrasi modul transmisi nirkabel ESP32 ke server telemetry SGL.',
      assignedStudentId: currentUser.id,
      assignedStudentName: currentUser.name,
      projectName: 'HYCOS-SMARTS Container Farm Telemetry Gateway',
      assignedBy: 'Prof. Dr. Indrarini Dyah Irawati',
      deadline: '2026-08-15',
      priority: 'high',
      status: 'in_progress',
      progressPercent: 75,
      createdAt: '2026-08-01'
    },
    {
      id: `task_default_2`,
      taskNumber: 'TGS-2026-002',
      title: 'Pengujian Protokol Komunikasi Telemetry Real-time & WebSocket',
      description: 'Verifikasi stabilitas koneksi data stream sensor nutrisi hidroponik dan rendering visualisasi grafik telemetry.',
      assignedStudentId: currentUser.id,
      assignedStudentName: currentUser.name,
      projectName: 'HYCOS-SMARTS Container Farm Telemetry Gateway',
      assignedBy: 'Azliny Azreen',
      deadline: '2026-08-10',
      priority: 'medium',
      status: 'review',
      progressPercent: 90,
      createdAt: '2026-07-28'
    },
    {
      id: `task_default_3`,
      taskNumber: 'TGS-2026-003',
      title: 'Penyusunan Draft Laporan Riset Magang & Logbook Harian',
      description: 'Dokumentasi jurnal aktivitas riset mingguan, skema sistem hardware, dan draf publikasi Scopus laboratorium.',
      assignedStudentId: currentUser.id,
      assignedStudentName: currentUser.name,
      projectName: 'HYCOS-SMARTS Container Farm Telemetry Gateway',
      assignedBy: 'Prof. Dr. Indrarini Dyah Irawati',
      deadline: '2026-08-01',
      priority: 'low',
      status: 'completed',
      progressPercent: 100,
      createdAt: '2026-07-20'
    }
  ];

  const rawTaskList = realtimeStudentTasks.length > 0 ? realtimeStudentTasks : (myTasks.length > 0 ? myTasks : defaultStudentTasks);
  const allDisplayTasks = rawTaskList.concat(customTasks.filter(ct => !rawTaskList.some(rt => rt.id === ct.id)));

  // Add Progress Modal State
  const [showAddProgressModal, setShowAddProgressModal] = useState(false);
  const [newProgressTitle, setNewProgressTitle] = useState('');
  const [newProgressDesc, setNewProgressDesc] = useState('');
  const [newProgressPercent, setNewProgressPercent] = useState<number>(65);
  const [newProgressGithub, setNewProgressGithub] = useState('');
  const [logbookEntries, setLogbookEntries] = useState(
    isNewStudent ? [] : [
      {
        id: 'log_1',
        date: '2026-07-28',
        time: '16.00 WIB',
        description: 'Melakukan kalibrasi sensor pH dan EC pada Hydroponic Rack #01, serta menghubungkan modul ESP32 ke gateway MQTT.',
        mentorComment: 'Sangat baik. Pastikan offset kalibrasi dicatat pada lembar data telemetry.',
        status: 'Verified',
        image: '/images/auth-bg.jpg'
      }
    ]
  );
  const [newLogbookText, setNewLogbookText] = useState('');
  const [showLogbookModal, setShowLogbookModal] = useState(false);

  // Submit Form States
  const [notes, setNotes] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [docsUrl, setDocsUrl] = useState('');

  // Stats calculation
  const completedTasks = myTasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = myTasks.filter(t => t.status === 'in_progress' || t.status === 'not_started').length;

  const handleProgressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitTaskModal) return;

    onSubmitTaskProgress(
      submitTaskModal.id, 
      notes, 
      { github: githubUrl, docs: docsUrl }
    );

    setSubmitTaskModal(null);
    setNotes('');
    setGithubUrl('');
    setDocsUrl('');
  };

  const handleAddLogbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogbookText.trim()) return;
    const newEntry = {
      id: `log_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      description: newLogbookText,
      mentorComment: 'Menunggu peninjauan pembimbing lab.',
      status: 'Pending Review',
      image: '/images/harvest-team-bg.jpg'
    };
    setLogbookEntries([newEntry, ...logbookEntries]);
    setNewLogbookText('');
    setShowLogbookModal(false);
  };

  // Learning Materials Sample Data
  const learningMaterials = [
    {
      id: 'mat_1',
      title: 'Modul 01: Arsitektur Mikrokontroler ESP32 & Protokol MQTT',
      category: 'Hardware & IoT',
      duration: '45 mins',
      thumbnail: '/images/auth-bg.jpg',
      url: 'https://smartgrowlab.telkomuniversity.ac.id/modul-esp32'
    },
    {
      id: 'mat_2',
      title: 'Modul 02: Kalibrasi Sensor Nutrisi Hydroponic (pH, EC, Temp)',
      category: 'Sensor Telemetry',
      duration: '60 mins',
      thumbnail: '/images/harvest-team-bg.jpg',
      url: 'https://smartgrowlab.telkomuniversity.ac.id/modul-sensor'
    },
    {
      id: 'mat_3',
      title: 'Modul 03: Klasifikasi Penyakit Daun Berbasis Computer Vision AI',
      category: 'AI & Machine Learning',
      duration: '90 mins',
      thumbnail: '/images/auth-bg.jpg',
      url: 'https://smartgrowlab.telkomuniversity.ac.id/modul-ai'
    }
  ];

  // Document Templates
  const documentTemplates = [
    { id: 'doc_1', title: 'Laporan Harian Magang', status: 'Submitted', date: '2026-07-28', type: 'Daily Report' },
    { id: 'doc_2', title: 'Laporan Mingguan Minggu ke-4', status: 'Approved', date: '2026-07-26', type: 'Weekly Report' },
    { id: 'doc_3', title: 'Draft Laporan Akhir Magang Riset', status: 'Draft', date: '2026-07-20', type: 'Final Report' },
    { id: 'doc_4', title: 'Slide Presentasi Seminar Hasil', status: 'Ready', date: '2026-07-15', type: 'Presentation' },
    { id: 'doc_5', title: 'Form Evaluasi Pembimbing Lapangan', status: 'Verified', date: '2026-07-10', type: 'Evaluation' },
    { id: 'doc_6', title: 'Sertifikat Magang Riset SGL', status: 'Issued', date: '2026-07-01', type: 'Certificate' }
  ];

  // Render Profile View if profile tab is active
  if (activeTab === 'profile') {
    return <ProfileView currentUser={currentUser} darkMode={darkMode} />;
  }

  // Render Attendance View if attendance tab is active
  if (activeTab === 'attendance') {
    return (
      <AttendanceView 
        attendance={attendance} 
        students={[currentUser]} 
        currentUser={currentUser} 
        onCheckIn={onCheckIn} 
        onCheckOut={onCheckOut} 
        darkMode={darkMode} 
      />
    );
  }

  // Render Settings View if settings tab is active
  if (activeTab === 'settings') {
    return (
      <div className="space-y-6 max-w-4xl mx-auto text-slate-800 dark:text-slate-100">
        <div className="p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-black/[0.06] shadow-[0_20px_60px_rgba(0,0,0,0.06)] space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <SettingsIcon className="h-6 w-6 text-[#355E3B]" />
            <div>
              <h1 className="text-xl font-bold font-display text-slate-900 dark:text-white">Settings & Preferences</h1>
              <p className="text-xs text-slate-500 font-medium">Pengaturan Akun & Akses Portal Magang</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#F6F8F2] dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-[#355E3B]" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Notifikasi Pengumuman & Tugas</h4>
                  <p className="text-[11px] text-slate-500">Terima pemberitahuan email saat tugas disetujui atau diberi revisi</p>
                </div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#355E3B] cursor-pointer" />
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F8F2] dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-[#355E3B]" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Bahasa Antarmuka (Language)</h4>
                  <p className="text-[11px] text-slate-500">Bahasa Indonesia (ID) / English (EN)</p>
                </div>
              </div>
              <span className="font-bold font-mono text-xs text-[#355E3B] bg-white px-3 py-1 rounded-lg border border-slate-200">
                Bahasa Indonesia
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F8F2] dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-[#355E3B]" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">Autentikasi & Keamanan</h4>
                  <p className="text-[11px] text-slate-500">Sesi terhubung: {currentUser.email}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                Sesi Aktif
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Tab Visibility Switches
  const isOverview = activeTab === 'overview' || !activeTab;
  const showInternship = isOverview || activeTab === 'internship';
  const showTasks = isOverview || activeTab === 'tasks' || activeTab === 'progress';
  const showLogbook = false; // Removed per user request
  const showProgress = false; // Unified into showTasks
  const showAnnouncements = isOverview || activeTab === 'announcements';
  const showMaterials = false; // Removed per request
  const showMentor = isOverview || activeTab === 'mentor';
  const showDocuments = false; // Removed per user request

  return (
    <div className="space-y-10 font-sans text-slate-800 dark:text-slate-100 pb-16 selection:bg-[#355E3B] selection:text-white">
      
      {/* ========================================================================= */}
      {/* SECTION 1: LARGE WELCOME HERO CARD (Shown on Overview & My Internship) */}
      {/* ========================================================================= */}
      {showInternship && (
        <section className="relative rounded-[32px] overflow-hidden bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-slate-800 p-8 sm:p-10 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)] group transition-all duration-300">
          
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
            <img 
              src="/images/harvest-team-bg.jpg" 
              className="w-full h-full object-cover object-center opacity-30 dark:opacity-20 filter brightness-105 contrast-105 group-hover:scale-105 transition-transform duration-700" 
              alt="Smart Grow Greenhouse" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/60 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900/60" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C7D8A8]/40 border border-[#C7D8A8] text-[#355E3B] dark:text-emerald-300 text-xs font-mono font-extrabold tracking-wider uppercase backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5 text-[#355E3B]" />
                  <span>Smart Grow Laboratory • Telkom University</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-[#355E3B] text-xs font-mono font-bold uppercase">
                  <span>{isNewStudent ? 'Akun Mahasiswa Magang Baru ✨' : 'Sesi Magang Aktif ⚡'}</span>
                </span>
                {!profileComplete && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 text-amber-900 dark:text-amber-200 text-xs font-mono font-bold uppercase animate-pulse">
                    <span>⚠️ Profil: Belum Lengkap</span>
                  </span>
                )}
              </div>

              {!profileComplete && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200 backdrop-blur-md">
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs font-display flex items-center gap-2">
                      <span>Status Profil: Belum Lengkap</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 font-mono">Action Required</span>
                    </h4>
                    <p className="text-[11px] text-slate-700 dark:text-slate-300">
                      Silakan melengkapi data diri Anda (NIM, Phone, Alamat, Foto Profil, Bio) melalui tab **Profile**.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#6F8E59] dark:text-emerald-400 block">
                  {isNewStudent ? 'Selamat Datang di Smart Grow Laboratory 🎉' : 'Selamat Pagi / Good Day 👋'}
                </span>
                <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900 dark:text-white leading-tight">
                  {currentUser.name}
                </h1>
                <p className="text-sm sm:text-base text-[#355E3B] font-medium max-w-2xl leading-relaxed">
                  {currentUser.title || 'Full-stack & IoT Research Intern'} • NIM: <span className="font-mono font-bold text-[#355E3B] dark:text-emerald-400">{currentUser.studentId || 'Belum Diisi'}</span> ({currentUser.institution || 'Telkom University'})
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-200/60 dark:border-slate-800/80">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Current Division</span>
                  <p className="text-xs font-bold text-[#355E3B] dark:text-emerald-300">{currentUser.specialty || currentUser.title || 'IoT & Web Telemetry Engineering'}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Main Mentor</span>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{currentUser.advisor || 'Belum ditugaskan'}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Internship Period</span>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Feb 2026 - Aug 2026</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setShowCheckInModal(true)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#355E3B] hover:bg-[#2A4B2F] text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>Punch Check-In Today 🚀</span>
                </button>

                {(myTodayAtt?.photoUrl || myTodayAtt?.checkInPhoto || myAttendance.some(a => a.photoUrl || a.checkInPhoto)) && (
                  <button
                    onClick={() => {
                      const attPhoto = myTodayAtt?.photoUrl || myTodayAtt?.checkInPhoto || myAttendance.find(a => a.photoUrl || a.checkInPhoto)?.photoUrl || myAttendance.find(a => a.photoUrl || a.checkInPhoto)?.checkInPhoto;
                      if (attPhoto) {
                        setSelectedPhoto(attPhoto);
                      } else {
                        alert('Belum ada foto selfie presensi yang tersimpan hari ini.');
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-100 hover:bg-emerald-200 text-[#355E3B] dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs transition-all border border-emerald-300 dark:border-emerald-700 cursor-pointer shadow-sm"
                  >
                    <Upload className="h-4 w-4 text-[#355E3B]" />
                    <span>Lihat Foto Selfie Presensi 📷</span>
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm p-6 rounded-[28px] bg-white/90 dark:bg-slate-800/90 border border-black/[0.06] shadow-xl backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-500">Progres Tugas Riset</span>
                  <span className="px-3 py-1 rounded-full bg-[#C7D8A8]/40 text-[#355E3B] font-mono text-xs font-black">
                    {allDisplayTasks.length > 0 ? `${Math.round((allDisplayTasks.filter(t => t.status === 'completed').length / allDisplayTasks.length) * 100)}% Selesai` : '0% Selesai'}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
                    <div 
                      className="h-full bg-gradient-to-r from-[#6F8E59] to-[#355E3B] rounded-full transition-all duration-1000"
                      style={{ width: `${allDisplayTasks.length > 0 ? Math.round((allDisplayTasks.filter(t => t.status === 'completed').length / allDisplayTasks.length) * 100) : 0}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 text-right font-mono font-semibold">
                    {allDisplayTasks.filter(t => t.status === 'completed').length} dari {allDisplayTasks.length} Tugas Selesai
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: QUICK STATISTICS & ONBOARDING STEPS */}
      {/* ========================================================================= */}
      {showProgress && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-extrabold text-slate-900 dark:text-white">Quick Statistics</h2>
            <span className="text-xs font-mono font-bold text-slate-400">Real-time Performance KPI</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-5 rounded-[24px] bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.04)] space-y-2">
              <div className="flex items-center justify-between text-[#355E3B] dark:text-emerald-400">
                <Clock className="h-5 w-5" />
                <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-[#C7D8A8]/30">
                  {myAttendance.length > 0 ? `${myAttendance.length} Hari` : '0 Hari'}
                </span>
              </div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {myAttendance.length}
              </div>
              <div className="text-xs font-bold text-slate-500">Total Hadir</div>
            </div>

            <div className="p-5 rounded-[24px] bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.04)] space-y-2">
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                  {allDisplayTasks.filter(t => t.status === 'completed').length} Tugas
                </span>
              </div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {allDisplayTasks.filter(t => t.status === 'completed').length}
              </div>
              <div className="text-xs font-bold text-slate-500">Completed Tasks</div>
            </div>

            <div className="p-5 rounded-[24px] bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.04)] space-y-2">
              <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
                <CheckSquare className="h-5 w-5" />
                <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700">
                  {allDisplayTasks.filter(t => t.status !== 'completed').length} Active
                </span>
              </div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {allDisplayTasks.filter(t => t.status !== 'completed').length}
              </div>
              <div className="text-xs font-bold text-slate-500">Pending Tasks</div>
            </div>

            <div className="p-5 rounded-[24px] bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.04)] space-y-2">
              <div className="flex items-center justify-between text-teal-600 dark:text-teal-400">
                <TrendingUp className="h-5 w-5" />
                <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-teal-50 text-teal-700">
                  {allDisplayTasks.length > 0
                    ? `${Math.round(allDisplayTasks.reduce((acc, t) => acc + (t.progressPercent || 50), 0) / allDisplayTasks.length)}%`
                    : '0%'}
                </span>
              </div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {allDisplayTasks.length > 0
                  ? `${Math.round(allDisplayTasks.reduce((acc, t) => acc + (t.progressPercent || 50), 0) / allDisplayTasks.length)}%`
                  : '0%'}
              </div>
              <div className="text-xs font-bold text-slate-500">Research Progress</div>
            </div>

            <div className="p-5 rounded-[24px] bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.04)] space-y-2">
              <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400">
                <FileCheck className="h-5 w-5" />
                <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                  {logbookEntries.length} Entry
                </span>
              </div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {logbookEntries.length}
              </div>
              <div className="text-xs font-bold text-slate-500">Jurnal Logbook</div>
            </div>

            <div className="p-5 rounded-[24px] bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.04)] space-y-2">
              <div className="flex items-center justify-between text-purple-600 dark:text-purple-400">
                <Sparkles className="h-5 w-5" />
                <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700">
                  Aktif
                </span>
              </div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                100%
              </div>
              <div className="text-xs font-bold text-slate-500">Status Magang</div>
            </div>
          </div>

          {/* Onboarding Cards Banner for New Interns */}
          {isNewStudent && (
            <div className="p-6 sm:p-8 rounded-[32px] bg-gradient-to-br from-[#0A5247] via-emerald-900 to-slate-900 text-white shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-extrabold tracking-wider uppercase border border-emerald-400/30">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Langkah Awal Magang Riset</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold font-display tracking-tight text-white">
                  Panduan Onboarding Mahasiswa Magang Baru
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
                  Selamat! Akun magang Anda telah diaktifkan secara resmi. Selesaikan 5 langkah awal berikut untuk memulai kegiatan riset di Smart Grow Laboratory.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2.5 flex flex-col justify-between hover:bg-white/15 transition-all">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-400/20 text-emerald-300 font-bold flex items-center justify-center font-mono text-sm border border-emerald-400/30">1</div>
                    <h4 className="font-bold text-xs text-white">Lengkapi Profil</h4>
                    <p className="text-[11px] text-emerald-100/70 leading-normal">Isi biodata, NIM, program studi, dan kontak Anda.</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase pt-1">Step 1 • Profile</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2.5 flex flex-col justify-between hover:bg-white/15 transition-all">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-400/20 text-emerald-300 font-bold flex items-center justify-center font-mono text-sm border border-emerald-400/30">2</div>
                    <h4 className="font-bold text-xs text-white">Hubungi Mentor</h4>
                    <p className="text-[11px] text-emerald-100/70 leading-normal">Lakukan koordinasi awal dengan mentor pembimbing.</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase pt-1">Step 2 • Mentor</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2.5 flex flex-col justify-between hover:bg-white/15 transition-all">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-400/20 text-emerald-300 font-bold flex items-center justify-center font-mono text-sm border border-emerald-400/30">3</div>
                    <h4 className="font-bold text-xs text-white">Terima Tugas</h4>
                    <p className="text-[11px] text-emerald-100/70 leading-normal">Terima penugasan riset pertama dari asisten/mentor.</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase pt-1">Step 3 • Task</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2.5 flex flex-col justify-between hover:bg-white/15 transition-all">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-400/20 text-emerald-300 font-bold flex items-center justify-center font-mono text-sm border border-emerald-400/30">4</div>
                    <h4 className="font-bold text-xs text-white">Mulai Logbook</h4>
                    <p className="text-[11px] text-emerald-100/70 leading-normal">Catat jurnal harian aktivitas magang secara rutin.</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase pt-1">Step 4 • Logbook</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2.5 flex flex-col justify-between hover:bg-white/15 transition-all">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-400/20 text-emerald-300 font-bold flex items-center justify-center font-mono text-sm border border-emerald-400/30">5</div>
                    <h4 className="font-bold text-xs text-white">Presensi Harian</h4>
                    <p className="text-[11px] text-emerald-100/70 leading-normal">Lakukan punch check-in presensi setiap hari lab.</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-300 uppercase pt-1">Step 5 • Check-in</span>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: TODAY'S ACTIVITIES TIMELINE (Overview & Internship) */}
      {/* ========================================================================= */}
      {showInternship && (
        <section className="p-6 sm:p-8 rounded-[28px] bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.05)] space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">Today's Activities</h2>
              <p className="text-xs text-slate-500 font-medium">Daily Schedule & Research Timeline</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#F6F8F2] text-[#355E3B] font-mono text-xs font-bold border border-[#C7D8A8]">
              {today}
            </span>
          </div>

          <div className="space-y-4">
            {[
              { time: '08.00', title: 'Morning Briefing', desc: 'Briefing harian tim magang bersama Prof. Dr. Indrarini & Azliny', status: 'Completed' },
              { time: '09.00', title: 'Research Activity', desc: 'Kalibrasi sensor pH/EC dan pengujian transmisi modul ESP32 ke gateway', status: 'Completed' },
              { time: '11.00', title: 'Dashboard Development', desc: 'Pengembangan antarmuka telemetry real-time dan koneksi WebSocket API', status: 'In Progress' },
              { time: '13.00', title: 'Lunch Break', desc: 'Istirahat dan diskusi bersama sesama mahasiswa magang SGL', status: 'Scheduled' },
              { time: '14.00', title: 'Mentor Discussion', desc: 'Konsultasi hasil riset telemetry dan bimbingan laporan dengan Dosen Pembimbing', status: 'Scheduled' },
              { time: '16.00', title: 'Submit Daily Logbook', desc: 'Pengisian jurnal harian dan upload dokumentasi foto riset magang', status: 'Pending' }
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#F6F8F2]/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:bg-white transition-all">
                <span className="font-mono font-extrabold text-xs text-[#355E3B] dark:text-emerald-400 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0">
                  {act.time}
                </span>
                <div className="flex-1 space-y-0.5">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{act.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{act.desc}</p>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                  act.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                  act.status === 'In Progress' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                  {act.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: ASSIGNED TASKS & PROGRESS (Kanban Board Layout) */}
      {/* ========================================================================= */}
      {showTasks && (
        <section id="section-kanban-tasks" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-extrabold text-slate-900 dark:text-white">Assigned Tasks & Progres Riset</h2>
              <p className="text-xs text-slate-500 font-medium">Manajemen Tugas & Log Kemajuan Riset Mahasiswa</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowAddProgressModal(true)}
                className="px-4 py-1.5 rounded-full bg-[#355E3B] hover:bg-[#2A4B2F] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Tambah Progres Riset</span>
              </button>

              {(['all', 'in_progress', 'review', 'revision', 'completed'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setTaskFilter(filter)}
                  className={`px-3 py-1.5 rounded-full text-xs font-extrabold capitalize transition-all cursor-pointer ${
                    taskFilter === filter 
                      ? 'bg-[#355E3B] text-white shadow-sm' 
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {filter.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* COLUMN 1: TO DO & IN PROGRESS */}
            <div className="space-y-4 p-5 rounded-[28px] bg-[#F6F8F2] dark:bg-slate-900/60 border border-black/[0.05] dark:border-slate-800">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <h3 className="text-xs font-mono font-extrabold uppercase text-slate-700 dark:text-slate-300">To Do & In Progress</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNewProgressStatus('in_progress');
                      setShowAddProgressModal(true);
                    }}
                    className="inline-flex items-center gap-1 text-[10px] font-extrabold text-[#355E3B] bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-200 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-700 cursor-pointer shadow-xs"
                  >
                    <Plus className="h-3 w-3" />
                    <span>+ Tambah</span>
                  </button>
                  <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-mono text-[10px] font-bold">
                    {allDisplayTasks.filter(t => t.status === 'in_progress' || t.status === 'not_started').length}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {allDisplayTasks.filter(t => t.status === 'in_progress' || t.status === 'not_started').length === 0 ? (
                  <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-2">
                    <p className="text-xs text-slate-400 font-medium">Belum ada tugas di kolom To Do & In Progress</p>
                    <button
                      type="button"
                      onClick={() => {
                        setNewProgressStatus('in_progress');
                        setShowAddProgressModal(true);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#355E3B] hover:underline cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>+ Tambah Progres Baru</span>
                    </button>
                  </div>
                ) : (
                  allDisplayTasks.filter(t => t.status === 'in_progress' || t.status === 'not_started').map(task => (
                    <div key={task.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-3 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                          {task.priority || 'High'} Priority • {task.progressPercent || 75}%
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{task.deadline}</span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{task.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{task.description}</p>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <span className="text-[10px] font-medium text-slate-400">Pembimbing: {task.assignedBy || 'Prof. Indrarini'}</span>
                        <button
                          onClick={() => setSubmitTaskModal(task)}
                          className="px-3 py-1 rounded-xl bg-[#355E3B] hover:bg-[#2A4B2F] text-white text-[10px] font-bold transition-all cursor-pointer"
                        >
                          Submit Progress
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* COLUMN 2: REVIEW & REVISION */}
            <div className="space-y-4 p-5 rounded-[28px] bg-[#F6F8F2] dark:bg-slate-900/60 border border-black/[0.05] dark:border-slate-800">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <h3 className="text-xs font-mono font-extrabold uppercase text-slate-700 dark:text-slate-300">Review & Revision</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNewProgressStatus('review');
                      setShowAddProgressModal(true);
                    }}
                    className="inline-flex items-center gap-1 text-[10px] font-extrabold text-blue-700 bg-blue-100 dark:bg-blue-950/80 hover:bg-blue-200 px-2 py-0.5 rounded-md border border-blue-300 dark:border-blue-700 cursor-pointer shadow-xs"
                  >
                    <Plus className="h-3 w-3" />
                    <span>+ Tambah</span>
                  </button>
                  <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-mono text-[10px] font-bold">
                    {allDisplayTasks.filter(t => t.status === 'review' || t.status === 'revision').length}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {allDisplayTasks.filter(t => t.status === 'review' || t.status === 'revision').length === 0 ? (
                  <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-2">
                    <p className="text-xs text-slate-400 font-medium">Belum ada tugas di kolom Review & Revision</p>
                    <button
                      type="button"
                      onClick={() => {
                        setNewProgressStatus('review');
                        setShowAddProgressModal(true);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>+ Tambah Progres Review</span>
                    </button>
                  </div>
                ) : (
                  allDisplayTasks.filter(t => t.status === 'review' || t.status === 'revision').map(task => (
                    <div key={task.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-3 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          task.status === 'revision' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {task.status === 'revision' ? 'Revisi Perlu Fix' : 'Sedang Di-Review'}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{task.deadline}</span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{task.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{task.description}</p>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <span className="text-[10px] font-medium text-slate-400">Reviewer: Azliny Azreen</span>
                        {task.status === 'revision' ? (
                          <button
                            onClick={() => setSelectedTaskForRevision(task)}
                            className="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold transition-all cursor-pointer"
                          >
                            Lihat Catatan Revisi
                          </button>
                        ) : (
                          <span className="text-[10px] font-mono text-blue-600 font-bold">Menunggu Pembimbing</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* COLUMN 3: COMPLETED */}
            <div className="space-y-4 p-5 rounded-[28px] bg-[#F6F8F2] dark:bg-slate-900/60 border border-black/[0.05] dark:border-slate-800">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <h3 className="text-xs font-mono font-extrabold uppercase text-slate-700 dark:text-slate-300">Completed</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNewProgressStatus('completed');
                      setShowAddProgressModal(true);
                    }}
                    className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-800 bg-emerald-100 dark:bg-emerald-950/80 hover:bg-emerald-200 px-2 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-700 cursor-pointer shadow-xs"
                  >
                    <Plus className="h-3 w-3" />
                    <span>+ Tambah</span>
                  </button>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                    {allDisplayTasks.filter(t => t.status === 'completed').length}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {allDisplayTasks.filter(t => t.status === 'completed').length === 0 ? (
                  <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-center space-y-2">
                    <p className="text-xs text-slate-400 font-medium">Belum ada tugas selesai</p>
                    <button
                      type="button"
                      onClick={() => {
                        setNewProgressStatus('completed');
                        setShowAddProgressModal(true);
                      }}
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>+ Tambah Tugas Selesai</span>
                    </button>
                  </div>
                ) : (
                  allDisplayTasks.filter(t => t.status === 'completed').map(task => (
                    <div key={task.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-3 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Verified Completed ✅
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">{task.deadline}</span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-through opacity-80">{task.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{task.description}</p>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-emerald-700 font-bold">Nilai: 100 / 100</span>
                        <span className="text-[10px] font-mono text-slate-400">Selesai</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: INTERNSHIP TIMELINE (Shown on Overview & Internship & Progress) */}
      {/* ========================================================================= */}
      {(showInternship || showProgress) && (
        <section className="p-6 sm:p-8 rounded-[28px] bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.05)] space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">Internship Timeline</h2>
              <p className="text-xs text-slate-500 font-medium">Roadmap Program Magang Riset Laboratorium</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#355E3B]">Phase 4 of 9</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-9 gap-2">
            {[
              { step: '1', title: 'Application', date: 'Jan 2026', status: 'completed' },
              { step: '2', title: 'Accepted', date: 'Feb 2026', status: 'completed' },
              { step: '3', title: 'Orientation', date: 'Feb 2026', status: 'completed' },
              { step: '4', title: 'Research', date: 'Mar 2026', status: 'active' },
              { step: '5', title: 'Implementation', date: 'May 2026', status: 'active' },
              { step: '6', title: 'Evaluation', date: 'Jun 2026', status: 'upcoming' },
              { step: '7', title: 'Final Report', date: 'Jul 2026', status: 'upcoming' },
              { step: '8', title: 'Presentation', date: 'Aug 2026', status: 'upcoming' },
              { step: '9', title: 'Certificate', date: 'Aug 2026', status: 'upcoming' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#F6F8F2] dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1.5">
                <span className={`w-7 h-7 rounded-full text-xs font-black font-mono flex items-center justify-center ${
                  item.status === 'completed' ? 'bg-[#355E3B] text-white' :
                  item.status === 'active' ? 'bg-[#6F8E59] text-white ring-4 ring-[#C7D8A8]/50' : 'bg-slate-200 text-slate-500'
                }`}>
                  {item.step}
                </span>
                <h4 className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">{item.title}</h4>
                <span className="text-[9px] font-mono text-slate-400 font-semibold">{item.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 7: DAILY LOGBOOK TIMELINE */}
      {/* ========================================================================= */}
      {showLogbook && (
        <section className="p-6 sm:p-8 rounded-[28px] bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.05)] space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">Daily Logbook</h2>
              <p className="text-xs text-slate-500 font-medium">Jurnal Aktivitas & Catatan Pembimbing Riset</p>
            </div>

            <button
              onClick={() => setShowLogbookModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#355E3B] hover:bg-[#2A4B2F] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Jurnal Harian</span>
            </button>
          </div>

          <div className="space-y-4">
            {logbookEntries.map(entry => (
              <div key={entry.id} className="p-5 rounded-2xl bg-[#F6F8F2]/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 flex flex-col md:flex-row items-start gap-5">
                <img src={entry.image} alt="Logbook thumbnail" className="w-full md:w-32 h-24 object-cover rounded-xl border border-slate-200 shadow-xs shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#355E3B] dark:text-emerald-400">{entry.date} • {entry.time}</span>
                    <span className={`text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded-full ${
                      entry.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {entry.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">{entry.description}</p>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-[#355E3B] dark:text-emerald-400">Catatan Pembimbing: </span>
                    {entry.mentorComment}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 8: CURRENT RESEARCH PROJECT & SECTION 9: MENTOR CARD */}
      {/* ========================================================================= */}
      {(showInternship || showMentor) && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {showInternship && (
            <section className="lg:col-span-7 p-6 sm:p-8 rounded-[28px] bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.05)] space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">Current Research Project</h2>
                  <p className="text-xs text-slate-500 font-medium">Proyek Utama Riset Magang SGL</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#355E3B] bg-[#C7D8A8]/30 px-3 py-1 rounded-full">Active</span>
              </div>

              <div className="space-y-4">
                <div className="relative rounded-2xl overflow-hidden h-44 border border-slate-200 shadow-sm">
                  <img src="/images/auth-bg.jpg" alt="Project Banner" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-5 flex flex-col justify-end text-white">
                    <span className="text-[10px] font-mono uppercase font-bold text-emerald-400">Kedaireka & Telkom University Research</span>
                    <h3 className="text-xl font-bold font-display">HYCOS-SMARTS Container Farm Telemetry Gateway</h3>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold leading-relaxed">
                  Pengembangan arsitektur akuisisi data sensor pH, EC, suhu air, serta pemantauan otomatisasi nutrisi hidroponik berbasis protokol nirkabel XBee Mesh dan portal analitik real-time.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#F6F8F2] dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] font-mono font-bold text-slate-400 block">Progress Riset</span>
                    <span className="text-sm font-black font-mono text-[#355E3B] dark:text-emerald-400">85% Completed</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F6F8F2] dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] font-mono font-bold text-slate-400 block">Peran Kontribusi</span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">IoT & Full-stack Dev</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F6F8F2] dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] font-mono font-bold text-slate-400 block">Deadline Publikasi</span>
                    <span className="text-xs font-bold text-[#355E3B]">30 Agustus 2026</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {showMentor && (
            <section className={`${showInternship ? 'lg:col-span-5' : 'lg:col-span-12'} p-6 sm:p-8 rounded-[28px] bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.05)] space-y-6 flex flex-col justify-between`}>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <h2 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">Mentor</h2>
                    <p className="text-xs text-slate-500 font-medium">Pembimbing Utama Riset SGL</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#355E3B]">Head of Lab</span>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F6F8F2] dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700">
                  <img src="/images/team/indrarini.jpg" alt="Prof Indrarini" className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md shrink-0" />
                  <div className="space-y-0.5">
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.</h3>
                    <p className="text-[11px] text-[#355E3B] font-bold">Direktur & Dosen Pembimbing Utama</p>
                    <p className="text-[10px] text-slate-500 font-mono">indrarini@telkomuniversity.ac.id</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs space-y-1.5">
                  <span className="font-mono text-[10px] font-bold text-[#355E3B] uppercase">Fokus Riset Pembimbing:</span>
                  <p className="text-[#355E3B] dark:text-emerald-300 font-semibold leading-relaxed">
                    Cyber-Physical Agriculture Systems, IoT Sensor Fusion, Signal Processing, & Wireless Telemetry.
                  </p>
                </div>
              </div>

              <a
                href="mailto:indrarini@telkomuniversity.ac.id"
                className="w-full py-3 rounded-2xl bg-[#355E3B] hover:bg-[#2A4B2F] text-white font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md mt-4"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Hubungi Pembimbing via Email</span>
              </a>
            </section>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 10: LEARNING MATERIALS GRID */}
      {/* ========================================================================= */}
      {showMaterials && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl font-extrabold text-slate-900 dark:text-white">Learning Materials</h2>
              <p className="text-xs text-slate-500 font-medium">Modul Pembelajaran & Standar Operasional Laboratorium</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#355E3B]">3 Modules Available</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {learningMaterials.map(mat => (
              <div key={mat.id} className="p-5 rounded-[28px] bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.05)] space-y-4 hover:translate-y-[-2px] transition-all">
                <div className="relative h-36 rounded-2xl overflow-hidden border border-slate-200">
                  <img src={mat.thumbnail} alt={mat.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-slate-950/80 text-white font-mono text-[10px] font-bold backdrop-blur-md">
                    {mat.duration}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#355E3B] uppercase">{mat.category}</span>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">{mat.title}</h3>
                </div>

                <a
                  href={mat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-[#F6F8F2] hover:bg-[#C7D8A8]/40 border border-slate-200 text-[#355E3B] text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Buka Modul Pembelajaran</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SECTION 11: ANNOUNCEMENTS & SECTION 12: DOCUMENTS REPOSITORY */}
      {/* ========================================================================= */}
      {(showAnnouncements || showDocuments) && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {showAnnouncements && (
            <section className={`${showDocuments ? 'lg:col-span-6' : 'lg:col-span-12'} p-6 sm:p-8 rounded-[28px] bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.05)] space-y-6`}>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">Announcements</h2>
                  <p className="text-xs text-slate-500 font-medium">Pengumuman & Berita Laboratorium</p>
                </div>
                <Megaphone className="h-5 w-5 text-[#355E3B]" />
              </div>

              <div className="space-y-4">
                {announcements.slice(0, 3).map(ann => (
                  <div key={ann.id} className="p-4 rounded-2xl bg-[#F6F8F2] dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 space-y-2 hover:bg-white transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[#355E3B] uppercase">{ann.category}</span>
                      <span className="text-[10px] font-mono text-slate-400">{ann.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{ann.title}</h4>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">{ann.content}</p>
                    <button
                      onClick={() => setSelectedAnnouncement(ann)}
                      className="text-[10px] font-mono font-bold text-[#355E3B] hover:underline cursor-pointer"
                    >
                      Read More →
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {showDocuments && (
            <section className={`${showAnnouncements ? 'lg:col-span-6' : 'lg:col-span-12'} p-6 sm:p-8 rounded-[28px] bg-white dark:bg-slate-900 border border-black/[0.06] dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.05)] space-y-6`}>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="font-display text-lg font-extrabold text-slate-900 dark:text-white font-display">Documents</h2>
                  <p className="text-xs text-slate-500 font-medium">Berkas & Laporan Hasil Magang</p>
                </div>
                <FileText className="h-5 w-5 text-[#355E3B]" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {documentTemplates.map(doc => (
                  <div key={doc.id} className="p-3.5 rounded-2xl bg-[#F6F8F2] dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold text-[#355E3B] uppercase">{doc.type}</span>
                      <span className="text-[9px] font-mono text-emerald-700 font-bold">{doc.status}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{doc.title}</h4>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 dark:border-slate-700">
                      <span className="text-[9px] font-mono text-slate-400">{doc.date}</span>
                      <button className="text-[10px] text-[#355E3B] hover:underline font-bold cursor-pointer flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>File</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS: TASK PROGRESS SUBMIT MODAL */}
      {/* ========================================================================= */}
      {submitTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Submit Progress Tugas</h3>
                <p className="text-xs text-slate-500 font-mono">{submitTaskModal.title}</p>
              </div>
              <button onClick={() => setSubmitTaskModal(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleProgressSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Catatan Ringkas Pengerjaan:</label>
                <textarea
                  required
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tuliskan ringkasan kemajuan atau hasil kalibrasi..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6F8F2] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#355E3B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Link Repository (GitHub):</label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username/repository"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6F8F2] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#355E3B]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Link Dokumen / Google Drive:</label>
                <input
                  type="url"
                  value={docsUrl}
                  onChange={(e) => setDocsUrl(e.target.value)}
                  placeholder="https://docs.google.com/document/d/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6F8F2] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#355E3B]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSubmitTaskModal(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#355E3B] hover:bg-[#2A4B2F] text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Kirim Submission Ke Pembimbing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: LOGBOOK ADD ENTRY */}
      {showLogbookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-2xl max-w-md w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Tambah Jurnal Harian Logbook</h3>
              <button onClick={() => setShowLogbookModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddLogbook} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Deskripsi Riset & Aktivitas Lab Hari Ini:</label>
                <textarea
                  required
                  rows={4}
                  value={newLogbookText}
                  onChange={(e) => setNewLogbookText(e.target.value)}
                  placeholder="Tuliskan aktivitas laboratorium hari ini secara mendalam..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6F8F2] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-[#355E3B]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogbookModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#355E3B] text-white text-xs font-bold shadow-md"
                >
                  Simpan Jurnal Logbook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REVISION DETAIL MODAL */}
      {selectedTaskForRevision && (
        <RevisionDetailModal
          task={selectedTaskForRevision}
          onClose={() => setSelectedTaskForRevision(null)}
          isAssistant={false}
          darkMode={darkMode}
        />
      )}

      {/* CHECK-IN CAMERA & GEOLOCATION MODAL */}
      <CheckInCameraModal
        isOpen={showCheckInModal}
        onClose={() => setShowCheckInModal(false)}
        studentName={currentUser.name}
        darkMode={darkMode}
        onConfirmCheckIn={(photoUrl, locAddress) => {
          onCheckIn(currentUser.id, currentUser.name, photoUrl, locAddress);
        }}
      />

      {/* ADD RESEARCH PROGRESS MODAL */}
      {showAddProgressModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="h-5 w-5 text-[#355E3B]" />
                <span>Tambah Update Progres Riset</span>
              </h3>
              <button onClick={() => setShowAddProgressModal(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newProgressTitle.trim()) return;

                // Create task in customTasks so it populates the Kanban column
                const newTaskObj: Task = {
                  id: `task_custom_${Date.now()}`,
                  taskNumber: `TGS-2026-00${allDisplayTasks.length + 1}`,
                  title: newProgressTitle,
                  description: newProgressDesc,
                  assignedStudentId: currentUser.id,
                  assignedStudentName: currentUser.name,
                  projectName: 'HYCOS-SMARTS Container Farm Telemetry Gateway',
                  assignedBy: currentUser.advisor || 'Prof. Dr. Indrarini Dyah Irawati',
                  deadline: new Date(Date.now() + 864000000).toISOString().split('T')[0],
                  priority: 'high',
                  status: newProgressStatus,
                  progressPercent: newProgressPercent,
                  githubUrl: newProgressGithub,
                  createdAt: new Date().toISOString().split('T')[0]
                };
                setCustomTasks(prev => [newTaskObj, ...prev]);

                // Create logbook entry
                const newEntry = {
                  id: `log_${Date.now()}`,
                  date: new Date().toISOString().split('T')[0],
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' WIB',
                  description: `${newProgressTitle} (${newProgressPercent}% Complete): ${newProgressDesc}`,
                  mentorComment: 'Progress berhasil dicatat dalam logbook & papan tugas riset.',
                  status: 'Verified',
                  image: '/images/auth-bg.jpg'
                };
                setLogbookEntries(prev => [newEntry, ...prev]);

                setShowAddProgressModal(false);
                setNewProgressTitle('');
                setNewProgressDesc('');
                setNewProgressGithub('');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Judul Fitur / Progres Riset</label>
                <input
                  type="text"
                  required
                  value={newProgressTitle}
                  onChange={(e) => setNewProgressTitle(e.target.value)}
                  placeholder="e.g. Integrasi Modul Sensor pH & Telemetry Gateway"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Target Kolom Kanban Board</label>
                <select
                  value={newProgressStatus}
                  onChange={(e) => setNewProgressStatus(e.target.value as TaskStatus)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 font-bold text-[#355E3B]"
                >
                  <option value="in_progress">Kolom 1: To Do & In Progress</option>
                  <option value="review">Kolom 2: Review & Revision</option>
                  <option value="completed">Kolom 3: Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Persentase Kemajuan (%)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={newProgressPercent}
                    onChange={(e) => setNewProgressPercent(Number(e.target.value))}
                    className="w-full accent-[#355E3B]"
                  />
                  <span className="font-mono font-bold text-[#355E3B] text-sm shrink-0">{newProgressPercent}%</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Deskripsi Ringkas Pengerjaan</label>
                <textarea
                  rows={3}
                  required
                  value={newProgressDesc}
                  onChange={(e) => setNewProgressDesc(e.target.value)}
                  placeholder="Jelaskan kemajuan fitur atau pengujian alat yang telah Anda selesaikan..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Link Repository GitHub / File (Opsional)</label>
                <input
                  type="url"
                  value={newProgressGithub}
                  onChange={(e) => setNewProgressGithub(e.target.value)}
                  placeholder="https://github.com/username/repository"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddProgressModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#355E3B] hover:bg-[#2A4B2F] text-white font-bold shadow-md"
                >
                  Simpan Progres Riset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PHOTO PREVIEW MODAL */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setSelectedPhoto(null)}>
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 max-w-md w-full space-y-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Foto Verifikasi Presensi Selfie</h4>
                <p className="text-[10px] text-slate-400 font-mono">{currentUser.name} • Area BTP Telkom University</p>
              </div>
              <button onClick={() => setSelectedPhoto(null)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img src={selectedPhoto} alt="Selfie Presensi" className="w-full h-72 object-cover" />
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-[#355E3B] dark:text-emerald-300 block">Status Presensi: TERVERIFIKASI ✓</span>
              <p className="text-[10px] text-slate-500">Tersimpan di Database Laboratorium & Google Drive SGL Resmi</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
