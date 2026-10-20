import React, { useState, useEffect } from 'react';
import { db, uploadFileToFirebaseStorage } from '../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { 
  User, 
  Task, 
  AttendanceRecord, 
  LmsProject, 
  ProjectItem,
  ApprovalRequest, 
  LmsNotification, 
  SystemLog,
  Announcement,
  ApplicantRecord,
  SelectionStage,
  PendingRegistration
} from '../../types';
import ProfileView from './ProfileView';
import ProjectModal from './ProjectModal';
import AttendanceView from './AttendanceView';
import ReportExportModal from './ReportExportModal';
import StudentAcademicProfileModal from './StudentAcademicProfileModal';
import InternshipRecruitmentManager from './InternshipRecruitmentManager';
import PendingRegistrationsView from './PendingRegistrationsView';
import { resolveImageUrl } from '../../utils/imageUtils';
import { getTodayDateJakarta } from '../../utils/dateUtils';
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
  Search, 
  ChevronRight, 
  Download, 
  Plus, 
  Edit3, 
  Trash2, 
  Github,
  ExternalLink,
  Upload,
  Megaphone,
  RotateCcw,
  Filter,
  Award,
  Star,
  Check
} from 'lucide-react';
import AnnouncementsManager from './AnnouncementsManager';
import RevisionDetailModal from './RevisionDetailModal';
import { resolveUserAvatar } from '../../utils/imageUtils';

interface DirectorDashboardProps {
  currentUser?: User;
  activeTab: string;
  users: User[];
  students: User[];
  tasks: Task[];
  attendance: AttendanceRecord[];
  projects: LmsProject[];
  publicProjects?: ProjectItem[];
  announcements?: Announcement[];
  approvalRequests: ApprovalRequest[];
  notifications?: LmsNotification[];
  logs: SystemLog[];
  applicants?: ApplicantRecord[];
  pendingRegistrations?: PendingRegistration[];
  onApproveRegistration?: (reg: PendingRegistration) => void;
  onRejectRegistration?: (id: string) => void;
  onDeleteRegistration?: (id: string) => void;
  onClearAllRegistrations?: () => void;
  onApproveRequest: (id: string) => void;
  onRejectRequest: (id: string) => void;
  onAdvanceApplicantStage?: (applicantId: string, nextStage: SelectionStage, notes?: string) => void;
  onApproveApplicant?: (applicantId: string) => void;
  onRejectApplicant?: (applicantId: string) => void;
  onCreateTask?: (task: Omit<Task, 'id' | 'status' | 'createdAt'>) => void;
  onUpdateTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  onApproveTask?: (taskId: string) => void;
  onRejectTask?: (taskId: string, feedback: string) => void;
  onRequestRevision?: (taskId: string, revisionNote: string, assistantNotes: string) => void;
  onCreateAnnouncement?: (ann: Omit<Announcement, 'id' | 'date'>) => void;
  onUpdateAnnouncement?: (ann: Announcement) => void;
  onDeleteAnnouncement?: (id: string) => void;
  onCreateProject?: (project: Omit<LmsProject, 'id'>) => void;
  onUpdateProject?: (project: LmsProject) => void;
  onDeleteProject?: (projectId: string) => void;
  onArchiveProject?: (projectId: string) => void;
  onAddPublicProject?: (proj: Omit<ProjectItem, 'id'>) => void;
  onEditPublicProject?: (proj: ProjectItem) => void;
  onDeletePublicProject?: (id: string) => void;
  onNavigateToShowcase?: (projId: string) => void;
  onUpdateProfile?: (updatedUser: User) => void;
  onDeleteStudent?: (studentId: string) => void;
  onCorrectAttendance?: (recordId: string, updatedData: Partial<AttendanceRecord>, reason: string) => void;
  onUpdateStudentEvaluation?: (studentId: string, evaluation: any) => void;
  darkMode?: boolean;
  language?: 'id' | 'en';
}

export default function DirectorDashboard({
  currentUser,
  activeTab,
  users,
  tasks = [],
  attendance = [],
  projects = [],
  publicProjects = [],
  announcements = [],
  approvalRequests = [],
  notifications = [],
  logs = [],
  applicants = [],
  pendingRegistrations = [],
  onApproveRegistration,
  onRejectRegistration,
  onDeleteRegistration,
  onClearAllRegistrations,
  onApproveRequest,
  onRejectRequest,
  onAdvanceApplicantStage,
  onApproveApplicant,
  onRejectApplicant,
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
  onUpdateProfile,
  onDeleteStudent,
  onCorrectAttendance,
  onUpdateStudentEvaluation,
  darkMode = false,
  language = 'id'
}: DirectorDashboardProps) {
  const students = users.filter(u => u.role === 'student' && u.status === 'active');
  const alumni = users.filter(u => u.status === 'alumni');
  const pendingApprovals = approvalRequests.filter(r => r.status === 'pending');

  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const [studentSearch, setStudentSearch] = useState('');
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<LmsProject | null>(null);
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<User | null>(null);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Feature-scoped realtime listener for pending director approval requests
  const [realtimeApprovals, setRealtimeApprovals] = useState<ApprovalRequest[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'approval_requests'),
      where('status', '==', 'pending')
    );

    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const records = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data()
        })) as ApprovalRequest[];
        setRealtimeApprovals(records);
      } else {
        setRealtimeApprovals([]);
      }
    }, (err) => {
      console.warn('Approval requests feature-scoped listener notice:', err?.message);
    });

    return () => unsub();
  }, []);

  const displayApprovals = realtimeApprovals.length > 0 ? realtimeApprovals : approvalRequests;

  const [publicModalOpen, setPublicModalOpen] = useState(false);
  const [editingPublicItem, setEditingPublicItem] = useState<ProjectItem | null>(null);
  const [pubTitle, setPubTitle] = useState('');
  const [pubTagline, setPubTagline] = useState('');
  const [pubCategory, setPubCategory] = useState('IoT & Hardware');
  const [pubDesc, setPubDesc] = useState('');
  const [pubFullDesc, setPubFullDesc] = useState('');
  const [pubGallery, setPubGallery] = useState<string[]>([]);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const MAX_GALLERY = 9;

  const handleAddGalleryFile = async (file: File) => {
    if (pubGallery.length >= MAX_GALLERY) return;
    setIsUploadingGallery(true);
    try {
      const downloadUrl = await uploadFileToFirebaseStorage(file, 'projects');
      setPubGallery(prev => [...prev, downloadUrl].slice(0, MAX_GALLERY));
    } catch (err) {
      console.error('Gallery file upload error:', err);
    } finally {
      setIsUploadingGallery(false);
    }
  };

  const handleAddGalleryUrl = (url: string) => {
    if (!url.trim() || pubGallery.length >= MAX_GALLERY) return;
    const resolved = resolveImageUrl(url.trim());
    setPubGallery(prev => [...prev, resolved].slice(0, MAX_GALLERY));
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
    // Load existing gallery, or fallback to main image
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

  // --- Director Task Management State ---
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [assignedStudentId, setAssignedStudentId] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [taskPriority, setTaskPriority] = useState<'normal' | 'high' | 'urgent'>('normal');
  const [taskProject, setTaskProject] = useState('HYCOS-SMARTS Telemetry Gateway');
  const [taskSearch, setTaskSearch] = useState('');
  const [taskStatusFilter, setTaskStatusFilter] = useState('all');
  const [selectedTaskForRevision, setSelectedTaskForRevision] = useState<Task | null>(null);

  // --- Director Academic Evaluation & Grading State ---
  const [evalModalOpen, setEvalModalOpen] = useState(false);
  const [evalStudent, setEvalStudent] = useState<User | null>(null);
  const [evalAttendanceScore, setEvalAttendanceScore] = useState<number>(90);
  const [evalTaskScore, setEvalTaskScore] = useState<number>(90);
  const [evalAttitudeScore, setEvalAttitudeScore] = useState<number>(90);
  const [evalFinalScore, setEvalFinalScore] = useState<number>(90);
  const [evalGrade, setEvalGrade] = useState<string>('A');
  const [evalAdvisorNotes, setEvalAdvisorNotes] = useState<string>('');

  const calculateGradeFromScore = (score: number): string => {
    if (score >= 85) return 'A';
    if (score >= 80) return 'A-';
    if (score >= 75) return 'B+';
    if (score >= 70) return 'B';
    if (score >= 65) return 'B-';
    if (score >= 60) return 'C';
    return 'D';
  };

  const handleOpenEvaluationModal = (student: User) => {
    setEvalStudent(student);
    const existing = student.internshipEvaluation;
    const attScore = existing?.attendanceScore ?? (student.attendanceRate ? Math.round(student.attendanceRate) : 92);
    const tskScore = existing?.taskScore ?? 90;
    const attitScore = existing?.attitudeScore ?? 92;
    const finalScore = student.finalScore ?? existing?.finalScore ?? Math.round(attScore * 0.25 + tskScore * 0.5 + attitScore * 0.25);
    const grade = student.grade ?? existing?.grade ?? calculateGradeFromScore(finalScore);
    const notes = student.advisorNotes ?? existing?.advisorNotes ?? '';

    setEvalAttendanceScore(attScore);
    setEvalTaskScore(tskScore);
    setEvalAttitudeScore(attitScore);
    setEvalFinalScore(finalScore);
    setEvalGrade(grade);
    setEvalAdvisorNotes(notes);
    setEvalModalOpen(true);
  };

  const handleUpdateScores = (att: number, tsk: number, attit: number) => {
    const finalVal = Math.round(att * 0.25 + tsk * 0.5 + attit * 0.25);
    setEvalAttendanceScore(att);
    setEvalTaskScore(tsk);
    setEvalAttitudeScore(attit);
    setEvalFinalScore(finalVal);
    setEvalGrade(calculateGradeFromScore(finalVal));
  };

  const handleSaveEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evalStudent || !onUpdateStudentEvaluation) return;

    onUpdateStudentEvaluation(evalStudent.id, {
      finalScore: evalFinalScore,
      grade: evalGrade,
      advisorNotes: evalAdvisorNotes.trim(),
      internshipEvaluation: {
        attendanceScore: evalAttendanceScore,
        taskScore: evalTaskScore,
        attitudeScore: evalAttitudeScore,
        finalScore: evalFinalScore,
        grade: evalGrade,
        advisorNotes: evalAdvisorNotes.trim(),
        evaluatedAt: new Date().toISOString(),
        evaluatorName: currentUser?.name || 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.'
      }
    });

    setEvalModalOpen(false);
  };

  const handleOpenCreateTask = () => {
    setEditingTask(null);
    setTaskTitle('');
    setAssignedStudentId(students[0]?.id || '');
    setTaskDesc('');
    setTaskDeadline(new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]);
    setTaskPriority('normal');
    setTaskProject('HYCOS-SMARTS Telemetry Gateway');
    setCreateTaskModalOpen(true);
  };

  const handleOpenEditTask = (task: Task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setAssignedStudentId(task.assignedStudentId || '');
    setTaskDesc(task.description);
    setTaskDeadline(task.deadline);
    setTaskPriority(task.priority);
    setTaskProject(task.projectName || 'HYCOS-SMARTS Telemetry Gateway');
    setCreateTaskModalOpen(true);
  };

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim() || !assignedStudentId) return;

    const assignedStudent = students.find(s => s.id === assignedStudentId);
    const assignedStudentName = assignedStudent ? assignedStudent.name : 'Mahasiswa Magang';

    if (editingTask && onUpdateTask) {
      onUpdateTask({
        ...editingTask,
        title: taskTitle.trim(),
        assignedStudentId,
        assignedStudentName,
        description: taskDesc.trim(),
        deadline: taskDeadline,
        priority: taskPriority,
        projectName: taskProject || 'HYCOS-SMARTS Telemetry Gateway'
      });
    } else if (onCreateTask) {
      onCreateTask({
        taskNumber: `TGS-DIR-${Date.now().toString().slice(-4)}`,
        title: taskTitle.trim(),
        assignedStudentId,
        assignedStudentName,
        assignedBy: currentUser?.name || 'Prof. Dr. Indrarini (Direktur Lab)',
        description: taskDesc.trim(),
        deadline: taskDeadline || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        priority: taskPriority,
        projectName: taskProject || 'HYCOS-SMARTS Telemetry Gateway',
        progressPercent: 0
      });
    }

    setCreateTaskModalOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter(t => {
    const matchSearch = (t.title || '').toLowerCase().includes(taskSearch.toLowerCase()) ||
      (t.assignedStudentName || '').toLowerCase().includes(taskSearch.toLowerCase()) ||
      (t.taskNumber || '').toLowerCase().includes(taskSearch.toLowerCase());
    const matchStatus = taskStatusFilter === 'all' || t.status === taskStatusFilter;
    return matchSearch && matchStatus;
  });

  const today = getTodayDateJakarta();
  const todayAtt = attendance.filter(a => a.date === today);
  const presentCount = todayAtt.filter(a => a.status === 'present').length;
  const lateCount = todayAtt.filter(a => a.status === 'late').length;
  const leaveCount = todayAtt.filter(a => a.status === 'leave').length;
  const absentCount = Math.max(0, students.length - (presentCount + lateCount + leaveCount));

  return (
    <div className="space-y-8 font-sans text-slate-800 dark:text-slate-100">
      
      {activeTab === 'pending_registrations' && (
        <PendingRegistrationsView 
          registrations={pendingRegistrations}
          onApprove={onApproveRegistration || (() => {})}
          onReject={onRejectRegistration || (() => {})}
          onDelete={onDeleteRegistration}
          onClearAll={onClearAllRegistrations}
        />
      )}
      
      {/* Director Executive Banner */}
      {(activeTab === 'overview' || activeTab === 'dashboard') && (
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
      )}

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
              <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                {tasks.length > 0 ? `${Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)}%` : '100%'}
              </div>
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

      {/* VIEW: PENDING REGISTRATIONS */}
      {activeTab === 'pending_registrations' && (
        <div className="animate-fade-in">
          <PendingRegistrationsView
            registrations={pendingRegistrations}
            onApprove={(reg) => onApproveRegistration && onApproveRegistration(reg)}
            onReject={(id) => onRejectRegistration && onRejectRegistration(id)}
            onDelete={(id) => onDeleteRegistration && onDeleteRegistration(id)}
            onClearAll={() => onClearAllRegistrations && onClearAllRegistrations()}
          />
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
              .filter(s => (s.name || '').toLowerCase().includes(studentSearch.toLowerCase()) || (s.studentId && s.studentId.includes(studentSearch)))
              .map(student => {
                const studentTasks = tasks.filter(t => t.assignedStudentId === student.id);
                const completedTasks = studentTasks.filter(t => t.status === 'completed').length;
                const studentAtt = attendance.find(a => a.studentId === student.id && a.date === today);

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

                      {/* Official Director Grade & Evaluation Badge */}
                      <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60">
                        <div>
                          <span className="text-[9px] font-mono uppercase font-bold text-emerald-800 dark:text-emerald-300 block">Nilai Resmi Pembina</span>
                          <span className="text-xs font-extrabold text-emerald-900 dark:text-emerald-100">
                            {student.grade || student.internshipEvaluation?.grade ? (
                              `Huruf: ${student.grade || student.internshipEvaluation?.grade} (${student.finalScore ?? student.internshipEvaluation?.finalScore ?? 0}/100)`
                            ) : (
                              <span className="text-slate-400 font-normal italic">Belum Dievaluasi</span>
                            )}
                          </span>
                        </div>
                        {onUpdateStudentEvaluation && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEvaluationModal(student);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-[#2E7D32] hover:bg-emerald-700 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs transition-colors cursor-pointer"
                          >
                            <Award className="h-3 w-3" />
                            <span>{student.grade || student.internshipEvaluation?.grade ? 'Edit Nilai' : '+ Input Nilai'}</span>
                          </button>
                        )}
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

                      <div className="flex items-center justify-between pt-1">
                        {onDeleteStudent && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm(`Hapus mahasiswa "${student.name || 'ini'}" dari data laboratorium?`)) {
                                onDeleteStudent(student.id);
                              }
                            }}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 px-2 py-1 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                            title="Hapus Mahasiswa"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Hapus</span>
                          </button>
                        )}
                        <div className="text-[11px] font-bold text-[#2E7D32] flex items-center justify-end gap-1 ml-auto">
                          <span>Buka Profil Akademik</span>
                          <ChevronRight className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
            })}
          </div>

          {/* Alumni Riset Section */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span>Alumni Riset Smart Grow Lab</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-mono font-bold">
                    {alumni.length} Alumni (Akun Non-Aktif)
                  </span>
                </h3>
                <p className="text-xs text-slate-500">Data alumni peneliti laboratorium angkatan sebelumnya. Akses login sistem berstatus non-aktif secara otomatis.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {alumni.map(alm => (
                <div key={alm.id} className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-700/20 border border-slate-200/60 dark:border-slate-700 flex items-center gap-3.5">
                  <img src={alm.avatar} alt={alm.name} className="w-11 h-11 rounded-xl object-cover border border-slate-200 dark:border-slate-600 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">{alm.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium truncate">{alm.title}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[9px] font-mono font-bold">
                      Status: Non-Aktif
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB: TUGAS BIMBINGAN RISET (DIRECTOR TASK CRUD)
          ========================================== */}
      {activeTab === 'tasks' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <CheckSquare className="h-6 w-6 text-[#2E7D32]" />
                <span>Modul Tugas & Riset Bimbingan Direktur</span>
              </h2>
              <p className="text-xs text-slate-500">Buat penugasan langsung, tinjau progres hasil riset, minta revisi ilmiah, serta beri persetujuan akhir tugas mahasiswa.</p>
            </div>

            <button
              onClick={handleOpenCreateTask}
              className="px-5 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>+ Buat Penugasan Riset Baru</span>
            </button>
          </div>

          {/* SEARCH & FILTERS */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nomor tugas, judul riset, atau nama mahasiswa..."
                value={taskSearch}
                onChange={e => setTaskSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={taskStatusFilter}
                onChange={e => setTaskStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold"
              >
                <option value="all">Semua Status Tugas</option>
                <option value="not_started">Belum Dimulai</option>
                <option value="in_progress">Dalam Proses</option>
                <option value="review">Menunggu Review Direktur</option>
                <option value="revision">Memerlukan Revisi</option>
                <option value="completed">Selesai & Disetujui</option>
              </select>
            </div>
          </div>

          {/* FULL TASK MANAGEMENT TABLE */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[950px]">
                <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-3.5 px-4">Nomor & Tugas Riset</th>
                    <th className="py-3.5 px-4">Mahasiswa Ditugaskan</th>
                    <th className="py-3.5 px-4">Proyek R&D</th>
                    <th className="py-3.5 px-4">Tenggat Waktu</th>
                    <th className="py-3.5 px-4">Prioritas</th>
                    <th className="py-3.5 px-4">Progress (%)</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">GitHub & Lampiran</th>
                    <th className="py-3.5 px-4 text-right">Aksi Direktur</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                  {filteredTasks.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-12 text-center text-slate-400">
                        Tidak ada data tugas yang sesuai dengan filter pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredTasks.map((t) => (
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
                          <span className="block text-[10px] text-slate-400">Assigned by: {t.assignedBy || 'Direktur Lab'}</span>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap font-medium text-slate-700 dark:text-slate-300">
                          {t.projectName || 'HYCOS-SMARTS Gateway'}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap font-mono text-slate-600 dark:text-slate-400">
                          {t.deadline}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                            t.priority === 'urgent' ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' :
                            t.priority === 'high' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                            'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                          }`}>
                            {t.priority}
                          </span>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#2E7D32]">{t.progressPercent || 0}%</span>
                            <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${t.progressPercent || 0}%` }} />
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                            t.status === 'completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                            t.status === 'review' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                            t.status === 'revision' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                            t.status === 'in_progress' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' :
                            'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                          }`}>
                            {t.status === 'completed' ? 'Selesai & Sah' :
                             t.status === 'review' ? 'Menunggu Review' :
                             t.status === 'revision' ? 'Memerlukan Revisi' :
                             t.status === 'in_progress' ? 'Dalam Proses' : 'Belum Dimulai'}
                          </span>
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          {t.githubUrl ? (
                            <a href={t.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600">
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
                              className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-200 text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                              title="Minta Revisi Ilmiah"
                            >
                              <RotateCcw className="h-3 w-3" />
                              <span>Minta Revisi</span>
                            </button>

                            {onApproveTask && (
                              <button
                                onClick={() => onApproveTask(t.id)}
                                className="px-2.5 py-1 rounded-lg bg-[#2E7D32] hover:bg-emerald-700 text-white text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                                title="Setujui Tugas Riset"
                              >
                                <CheckCircle2 className="h-3 w-3" />
                                <span>Setujui</span>
                              </button>
                            )}

                            <button
                              onClick={() => handleOpenEditTask(t)}
                              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition-colors"
                              title="Edit Tugas"
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>

                            {onDeleteTask && (
                              <button
                                onClick={() => {
                                  if (confirm(`Hapus tugas riset "${t.title}"?`)) {
                                    onDeleteTask(t.id);
                                  }
                                }}
                                className="p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-400 hover:text-red-600 transition-colors"
                                title="Hapus Tugas"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ==========================================
          TAB: PENGUMUMAN LABORATORIUM (DIRECTOR CMS)
          ========================================== */}
      {activeTab === 'announcements' && (
        <div className="animate-fade-in">
          <AnnouncementsManager
            announcements={announcements}
            onCreateAnnouncement={onCreateAnnouncement}
            onUpdateAnnouncement={onUpdateAnnouncement}
            onDeleteAnnouncement={onDeleteAnnouncement}
            currentUserRole="director"
            currentUserName={currentUser?.name || 'Prof. Dr. Indrarini Dyah Irawati'}
            darkMode={darkMode}
          />
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
        <div className="space-y-8 animate-fade-in">
          
          {/* 1. PUBLIC WEBSITE R&D PROJECTS (LIVE SYNC TO MAIN SITE) */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  
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
                <span>Tambah Proyek Riset Publik</span>
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
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <FolderKanban className="h-5 w-5 text-[#2E7D32]" />
                  <span>Progress Task & Internal Proyek LMS</span>
                </h3>
                <p className="text-xs text-slate-500">Pelacakan milestones dan persentase capaian riset internal laboratorium.</p>
              </div>

              <button
                onClick={() => { setEditingProject(null); setProjectModalOpen(true); }}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>+ Modul Proyek Internal</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(p => (
                <div key={p.id} className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="relative h-40 bg-slate-900 overflow-hidden">
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

        </div>
      )}

      {/* PUBLIC PROJECT MODAL FOR DIRECTOR */}
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
              <form id="pub-form-dir" onSubmit={handlePublicSubmit} className="space-y-4 text-xs">

                {/* GALLERY FOTO PROYEK — max 9 foto */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    🖼️ Gallery Foto Proyek <span className="text-slate-400 font-normal">({pubGallery.length}/{MAX_GALLERY})</span>
                    {pubGallery.length === 0 && <span className="text-rose-500 ml-1">*</span>}
                  </label>
                  <p className="text-[11px] text-slate-400 mb-2">Foto pertama menjadi gambar cover utama. Maksimal {MAX_GALLERY} foto.</p>

                  {/* Gallery grid */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {pubGallery.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 group bg-slate-100 dark:bg-slate-800">
                        <img src={resolveImageUrl(img)} alt={`foto-${idx + 1}`} className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).src = '/images/harvest-team-bg.jpg'; }} />
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

                    {/* Add photo slot */}
                    {pubGallery.length < MAX_GALLERY && (
                      <label className={`aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 transition-colors ${
                        isUploadingGallery 
                          ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 cursor-wait' 
                          : 'border-slate-300 dark:border-slate-600 cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20'
                      }`}>
                        {isUploadingGallery ? (
                          <>
                            <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[9px] text-emerald-600 font-bold text-center px-1">Mengompres...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-5 w-5 text-slate-400" />
                            <span className="text-[10px] text-slate-400 font-bold">Tambah</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          disabled={isUploadingGallery}
                          className="hidden"
                          onChange={async (e) => {
                            const files = e.target.files;
                            if (files && files.length > 0) {
                              setIsUploadingGallery(true);
                              const remaining = MAX_GALLERY - pubGallery.length;
                              const toUpload = Array.from(files).slice(0, remaining);
                              for (const f of toUpload) {
                                try {
                                  const downloadUrl = await uploadFileToFirebaseStorage(f as File, 'projects');
                                  setPubGallery(prev => [...prev, downloadUrl].slice(0, MAX_GALLERY));
                                } catch (err) {
                                  console.error('Gallery file upload error:', err);
                                }
                              }
                              setIsUploadingGallery(false);
                            }
                            e.target.value = '';
                          }}
                        />
                      </label>
                    )}
                  </div>

                  {/* URL input fallback */}
                  {pubGallery.length < MAX_GALLERY && (
                    <div className="flex items-center gap-2">
                      <input
                        id="dir-url-input"
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
                          const input = document.getElementById('dir-url-input') as HTMLInputElement;
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
                    placeholder="e.g. HYCOSMARTS Container Farm"
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
                    placeholder="e.g. Smart Container Hydroponics for 3T Areas"
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
                form="pub-form-dir"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer transition-colors"
              >
                {editingPublicItem ? '💾 Simpan Perubahan Proyek' : '🌐 Terbitkan ke Website Utama'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: APPLICANTS RECRUITMENT 5-STAGE MANAGER */}
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

      {/* VIEW: ATTENDANCE */}
      {activeTab === 'attendance' && (
        <AttendanceView 
          attendance={attendance} 
          students={students} 
          currentUser={currentUser} 
          onCorrectAttendance={onCorrectAttendance}
          darkMode={darkMode} 
        />
      )}

      {/* VIEW: REPORTS & ANALYTICS */}
      {activeTab === 'reports' && (
        <ReportExportModal 
          students={students}
          tasks={tasks}
          attendance={attendance}
          projects={projects}
          darkMode={darkMode} 
        />
      )}

      {/* VIEW: MY PROFILE */}
      {activeTab === 'profile' && currentUser && (
        <ProfileView 
          currentUser={currentUser} 
          onUpdateProfile={onUpdateProfile}
          users={users}
          projects={projects}
          publicProjects={publicProjects}
          darkMode={darkMode} 
        />
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

      {/* MODAL: CREATE / EDIT TASK FOR DIRECTOR */}
      {createTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {editingTask ? 'Edit Penugasan Riset' : 'Buat Penugasan Riset Baru'}
              </h3>
              <button onClick={() => setCreateTaskModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleTaskSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Judul Tugas Riset</label>
                <input 
                  type="text" 
                  value={taskTitle} 
                  onChange={e => setTaskTitle(e.target.value)} 
                  required 
                  placeholder="Contoh: Implementasi Gateway MQTT & XBee Sensor Node" 
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-slate-800 dark:text-slate-100" 
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Pilih Mahasiswa Peneliti</label>
                <select 
                  value={assignedStudentId} 
                  onChange={e => setAssignedStudentId(e.target.value)} 
                  required 
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-medium"
                >
                  <option value="">-- Pilih Mahasiswa Magang --</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.studentId || '1301210042'})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Proyek R&D Terkait</label>
                <input 
                  type="text" 
                  value={taskProject} 
                  onChange={e => setTaskProject(e.target.value)} 
                  placeholder="HYCOS-SMARTS Telemetry Gateway" 
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-slate-800 dark:text-slate-100" 
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Deskripsi Tugas & Instruksi Pembimbing</label>
                <textarea 
                  rows={3} 
                  value={taskDesc} 
                  onChange={e => setTaskDesc(e.target.value)} 
                  required 
                  placeholder="Jelaskan metodologi riset, parameter kalibrasi, dan target luaran ilmiah..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-slate-800 dark:text-slate-100" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Tenggat Waktu (Deadline)</label>
                  <input 
                    type="date" 
                    value={taskDeadline} 
                    onChange={e => setTaskDeadline(e.target.value)} 
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-slate-800 dark:text-slate-100" 
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Prioritas</label>
                  <select 
                    value={taskPriority} 
                    onChange={e => setTaskPriority(e.target.value as any)} 
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">Tinggi</option>
                    <option value="urgent">Urgent / Mendesak</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                <button 
                  type="button" 
                  onClick={() => setCreateTaskModalOpen(false)} 
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-bold shadow-md cursor-pointer transition-colors"
                >
                  {editingTask ? 'Simpan Perubahan' : 'Terbitkan Tugas Riset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REVISION DETAIL MODAL */}
      {selectedTaskForRevision && (
        <RevisionDetailModal
          task={selectedTaskForRevision}
          onClose={() => setSelectedTaskForRevision(null)}
          onRequestRevision={onRequestRevision}
          isAssistant={true}
          darkMode={darkMode}
        />
      )}

      {/* MODAL: OFFICIAL ACADEMIC EVALUATION & GRADING MODAL */}
      {evalModalOpen && evalStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-[#2E7D32]">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Evaluasi & Nilai Resmi Pembina Lab</h3>
                  <p className="text-xs text-slate-500">{evalStudent.name} ({evalStudent.studentId || '1301210042'})</p>
                </div>
              </div>
              <button onClick={() => setEvalModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvaluation} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold">Presensi (25%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={evalAttendanceScore}
                    onChange={(e) => handleUpdateScores(Number(e.target.value), evalTaskScore, evalAttitudeScore)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 font-mono text-center font-bold text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold">Tugas (50%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={evalTaskScore}
                    onChange={(e) => handleUpdateScores(evalAttendanceScore, Number(e.target.value), evalAttitudeScore)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 font-mono text-center font-bold text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold">Sikap (25%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={evalAttitudeScore}
                    onChange={(e) => handleUpdateScores(evalAttendanceScore, evalTaskScore, Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 font-mono text-center font-bold text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              {/* Calculated Summary */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-800 dark:text-emerald-300 block">Kalkulasi Nilai Akhir</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-2xl font-black text-emerald-900 dark:text-emerald-200">{evalFinalScore}</span>
                    <span className="text-xs text-emerald-700 dark:text-emerald-300">/ 100</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-800 dark:text-emerald-300 block">Huruf Mutu</span>
                  <span className="text-2xl font-black px-3.5 py-0.5 rounded-xl bg-[#2E7D32] text-white inline-block mt-0.5 shadow-xs">
                    {evalGrade}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-slate-700 dark:text-slate-200 font-semibold">Catatan Evaluasi Akademik Pembina Lab</label>
                <textarea
                  rows={3}
                  value={evalAdvisorNotes}
                  onChange={(e) => setEvalAdvisorNotes(e.target.value)}
                  placeholder="Tuliskan catatan apresiasi, saran pengembangan riset, atau capaian mahasiswa..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-xs text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setEvalModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-bold shadow-md flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Check className="h-4 w-4" />
                  <span>Simpan Nilai & Evaluasi Resmi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
