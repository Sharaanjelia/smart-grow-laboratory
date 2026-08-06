import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PendingRegistration } from '../../types';
import { 
  UserCheck, 
  UserX, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Building2, 
  GraduationCap, 
  Mail, 
  Calendar, 
  Briefcase, 
  Sparkles, 
  Copy, 
  Check, 
  Send,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';

interface PendingRegistrationsViewProps {
  registrations: PendingRegistration[];
  onApprove: (reg: PendingRegistration) => void;
  onReject: (id: string) => void;
}

export default function PendingRegistrationsView({
  registrations = [],
  onApprove,
  onReject
}: PendingRegistrationsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedReg, setSelectedReg] = useState<PendingRegistration | null>(null);
  const [activeActivationModal, setActiveActivationModal] = useState<PendingRegistration | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSentSuccess, setEmailSentSuccess] = useState<string | null>(null);

  const generateEmailSubject = (reg: PendingRegistration) => {
    return `[Smart Grow Lab] Selamat! Akun Magang Riset Anda Telah Resmi Diaktifkan (${reg.internId || 'SGL-INT-2026-001'})`;
  };

  const generateEmailBody = (reg: PendingRegistration) => {
    return `Halo ${reg.fullName},

Pendaftaran magang riset Anda untuk divisi ${reg.division} di Smart Grow Laboratory Telkom University telah DISETUJUI & DIAKTIFKAN secara resmi!

RINCIAN AKUN MAGANG:
- ID Magang Resmi: ${reg.internId || 'SGL-INT-2026-001'}
- Email Terdaftar: ${reg.email}
- Asal Universitas: ${reg.university}
- Program Studi: ${reg.studyProgram}

Anda sekarang sudah dapat masuk (login) ke Portal LMS Smart Grow Laboratory menggunakan link berikut:
${window.location.origin}/#login

Gunakan email (${reg.email}) dan kata sandi yang Anda daftarkan saat mengisi form pendaftaran.

Salam hangat,
Tim Pengelola Smart Grow Laboratory
Telkom University`;
  };

  const handleOpenGmailCompose = (reg: PendingRegistration) => {
    setSendingEmail(true);
    const subject = encodeURIComponent(generateEmailSubject(reg));
    const body = encodeURIComponent(generateEmailBody(reg));
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(reg.email)}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');

    setTimeout(() => {
      setSendingEmail(false);
      setEmailSentSuccess(reg.email);
    }, 1000);
  };

  const handleOpenMailto = (reg: PendingRegistration) => {
    setSendingEmail(true);
    const subject = encodeURIComponent(generateEmailSubject(reg));
    const body = encodeURIComponent(generateEmailBody(reg));
    const mailtoUrl = `mailto:${encodeURIComponent(reg.email)}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;

    setTimeout(() => {
      setSendingEmail(false);
      setEmailSentSuccess(reg.email);
    }, 1000);
  };

  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.division.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && reg.status === filterStatus;
  });

  const handleCopyLink = (reg: PendingRegistration) => {
    const activationUrl = `${window.location.origin}/#login?action=activate&email=${encodeURIComponent(reg.email)}&token=${reg.activationToken || 'act_token'}`;
    navigator.clipboard.writeText(activationUrl);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2500);
  };

  const handleTriggerApprove = (reg: PendingRegistration) => {
    onApprove(reg);
    setActiveActivationModal(reg);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-bold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verifikasi & Persetujuan Akun Magang</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              Pendaftaran Mahasiswa Magang
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
              Daftar mahasiswa magang baru yang mengajukan akun. Setujui untuk menerbitkan ID Magang Resmi (`SGL-INT-2026-xxx`) dan kirimkan tautan aktivasi akun.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-emerald-300 font-mono">
                {registrations.filter(r => r.status === 'Pending Approval').length}
              </div>
              <div className="text-[10px] text-emerald-100 font-medium uppercase tracking-wider">Menunggu</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-center">
              <div className="text-2xl font-black text-white font-mono">
                {registrations.filter(r => r.status === 'Approved').length}
              </div>
              <div className="text-[10px] text-emerald-100 font-medium uppercase tracking-wider">Disetujui</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Cari pendaftar, email, kampus..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2E7D32] focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
            {['all', 'Pending Approval', 'Approved', 'Rejected'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterStatus === st 
                    ? 'bg-white text-emerald-800 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {st === 'all' ? 'Semua' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Registrations List / Cards Grid */}
      {filteredRegistrations.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#2E7D32] flex items-center justify-center mx-auto">
            <UserCheck className="h-8 w-8" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="font-bold text-base text-slate-900 font-display">Belum Ada Pendaftaran Menunggu</h3>
            <p className="text-xs text-slate-500">
              Tidak ditemukan pengajuan akun magang mahasiswa baru dengan kriteria pencarian ini.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRegistrations.map((reg) => (
            <motion.div
              key={reg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden"
            >
              {/* Card Top Details */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#2E7D32] flex items-center justify-center font-bold text-lg font-display shrink-0 shadow-xs border border-emerald-200">
                      {reg.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 font-display line-clamp-1">{reg.fullName}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Mail className="h-3 w-3 shrink-0" />
                        <span className="truncate">{reg.email}</span>
                      </p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase shrink-0 ${
                    reg.status === 'Approved' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : reg.status === 'Rejected'
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}>
                    {reg.status}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 text-slate-400" />
                      Universitas
                    </span>
                    <span className="font-semibold text-slate-900 truncate max-w-[140px]">{reg.university}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                      Program Studi
                    </span>
                    <span className="font-semibold text-slate-900 truncate max-w-[140px]">{reg.studyProgram}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Briefcase className="h-3.5 w-3.5 text-emerald-600" />
                      Divisi Riset
                    </span>
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100 truncate max-w-[140px]">
                      {reg.division}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 text-[11px] pt-1 border-t border-slate-200/60">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-400" />
                      Waktu Daftar
                    </span>
                    <span className="font-mono">{reg.registrationTime ? new Date(reg.registrationTime).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Hari ini'}</span>
                  </div>
                </div>

                {reg.internId && (
                  <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between text-xs font-mono font-bold text-emerald-900">
                    <span>ID MAGANG RESMI:</span>
                    <span className="text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">{reg.internId}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedReg(reg)}
                  className="flex-1 py-2 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5 text-slate-500" />
                  <span>Detail</span>
                </button>

                {reg.status === 'Pending Approval' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => onReject(reg.id)}
                      className="py-2 px-3 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
                    >
                      <UserX className="h-3.5 w-3.5" />
                      <span>Tolak</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTriggerApprove(reg)}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#2E7D32] hover:bg-[#1b5e20] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-800/10 transition-all cursor-pointer"
                    >
                      <UserCheck className="h-3.5 w-3.5" />
                      <span>Setujui</span>
                    </button>
                  </>
                ) : reg.status === 'Approved' ? (
                  <button
                    type="button"
                    onClick={() => setActiveActivationModal(reg)}
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#2E7D32] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Tautan Aktivasi</span>
                  </button>
                ) : (
                  <span className="text-xs text-rose-500 font-semibold px-2 py-1 bg-rose-50 rounded-lg">Pendaftaran Ditolak</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedReg && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 border border-slate-100"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#2E7D32] flex items-center justify-center font-bold text-lg">
                    {selectedReg.fullName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 font-display">{selectedReg.fullName}</h3>
                    <p className="text-xs text-slate-500">{selectedReg.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedReg(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Asal Universitas:</span>
                    <span className="font-bold text-slate-900">{selectedReg.university}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Program Studi:</span>
                    <span className="font-bold text-slate-900">{selectedReg.studyProgram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Divisi Magang Riset:</span>
                    <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">{selectedReg.division}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Waktu Pengajuan:</span>
                    <span className="font-mono text-slate-700">{selectedReg.registrationTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status Akun:</span>
                    <span className="font-bold uppercase text-amber-700">{selectedReg.status}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedReg(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Activation Link Overlay Modal */}
      <AnimatePresence>
        {activeActivationModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 border border-emerald-100 text-left relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#2E7D32] flex items-center justify-center font-bold shrink-0">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 font-display">Notifikasi Aktivasi Akun</h3>
                    <p className="text-xs text-slate-500">
                      Terbit ID Magang: <span className="font-mono font-bold text-emerald-700">{activeActivationModal.internId || 'SGL-INT-2026-001'}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveActivationModal(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center cursor-pointer shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* Success Banner if Email Sent */}
              {emailSentSuccess === activeActivationModal.email && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2.5 animate-fade-in">
                  <CheckCircle2 className="h-5 w-5 text-[#2E7D32] shrink-0" />
                  <span>
                    ✓ Email Notifikasi Aktivasi Akun berhasil dikirimkan ke <strong>{activeActivationModal.email}</strong>! Mahasiswa dapat langsung mengecek email & melakukan login.
                  </span>
                </div>
              )}

              {/* Primary Action: Send Real Activation Email Buttons */}
              <div className="space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenGmailCompose(activeActivationModal)}
                    disabled={sendingEmail}
                    className="py-3 px-3 rounded-2xl bg-[#2E7D32] hover:bg-[#1b5e20] active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-800/20 transition-all cursor-pointer disabled:opacity-70"
                  >
                    <Mail className="h-4 w-4 text-emerald-200" />
                    <span>Kirim via Gmail (Webmail)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenMailto(activeActivationModal)}
                    disabled={sendingEmail}
                    className="py-3 px-3 rounded-2xl bg-slate-800 hover:bg-slate-900 active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-70"
                  >
                    <Send className="h-4 w-4 text-emerald-400" />
                    <span>Kirim via App Email</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 text-center">
                  *Membuka jendela kirim email resmi berisi data ID Magang ({activeActivationModal.internId}) langsung ke inbox email mahasiswa ({activeActivationModal.email}).
                </p>
              </div>

              {/* Pratinjau Email Notifikasi Resmi */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase text-slate-500 tracking-wider">
                  Pratinjau Email Notifikasi Aktivasi:
                </span>
                <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 text-xs space-y-3 font-sans border border-slate-800 shadow-inner">
                  <div className="border-b border-slate-800 pb-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Kepada: <strong className="text-emerald-400">{activeActivationModal.email}</strong></span>
                    <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">AKUN AKTIF</span>
                  </div>
                  
                  <div className="space-y-2 text-slate-200">
                    <p className="font-bold text-sm text-white">
                      [Smart Grow Lab] Selamat! Akun Magang Riset Anda Telah Resmi Diaktifkan
                    </p>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      Halo <strong>{activeActivationModal.fullName}</strong>,<br />
                      Pendaftaran magang riset Anda untuk divisi <strong>{activeActivationModal.division}</strong> di Smart Grow Laboratory Telkom University telah <strong>DISETUJUI & DIAKTIFKAN</strong>.
                    </p>

                    <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 space-y-1 font-mono text-[11px]">
                      <div className="flex justify-between text-slate-300">
                        <span>ID Magang Resmi:</span>
                        <span className="font-bold text-emerald-400">{activeActivationModal.internId || 'SGL-INT-2026-001'}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Universitas:</span>
                        <span className="text-white">{activeActivationModal.university}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Status Login:</span>
                        <span className="text-emerald-400 font-bold">Siap Login (Active)</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400">
                      Anda sekarang dapat masuk ke Portal LMS Smart Grow Lab menggunakan email resmi <strong>{activeActivationModal.email}</strong> dan kata sandi yang Anda buat.
                    </p>
                  </div>
                </div>
              </div>

              {/* Salin Tautan Manual */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono font-bold uppercase text-slate-500">Tautan Aktivasi Direct (Manual Copy):</span>
                <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-xl border border-slate-200 text-xs">
                  <input 
                    type="text" 
                    readOnly 
                    value={`${window.location.origin}/#login?action=activate&email=${encodeURIComponent(activeActivationModal.email)}&token=${activeActivationModal.activationToken || 'act_token'}`}
                    className="bg-transparent border-none w-full text-slate-600 font-mono text-[11px] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopyLink(activeActivationModal)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shrink-0 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedToken ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedToken ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setActiveActivationModal(null)}
                  className="w-full py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Tutup Modal Notifikasi
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
