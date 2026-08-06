import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  User as UserIcon, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles,
  Share2,
  Tag,
  BookOpen,
  ThumbsUp,
  Bookmark,
  Copy,
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { NewsItem, Comment } from '../types';

interface StandardNewsArticleViewProps {
  item: NewsItem;
  comments: Comment[];
  onBack: () => void;
  onAddComment: (name: string, email: string, content: string) => void;
}

export default function StandardNewsArticleView({
  item,
  comments,
  onBack,
  onAddComment
}: StandardNewsArticleViewProps) {
  // Interactive Reaction State
  const [likesCount, setLikesCount] = useState(24);
  const [hasLiked, setHasLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Form State
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  const handleLike = () => {
    if (hasLiked) {
      setLikesCount(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikesCount(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim() || !textInput.trim()) return;

    onAddComment(nameInput.trim(), emailInput.trim(), textInput.trim());
    setNameInput('');
    setEmailInput('');
    setTextInput('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3500);
  };

  // Helper to format article content markdown text into clean React paragraphs & lists
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-3" />;
      
      // Subheading (###)
      if (trimmed.startsWith('###')) {
        return (
          <h3 key={idx} className="text-lg sm:text-xl font-bold font-display text-slate-900 dark:text-slate-100 mt-8 mb-4 flex items-center gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 shadow-sm shrink-0"></span>
            <span>{trimmed.replace(/^###\s*/, '')}</span>
          </h3>
        );
      }
      
      // Bullet points (*)
      if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
        const text = trimmed.replace(/^[*\-]\s*/, '');
        const parts = text.split(':');
        return (
          <div key={idx} className="flex items-start gap-3 my-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/40">
            <span className="text-emerald-600 font-bold font-mono text-sm mt-0.5 shrink-0">✓</span>
            <div>
              {parts.length > 1 ? (
                <>
                  <strong className="text-slate-900 dark:text-slate-100 font-bold">{parts[0]}:</strong>
                  <span>{parts.slice(1).join(':')}</span>
                </>
              ) : (
                <span>{text}</span>
              )}
            </div>
          </div>
        );
      }

      // Paragraph
      return (
        <p key={idx} className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans my-3">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-24 font-sans animate-fade-in">
      
      {/* Toast alert */}
      {copiedToast && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 border border-slate-700 animate-bounce">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>Tautan artikel berhasil disalin ke clipboard!</span>
        </div>
      )}

      {/* Top Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 px-4 sm:px-6 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Kembali ke News & Events</span>
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                hasLiked
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
              title="Apresiasi Artikel"
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              <span>{likesCount}</span>
            </button>

            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                isBookmarked
                  ? 'bg-amber-500 text-white border-amber-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
              title="Simpan Artikel"
            >
              <Bookmark className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 cursor-pointer transition-all"
              title="Bagikan Artikel"
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Article Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {/* ARTICLE HEADER CARD */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold font-mono uppercase tracking-wider">
              {item.category}
            </span>
            <span className="flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-slate-400">
              <Calendar className="h-3.5 w-3.5" />
              <span>{item.date}</span>
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1 text-xs font-mono text-slate-500 dark:text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              <span>{item.readTime || '4 min'} read</span>
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-900 dark:text-slate-100 leading-tight tracking-tight">
            {item.title}
          </h1>

          {/* Excerpt / Tagline */}
          {item.tagline ? (
            <p className="text-sm sm:text-base font-semibold text-emerald-900 dark:text-emerald-200 bg-emerald-50/80 dark:bg-emerald-950/40 p-4 rounded-2xl border border-emerald-200/80 dark:border-emerald-800/60 leading-relaxed font-sans italic">
              "{item.tagline}"
            </p>
          ) : item.excerpt ? (
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {item.excerpt}
            </p>
          ) : null}

          {/* Publisher & Author Info */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-emerald-800 to-teal-600 text-white font-bold flex items-center justify-center text-xs font-display shrink-0 shadow-md">
                SGL
              </div>
              <div className="text-xs">
                <span className="font-extrabold text-slate-900 dark:text-slate-100 block">Tim Riset Smart Grow Laboratory</span>
                <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">Telkom University • Bandung Techno Park</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Verified Publication</span>
            </div>
          </div>
        </div>

        {/* FEATURED HERO IMAGE */}
        {item.image && (
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 aspect-video w-full bg-slate-900 group">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-5 text-white text-xs font-mono flex items-center justify-between">
              <span>Dokumentasi Resmi Kegiatan & Riset Smart Grow Laboratory</span>
              <span className="hidden sm:inline-block bg-emerald-900/60 px-2.5 py-0.5 rounded border border-emerald-400/40 text-[10px]">
                TELKOM UNIVERSITY
              </span>
            </div>
          </div>
        )}

        {/* MAIN ARTICLE BODY CONTENT */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold font-display text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>Laporan Berita & Liputan Kegiatan</span>
          </h2>

          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 font-sans">
            {renderFormattedContent(item.content)}
          </div>

          {/* Article Footer Reaction Bar */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                  hasLiked
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{hasLiked ? 'Telah Menyukai' : 'Sukai Artikel'} ({likesCount})</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 text-xs font-bold cursor-pointer transition-all flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                <span>Salin Tautan</span>
              </button>
            </div>

            <span className="text-xs text-slate-400 font-mono">
              Laboratorium Smart Grow • Telkom University
            </span>
          </div>
        </div>

        {/* COMMENTS / DISCUSSION SECTION */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-display flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-emerald-600" />
              <span>Tanggapan & Diskusi Pembaca ({comments.length})</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tinggalkan tanggapan atau saran Anda mengenai liputan berita kegiatan ini.</p>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300 font-mono uppercase">Tulis Tanggapan Anda:</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  placeholder="e.g. Budi Santoso"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Email Anda</label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  placeholder="budi@student.telkomuniversity.ac.id"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1 text-xs">Tanggapan / Komentar</label>
              <textarea
                rows={3}
                value={textInput}
                onChange={e => setTextInput(e.target.value)}
                placeholder="Berikan pendapat atau masukan Anda mengenai hasil riset/kegiatan ini..."
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-xs focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {commentSuccess ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" /> Tanggapan Anda berhasil dipublikasikan!
                </span>
              ) : <span />}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md cursor-pointer flex items-center gap-2 transition-all ml-auto"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Kirim Tanggapan</span>
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3 pt-2">
            {comments.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 text-center space-y-1">
                <p className="text-xs text-slate-400 font-medium">Belum ada tanggapan. Jadilah pembaca pertama yang memberikan tanggapan!</p>
              </div>
            ) : (
              comments.map(c => (
                <div key={c.id} className="p-4.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{c.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">{c.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{c.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
