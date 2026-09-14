/**
 * Date and Time utilities for Smart Grow Laboratory LMS
 * All dates and times are strictly normalized to Asia/Jakarta (WIB, UTC+7).
 */

/**
 * Returns the current date in Asia/Jakarta timezone as 'YYYY-MM-DD'.
 */
export const getTodayDateJakarta = (): string => {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Jakarta',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return formatter.format(now);
};

/**
 * Returns the current time in Asia/Jakarta timezone as 'HH:mm WIB'.
 */
export const getNowTimeJakarta = (): string => {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).replace('.', ':');
  return `${timeStr} WIB`;
};

/**
 * Formats a 'YYYY-MM-DD' date string to official Indonesian date format,
 * e.g., '2026-09-10' -> '10 September 2026'.
 */
export const formatIndonesianDate = (dateStr: string): string => {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    if (!year || !month || !day) return dateStr;
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  } catch (_) {
    return dateStr;
  }
};

/**
 * Determines attendance status based on WIB check-in time:
 * - Check-in on or before 08:30 WIB -> 'present' (Hadir)
 * - Check-in after 08:30 WIB -> 'late' (Terlambat)
 */
export const determineAttendanceStatus = (checkInDate: Date = new Date()): 'present' | 'late' => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jakarta',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  }).formatToParts(checkInDate);

  const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
  const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);

  if (hour > 8 || (hour === 8 && minute > 30)) {
    return 'late';
  }
  return 'present';
};

/**
 * Computes work duration from check-in to check-out.
 * Prioritizes numeric timestamps, falling back to time string parsing.
 * Returns human-readable duration, e.g., '7 Jam 57 Menit' or '45 Menit'.
 */
export const calculateWorkDuration = (
  checkInTimestamp?: number | string,
  checkOutTimestamp?: number | string,
  checkInTimeStr?: string,
  checkOutTimeStr?: string
): string => {
  let diffMinutes = 0;

  const inTs = typeof checkInTimestamp === 'number' ? checkInTimestamp : Number(checkInTimestamp);
  const outTs = typeof checkOutTimestamp === 'number' ? checkOutTimestamp : Number(checkOutTimestamp);

  if (inTs && outTs && !isNaN(inTs) && !isNaN(outTs) && outTs >= inTs) {
    diffMinutes = Math.floor((outTs - inTs) / (1000 * 60));
  } else if (checkInTimeStr && checkOutTimeStr) {
    const parseHM = (s: string) => {
      const match = s.match(/(\d{1,2})[:.](\d{1,2})/);
      if (!match) return null;
      return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
    };
    const inM = parseHM(checkInTimeStr);
    const outM = parseHM(checkOutTimeStr);
    if (inM !== null && outM !== null) {
      diffMinutes = Math.max(0, outM - inM);
    }
  }

  if (diffMinutes <= 0) {
    return '1 Menit';
  }

  const hours = Math.floor(diffMinutes / 60);
  const mins = diffMinutes % 60;

  if (hours > 0 && mins > 0) {
    return `${hours} Jam ${mins} Menit`;
  } else if (hours > 0) {
    return `${hours} Jam`;
  } else {
    return `${mins} Menit`;
  }
};

/**
 * Calculates calendar day difference between targetDateStr and todayStr ('YYYY-MM-DD').
 * Positive number means targetDate is that many days in the past.
 */
export const getDaysDifference = (targetDateStr: string, todayStr: string): number => {
  try {
    const [y1, m1, d1] = todayStr.split('-').map(Number);
    const [y2, m2, d2] = targetDateStr.split('-').map(Number);
    const today = new Date(y1, m1 - 1, d1);
    const target = new Date(y2, m2 - 1, d2);
    const diffTime = today.getTime() - target.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  } catch (_) {
    return 999;
  }
};
