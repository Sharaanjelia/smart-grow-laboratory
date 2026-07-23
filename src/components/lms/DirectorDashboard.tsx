import React, { useState } from 'react';
import { 
  User, 
  Task, 
  AttendanceRecord, 
  LmsProject, 
  ApprovalRequest, 
  LmsNotification, 
  SystemLog,
  Announcement,
  ApplicantRecord
} from '../../types';
import ProfileView from './ProfileView';
import ProjectModal from './ProjectModal';
import AttendanceView from './AttendanceView';
import ReportExportModal from './ReportExportModal';
import StudentAcademicProfileModal from './StudentAcademicProfileModal';
import { 
  Users, 
  FolderKanban, 
  CheckSquare, 
  Clock, 
  FileCheck2, 
  BarChart3, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  UserCheck, 
  GraduationCap, 
  ArrowUpRight, 
  Search, 
  Filter, 
  Calendar, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  Award,
  BookOpen,
  Plus,
  Edit3,
  Trash2,
  Github
} from 'lucide-react';

interface DirectorDashboardProps {
  currentUser?: User;
  activeTab: string;
  users: User[];
  tasks: Task[];
  attendance: AttendanceRecord[];
  projects: LmsProject[];
  announcements?: Announcement[];
  approvalRequests: ApprovalRequest[];
  notifications?: LmsNotification[];
  logs: SystemLog[];
  applicants?: ApplicantRecord[];
  onApproveRequest: (id: string) => void;
  onRejectRequest: (id: string) => void;
  onCreateAnnouncement?: (ann: Omit<Announcement, 'id' | 'date'>) => void;
  onCreateProject?: (project: Omit<LmsProject, 'id'>) => void;
  onUpdateProject?: (project: LmsProject) => void;
  onDeleteProject?: (projectId: string) => void;
  onArchiveProject?: (projectId: string) => void;
  darkMode?: boolean;
  language?: 'id' | 'en';
}

export default function DirectorDashboard({
  currentUser,
  activeTab,
  users,
  tasks,
  attendance,
  projects,
  announcements = [],
  approvalRequests,
  notifications = [],
  logs,
  applicants = [],
  onApproveRequest,
  onRejectRequest,
  onCreateAnnouncement,
  onCreateProject,
  onUpdateProject,
  onDeleteProject,
  onArchiveProject,
  darkMode = false,
  language = 'id'
}: DirectorDashboardProps) {
  const students = users.filter(u => u.role === 'student');
  const pendingApprovals = approvalRequests.filter(r => r.status === 'pending');

  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const [studentSearch, setStudentSearch] = useState('');
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<LmsProject | null>(null);

  const today = new Date().toISOString().split('T')[0];
  const todayAtt = attendance.filter(a => a.date === '2026-07-22' || a.date === today);
  const presentCount = todayAtt.filter(a => a.status === 'present').length;
  const lateCount = todayAtt.filter(a => a.status === 'late').length;
  const leaveCount = todayAtt.filter(a => a.status === 'leave').length;
  const absentCount = Math.max(0, students.length - (presentCount + lateCount + leaveCount));

  return (
    <div className="space-y-8 font-sans text-slate-800 dark:text-slate-100">
      
      {/* Director Executive Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
            <GraduationCap className="h-3.5 w-3.5 text-emerald-400" />
            <span>Portal Eksekutif Direktur Laboratorium</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {currentUser?.name || 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.'}
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl">
            Smart Grow Agriculture Research Laboratory • Ringkasan KPI Eksekutif, Monitoring Mahasiswa, & Persetujuan Milestone
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {pendingApprovals.length}
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-200 uppercase font-bold block">Memerlukan Persetujuan</span>
              <span className="text-xs font-bold text-white">Permohonan Direktur</span>
            </div>
          </div>
        </div>
      </div>

      {/* VIEW: OVERVIEW / DASHBOARD */}
      {(activeTab === 'overview' || activeTab === 'dashboard') && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Top KPI Widgets Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Total Mahasiswa</span>
                <Users className="h-4 w-4 text-[#2E7D32]" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{students.length}</div>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Roster Aktif
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Hadir Hari Ini</span>
                <UserCheck className="h-4 w-4 text-[#2E7D32]" />
              </div>
              <div className="text-2xl font-extrabold text-[#2E7D32]">{presentCount + lateCount}</div>
              <span className="text-[10px] text-slate-400 font-mono">
                Dari {students.length} Mahasiswa
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Proyek Riset</span>
                <FolderKanban className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-2xl font-extrabold text-blue-600">
                {projects.filter(p => p.status === 'in_progress' || p.status === 'planning').length}
              </div>
              <span className="text-[10px] text-blue-600 font-mono font-semibold">
                Modul Berjalan
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Tugas Selesai</span>
                <CheckCircle2 className="h-4 w-4 text-[#2E7D32]" />
              </div>
              <div className="text-2xl font-extrabold text-[#2E7D32]">
                {tasks.filter(t => t.status === 'completed').length}
              </div>
              <span className="text-[10px] text-emerald-600 font-mono font-semibold">
                Target Terpenuhi
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Persetujuan</span>
                <FileCheck2 className="h-4 w-4 text-amber-600" />
              </div>
              <div className="text-2xl font-extrabold text-amber-600">{pendingApprovals.length}</div>
              <span className="text-[10px] text-amber-600 font-mono font-semibold">
                Persetujuan Direktur
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Capaian Riset</span>
                <BarChart3 className="h-4 w-4 text-[#2E7D32]" />
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">88.5%</div>
              <span className="text-[10px] text-emerald-600 font-mono font-semibold">
                Sesuai Target Lab
              </span>
            </div>

          </div>

          {/* Pending Approvals & Telemetry */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-3xl p-6 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <FileCheck2 className="h-5 w-5 text-[#2E7D32]" />
                    <span>Permohonan Persetujuan Direktur ({pendingApprovals.length})</span>
                  </h2>
                  <p className="text-xs text-slate-500">Persetujuan anggaran hardware, pengajuan jurnal/prosiding, dan sertifikat magang</p>
                </div>
                <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#2E7D32] dark:text-emerald-300 font-bold uppercase">
                  Persetujuan Direktur
                </span>
              </div>

              <div className="space-y-4">
                {pendingApprovals.length === 0 ? (
                  <div className="p-8 text-center bg-slate-50 dark:bg-slate-700/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 text-slate-500 text-xs">
                    Tidak ada permohonan yang tertunda. Seluruh milestone riset telah disetujui!
                  </div>
                ) : (
                  pendingApprovals.map(req => (
                    <div 
                      key={req.id}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200/80 dark:border-slate-700 space-y-3 hover:border-emerald-300 transition-all text-xs"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-mono text-blue-700 dark:text-blue-300 uppercase font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 border border-blue-200">
                            {req.type.replace('_', ' ')}
                          </span>
                          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1.5">{req.title}</h3>
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-1">{req.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-200/80 dark:border-slate-700">
                        <div className="text-slate-500 text-[11px]">
                          <span>Pemohon: <strong className="text-slate-800 dark:text-slate-200">{req.studentName}</strong></span>
                          <span> • {req.date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onRejectRequest(req.id)}
                            className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold transition-all cursor-pointer"
                          >
                            Tolak
                          </button>
                          <button
                            onClick={() => onApproveRequest(req.id)}
                            className="px-4 py-1.5 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-bold transition-all shadow-sm cursor-pointer"
                          >
                            Setujui
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-3xl p-6 space-y-6 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#2E7D32]" />
                    <span>Statistik Kehadiran Hari Ini</span>
                  </h3>
                  <p className="text-xs text-slate-500">Telemetri presensi mahasiswa di lab FIT Lt. 3</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800">
                    <span className="font-bold text-emerald-900 dark:text-emerald-300">Hadir Tepat Waktu</span>
                    <span className="font-mono font-extrabold text-[#2E7D32] dark:text-emerald-300">{presentCount}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800">
                    <span className="font-bold text-blue-900 dark:text-blue-300">Terlambat Check-in</span>
                    <span className="font-mono font-extrabold text-blue-600 dark:text-blue-300">{lateCount}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800">
                    <span className="font-bold text-amber-900 dark:text-amber-300">Izin / Sakit</span>
                    <span className="font-mono font-extrabold text-amber-700 dark:text-amber-300">{leaveCount}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/80 dark:border-slate-700">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Belum Check-in</span>
                    <span className="font-mono font-extrabold text-slate-600 dark:text-slate-400">{absentCount}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-500">Rasio Kehadiran Mahasiswa</span>
                  <span className="text-[#2E7D32] font-bold">
                    {students.length ? Math.round(((presentCount + lateCount) / students.length) * 100) : 100}%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div 
                    className="h-full bg-[#2E7D32] rounded-full transition-all"
                    style={{ width: `${students.length ? Math.round(((presentCount + lateCount) / students.length) * 100) : 100}%` }}
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* VIEW: INTERN MONITORING */}
      {activeTab === 'interns' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-3xl p-6 space-y-6 shadow-xs animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Monitoring Mahasiswa Magang</h2>
              <p className="text-xs text-slate-500">Klik kartu mahasiswa untuk melihat detail profil akademik, presensi, dan progress tugas.</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text"
                placeholder="Cari nama atau NIM..."
                value={studentSearch}
                onChange={e => setStudentSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-[#2E7D32]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students
              .filter(s => s.name.toLowerCase().includes(studentSearch.toLowerCase()) || (s.studentId && s.studentId.includes(studentSearch)))
              .map(student => {
                const studentTasks = tasks.filter(t => t.assignedStudentId === student.id);
                const completedTasks = studentTasks.filter(t => t.status === 'completed').length;
                const studentAtt = attendance.find(a => a.studentId === student.id && (a.date === '2026-07-22' || a.date === today));

                return (
                  <div 
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200/80 dark:border-slate-700 hover:border-[#2E7D32] transition-all cursor-pointer space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <img 
                          src={student.avatar} 
                          alt={student.name}
                          className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#2E7D32]/30"
                        />
                        <div>
                          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-snug">{student.name}</h3>
                          <p className="text-[11px] font-mono text-[#2E7D32] font-semibold">NIM: {student.studentId || '1301210042'}</p>
                          <p className="text-[10px] text-slate-500">{student.institution || 'Telkom University'}</p>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 space-y-1 text-xs">
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">Fokus Spesialisasi Riset</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{student.specialty || 'Smart Agriculture IoT'}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80 dark:border-slate-700 space-y-2 text-xs">
                      <div className="flex justify-between items-center font-mono">
                        <span className="text-slate-500">Tugas Terpenuhi:</span>
                        <span className="font-bold text-[#2E7D32]">{completedTasks} / {studentTasks.length}</span>
                      </div>

                      <div className="flex justify-between items-center font-mono">
                        <span className="text-slate-500">Presensi Hari Ini:</span>
                        <span className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                          studentAtt?.status === 'present' ? 'bg-emerald-100 text-[#2E7D32]' :
                          studentAtt?.status === 'late' ? 'bg-blue-100 text-[#1976D2]' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {studentAtt?.status === 'present' ? 'Hadir' : studentAtt?.status === 'late' ? 'Terlambat' : 'Belum Check-in'}
                        </span>
                      </div>

                      <div className="text-[11px] font-bold text-[#2E7D32] flex items-center justify-end gap-1 pt-1">
                        <span>Buka Profil Akademik</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      )}

      {/* VIEW: APPROVALS (PERSETUJUAN DIREKTUR) */}
      {activeTab === 'approvals' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-3xl p-6 space-y-6 shadow-xs animate-fade-in">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Modul Persetujuan Direktur Laboratorium</h2>
            <p className="text-xs text-slate-500">Verifikasi dan otorisasi dokumen pengajuan anggaran, permohonan izin, publikasi jurnal, serta klaim sertifikat magang.</p>
          </div>

          <div className="space-y-4">
            {approvalRequests.map(req => (
              <div key={req.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200/80 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold uppercase text-[10px]">
                      {req.type.replace('_', ' ')}
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">{req.date}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">{req.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300">{req.description}</p>
                  <p className="text-[11px] text-slate-500">Pemohon: <strong className="text-slate-800 dark:text-slate-200">{req.studentName}</strong></p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {req.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => onRejectRequest(req.id)}
                        className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold transition-all cursor-pointer"
                      >
                        Tolak
                      </button>
                      <button
                        onClick={() => onApproveRequest(req.id)}
                        className="px-5 py-2 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-bold shadow-md transition-all cursor-pointer"
                      >
                        Setujui Permohonan
                      </button>
                    </>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${req.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                      {req.status === 'approved' ? 'Telah Disetujui' : 'Ditolak'}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: RESEARCH PROJECTS */}
      {activeTab === 'projects' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FolderKanban className="h-6 w-6 text-[#2E7D32]" />
                <span>Pengelolaan Proyek Riset IoT Smart Grow</span>
              </h2>
              <p className="text-xs text-slate-500">Direktori seluruh proyek riset laboratorium hidroponik pintar.</p>
            </div>

            <button
              onClick={() => { setEditingProject(null); setProjectModalOpen(true); }}
              className="px-5 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>+ Tambah Proyek Riset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => (
              <div key={p.id} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-44 bg-slate-900 overflow-hidden">
                    <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover opacity-85" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-mono font-bold">
                      {p.projectNumber}
                    </span>
                  </div>

                  <div className="p-5 space-y-3 text-xs">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-snug">{p.title}</h3>
                    <p className="text-slate-500 line-clamp-2">{p.description}</p>
                    <p className="text-[11px] text-slate-400">Pembimbing: <strong className="text-slate-700 dark:text-slate-200">{p.supervisor}</strong></p>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span>Progress Capaian</span>
                        <span className="text-[#2E7D32]">{p.progressPercent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                        <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${p.progressPercent}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700/30 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-bold text-slate-700 hover:text-emerald-600">
                      <Github className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}

                  <div className="flex items-center gap-2">
                    <button onClick={() => { setEditingProject(p); setProjectModalOpen(true); }} className="p-1.5 rounded-lg border text-slate-700 dark:text-slate-200 hover:bg-slate-100">
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                    {onDeleteProject && (
                      <button onClick={() => onDeleteProject(p.id)} className="p-1.5 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: ATTENDANCE */}
      {activeTab === 'attendance' && (
        <AttendanceView attendance={attendance} students={students} currentUser={currentUser} darkMode={darkMode} />
      )}

      {/* VIEW: REPORTS & ANALYTICS */}
      {activeTab === 'reports' && (
        <ReportExportModal darkMode={darkMode} />
      )}

      {/* VIEW: MY PROFILE */}
      {activeTab === 'profile' && currentUser && (
        <ProfileView currentUser={currentUser} darkMode={darkMode} />
      )}

      {/* STUDENT DETAIL MODAL (PROFIL AKADEMIK) */}
      {selectedStudent && (
        <StudentAcademicProfileModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          tasks={tasks}
          attendance={attendance}
          projects={projects}
          darkMode={darkMode}
        />
      )}

      {/* PROJECT MODAL */}
      {projectModalOpen && (
        <ProjectModal
          project={editingProject}
          students={students}
          onClose={() => setProjectModalOpen(false)}
          onSave={(data) => {
            if (editingProject && onUpdateProject) {
              onUpdateProject(data);
            } else if (onCreateProject) {
              onCreateProject(data);
            }
          }}
          darkMode={darkMode}
        />
      )}

    </div>
  );
}
