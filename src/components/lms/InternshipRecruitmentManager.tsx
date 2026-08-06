import React, { useState } from 'react';
import { ApplicantRecord, SelectionStage } from '../../types';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ChevronRight, 
  Award, 
  UserCheck, 
  Layers, 
  Search, 
  Filter, 
  Sparkles,
  ExternalLink,
  Github,
  Instagram,
  Mail,
  Phone,
  GraduationCap,
  Briefcase
} from 'lucide-react';

interface InternshipRecruitmentManagerProps {
  applicants: ApplicantRecord[];
  onAdvanceStage: (applicantId: string, nextStage: SelectionStage, notes?: string) => void;
  onApproveApplicant: (applicantId: string) => void;
  onRejectApplicant: (applicantId: string) => void;
  darkMode?: boolean;
}

export default function InternshipRecruitmentManager({
  applicants,
  onAdvanceStage,
  onApproveApplicant,
  onRejectApplicant,
  darkMode = false
}: InternshipRecruitmentManagerProps) {
  const [activeStageFilter, setActiveStageFilter] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [stageNotesInput, setStageNotesInput] = useState<{ [key: string]: string }>({});

  const stageLabels: { [key in SelectionStage]: { title: string; desc: string; icon: any; color: string } } = {
    1: { 
      title: 'Tahap 1: Seleksi Berkas', 
      desc: 'Pendaftaran baru & verifikasi dokumen administrasi', 
      icon: FileText,
      color: 'bg-blue-50 text-blue-700 border-blue-200' 
    },
    2: { 
      title: 'Tahap 2: Tes Teknis & Portofolio', 
      desc: 'Uji kompetensi dasar IoT, Software & Agronomy', 
      icon: Layers,
      color: 'bg-purple-50 text-purple-700 border-purple-200' 
    },
    3: { 
      title: 'Tahap 3: Wawancara Pembimbing', 
      desc: 'Wawancara tatap muka/online dengan Asisten & Mentor Lab', 
      icon: UserCheck,
      color: 'bg-amber-50 text-amber-700 border-amber-200' 
    },
    4: { 
      title: 'Tahap 4: Verifikasi Akhir', 
      desc: 'Penetapan posisi & validasi komitmen riset magang', 
      icon: Sparkles,
      color: 'bg-teal-50 text-teal-700 border-teal-200' 
    },
    5: { 
      title: 'Tahap 5: Terbit ID Magang Resmi', 
      desc: 'Keterima magang & penerbitan ID Magang resmi portal LMS', 
      icon: Award,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200' 
    }
  };

  const filteredApplicants = applicants.filter(app => {
    const stageMatch = activeStageFilter === 'all' || (app.stage || 1) === activeStageFilter;
    const searchMatch = 
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.roleInterest.toLowerCase().includes(searchTerm.toLowerCase());
    return stageMatch && searchMatch;
  });

  const totalCount = applicants.length;
  const stage1Count = applicants.filter(a => (a.stage || 1) === 1 && a.status !== 'rejected').length;
  const inProgressCount = applicants.filter(a => (a.stage || 1) >= 2 && (a.stage || 1) <= 4 && a.status !== 'rejected').length;
  const approvedCount = applicants.filter(a => (a.stage || 1) === 5 || a.status === 'approved').length;

  return (
    <div className="space-y-6 font-sans text-slate-800 dark:text-slate-100">
      
      {/* HEADER BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
            <GraduationCap className="h-3.5 w-3.5 text-emerald-400" />
            <span>Sistem Seleksi 5 Tahap & Penerbitan ID Magang Resmi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-display">
            Pengelolaan Pendaftaran Mahasiswa Magang Smart Grow
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Alur seleksi transparan 5 tahap dari pendaftaran awal portal publik hingga penerbitan **ID Magang Resmi (e.g. SGL-INT-2026-008)** & aktivasi akun LMS.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 text-center">
            <span className="text-xl font-bold font-mono text-emerald-300 block">{approvedCount}</span>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider font-bold">Terbit ID Magang</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/10 text-center">
            <span className="text-xl font-bold font-mono text-purple-300 block">{inProgressCount}</span>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider font-bold">Dalam Seleksi</span>
          </div>
        </div>
      </div>

      {/* STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{stage1Count}</span>
            <p className="text-xs text-slate-500 font-medium">Tahap 1: Berkas Masuk</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{inProgressCount}</span>
            <p className="text-xs text-slate-500 font-medium">Tahap 2-4: Dalam Seleksi</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{approvedCount}</span>
            <p className="text-xs text-slate-500 font-medium">Tahap 5: Keterima & ID Magang</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
            <Briefcase className="h-6 w-6" />
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{totalCount}</span>
            <p className="text-xs text-slate-500 font-medium">Total Seluruh Pendaftar</p>
          </div>
        </div>
      </div>

      {/* FILTER TABS & SEARCH */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-3xl p-5 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            <button
              onClick={() => setActiveStageFilter('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeStageFilter === 'all'
                  ? 'bg-slate-900 text-white dark:bg-emerald-600 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
              }`}
            >
              Semua ({totalCount})
            </button>
            {([1, 2, 3, 4, 5] as SelectionStage[]).map(stg => {
              const count = applicants.filter(a => (a.stage || 1) === stg).length;
              return (
                <button
                  key={stg}
                  onClick={() => setActiveStageFilter(stg)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeStageFilter === stg
                      ? 'bg-[#2E7D32] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>Tahap {stg}</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20">{count}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, email, role..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* APPLICANTS LIST */}
        <div className="space-y-4 pt-2">
          {filteredApplicants.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <FileText className="h-10 w-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-500">Tidak ada pendaftar magang pada kategori/pencarian ini.</p>
            </div>
          ) : (
            filteredApplicants.map(app => {
              const currentStage: SelectionStage = (app.stage || 1) as SelectionStage;
              const isApproved = app.status === 'approved' || currentStage === 5;
              const isRejected = app.status === 'rejected';

              return (
                <div 
                  key={app.id} 
                  className={`p-5 rounded-3xl border transition-all space-y-4 ${
                    isApproved 
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/50' 
                      : isRejected
                      ? 'bg-rose-50/30 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50 opacity-75'
                      : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700 shadow-xs'
                  }`}
                >
                  {/* TOP HEADER */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 dark:text-white text-base">{app.fullName}</h3>
                        {app.internId && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-mono font-bold text-[10px] uppercase tracking-wider">
                            ID: {app.internId}
                          </span>
                        )}
                        {isRejected && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold text-[10px] uppercase">
                            Ditolak
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-mono text-emerald-700 dark:text-emerald-400 mt-0.5 flex items-center gap-3 flex-wrap">
                        <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {app.email}</span>
                        {app.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {app.phone}</span>}
                        {app.university && <span className="flex items-center gap-1"><GraduationCap className="h-3 w-3" /> {app.university} ({app.major || '-'})</span>}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] font-mono text-slate-400">Daftar: {app.submittedAt}</span>
                      <span className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                        {app.roleInterest}
                      </span>
                    </div>
                  </div>

                  {/* VISUAL 5-STAGE STEPPER */}
                  <div className="space-y-2 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                      <span>Progres Seleksi Magang 5 Tahap</span>
                      <span className="font-mono text-emerald-600 dark:text-emerald-400">
                        {isApproved ? 'Tahap 5/5 (Lulus Magang)' : isRejected ? 'Ditolak' : `Tahap ${currentStage}/5`}
                      </span>
                    </div>

                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                      {([1, 2, 3, 4, 5] as SelectionStage[]).map(stgNum => {
                        const isCompleted = currentStage > stgNum || isApproved;
                        const isCurrent = currentStage === stgNum && !isApproved && !isRejected;

                        return (
                          <div key={stgNum} className="space-y-1">
                            <div 
                              className={`h-2.5 rounded-full transition-all ${
                                isCompleted
                                  ? 'bg-emerald-500'
                                  : isCurrent
                                  ? 'bg-purple-600 animate-pulse'
                                  : 'bg-slate-200 dark:bg-slate-700'
                              }`} 
                            />
                            <p className={`text-[10px] text-center font-bold hidden sm:block truncate ${
                              isCurrent ? 'text-purple-600 dark:text-purple-400 font-extrabold' : 'text-slate-400'
                            }`}>
                              {stgNum === 1 ? '1. Berkas' : stgNum === 2 ? '2. Teknis' : stgNum === 3 ? '3. Wawancara' : stgNum === 4 ? '4. Verifikasi' : '5. ID Magang'}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* MOTIVATION & DETAILS */}
                  <div className="text-xs space-y-2">
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 leading-relaxed italic">
                      "{app.motivation}"
                    </div>

                    <div className="flex items-center gap-4 text-[11px] text-slate-500">
                      {app.github && (
                        <a href={app.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-600">
                          <Github className="h-3.5 w-3.5" /> <span>GitHub</span>
                        </a>
                      )}
                      {app.instagram && (
                        <span className="flex items-center gap-1 font-semibold">
                          <Instagram className="h-3.5 w-3.5" /> <span>{app.instagram}</span>
                        </span>
                      )}
                      {app.stageNotes && (
                        <span className="font-mono text-purple-700 dark:text-purple-400">
                          Catatan Tahap: {app.stageNotes}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  {!isApproved && !isRejected && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <input 
                        type="text" 
                        placeholder="Tambahkan catatan tahap seleksi..." 
                        value={stageNotesInput[app.id] || ''}
                        onChange={e => setStageNotesInput({ ...stageNotesInput, [app.id]: e.target.value })}
                        className="px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex-1"
                      />

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => onRejectApplicant(app.id)}
                          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors cursor-pointer"
                        >
                          Tolak
                        </button>

                        {currentStage < 4 && (
                          <button
                            onClick={() => onAdvanceStage(app.id, (currentStage + 1) as SelectionStage, stageNotesInput[app.id])}
                            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                          >
                            <span>Lanjut Tahap {currentStage + 1}</span>
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        )}

                        {currentStage === 4 && (
                          <button
                            onClick={() => onAdvanceStage(app.id, 5, stageNotesInput[app.id])}
                            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                          >
                            <Award className="h-4 w-4 text-emerald-200" />
                            <span>Setujui & Terbitkan ID Magang Resmi</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
