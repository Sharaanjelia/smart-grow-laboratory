import { NewsItem, ProjectItem, TeamMember } from './types';

export const newsData: NewsItem[] = [
  {
    id: 'open-recruitment-magang-2026',
    title: 'Pembukaan Lowongan Magang Riset IoT & Smart Agriculture (Open Recruitment Batch 2026)',
    tagline: 'Pendaftaran Mahasiswa Magang Riset Smart Grow Laboratory Telkom University',
    category: 'Lowongan Magang',
    date: '25 Juli 2026',
    image: '/images/news/recruitment-2026.png',
    excerpt: 'Smart Grow Laboratory resmi membuka pendaftaran magang riset untuk mahasiswa Telkom University dan publik untuk divisi Full-stack Web, Hardware & System, IoT Specialist, dan Agronomi.',
    content: `Smart Grow Laboratory Telkom University secara resmi membuka Pendaftaran Anggota Magang Riset (Open Recruitment Batch 2026).

Program magang ini dirancang untuk memberikan pengalaman praktis dalam riset sistem pertanian cerdas terintegrasi, termasuk pengembangan perangkat keras sensor IoT, transmisi data nirkabel, kontroler mikro, serta portal analitik berbasis web real-time.

### Divisi Magang yang Dibuka:
* **Full-stack Web Developer:** Pengembangan dashboard telemetry, WebSocket real-time, dan manajemen data riset.
* **Hardware & Systems Engineer:** Desain PCB, integrasi kelistrikan LED grow light, dan mekanik hidroponik.
* **IoT & Telemetry Specialist:** Kalibrasi sensor pH, EC, TDS, DO, dan protokol LoRaWAN / MQTT.
* **Firmware Developer:** Pengodean mikrokontroler ESP32, FreeRTOS, dan optimasi komunikasi data mikro.
* **Agronomist Specialist:** Formulasi hara nutrisi tanaman hidroponik & akuaponik serta uji kualitas panen.

### Alur Seleksi 5 Tahap:
1. **Tahap 1:** Seleksi Berkas & Administrasi Pendaftaran.
2. **Tahap 2:** Tes Teknis & Evaluasi Portofolio.
3. **Tahap 3:** Wawancara Pembimbing & Asisten Lab.
4. **Tahap 4:** Verifikasi Akhir & Penetapan Divisi.
5. **Tahap 5:** Pengumuman Kelulusan, Penerbitan ID Magang Resmi & Aktivasi Akun LMS.

Calon pendaftar dapat langsung mengajukan berkas melalui tombol **JOIN US** pada portal utama Smart Grow Laboratory.`,
    readTime: '3 min',
    comments: [
      {
        id: 'c_rec1',
        name: 'Budi Santoso',
        email: 'budi@student.telkomuniversity.ac.id',
        content: 'Persyaratan magangnya sangat jelas! Saya sudah mendaftar untuk divisi IoT Specialist.',
        timestamp: '2026-07-25 10:15'
      }
    ]
  },
  {
    id: 'panen-perdana-hycosmarts-container',
    title: 'Panen Perdana Sayuran Hidroponik Pakcoy & Kangkung di HYCOSMARTS Container Farm',
    tagline: 'Keberhasilan Dosing Nutrisi Otomatis & Pemantauan Sensorik Real-Time',
    category: 'Kegiatan Panen & Riset',
    date: '22 Juli 2026',
    image: '/images/simona/simona-crops-close.jpg',
    excerpt: 'Tim riset Smart Grow Laboratory berhasil merayakan panen perdana sayuran pakcoy dan kangkung hidroponik berkualitas tinggi dari kontainer pintar HYCOSMARTS.',
    content: `Tim riset Smart Grow Laboratory di bawah bimbingan Prof. Dr. Indrarini Dyah Irawati, S.T., M.T. bersama para mahasiswa magang merayakan keberhasilan panen perdana sayuran Pakcoy dan Kangkung di fasilitas HYCOSMARTS Container Farm.

Panen ini merupakan bentuk pembuktian atas keandalan sistem dosis nutrisi otomatis (automated fertigation dosing) dan pemantauan kualitas air terdistribusi menggunakan sensor pH, TDS, Dissolved Oxygen (DO), serta kontrol suhu mikro-klimat indoor.

### Catatan Hasil Panen:
* **Bobot Rata-rata Tanaman:** Meningkat 28% dibandingkan metode hidroponik manual konvensional.
* **Efisiensi Penggunaan Air:** Hemat hingga 40% berkat sirkulasi tertutup dan kontrol sensorik presisi.
* **Kualitas Nutrisi:** Kadar pupuk A/B mix terjaga konstan pada kisaran EC 1200–1400 µS/cm.`,
    readTime: '4 min',
    comments: [
      {
        id: 'c_panen1',
        name: 'Dr. Ahmad Rizal',
        email: 'rizal@telkomuniversity.ac.id',
        content: 'Selamat atas panen perdananya! Hasil pakcoy terlihat sangat segar dan sehat.',
        timestamp: '2026-07-22 15:30'
      }
    ]
  },
  {
    id: 'workshop-kalibrasi-sensor-iot',
    title: 'Workshop & Live Demo Kalibrasi Sensor Telemetry Nirkabel ESP32 & LoRaWAN',
    tagline: 'Pelatihan Instrumentasi Sensor pH, TDS, EC & Telemetry Mesh',
    category: 'Workshop & Pelatihan',
    date: '18 Juli 2026',
    image: '/images/news/workshop-calibration.png',
    excerpt: 'Asisten laboratorium menyelenggarakan workshop teknis kalibrasi sensor bagi anggota magang baru untuk memastikan akurasi data akuisisi hidroponik.',
    content: `Asisten laboratorium Smart Grow Laboratory menyelenggarakan Workshop & Live Demo Kalibrasi Sensor Telemetry Nirkabel di Laboratorium Riset Telkom University.

Workshop ini bertujuan memberikan pemahaman praktis kepada seluruh tim riset mengenai prosedur kalibrasi multi-point probe sensor EC/pH, penghitungan offset drift, serta pengiriman paket telemetry berbasis protokol ESP32 LoRaWAN dan MQTT.

### Materi Workshop:
* Penggunaan larutan penyangga (buffer solution pH 4.01, 6.86, 9.18) untuk kalibrasi instrumen.
* Penanganan noise sinyal analog dan penggunaan filter digital kalman pada mikrokontroler.
* Pembuatan dashboard pemantauan telemetry real-time berbasis WebSockets.`,
    readTime: '5 min',
    comments: [
      {
        id: 'c_ws1',
        name: 'Shella Nadya Putri',
        email: 'shellanadyaputri@student.telkomuniversity.ac.id',
        content: 'Materi kalibrasi sensornya sangat bermanfaat untuk penyusunan laporan riset harian.',
        timestamp: '2026-07-18 16:45'
      }
    ]
  },
  {
    id: 'kunjungan-kemitraan-industri-luminet',
    title: 'Kunjungan Studi Banding & Kolaborasi Riset Smart City PJU IoT LUMINET',
    tagline: 'Diskusi Pengujian Penerangan Jalan Umum Pintar Berbasis Mesh Network',
    category: 'Kemitraan Industri',
    date: '15 Juli 2026',
    image: '/images/news/industry-luminet.png',
    excerpt: 'Smart Grow Laboratory menerima kunjungan mitra industri untuk membahas pengujian dan implementasi infrastruktur PJU pintar LUMINET berbasis XBee Mesh.',
    content: `Smart Grow Laboratory menerima kunjungan resmi delegasi kemitraan industri dan pengelola fasilitas infrastruktur untuk meninjau hasil pengembangan modul penerangan jalan umum pintar (LUMINET).

Dalam pertemuan ini, tim laboratorium mendemonstrasikan sistem pengontrolan multi-node PJU jarak jauh, deteksi kerusakan lampu otomatis melalui penganalisis arus/tegangan, serta pemetaan posisi fisik node penerangan via antarmuka peta GIS dashboard.`,
    readTime: '4 min',
    comments: [
      {
        id: 'c_lum1',
        name: 'Deni Kurniawan',
        email: 'deni@bandung.go.id',
        content: 'Teknologi XBee Mesh LUMINET sangat menjanjikan untuk efisiensi energi kota pintar.',
        timestamp: '2026-07-15 14:10'
      }
    ]
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: 'hycosmarts',
    title: 'HYCOSMARTS',
    tagline: 'Smart Container-Based Intelligent Farming System',
    category: 'Container-based Smart Agriculture',
    description: 'HYCOSMARTS is a smart container-based intelligent farming system designed to manage indoor hydroponic farming automatically, efficiently, and sustainably.',
    fullDescription: 'HYCOSMARTS is a smart container-based intelligent farming system designed to manage indoor hydroponic farming automatically, efficiently, and sustainably. The system is equipped with various important sensors such as pH, TDS, DO, EC, and ultrasonic sensors to monitor water quality, nutrient availability, and growing conditions in real time. With artificial intelligence support and integration with web-based dashboards and mobile apps, HYCOSMARTS can precisely regulate plant needs and provide early notifications of potential crop failures. In addition to being energy-efficient and self-sufficient, the system is also suitable for implementation in 3T areas (remote, frontier, and outer regions) as an innovative solution to enhance agricultural productivity and food self-sufficiency through technology.',
    image: '/images/hycosmarts/hycosmarts-3.png',
    gallery: [
      '/images/hycosmarts/hycosmarts-3.png',
      '/images/hycosmarts/hycosmarts-2.png',
      '/images/hycosmarts/hycosmarts-5.png',
      '/images/hycosmarts/hycosmarts-4.png',
      '/images/hycosmarts/hycosmarts-1.png'
    ],
    date: '2026-07-24',
    sensors: [
      {
        name: 'Acidity (pH)',
        value: 6.2,
        unit: 'pH',
        minSafe: 5.5,
        maxSafe: 6.5,
        description: 'Monitors solution acidity. Optimal pH ensures proper absorption of essential macro and micronutrients.'
      },
      {
        name: 'Nutrients (TDS)',
        value: 1150,
        unit: 'ppm',
        minSafe: 800,
        maxSafe: 1400,
        description: 'Total Dissolved Solids measures active nutrient density in the hydroponic liquid reservoir.'
      },
      {
        name: 'Dissolved Oxygen (DO)',
        value: 7.8,
        unit: 'mg/L',
        minSafe: 6.0,
        maxSafe: 9.0,
        description: 'Tracks oxygen dissolved in water to prevent root stagnation and accelerate crop development.'
      },
      {
        name: 'Electrical Conductivity (EC)',
        value: 1.8,
        unit: 'mS/cm',
        minSafe: 1.2,
        maxSafe: 2.2,
        description: 'Electrical Conductivity evaluates mineral salt concentration and ionic strength.'
      },
      {
        name: 'Ultrasonic Water Level',
        value: 88,
        unit: '%',
        minSafe: 30,
        maxSafe: 100,
        description: 'Non-contact ultrasonic telemetry measuring water reservoir volume to prevent pump dry-run.'
      },
      {
        name: 'Ambient Temperature',
        value: 23.5,
        unit: '°C',
        minSafe: 18.0,
        maxSafe: 28.0,
        description: 'Container microclimate temperature control for optimal leaf respiration and growth.'
      }
    ]
  },
  {
    id: 'simona',
    title: 'SIMONA',
    tagline: 'Aquaponics Monitoring System',
    category: 'Aquaponics',
    description: 'SIMONA (Aquaponics Monitoring System) is an integrated smart system designed to support sustainable farming by combining aquaculture and hydroponics in a mutually beneficial ecosystem.',
    fullDescription: 'SIMONA (Aquaponics Monitoring System) is an integrated smart system designed to support sustainable farming by combining aquaculture and hydroponics in a mutually beneficial ecosystem. It utilizes a range of sensors to monitor key environmental parameters such as water level, pH, temperature, and Total Dissolved Solids (TDS), ensuring optimal conditions for both fish and plant growth. Powered by microcontrollers like Arduino or Raspberry Pi, SIMONA automates essential functions and displays real-time data through a user-friendly interface. With IoT connectivity and remote access via a responsive web platform, users can monitor and control the system anytime, anywhere. SIMONA enhances productivity, reduces manual workload, enables early problem detection, and promotes efficient, technology-driven aquaponic farming.',
    image: '/images/simona/simona-logo.png',
    gallery: [
      '/images/simona/simona-logo.png',
      '/images/simona/simona-hardware-blynk.png',
      '/images/simona/simona-control-box-farm.jpg',
      '/images/simona/simona-outdoor-farm.jpg',
      '/images/simona/simona-crops-close.jpg'
    ],
    date: '2026-07-24',
    sensors: [
      {
        name: 'Water Level (Ultrasonic)',
        value: 85,
        unit: '%',
        minSafe: 30,
        maxSafe: 100,
        description: 'Ultrasonic sensor tracking water volume in fish tanks and hydroponic channels.'
      },
      {
        name: 'Acidity (pH)',
        value: 7.2,
        unit: 'pH',
        minSafe: 6.5,
        maxSafe: 7.8,
        description: 'Monitors pH level for safe co-habitation of aquatic life and organic plants.'
      },
      {
        name: 'Water Temperature',
        value: 27.25,
        unit: '°C',
        minSafe: 22.0,
        maxSafe: 30.0,
        description: 'Measures water temperature to maintain stable fish metabolic rates.'
      },
      {
        name: 'Nutrients (TDS)',
        value: 154,
        unit: 'ppm',
        minSafe: 100,
        maxSafe: 500,
        description: 'Total Dissolved Solids measuring bio-filtered fish waste nutrient density.'
      }
    ]
  },
  {
    id: 'luminet',
    title: 'LUMINET',
    tagline: 'Smart Street Lighting Management System',
    category: 'Smart City PJU',
    description: 'LUMINET (Smart Street Lighting Management System) is an Internet of Things (IoT)-based smart system for automatically and efficiently managing public street lighting (PJU).',
    fullDescription: 'LUMINET (Smart Street Lighting Management System) is an Internet of Things (IoT)-based smart system for automatically and efficiently managing public street lighting (PJU). The system uses XBee communication for centralized monitoring and control via a web dashboard and mobile app. LUMINET supports multi-point control with automation logic based on time, light intensity (LDR), and Correlated Color Temperature (CCT). The system also monitors electrical conditions (power, voltage, current) in real-time and is equipped with GPS for PJU location identification. Anomaly notifications are automatically sent to expedite issue resolution. With its modular design, LUMINET is suitable for implementation by local governments, industrial zones, and smart city managers to enhance energy efficiency, reduce operational costs, and accelerate on-site repair responses.',
    image: '/images/luminet/luminet-logo.jpg',
    gallery: [
      '/images/luminet/luminet-logo.jpg',
      '/images/luminet/luminet-pju-map-dashboard.png',
      '/images/luminet/luminet-hardware-box-lcd.jpg',
      '/images/luminet/luminet-interluc-street-light.jpg'
    ],
    date: '2026-07-24',
    sensors: [
      {
        name: 'Voltage Telemetry (AC)',
        value: 220,
        unit: 'V',
        minSafe: 200,
        maxSafe: 240,
        description: 'Real-time grid voltage monitoring across PJU distribution nodes.'
      },
      {
        name: 'Current Sensor (RMS)',
        value: 0.45,
        unit: 'A',
        minSafe: 0.1,
        maxSafe: 1.5,
        description: 'Measures luminaire current to detect burnt LEDs or line breaks.'
      },
      {
        name: 'Luminance (LDR)',
        value: 420,
        unit: 'lux',
        minSafe: 50,
        maxSafe: 1200,
        description: 'Ambient light sensor for automatic dusk-to-dawn dimming activation.'
      },
      {
        name: 'Dimming Level (PWM)',
        value: 39,
        unit: '%',
        minSafe: 10,
        maxSafe: 100,
        description: 'Adaptive brightness control optimizing energy efficiency by up to 45%.'
      }
    ]
  },
  {
    id: 'flocify',
    title: 'FLOCIFY',
    tagline: 'IoT & Deep Learning Biofloc Solution',
    category: 'Biofloc AI Aquaculture',
    description: 'Flocify is an innovative Internet of Things (IoT) and Deep Learning-based solution designed to optimize fish farming in biofloc systems.',
    fullDescription: 'Flocify is an innovative Internet of Things (IoT) and Deep Learning-based solution designed to optimize fish farming in biofloc systems. The platform integrates smart sensing technologies, real-time monitoring, artificial intelligence-driven analytics, and automated control mechanisms to maintain sustainable aquaculture environments. Through continuous monitoring of critical water quality parameters, including temperature, pH, dissolved oxygen (DO), ammonia concentration, and other relevant environmental indicators, Flocify enables the acquisition of real-time data to support adaptive aquaculture management. The integration of Deep Learning algorithms facilitates pattern recognition, anomaly detection, and predictive analysis of environmental conditions, thereby enabling early identification of potential risks and supporting evidence-based decision-making. Furthermore, the system can provide automated recommendations and control mechanisms to maintain optimal culture conditions, improve production performance, and enhance the sustainability of biofloc-based fish farming operations. The adoption of Flocify is expected to reduce fish mortality rates, improve feed utilization efficiency, lower operational burdens for farmers, and minimize investment risks. Furthermore, the solution can enhance the competitiveness of small and medium-scale aquaculture producers by promoting smarter, more productive, and sustainable farming practices.',
    image: '/images/flocify/flocify-biofloc-tank-iso.png',
    gallery: [
      '/images/flocify/flocify-biofloc-tank-iso.png',
      '/images/flocify/flocify-topview-tank.png',
      '/images/flocify/flocify-perspective-tank.png'
    ],
    date: '2026-07-24',
    sensors: [
      {
        name: 'Dissolved Oxygen (DO)',
        value: 6.8,
        unit: 'mg/L',
        minSafe: 5.0,
        maxSafe: 9.0,
        description: 'Dissolved oxygen monitoring essential for bacterial biofloc respiration and fish metabolic health.'
      },
      {
        name: 'Ammonia Concentration (NH3/NH4+)',
        value: 0.08,
        unit: 'mg/L',
        minSafe: 0.0,
        maxSafe: 0.20,
        description: 'Deep Learning predictive anomaly tracking to prevent toxic ammonia spikes in biofloc tanks.'
      },
      {
        name: 'Water Temperature',
        value: 28.5,
        unit: '°C',
        minSafe: 26.0,
        maxSafe: 31.0,
        description: 'Optimal temperature maintenance for biofloc microbial activity and fish digestive performance.'
      },
      {
        name: 'Acidity (pH)',
        value: 7.4,
        unit: 'pH',
        minSafe: 7.0,
        maxSafe: 7.8,
        description: 'Monitors nitrifying bacterial environment for stable biofloc C:N ratio transformation.'
      }
    ]
  }
];

export const teamData: TeamMember[] = [
  {
    id: 'mentor-indrarini',
    name: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    role: 'Mentor',
    image: 'mentor-indrarini',
    email: 'indrarini@telkomuniversity.ac.id',
    profileUrl: 'https://pilrek.telkomuniversity.ac.id/indrarini-dyah-irawati/',
    bio: 'Pakar riset sistem telekomunikasi cerdas dan pengolahan sinyal digital. Membimbing Smart Grow Laboratory untuk terus berinovasi dalam memadukan keahlian teknik elektro dengan pemecahan solusi pangan siber.',
    skills: ['IoT Architecture', 'Digital Signal Processing', 'Machine Learning', 'Research Strategy']
  },
  {
    id: 'member-azliny',
    name: 'Azliny Azreen',
    role: 'Asisten Utama Laboratorium',
    image: 'member-azliny',
    email: 'azlinyazreen@student.telkomuniversity.ac.id',
    bio: 'Asisten Utama Prof. Dr. Indrarini Dyah Irawati dalam mengoordinasikan tim riset, tata kelola proyek laboratorium Smart Grow, serta pengawasan operasional IoT.',
    skills: ['Lab Management', 'Research Coordination', 'Embedded Systems', 'IoT Architecture', 'Smart Agriculture']
  },
  {
    id: 'member-shara',
    name: 'Shara Anjelia',
    role: 'Full-stack Developer',
    image: 'member-shara',
    email: 'sharaanjelia@student.telkomuniversity.ac.id',
    bio: 'Mengembangkan sistem backend serverless, database real-time telemetry, dan portal analitik web untuk tim riset.',
    skills: ['React / Vite', 'Node.js', 'Database', 'UI/UX', 'Frontend', 'Backend']
  },
  {
    id: 'member-chiko',
    name: 'M. Chiko Dwi Kasa',
    role: 'Hardware & Systems Engineer',
    image: 'member-chiko',
    email: 'mchikodwikasa@student.telkomuniversity.ac.id',
    bio: 'Mengembangkan infrastruktur fisik laboratorium, integrasi kelistrikan instrumen pencahayaan LED, serta kalibrasi mekanik hydroponics.',
    skills: ['System Design', 'Power Electronics', 'Hydroponic Hardware', 'Embedded Control']
  },
  {
    id: 'member-shela',
    name: 'Shella Nadya Putri',
    role: 'IoT Specialist',
    image: 'member-shela',
    email: 'shellanadyaputri@student.telkomuniversity.ac.id',
    bio: 'Menangani kalibrasi sensor nirkabel telemetry, komunikasi data mikro, serta optimalisasi komunikasi antar modul IoT.',
    skills: ['IoT Sensors', 'Wireless Protocols', 'Telemetry Monitoring', 'Data Analytics']
  },
  {
    id: 'member-sirvani',
    name: 'Sirvani Cinta Dewi',
    role: 'IoT Specialist',
    image: 'member-sirvani',
    email: 'sirvanicintadewi@student.telkomuniversity.ac.id',
    bio: 'Pengembangan arsitektur sensor suhu, pH, dan kelembapan secara terintegrasi dengan jaringan akuisisi data real-time.',
    skills: ['IoT Architecture', 'Microcontroller Programming', 'Real-time Telemetry', 'Sensor Fusion']
  },
  {
    id: 'member-tiara',
    name: 'Tiara Nuriawati',
    role: 'IoT Specialist',
    image: 'member-tiara',
    email: 'tiaranuriawati@student.telkomuniversity.ac.id',
    bio: 'Pengembangan arsitektur sensor suhu, pH, dan kelembapan secara terintegrasi dengan jaringan akuisisi data real-time.',
    skills: ['IoT Architecture', 'Microcontroller Programming', 'Real-time Telemetry', 'Sensor Fusion']
  },
  {
    id: 'member-nasywa',
    name: 'Nasywa Zauja Noor',
    role: 'IoT Specialist',
    image: 'member-nasywa',
    email: 'nasywazaujanoor@student.telkomuniversity.ac.id',
    bio: 'Menangani kalibrasi sensor nirkabel telemetry, komunikasi data mikro, serta optimalisasi komunikasi antar modul IoT.',
    skills: ['IoT Sensors', 'Wireless Protocols', 'Telemetry Monitoring', 'Data Analytics']
  },
  {
    id: 'member-divia',
    name: 'Divia Nuralika Namira',
    role: 'IoT Specialist',
    image: 'member-divia',
    email: 'divianuralikanamira@student.telkomuniversity.ac.id',
    bio: 'Menangani kalibrasi sensor nirkabel telemetry, komunikasi data mikro, serta optimalisasi komunikasi antar modul IoT.',
    skills: ['IoT Sensors', 'Wireless Protocols', 'Telemetry Monitoring', 'Data Analytics']
  },
  {
    id: 'member-farid',
    name: 'M. Farid Hasri',
    role: 'IoT Specialist',
    image: 'member-farid',
    email: 'mfaridhasri@student.telkomuniversity.ac.id',
    bio: 'Menangani kalibrasi sensor nirkabel telemetry, komunikasi data mikro, serta optimalisasi komunikasi antar modul IoT.',
    skills: ['IoT Sensors', 'Wireless Protocols', 'Telemetry Monitoring', 'Data Analytics']
  },
  {
    id: 'member-arimbi',
    name: 'Arimbi Dwi',
    role: 'Alumni - Lead Hardware Engineer',
    image: 'member-arimbi',
    email: 'arimbi@student.telkomuniversity.ac.id',
    bio: 'Mengembangkan integrasi arsitektur fisik laboratorium, sistem kelistrikan LED grow light, dan kalibrasi instrumen riset magang sebelumnya.',
    skills: ['Hardware Design', 'Embedded Systems', 'Power Electronics', 'PCB Layout']
  },
  {
    id: 'member-alfachri',
    name: 'Muhammad Alfachri Akbar',
    role: 'Alumni - AI Engineer',
    image: 'member-alfachri',
    email: 'alfachriakbar@student.telkomuniversity.ac.id',
    bio: 'Alumni & Asisten Peneliti di Smart Grow Laboratory Telkom University. Berfokus pada integrasi Computer Vision, Deep Learning, dan pemrosesan data otomatisasi pertanian cerdas di Research Center.',
    skills: ['Alumni', 'AI & Machine Learning', 'Computer Vision', 'Deep Learning', 'PyTorch / TensorFlow', 'Smart Agriculture']
  },
  {
    id: 'member-daffa',
    name: 'Daffa Zyaa Ulhaq',
    role: 'Alumni - Firmware Developer',
    image: 'member-daffa',
    email: 'daffa@student.telkomuniversity.ac.id',
    bio: 'Mengembangkan sistem firmware dan protokol transmisi data nirkabel mikrokontroler sensor telemetry riset magang sebelumnya.',
    skills: ['C/C++', 'ESP32', 'Firmware', 'FreeRTOS', 'IoT Telemetry']
  },
  {
    id: 'member-hannani',
    name: 'Hannani Syadzwana',
    role: 'Alumni - Full-stack Developer',
    image: 'member-hannani',
    email: 'hannani@student.telkomuniversity.ac.id',
    bio: 'Mengembangkan antarmuka portal analitik dan visualisasi telemetry laboratorium riset magang sebelumnya.',
    skills: ['Vue.js', 'Node.js', 'WebSockets', 'Frontend', 'Database']
  },
  {
    id: 'member-elyasa',
    name: 'Elyasa Reva',
    role: 'Alumni - UI/UX Designer',
    image: 'member-elyasa',
    email: 'elyasa@student.telkomuniversity.ac.id',
    bio: 'Merancang antarmuka visual (UI/UX) dan pengalaman pengguna untuk platform riset Smart Grow Laboratory.',
    skills: ['Figma', 'UI/UX Design', 'User Research', 'Prototyping', 'Design Systems']
  },
  {
    id: 'member-humam',
    name: 'Humam Ibadillah',
    role: 'Alumni - Agronomist',
    image: 'member-humam',
    email: 'humam@student.telkomuniversity.ac.id',
    bio: 'Menganalisis kebutuhan hara nutrisi tanaman hidroponik dan kalibrasi parameter larutan riset magang sebelumnya.',
    skills: ['Agronomy', 'Nutrient Dosage', 'Hydroponic Crops', 'Plant Science']
  }
];
