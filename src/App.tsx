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
import SmartTbnShowcase from './components/SmartTbnShowcase';
import HtciShowcase from './components/HtciShowcase';
import SmartWaterShowcase from './components/SmartWaterShowcase';
import MopsShowcase from './components/MopsShowcase';
import SapaJamiyyahShowcase from './components/SapaJamiyyahShowcase';
import DasCikapundungShowcase from './components/DasCikapundungShowcase';
import SmartMinimarketShowcase from './components/SmartMinimarketShowcase';
import ClosedSmartHydroponicShowcase from './components/ClosedSmartHydroponicShowcase';
import ResearchInterestSlider from './components/ResearchInterestSlider';
import VisionMissionSection from './components/VisionMissionSection';

import LoginView from './components/lms/LoginView';
import LmsLayout from './components/lms/LmsLayout';
const DirectorDashboard = React.lazy(() => import('./components/lms/DirectorDashboard'));
const AssistantDashboard = React.lazy(() => import('./components/lms/AssistantDashboard'));
const StudentDashboard = React.lazy(() => import('./components/lms/StudentDashboard'));
const AdminDashboard = React.lazy(() => import('./components/lms/AdminDashboard'));
import { auth, db, uploadAttendancePhotoToStorage, backupPhotoToGoogleDrive } from './firebase';
import { resolveImageUrl } from './utils/imageUtils';
import { 
  getTodayDateJakarta, 
  getNowTimeJakarta, 
  determineAttendanceStatus, 
  calculateWorkDuration,
  calculateWorkDurationMinutes,
  calculateHaversineDistanceMeters,
  BTP_OFFICIAL_LAT,
  BTP_OFFICIAL_LNG,
  BTP_GEOFENCE_RADIUS_METERS
} from './utils/dateUtils';
import ToastContainer from './components/common/Toast';
import { onAuthStateChanged, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDoc, getDocs, query, where, limit, orderBy } from 'firebase/firestore';
import { 
  ChevronRight, 
  Send, 
  Users, 
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
  ExternalLink,
  Instagram,
  Maximize2
} from 'lucide-react';

const parseUrlNavigationState = () => {
  if (typeof window === 'undefined') {
    return { page: 'home' as PageId, newsId: null, projId: null, tab: 'overview' };
  }
  const raw = window.location.hash.replace(/^#\/?/, '');
  const [pathPart, queryPart] = raw.split('?');
  const validPages: PageId[] = ['home', 'news', 'project', 'about', 'join', 'login', 'dashboard'];
  const pageFromHash = validPages.includes(pathPart as PageId) ? (pathPart as PageId) : null;

  let newsId: string | null = null;
  let projId: string | null = null;
  let tab: string | null = null;

  if (queryPart) {
    const params = new URLSearchParams(queryPart);
    newsId = params.get('newsId') || params.get('id');
    projId = params.get('projectId') || params.get('projId');
    tab = params.get('tab');
  }

  const savedPage = localStorage.getItem('smartgrow_current_page') as PageId;
  const page = pageFromHash || (validPages.includes(savedPage) ? savedPage : 'home');

  return {
    page,
    newsId: newsId || localStorage.getItem('smartgrow_selected_news'),
    projId: projId || localStorage.getItem('smartgrow_selected_proj'),
    tab: tab || localStorage.getItem('smartgrow_lms_tab') || 'overview'
  };
};

const HERO_SLIDES = [
  {
    id: 'harvest-team',
    image: '/images/harvest-team-bg.jpg',
    tag: 'DOKUMENTASI RISET // PANEN PERDANA',
    title: 'Driving Agricultural Progress Through Technological Innovation',
    subtitle: 'Integrated research and innovation hub focused on developing intelligent agricultural systems, bridging electrical automation with organic plant physiology.',
    locationBadge: 'Fakultas Ilmu Terapan, Telkom University'
  },
  {
    id: 'greenhouse-hd',
    image: '/images/hero-greenhouse-hd.jpg',
    tag: 'SMART GREENHOUSE // IOT MONITORING',
    title: 'Precision Hydroponics & Autonomous Climate Control',
    subtitle: 'Riset otomasi lingkungan mikroklimat tanaman dengan sensor IoT presisi, spektrum LED buatan terkalibrasi, dan sirkulasi udara terkontrol.',
    locationBadge: 'Smart Greenhouse Research Facility'
  },
  {
    id: 'hydroponic-lab-hd',
    image: '/images/hero-hydroponic-lab-hd.jpg',
    tag: 'VERTICAL FARMING // CYBER-AGRICULTURE',
    title: 'High-Density Indoor Vertical Farming & Clean Agriculture',
    subtitle: 'Sistem rak hidroponik multi-tingkat dalam ruangan berdensitas tinggi untuk ketahanan pangan perkotaan dan efisiensi ruang tumbuh.',
    locationBadge: 'Indoor Agriculture Research Cleanroom'
  }
];

export default function App() {
  const initialNav = parseUrlNavigationState();
  const [currentPage, setCurrentPage] = useState<PageId>(initialNav.page);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(initialNav.newsId);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(initialNav.projId);

  // Hero Image Carousel State
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  // Auto-advance hero carousel every 6 seconds on home page
  useEffect(() => {
    if (currentPage !== 'home') return;
    const interval = setInterval(() => {
      setHeroSlideIndex(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentPage]);

  const [projectCategory, setProjectCategory] = useState<string>('All');
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [projectLightboxImage, setProjectLightboxImage] = useState<{ url: string; title: string; category?: string } | null>(null);

  // ==========================================
  // LABORATORY MANAGEMENT SYSTEM (LMS) STATE
  // ==========================================
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [lmsActiveTab, setLmsActiveTab] = useState<string>(initialNav.tab || 'overview');

  // Synchronize route state with URL hash and localStorage so refresh stays on current page
  useEffect(() => {
    try {
      localStorage.setItem('smartgrow_current_page', currentPage);
      if (selectedNewsId) {
        localStorage.setItem('smartgrow_selected_news', selectedNewsId);
      } else {
        localStorage.removeItem('smartgrow_selected_news');
      }
      if (selectedProjectId) {
        localStorage.setItem('smartgrow_selected_proj', selectedProjectId);
      } else {
        localStorage.removeItem('smartgrow_selected_proj');
      }
      localStorage.setItem('smartgrow_lms_tab', lmsActiveTab);

      let newHash = `#${currentPage}`;
      const params = new URLSearchParams();
      if (currentPage === 'news' && selectedNewsId) {
        params.set('id', selectedNewsId);
      } else if (currentPage === 'project' && selectedProjectId) {
        params.set('id', selectedProjectId);
      } else if (currentPage === 'dashboard' && lmsActiveTab && lmsActiveTab !== 'overview') {
        params.set('tab', lmsActiveTab);
      }
      const paramString = params.toString();
      if (paramString) newHash += `?${paramString}`;

      if (window.location.hash !== newHash) {
        window.history.replaceState(null, '', newHash);
      }
    } catch (_) {}
  }, [currentPage, selectedNewsId, selectedProjectId, lmsActiveTab]);

  // Handle browser Back / Forward history button and hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const state = parseUrlNavigationState();
      if (state.page && state.page !== currentPage) {
        setCurrentPage(state.page);
      }
      if (state.newsId !== selectedNewsId) {
        setSelectedNewsId(state.newsId);
      }
      if (state.projId !== selectedProjectId) {
        setSelectedProjectId(state.projId);
      }
      if (state.tab && state.tab !== lmsActiveTab) {
        setLmsActiveTab(state.tab);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage, selectedNewsId, selectedProjectId, lmsActiveTab]);

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

  // Sync newsList, projectsList & teamList whenever data is updated
  useEffect(() => {
    setNewsList(newsData);
    setProjectsList(projectsData);
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

  const ALUMNI_EMAILS = [
    'daffa@student.telkomuniversity.ac.id',
    'elyasa@student.telkomuniversity.ac.id',
    'humam@student.telkomuniversity.ac.id',
    'hannani@student.telkomuniversity.ac.id',
    'arimbi@student.telkomuniversity.ac.id',
    'alfachriakbar@student.telkomuniversity.ac.id'
  ];

  const enforceStrictUserRole = (user: User): User => {
    const cleanEmail = (user.email || '').trim().toLowerCase();

    // Automatically enforce Alumni accounts as non-active
    if (
      ALUMNI_EMAILS.includes(cleanEmail) || 
      (user.id && user.id.startsWith('user_alumni_')) || 
      user.status === 'alumni' ||
      (user.role === 'student' && (user.title || '').toLowerCase().includes('alumni'))
    ) {
      return {
        ...user,
        role: 'student',
        status: 'alumni'
      };
    }

    if (user.role === 'director' && !isDirectorEmail(cleanEmail)) {
      return {
        ...user,
        role: 'student',
        title: (user.title === 'Kepala & Direktur Utama Smart Grow Laboratory' || user.title === 'Pembina Lab & Dosen Pembimbing Utama') ? 'Mahasiswa Magang Riset' : (user.title || 'Mahasiswa Magang Riset')
      };
    }
    return user;
  };

  // Strictly deduplicates and canonicalizes laboratory users to the official 18-member roster
  const deduplicateLabUsers = (rawList: User[]): User[] => {
    const userMap = new Map<string, User>();

    // 1. Seed with baseline canonical profiles (1 Director, 1 Assistant, 1 Admin, 9 Active Interns, 6 Alumni = 18 members)
    for (const base of initialUsers) {
      const canonicalKey = (base.email || '').trim().toLowerCase();
      userMap.set(canonicalKey, base);
    }

    // 2. Overlay live Firestore data, merging duplicates and stripping legacy test accounts
    for (const raw of rawList) {
      const email = (raw.email || '').trim().toLowerCase();
      const name = (raw.name || '').trim().toLowerCase();

      // Skip test/dummy accounts
      if (
        email.includes('mayaindah') ||
        name.includes('maya indah') ||
        raw.id === 'user_1785383027950'
      ) {
        continue;
      }

      // Determine canonical key
      let canonicalKey = email;
      if (raw.role === 'director' || email.includes('indrarini') || name.includes('indrarini')) {
        canonicalKey = 'indrarini@telkomuniversity.ac.id';
      } else if (raw.role === 'assistant' || email.includes('azliny') || name.includes('azliny')) {
        canonicalKey = 'azliny@telkomuniversity.ac.id';
      } else if (raw.role === 'admin' || email.includes('admin@smartgrowlab')) {
        canonicalKey = 'admin@smartgrowlab.com';
      } else {
        const matched = initialUsers.find(iu => 
          (iu.email && iu.email.toLowerCase() === email) ||
          (iu.name && iu.name.toLowerCase() === name) ||
          (iu.studentId && raw.studentId && iu.studentId === raw.studentId)
        );
        if (matched && matched.email) {
          canonicalKey = matched.email.toLowerCase();
        }
      }

      const existing = userMap.get(canonicalKey);
      if (existing) {
        // Prefer real Firebase Auth UID (alphanumeric without 'user_' or 'preg_' prefix)
        const preferUid = (raw.id && !raw.id.startsWith('user_') && !raw.id.startsWith('preg_'))
          ? raw.id
          : existing.id;

        userMap.set(canonicalKey, enforceStrictUserRole({
          ...existing,
          ...raw,
          id: preferUid,
          name: existing.name || raw.name,
          studentId: raw.studentId || existing.studentId,
          specialty: raw.specialty || existing.specialty,
          avatar: raw.avatar || existing.avatar,
          status: ALUMNI_EMAILS.includes(canonicalKey) ? 'alumni' : (raw.status || existing.status)
        }));
      } else if (raw.role && (raw.name || raw.email)) {
        // Genuine new approved user (e.g. approved applicant)
        userMap.set(canonicalKey, enforceStrictUserRole(raw));
      }
    }

    return Array.from(userMap.values());
  };

  useEffect(() => {
    // 1. Initial session restoration from localStorage
    try {
      const savedSession = localStorage.getItem('smartgrow_session_user');
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        // Automatically revoke alumni session
        if (parsed?.status === 'alumni' || ALUMNI_EMAILS.includes((parsed?.email || '').toLowerCase())) {
          localStorage.removeItem('smartgrow_session_user');
          setCurrentUser(null);
        } else if (parsed?.id && ['user_assistant_2', 'user_student_1'].includes(parsed.id)) {
          localStorage.removeItem('smartgrow_session_user');
          setCurrentUser(null);
        } else if (parsed && (parsed.email || parsed.id)) {
          setCurrentUser(enforceStrictUserRole(parsed));
          setAuthLoading(false);
        }
      }
    } catch (_) {}

    // 2. Listen to Firebase Authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const cleanEmail = (firebaseUser.email || '').toLowerCase().trim();

        // 1. Check if user is in pending_registrations and still pending/rejected
        let pendingRecord: PendingRegistration | null = null;
        try {
          const qPending = query(collection(db, 'pending_registrations'), where('email', '==', cleanEmail));
          const snapPending = await getDocs(qPending);
          if (!snapPending.empty) {
            const docs = snapPending.docs.map(d => d.data() as PendingRegistration);
            docs.sort((a, b) => new Date(b.registrationTime || 0).getTime() - new Date(a.registrationTime || 0).getTime());
            pendingRecord = docs[0];
            if (pendingRecord.status === 'Pending Approval' || pendingRecord.status === 'Rejected') {
              await signOut(auth);
              try { localStorage.removeItem('smartgrow_session_user'); } catch (_) {}
              setCurrentUser(null);
              setAuthLoading(false);
              return;
            }
          }
        } catch (e) {
          console.warn('Pending registration check warning:', e);
        }

        // 2. Fetch matched user from Firestore or local state
        let matchedUser: User | null = null;
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            matchedUser = userDoc.data() as User;
          } else {
            // Fallback: search users collection by email
            const qUsers = query(collection(db, 'users'), where('email', '==', cleanEmail));
            const snapUsers = await getDocs(qUsers);
            if (!snapUsers.empty) {
              matchedUser = snapUsers.docs[0].data() as User;
            }
          }
        } catch (err) {
          console.warn('Error fetching Firestore user profile:', err);
        }

        // 3. Fallback: check in-memory state or initial users
        if (!matchedUser && cleanEmail) {
          matchedUser = users.find(u => (u.email || '').toLowerCase() === cleanEmail) ||
            initialUsers.find(u => (u.email || '').toLowerCase() === cleanEmail) || null;
        }

        // 4. Fallback: If student was approved in pending_registrations, construct active User record
        if (!matchedUser && pendingRecord && pendingRecord.status === 'Approved') {
          const assignedNim = pendingRecord.nim || pendingRecord.studentId || '';
          const generatedInternId = pendingRecord.internId || assignedNim || '001';
          matchedUser = {
            id: firebaseUser.uid,
            name: pendingRecord.fullName,
            email: cleanEmail,
            role: 'student',
            title: 'Mahasiswa Magang Riset',
            studentId: assignedNim,
            internId: generatedInternId,
            institution: pendingRecord.university || '',
            major: pendingRecord.studyProgram || '',
            specialty: pendingRecord.division || '',
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
        }

        if (matchedUser) {
          if (!matchedUser.internId) {
            matchedUser.internId = matchedUser.studentId || '001';
          }
          if (!matchedUser.studentId && pendingRecord && pendingRecord.nim) {
            matchedUser.studentId = pendingRecord.nim;
          }
        }

        // 5. Block auto-login ONLY if no user matched at all
        if (!matchedUser) {
          await signOut(auth);
          try { localStorage.removeItem('smartgrow_session_user'); } catch (_) {}
          setCurrentUser(null);
          setAuthLoading(false);
          return;
        }

        if (matchedUser.status && matchedUser.status !== 'active') {
          await signOut(auth);
          try { localStorage.removeItem('smartgrow_session_user'); } catch (_) {}
          setCurrentUser(null);
          setAuthLoading(false);
          return;
        }

        // Strictly enforce that non-director emails cannot be director
        matchedUser = enforceStrictUserRole(matchedUser);

        // Sync active status & UID in Firestore for valid approved users
        try {
          await setDoc(doc(db, 'users', firebaseUser.uid), { ...matchedUser, id: firebaseUser.uid, status: 'active' }, { merge: true });
        } catch (e: any) {
          console.warn('Sync active status on auth change notice:', e?.message);
        }

        setCurrentUser(matchedUser);
        setUsers(prev => {
          if (prev.some(u => (u.email || '').toLowerCase() === cleanEmail)) {
            return prev.map(u => (u.email || '').toLowerCase() === cleanEmail ? { ...u, ...matchedUser! } : u);
          }
          return [matchedUser!, ...prev];
        });
        try {
          localStorage.setItem('smartgrow_session_user', JSON.stringify(matchedUser));
        } catch (_) {}
        setAuthLoading(false);
      } else {
        // No Firebase Auth user — check if localStorage has an active demo/preset session
        try {
          const savedSession = localStorage.getItem('smartgrow_session_user');
          if (savedSession) {
            const parsed = JSON.parse(savedSession);
            // Automatically revoke alumni session
            if (parsed?.status === 'alumni' || ALUMNI_EMAILS.includes((parsed?.email || '').toLowerCase())) {
              localStorage.removeItem('smartgrow_session_user');
              setCurrentUser(null);
              setAuthLoading(false);
              return;
            }
            if (parsed?.id && ['user_assistant_2', 'user_student_1'].includes(parsed.id)) {
              localStorage.removeItem('smartgrow_session_user');
              setCurrentUser(null);
              setAuthLoading(false);
              return;
            }
            if (parsed && (parsed.email || parsed.id)) {
              setCurrentUser(enforceStrictUserRole(parsed));
              setAuthLoading(false);
              return;
            }
          }
        } catch (_) {}

        setCurrentUser(null);
        setAuthLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

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
  const saveToFirestore = async (collectionName: string, id: string, data: any): Promise<boolean> => {
    try {
      await setDoc(doc(db, collectionName, id), JSON.parse(JSON.stringify(data)), { merge: true });
      return true;
    } catch (e: any) {
      console.error(`Firestore save error for ${collectionName}/${id}:`, e?.message);
      return false;
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

  const handleUpdateAnnouncement = async (updatedAnn: Announcement) => {
    setAnnouncements(prev => prev.map(a => a.id === updatedAnn.id ? updatedAnn : a));
    saveToFirestore('announcements', updatedAnn.id, updatedAnn);
  };

  const handleDeleteAnnouncement = async (annId: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== annId));
    deleteFromFirestore('announcements', annId);
  };

  // NOTE: One-time getDocs fetch removed — realtime onSnapshot listeners below provide
  // initial data load AND continuous updates, eliminating duplicate fetching.
  // Public data (news, projects) loaded via public listener (always active).
  // Private data loaded via authenticated listener (active only when logged in).

  const handleCheckIn = async (
    studentId: string, 
    studentName: string, 
    rawPhotoUrl?: string, 
    locationAddress?: string,
    coords?: { lat: number; lng: number; accuracy: number; distance: number }
  ) => {
    const today = getTodayDateJakarta();
    const nowTime = getNowTimeJakarta();
    const nowTimestamp = Date.now();

    // 1. Mandatory selfie check (No dummy or empty photos allowed)
    if (!rawPhotoUrl) {
      console.error('[Check-In Error] Foto selfie kamera langsung wajib diambil.');
      throw new Error('Foto selfie kamera langsung wajib diambil.');
    }

    // 2. Strict 50m Geofence Validation against official BTP coordinates
    if (coords) {
      const dist = calculateHaversineDistanceMeters(
        coords.lat,
        coords.lng,
        BTP_OFFICIAL_LAT,
        BTP_OFFICIAL_LNG
      );
      if (dist > BTP_GEOFENCE_RADIUS_METERS) {
        console.error(`[Check-In Error] Lokasi di luar radius BTP (${Math.round(dist)}m > ${BTP_GEOFENCE_RADIUS_METERS}m). Presensi dibatalkan.`);
        throw new Error(`Lokasi di luar radius BTP (${Math.round(dist)}m > ${BTP_GEOFENCE_RADIUS_METERS}m). Presensi ditolak.`);
      }
    }

    // 3. DUPLICATE CHECK-IN GUARD (Requirement #2)
    const alreadyCheckedIn = attendance.some(a => {
      if (a.date !== today) return false;
      if (a.studentId === studentId) return true;
      if (currentUser && (a.studentId === currentUser.id || a.studentId === currentUser.studentId)) return true;
      if (currentUser?.name && a.studentName) {
        const cleanUser = currentUser.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const cleanRec = a.studentName.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (cleanUser && cleanRec && (cleanUser.includes(cleanRec) || cleanRec.includes(cleanUser))) return true;
      }
      return false;
    });

    if (alreadyCheckedIn) {
      console.warn(`[Duplicate Check-In Guard] Mahasiswa ${studentName} sudah check-in hari ini (${today}).`);
      throw new Error(`Mahasiswa ${studentName} sudah tercatat presensi hari ini (${today}).`);
    }

    const calculatedStatus = determineAttendanceStatus(new Date(nowTimestamp));

    // 4. Process selfie photo (Upload to Firebase Storage - throws on failure)
    let publicPhotoUrl = rawPhotoUrl;
    if (rawPhotoUrl && rawPhotoUrl.startsWith('data:image')) {
      publicPhotoUrl = await uploadAttendancePhotoToStorage(rawPhotoUrl, studentId);
    }

    // Get current user details for division & mentor
    const currentStudentObj = users.find(u => 
      u.id === studentId || 
      u.name === studentName || 
      (u.name && studentName && u.name.toLowerCase().replace(/[^a-z0-9]/g, '') === studentName.toLowerCase().replace(/[^a-z0-9]/g, ''))
    );

    const resolvedPhoto = publicPhotoUrl || rawPhotoUrl;

    // Deterministic doc ID to enforce SATU STUDENT + SATU TANGGAL = SATU ATTENDANCE RECORD
    const docId = `att_${studentId}_${today}`;
    const lat = coords?.lat ?? BTP_OFFICIAL_LAT;
    const lng = coords?.lng ?? BTP_OFFICIAL_LNG;
    const accuracy = coords?.accuracy ?? 5;
    const distanceMeters = coords 
      ? Math.round(calculateHaversineDistanceMeters(lat, lng, BTP_OFFICIAL_LAT, BTP_OFFICIAL_LNG))
      : 0;

    const record: AttendanceRecord = {
      id: docId,
      studentId,
      internshipId: currentStudentObj?.studentId || currentStudentObj?.internId || '',
      studentName,
      division: currentStudentObj?.specialty || currentStudentObj?.title || 'IoT & Hardware Engineering',
      mentor: currentStudentObj?.advisor || 'Prof. Dr. Indrarini Dyah Irawati',
      date: today,
      checkInTime: nowTime,
      checkInTimestamp: nowTimestamp,
      status: calculatedStatus,
      location: locationAddress || 'Smart Grow Laboratory • Area Bandung Techno Park (BTP) Telkom University',
      address: 'Jl. Telekomunikasi No.1, Sukapura, Dayeuhkolot, Bandung, Jawa Barat 40257',
      latitude: lat,
      longitude: lng,
      gpsAccuracy: accuracy,
      locationRadius: BTP_GEOFENCE_RADIUS_METERS,
      distanceToBtpMeters: distanceMeters,
      deviceName: navigator.userAgent.includes('Windows') ? 'Windows PC' : navigator.userAgent.includes('Mac') ? 'MacBook Pro' : 'Mobile Device',
      browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Browser Web',
      operatingSystem: navigator.platform || 'Desktop',
      checkInPhoto: resolvedPhoto,
      photoUrl: resolvedPhoto,
      firebaseStorageUrl: resolvedPhoto,
      photoFileName: `selfie_${studentId}_${today}.jpg`,
      photoSize: '245 KB',
      photoResolution: '640x480',
      gdriveBackupStatus: 'synced',
      dailyNotes: 'Presensi harian riset Smart Grow Laboratory',
      notes: 'Presensi harian riset Smart Grow Laboratory',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 5. Save directly to Firestore FIRST (guarantees server persistence)
    const saveSuccess = await saveToFirestore('attendance', docId, record);
    if (!saveSuccess) {
      throw new Error('Gagal menyimpan dokumen presensi ke database Firestore. Periksa koneksi internet.');
    }

    // 6. Update state ONLY AFTER verified database persistence
    setAttendance(prev => {
      if (prev.some(a => a.id === docId || (a.studentId === studentId && a.date === today))) {
        return prev.map(a => (a.id === docId || (a.studentId === studentId && a.date === today)) ? record : a);
      }
      return [record, ...prev];
    });

    // Save System Log
    const logObj: SystemLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      user: studentName,
      action: 'PRESENSI_CHECKIN',
      details: `Presensi check-in selfie terverifikasi BTP Telkom University (Jam ${nowTime} • Radius: ${distanceMeters}m / ${BTP_GEOFENCE_RADIUS_METERS}m)`
    };
    setSystemLogs(prev => [logObj, ...prev]);
    saveToFirestore('system_logs', logObj.id, logObj);

    // Async background GDrive backup trigger (non-blocking)
    backupPhotoToGoogleDrive(resolvedPhoto, studentName, today).catch(e => console.info('GDrive sync notice:', e));
  };

  const handleCheckOut = async (studentId: string, dailyNotes?: string) => {
    const today = getTodayDateJakarta();
    const nowTime = getNowTimeJakarta();
    const nowTimestamp = Date.now();

    // Find existing check-in record for this student today
    const targetRecord = attendance.find(a => 
      (a.studentId === studentId || (currentUser && a.studentId === currentUser.id)) && 
      a.date === today
    );

    if (!targetRecord) {
      console.warn(`[Check-Out Notice] Tidak ada catatan check-in hari ini (${today}) untuk ${studentId}`);
      throw new Error(`Tidak ditemukan catatan presensi hari ini (${today}) untuk melakukan check-out.`);
    }

    if (targetRecord.checkOutTime) {
      console.warn(`[Check-Out Notice] Sudah checkout hari ini (${targetRecord.checkOutTime})`);
      throw new Error(`Anda sudah melakukan check-out hari ini pada pukul ${targetRecord.checkOutTime}.`);
    }

    const durationText = calculateWorkDuration(
      targetRecord.checkInTimestamp,
      nowTimestamp,
      targetRecord.checkInTime,
      nowTime
    );
    const durationMinutes = calculateWorkDurationMinutes(
      targetRecord.checkInTimestamp,
      nowTimestamp
    );

    const finalNotes = dailyNotes?.trim() || targetRecord.dailyNotes || 'Presensi harian riset Smart Grow Laboratory';

    const updated: AttendanceRecord = { 
      ...targetRecord, 
      checkOutTime: nowTime,
      checkOutTimestamp: nowTimestamp,
      workDuration: durationText,
      duration: durationText,
      durationMinutes,
      dailyNotes: finalNotes,
      notes: finalNotes,
      updatedAt: new Date().toISOString()
    };

    // Save to Firestore FIRST
    const saveSuccess = await saveToFirestore('attendance', targetRecord.id, updated);
    if (!saveSuccess) {
      throw new Error('Gagal menyimpan pembaruan check-out ke Firestore.');
    }

    // Update state ONLY AFTER verified database update
    setAttendance(prev => prev.map(a => a.id === targetRecord.id ? updated : a));

    // Save System Log
    const logObj: SystemLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      user: targetRecord.studentName || currentUser?.name || 'Mahasiswa',
      action: 'PRESENSI_CHECKOUT',
      details: `Check-out presensi harian berhasil (Jam ${nowTime} • Durasi: ${durationText} • Logbook: ${finalNotes.substring(0, 45)}...)`
    };
    setSystemLogs(prev => [logObj, ...prev]);
    saveToFirestore('system_logs', logObj.id, logObj);
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

  const handleCreateApprovalRequest = async (req: Omit<ApprovalRequest, 'id' | 'status' | 'date'>) => {
    const newReq: ApprovalRequest = {
      ...req,
      id: `req_${Date.now()}`,
      status: 'pending',
      date: getTodayDateJakarta(),
      createdAt: new Date().toISOString()
    };
    setApprovalRequests(prev => [newReq, ...prev]);
    saveToFirestore('approval_requests', newReq.id, newReq);

    const logObj: SystemLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      user: req.studentName,
      action: 'PENGAJUAN_IZIN_APPROVAL',
      details: `Mengajukan permohonan baru: "${req.title}" (Kategori: ${req.type})`
    };
    setSystemLogs(prev => [logObj, ...prev]);
    saveToFirestore('system_logs', logObj.id, logObj);
  };

  const handleDeleteApprovalRequest = async (requestId: string) => {
    setApprovalRequests(prev => prev.filter(r => r.id !== requestId));
    deleteFromFirestore('approval_requests', requestId);
  };

  const handleCorrectAttendance = async (recordId: string, updatedData: Partial<AttendanceRecord>, reason: string) => {
    setAttendance(prev => prev.map(a => {
      if (a.id === recordId) {
        const updated = { ...a, ...updatedData, updatedAt: new Date().toISOString() };
        saveToFirestore('attendance', recordId, updated);
        return updated;
      }
      return a;
    }));

    const logObj: SystemLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      user: currentUser?.name || 'Director/Assistant',
      action: 'KOREKSI_PRESENSI',
      details: `Koreksi presensi ID ${recordId}: ${reason}`
    };
    setSystemLogs(prev => [logObj, ...prev]);
    saveToFirestore('system_logs', logObj.id, logObj);
  };

  const handleUpdateStudentEvaluation = async (studentId: string, evaluation: any) => {
    const finalScore = evaluation.finalScore ?? evaluation.internshipEvaluation?.finalScore;
    const grade = evaluation.grade ?? evaluation.internshipEvaluation?.grade;
    const advisorNotes = evaluation.advisorNotes || evaluation.evalNotes || evaluation.internshipEvaluation?.advisorNotes || '';
    const fullEvaluation = evaluation.internshipEvaluation || evaluation;

    setUsers(prev => prev.map(u => {
      if (u.id === studentId || u.studentId === studentId) {
        const updated: User = {
          ...u,
          internshipEvaluation: fullEvaluation,
          finalScore: finalScore,
          grade: grade,
          advisorNotes: advisorNotes
        };
        saveToFirestore('users', u.id, updated);
        saveToFirestore('internship_evaluations', u.id, {
          studentId: u.id,
          studentName: u.name,
          ...fullEvaluation,
          updatedAt: new Date().toISOString()
        });
        return updated;
      }
      return u;
    }));

    const logObj: SystemLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toLocaleString('id-ID'),
      user: currentUser?.name || 'Direktur Lab',
      action: 'EVALUASI_MAHASISWA',
      details: `Input evaluasi nilai akhir untuk mahasiswa ID ${studentId}: Nilai ${evaluation.finalScore} (Grade ${evaluation.grade})`
    };
    setSystemLogs(prev => [logObj, ...prev]);
    saveToFirestore('system_logs', logObj.id, logObj);
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
    setUsers(prev => prev.map(u => (u.id === updatedUser.id || (u.email && updatedUser.email && u.email.toLowerCase() === updatedUser.email.toLowerCase())) ? { ...u, ...updatedUser } : u));
    if (currentUser?.id === updatedUser.id || (currentUser?.email && updatedUser.email && currentUser.email.toLowerCase() === updatedUser.email.toLowerCase())) {
      setCurrentUser(prev => prev ? { ...prev, ...updatedUser } : updatedUser);
      try {
        localStorage.setItem('smartgrow_session_user', JSON.stringify({ ...currentUser, ...updatedUser }));
      } catch (_) {}
    }
    try {
      if (updatedUser.id) {
        await setDoc(doc(db, 'users', updatedUser.id), JSON.parse(JSON.stringify(updatedUser)), { merge: true });
      }
      if (auth.currentUser?.uid && auth.currentUser.uid !== updatedUser.id) {
        await setDoc(doc(db, 'users', auth.currentUser.uid), JSON.parse(JSON.stringify(updatedUser)), { merge: true });
      }
    } catch (e: any) {
      console.warn('Firestore update user notice:', e?.message);
    }
  };

  const handleApproveRegistration = async (pendingReg: PendingRegistration) => {
    const approvedCount = pendingRegistrations.filter(r => r.status === 'Approved').length + 1;
    const assignedNim = pendingReg.nim || pendingReg.studentId || '';
    const generatedInternId = pendingReg.internId || assignedNim || String(approvedCount).padStart(3, '0');
    const token = `act_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const updated: PendingRegistration = {
      ...pendingReg,
      status: 'Approved',
      nim: assignedNim,
      studentId: assignedNim,
      internId: generatedInternId,
      activationToken: token
    };

    setPendingRegistrations(prev => prev.map(p => p.id === pendingReg.id ? updated : p));

    // Construct active user record for student with NIM and ID Magang
    const newStudentUser: User = {
      id: pendingReg.uid || pendingReg.id || `user_act_${Date.now()}`,
      name: pendingReg.fullName,
      email: (pendingReg.email || '').trim().toLowerCase(),
      role: 'student',
      title: 'Mahasiswa Magang Riset',
      studentId: assignedNim, // NIM recorded in user profile!
      internId: generatedInternId, // ID Magang recorded in user profile!
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
      if (prev.some(u => (u.email || '').toLowerCase() === (pendingReg.email || '').toLowerCase())) {
        return prev.map(u => (u.email || '').toLowerCase() === (pendingReg.email || '').toLowerCase() ? { ...u, ...newStudentUser, status: 'active' } : u);
      }
      return [newStudentUser, ...prev];
    });

    try {
      await setDoc(doc(db, 'pending_registrations', pendingReg.id), JSON.parse(JSON.stringify(updated)));
      await setDoc(doc(db, 'users', newStudentUser.id), JSON.parse(JSON.stringify(newStudentUser)), { merge: true });
      if (pendingReg.id && pendingReg.id !== newStudentUser.id) {
        await setDoc(doc(db, 'users', pendingReg.id), JSON.parse(JSON.stringify(newStudentUser)), { merge: true });
      }

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

  const handleDeleteRegistration = async (id: string) => {
    setPendingRegistrations(prev => prev.filter(p => p.id !== id));
    try {
      await deleteDoc(doc(db, 'pending_registrations', id));
    } catch (e: any) {
      console.warn('Firestore delete pending registration notice:', e?.message);
    }
  };

  const handleClearAllPendingRegistrations = async () => {
    const list = [...pendingRegistrations];
    setPendingRegistrations([]);
    for (const r of list) {
      try {
        await deleteDoc(doc(db, 'pending_registrations', r.id));
      } catch (e: any) {
        console.warn('Firestore clear registration notice:', e?.message);
      }
    }
  };

  // =========================================================================
  // PUBLIC REALTIME LISTENERS — Active on all pages (news & showcase projects)
  // =========================================================================
  useEffect(() => {
    // 1. Projects listener: Merge Firestore docs with built-in projectsData (guarantees smart-tbn is always present)
    const unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
      const projectMap = new Map<string, ProjectItem>();
      // Pre-populate with built-in projects
      projectsData.forEach(p => projectMap.set(p.id, p));

      if (!snapshot.empty) {
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as ProjectItem;
          if (data && data.id) {
            // Keep official updated logos from built-in projectsData
            const builtIn = projectsData.find(p => p.id === data.id);
            if (builtIn && builtIn.image && (builtIn.image.includes('logo') || builtIn.image.includes('mops') || builtIn.image.includes('htci') || builtIn.image.includes('flocify') || builtIn.image.includes('sapa') || builtIn.image.includes('hycosmarts') || builtIn.image.includes('cikapundung'))) {
              data.image = builtIn.image;
              data.gallery = builtIn.gallery || data.gallery;
            }
            projectMap.set(data.id, data);
          }
        });
      }
      setProjectsList(Array.from(projectMap.values()));
    }, (err) => console.warn('Projects listener notice:', err));

    // Auto-sync projects to Firestore
    const smartTbnProject = projectsData.find(p => p.id === 'smart-tbn');
    if (smartTbnProject) {
      setDoc(doc(db, 'projects', 'smart-tbn'), JSON.parse(JSON.stringify(smartTbnProject)), { merge: true }).catch(() => {});
    }
    const smartWaterProject = projectsData.find(p => p.id === 'smart-water');
    if (smartWaterProject) {
      setDoc(doc(db, 'projects', 'smart-water'), JSON.parse(JSON.stringify(smartWaterProject)), { merge: true }).catch(() => {});
    }
    const mopsProject = projectsData.find(p => p.id === 'mops');
    if (mopsProject) {
      setDoc(doc(db, 'projects', 'mops'), JSON.parse(JSON.stringify(mopsProject)), { merge: true }).catch(() => {});
    }
    const htciProject = projectsData.find(p => p.id === 'proj_1788926059725' || p.id === 'htci');
    if (htciProject) {
      setDoc(doc(db, 'projects', htciProject.id), JSON.parse(JSON.stringify(htciProject)), { merge: true }).catch(() => {});
      setDoc(doc(db, 'projects', 'htci'), JSON.parse(JSON.stringify(htciProject)), { merge: true }).catch(() => {});
    }
    const sapaJamiyyahProject = projectsData.find(p => p.id === 'sapa-jamiyyah');
    if (sapaJamiyyahProject) {
      setDoc(doc(db, 'projects', 'sapa-jamiyyah'), JSON.parse(JSON.stringify(sapaJamiyyahProject)), { merge: true }).catch(() => {});
    }
    const flocifyProject = projectsData.find(p => p.id === 'flocify');
    if (flocifyProject) {
      setDoc(doc(db, 'projects', 'flocify'), JSON.parse(JSON.stringify(flocifyProject)), { merge: true }).catch(() => {});
    }
    const dasCikapundungProject = projectsData.find(p => p.id === 'das-cikapundung');
    if (dasCikapundungProject) {
      setDoc(doc(db, 'projects', 'das-cikapundung'), JSON.parse(JSON.stringify(dasCikapundungProject)), { merge: true }).catch(() => {});
    }
    const hycosmartsProject = projectsData.find(p => p.id === 'hycosmarts');
    if (hycosmartsProject) {
      setDoc(doc(db, 'projects', 'hycosmarts'), JSON.parse(JSON.stringify(hycosmartsProject)), { merge: true }).catch(() => {});
    }
    const smartMinimarketProject = projectsData.find(p => p.id === 'smart-minimarket');
    if (smartMinimarketProject) {
      setDoc(doc(db, 'projects', 'smart-minimarket'), JSON.parse(JSON.stringify(smartMinimarketProject)), { merge: true }).catch(() => {});
    }
    const closedSmartHydroponicProject = projectsData.find(p => p.id === 'closed-smart-hydroponic');
    if (closedSmartHydroponicProject) {
      setDoc(doc(db, 'projects', 'closed-smart-hydroponic'), JSON.parse(JSON.stringify(closedSmartHydroponicProject)), { merge: true }).catch(() => {});
    }
    const sindulangProject = projectsData.find(p => p.id === 'sindulang-netconnect');
    if (sindulangProject) {
      setDoc(doc(db, 'projects', 'sindulang-netconnect'), JSON.parse(JSON.stringify(sindulangProject)), { merge: true }).catch(() => {});
    }

    // 2. News listener: Merge Firestore docs with built-in newsData
    const unsubNews = onSnapshot(collection(db, 'news'), (snapshot) => {
      const newsMap = new Map<string, NewsItem>();
      // Pre-populate with built-in newsData
      newsData.forEach(n => newsMap.set(n.id, n));

      if (!snapshot.empty) {
        const oldDocIds = new Set(['hycosmarts-container', 'simona-aquaponics', 'luminet-smart-lighting', 'flocify-biofloc-ai']);
        snapshot.forEach(docSnap => {
          const data = docSnap.data() as NewsItem;
          if (data && data.id && !oldDocIds.has(data.id)) {
            newsMap.set(data.id, data);
          }
        });
      }
      newsMap.delete('smart-tbn-goes-to-sumba');
      newsMap.delete('peluncuran-mops-smart-waste-bandung');
      setNewsList(Array.from(newsMap.values()));
    }, (err) => console.warn('News listener notice:', err));

    // Remove MOPS news from Firestore to guarantee it is only in projects
    deleteDoc(doc(db, 'news', 'peluncuran-mops-smart-waste-bandung')).catch(() => {});

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
        } else {
          setPendingRegistrations([]);
        }
      }, (err) => console.warn('Pending registrations listener notice:', err));

      const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
        if (!snapshot.empty) {
          const list: User[] = [];
          snapshot.forEach(docSnap => {
            const raw = docSnap.data() as User;
            list.push(enforceStrictUserRole(raw));
          });
          const deduplicated = deduplicateLabUsers(list);
          setUsers(deduplicated);
          setCurrentUser(prev => {
            if (!prev) return null;
            const updatedFromDb = deduplicated.find(u => u.id === prev.id || (u.email && prev.email && u.email.toLowerCase() === prev.email.toLowerCase()));
            return updatedFromDb ? enforceStrictUserRole({ ...prev, ...updatedFromDb }) : enforceStrictUserRole(prev);
          });
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

      const attendanceTarget = currentUser.role === 'student'
        ? query(collection(db, 'attendance'), where('studentId', '==', currentUser.id))
        : collection(db, 'attendance');

      const unsubAttendance = onSnapshot(attendanceTarget, (snapshot) => {
        if (!snapshot.empty) {
          const list: AttendanceRecord[] = [];
          snapshot.forEach(docSnap => {
            const data = docSnap.data() as AttendanceRecord;
            list.push({ id: docSnap.id, ...data });
          });
          setAttendance(list);
        } else {
          setAttendance([]);
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

  // Scroll to top when page changes
  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    setSelectedNewsId(null);
    setSelectedProjectId(null);
    setActiveGalleryIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate directly to Open Recruitment news article in News & Events
  const handleOpenRecruitmentNews = () => {
    setCurrentPage('news');
    setSelectedNewsId('open-recruitment-magang-2026');
    setSelectedProjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen w-full overflow-x-clip bg-white text-slate-800 font-sans selection:bg-teal-500 selection:text-white relative">
      <ToastContainer />
      
      {/* Subtle light background hints */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Navigation Header */}
      {currentPage !== 'login' && currentPage !== 'dashboard' && (
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={handleNavigate} 
          onOpenJoin={handleOpenRecruitmentNews}
          isLoggedIn={!authLoading && !!currentUser}
          currentUserRole={currentUser?.role}
          onOpenLogin={() => handleNavigate('login')}
        />
      )}

      {/* LOGIN PAGE */}
      {currentPage === 'login' && (
        <LoginView 
          users={users} 
          tasks={tasks}
          onLogin={handleLogin} 
          onRegister={(newUser) => setUsers(prev => [newUser, ...prev])}
          onPendingRegister={(newPending) => setPendingRegistrations(prev => [newPending, ...prev])}
          onBack={() => handleNavigate('home')} 
        />
      )}

      {/* DASHBOARD LMS PAGE */}
      {currentPage === 'dashboard' && (
        authLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 py-24">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-slate-500 font-sans">Memuat sesi laboratorium...</p>
          </div>
        ) : currentUser ? (
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
              onDeleteRegistration={handleDeleteRegistration}
              onClearAllRegistrations={handleClearAllPendingRegistrations}
              onApproveRequest={handleApproveRequest}
              onRejectRequest={handleRejectRequest}
              onAdvanceApplicantStage={handleAdvanceApplicantStage}
              onApproveApplicant={handleApproveApplicant}
              onRejectApplicant={handleRejectApplicant}
              onCreateAnnouncement={handleCreateAnnouncement}
              onUpdateAnnouncement={handleUpdateAnnouncement}
              onDeleteAnnouncement={handleDeleteAnnouncement}
              onCreateProject={handleCreateLmsProject}
              onUpdateProject={handleUpdateLmsProject}
              onDeleteProject={handleDeleteLmsProject}
              onArchiveProject={handleArchiveLmsProject}
              onAddPublicProject={handleAddProject}
              onEditPublicProject={handleEditProject}
              onDeletePublicProject={handleDeleteProject}
              onNavigateToShowcase={(projId) => {
                setCurrentPage('project');
                setSelectedProjectId(projId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onUpdateProfile={handleUpdateUser}
              onDeleteStudent={handleDeleteUser}
              onCreateTask={handleCreateTask}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
              onApproveTask={handleApproveTask}
              onRejectTask={handleRejectTask}
              onRequestRevision={handleRequestRevision}
              onCorrectAttendance={handleCorrectAttendance}
              onUpdateStudentEvaluation={handleUpdateStudentEvaluation}
              darkMode={darkMode}
              language={language}
            />
          )}

          {currentUser.role === 'assistant' && (
            <AssistantDashboard
              currentUser={currentUser}
              activeTab={lmsActiveTab}
              users={users}
              tasks={tasks}
              attendance={attendance}
              projects={lmsProjects}
              publicProjects={projectsList}
              announcements={announcements}
              applicants={applicants}
              pendingRegistrations={pendingRegistrations}
              onApproveRegistration={handleApproveRegistration}
              onRejectRegistration={handleRejectRegistration}
              onDeleteRegistration={handleDeleteRegistration}
              onClearAllRegistrations={handleClearAllPendingRegistrations}
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
              onUpdateAnnouncement={handleUpdateAnnouncement}
              onDeleteAnnouncement={handleDeleteAnnouncement}
              onCreateProject={handleCreateLmsProject}
              onUpdateProject={handleUpdateLmsProject}
              onDeleteProject={handleDeleteLmsProject}
              onArchiveProject={handleArchiveLmsProject}
              onAddPublicProject={handleAddProject}
              onEditPublicProject={handleEditProject}
              onDeletePublicProject={handleDeleteProject}
              onNavigateToShowcase={(projId) => {
                setCurrentPage('project');
                setSelectedProjectId(projId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onUpdateProfile={handleUpdateUser}
              darkMode={darkMode}
              language={language}
            />
          )}

          {currentUser.role === 'student' && (
            <StudentDashboard
              currentUser={currentUser}
              activeTab={lmsActiveTab}
              onNavigateTab={setLmsActiveTab}
              tasks={tasks}
              attendance={attendance}
              projects={lmsProjects}
              announcements={announcements}
              approvalRequests={approvalRequests}
              onCreateApprovalRequest={handleCreateApprovalRequest}
              onDeleteApprovalRequest={handleDeleteApprovalRequest}
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
              onDeleteRegistration={handleDeleteRegistration}
              onClearAllRegistrations={handleClearAllPendingRegistrations}
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
        ) : (
          <LoginView 
            users={users} 
            tasks={tasks}
            onLogin={handleLogin} 
            onRegister={(newUser) => setUsers(prev => [newUser, ...prev])}
            onPendingRegister={(newPending) => setPendingRegistrations(prev => [newPending, ...prev])}
            onBack={() => handleNavigate('home')} 
          />
        )
      )}

      {/* Main Content Area for Public Pages */}
      {currentPage !== 'login' && currentPage !== 'dashboard' && (
      <main className="pb-24">
        
        {/* --- PAGE: HOME --- */}
        {currentPage === 'home' && (
          <div className="animate-fade-in">
            {/* Hero Section — Next-Gen Cyber-Agriculture Glassmorphic Hub */}
            <section className="relative px-4 pt-4 pb-12 sm:pt-6 sm:pb-16 sm:px-6 lg:px-8 text-left overflow-hidden bg-slate-900 z-10 min-h-[560px] sm:min-h-[620px] flex items-center" id="home-hero">
              {/* Immersive Background Layer - Dynamic Carousel with Cross-Fade & Ken Burns Effect */}
              <div className="absolute inset-0 z-0 overflow-hidden select-none">
                {HERO_SLIDES.map((slide, idx) => {
                  const isActive = idx === heroSlideIndex;
                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
                        isActive ? 'opacity-100 z-1' : 'opacity-0 z-0'
                      }`}
                    >
                      <img 
                        src={slide.image} 
                        className={`w-full h-full object-cover filter brightness-[1.02] contrast-[1.05] transition-transform duration-[7000ms] ease-out ${
                          isActive ? 'scale-105' : 'scale-100'
                        }`}
                        style={{ imageRendering: 'high-quality' }}
                        alt={slide.title}
                      />
                      {/* Subtle Dark Vignette & Gradient for ultra crisp text readability */}
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/25 to-transparent" />
                    </div>
                  );
                })}

                {/* Soft Bottom Fade to White for Seamless Section Transition */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none z-2" />

                {/* Carousel Controls (Floating Prev & Next Arrows on Edge) */}
                <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                  <button
                    onClick={() => setHeroSlideIndex(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                    className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-white/70 hover:bg-white text-slate-800 hover:text-emerald-700 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border border-white/60"
                    title="Foto Sebelumnya"
                    aria-label="Foto Sebelumnya"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setHeroSlideIndex(prev => (prev + 1) % HERO_SLIDES.length)}
                    className="pointer-events-auto p-2.5 sm:p-3 rounded-full bg-white/70 hover:bg-white text-slate-800 hover:text-emerald-700 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer border border-white/60"
                    title="Foto Berikutnya"
                    aria-label="Foto Berikutnya"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Main Content Grid — Right Side Text Panel with Deep Frosted Glass Protection */}
              <div className="mx-auto max-w-7xl relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6 sm:py-8">
                
                {/* Right Side (7 Cols): Headline, Subtext, CTAs & Metrics */}
                <div className="lg:col-span-7 lg:col-start-6 flex flex-col items-start text-left space-y-4 sm:space-y-5 bg-white/65 backdrop-blur-2xl backdrop-saturate-150 p-6 sm:p-8 rounded-3xl border border-white/70 shadow-2xl">
                  
                  {/* Dynamic Slide Badge */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A5247] text-emerald-200 font-mono text-[11px] font-bold tracking-wider uppercase shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {HERO_SLIDES[heroSlideIndex].tag}
                    </span>
                    <span className="text-[11px] font-mono text-slate-700 font-semibold hidden sm:inline-block">
                      • {HERO_SLIDES[heroSlideIndex].locationBadge}
                    </span>
                  </div>

                  {/* Headline */}
                  <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#0A5247] leading-[1.15] drop-shadow-xs transition-all duration-500">
                    {HERO_SLIDES[heroSlideIndex].title}
                  </h1>

                  {/* Description */}
                  <p className="max-w-2xl text-xs sm:text-base leading-relaxed text-slate-800 font-sans font-medium transition-all duration-500">
                    {HERO_SLIDES[heroSlideIndex].subtitle}
                  </p>

                  {/* Action Buttons & Indicator Bar */}
                  <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => handleNavigate('project')}
                        id="btn-see-more-home"
                        className="group relative inline-flex items-center gap-2.5 rounded-full bg-[#0A5247] hover:bg-[#073D35] px-6 sm:px-7 py-3 text-xs font-extrabold tracking-wider uppercase text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-emerald-950/20 cursor-pointer border border-emerald-700/30 overflow-hidden"
                      >
                        <span className="relative z-10">See More</span>
                        <ArrowUpRight className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>

                      <button
                        onClick={() => handleNavigate('news')}
                        className="inline-flex items-center gap-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-xl border border-emerald-400 px-5 sm:px-6 py-3 text-xs font-extrabold tracking-wider uppercase text-[#0A5247] hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm cursor-pointer"
                      >
                        <span>Explore Lab News</span>
                      </button>
                    </div>

                    {/* Carousel Dots & Number Indicator */}
                    <div className="flex items-center gap-2 sm:ml-auto">
                      {HERO_SLIDES.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setHeroSlideIndex(idx)}
                          className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                            idx === heroSlideIndex 
                              ? 'w-7 bg-[#0A5247] shadow-sm' 
                              : 'w-2.5 bg-slate-400/80 hover:bg-slate-500'
                          }`}
                          title={`Foto ${idx + 1}: ${HERO_SLIDES[idx].tag}`}
                          aria-label={`Foto ${idx + 1}`}
                        />
                      ))}
                      <span className="text-[11px] font-mono font-bold text-slate-700 pl-1">
                        0{heroSlideIndex + 1} / 0{HERO_SLIDES.length}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* VISI & MISI SECTION */}
            <VisionMissionSection />

            {/* RESEARCH INTEREST SECTION (Smooth Interactive Slider) */}
            <ResearchInterestSlider />

            {/* COLLABORATION & RECRUITMENT CTA BANNER */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 mb-6">
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0A5247] via-[#084239] to-[#042823] p-8 sm:p-12 text-white shadow-xl shadow-emerald-950/15 border border-emerald-700/30 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-3 text-center lg:text-left max-w-2xl">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-xs font-mono font-bold uppercase tracking-widest">
                    KOLABORASI & TALENTA RISET
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                    Tertarik Berkolaborasi atau Bergabung dalam Riset Kami?
                  </h3>
                  <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-sans">
                    Smart Grow Laboratory membuka peluang kemitraan industri, riset bersama, dan program magang intensif bagi mahasiswa berdedikasi.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
                  <button
                    onClick={handleOpenRecruitmentNews}
                    className="inline-flex items-center gap-2 rounded-full bg-white text-[#0A5247] hover:bg-emerald-50 px-7 py-3.5 text-xs font-extrabold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
                  >
                    <span>Daftar Magang Riset</span>
                    <ArrowUpRight className="h-4 w-4 text-[#0A5247]" />
                  </button>
                  <button
                    onClick={() => handleNavigate('join')}
                    className="inline-flex items-center gap-2 rounded-full bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-400/30 text-white px-6 py-3.5 text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Ajukan Kolaborasi Riset</span>
                  </button>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* --- PAGE: NEWS & EVENTS --- */}
        {currentPage === 'news' && (
          <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-fade-in ${selectedNewsId ? 'pt-4 sm:pt-6' : 'pt-6 sm:pt-8'}`} id="news-section">
            
            {!selectedNewsId ? (
              <>
                <div className="flex flex-col gap-2 mb-7">
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
          <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 animate-fade-in ${selectedProjectId ? 'pt-4 sm:pt-6' : 'pt-6 sm:pt-8'}`} id="project-section">
            
            {!selectedProjectId ? (
              <>
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
                  <div className="flex flex-col gap-2">
                    <h1 className="font-display text-4xl font-extrabold text-slate-900 md:text-5xl tracking-tight">
                      Projek R&D Hub
                    </h1>
                    <p className="max-w-2xl text-sm sm:text-base text-slate-500 font-sans mt-1">
                      Sistem cerdas pertanian siber, telemetri nirkabel, dan otomatisasi kontrol bio-lingkungan yang dikembangkan oleh tim laboratorium kami.
                    </p>
                  </div>

                </div>

                {/* Projects Grid */}
                {(() => {
                  const filtered = [...projectsList]
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
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filtered.map((project) => (
                        <div
                          key={project.id}
                          onClick={() => {
                            setSelectedProjectId(project.id);
                            setActiveGalleryIndex(0);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="group cursor-pointer bg-white border border-slate-100 p-4 sm:p-5 rounded-3xl transition-all duration-300 hover:shadow-xl hover:border-teal-500/20 hover:scale-[1.01] flex flex-col justify-between shadow-xs h-full"
                          id={`project-card-${project.id}`}
                        >
                          <div className="space-y-4">
                            {/* Card Media Preview (Segi Empat / Aspect Square) */}
                            <div className={`relative aspect-square w-full overflow-hidden rounded-2xl border transition-all ${
                              project.id === 'smart-water' ? 'border-sky-200 bg-white shadow-inner' : 
                              project.id === 'mops' ? 'border-emerald-200 bg-white shadow-inner' :
                              project.id === 'smart-tbn' ? 'border-emerald-200 bg-white shadow-inner' :
                              project.id === 'sapa-jamiyyah' ? 'border-emerald-200 bg-white shadow-inner' :
                              project.id === 'flocify' ? 'border-sky-200 bg-white shadow-inner' :
                              project.id === 'hycosmarts' ? 'border-red-200 bg-white shadow-inner' :
                              project.id === 'simona' ? 'border-cyan-200 bg-white shadow-inner' :
                              project.id === 'proj_1788926059725' || project.id === 'htci' ? 'border-teal-200 bg-white shadow-inner' :
                              project.id === 'das-cikapundung' ? 'border-teal-700/30 bg-slate-900' :
                              project.id === 'smart-minimarket' ? 'border-sky-300/40 bg-slate-900' :
                              project.id === 'closed-smart-hydroponic' ? 'border-purple-300/40 bg-slate-900' :
                              project.id === 'sindulang-netconnect' ? 'border-orange-200 bg-white shadow-inner' :
                              'border-slate-100 bg-slate-950'
                            }`}>
                              <img
                                src={resolveImageUrl(project.image)}
                                alt={project.title}
                                referrerPolicy="no-referrer"
                                className={`h-full w-full transition-transform duration-700 group-hover:scale-105 ${
                                  project.id === 'smart-water'
                                    ? 'object-contain p-4 bg-white'
                                    : project.id === 'mops'
                                    ? 'object-contain p-4 bg-white'
                                    : project.id === 'smart-tbn'
                                    ? 'object-contain p-4 bg-white'
                                    : project.id === 'sapa-jamiyyah'
                                    ? 'object-contain p-4 bg-white'
                                    : project.id === 'flocify'
                                    ? 'object-contain p-4 bg-white'
                                    : project.id === 'hycosmarts'
                                    ? 'object-contain p-4 bg-white'
                                    : project.id === 'simona'
                                    ? 'object-contain p-4 bg-white'
                                    : project.id === 'proj_1788926059725' || project.id === 'htci'
                                    ? 'object-contain p-4 bg-white'
                                    : project.id === 'das-cikapundung'
                                    ? 'object-cover object-top'
                                    : project.id === 'smart-minimarket'
                                    ? 'object-cover object-top'
                                    : project.id === 'closed-smart-hydroponic'
                                    ? 'object-cover object-center'
                                    : project.id === 'sindulang-netconnect'
                                    ? 'object-contain p-2 bg-gradient-to-br from-amber-50 to-orange-50'
                                    : (project.image || '').includes('logo') || (project.image || '').includes('poster') || (project.image || '').includes('brochure') || (project.image || '').includes('sapa')
                                    ? 'object-contain p-3 bg-slate-950' 
                                    : 'object-cover object-center'
                                }`}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/images/harvest-team-bg.jpg';
                                }}
                              />
                              {project.id !== 'smart-water' && project.id !== 'mops' && project.id !== 'smart-tbn' && project.id !== 'sapa-jamiyyah' && project.id !== 'flocify' && project.id !== 'hycosmarts' && project.id !== 'simona' && project.id !== 'proj_1788926059725' && project.id !== 'htci' && project.id !== 'sindulang-netconnect' && (
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                              )}
                              
                              {/* Overlay Category Tag */}
                              <div className="absolute top-3.5 left-3.5 flex gap-2">
                                <span className="rounded-full bg-white/95 backdrop-blur-md border border-slate-100 px-3 py-1 text-[10px] font-sans font-bold tracking-wider text-teal-700 uppercase shadow-xs">
                                  {project.category}
                                </span>
                              </div>
                            </div>

                            {/* Project Information */}
                            <div className="px-1 space-y-1.5">
                              <h3 className="font-display text-lg sm:text-xl font-black text-slate-950 group-hover:text-teal-600 transition-colors line-clamp-1" title={project.title}>
                                {project.title}
                              </h3>
                              <p className="text-[11px] font-sans font-bold text-slate-400 uppercase tracking-wider line-clamp-1">
                                {project.tagline}
                              </p>
                              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-3">
                                {project.description}
                              </p>
                            </div>
                          </div>

                          {/* Trigger Arrow Action row */}
                          <div className="mt-5 pt-3.5 border-t border-slate-100/80 px-1 flex flex-wrap items-center justify-between gap-2">
                            <span className="font-sans text-xs font-bold text-teal-600 group-hover:underline flex items-center gap-1">
                              Lihat Detail Riset
                            </span>
                            <div className="flex items-center gap-2">
                              {(project.liveUrl || project.id === 'sapa-jamiyyah' || project.id === 'flocify' || project.id === 'mops' || project.id === 'smart-tbn' || project.id === 'proj_1788926059725' || project.id === 'smart-water') && (
                                <a
                                  href={project.liveUrl || (project.id === 'sapa-jamiyyah' ? 'https://www.sapajamiyyah.com/' : project.id === 'flocify' ? 'https://ppmtelkom.vercel.app/' : project.id === 'mops' ? 'https://mops-5f51b.web.app/' : project.id === 'smart-tbn' ? 'https://smarttrash.devtbn.tech/' : project.id === 'smart-water' ? 'https://drive.google.com/file/d/1NNfvmh80qbw0Gg1aB26Eod8DEh-26mh7/view?usp=sharing' : 'https://htci.netlify.app/')}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white text-[11px] font-bold border border-emerald-200 transition-all hover:scale-105 cursor-pointer"
                                  title={project.id === 'smart-water' ? 'Unduh Aplikasi Smart Water' : `Buka Web Resmi ${project.title}`}
                                >
                                  <span>{project.id === 'smart-water' || (project.liveUrl || '').includes('drive.google.com') ? 'Unduh App' : (project.liveUrl || '').includes('instagram') ? 'Tonton Reel' : 'Kunjungi Web'}</span>
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                              <div className="h-7 w-7 rounded-full bg-slate-50 group-hover:bg-teal-50 flex items-center justify-center text-slate-400 group-hover:text-teal-600 transition-all">
                                <ArrowUpRight className="h-3.5 w-3.5" />
                              </div>
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

                if (project.id === 'smart-tbn' || project.id?.includes('tbn')) {
                  return (
                    <SmartTbnShowcase
                      item={project}
                      onBack={() => {
                        setSelectedProjectId(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  );
                }

                if (
                  project.id === 'proj_1788926059725' || 
                  project.id === 'htci' || 
                  project.id?.includes('htci') || 
                  project.title?.toLowerCase().includes('hydrothermal') || 
                  project.title?.toLowerCase().includes('htci')
                ) {
                  return (
                    <HtciShowcase
                      item={project}
                      onBack={() => {
                        setSelectedProjectId(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  );
                }

                if (
                  project.id === 'smart-water' || 
                  project.id?.includes('water') || 
                  project.title?.toLowerCase().includes('smart water')
                ) {
                  return (
                    <SmartWaterShowcase
                      item={project}
                      onBack={() => {
                        setSelectedProjectId(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  );
                }

                if (
                  project.id === 'mops' || 
                  project.id?.includes('mops') || 
                  project.title?.toLowerCase().includes('mops') ||
                  project.title?.toLowerCase().includes('persampahan kota bandung')
                ) {
                  return (
                    <MopsShowcase
                      item={project}
                      onBack={() => {
                        setSelectedProjectId(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  );
                }

                if (
                  project.id === 'sapa-jamiyyah' || 
                  project.id?.includes('sapa-jamiyyah') || 
                  project.title?.toLowerCase().includes('sapa jam') ||
                  project.title?.toLowerCase().includes("jam'iyyah")
                ) {
                  return (
                    <SapaJamiyyahShowcase
                      item={project}
                      onBack={() => {
                        setSelectedProjectId(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  );
                }

                if (
                  project.id === 'das-cikapundung' || 
                  project.id?.includes('cikapundung') || 
                  project.title?.toLowerCase().includes('cikapundung')
                ) {
                  return (
                    <DasCikapundungShowcase
                      item={project}
                      onBack={() => {
                        setSelectedProjectId(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  );
                }

                if (
                  project.id === 'smart-minimarket' || 
                  project.id?.includes('minimarket') || 
                  project.id?.includes('qmart') ||
                  project.title?.toLowerCase().includes('minimarket')
                ) {
                  return (
                    <SmartMinimarketShowcase
                      item={project}
                      onBack={() => {
                        setSelectedProjectId(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  );
                }

                if (
                  project.id === 'closed-smart-hydroponic' || 
                  project.id?.includes('closed-smart-hydroponic') || 
                  project.title?.toLowerCase().includes('closed smart hydroponic')
                ) {
                  return (
                    <ClosedSmartHydroponicShowcase
                      item={project}
                      onBack={() => {
                        setSelectedProjectId(null);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  );
                }

                return (
                  <div className="space-y-6 animate-fade-in" id="project-detail-container">
                    
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

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-2">
                      
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
                        {(() => {
                          const activeImageSrc = resolveImageUrl(project.gallery?.[activeGalleryIndex] || project.image);
                          const isContainMode = 
                            activeImageSrc.includes('logo') ||
                            activeImageSrc.includes('spanduk') ||
                            activeImageSrc.includes('poster') ||
                            activeImageSrc.includes('container') ||
                            activeImageSrc.includes('sindulang') ||
                            project.id === 'sindulang-netconnect' ||
                            project.id === 'closed-smart-hydroponic';

                          return (
                            <div 
                              onClick={() => {
                                if (project.liveUrl && project.liveUrl !== '#') {
                                  window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                                } else {
                                  setProjectLightboxImage({
                                    url: activeImageSrc,
                                    title: `${project.title} - ${
                                      activeImageSrc.includes('spanduk')
                                        ? 'Spanduk Resmi Peresmian'
                                        : activeImageSrc.includes('container')
                                        ? 'Dokumentasi Unit Kontainer'
                                        : `Slide 0${activeGalleryIndex + 1}`
                                    }`,
                                    category: project.category
                                  });
                                }
                              }}
                              className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] border border-slate-200/80 bg-slate-950 shadow-xl cursor-pointer group"
                              title={project.liveUrl && project.liveUrl !== '#' ? `Buka tautan: ${project.liveUrl}` : 'Klik untuk perbesar foto (Lightbox)'}
                            >
                              {/* Ambient Blurred Backdrop for contain images */}
                              {isContainMode && (
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                  <img 
                                    src={activeImageSrc} 
                                    alt="" 
                                    aria-hidden="true"
                                    className="w-full h-full object-cover blur-2xl scale-125 opacity-25"
                                  />
                                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs" />
                                </div>
                              )}

                              <img 
                                src={activeImageSrc} 
                                alt={`${project.title} slide`}
                                referrerPolicy="no-referrer"
                                className={`relative z-10 w-full h-full transition-all duration-500 ${
                                  isContainMode
                                    ? 'object-contain p-3 sm:p-5'
                                    : 'object-cover'
                                } group-hover:scale-[1.02]`}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/images/harvest-team-bg.jpg';
                                }}
                              />
                              
                              {/* Hover Play / Open indicator if liveUrl exists */}
                              {project.liveUrl && project.liveUrl !== '#' && (
                                <div className="absolute inset-0 z-20 bg-slate-950/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs shadow-2xl">
                                    {project.liveUrl.includes('instagram') ? (
                                      <>
                                        <Instagram className="h-4 w-4 text-pink-600" />
                                        <span>Tonton di Instagram Reel</span>
                                      </>
                                    ) : (
                                      <>
                                        <ExternalLink className="h-4 w-4 text-teal-600" />
                                        <span>Buka Tautan Resmi</span>
                                      </>
                                    )}
                                  </span>
                                </div>
                              )}
                              
                            </div>
                          );
                        })()}

                        {/* Slide Thumbnails (Matching User's Thumbnail Mockup Styling Exactly) */}
                        {project.gallery && project.gallery.length > 0 && (
                          <div className={`grid ${project.gallery.length >= 5 ? 'grid-cols-5 gap-3' : 'grid-cols-4 gap-4'} mt-2`}>
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
                                  <img 
                                    src={resolveImageUrl(thumb)} 
                                    alt="Thumbnail" 
                                    referrerPolicy="no-referrer"
                                    className={`w-full h-full rounded-[1.1rem] ${
                                      thumb.includes('logo') || thumb.includes('spanduk') || thumb.includes('poster')
                                        ? 'object-contain p-1.5 bg-white' 
                                        : 'object-cover'
                                    }`} 
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = '/images/harvest-team-bg.jpg';
                                    }}
                                  />
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
                          </div>
                          
                          <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans pt-2 whitespace-pre-line space-y-3">
                            {project.fullDescription}
                          </div>
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

                        {/* Direct Action Link if liveUrl exists */}
                        {project.liveUrl && project.liveUrl !== '#' && (
                          <div className="pt-1">
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-2xl font-bold text-sm shadow-md transition-all hover:scale-[1.01] cursor-pointer ${
                                project.liveUrl.includes('instagram')
                                  ? 'bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 shadow-pink-500/20'
                                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-500/20'
                              }`}
                            >
                              {project.liveUrl.includes('instagram') ? (
                                <Instagram className="h-4 w-4 text-white" />
                              ) : (
                                <ExternalLink className="h-4 w-4" />
                              )}
                              <span>
                                {project.liveUrl.includes('instagram')
                                  ? 'Tonton Reel Resmi di Instagram'
                                  : (project.liveUrl.includes('drive.google.com') ? 'Buka Tutorial di Google Drive' : 'Kunjungi Web / Sistem Resmi')}
                              </span>
                              <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                            </a>
                          </div>
                        )}

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
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 animate-fade-in" id="about-section">
            
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

            {/* Main Pembina Lab Card (Prof Indrarini) - Highlighted size */}
            {(() => {
              const mentor = teamList.find(m => m.role === 'Pembina Lab' || m.role === 'Mentor');
              if (!mentor) return null;
              const pilrekUrl = mentor.profileUrl || 'https://www.instagram.com/indrarini_dya/';
              return (
                <div className="mx-auto max-w-3xl bg-white border border-slate-100 p-6 sm:p-8 rounded-3xl mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden shadow-sm group">
                  
                  {/* Mentor Graphic Avatar section matching real photo */}
                  <div className="relative w-44 h-52 shrink-0 rounded-2xl overflow-hidden shadow-md group/avatar block border border-slate-100">
                    <TeamAvatar id={mentor.id} name={mentor.name} className="w-full h-full group-hover/avatar:scale-105 transition-transform duration-300" />
                  </div>

                  <div className="flex-1 space-y-3 text-left">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="rounded bg-pink-50 border border-pink-200 px-2.5 py-0.5 font-sans text-xs font-bold text-pink-700 uppercase tracking-wider">
                          {mentor.role}
                        </span>
                        <span className="text-slate-400 font-sans text-xs font-semibold">PEMBINA LAB SMART GROW</span>
                      </div>
                      <h2 className="font-display text-xl font-bold text-slate-900">
                        {mentor.name}
                      </h2>
                      <p className="font-sans text-xs font-bold text-teal-600 mt-1">{mentor.email}</p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                      {mentor.bio}
                    </p>

                    <div className="pt-1">
                      <a
                        href={pilrekUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-100 border border-pink-200 text-pink-700 font-sans font-bold text-xs transition-all shadow-2xs group/btn cursor-pointer"
                      >
                        <Instagram className="h-3.5 w-3.5 text-pink-600" />
                        <span>Lihat Profil Instagram (@indrarini_dya)</span>
                        <ExternalLink className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>

                    {/* Skills badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {mentor.skills.map(s => (
                        <span key={s} className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-0.5 font-sans text-[11px] text-slate-600 font-medium">
                          #{s.toLowerCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Asisten Utama Laboratorium */}
            {(() => {
              const assistant = teamList.find(m => m.id === 'member-azliny' || m.role.toLowerCase().includes('asisten'));
              if (!assistant) return null;
              return (
                <div className="mx-auto max-w-3xl bg-white border border-slate-100 p-5 sm:p-6 rounded-3xl mb-8 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden shadow-sm">
                  <div className="relative w-36 h-44 shrink-0 rounded-2xl overflow-hidden shadow-md">
                    <TeamAvatar id={assistant.id} name={assistant.name} className="w-full h-full" />
                  </div>
                  <div className="flex-1 space-y-2 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="rounded bg-amber-50 border border-amber-200 px-2.5 py-0.5 font-sans text-xs font-bold text-amber-700 uppercase tracking-wider">
                        {assistant.role}
                      </span>
                      <span className="text-slate-400 font-sans text-xs font-semibold">KOORDINATOR RISET & OPERASIONAL</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-slate-900">{assistant.name}</h3>
                    <p className="font-sans text-xs font-bold text-teal-600">{assistant.email}</p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">{assistant.bio}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {assistant.skills.map(s => (
                        <span key={s} className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-0.5 font-sans text-[11px] text-slate-600 font-medium">
                          #{s.toLowerCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Mahasiswa Magang Riset (9 Mahasiswa) */}
            <div className="mb-14">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-slate-200 pb-3">
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                    <span>Mahasiswa Magang Riset</span>
                    <span className="rounded-full bg-teal-100 text-teal-800 text-xs font-mono font-bold px-2.5 py-0.5">
                      {teamList.filter(m => m.role !== 'Pembina Lab' && m.role !== 'Mentor' && !m.role.toLowerCase().includes('asisten') && !m.role.toLowerCase().includes('alumni')).length} Mahasiswa
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">
                    Mahasiswa multidisiplin aktif dalam program riset dan pengembangan inovasi Smart Grow Laboratory
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {teamList.filter(m => 
                  m.role !== 'Pembina Lab' && 
                  m.role !== 'Mentor' && 
                  !m.role.toLowerCase().includes('asisten') && 
                  !m.role.toLowerCase().includes('alumni')
                ).map((member) => (
                  <div 
                    key={member.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-teal-500/20"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden shadow-xs">
                        <TeamAvatar id={member.id} name={member.name} className="w-full h-full" />
                        <div className="absolute top-2 left-2 z-10 max-w-[88%]">
                          <span className="inline-block rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700/60 px-2.5 py-0.5 font-sans text-[11px] font-bold text-teal-300 uppercase tracking-wider shadow-md truncate">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                          {member.name}
                        </h3>
                        <p className="font-sans text-xs text-slate-400 mt-0.5 break-all font-semibold">{member.email}</p>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-3">
                        {member.bio}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1">
                      {member.skills.slice(0, 4).map(skill => (
                        <span key={skill} className="text-[11px] font-sans text-teal-700 bg-teal-50/80 px-2 py-0.5 rounded font-semibold">
                          #{skill.toLowerCase().replace(/\s+/g, '')}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alumni Riset (6 Alumni) */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-slate-200 pb-3">
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                    <span>Alumni Riset Smart Grow Lab</span>
                    <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold px-2.5 py-0.5">
                      {teamList.filter(m => m.role.toLowerCase().includes('alumni')).length} Alumni
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 font-sans mt-0.5">
                    Alumni peneliti dan pengembang sistem inovasi pertanian cerdas di Smart Grow Laboratory
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {teamList.filter(m => m.role.toLowerCase().includes('alumni')).map((member) => (
                  <div 
                    key={member.id}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:border-emerald-500/20"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden shadow-xs">
                        <TeamAvatar id={member.id} name={member.name} className="w-full h-full" />
                        <div className="absolute top-2 left-2 z-10 max-w-[88%]">
                          <span className="inline-block rounded-full bg-emerald-950/85 backdrop-blur-md border border-emerald-700/60 px-2.5 py-0.5 font-sans text-[11px] font-bold text-emerald-300 uppercase tracking-wider shadow-md truncate">
                            {member.role}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                          {member.name}
                        </h3>
                        <p className="font-sans text-xs text-slate-400 mt-0.5 break-all font-semibold">{member.email}</p>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-3">
                        {member.bio}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1">
                      {member.skills.filter(s => s !== 'Alumni').slice(0, 4).map(skill => (
                        <span key={skill} className="text-[11px] font-sans text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded font-semibold">
                          #{skill.toLowerCase().replace(/\s+/g, '')}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
                    <span>Ajukan Kolaborasi Riset</span>
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

      {/* --- PROJECT IMAGE LIGHTBOX MODAL (BUKA GAMBAR) --- */}
      {projectLightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 animate-fade-in"
          onClick={() => setProjectLightboxImage(null)}
        >
          <div 
            className="w-full max-w-4xl flex items-center justify-between text-white py-3 border-b border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                {projectLightboxImage.title}
              </h3>
              {projectLightboxImage.category && (
                <span className="text-xs text-sky-400 font-mono">
                  {projectLightboxImage.category}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={projectLightboxImage.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Buka Ukuran Asli di Tab Baru"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                onClick={() => setProjectLightboxImage(null)}
                className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer"
                title="Tutup Modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div 
            className="w-full flex-1 overflow-auto flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`p-4 sm:p-8 rounded-3xl max-h-[80vh] flex items-center justify-center ${
              projectLightboxImage.url.includes('logo') || projectLightboxImage.title?.toLowerCase().includes('water')
                ? 'bg-white shadow-2xl border-2 border-sky-300/40'
                : 'bg-transparent'
            }`}>
              <img 
                src={projectLightboxImage.url} 
                alt={projectLightboxImage.title}
                className="max-h-[75vh] max-w-[85vw] object-contain drop-shadow-md rounded-xl"
              />
            </div>
          </div>

          <div className="text-center text-xs text-slate-400 font-mono py-2">
            Klik di luar gambar atau tombol silang untuk menutup
          </div>
        </div>
      )}

      {/* --- FLOATING JOIN US MODAL DIALOG --- */}
      {joinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm animate-fade-in" id="join-modal-wrapper">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-2xl">
            <div className="absolute top-0 right-0 h-32 w-32 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">

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
