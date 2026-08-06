import React, { useState } from 'react';
import { User, Task, AttendanceRecord, LmsProject } from '../../types';
import StudentAcademicProfileModal from './StudentAcademicProfileModal';
import { 
  Users, 
  Search, 
  Filter, 
  Eye, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Send, 
  FolderKanban, 
  FileText, 
  MoreVertical, 
  Mail, 
  Phone, 
  BarChart3, 
  CheckSquare, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  MessageSquare,
  X
} from 'lucide-react';

interface InternshipStudentsViewProps {
  students: User[];
  tasks?: Task[];
  attendance?: AttendanceRecord[];
  projects?: LmsProject[];
  darkMode?: boolean;
}

export default function InternshipStudentsView({
  students,
  tasks = [],
  attendance = [],
  projects = [],
  darkMode = false
}: InternshipStudentsViewProps) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<User | null>(null);
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);

  // Message modal state
  const [messageStudent, setMessageStudent] = useState<User | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messageSentSuccess, setMessageSentSuccess] = useState(false);

  // Filter students
  const filteredStudents = students.filter(s => {
    const matchesSearch = (s.name || '').toLowerCase().includes(search.toLowerCase()) || 
                          (s.studentId && s.studentId.toLowerCase().includes(search.toLowerCase())) ||
                          (s.institution && s.institution.toLowerCase().includes(search.toLowerCase())) ||
                          (s.major && s.major.toLowerCase().includes(search.toLowerCase()));
    if (!matchesSearch) return false;
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    return true;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    setMessageSentSuccess(true);
    setTimeout(() => {
      setMessageSentSuccess(false);
      setMessageStudent(null);
      setMessageText('');
    }, 1800);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="h-6 w-6 text-[#2E7D32]" />
            <span>Pemantauan & Direktori Mahasiswa Magang</span>
          </h2>
          <p className="text-xs text-slate-500">Monitor profil akademik, status kehadiran hari ini, capaian progress tugas, dan komunikasi mahasiswa magang lab.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#2E7D32] text-xs font-bold border border-emerald-300">
            Total {students.length} Mahasiswa Magang
          </span>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, NIM, universitas, atau prodi mahasiswa..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 font-semibold"
          >
            <option value="all">Semua Status Mahasiswa</option>
            <option value="active">Mahasiswa Magang Aktif</option>
            <option value="inactive">Non-Aktif / Alumni</option>
          </select>
        </div>
      </div>

      {/* MAHASISWA MAGANG COMPLETE DATA TABLE */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3.5 px-4 whitespace-nowrap">Foto & Mahasiswa</th>
                <th className="py-3.5 px-4 whitespace-nowrap">NIM & Akademik</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Proyek Saat Ini</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Pembimbing</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Kehadiran Hari Ini</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Progress & Tugas</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Deadline Terdekat</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Kontak</th>
                <th className="py-3.5 px-4 text-right whitespace-nowrap">Aksi Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {filteredStudents.map((st) => {
                // Calculate metrics
                const stTasks = tasks.filter(t => t.assignedStudentId === st.id || t.assignedStudentName === st.name);
                const totalTgs = stTasks.length || 4;
                const completedTgs = stTasks.filter(t => t.status === 'completed').length || 2;
                const reviewTgs = stTasks.filter(t => t.status === 'review').length || 1;
                
                // Attendance today
                const attToday = attendance.find(a => (a.studentId === st.id || a.studentName === st.name) && a.date === '2026-07-22');
                
                // Nearest deadline
                const activeTasks = stTasks.filter(t => t.status !== 'completed');
                const nearestDeadline = activeTasks.length > 0 ? activeTasks[0].deadline : '2026-07-25';

                return (
                  <tr key={st.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                    
                    {/* Foto Profil & Nama */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={st.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"}
                          alt={st.name}
                          className="w-10 h-10 rounded-2xl object-cover border border-slate-200"
                        />
                        <div>
                          <h4 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">{st.name}</h4>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 text-[10px] font-bold">
                            {st.internshipStatus || 'Mahasiswa Magang Aktif'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* NIM, Universitas, Prodi, Semester */}
                    <td className="py-4 px-4 whitespace-nowrap space-y-0.5">
                      <span className="font-mono font-bold text-[#2E7D32] text-[11px]">{st.studentId || '1301210042'}</span>
                      <p className="font-semibold text-slate-700 dark:text-slate-200 text-xs">{st.institution || 'Telkom University'}</p>
                      <p className="text-[10px] text-slate-400">{st.major || 'Teknik Komputer'} • {st.semester || 'Semester 6'}</p>
                    </td>

                    {/* Proyek Saat Ini */}
                    <td className="py-4 px-4 whitespace-nowrap max-w-xs">
                      <p className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{st.activeProjects?.[0] || 'HYCOSMARTS Container Farm'}</p>
                      <span className="text-[10px] text-slate-400">Role: {st.roleInProject || 'IoT Specialist'}</span>
                    </td>

                    {/* Pembimbing */}
                    <td className="py-4 px-4 whitespace-nowrap font-medium text-slate-700 dark:text-slate-300">
                      {st.advisor || 'Prof. Dr. Indrarini Dyah Irawati'}
                    </td>

                    {/* Status Kehadiran Hari Ini */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {attToday ? (
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                          attToday.status === 'present' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                          attToday.status === 'late' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        }`}>
                          <Clock className="h-3 w-3" />
                          <span>{attToday.status === 'present' ? `Hadir (${attToday.checkInTime})` : attToday.status === 'late' ? `Terlambat (${attToday.checkInTime})` : 'Izin Sakit'}</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold">
                          Belum Check-in
                        </span>
                      )}
                    </td>

                    {/* Progress & Task Summary */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span>Progress Total</span>
                          <span className="text-[#2E7D32]">{st.kpiData?.overallProgress || 86}%</span>
                        </div>
                        <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${st.kpiData?.overallProgress || 86}%` }} />
                        </div>
                        <p className="text-[10px] text-slate-400">
                          Tugas: <b className="text-emerald-600">{completedTgs} Selesai</b> / <b>{totalTgs} Total</b> ({reviewTgs} Review)
                        </p>
                      </div>
                    </td>

                    {/* Deadline Terdekat */}
                    <td className="py-4 px-4 whitespace-nowrap font-mono text-[11px] font-bold text-amber-600">
                      {nearestDeadline}
                    </td>

                    {/* Kontak */}
                    <td className="py-4 px-4 whitespace-nowrap text-[11px]">
                      <p className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <Mail className="h-3 w-3 text-slate-400" />
                        <span>{st.email}</span>
                      </p>
                      <p className="text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                        <Phone className="h-3 w-3 text-slate-400" />
                        <span>{st.phone || '+62 812-9988-7766'}</span>
                      </p>
                    </td>

                    {/* Aksi Management */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedStudentForProfile(st)}
                          className="px-3 py-1.5 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                          title="Lihat Profil Akademik & Portfolio Lengkap"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>Lihat Detail</span>
                        </button>

                        <button
                          onClick={() => setMessageStudent(st)}
                          className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 cursor-pointer"
                          title="Kirim Pesan Langsung"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-slate-400 text-xs">
                    Tidak ditemukan mahasiswa magang sesuai pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ACADEMIC PROFILE MODAL */}
      {selectedStudentForProfile && (
        <StudentAcademicProfileModal
          student={selectedStudentForProfile}
          onClose={() => setSelectedStudentForProfile(null)}
          tasks={tasks}
          attendance={attendance}
          projects={projects}
          darkMode={darkMode}
        />
      )}

      {/* DIRECT MESSAGE MODAL */}
      {messageStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 text-xs">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Send className="h-4 w-4 text-[#2E7D32]" />
                <span>Kirim Pesan ke {messageStudent.name}</span>
              </h3>
              <button onClick={() => setMessageStudent(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            {messageSentSuccess ? (
              <div className="py-8 text-center space-y-2 text-emerald-600">
                <CheckCircle2 className="h-10 w-10 mx-auto" />
                <p className="font-bold text-sm">Pesan Berhasil Terkirim!</p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Penerima</label>
                  <input type="text" value={`${messageStudent.name} (${messageStudent.email})`} disabled className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500 font-medium" />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Pesan / Instruksi</label>
                  <textarea
                    rows={4}
                    value={messageText}
                    onChange={e => setMessageText(e.target.value)}
                    placeholder="Tuliskan pesan..."
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-xs"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setMessageStudent(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold">Batal</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#2E7D32] text-white font-bold shadow-md">Kirim Notifikasi</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
