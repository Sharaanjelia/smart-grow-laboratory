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
import AttendanceView from './AttendanceView';
import { 
  Clock, 
  CheckSquare, 
  FolderKanban, 
  Megaphone, 
  UserCheck, 
  CheckCircle2, 
  Upload, 
  Github, 
  FileText, 
  Send, 
  AlertCircle, 
  X, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface StudentDashboardProps {
  currentUser: User;
  activeTab: string;
  tasks: Task[];
  attendance: AttendanceRecord[];
  projects: LmsProject[];
  announcements: Announcement[];
  onCheckIn: (studentId: string, studentName: string) => void;
  onCheckOut: (studentId: string) => void;
  onSubmitTaskProgress: (
    taskId: string, 
    notes: string, 
    links: { github?: string; docs?: string; fileUrl?: string }
  ) => void;
  darkMode?: boolean;
  language?: 'id' | 'en';
}

export default function StudentDashboard({
  currentUser,
  activeTab,
  tasks,
  attendance,
  projects,
  announcements,
  onCheckIn,
  onCheckOut,
  onSubmitTaskProgress,
  darkMode = false,
  language = 'id'
}: StudentDashboardProps) {
  const myTasks = tasks.filter(t => t.assignedStudentId === currentUser.id || t.assignedStudentName === currentUser.name);
  const myProjects = projects.filter(p => p.assignedStudentIds?.includes(currentUser.id) || p.title.includes('IoT') || p.title.includes('Hydroponic'));

  const today = new Date().toISOString().split('T')[0];
  const myTodayAtt = attendance.find(a => a.studentId === currentUser.id && (a.date === '2026-07-22' || a.date === today));

  const [submitTaskModal, setSubmitTaskModal] = useState<Task | null>(null);
  const [selectedTaskForRevision, setSelectedTaskForRevision] = useState<Task | null>(null);
  const [notes, setNotes] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [docsUrl, setDocsUrl] = useState('');

  const handleProgressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitTaskModal) return;

    onSubmitTaskProgress(
      submitTaskModal.id, 
      notes, 
      { github: githubUrl, docs: docsUrl }
    );

    setSubmitTaskModal(null);
    setNotes('');
    setGithubUrl('');
    setDocsUrl('');
  };

  return (
    <div className="space-y-8 font-sans text-slate-800 dark:text-slate-100">
      
      {/* Student Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
            <UserCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Portal Mahasiswa Magang</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Selamat Datang, {currentUser.name}!
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90">
            NIM: <span className="font-mono font-bold text-emerald-300">{currentUser.studentId || '1301210042'}</span> | {currentUser.institution || 'Telkom University'}
          </p>
        </div>

        {/* Live Attendance Widget */}
        <div className="p-5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md text-white space-y-3 min-w-[260px] shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase font-bold text-emerald-200">Presensi Hari Ini</span>
            <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded ${
              myTodayAtt?.status === 'present' ? 'bg-emerald-500 text-white' :
              myTodayAtt?.status === 'late' ? 'bg-amber-500 text-white' : 'bg-slate-700 text-slate-200'
            }`}>
              {myTodayAtt?.status === 'present' ? 'Hadir' : myTodayAtt?.status === 'late' ? 'Terlambat' : 'Belum Check-in'}
            </span>
          </div>

          <div className="text-xs">
            {myTodayAtt?.checkInTime ? (
              <p>Check-in jam <span className="font-mono font-bold text-emerald-300">{myTodayAtt.checkInTime}</span></p>
            ) : (
              <p className="text-emerald-100/80">Anda belum melakukan presensi hari ini.</p>
            )}
          </div>

          {myTodayAtt?.checkInTime ? (
            <button
              onClick={() => onCheckOut(currentUser.id)}
              disabled={!!myTodayAtt.checkOutTime}
              className="w-full py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              {myTodayAtt.checkOutTime ? `Check Out Jam ${myTodayAtt.checkOutTime}` : 'Check Out Sekarang'}
            </button>
          ) : (
            <button
              onClick={() => onCheckIn(currentUser.id, currentUser.name)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Check In Presensi Hari Ini
            </button>
          )}
        </div>
      </div>

      {/* VIEW: OVERVIEW / TASKS */}
      {(activeTab === 'overview' || activeTab === 'tasks') && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-display">Tugas Magang Saya</h2>
            <p className="text-xs text-slate-500">Alur Kerja: Belum Dimulai &rarr; Dalam Proses &rarr; Review &rarr; Revisi &rarr; Selesai</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myTasks.map(task => (
              <div 
                key={task.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 hover:border-[#2E7D32] transition-all space-y-4 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      task.priority === 'urgent' ? 'bg-rose-100 text-rose-800' :
                      task.priority === 'high' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      Prioritas: {task.priority}
                    </span>

                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      task.status === 'completed' ? 'bg-emerald-100 text-[#2E7D32]' :
                      task.status === 'review' ? 'bg-sky-100 text-blue-800' :
                      task.status === 'revision' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {task.status === 'completed' ? 'Selesai' : task.status === 'review' ? 'Menunggu Review' : task.status === 'revision' ? 'Memerlukan Revisi' : 'Dalam Proses'}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{task.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{task.description}</p>

                  {task.status === 'revision' && (
                    <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold font-mono">Instruksi Revisi Asisten:</span>
                        <button 
                          onClick={() => setSelectedTaskForRevision(task)} 
                          className="text-[10px] font-bold text-amber-800 dark:text-amber-300 underline flex items-center gap-1"
                        >
                          <RotateCcw className="h-3 w-3" />
                          <span>Tabel Histori Revisi</span>
                        </button>
                      </div>
                      <p>{task.feedback || 'Silakan lakukan perbaikan berkas & kodenya.'}</p>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 space-y-3 text-xs">
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Deadline: {task.deadline}</span>
                    <span>Assigned by: {task.assignedBy}</span>
                  </div>

                  {task.status !== 'completed' && (
                    <button
                      onClick={() => setSubmitTaskModal(task)}
                      className="w-full py-2.5 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      <span>{task.status === 'revision' ? 'Kirimkan Ulang Hasil Perbaikan' : 'Submit Progress untuk Review'}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* VIEW: RESEARCH PROJECTS */}
      {(activeTab === 'overview' || activeTab === 'projects') && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 font-display">Proyek Riset IoT Saya</h2>
            <p className="text-xs text-slate-500">Tim pengembang hardware & repositori kode sumber</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myProjects.map(proj => (
              <div key={proj.id} className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 space-y-4 shadow-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-blue-600 font-bold uppercase">{proj.category}</span>
                    <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{proj.title}</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#2E7D32] font-mono text-[10px] font-bold">
                    {proj.status}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{proj.description}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-500">Progress Capaian:</span>
                    <span className="text-[#2E7D32] font-bold">{proj.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                    <div className="h-full bg-[#2E7D32]" style={{ width: `${proj.progressPercent}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: ATTENDANCE */}
      {activeTab === 'attendance' && (
        <AttendanceView attendance={attendance} currentUser={currentUser} darkMode={darkMode} />
      )}

      {/* VIEW: ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-slate-100">Pengumuman Resmi Laboratorium</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {announcements.map(ann => (
              <div key={ann.id} className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-3 shadow-xs">
                <span className="text-[10px] font-mono text-blue-600 uppercase font-bold">{ann.priority}</span>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">{ann.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{ann.content}</p>
                <span className="text-[10px] font-mono text-slate-400 block pt-2 border-t border-slate-100 dark:border-slate-700">
                  Dipublikasikan oleh: {ann.authorName} ({ann.date})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: PROFILE */}
      {activeTab === 'profile' && (
        <ProfileView currentUser={currentUser} darkMode={darkMode} />
      )}

      {/* SUBMIT PROGRESS MODAL */}
      {submitTaskModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-6 space-y-5 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Submit Hasil Pekerjaan Tugas</h3>
              <button onClick={() => setSubmitTaskModal(null)} className="text-slate-400 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleProgressSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-200 mb-1 font-bold">Catatan Laporan & Rincian Perubahan</label>
                <textarea 
                  rows={4}
                  required
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Jelaskan secara rinci hasil pengujian hardware, kalibrasi sensor, atau perubahan kode..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-200 mb-1 font-bold">Link Repositori GitHub (Opsional)</label>
                <input 
                  type="url"
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-200 mb-1 font-bold">Link Dokumen Google Docs / Laporan PDF (Opsional)</label>
                <input 
                  type="url"
                  value={docsUrl}
                  onChange={e => setDocsUrl(e.target.value)}
                  placeholder="https://docs.google.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-bold cursor-pointer shadow-md"
              >
                Kirimkan ke Asisten untuk Diverifikasi
              </button>
            </form>
          </div>
        </div>
      )}

      {/* REVISION SYSTEM MODAL */}
      {selectedTaskForRevision && (
        <RevisionDetailModal
          task={selectedTaskForRevision}
          onClose={() => setSelectedTaskForRevision(null)}
          isAssistant={false}
          darkMode={darkMode}
        />
      )}

    </div>
  );
}
