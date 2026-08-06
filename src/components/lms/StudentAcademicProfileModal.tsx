import React, { useState } from 'react';
import { User, Task, AttendanceRecord, LmsProject } from '../../types';
import { 
  X, 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  RotateCcw, 
  Github, 
  ExternalLink, 
  Download, 
  Printer, 
  Send, 
  FileText, 
  Award, 
  BarChart3, 
  Layers, 
  Sparkles, 
  ChevronRight, 
  CheckSquare, 
  Building2, 
  UserCheck, 
  Eye, 
  BookOpen, 
  Star,
  Activity,
  FolderKanban
} from 'lucide-react';

interface StudentAcademicProfileModalProps {
  student: User;
  onClose: () => void;
  tasks?: Task[];
  attendance?: AttendanceRecord[];
  projects?: LmsProject[];
  darkMode?: boolean;
}

export default function StudentAcademicProfileModal({
  student,
  onClose,
  tasks = [],
  attendance = [],
  projects = [],
  darkMode = false
}: StudentAcademicProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'academic' | 'tasks' | 'attendance' | 'files' | 'timeline'>('overview');
  const [sendMessageOpen, setSendMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSentSuccess, setMessageSentSuccess] = useState(false);
  const [previewFile, setPreviewFile] = useState<{ name: string; category: string; url: string } | null>(null);

  // Student specific tasks & attendance
  const studentTasks = tasks.filter(t => t.assignedStudentId === student.id || t.assignedStudentName === student.name);
  const studentAttendance = attendance.filter(a => a.studentId === student.id || a.studentName === student.name);
  
  // Stats calculation fallback
  const completedTasksCount = studentTasks.filter(t => t.status === 'completed').length;
  const reviewTasksCount = studentTasks.filter(t => t.status === 'review').length;
  const revisionTasksCount = studentTasks.filter(t => t.status === 'revision').length;
  const inProgressTasksCount = studentTasks.filter(t => t.status === 'in_progress').length;
  const totalTasks = studentTasks.length || student.taskSummaryData?.total || 5;

  const presentCount = studentAttendance.filter(a => a.status === 'present').length || student.attendanceSummaryData?.present || 18;
  const lateCount = studentAttendance.filter(a => a.status === 'late').length || student.attendanceSummaryData?.late || 2;
  const sickCount = studentAttendance.filter(a => a.status === 'sick').length || student.attendanceSummaryData?.sick || 1;
  const leaveCount = studentAttendance.filter(a => a.status === 'leave').length || student.attendanceSummaryData?.leave || 0;

  // Active Project calculation
  const activeProjName = student.activeProjects?.[0] || 'HYCOSMARTS - Container Farm Cerdas Berbasis AI';
  const matchedProject = projects.find(p => p.title.toLowerCase().includes(activeProjName.toLowerCase())) || projects[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessageSentSuccess(true);
    setTimeout(() => {
      setMessageSentSuccess(false);
      setSendMessageOpen(false);
      setMessageText('');
    }, 1800);
  };

  const handlePrintProfile = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full max-h-[92vh] h-full sm:h-auto flex flex-col overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 animate-scale-up text-slate-800 dark:text-slate-100 my-auto">
        
        {/* TOP HEADER BAR */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#2E7D32] shrink-0">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block truncate">
                Profil Akademik & Portfolio Mahasiswa Magang
              </span>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 leading-tight truncate">
                {student.name} ({student.studentId || '1301210042'})
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSendMessageOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Kirim Pesan</span>
            </button>

            <button
              onClick={handlePrintProfile}
              className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer"
              title="Cetak Laporan Profil"
            >
              <Printer className="h-4 w-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* PROFILE HERO HEADER */}
        <div className="relative bg-gradient-to-r from-slate-900 via-teal-950 to-emerald-950 p-4 sm:p-6 md:p-8 text-white shrink-0 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#2e7d32_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-4 sm:gap-5">
              {/* Large Avatar */}
              <div className="relative group shrink-0">
                <img
                  src={
                    student.avatar && !student.avatar.includes('unsplash.com') 
                      ? student.avatar 
                      : student.name.toLowerCase().includes('shara') ? '/images/team/shara.jpg'
                      : student.name.toLowerCase().includes('shella') || student.name.toLowerCase().includes('shela') ? '/images/team/shela.jpg'
                      : student.name.toLowerCase().includes('sirvani') ? '/images/team/sirvani.jpg'
                      : student.name.toLowerCase().includes('tiara') ? '/images/team/tiara.jpg'
                      : student.name.toLowerCase().includes('nasywa') ? '/images/team/nasywa-zauja-noor.jpg'
                      : student.name.toLowerCase().includes('divia') ? '/images/team/divia-nuralika-namira.jpg'
                      : student.name.toLowerCase().includes('azliny') ? '/images/team/azliny.jpg'
                      : student.name.toLowerCase().includes('chiko') ? '/images/team/chiko.jpg'
                      : student.name.toLowerCase().includes('indrarini') ? '/images/team/indrarini.jpg'
                      : student.avatar || '/images/team/shara.jpg'
                  }
                  alt={student.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-3xl object-cover border-4 border-white/20 shadow-xl shrink-0"
                />
                <span className="absolute -bottom-1 -right-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold border-2 border-slate-900 shadow-sm flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>{student.status === 'active' ? 'Aktif' : 'Non-Aktif'}</span>
                </span>
              </div>

              {/* Student Header Info */}
              <div className="text-center sm:text-left space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-[11px] font-mono font-bold border border-emerald-400/30">
                    NIM: {student.studentId || '1301220015'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] sm:text-[11px] font-bold border border-blue-400/30">
                    {student.institution || 'Telkom University'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] sm:text-[11px] font-bold border border-amber-400/30">
                    {student.semester || 'Semester 6'}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                  {student.name}
                </h1>
                
                <p className="text-xs text-emerald-200/90 font-medium max-w-xl">
                  {student.title || 'Mahasiswa Magang Riset IoT & Sensor Specialist'}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-[11px] text-slate-300 pt-1">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5 text-emerald-400" />
                    <span>{student.major || 'Teknik Komputer'}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5 text-blue-400" />
                    <span>{student.faculty || 'Fakultas Ilmu Terapan'}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <UserCheck className="h-3.5 w-3.5 text-amber-400" />
                    <span>Pembimbing: {student.advisor || 'Prof. Dr. Indrarini Dyah Irawati'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick KPI & Progress Circle Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 flex flex-row md:flex-col justify-around items-center gap-3 text-center shrink-0">
              <div>
                <span className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider block mb-0.5">Overall Progress</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-300">{student.kpiData?.overallProgress || 86}%</span>
              </div>
              <div className="w-px h-8 md:w-full md:h-px bg-white/20" />
              <div>
                <span className="text-[10px] text-blue-200 uppercase font-bold tracking-wider block mb-0.5">Skor Presensi</span>
                <span className="text-xl sm:text-2xl font-black text-blue-300">{student.kpiData?.attendanceScore || 95}%</span>
              </div>
            </div>
          </div>

          {/* NAV TABS */}
          <div className="flex items-center gap-1 mt-4 sm:mt-6 pt-3 border-t border-white/10 overflow-x-auto text-xs no-scrollbar">
            {[
              { id: 'overview', label: 'Ringkasan & KPI', icon: BarChart3 },
              { id: 'academic', label: 'Data Akademik & Pembimbing', icon: GraduationCap },
              { id: 'tasks', label: `Tugas (${totalTasks})`, icon: CheckSquare },
              { id: 'attendance', label: 'Presensi & Kehadiran', icon: Clock },
              { id: 'timeline', label: 'Timeline Milestone', icon: Activity },
              { id: 'files', label: 'Dokumen & Portfolio', icon: FileText }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold flex items-center gap-1.5 sm:gap-2 whitespace-nowrap transition-all cursor-pointer text-xs ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* MODAL BODY CONTENT (Inner scrollable flex-1) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0 space-y-6">

          {/* TAB 1: OVERVIEW & KPI */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              
              {/* 5 KPI CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase block mb-1">Capaian Progress</span>
                  <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">{student.kpiData?.overallProgress || 86}%</p>
                  <p className="text-[10px] text-emerald-600 mt-1 font-semibold">Tugas & Milestone</p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] font-bold text-blue-800 dark:text-blue-300 uppercase block mb-1">Tingkat Kehadiran</span>
                  <p className="text-2xl font-black text-blue-700 dark:text-blue-300">{student.kpiData?.attendanceScore || 95}%</p>
                  <p className="text-[10px] text-blue-600 mt-1 font-semibold">Hadir Tepat Waktu</p>
                </div>

                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                  <span className="text-[10px] font-bold text-purple-800 dark:text-purple-300 uppercase block mb-1">Penyelesaian Tugas</span>
                  <p className="text-2xl font-black text-purple-700 dark:text-purple-300">{student.kpiData?.taskCompletionRate || 92}%</p>
                  <p className="text-[10px] text-purple-600 mt-1 font-semibold">{completedTasksCount} / {totalTasks} Tugas Selesai</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase block mb-1">Kontribusi Riset</span>
                  <p className="text-2xl font-black text-amber-700 dark:text-amber-300">{student.kpiData?.researchContribution || 88}%</p>
                  <p className="text-[10px] text-amber-600 mt-1 font-semibold">Inovasi Hardware & Code</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 col-span-2 lg:col-span-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Nilai Review / Grade</span>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">A (94.8)</p>
                  <p className="text-[10px] text-slate-500 mt-1 font-semibold">Evaluasi Pembimbing</p>
                </div>
              </div>

              {/* CURRENT RESEARCH PROJECT DETAILS CARD */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderKanban className="h-5 w-5 text-[#2E7D32]" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Proyek Riset Saat Ini</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300">
                    Proyek Aktif
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400">{matchedProject.projectNumber}</span>
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-base">{matchedProject.title}</h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">Progress Capaian</span>
                      <span className="text-sm font-black text-[#2E7D32]">{matchedProject.progressPercent}%</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {matchedProject.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs pt-2 border-t border-slate-100 dark:border-slate-700">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Peran / Role Dalam Proyek:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{student.roleInProject || 'Lead IoT & Sensor Specialist'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Pembimbing Utama:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{student.advisor || 'Prof. Dr. Indrarini Dyah Irawati'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Repository GitHub:</span>
                      {student.github ? (
                        <a href={student.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:underline">
                          <Github className="h-3.5 w-3.5" />
                          <span>Link Repository</span>
                        </a>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SKILLS BADGES */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span>Keahlian & Spesialisasi Kunci (Skills)</span>
                </h3>

                <div className="flex flex-wrap gap-2">
                  {(student.skillsList || ['RS485 Modbus', 'C++ ESP32', 'Python', 'React', 'OpenCV', 'Grafana', 'IoT Hardware', 'Tailwind CSS']).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-xs flex items-center gap-1.5">
                      <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ACADEMIC DETAILS & ADVISORS */}
          {activeTab === 'academic' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Academic Profile Info */}
                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                    <GraduationCap className="h-4 w-4 text-[#2E7D32]" />
                    <span>Informasi Akademik Perguruan Tinggi</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500">Nama Lengkap</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{student.name}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500">NIM (Nomor Induk Mahasiswa)</span>
                      <span className="font-mono font-bold text-[#2E7D32]">{student.studentId || '1301220015'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500">Perguruan Tinggi</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{student.institution || 'Telkom University'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500">Fakultas</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{student.faculty || 'Fakultas Ilmu Terapan'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500">Program Studi</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{student.major || 'Teknik Komputer / RPL'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500">Semester Saat Ini</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{student.semester || 'Semester 6'}</span>
                    </div>
                  </div>
                </div>

                {/* Internship & Advisor Info */}
                <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                    <span>Informasi Program Magang & Kontak</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500">Status Magang</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                        {student.internshipStatus || 'Mahasiswa Magang Aktif'}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500">Tanggal Mulai Magang</span>
                      <span className="font-mono font-semibold">{student.startDate || '01 September 2025'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500">Tanggal Selesai Magang</span>
                      <span className="font-mono font-semibold">{student.endDate || '28 Februari 2026'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500">Dosen Pembimbing Kampus</span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">{student.campusAdvisor || 'Dr. Eng. Agus Pratamo, S.T., M.T.'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500">Pembimbing Laboratorium</span>
                      <span className="font-bold text-[#2E7D32]">{student.advisor || 'Prof. Dr. Indrarini Dyah Irawati'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500">Email Kampus</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300">{student.email}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-slate-500">Nomor Telepon / WA</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300">{student.phone || '+62 812-9988-7766'}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: TASKS TABLE */}
          {activeTab === 'tasks' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-[#2E7D32]" />
                  <span>Daftar Tugas Magang & Status Pengerjaan</span>
                </h3>
                <span className="text-xs text-slate-500 font-semibold">Total: {studentTasks.length} Tugas</span>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="py-3 px-4">Nomor & Judul Tugas</th>
                        <th className="py-3 px-4">Proyek</th>
                        <th className="py-3 px-4">Deadline</th>
                        <th className="py-3 px-4">Progress</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Lampiran & GitHub</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                      {studentTasks.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                          <td className="py-3.5 px-4">
                            <span className="font-mono text-[10px] font-bold text-[#2E7D32] bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                              {t.taskNumber || 'TGS-2026-001'}
                            </span>
                            <h4 className="font-bold text-slate-800 dark:text-slate-100 mt-1">{t.title}</h4>
                            <p className="text-[11px] text-slate-500 line-clamp-1">{t.description}</p>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                            {t.projectName}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                            {t.deadline}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className="font-bold text-[#2E7D32]">{t.progressPercent}%</span>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              t.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                              t.status === 'review' ? 'bg-blue-100 text-blue-800' :
                              t.status === 'revision' ? 'bg-amber-100 text-amber-800' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {t.status === 'completed' ? 'Selesai' :
                               t.status === 'review' ? 'Menunggu Review' :
                               t.status === 'revision' ? 'Revisi' : 'Dalam Proses'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {t.githubUrl ? (
                              <a href={t.githubUrl} target="_blank" rel="noreferrer" className="text-emerald-600 font-bold hover:underline inline-flex items-center gap-1">
                                <Github className="h-3.5 w-3.5" />
                                <span>Code</span>
                              </a>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                        </tr>
                      ))}

                      {studentTasks.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-8 text-slate-400 text-xs">
                            Belum ada riwayat tugas tercatat untuk mahasiswa ini.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ATTENDANCE SUMMARY */}
          {activeTab === 'attendance' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase block mb-1">Hadir Tepat Waktu</span>
                  <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300">{presentCount} Hari</p>
                </div>
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                  <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase block mb-1">Terlambat</span>
                  <p className="text-2xl font-black text-amber-700 dark:text-amber-300">{lateCount} Hari</p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                  <span className="text-[10px] font-bold text-blue-800 dark:text-blue-300 uppercase block mb-1">Izin Sakit</span>
                  <p className="text-2xl font-black text-blue-700 dark:text-blue-300">{sickCount + leaveCount} Hari</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Tanpa Keterangan (Alpha)</span>
                  <p className="text-2xl font-black text-slate-700 dark:text-slate-200">0 Hari</p>
                </div>
              </div>

              {/* Attendance Log Table */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        <th className="py-3 px-4">Tanggal</th>
                        <th className="py-3 px-4">Jam Masuk</th>
                        <th className="py-3 px-4">Jam Keluar</th>
                        <th className="py-3 px-4">Durasi</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Catatan Kegiatan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                      {studentAttendance.map((a) => (
                        <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                          <td className="py-3 px-4 font-mono font-bold text-slate-800 dark:text-slate-100">{a.date}</td>
                          <td className="py-3 px-4 font-mono text-emerald-600">{a.checkInTime || '-'}</td>
                          <td className="py-3 px-4 font-mono text-slate-500">{a.checkOutTime || '-'}</td>
                          <td className="py-3 px-4 font-medium">{a.duration || '8 Jam'}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              a.status === 'present' ? 'bg-emerald-100 text-emerald-800' :
                              a.status === 'late' ? 'bg-amber-100 text-amber-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {a.status === 'present' ? 'Hadir' : a.status === 'late' ? 'Terlambat' : 'Izin'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{a.notes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: TIMELINE */}
          {activeTab === 'timeline' && (
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-6 animate-fade-in">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#2E7D32]" />
                <span>Histori Timeline & Milestone Aktivitas Magang</span>
              </h3>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-300 dark:before:bg-slate-700">
                {(student.timelineEvents || [
                  { date: '01 September 2025', title: 'Penerimaan & Onboarding Magang', description: 'Resmi bergabung dalam tim riset Smart Grow Lab Telkom University.', type: 'start' },
                  { date: '15 September 2025', title: 'Penugasan Proyek Riset Utama', description: 'Dipercaya memegang modul kalibrasi sensor NPK & RS485 Modbus.', type: 'milestone' },
                  { date: '20 Oktober 2025', title: 'Submit Milestone 1: Skematik Hardware', description: 'Penyelesaian skematik papan sirkuit kustom ESP32 disetujui Asisten.', type: 'task' },
                  { date: '15 Desember 2025', title: 'Revisi & Optimalisasi Firmware', description: 'Perbaikan algoritma kompensasi suhu larutan nutrisi.', type: 'revision' },
                  { date: '20 Juli 2026', title: 'Pengujian Lapangan Container Farm', description: 'Uji integrasi sensor pada HYCOSMARTS Container Farm #2.', type: 'milestone' }
                ]).map((item, idx) => (
                  <div key={idx} className="relative space-y-1 text-xs">
                    <span className="absolute -left-8 top-1.5 w-4 h-4 rounded-full bg-[#2E7D32] border-2 border-white dark:border-slate-900 ring-2 ring-emerald-200 dark:ring-emerald-950" />
                    <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{item.date}</span>
                    <h4 className="font-extrabold text-slate-800 dark:text-slate-100">{item.title}</h4>
                    <p className="text-slate-500 line-clamp-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FILES & DOCUMENTS */}
          {activeTab === 'files' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#2E7D32]" />
                  <span>Berkas, Dokumen & Portfolio Mahasiswa</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(student.documentsList || [
                  { name: 'Laporan_Kemajuan_Riset_Magang_v2.pdf', category: 'Laporan PDF', url: '#', date: '2026-07-20', size: '4.2 MB' },
                  { name: 'Panduan_Kalibrasi_Sensor_RS485.pdf', category: 'Modul Teknis', url: '#', date: '2026-07-15', size: '2.1 MB' },
                  { name: 'Skematik_Sirkuit_ESP32_Modbus.pdf', category: 'CAD & Schematics', url: '#', date: '2026-07-10', size: '1.8 MB' },
                  { name: 'Sertifikat_Internship_SmartGrowLab.pdf', category: 'Sertifikat', url: '#', date: '2026-07-01', size: '1.2 MB' }
                ]).map((doc, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 text-xs shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#2E7D32]">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{doc.name}</h4>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span>{doc.category}</span>
                          <span>•</span>
                          <span>{doc.size || '2.5 MB'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => setPreviewFile(doc)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Pratinjau</span>
                      </button>
                      <a
                        href={doc.url}
                        download
                        className="p-1.5 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-bold transition-all cursor-pointer"
                        title="Unduh Berkas"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 text-xs">
          <span className="text-slate-400">
            Terakhir diperbarui: 22 Juli 2026 oleh System
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold cursor-pointer transition-all"
          >
            Tutup Profil
          </button>
        </div>

      </div>

      {/* POPUP: SEND MESSAGE */}
      {sendMessageOpen && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Send className="h-4 w-4 text-[#2E7D32]" />
                <span>Kirim Pesan Langsung ke {student.name}</span>
              </h3>
              <button onClick={() => setSendMessageOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            {messageSentSuccess ? (
              <div className="py-8 text-center space-y-2 text-emerald-600">
                <CheckCircle2 className="h-10 w-10 mx-auto" />
                <p className="font-bold text-sm">Pesan Berhasil Terkirim!</p>
                <p className="text-xs text-slate-500">Mahasiswa akan menerima notifikasi pada dashboard.</p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Penerima</label>
                  <input type="text" value={`${student.name} (${student.email})`} disabled className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500 font-medium" />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Isi Pesan / Instruksi Khusus</label>
                  <textarea
                    rows={4}
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    placeholder="Tuliskan pesan, apresiasi, atau instruksi langsung untuk mahasiswa magang..."
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-xs"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setSendMessageOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold">Batal</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#2E7D32] text-white font-bold shadow-md flex items-center gap-1.5">
                    <Send className="h-3.5 w-3.5" />
                    <span>Kirim Notifikasi</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* POPUP: PREVIEW FILE */}
      {previewFile && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-700 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#2E7D32]" />
                <span>Pratinjau Berkas Dokumen</span>
              </h3>
              <button onClick={() => setPreviewFile(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-700/50 text-center space-y-3 border border-dashed border-slate-300">
              <FileText className="h-12 w-12 mx-auto text-[#2E7D32]" />
              <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{previewFile.name}</h4>
              <p className="text-slate-500 text-[11px]">Kategori: {previewFile.category}</p>
              <p className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950 p-2 rounded-xl inline-block">
                Dokumen Resmi Terverifikasi Smart Grow Laboratory Telkom University
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setPreviewFile(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold">Tutup</button>
              <a href={previewFile.url} download className="px-5 py-2 rounded-xl bg-[#2E7D32] text-white font-bold shadow-md flex items-center gap-1.5">
                <Download className="h-3.5 w-3.5" />
                <span>Unduh File</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
