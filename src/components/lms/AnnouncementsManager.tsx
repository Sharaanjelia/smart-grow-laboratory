import React, { useState } from 'react';
import { Announcement } from '../../types';
import { 
  Megaphone, 
  Plus, 
  Edit3, 
  Trash2, 
  Pin, 
  Calendar, 
  Paperclip, 
  UserCheck, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  X, 
  FileText, 
  Send,
  Sparkles,
  ChevronRight,
  Eye,
  AlertCircle
} from 'lucide-react';

interface AnnouncementsManagerProps {
  announcements: Announcement[];
  onCreateAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  onUpdateAnnouncement?: (announcement: Announcement) => void;
  onDeleteAnnouncement?: (id: string) => void;
  currentUserRole?: string;
  currentUserName?: string;
  darkMode?: boolean;
}

export default function AnnouncementsManager({
  announcements,
  onCreateAnnouncement,
  onUpdateAnnouncement,
  onDeleteAnnouncement,
  currentUserRole = 'assistant',
  currentUserName = 'Asisten Lab',
  darkMode = false
}: AnnouncementsManagerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAnn, setEditingAnn] = useState<Announcement | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<string>('Laboratorium');
  const [content, setContent] = useState('');
  const [targetAudience, setTargetAudience] = useState('Semua');
  const [status, setStatus] = useState<'published' | 'draft' | 'scheduled'>('published');
  const [scheduledDate, setScheduledDate] = useState('2026-07-25');
  const [priority, setPriority] = useState<'normal' | 'important' | 'urgent'>('normal');
  const [isPinned, setIsPinned] = useState(false);
  const [attachmentName, setAttachmentName] = useState('');
  const [attachmentUrl, setAttachmentUrl] = useState('');

  const openCreateModal = () => {
    setEditingAnn(null);
    setTitle('');
    setCategory('Laboratorium');
    setContent('');
    setTargetAudience('Semua');
    setStatus('published');
    setPriority('normal');
    setIsPinned(false);
    setAttachmentName('');
    setAttachmentUrl('');
    setModalOpen(true);
  };

  const openEditModal = (ann: Announcement) => {
    setEditingAnn(ann);
    setTitle(ann.title);
    setCategory(ann.category || 'Laboratorium');
    setContent(ann.content);
    setTargetAudience(ann.targetAudience || 'Semua');
    setStatus(ann.status || 'published');
    setScheduledDate(ann.scheduledDate || '2026-07-25');
    setPriority(ann.priority || 'normal');
    setIsPinned(ann.isPinned || false);
    if (ann.attachments && ann.attachments.length > 0) {
      setAttachmentName(ann.attachments[0].name);
      setAttachmentUrl(ann.attachments[0].url);
    } else {
      setAttachmentName('');
      setAttachmentUrl('');
    }
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const attachments = attachmentName ? [{ name: attachmentName, url: attachmentUrl || '#' }] : undefined;

    if (editingAnn && onUpdateAnnouncement) {
      onUpdateAnnouncement({
        ...editingAnn,
        title,
        category,
        content,
        targetAudience,
        status,
        scheduledDate: status === 'scheduled' ? scheduledDate : undefined,
        priority,
        isPinned,
        attachments
      });
    } else {
      onCreateAnnouncement({
        title,
        category,
        content,
        authorName: currentUserName,
        authorRole: currentUserRole === 'director' ? 'Director' : 'Assistant',
        targetAudience,
        status,
        scheduledDate: status === 'scheduled' ? scheduledDate : undefined,
        priority,
        isPinned,
        attachments
      });
    }

    setModalOpen(false);
  };

  const togglePin = (ann: Announcement) => {
    if (onUpdateAnnouncement) {
      onUpdateAnnouncement({
        ...ann,
        isPinned: !ann.isPinned
      });
    }
  };

  const filteredAnnouncements = announcements.filter(a => {
    const matchesSearch = (a.title || '').toLowerCase().includes(search.toLowerCase()) || 
                          (a.content || '').toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (categoryFilter !== 'all' && a.category !== categoryFilter) return false;
    return true;
  });

  // Sort pinned to top
  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => {
    if (a.isPinned === b.isPinned) return 0;
    return a.isPinned ? -1 : 1;
  });

  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* HEADER & TOP CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-[#2E7D32]" />
            <span>Pengumuman & Informasi Laboratorium Smart Grow</span>
          </h2>
          <p className="text-xs text-slate-500">Kelola informasi resmi, penjadwalan, penyematan (pin), dan lampiran pengumuman untuk mahasiswa magang & tim riset.</p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>+ Buat Pengumuman Baru</span>
        </button>
      </div>

      {/* SEARCH AND CATEGORY FILTERS */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari judul atau kata kunci pengumuman..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Filter className="h-4 w-4 text-slate-400 shrink-0" />
          {['all', 'Magang', 'Penelitian', 'Workshop', 'Seminar', 'Jadwal', 'Maintenance', 'Laboratorium', 'General'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                categoryFilter === cat
                  ? 'bg-[#2E7D32] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* ANNOUNCEMENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedAnnouncements.map((ann) => (
          <div
            key={ann.id}
            className={`bg-white dark:bg-slate-800 rounded-3xl p-6 border transition-all flex flex-col justify-between shadow-xs ${
              ann.isPinned
                ? 'border-emerald-500/80 ring-2 ring-emerald-500/20 dark:border-emerald-700'
                : 'border-slate-200/80 dark:border-slate-700/80'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  {ann.isPinned && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold flex items-center gap-1 border border-emerald-300">
                      <Pin className="h-3 w-3 fill-emerald-600" />
                      <span>Disematkan (Pinned)</span>
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[10px] font-bold">
                    {ann.category || 'Laboratorium'}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    ann.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                    ann.priority === 'important' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {ann.priority === 'urgent' ? 'Urgent' : ann.priority === 'important' ? 'Penting' : 'Normal'}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => togglePin(ann)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      ann.isPinned
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : 'bg-slate-100 text-slate-400 border-slate-200 hover:text-emerald-600'
                    }`}
                    title={ann.isPinned ? 'Lepas Sematan' : 'Sematkan ke Atas'}
                  >
                    <Pin className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => openEditModal(ann)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-200 cursor-pointer"
                    title="Edit Pengumuman"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  {onDeleteAnnouncement && (
                    <button
                      onClick={() => onDeleteAnnouncement(ann.id)}
                      className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 cursor-pointer"
                      title="Hapus Pengumuman"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100 leading-snug">
                {ann.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {ann.content}
              </p>

              {ann.attachments && ann.attachments.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] text-slate-400 font-bold block mb-1">Lampiran Berkas:</span>
                  {ann.attachments.map((att, idx) => (
                    <a
                      key={idx}
                      href={att.url}
                      download
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/80 text-emerald-700 dark:text-emerald-300 font-bold text-xs hover:underline border border-slate-200 dark:border-slate-600"
                    >
                      <Paperclip className="h-3.5 w-3.5" />
                      <span>{att.name}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <UserCheck className="h-3.5 w-3.5 text-[#2E7D32]" />
                <span>{ann.authorName} ({ann.authorRole})</span>
              </div>
              <div className="flex items-center gap-1 font-mono">
                <Calendar className="h-3.5 w-3.5" />
                <span>{ann.date}</span>
              </div>
            </div>
          </div>
        ))}

        {sortedAnnouncements.length === 0 && (
          <div className="col-span-2 text-center py-12 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700">
            <Megaphone className="h-10 w-10 mx-auto text-slate-400 mb-2" />
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Belum ada pengumuman dalam kategori ini</p>
            <p className="text-xs text-slate-400 mt-1">Klik "+ Buat Pengumuman Baru" untuk memublikasikan informasi pertama.</p>
          </div>
        )}
      </div>

      {/* MODAL CREATE / EDIT ANNOUNCEMENT */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-700 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {editingAnn ? 'Edit Pengumuman Laboratorium' : 'Buat Pengumuman Laboratorium Baru'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Judul Pengumuman</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Contoh: Jadwal Evaluasi Proyek Riset Minggu Ke-4"
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Kategori</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 font-semibold"
                  >
                    <option value="Magang">Magang</option>
                    <option value="Penelitian">Penelitian</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Jadwal">Jadwal</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Laboratorium">Laboratorium</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Target Penerima</label>
                  <select
                    value={targetAudience}
                    onChange={e => setTargetAudience(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 font-semibold"
                  >
                    <option value="Semua">Semua Pengguna</option>
                    <option value="Mahasiswa Magang">Mahasiswa Magang</option>
                    <option value="Asisten">Asisten Lab</option>
                    <option value="Peneliti">Peneliti & Dosen</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Isi Pengumuman & Deskripsi Lengkap</label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Tuliskan isi pengumuman secara rinci..."
                  required
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Status</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 font-semibold"
                  >
                    <option value="published">Publish Langsung</option>
                    <option value="draft">Simpan Draft</option>
                    <option value="scheduled">Jadwalkan Publikasi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Prioritas</label>
                  <select
                    value={priority}
                    onChange={e => setPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 font-semibold"
                  >
                    <option value="normal">Normal</option>
                    <option value="important">Penting</option>
                    <option value="urgent">Urgent / Mendesak</option>
                  </select>
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPinned}
                      onChange={e => setIsPinned(e.target.checked)}
                      className="rounded text-emerald-600"
                    />
                    <span className="font-bold text-slate-700 dark:text-slate-200">Pin ke Atas</span>
                  </label>
                </div>
              </div>

              {status === 'scheduled' && (
                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Tanggal Terjadwal</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={e => setScheduledDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700"
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Lampiran File (Opsional)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Nama file lampiran (mis. Panduan_Lab.pdf)"
                    value={attachmentName}
                    onChange={e => setAttachmentName(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700"
                  />
                  <input
                    type="text"
                    placeholder="URL file lampiran"
                    value={attachmentUrl}
                    onChange={e => setAttachmentUrl(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2E7D32] text-white font-bold shadow-md"
                >
                  {editingAnn ? 'Simpan Perubahan' : 'Publikasikan Pengumuman'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
