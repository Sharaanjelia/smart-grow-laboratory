import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Award, 
  Briefcase, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Send, 
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Globe,
  Zap,
  Sprout,
  FileText
} from 'lucide-react';
import { NewsItem, Comment } from '../types';

interface RecruitmentNewsShowcaseProps {
  item: NewsItem;
  comments: Comment[];
  onBack: () => void;
  onAddComment: (name: string, email: string, content: string) => void;
  onOpenJoinModal?: () => void;
}

export default function RecruitmentNewsShowcase({
  item,
  comments,
  onBack,
  onAddComment,
  onOpenJoinModal
}: RecruitmentNewsShowcaseProps) {
  // Form State for Comments
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim() || !textInput.trim()) return;

    onAddComment(nameInput.trim(), emailInput.trim(), textInput.trim());
    setNameInput('');
    setEmailInput('');
    setTextInput('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3500);
  };

  const divisions = [
    {
      title: 'Full-stack Web Developer',
      icon: Globe,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
      badgeBg: 'bg-emerald-600',
      desc: 'Pengembangan portal analitik real-time telemetry, sistem presensi mahasiswa, dan fitur manajemen proyek riset.',
      skills: ['React.js', 'Vite', 'Node.js', 'WebSockets', 'Firebase', 'TailwindCSS']
    },
    {
      title: 'Hardware & Systems Engineer',
      icon: Zap,
      color: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
      badgeBg: 'bg-amber-600',
      desc: 'Perancangan fisik laboratorium, integrasi kelistrikan instrumen LED grow light, serta modul control box hidroponik.',
      skills: ['System Design', 'Power Electronics', 'Altium / KiCAD', 'Hydroponic Hardware', 'PCB Layout']
    },
    {
      title: 'IoT & Telemetry Specialist',
      icon: Cpu,
      color: 'bg-teal-500/10 text-teal-600 border-teal-500/30',
      badgeBg: 'bg-teal-600',
      desc: 'Kalibrasi sensor nirkabel (pH, EC, TDS, DO), penanganan noise analog, serta protokol komunikasi LoRaWAN & MQTT.',
      skills: ['ESP32 C++', 'LoRaWAN', 'MQTT', 'Sensor Calibration', 'Wireless Mesh']
    },
    {
      title: 'Agronomist & Plant Specialist',
      icon: Sprout,
      color: 'bg-lime-500/10 text-lime-600 border-lime-500/30',
      badgeBg: 'bg-lime-600',
      desc: 'Formulasi hara nutrisi A/B mix hidroponik & akuaponik, kontrol dosis mikro-klimat, serta pengujian kualitas hasil panen.',
      skills: ['Hydroponics Dosing', 'Aquaponics EC/pH', 'Plant Physiology', 'Yield Testing']
    }
  ];

  const selectionStages = [
    {
      stage: '1',
      title: 'Seleksi Berkas & Administrasi',
      desc: 'Pengisian formulir Join Us online & penyerahan portofolio/CV.',
      status: 'Pendaftaran Ditutup 15 Agustus 2026'
    },
    {
      stage: '2',
      title: 'Tes Teknis & Evaluasi Proyek',
      desc: 'Uji keterampilan sesuai divisi yang dipilih (Web / IoT / Hardware / Agronomi).',
      status: 'Jadwal: 17 - 19 Agustus 2026'
    },
    {
      stage: '3',
      title: 'Wawancara Pembimbing & Asisten Lab',
      desc: 'Wawancara langsung bersama Prof. Dr. Indrarini Dyah Irawati & Tim Asisten.',
      status: 'Jadwal: 21 - 23 Agustus 2026'
    },
    {
      stage: '4',
      title: 'Verifikasi Akhir & Penetapan Divisi',
      desc: 'Konfirmasi komitmen jam riset magang & penerbitan keputusan penerimaan.',
      status: 'Pengumuman: 25 Agustus 2026'
    },
    {
      stage: '5',
      title: 'Terbit ID Magang Resmi & Akses LMS',
      desc: 'Penerbitan ID Magang Resmi (e.g. SGL-INT-2026-008) & pembuatan akun portal.',
      status: 'Kick-off Magang: 1 September 2026'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans animate-fade-in">
      
      {/* Top Header Sticky Bar */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 px-4 sm:px-6 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Kembali ke News & Events</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold font-mono">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              STATUS: OPEN RECRUITMENT
            </span>

            {onOpenJoinModal && (
              <button
                onClick={onOpenJoinModal}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 space-y-8">

        {/* HERO RECRUITMENT BANNER CARD */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-10 shadow-2xl border border-emerald-500/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-wider uppercase font-mono">
              <Briefcase className="h-4 w-4 text-emerald-400" />
              <span>Lowongan Magang Riset Resmi • Smart Grow Laboratory</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight tracking-tight text-white">
              {item.title}
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-3xl font-medium">
              Smart Grow Laboratory Telkom University secara resmi mengundang mahasiswa bertalenta untuk bergabung dalam Tim Magang Riset 2026. Dapatkan pengalaman langsung merancang teknologi pertanian pintar, akuisisi sensor IoT real-time, serta bimbingan intensif dari profesor riset.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-emerald-400" />
                <span>Tanggal Terbit: {item.date}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-emerald-400" />
                <span>Batas Pendaftaran: 15 Agustus 2026</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <Award className="h-4 w-4 text-amber-400" />
                <span>Benefit: Terbit ID Magang Resmi & Sertifikat</span>
              </span>
            </div>
          </div>
        </div>

        {/* QUICK STATS & INFORMATION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs font-mono">
              <Calendar className="h-4 w-4" />
              <span>Periode Pendaftaran</span>
            </div>
            <p className="text-sm font-bold text-slate-900">25 Juli – 15 Ags 2026</p>
            <p className="text-[11px] text-slate-500">Seleksi berkas gelombang 1</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs font-mono">
              <MapPin className="h-4 w-4" />
              <span>Lokasi Laboratorium</span>
            </div>
            <p className="text-sm font-bold text-slate-900">Bandung Techno Park</p>
            <p className="text-[11px] text-slate-500 leading-tight">Jl. Telekomunikasi No.1, Sukapura, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40257</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs font-mono">
              <Users className="h-4 w-4" />
              <span>Target Peserta</span>
            </div>
            <p className="text-sm font-bold text-slate-900">Mahasiswa Telkom & Publik</p>
            <p className="text-[11px] text-slate-500">Informatika, Elektro, Fisika, dll</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs font-mono">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Luaran Magang</span>
            </div>
            <p className="text-sm font-bold text-slate-900">ID Magang & Akses LMS</p>
            <p className="text-[11px] text-slate-500">Portofolio Riset Terverifikasi</p>
          </div>
        </div>

        {/* DIVISI MAGANG YANG DIBUKA */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 uppercase">
              <Briefcase className="h-4 w-4" />
              <span>Divisi Lowongan Magang</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Pilih Divisi Sesuai Minat & Keahlian Anda
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Setiap mahasiswa magang akan dibimbing oleh Asisten Utama dan Profesor Pembimbing Riset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {divisions.map((div, idx) => {
              const Icon = div.icon;
              return (
                <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${div.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">{div.title}</h3>
                        <span className="text-[10px] font-mono text-emerald-700 font-semibold">Smart Grow Lab Division</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {div.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="text-[10px] font-mono font-bold text-slate-400 block mb-1.5 uppercase">Keterampilan Utama:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {div.skills.map((sk, sIdx) => (
                        <span key={sIdx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono font-medium text-slate-700">
                          #{sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ALUR SELEKSI 5 TAHAP */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 uppercase">
              <FileText className="h-4 w-4" />
              <span>Transparansi Rekrutmen</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              Alur Seleksi Pendaftaran Magang 5 Tahap
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Proses pendaftaran transparan dari pengajuan berkas publik hingga pengeluaran ID Magang Resmi.
            </p>
          </div>

          <div className="space-y-4">
            {selectionStages.map((st, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white font-mono font-extrabold flex items-center justify-center text-sm shrink-0 shadow-sm">
                  {st.stage}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="font-bold text-sm text-slate-900">{st.title}</h3>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {st.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BIG CALL TO ACTION (CTA) CARD */}
        {onOpenJoinModal && (
          <div className="rounded-3xl bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 text-white p-8 sm:p-10 shadow-xl text-center space-y-4 border border-emerald-500/40">
            <Sparkles className="h-8 w-8 text-amber-300 mx-auto animate-bounce" />
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Siap Bergabung dengan Tim Riset Smart Grow Laboratory?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mx-auto leading-relaxed">
              Ajukan formulir pendaftaran Anda sekarang. Pendaftaran tidak dipungut biaya dan terbuka bagi mahasiswa yang ingin mengembangkan portofolio riset nyata.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenJoinModal}
                className="px-8 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-xl transition-all hover:scale-105 cursor-pointer uppercase tracking-wider inline-flex items-center gap-2"
              >
                <span>Formulir Pendaftaran Magang (Join Us)</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* FAQ & COMMENTS SECTION */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-emerald-600" />
                <span>Pertanyaan & Komentar Pendaftar ({comments.length})</span>
              </h3>
              <p className="text-xs text-slate-500">Diskusi dan tanya jawab seputar alur magang Smart Grow Laboratory.</p>
            </div>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-bold text-xs text-slate-700 font-mono uppercase">Tanyakan Sesuatu Mengenai Rekrutmen:</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Email / Kontak</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  placeholder="budi@student.telkomuniversity.ac.id"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1 text-xs">Pertanyaan / Komentar</label>
              <textarea
                rows={3}
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                placeholder="Tuliskan pertanyaan Anda mengenai kuota divisi, jadwal wawancara, atau berkas..."
                required
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {commentSuccess ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Pertanyaan berhasil dikirim!
                </span>
              ) : <span />}

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Kirim Pertanyaan</span>
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3 pt-2">
            {comments.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">Belum ada pertanyaan. Jadi pendaftar pertama yang bertanya!</p>
            ) : (
              comments.map(c => (
                <div key={c.id} className="p-4 rounded-2xl bg-white border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{c.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{c.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
