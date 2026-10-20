/**
 * Resolves an image URL, automatically converting Google Drive share links
 * into high-resolution direct image thumbnail URLs that work seamlessly in <img /> tags.
 */
export function resolveImageUrl(url?: string, fallback = '/images/harvest-team-bg.jpg'): string {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return fallback;
  }
  
  const clean = url.trim();

  // If already a local asset path
  if (clean.startsWith('/images/')) {
    return clean;
  }

  // If this is the HTCI project image or previous Google Drive link
  if (clean.includes('1KmNGEPsohEH3huD8aXpSSnE_9ZcXnmrY')) {
    return '/images/htci/htci-poster.jpg';
  }

  // Handle Google Drive share links
  // e.g. https://drive.google.com/file/d/1KmNGEPsohEH3huD8aXpSSnE_9ZcXnmrY/view?usp=sharing
  // or https://drive.google.com/open?id=1KmNGEPsohEH3huD8aXpSSnE_9ZcXnmrY
  const driveMatch = clean.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || clean.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${driveMatch[1]}`;
  }

  return clean;
}

/**
 * Resolves a user's avatar image URL.
 * Accurately matches known lab students/members by name,
 * and ensures mentor's photo (Prof. Indrarini) is NEVER shown as a fallback for students.
 */
export function resolveUserAvatar(user?: { name?: string; role?: string; avatar?: string } | null): string {
  if (user?.avatar && !user.avatar.includes('unsplash.com') && user.avatar.trim() !== '') {
    return user.avatar;
  }
  
  const safeName = (user?.name || '').toLowerCase().trim();

  // 1. Specific Lab Members & Students by Name
  if (safeName.includes('aqila')) return '/images/team/aqila.jpg';
  if (safeName.includes('shara')) return '/images/team/shara.jpg';
  if (safeName.includes('shella') || safeName.includes('shela')) return '/images/team/shela.jpg';
  if (safeName.includes('sirvani')) return '/images/team/sirvani.jpg';
  if (safeName.includes('tiara')) return '/images/team/tiara.jpg';
  if (safeName.includes('nasywa')) return '/images/team/nasywa-zauja-noor.jpg';
  if (safeName.includes('divia')) return '/images/team/divia-nuralika-namira.jpg';
  if (safeName.includes('farid')) return '/images/team/farid.jpg';
  if (safeName.includes('alfachri') || safeName.includes('akbar')) return '/images/team/alfachri.jpg';
  if (safeName.includes('azliny')) return '/images/team/azliny.jpg';
  if (safeName.includes('chiko')) return '/images/team/chiko.jpg';
  if (safeName.includes('arimbi')) return '/images/team/arimbi.jpg';
  if (safeName.includes('daffa')) return '/images/team/daffa.jpg';
  if (safeName.includes('hannani')) return '/images/team/hannani.jpg';
  if (safeName.includes('elyasa')) return '/images/team/elyasa.jpg';
  if (safeName.includes('humam')) return '/images/team/humam.jpg';
  if (safeName.includes('indrarini')) return '/images/team/indrarini.jpg';

  // 2. Role-based fallback
  if (user?.role === 'director') return '/images/team/indrarini.jpg';
  if (user?.role === 'assistant') return '/images/team/azliny.jpg';

  // 3. Student / Generic fallback (Initials Avatar in Lab Green - never mentor photo)
  if (user?.name && user.name.trim() !== '') {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=355E3B&color=fff&size=200&bold=true`;
  }
  return '/images/team/shara.jpg';
}
