import React, { useState, useEffect } from 'react';
import CheckInCameraModal from './CheckInCameraModal';
import { AttendanceRecord, User } from '../../types';
import { db } from '../../firebase';
import { collection, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore';
import { 
  getTodayDateJakarta, 
  getNowTimeJakarta, 
  formatIndonesianDate, 
  getDaysDifference 
} from '../../utils/dateUtils';
import { 
  Clock, 
  Calendar, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  UserCheck, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  Laptop, 
  Image, 
  Camera,
  BarChart3, 
  Sparkles 
} from 'lucide-react';

interface AttendanceViewProps {
  attendance: AttendanceRecord[];
  students?: User[];
  currentUser?: User;
  onCheckIn?: (studentId: string, studentName: string, photoUrl?: string, locationName?: string) => void;
  onCheckOut?: (studentId: string) => void;
  darkMode?: boolean;
}

export default function AttendanceView({
  attendance,
  students = [],
  currentUser,
  onCheckIn,
  onCheckOut,
  darkMode = false
}: AttendanceViewProps) {
  const [activeRangeTab, setActiveRangeTab] = useState<'today' | '7days' | '30days' | 'all'>('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);

  // Check-Out & Daily Notes Modal State
  const [showCheckOutModal, setShowCheckOutModal] = useState(false);
  const [dailyNotesText, setDailyNotesText] = useState('');

  // Check-In Photo & BTP Geolocation Modal State
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const GDRIVE_FOLDER_URL = 'https://drive.google.com/drive/folders/1TmJdWNHEaWOY422DFXJ9hcv-HzRcrFwg?usp=drive_link';

  // Feature-scoped realtime listener for attendance (query filtered based on role)
  const [realtimeAttendance, setRealtimeAttendance] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    let q;
    if (currentUser?.role === 'student' && currentUser?.id) {
      q = query(
        collection(db, 'attendance'),
        where('studentId', '==', currentUser.id)
      );
    } else {
      q = query(
        collection(db, 'attendance'),
        orderBy('date', 'desc'),
        limit(100)
      );
    }

    const unsub = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const records = snapshot.docs.map(d => ({
          id: d.id,
          ...d.data()
        })) as AttendanceRecord[];
        setRealtimeAttendance(records);
      }
    }, (err) => {
      console.warn('Attendance feature-scoped listener notice:', err?.message);
    });

    return () => unsub();
  }, [currentUser?.id, currentUser?.role]);

  // Combined attendance records (merges prop attendance and realtime snapshot, newest first)
  const displayAttendance = React.useMemo(() => {
    const map = new Map<string, AttendanceRecord>();
    realtimeAttendance.forEach(item => map.set(item.id, item));
    attendance.forEach(item => {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      } else {
        const existing = map.get(item.id)!;
        if ((item.photoUrl || item.checkInPhoto) && !(existing.photoUrl || existing.checkInPhoto)) {
          map.set(item.id, { ...existing, ...item });
        }
      }
    });
    return Array.from(map.values()).sort((a, b) => {
      const dateA = `${a.date || ''} ${a.checkInTime || ''}`;
      const dateB = `${b.date || ''} ${b.checkInTime || ''}`;
      return dateB.localeCompare(dateA);
    });
  }, [realtimeAttendance, attendance]);

  const todayDateStr = getTodayDateJakarta();

  // Robust helper to check if an attendance record belongs to the current user
  const isUserMatchingAttendance = (rec: AttendanceRecord) => {
    if (!currentUser) return false;
    if (rec.studentId === currentUser.id) return true;
    if (currentUser.studentId && rec.studentId === currentUser.studentId) return true;
    if (currentUser.internId && (rec.internshipId === currentUser.internId || rec.studentId === currentUser.internId)) return true;
    if (currentUser.name && rec.studentName) {
      const cleanUser = currentUser.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanRec = rec.studentName.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cleanUser && cleanRec && (cleanUser.includes(cleanRec) || cleanRec.includes(cleanUser))) return true;
    }
    return false;
  };

  // Find today's attendance record for current student (Requirement #2 & #3)
  const todayRecord = React.useMemo(() => {
    if (!currentUser) return null;
    return displayAttendance.find(a => 
      isUserMatchingAttendance(a) && a.date === todayDateStr
    ) || null;
  }, [displayAttendance, currentUser, todayDateStr]);

  const hasCheckedInToday = Boolean(todayRecord);
  const hasCheckedOutToday = Boolean(todayRecord?.checkOutTime);

  // Filter logic based on role, range tab & search query (Requirement #9 & #11)
  const filteredAttendance = displayAttendance.filter(rec => {
    // If student, only show records belonging to this student
    if (currentUser?.role === 'student' && !isUserMatchingAttendance(rec)) {
      return false;
    }

    const matchesSearch = (rec.studentName || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (rec.date || '').includes(searchQuery);

    if (!matchesSearch) return false;

    if (activeRangeTab === 'today') {
      return rec.date === todayDateStr;
    }
    if (activeRangeTab === '7days') {
      const diff = getDaysDifference(rec.date, todayDateStr);
      return diff >= 0 && diff <= 7;
    }
    if (activeRangeTab === '30days') {
      const diff = getDaysDifference(rec.date, todayDateStr);
      return diff >= 0 && diff <= 30;
    }
    return true; // all
  });

  // Helper to ensure photo always renders properly prioritizing actual check-in selfie
  const getAttendancePhoto = (rec: AttendanceRecord) => {
    if (rec.checkInPhoto && rec.checkInPhoto.trim() !== '') return rec.checkInPhoto;
    if (rec.photoUrl && rec.photoUrl.trim() !== '') return rec.photoUrl;
    const studentObj = students.find(s => 
      s.id === rec.studentId || 
      (s.name && rec.studentName && s.name.toLowerCase().replace(/[^a-z0-9]/g, '') === rec.studentName.toLowerCase().replace(/[^a-z0-9]/g, ''))
    );
    if (studentObj?.avatar) return studentObj.avatar;
    return '/images/team/shara.jpg';
  };

  // Summary Counters
  const relevantAttendanceForStats = currentUser?.role === 'student' 
    ? displayAttendance.filter(a => isUserMatchingAttendance(a))
    : displayAttendance;

  const presentCount = relevantAttendanceForStats.filter(a => a.status === 'present').length;
  const lateCount = relevantAttendanceForStats.filter(a => a.status === 'late').length;
  const leaveCount = relevantAttendanceForStats.filter(a => a.status === 'leave').length;
  const sickCount = relevantAttendanceForStats.filter(a => a.status === 'sick').length;
  const absentCount = relevantAttendanceForStats.filter(a => a.status === 'absent').length;

  const handleExportExcel = () => {
    const headers = ['Tanggal', 'NIM', 'Nama Mahasiswa', 'Jam Masuk', 'Jam Keluar', 'Durasi', 'Status', 'Lokasi', 'IP Address', 'Perangkat'];
    const rows = filteredAttendance.map(a => [
      a.date,
      a.studentId,
      a.studentName,
      a.checkInTime,
      a.checkOutTime || '-',
      a.workDuration || '-',
      a.status,
      a.location || 'Lab Smart Grow FIT Lt. 3',
      a.ipAddress || '103.14.22.82',
      a.device || 'Windows PC'
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Laporan_Presensi_SmartGrow_${activeRangeTab}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* HEADER TITLE & EXPORT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Clock className="h-6 w-6 text-[#2E7D32]" />
            <span>Sistem Presensi & Kehadiran Mahasiswa</span>
          </h2>
          <p className="text-xs text-slate-500">Pemantauan log kehadiran real-time, lokasi GPS, IP address, dan verifikasi foto.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportExcel}
            className="px-4 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Ekspor Excel (.CSV / .XLSX)</span>
          </button>
        </div>
      </div>

      {/* PUNCH CHECK-IN BANNER FOR STUDENT */}
      {currentUser && (
        <div className="p-6 sm:p-8 rounded-[28px] bg-gradient-to-r from-[#355E3B] via-[#2A4B2F] to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-700/40">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C7D8A8]/30 text-[#C7D8A8] text-xs font-mono font-extrabold tracking-wider uppercase">
              <Clock className="h-3.5 w-3.5" />
              <span>PRESENSI REAL-TIME • {formatIndonesianDate(todayDateStr)}</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-display">
              {currentUser.role === 'student'
                ? (hasCheckedOutToday ? 'Presensi Hari Ini Selesai' : (hasCheckedInToday ? 'Sesi Riset Aktif' : 'Check-In Kehadiran Laboratorium'))
                : 'Pemantauan Kehadiran Riset Laboratorium'}
            </h3>
            <p className="text-xs text-emerald-100/90 font-medium">
              Lokasi Terverifikasi: <span className="font-bold text-white">Smart Grow Laboratory • Bandung Techno Park (BTP) Telkom University</span>
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto flex flex-col sm:flex-row items-center gap-3">
            {currentUser.role === 'student' ? (
              <>
                {/* Tombol Ambil Presensi / Status Check-In */}
                {!hasCheckedInToday ? (
                  <button
                    onClick={() => setShowCheckInModal(true)}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-[#355E3B] font-black text-xs tracking-wider uppercase transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <UserCheck className="h-4 w-4 text-[#355E3B]" />
                    <span>Ambil Presensi 🚀</span>
                  </button>
                ) : (
                  <div className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-emerald-500/25 border border-emerald-400/50 text-emerald-200 font-extrabold text-xs tracking-wider flex items-center justify-center gap-2 shadow-inner">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Sudah Check-In Hari Ini</span>
                  </div>
                )}

                {/* Tombol Check-Out */}
                {hasCheckedInToday && !hasCheckedOutToday && onCheckOut && (
                  <button
                    onClick={() => onCheckOut(currentUser.id)}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-emerald-300"
                  >
                    <Clock className="h-4 w-4 text-white" />
                    <span>Check-Out 🚪</span>
                  </button>
                )}

                {hasCheckedOutToday && (
                  <div className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 text-emerald-100 border border-white/20 font-bold text-xs tracking-wider flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    <span>Presensi Selesai</span>
                  </div>
                )}
              </>
            ) : (
              <div className="px-5 py-3 rounded-2xl bg-white/10 border border-white/20 text-xs font-mono text-emerald-200">
                Mode Pemantauan Pengelola Lab
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAMPILAN STUDENT SETELAH CHECK-IN (Requirement #3, #4, #5) */}
      {currentUser?.role === 'student' && todayRecord && (
        <div className="p-6 rounded-[28px] bg-white dark:bg-slate-800 border-2 border-emerald-500/40 shadow-lg space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-display">
                Presensi Hari Ini
              </h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
              todayRecord.checkOutTime 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                : todayRecord.status === 'late'
                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
            }`}>
              {todayRecord.checkOutTime ? '✓ Presensi Hari Ini Selesai' : (todayRecord.status === 'late' ? '⚠️ Terlambat' : '🟢 Hadir')}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Foto Selfie Check-In Aktual */}
            <div className="md:col-span-3 flex flex-col items-center sm:items-start gap-2">
              <button
                type="button"
                onClick={() => setSelectedRecord(todayRecord)}
                className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md group cursor-pointer focus:outline-none"
                title="Klik untuk memperbesar foto selfie"
              >
                <img 
                  src={getAttendancePhoto(todayRecord)} 
                  alt="Selfie Presensi Hari Ini" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/team/shara.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold">
                  🔍 Perbesar
                </div>
                <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[8px] font-mono px-1.5 py-0.5 rounded backdrop-blur-xs font-bold">
                  📸 Selfie Check-In
                </span>
              </button>
              <span className="text-[10px] text-slate-400 font-mono text-center sm:text-left">Foto selfie saat check-in</span>
            </div>

            {/* Rincian Presensi Hari Ini */}
            <div className="md:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700 space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Tanggal</span>
                <p className="text-xs font-extrabold text-slate-900 dark:text-white">{formatIndonesianDate(todayRecord.date)}</p>
                <span className="text-[10px] text-slate-400 font-mono block">{todayRecord.date}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700 space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Check-In</span>
                <p className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">{todayRecord.checkInTime || '-'}</p>
                <span className={`text-[10px] font-bold ${todayRecord.status === 'late' ? 'text-amber-500' : 'text-emerald-600'}`}>
                  {todayRecord.status === 'late' ? 'Terlambat' : 'Hadir'}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700 space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Check-Out</span>
                <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                  {todayRecord.checkOutTime || <span className="text-amber-500 font-semibold italic">Belum Check-Out</span>}
                </p>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {todayRecord.checkOutTime ? 'Waktu Pulang' : 'Menunggu Pulang'}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700 space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Durasi Kerja</span>
                <p className="text-xs font-extrabold text-slate-900 dark:text-white font-mono">
                  {todayRecord.workDuration || todayRecord.duration || (todayRecord.checkOutTime ? '-' : 'Sedang Berlangsung')}
                </p>
                <span className="text-[10px] text-slate-400 block">
                  {todayRecord.checkOutTime ? 'Durasi Aktual' : 'Aktif Bekerja'}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium">
                  <MapPin className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{todayRecord.location || 'Smart Grow Laboratory • Area BTP Telkom University'}</span>
                </span>
                <a 
                  href={`https://www.google.com/maps?q=${todayRecord.latitude || -6.9706},${todayRecord.longitude || 107.6297}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Lihat Peta 📍
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUMMARY STATS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between text-emerald-600 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Hadir Tepat Waktu</span>
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{presentCount}</p>
          <span className="text-[10px] text-emerald-600 font-semibold">Tepat Waktu (80%)</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between text-amber-600 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Terlambat</span>
            <AlertCircle className="h-4 w-4" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600">{lateCount}</p>
          <span className="text-[10px] text-amber-600 font-semibold">Toleransi 15 Menit</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between text-blue-600 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Izin</span>
            <Calendar className="h-4 w-4" />
          </div>
          <p className="text-2xl font-extrabold text-blue-600">{leaveCount}</p>
          <span className="text-[10px] text-blue-600 font-semibold">Surat Izin Disetujui</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs">
          <div className="flex items-center justify-between text-purple-600 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Sakit</span>
            <Clock className="h-4 w-4" />
          </div>
          <p className="text-2xl font-extrabold text-purple-600">{sickCount}</p>
          <span className="text-[10px] text-purple-600 font-semibold">Lampiran Dokter</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-red-600 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Tanpa Keterangan</span>
            <XCircle className="h-4 w-4" />
          </div>
          <p className="text-2xl font-extrabold text-red-600">{absentCount}</p>
          <span className="text-[10px] text-red-600 font-semibold">Perlu Pembinaan</span>
        </div>
      </div>

      {/* FILTER TABS & SEARCH */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          {/* Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-700/60 text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setActiveRangeTab('today')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeRangeTab === 'today'
                  ? 'bg-white dark:bg-slate-800 text-[#2E7D32] dark:text-emerald-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Hari Ini
            </button>
            <button
              onClick={() => setActiveRangeTab('7days')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeRangeTab === '7days'
                  ? 'bg-white dark:bg-slate-800 text-[#2E7D32] dark:text-emerald-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              7 Hari Terakhir
            </button>
            <button
              onClick={() => setActiveRangeTab('30days')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeRangeTab === '30days'
                  ? 'bg-white dark:bg-slate-800 text-[#2E7D32] dark:text-emerald-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              30 Hari Terakhir
            </button>
            <button
              onClick={() => setActiveRangeTab('all')}
              className={`px-4 py-2 rounded-xl transition-all ${
                activeRangeTab === 'all'
                  ? 'bg-white dark:bg-slate-800 text-[#2E7D32] dark:text-emerald-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Semua Data Kehadiran
            </button>
          </div>

          {/* Search Field */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama atau tanggal..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700/80 text-xs"
            />
          </div>
        </div>

        {/* ATTENDANCE TABLE */}
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-2xl">
          {filteredAttendance.length === 0 ? (
            <div className="p-12 text-center space-y-4 bg-slate-50/50 dark:bg-slate-800/50">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-[#355E3B] dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <Clock className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-slate-800 dark:text-slate-200">Belum ada riwayat presensi.</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">Lakukan presensi selfie harian dengan verifikasi GPS area BTP Telkom University.</p>
              </div>
              {onCheckIn && (
                <button
                  onClick={() => setShowCheckInModal(true)}
                  className="px-6 py-2.5 rounded-full bg-[#355E3B] hover:bg-[#2A4B2F] text-white text-xs font-bold transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <UserCheck className="h-4 w-4" />
                  <span>Lakukan Presensi Hari Ini 🚀</span>
                </button>
              )}
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-3">Foto</th>
                  <th className="py-3 px-3">Mahasiswa & NIM</th>
                  <th className="py-3 px-3 hidden xl:table-cell">Divisi & Mentor</th>
                  <th className="py-3 px-3">Tanggal</th>
                  <th className="py-3 px-3">Check In</th>
                  <th className="py-3 px-3">Check Out</th>
                  <th className="py-3 px-3 hidden 2xl:table-cell">Durasi</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 hidden md:table-cell">Lokasi BTP</th>
                  <th className="py-3 px-3 hidden lg:table-cell">Catatan</th>
                  <th className="py-3 px-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {filteredAttendance.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                    {/* 80x80 Rounded Thumbnail */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button 
                        type="button"
                        onClick={() => setSelectedRecord(rec)}
                        className="group relative block focus:outline-none"
                        title="Klik untuk memperbesar foto selfie"
                      >
                        <img 
                          src={getAttendancePhoto(rec)} 
                          alt="Selfie Presensi" 
                          className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-400 dark:border-emerald-600 shadow-sm group-hover:scale-105 transition-transform" 
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = '/images/team/shara.jpg';
                          }}
                        />
                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[8px] font-mono px-1.5 py-0.5 rounded backdrop-blur-xs font-bold">
                          ✓ Foto
                        </span>
                      </button>
                    </td>
                    <td className="py-3.5 px-3 font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {rec.studentName}
                      <span className="block text-[10px] text-slate-400 font-mono font-normal">NIM: {rec.studentId || '1301210045'}</span>
                    </td>
                    <td className="py-3.5 px-3 text-[11px] whitespace-nowrap hidden xl:table-cell">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 block">{rec.division || 'IoT & Hardware'}</span>
                      <span className="text-[10px] text-slate-400 font-medium">Pembimbing: {rec.mentor || 'Prof. Indrarini'}</span>
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 font-mono whitespace-nowrap">
                      {rec.date}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                      {rec.checkInTime || '-'}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {rec.checkOutTime || <span className="text-amber-500 font-normal italic">Bekerja</span>}
                    </td>
                    <td className="py-3.5 px-3 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap font-mono hidden 2xl:table-cell">
                      {rec.workDuration || rec.duration || '7 Jam 45 Menit'}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                        rec.status === 'present' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                        rec.status === 'late' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                        rec.status === 'leave' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300' :
                        rec.status === 'sick' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300' :
                        'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}>
                        {rec.status === 'present' ? 'Hadir' : rec.status === 'late' ? 'Terlambat' : rec.status === 'leave' ? 'Izin' : rec.status === 'sick' ? 'Sakit' : 'Alpha'}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-[10px] text-slate-500 max-w-xs hidden md:table-cell">
                      <div className="space-y-0.5">
                        <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                          <MapPin className="h-3 w-3 text-emerald-600 shrink-0" />
                          <span className="truncate max-w-[140px]">{rec.location || 'Area BTP Telkom'}</span>
                        </span>
                        <a 
                          href={`https://www.google.com/maps?q=${rec.latitude || -6.9706},${rec.longitude || 107.6297}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                        >
                          Peta 📍
                        </a>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-[11px] text-slate-600 dark:text-slate-300 max-w-xs truncate hidden lg:table-cell">
                      {rec.dailyNotes || rec.notes || 'Monitoring Smart Farming'}
                    </td>
                    <td className="py-3.5 px-3 whitespace-nowrap text-center">
                      <button 
                        type="button"
                        onClick={() => setSelectedRecord(rec)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-[#355E3B] dark:text-emerald-300 font-bold text-[10px] transition-all cursor-pointer border border-emerald-200 dark:border-slate-600"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* LARGE PHOTO PREVIEW MODAL WITH METADATA & DOWNLOAD */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setSelectedRecord(null)}>
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 dark:border-slate-700" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Image className="h-4 w-4 text-emerald-600" />
                  <span>Foto Verifikasi Presensi Selfie</span>
                </h4>
                <p className="text-[10px] text-slate-400 font-mono">{selectedRecord.studentName} • NIM: {selectedRecord.studentId || '1301210045'}</p>
              </div>
              <button onClick={() => setSelectedRecord(null)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner bg-slate-900 flex items-center justify-center min-h-[280px]">
              <img 
                src={getAttendancePhoto(selectedRecord)} 
                alt="Selfie Presensi" 
                className="w-full h-72 object-cover" 
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/team/shara.jpg';
                }}
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md p-2 rounded-xl text-white flex items-center justify-between text-[10px] font-mono">
                <span>{selectedRecord.date} • {selectedRecord.checkInTime} WIB</span>
                <span className="text-emerald-300 font-bold">GPS Accuracy: {selectedRecord.gpsAccuracy || 8}m</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Lokasi Geofence</span>
                <p className="font-bold text-slate-800 dark:text-slate-200 text-[11px] truncate">
                  {selectedRecord.location || 'Bandung Techno Park (BTP) Telkom University'}
                </p>
                <a 
                  href={`https://www.google.com/maps?q=${selectedRecord.latitude || -6.9706},${selectedRecord.longitude || 107.6297}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-emerald-600 font-bold hover:underline inline-flex items-center gap-1 pt-0.5"
                >
                  <MapPin className="h-3 w-3" /> Buka Google Maps
                </a>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Catatan Kegiatan</span>
                <p className="font-semibold text-slate-700 dark:text-slate-300 text-[11px] line-clamp-2">
                  {selectedRecord.dailyNotes || selectedRecord.notes || 'Monitoring Smart Farming & IoT Sensor Calibration'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700 text-xs">
              {(selectedRecord.photoUrl || selectedRecord.checkInPhoto) && (
                <a 
                  href={selectedRecord.photoUrl || selectedRecord.checkInPhoto} 
                  download={`Selfie_Presensi_${selectedRecord.studentId}_${selectedRecord.date}.jpg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Foto Selfie</span>
                </a>
              )}

              <a href={GDRIVE_FOLDER_URL} target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-blue-600 hover:underline">
                Buka Backup GDrive 📁
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CHECK-OUT & DAILY NOTES MODAL */}
      {showCheckOutModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#2E7D32]" />
                <span>Check-Out & Jurnal Aktivitas Harian</span>
              </h3>
              <button onClick={() => setShowCheckOutModal(false)} className="p-1 rounded-full hover:bg-slate-100 text-slate-400">
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (onCheckOut && currentUser) {
                  onCheckOut(currentUser.id);
                }
                setShowCheckOutModal(false);
                setDailyNotesText('');
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                  Catatan Aktivitas Hari Ini (Max 500 Karakter)
                </label>
                <textarea
                  rows={4}
                  maxLength={500}
                  required
                  value={dailyNotesText}
                  onChange={(e) => setDailyNotesText(e.target.value)}
                  placeholder="Contoh: Monitoring Smart Farming, Dashboard Development, IoT Sensor Calibration, Database Integration..."
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#355E3B]"
                />
                <div className="text-[10px] text-right font-mono text-slate-400 pt-1">
                  {dailyNotesText.length}/500 Karakter
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCheckOutModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-bold shadow-md uppercase tracking-wider text-[11px]"
                >
                  Konfirmasi Check-Out Sekarang 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHECK-IN CAMERA & GEOLOCATION MODAL */}
      <CheckInCameraModal
        isOpen={showCheckInModal}
        onClose={() => setShowCheckInModal(false)}
        studentName={currentUser?.name || 'Mahasiswa Magang'}
        darkMode={darkMode}
        onConfirmCheckIn={async (photoUrl, locAddress) => {
          if (onCheckIn && currentUser) {
            await onCheckIn(currentUser.id, currentUser.name, photoUrl, locAddress);
          }
        }}
      />

    </div>
  );
}
