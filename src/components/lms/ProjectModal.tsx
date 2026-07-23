import React, { useState } from 'react';
import { LmsProject, User } from '../../types';
import { 
  X, 
  FolderKanban, 
  Github, 
  FileText, 
  Users, 
  Image, 
  Sparkles,
  Save
} from 'lucide-react';

interface ProjectModalProps {
  project?: LmsProject | null;
  students?: User[];
  onClose: () => void;
  onSave: (project: any) => void;
  darkMode?: boolean;
}

export default function ProjectModal({
  project,
  students = [],
  onClose,
  onSave,
  darkMode = false
}: ProjectModalProps) {
  const isEdit = !!project;

  const [title, setTitle] = useState(project?.title || '');
  const [projectNumber, setProjectNumber] = useState(project?.projectNumber || `PRJ-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [category, setCategory] = useState(project?.category || 'IoT & Hydroponics');
  const [description, setDescription] = useState(project?.description || '');
  const [supervisor, setSupervisor] = useState(project?.supervisor || 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.');
  const [assignedStudents, setAssignedStudents] = useState<string[]>(
    project?.assignedStudentNames || ['Fathur Rahman', 'Nabila Putri']
  );
  const [status, setStatus] = useState<'planning' | 'in_progress' | 'review' | 'completed' | 'archived'>(project?.status || 'in_progress');
  const [progressPercent, setProgressPercent] = useState<number>(project?.progressPercent || 25);
  const [deadline, setDeadline] = useState(project?.deadline || '2026-10-30');
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl || 'https://github.com/smartgrowlab');
  const [coverImage, setCoverImage] = useState(project?.coverImage || 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=600');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const studentObjs = assignedStudents.map((sName, idx) => ({
      id: `std_${idx}`,
      name: sName,
      role: 'Hardware & IoT Researcher',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
    }));

    const data = {
      ...(project || {}),
      title,
      projectNumber,
      category,
      description,
      supervisor,
      students: studentObjs,
      status,
      progressPercent,
      deadline,
      githubUrl,
      coverImage
    };

    onSave(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl border border-slate-100 dark:border-slate-700 max-h-[90vh] overflow-y-auto animate-scale-in">
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#2E7D32] dark:text-emerald-300">
              <FolderKanban className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {isEdit ? 'Edit Proyek Riset IoT' : 'Tambah Proyek Riset Baru'}
              </h3>
              <p className="text-xs text-slate-400">Pengelolaan modul & laboratorium Smart Grow</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Nama Judul Proyek Riset</label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="Contoh: Sistem Dosing Nutrisi Otomatis NFT Hydroponic"
                required 
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 font-semibold text-slate-800 dark:text-slate-100" 
              />
            </div>
            <div>
              <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Kode / No. Proyek</label>
              <input 
                type="text" 
                value={projectNumber} 
                onChange={e => setProjectNumber(e.target.value)} 
                required 
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 font-mono" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Kategori Riset</label>
              <select 
                value={category} 
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 font-medium"
              >
                <option value="IoT & Hydroponics">IoT & Hydroponics</option>
                <option value="Machine Learning">Machine Learning & Computer Vision</option>
                <option value="Smart Dosing System">Smart Dosing System</option>
                <option value="Mobile & Web Platform">Mobile & Web Platform</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Dosen Pembimbing Utama</label>
              <input 
                type="text" 
                value={supervisor} 
                onChange={e => setSupervisor(e.target.value)} 
                required 
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" 
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Deskripsi & Ruang Lingkup Proyek</label>
            <textarea 
              rows={3} 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              placeholder="Jelaskan secara rinci arsitektur hardware, modul sensor, serta target luaran proyek."
              required 
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Status Proyek</label>
              <select 
                value={status} 
                onChange={e => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700"
              >
                <option value="active">Aktif Berjalan</option>
                <option value="completed">Selesai</option>
                <option value="delayed">Tertunda / Delay</option>
                <option value="archived">Diarsip</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Progress Terpenuhi (%)</label>
              <input 
                type="number" 
                min={0} 
                max={100} 
                value={progressPercent} 
                onChange={e => setProgressPercent(Number(e.target.value))} 
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" 
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Tenggat Riset (Deadline)</label>
              <input 
                type="date" 
                value={deadline} 
                onChange={e => setDeadline(e.target.value)} 
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">Repository GitHub</label>
              <input 
                type="text" 
                value={githubUrl} 
                onChange={e => setGithubUrl(e.target.value)} 
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 font-mono" 
              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-200 font-semibold mb-1">URL Foto Visual Proyek</label>
              <input 
                type="text" 
                value={coverImage} 
                onChange={e => setCoverImage(e.target.value)} 
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700" 
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-bold shadow-md flex items-center gap-1.5"
            >
              <Save className="h-4 w-4" />
              <span>{isEdit ? 'Simpan Pembaruan Proyek' : 'Tambah Proyek Riset'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
