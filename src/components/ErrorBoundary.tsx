import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends (Component as any)<Props, State> {
  state: State = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
    if (error?.message && (error.message.includes('Failed to fetch dynamically imported module') || error.message.includes('Loading chunk'))) {
      const storageKey = 'smartgrow_chunk_reload';
      const lastReload = localStorage.getItem(storageKey);
      if (!lastReload || Date.now() - parseInt(lastReload) > 10000) {
        localStorage.setItem(storageKey, Date.now().toString());
        window.location.reload();
      }
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if ((this.state as any).hasError) {
      return (
        <div className="min-h-screen w-full bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-slate-800/90 border border-slate-700/80 rounded-3xl p-8 shadow-2xl text-center space-y-6 backdrop-blur-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="h-8 w-8 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold font-display text-white">
                Terjadi Pembaruan Sistem
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Versi baru website Smart Grow Laboratory telah dirilis. Silakan muat ulang halaman untuk memperbarui aplikasi.
              </p>
            </div>

            {(this.state as any).error?.message && (
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-emerald-400 text-left overflow-x-auto max-h-24">
                {(this.state as any).error.message}
              </div>
            )}

            <button
              onClick={this.handleReload}
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Muat Ulang Halaman</span>
            </button>
          </div>
        </div>
      );
    }

    return (this.props as any).children;
  }
}

export default ErrorBoundary;
