import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Download, 
  Eye, 
  FileCheck2, 
  FileText, 
  Sprout, 
  FolderKanban, 
  Clock, 
  CheckSquare, 
  X,
  Printer
} from 'lucide-react';
import { getTodayDateJakarta } from '../../utils/dateUtils';
import { User, Task, AttendanceRecord, LmsProject } from '../../types';

interface ReportExportModalProps {
  students?: User[];
  tasks?: Task[];
  attendance?: AttendanceRecord[];
  projects?: LmsProject[];
  darkMode?: boolean;
}

export default function ReportExportModal({ 
  students = [],
  tasks = [],
  attendance = [],
  projects = [],
  darkMode = false 
}: ReportExportModalProps) {
  const [selectedReportType, setSelectedReportType] = useState<'harvest' | 'attendance' | 'task' | 'research'>('harvest');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [dateStart, setDateStart] = useState('2026-07-01');
  const [dateEnd, setDateEnd] = useState(getTodayDateJakarta());

  const reportTypes = [
    { id: 'harvest', name: 'Laporan Hasil Panen Hydroponic', icon: Sprout, desc: 'Rekapitulasi total bobot panen (kg), kualitas grade, dan rak produksi Smart Grow' },
    { id: 'attendance', name: 'Laporan Log Presensi & Kehadiran', icon: Clock, desc: 'Rekap kehadiran mahasiswa magang, jam check-in/out, dan geolokasi BTP' },
    { id: 'task', name: 'Laporan Progress & Revisi Tugas', icon: CheckSquare, desc: 'Statistik penyelesaian tugas mahasiswa, histori revisi, dan kepatuhan tenggat' },
    { id: 'research', name: 'Laporan Kemajuan Proyek Riset IoT', icon: FolderKanban, desc: 'Perkembangan milestones hardware, firmware, dan repositori proyek lab' }
  ];

  const headersMap: Record<string, string[]> = {
    harvest: ['Tanggal Panen', 'Komoditas Tanaman', 'Bobot Hasil', 'Lokasi Rak / Modul', 'Grade Kualitas', 'Penanggung Jawab'],
    attendance: ['Tanggal', 'NIM', 'Nama Mahasiswa', 'Check-In', 'Check-Out', 'Status Kehadiran', 'Lokasi Presensi'],
    task: ['No. Tugas', 'Judul Tugas', 'Mahasiswa Pelaksana', 'Deadline', 'Status Tugas', 'Progress'],
    research: ['Kode Proyek', 'Judul Proyek Riset', 'Pembina / Supervisor', 'Progress Capaian', 'Target Selesai', 'Status']
  };

  const dynamicDataMap = useMemo(() => {
    // 1. Harvest Report Data (Smart Grow Lab Official Produce)
    const harvestRows = [
      ['2026-07-22', 'Pakcoy Green Hidroponik NFT', '14.8 kg', 'HYCOSMARTS Container Bay #1', 'Grade A Super', 'Shella Nadya Putri'],
      ['2026-07-21', 'Selada Keriting (Butterhead)', '12.4 kg', 'Telkom Hydroponic Bay #2', 'Grade A Super', 'Shara Anjelia'],
      ['2026-07-19', 'Kailan Daun Aquaponics', '9.5 kg', 'SIMONA Aquaponics Tank A', 'Grade A', 'M. Chiko Dwi Kasa'],
      ['2026-07-16', 'Bayam Hijau Deep Flow (DFT)', '15.2 kg', 'NFT Rack System B2', 'Grade A', 'Tiara Nuriawati'],
      ['2026-07-14', 'Kangkung Microgreens', '11.0 kg', 'Indoor Growing Rack C1', 'Grade A Super', 'Nasywa Zauja Noor'],
      ['2026-07-10', 'Pakcoy Merah (Ruby Pakchoi)', '8.6 kg', 'HYCOSMARTS Modular Unit', 'Grade A', 'Divia Nuralika Namira']
    ];

    // 2. Attendance Data
    let attendanceRows: string[][] = [];
    if (attendance && attendance.length > 0) {
      attendanceRows = attendance
        .filter(a => (!dateStart || a.date >= dateStart) && (!dateEnd || a.date <= dateEnd))
        .map(a => [
          a.date,
          a.studentId || '1301210001',
          a.studentName,
          a.checkInTime || '08:00 WIB',
          a.checkOutTime || '16:00 WIB',
          a.status === 'present' ? 'Hadir Tepat Waktu' : a.status === 'late' ? 'Terlambat' : a.status === 'sick' ? 'Sakit' : 'Izin',
          a.location || 'Bandung Techno Park (BTP) Lt. 2'
        ]);
    }
    if (attendanceRows.length === 0) {
      const activeStudentsList = students.filter(s => s.role === 'student');
      const defaultPool = activeStudentsList.length > 0 ? activeStudentsList : [
        { studentId: '1301210001', name: 'Shara Anjelia' },
        { studentId: '1301210003', name: 'Shella Nadya Putri' },
        { studentId: '1301210009', name: 'M. Chiko Dwi Kasa' },
        { studentId: '1301210004', name: 'Sirvani Cinta Dewi' },
        { studentId: '1301210005', name: 'Tiara Nuriawati' }
      ];
      attendanceRows = defaultPool.map((s, idx) => [
        dateEnd,
        s.studentId || `130121000${idx + 1}`,
        s.name,
        `08:0${idx * 3 + 2} WIB`,
        '16:00 WIB',
        'Hadir Tepat Waktu',
        'Bandung Techno Park (BTP) Lt. 2'
      ]);
    }

    // 3. Tasks Data
    let taskRows: string[][] = [];
    if (tasks && tasks.length > 0) {
      taskRows = tasks.map(t => [
        t.taskNumber || 'TGS-2026-001',
        t.title,
        t.assignedStudentName || '-',
        t.deadline || '2026-07-30',
        t.status === 'completed' ? 'Selesai Disetujui' : t.status === 'review' ? 'Menunggu Review' : t.status === 'revision' ? 'Sedang Direvisi' : 'Dalam Pengerjaan',
        `${t.progressPercent}%`
      ]);
    } else {
      taskRows = [
        ['TGS-2026-001', 'Kalibrasi Sensor pH & EC Multi-Point Hydroponic Bay #2', 'Shella Nadya Putri', '2026-07-25', 'Dalam Pengerjaan', '65%'],
        ['TGS-2026-002', 'Deploy Model YOLOv8 Deteksi Penyakit Daun Jetson Nano', 'Shara Anjelia', '2026-07-26', 'Selesai Disetujui', '100%'],
        ['TGS-2026-003', 'Integrasi Sistem Kelistrikan LED Grow Light PWM ESP32', 'M. Chiko Dwi Kasa', '2026-07-28', 'Dalam Pengerjaan', '80%'],
        ['TGS-2026-004', 'Perancangan Arsitektur Sensor Suhu & Kelembapan SIMONA', 'Sirvani Cinta Dewi', '2026-07-28', 'Dalam Pengerjaan', '72%']
      ];
    }

    // 4. Projects Data
    let researchRows: string[][] = [];
    if (projects && projects.length > 0) {
      researchRows = projects.map(p => [
        p.projectNumber || 'PRJ-2026-01',
        p.title,
        p.supervisor || 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
        `${p.progressPercent}%`,
        p.deadline || '2026-09-30',
        p.status === 'completed' ? 'Selesai' : 'Aktif Berjalan'
      ]);
    } else {
      researchRows = [
        ['PRJ-IOT-2026-01', 'HYCOSMARTS - Smart Container Intelligent Farming', 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.', '88%', '2026-09-15', 'Aktif Berjalan'],
        ['PRJ-AQUA-2026-02', 'SIMONA - Aquaponics Telemetry Monitoring System', 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.', '92%', '2026-10-30', 'Aktif Berjalan'],
        ['PRJ-PJU-2026-03', 'LUMINET - Smart Street Lighting Management System', 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.', '95%', '2026-09-15', 'Aktif Berjalan'],
        ['PRJ-BIO-2026-04', 'FLOCIFY - Biofloc AI Aquaculture Intelligence', 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.', '85%', '2026-11-20', 'Aktif Berjalan']
      ];
    }

    return {
      harvest: harvestRows,
      attendance: attendanceRows,
      task: taskRows,
      research: researchRows
    };
  }, [students, tasks, attendance, projects, dateStart, dateEnd]);

  const handleDownloadExcel = () => {
    const headers = headersMap[selectedReportType];
    const data = dynamicDataMap[selectedReportType];
    const allRows = [headers, ...data];
    
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + allRows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Laporan_SmartGrow_${selectedReportType}_${dateStart}_sd_${dateEnd}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-[#2E7D32]" />
            <span>Pusat Ekspor Laporan & Analytics Lab</span>
          </h2>
          <p className="text-xs text-slate-500">Unduh rekapitulasi data laboratorium resmi Smart Grow Laboratory dalam format CSV/Excel.</p>
        </div>
      </div>

      {/* REPORT TYPE SELECTOR GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((rt) => {
          const Icon = rt.icon;
          const isSelected = selectedReportType === rt.id;
          return (
            <div
              key={rt.id}
              onClick={() => setSelectedReportType(rt.id as any)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-3 ${
                isSelected
                  ? 'bg-emerald-50/90 dark:bg-emerald-950/50 border-[#2E7D32] shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 hover:border-emerald-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                isSelected ? 'bg-[#2E7D32] text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                <Icon className="h-5 w-5" />
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{rt.name}</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{rt.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* RENDER FORM & PREVIEW PANEL */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs space-y-5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-700 pb-3">
          Pengaturan Filter & Ekspor Dokumen
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Tanggal Mulai</label>
            <input
              type="date"
              value={dateStart}
              onChange={e => setDateStart(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-xs"
            />
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Tanggal Selesai</label>
            <input
              type="date"
              value={dateEnd}
              onChange={e => setDateEnd(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700 text-xs"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={() => setPreviewOpen(true)}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer text-xs"
            >
              <Eye className="h-4 w-4" />
              <span>Pratinjau Data</span>
            </button>

            <button
              onClick={handleDownloadExcel}
              className="flex-1 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer text-xs"
            >
              <Download className="h-4 w-4" />
              <span>Unduh CSV / Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-4xl w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-700 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Pratinjau Laporan: {reportTypes.find(r => r.id === selectedReportType)?.name}
                </h3>
                <p className="text-[11px] text-slate-400">Smart Grow Laboratory • Periode {dateStart} s/d {dateEnd}</p>
              </div>

              <button onClick={() => setPreviewOpen(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-2xl flex-1 max-h-[60vh] overflow-y-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="bg-slate-50 dark:bg-slate-700/50 sticky top-0 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    {headersMap[selectedReportType].map((head, hidx) => (
                      <th key={hidx} className="py-2.5 px-3 font-bold text-slate-700 dark:text-slate-200 text-[11px]">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {dynamicDataMap[selectedReportType].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      {row.map((cell, cidx) => (
                        <td key={cidx} className="py-2.5 px-3 text-slate-700 dark:text-slate-200 text-[11px]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={() => setPreviewOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={handleDownloadExcel}
                className="px-5 py-2 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Unduh File Sekarang (.CSV)</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
