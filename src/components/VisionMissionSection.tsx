import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function VisionMissionSection() {
  const missions = [
    {
      number: '01',
      title: 'Riset & Pengembangan Solutif',
      desc: 'Melaksanakan penelitian terapan mutakhir dalam sensor telemetri nirkabel, edge AI, computer vision, dan sistem otomasi biosistem presisi.'
    },
    {
      number: '02',
      title: 'Hilirisasi & Kolaborasi Industri',
      desc: 'Menghubungkan prototipe inovasi laboratorium dengan kebutuhan riil industri agrikultur, program hibah (Kedaireka/Dikti), dan masyarakat petani.'
    },
    {
      number: '03',
      title: 'Pemberdayaan Talenta Unggul',
      desc: 'Menyelenggarakan ekosistem magang riset terstruktur bagi mahasiswa untuk mencetak inovator dan perekayasa teknologi masa depan.'
    },
    {
      number: '04',
      title: 'Keberlanjutan & Efisiensi Energi',
      desc: 'Menerapkan teknologi ramah lingkungan, energi terbarukan agrivoltaik, serta konservasi nutrisi air tertutup (closed-loop).'
    }
  ];

  const visionPillars = [
    'Riset Multidisiplin Berstandar Global',
    'Otomasi IoT & AI Biosistem Presisi',
    'Kedaulatan Pangan Berkelanjutan'
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16" id="home-visi-misi">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Komitmen Riset & Inovasi Pertanian Cerdas
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans max-w-2xl mx-auto">
          Smart Grow Laboratory Telkom University berdedikasi menjadi pusat unggulan teknologi terapan, menjembatani otomasi rekayasa dengan fisiologi tanaman modern.
        </p>
      </div>

      {/* Grid: 2 Large Cards (Left: Visi, Right: Misi) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: KARTU VISI */}
        <div className="lg:col-span-5 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0A5247] via-[#084239] to-[#042823] p-8 sm:p-10 text-white flex flex-col justify-between shadow-2xl shadow-emerald-950/20 border border-emerald-700/30">
          {/* Soft ambient background aura */}
          <div className="absolute top-0 right-0 h-64 w-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-64 w-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-widest">
                VISI UTAMA
              </span>
            </div>

            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight">
                Visi Laboratorium
              </h3>
              <div className="h-1 w-16 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full mt-3" />
            </div>

            <p className="font-sans text-sm sm:text-base text-emerald-50/90 leading-relaxed font-medium">
              "Menjadi pusat riset dan inovasi unggulan di tingkat nasional maupun internasional dalam pengembangan teknologi pertanian cerdas (Smart Agriculture), otomasi IoT, dan AI biosistem guna mewujudkan ketahanan pangan yang tangguh, efisien, dan berkelanjutan."
            </p>
          </div>

          {/* Visi Core Pillars */}
          <div className="relative z-10 pt-8 mt-6 border-t border-emerald-800/40 space-y-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300/80 block">
              PILAR PENGEMBANGAN RISET:
            </span>
            <div className="space-y-2">
              {visionPillars.map((pillar, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-emerald-100 font-semibold">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: KARTU MISI */}
        <div className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 sm:p-10 border border-slate-100 shadow-xl shadow-slate-100/80 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[10px] font-mono font-bold uppercase tracking-widest border border-slate-200">
                MISI STRATEGIS
              </span>
              <span className="text-xs font-mono text-slate-400 font-bold">4 FOKUS UTAMA</span>
            </div>

            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight tracking-tight">
                Misi Kami
              </h3>
              <div className="h-1 w-16 bg-gradient-to-r from-[#0A5247] to-emerald-500 rounded-full mt-3" />
            </div>

            {/* Missions List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {missions.map((m) => (
                <div 
                  key={m.number}
                  className="p-5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200 transition-all duration-300 group flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center">
                    <span className="text-xs font-mono font-extrabold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-md">
                      {m.number}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {m.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1 font-sans">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
