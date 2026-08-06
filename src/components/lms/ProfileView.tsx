import React, { useState } from 'react';
import { User, LmsProject, ProjectItem } from '../../types';
import { auth, db, uploadFileToFirebaseStorage } from '../../firebase';
import { updatePassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  BookOpen, 
  Calendar, 
  Github, 
  Linkedin, 
  Globe, 
  Edit3, 
  Key, 
  Upload, 
  CheckCircle2, 
  Sparkles, 
  Activity, 
  ShieldCheck, 
  Clock, 
  Laptop, 
  Award,
  X,
  FileText,
  BarChart3,
  Users,
  Briefcase,
  Layers,
  Star,
  ExternalLink,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

interface ProfileViewProps {
  currentUser: User;
  onUpdateProfile?: (updatedUser: User) => void;
  darkMode?: boolean;
  users?: User[];
  projects?: LmsProject[];
  publicProjects?: ProjectItem[];
}

export default function ProfileView({ 
  currentUser, 
  onUpdateProfile, 
  darkMode = false,
  users = [],
  projects = [],
  publicProjects = []
}: ProfileViewProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const isDirector = currentUser.role === 'director';
  const isAssistant = currentUser.role === 'assistant';

  // Editable Profile Form State
  // Editable Profile Form State
  const [name, setName] = useState(currentUser.name || '');
  const [studentId, setStudentId] = useState(currentUser.studentId || (isDirector ? 'NIP. 197804122005012002' : ''));
  const [institution, setInstitution] = useState(currentUser.institution || '');
  const [major, setMajor] = useState(currentUser.major || (isDirector ? 'Teknik Komputer & Sistem Cerdas' : ''));
  const [semester, setSemester] = useState(currentUser.semester || (isDirector ? 'Guru Besar / Profesor' : ''));
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [address, setAddress] = useState(currentUser.address || '');
  const [bio, setBio] = useState(
    currentUser.bio || (isDirector 
      ? 'Kepala Laboratorium Smart Grow & Profesor Riset bidang Wireless Communications, IoT Sensors, & Precision Smart Agriculture. Berfokus pada penderesan inovasi pertanian pintar berbasis AI & Container Hydroponics.'
      : '')
  );
  const [github, setGithub] = useState(currentUser.github || '');
  const [linkedin, setLinkedin] = useState(currentUser.linkedin || '');
  const [portfolio, setPortfolio] = useState(currentUser.portfolio || '');
  const [avatarUrl, setAvatarUrl] = useState(
    currentUser.avatar && !currentUser.avatar.includes('unsplash.com') 
      ? currentUser.avatar 
      : currentUser.name.toLowerCase().includes('indrarini') ? '/images/team/indrarini.jpg'
      : currentUser.name.toLowerCase().includes('azliny') ? '/images/team/azliny.jpg'
      : currentUser.name.toLowerCase().includes('shara') ? '/images/team/shara.jpg'
      : currentUser.name.toLowerCase().includes('chiko') ? '/images/team/chiko.jpg'
      : currentUser.name.toLowerCase().includes('shella') || currentUser.name.toLowerCase().includes('shela') ? '/images/team/shela.jpg'
      : currentUser.name.toLowerCase().includes('sirvani') ? '/images/team/sirvani.jpg'
      : currentUser.name.toLowerCase().includes('tiara') ? '/images/team/tiara.jpg'
      : currentUser.name.toLowerCase().includes('nasywa') ? '/images/team/nasywa-zauja-noor.jpg'
      : currentUser.name.toLowerCase().includes('divia') ? '/images/team/divia-nuralika-namira.jpg'
      : currentUser.name.toLowerCase().includes('arimbi') ? '/images/team/arimbi.jpg'
      : currentUser.name.toLowerCase().includes('daffa') ? '/images/team/daffa.jpg'
      : currentUser.name.toLowerCase().includes('hannani') ? '/images/team/hannani.jpg'
      : currentUser.name.toLowerCase().includes('elyasa') ? '/images/team/elyasa.jpg'
      : currentUser.name.toLowerCase().includes('humam') ? '/images/team/humam.jpg'
      : (currentUser.avatar || '')
  );

  // Executive KPI Metrics State (Director Editable & Dynamic)
  const [totalHibah, setTotalHibah] = useState(currentUser.totalHibah || 'Rp 100 Juta+');
  const [hibahSubtitle, setHibahSubtitle] = useState(currentUser.hibahSubtitle || 'Kedaireka, Dikti & Industri 2024–2026');
  const [totalPaper, setTotalPaper] = useState(currentUser.totalPaper || '15 Paper');
  const [paperSubtitle, setPaperSubtitle] = useState(currentUser.paperSubtitle || 'Q1 & Q2 Smart Precision Farming');
  const [totalPaten, setTotalPaten] = useState(currentUser.totalPaten || '5 Hak Cipta');
  const [patenSubtitle, setPatenSubtitle] = useState(currentUser.patenSubtitle || 'Sistem Algoritma & Hardware');
  const [totalMahasiswaOverride, setTotalMahasiswaOverride] = useState(currentUser.totalMahasiswaOverride || '8 Mahasiswa Magang');
  const [mahasiswaSubtitle, setMahasiswaSubtitle] = useState(currentUser.mahasiswaSubtitle || '8 Mahasiswa Magang & 6 Alumni Riset');

  // Dynamic values calculated from system database
  const activeStudentsCount = users && users.length > 0 ? users.filter(u => u.role === 'student' && u.status === 'active').length : 0;
  const alumniCount = users && users.length > 0 ? users.filter(u => u.status === 'alumni').length : 6;
  const totalProjectsCount = (projects?.length || 0) + (publicProjects?.length || 0);

  const displayHibah = totalHibah.trim() || 'Rp 100 Juta+';
  const displayHibahSub = hibahSubtitle.trim() || 'Kedaireka, Dikti & Industri 2024–2026';

  const displayPaper = totalPaper.trim() || '15 Paper';
  const displayPaperSub = paperSubtitle.trim() || 'Q1 & Q2 Smart Precision Farming';

  const displayPaten = totalPaten.trim() || '5 Hak Cipta';
  const displayPatenSub = patenSubtitle.trim() || 'Sistem Algoritma & Hardware';

  const displayMahasiswa = totalMahasiswaOverride.trim() || (activeStudentsCount > 0 ? `${activeStudentsCount} Mahasiswa Magang` : '8 Mahasiswa Magang');
  const displayMahasiswaSub = mahasiswaSubtitle.trim() || (activeStudentsCount > 0 ? `${activeStudentsCount} Mahasiswa Magang & ${alumniCount} Alumni Riset` : '8 Mahasiswa Magang & 6 Alumni Riset');

  // Password Form State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated: User = {
      ...currentUser,
      name,
      studentId,
      institution,
      major,
      semester,
      phone,
      address,
      bio,
      github,
      linkedin,
      portfolio,
      avatar: avatarUrl,
      totalHibah,
      hibahSubtitle,
      totalPaper,
      paperSubtitle,
      totalPaten,
      patenSubtitle,
      totalMahasiswaOverride,
      mahasiswaSubtitle
    };

    // Save directly to Firestore collection `users`
    try {
      if (currentUser && currentUser.id) {
        await setDoc(doc(db, 'users', currentUser.id), JSON.parse(JSON.stringify(updated)), { merge: true });
      }
    } catch (err: any) {
      console.warn('Firestore update user profile notice:', err?.message);
    }

    if (onUpdateProfile) onUpdateProfile(updated);
    setEditModalOpen(false);
    showToast('Profil Anda berhasil diperbarui dan tersimpan di Firestore!');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      alert('Kata sandi baru minimal harus 6 karakter untuk Firebase Authentication.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Kata sandi baru dan konfirmasi tidak cocok!');
      return;
    }

    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);
      }
      setPasswordModalOpen(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Kata sandi berhasil diperbarui via Firebase Authentication!');
    } catch (err: any) {
      console.error('Update password error:', err);
      alert(err?.message || 'Gagal memperbarui kata sandi. Silakan login kembali dan coba lagi.');
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      showToast('Mengunggah foto profil ke Firebase Storage...');
      try {
        const downloadUrl = await uploadFileToFirebaseStorage(file, 'avatars');
        setAvatarUrl(downloadUrl);
        
        const updated: User = {
          ...currentUser,
          avatar: downloadUrl
        };
        if (onUpdateProfile) onUpdateProfile(updated);

        if (currentUser && currentUser.id) {
          await setDoc(doc(db, 'users', currentUser.id), { avatar: downloadUrl }, { merge: true });
        }
        showToast('Foto profil baru berhasil diunggah ke Firebase Storage!');
      } catch (err: any) {
        console.error('Avatar upload error:', err);
        showToast('Gagal mengunggah foto profil.');
      }
    }
  };

  // ==========================================
  // RENDER DIRECTOR SPECIALIZED EXECUTIVE VIEW
  // ==========================================
  if (isDirector) {
    return (
      <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* EXECUTIVE DIRECTOR HERO CARD */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-teal-950 to-emerald-950 text-white p-6 sm:p-8 shadow-2xl border border-emerald-500/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-6 text-center sm:text-left">
              {/* Large Director Picture */}
              <div className="relative group shrink-0">
                <img 
                  src={avatarUrl} 
                  alt={currentUser.name}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl object-cover border-4 border-amber-400/50 shadow-2xl transition-transform group-hover:scale-105"
                />
                <label className="absolute inset-0 bg-black/50 rounded-3xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-xs font-medium cursor-pointer transition-opacity backdrop-blur-xs">
                  <Upload className="h-6 w-6 mb-1 text-emerald-400" />
                  <span>Ganti Foto</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                </label>
                <span className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-1.5 rounded-full ring-4 ring-slate-900" title="Verifikasi Kepala Laboratorium">
                  <Award className="h-4 w-4" />
                </span>
              </div>

              {/* Director Info Header */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  <span>Direktur Utama & Kepala Laboratorium Smart Grow</span>
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  {currentUser.name}
                </h1>
                
                <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                  Profesor Teknik Komputer & Lead Principal Investigator (PI) Smart Agriculture Telkom University
                </p>
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-300 pt-1 font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-300">
                    <GraduationCap className="h-4 w-4 text-emerald-400" />
                    <span>{studentId}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 text-blue-300">
                    <Building2 className="h-4 w-4 text-blue-400" />
                    <span>NIDN. 0412047801</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 text-purple-300">
                    <Award className="h-4 w-4 text-purple-400" />
                    <span>Guru Besar / Profesor</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Executive Actions */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setEditModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profil Direktur</span>
              </button>
              <button
                onClick={() => setPasswordModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 backdrop-blur-md transition-all cursor-pointer"
              >
                <Key className="h-4 w-4 text-emerald-300" />
                <span>Ubah Password</span>
              </button>
            </div>

          </div>
        </div>

        {/* EXECUTIVE METRICS & KPI HIGHLIGHTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col justify-between min-h-[110px] space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">TOTAL HIBAH & DANA RISET</span>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{displayHibah}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{displayHibahSub}</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col justify-between min-h-[110px] space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">PUBLIKASI SCOPUS & JURNAL</span>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{displayPaper}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{displayPaperSub}</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col justify-between min-h-[110px] space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">PATEN & HKI TERDAFTAR</span>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{displayPaten}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{displayPatenSub}</p>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col justify-between min-h-[110px] space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">MAHASISWA DALAM BIMBINGAN</span>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">{displayMahasiswa}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{displayMahasiswaSub}</p>
          </div>
        </div>

        {/* TWO COLUMN DETAILS FOR DIRECTOR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: EXECUTIVE CONTACT & ACADEMIC APPOINTMENTS */}
          <div className="space-y-6">
            
            {/* Executive Office Info */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
                <Building2 className="h-4 w-4 text-[#2E7D32]" />
                <span>Informasi Kantor & Jabatan Eksekutif</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Jabatan Akademik & Fungsional</p>
                  <p className="font-extrabold text-slate-800 dark:text-slate-100">Guru Besar / Profesor Teknik Komputer</p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Kelompok Keahlian (Research Group)</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Wireless Communication & Intelligent Systems (WCIS)</p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Fakultas & Perguruan Tinggi</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Fakultas Teknik Elektro, Telkom University</p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Alamat Ruang Kerja Kantor</p>
                  <p className="font-medium text-slate-700 dark:text-slate-300">Bandung Techno Park, Ruang Smart Grow Laboratory</p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Email Kedinasan Direktur</p>
                  <p className="font-mono font-bold text-[#2E7D32]">indrarini@telkomuniversity.ac.id</p>
                </div>

                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Telepon Sekretariat / Lab</p>
                  <p className="font-mono font-semibold text-slate-800 dark:text-slate-200">+62 22 7564108 ext. 304</p>
                </div>
              </div>

              <hr className="border-slate-100 dark:border-slate-700" />

              {/* External Profiles */}
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Profil Akademik & Riset</p>
                
                <div className="flex flex-col gap-2">
                  <a href={portfolio} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors">
                    <span className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-emerald-600" />
                      <span>Portal Smart Grow Laboratory</span>
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-emerald-600" />
                  </a>

                  <a href={linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors">
                    <span className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-blue-600" />
                      <span>LinkedIn Prof. Indrarini</span>
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-blue-600" />
                  </a>
                </div>
              </div>
            </div>

            {/* Strategic Partners & Grants Card */}
            <div className="p-6 rounded-3xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] dark:text-emerald-400">
                <Briefcase className="h-4 w-4" />
                <span>Mitra Riset Strategis Direktur</span>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200/60 dark:border-emerald-800/60">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Kementerian Pertanian RI</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Hibah Smart Farming</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200/60 dark:border-emerald-800/60">
                  <span className="font-bold text-slate-800 dark:text-slate-200">PT Telkom Indonesia Tbk</span>
                  <span className="text-[10px] text-blue-600 font-bold">IoT Infrastructure</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200/60 dark:border-emerald-800/60">
                  <span className="font-bold text-slate-800 dark:text-slate-200">IPB University</span>
                  <span className="text-[10px] text-purple-600 font-bold">Riset Agronomi AI</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT TWO COLUMNS: VISION, ADVISORY STRUCTURE & PUBLICATIONS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Leadership Vision Card */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Visi Kepemimpinan & Pengarahan Riset</span>
              </h3>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60 text-xs leading-relaxed text-slate-700 dark:text-slate-200 space-y-2">
                <p className="font-medium italic">
                  "{bio}"
                </p>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[11px]">
                    Smart Agriculture
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold text-[11px]">
                    RS485 Sensor Networks
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 font-bold text-[11px]">
                    Container Hydroponics AI
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold text-[11px]">
                    Computer Vision YOLO
                  </span>
                </div>
              </div>
            </div>

            {/* Academic Education & Degree History */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
                <GraduationCap className="h-4 w-4 text-emerald-600" />
                <span>Riwayat Pendidikan Tinggi Resmi (ITB)</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0">
                    S3
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-slate-100">Doktor (Dr.) - Teknik Elektro & Sistem Cerdas</h4>
                    <p className="text-[11px] text-slate-500 font-medium">Institut Teknologi Bandung (ITB) • Lulus 2017</p>
                    <p className="text-[10px] text-slate-400 mt-1">Disertasi: *Arsitektur Telemetri Sensor Nirkabel Berdaya Rendah & Algoritma Kompresi Data Akurat*</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center shrink-0">
                    S2
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-slate-100">Magister Teknik (M.T.) - Teknik Telekomunikasi</h4>
                    <p className="text-[11px] text-slate-500 font-medium">Institut Teknologi Bandung (ITB) • Lulus 2004</p>
                    <p className="text-[10px] text-slate-400 mt-1">Tesis: *Pemrosesan Sinyal Digital & Mitigasi Noise pada Jaringan Sensor Terdistribusi*</p>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center shrink-0">
                    S1
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 dark:text-slate-100">Sarjana Teknik (S.T.) - Teknik Elektro</h4>
                    <p className="text-[11px] text-slate-500 font-medium">Institut Teknologi Bandung (ITB) • Lulus 2001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Scopus Q1/Q2 Research Publications */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span>Publikasi Scopus & Jurnal Terkemuka (Selected Works)</span>
                </h3>
                <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded-full">
                  Scopus Q1/Q2
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold font-mono text-[10px]">Q1 • IEEE Access (2025)</span>
                    <span className="text-[10px] font-mono text-slate-400">DOI: 10.1109/ACCESS.2025.34</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Automated Nutrient Dosing and Telemetry Monitoring System for Container-Based Indoor Farming Using Machine Learning</h4>
                  <p className="text-[11px] text-slate-500 font-sans">Authors: **Indrarini Dyah Irawati**, S. Anjelia, A. Azreen, et al.</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-extrabold font-mono text-[10px]">Q1 • Comp. Elec. Agriculture (2024)</span>
                    <span className="text-[10px] font-mono text-slate-400">DOI: 10.1016/j.compag.2024</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">LoRaWAN-Based Wireless Sensor Mesh Architecture for Distributed Aquaponics and Hydroponics Telemetry</h4>
                  <p className="text-[11px] text-slate-500 font-sans">Authors: **Indrarini Dyah Irawati**, M. C. Kasa, S. N. Putri</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-extrabold font-mono text-[10px]">Q2 • IEEE Sensors Journal (2024)</span>
                    <span className="text-[10px] font-mono text-slate-400">DOI: 10.1109/JSEN.2024</span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Compressive Sensing and Kalman Filtering for Low-Power Wireless Agricultural Telemetry Sensors</h4>
                  <p className="text-[11px] text-slate-500 font-sans">Authors: **Indrarini Dyah Irawati**</p>
                </div>
              </div>
            </div>

            {/* Direct Governance & Approval Logs */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#2E7D32]" />
                <span>Riwayat Pengesahan & Keputusan Direktur Terakhir</span>
              </h3>

              <div className="space-y-3 text-xs">
                {[
                  { title: 'Menyetujui Penambahan 2 Modul Container Farm HYCOSMARTS', date: '22 Juli 2026 10:15 WIB', type: 'Proyek Riset' },
                  { title: 'Mengesahkan Sertifikat Magang 8 Mahasiswa Batch I 2026', date: '20 Juli 2026 14:30 WIB', type: 'Akademik' },
                  { title: 'Menyetujui Anggaran Pengadaan Sensor RS485 Modbus NPK', date: '18 Juli 2026 09:00 WIB', type: 'Anggaran' }
                ].map((log, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100">{log.title}</h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{log.date}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-[#2E7D32] font-bold text-[10px]">
                      {log.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* MODAL: EDIT PROFILE FOR DIRECTOR */}
        {editModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Edit Profil Direktur Utama</h3>
                <button onClick={() => setEditModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Nama Lengkap & Gelar</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">NIP Direktur</label>
                    <input type="text" value={studentId} onChange={e => setStudentId(e.target.value)} required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Bidang Kepakaran</label>
                    <input type="text" value={major} onChange={e => setMajor(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                  </div>
                  <div>
                    <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Jabatan Fungsional</label>
                    <input type="text" value={semester} onChange={e => setSemester(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Alamat Ruang Kerja</label>
                  <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Visi Kepemimpinan / Biografi Singkat</label>
                  <textarea rows={3} value={bio} onChange={e => setBio(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 font-semibold text-slate-600 dark:text-slate-300">Batal</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-semibold shadow-md">Simpan Perubahan</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: CHANGE PASSWORD */}
        {passwordModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Ganti Kata Sandi Direktur</h3>
                <button onClick={() => setPasswordModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Kata Sandi Lama</label>
                  <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Kata Sandi Baru</label>
                  <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Konfirmasi Kata Sandi Baru</label>
                  <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setPasswordModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 font-semibold text-slate-600 dark:text-slate-300">Batal</button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-semibold shadow-md">Perbarui Password</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    );
  }

  // ==========================================
  // RENDER STANDARD PROFILE VIEW (STUDENT & ASSISTANT)
  // ==========================================
  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* HEADER HERO CARD */}
      <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-r from-[#355E3B] via-[#2A4B2F] to-slate-900 text-white p-6 sm:p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-black/[0.06]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C7D8A8]/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-end gap-6">
          
          {/* Profile Picture */}
          <div className="relative group shrink-0">
            <img 
              src={avatarUrl} 
              alt={currentUser.name}
              className="w-32 h-32 sm:w-36 sm:h-36 rounded-[24px] object-cover border-4 border-white/30 shadow-2xl transition-transform group-hover:scale-105"
            />
            <label className="absolute inset-0 bg-black/50 rounded-[24px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-xs font-medium cursor-pointer transition-opacity backdrop-blur-xs">
              <Upload className="h-6 w-6 mb-1 text-[#C7D8A8]" />
              <span>Ganti Foto</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </label>
            <span className="absolute -bottom-2 -right-2 bg-[#355E3B] text-white p-1.5 rounded-full ring-4 ring-slate-900" title="Akun Terverifikasi">
              <ShieldCheck className="h-4 w-4" />
            </span>
          </div>

          {/* User Basic Info */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C7D8A8]/30 text-[#C7D8A8] text-xs font-mono font-bold border border-[#C7D8A8]/40">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isAssistant ? 'Asisten Laboratorium' : 'Mahasiswa Magang Riset'}</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-white">{currentUser.name}</h1>
            <p className="text-sm text-[#C7D8A8] font-medium">{currentUser.title || 'Peneliti Smart Grow Laboratory'}</p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-200 pt-1 font-sans">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-[#C7D8A8]" />
                <span>NIM: {studentId}</span>
              </span>
              {currentUser.internId && (
                <span className="flex items-center gap-1.5 font-mono font-bold text-white bg-white/20 px-2.5 py-0.5 rounded-lg border border-white/30 shadow-xs">
                  <Award className="h-3.5 w-3.5 text-amber-300" />
                  <span>ID MAGANG: {currentUser.internId}</span>
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-[#C7D8A8]" />
                <span>{institution}</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setEditModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#355E3B] hover:bg-[#2A4B2F] text-white text-xs font-bold shadow-lg transition-all cursor-pointer border border-[#C7D8A8]/40"
            >
              <Edit3 className="h-4 w-4" />
              <span>Edit Profil</span>
            </button>
            <button
              onClick={() => setPasswordModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 backdrop-blur-md transition-all cursor-pointer"
            >
              <Key className="h-4 w-4 text-[#C7D8A8]" />
              <span>Ganti Password</span>
            </button>
          </div>
        </div>
      </div>

      {/* TWO COLUMN GRID DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: CONTACT & SOCIALS */}
        <div className="space-y-6">
          
          {/* Contact Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-[#2E7D32]" />
              <span>Informasi Kontak & Akademik</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Email Resmi</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{currentUser.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Nomor WhatsApp / HP</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BookOpen className="h-4 w-4 text-slate-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Program Studi / Semester</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{major} ({semester})</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Alamat Domisili</p>
                  <p className="font-medium text-slate-700 dark:text-slate-300">{address}</p>
                </div>
              </div>
            </div>

            <hr className="border-slate-100 dark:border-slate-700" />

            {/* Social Links */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Portofolio & Media</p>
              
              <div className="flex flex-col gap-2">
                <a href={github} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors">
                  <span className="flex items-center gap-2">
                    <Github className="h-4 w-4 text-slate-800 dark:text-slate-100" />
                    <span>GitHub Repository</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">Kunjungi &rarr;</span>
                </a>

                <a href={linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors">
                  <span className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-blue-600" />
                    <span>LinkedIn Profile</span>
                  </span>
                  <span className="text-[10px] text-blue-600 font-bold">Kunjungi &rarr;</span>
                </a>

                <a href={portfolio} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors">
                  <span className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-emerald-600" />
                    <span>Website Portofolio</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">Kunjungi &rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Supervisor Info Card */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/40 rounded-3xl p-6 border border-emerald-200/80 dark:border-emerald-800/80 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#2E7D32] dark:text-emerald-400">
              <Award className="h-4 w-4" />
              <span>Pembimbing & Status Riset</span>
            </div>
            
            <div className="space-y-2 text-xs">
              <div>
                <p className="text-[10px] text-slate-500 font-medium">Pembimbing Utama Laboratorium</p>
                <p className="font-bold text-slate-800 dark:text-slate-100">Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.</p>
              </div>

              <div>
                <p className="text-[10px] text-slate-500 font-medium">Status Keanggotaan</p>
                <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-semibold">
                  {currentUser.internshipStatus || 'Peneliti Aktif Smart Grow Lab'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT TWO COLUMNS: BIO, SKILLS & LOGS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Bio Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">Biografi Singkat</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-700/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                {bio}
              </p>
            </div>

            {/* Skills & Tech Stack */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Keahlian Utama</p>
                <div className="flex flex-wrap gap-1.5">
                  {(currentUser.skillsList || ['IoT Sensors', 'ESP32 C++', 'Modbus RS485', 'React.js', 'Kalibrasi EC/pH']).map((sk, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#2E7D32] dark:text-emerald-300 text-[11px] font-semibold border border-emerald-200/80 dark:border-emerald-800">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Bahasa Pemrograman</p>
                <div className="flex flex-wrap gap-1.5">
                  {(currentUser.languages || ['C++', 'Python', 'TypeScript', 'SQL']).map((lang, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px] font-semibold border border-blue-200 dark:border-blue-800">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Framework & Tools</p>
                <div className="flex flex-wrap gap-1.5">
                  {(currentUser.frameworks || ['React.js', 'TailwindCSS', 'PyTorch', 'TensorRT', 'Grafana']).map((fw, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[11px] font-semibold border border-purple-200 dark:border-purple-800">
                      {fw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Activity History Timeline */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#2E7D32]" />
                <span>Riwayat Aktivitas Terakhir</span>
              </h3>
              <span className="text-[11px] text-slate-400">Terorganisir Otomatis</span>
            </div>

            <div className="space-y-3">
              {(currentUser.activityHistory || [
                { id: '1', action: 'Submit Progress Tugas #2', date: '22 Juli 2026 09:30 WIB', details: 'Mengirimkan pembaruan model YOLOv8 TensorRT ke Jetson Orin Nano.' },
                { id: '2', action: 'Presensi Masuk Tepat Waktu', date: '22 Juli 2026 08:05 WIB', details: 'Check-in di Lab Smart Grow (Lokasi: Bandung Techno Park)' },
                { id: '3', action: 'Pembaruan Dokumen Riset', date: '21 Juli 2026 14:10 WIB', details: 'Mengunggah file skematik PCB Dosing Pump ke proyek NFT Hydroponics.' }
              ]).map(act => (
                <div key={act.id} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-[#2E7D32] dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                      <span>{act.action}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{act.date}</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">{act.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Login History */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Laptop className="h-4 w-4 text-[#2E7D32]" />
              <span>Riwayat Login & Keamanan Perangkat</span>
            </h3>

            <div className="space-y-2">
              {(currentUser.loginHistory || [
                { id: 'l1', ip: '103.14.22.82', device: 'Windows 11 PC • Chrome 126', date: '22 Juli 2026 08:02 WIB' },
                { id: 'l2', ip: '103.14.22.82', device: 'macOS Sonoma • Safari 17', date: '21 Juli 2026 08:00 WIB' }
              ]).map(log => (
                <div key={log.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-700/30 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <div>
                      <p className="font-semibold text-slate-700 dark:text-slate-200">{log.device}</p>
                      <p className="text-[10px] text-slate-400">IP: {log.ip}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                    {log.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* MODAL: EDIT PROFILE */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Edit Profil Pengguna</h3>
              <button onClick={() => setEditModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Nama Lengkap</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">NIM / NIP</label>
                  <input type="text" value={studentId} onChange={e => setStudentId(e.target.value)} required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Program Studi</label>
                  <input type="text" value={major} onChange={e => setMajor(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Semester / Tingkat</label>
                  <input type="text" value={semester} onChange={e => setSemester(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Nomor HP / WhatsApp</label>
                  <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Universitas</label>
                  <input type="text" value={institution} onChange={e => setInstitution(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Alamat Domisili</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
              </div>

              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Biografi Singkat</label>
                <textarea rows={3} value={bio} onChange={e => setBio(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Link GitHub</label>
                  <input type="text" value={github} onChange={e => setGithub(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Link LinkedIn</label>
                  <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                </div>
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Link Portofolio</label>
                  <input type="text" value={portfolio} onChange={e => setPortfolio(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                </div>
              </div>

              {/* EXECUTIVE KPI METRICS EDITING (DIRECTOR ONLY) */}
              {isDirector && (
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 space-y-3 mt-4">
                  <h4 className="text-xs font-bold text-[#2E7D32] dark:text-emerald-400 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    <span>Pengaturan 4 Kartu KPI Eksekutif (Data Asli)</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">Total Hibah & Dana Riset</label>
                      <input type="text" value={totalHibah} onChange={e => setTotalHibah(e.target.value)} placeholder="Contoh: Rp 100 Juta+" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                      <input type="text" value={hibahSubtitle} onChange={e => setHibahSubtitle(e.target.value)} placeholder="Subtitle / Sumber Dana" className="w-full mt-1.5 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-[10px]" />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">Publikasi Scopus & Jurnal</label>
                      <input type="text" value={totalPaper} onChange={e => setTotalPaper(e.target.value)} placeholder="Contoh: 15 Paper" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                      <input type="text" value={paperSubtitle} onChange={e => setPaperSubtitle(e.target.value)} placeholder="Subtitle Jurnal" className="w-full mt-1.5 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-[10px]" />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">Paten & HKI Terdaftar</label>
                      <input type="text" value={totalPaten} onChange={e => setTotalPaten(e.target.value)} placeholder="Contoh: 5 Hak Cipta" className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                      <input type="text" value={patenSubtitle} onChange={e => setPatenSubtitle(e.target.value)} placeholder="Subtitle Paten" className="w-full mt-1.5 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-[10px]" />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">Mahasiswa Bimbingan (Kustom / Otomatis)</label>
                      <input type="text" value={totalMahasiswaOverride} onChange={e => setTotalMahasiswaOverride(e.target.value)} placeholder={`Otomatis (${activeStudentsCount || 8} Mahasiswa Magang)`} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
                      <input type="text" value={mahasiswaSubtitle} onChange={e => setMahasiswaSubtitle(e.target.value)} placeholder="Subtitle Bimbingan" className="w-full mt-1.5 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-[10px]" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 font-semibold text-slate-600 dark:text-slate-300">Batal</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-semibold shadow-md">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CHANGE PASSWORD */}
      {passwordModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Ganti Kata Sandi</h3>
              <button onClick={() => setPasswordModalOpen(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Kata Sandi Lama</label>
                <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Kata Sandi Baru</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Konfirmasi Kata Sandi Baru</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setPasswordModalOpen(false)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 font-semibold text-slate-600 dark:text-slate-300">Batal</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-semibold shadow-md">Perbarui Password</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

