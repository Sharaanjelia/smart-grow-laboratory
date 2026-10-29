import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';

// ==========================================
// LANGUAGE OPTIONS CONFIG
// ==========================================

interface LangOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
  flagAlt: string;
}

const LANG_OPTIONS: LangOption[] = [
  {
    code: 'id',
    label: 'Bahasa Indonesia',
    nativeLabel: 'ID',
    flag: '🇮🇩',
    flagAlt: 'Bendera Indonesia',
  },
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'EN',
    flag: '🇬🇧',
    flagAlt: 'UK Flag',
  },
  {
    code: 'ko',
    label: '한국어',
    nativeLabel: 'KO',
    flag: '🇰🇷',
    flagAlt: '한국 국기',
  },
];

// ==========================================
// LANGUAGE SWITCHER COMPONENT
// ==========================================

interface LanguageSwitcherProps {
  /** "compact" = navbar desktop mode (icon + code + chevron)
   *  "full"    = mobile menu inline row */
  variant?: 'compact' | 'full';
}

export default function LanguageSwitcher({ variant = 'compact' }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentOption = LANG_OPTIONS.find(o => o.code === language) ?? LANG_OPTIONS[0];

  const handleSelect = useCallback((code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  }, [setLanguage]);

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  // ---- COMPACT (Desktop Navbar) ----
  if (variant === 'compact') {
    return (
      <div className="relative" ref={containerRef}>
        <button
          id="language-switcher-btn"
          onClick={() => setIsOpen(prev => !prev)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={t('language.select')}
          title={t('language.select')}
          className={`
            flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold
            border transition-all duration-200 cursor-pointer select-none
            ${isOpen
              ? 'bg-teal-50 border-teal-400 text-teal-800 shadow-sm'
              : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300 hover:text-slate-800 hover:bg-slate-50'
            }
          `}
        >
          <Globe className="w-4 h-4 shrink-0 text-teal-600" />
          <span className="text-xs font-bold tracking-wider uppercase">
            {currentOption.nativeLabel}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown panel */}
        {isOpen && (
          <div
            role="listbox"
            aria-label={t('language.select')}
            className="
              absolute right-0 top-full mt-2 w-52 z-50
              bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-900/10
              overflow-hidden
              animate-[slideDown_0.15s_ease-out_forwards]
            "
            style={{
              animation: 'slideDown 0.15s ease-out forwards'
            }}
          >
            <div className="p-1.5 space-y-0.5">
              <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                {t('language.select')}
              </p>
              {LANG_OPTIONS.map((opt) => {
                const isActive = opt.code === language;
                return (
                  <button
                    key={opt.code}
                    role="option"
                    aria-selected={isActive}
                    id={`lang-option-${opt.code}`}
                    onClick={() => handleSelect(opt.code)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold
                      transition-all duration-150 cursor-pointer text-left group
                      ${isActive
                        ? 'bg-teal-50 text-teal-800 border border-teal-200/60'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                      }
                    `}
                  >
                    {/* Flag emoji */}
                    <span
                      className="text-xl leading-none shrink-0"
                      role="img"
                      aria-label={opt.flagAlt}
                    >
                      {opt.flag}
                    </span>

                    {/* Code + Label */}
                    <span className="flex flex-col gap-0 min-w-0">
                      <span className="font-bold text-xs uppercase tracking-wider font-mono">
                        {opt.nativeLabel}
                      </span>
                      <span className="text-xs text-slate-500 font-sans truncate">
                        {opt.label}
                      </span>
                    </span>

                    {/* Active indicator */}
                    {isActive && (
                      <Check className="w-3.5 h-3.5 text-teal-600 ml-auto shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---- FULL (Mobile Sidebar) ----
  return (
    <div className="pt-2 border-t border-slate-100" ref={containerRef}>
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
        {t('language.select')}
      </p>
      <div
        role="listbox"
        aria-label={t('language.select')}
        className="grid grid-cols-3 gap-2"
      >
        {LANG_OPTIONS.map((opt) => {
          const isActive = opt.code === language;
          return (
            <button
              key={opt.code}
              role="option"
              aria-selected={isActive}
              id={`mobile-lang-option-${opt.code}`}
              onClick={() => handleSelect(opt.code)}
              className={`
                flex flex-col items-center gap-1 p-2.5 rounded-xl text-xs font-bold
                border transition-all duration-200 cursor-pointer
                ${isActive
                  ? 'bg-teal-50 border-teal-300 text-teal-800 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-teal-200 hover:text-slate-900'
                }
              `}
            >
              <span
                className="text-xl leading-none"
                role="img"
                aria-label={opt.flagAlt}
              >
                {opt.flag}
              </span>
              <span className="font-mono uppercase tracking-wider">{opt.nativeLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
