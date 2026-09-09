/**
 * Resolves an image URL, automatically converting Google Drive share links
 * into high-resolution direct image thumbnail URLs that work seamlessly in <img /> tags.
 */
export function resolveImageUrl(url?: string, fallback = '/images/harvest-team-bg.jpg'): string {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return fallback;
  }
  
  const clean = url.trim();

  // Handle Google Drive share links
  // e.g. https://drive.google.com/file/d/1KmNGEPsohEH3huD8aXpSSnE_9ZcXnmrY/view?usp=sharing
  // or https://drive.google.com/open?id=1KmNGEPsohEH3huD8aXpSSnE_9ZcXnmrY
  const driveMatch = clean.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || clean.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1200`;
  }

  return clean;
}
