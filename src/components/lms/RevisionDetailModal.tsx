import React, { useState } from 'react';
import { Task, RevisionItem } from '../../types';
import { 
  X, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Github, 
  Send, 
  MessageSquare, 
  History, 
  AlertCircle,
  Plus
} from 'lucide-react';

interface RevisionDetailModalProps {
  task: Task;
  onClose: () => void;
  onRequestRevision?: (taskId: string, revisionNote: string, assistantNotes: string) => void;
  isAssistant?: boolean;
  darkMode?: boolean;
}

export default function RevisionDetailModal({
  task,
  onClose,
  onRequestRevision,
  isAssistant = true,
  darkMode = false
}: RevisionDetailModalProps) {
  const [newDesc, setNewDesc] = useState('');
  const [newAssistantNote, setNewAssistantNote] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const revisions: RevisionItem[] = task.revisions && task.revisions.length > 0 
    ? task.revisions 
    : [
        {
          id: 'rev_default_1',
          revisionDate: '21 Juli 2026 14:00 WIB',
          version: 'v1.0',
          studentName: task.assignedStudentName,
          description: 'Penyerahan awal sketsa skematik PCB dan kode program Arduino.',
          assistantNotes: task.feedback || 'Tolong rapikan tata letak komponen di EasyEDA dan pastikan baud rate Modbus 9600.',
          status: 'pending',
          history: 'Diminta revisi oleh Asisten Lab pada 21 Juli 2026'
        }
      ];

  const handleAddRevisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onRequestRevision) {
      onRequestRevision(task.id, newDesc, newAssistantNote);
    }
    setNewDesc('');
    setNewAssistantNote('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full p-6 space-y-6 shadow-2xl border border-slate-100 dark:border-slate-700 max-h-[90vh] overflow-y-auto animate-scale-in">
        
        {/* MODAL HEADER */}
        <div className="flex items-start justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                Sistem Perbaikan & Revisi
              </span>
              <span className="text-xs text-slate-400 font-mono">{task.taskNumber || 'TGS-2026-001'}</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{task.title}</h2>
            <p className="text-xs text-slate-500">Mahasiswa: <span className="font-semibold text-slate-700 dark:text-slate-200">{task.assignedStudentName}</span> • Proyek: <span className="font-semibold text-slate-700 dark:text-slate-200">{task.projectName || 'Smart Grow IoT'}</span></p>
          </div>

          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* SUMMARY BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-700/30 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Status Tugas Saat Ini</span>
            <p className="font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mt-0.5">
              <RotateCcw className="h-4 w-4" />
              <span>Memerlukan Revisi (Revisi Ke-{revisions.length})</span>
            </p>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Tenggat Perbaikan</span>
            <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{task.deadline}</p>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Iterasi Revisi</span>
            <p className="font-semibold text-slate-800 dark:text-slate-200 mt-0.5">{revisions.length} Versi Perbaikan</p>
          </div>
        </div>

        {/* ACTION: ADD REVISION FORM (FOR ASSISTANT) */}
        {isAssistant && (
          <div>
            {!showAddForm ? (
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-amber-300 dark:border-amber-700 hover:border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>+ Buat Permintaan Revisi Baru ke Mahasiswa</span>
              </button>
            ) : (
              <form onSubmit={handleAddRevisionSubmit} className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-3 text-xs">
                <h4 className="font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <span>Formulir Instuksi Revisi Baru</span>
                </h4>

                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Catatan Detail Instuksi Perbaikan dari Asisten</label>
                  <textarea 
                    rows={3}
                    value={newAssistantNote}
                    onChange={e => setNewAssistantNote(e.target.value)}
                    placeholder="Contoh: Kode program masih memiliki bug pada sensor pH. Lakukan perbaikan kalibrasi dan perbarui berkas dokumen bab 3."
                    required
                    className="w-full px-3 py-2 rounded-xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Deskripsi Poin Perubahan Yang Diharapkan</label>
                  <input 
                    type="text"
                    value={newDesc}
                    onChange={e => setNewDesc(e.target.value)}
                    placeholder="Contoh: Perbaikan skematik PCB & Kalibrasi sensor pH EC"
                    required
                    className="w-full px-3 py-2 rounded-xl border border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-800"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-xl bg-white dark:bg-slate-700 font-semibold text-slate-600 dark:text-slate-300">
                    Batal
                  </button>
                  <button type="submit" className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-md flex items-center gap-1.5">
                    <Send className="h-3.5 w-3.5" />
                    <span>Kirim Instruksi Revisi</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* REVISION HISTORY TABLE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <History className="h-4 w-4 text-emerald-600" />
              <span>Tabel Riwayat & Histori Revisi ({revisions.length})</span>
            </h3>
            <span className="text-[11px] text-slate-400">Urut berdasarkan versi terbaru</span>
          </div>

          <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">Versi</th>
                  <th className="py-3 px-4">Tanggal Permintaan</th>
                  <th className="py-3 px-4">Mahasiswa</th>
                  <th className="py-3 px-4">Catatan Asisten</th>
                  <th className="py-3 px-4">Deskripsi Perbaikan</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Histori</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {revisions.map((rev) => (
                  <tr key={rev.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-700 dark:text-amber-400">
                      {rev.version}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {rev.revisionDate}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                      {rev.studentName}
                    </td>
                    <td className="py-3.5 px-4 max-w-xs text-slate-700 dark:text-slate-300">
                      <div className="p-2 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800 text-[11px] leading-relaxed">
                        {rev.assistantNotes}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 max-w-xs">
                      {rev.description}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                        rev.status === 'completed' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {rev.status === 'completed' ? <CheckCircle2 className="h-3 w-3" /> : <RotateCcw className="h-3 w-3" />}
                        <span>{rev.status === 'completed' ? 'Diperbaiki & Disetujui' : 'Menunggu Perbaikan'}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-[10px] text-slate-400 max-w-xs">
                      {rev.history || 'Dalam proses pengerjaan oleh mahasiswa'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-all"
          >
            Tutup Jendela Revisi
          </button>
        </div>

      </div>
    </div>
  );
}
