import React, { useState, useEffect } from 'react';
import { db, uploadFileToFirebaseStorage } from '../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { 
  User, 
  Task, 
  AttendanceRecord, 
  LmsProject, 
  ProjectItem,
  Announcement, 
  TaskStatus,
  ApplicantRecord,
  SelectionStage,
  PendingRegistration
} from '../../types';
import ProfileView from './ProfileView';
import RevisionDetailModal from './RevisionDetailModal';
import ProjectModal from './ProjectModal';
import AttendanceView from './AttendanceView';
import ReportExportModal from './ReportExportModal';
import InternshipStudentsView from './InternshipStudentsView';
import AnnouncementsManager from './AnnouncementsManager';
import InternshipRecruitmentManager from './InternshipRecruitmentManager';
import PendingRegistrationsView from './PendingRegistrationsView';
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
  Github,
  Upload
} from 'lucide-react';

interface AssistantDashboardProps {
  currentUser?: User;
  activeTab: string;
  users?: User[];
  students?: User[];
  tasks: Task[];
  attendance: AttendanceRecord[];
  projects: LmsProject[];
  publicProjects?: ProjectItem[];
  announcements: Announcement[];
  applicants?: ApplicantRecord[];
  pendingRegistrations?: PendingRegistration[];
  onApproveRegistration?: (reg: PendingRegistration) => void;
  onRejectRegistration?: (id: string) => void;
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
  onAddPublicProject?: (proj: Omit<ProjectItem, 'id'>) => void;
  onEditPublicProject?: (proj: ProjectItem) => void;
  onDeletePublicProject?: (id: string) => void;
  onNavigateToShowcase?: (projId: string) => void;
  onAdvanceApplicantStage?: (applicantId: string, nextStage: SelectionStage, notes?: string) => void;
  onApproveApplicant?: (applicantId: string) => void;
  onRejectApplicant?: (applicantId: string) => void;
  onUpdateProfile?: (user: User) => void;
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
  publicProjects = [],
  announcements,
  applicants = [],
  pendingRegistrations = [],
  onApproveRegistration,
  onRejectRegistration,
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
  onAddPublicProject,
  onEditPublicProject,
  onDeletePublicProject,
  onNavigateToShowcase,
  onAdvanceApplicantStage,
  onApproveApplicant,
  onRejectApplicant,
  onUpdateProfile,
  darkMode = false,
  language = 'id'
}: AssistantDashboardProps) {
  const isID = language === 'id';
  const students = (passedStudents || users.filter(u => u.role === 'student')).filter(u => u.status === 'active');

  // Modal States
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [selectedTaskForRevision, setSelectedTaskForRevision] = useState<Task | null>(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<LmsProject | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Feature-scoped realtime listener for pending registrations
  const [realtimePendingRegs, setRealtimePendingRegs] = useState<PendingRegistration[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'pending_registrations'),
      where('status', '==', 'Pending Approval')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const records = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data()
        })) as PendingRegistration[];
        setRealtimePendingRegs(records);
      } else {
        setRealtimePendingRegs([]);
      }
    }, (err) => {
      console.warn('Pending registrations feature-scoped listener notice:', err?.message);
    });

    return () => unsub();
  }, []);

  const displayPendingRegs = realtimePendingRegs.length > 0 ? realtimePendingRegs : pendingRegistrations;
  const [annModalOpen, setAnnModalOpen] = useState(false);

  const [publicModalOpen, setPublicModalOpen] = useState(false);
  const [editingPublicItem, setEditingPublicItem] = useState<ProjectItem | null>(null);
  const [pubTitle, setPubTitle] = useState('');
  const [pubTagline, setPubTagline] = useState('');
  const [pubCategory, setPubCategory] = useState('IoT & Hardware');
  const [pubDesc, setPubDesc] = useState('');
  const [pubFullDesc, setPubFullDesc] = useState('');
  const [pubGallery, setPubGallery] = useState<string[]>([]);
  const MAX_GALLERY = 9;

  const handleAddGalleryFile = async (file: File) => {
    if (pubGallery.length >= MAX_GALLERY) return;
    try {
      const downloadUrl = await uploadFileToFirebaseStorage(file, 'projects');
      setPubGallery(prev => [...prev, downloadUrl].slice(0, MAX_GALLERY));
    } catch (err) {
      console.error('Gallery file upload error:', err);
    }
  };

  const handleAddGalleryUrl = (url: string) => {
    if (!url.trim() || pubGallery.length >= MAX_GALLERY) return;
    setPubGallery(prev => [...prev, url.trim()].slice(0, MAX_GALLERY));
  };

  const handleRemoveGalleryItem = (index: number) => {
    setPubGallery(prev => prev.filter((_, i) => i !== index));
  };

  const handleOpenEditPublic = (item: ProjectItem) => {
    setEditingPublicItem(item);
    setPubTitle(item.title);
    setPubTagline(item.tagline || '');
    setPubCategory(item.category);
    setPubDesc(item.description);
    setPubFullDesc(item.fullDescription || item.description);
    const existingGallery = item.gallery && item.gallery.length > 0 ? item.gallery : (item.image ? [item.image] : []);
    setPubGallery(existingGallery);
    setPublicModalOpen(true);
  };

  const handlePublicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pubTitle.trim() || !pubDesc.trim()) return;

    const mainImage = pubGallery[0] || '';

    if (editingPublicItem && onEditPublicProject) {
      onEditPublicProject({
        ...editingPublicItem,
        title: pubTitle.trim(),
        tagline: pubTagline.trim(),
        category: pubCategory,
        description: pubDesc.trim(),
        fullDescription: pubFullDesc.trim() || pubDesc.trim(),
        image: mainImage || editingPublicItem.image,
        gallery: pubGallery
      });
    } else if (onAddPublicProject) {
      onAddPublicProject({
        title: pubTitle.trim(),
        tagline: pubTagline.trim(),
        category: pubCategory,
        date: new Date().toISOString().split('T')[0],
        image: mainImage,
        description: pubDesc.trim(),
        fullDescription: pubFullDesc.trim() || pubDesc.trim(),
        sensors: [],
        gallery: pubGallery
      });
    }
    setPublicModalOpen(false);
    setEditingPublicItem(null);
    setPubTitle('');
    setPubTagline('');
    setPubDesc('');
    setPubFullDesc('');
    setPubGallery([]);
  };

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

  // Calculate Summary metrics dynamically from real state
  const today = new Date().toISOString().split('T')[0];
  const activeStudentsCount = students.length;
  const presentTodayCount = attendance.filter(a => a.date === today || a.status === 'present').length;
  const pendingReviewCount = tasks.filter(t => t.status === 'review').length;
  const upcomingDeadlinesCount = tasks.filter(t => t.status !== 'completed').length;
  const activeProjectsCount = projects.filter(p => p.status === 'in_progress' || p.status === 'planning').length;

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      
      {/* ==========================================
          TAB 0: PENDING REGISTRATIONS APPROVAL
          ========================================== */}
      {activeTab === 'pending_registrations' && (
        <PendingRegistrationsView 
          registrations={pendingRegistrations}
          onApprove={onApproveRegistration || (() => {})}
          onReject={onRejectRegistration || (() => {})}
        />
      )}

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
        <div className="space-y-8 animate-fade-in">
          
          {/* 1. PUBLIC WEBSITE R&D PROJECTS (LIVE SYNC TO MAIN SITE) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-600 animate-pulse" />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    Proyek Riset Utama Showcase (Tampil di Website Utama)
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Seluruh perubahan data proyek di bawah ini (Tambah, Edit, Hapus) akan <strong>langsung terupdate secara real-time di website publik Smart Grow Laboratory</strong>.
                </p>
              </div>

              <button
                onClick={() => { setEditingPublicItem(null); setPubTitle(''); setPubTagline(''); setPubDesc(''); setPublicModalOpen(true); }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer shrink-0"
              >
                <Plus className="h-4 w-4" />
                <span>+ Tambah Proyek Riset Publik</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {publicProjects.map(proj => (
                <div key={proj.id} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col justify-between group">
                  <div>
                    <div className="relative h-40 bg-slate-950 overflow-hidden">
                      <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-950/80 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold backdrop-blur-xs">
                        {proj.category}
                      </span>
                    </div>

                    <div className="p-4 space-y-2 text-xs">
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-snug">{proj.title}</h3>
                      <p className="text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{proj.description}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-700/30 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                    {onNavigateToShowcase ? (
                      <button 
                        onClick={() => onNavigateToShowcase(proj.id)} 
                        className="flex items-center gap-1 font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>Pratinjau</span>
                      </button>
                    ) : <span></span>}

                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleOpenEditPublic(proj)} 
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                        title="Edit Proyek Publik"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      {onDeletePublicProject && (
                        <button 
                          onClick={() => onDeletePublicProject(proj.id)} 
                          className="p-1.5 rounded-lg border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 cursor-pointer"
                          title="Hapus Proyek"
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

          {/* 2. TRACKER INTERNAL PROYEK LMS */}
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <FolderKanban className="h-5 w-5 text-[#2E7D32]" />
                  <span>Progress Task & Internal Proyek LMS</span>
                </h2>
                <p className="text-xs text-slate-500">Kelola direktori modul riset, pembimbing, mahasiswa pelaksana, dan progress milestone hardware.</p>
              </div>

              <button
                onClick={() => { setEditingProject(null); setProjectModalOpen(true); }}
                className="px-5 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>+ Modul Proyek Internal</span>
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

        </div>
      )}

      {/* PUBLIC PROJECT MODAL FOR ASSISTANT */}
      {publicModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white font-display">
                  {editingPublicItem ? '✏️ Edit Proyek Riset Publik' : '＋ Tambah Proyek Riset Publik Baru'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Data ini akan tampil di halaman Proyek website utama</p>
              </div>
              <button onClick={() => setPublicModalOpen(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body — scrollable */}
            <div className="overflow-y-auto max-h-[70vh] px-6 py-4">
              <form id="pub-form-asst" onSubmit={handlePublicSubmit} className="space-y-4 text-xs">

                {/* GALLERY FOTO PROYEK — max 9 foto */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    🖼️ Gallery Foto Proyek <span className="text-slate-400 font-normal">({pubGallery.length}/{MAX_GALLERY})</span>
                    {pubGallery.length === 0 && <span className="text-rose-500 ml-1">*</span>}
                  </label>
                  <p className="text-[11px] text-slate-400 mb-2">Foto pertama menjadi gambar cover utama. Maksimal {MAX_GALLERY} foto.</p>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {pubGallery.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group bg-slate-100 dark:bg-slate-800">
                        <img src={img} alt={`foto-${idx + 1}`} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = ''; }} />
                        {idx === 0 && (
                          <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-bold shadow">COVER</span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryItem(idx)}
                          className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    {pubGallery.length < MAX_GALLERY && (
                      <label className="aspect-square rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-colors">
                        <Upload className="h-5 w-5 text-slate-400" />
                        <span className="text-[10px] text-slate-400 font-bold">Tambah</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={e => {
                            const files = e.target.files;
                            if (files) {
                              Array.from(files).slice(0, MAX_GALLERY - pubGallery.length).forEach((f: File) => handleAddGalleryFile(f));
                            }
                            e.target.value = '';
                          }}
                        />
                      </label>
                    )}
                  </div>

                  {pubGallery.length < MAX_GALLERY && (
                    <div className="flex items-center gap-2">
                      <input
                        id="asst-url-input"
                        type="text"
                        placeholder="Paste URL gambar lalu klik +"
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 text-xs"
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const input = e.target as HTMLInputElement;
                            handleAddGalleryUrl(input.value);
                            input.value = '';
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('asst-url-input') as HTMLInputElement;
                          if (input) { handleAddGalleryUrl(input.value); input.value = ''; }
                        }}
                        className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer transition-colors"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

                {/* JUDUL */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">📌 Judul Proyek <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SIMONA Aquaponics Monitoring System"
                    value={pubTitle}
                    onChange={e => setPubTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* TAGLINE */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">✨ Tagline Ringkas</label>
                  <input
                    type="text"
                    placeholder="e.g. Real-Time Telemetry Aquaponics & Water Quality"
                    value={pubTagline}
                    onChange={e => setPubTagline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* KATEGORI */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">🏷️ Kategori</label>
                  <select
                    value={pubCategory}
                    onChange={e => setPubCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 cursor-pointer focus:outline-none focus:border-emerald-500"
                  >
                    <option value="IoT & Hardware">IoT & Hardware</option>
                    <option value="Hydroponics">Hydroponics</option>
                    <option value="Aquaponics">Aquaponics</option>
                    <option value="Smart City PJU">Smart City PJU</option>
                    <option value="Biofloc AI Aquaculture">Biofloc AI Aquaculture</option>
                    <option value="Computer Vision AI">Computer Vision AI</option>
                    <option value="Web & Dashboard">Web & Dashboard</option>
                  </select>
                </div>

                {/* DESKRIPSI SINGKAT */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">📝 Deskripsi Singkat (tampil di kartu) <span className="text-rose-500">*</span></label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Deskripsi singkat yang tampil di kartu proyek halaman utama..."
                    value={pubDesc}
                    onChange={e => setPubDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                {/* DESKRIPSI LENGKAP */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">📄 Deskripsi Lengkap (tampil di halaman detail proyek)</label>
                  <textarea
                    rows={4}
                    placeholder="Tuliskan spesifikasi teknis lengkap, metodologi, tujuan riset, dan hasil yang diharapkan..."
                    value={pubFullDesc}
                    onChange={e => setPubFullDesc(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                  <p className="text-slate-400 mt-1">Kosongkan untuk menyamakan dengan deskripsi singkat.</p>
                </div>

              </form>
            </div>

            {/* Footer */}
            <div className="px-6 pb-5 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="submit"
                form="pub-form-asst"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer transition-colors"
              >
                {editingPublicItem ? '💾 Simpan Perubahan Proyek' : '🌐 Terbitkan ke Website Utama'}
              </button>
            </div>
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
          TAB: APPLICANTS RECRUITMENT 5-STAGE MANAGER
          ========================================== */}
      {activeTab === 'applicants' && (
        <div className="animate-fade-in">
          <InternshipRecruitmentManager
            applicants={applicants}
            onAdvanceStage={(id, nextStage, notes) => {
              if (onAdvanceApplicantStage) {
                onAdvanceApplicantStage(id, nextStage, notes);
              } else if (nextStage === 5 && onApproveApplicant) {
                onApproveApplicant(id);
              }
            }}
            onApproveApplicant={(id) => onApproveApplicant && onApproveApplicant(id)}
            onRejectApplicant={(id) => onRejectApplicant && onRejectApplicant(id)}
            darkMode={darkMode}
          />
        </div>
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
        <ProfileView currentUser={currentUser} onUpdateProfile={onUpdateProfile} darkMode={darkMode} />
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
