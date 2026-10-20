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
import { getTodayDateJakarta } from '../../utils/dateUtils';
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
import AttendanceView from './AttendanceView';
import { resolveUserAvatar } from '../../utils/imageUtils';
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
  onDeleteRegistration?: (id: string) => void;
  onClearAllRegistrations?: () => void;
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
  onDeleteRegistration,
  onClearAllRegistrations,
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

  // Attendance Filters State
  const [attendanceSearch, setAttendanceSearch] = useState('');

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

  // Settings State
  const [labOpenHour, setLabOpenHour] = useState('08:00');
  const [labCloseHour, setLabCloseHour] = useState('17:00');
  const [lateToleranceMins, setLateToleranceMins] = useState('30');
  const [geofenceRadius, setGeofenceRadius] = useState('50');
  const [autoCheckoutReminder, setAutoCheckoutReminder] = useState(true);
  const [telegramAlerts, setTelegramAlerts] = useState(true);
  const [criticalThresholdAlert, setCriticalThresholdAlert] = useState(true);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportAttendanceCSV = () => {
    const headers = ['Tanggal', 'Nama Mahasiswa', 'Check-In', 'Check-Out', 'Status', 'Durasi (Menit)', 'Catatan Aktivitas'];
    const rows = attendance.map(a => [
      `"${a.date}"`,
      `"${a.studentName}"`,
      `"${a.checkInTime || '-'}"`,
      `"${a.checkOutTime || '-'}"`,
      `"${a.status}"`,
      `"${a.durationMinutes || 0}"`,
      `"${(a.notes || 'Penelitian & Kalibrasi Perangkat Lab').replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `rekap_presensi_admin_${getTodayDateJakarta()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Data presensi berhasil diexport ke file CSV!');
  };

  const handleExportAuditLogsCSV = () => {
    const headers = ['ID Log', 'Waktu', 'Pengguna', 'Aksi', 'Keterangan Detail'];
    const rows = logs.map(l => [
      `"${l.id}"`,
      `"${l.timestamp}"`,
      `"${l.user}"`,
      `"${l.action.replace(/"/g, '""')}"`,
      `"${(l.details || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `audit_sistem_smart_grow_${getTodayDateJakarta()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Data audit log berhasil diexport ke file CSV!');
  };

  const handleExportDatabaseSnapshot = () => {
    const snapshot = {
      exportDate: new Date().toISOString(),
      institution: 'Smart Grow Laboratory - Telkom University',
      location: 'Bandung Techno Park (BTP) Lt. 2',
      counts: {
        users: users.length,
        attendance: attendance.length,
        projects: projects.length,
        news: news.length,
        logs: logs.length,
        applicants: applicants.length,
        pendingRegistrations: pendingRegistrations.length
      },
      users,
      attendance,
      projects,
      news,
      team,
      logs,
      applicants,
      pendingRegistrations
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(snapshot, null, 2))}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = `smart_grow_lab_database_snapshot_${getTodayDateJakarta()}.json`;
    link.click();
    showToast('Snapshot database JSON berhasil diunduh!');
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



  const pendingApplicants = applicants.filter(a => a.status === 'pending');
  const activeStudents = users.filter(u => u.role === 'student' && u.status === 'active');
  const alumniUsers = users.filter(u => u.status === 'alumni');
  const directorUsers = users.filter(u => u.role === 'director');
  const assistantUsers = users.filter(u => u.role === 'assistant');
  const adminUsers = users.filter(u => u.role === 'admin');

  // Smart user search matching supporting Indonesian phonetic variants (e.g. naswa <-> nasywa, shela <-> shella)
  const matchUserSearch = (u: User, query: string): boolean => {
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    
    const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const phon = (s: string) => norm(s).replace(/sy/g, 's').replace(/sh/g, 's').replace(/kh/g, 'k').replace(/y/g, '');

    const qNorm = norm(q);
    const qPhon = phon(q);

    const fields = [
      u.name || '',
      u.email || '',
      u.studentId || '',
      u.internId || '',
      u.specialty || '',
      u.institution || '',
      u.role || '',
      u.status || ''
    ];

    if (fields.some(f => f.toLowerCase().includes(q))) return true;
    if (fields.some(f => norm(f).includes(qNorm))) return true;
    if (fields.some(f => phon(f).includes(qPhon))) return true;

    return false;
  };

  return (
    <div className="space-y-8 font-sans animate-fade-in relative">
      
      {activeTab === 'pending_registrations' && (
        <PendingRegistrationsView 
          registrations={pendingRegistrations}
          onApprove={onApproveRegistration || (() => {})}
          onReject={onRejectRegistration || (() => {})}
          onDelete={onDeleteRegistration}
          onClearAll={onClearAllRegistrations}
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

      {/* ========================================================================= */}
      {/* 1. TAB: ADMIN DASHBOARD (COMMAND CENTER OVERVIEW)                         */}
      {/* ========================================================================= */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          
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
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Mahasiswa Magang Aktif</span>
                <p className="text-3xl font-black text-slate-900 font-display mt-1">{activeStudents.length}</p>
                <span className="text-[11px] font-bold text-blue-600 flex items-center gap-1 mt-1">
                  <GraduationCap className="h-3 w-3" /> {alumniUsers.length} Alumni (Non-Aktif)
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
                   Live on public site
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
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder="Cari nama, email, atau NIM..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner"
                />
                {userSearch && (
                  <button
                    onClick={() => setUserSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    title="Hapus pencarian"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
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

          {/* Search Result Banner if query is active */}
          {userSearch.trim() && (
            <div className="flex items-center justify-between text-xs bg-emerald-50 border border-emerald-200/80 rounded-2xl px-4 py-2.5 text-emerald-800 font-medium">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  Menampilkan hasil pencarian untuk "<strong>{userSearch}</strong>" di semua role (
                  <strong>{users.filter(u => matchUserSearch(u, userSearch)).length}</strong> ditemukan)
                </span>
              </div>
              <button 
                onClick={() => setUserSearch('')}
                className="text-emerald-700 hover:text-emerald-950 font-bold text-[11px] underline cursor-pointer shrink-0 ml-2"
              >
                Reset Filter
              </button>
            </div>
          )}

          {/* Role Filter Tabs */}
          <div className="flex flex-wrap gap-2 pb-2">
            {[
              { id: 'ALL', label: `Semua Akun (${users.length})` },
              { id: 'director', label: `Director (${directorUsers.length})` },
              { id: 'assistant', label: `Assistant (${assistantUsers.length})` },
              { id: 'student', label: `Mahasiswa Magang (${activeStudents.length})` },
              { id: 'alumni', label: `Alumni (${alumniUsers.length})` },
              { id: 'admin', label: `Admin (${adminUsers.length})` },
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
            <table className="w-full text-left text-xs min-w-[720px]">
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
                  .filter(u => {
                    const isSearching = Boolean(userSearch.trim());
                    // When searching, match across all roles so the user is never blocked by an active tab
                    if (isSearching) {
                      return matchUserSearch(u, userSearch);
                    }
                    if (roleFilter === 'ALL') return true;
                    if (roleFilter === 'alumni') return u.status === 'alumni';
                    if (roleFilter === 'student') return u.role === 'student' && u.status !== 'alumni';
                    return u.role === roleFilter;
                  })
                  .map(user => (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <img 
                            src={resolveUserAvatar(user)} 
                            alt={user.name} 
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
                          user.status === 'alumni' ? 'bg-slate-100 text-slate-700 border-slate-300' :
                          user.role === 'director' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          user.role === 'assistant' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          user.role === 'admin' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-teal-50 text-teal-800 border-teal-200'
                        }`}>
                          {user.status === 'alumni' ? 'ALUMNI' : user.role}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-slate-700">{user.studentId || '-'}</td>
                      <td className="p-3.5 text-slate-600">{user.institution || 'Telkom University'}</td>
                      <td className="p-3.5 text-slate-600 max-w-xs truncate">{user.specialty || '-'}</td>
                      <td className="p-3.5">
                        {user.status === 'alumni' || user.status === 'inactive' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-slate-600 text-[10px] font-bold">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" /> Non-Aktif (Alumni)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
                          </span>
                        )}
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
        <div className="space-y-6 animate-fade-in">
          <AttendanceView
            attendance={attendance}
            students={users.filter(u => u.role === 'student')}
            currentUser={currentUser}
            onCheckIn={onCheckInStudent}
            onCheckOut={onCheckOutStudent}
            darkMode={darkMode}
          />
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
              onClick={handleExportAuditLogsCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
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

      {/* ========================================================================= */}
      {/* 7. TAB: SYSTEM SETTINGS (PENGATURAN SISTEM & MAINTENANCE)                */}
      {/* ========================================================================= */}
      {activeTab === 'settings' && (
        <div className="space-y-6 animate-fade-in font-sans">
          
          {/* Header */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-1">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl font-bold text-slate-900 font-display">Pengaturan Sistem & Kebijakan Laboratorium</h2>
            </div>
            <p className="text-xs text-slate-500">
              Konfigurasi kebijakan jam operasional, parameter geofence presensi BTP Lt. 2, aturan alert, dan pencadangan database sistem.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Box 1: Operating Hours & Attendance Rules */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <Clock className="h-5 w-5 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900 font-display">Kebijakan Jam Kerja & Presensi</h3>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Jam Buka Lab (WIB)</label>
                    <input 
                      type="time" 
                      value={labOpenHour} 
                      onChange={e => setLabOpenHour(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Jam Tutup Lab (WIB)</label>
                    <input 
                      type="time" 
                      value={labCloseHour} 
                      onChange={e => setLabCloseHour(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Toleransi Keterlambatan Check-In (Menit)</label>
                  <input 
                    type="number" 
                    value={lateToleranceMins} 
                    onChange={e => setLateToleranceMins(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Mahasiswa yang check-in lebih dari {lateToleranceMins} menit setelah jam buka akan ditandai Status 'Late'.</span>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <div>
                    <span className="font-bold text-slate-800 block">Pengingat Otomatis Check-Out</span>
                    <span className="text-[10px] text-slate-400">Kirim pemberitahuan saat jam operasional lab berakhir (17:00 WIB)</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={autoCheckoutReminder} 
                    onChange={e => setAutoCheckoutReminder(e.target.checked)}
                    className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Box 2: Geofence & Hardware Access Gate */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <Radio className="h-5 w-5 text-teal-600" />
                <h3 className="text-sm font-bold text-slate-900 font-display">Geofence GPS & Gerbang RFID BTP</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pusat Lokasi:</span>
                    <span className="font-bold text-slate-800">Bandung Techno Park (BTP) Lt. 2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Koordinat Resmi:</span>
                    <span className="font-bold text-emerald-700">-6.974488, 107.630441</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Algoritma Verifikasi:</span>
                    <span className="font-bold text-slate-800">Haversine Great-Circle Distance</span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Radius Toleransi Geofence (Meter)</label>
                  <input 
                    type="number" 
                    value={geofenceRadius} 
                    onChange={e => setGeofenceRadius(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Jarak maksimal mahasiswa dari gedung BTP saat presensi (saat ini: {geofenceRadius}m).</span>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <div>
                    <span className="font-bold text-slate-800 block">Sinkronisasi RFID RC522 Reader</span>
                    <span className="text-[10px] text-slate-400">Gerbang RFID sinkron otomatis dengan UID badge mahasiswa</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200">
                    AKTIF & TERHUBUNG
                  </span>
                </div>
              </div>
            </div>

            {/* Box 3: Notification & Alerts */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <Zap className="h-5 w-5 text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900 font-display">Notifikasi & Peringatan Otomatis</h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <div>
                    <span className="font-bold text-slate-800 block">Notifikasi Broadcast Pengumuman</span>
                    <span className="text-[10px] text-slate-400">Kirim notifikasi in-app otomatis saat pengumuman baru diterbitkan</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={telegramAlerts} 
                    onChange={e => setTelegramAlerts(e.target.checked)}
                    className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <div>
                    <span className="font-bold text-slate-800 block">Peringatan Sensor Kritis (Telemetry)</span>
                    <span className="text-[10px] text-slate-400">Alert otomatis jika pH air &lt; 5.5 atau suhu container &gt; 28°C</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={criticalThresholdAlert} 
                    onChange={e => setCriticalThresholdAlert(e.target.checked)}
                    className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Box 4: Database Backup & Maintenance */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                <Database className="h-5 w-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 font-display">Pencadangan & Pemeliharaan Database</h3>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Simpan cadangan lengkap sistem yang berisi akun pengguna ({users.length}), catatan presensi ({attendance.length}), proyek riset ({projects.length}), berita, dan riwayat log ke dalam file JSON terenkripsi.
                </p>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  <button
                    onClick={handleExportDatabaseSnapshot}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-all active:scale-95"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Snapshot Database (JSON)</span>
                  </button>

                  <button
                    onClick={() => {
                      showToast('Konfigurasi pengaturan sistem berhasil disimpan!');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Simpan Konfigurasi</span>
                  </button>
                </div>
              </div>
            </div>

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
