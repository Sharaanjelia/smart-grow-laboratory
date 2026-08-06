import React, { useState, useEffect, Suspense } from 'react';
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
  initialSystemLogs,
  initialPendingRegistrations 
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
  PendingRegistration,
  SelectionStage,
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
const DirectorDashboard = React.lazy(() => import('./components/lms/DirectorDashboard'));
const AssistantDashboard = React.lazy(() => import('./components/lms/AssistantDashboard'));
const StudentDashboard = React.lazy(() => import('./components/lms/StudentDashboard'));
const AdminDashboard = React.lazy(() => import('./components/lms/AdminDashboard'));
import { FirebaseSeederModal } from './components/FirebaseSeederModal';
import { auth, db, uploadAttendancePhotoToStorage, backupPhotoToGoogleDrive } from './firebase';
import { onAuthStateChanged, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDoc, getDocs, query, where, limit, orderBy } from 'firebase/firestore';
import { Database } from 'lucide-react';
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
  MessageSquare,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const [projectCategory, setProjectCategory] = useState<string>('All');
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [isFirebaseSeederOpen, setIsFirebaseSeederOpen] = useState(false);

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
  const [pendingRegistrations, setPendingRegistrations] = useState<PendingRegistration[]>(initialPendingRegistrations);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>(initialSystemLogs);

  // CMS Content State
  const [newsList, setNewsList] = useState<NewsItem[]>(newsData);
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(projectsData);
  const [teamList, setTeamList] = useState<TeamMember[]>(teamData);

  // Sync newsList & teamList whenever newsData or teamData is updated
  useEffect(() => {
    setNewsList(newsData);
    setTeamList(teamData);
  }, []);

  // CMS Handlers
  const handleAddNews = async (newItem: Omit<NewsItem, 'id'>) => {
    const item: NewsItem = { ...newItem, id: `news_${Date.now()}` };
    setNewsList(prev => [item, ...prev]);
    try {
      await setDoc(doc(db, 'news', item.id), JSON.parse(JSON.stringify(item)));
    } catch (e: any) {
      console.warn('Firestore add news notice:', e?.message);
    }
  };

  const handleDeleteNews = async (id: string) => {
    setNewsList(prev => prev.filter(n => n.id !== id));
    try {
      await deleteDoc(doc(db, 'news', id));
    } catch (e: any) {
      console.warn('Firestore delete news notice:', e?.message);
    }
  };

  const handleAddProject = async (newProj: Omit<ProjectItem, 'id'>) => {
    const proj: ProjectItem = { ...newProj, id: `proj_${Date.now()}` };
    setProjectsList(prev => [proj, ...prev]);
    try {
      await setDoc(doc(db, 'projects', proj.id), JSON.parse(JSON.stringify(proj)));
    } catch (e: any) {
      console.warn('Firestore add project notice:', e?.message);
    }
  };

  const handleEditProject = async (updatedProj: ProjectItem) => {
    setProjectsList(prev => prev.map(p => p.id === updatedProj.id ? updatedProj : p));
    try {
      await setDoc(doc(db, 'projects', updatedProj.id), JSON.parse(JSON.stringify(updatedProj)));
    } catch (e: any) {
      console.warn('Firestore edit project notice:', e?.message);
    }
  };

  const handleDeleteProject = async (id: string) => {
    setProjectsList(prev => prev.filter(p => p.id !== id));
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (e: any) {
      console.warn('Firestore delete project notice:', e?.message);
    }
  };

  const handleAddTeamMember = (member: Omit<TeamMember, 'id'>) => {
    const m: TeamMember = { ...member, id: `member_${Date.now()}` };
    setTeamList(prev => [...prev, m]);
  };

  const handleDeleteTeamMember = (id: string) => {
    setTeamList(prev => prev.filter(m => m.id !== id));
  };

  // Auto restore session & listen to Firebase Authentication state changes
  // Helper function to strictly enforce Director role only for official director email
  const isDirectorEmail = (emailStr?: string): boolean => {
    const clean = (emailStr || '').trim().toLowerCase();
    return clean === 'indrarini@telkomuniversity.ac.id' || clean === 'director@smartgrowlab.com';
  };

  const enforceStrictUserRole = (user: User): User => {
    const cleanEmail = (user.email || '').trim().toLowerCase();
    if (user.role === 'director' && !isDirectorEmail(cleanEmail)) {
      return {
        ...user,
        role: 'student',
        title: user.title === 'Kepala & Direktur Utama Smart Grow Laboratory' ? 'Mahasiswa Magang Riset' : (user.title || 'Mahasiswa Magang Riset')
      };
    }
    return user;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        let matchedUser: User | null = null;
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            matchedUser = userDoc.data() as User;
          }
        } catch (err) {
          console.warn('Error fetching Firestore user profile:', err);
        }

        if (!matchedUser && firebaseUser.email) {
          const cleanEmail = firebaseUser.email.toLowerCase();
          matchedUser = users.find(u => u.email.toLowerCase() === cleanEmail) ||
            initialUsers.find(u => u.email.toLowerCase() === cleanEmail) || null;
        }

        if (!matchedUser && firebaseUser.email) {
          const cleanEmail = firebaseUser.email.toLowerCase();
          const rawName = cleanEmail.split('@')[0];
          const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
          matchedUser = {
            id: firebaseUser.uid,
            name: displayName,
            email: cleanEmail,
            role: 'student',
            title: 'Mahasiswa Magang Riset',
            studentId: `130${Math.floor(1000000 + Math.random() * 9000000)}`,
            institution: 'Telkom University',
            major: 'Informatika',
            specialty: 'IoT Sensors',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
            joinedDate: new Date().toISOString().split('T')[0],
            status: 'active'
          };
        }

        if (matchedUser) {
          // Strictly enforce that non-director emails cannot be director
          matchedUser = enforceStrictUserRole(matchedUser);

          // If email is verified, ensure status is marked as active in Firestore
          try {
            await setDoc(doc(db, 'users', firebaseUser.uid), { role: matchedUser.role, status: 'active' }, { merge: true });
          } catch (e: any) {
            console.warn('Sync active status on auth change notice:', e?.message);
          }
          
          setCurrentUser(matchedUser);
          if (currentPage === 'login') {
            setCurrentPage('dashboard');
          }
        }
      } else {
        setCurrentUser(null);
        if (currentPage === 'dashboard') {
          setCurrentPage('login');
        }
      }
    });

    return () => unsubscribe();
  }, [currentPage, users]);

  // LMS Handlers
  const handleLogin = (user: User) => {
    const sanitizedUser = enforceStrictUserRole(user);
    setCurrentUser(sanitizedUser);
    try {
      localStorage.setItem('smartgrow_session_user', JSON.stringify(sanitizedUser));
    } catch (err) {
      console.error('Error saving session:', err);
    }
    setCurrentPage('dashboard');
    setLmsActiveTab('overview');
  };

  const handleSwitchUser = (newUser: User) => {
    const sanitizedUser = enforceStrictUserRole(newUser);
    setCurrentUser(sanitizedUser);
    try {
      localStorage.setItem('smartgrow_session_user', JSON.stringify(sanitizedUser));
    } catch (err) {
      console.error('Error saving switched session:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Error during signOut:', err);
    }
    setCurrentUser(null);
    try {
      localStorage.removeItem('smartgrow_session_user');
    } catch (err) {
      console.error('Error clearing session:', err);
    }
    setCurrentPage('home');
  };

  // Helper functions for Firestore persistence
  const saveToFirestore = async (collectionName: string, id: string, data: any) => {
    try {
      await setDoc(doc(db, collectionName, id), JSON.parse(JSON.stringify(data)), { merge: true });
    } catch (e: any) {
      console.warn(`Firestore save notice for ${collectionName}/${id}:`, e?.message);
    }
  };

  const deleteFromFirestore = async (collectionName: string, id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (e: any) {
      console.warn(`Firestore delete notice for ${collectionName}/${id}:`, e?.message);
    }
  };

  const handleCreateTask = async (newTask: Omit<Task, 'id' | 'status' | 'createdAt'>) => {
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
    saveToFirestore('tasks', taskObj.id, taskObj);

    // Add log
    const logObj: SystemLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      user: currentUser?.name || 'System',
      action: 'MEMBUAT_TUGAS',
      details: `Membuat tugas "${newTask.title}" (${taskObj.taskNumber}) untuk ${newTask.assignedStudentName}`
    };
    setSystemLogs(prev => [logObj, ...prev]);
    saveToFirestore('system_logs', logObj.id, logObj);
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    saveToFirestore('tasks', updatedTask.id, updatedTask);
  };

  const handleDeleteTask = async (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    deleteFromFirestore('tasks', taskId);
  };

  const handleRequestRevision = async (taskId: string, revisionNote: string, assistantNotes: string) => {
    let updatedTaskObj: Task | null = null;
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
        updatedTaskObj = {
          ...t,
          status: 'revision' as const,
          feedback: assistantNotes,
          revisions: [newRev, ...(t.revisions || [])]
        };
        return updatedTaskObj;
      }
      return t;
    }));
    if (updatedTaskObj) {
      saveToFirestore('tasks', taskId, updatedTaskObj);
    }
  };

  // Project CRUD Handlers
  const handleCreateLmsProject = async (newProject: Omit<LmsProject, 'id'>) => {
    const projObj: LmsProject = {
      ...newProject,
      id: `proj_${Date.now()}`
    };
    setLmsProjects(prev => [projObj, ...prev]);
    saveToFirestore('lms_projects', projObj.id, projObj);

    // Log
    const logObj: SystemLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      user: currentUser?.name || 'System',
      action: 'TAMBAH_PROYEK_RISSET',
      details: `Menambahkan proyek riset baru "${newProject.title}" (${newProject.projectNumber})`
    };
    setSystemLogs(prev => [logObj, ...prev]);
    saveToFirestore('system_logs', logObj.id, logObj);
  };

  const handleUpdateLmsProject = async (updatedProject: LmsProject) => {
    setLmsProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    saveToFirestore('lms_projects', updatedProject.id, updatedProject);
  };

  const handleDeleteLmsProject = async (projectId: string) => {
    setLmsProjects(prev => prev.filter(p => p.id !== projectId));
    deleteFromFirestore('lms_projects', projectId);
  };

  const handleArchiveLmsProject = async (projectId: string) => {
    setLmsProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const updated = { ...p, status: 'archived' as const };
        saveToFirestore('lms_projects', projectId, updated);
        return updated;
      }
      return p;
    }));
  };

  const handleApproveTask = async (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const updated = { ...t, status: 'completed' as const };
        saveToFirestore('tasks', taskId, updated);
        return updated;
      }
      return t;
    }));
  };

  const handleRejectTask = async (taskId: string, feedback: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const updated = { ...t, status: 'revision' as const, feedback };
        saveToFirestore('tasks', taskId, updated);
        return updated;
      }
      return t;
    }));
  };

  const handleCreateAnnouncement = async (ann: Omit<Announcement, 'id' | 'date'>) => {
    const annObj: Announcement = {
      ...ann,
      id: `ann_${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [annObj, ...prev]);
    saveToFirestore('announcements', annObj.id, annObj);
  };

  // NOTE: One-time getDocs fetch removed — realtime onSnapshot listeners below provide
  // initial data load AND continuous updates, eliminating duplicate fetching.
  // Public data (news, projects) loaded via public listener (always active).
  // Private data loaded via authenticated listener (active only when logged in).

  const handleCheckIn = async (studentId: string, studentName: string, rawPhotoUrl?: string, locationAddress?: string) => {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Determine status (if after 08:30 AM = late)
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const isLate = hour > 8 || (hour === 8 && minute > 30);

    // 1. Upload selfie photo to Firebase Storage `attendance/` folder
    let publicPhotoUrl = rawPhotoUrl || '';
    if (rawPhotoUrl && rawPhotoUrl.startsWith('data:image')) {
      publicPhotoUrl = await uploadAttendancePhotoToStorage(rawPhotoUrl, studentId);
    }

    // 2. Trigger async background GDrive backup
    const gdriveStatus = await backupPhotoToGoogleDrive(publicPhotoUrl, studentName, today);

    // Get current user details for division & mentor
    const currentStudentObj = users.find(u => u.id === studentId || u.name === studentName);

    const record: AttendanceRecord = {
      id: `att_${Date.now()}`,
      studentId,
      internshipId: currentStudentObj?.studentId || `13012100${Math.floor(10 + Math.random() * 89)}`,
      studentName,
      division: currentStudentObj?.specialty || currentStudentObj?.title || 'IoT & Hardware Engineering',
      mentor: currentStudentObj?.advisor || 'Prof. Dr. Indrarini Dyah Irawati',
      date: today,
      checkInTime: now,
      status: isLate ? 'late' : 'present',
      location: locationAddress || 'Smart Grow Laboratory • Area Bandung Techno Park (BTP) Telkom University',
      address: 'Jl. Telekomunikasi No.1, Sukapura, Dayeuhkolot, Bandung, Jawa Barat 40257',
      latitude: -6.9706,
      longitude: 107.6297,
      gpsAccuracy: 8,
      locationRadius: 100,
      deviceName: navigator.userAgent.includes('Windows') ? 'Windows PC' : navigator.userAgent.includes('Mac') ? 'MacBook Pro' : 'Mobile Device',
      browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Browser Web',
      operatingSystem: navigator.platform || 'Desktop',
      checkInPhoto: publicPhotoUrl,
      photoUrl: publicPhotoUrl,
      firebaseStorageUrl: publicPhotoUrl,
      photoFileName: `selfie_${studentId}_${today}.jpg`,
      photoSize: '245 KB',
      photoResolution: '640x480',
      gdriveBackupStatus: gdriveStatus,
      dailyNotes: 'Monitoring Smart Farming & Kalibrasi Sensor pH/EC',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setAttendance(prev => [record, ...prev]);
    saveToFirestore('attendance', record.id, record);

    // Save System Log
    const logObj: SystemLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      user: studentName,
      action: 'PRESENSI_CHECKIN',
      details: `Presensi check-in selfie terverifikasi BTP Telkom University (Jam ${now} WIB)`
    };
    setSystemLogs(prev => [logObj, ...prev]);
    saveToFirestore('system_logs', logObj.id, logObj);
  };

  const handleCheckOut = async (studentId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setAttendance(prev => prev.map(a => {
      if (a.studentId === studentId && (a.date === today || a.date === '2026-07-22')) {
        const updated: AttendanceRecord = { 
          ...a, 
          checkOutTime: now,
          workDuration: '7 Jam 45 Menit',
          duration: '7 Jam 45 Menit',
          status: (a.status === 'late' ? 'late' : 'checked_out') as any,
          updatedAt: new Date().toISOString()
        };
        saveToFirestore('attendance', a.id, updated);
        return updated;
      }
      return a;
    }));
  };

  const handleSubmitTaskProgress = async (taskId: string, notes: string, links: { github?: string; docs?: string }) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const updated = { ...t, status: 'review' as const, submissionNotes: notes, submissionLinks: links };
        saveToFirestore('tasks', taskId, updated);
        return updated;
      }
      return t;
    }));
  };

  const handleApproveRequest = async (requestId: string) => {
    setApprovalRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        const updated = { ...r, status: 'approved' as const };
        saveToFirestore('approval_requests', requestId, updated);
        return updated;
      }
      return r;
    }));
  };

  const handleRejectRequest = async (requestId: string) => {
    setApprovalRequests(prev => prev.map(r => {
      if (r.id === requestId) {
        const updated = { ...r, status: 'rejected' as const };
        saveToFirestore('approval_requests', requestId, updated);
        return updated;
      }
      return r;
    }));
  };

  const handleCreateUser = async (newUser: Omit<User, 'id' | 'joinedDate'>) => {
    const userObj: User = {
      ...newUser,
      id: `user_${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300`
    };
    setUsers(prev => [...prev, userObj]);
    saveToFirestore('users', userObj.id, userObj);
  };

  const handleDeleteUser = async (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    deleteFromFirestore('users', userId);
  };

  const handleAdvanceApplicantStage = async (applicantId: string, nextStage: SelectionStage, notes?: string) => {
    const applicant = applicants.find(a => a.id === applicantId);
    if (!applicant) return;

    if (nextStage === 5) {
      const approvedCount = applicants.filter(a => a.status === 'approved' || a.stage === 5).length;
      const generatedInternId = `SGL-INT-2026-00${approvedCount + 8}`;

      const updatedApplicant: ApplicantRecord = { 
        ...applicant, 
        status: 'approved', 
        stage: 5,
        internId: generatedInternId,
        stageNotes: notes || 'Diterima Magang Resmi & Terbit ID Magang.' 
      };

      setApplicants(prev => prev.map(a => a.id === applicantId ? updatedApplicant : a));

      const newStudent: User = {
        id: `user_${Date.now()}`,
        name: applicant.fullName,
        email: applicant.email,
        role: 'student',
        studentId: `130122${Math.floor(1000 + Math.random() * 9000)}`,
        internId: generatedInternId,
        institution: applicant.university || 'Telkom University',
        major: applicant.major || 'Informatika',
        specialty: applicant.roleInterest,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
        joinedDate: new Date().toISOString().split('T')[0],
        status: 'active'
      };

      setUsers(prev => [...prev, newStudent]);

      try {
        await setDoc(doc(db, 'applicants', applicantId), JSON.parse(JSON.stringify(updatedApplicant)));
        await setDoc(doc(db, 'users', newStudent.id), JSON.parse(JSON.stringify(newStudent)));
      } catch (e: any) {
        console.warn('Advance applicant stage 5 sync warning:', e?.message);
      }
    } else {
      const updatedApplicant: ApplicantRecord = { 
        ...applicant, 
        status: 'in_selection', 
        stage: nextStage,
        stageNotes: notes || `Lanjut ke Tahap ${nextStage}.` 
      };

      setApplicants(prev => prev.map(a => a.id === applicantId ? updatedApplicant : a));

      try {
        await setDoc(doc(db, 'applicants', applicantId), JSON.parse(JSON.stringify(updatedApplicant)));
      } catch (e: any) {
        console.warn('Advance applicant stage sync warning:', e?.message);
      }
    }
  };

  const handleApproveApplicant = async (applicantId: string) => {
    await handleAdvanceApplicantStage(applicantId, 5, 'Diterima Magang Resmi & Terbit ID Magang.');
  };

  const handleRejectApplicant = async (applicantId: string) => {
    const applicant = applicants.find(a => a.id === applicantId);
    if (!applicant) return;

    const updatedApplicant: ApplicantRecord = { ...applicant, status: 'rejected' };
    setApplicants(prev => prev.map(a => a.id === applicantId ? updatedApplicant : a));

    try {
      await setDoc(doc(db, 'applicants', applicantId), JSON.parse(JSON.stringify(updatedApplicant)));
    } catch (e: any) {
      console.warn('Reject applicant sync warning:', e?.message);
    }
  };

  const handleAddApplicantFromPublic = async (app: { fullName: string; email: string; roleInterest: string; motivation: string; github?: string; instagram?: string; phone?: string; university?: string; major?: string }) => {
    const newApplicant: ApplicantRecord = {
      id: `app_${Date.now()}`,
      fullName: app.fullName,
      email: app.email,
      phone: app.phone,
      university: app.university,
      major: app.major,
      roleInterest: app.roleInterest,
      motivation: app.motivation,
      github: app.github,
      instagram: app.instagram,
      submittedAt: new Date().toISOString().split('T')[0],
      stage: 1,
      status: 'pending',
      stageNotes: 'Berkas Pendaftaran Baru Masuk dari Portal Publik.'
    };

    setApplicants(prev => [newApplicant, ...prev]);

    try {
      const ref = doc(db, 'applicants', newApplicant.id);
      await setDoc(ref, JSON.parse(JSON.stringify(newApplicant)));
      console.log('Applicant saved to Firebase Firestore:', newApplicant);
    } catch (err: any) {
      console.warn('Firestore applicant save note:', err?.message);
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    if (currentUser?.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
    try {
      await setDoc(doc(db, 'users', updatedUser.id), JSON.parse(JSON.stringify(updatedUser)), { merge: true });
    } catch (e: any) {
      console.warn('Firestore update user notice:', e?.message);
    }
  };

  const handleApproveRegistration = async (pendingReg: PendingRegistration) => {
    const approvedCount = pendingRegistrations.filter(r => r.status === 'Approved').length + 1;
    const generatedInternId = pendingReg.internId || `SGL-INT-2026-${String(approvedCount).padStart(3, '0')}`;
    const token = `act_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const updated: PendingRegistration = {
      ...pendingReg,
      status: 'Approved',
      internId: generatedInternId,
      activationToken: token
    };

    setPendingRegistrations(prev => prev.map(p => p.id === pendingReg.id ? updated : p));

    // Construct active user record for student with NO DUMMY FIELDS (Requirement #6 & #9)
    const newStudentUser: User = {
      id: pendingReg.id || `user_act_${Date.now()}`,
      name: pendingReg.fullName,
      email: pendingReg.email,
      role: 'student',
      title: 'Mahasiswa Magang Riset',
      studentId: '', // NIM empty per Req #6 & #9
      internId: generatedInternId,
      institution: pendingReg.university || '',
      major: pendingReg.studyProgram || '',
      specialty: pendingReg.division || '',
      phone: '',
      address: '',
      avatar: '',
      bio: '',
      github: '',
      linkedin: '',
      portfolio: '',
      skillsList: [],
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      isNewStudent: true
    };

    setUsers(prev => {
      if (prev.some(u => u.email.toLowerCase() === pendingReg.email.toLowerCase())) {
        return prev.map(u => u.email.toLowerCase() === pendingReg.email.toLowerCase() ? { ...u, ...newStudentUser, status: 'active' } : u);
      }
      return [newStudentUser, ...prev];
    });

    try {
      await setDoc(doc(db, 'pending_registrations', pendingReg.id), JSON.parse(JSON.stringify(updated)));
      await setDoc(doc(db, 'users', newStudentUser.id), JSON.parse(JSON.stringify(newStudentUser)), { merge: true });

      // Trigger Firebase Auth password reset email for account activation / login notification (Requirement #3)
      try {
        await sendPasswordResetEmail(auth, pendingReg.email);
      } catch (authEmailErr: any) {
        console.warn('Firebase Auth send password reset email notice:', authEmailErr?.message);
      }

      const notifId = `notif_act_${Date.now()}`;
      await setDoc(doc(db, 'notifications', notifId), {
        id: notifId,
        title: 'Akun Magang Berhasil Diaktifkan! 🎉',
        message: `Selamat! Pendaftaran magang Anda (${generatedInternId}) telah disetujui. Silakan login ke Portal LMS.`,
        date: new Date().toISOString(),
        read: false,
        type: 'approval',
        targetEmail: pendingReg.email
      });
    } catch (e: any) {
      console.warn('Firestore approve pending registration notice:', e?.message);
    }
  };

  const handleRejectRegistration = async (id: string) => {
    setPendingRegistrations(prev => prev.map(p => p.id === id ? { ...p, status: 'Rejected' } : p));
    try {
      await setDoc(doc(db, 'pending_registrations', id), { status: 'Rejected' }, { merge: true });
    } catch (e: any) {
      console.warn('Firestore reject pending registration notice:', e?.message);
    }
  };

  // =========================================================================
  // PUBLIC REALTIME LISTENERS — Active on all pages (news & showcase projects)
  // =========================================================================
  useEffect(() => {
    const unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
      if (!snapshot.empty) {
        const list: ProjectItem[] = [];
        snapshot.forEach(docSnap => list.push(docSnap.data() as ProjectItem));
        setProjectsList(list);
      }
    }, (err) => console.warn('Projects listener notice:', err));

    const unsubNews = onSnapshot(collection(db, 'news'), (snapshot) => {
      if (!snapshot.empty) {
        const oldDocIds = new Set(['hycosmarts-container', 'simona-aquaponics', 'luminet-smart-lighting', 'flocify-biofloc-ai']);
        const list: NewsItem[] = [];
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as NewsItem;
          if (!oldDocIds.has(data.id)) {
            list.push(data);
          }
        });
        if (list.length > 0) {
          setNewsList(list);
        } else {
          setNewsList(newsData);
        }
      }
    }, (err) => console.warn('News listener notice:', err));

    return () => {
      unsubProjects();
      unsubNews();
    };
  }, []);

  // =========================================================================
  // PRIVATE REALTIME LISTENERS — Only active when user is authenticated
  // Optimized: listeners subscribe on login, unsubscribe on logout
  // =========================================================================
  useEffect(() => {
    if (!currentUser) return;

    try {
      const unsubPendingRegs = onSnapshot(collection(db, 'pending_registrations'), (snapshot) => {
        if (!snapshot.empty) {
          const list: PendingRegistration[] = [];
          snapshot.forEach(docSnap => list.push(docSnap.data() as PendingRegistration));
          setPendingRegistrations(list);
        }
      }, (err) => console.warn('Pending registrations listener notice:', err));

      const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
        if (!snapshot.empty) {
          const list: User[] = [];
          snapshot.forEach(docSnap => {
            const raw = docSnap.data() as User;
            list.push(enforceStrictUserRole(raw));
          });
          setUsers(list);
          setCurrentUser(prev => prev ? enforceStrictUserRole(prev) : null);
        }
      }, (err) => console.warn('Users listener notice:', err));

      const unsubApplicants = onSnapshot(collection(db, 'applicants'), (snapshot) => {
        if (!snapshot.empty) {
          const list: ApplicantRecord[] = [];
          snapshot.forEach(docSnap => list.push(docSnap.data() as ApplicantRecord));
          setApplicants(list);
        }
      }, (err) => console.warn('Applicants listener notice:', err));



      const unsubTasks = onSnapshot(collection(db, 'tasks'), (snapshot) => {
        if (!snapshot.empty) {
          const list: Task[] = [];
          snapshot.forEach(docSnap => list.push(docSnap.data() as Task));
          setTasks(list);
        }
      }, (err) => console.warn('Tasks listener notice:', err));

      const unsubAttendance = onSnapshot(collection(db, 'attendance'), (snapshot) => {
        if (!snapshot.empty) {
          const list: AttendanceRecord[] = [];
          snapshot.forEach(docSnap => list.push(docSnap.data() as AttendanceRecord));
          setAttendance(list);
        }
      }, (err) => console.warn('Attendance listener notice:', err));

      const unsubLmsProjects = onSnapshot(collection(db, 'lms_projects'), (snapshot) => {
        if (!snapshot.empty) {
          const list: LmsProject[] = [];
          snapshot.forEach(docSnap => list.push(docSnap.data() as LmsProject));
          setLmsProjects(list);
        }
      }, (err) => console.warn('LMS Projects listener notice:', err));

      const unsubAnnouncements = onSnapshot(collection(db, 'announcements'), (snapshot) => {
        if (!snapshot.empty) {
          const list: Announcement[] = [];
          snapshot.forEach(docSnap => list.push(docSnap.data() as Announcement));
          setAnnouncements(list);
        }
      }, (err) => console.warn('Announcements listener notice:', err));

      const unsubApprovalRequests = onSnapshot(collection(db, 'approval_requests'), (snapshot) => {
        if (!snapshot.empty) {
          const list: ApprovalRequest[] = [];
          snapshot.forEach(docSnap => list.push(docSnap.data() as ApprovalRequest));
          setApprovalRequests(list);
        }
      }, (err) => console.warn('Approval Requests listener notice:', err));

      const unsubNotifications = onSnapshot(collection(db, 'notifications'), (snapshot) => {
        if (!snapshot.empty) {
          const list: LmsNotification[] = [];
          snapshot.forEach(docSnap => list.push(docSnap.data() as LmsNotification));
          setNotifications(list);
        }
      }, (err) => console.warn('Notifications listener notice:', err));

      const unsubSystemLogs = onSnapshot(collection(db, 'system_logs'), (snapshot) => {
        if (!snapshot.empty) {
          const list: SystemLog[] = [];
          snapshot.forEach(docSnap => list.push(docSnap.data() as SystemLog));
          setSystemLogs(list);
        }
      }, (err) => console.warn('System logs listener notice:', err));

      return () => {
        unsubPendingRegs();
        unsubUsers();
        unsubApplicants();
        unsubTasks();
        unsubAttendance();
        unsubLmsProjects();
        unsubAnnouncements();
        unsubApprovalRequests();
        unsubNotifications();
        unsubSystemLogs();
      };
    } catch (e) {
      console.warn('Firestore listener setup warning:', e);
    }
  }, [currentUser?.id]);

  // Auto-sync new newsData to Firestore & clean up old project-news docs
  useEffect(() => {
    const syncNewsData = async () => {
      const oldDocIds = ['hycosmarts-container', 'simona-aquaponics', 'luminet-smart-lighting', 'flocify-biofloc-ai'];
      for (const oldId of oldDocIds) {
        try {
          await deleteDoc(doc(db, 'news', oldId));
        } catch (e) {
          // ignore
        }
      }
      for (const item of newsData) {
        try {
          await setDoc(doc(db, 'news', item.id), JSON.parse(JSON.stringify(item)));
        } catch (e) {
          // ignore
        }
      }
    };
    syncNewsData();
  }, []);

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
  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinForm.name.trim() || !joinForm.email.trim()) return;

    await handleAddApplicantFromPublic({
      fullName: joinForm.name,
      email: joinForm.email,
      roleInterest: joinForm.role,
      motivation: joinForm.reason || 'Ingin bergabung dan berkontribusi di riset Smart Grow Laboratory.',
      github: joinForm.github,
      instagram: joinForm.instagram
    });

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
          onRegister={(newUser) => setUsers(prev => [newUser, ...prev])}
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
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm font-semibold text-slate-500">Memuat Dashboard...</p>
              </div>
            </div>
          }>
          {currentUser.role === 'director' && (
            <DirectorDashboard
              currentUser={currentUser}
              activeTab={lmsActiveTab}
              tasks={tasks}
              attendance={attendance}
              projects={lmsProjects}
              publicProjects={projectsList}
              announcements={announcements}
              approvalRequests={approvalRequests}
              logs={systemLogs}
              users={users}
              students={users.filter(u => u.role === 'student')}
              applicants={applicants}
              pendingRegistrations={pendingRegistrations}
              onApproveRegistration={handleApproveRegistration}
              onRejectRegistration={handleRejectRegistration}
              onApproveRequest={handleApproveRequest}
              onRejectRequest={handleRejectRequest}
              onAdvanceApplicantStage={handleAdvanceApplicantStage}
              onApproveApplicant={handleApproveApplicant}
              onRejectApplicant={handleRejectApplicant}
              onCreateAnnouncement={handleCreateAnnouncement}
              onCreateProject={handleCreateLmsProject}
              onUpdateProject={handleUpdateLmsProject}
              onDeleteProject={handleDeleteLmsProject}
              onArchiveProject={handleArchiveLmsProject}
              onAddPublicProject={handleAddProject}
              onEditPublicProject={handleEditProject}
              onDeletePublicProject={handleDeleteProject}
              onNavigateToShowcase={(projId) => handleNavigate(projId as PageId)}
              onUpdateProfile={handleUpdateUser}
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
              publicProjects={projectsList}
              announcements={announcements}
              applicants={applicants}
              pendingRegistrations={pendingRegistrations}
              onApproveRegistration={handleApproveRegistration}
              onRejectRegistration={handleRejectRegistration}
              students={users.filter(u => u.role === 'student' && u.status === 'active')}
              onCreateTask={handleCreateTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onApproveTask={handleApproveTask}
              onRejectTask={handleRejectTask}
              onRequestRevision={handleRequestRevision}
              onAdvanceApplicantStage={handleAdvanceApplicantStage}
              onApproveApplicant={handleApproveApplicant}
              onRejectApplicant={handleRejectApplicant}
              onCreateAnnouncement={handleCreateAnnouncement}
              onCreateProject={handleCreateLmsProject}
              onUpdateProject={handleUpdateLmsProject}
              onDeleteProject={handleDeleteLmsProject}
              onArchiveProject={handleArchiveLmsProject}
              onAddPublicProject={handleAddProject}
              onEditPublicProject={handleEditProject}
              onDeletePublicProject={handleDeleteProject}
              onNavigateToShowcase={(projId) => handleNavigate(projId as PageId)}
              onUpdateProfile={handleUpdateUser}
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
              onUpdateUser={handleUpdateUser}
              darkMode={darkMode}
              language={language}
            />
          )}

          {currentUser.role === 'admin' && (
            <AdminDashboard
              activeTab={lmsActiveTab}
              currentUser={currentUser}
              users={users}
              applicants={applicants}
              pendingRegistrations={pendingRegistrations}
              onApproveRegistration={handleApproveRegistration}
              onRejectRegistration={handleRejectRegistration}
              news={newsList}
              projects={projectsList}
              team={teamList}
              logs={systemLogs}
              attendance={attendance}
              onCreateUser={handleCreateUser}
              onDeleteUser={handleDeleteUser}
              onAdvanceApplicantStage={handleAdvanceApplicantStage}
              onApproveApplicant={handleApproveApplicant}
              onRejectApplicant={handleRejectApplicant}
              onAddNews={handleAddNews}
              onDeleteNews={handleDeleteNews}
              onAddProject={handleAddProject}
              onEditProject={handleEditProject}
              onDeleteProject={handleDeleteProject}
              onAddTeamMember={handleAddTeamMember}
              onDeleteTeamMember={handleDeleteTeamMember}
              onCheckInStudent={handleCheckIn}
              onCheckOutStudent={handleCheckOut}
              onUpdateProfile={handleUpdateUser}
              darkMode={darkMode}
              language={language}
            />
          )}
          </Suspense>
        </LmsLayout>
      )}

      {/* Main Content Area for Public Pages */}
      {currentPage !== 'login' && currentPage !== 'dashboard' && (
      <main className="pb-24">
        
        {/* --- PAGE: HOME --- */}
        {currentPage === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Section — Next-Gen Cyber-Agriculture Glassmorphic Hub */}
            <section className="relative px-4 pt-4 pb-12 sm:pt-6 sm:pb-16 sm:px-6 lg:px-8 text-left overflow-hidden bg-slate-900 z-10" id="home-hero">
              {/* Immersive Background Layer - 100% Crystal Clear Photo */}
              <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
                {/* 1. Background Photo: Harvest Team Background - 100% Sharp & Vivid */}
                <img 
                  src="/images/harvest-team-bg.jpg" 
                  className="absolute inset-0 w-full h-full object-cover opacity-100 filter brightness-100 contrast-100"
                  alt="Telkom University Smart Grow Laboratory Harvest Team"
                />

                {/* 2. Soft Bottom Fade to White for Section Transition */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white via-white/40 to-transparent" />
              </div>

              {/* Main Content Grid — Right Side Text Panel with Deep Frosted Glass Protection */}
              <div className="mx-auto max-w-7xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Right Side (7 Cols): Headline, Subtext, CTAs & Metrics */}
                <div className="lg:col-span-7 lg:col-start-6 flex flex-col items-start text-left space-y-5 bg-white/45 backdrop-blur-2xl backdrop-saturate-150 p-6 sm:p-8 rounded-3xl border border-white/60 shadow-2xl">
                  
                  {/* Glassmorphic Pill Tag */}
                  <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-800/40 bg-white/70 backdrop-blur-xl px-4 py-1.5 text-xs font-sans font-extrabold tracking-widest text-[#0A5247] uppercase shadow-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#058257] animate-pulse shadow-[0_0_12px_#058257]"></span>
                    <span>SMART GROW LABORATORY • TELKOM UNIVERSITY</span>
                  </div>

                  {/* Headline */}
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0A5247] leading-[1.15] drop-shadow-xs">
                    Driving Agricultural Progress <br className="hidden sm:inline" />
                    Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#058257] via-teal-700 to-emerald-700">Technological Innovation</span>
                  </h1>

                  {/* Description */}
                  <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-900 font-sans font-bold">
                    Integrated research and innovation hub focused on developing intelligent agricultural systems, bridging electrical automation with organic plant physiology.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <button
                      onClick={() => handleNavigate('project')}
                      id="btn-see-more-home"
                      className="group relative inline-flex items-center gap-2.5 rounded-full bg-[#0A5247] hover:bg-[#073D35] px-7 py-3 text-xs font-extrabold tracking-wider uppercase text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-emerald-950/20 cursor-pointer border border-emerald-700/30 overflow-hidden"
                    >
                      <span className="relative z-10">See More</span>
                      <ArrowUpRight className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <button
                      onClick={() => handleNavigate('news')}
                      className="inline-flex items-center gap-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-xl border border-emerald-400 px-6 py-3 text-xs font-extrabold tracking-wider uppercase text-[#0A5247] hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm cursor-pointer"
                    >
                      <span>Explore Lab News</span>
                      <Sparkles className="h-3.5 w-3.5 text-[#058257]" />
                    </button>
                  </div>

                  {/* Live Research Metrics Bar */}
                  <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full border-t border-emerald-900/20 mt-3">
                    <div className="p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 shadow-xs">
                      <div className="text-lg sm:text-xl font-black text-[#0A5247] font-display">99.8%</div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-800 font-black mt-0.5">Telemetry Uptime</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 shadow-xs">
                      <div className="text-lg sm:text-xl font-black text-[#058257] font-display">1,200+</div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-800 font-black mt-0.5">Plants Monitored</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 shadow-xs">
                      <div className="text-lg sm:text-xl font-black text-teal-800 font-display">Scopus Q1</div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-800 font-black mt-0.5">Publication Hub</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 shadow-xs">
                      <div className="text-lg sm:text-xl font-black text-emerald-900 font-display">Kedaireka</div>
                      <div className="text-[9px] uppercase tracking-wider text-slate-800 font-black mt-0.5">Industry Grant</div>
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
                      src="/images/harvest-team-bg.jpg" 
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
                        src="/images/harvest-team-bg.jpg" 
                        alt="Hydroponic Optimization"
                        className="h-full w-full object-cover object-center"
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

            {/* RESEARCH INTEREST SECTION (High-end dynamic glassmorphic design) */}
            <section className="w-full bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 my-12 relative overflow-hidden" id="research-interests">
              {/* Soft ambient background lights */}
              <div className="absolute top-0 right-0 h-96 w-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>
              <div className="absolute -bottom-20 -left-20 h-[500px] w-[500px] bg-teal-600/10 rounded-full blur-[140px] pointer-events-none"></div>
              
              <div className="mx-auto max-w-7xl relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                    <span>SMART GROW RESEARCH DOMAINS</span>
                  </div>
                  <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                    Research Interest
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                    Fokus kepakaran dan kelompok laboratorium riset terpadu dalam memajukan teknologi pertanian cerdas dan sistem siber.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e635f] via-[#0c5a57] to-[#073d3b] p-7 flex flex-col justify-between min-h-[230px] border border-emerald-400/25 hover:border-emerald-300/80 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-400/30 text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-800/80 transition-all duration-300 shadow-inner">
                        <Sprout className="h-6 w-6" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <div className="space-y-2 mt-6">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-300/80 uppercase block">PRECISION FARMING</span>
                      <h3 className="font-display text-base sm:text-lg font-extrabold text-white leading-snug">
                        Smart Farming & Precision Agriculture
                      </h3>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e635f] via-[#0c5a57] to-[#073d3b] p-7 flex flex-col justify-between min-h-[230px] border border-emerald-400/25 hover:border-emerald-300/80 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-400/30 text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-800/80 transition-all duration-300 shadow-inner">
                        <Network className="h-6 w-6" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <div className="space-y-2 mt-6">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-300/80 uppercase block">IOT PROTOCOLS</span>
                      <h3 className="font-display text-base sm:text-lg font-extrabold text-white leading-snug">
                        Internet of Things (IoT) & Wireless Sensor Networks
                      </h3>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e635f] via-[#0c5a57] to-[#073d3b] p-7 flex flex-col justify-between min-h-[230px] border border-emerald-400/25 hover:border-emerald-300/80 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-400/30 text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-800/80 transition-all duration-300 shadow-inner">
                        <Brain className="h-6 w-6" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <div className="space-y-2 mt-6">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-300/80 uppercase block">DEEP LEARNING</span>
                      <h3 className="font-display text-base sm:text-lg font-extrabold text-white leading-snug">
                        Artificial Intelligence & Machine Learning Applications
                      </h3>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e635f] via-[#0c5a57] to-[#073d3b] p-7 flex flex-col justify-between min-h-[230px] border border-emerald-400/25 hover:border-emerald-300/80 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-400/30 text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-800/80 transition-all duration-300 shadow-inner">
                        <Shield className="h-6 w-6" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <div className="space-y-2 mt-6">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-300/80 uppercase block">CYBERSECURITY</span>
                      <h3 className="font-display text-base sm:text-lg font-extrabold text-white leading-snug">
                        Quantum & Information Security
                      </h3>
                    </div>
                  </div>

                  {/* Card 5 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e635f] via-[#0c5a57] to-[#073d3b] p-7 flex flex-col justify-between min-h-[230px] border border-emerald-400/25 hover:border-emerald-300/80 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-400/30 text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-800/80 transition-all duration-300 shadow-inner">
                        <Activity className="h-6 w-6" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <div className="space-y-2 mt-6">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-300/80 uppercase block">DSP TELEMETRY</span>
                      <h3 className="font-display text-base sm:text-lg font-extrabold text-white leading-snug">
                        Signal Processing & Compressive Sensing
                      </h3>
                    </div>
                  </div>

                  {/* Card 6 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e635f] via-[#0c5a57] to-[#073d3b] p-7 flex flex-col justify-between min-h-[230px] border border-emerald-400/25 hover:border-emerald-300/80 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-400/30 text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-800/80 transition-all duration-300 shadow-inner">
                        <Heart className="h-6 w-6" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <div className="space-y-2 mt-6">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-300/80 uppercase block">HEALTH TECH</span>
                      <h3 className="font-display text-base sm:text-lg font-extrabold text-white leading-snug">
                        Telemedicine & Health Technology
                      </h3>
                    </div>
                  </div>

                  {/* Card 7 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e635f] via-[#0c5a57] to-[#073d3b] p-7 flex flex-col justify-between min-h-[230px] border border-emerald-400/25 hover:border-emerald-300/80 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-400/30 text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-800/80 transition-all duration-300 shadow-inner">
                        <GitBranch className="h-6 w-6" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <div className="space-y-2 mt-6">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-300/80 uppercase block">SDN ARCHITECTURE</span>
                      <h3 className="font-display text-base sm:text-lg font-extrabold text-white leading-snug">
                        Networking & Software Defined Networks (SDN)
                      </h3>
                    </div>
                  </div>

                  {/* Card 8 */}
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0e635f] via-[#0c5a57] to-[#073d3b] p-7 flex flex-col justify-between min-h-[230px] border border-emerald-400/25 hover:border-emerald-300/80 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-400/30 text-emerald-300 group-hover:scale-110 group-hover:bg-emerald-800/80 transition-all duration-300 shadow-inner">
                        <Leaf className="h-6 w-6" />
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-emerald-400/60 group-hover:text-emerald-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <div className="space-y-2 mt-6">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-300/80 uppercase block">SUSTAINABLE TECH</span>
                      <h3 className="font-display text-base sm:text-lg font-extrabold text-white leading-snug">
                        Green Technology & Sustainable Systems
                      </h3>
                    </div>
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
                    onOpenJoinModal={() => setJoinModalOpen(true)}
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
                      return dateB - dateA;
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
              const pilrekUrl = mentor.profileUrl || 'https://pilrek.telkomuniversity.ac.id/indrarini-dyah-irawati/';
              return (
                <div className="mx-auto max-w-3xl bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl mb-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-sm group">
                  
                  {/* Mentor Graphic Avatar section matching real photo - Clickable Link */}
                  <a 
                    href={pilrekUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Buka Profil Resmi Prof. Dr. Indrarini Dyah Irawati (Pilrek Telkom University)"
                    className="relative w-44 h-52 shrink-0 rounded-2xl overflow-hidden shadow-md group/avatar cursor-pointer block border-2 border-transparent hover:border-pink-500 transition-all duration-300"
                  >
                    <TeamAvatar id={mentor.id} name={mentor.name} className="w-full h-full group-hover/avatar:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-pink-950/40 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                      <span className="bg-white/95 text-pink-700 text-[10px] font-extrabold px-3 py-1 rounded-full shadow-lg border border-pink-200 flex items-center gap-1 font-mono">
                        <span>Buka Profil Resmi</span>
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    </div>
                  </a>

                  <div className="flex-1 space-y-3 text-left">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="rounded bg-pink-50 border border-pink-200 px-2.5 py-0.5 font-sans text-[10px] font-bold text-pink-700 uppercase tracking-wider">
                          {mentor.role}
                        </span>
                        <span className="text-slate-400 font-sans text-[9px] font-bold">SMART GROW LAB MENTOR</span>
                      </div>
                      <a
                        href={pilrekUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block group/link"
                      >
                        <h2 className="font-display text-xl font-bold text-slate-900 group-hover/link:text-pink-600 transition-colors flex items-center gap-2">
                          <span>{mentor.name}</span>
                          <ExternalLink className="h-4 w-4 text-pink-500 opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
                        </h2>
                      </a>
                      <p className="font-sans text-xs font-bold text-teal-600 mt-1">{mentor.email}</p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-sans">
                      {mentor.bio}
                    </p>

                    <div className="pt-1">
                      <a
                        href={pilrekUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 font-sans font-bold text-xs transition-all shadow-2xs group/btn cursor-pointer"
                      >
                        <span>Lihat Profil Pilrek Telkom University</span>
                        <ExternalLink className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>

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
                      <div className="absolute top-2.5 left-2.5 z-10 max-w-[85%]">
                        <span className="inline-block rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/60 px-2.5 py-0.5 font-sans text-[9px] font-bold text-teal-300 uppercase tracking-wider shadow-md truncate">
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
                    <label className="text-[10px] font-sans font-bold text-slate-700 uppercase flex items-center justify-between">
                      <span>Nama Lengkap</span>
                      <span className="text-emerald-600 font-extrabold text-[9px] lowercase bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">*wajib</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Shara Anjelia"
                      value={joinForm.name}
                      onChange={(e) => setJoinForm({...joinForm, name: e.target.value})}
                      className="bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all rounded-xl px-4 py-2.5 text-xs font-medium"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-sans font-bold text-slate-700 uppercase flex items-center justify-between">
                      <span>Email Student / General</span>
                      <span className="text-emerald-600 font-extrabold text-[9px] lowercase bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">*wajib</span>
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. shara@student.telkomuniversity.ac.id"
                      value={joinForm.email}
                      onChange={(e) => setJoinForm({...joinForm, email: e.target.value})}
                      className="bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all rounded-xl px-4 py-2.5 text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold text-slate-700 uppercase flex items-center justify-between">
                    <span>Role Of Interest</span>
                    <span className="text-emerald-600 font-extrabold text-[9px] lowercase bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">*wajib</span>
                  </label>
                  <select 
                    value={joinForm.role}
                    onChange={(e) => setJoinForm({...joinForm, role: e.target.value})}
                    className="bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white transition-all rounded-xl px-4 py-2.5 text-xs cursor-pointer font-medium"
                  >
                    <option value="IoT Specialist">IoT Specialist / Hardware Engineer</option>
                    <option value="UI/UX Designer">UI/UX Designer</option>
                    <option value="Full-stack Developer">Full-stack Software Developer</option>
                    <option value="Agronomist">Agronomist / Plant Biologist</option>
                    <option value="Machine Learning Specialist">Machine Learning Specialist</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold text-slate-700 uppercase flex items-center justify-between">
                    <span>Why do you want to join Smart Grow Laboratory?</span>
                    <span className="text-slate-400 font-bold text-[9px] lowercase bg-slate-100 px-1.5 py-0.5 rounded">opsional</span>
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="Briefly describe your skillsets, motivation, and which project (HYCOSMARTS, Smart Hydroponics, etc.) inspires you."
                    value={joinForm.reason}
                    onChange={(e) => setJoinForm({...joinForm, reason: e.target.value})}
                    className="bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all rounded-xl p-4 text-xs resize-none font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-sans font-bold text-slate-700 uppercase flex items-center justify-between">
                      <span>GitHub Profile</span>
                      <span className="text-slate-400 font-bold text-[9px] lowercase bg-slate-100 px-1.5 py-0.5 rounded">opsional</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="https://github.com/yourusername"
                      value={joinForm.github}
                      onChange={(e) => setJoinForm({...joinForm, github: e.target.value})}
                      className="bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all rounded-xl px-4 py-2.5 text-xs font-medium"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-sans font-bold text-slate-700 uppercase flex items-center justify-between">
                      <span>Instagram Handles</span>
                      <span className="text-slate-400 font-bold text-[9px] lowercase bg-slate-100 px-1.5 py-0.5 rounded">opsional</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="@yourusername"
                      value={joinForm.instagram}
                      onChange={(e) => setJoinForm({...joinForm, instagram: e.target.value})}
                      className="bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:bg-white transition-all rounded-xl px-4 py-2.5 text-xs font-medium"
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
