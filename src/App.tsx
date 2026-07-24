import React, { useState, useEffect } from 'react';
import TeamAvatar from './components/TeamAvatar';
import { 
  newsData, 
  projectsData, 
  teamData 
} from './data';
import { 
  initialUsers, 
  initialTasks, 
  initialAttendance, 
  initialLmsProjects, 
  initialAnnouncements, 
  initialApprovalRequests, 
  initialNotifications, 
  initialApplicants, 
  initialSystemLogs 
} from './data/lmsData';
import { 
  PageId, 
  Comment, 
  NewsItem, 
  ProjectItem,
  TeamMember,
  User, 
  Task, 
  AttendanceRecord, 
  LmsProject, 
  Announcement, 
  ApprovalRequest, 
  LmsNotification, 
  ApplicantRecord, 
  SystemLog,
  UserRole
} from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NewsDetailView from './components/NewsDetailView';
import JoinLabView from './components/JoinLabView';
import HycosmartsShowcase from './components/HycosmartsShowcase';
import SimonaShowcase from './components/SimonaShowcase';
import LuminetShowcase from './components/LuminetShowcase';
import FlocifyShowcase from './components/FlocifyShowcase';

import LoginView from './components/lms/LoginView';
import LmsLayout from './components/lms/LmsLayout';
import DirectorDashboard from './components/lms/DirectorDashboard';
import AssistantDashboard from './components/lms/AssistantDashboard';
import StudentDashboard from './components/lms/StudentDashboard';
import AdminDashboard from './components/lms/AdminDashboard';
import { 
  ChevronRight, 
  Send, 
  Users, 
  Sparkles, 
  TrendingUp, 
  ArrowUpRight, 
  Activity, 
  CheckCircle2, 
  X, 
  FileText, 
  Info, 
  Settings, 
  Clock, 
  MapPin, 
  Grid,
  ChevronLeft,
  Sliders,
  BellRing,
  HeartHandshake,
  Sprout,
  Network,
  Brain,
  Shield,
  GitBranch,
  Heart,
  Leaf,
  Calendar,
  MessageSquare
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projectSort, setProjectSort] = useState<'newest' | 'oldest'>('newest');
  const [projectCategory, setProjectCategory] = useState<string>('All');
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  // ==========================================
  // LABORATORY MANAGEMENT SYSTEM (LMS) STATE
  // ==========================================
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [lmsActiveTab, setLmsActiveTab] = useState<string>('overview');

  // Global LMS Theme & Language State
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<'id' | 'en'>('id');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleToggleDarkMode = () => setDarkMode(prev => !prev);
  const handleToggleLanguage = () => setLanguage(prev => prev === 'id' ? 'en' : 'id');

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initialAttendance);
  const [lmsProjects, setLmsProjects] = useState<LmsProject[]>(initialLmsProjects);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>(initialApprovalRequests);
  const [notifications, setNotifications] = useState<LmsNotification[]>(initialNotifications);
  const [applicants, setApplicants] = useState<ApplicantRecord[]>(initialApplicants);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>(initialSystemLogs);

  // CMS Content State
  const [newsList, setNewsList] = useState<NewsItem[]>(newsData);
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(projectsData);
  const [teamList, setTeamList] = useState<TeamMember[]>(teamData);

  // Sync teamList whenever teamData is updated
  useEffect(() => {
    setTeamList(teamData);
  }, []);

  // CMS Handlers
  const handleAddNews = (newItem: Omit<NewsItem, 'id'>) => {
    const item: NewsItem = { ...newItem, id: `news_${Date.now()}` };
    setNewsList(prev => [item, ...prev]);
  };

  const handleDeleteNews = (id: string) => {
    setNewsList(prev => prev.filter(n => n.id !== id));
  };

  const handleAddProject = (newProj: Omit<ProjectItem, 'id'>) => {
    const proj: ProjectItem = { ...newProj, id: `proj_${Date.now()}` };
    setProjectsList(prev => [proj, ...prev]);
  };

  const handleDeleteProject = (id: string) => {
    setProjectsList(prev => prev.filter(p => p.id !== id));
  };

  const handleAddTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const m: TeamMember = { ...member, id: `member_${Date.now()}` };
    setTeamList(prev => [...prev, m]);
  };

  const handleDeleteTeamMember = (id: string) => {
    setTeamList(prev => prev.filter(m => m.id !== id));
  };

  // Auto restore session on page reload/mount
  useEffect(() => {
    try {
      const savedUserJson = localStorage.getItem('smartgrow_session_user');
      if (savedUserJson) {
        const savedUser = JSON.parse(savedUserJson) as User;
        if (savedUser && savedUser.id) {
          const matchedUser = initialUsers.find(u => u.id === savedUser.id || u.email.toLowerCase() === savedUser.email.toLowerCase()) || savedUser;
          setCurrentUser(matchedUser);
          setCurrentPage('dashboard');
        }
      }
    } catch (err) {
      console.error('Error restoring session:', err);
    }
  }, []);

  // LMS Handlers
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('smartgrow_session_user', JSON.stringify(user));
    } catch (err) {
      console.error('Error saving session:', err);
    }
    setCurrentPage('dashboard');
    setLmsActiveTab('overview');
  };

  const handleSwitchUser = (newUser: User) => {
    setCurrentUser(newUser);
    try {
      localStorage.setItem('smartgrow_session_user', JSON.stringify(newUser));
    } catch (err) {
      console.error('Error saving switched session:', err);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('smartgrow_session_user');
    } catch (err) {
      console.error('Error clearing session:', err);
    }
    setCurrentPage('home');
  };

  const handleCreateTask = (newTask: Omit<Task, 'id' | 'status' | 'createdAt'>) => {
    const count = tasks.length + 1;
    const taskObj: Task = {
      ...newTask,
      id: `task_${Date.now()}`,
      taskNumber: newTask.taskNumber || `TGS-2026-00${count}`,
      projectName: newTask.projectName || 'Smart Grow IoT',
      progressPercent: newTask.progressPercent || 0,
      status: 'not_started',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [taskObj, ...prev]);

    // Add log
    const logObj: SystemLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      user: currentUser?.name || 'System',
      action: 'MEMBUAT_TUGAS',
      details: `Membuat tugas "${newTask.title}" (${taskObj.taskNumber}) untuk ${newTask.assignedStudentName}`
    };
    setSystemLogs(prev => [logObj, ...prev]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleRequestRevision = (taskId: string, revisionNote: string, assistantNotes: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const count = (t.revisions?.length || 0) + 1;
        const newRev = {
          id: `rev_${t.id}_${Date.now()}`,
          revisionDate: new Date().toLocaleString('id-ID'),
          version: `v1.${count}`,
          studentName: t.assignedStudentName,
          description: revisionNote || 'Perbaikan berkas dan kode sumber yang diajukan.',
          assistantNotes: assistantNotes,
          status: 'pending' as const,
          history: `Diminta revisi oleh ${currentUser?.name || 'Asisten'} pada ${new Date().toLocaleDateString('id-ID')}`
        };
        return {
          ...t,
          status: 'revision' as const,
          feedback: assistantNotes,
          revisions: [newRev, ...(t.revisions || [])]
        };
      }
      return t;
    }));
  };

  // Project CRUD Handlers
  const handleCreateLmsProject = (newProject: Omit<LmsProject, 'id'>) => {
    const projObj: LmsProject = {
      ...newProject,
      id: `proj_${Date.now()}`
    };
    setLmsProjects(prev => [projObj, ...prev]);

    // Log
    const logObj: SystemLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      user: currentUser?.name || 'System',
      action: 'TAMBAH_PROYEK_RISSET',
      details: `Menambahkan proyek riset baru "${newProject.title}" (${newProject.projectNumber})`
    };
    setSystemLogs(prev => [logObj, ...prev]);
  };

  const handleUpdateLmsProject = (updatedProject: LmsProject) => {
    setLmsProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const handleDeleteLmsProject = (projectId: string) => {
    setLmsProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const handleArchiveLmsProject = (projectId: string) => {
    setLmsProjects(prev => prev.map(p => p.id === projectId ? { ...p, status: 'archived' as const } : p));
  };

  const handleApproveTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'completed' as const } : t));
  };

  const handleRejectTask = (taskId: string, feedback: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'revision' as const, feedback } : t));
  };

  const handleCreateAnnouncement = (ann: Omit<Announcement, 'id' | 'date'>) => {
    const annObj: Announcement = {
      ...ann,
      id: `ann_${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [annObj, ...prev]);
  };

  const handleCheckIn = (studentId: string, studentName: string) => {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Determine status (if after 08:30 AM = late)
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const isLate = hour > 8 || (hour === 8 && minute > 30);

    const record: AttendanceRecord = {
      id: `att_${Date.now()}`,
      studentId,
      studentName,
      date: today,
      checkInTime: now,
      status: isLate ? 'late' : 'present'
    };

    setAttendance(prev => [record, ...prev]);
  };

  const handleCheckOut = (studentId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setAttendance(prev => prev.map(a => 
      (a.studentId === studentId && (a.date === today || a.date === '2026-07-22'))
        ? { ...a, checkOutTime: now } 
        : a
    ));
  };

  const handleSubmitTaskProgress = (taskId: string, notes: string, links: { github?: string; docs?: string }) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'review' as const } : t));
  };

  const handleApproveRequest = (requestId: string) => {
    setApprovalRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'approved' as const } : r));
  };

  const handleRejectRequest = (requestId: string) => {
    setApprovalRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'rejected' as const } : r));
  };

  const handleCreateUser = (newUser: Omit<User, 'id' | 'joinedDate'>) => {
    const userObj: User = {
      ...newUser,
      id: `user_${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300`
    };
    setUsers(prev => [...prev, userObj]);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const handleApproveApplicant = (applicantId: string) => {
    const applicant = applicants.find(a => a.id === applicantId);
    if (!applicant) return;

    // Approve applicant
    setApplicants(prev => prev.map(a => a.id === applicantId ? { ...a, status: 'approved' as const } : a));

    // Create student user account automatically
    const newStudent: User = {
      id: `user_${Date.now()}`,
      name: applicant.fullName,
      email: applicant.email,
      role: 'student',
      studentId: `130121${Math.floor(1000 + Math.random() * 9000)}`,
      institution: 'Telkom University',
      specialty: applicant.roleInterest,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };

    setUsers(prev => [...prev, newStudent]);
  };

  const handleRejectApplicant = (applicantId: string) => {
    setApplicants(prev => prev.map(a => a.id === applicantId ? { ...a, status: 'rejected' as const } : a));
  };

  const handleAddApplicantFromPublic = (app: { fullName: string; email: string; roleInterest: string; motivation: string; github?: string; instagram?: string }) => {
    const newApplicant: ApplicantRecord = {
      id: `app_${Date.now()}`,
      fullName: app.fullName,
      email: app.email,
      roleInterest: app.roleInterest,
      motivation: app.motivation,
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };

    setApplicants(prev => [newApplicant, ...prev]);
  };
  
  // Comments stored in LocalStorage for dynamic participation
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>({});
  
  // Active states for commenting
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');

  // Project Gallery slider index
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  // Gamified Sensor Simulation State
  const [simulatedSensors, setSimulatedSensors] = useState([
    { name: 'pH Level', value: 6.2, unit: 'pH', minSafe: 5.5, maxSafe: 6.5, step: 0.1 },
    { name: 'Total Dissolved Solids (TDS)', value: 1150, unit: 'ppm', minSafe: 800, maxSafe: 1400, step: 50 },
    { name: 'Dissolved Oxygen (DO)', value: 7.8, unit: 'mg/L', minSafe: 6.0, maxSafe: 9.0, step: 0.2 },
    { name: 'Electrical Conductivity (EC)', value: 1.8, unit: 'mS/cm', minSafe: 1.2, maxSafe: 2.2, step: 0.1 },
    { name: 'Ambient Temp', value: 24.5, unit: '°C', minSafe: 18.0, maxSafe: 28.0, step: 0.5 }
  ]);

  // Join form state
  const [joinForm, setJoinForm] = useState({
    name: '',
    email: '',
    role: 'IoT Specialist',
    reason: '',
    github: '',
    instagram: ''
  });
  const [joinSubmitted, setJoinSubmitted] = useState(false);

  // Load and sync comments on initial mount
  useEffect(() => {
    const savedComments = localStorage.getItem('smart_grow_comments');
    if (savedComments) {
      try {
        setCommentsMap(JSON.parse(savedComments));
      } catch (e) {
        console.error('Error loading comments', e);
      }
    } else {
      // Seed initial comments from data.ts
      const initialMap: Record<string, Comment[]> = {};
      newsData.forEach(item => {
        initialMap[item.id] = item.comments;
      });
      setCommentsMap(initialMap);
      localStorage.setItem('smart_grow_comments', JSON.stringify(initialMap));
    }
  }, []);

  // Handler for posting a new comment
  const handleAddComment = (newsId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentEmail.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      name: commentName,
      email: commentEmail,
      content: commentText,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    const updatedComments = {
      ...commentsMap,
      [newsId]: [newComment, ...(commentsMap[newsId] || [])]
    };

    setCommentsMap(updatedComments);
    localStorage.setItem('smart_grow_comments', JSON.stringify(updatedComments));

    // Reset inputs
    setCommentName('');
    setCommentEmail('');
    setCommentText('');
  };

  // Handler for join form submit
  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinForm.name.trim() || !joinForm.email.trim()) return;
    setJoinSubmitted(true);
    setTimeout(() => {
      setJoinForm({
        name: '',
        email: '',
        role: 'IoT Specialist',
        reason: '',
        github: '',
        instagram: ''
      });
      setJoinSubmitted(false);
      setJoinModalOpen(false);
    }, 2500);
  };

  // Adjust active simulated sensor values
  const updateSimulatedSensor = (index: number, val: number) => {
    const updated = [...simulatedSensors];
    updated[index].value = parseFloat(val.toFixed(1));
    setSimulatedSensors(updated);
  };

  // Scroll to top when page changes
  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    setSelectedNewsId(null);
    setSelectedProjectId(null);
    setActiveGalleryIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to check if a sensor is within safe range
  const isSensorSafe = (sensor: typeof simulatedSensors[0]) => {
    return sensor.value >= sensor.minSafe && sensor.value <= sensor.maxSafe;
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white text-slate-800 font-sans selection:bg-teal-500 selection:text-white relative">
      
      {/* Subtle light background hints */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Navigation Header */}
      {currentPage !== 'login' && currentPage !== 'dashboard' && (
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={handleNavigate} 
          onOpenJoin={() => handleNavigate('join')}
          isLoggedIn={!!currentUser}
          currentUserRole={currentUser?.role}
          onOpenLogin={() => handleNavigate('login')}
        />
      )}

      {/* LOGIN PAGE */}
      {currentPage === 'login' && (
        <LoginView 
          users={users} 
          onLogin={handleLogin} 
          onBack={() => handleNavigate('home')} 
        />
      )}

      {/* DASHBOARD LMS PAGE */}
      {currentPage === 'dashboard' && currentUser && (
        <LmsLayout
          currentUser={currentUser}
          onSwitchUser={handleSwitchUser}
          activeTab={lmsActiveTab}
          setActiveTab={setLmsActiveTab}
          notifications={notifications}
          onSignOut={handleLogout}
          onBackToWebsite={() => handleNavigate('home')}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          language={language}
          onToggleLanguage={handleToggleLanguage}
        >
          {currentUser.role === 'director' && (
            <DirectorDashboard
              currentUser={currentUser}
              activeTab={lmsActiveTab}
              tasks={tasks}
              attendance={attendance}
              projects={lmsProjects}
              announcements={announcements}
              approvalRequests={approvalRequests}
              logs={systemLogs}
              users={users}
              applicants={applicants}
              onApproveRequest={handleApproveRequest}
              onRejectRequest={handleRejectRequest}
              onCreateAnnouncement={handleCreateAnnouncement}
              onCreateProject={handleCreateLmsProject}
              onUpdateProject={handleUpdateLmsProject}
              onDeleteProject={handleDeleteLmsProject}
              onArchiveProject={handleArchiveLmsProject}
              darkMode={darkMode}
              language={language}
            />
          )}

          {currentUser.role === 'assistant' && (
            <AssistantDashboard
              currentUser={currentUser}
              activeTab={lmsActiveTab}
              tasks={tasks}
              attendance={attendance}
              projects={lmsProjects}
              announcements={announcements}
              students={users.filter(u => u.role === 'student')}
              onCreateTask={handleCreateTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onApproveTask={handleApproveTask}
              onRejectTask={handleRejectTask}
              onRequestRevision={handleRequestRevision}
              onCreateAnnouncement={handleCreateAnnouncement}
              onCreateProject={handleCreateLmsProject}
              onUpdateProject={handleUpdateLmsProject}
              onDeleteProject={handleDeleteLmsProject}
              onArchiveProject={handleArchiveLmsProject}
              darkMode={darkMode}
              language={language}
            />
          )}

          {currentUser.role === 'student' && (
            <StudentDashboard
              currentUser={currentUser}
              activeTab={lmsActiveTab}
              tasks={tasks}
              attendance={attendance}
              projects={lmsProjects}
              announcements={announcements}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
              onSubmitTaskProgress={handleSubmitTaskProgress}
              darkMode={darkMode}
              language={language}
            />
          )}

          {currentUser.role === 'admin' && (
            <AdminDashboard
              activeTab={lmsActiveTab}
              users={users}
              applicants={applicants}
              news={newsList}
              projects={projectsList}
              team={teamList}
              logs={systemLogs}
              attendance={attendance}
              onCreateUser={handleCreateUser}
              onDeleteUser={handleDeleteUser}
              onApproveApplicant={handleApproveApplicant}
              onRejectApplicant={handleRejectApplicant}
              onAddNews={handleAddNews}
              onDeleteNews={handleDeleteNews}
              onAddProject={handleAddProject}
              onDeleteProject={handleDeleteProject}
              onAddTeamMember={handleAddTeamMember}
              onDeleteTeamMember={handleDeleteTeamMember}
              onCheckInStudent={handleCheckIn}
              onCheckOutStudent={handleCheckOut}
              darkMode={darkMode}
              language={language}
            />
          )}
        </LmsLayout>
      )}

      {/* Main Content Area for Public Pages */}
      {currentPage !== 'login' && currentPage !== 'dashboard' && (
      <main className="pb-24">
        
        {/* --- PAGE: HOME --- */}
        {currentPage === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative px-4 pt-40 pb-36 sm:px-6 lg:px-8 text-left overflow-hidden bg-[#020b08] z-10" id="home-hero">
              {/* Immersive Glowing Cyber-Agriculture Background */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/* 1. Magical Green Forest Floor Background with Morning Dew & Sunbeams */}
                <img 
                  src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1600&q=80" 
                  className="absolute inset-0 w-full h-full object-cover opacity-85 scale-100 filter brightness-[0.7] contrast-[1.15] saturate-[1.1]"
                  alt="Organic plant base"
                />

                {/* 2. Soft Elegant Deep Gradient Overlays for Maximum Text Contrast (With zero visible boxes!) */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#010906]/95 via-[#010906]/75 to-transparent hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#010906]/90 via-[#010906]/85 to-[#010906]/90 block md:hidden" />

                {/* 3. Glowing neon green/yellow bioluminescent bokeh blurs */}
                <div className="absolute -top-20 left-10 w-[600px] h-[600px] rounded-full bg-emerald-500/25 blur-[150px] animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-5 right-10 w-[600px] h-[600px] rounded-full bg-teal-500/20 blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-lime-500/15 blur-[130px]" />

                {/* 4. Bottom Fades to white for a smooth integration with the rest of the page */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent" />
              </div>

              {/* Grid Layout: Split content directly on background without any card borders */}
              <div className="mx-auto max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Column: Direct Heading & Subtext (No card, completely open layout!) */}
                <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
                  
                  {/* Glowing Green Tech Pill Tag */}
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/40 bg-emerald-950/50 backdrop-blur-md px-4.5 py-2 text-xs font-sans font-extrabold tracking-widest text-emerald-400 uppercase shadow-md shadow-emerald-950/50">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]"></span>
                    <span>The Cyber-Physical Farming Hub</span>
                  </div>

                  <h1 className="font-display text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight">
                    Driving Agricultural Progress <br />
                    Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-300 drop-shadow-[0_2px_15px_rgba(52,211,153,0.4)]">Technological Innovation</span>
                  </h1>

                  <p className="max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg">
                    Integrated research and innovation hub focused on developing intelligent agricultural systems, bridging electrical automation with organic physiology.
                  </p>

                  {/* See More button directly rendered */}
                  <div className="pt-4">
                    <button
                      onClick={() => handleNavigate('project')}
                      id="btn-see-more-home"
                      className="group relative inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 px-8 py-4 text-sm font-bold tracking-wider uppercase text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-emerald-500/35 cursor-pointer border border-emerald-400/25 overflow-hidden"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-lime-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10">See More</span>
                      <ArrowUpRight className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>

                </div>

                {/* Right Column: Stunning Glowing Transparent Tech Earth Globe with Orbiting Sensors (Matching User's Mockup Perfectly!) */}
                <div className="lg:col-span-5 flex justify-center items-center relative py-8">
                  <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center">
                    
                    {/* Outer Rotating Dotted Orbital Ring */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-emerald-500/20 animate-spin" style={{ animationDuration: '40s' }} />
                    
                    {/* Secondary Reverse Rotating Dash Orbital Ring */}
                    <div className="absolute inset-6 rounded-full border border-dashed border-teal-500/30 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
                    
                    {/* Inner Solid Orbital Ring */}
                    <div className="absolute inset-16 rounded-full border border-emerald-500/10" />

                    {/* Glowing Tech Globe Base (Representing the transparent green earth globe in the mockup) */}
                    <div className="absolute inset-20 rounded-full bg-gradient-to-tr from-emerald-600/20 via-teal-500/10 to-transparent border border-emerald-400/30 shadow-[0_0_60px_rgba(16,185,129,0.25)] flex items-center justify-center overflow-hidden">
                      {/* Earth Grid SVG Graphic inside */}
                      <svg className="w-full h-full opacity-40 text-emerald-400 animate-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ animationDuration: '4s' }}>
                        {/* Horizontal latitude lines */}
                        <path d="M10,50 Q50,30 90,50" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M10,50 Q50,70 90,50" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M15,30 Q50,15 85,30" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M15,70 Q50,85 85,70" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
                        
                        {/* Vertical longitude lines */}
                        <path d="M50,10 Q30,50 50,90" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M50,10 Q70,50 50,90" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M50,10 Q10,50 50,90" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M50,10 Q90,50 50,90" stroke="currentColor" strokeWidth="0.5" />
                        <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
                      </svg>
                      
                      {/* Holographic Glowing Green Continent Graphic overlay */}
                      <div className="absolute inset-4 rounded-full bg-emerald-500/5 blur-sm" />
                    </div>

                    {/* Glowing Core Leaf/Seed Element floating inside the earth */}
                    <div className="absolute z-10 p-4 rounded-full bg-emerald-950/80 border border-emerald-400/40 shadow-[0_0_30px_rgba(52,211,153,0.4)] text-emerald-400 animate-bounce" style={{ animationDuration: '5s' }}>
                      <Leaf className="h-8 w-8 text-emerald-400 fill-emerald-400/20" />
                    </div>

                    {/* Orbiting Sensor Badges with glowing line connections - matches the mockup's circular icons */}
                    
                    {/* Badge 1: Wi-Fi/Telemetri (Top Right) */}
                    <div className="absolute top-4 right-4 flex flex-col items-center animate-pulse" style={{ animationDuration: '3s' }}>
                      <div className="p-3 rounded-full bg-emerald-950/90 border border-emerald-400/50 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                        <Network className="h-5 w-5" />
                      </div>
                      <span className="mt-1.5 text-[9px] font-sans font-bold text-emerald-300 uppercase tracking-widest bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                        XBee Mesh
                      </span>
                    </div>

                    {/* Badge 2: pH/Acidity (Top Left) */}
                    <div className="absolute top-12 left-2 flex flex-col items-center animate-pulse" style={{ animationDuration: '4s' }}>
                      <div className="p-3 rounded-full bg-teal-950/90 border border-teal-400/50 text-teal-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                        <Activity className="h-5 w-5" />
                      </div>
                      <span className="mt-1.5 text-[9px] font-sans font-bold text-teal-300 uppercase tracking-widest bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/20">
                        pH Sensor
                      </span>
                    </div>

                    {/* Badge 3: Crop Growth (Bottom Right) */}
                    <div className="absolute bottom-8 right-6 flex flex-col items-center animate-pulse" style={{ animationDuration: '3.5s' }}>
                      <div className="p-3 rounded-full bg-lime-950/90 border border-lime-400/50 text-lime-400 shadow-[0_0_15px_rgba(163,230,53,0.3)]">
                        <Sprout className="h-5 w-5" />
                      </div>
                      <span className="mt-1.5 text-[9px] font-sans font-bold text-lime-300 uppercase tracking-widest bg-lime-950/60 px-2 py-0.5 rounded border border-lime-500/20">
                        Sprout Growth
                      </span>
                    </div>

                    {/* Badge 4: Automated Dosing Pump (Bottom Left) */}
                    <div className="absolute bottom-16 left-4 flex flex-col items-center animate-pulse" style={{ animationDuration: '4.5s' }}>
                      <div className="p-3 rounded-full bg-emerald-950/90 border border-emerald-400/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                        <Sliders className="h-5 w-5" />
                      </div>
                      <span className="mt-1.5 text-[9px] font-sans font-bold text-emerald-300 uppercase tracking-widest bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                        Dosing
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            </section>

            {/* BENTO STATS & FEATURED PREVIEW SECTION (Matches photo blocks perfectly) */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" id="home-bento">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
                
                {/* Photo Card Left: Panen Hasil Hidroponik */}
                <div className="md:col-span-4 group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                    <img 
                      src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=800&q=80" 
                      alt="Harvest crop"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-slate-950/10 to-transparent"></div>
                    <span className="absolute bottom-3 left-3 rounded-md bg-teal-600 px-2.5 py-1 text-[10px] font-sans font-bold tracking-wider text-white uppercase">
                      LAB ACTIVITIES
                    </span>
                  </div>
                  <div className="mt-4 px-2">
                    <h3 className="font-display text-lg font-bold text-slate-900 transition-colors">
                      Panen Hasil Hidroponik Cerdas
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                      Continuous cultivation of heavy-yielding leafy crops integrated directly with automated electronic feeding.
                    </p>
                  </div>
                </div>

                {/* Stats Blocks: Partners, Projects, Members & Dynamic Lettuce image */}
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Stat 1: Blue Partners Block */}
                  <div className="group relative overflow-hidden rounded-3xl bg-emerald-600 p-8 flex flex-col justify-between min-h-[190px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-600/20">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Users className="h-20 w-20 text-white" />
                    </div>
                    <div>
                      <span className="font-sans text-[11px] tracking-wider font-bold text-emerald-100 uppercase">PARTNERS AND CLIENTS</span>
                      <h4 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold text-white">10+</h4>
                    </div>
                    <p className="mt-4 text-xs text-emerald-50/90 font-sans leading-relaxed">
                      Our Partners and corporate clients collaborate to scale laboratory prototypes into commercial agricultural projects.
                    </p>
                  </div>

                  {/* Stat 2: White/Sleek Project Block */}
                  <div className="group relative overflow-hidden rounded-3xl bg-white border border-slate-100 p-8 flex flex-col justify-between min-h-[190px] shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <TrendingUp className="h-20 w-20 text-teal-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-sans text-[11px] tracking-wider font-bold text-slate-400 uppercase">TOTAL PROJECTS</span>
                        <span className="rounded-full bg-teal-50 px-2.5 py-0.5 font-sans text-[10px] font-bold text-teal-600">
                          +5 This Month
                        </span>
                      </div>
                      <h4 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold text-slate-900">10+</h4>
                    </div>
                    <p className="mt-4 text-xs text-slate-500 font-sans leading-relaxed">
                      Active systems research models deployed this quarter in both high-yield containers and smart municipal fixtures.
                    </p>
                  </div>

                  {/* Stat 3: Yellow Members Block */}
                  <div className="group relative overflow-hidden rounded-3xl bg-[#ffd214] p-8 flex flex-col justify-between min-h-[190px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-yellow-500/10">
                    <div>
                      <span className="font-sans text-[11px] tracking-wider font-bold text-amber-950/80 uppercase">LABORATORY MEMBERS</span>
                      <h4 className="mt-2 font-display text-4xl sm:text-5xl font-extrabold text-amber-950">10+</h4>
                    </div>
                    <p className="mt-4 text-xs text-amber-900 font-sans leading-relaxed">
                      Active multidisciplinary engineering students, researchers, and agronomists coordinating in Telkom University.
                    </p>
                  </div>

                  {/* Lettuce Card: Achieve Optimal Efficiency */}
                  <div className="group relative overflow-hidden rounded-3xl bg-[#0c5a57] p-6 flex flex-col justify-between min-h-[190px] transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-teal-900/10 text-white">
                    <div className="relative h-20 overflow-hidden rounded-xl opacity-80">
                      <img 
                        src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80" 
                        alt="Lettuce"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mt-3">
                      <p className="text-sm font-extrabold tracking-tight leading-snug">
                        "Achieve optimal efficiency and boost crop productivity!"
                      </p>
                      <span className="mt-1 block font-sans text-[9px] text-teal-200 uppercase tracking-widest font-bold">
                        HYDROPONIC OPTIMIZATION CORE
                      </span>
                    </div>
                  </div>

                </div>

              </div>
            </section>

            {/* RESEARCH INTEREST SECTION (Directly matching user image) */}
            <section className="w-full bg-emerald-950 py-16 px-4 sm:px-6 lg:px-8 my-12 relative overflow-hidden" id="research-interests">
              <div className="absolute top-0 right-0 h-64 w-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-20 -left-20 h-80 w-80 bg-black/10 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="mx-auto max-w-7xl">
                <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white text-center mb-12 tracking-tight">
                  Research Interest
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-[#0c5a57] p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#0c5a57]/30 cursor-pointer">
                    <div>
                      <Sprout className="h-8 w-8 text-white mb-8" />
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug">
                      Smart Farming & Precision Agriculture
                    </h3>
                  </div>

                  {/* Card 2 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-[#0c5a57] p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#0c5a57]/30 cursor-pointer">
                    <div>
                      <Network className="h-8 w-8 text-white mb-8" />
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug">
                      Internet of Things (IoT) & Wireless Sensor Networks
                    </h3>
                  </div>

                  {/* Card 3 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-[#0c5a57] p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#0c5a57]/30 cursor-pointer">
                    <div>
                      <Brain className="h-8 w-8 text-white mb-8" />
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug">
                      Artificial Intelligence & Machine Learning Applications
                    </h3>
                  </div>

                  {/* Card 4 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-[#0c5a57] p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#0c5a57]/30 cursor-pointer">
                    <div>
                      <Shield className="h-8 w-8 text-white mb-8" />
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug">
                      Quantum & Information Security
                    </h3>
                  </div>

                  {/* Card 5 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-[#0c5a57] p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#0c5a57]/30 cursor-pointer">
                    <div>
                      <Activity className="h-8 w-8 text-white mb-8" />
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug">
                      Signal Processing & Compressive Sensing
                    </h3>
                  </div>

                  {/* Card 6 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-[#0c5a57] p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#0c5a57]/30 cursor-pointer">
                    <div>
                      <Heart className="h-8 w-8 text-white mb-8" />
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug">
                      Telemedicine & Health Technology
                    </h3>
                  </div>

                  {/* Card 7 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-[#0c5a57] p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#0c5a57]/30 cursor-pointer">
                    <div>
                      <GitBranch className="h-8 w-8 text-white mb-8" />
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug">
                      Networking & Software Defined Networks (SDN)
                    </h3>
                  </div>

                  {/* Card 8 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-[#0c5a57] p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-[#0c5a57]/30 cursor-pointer">
                    <div>
                      <Leaf className="h-8 w-8 text-white mb-8" />
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug">
                      Green Technology & Sustainable Systems
                    </h3>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* --- PAGE: NEWS & EVENTS --- */}
        {currentPage === 'news' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 animate-fade-in" id="news-section">
            
            {!selectedNewsId ? (
              <>
                <div className="flex flex-col gap-2 mb-10">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-8 rounded bg-teal-600"></span>
                    <span className="font-sans text-xs font-bold tracking-widest text-teal-600 uppercase">Updates & Publications</span>
                  </div>
                  <h1 className="font-display text-4xl font-bold text-slate-900 md:text-5xl">
                    News & Events
                  </h1>
                </div>

                {/* Grid of news articles */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {newsList.map((item) => (
                    <article 
                      key={item.id}
                      onClick={() => {
                        setSelectedNewsId(item.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group cursor-pointer flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-teal-500/20"
                      id={`news-card-${item.id}`}
                    >
                      <div>
                        {/* News Image container */}
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            <span className="rounded-full bg-white/95 backdrop-blur-md border border-slate-100 px-3 py-1 text-[10px] font-sans font-bold tracking-wider text-teal-700 uppercase">
                              {item.category}
                            </span>
                          </div>
                        </div>

                        {/* Title & Metadata */}
                        <div className="mt-5 px-1">
                          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400 mb-2">
                            <span>{item.date}</span>
                            <span>•</span>
                            <span>{item.readTime} read</span>
                          </div>
                          
                          <h3 className="font-display text-lg font-bold text-slate-900 leading-snug group-hover:text-teal-600 transition-colors">
                            {item.title}
                          </h3>
                          
                          <p className="mt-3 text-sm text-slate-500 line-clamp-3 leading-relaxed">
                            {item.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 px-1 flex items-center justify-between">
                        <span className="font-sans text-xs font-bold text-teal-600 group-hover:underline flex items-center gap-1">
                          Read Full Article
                        </span>
                        <div className="flex items-center gap-1 text-slate-400 font-sans text-xs">
                          <span>{(commentsMap[item.id] || []).length}</span>
                          <span>Comments</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              // NEWS DETAIL HIGH FIDELITY VIEW WITH INTEGRATED SIMULATIONS
              (() => {
                const item = newsList.find(n => n.id === selectedNewsId);
                if (!item) return null;
                const itemComments = commentsMap[item.id] || [];
                return (
                  <NewsDetailView
                    item={item}
                    comments={itemComments}
                    onBack={() => {
                      setSelectedNewsId(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onAddComment={(name, email, content) => {
                      const newComment: Comment = {
                        id: `comment_${Date.now()}`,
                        name,
                        email,
                        content,
                        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
                      };
                      const updatedComments = {
                        ...commentsMap,
                        [item.id]: [newComment, ...(commentsMap[item.id] || [])]
                      };
                      setCommentsMap(updatedComments);
                      localStorage.setItem('smart_grow_comments', JSON.stringify(updatedComments));
                    }}
                  />
                );
              })()
            )}

          </div>
        )}

        {/* --- PAGE: PROJECT --- */}
        {currentPage === 'project' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 animate-fade-in" id="project-section">
            
            {!selectedProjectId ? (
              <>
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-8 rounded bg-teal-600"></span>
                      <span className="font-sans text-xs font-bold tracking-widest text-teal-600 uppercase">Riset & Inovasi</span>
                    </div>
                    <h1 className="font-display text-4xl font-extrabold text-slate-900 md:text-5xl tracking-tight">
                      Projek R&D Hub
                    </h1>
                    <p className="max-w-2xl text-sm sm:text-base text-slate-500 font-sans mt-1">
                      Sistem cerdas pertanian siber, telemetri nirkabel, dan otomatisasi kontrol bio-lingkungan yang dikembangkan oleh tim laboratorium kami.
                    </p>
                  </div>

                  {/* Native styled dropdown for sorting by date */}
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 rounded-2xl px-4 py-3 text-xs font-bold text-slate-700 shadow-inner shrink-0 self-start md:self-end">
                    <Sliders className="h-3.5 w-3.5 text-teal-600" />
                    <span>Urutkan:</span>
                    <select
                      value={projectSort}
                      onChange={(e) => setProjectSort(e.target.value as 'newest' | 'oldest')}
                      className="bg-transparent border-none outline-none font-sans font-bold text-teal-600 cursor-pointer focus:ring-0 pr-1"
                    >
                      <option value="newest">Projek Terbaru</option>
                      <option value="oldest">Projek Terlama</option>
                    </select>
                  </div>
                </div>

                {/* Categories Filter Pills */}
                <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-slate-100">
                  {[
                    { label: 'Semua Projek', value: 'All' },
                    { label: 'IoT & Telemetri', value: 'IoT' },
                    { label: 'Hidroponik', value: 'Hydroponics' },
                    { label: 'Akuaponik', value: 'Aquaponics' },
                    { label: 'Smart Container', value: 'Container-based' }
                  ].map((cat) => {
                    const isActive = projectCategory === cat.value;
                    return (
                      <button
                        key={cat.value}
                        onClick={() => setProjectCategory(cat.value)}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold font-sans tracking-wide border transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 ${
                          isActive
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-transparent shadow-md shadow-teal-600/20'
                            : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* Projects Grid */}
                {(() => {
                  const filtered = [...projectsList]
                    .filter(p => projectCategory === 'All' || p.category.toLowerCase().includes(projectCategory.toLowerCase()))
                    .sort((a, b) => {
                      const dateA = new Date(a.date).getTime();
                      const dateB = new Date(b.date).getTime();
                      return projectSort === 'newest' ? dateB - dateA : dateA - dateB;
                    });

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl bg-slate-50/30">
                        <Sliders className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                        <p className="text-sm text-slate-500 font-sans font-bold uppercase tracking-wider">
                          Tidak ada projek yang sesuai dengan filter kategori ini.
                        </p>
                      </div>
                    );
                  }

                  const formatProjectDate = (dateStr: string) => {
                    const parts = dateStr.split('-');
                    if (parts.length !== 3) return dateStr;
                    const year = parts[0];
                    const monthNum = parseInt(parts[1]);
                    const monthsIndonesian = [
                      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
                    ];
                    return `${monthsIndonesian[monthNum - 1]} ${year}`;
                  };

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {filtered.map((project) => (
                        <div
                          key={project.id}
                          onClick={() => {
                            setSelectedProjectId(project.id);
                            setActiveGalleryIndex(0);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="group cursor-pointer bg-white border border-slate-100 p-5 rounded-3xl transition-all duration-300 hover:shadow-xl hover:border-teal-500/20 hover:scale-[1.01] flex flex-col justify-between shadow-xs min-h-[460px]"
                          id={`project-card-${project.id}`}
                        >
                          <div className="space-y-5">
                            {/* Card Media Preview */}
                            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-100 bg-slate-950">
                              <img
                                src={project.image}
                                alt={project.title}
                                className={`h-full w-full transition-transform duration-700 group-hover:scale-105 ${
                                  project.image.includes('logo') 
                                    ? 'object-contain p-6 bg-slate-950' 
                                    : 'object-cover object-center'
                                }`}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                              
                              {/* Overlay Category Tag */}
                              <div className="absolute top-4 left-4 flex gap-2">
                                <span className="rounded-full bg-white/95 backdrop-blur-md border border-slate-100 px-3.5 py-1 text-[10px] font-sans font-bold tracking-wider text-teal-700 uppercase shadow-xs">
                                  {project.category}
                                </span>
                              </div>

                              {/* Overlay Date Badge */}
                              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-slate-950/70 border border-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-mono font-medium">
                                <Calendar className="h-3 w-3 text-emerald-400" />
                                <span>{formatProjectDate(project.date)}</span>
                              </div>
                            </div>

                            {/* Project Information */}
                            <div className="px-1 space-y-2">
                              <h3 className="font-display text-xl font-black text-slate-950 group-hover:text-teal-600 transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-xs font-sans font-bold text-slate-400 uppercase tracking-wider">
                                {project.tagline}
                              </p>
                              <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                                {project.description}
                              </p>
                            </div>
                          </div>

                          {/* Trigger Arrow Action row */}
                          <div className="mt-6 pt-4 border-t border-slate-50 px-1 flex items-center justify-between">
                            <span className="font-sans text-xs font-bold text-teal-600 group-hover:underline flex items-center gap-1.5">
                              Lihat Spesifikasi & Diagnostik
                            </span>
                            <div className="h-8 w-8 rounded-full bg-slate-50 group-hover:bg-teal-50 flex items-center justify-center text-slate-400 group-hover:text-teal-600 transition-all">
                              <ArrowUpRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </>
            ) : (
              // PROJECT DETAIL SHOWCASE VIEW
              (() => {
                const project = projectsList.find(p => p.id === selectedProjectId);
                if (!project) return null;

                if (project.id === 'hycosmarts') {
                  return (
                    <HycosmartsShowcase
                      item={project}
                      onBack={() => {
                        setSelectedProjectId(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  );
                }

                if (project.id === 'simona') {
                  return (
                    <SimonaShowcase
                      item={project}
                      onBack={() => {
                        setSelectedProjectId(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  );
                }

                if (project.id === 'luminet') {
                  return (
                    <LuminetShowcase
                      item={project}
                      onBack={() => {
                        setSelectedProjectId(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  );
                }

                if (project.id === 'flocify') {
                  return (
                    <FlocifyShowcase
                      item={project}
                      onBack={() => {
                        setSelectedProjectId(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  );
                }

                const formatProjectDate = (dateStr: string) => {
                  const parts = dateStr.split('-');
                  if (parts.length !== 3) return dateStr;
                  const year = parts[0];
                  const monthNum = parseInt(parts[1]);
                  const monthsIndonesian = [
                    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
                  ];
                  return `${monthsIndonesian[monthNum - 1]} ${year}`;
                };

                return (
                  <div className="space-y-8 animate-fade-in" id="project-detail-container">
                    
                    {/* Back to Project Showcase List button */}
                    <button 
                      onClick={() => {
                        setSelectedProjectId(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-all duration-300 shadow-sm hover:shadow hover:border-slate-300 cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4 text-teal-600 group-hover:-translate-x-1 transition-transform" />
                      <span>Kembali ke Semua Projek</span>
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">
                      
                      {/* Left Column: Slider & Thumbnails */}
                      <div className="lg:col-span-6 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-8 rounded bg-teal-600"></span>
                            <span className="font-sans text-xs font-bold tracking-widest text-teal-600 uppercase">PROJECT // SHOWCASE</span>
                          </div>
                          <h1 className="font-display text-4xl font-extrabold text-slate-900">
                            {project.title}
                          </h1>
                          <p className="text-sm font-sans font-bold text-teal-600 uppercase tracking-wider mt-1">
                            {project.tagline}
                          </p>
                        </div>

                        {/* Main Image View */}
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-slate-100 bg-slate-50 shadow-lg">
                          <img 
                            src={project.gallery[activeGalleryIndex] || project.image} 
                            alt={`${project.title} slide`}
                            className="w-full h-full object-cover transition-all duration-700"
                          />
                          
                          {/* Warm Cream Floating Metadata Banner (Matching User's Uploaded Mockup Exactly) */}
                          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center bg-[#efeae4]/90 px-8 py-5 rounded-[1.75rem] border border-[#dfd6c8]/60 shadow-xl backdrop-blur-md">
                            <span className="text-xs font-sans font-bold tracking-wider text-[#0a5c4e] uppercase">
                              MICRO-ENVIRONMENT DIAGRAMS
                            </span>
                            <div className="flex items-center gap-1.5 font-sans font-bold text-sm text-[#5c544d]">
                              <span>0{activeGalleryIndex + 1}</span>
                              <span className="text-[#a89d91]">/</span>
                              <span className="text-[#8c8175]">0{project.gallery.length}</span>
                            </div>
                          </div>
                        </div>

                        {/* Slide Thumbnails (Matching User's Thumbnail Mockup Styling Exactly) */}
                        {project.gallery && project.gallery.length > 0 && (
                          <div className="grid grid-cols-4 gap-4 mt-2">
                            {project.gallery.map((thumb, index) => {
                              const isActive = activeGalleryIndex === index;
                              return (
                                <button
                                  key={index}
                                  onClick={() => setActiveGalleryIndex(index)}
                                  className={`aspect-video rounded-[1.25rem] overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                                    isActive 
                                      ? 'border-transparent ring-3 ring-teal-400 ring-offset-0 scale-[1.05] shadow-lg shadow-teal-500/30' 
                                      : 'border-transparent hover:scale-[1.02] opacity-80 hover:opacity-100 hover:shadow-md'
                                  }`}
                                >
                                  <img src={thumb} alt="Thumbnail" className="w-full h-full object-cover rounded-[1.1rem]" />
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Right Column: Meta Specifications, Description, Dynamic Gauges */}
                      <div className="lg:col-span-6 space-y-8">
                        
                        <div className="bg-white border border-slate-100 p-6 rounded-3xl space-y-4 shadow-sm">
                          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-50">
                            <span className="rounded-full bg-teal-50 border border-teal-100 px-3 py-1 font-sans text-[10px] font-bold text-teal-600 uppercase tracking-wider">
                              {project.category}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono font-bold uppercase flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5 text-teal-600" />
                              Selesai: {formatProjectDate(project.date)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-slate-600 leading-relaxed font-sans pt-2">
                            {project.fullDescription}
                          </p>
                        </div>

                        {/* Active Real Sensors Metrics */}
                        <div className="space-y-4">
                          <h3 className="font-display text-lg font-bold text-slate-900 flex items-center gap-2">
                            <Activity className="h-4 w-4 text-teal-600" />
                            <span>Kerangka Kerja Sensorik Terkalibrasi</span>
                          </h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {project.sensors.map((sensor) => (
                              <div key={sensor.name} className="bg-white border border-slate-100 p-4 rounded-2xl flex flex-col justify-between shadow-sm hover:border-slate-200 transition-colors">
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-xs font-bold text-slate-800">{sensor.name}</span>
                                  <span className="font-sans text-xs font-bold text-teal-600">{sensor.value} {sensor.unit}</span>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-normal">{sensor.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Operational parameters status */}
                        <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-100/60 flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-teal-100 text-teal-700">
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900 uppercase tracking-wider font-sans">Status Operasional</p>
                            <p className="text-xs text-slate-500 mt-0.5">Sistem {project.title} berjalan penuh dan terkalibrasi di kawasan riset Telkom University.</p>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })()
            )}

          </div>
        )}

        {/* --- PAGE: ABOUT --- */}
        {currentPage === 'about' && (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 animate-fade-in" id="about-section">
            
            {/* Header info */}
            <div className="flex flex-col gap-2 mb-10 text-center">
              <span className="font-sans text-xs font-bold tracking-widest text-teal-600 uppercase">THE RESEARCHERS</span>
              <h1 className="font-display text-4xl font-extrabold text-slate-900 sm:text-5xl">
                Our Team
              </h1>
              <p className="mx-auto max-w-xl text-xs text-slate-500 font-sans mt-1 uppercase font-semibold">
                Multidisciplinary cyber-agricultural students and specialists in Telkom University
              </p>
            </div>

            {/* Main Mentor Card (Prof Indrarini) - Highlighted size */}
            {(() => {
              const mentor = teamList.find(m => m.role === 'Mentor');
              if (!mentor) return null;
              return (
                <div className="mx-auto max-w-3xl bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl mb-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-sm group">
                  
                  {/* Mentor Graphic Avatar section matching real photo */}
                  <div className="relative w-44 h-52 shrink-0 rounded-2xl overflow-hidden shadow-md">
                    <TeamAvatar id={mentor.id} name={mentor.name} className="w-full h-full" />
                  </div>

                  <div className="flex-1 space-y-4 text-left">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="rounded bg-pink-50 border border-pink-200 px-2.5 py-0.5 font-sans text-[10px] font-bold text-pink-700 uppercase tracking-wider">
                          {mentor.role}
                        </span>
                        <span className="text-slate-400 font-sans text-[9px] font-bold">SMART GROW LAB MENTOR</span>
                      </div>
                      <h2 className="font-display text-xl font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
                        {mentor.name}
                      </h2>
                      <p className="font-sans text-xs font-bold text-teal-600 mt-1">{mentor.email}</p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {mentor.bio}
                    </p>

                    {/* Skills badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {mentor.skills.map(s => (
                        <span key={s} className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-0.5 font-sans text-[9px] text-slate-600 font-medium">
                          #{s.toLowerCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Students & Researchers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {teamList.filter(m => m.role !== 'Mentor').map((member) => (
                <div 
                  key={member.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-teal-500/20"
                >
                  <div className="space-y-4">
                    {/* Member customized avatar matching uploaded photo features */}
                    <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden shadow-xs">
                      <TeamAvatar id={member.id} name={member.name} className="w-full h-full" />
                      <div className="absolute top-3 left-3">
                        <span className="inline-block rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 px-3 py-1 font-sans text-[10px] font-bold text-teal-300 uppercase tracking-wider shadow-xs">
                          {member.role}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                        {member.name}
                      </h3>
                      <p className="font-sans text-xs text-slate-400 mt-0.5 break-all font-semibold">{member.email}</p>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      {member.bio}
                    </p>
                  </div>

                  {/* Member Skill Sub-tag row */}
                  <div className="mt-6 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {member.skills.map(skill => (
                      <span key={skill} className="text-[10px] font-sans text-teal-700 bg-teal-50/80 px-2 py-0.5 rounded-md font-semibold">
                        #{skill.toLowerCase().replace(/\s+/g, '')}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Smart Grow Lab description section (Matches visual in screenshot 8) */}
            <section className="rounded-3xl border border-slate-100 bg-white p-6 md:p-10 text-center max-w-4xl mx-auto relative overflow-hidden shadow-sm">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/5 rounded-full blur-[80px] pointer-events-none"></div>
              
              <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
                  Smart Grow Lab
                </h2>
                
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  SMART GROW LAB is an integrated research and innovation hub focused on developing intelligent, sustainable, and data-driven agricultural systems. By leveraging cutting-edge technologies such as the Internet of Things (IoT), Artificial Intelligence (AI), and automation, SMART GROW LAB aims to revolutionize traditional farming practices and address global challenges related to food security, climate change, and resource efficiency.
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  Our core activities include the design and implementation of smart farming solutions—ranging from hydroponics and aquaponics to smart greenhouses and AIoT-based aquaculture monitoring systems. Through multidisciplinary collaboration and a commitment to sustainable development, SMART GROW LAB supports the transformation of agriculture into a high-tech, environmentally responsible sector.
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => handleNavigate('join')}
                    className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-8 py-3 text-sm font-bold tracking-wider uppercase text-white hover:scale-105 active:scale-95 transition-all shadow-md shadow-emerald-600/10 cursor-pointer"
                  >
                    <span>Join Us!</span>
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* --- PAGE: RECRUITMENT JOIN THE LAB (HI-FI VIEW) --- */}
        {currentPage === 'join' && (
          <JoinLabView 
            onBack={() => handleNavigate('home')} 
            onAddApplicant={handleAddApplicantFromPublic}
          />
        )}


      </main>
      )}

      {/* --- FOOTER COMPONENT --- */}
      {currentPage !== 'login' && currentPage !== 'dashboard' && (
        <Footer setCurrentPage={handleNavigate} />
      )}

      {/* --- FLOATING JOIN US MODAL DIALOG --- */}
      {joinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-fade-in" id="join-modal-wrapper">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
            <div className="absolute top-0 right-0 h-32 w-32 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-teal-600 animate-pulse" />
                <h3 className="font-display text-lg font-bold text-slate-900 uppercase tracking-wider">
                  Apply to Join the Lab
                </h3>
              </div>
              <button 
                onClick={() => {
                  setJoinModalOpen(false);
                  setJoinSubmitted(false);
                }}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main form / success view */}
            {!joinSubmitted ? (
              <form onSubmit={handleJoinSubmit} className="space-y-4 pt-4" id="join-lab-form">
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  We are always looking for passionate researchers and students interested in bridging hardware instrumentation, automation, and agriculture.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-sans font-bold text-slate-500 uppercase">Nama Lengkap</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Shara Anjelia"
                      value={joinForm.name}
                      onChange={(e) => setJoinForm({...joinForm, name: e.target.value})}
                      className="bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all rounded-xl px-4 py-2.5 text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-sans font-bold text-slate-500 uppercase">Email Student / General</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. shara@student.telkomuniversity.ac.id"
                      value={joinForm.email}
                      onChange={(e) => setJoinForm({...joinForm, email: e.target.value})}
                      className="bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all rounded-xl px-4 py-2.5 text-xs"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold text-slate-500 uppercase">Role Of Interest</label>
                  <select 
                    value={joinForm.role}
                    onChange={(e) => setJoinForm({...joinForm, role: e.target.value})}
                    className="bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white transition-all rounded-xl px-4 py-2.5 text-xs cursor-pointer"
                  >
                    <option value="IoT Specialist">IoT Specialist / Hardware Engineer</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Full-stack Developer">Full-stack Software Developer</option>
                    <option value="Agronomist">Agronomist / Plant Biologist</option>
                    <option value="Machine Learning Specialist">Machine Learning Specialist</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold text-slate-500 uppercase">Why do you want to join Smart Grow Laboratory?</label>
                  <textarea 
                    rows={3}
                    placeholder="Briefly describe your skillsets, motivation, and which project (HYCOSMARTS, Smart Hydroponics, etc.) inspires you."
                    value={joinForm.reason}
                    onChange={(e) => setJoinForm({...joinForm, reason: e.target.value})}
                    className="bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all rounded-xl p-4 text-xs resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-sans font-bold text-slate-500 uppercase">GitHub Profile (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="https://github.com/yourusername"
                      value={joinForm.github}
                      onChange={(e) => setJoinForm({...joinForm, github: e.target.value})}
                      className="bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all rounded-xl px-4 py-2.5 text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-sans font-bold text-slate-500 uppercase">Instagram Handles (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="@yourusername"
                      value={joinForm.instagram}
                      onChange={(e) => setJoinForm({...joinForm, instagram: e.target.value})}
                      className="bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all rounded-xl px-4 py-2.5 text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full relative flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 py-3 text-xs font-bold tracking-wider uppercase text-white hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-md shadow-emerald-600/10"
                >
                  <span>Submit Application</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600 border border-teal-100">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold text-slate-900">Application Received!</h4>
                  <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto font-sans leading-relaxed">
                    Terima kasih telah mendaftar, <strong className="text-slate-900">{joinForm.name}</strong>. Tim Smart Grow Laboratory akan mereview data kamu dan menghubungi lewat email (<strong className="text-slate-900">{joinForm.email}</strong>). Keep growing!
                  </p>
                </div>
                <div className="pt-4 font-sans text-[10px] text-slate-400 uppercase font-bold">
                  Closing dialog in 2 seconds...
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
