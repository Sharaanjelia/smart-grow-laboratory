import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

// Global dispatcher function so any file can trigger a toast without prop drilling
export function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  window.dispatchEvent(
    new CustomEvent('smartgrow_toast', {
      detail: { message, type }
    })
  );
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToastEvent = (e: Event) => {
      const custom = e as CustomEvent<{ message: string; type: 'success' | 'error' | 'info' }>;
      if (!custom.detail) return;

      const newToast: ToastMessage = {
        id: `toast_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        type: custom.detail.type || 'success',
        message: custom.detail.message
      };

      setToasts(prev => [newToast, ...prev.slice(0, 3)]); // Keep at most 4 active

      // Auto remove after 3.5 seconds
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, 3500);
    };

    window.addEventListener('smartgrow_toast', handleToastEvent);
    return () => window.removeEventListener('smartgrow_toast', handleToastEvent);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-fade-in ${
            toast.type === 'success'
              ? 'bg-emerald-900/95 text-white border-emerald-500/50 shadow-emerald-950/20'
              : toast.type === 'error'
              ? 'bg-rose-900/95 text-white border-rose-500/50 shadow-rose-950/20'
              : 'bg-slate-900/95 text-white border-slate-700/50 shadow-slate-950/20'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-300" />}
            {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-rose-300" />}
            {toast.type === 'info' && <Info className="h-5 w-5 text-blue-300" />}
          </div>
          <div className="flex-1 text-xs font-semibold leading-relaxed">
            {toast.message}
          </div>
          <button
            onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
            className="p-1 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
