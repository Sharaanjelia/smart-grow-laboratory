export interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  timestamp: string;
}

export interface NewsItem {
  id: string;
  title: string;
  tagline?: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  readTime: string;
  comments: Comment[];
}

export interface SensorData {
  name: string;
  value: number;
  unit: string;
  minSafe: number;
  maxSafe: number;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  fullDescription: string;
  sensors: SensorData[];
  image: string;
  gallery: string[];
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  email: string;
  instagram?: string;
  github?: string;
  bio: string;
  skills: string[];
}

export type PageId = 'home' | 'news' | 'project' | 'about' | 'join' | 'login' | 'dashboard';

export type UserRole = 'director' | 'assistant' | 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  title?: string;
  studentId?: string; // NIM
  institution?: string; // Universitas
  major?: string; // Program Studi
  semester?: string; // Semester
  faculty?: string; // Fakultas
  phone?: string;
  address?: string;
  specialty?: string;
  status: 'active' | 'inactive';
  joinedDate: string;
  startDate?: string;
  endDate?: string;
  campusAdvisor?: string;
  labAdvisor?: string;
  roleInProject?: string;
  skillsList?: string[];
  languages?: string[];
  frameworks?: string[];
  interestFields?: string[];
  advisor?: string;
  activeProjects?: string[];
  internshipStatus?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  bio?: string;
  documentsList?: { name: string; category: string; url: string; date: string; size?: string }[];
  timelineEvents?: { date: string; title: string; description: string; type?: 'milestone' | 'task' | 'revision' | 'start' }[];
  attendanceSummaryData?: { present: number; late: number; leave: number; sick: number; absent: number; score: number };
  taskSummaryData?: { total: number; completed: number; review: number; revision: number; late: number };
  kpiData?: { overallProgress: number; attendanceScore: number; taskCompletionRate: number; researchContribution: number; reviewScore: number };
  activityHistory?: { id: string; action: string; date: string; details: string }[];
  loginHistory?: { id: string; ip: string; device: string; date: string }[];
}

export type TaskStatus = 'not_started' | 'in_progress' | 'review' | 'revision' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface RevisionItem {
  id: string;
  revisionDate: string;
  version: string;
  studentName: string;
  description: string;
  assistantNotes: string;
  status: 'pending' | 'in_progress' | 'fixed' | 'approved' | 'completed';
  fixedDate?: string;
  attachmentUrl?: string;
  comments?: string;
  history?: string;
}

export interface Task {
  id: string;
  taskNumber: string; // Nomor Tugas (e.g., TGS-2026-001)
  title: string; // Nama Tugas
  description: string;
  assignedStudentId: string;
  assignedStudentName: string; // Mahasiswa
  projectName: string; // Proyek
  assignedBy: string;
  deadline: string;
  priority: TaskPriority;
  status: TaskStatus;
  progressPercent: number; // Persentase Progress (0-100)
  reviewerName?: string; // Reviewer
  reviewDate?: string; // Tanggal Review
  attachments?: string[]; // Lampiran
  githubUrl?: string; // GitHub
  notes?: string; // Catatan
  revisions?: RevisionItem[]; // Revision History Table Data
  submissionNotes?: string;
  submissionLinks?: {
    github?: string;
    docs?: string;
    fileUrl?: string;
  };
  feedback?: string;
  createdAt: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string; // YYYY-MM-DD
  checkInTime?: string;
  checkOutTime?: string;
  duration?: string; // Durasi e.g. "7 Jam 30 Menit"
  workDuration?: string;
  status: 'present' | 'late' | 'leave' | 'sick' | 'absent';
  notes?: string; // Keterangan
  location?: string; // Lokasi e.g. "Lab Smart Grow Telkom Univ"
  ipAddress?: string; // IP Address
  device?: string; // Device e.g. "Chrome Mac OS"
  checkInPhoto?: string; // Photo Check In
  checkOutPhoto?: string; // Photo Check Out
  photoUrl?: string;
}

export interface LmsProject {
  id: string;
  projectNumber: string; // e.g. PRJ-IOT-2026-01
  title: string; // Nama Proyek
  category: string; // Kategori
  description: string; // Deskripsi
  advisor: string; // Pembimbing
  supervisor?: string;
  assignedStudentIds: string[];
  assignedStudentNames: string[]; // Mahasiswa
  students?: string[];
  status: 'planning' | 'in_progress' | 'review' | 'completed' | 'archived';
  progressPercent: number; // Progress
  deadline: string;
  repoUrl?: string; // Repository GitHub
  githubUrl?: string;
  documents?: { name: string; url: string; date: string; size?: string }[]; // Dokumen
  photoUrl?: string; // Foto Proyek
  coverImage?: string;
}

export interface Announcement {
  id: string;
  title: string;
  category?: 'Magang' | 'Penelitian' | 'Workshop' | 'Seminar' | 'Jadwal' | 'Maintenance' | 'Laboratorium' | 'General' | string;
  content: string;
  authorName: string;
  authorRole: string;
  date: string;
  scheduledDate?: string;
  priority: 'normal' | 'important' | 'urgent';
  targetAudience?: 'Semua' | 'Mahasiswa Magang' | 'Asisten' | 'Peneliti' | string;
  status?: 'published' | 'draft' | 'scheduled';
  isPinned?: boolean;
  attachments?: { name: string; url: string; size?: string }[];
}

export interface ApprovalRequest {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  type: 'leave' | 'task_review' | 'project_completion' | 'equipment_access';
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  reviewedBy?: string;
}

export interface LmsNotification {
  id: string;
  recipientRole: UserRole | 'all' | string; // user id or role
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'task' | 'approval' | 'attendance' | 'announcement';
}

export interface ApplicantRecord {
  id: string;
  fullName: string;
  email: string;
  roleInterest: string;
  motivation: string;
  github?: string;
  instagram?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
}

