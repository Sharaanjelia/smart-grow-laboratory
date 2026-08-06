import React, { useState } from 'react';
import { 
  User, 
  UserRole, 
  ApplicantRecord, 
  SelectionStage,
  NewsItem, 
  ProjectItem, 
  TeamMember, 
  SystemLog,
  AttendanceRecord
} from '../../types';
import InternshipRecruitmentManager from './InternshipRecruitmentManager';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  CheckCircle2, 
  X, 
  Search, 
  History, 
  Settings, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Activity,
  Clock,
  Radio,
  Globe,
  Database,
  Layers,
  Calendar,
  AlertTriangle,
  Download,
  Filter,
  Check,
  Send,
  Building,
  GraduationCap,
  Briefcase,
  Terminal,
  Cpu,
  BarChart2,
  Lock,
  Unlock,
  Eye,
  Tag,
  Zap
} from 'lucide-react';
import TeamAvatar from '../TeamAvatar';
import PendingRegistrationsView from './PendingRegistrationsView';
import ProfileView from './ProfileView';
import { PendingRegistration } from '../../types';

interface AdminDashboardProps {
  activeTab: string;
  currentUser?: User;
  onUpdateProfile?: (user: User) => void;
  users: User[];
  applicants: ApplicantRecord[];
  pendingRegistrations?: PendingRegistration[];
  onApproveRegistration?: (reg: PendingRegistration) => void;
  onRejectRegistration?: (id: string) => void;
  news: NewsItem[];
  projects: ProjectItem[];
  team: TeamMember[];
  logs: SystemLog[];
  attendance?: AttendanceRecord[];
  onCreateUser: (user: Omit<User, 'id' | 'joinedDate'>) => void;
  onDeleteUser: (userId: string) => void;
  onApproveApplicant: (applicantId: string) => void;
  onRejectApplicant: (applicantId: string) => void;
  onAdvanceApplicantStage?: (applicantId: string, nextStage: SelectionStage, notes?: string) => void;
  onAddNews?: (news: Omit<NewsItem, 'id'>) => void;
  onDeleteNews?: (id: string) => void;
  onAddProject?: (project: Omit<ProjectItem, 'id'>) => void;
  onEditProject?: (project: ProjectItem) => void;
  onDeleteProject?: (id: string) => void;
  onAddTeamMember?: (member: Omit<TeamMember, 'id'>) => void;
  onDeleteTeamMember?: (id: string) => void;
  onCheckInStudent?: (studentId: string, studentName: string) => void;
  onCheckOutStudent?: (studentId: string) => void;
  darkMode?: boolean;
  language?: 'id' | 'en';
}

export default function AdminDashboard({
  activeTab,
  currentUser,
  onUpdateProfile,
  users,
  applicants,
  pendingRegistrations = [],
  onApproveRegistration,
  onRejectRegistration,
  news,
  projects,
  team,
  logs,
  attendance = [],
  onCreateUser,
  onDeleteUser,
  onApproveApplicant,
  onRejectApplicant,
  onAdvanceApplicantStage,
  onAddNews,
  onDeleteNews,
  onAddProject,
  onEditProject,
  onDeleteProject,
  onAddTeamMember,
  onDeleteTeamMember,
  onCheckInStudent,
  onCheckOutStudent,
  darkMode = false
}: AdminDashboardProps) {
  // Modal states
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [createNewsOpen, setCreateNewsOpen] = useState(false);
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [createTeamOpen, setCreateTeamOpen] = useState(false);
  
  // Create User Form State
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [userStudentId, setUserStudentId] = useState('');
  const [userInstitution, setUserInstitution] = useState('Telkom University');
  const [userSpecialty, setUserSpecialty] = useState('');

  // User Filter & Search
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  // CMS Sub-Tab State
  const [cmsTab, setCmsTab] = useState<'news' | 'projects' | 'team' | 'banner'>('news');

  // Attendance Filters & Simulation State
  const [attendanceSearch, setAttendanceSearch] = useState('');
  const [selectedScanStudentId, setSelectedScanStudentId] = useState<string>(users.find(u => u.role === 'student')?.id || '');
  const [rfidSuccessMsg, setRfidSuccessMsg] = useState<string | null>(null);

  // New Article Form State
  const [newsTitle, setNewsTitle] = useState('');
  const [newsTagline, setNewsTagline] = useState('');
  const [newsCategory, setNewsCategory] = useState('Innovations');
  const [newsReadTime, setNewsReadTime] = useState('3 min read');
  const [newsImage, setNewsImage] = useState('https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80');
  const [newsContent, setNewsContent] = useState('');

  // New Project Form State
  const [projTitle, setProjTitle] = useState('');
  const [projTagline, setProjTagline] = useState('');
  const [projCategory, setProjCategory] = useState<string>('IoT & Hardware');
  const [projDate, setProjDate] = useState(new Date().toISOString().split('T')[0]);
  const [projImage, setProjImage] = useState('https://images.unsplash.com/photo-1585336261026-8f5786372969?auto=format&fit=crop&w=800&q=80');
  const [projDesc, setProjDesc] = useState('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateUser({
      name: userName,
      email: userEmail,
      role: userRole,
      studentId: userRole === 'student' ? userStudentId : undefined,
      institution: userInstitution,
      specialty: userSpecialty,
      status: 'active'
    });
    setCreateUserOpen(false);
    setUserName('');
    setUserEmail('');
    setUserStudentId('');
    setUserSpecialty('');
    showToast('Akun pengguna baru berhasil dibuat!');
  };

  const handleCreateNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle || !newsContent) return;
    if (onAddNews) {
      onAddNews({
        title: newsTitle,
        tagline: newsTagline || 'Smart Grow Lab Update',
        date: new Date().toISOString().split('T')[0],
        category: newsCategory,
        readTime: newsReadTime,
        image: newsImage,
        excerpt: newsContent.length > 120 ? newsContent.substring(0, 120) + '...' : newsContent,
        content: newsContent,
        comments: []
      });
    }
    setCreateNewsOpen(false);
    setNewsTitle('');
    setNewsTagline('');
    setNewsContent('');
    showToast('Artikel berita publikasi baru berhasil diterbitkan!');
  };

  const handleOpenEditProject = (proj: ProjectItem) => {
    setEditingProject(proj);
    setProjTitle(proj.title);
    setProjTagline(proj.tagline || '');
    setProjCategory(proj.category);
    setProjDate(proj.date || new Date().toISOString().split('T')[0]);
    setProjDesc(proj.description);
    setProjImage(proj.image);
    setCreateProjectOpen(true);
  };

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle || !projDesc) return;
    
    if (editingProject && onEditProject) {
      onEditProject({
        ...editingProject,
        title: projTitle,
        tagline: projTagline || 'Innovation Project',
        category: projCategory,
        date: projDate,
        image: projImage,
        description: projDesc,
        fullDescription: projDesc
      });
      showToast('Projek R&D berhasil diperbarui!');
    } else if (onAddProject) {
      onAddProject({
        title: projTitle,
        tagline: projTagline || 'Innovation Project',
        category: projCategory,
        date: projDate,
        image: projImage,
        description: projDesc,
        fullDescription: projDesc,
        sensors: [],
        gallery: [projImage]
      });
      showToast('Projek R&D publikasi baru berhasil ditambahkan!');
    }
    setEditingProject(null);
    setCreateProjectOpen(false);
    setProjTitle('');
    setProjTagline('');
    setProjDesc('');
  };

  const handleRfidScan = () => {
    const student = users.find(u => u.id === selectedScanStudentId);
    if (!student) return;

    // Check if student is currently checked in today
    const today = new Date().toISOString().split('T')[0];
    const existing = attendance.find(a => a.studentId === student.id && a.date === today);

    if (!existing || !existing.checkInTime) {
      if (onCheckInStudent) {
        onCheckInStudent(student.id, student.name);
        setRfidSuccessMsg(`🪪 Tap RFID Berhasil! Check-In tercatat untuk ${student.name}`);
      }
    } else if (!existing.checkOutTime) {
      if (onCheckOutStudent) {
        onCheckOutStudent(student.id);
        setRfidSuccessMsg(`👋 Tap RFID Berhasil! Check-Out tercatat untuk ${student.name}`);
      }
    } else {
      setRfidSuccessMsg(`ℹ️ ${student.name} sudah melakukan Check-In dan Check-Out hari ini.`);
    }

    setTimeout(() => setRfidSuccessMsg(null), 4000);
  };

  const pendingApplicants = applicants.filter(a => a.status === 'pending');
  const studentUsers = users.filter(u => u.role === 'student');

  return (
    <div className="space-y-8 font-sans animate-fade-in relative">
      
      {activeTab === 'pending_registrations' && (
        <PendingRegistrationsView 
          registrations={pendingRegistrations}
          onApprove={onApproveRegistration || (() => {})}
          onReject={onRejectRegistration || (() => {})}
        />
      )}

      {activeTab === 'profile' && currentUser && (
        <ProfileView currentUser={currentUser} onUpdateProfile={onUpdateProfile} darkMode={darkMode} />
      )}
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-900 text-emerald-100 border border-emerald-500/50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner Command Center */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-teal-950 border border-emerald-800/40 p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-400/40 text-emerald-200 text-[10px] font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
              SYSTEM ADMIN CONTROL HUB
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              MQTT GATEWAY ONLINE
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Administrator Control & Infrastructure
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Pusat komando tata kelola akun laboratorium, manajemen konten situs publik (CMS), log presensi RFID anggota, dan audit sistem Smart Grow Laboratory.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
          <button
            onClick={() => setCreateUserOpen(true)}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer border border-emerald-400/30 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Buat Akun Pengguna</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. TAB: ADMIN DASHBOARD (COMMAND CENTER OVERVIEW)                         */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Top KPI Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Total Akun Pengguna</span>
                <p className="text-3xl font-black text-slate-900 font-display mt-1">{users.length}</p>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
                  <CheckCircle2 className="h-3 w-3" /> All system roles active
                </span>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Mahasiswa Magang (Interns)</span>
                <p className="text-3xl font-black text-slate-900 font-display mt-1">{studentUsers.length}</p>
                <span className="text-[11px] font-bold text-blue-600 flex items-center gap-1 mt-1">
                  <GraduationCap className="h-3 w-3" /> Active research tracks
                </span>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center">
                <GraduationCap className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Pendaftaran Baru (Pending)</span>
                <p className="text-3xl font-black text-amber-600 font-display mt-1">{pendingApplicants.length}</p>
                <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1 mt-1">
                  <AlertTriangle className="h-3 w-3" /> Requires admin review
                </span>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center">
                <FileText className="h-6 w-6" />
              </div>
            </div>

            <div className="bg-white border border-slate-200/80 p-5 rounded-3xl shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Publikasi Website (CMS)</span>
                <p className="text-3xl font-black text-teal-700 font-display mt-1">{news.length + projects.length}</p>
                <span className="text-[11px] font-bold text-teal-600 flex items-center gap-1 mt-1">
                  <Sparkles className="h-3 w-3" /> Live on public site
                </span>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-teal-50 border border-teal-100 text-teal-700 flex items-center justify-center">
                <Globe className="h-6 w-6" />
              </div>
            </div>
          </div>

          {/* Infrastructure Health & Telemetry Network Gauges */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white space-y-6 shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-emerald-400" />
                  <h2 className="text-lg font-bold font-display text-white">Infrastruktur & Status Sistem Telemetri</h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Real-time status node perangkat keras, gateway broker MQTT, dan database log</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                ALL SYSTEMS NORMAL • 99.98% UPTIME
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 uppercase">MQTT Telemetry Broker</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">ONLINE</span>
                </div>
                <p className="text-2xl font-black font-mono text-white">12 ms <span className="text-xs font-normal text-slate-400">latency</span></p>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[94%]" />
                </div>
                <span className="text-[10px] text-slate-500 block">Ingesting ESP32 & XBee node payloads every 2000ms</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 uppercase">Database Storage</span>
                  <span className="text-xs font-bold text-teal-400 font-mono">42.8 MB / 5 GB</span>
                </div>
                <p className="text-2xl font-black font-mono text-white">0.85 % <span className="text-xs font-normal text-slate-400">capacity</span></p>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-teal-400 h-full w-[15%]" />
                </div>
                <span className="text-[10px] text-slate-500 block">PostgreSQL / Firestore telemetry time-series logs</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 uppercase">Lab RFID Access Gate</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">READY</span>
                </div>
                <p className="text-2xl font-black font-mono text-white">100 % <span className="text-xs font-normal text-slate-400">auth sync</span></p>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[100%]" />
                </div>
                <span className="text-[10px] text-slate-500 block">RC522 RFID reader synced with user badge IDs</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent System Activity Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Quick Actions Bar */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <Zap className="h-4 w-4 text-amber-500" /> Quick Administrative Actions
              </h3>
              <p className="text-xs text-slate-500">Shortcut perintah cepat pengelolaan sistem laboratorium</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button 
                  onClick={() => setCreateUserOpen(true)}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-left transition-all cursor-pointer group"
                >
                  <Users className="h-5 w-5 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-800 block">Tambah Pengguna Baru</span>
                  <span className="text-[10px] text-slate-500 block">Buat akun untuk mahasiswa / peneliti</span>
                </button>

                <button 
                  onClick={() => showToast('Log audit sistem berhasil diexport ke CSV!')}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-left transition-all cursor-pointer group"
                >
                  <Download className="h-5 w-5 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-800 block">Export Audit Log</span>
                  <span className="text-[10px] text-slate-500 block">Unduh rekap aktivitas sistem</span>
                </button>

                <button 
                  onClick={() => showToast('Security & Data Backup dipicu! Telemetry snapshot tersimpan.')}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-left transition-all cursor-pointer group"
                >
                  <Database className="h-5 w-5 text-blue-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-800 block">Trigger Backup System</span>
                  <span className="text-[10px] text-slate-500 block">Simpan cadangan basis data</span>
                </button>

                <button 
                  onClick={() => showToast('Cache sistem & sesi WebSocket disegarkan!')}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 text-left transition-all cursor-pointer group"
                >
                  <RotateCcw className="h-5 w-5 text-amber-600 mb-1 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold text-slate-800 block">Purge System Cache</span>
                  <span className="text-[10px] text-slate-500 block">Bersihkan memori sementara</span>
                </button>
              </div>
            </div>

            {/* Recent Audit Logs Stream */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                  <History className="h-4 w-4 text-emerald-600" /> Log Aktivitas Sistem Terbaru
                </h3>
                <span className="text-[10px] font-mono text-slate-400">{logs.length} Log Recorded</span>
              </div>

              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {logs.slice(0, 6).map(log => (
                  <div key={log.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start justify-between gap-3 text-xs">
                    <div>
                      <span className="font-bold text-slate-800 block">{log.action}</span>
                      <p className="text-[11px] text-slate-600">{log.details}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono text-emerald-700 font-bold block">{log.user}</span>
                      <span className="text-[9px] font-mono text-slate-400 block">{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TAB: USER MANAGEMENT (MANAJEMEN AKUN & PERMISSION)                    */}
      {/* ========================================================================= */}
      {activeTab === 'users' && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-6 shadow-xs animate-fade-in">
          
          {/* Header & Controls */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-slate-900 font-display">User Accounts & Role Permissions ({users.length})</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Manajemen akun pengguna portal laboratorium: Direktur, Asisten Lab, Mahasiswa Magang (Interns), dan System Administrator.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Cari nama atau email..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                />
              </div>

              <button
                onClick={() => setCreateUserOpen(true)}
                className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 cursor-pointer shrink-0"
              >
                <Plus className="h-4 w-4" />
                <span>Tambah Pengguna</span>
              </button>
            </div>
          </div>

          {/* Role Filter Tabs */}
          <div className="flex flex-wrap gap-2 pb-2">
            {[
              { id: 'ALL', label: 'Semua Akun' },
              { id: 'director', label: 'Director' },
              { id: 'assistant', label: 'Assistant' },
              { id: 'student', label: 'Student Interns' },
              { id: 'admin', label: 'Admin' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setRoleFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  roleFilter === tab.id 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md border border-emerald-500/40 scale-[1.02]' 
                    : 'bg-slate-100/90 border border-slate-200 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* User Accounts Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase border-b border-slate-200">
                <tr>
                  <th className="p-3.5">User Details</th>
                  <th className="p-3.5">Role</th>
                  <th className="p-3.5">NIM / Student ID</th>
                  <th className="p-3.5">Institution</th>
                  <th className="p-3.5">Specialty Track</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users
                  .filter(u => roleFilter === 'ALL' || u.role === roleFilter)
                  .filter(u => (u.name || '').toLowerCase().includes(userSearch.toLowerCase()) || (u.email || '').toLowerCase().includes(userSearch.toLowerCase()))
                  .map(user => (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img 
                            src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'} 
                            alt="" 
                            className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 shrink-0" 
                          />
                          <div>
                            <span className="font-bold text-slate-900 block text-xs">{user.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2.5 py-1 rounded-md font-mono text-[10px] uppercase font-bold border ${
                          user.role === 'director' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          user.role === 'assistant' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          user.role === 'admin' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-slate-700">{user.studentId || '-'}</td>
                      <td className="p-3.5 text-slate-600">{user.institution || 'Telkom University'}</td>
                      <td className="p-3.5 text-slate-600 max-w-xs truncate">{user.specialty || '-'}</td>
                      <td className="p-3.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => showToast(`Password reset link dikirim ke ${user.email}`)}
                            title="Reset Password"
                            className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                          >
                            <Lock className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => onDeleteUser(user.id)}
                            title="Delete User"
                            className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TAB: WEBSITE CONTENT CMS (PENGELOLA KONTEN PORTAL PUBLIK)               */}
      {/* ========================================================================= */}
      {activeTab === 'content' && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-6 shadow-xs animate-fade-in">
          
          {/* Header Description */}
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-teal-600" />
              <h2 className="text-xl font-bold text-slate-900 font-display">Website Content Management System (CMS)</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Fungsi: Mengelola seluruh konten yang tampil di portal publik website Smart Grow Laboratory (Berita & Publikasi, Showcase Projek R&D, dan Direktori Tim Penelitian).
            </p>
          </div>

          {/* Sub-Nav Tabs inside CMS */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-100/90 p-2 rounded-2xl border border-slate-200/80">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCmsTab('news')}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  cmsTab === 'news' 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md border border-emerald-500/40 scale-[1.02]' 
                    : 'bg-white text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Berita & Publikasi ({news.length})</span>
              </button>

              <button
                onClick={() => setCmsTab('projects')}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  cmsTab === 'projects' 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md border border-emerald-500/40 scale-[1.02]' 
                    : 'bg-white text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>Projek R&D Showcase ({projects.length})</span>
              </button>

              <button
                onClick={() => setCmsTab('team')}
                className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  cmsTab === 'team' 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md border border-emerald-500/40 scale-[1.02]' 
                    : 'bg-white text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Tim Penelitian ({team.length})</span>
              </button>
            </div>

            {/* Sub tab action button */}
            {cmsTab === 'news' && (
              <button
                onClick={() => setCreateNewsOpen(true)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="h-4 w-4" />
                <span>Tambah Berita Baru</span>
              </button>
            )}

            {cmsTab === 'projects' && (
              <button
                onClick={() => setCreateProjectOpen(true)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="h-4 w-4" />
                <span>Tambah Projek Baru</span>
              </button>
            )}
          </div>

          {/* CMS SECTION 1: NEWS & ARTICLES */}
          {cmsTab === 'news' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {news.map(item => (
                  <div key={item.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex gap-4 items-start justify-between">
                    <img src={item.image} alt="" className="w-24 h-20 rounded-xl object-cover shrink-0 border border-slate-200" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold text-teal-700 uppercase bg-teal-50 px-2 py-0.5 rounded border border-teal-200">{item.category}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs line-clamp-2">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{item.tagline}</p>
                    </div>
                    {onDeleteNews && (
                      <button 
                        onClick={() => onDeleteNews(item.id)} 
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CMS SECTION 2: R&D PROJECTS SHOWCASE */}
          {cmsTab === 'projects' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map(proj => (
                <div key={proj.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex gap-4 items-start justify-between">
                  <img src={proj.image} alt="" className="w-24 h-20 rounded-xl object-cover shrink-0 border border-slate-200" />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{proj.category}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{proj.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-xs">{proj.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{proj.description}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleOpenEditProject(proj)} 
                      className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-lg cursor-pointer"
                      title="Edit Projek R&D"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    {onDeleteProject && (
                      <button 
                        onClick={() => onDeleteProject(proj.id)} 
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer"
                        title="Hapus Projek"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CMS SECTION 3: RESEARCH TEAM DIRECTORY */}
          {cmsTab === 'team' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {team.map(member => (
                <div key={member.id} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-14 rounded-xl overflow-hidden shadow-inner shrink-0">
                      <TeamAvatar id={member.id} name={member.name} className="w-full h-full" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold text-teal-700 uppercase block">{member.role}</span>
                      <h4 className="font-bold text-slate-900 text-xs">{member.name}</h4>
                      <p className="text-[10px] text-slate-400 font-mono truncate max-w-[140px]">{member.email}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">{member.bio}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {member.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded bg-slate-100 text-[9px] text-slate-600 font-mono">#{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TAB: ATTENDANCE LOGS (PRESENSI & JAM KERJA LAB)                          */}
      {/* ========================================================================= */}
      {activeTab === 'attendance' && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-6 shadow-xs animate-fade-in">
          
          {/* Header Explanation */}
          <div className="border-b border-slate-100 pb-5">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-900 font-display">Presensi & Jam Kerja Laboratorium (Attendance Logs)</h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Fungsi: Memantau jam kerja harian, presensi fisik RFID/Badge, waktu masuk & keluar (Check-In / Check-Out), serta rekapitilasi total jam kerja mahasiswa magang.
            </p>
          </div>

          {/* RFID Tap Simulator Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="h-5 w-5 text-emerald-400 animate-pulse" />
                <h3 className="text-sm font-bold font-display text-white">Simulator Pindai Kartu Akses RFID Lab (Hardware Door Gate)</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                RC522 13.56MHz Active
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <select
                value={selectedScanStudentId}
                onChange={e => setSelectedScanStudentId(e.target.value)}
                className="w-full sm:w-auto flex-1 bg-slate-900 border border-slate-700 text-white text-xs rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500"
              >
                {studentUsers.map(st => (
                  <option key={st.id} value={st.id}>
                    {st.name} (NIM: {st.studentId || '1301210000'})
                  </option>
                ))}
              </select>

              <button
                onClick={handleRfidScan}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-md shadow-emerald-500/20"
              >
                <Radio className="h-4 w-4" />
                <span>Simulasikan Tap Kartu RFID</span>
              </button>
            </div>

            {rfidSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-900/80 border border-emerald-400 text-emerald-200 text-xs font-mono font-bold animate-fade-in">
                {rfidSuccessMsg}
              </div>
            )}
          </div>

          {/* Attendance Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Total Presensi Hari Ini</span>
              <p className="text-2xl font-black text-slate-900 mt-1">{attendance.filter(a => a.date === '2026-07-22').length} Anggota</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Rata-rata Jam Kerja</span>
              <p className="text-2xl font-black text-emerald-600 mt-1">8.2 Jam / Hari</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Tingkat Kehadiran Tepat Waktu</span>
              <p className="text-2xl font-black text-blue-600 mt-1">94.5 %</p>
            </div>
          </div>

          {/* Attendance Log Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 font-display">Log Riwayat Check-In / Check-Out</h3>
              <button 
                onClick={() => showToast('Data presensi bulanan berhasil diexport ke CSV!')}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" /> Export Excel/CSV
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-mono text-[10px] uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-3">Tanggal</th>
                    <th className="p-3">Mahasiswa / Peneliti</th>
                    <th className="p-3">Check-In</th>
                    <th className="p-3">Check-Out</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Catatan / Aktivitas Lab</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendance.map(att => (
                    <tr key={att.id} className="hover:bg-slate-50/80">
                      <td className="p-3 font-mono text-slate-500">{att.date}</td>
                      <td className="p-3 font-bold text-slate-900">{att.studentName}</td>
                      <td className="p-3 font-mono text-emerald-700 font-bold">{att.checkInTime || '-'}</td>
                      <td className="p-3 font-mono text-slate-600">{att.checkOutTime || '-'}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded font-mono text-[10px] font-bold uppercase border ${
                          att.status === 'present' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          att.status === 'late' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          att.status === 'leave' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-rose-50 text-rose-700 border-rose-200'
                        }`}>
                          {att.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 max-w-xs truncate">{att.notes || 'Penelitian & Kalibrasi Perangkat Lab'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TAB: APPLICANT SUBMISSIONS (5-STAGE SELECTION RECRUITMENT MANAGER)     */}
      {/* ========================================================================= */}
      {activeTab === 'applicants' && (
        <div className="animate-fade-in">
          <InternshipRecruitmentManager
            applicants={applicants}
            onAdvanceStage={(id, nextStage, notes) => {
              if (onAdvanceApplicantStage) {
                onAdvanceApplicantStage(id, nextStage, notes);
              } else if (nextStage === 5) {
                onApproveApplicant(id);
              }
            }}
            onApproveApplicant={onApproveApplicant}
            onRejectApplicant={onRejectApplicant}
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. TAB: SYSTEM AUDIT LOGS                                                 */}
      {/* ========================================================================= */}
      {activeTab === 'logs' && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-6 shadow-xs animate-fade-in">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">System Audit Logs</h2>
              <p className="text-xs text-slate-500">Catatan aktivitas dan riwayat keamanan portal</p>
            </div>
            <button
              onClick={() => showToast('Log audit berhasil diexport!')}
              className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="h-4 w-4" /> Export Audit CSV
            </button>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {logs.map(log => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{log.action}</span>
                  <span className="text-[11px] text-slate-500 font-sans">{log.details}</span>
                </div>
                <div className="text-right">
                  <span className="text-purple-700 font-bold text-[10px] block">{log.user}</span>
                  <span className="text-slate-400 text-[10px]">{log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CREATE USER MODAL */}
      {createUserOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 font-display">Buat Akun Pengguna Baru</h3>
              <button onClick={() => setCreateUserOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUserSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Shara Anjelia"
                  value={userName} 
                  onChange={e => setUserName(e.target.value)} 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Alamat Email</label>
                <input 
                  type="email" 
                  required 
                  placeholder="e.g. shara@student.telkomuniversity.ac.id"
                  value={userEmail} 
                  onChange={e => setUserEmail(e.target.value)} 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Peran / System Role</label>
                <select 
                  value={userRole} 
                  onChange={e => setUserRole(e.target.value as UserRole)} 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  <option value="student">Student Intern (Mahasiswa Magang)</option>
                  <option value="assistant">Laboratory Assistant (Asisten Lab)</option>
                  <option value="director">Director / Principal Investigator</option>
                  <option value="admin">System Administrator</option>
                </select>
              </div>

              {userRole === 'student' && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">NIM / Student ID</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 1301210042"
                    value={userStudentId} 
                    onChange={e => setUserStudentId(e.target.value)} 
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 font-mono" 
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Institusi</label>
                <input 
                  type="text" 
                  value={userInstitution} 
                  onChange={e => setUserInstitution(e.target.value)} 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Spesialisasi / Track Riset</label>
                <input 
                  type="text" 
                  value={userSpecialty} 
                  onChange={e => setUserSpecialty(e.target.value)} 
                  placeholder="e.g. Full-stack Developer, IoT Specialist" 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500" 
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Simpan & Buat Akun Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE NEWS ARTICLE MODAL */}
      {createNewsOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 font-display">Terbitkan Artikel Berita Baru</h3>
              <button onClick={() => setCreateNewsOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewsSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Artikel</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Smart Grow Lab Luncurkan HYCOSMARTS 1.0"
                  value={newsTitle} 
                  onChange={e => setNewsTitle(e.target.value)} 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tagline Ringkas</label>
                <input 
                  type="text" 
                  placeholder="e.g. Inovasi Terbaru Pertanian Siber"
                  value={newsTagline} 
                  onChange={e => setNewsTagline(e.target.value)} 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <select 
                    value={newsCategory} 
                    onChange={e => setNewsCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <option value="Innovations">Innovations</option>
                    <option value="Awards">Awards & Honors</option>
                    <option value="Research">Research Update</option>
                    <option value="Community">Community</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Waktu Baca</label>
                  <input 
                    type="text" 
                    value={newsReadTime} 
                    onChange={e => setNewsReadTime(e.target.value)} 
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200" 
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Foto Sampul</label>
                <input 
                  type="text" 
                  value={newsImage} 
                  onChange={e => setNewsImage(e.target.value)} 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px]" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Isi Berita Lengkap</label>
                <textarea 
                  rows={4}
                  required
                  placeholder="Tuliskan detail berita publikasi..."
                  value={newsContent} 
                  onChange={e => setNewsContent(e.target.value)} 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-teal-500 resize-none" 
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Terbitkan Ke Website Publik
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE PROJECT SHOWCASE MODAL */}
      {createProjectOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 font-display">Tambah Showcase Projek R&D Baru</h3>
              <button onClick={() => setCreateProjectOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProjectSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Projek</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Automated Aquaponics Telemetry Hub"
                  value={projTitle} 
                  onChange={e => setProjTitle(e.target.value)} 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500" 
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tagline Ringkas</label>
                <input 
                  type="text" 
                  placeholder="e.g. Telemetri Sensor pH & Suhu Air Real-Time"
                  value={projTagline} 
                  onChange={e => setProjTagline(e.target.value)} 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <select 
                    value={projCategory} 
                    onChange={e => setProjCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <option value="IoT & Hardware">IoT & Hardware</option>
                    <option value="Hydroponics">Hydroponics</option>
                    <option value="Aquaponics">Aquaponics</option>
                    <option value="Container-based">Container-based</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Projek</label>
                  <input 
                    type="date" 
                    value={projDate} 
                    onChange={e => setProjDate(e.target.value)} 
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200" 
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Projek</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Tuliskan spesifikasi teknis dan deskripsi projek..."
                  value={projDesc} 
                  onChange={e => setProjDesc(e.target.value)} 
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500 resize-none" 
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Publikasikan Showcase Projek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
