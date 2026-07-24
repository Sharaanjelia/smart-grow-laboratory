import { 
  User, 
  Task, 
  AttendanceRecord, 
  LmsProject, 
  Announcement, 
  ApprovalRequest, 
  LmsNotification, 
  ApplicantRecord, 
  SystemLog 
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
    address: 'Gedung Fakultas Ilmu Terapan (FIT) Lt. 3, Kampus Utama Telkom University, Bandung',
    specialty: 'Arsitektur Jaringan IoT, Pengolahan Sinyal Digital & Smart Agriculture',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
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
    ]
  },
  {
    id: 'user_assistant',
    name: 'Azliny Azreen',
    email: 'azlinyazreen@student.telkomuniversity.ac.id',
    role: 'assistant',
    title: 'Asisten Laboratorium Utama & Koordinator Magang',
    studentId: '1301210042',
    institution: 'Telkom University',
    major: 'Informatika / Teknik Komputer',
    semester: 'Semester 7',
    phone: '+62 821-9876-5432',
    address: 'Jl. Radio Palasari No. 12, Dayeuhkolot, Kabupaten Bandung',
    specialty: 'Pengembangan Full-Stack Web, Embedded Systems ESP32 & Kalibrasi Sensor IoT',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
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
    id: 'user_assistant_2',
    name: 'M. Chiko Dwi Kasa',
    email: 'mchikodwikasa@student.telkomuniversity.ac.id',
    role: 'assistant',
    title: 'Asisten Hardware & Perancangan Sistem Elektrikal',
    studentId: '1301210099',
    institution: 'Telkom University',
    major: 'Teknik Elektro / Fisika',
    semester: 'Semester 7',
    phone: '+62 813-1122-3344',
    address: 'Komp. Sukabirus Permai Blok B3, Bandung',
    specialty: 'Power Electronics, Perancangan PCB & Mekanik Hidroponik',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    status: 'active',
    joinedDate: '2023-08-15',
    skillsList: ['PCB Design', 'Relay Actuators', 'System Hardware', 'Hydroponic Hydraulics'],
    languages: ['C', 'C++', 'Python'],
    frameworks: ['Altium Designer', 'KiCAD', 'Arduino IDE'],
    interestFields: ['Smart Greenhouse Power Grid', 'Automated Fertigation Pumps'],
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    activeProjects: ['Automated NFT Hydroponics Controller Hub'],
    internshipStatus: 'Asisten Hardware',
    github: 'https://github.com/mchikodwi',
    linkedin: 'https://linkedin.com/in/mchikodwi',
    bio: 'Fokus pada integrasi catu daya terbarukan, perancangan sirkuit kontrol pompa nutrisi, dan manajemen instalasi fisik hidroponik.',
    activityHistory: [
      { id: 'act_c1', action: 'Pengujian Solenoid Valve', date: '2026-07-21 14:20', details: 'Menguji ketahanan katup solenoid 12V 100 jam nonstop.' }
    ],
    loginHistory: [
      { id: 'log_c1', ip: '103.14.22.85', device: 'Linux Ubuntu - Firefox', date: '2026-07-22 08:20 WIB' }
    ]
  },
  {
    id: 'user_student_shara',
    name: 'Shara Anjelia',
    email: 'sharaanjelia236@gmail.com',
    role: 'student',
    title: 'Full-stack Developer & Mahasiswa Magang',
    studentId: '1301220236',
    institution: 'Telkom University',
    major: 'Informatika',
    semester: 'Semester 6',
    phone: '+62 822-1234-5678',
    address: 'Jl. Sukabirus No. 12, Dayeuhkolot, Bandung',
    specialty: 'Full-stack Web Development, Serverless Telemetry & Real-time Analytics',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    status: 'active',
    joinedDate: '2025-09-01',
    skillsList: ['React', 'TypeScript', 'Node.js', 'Database', 'UI/UX', 'Frontend', 'Backend'],
    languages: ['TypeScript', 'JavaScript', 'Python', 'HTML/CSS'],
    frameworks: ['React.js', 'Vite', 'Node.js', 'TailwindCSS'],
    interestFields: ['Full-stack Agriculture Portal', 'Database Telemetry', 'Web Analytics'],
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    activeProjects: ['Portal Riset Smart Grow', 'HYCOSMARTS Container Farm'],
    internshipStatus: 'Mahasiswa Magang Aktif',
    github: 'https://github.com/sharaanjelia',
    linkedin: 'https://linkedin.com/in/sharaanjelia',
    portfolio: 'https://sharaanjelia.dev',
    bio: 'Mengembangkan sistem backend serverless, database real-time telemetry, dan portal analitik web untuk tim riset.',
    activityHistory: [
      { id: 'act_sh1', action: 'Update Portal Frontend', date: '2026-07-23 08:30', details: 'Mengembangkan modul telemetry dan dashboard portal riset.' }
    ],
    loginHistory: [
      { id: 'log_sh1', ip: '103.14.22.99', device: 'Chrome Browser', date: '2026-07-23 08:00 WIB' }
    ]
  },
  {
    id: 'user_student_1',
    name: 'Shella Nadya Putri',
    email: 'shellanadyaputri@student.telkomuniversity.ac.id',
    role: 'student',
    title: 'Mahasiswa Magang IoT & Sensor Specialist',
    studentId: '1301220015',
    institution: 'Telkom University',
    major: 'Rekayasa Perangkat Lunak',
    semester: 'Semester 5',
    phone: '+62 857-1122-3344',
    address: 'Jl. Sukabirus No. 45, Terusan Buah Batu, Bandung',
    specialty: 'Sensor Telemetry, NPK Probes & Wireless Node Calibration',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    status: 'active',
    joinedDate: '2025-09-01',
    skillsList: ['RS485 Modbus', 'pH Calibration', 'ESP32 Wireless', 'Python Data Analysis'],
    languages: ['C++', 'Python', 'JavaScript'],
    frameworks: ['ESP-IDF', 'PlatformIO', 'Grafana'],
    interestFields: ['Precision Hydroponics', 'Sensor Drift Reduction'],
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    activeProjects: ['HYCOSMARTS Container Farm'],
    internshipStatus: 'Mahasiswa Magang Aktif',
    github: 'https://github.com/shellanadya',
    linkedin: 'https://linkedin.com/in/shellanadya',
    portfolio: 'https://shellanadya.github.io',
    bio: 'Mahasiswa Magang Riset berdedikasi tinggi yang memfokuskan kalibrasi data akuisisi sensor tanah dan nutrisi cair hidroponik.',
    activityHistory: [
      { id: 'act_s1', action: 'Submit Tugas', date: '2026-07-22 09:10', details: 'Mengunggah laporan kalibrasi sensor EC dan pH Bay #2.' }
    ],
    loginHistory: [
      { id: 'log_s1', ip: '103.14.22.90', device: 'Windows 11 - Chrome', date: '2026-07-22 08:10 WIB' }
    ]
  },
  {
    id: 'user_student_sirvani',
    name: 'Sirvani Cinta Dewi',
    email: 'sirvanicintadewi@student.telkomuniversity.ac.id',
    role: 'student',
    title: 'Mahasiswa Magang IoT Specialist',
    studentId: '1301220028',
    institution: 'Telkom University',
    major: 'S1 Teknik Komputer',
    semester: 'Semester 5',
    phone: '+62 858-2233-4455',
    address: 'Terusan Buah Batu No. 102, Bandung',
    specialty: 'Arsitektur Sensor Suhu, pH, Kelembapan & Real-time Telemetry',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    status: 'active',
    joinedDate: '2025-09-01',
    skillsList: ['IoT Architecture', 'Microcontroller Programming', 'Real-time Telemetry', 'Sensor Fusion'],
    languages: ['C++', 'Python', 'JavaScript'],
    frameworks: ['ESP-IDF', 'FreeRTOS', 'Grafana'],
    interestFields: ['Smart Agriculture Telemetry', 'Sensor Fusion'],
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    activeProjects: ['Smart Grow Laboratory Hydroponic System'],
    internshipStatus: 'Mahasiswa Magang Aktif',
    github: 'https://github.com/sirvanicinta',
    linkedin: 'https://linkedin.com/in/sirvanicinta',
    portfolio: 'https://sirvanicinta.dev',
    bio: 'Pengembangan arsitektur sensor suhu, pH, dan kelembapan secara terintegrasi dengan jaringan akuisisi data real-time.',
    activityHistory: [
      { id: 'act_sir1', action: 'Integrasi Sensor Telemetry', date: '2026-07-22 10:00', details: 'Melakukan kalibrasi bus sensor pH dan temperatur akuisisi data real-time.' }
    ],
    loginHistory: [
      { id: 'log_sir1', ip: '103.14.22.95', device: 'MacBook Air - Safari', date: '2026-07-22 08:25 WIB' }
    ]
  },
  {
    id: 'user_student_2',
    name: 'Budi Santoso',
    email: 'budi.santoso@student.telkomuniversity.ac.id',
    role: 'student',
    title: 'Mahasiswa Magang Computer Vision & AI',
    studentId: '1301210088',
    institution: 'Telkom University',
    major: 'Informatika',
    semester: 'Semester 6',
    phone: '+62 812-9988-7766',
    address: 'Griya Bandung Asri 3, Bojongsoang',
    specialty: 'YOLOv8 Plant Disease Segmentation & Jetson Optimization',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    status: 'active',
    joinedDate: '2025-09-01',
    skillsList: ['PyTorch', 'YOLOv8', 'OpenCV', 'TensorRT', 'Python'],
    languages: ['Python', 'C++'],
    frameworks: ['PyTorch', 'TensorRT', 'CUDA'],
    interestFields: ['AI for Agriculture', 'Leaf Disease Diagnostics'],
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    activeProjects: ['LumiNet Smart Crop Vision AI'],
    internshipStatus: 'Mahasiswa Magang Aktif',
    github: 'https://github.com/budisantoso-ai',
    linkedin: 'https://linkedin.com/in/budisantoso-ai',
    bio: 'Mengembangkan model pendeteksi penyakit daun tanaman pakcoy dan kangkung berbasis Computer Vision yang diimplementasikan pada Nvidia Jetson Orin Nano.',
    activityHistory: [
      { id: 'act_b1', action: 'Pengajuan Review', date: '2026-07-22 09:30', details: 'Mengirimkan model YOLOv8 TensorRT untuk di-review Asisten.' }
    ],
    loginHistory: [
      { id: 'log_b1', ip: '103.14.22.92', device: 'Ubuntu 22.04 - Firefox', date: '2026-07-22 08:42 WIB' }
    ]
  },
  {
    id: 'user_student_3',
    name: 'Rizky Febrian',
    email: 'rizky.febrian@student.telkomuniversity.ac.id',
    role: 'student',
    title: 'Mahasiswa Magang Otomasi Fertigasi',
    studentId: '1301210105',
    institution: 'Telkom University',
    major: 'Teknik Komputer',
    semester: 'Semester 6',
    phone: '+62 819-3344-5566',
    address: 'Jl. Umban Sari No. 10, Bandung',
    specialty: 'Solenoid Actuators, Valve Timers & Peristaltic Dosing',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    status: 'active',
    joinedDate: '2025-09-15',
    skillsList: ['Relay Control', 'C++ ESP32', 'Hydraulic Piping', 'MQTT'],
    languages: ['C++', 'Python'],
    frameworks: ['FreeRTOS', 'Arduino IDE'],
    interestFields: ['Drip Irrigation Automation', 'Solar Powered Fertigation'],
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    activeProjects: ['Automated NFT Hydroponics Controller Hub'],
    internshipStatus: 'Mahasiswa Magang Aktif',
    github: 'https://github.com/rizkyfebrian',
    bio: 'Bertanggung jawab atas pengujian katup solenoid irigasi tetes dan sistem kendali pompa nutrisi AB Mix.',
    activityHistory: [
      { id: 'act_r1', action: 'Izin Sakit', date: '2026-07-22 07:45', details: 'Mengajukan surat permohonan izin sakit.' }
    ],
    loginHistory: [
      { id: 'log_r1', ip: '103.14.22.95', device: 'Android Chrome', date: '2026-07-22 07:45 WIB' }
    ]
  },
  {
    id: 'user_nasywa',
    name: 'Nasywa Zauja Noor',
    email: 'nasywazaujanoor@student.telkomuniversity.ac.id',
    role: 'student',
    title: 'Mahasiswa Magang IoT Specialist',
    studentId: '1301220101',
    institution: 'Telkom University',
    major: 'Teknik Elektro / Rekayasa Perangkat Lunak',
    semester: 'Semester 6',
    phone: '+62 858-1234-5678',
    address: 'Jl. Sukabirus, Dayeuhkolot, Bandung',
    specialty: 'Kalibrasi Sensor Nirkabel Telemetry & Komunikasi Data Mikro',
    avatar: '/images/team/nasywa-zauja-noor.jpg',
    status: 'active',
    joinedDate: '2025-09-01',
    skillsList: ['IoT Sensors', 'Wireless Protocols', 'Telemetry Monitoring', 'Data Analytics'],
    languages: ['C++', 'Python', 'JavaScript'],
    frameworks: ['ESP32', 'LoRaWAN', 'PlatformIO'],
    interestFields: ['Smart Agriculture Telemetry', 'Wireless Sensor Mesh'],
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    activeProjects: ['HYCOSMARTS Container Farm', 'FLOCIFY Biofloc AI'],
    internshipStatus: 'Mahasiswa Magang Aktif',
    github: 'https://github.com/nasywazauja',
    linkedin: 'https://linkedin.com/in/nasywazauja',
    bio: 'Menangani kalibrasi sensor nirkabel telemetry, komunikasi data mikro, serta optimalisasi komunikasi antar modul IoT.'
  },
  {
    id: 'user_divia',
    name: 'Divia Nuralika Namira',
    email: 'divianuralikanamira@student.telkomuniversity.ac.id',
    role: 'student',
    title: 'Mahasiswa Magang IoT Specialist',
    studentId: '1301220102',
    institution: 'Telkom University',
    major: 'Teknik Elektro / Rekayasa Perangkat Lunak',
    semester: 'Semester 6',
    phone: '+62 858-8765-4321',
    address: 'Jl. Sukabirus, Dayeuhkolot, Bandung',
    specialty: 'Kalibrasi Sensor Nirkabel Telemetry & Komunikasi Data Mikro',
    avatar: '/images/team/divia-nuralika-namira.jpg',
    status: 'active',
    joinedDate: '2025-09-01',
    skillsList: ['IoT Sensors', 'Wireless Protocols', 'Telemetry Monitoring', 'Data Analytics'],
    languages: ['C++', 'Python', 'JavaScript'],
    frameworks: ['ESP32', 'LoRaWAN', 'PlatformIO'],
    interestFields: ['Smart Agriculture Telemetry', 'Wireless Sensor Mesh'],
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    activeProjects: ['SIMONA Aquaponics', 'LUMINET PJU'],
    internshipStatus: 'Mahasiswa Magang Aktif',
    github: 'https://github.com/divianuralika',
    linkedin: 'https://linkedin.com/in/divianuralika',
    bio: 'Menangani kalibrasi sensor nirkabel telemetry, komunikasi data mikro, serta optimalisasi komunikasi antar modul IoT.'
  },
  {
    id: 'user_admin',
    name: 'Administrator Portal Lab',
    email: 'admin@smartgrowlab.id',
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
  }
];

export const initialTasks: Task[] = [
  {
    id: 'task_1',
    taskNumber: 'TGS-2026-001',
    title: 'Kalibrasi Sensor NPK & EC Hydroponic Bay #2',
    description: 'Lakukan kalibrasi multi-point pada probe sensor tanah/nutrisi NPK RS485 Modbus dan elektroda konduktivitas EC menggunakan larutan standar referensi (1413 µS/cm). Catat nilai offset drift ke dalam tabel kalibrasi.',
    assignedStudentId: 'user_student_1',
    assignedStudentName: 'Shella Nadya Putri',
    projectName: 'HYCOSMARTS Container Farm',
    assignedBy: 'Azliny Azreen',
    deadline: '2026-07-25',
    priority: 'high',
    status: 'in_progress',
    progressPercent: 65,
    reviewerName: 'Azliny Azreen',
    reviewDate: '2026-07-22',
    attachments: ['https://example.com/docs/panduan_kalibrasi_sensor_v2.pdf'],
    githubUrl: 'https://github.com/smartgrowlab/sensor-calibration-rs485',
    notes: 'Pastikan sensor dibersihkan dengan air aquades sebelum dicelupkan ke larutan standar.',
    revisions: [
      {
        id: 'rev_1_1',
        revisionDate: '2026-07-21 14:00',
        version: 'v1.0',
        studentName: 'Shella Nadya Putri',
        description: 'Tabel offset EC pertama sudah dikirimkan namun belum mencakup variabel suhu larutan.',
        assistantNotes: 'Mohon tambahkan kolom koreksi temperatur (ATC 25°C) agar pembacaan konsisten.',
        status: 'fixed',
        fixedDate: '2026-07-22 09:00',
        attachmentUrl: 'https://example.com/docs/kalibrasi_rev1.pdf',
        comments: 'Telah diperbaiki dengan rumus kompensasi suhu NTC 10K.',
        history: 'Versi v1.0 diajukan 21 Juli -> Diminta Revisi oleh Asisten -> Diperbaiki 22 Juli (v1.1)'
      }
    ],
    submissionNotes: 'Menunggu pembacaan pengujian 24 jam terakhir untuk rilis nilai akhir.',
    createdAt: '2026-07-20'
  },
  {
    id: 'task_2',
    taskNumber: 'TGS-2026-002',
    title: 'Deploy Model YOLOv8 Deteksi Penyakit Daun ke Jetson Orin Nano',
    description: 'Optimasikan bobot model segmentasi bercak daun pakcoy dan kangkung PyTorch ke format TensorRT engine (.engine) serta ukur latensi inferensi pada Nvidia Jetson Orin Nano.',
    assignedStudentId: 'user_student_2',
    assignedStudentName: 'Budi Santoso',
    projectName: 'LumiNet Smart Crop Vision AI',
    assignedBy: 'Azliny Azreen',
    deadline: '2026-07-26',
    priority: 'urgent',
    status: 'review',
    progressPercent: 90,
    reviewerName: 'Azliny Azreen',
    reviewDate: '2026-07-22',
    attachments: ['https://example.com/docs/yolov8_benchmark_jetson.pdf'],
    githubUrl: 'https://github.com/smartgrowlab/yolov8-edge-jetson',
    notes: 'Uji latensi inferensi dengan frame rate kamera minimal 30 FPS.',
    revisions: [
      {
        id: 'rev_2_1',
        revisionDate: '2026-07-19 16:30',
        version: 'v1.0',
        studentName: 'Budi Santoso',
        description: 'Format FP32 masih menyebabkan penggunaan memori VRAM cukup tinggi (3.8 GB).',
        assistantNotes: 'Konversikan ke quantisasi FP16 atau INT8 untuk menghemat konsumsi memori Jetson.',
        status: 'approved',
        fixedDate: '2026-07-21 11:00',
        attachmentUrl: 'https://example.com/docs/yolo_fp16_report.pdf',
        comments: 'FP16 kuantisasi berhasil menurunkan VRAM ke 1.9 GB tanpa penurunan mAP.',
        history: 'v1.0 FP32 -> v1.1 FP16 Quantized Approved'
      }
    ],
    submissionNotes: 'TensorRT engine FP16 berhasil di-deploy! Hasil FPS mencapai 38.4 FPS dengan mAP 94.2%.',
    submissionLinks: {
      github: 'https://github.com/smartgrowlab/yolov8-edge-jetson',
      docs: 'https://docs.google.com/document/d/yolo_benchmarks_smartgrow'
    },
    createdAt: '2026-07-18'
  },
  {
    id: 'task_3',
    taskNumber: 'TGS-2026-003',
    title: 'Pengujian Relay Solenoid Valve Irigasi Tetes via ESP32 MQTT',
    description: 'Verifikasi waktu respons aktuator katup solenoid 12V 2-way melalui broker MQTT pada topik /smartgrow/hydro2/drip/cmd lengkap dengan failsafe timeout otomatis.',
    assignedStudentId: 'user_student_3',
    assignedStudentName: 'Rizky Febrian',
    projectName: 'Automated NFT Hydroponics Controller Hub',
    assignedBy: 'M. Chiko Dwi Kasa',
    deadline: '2026-07-27',
    priority: 'medium',
    status: 'not_started',
    progressPercent: 0,
    reviewerName: 'M. Chiko Dwi Kasa',
    notes: 'Gunakan multimeter dan osciloskop untuk memastikan tidak ada spike tegangan balik saat relay mati.',
    createdAt: '2026-07-21'
  },
  {
    id: 'task_4',
    taskNumber: 'TGS-2026-004',
    title: 'Refactoring WebSocket Gateway Telemetry Real-time',
    description: 'Implementasikan logika automatic reconnect dan validasi autentikasi token JWT untuk aliran data telemetry dari gateway node hidroponik.',
    assignedStudentId: 'user_student_1',
    assignedStudentName: 'Shella Nadya Putri',
    projectName: 'Cyber-Physical Telemetry Gateway',
    assignedBy: 'Azliny Azreen',
    deadline: '2026-07-24',
    priority: 'high',
    status: 'revision',
    progressPercent: 45,
    reviewerName: 'Azliny Azreen',
    reviewDate: '2026-07-21',
    feedback: 'Implementasi WebSocket sangat cepat, tetapi mohon tambahkan algoritma exponential backoff agar buffer server tidak overflow saat koneksi Wi-Fi lab terputus seketika.',
    notes: 'Pastikan pesan heartbeat disetor setiap 5 detik sekali.',
    revisions: [
      {
        id: 'rev_4_1',
        revisionDate: '2026-07-21 16:00',
        version: 'v1.0',
        studentName: 'Shella Nadya Putri',
        description: 'Implementasi reconnect instan tanpa jeda penundaan.',
        assistantNotes: 'Minta Revisi: Harap gunakan exponential backoff (retry delay 1s, 2s, 4s, 8s max 30s).',
        status: 'in_progress',
        comments: 'Sedang dikoding ulang oleh mahasiswa.',
        history: 'v1.0 dikirim -> Asisten Minta Revisi (Exponential Backoff Needed)'
      }
    ],
    createdAt: '2026-07-15'
  },
  {
    id: 'task_5',
    taskNumber: 'TGS-2026-005',
    title: 'Penyusunan Laporan Mingguan Konsumsi Nutrisi AB Mix',
    description: 'Agregasi data log pH dan TDS selama 7 hari terakhir ke dalam grafik matriks konsumsi nutrisi mingguan untuk peninjauan Direktur.',
    assignedStudentId: 'user_student_1',
    assignedStudentName: 'Shella Nadya Putri',
    projectName: 'Automated NFT Hydroponics Controller Hub',
    assignedBy: 'Azliny Azreen',
    deadline: '2026-07-21',
    priority: 'medium',
    status: 'completed',
    progressPercent: 100,
    reviewerName: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    reviewDate: '2026-07-21',
    notes: 'Laporan disetujui tanpa catatan.',
    submissionNotes: 'Data konduktivitas EC, pH, dan suhu larutan telah dirangkum lengkap dalam format laporan PDF & Excel.',
    createdAt: '2026-07-14'
  }
];

export const initialAttendance: AttendanceRecord[] = [
  // Hari Ini (2026-07-22)
  {
    id: 'att_101',
    studentId: 'user_student_1',
    studentName: 'Shella Nadya Putri',
    date: '2026-07-22',
    checkInTime: '08:05 WIB',
    checkOutTime: '17:30 WIB',
    duration: '9 Jam 25 Menit',
    status: 'present',
    notes: 'Melakukan kalibrasi probe sensor pH & EC pada Hidroponik Bay #2.',
    location: 'Gedung FIT Lt. 3 Lab Smart Grow',
    ipAddress: '103.14.22.82',
    device: 'Chrome 126 / macOS Sonoma',
    checkInPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    checkOutPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'att_102',
    studentId: 'user_student_2',
    studentName: 'Budi Santoso',
    date: '2026-07-22',
    checkInTime: '08:42 WIB',
    checkOutTime: '17:15 WIB',
    duration: '8 Jam 33 Menit',
    status: 'late',
    notes: 'Terlambat karena kendala kemacetan di Terusan Buah Batu.',
    location: 'Gedung FIT Lt. 3 Lab Smart Grow',
    ipAddress: '103.14.22.92',
    device: 'Firefox 125 / Ubuntu Linux',
    checkInPhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'att_103',
    studentId: 'user_student_3',
    studentName: 'Rizky Febrian',
    date: '2026-07-22',
    status: 'sick',
    notes: 'Izin Sakit Demam - Surat keterangan dokter terlampir.',
    location: 'Luar Kampus (Rumah)',
    ipAddress: '103.14.22.95',
    device: 'Android Mobile App'
  },
  {
    id: 'att_104',
    studentId: 'user_assistant',
    studentName: 'Azliny Azreen',
    date: '2026-07-22',
    checkInTime: '07:55 WIB',
    checkOutTime: '18:00 WIB',
    duration: '10 Jam 05 Menit',
    status: 'present',
    notes: 'Mendampingi mahasiwa magang dan melakukan review tugas model AI.',
    location: 'Gedung FIT Lt. 3 Lab Smart Grow',
    ipAddress: '103.14.22.81',
    device: 'Chrome / Windows 11'
  },

  //Kemarin (2026-07-21)
  {
    id: 'att_201',
    studentId: 'user_student_1',
    studentName: 'Shella Nadya Putri',
    date: '2026-07-21',
    checkInTime: '08:00 WIB',
    checkOutTime: '17:00 WIB',
    duration: '9 Jam 00 Menit',
    status: 'present',
    notes: 'Pemeriksaan rutin level larutan nutrisi AB Mix.',
    location: 'Gedung FIT Lt. 3 Lab Smart Grow',
    ipAddress: '103.14.22.82',
    device: 'Chrome / macOS'
  },
  {
    id: 'att_202',
    studentId: 'user_student_2',
    studentName: 'Budi Santoso',
    date: '2026-07-21',
    checkInTime: '08:10 WIB',
    checkOutTime: '17:05 WIB',
    duration: '8 Jam 55 Menit',
    status: 'present',
    notes: 'Pelatihan model YOLOv8 pada dataset daun kangkung.',
    location: 'Gedung FIT Lt. 3 Lab Smart Grow',
    ipAddress: '103.14.22.92',
    device: 'Firefox / Ubuntu'
  },
  {
    id: 'att_203',
    studentId: 'user_student_3',
    studentName: 'Rizky Febrian',
    date: '2026-07-21',
    checkInTime: '08:15 WIB',
    checkOutTime: '17:10 WIB',
    duration: '8 Jam 55 Menit',
    status: 'present',
    notes: 'Pemasangan katup solenoid 12V.',
    location: 'Gedung FIT Lt. 3 Lab Smart Grow',
    ipAddress: '103.14.22.95',
    device: 'Chrome / Windows 11'
  },

  // 2026-07-20
  {
    id: 'att_301',
    studentId: 'user_student_1',
    studentName: 'Shella Nadya Putri',
    date: '2026-07-20',
    checkInTime: '08:02 WIB',
    checkOutTime: '17:15 WIB',
    duration: '9 Jam 13 Menit',
    status: 'present',
    notes: 'Perancangan papan sirkuit kustom ESP32 Modbus.'
  },
  {
    id: 'att_302',
    studentId: 'user_student_2',
    studentName: 'Budi Santoso',
    date: '2026-07-20',
    checkInTime: '08:28 WIB',
    checkOutTime: '17:00 WIB',
    duration: '8 Jam 32 Menit',
    status: 'present',
    notes: 'Pengambilan sampel citra pakcoy segar.'
  }
];

export const initialLmsProjects: LmsProject[] = [
  {
    id: 'proj_hyco',
    projectNumber: 'PRJ-IOT-2026-01',
    title: 'HYCOSMARTS - Smart Container-Based Intelligent Farming System',
    category: 'Container-based Smart Agriculture',
    description: 'HYCOSMARTS adalah sistem pertanian cerdas berbasis kontainer yang dirancang untuk mengelola pertanian hidroponik indoor secara otomatis, efisien, dan berkelanjutan dengan sensor pH, TDS, DO, EC, dan ultrasonik serta integrasi AI & 3T.',
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    assignedStudentIds: ['user_student_1', 'user_student_2'],
    assignedStudentNames: ['Shella Nadya Putri', 'Budi Santoso'],
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
    assignedStudentIds: ['user_student_2', 'user_student_3'],
    assignedStudentNames: ['Budi Santoso', 'M. Chiko Dwi Kasa'],
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
    assignedStudentIds: ['user_student_2', 'user_student_1'],
    assignedStudentNames: ['Budi Santoso', 'Siti Nurhaliza'],
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
    assignedStudentIds: ['user_student_1', 'user_student_2', 'user_student_3'],
    assignedStudentNames: ['Shella Nadya Putri', 'Budi Santoso', 'M. Chiko Dwi Kasa'],
    status: 'in_progress',
    progressPercent: 88,
    deadline: '2026-11-20',
    repoUrl: 'https://github.com/smartgrowlab/flocify-biofloc-ai',
    photoUrl: '/images/flocify/flocify-biofloc-tank-iso.png',
    documents: [
      { name: 'Desain_Arsitektur_3D_Biofloc_Tank_FLOCIFY.pdf', url: '#', date: '2026-07-23', size: '6.4 MB' },
      { name: 'Model_Deep_Learning_Prediksi_Amonia.pdf', url: '#', date: '2026-07-24', size: '4.8 MB' }
    ]
  },
  {
    id: 'proj_hydro',
    projectNumber: 'PRJ-EMB-2026-03',
    title: 'Automated NFT Hydroponics Controller Hub',
    category: 'IoT & Embedded Systems',
    description: 'Sistem dosis nutrisi otonom menggunakan pompa peristaltik, kontrol closed-loop PID untuk keseimbangan EC/pH, dan monitoring mikrogrid surya.',
    advisor: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    assignedStudentIds: ['user_student_1', 'user_student_3'],
    assignedStudentNames: ['Shella Nadya Putri', 'Rizky Febrian'],
    status: 'in_progress',
    progressPercent: 88,
    deadline: '2026-08-15',
    repoUrl: 'https://github.com/smartgrowlab/nft-hydroponics-hub',
    photoUrl: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    documents: [
      { name: 'Skematik_PCB_Dosing_Pump_12V.pdf', url: '#', date: '2026-06-25', size: '1.9 MB' }
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
  }
];

export const initialApprovalRequests: ApprovalRequest[] = [
  {
    id: 'app_req_1',
    studentId: 'user_student_2',
    studentName: 'Budi Santoso',
    title: 'Persetujuan Hasil Inferensi Model YOLOv8 TensorRT FP16',
    type: 'task_review',
    description: 'Model AI telah berhasil mencapai 38.4 FPS di Jetson Orin Nano. Memohon persetujuan pengujian lapangan.',
    status: 'pending',
    date: '2026-07-22'
  },
  {
    id: 'app_req_2',
    studentId: 'user_student_3',
    studentName: 'Rizky Febrian',
    title: 'Pengajuan Permohonan Izin Sakit Tanggal 22 Juli 2026',
    type: 'leave',
    description: 'Demam tinggi dan pemeriksaan ke klinik kampus Telkom University.',
    status: 'approved',
    date: '2026-07-22',
    reviewedBy: 'Azliny Azreen'
  },
  {
    id: 'app_req_3',
    studentId: 'user_student_1',
    studentName: 'Shella Nadya Putri',
    title: 'Persetujuan Milestone 2: Pengujian Dosing Closed-Loop 48 Jam',
    type: 'project_completion',
    description: 'Sistem dosis nutrisi otomatis teruji stabil tanpa kebocoran atau offset nilai pH.',
    status: 'pending',
    date: '2026-07-21'
  }
];

export const initialNotifications: LmsNotification[] = [
  {
    id: 'notif_1',
    recipientRole: 'director',
    title: 'Tugas Dikirimkan untuk Peninjauan',
    message: 'Budi Santoso mengirimkan Tugas #TGS-2026-002 "Deploy Model YOLOv8 Deteksi Penyakit Daun".',
    date: '2026-07-22 09:30 WIB',
    read: false,
    type: 'task'
  },
  {
    id: 'notif_2',
    recipientRole: 'assistant',
    title: 'Presensi Masuk Tepat Waktu',
    message: 'Shella Nadya Putri melakukan check-in pukul 08:05 WIB (Tepat Waktu).',
    date: '2026-07-22 08:05 WIB',
    read: true,
    type: 'attendance'
  },
  {
    id: 'notif_3',
    recipientRole: 'student',
    title: 'Catatan Revisi dari Asisten',
    message: 'Asisten Azliny Azreen memberikan saran perbaikan exponential backoff pada WebSocket.',
    date: '2026-07-21 16:20 WIB',
    read: false,
    type: 'task'
  }
];

export const initialApplicants: ApplicantRecord[] = [
  {
    id: 'applicant_1',
    fullName: 'Andi Pratama',
    email: 'andi.pratama@student.telkomuniversity.ac.id',
    roleInterest: 'Spesialis Hardware & IoT',
    motivation: 'Tertarik mengembangkan jaringan sensor LoRaWAN untuk pemantauan pertanian presisi.',
    github: 'https://github.com/andipratama',
    instagram: '@andipratama_iot',
    status: 'pending',
    submittedAt: '2026-07-22 10:15 WIB'
  }
];

export const initialSystemLogs: SystemLog[] = [
  {
    id: 'log_1',
    timestamp: '2026-07-22 08:05:00',
    user: 'Shella Nadya Putri',
    action: 'PRESENSI_CHECKIN',
    details: 'Melakukan Presensi Masuk (Hadir Tepat Waktu)'
  },
  {
    id: 'log_2',
    timestamp: '2026-07-22 08:42:00',
    user: 'Budi Santoso',
    action: 'PRESENSI_CHECKIN',
    details: 'Melakukan Presensi Masuk (Terlambat)'
  },
  {
    id: 'log_3',
    timestamp: '2026-07-21 16:00:00',
    user: 'Azliny Azreen',
    action: 'MINTA_REVISI_TUGAS',
    details: 'Mengirimkan permintaan revisi tugas TGS-2026-004 ke Shella Nadya Putri'
  }
];
