import React from 'react';

interface TeamAvatarProps {
  id: string;
  name: string;
  className?: string;
}

export default function TeamAvatar({ id, name = '', className = '' }: TeamAvatarProps) {
  const safeName = (name || '').toLowerCase();

  // Prof. Dr. Indrarini Dyah Irawati - Real Photo
  if (id === 'mentor-indrarini' || id === 'user_director' || safeName.includes('indrarini')) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 border border-pink-200/40 shadow-inner flex items-center justify-center ${className}`}>
        <img src="/images/team/indrarini.jpg" alt={name} className="w-full h-full object-cover object-top" />
        <div className="absolute bottom-2 left-2 right-2 bg-pink-950/85 backdrop-blur-md text-pink-200 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-pink-500/30">
          HEAD OF LAB / MENTOR
        </div>
      </div>
    );
  }

  // Azliny Azreen (Assistant) - Real Photo (Grey hijab, beige trench coat)
  if (id === 'member-azliny' || safeName.includes('azliny')) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 border border-amber-200/30 shadow-inner flex items-center justify-center ${className}`}>
        <img src="/images/team/azliny.jpg" alt={name} className="w-full h-full object-cover object-top" />
        <div className="absolute bottom-2 left-2 right-2 bg-rose-950/85 backdrop-blur-md text-amber-200 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-rose-800">
          ASISTEN UTAMA LAB
        </div>
      </div>
    );
  }

  // Muhammad Alfachri Akbar (Alumni - AI Engineer & Asisten Peneliti) - Real Photo (Maroon blazer)
  if (id === 'member-alfachri' || id === 'user_assistant_alfachri' || safeName.includes('alfachri') || safeName.includes('akbar')) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 border border-emerald-300/40 shadow-inner flex items-center justify-center ${className}`}>
        <img src="/images/team/alfachri.jpg?v=5" alt={name} className="w-full h-full object-cover object-top" />
        <div className="absolute bottom-2 left-2 right-2 bg-emerald-950/85 backdrop-blur-md text-emerald-200 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-emerald-500/30">
          ALUMNI • AI ENGINEER
        </div>
      </div>
    );
  }

  // Shara Anjelia (Full-stack Developer) - Real Photo
  if (id === 'member-shara' || safeName.includes('shara')) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 border border-teal-200/30 shadow-inner flex items-center justify-center ${className}`}>
        <img src="/images/team/shara.jpg" alt={name} className="w-full h-full object-cover object-[center_15%]" />
        <div className="absolute bottom-2 left-2 right-2 bg-teal-950/85 backdrop-blur-md text-teal-200 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-teal-800">
          FULL-STACK DEVELOPER
        </div>
      </div>
    );
  }

  // Chiko - Real Photo (Mountain background)
  if (id === 'member-chiko' || safeName.includes('chiko')) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 border border-slate-700 shadow-inner flex items-center justify-center ${className}`}>
        <img src="/images/team/chiko.jpg" alt={name} className="w-full h-full object-cover object-center" />
        <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-md text-sky-300 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-slate-700">
          HARDWARE ENGINEER
        </div>
      </div>
    );
  }

  // Shela - IoT Specialist (Real Photo - Maroon blazer, cat-eye glasses)
  if (id === 'member-shela' || safeName.includes('shela')) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 border border-rose-800 shadow-inner flex items-center justify-center ${className}`}>
        <img src="/images/team/shela.jpg" alt={name} className="w-full h-full object-cover object-[center_15%]" />
        <div className="absolute bottom-2 left-2 right-2 bg-rose-950/85 backdrop-blur-md text-rose-200 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-rose-800">
          IOT SPECIALIST
        </div>
      </div>
    );
  }

  // Sirvani Cinta Dewi - IoT Specialist (Real Photo - Brown hijab in cafe, ceiling cropped)
  if (id === 'member-sirvani' || safeName.includes('sirvani')) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 border border-teal-800 shadow-inner flex items-center justify-center ${className}`}>
        <img src="/images/team/sirvani.jpg" alt={name} className="w-full h-full object-cover object-top" />
        <div className="absolute bottom-2 left-2 right-2 bg-teal-950/85 backdrop-blur-md text-teal-200 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-teal-800">
          IOT SPECIALIST
        </div>
      </div>
    );
  }

  // Tiara Nuriawati - IoT Specialist (Real Photo - Cream hijab, Telkom jacket)
  if (id === 'member-tiara' || safeName.includes('tiara')) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 border border-blue-900 shadow-inner flex items-center justify-center ${className}`}>
        <img src="/images/team/tiara.jpg" alt={name} className="w-full h-full object-cover object-top" />
        <div className="absolute bottom-2 left-2 right-2 bg-blue-950/85 backdrop-blur-md text-sky-300 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-blue-800">
          IOT SPECIALIST
        </div>
      </div>
    );
  }

  // Nasywa Zauja Noor - IoT Specialist (Real Photo - Cropped ceiling for clear face focus)
  if (id === 'member-nasywa' || safeName.includes('nasywa')) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 border border-teal-800 shadow-inner flex items-center justify-center ${className}`}>
        <img 
          src="/images/team/nasywa-zauja-noor.jpg" 
          alt={name} 
          className="w-full h-full object-cover object-[center_55%] scale-110" 
        />
        <div className="absolute bottom-2 left-2 right-2 bg-teal-950/85 backdrop-blur-md text-teal-200 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-teal-800">
          IOT SPECIALIST
        </div>
      </div>
    );
  }

  // Divia Nuralika Namira - IoT Specialist (Real Photo)
  if (id === 'member-divia' || safeName.includes('divia')) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 border border-blue-900 shadow-inner flex items-center justify-center ${className}`}>
        <img src="/images/team/divia-nuralika-namira.jpg" alt={name} className="w-full h-full object-cover object-top" />
        <div className="absolute bottom-2 left-2 right-2 bg-blue-950/85 backdrop-blur-md text-sky-300 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-blue-800">
          IOT SPECIALIST
        </div>
      </div>
    );
  }

  // M. Farid Hasri - IoT Specialist (Real Photo - Brown Telkom jacket)
  if (id === 'member-farid' || id === 'user_student_farid' || safeName.includes('farid')) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 border border-amber-900/60 shadow-inner flex items-center justify-center ${className}`}>
        <img src="/images/team/farid.jpg" alt={name} className="w-full h-full object-cover object-[center_20%]" />
        <div className="absolute bottom-2 left-2 right-2 bg-amber-950/85 backdrop-blur-md text-amber-200 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-amber-800">
          IOT SPECIALIST
        </div>
      </div>
    );
  }

  // Arimbi Dwi - Lead Hardware Engineer (Real Photo - Black jacket with ARIMBI patch)
  if (id === 'member-arimbi' || safeName.includes('arimbi')) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 border border-stone-700 shadow-inner flex items-center justify-center ${className}`}>
        <img src="/images/team/arimbi.jpg" alt={name} className="w-full h-full object-cover object-top" />
        <div className="absolute bottom-2 left-2 right-2 bg-stone-900/85 backdrop-blur-md text-amber-300 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-stone-700">
          LEAD HARDWARE ENGINEER
        </div>
      </div>
    );
  }

  // Daffa Zyaa Ulhaq - Firmware Developer (Real Photo - Black shirt)
  if (id === 'member-daffa' || safeName.includes('daffa')) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 border border-emerald-800 shadow-inner flex items-center justify-center ${className}`}>
        <img src="/images/team/daffa.jpg" alt={name} className="w-full h-full object-cover object-top" />
        <div className="absolute bottom-2 left-2 right-2 bg-emerald-950/85 backdrop-blur-md text-emerald-300 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-emerald-800">
          FIRMWARE DEVELOPER
        </div>
      </div>
    );
  }

  // Hannani Syadzwana - Full-stack Developer (Real Photo - Black jacket, HN patch)
  if (id === 'member-hannani' || safeName.includes('hannani')) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 border border-teal-800 shadow-inner flex items-center justify-center ${className}`}>
        <img src="/images/team/hannani.jpg" alt={name} className="w-full h-full object-cover object-top" />
        <div className="absolute bottom-2 left-2 right-2 bg-teal-950/85 backdrop-blur-md text-teal-200 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-teal-800">
          FULL-STACK DEVELOPER
        </div>
      </div>
    );
  }

  // Elyasa Reva - UI/UX Designer (Real Photo - Cream hijab, Telkom jacket)
  if (id === 'member-elyasa' || safeName.includes('elyasa')) {
    return (
      <div className={`relative overflow-hidden bg-slate-900 border border-purple-800 shadow-inner flex items-center justify-center ${className}`}>
        <img src="/images/team/elyasa.jpg" alt={name} className="w-full h-full object-cover object-top" />
        <div className="absolute bottom-2 left-2 right-2 bg-purple-950/85 backdrop-blur-md text-purple-200 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-purple-800">
          UI/UX DESIGNER
        </div>
      </div>
    );
  }

  // Humam Ibadillah - Agronomist (Real Photo - Dark striped shirt)
  if (id === 'member-humam' || safeName.includes('humam')) {
    return (
      <div className={`relative overflow-hidden bg-slate-950 border border-emerald-900 shadow-inner flex items-center justify-center ${className}`}>
        <img src="/images/team/humam.jpg" alt={name} className="w-full h-full object-cover object-top" />
        <div className="absolute bottom-2 left-2 right-2 bg-emerald-950/85 backdrop-blur-md text-emerald-300 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-emerald-800">
          AGRONOMIST
        </div>
      </div>
    );
  }

  // Generic fallback styled badge for any other team member
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-teal-900 via-emerald-950 to-slate-900 border border-teal-800 shadow-inner flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 200 240" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="240" fill="#0F172A" />
        <circle cx="100" cy="90" r="45" fill="#1E293B" stroke="#0D9488" strokeWidth="3" />
        <path d="M40 220 C40 160 70 145 100 145 C130 145 160 160 160 220 Z" fill="#1E293B" stroke="#0D9488" strokeWidth="2" />
        <text x="100" y="98" fill="#14B8A6" fontSize="24" fontWeight="extrabold" textAnchor="middle" fontFamily="sans-serif">
          {(name || '?').charAt(0)}
        </text>
      </svg>
      <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 text-teal-300 text-[9px] font-bold py-0.5 px-2 rounded-full text-center tracking-wider border border-teal-800">
        RESEARCH TEAM
      </div>
    </div>
  );
}
