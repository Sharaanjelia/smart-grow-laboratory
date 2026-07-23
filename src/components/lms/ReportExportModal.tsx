import React, { useState } from 'react';
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

interface ReportExportModalProps {
  darkMode?: boolean;
}

export default function ReportExportModal({ darkMode = false }: ReportExportModalProps) {
  const [selectedReportType, setSelectedReportType] = useState<'harvest' | 'attendance' | 'task' | 'research'>('harvest');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [dateStart, setDateStart] = useState('2026-07-01');
  const [dateEnd, setDateEnd] = useState('2026-07-22');

  const reportTypes = [
    { id: 'harvest', name: 'Laporan Hasil Panen Hydroponic', icon: Sprout, desc: 'Rekapitulasi total bobot panen (kg), kualitas grade, dan rak produksi' },
    { id: 'attendance', name: 'Laporan Log Presensi & Kehadiran', icon: Clock, desc: 'Rekap rasio kehadiran, jam terlambat, dan aktivitas mahasiswa' },
    { id: 'task', name: 'Laporan Progress & Revisi Tugas', icon: CheckSquare, desc: 'Statistik penyelesaian tugas, revisi berulang, dan kepatuhan deadline' },
    { id: 'research', name: 'Laporan Kemajuan Proyek Riset IoT', icon: FolderKanban, desc: 'Perkembangan milestones hardware, firmware, dan repositori GitHub' }
  ];

  const sampleDataMap = {
    harvest: [
      ['2026-07-21', 'Kangkung Hidroponik', '14.8 kg', 'Telkom Rack A1-A4', 'Grade A Super', 'Fathur Rahman'],
      ['2026-07-20', 'Pakcoy Green', '11.2 kg', 'NFT Rack B2', 'Grade A', 'Nabila Putri'],
      ['2026-07-18', 'Selada Keriting', '8.5 kg', 'Deep Water Culture C1', 'Grade A', 'Farhan Rizky']
    ],
    attendance: [
      ['2026-07-22', '1301210042', 'Fathur Rahman', '08:05 WIB', '17:00 WIB', 'Hadir Tepat Waktu', 'Lab FIT Lt.3'],
      ['2026-07-22', '1301210089', 'Nabila Putri', '08:12 WIB', '17:05 WIB', 'Hadir Tepat Waktu', 'Lab FIT Lt.3'],
      ['2026-07-22', '1301210104', 'Farhan Rizky', '08:45 WIB', '17:00 WIB', 'Terlambat 15 Mnt', 'Lab FIT Lt.3']
    ],
    task: [
      ['TGS-2026-001', 'Skematik PCB & Modbus RS485', 'Fathur Rahman', '2026-07-25', 'Menunggu Review', 'v1.1 Revisi'],
      ['TGS-2026-002', 'Inisialisasi Model Computer Vision', 'Nabila Putri', '2026-07-28', 'Selesai', 'v1.0 Disetujui'],
      ['TGS-2026-003', 'Dashboard Monitoring IoT React', 'Farhan Rizky', '2026-07-30', 'Dalam Proses', 'v1.0 In Progress']
    ],
    research: [
      ['PRJ-2026-101', 'Sistem Dosing Nutrisi Otomatis NFT', 'Prof. Dr. Indrarini', '75%', '2026-09-30', 'Aktif'],
      ['PRJ-2026-102', 'Klasifikasi Penyakit Daun Kangkung YOLOv8', 'Dr. Ir. Asep Kurnia', '90%', '2026-08-15', 'Aktif'],
      ['PRJ-2026-103', 'Monitoring EC/pH Terdistribusi ESP32', 'Prof. Dr. Indrarini', '40%', '2026-10-30', 'Aktif']
    ]
  };

  const handleDownloadExcel = () => {
    const data = sampleDataMap[selectedReportType];
    const csvContent = "data:text/csv;charset=utf-8," 
      + data.map(e => e.join(",")).join("\n");

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
          <p className="text-xs text-slate-500">Unduh laporan resmi format Excel (.XLSX/.CSV) atau pratinjau sebelum cetak.</p>
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
          Pengaturan Rentang Tanggal Laporan
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Tanggal Mulai</label>
            <input
              type="date"
              value={dateStart}
              onChange={e => setDateStart(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700"
            />
          </div>

          <div>
            <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">Tanggal Selesai</label>
            <input
              type="date"
              value={dateEnd}
              onChange={e => setDateEnd(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 dark:bg-slate-700"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={() => setPreviewOpen(true)}
              className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Eye className="h-4 w-4" />
              <span>Pratinjau Laporan</span>
            </button>

            <button
              onClick={handleDownloadExcel}
              className="flex-1 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Unduh Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* PREVIEW MODAL */}
      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-3xl w-full p-6 space-y-4 shadow-2xl border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Pratinjau Laporan: {reportTypes.find(r => r.id === selectedReportType)?.name}
                </h3>
                <p className="text-[11px] text-slate-400">Periode {dateStart} s/d {dateEnd}</p>
              </div>

              <button onClick={() => setPreviewOpen(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-2xl max-h-60 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {sampleDataMap[selectedReportType].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      {row.map((cell, cidx) => (
                        <td key={cidx} className="py-2.5 px-3 text-slate-700 dark:text-slate-200">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={() => setPreviewOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold"
              >
                Tutup
              </button>
              <button
                onClick={handleDownloadExcel}
                className="px-5 py-2 rounded-xl bg-[#2E7D32] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="h-4 w-4" />
                <span>Unduh File Excel Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
