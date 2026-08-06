import React, { useState } from 'react';
import { seedAllDataToFirebase } from '../services/seedFirebase';
import { db } from '../firebase';
import { Database, CheckCircle2, AlertCircle, Loader2, X, RefreshCw, Layers } from 'lucide-react';

interface FirebaseSeederModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseSeederModal: React.FC<FirebaseSeederModalProps> = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'seeding' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleStartSeeding = async () => {
    setStatus('seeding');
    setLogs([]);
    setErrorMessage('');

    const addLog = (msg: string) => {
      setLogs((prev) => [...prev, msg]);
    };

    try {
      const result = await seedAllDataToFirebase(addLog);
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(result.message);
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err?.message || 'Terjadi kesalahan tidak terduga saat mengunggah data.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-gray-900 border border-emerald-500/30 rounded-2xl max-w-xl w-full p-6 text-gray-100 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-lg transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Firebase Firestore Data Sync
            </h3>
            <p className="text-xs text-gray-400">
              Sinkronisasi data dummy Smart Grow Laboratory ke Cloud Firestore
            </p>
          </div>
        </div>

        <div className="bg-gray-950/80 border border-gray-800 rounded-xl p-4 mb-5 text-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400 pb-2 border-b border-gray-800">
            <span>Target Collections:</span>
            <span className="font-mono text-emerald-400">12 Koleksi</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
            <div className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-emerald-400"/> news (4 items)</div>
            <div className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-emerald-400"/> projects (4 items)</div>
            <div className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-emerald-400"/> team (7 members)</div>
            <div className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-emerald-400"/> users (5 accounts)</div>
            <div className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-emerald-400"/> tasks (12 items)</div>
            <div className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-emerald-400"/> attendance & LMS</div>
          </div>
        </div>

        {/* LOG CONSOLE */}
        <div className="bg-black border border-gray-800 rounded-xl p-3 h-40 overflow-y-auto font-mono text-xs text-emerald-300 mb-5 leading-relaxed">
          {logs.length === 0 ? (
            <div className="text-gray-600 italic">Klik tombol "Mulai Sync ke Firebase" di bawah untuk mengunggah semua data...</div>
          ) : (
            logs.map((logMsg, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-gray-500">&gt;</span>
                <span>{logMsg}</span>
              </div>
            ))
          )}
        </div>

        {status === 'error' && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400 text-xs">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold mb-0.5">Proses Gagal</div>
              <div>{errorMessage}</div>
              <div className="mt-1 text-[11px] text-red-300/80">
                Pastikan file `.env` sudah diisi dengan API Key Firebase kamu & rules Firestore aktif (Test Mode / Write allowed).
              </div>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-3 text-emerald-400 text-xs">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <div>
              <div className="font-semibold">Berhasil!</div>
              <div>Semua data dummy Smart Grow Laboratory sudah tersimpan di Firebase Firestore.</div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg transition"
          >
            Tutup
          </button>
          <button
            onClick={handleStartSeeding}
            disabled={status === 'seeding'}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-medium text-sm rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-900/30 transition"
          >
            {status === 'seeding' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Mengunggah ke Firebase...
              </>
            ) : status === 'success' ? (
              <>
                <RefreshCw className="w-4 h-4" />
                Sync Ulang Data
              </>
            ) : (
              <>
                <Database className="w-4 h-4" />
                Mulai Sync ke Firebase
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
