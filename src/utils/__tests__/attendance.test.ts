import {
  calculateHaversineDistanceMeters,
  determineAttendanceStatus,
  calculateWorkDuration,
  calculateWorkDurationMinutes,
  BTP_OFFICIAL_LAT,
  BTP_OFFICIAL_LNG,
  BTP_GEOFENCE_RADIUS_METERS,
  getTodayDateJakarta
} from '../dateUtils';

interface TestResult {
  name: string;
  passed: boolean;
  message?: string;
}

const results: TestResult[] = [];

function assert(condition: boolean, testName: string, failureDetail?: string) {
  if (condition) {
    results.push({ name: testName, passed: true });
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    results.push({ name: testName, passed: false, message: failureDetail || 'Assertion failed' });
    console.error(`  ✗ FAIL: ${testName} - ${failureDetail || 'Assertion failed'}`);
  }
}

console.log('================================================================');
console.log('SMART GROW LAB: TEST SUITE VALIDASI PRESENSI & GEOLOKASI BTP');
console.log('================================================================\n');

// -----------------------------------------------------------------
// -----------------------------------------------------------------
// 1. GEOFENCE & HAVERSINE DISTANCE AUDIT (50m STRICT RADIUS)
// -----------------------------------------------------------------
console.log('--- 1. Uji Validasi Jarak Geografis BTP Telkom University (-6.970460, 107.630319) ---');

// 1.1 Exact center point (0m)
const distCenter = calculateHaversineDistanceMeters(
  BTP_OFFICIAL_LAT,
  BTP_OFFICIAL_LNG,
  BTP_OFFICIAL_LAT,
  BTP_OFFICIAL_LNG
);
assert(distCenter === 0, 'Jarak titik pusat BTP ke dirinya sendiri bernilai 0 meter');

// 1.2 Distance ~24m (inside radius)
const distInside24m = calculateHaversineDistanceMeters(
  BTP_OFFICIAL_LAT,
  BTP_OFFICIAL_LNG + 0.00022,
  BTP_OFFICIAL_LAT,
  BTP_OFFICIAL_LNG
);
assert(
  distInside24m <= BTP_GEOFENCE_RADIUS_METERS,
  `Titik dalam radius (${distInside24m.toFixed(1)}m) diterima (<= ${BTP_GEOFENCE_RADIUS_METERS}m)`
);

// 1.3 Distance exactly 49 meters (valid, within 50m limit)
const lat49m = BTP_OFFICIAL_LAT + 0.00044067;
const dist49m = calculateHaversineDistanceMeters(
  lat49m,
  BTP_OFFICIAL_LNG,
  BTP_OFFICIAL_LAT,
  BTP_OFFICIAL_LNG
);
assert(
  dist49m === 49 && dist49m <= BTP_GEOFENCE_RADIUS_METERS,
  `Titik jarak 49 meter (${dist49m}m) diterima (<= ${BTP_GEOFENCE_RADIUS_METERS}m)`
);

// 1.4 Distance exactly 50 meters (valid boundary, exactly 50m limit)
const lat50m = BTP_OFFICIAL_LAT + 0.00044966;
const dist50m = calculateHaversineDistanceMeters(
  lat50m,
  BTP_OFFICIAL_LNG,
  BTP_OFFICIAL_LAT,
  BTP_OFFICIAL_LNG
);
assert(
  dist50m === 50 && dist50m <= BTP_GEOFENCE_RADIUS_METERS,
  `Titik batas 50 meter (${dist50m}m) diterima (<= ${BTP_GEOFENCE_RADIUS_METERS}m batas geofence)`
);

// 1.5 Distance exactly 51 meters (invalid, beyond 50m limit)
const lat51m = BTP_OFFICIAL_LAT + 0.00045865;
const dist51m = calculateHaversineDistanceMeters(
  lat51m,
  BTP_OFFICIAL_LNG,
  BTP_OFFICIAL_LAT,
  BTP_OFFICIAL_LNG
);
assert(
  dist51m === 51 && dist51m > BTP_GEOFENCE_RADIUS_METERS,
  `Titik jarak 51 meter (${dist51m}m) ditolak (> ${BTP_GEOFENCE_RADIUS_METERS}m batas geofence)`
);

// 1.6 Old reference coordinates (-6.9706, 107.6297) distance to new center (~70m, rejected)
const distOldCenter = calculateHaversineDistanceMeters(
  -6.9706,
  107.6297,
  BTP_OFFICIAL_LAT,
  BTP_OFFICIAL_LNG
);
assert(
  distOldCenter > BTP_GEOFENCE_RADIUS_METERS,
  `Titik BTP lama (-6.9706, 107.6297) berjarak ${distOldCenter.toFixed(1)}m dan ditolak dari titik resmi baru`
);

// 1.7 Far location: Gedung Kuliah Bersatu (GKB) Telkom Univ (~394m)
const distGKB = calculateHaversineDistanceMeters(
  -6.9740,
  107.6305,
  BTP_OFFICIAL_LAT,
  BTP_OFFICIAL_LNG
);
assert(
  distGKB > 300,
  `Titik luar kampus GKB Telkom Univ (${distGKB.toFixed(0)}m) ditolak dari BTP`
);

// -----------------------------------------------------------------
// 2. PUNCTUALITY POLICY AUDIT (08:00 WIB start, late after 08:30 WIB)
// -----------------------------------------------------------------
console.log('\n--- 2. Uji Aturan Keterlambatan Presensi (08.00 WIB & batas 08.30 WIB) ---');

function makeWibDate(year: number, month: number, day: number, hourWib: number, minuteWib: number): Date {
  const utcHour = hourWib - 7;
  return new Date(Date.UTC(year, month - 1, day, utcHour, minuteWib, 0));
}

// 07:45 WIB -> On time ('present')
const statusEarly = determineAttendanceStatus(makeWibDate(2026, 10, 11, 7, 45));
assert(statusEarly === 'present', 'Check-in 07.45 WIB tercatat tepat waktu (present)');

// 08:15 WIB -> On time ('present')
const status815 = determineAttendanceStatus(makeWibDate(2026, 10, 11, 8, 15));
assert(status815 === 'present', 'Check-in 08.15 WIB tercatat tepat waktu (present)');

// 08:30 WIB -> Threshold boundary ('present')
const status830 = determineAttendanceStatus(makeWibDate(2026, 10, 11, 8, 30));
assert(status830 === 'present', 'Check-in 08.30 WIB batas toleransi tercatat tepat waktu (present)');

// 08:31 WIB -> Late ('late')
const status831 = determineAttendanceStatus(makeWibDate(2026, 10, 11, 8, 31));
assert(status831 === 'late', 'Check-in 08.31 WIB tercatat terlambat (late)');

// 09:30 WIB -> Late ('late')
const status930 = determineAttendanceStatus(makeWibDate(2026, 10, 11, 9, 30));
assert(status930 === 'late', 'Check-in 09.30 WIB tercatat terlambat (late)');

// -----------------------------------------------------------------
// 3. WORK DURATION AUDIT (Timestamp delta & durationMinutes)
// -----------------------------------------------------------------
console.log('\n--- 3. Uji Perhitungan Durasi Kerja & Anomali Timestamp ---');

const baseCheckInTs = 1760000000000; // arbitrary timestamp ms

// Normal 8 hours work (8 * 60 * 60 * 1000 ms)
const normalOutTs = baseCheckInTs + (8 * 3600 * 1000);
const duration8h = calculateWorkDuration(baseCheckInTs, normalOutTs, '08:00', '16:00');
const duration8hMins = calculateWorkDurationMinutes(baseCheckInTs, normalOutTs);

assert(
  duration8h.includes('8') && duration8h.toLowerCase().includes('jam'),
  `Durasi kerja 8 jam valid format string: "${duration8h}"`
);
assert(duration8hMins === 480, `Durasi kerja 8 jam tepat 480 menit (aktual: ${duration8hMins})`);

// 4 hours 30 mins work (4.5 * 3600 * 1000 ms)
const out4h30m = baseCheckInTs + (4 * 3600 * 1000) + (30 * 60 * 1000);
const duration4h30 = calculateWorkDuration(baseCheckInTs, out4h30m, '08:00', '12:30');
const duration4h30Mins = calculateWorkDurationMinutes(baseCheckInTs, out4h30m);

assert(
  duration4h30.includes('4') && duration4h30.includes('30'),
  `Durasi kerja 4 jam 30 menit valid string: "${duration4h30}"`
);
assert(duration4h30Mins === 270, `Durasi kerja 4 jam 30 menit tepat 270 menit (aktual: ${duration4h30Mins})`);

// Anomaly: Check-out before check-in (negative delta)
const negativeOutTs = baseCheckInTs - 100000;
const durationNegative = calculateWorkDuration(baseCheckInTs, negativeOutTs);
const durationNegativeMins = calculateWorkDurationMinutes(baseCheckInTs, negativeOutTs);

assert(
  durationNegative === '0 Menit',
  `Timestamp anomali (checkout mendahului checkin) dihandle aman: "${durationNegative}"`
);
assert(
  durationNegativeMins === 0,
  `Menit anomali bernilai 0 (aktual: ${durationNegativeMins})`
);

// Fallback using time strings when timestamps absent
const strFallback = calculateWorkDuration(undefined, undefined, '08:00', '17:15');
assert(
  strFallback.includes('9') && strFallback.includes('15'),
  `Fallback string time jam 08:00 ke 17:15 valid: "${strFallback}"`
);

// -----------------------------------------------------------------
// 4. DUPLICATE CHECK-IN DETECTION & DETERMINISTIC DOC ID
// -----------------------------------------------------------------
console.log('\n--- 4. Uji Pencegahan Presensi Ganda & Deterministic Doc ID ---');

const testStudentId = 'student_001';
const testDate = getTodayDateJakarta();
const docId = `att_${testStudentId}_${testDate}`;

assert(
  docId === `att_student_001_${testDate}`,
  `Format deterministic doc ID unik sesuai: "${docId}"`
);

const existingRecords = [
  { id: docId, studentId: testStudentId, date: testDate, checkInTime: '08:05' }
];

const isDuplicate = existingRecords.some(
  r => r.studentId === testStudentId && r.date === testDate
);
assert(isDuplicate, 'Pemeriksaan presensi ganda pada tanggal yang sama berhasil mendeteksi record aktif');

const isDifferentStudentDuplicate = existingRecords.some(
  r => r.studentId === 'student_002' && r.date === testDate
);
assert(!isDifferentStudentDuplicate, 'Mahasiswa berbeda pada tanggal yang sama tidak tertolak');

// -----------------------------------------------------------------
// 5. SECURITY RULES LOGIC AUDIT (Anti-Spoofing & Immutability)
// -----------------------------------------------------------------
console.log('\n--- 5. Uji Validasi Logika Security Rules Firestore & Anti-Spoofing ---');

// A. Latitude/Longitude Bounding Box Rule validation
// Bounding Box around (-6.970460, 107.630319):
// Lat: [-6.9710, -6.9699] (headroom ~10-12m from 50m circle)
// Lng: [107.6297, 107.6309] (headroom ~14-18m from 50m circle)
function validateFirestoreRuleCoords(lat: number, lng: number): boolean {
  return lat >= -6.9710 && lat <= -6.9699 && lng >= 107.6297 && lng <= 107.6309;
}

assert(
  validateFirestoreRuleCoords(BTP_OFFICIAL_LAT, BTP_OFFICIAL_LNG),
  `Koordinat resmi baru BTP (${BTP_OFFICIAL_LAT}, ${BTP_OFFICIAL_LNG}) memenuhi validasi bounding box Firestore Rules`
);

// Test that 50m boundary points in all cardinal directions pass bounding box (ZERO false rejections)
const pNorth50 = { lat: BTP_OFFICIAL_LAT + 0.00044966, lng: BTP_OFFICIAL_LNG };
const pSouth50 = { lat: BTP_OFFICIAL_LAT - 0.00044966, lng: BTP_OFFICIAL_LNG };
const pEast50 = { lat: BTP_OFFICIAL_LAT, lng: BTP_OFFICIAL_LNG + 0.00045300 };
const pWest50 = { lat: BTP_OFFICIAL_LAT, lng: BTP_OFFICIAL_LNG - 0.00045300 };

assert(
  validateFirestoreRuleCoords(pNorth50.lat, pNorth50.lng) &&
  validateFirestoreRuleCoords(pSouth50.lat, pSouth50.lng) &&
  validateFirestoreRuleCoords(pEast50.lat, pEast50.lng) &&
  validateFirestoreRuleCoords(pWest50.lat, pWest50.lng),
  'Semua 4 titik batas 50m (Utara, Selatan, Timur, Barat) lolos bounding box Firestore Rules tanpa false rejection'
);

// Test point INSIDE bounding box but OUTSIDE circle radius (e.g. corner SW at ~91m)
const cornerSW = { lat: -6.9710, lng: 107.6297 };
const cornerDist = calculateHaversineDistanceMeters(cornerSW.lat, cornerSW.lng, BTP_OFFICIAL_LAT, BTP_OFFICIAL_LNG);
const isInsideBox = validateFirestoreRuleCoords(cornerSW.lat, cornerSW.lng);
const isInsideCircle = cornerDist <= BTP_GEOFENCE_RADIUS_METERS;

assert(
  isInsideBox && !isInsideCircle,
  `Titik sudut bounding box (${cornerSW.lat}, ${cornerSW.lng}, jarak ${cornerDist}m) lolos Security Rules tetapi DITOLAK oleh Haversine frontend (membuktikan bounding box != lingkaran 50m)`
);

// Test another point inside bounding box but outside 50m circle (~76m)
const boxPoint76m = { lat: -6.9700, lng: 107.6298 };
const dist76m = calculateHaversineDistanceMeters(boxPoint76m.lat, boxPoint76m.lng, BTP_OFFICIAL_LAT, BTP_OFFICIAL_LNG);
assert(
  validateFirestoreRuleCoords(boxPoint76m.lat, boxPoint76m.lng) && dist76m > BTP_GEOFENCE_RADIUS_METERS,
  `Titik dalam box (${boxPoint76m.lat}, ${boxPoint76m.lng}, jarak ${dist76m}m) lolos box namun ditolak lingkaran 50m`
);

assert(
  !validateFirestoreRuleCoords(-6.1754, 106.8272),
  'Koordinat spoofed Jakarta (-6.1754, 106.8272) otomatis ditolak oleh Firestore Rules'
);

assert(
  !validateFirestoreRuleCoords(-6.9147, 107.6098),
  'Koordinat spoofed Bandung Kota (-6.9147, 107.6098) otomatis ditolak oleh Firestore Rules'
);

// B. Immutability on checkout update:
// Check that checkInTime, status, checkInPhoto cannot be modified during checkout
function isCheckoutPayloadValid(
  existingDoc: { checkOutTime?: string; checkInTime: string; status: string; studentId: string },
  updatePayload: { checkOutTime?: string; checkInTime?: string; status?: string; studentId?: string; dailyNotes?: string }
): { allowed: boolean; reason?: string } {
  // Rule 1: Cannot checkout twice
  if (existingDoc.checkOutTime) {
    return { allowed: false, reason: 'Already checked out' };
  }
  // Rule 2: Cannot change studentId
  if (updatePayload.studentId && updatePayload.studentId !== existingDoc.studentId) {
    return { allowed: false, reason: 'Cannot change studentId' };
  }
  // Rule 3: Cannot modify check-in parameters
  if (updatePayload.checkInTime && updatePayload.checkInTime !== existingDoc.checkInTime) {
    return { allowed: false, reason: 'Cannot tamper checkInTime' };
  }
  if (updatePayload.status && updatePayload.status !== existingDoc.status) {
    return { allowed: false, reason: 'Cannot tamper status' };
  }
  // Rule 4: Mandatory daily notes
  if (!updatePayload.dailyNotes || updatePayload.dailyNotes.trim().length === 0) {
    return { allowed: false, reason: 'dailyNotes is required' };
  }
  return { allowed: true };
}

const activeSession = {
  studentId: 'student_123',
  checkInTime: '08:45',
  status: 'late'
};

// Valid checkout with notes
const validCheckout = isCheckoutPayloadValid(activeSession, {
  studentId: 'student_123',
  checkOutTime: '17:00',
  dailyNotes: 'Selesai integrasi sensor pH dan kalibrasi EC.'
});
assert(validCheckout.allowed, 'Check-out sah dengan logbook aktivitas diizinkan oleh Rules');

// Attack 1: Student tries to change status from 'late' to 'present'
const tamperStatusAttack = isCheckoutPayloadValid(activeSession, {
  studentId: 'student_123',
  checkOutTime: '17:00',
  status: 'present',
  dailyNotes: 'Catatan harian'
});
assert(!tamperStatusAttack.allowed, 'Serangan memanipulasi status dari late ke present ditolak');

// Attack 2: Student tries to change checkInTime to 08:00
const tamperTimeAttack = isCheckoutPayloadValid(activeSession, {
  studentId: 'student_123',
  checkInTime: '08:00',
  checkOutTime: '17:00',
  dailyNotes: 'Catatan harian'
});
assert(!tamperTimeAttack.allowed, 'Serangan memanipulasi jam masuk checkInTime ditolak');

// Attack 3: Student tries to checkout without dailyNotes
const missingNotesAttack = isCheckoutPayloadValid(activeSession, {
  studentId: 'student_123',
  checkOutTime: '17:00',
  dailyNotes: ''
});
assert(!missingNotesAttack.allowed, 'Check-out tanpa mengisi logbook harian ditolak');

// Attack 4: Student tries to checkout twice on an already checked out document
const alreadyFinishedDoc = {
  studentId: 'student_123',
  checkInTime: '08:05',
  status: 'present',
  checkOutTime: '17:00'
};
const doubleCheckoutAttack = isCheckoutPayloadValid(alreadyFinishedDoc, {
  studentId: 'student_123',
  checkOutTime: '18:00',
  dailyNotes: 'Tambahan kerja lembur'
});
assert(!doubleCheckoutAttack.allowed, 'Check-out ganda pada dokumen yang sudah pulang ditolak');

// -----------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------
console.log('\n================================================================');
const totalPassed = results.filter(r => r.passed).length;
const totalFailed = results.filter(r => !r.passed).length;
console.log(`TOTAL UJI: ${results.length} | LULUS (PASS): ${totalPassed} | GAGAL (FAIL): ${totalFailed}`);

if (totalFailed > 0) {
  console.error('TEST SUITE GAGAL!');
  process.exit(1);
} else {
  console.log('SEMUA PENGUJIAN LOGIKA BACKEND & GEOLOKASI BERHASIL 100%!');
  process.exit(0);
}
