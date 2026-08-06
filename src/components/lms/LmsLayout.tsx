import React, { useState } from 'react';
import { User, UserRole, LmsNotification } from '../../types';
import { initialUsers } from '../../data/lmsData';
import Logo from '../Logo';
import { 
  LayoutDashboard, 
  Users, 
  CheckSquare, 
  Clock, 
  FolderKanban, 
  Megaphone, 
  FileCheck2, 
  BarChart3, 
  LogOut, 
  Bell, 
  ChevronDown, 
  ShieldCheck, 
  GraduationCap, 
  Briefcase, 
  UserCheck, 
  ExternalLink, 
  Menu, 
  X, 
  FileText, 
  Settings, 
  History,
  CheckCircle2,
  Sparkles,
  Sun,
  Moon,
  Globe
} from 'lucide-react';

interface LmsLayoutProps {
  currentUser: User;
  onSwitchUser?: (user: User) => void;
  onLogout?: () => void;
  onSignOut?: () => void;
  onBackToPublicSite?: () => void;
  onBackToWebsite?: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: LmsNotification[];
  onMarkNotificationRead?: (id: string) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
  language?: 'id' | 'en';
  onToggleLanguage?: () => void;
  children: React.ReactNode;
}

export default function LmsLayout({
  currentUser,
  onSwitchUser,
  onLogout,
  onSignOut,
  onBackToPublicSite,
  onBackToWebsite,
  activeTab,
  setActiveTab,
  notifications,
  onMarkNotificationRead,
  darkMode = false,
  onToggleDarkMode,
  language = 'id',
  onToggleLanguage,
  children
}: LmsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const isID = language === 'id';
  const unreadCount = notifications.filter(n => !n.read).length;

  // Define Navigation Items based on active role & current language
  const getNavItems = (role: UserRole) => {
    switch (role) {
      case 'director':
        return [
          { id: 'overview', label: isID ? 'Dashboard & KPI' : 'Dashboard & KPI', icon: LayoutDashboard },
          { id: 'pending_registrations', label: isID ? 'Persetujuan Pendaftaran' : 'Pending Registrations', icon: ShieldCheck },
          { id: 'interns', label: isID ? 'Monitoring Magang' : 'Internship Monitoring', icon: Users },
          { id: 'attendance', label: isID ? 'Presensi Mahasiswa' : 'Student Attendance', icon: Clock },
          { id: 'projects', label: isID ? 'Proyek Riset' : 'Research Projects', icon: FolderKanban },
          { id: 'approvals', label: isID ? 'Persetujuan Direktur' : 'Approval Requests', icon: FileCheck2 },
          { id: 'reports', label: isID ? 'Laporan Analytics' : 'Reports & Analytics', icon: BarChart3 },
          { id: 'profile', label: isID ? 'Profil Saya' : 'My Profile', icon: UserCheck },
        ];
      case 'assistant':
        return [
          { id: 'overview', label: isID ? 'Dashboard Asisten' : 'Dashboard', icon: LayoutDashboard },
          { id: 'pending_registrations', label: isID ? 'Persetujuan Pendaftaran' : 'Pending Registrations', icon: ShieldCheck },
          { id: 'students', label: isID ? 'Mahasiswa Magang' : 'Internship Students', icon: Users },
          { id: 'tasks', label: isID ? 'Manajemen Tugas' : 'Task Management', icon: CheckSquare },
          { id: 'attendance', label: isID ? 'Presensi & Kehadiran' : 'Attendance Monitor', icon: Clock },
          { id: 'projects', label: isID ? 'Proyek Riset IoT' : 'Project Progress', icon: FolderKanban },
          { id: 'announcements', label: isID ? 'Pengumuman Lab' : 'Announcements', icon: Megaphone },
          { id: 'reports', label: isID ? 'Laporan & Panen' : 'Reports & Yield', icon: BarChart3 },
          { id: 'profile', label: isID ? 'Profil Saya' : 'My Profile', icon: UserCheck },
        ];
      case 'student':
        return [
          { id: 'overview', label: isID ? 'Dashboard Utama' : 'Dashboard', icon: LayoutDashboard },
          { id: 'internship', label: isID ? 'Magang Saya' : 'My Internship', icon: GraduationCap },
          { id: 'attendance', label: isID ? 'Presensi Harian' : 'Attendance', icon: Clock },
          { id: 'tasks', label: isID ? 'Tugas & Progres' : 'Assigned Tasks & Progress', icon: CheckSquare },
          { id: 'announcements', label: isID ? 'Pengumuman Lab' : 'Announcements', icon: Megaphone },
          { id: 'mentor', label: isID ? 'Pembimbing Riset' : 'Mentor', icon: Users },
          { id: 'profile', label: isID ? 'Profil Saya' : 'Profile', icon: UserCheck },
          { id: 'settings', label: isID ? 'Pengaturan' : 'Settings', icon: Settings },
        ];
      case 'admin':
        return [
          { id: 'overview', label: isID ? 'Dashboard Admin' : 'Admin Dashboard', icon: LayoutDashboard },
          { id: 'pending_registrations', label: isID ? 'Persetujuan Pendaftaran' : 'Pending Registrations', icon: ShieldCheck },
          { id: 'users', label: isID ? 'Kelola Pengguna' : 'User Management', icon: Users },
          { id: 'applicants', label: isID ? 'Pendaftaran Magang' : 'Join Submissions', icon: FileText },
          { id: 'content', label: isID ? 'Konten Website' : 'Website Content', icon: Sparkles },
          { id: 'attendance', label: isID ? 'Log Presensi' : 'Attendance Logs', icon: Clock },
          { id: 'logs', label: isID ? 'Audit Sistem' : 'System Audit Logs', icon: History },
          { id: 'settings', label: isID ? 'Pengaturan' : 'Settings', icon: Settings },
          { id: 'profile', label: isID ? 'Profil Saya' : 'My Profile', icon: UserCheck },
        ];
    }
  };

  const navItems = getNavItems(currentUser.role);

  // Role Badge Config
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'director':
        return { 
          label: isID ? 'Direktur Lab' : 'Lab Director', 
          color: darkMode ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700' : 'bg-emerald-50 text-[#355E3B] border-emerald-200', 
          icon: GraduationCap 
        };
      case 'assistant':
        return { 
          label: isID ? 'Asisten Lab' : 'Assistant Manager', 
          color: darkMode ? 'bg-blue-950/80 text-blue-300 border-blue-700' : 'bg-blue-50 text-[#1976D2] border-blue-200', 
          icon: Briefcase 
        };
      case 'student':
        return { 
          label: isID ? 'Mahasiswa Magang' : 'Intern Student', 
          color: darkMode ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700' : 'bg-[#C7D8A8]/30 text-[#355E3B] border-[#C7D8A8]', 
          icon: UserCheck 
        };
      case 'admin':
        return { 
          label: isID ? 'Administrator' : 'Administrator', 
          color: darkMode ? 'bg-purple-950/80 text-purple-300 border-purple-700' : 'bg-purple-50 text-purple-800 border-purple-200', 
          icon: ShieldCheck 
        };
    }
  };

  const roleBadge = getRoleBadge(currentUser.role);
  const RoleIcon = roleBadge.icon;

  return (
    <div className={`min-h-screen flex font-sans selection:bg-[#355E3B] selection:text-white transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#F6F8F2] text-[#1F2937]'
    }`}>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside className={`fixed top-0 bottom-0 left-0 z-50 w-64 border-r flex flex-col justify-between transition-all duration-300 lg:translate-x-0 ${
        darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-[#355E3B] border-[#2D5032] text-white shadow-xl'
      } ${
        sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      }`}>
        
        {/* Brand Header matching main website Logo */}
        <div className={`p-5 border-b flex items-center justify-between ${darkMode ? 'border-slate-800' : 'border-emerald-800/60'}`}>
          <div className="flex items-center">
            <Logo variant="sidebar" />
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/80 hover:text-white p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-4 flex-grow overflow-y-auto space-y-1">
          <div className={`px-3 py-2 text-[10px] font-mono font-bold tracking-wider uppercase ${
            darkMode ? 'text-slate-400' : 'text-[#C7D8A8]'
          }`}>
            {isID ? 'Menu Navigasi Portal' : 'Portal Menu'}
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? darkMode
                      ? 'bg-emerald-600 text-white shadow-md font-extrabold'
                      : 'bg-white text-[#355E3B] shadow-md font-extrabold'
                    : darkMode 
                      ? 'text-slate-300 hover:text-white hover:bg-slate-800' 
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${
                  isActive 
                    ? darkMode ? 'text-white' : 'text-[#355E3B]' 
                    : darkMode ? 'text-slate-400' : 'text-white/80'
                }`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className={`p-4 border-t space-y-2 ${darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-teal-800/80 bg-[#163D3E]/50'}`}>
          <button
            onClick={onBackToWebsite || onBackToPublicSite}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs transition-all cursor-pointer font-medium shadow-sm ${
              darkMode 
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' 
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5 text-white" />
              <span>{isID ? 'Halaman Utama' : 'Public Website'}</span>
            </span>
            <span className="text-[10px] font-mono opacity-80">→</span>
          </button>

          <button
            onClick={onSignOut || onLogout}
            className={`w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
              darkMode 
                ? 'bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border-rose-800' 
                : 'bg-rose-600/90 hover:bg-rose-700 text-white border-rose-500/50 shadow-sm'
            }`}
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>{isID ? 'Keluar (Sign Out)' : 'Sign Out'}</span>
          </button>
        </div>

      </aside>

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <div className="lg:pl-64 flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar Header */}
        <header className={`sticky top-0 z-30 backdrop-blur-md border-b px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 shadow-sm transition-colors duration-300 ${
          darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-[#E5E7EB]'
        }`}>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className={`lg:hidden p-2 rounded-xl border ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-100 border-slate-200 text-slate-700'}`}
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Active Tab Page Indicator */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Portal /</span>
              <span className="text-xs font-bold capitalize font-mono">
                {activeTab.replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Right Header Utilities: Language, Theme Toggle, Role Badge, Notifications, Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Language Switcher Button (ID / EN) */}
            <button
              onClick={onToggleLanguage}
              title="Ganti Bahasa / Switch Language"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
              }`}
            >
              <Globe className="h-3.5 w-3.5 text-[#2E7D32] dark:text-emerald-400" />
              <span>{isID ? '🇮🇩 ID' : '🇬🇧 EN'}</span>
            </button>

            {/* Theme Switcher Button (Dark / Light) */}
            <button
              onClick={onToggleDarkMode}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                darkMode 
                  ? 'bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4 text-slate-700" />}
            </button>

            {/* Active Role Badge */}
            <div className={`hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono font-bold uppercase tracking-wider ${roleBadge.color}`}>
              <RoleIcon className="h-3.5 w-3.5" />
              <span>{roleBadge.label}</span>
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifDropdownOpen(!notifDropdownOpen);
                  setUserDropdownOpen(false);
                }}
                className={`relative p-2 rounded-xl border transition-all cursor-pointer ${
                  darkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#2E7D32] text-[9px] font-bold font-mono text-white flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl p-4 z-50 space-y-3 ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-[#E5E7EB]'
                }`}>
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                    <h4 className="font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2">
                      <Bell className="h-3.5 w-3.5 text-[#2E7D32]" />
                      <span>{isID ? 'Notifikasi' : 'Notifications'} ({unreadCount})</span>
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono">Live Feed</span>
                  </div>

                  <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4">{isID ? 'Belum ada notifikasi baru' : 'No notifications yet'}</p>
                    ) : (
                      notifications.map(notif => (
                        <div 
                          key={notif.id}
                          onClick={() => onMarkNotificationRead && onMarkNotificationRead(notif.id)}
                          className={`p-3 rounded-xl border text-xs space-y-1 transition-all cursor-pointer ${
                            notif.read
                              ? darkMode ? 'bg-slate-800/50 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
                              : darkMode ? 'bg-emerald-950/60 border-emerald-800 text-slate-200' : 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold">{notif.title}</span>
                            <span className="text-[9px] font-mono text-slate-400">{notif.date}</span>
                          </div>
                          <p className="text-[11px] leading-relaxed text-slate-400">{notif.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Navigation Button & Clean Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setActiveTab('profile');
                  setUserDropdownOpen(!userDropdownOpen);
                  setNotifDropdownOpen(false);
                }}
                title={isID ? 'Buka Profil Saya' : 'Open My Profile'}
                className={`flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-[#2E7D32] text-white border-[#2E7D32] shadow-md'
                    : darkMode 
                      ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200' 
                      : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <img 
                  src={
                    currentUser.avatar && !currentUser.avatar.includes('unsplash.com')
                      ? currentUser.avatar
                      : (currentUser.name || '').toLowerCase().includes('indrarini') ? '/images/team/indrarini.jpg'
                      : (currentUser.name || '').toLowerCase().includes('azliny') ? '/images/team/azliny.jpg'
                      : (currentUser.name || '').toLowerCase().includes('shara') ? '/images/team/shara.jpg'
                      : (currentUser.name || '').toLowerCase().includes('chiko') ? '/images/team/chiko.jpg'
                      : currentUser.avatar || '/images/team/indrarini.jpg'
                  } 
                  alt={currentUser.name || ''}
                  className="w-7 h-7 rounded-lg object-cover ring-2 ring-[#2E7D32]"
                />
                <div className="hidden sm:block text-left">
                  <span className="text-xs font-bold block leading-none truncate max-w-[120px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[9px] font-mono opacity-80 block capitalize mt-0.5">
                    {currentUser.role}
                  </span>
                </div>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </button>

              {userDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-64 rounded-2xl border shadow-2xl p-3 z-50 space-y-2 ${
                  darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-[#E5E7EB]'
                }`}>
                  <div className="p-2 border-b border-slate-200 dark:border-slate-800">
                    <p className="font-bold text-xs">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono truncate">{currentUser.email}</p>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-[#2E7D32] dark:hover:text-emerald-400 transition-all cursor-pointer"
                    >
                      <UserCheck className="h-4 w-4 text-[#2E7D32] dark:text-emerald-400" />
                      <span>{isID ? 'Lihat Profil Saya' : 'View My Profile'}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (onBackToWebsite || onBackToPublicSite) {
                          (onBackToWebsite || onBackToPublicSite)!();
                        }
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 p-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                    >
                      <ExternalLink className="h-4 w-4 text-blue-500" />
                      <span>{isID ? 'Halaman Utama Website' : 'Public Website'}</span>
                    </button>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        if (onSignOut || onLogout) (onSignOut || onLogout)!();
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-all cursor-pointer font-semibold"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>{isID ? 'Keluar (Sign Out)' : 'Sign Out'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </header>

        {/* Dashboard Dynamic Page View Body */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1">
          {children}
        </main>

      </div>

    </div>
  );
}
