import { 
  User, 
  Task, 
  AttendanceRecord, 
  LmsProject, 
  Announcement, 
  ApprovalRequest, 
  LmsNotification, 
  ApplicantRecord, 
  SystemLog,
  PendingRegistration
} from '../types';

export const initialUsers: User[] = [
  {
    id: 'user_director',
    name: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    email: 'indrarini@telkomuniversity.ac.id',
    role: 'director',
    title: 'Kepala & Direktur Utama Smart Grow Laboratory',
    studentId: '197608122003122001', // NIP
    institution: 'Telkom University',
    major: 'Teknik Elektro / Telekomunikasi',
    semester: 'Dosen Pembimbing Utama',
    phone: '+62 812-2345-6789',
    address: 'Bandung Techno Park, Kampus Utama Telkom University, Bandung',
    specialty: 'Arsitektur Jaringan IoT, Pengolahan Sinyal Digital & Smart Agriculture',
    avatar: '/images/team/indrarini.jpg',
    status: 'active',
    joinedDate: '2021-01-15',
    skillsList: ['Riset IoT', 'Arsitektur Telekomunikasi', 'Pengolahan Sinyal', 'Manajemen Lab', 'Publikasi Ilmiah'],
    languages: ['Indonesia', 'Inggris'],
    frameworks: ['Matlab', 'Python', 'TensorFlow', 'NS-3'],
    interestFields: ['Smart Farming', 'Sensor Fusion', 'Machine Learning', 'Cyber-Physical Systems'],
    advisor: 'Direktur Utama',
    activeProjects: ['HYCOSMARTS Container Farm', 'LumiNet Smart Crop Vision AI', 'Hydroponic Precision NFT'],
    internshipStatus: 'Direktur Laboratorium',
    github: 'https://github.com/indrarini-telkom',
    linkedin: 'https://linkedin.com/in/indrarini-dyah-irawati',
    portfolio: 'https://smartgrowlab.telkomuniversity.ac.id/director',
    bio: 'Guru Besar dan Peneliti Utama dalam bidang IoT dan Telekomunikasi di Telkom University. Berfokus pada pengembangan riset sistem pertanian cerdas terintegrasi berbasis kecerdasan buatan dan jaringan sensor nirkabel.',
    activityHistory: [
      { id: 'act_d1', action: 'Persetujuan Proyek Riset', date: '2026-07-22 09:15', details: 'Menyetujui usulan pengadaan sensor NPK dan modul Jetson Orin Nano.' },
      { id: 'act_d2', action: 'Peninjauan Laporan Mingguan', date: '2026-07-21 16:00', details: 'Melihat laporan hasil panen hidroponik kangkung dan pakcoy minggu ke-3.' }
    ],
    loginHistory: [
      { id: 'log_d1', ip: '103.14.22.81', device: 'MacBook Pro macOS Monterey - Chrome', date: '2026-07-22 08:00 WIB' },
      { id: 'log_d2', ip: '103.14.22.81', device: 'iPad Pro iOS 17 - Safari', date: '2026-07-21 19:30 WIB' }
    ],
    totalHibah: 'Rp 100 Juta+',
    hibahSubtitle: 'Kedaireka, Dikti & Industri 2024–2026',
    totalPaper: '15 Paper',
    paperSubtitle: 'Q1 & Q2 Smart Precision Farming',
    totalPaten: '5 Hak Cipta',
    patenSubtitle: 'Sistem Algoritma & Hardware',
    totalMahasiswaOverride: '9 Mahasiswa Magang',
    mahasiswaSubtitle: '9 Mahasiswa Magang & 6 Alumni Riset'
  },
  {
    id: 'user_assistant',
    name: 'Azliny Azreen',
    email: 'azliny@telkomuniversity.ac.id',
    role: 'assistant',
    title: 'Asisten Laboratorium Utama & Koordinator Magang',
    studentId: '1301210042',
    institution: 'Telkom University',
    major: 'Informatika / Teknik Komputer',
    semester: 'Semester 7',
    phone: '+62 821-9876-5432',
    address: 'Jl. Radio Palasari No. 12, Dayeuhkolot, Kabupaten Bandung',
    specialty: 'Pengembangan Full-Stack Web, Embedded Systems ESP32 & Kalibrasi Sensor IoT',
    avatar: '/images/team/azliny.jpg',
    status: 'active',
    joinedDate: '2023-02-10',
    skillsList: ['React', 'TypeScript', 'Node.js', 'ESP32 C++', 'MQTT / WebSockets', 'Tailwind CSS', 'PostgreSQL'],
    languages: ['C++', 'JavaScript', 'TypeScript', 'Python', 'SQL'],
    frameworks: ['React.js', 'Vite', 'Express.js', 'FastAPI', 'TailwindCSS'],
    interestFields: ['Full-stack Agriculture Portal', 'Edge Telemetry', 'Real-time Dashboards'],
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    activeProjects: ['Portal Riset Smart Grow', 'Kalibrasi Sensor Hydroponic Bay #2', 'Telemetry Web Gateway'],
    internshipStatus: 'Asisten Aktif / Ketua Tim Pengembang',
    github: 'https://github.com/azlinyazreen',
    linkedin: 'https://linkedin.com/in/azlinyazreen',
    portfolio: 'https://azlinyazreen.dev',
    bio: 'Mahasiswa Informatika Telkom University yang menjabat sebagai Asisten Utama Riset Smart Grow Lab. Berpengalaman merancang sistem instrumentasi IoT dan dashboard web real-time.',
    activityHistory: [
      { id: 'act_a1', action: 'Pemeriksaan Tugas Mahasiswa', date: '2026-07-22 10:30', details: 'Memeriksa dan meminta revisi tugas penyesuaian reconnect WebSocket.' },
      { id: 'act_a2', action: 'Presensi Masuk', date: '2026-07-22 08:05', details: 'Melakukan check-in presensi di Lab Smart Grow.' }
    ],
    loginHistory: [
      { id: 'log_a1', ip: '103.14.22.82', device: 'Windows 11 PC - Chrome 126', date: '2026-07-22 08:02 WIB' }
    ]
  },
  {
    id: 'user_assistant_alfachri',
    name: 'Muhammad Alfachri Akbar',
    email: 'alfachriakbar@student.telkomuniversity.ac.id',
    role: 'assistant',
    title: 'Alumni & AI Engineer (Asisten Peneliti)',
    studentId: '1301210155',
    institution: 'Telkom University',
    major: 'Informatika / Kecerdasan Buatan',
    semester: 'Alumni S1 Informatika',
    phone: '+62 812-3456-7890',
    address: 'Komp. Sukabirus Permai, Dayeuhkolot, Bandung',
    specialty: 'Artificial Intelligence, Computer Vision, Deep Learning & Smart Crop Analysis',
    avatar: '/images/team/alfachri.jpg',
    status: 'active',
    joinedDate: '2023-03-01',
    skillsList: ['Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'Computer Vision', 'Deep Learning', 'Smart Agriculture'],
    languages: ['Python', 'C++', 'SQL'],
    frameworks: ['PyTorch', 'TensorFlow', 'FastAPI', 'YOLOv8', 'OpenCV'],
    interestFields: ['Crop Disease Detection', 'AIoT Plant Growth Analytics', 'Autonomous Greenhouse AI'],
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    activeProjects: ['LumiNet Smart Crop Vision AI', 'AIoT Telemetry & Automation Hub'],
    internshipStatus: 'Alumni Smart Grow Laboratory',
    github: 'https://github.com/alfachriakbar',
    linkedin: 'https://linkedin.com/in/alfachriakbar',
    bio: 'Alumni & Asisten Peneliti di Smart Grow Laboratory Telkom University. Berfokus pada integrasi Computer Vision, Deep Learning, dan pemrosesan data cerdas untuk optimasi sistem telemetri otomatisasi pertanian di Research Center.'
  },
  {
    id: 'user_admin',
    name: 'Administrator Portal Lab',
    email: 'admin@smartgrowlab.com',
    role: 'admin',
    title: 'Administrator Sistem & Infrastruktur IT',
    studentId: 'ADM-2021-001',
    institution: 'Telkom University',
    major: 'Manajemen Sistem Informasi',
    phone: '+62 811-0099-8877',
    address: 'Gedung Rektorat Lt. 2 Telkom University',
    specialty: 'Manajemen User, Keamanan Sistem, Backup Database & Server Cloud Run',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
    status: 'active',
    joinedDate: '2021-01-01',
    skillsList: ['SysAdmin', 'Cloud Security', 'Docker / GCP', 'Database Admin'],
    languages: ['Bash', 'SQL', 'TypeScript'],
    frameworks: ['Docker', 'Nginx', 'Google Cloud Platform'],
    interestFields: ['Lab System Reliability', 'Cyber Security'],
    advisor: 'Direktur Utama',
    activeProjects: ['Infrastruktur Cloud Smart Grow'],
    internshipStatus: 'Administrator Tetap',
    github: 'https://github.com/smartgrowlab-admin',
    bio: 'Menjaga kelancaran operasional sistem portal LMS, verifikasi akun pendaftar magang baru, dan pengawasan log aktivitas laboratorium.',
    activityHistory: [
      { id: 'act_adm1', action: 'Verifikasi Pendaftar', date: '2026-07-22 08:30', details: 'Menyetujui pendaftaran mahasiswa magang baru.' }
    ],
    loginHistory: [
      { id: 'log_adm1', ip: '103.14.22.100', device: 'Linux Workstation - Chrome', date: '2026-07-22 07:30 WIB' }
    ]
  },
  {
    id: 'user_alumni_arimbi',
    name: 'Arimbi Dwi',
    email: 'arimbi@student.telkomuniversity.ac.id',
    role: 'student',
    title: 'Lead Hardware Engineer (Alumni)',
    studentId: '1301200001',
    internId: 'SGL-ALM-2025-001',
    institution: 'Telkom University',
    major: 'Teknik Elektro',
    specialty: 'Arsitektur Fisik Lab & Kelistrikan LED',
    avatar: '/images/team/arimbi.jpg',
    status: 'alumni',
    joinedDate: '2024-09-01',
    bio: 'Mengembangkan integrasi arsitektur fisik laboratorium, sistem kelistrikan LED grow light, dan kalibrasi instrumen riset magang sebelumnya.'
  },
  {
    id: 'user_alumni_daffa',
    name: 'Daffa Zyaa Ulhaq',
    email: 'daffa@student.telkomuniversity.ac.id',
    role: 'student',
    title: 'Firmware Developer (Alumni)',
    studentId: '1301200002',
    internId: 'SGL-ALM-2025-002',
    institution: 'Telkom University',
    major: 'Teknik Komputer',
    specialty: 'Firmware C/C++ ESP32 Telemetry',
    avatar: '/images/team/daffa.jpg',
    status: 'alumni',
    joinedDate: '2024-09-01',
    bio: 'Mengembangkan sistem firmware dan protokol transmisi data nirkabel mikrokontroler sensor telemetry riset magang sebelumnya.'
  },
  {
    id: 'user_alumni_hannani',
    name: 'Hannani Syadzwana',
    email: 'hannani@student.telkomuniversity.ac.id',
    role: 'student',
    title: 'Full-stack Developer (Alumni)',
    studentId: '1301200003',
    internId: 'SGL-ALM-2025-003',
    institution: 'Telkom University',
    major: 'Informatika',
    specialty: 'Portal Analitik Web & Telemetry',
    avatar: '/images/team/hannani.jpg',
    status: 'alumni',
    joinedDate: '2024-09-01',
    bio: 'Mengembangkan antarmuka portal analitik dan visualisasi telemetry laboratorium riset magang sebelumnya.'
  },
  {
    id: 'user_alumni_elyasa',
    name: 'Elyasa Reva',
    email: 'elyasa@student.telkomuniversity.ac.id',
    role: 'student',
    title: 'UI/UX Designer (Alumni)',
    studentId: '1301200004',
    internId: 'SGL-ALM-2025-004',
    institution: 'Telkom University',
    major: 'Desain Komunikasi Visual',
    specialty: 'UI/UX Design & Prototyping Figma',
    avatar: '/images/team/elyasa.jpg',
    status: 'alumni',
    joinedDate: '2024-09-01',
    bio: 'Merancang antarmuka visual (UI/UX) dan pengalaman pengguna untuk platform riset Smart Grow Laboratory.'
  },
  {
    id: 'user_alumni_humam',
    name: 'Humam Ibadillah',
    email: 'humam@student.telkomuniversity.ac.id',
    role: 'student',
    title: 'Agronomist (Alumni)',
    studentId: '1301200005',
    internId: 'SGL-ALM-2025-005',
    institution: 'Telkom University',
    major: 'Agroteknologi',
    specialty: 'Nutrisi Tanaman Hidroponik',
    avatar: '/images/team/humam.jpg',
    status: 'alumni',
    joinedDate: '2024-09-01',
    bio: 'Menganalisis kebutuhan hara nutrisi tanaman hidroponik dan kalibrasi parameter larutan riset magang sebelumnya.'
  }
];

export const initialTasks: Task[] = [];

export const initialAttendance: AttendanceRecord[] = [];

export const initialLmsProjects: LmsProject[] = [
  {
    id: 'proj_hyco',
    projectNumber: 'PRJ-IOT-2026-01',
    title: 'HYCOSMARTS - Smart Container-Based Intelligent Farming System',
    category: 'Container-based Smart Agriculture',
    description: 'HYCOSMARTS adalah sistem pertanian cerdas berbasis kontainer yang dirancang untuk mengelola pertanian hidroponik indoor secara otomatis, efisien, dan berkelanjutan dengan sensor pH, TDS, DO, EC, dan ultrasonik serta integrasi AI & 3T.',
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    assignedStudentIds: [],
    assignedStudentNames: [],
    status: 'in_progress',
    progressPercent: 88,
    deadline: '2026-09-15',
    repoUrl: 'https://github.com/smartgrowlab/hycosmarts-container',
    photoUrl: '/images/hycosmarts/hycosmarts-3.png',
    documents: [
      { name: 'Spesifikasi_Mekanik_Kontainer_v2.pdf', url: '#', date: '2026-06-10', size: '4.2 MB' },
      { name: 'Arsitektur_Sensor_Jaringan_Modbus.pdf', url: '#', date: '2026-07-01', size: '2.8 MB' },
      { name: 'Laporan_Pengujian_Sensor_pH_TDS_DO_EC.pdf', url: '#', date: '2026-07-20', size: '3.5 MB' }
    ]
  },
  {
    id: 'proj_simona',
    projectNumber: 'PRJ-AQUA-2026-02',
    title: 'SIMONA - Aquaponics Monitoring System',
    category: 'Aquaponics',
    description: 'SIMONA (Aquaponics Monitoring System) adalah sistem cerdas terintegrasi untuk mendukung pertanian berkelanjutan dengan menggabungkan akuakultur dan hidroponik, memantau level air, pH, suhu, dan TDS berbasis mikrokontroler & Blynk.',
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    assignedStudentIds: [],
    assignedStudentNames: [],
    status: 'in_progress',
    progressPercent: 92,
    deadline: '2026-10-30',
    repoUrl: 'https://github.com/smartgrowlab/simona-aquaponics',
    photoUrl: '/images/simona/simona-hardware-blynk.png',
    documents: [
      { name: 'Arsitektur_Sensor_SIMONA_v1.pdf', url: '#', date: '2026-07-10', size: '3.8 MB' },
      { name: 'Skema_Mikrokontroler_Arduino_Blynk.pdf', url: '#', date: '2026-07-15', size: '2.1 MB' }
    ]
  },
  {
    id: 'proj_luminet',
    projectNumber: 'PRJ-[#1F4E4F]-PJU-2026-03',
    title: 'LUMINET - Smart Street Lighting Management System',
    category: 'Smart City PJU IoT',
    description: 'LUMINET (Smart Street Lighting Management System) adalah sistem cerdas berbasis IoT untuk mengelola Penerangan Jalan Umum (PJU) secara otomatis, efisien, dan terpusat via XBee mesh, LDR/CCT adaptive dimming, serta peta GIS.',
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    assignedStudentIds: [],
    assignedStudentNames: [],
    status: 'in_progress',
    progressPercent: 95,
    deadline: '2026-09-15',
    repoUrl: 'https://github.com/smartgrowlab/luminet-pju',
    photoUrl: '/images/luminet/luminet-logo.jpg',
    documents: [
      { name: 'Spesifikasi_XBee_Mesh_Protocol_PJU.pdf', url: '#', date: '2026-07-21', size: '4.2 MB' },
      { name: 'Manual_Integrasi_Peta_GIS_Telemetry.pdf', url: '#', date: '2026-07-22', size: '3.1 MB' }
    ]
  },
  {
    id: 'proj_flocify',
    projectNumber: 'PRJ-[#1F4E4F]-BIO-2026-04',
    title: 'FLOCIFY - Biofloc AI & Deep Learning Aquaculture System',
    category: 'Biofloc AI Aquaculture',
    description: 'Flocify is an innovative IoT and Deep Learning solution to optimize biofloc fish farming, water telemetry, ammonia spike prediction, and automated probiotic dosing.',
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    assignedStudentIds: [],
    assignedStudentNames: [],
    status: 'in_progress',
    progressPercent: 88,
    deadline: '2026-11-20',
    repoUrl: 'https://github.com/smartgrowlab/flocify-biofloc-ai',
    liveUrl: 'https://ppmtelkom.vercel.app/',
    photoUrl: '/images/flocify/flocify-biofloc-tank-iso.png',
    documents: [
      { name: 'Desain_Arsitektur_3D_Biofloc_Tank_FLOCIFY.pdf', url: '#', date: '2026-07-23', size: '6.4 MB' },
      { name: 'Model_Deep_Learning_Prediksi_Amonia.pdf', url: '#', date: '2026-07-24', size: '4.8 MB' }
    ]
  },
  {
    id: 'proj_cloud',
    projectNumber: 'PRJ-NET-2026-04',
    title: 'Cyber-Physical Telemetry Gateway',
    category: 'Cloud & Infrastructure',
    description: 'Infrastruktur MQTT & WebSocket berlatensi rendah melayani streaming telemetry real-time dari 32 node sensor IoT terdistribusi.',
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    assignedStudentIds: ['user_assistant'],
    assignedStudentNames: ['Azliny Azreen'],
    status: 'completed',
    progressPercent: 100,
    deadline: '2026-07-20',
    repoUrl: 'https://github.com/smartgrowlab/telemetry-gateway',
    photoUrl: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=800&q=80',
    documents: [
      { name: 'Arsitektur_Gateway_WebSocket_JWT.pdf', url: '#', date: '2026-07-15', size: '3.4 MB' }
    ]
  },
  {
    id: 'proj_smart_tbn',
    projectNumber: 'PRJ-WASTE-2026-05',
    title: 'Smart TBN - Smart Trash Bin Notification Goes to Sumba',
    category: 'Smart Waste Management IoT',
    description: 'Smart Trash Bin Notification (Smart TBN) adalah tempat sampah pintar berbasis IoT yang memantau kondisi ketinggian sampah, beban muatan, dan visual kamera secara real-time dengan notifikasi otomatis ke petugas di Desa Wisata Kampung Raja Prailiu, Sumba NTT.',
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    assignedStudentIds: [],
    assignedStudentNames: [],
    status: 'in_progress',
    progressPercent: 94,
    deadline: '2026-11-20',
    repoUrl: 'https://github.com/smartgrowlab/smart-tbn-iot',
    photoUrl: '/images/smart-tbn/smart-tbn-poster.png',
    documents: [
      { name: 'Implementasi_IoT_Smart_TBN_Sumba.pdf', url: '#', date: '2026-07-27', size: '5.2 MB' },
      { name: 'Manual_Integrasi_Sensor_Ultrasonik_Kamera.pdf', url: '#', date: '2026-07-27', size: '3.4 MB' }
    ]
  }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'ann_1',
    title: 'Jadwal Evaluasi Proyek Riset & Pemeliharaan Alat Laboratorium',
    content: 'Seluruh mahasiswa magang diwajibkan menghadiri rapat evaluasi kemajuan riset mingguan pada hari Jumat pukul 09:00 WIB di Ruang Rapat Lab Smart Grow. Harap membawa logbook fisik dan draf laporan.',
    authorName: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    authorRole: 'Director',
    date: '2026-07-21',
    priority: 'important'
  },
  {
    id: 'ann_2',
    title: 'Kedatangan 3 Unit Development Kit Nvidia Jetson Orin Nano Baru',
    content: 'Telah tiba 3 unit modul Nvidia Jetson Orin Nano untuk kebutuhan riset Computer Vision dan AI Edge. Mahasiswa yang memerlukan akses dapat mengajukan ke Asisten Laboratorium.',
    authorName: 'Azliny Azreen',
    authorRole: 'Assistant',
    date: '2026-07-19',
    priority: 'normal'
  },
  {
    id: 'ann_htci_collab',
    title: 'Kerja Sama Riset HTCI Pengolahan Sampah di Bojongsoang',
    content: 'Smart Grow Laboratory turut mendukung kegiatan kerja sama Telkom University dan INTI International University Malaysia dalam mengenalkan teknologi Hydrothermal Carbonization (HTCI) untuk pengolahan sampah di Bojongsoang. Untuk informasi riset dan bimbingan, hubungi Pembina Lab di indrarini@telkomuniversity.ac.id.',
    authorName: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    authorRole: 'Pembina Lab (Director)',
    date: '2026-07-23',
    priority: 'important'
  }
];

export const initialApprovalRequests: ApprovalRequest[] = [];

export const initialNotifications: LmsNotification[] = [
  {
    id: 'notif_pembina_email',
    recipientRole: 'all',
    title: 'Kontak Koordinasi Pembina Lab',
    message: 'Untuk konsultasi bimbingan riset, koordinasi proyek, dan persetujuan luaran laboratorium, anggota riset dan mahasiswa magang dapat menghubungi Pembina Lab Prof. Dr. Indrarini Dyah Irawati, S.T., M.T. melalui email: indrarini@telkomuniversity.ac.id.',
    date: '2026-07-23 08:30 WIB',
    read: false,
    type: 'announcement'
  },
  {
    id: 'notif_htci_collab',
    recipientRole: 'all',
    title: 'Update Riset: Kerja Sama Teknologi HTCI',
    message: 'Smart Grow Laboratory berpartisipasi dalam kerja sama pengenalan teknologi Hydrothermal Carbonization (HTCI) untuk pengolahan sampah berkelanjutan bersama Telkom University dan INTI International University di Desa Bojongsoang.',
    date: '2026-07-23 09:00 WIB',
    read: false,
    type: 'announcement'
  }
];

export const initialApplicants: ApplicantRecord[] = [
  {
    id: 'applicant_1',
    fullName: 'Andi Pratama',
    email: 'andi.pratama@student.telkomuniversity.ac.id',
    phone: '+62 821-4455-6677',
    university: 'Telkom University',
    major: 'Teknik Elektro',
    roleInterest: 'Spesialis Hardware & IoT',
    motivation: 'Tertarik mengembangkan jaringan sensor LoRaWAN untuk pemantauan pertanian presisi.',
    github: 'https://github.com/andipratama',
    instagram: '@andipratama_iot',
    status: 'pending',
    stage: 1, // Tahap 1: Seleksi Berkas
    stageNotes: 'Berkas Pendaftaran Baru Diterima.',
    submittedAt: '2026-07-22 10:15 WIB'
  },
  {
    id: 'applicant_2',
    fullName: 'Maya Indah',
    email: 'mayaindah@student.telkomuniversity.ac.id',
    phone: '+62 812-3344-5566',
    university: 'Telkom University',
    major: 'Informatika',
    roleInterest: 'Full-stack Developer',
    motivation: 'Mengembangkan antarmuka dashboard analitik hidroponik real-time.',
    github: 'https://github.com/mayaindah',
    status: 'in_selection',
    stage: 2, // Tahap 2: Tes Teknis & Portofolio
    stageNotes: 'Sedang Mengerjakan Task Modul Vue/React Telemetry.',
    submittedAt: '2026-07-20 14:30 WIB'
  },
  {
    id: 'applicant_3',
    fullName: 'Rizky Febrian',
    email: 'rizkyfebrian@student.telkomuniversity.ac.id',
    phone: '+62 857-9988-7766',
    university: 'Telkom University',
    major: 'Teknik Komputer',
    roleInterest: 'Firmware Developer',
    motivation: 'Ingin mendalami pengkodean RTOS ESP32 pada sistem dosing nutrisi.',
    github: 'https://github.com/rizkyfebrian',
    status: 'in_selection',
    stage: 3, // Tahap 3: Wawancara Pembimbing/Asisten
    stageNotes: 'Jadwal Wawancara: Kamis, 24 Juli 2026 jam 13.00 WIB.',
    submittedAt: '2026-07-18 09:00 WIB'
  },
  {
    id: 'applicant_4',
    fullName: 'Farhan Pratama',
    email: 'farhanpratama@student.telkomuniversity.ac.id',
    phone: '+62 813-7766-5544',
    university: 'Telkom University',
    major: 'Sistem Informasi',
    roleInterest: 'UI/UX Designer',
    motivation: 'Merancang antarmuka mobile friendly untuk monitoring lab.',
    github: 'https://github.com/farhanpratama',
    status: 'in_selection',
    stage: 4, // Tahap 4: Pengumuman & Verifikasi Akhir
    stageNotes: 'Verifikasi Akhir Berkas Administrasi Magang.',
    submittedAt: '2026-07-15 11:20 WIB'
  },
  {
    id: 'applicant_5',
    fullName: 'Dina Rahmawati',
    email: 'dinarahmawati@student.telkomuniversity.ac.id',
    phone: '+62 822-1122-3344',
    university: 'Telkom University',
    major: 'Agroteknologi',
    roleInterest: 'Agronomist Specialist',
    motivation: 'Analisis hara nutrisi NFT hydroponics tanaman pakcoy.',
    github: 'https://github.com/dinarahmawati',
    status: 'approved',
    stage: 5, // Tahap 5: Keterima & ID Magang Diterbitkan
    stageNotes: 'Diterima Magang Resmi. ID Magang: SGL-INT-2026-008.',
    internId: 'SGL-INT-2026-008',
    submittedAt: '2026-07-10 08:00 WIB'
  }
];

export const initialSystemLogs: SystemLog[] = [];

export const initialPendingRegistrations: PendingRegistration[] = [];
