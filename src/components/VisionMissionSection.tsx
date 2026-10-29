import React from 'react';
import { 
  Target, 
  Cpu, 
  Handshake, 
  GraduationCap, 
  Leaf, 
  Globe, 
  Quote 
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function VisionMissionSection() {
  const { t } = useLanguage();

  const missions = [
    {
      number: '01',
      title: t('visionMission.missions.m01Title'),
      desc: t('visionMission.missions.m01Desc'),
      icon: Cpu,
      badges: ['Edge AI', 'Telemetri IoT', 'Biosistem Presisi']
    },
    {
      number: '02',
      title: t('visionMission.missions.m02Title'),
      desc: t('visionMission.missions.m02Desc'),
      icon: Handshake,
      badges: ['Kedaireka / Dikti', 'Mitra Industri', 'Dampak Nyata']
    },
    {
      number: '03',
      title: t('visionMission.missions.m03Title'),
      desc: t('visionMission.missions.m03Desc'),
      icon: GraduationCap,
      badges: ['Magang Terstruktur', 'Talenta Unggul', 'Future Inovator']
    },
    {
      number: '04',
      title: t('visionMission.missions.m04Title'),
      desc: t('visionMission.missions.m04Desc'),
      icon: Leaf,
      badges: ['Agrivoltaik', 'Closed-Loop Nutrisi', 'Green Tech']
    }
  ];

  const visionPillars = [
    {
      title: t('visionMission.pillars.global'),
      icon: Globe,
      color: 'text-emerald-400 bg-emerald-500/20'
    },
    {
      title: t('visionMission.pillars.iot'),
      icon: Cpu,
      color: 'text-teal-300 bg-teal-500/20'
    },
    {
      title: t('visionMission.pillars.food'),
      icon: Leaf,
      color: 'text-lime-300 bg-lime-500/20'
    }
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24" id="home-visi-misi">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {t('visionMission.sectionTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans max-w-2xl mx-auto">
          {t('visionMission.sectionDesc')}
        </p>
      </div>

      {/* Grid: 2 Large Cards (Left: Visi, Right: Misi) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: KARTU VISI */}
        <div className="lg:col-span-5 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#063f35] via-[#0A5247] to-[#032621] p-8 sm:p-10 text-white flex flex-col shadow-2xl shadow-emerald-950/25 border border-emerald-600/30 group self-start">
          {/* Decorative Background Glows & Watermark */}
          <div className="absolute top-0 right-0 h-72 w-72 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 h-72 w-72 bg-teal-400/15 rounded-full blur-3xl pointer-events-none" />
          <Quote className="absolute right-6 top-6 w-28 h-28 text-white/[0.04] -rotate-12 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 space-y-5">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
                {t('visionMission.visionTitle')}
              </h3>
              <div className="h-1.5 w-20 bg-gradient-to-r from-emerald-400 via-teal-300 to-transparent rounded-full mt-3" />
            </div>

            <p className="font-sans text-sm sm:text-base text-emerald-50/95 leading-relaxed font-normal">
              {t('visionMission.visionText')}
            </p>

            {/* Core Pillars */}
            <div className="pt-4 mt-2 border-t border-emerald-800/60 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-300/90 block">
                {t('visionMission.threePillars')}
              </span>
              <div className="space-y-2.5">
                {visionPillars.map((pillar, idx) => {
                  const IconComponent = pillar.icon;
                  return (
                    <div 
                      key={idx} 
                      className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs text-xs font-semibold text-emerald-50 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-xs"
                    >
                      <div className={`w-7 h-7 rounded-lg ${pillar.color} flex items-center justify-center shrink-0`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span>{pillar.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: KARTU MISI */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col justify-between space-y-6">
          
          {/* Header Row */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shadow-xs">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {t('visionMission.missionTitle')}
            </h3>
          </div>

          {/* 4 Interactive Bento Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {missions.map((m) => {
              const IconComp = m.icon;
              return (
                <div 
                  key={m.number}
                  className="group relative p-5 rounded-3xl bg-slate-50/70 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800/90 border border-slate-100 dark:border-slate-800 hover:border-emerald-400/60 dark:hover:border-emerald-500/50 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-3 overflow-hidden"
                >
                  {/* Subtle top indicator line on hover */}
                  <div className="absolute inset-x-6 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top card metadata: Number & Icon */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-mono font-black text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50">
                      {m.number}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 flex-1">
                    <h4 className="font-display text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {m.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      {m.desc}
                    </p>
                  </div>

                  {/* Keyword Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                    {m.badges.map((b, bIdx) => (
                      <span 
                        key={bIdx}
                        className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
