import React, { useState } from 'react';
import { 
  User, 
  Task, 
  AttendanceRecord, 
  LmsProject, 
  Announcement, 
  TaskStatus 
} from '../../types';
import ProfileView from './ProfileView';
import RevisionDetailModal from './RevisionDetailModal';
import ProjectModal from './ProjectModal';
import AttendanceView from './AttendanceView';
import ReportExportModal from './ReportExportModal';
import InternshipStudentsView from './InternshipStudentsView';
import AnnouncementsManager from './AnnouncementsManager';
import { 
  Users, 
  CheckSquare, 
  Clock, 
  FolderKanban, 
  Megaphone, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  X, 
  AlertCircle, 
  RotateCcw, 
  Send, 
  ExternalLink, 
  UserCheck, 
  Search, 
  Briefcase,
  FileText,
  ChevronRight,
  Sparkles,
  Download,
  Printer,
  Sprout,
  Activity,
  Layers,
  ShieldCheck,
  Calendar,
  Filter,
  Github
} from 'lucide-react';

interface AssistantDashboardProps {
  currentUser?: User;
  activeTab: string;
  users?: User[];
  students?: User[];
  tasks: Task[];
  attendance: AttendanceRecord[];
  projects: LmsProject[];
  announcements: Announcement[];
  onCreateTask: (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => void;
  onUpdateTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  onApproveTask?: (taskId: string) => void;
  onRejectTask?: (taskId: string, feedback: string) => void;
  onRequestRevision?: (taskId: string, revisionNote: string, assistantNotes: string) => void;
  onCreateAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  onUpdateAnnouncement?: (announcement: Announcement) => void;
  onDeleteAnnouncement?: (id: string) => void;
  onCreateProject?: (project: Omit<LmsProject, 'id'>) => void;
  onUpdateProject?: (project: LmsProject) => void;
  onDeleteProject?: (projectId: string) => void;
  onArchiveProject?: (projectId: string) => void;
  darkMode?: boolean;
  language?: 'id' | 'en';
}

export default function AssistantDashboard({
  currentUser,
  activeTab,
  users = [],
  students: passedStudents,
  tasks,
  attendance,
  projects,
  announcements,
  onCreateTask,
  onUpdateTask,
  onDeleteTask,
  onApproveTask,
  onRejectTask,
  onRequestRevision,
  onCreateAnnouncement,
  onUpdateAnnouncement,
  onDeleteAnnouncement,
  onCreateProject,
  onUpdateProject,
  onDeleteProject,
  onArchiveProject,
  darkMode = false,
  language = 'id'
}: AssistantDashboardProps) {
  const isID = language === 'id';
  const students = passedStudents || users.filter(u => u.role === 'student');

  // Modal States
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [selectedTaskForRevision, setSelectedTaskForRevision] = useState<Task | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<LmsProject | null>(null);
  const [annModalOpen, setAnnModalOpen] = useState(false);

  // Form States for Task Creation
  const [taskTitle, setTaskTitle] = useState('');
  const [taskNumber, setTaskNumber] = useState(`TGS-2026-00${tasks.length + 1}`);
  const [taskDesc, setTaskDesc] = useState('');
  const [assignedStudentId, setAssignedStudentId] = useState('');
  const [projectName, setProjectName] = useState('Sistem Dosing Nutrisi Otomatis NFT Hydroponic');
  const [deadline, setDeadline] = useState('2026-07-30');
  const [priority, setPriority] = useState<'normal' | 'high' | 'urgent'>('normal');

  // Announcement State
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCategory, setAnnCategory] = useState('Jadwal Piket & Pemeliharaan');

  // Search/Filter for Tasks
  const [taskSearch, setTaskSearch] = useState('');
  const [taskStatusFilter, setTaskStatusFilter] = useState<string>('all');

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const studentObj = students.find(s => s.id === assignedStudentId) || students[0];
    if (!studentObj) return;

    onCreateTask({
      title: taskTitle,
      taskNumber,
      description: taskDesc,
      assignedStudentId: studentObj.id,
      assignedStudentName: studentObj.name,
      assignedBy: currentUser?.name || 'Azliny Azreen',
      projectName,
      deadline,
      priority,
      progressPercent: 0
    });

    setCreateTaskModalOpen(false);
    setTaskTitle('');
    setTaskDesc('');
  };

  const handleAnnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateAnnouncement({
      title: `[${annCategory}] ${annTitle}`,
      content: annContent,
      authorName: currentUser?.name || 'Azliny Azreen',
      authorRole: 'Assistant',
      priority: 'important'
    });
    setAnnModalOpen(false);
    setAnnTitle('');
    setAnnContent('');
  };

  // Filter Tasks
  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(taskSearch.toLowerCase()) || 
                          t.assignedStudentName.toLowerCase().includes(taskSearch.toLowerCase()) ||
                          (t.taskNumber && t.taskNumber.toLowerCase().includes(taskSearch.toLowerCase()));
    if (!matchesSearch) return false;
    if (taskStatusFilter !== 'all' && t.status !== taskStatusFilter) return false;
    return true;
  });

  // Calculate Summary metrics
  const activeStudentsCount = students.length || 5;
  const presentTodayCount = attendance.filter(a => a.date === '2026-07-22' && a.status === 'present').length || 4;
  const pendingReviewCount = tasks.filter(t => t.status === 'review').length;
  const upcomingDeadlinesCount = tasks.filter(t => t.status !== 'completed').length;
  const activeProjectsCount = projects.filter(p => p.status === 'in_progress' || p.status === 'planning').length;

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      
      {/* ==========================================
          TAB 1: OVERVIEW DASHBOARD (RINGKASAN SAJA)
          ========================================== */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* WELCOME BANNER */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2E7D32] via-teal-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Portal Asisten Laboratorium Smart Grow</span>
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Selamat Datang Kembali, {currentUser?.name || 'Azliny Azreen'}!
                </h1>
                <p className="text-xs text-emerald-100/80 max-w-xl leading-relaxed">
                  Pantau ringkasan kegiatan mahasiswa, review progress tugas, dan koordinasi laboratorium hidroponik pintar Telkom University.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setCreateTaskModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Tugas Baru</span>
                </button>
                <button
                  onClick={() => { setEditingProject(null); setProjectModalOpen(true); }}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/20 backdrop-blur-md transition-all cursor-pointer"
                >
                  <FolderKanban className="h-4 w-4 text-emerald-300" />
                  <span>+ Proyek IoT</span>
                </button>
              </div>
            </div>
          </div>

          {/* SUMMARY CARDS GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-emerald-600 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mahasiswa Aktif</span>
                <Users className="h-4 w-4" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{activeStudentsCount}</p>
              <p className="text-[10px] text-emerald-600 font-semibold mt-1">Terdaftar Magang</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-blue-600 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Hadir Hari Ini</span>
                <Clock className="h-4 w-4" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{presentTodayCount}</p>
              <p className="text-[10px] text-blue-600 font-semibold mt-1">Check-in Presensi</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-amber-600 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Menunggu Review</span>
                <AlertCircle className="h-4 w-4" />
              </div>
              <p className="text-2xl font-extrabold text-amber-600">{pendingReviewCount}</p>
              <p className="text-[10px] text-amber-600 font-semibold mt-1">Tugas Mahasiswa</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
              <div className="flex items-center justify-between text-purple-600 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Deadline Minggu Ini</span>
                <Calendar className="h-4 w-4" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{upcomingDeadlinesCount}</p>
              <p className="text-[10px] text-purple-600 font-semibold mt-1">Mendekati Tenggat</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-xs col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between text-[#2E7D32] mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Proyek Riset Aktif</span>
                <FolderKanban className="h-4 w-4" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{activeProjectsCount}</p>
              <p className="text-[10px] text-[#2E7D32] font-semibold mt-1">Modul Hydroponic IoT</p>
            </div>
          </div>

          {/* TWO COLUMN SUMMARY BODY */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* LEFT 2 COLS: TASKS REQUIRING REVIEW & RECENT ACTIVITY */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Tasks Review Prompt Box */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-[#2E7D32]" />
                    <span>Tugas Menunggu Verifikasi & Review Asisten</span>
                  </h3>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold">
                    {pendingReviewCount} Menunggu
                  </span>
                </div>

                <div className="space-y-3">
                  {tasks.filter(t => t.status === 'review').slice(0, 3).map(t => (
                    <div key={t.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 mb-1">
                          <span>{t.taskNumber || 'TGS-2026-001'}</span>
                          <span>•</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-200">{t.assignedStudentName}</span>
                        </div>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100">{t.title}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{t.description}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setSelectedTaskForRevision(t)}
                          className="px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 dark:bg-amber-950 dark:text-amber-200 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>Minta Revisi</span>
                        </button>
                        {onApproveTask && (
                          <button
                            onClick={() => onApproveTask(t.id)}
                            className="px-3 py-1.5 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            <span>Setujui</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {pendingReviewCount === 0 && (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      <CheckCircle2 className="h-8 w-8 mx-auto text-emerald-500 mb-2" />
                      <p>Semua tugas terikirim telah diverifikasi dan disetujui!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Research Projects Progress Overview */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <FolderKanban className="h-4 w-4 text-[#2E7D32]" />
                    <span>Progress Proyek Riset Utama Lab</span>
                  </h3>
                  <span className="text-xs text-emerald-600 font-bold">{projects.length} Proyek Terdaftar</span>
                </div>

                <div className="space-y-4">
                  {projects.slice(0, 3).map(p => (
                    <div key={p.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className="font-mono text-[10px] text-slate-400">{p.projectNumber}</span>
                          <h4 className="font-bold text-slate-800 dark:text-slate-100">{p.title}</h4>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold">
                          {p.progressPercent}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-600 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full" style={{ width: `${p.progressPercent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COL: ANNOUNCEMENTS & RECENT SYSTEM LOGS */}
            <div className="space-y-6">
              
              {/* Announcements Card */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Megaphone className="h-4 w-4 text-[#2E7D32]" />
                    <span>Pengumuman Lab</span>
                  </h3>
                  <button
                    onClick={() => setAnnModalOpen(true)}
                    className="text-xs text-[#2E7D32] hover:underline font-bold flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Buat</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {announcements.slice(0, 3).map(a => (
                    <div key={a.id} className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800 text-xs space-y-1">
                      <span className="text-[10px] font-mono text-slate-400">{a.date}</span>
                      <h4 className="font-bold text-emerald-950 dark:text-emerald-200">{a.title}</h4>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px] line-clamp-2">{a.content}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* ==========================================
          TAB 2: MANAJEMEN TUGAS (COMPLETE TASK TABLE)
          ========================================== */}
      {activeTab === 'tasks' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <CheckSquare className="h-6 w-6 text-[#2E7D32]" />
                <span>Modul Manajemen & Penugasan Mahasiswa</span>
              </h2>
              <p className="text-xs text-slate-500">Kelola rincian tugas, persentase progress, histori revisi, dan review hasil karya mahasiswa.</p>
            </div>

            <button
              onClick={() => setCreateTaskModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>+ Buat Penugasan Baru</span>
            </button>
          </div>

          {/* SEARCH & FILTERS */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nomor tugas, nama tugas, atau mahasiswa..."
                value={taskSearch}
                onChange={e => setTaskSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={taskStatusFilter}
                onChange={e => setTaskStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 font-semibold"
              >
                <option value="all">Semua Status Tugas</option>
                <option value="not_started">Belum Dimulai</option>
                <option value="in_progress">Dalam Proses</option>
                <option value="review">Menunggu Review</option>
                <option value="revision">Memerlukan Revisi</option>
                <option value="completed">Selesai</option>
              </select>
            </div>
          </div>

          {/* FULL TASK MANAGEMENT TABLE */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-3.5 px-4">Nomor & Tugas</th>
                    <th className="py-3.5 px-4">Mahasiswa</th>
                    <th className="py-3.5 px-4">Proyek Riset</th>
                    <th className="py-3.5 px-4">Tenggat (Deadline)</th>
                    <th className="py-3.5 px-4">Prioritas</th>
                    <th className="py-3.5 px-4">Progress (%)</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">GitHub & Lampiran</th>
                    <th className="py-3.5 px-4 text-right">Aksi Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {filteredTasks.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-mono text-[10px] font-bold text-[#2E7D32] bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                          {t.taskNumber || 'TGS-2026-001'}
                        </span>
                        <h4 className="font-bold text-slate-800 dark:text-slate-100 mt-1">{t.title}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1">{t.description}</p>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{t.assignedStudentName}</span>
                        <span className="block text-[10px] text-slate-400">Assigned by: {t.assignedBy}</span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap font-medium text-slate-700 dark:text-slate-300">
                        {t.projectName || 'Smart Grow IoT'}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap font-mono text-slate-600 dark:text-slate-400">
                        {t.deadline}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          t.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                          t.priority === 'high' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {t.priority}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#2E7D32]">{t.progressPercent || 0}%</span>
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${t.progressPercent || 0}%` }} />
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                          t.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                          t.status === 'review' ? 'bg-blue-100 text-blue-800' :
                          t.status === 'revision' ? 'bg-amber-100 text-amber-800' :
                          t.status === 'in_progress' ? 'bg-purple-100 text-purple-800' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {t.status === 'completed' ? 'Selesai' :
                           t.status === 'review' ? 'Menunggu Review' :
                           t.status === 'revision' ? 'Memerlukan Revisi' :
                           t.status === 'in_progress' ? 'Dalam Proses' : 'Belum Dimulai'}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        {t.githubUrl ? (
                          <a href={t.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-emerald-600">
                            <Github className="h-3.5 w-3.5" />
                            <span>Source Code</span>
                          </a>
                        ) : (
                          <span className="text-[10px] text-slate-400">Belum diunggah</span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setSelectedTaskForRevision(t)}
                            className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                            title="Sistem Revisi Detail"
                          >
                            <RotateCcw className="h-3 w-3" />
                            <span>Minta Revisi</span>
                          </button>

                          {onApproveTask && (
                            <button
                              onClick={() => onApproveTask(t.id)}
                              className="px-2.5 py-1 rounded-lg bg-[#2E7D32] hover:bg-emerald-700 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Setujui</span>
                            </button>
                          )}

                          {onDeleteTask && (
                            <button
                              onClick={() => onDeleteTask(t.id)}
                              className="p-1 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                              title="Hapus Tugas"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ==========================================
          TAB 3: PROYEK RISET IOT (FULL CRUD)
          ========================================== */}
      {activeTab === 'projects' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FolderKanban className="h-6 w-6 text-[#2E7D32]" />
                <span>Pengelolaan Proyek Riset IoT & Smart Grow</span>
              </h2>
              <p className="text-xs text-slate-500">Kelola direktori modul riset, pembimbing, mahasiswa pelaksana, dan progress milestone hardware.</p>
            </div>

            <button
              onClick={() => { setEditingProject(null); setProjectModalOpen(true); }}
              className="px-5 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>+ Tambah Proyek IoT Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover opacity-85" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-mono font-bold backdrop-blur-xs">
                      {p.projectNumber}
                    </span>
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                      {p.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-snug">{p.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{p.description}</p>

                    <div className="space-y-1.5 text-xs pt-1">
                      <div className="flex justify-between text-slate-500 text-[11px]">
                        <span>Pembimbing Utama:</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{p.supervisor}</span>
                      </div>

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
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-700/30 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-bold text-slate-700 hover:text-emerald-600">
                      <Github className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setEditingProject(p); setProjectModalOpen(true); }}
                      className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border hover:bg-slate-100"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                    {onDeleteProject && (
                      <button
                        onClick={() => onDeleteProject(p.id)}
                        className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                      >
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

      {/* ==========================================
          TAB: MAHASISWA MAGANG
          ========================================== */}
      {activeTab === 'students' && (
        <InternshipStudentsView
          students={students}
          tasks={tasks}
          attendance={attendance}
          projects={projects}
          darkMode={darkMode}
        />
      )}

      {/* ==========================================
          TAB: PENGUMUMAN LABORATORIUM
          ========================================== */}
      {activeTab === 'announcements' && (
        <AnnouncementsManager
          announcements={announcements}
          onCreateAnnouncement={onCreateAnnouncement}
          onUpdateAnnouncement={onUpdateAnnouncement}
          onDeleteAnnouncement={onDeleteAnnouncement}
          currentUserRole="assistant"
          currentUserName={currentUser?.name || 'Asisten Lab'}
          darkMode={darkMode}
        />
      )}

      {/* ==========================================
          TAB 4: ATTENDANCE MONITOR
          ========================================== */}
      {activeTab === 'attendance' && (
        <AttendanceView attendance={attendance} students={students} currentUser={currentUser} darkMode={darkMode} />
      )}

      {/* ==========================================
          TAB 5: REPORTS & YIELD
          ========================================== */}
      {activeTab === 'reports' && (
        <ReportExportModal darkMode={darkMode} />
      )}

      {/* ==========================================
          TAB 6: MY PROFILE
          ========================================== */}
      {activeTab === 'profile' && currentUser && (
        <ProfileView currentUser={currentUser} darkMode={darkMode} />
      )}

      {/* MODAL: TASK CREATION */}
      {createTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Buat Tugas Magang Baru</h3>
              <button onClick={() => setCreateTaskModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleTaskSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Judul Tugas</label>
                <input type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} required placeholder="Contoh: Kalibrasi Sensor pH EC Modbus" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Pilih Mahasiswa</label>
                <select value={assignedStudentId} onChange={e => setAssignedStudentId(e.target.value)} required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700">
                  <option value="">-- Pilih Mahasiswa Magang --</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.studentId || '1301210042'})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Deskripsi Tugas & Instruksi</label>
                <textarea rows={3} value={taskDesc} onChange={e => setTaskDesc(e.target.value)} required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Deadline</label>
                  <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Prioritas</label>
                  <select value={priority} onChange={e => setPriority(e.target.value as any)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700">
                    <option value="normal">Normal</option>
                    <option value="high">Tinggi</option>
                    <option value="urgent">Urgent / Mendesak</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setCreateTaskModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold">Batal</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#2E7D32] text-white font-bold shadow-md">Simpan Tugas</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REVISION SYSTEM */}
      {selectedTaskForRevision && (
        <RevisionDetailModal
          task={selectedTaskForRevision}
          onClose={() => setSelectedTaskForRevision(null)}
          onRequestRevision={onRequestRevision}
          isAssistant={true}
          darkMode={darkMode}
        />
      )}

      {/* MODAL: PROJECT EDIT/CREATE */}
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

      {/* MODAL: ANNOUNCEMENT CREATION */}
      {annModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Buat Pengumuman Lab</h3>
              <button onClick={() => setAnnModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAnnSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Judul Pengumuman</label>
                <input type="text" value={annTitle} onChange={e => setAnnTitle(e.target.value)} required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Isi Pengumuman</label>
                <textarea rows={4} value={annContent} onChange={e => setAnnContent(e.target.value)} required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setAnnModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold">Batal</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#2E7D32] text-white font-bold shadow-md">Publikasikan</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
