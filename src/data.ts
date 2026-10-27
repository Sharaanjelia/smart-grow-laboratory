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
  },

];

export const projectsData: ProjectItem[] = [
  {
    id: 'hycosmarts',
    title: 'HYCOSMARTS',
    tagline: 'Smart Container-Based Intelligent Farming System',
    category: 'Container-based Smart Agriculture',
    description: 'HYCOSMARTS is a smart container-based intelligent farming system designed to manage indoor hydroponic farming automatically, efficiently, and sustainably.',
    fullDescription: 'HYCOSMARTS is a smart container-based intelligent farming system designed to manage indoor hydroponic farming automatically, efficiently, and sustainably. The system is equipped with various important sensors such as pH, TDS, DO, EC, and ultrasonic sensors to monitor water quality, nutrient availability, and growing conditions in real time. With artificial intelligence support and integration with web-based dashboards and mobile apps, HYCOSMARTS can precisely regulate plant needs and provide early notifications of potential crop failures. In addition to being energy-efficient and self-sufficient, the system is also suitable for implementation in 3T areas (remote, frontier, and outer regions) as an innovative solution to enhance agricultural productivity and food self-sufficiency through technology.',
    image: '/images/hycosmarts/hycosmarts-logo.png',
    gallery: [
      '/images/hycosmarts/hycosmarts-logo.png',
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
    image: '/images/flocify/flocify-logo.png',
    gallery: [
      '/images/flocify/flocify-logo.png',
      '/images/flocify/flocify-biofloc-tank-iso.png',
      '/images/flocify/flocify-topview-tank.png',
      '/images/flocify/flocify-perspective-tank.png'
    ],
    date: '2026-07-24',
    liveUrl: 'https://ppmtelkom.vercel.app/',
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
  },
  {
    id: 'smart-tbn',
    title: 'Smart TBN',
    tagline: 'Tempat Sampah Pintar dengan Notifikasi Real-Time Berbasis IoT',
    category: 'Smart Waste Management',
    description: 'Smart Trash Bin Notification (Smart TBN) adalah sistem tempat sampah pintar berbasis IoT yang memantau ketinggian, kapasitas, dan bobot timbunan sampah secara real-time disertai kamera visual dan notifikasi otomatis ke petugas di Desa Wisata Kampung Raja Prailiu, Sumba NTT.',
    fullDescription: 'Smart Trash Bin Notification (Smart TBN) hadir di Kampung Raja Prailiu, Waingapu, Sumba, Nusa Tenggara Timur. Pada 27 Juli 2026, tim peneliti Telkom University bersama PT Tigaresi Bangun Nusaperdana melaksanakan sosialisasi dan implementasi Smart TBN bersama masyarakat Kampung Raja Prailiu. Smart TBN merupakan tempat sampah pintar berbasis Internet of Things (IoT) yang memantau kondisi tempat sampah secara real-time melalui ketinggian dan kapasitas timbunan sampah, serta informasi visual dari kamera. Sistem juga dapat memberikan notifikasi ketika kondisi sampah mencapai ambang yang telah ditentukan.\n\nKampung Raja Prailiu dipilih karena merupakan desa wisata berbasis budaya dengan rumah adat, tradisi tenun ikat, dan berbagai kerajinan masyarakat yang menjadi daya tarik bagi wisatawan. Dalam kawasan seperti ini, kebersihan lingkungan tidak hanya berkaitan dengan pengelolaan sampah, tetapi juga berpengaruh langsung terhadap kenyamanan pengunjung, kualitas lingkungan, citra destinasi, pelestarian lingkungan, serta keberlanjutan aktivitas wisata dan ekonomi masyarakat setempat.\n\nRangkaian kegiatan meliputi sosialisasi, demonstrasi Smart TBN, penjelasan sistem pemantauan, hingga serah terima unit Smart TBN. Kegiatan ini juga memperlihatkan kekayaan Kampung Raja Prailiu melalui rumah adat, tenun ikat dengan alat tenun gedogan, kerajinan masyarakat, serta bentang alam khas Sumba.\n\nTim Peneliti Telkom University:\n1. Prof. Dr. Indrarini Dyah Irawati, S.T., M.T. - Ketua Tim Peneliti\n2. Vivi Monika, S.T., M.T.\n3. Prof. Dr. Augustine Asih Rumanti, S.T., M.T.\n4. Mohammad As’ad Rosyadi, S.Pd., M.T.\n\nMitra Industri:\nPT Tigaresi Bangun Nusaperdana\n\nKolaborasi antara perguruan tinggi, mitra industri, dan masyarakat menjadi langkah penting dalam menghadirkan inovasi teknologi yang relevan dengan kebutuhan kawasan serta mendukung pengelolaan lingkungan dan pengembangan desa wisata yang berkelanjutan.',
    image: '/images/smart-tbn/smart-tbn-logo.png',
    gallery: [
      '/images/smart-tbn/smart-tbn-logo.png',
      '/images/smart-tbn/smart-tbn-poster.png'
    ],
    date: '2026-09-10',
    liveUrl: 'https://smarttrash.devtbn.tech/',
    sensors: [
      {
        name: 'Tingkat Ketinggian Sampah',
        value: 45,
        unit: '%',
        minSafe: 0,
        maxSafe: 80,
        description: 'Sensor ultrasonik presisi mendeteksi kapasitas volume timbunan sampah secara real-time.'
      },
      {
        name: 'Berat Timbunan Sampah',
        value: 14.2,
        unit: 'kg',
        minSafe: 0,
        maxSafe: 35.0,
        description: 'Sensor Load Cell HX711 mengukur massa timbunan sampah untuk efisiensi jadwal pengangkutan.'
      },
      {
        name: 'Jarak Bebas Tutup',
        value: 48,
        unit: 'cm',
        minSafe: 15,
        maxSafe: 90,
        description: 'Jarak sensor ke permukaan sampah tertinggi untuk mencegah tumpukan meluap.'
      },
      {
        name: 'Baterai & Solar Telemetry',
        value: 12.6,
        unit: 'V',
        minSafe: 11.2,
        maxSafe: 14.4,
        description: 'Tegangan sistem catu daya mandiri panel surya untuk operasional continuous outdoor.'
      }
    ]
  },
  {
    id: 'proj_1788926059725',
    title: 'Hydrothermal Cogenerator Incinerator',
    tagline: 'Sistem Reaktor Pengolahan Sampah Subkritis Tanpa Asap & Penghasil Energi Bersih',
    category: 'IoT & Hardware',
    description: 'HTCI merupakan sistem pengelolaan dan pengolahan sampah terpadu yang memanfaatkan proses hydrothermal cogeneration untuk mengolah sampah organik dan inert menjadi bio-oil, biochar, dan gas yang berpotensi sebagai sumber energi.',
    fullDescription: 'HTCI merupakan sistem pengelolaan dan pengolahan sampah terpadu yang memanfaatkan proses hydrothermal cogeneration untuk mengolah sampah organik dan inert menjadi produk bernilai guna, seperti bio-oil, biochar, dan gas yang berpotensi sebagai sumber energi. Sistem dilengkapi dengan sensor berbasis IoT, Programmable Logic Controller (PLC), serta algoritma kendali berbasis Artificial Intelligence (AI) untuk melakukan pemantauan dan pengendalian parameter proses secara otomatis, termasuk suhu, tekanan, konsumsi energi, dan emisi.\n\nPelaksanaan proyek mencakup pemetaan dan analisis kebutuhan, perancangan dan pembangunan sistem, instalasi dan pengujian teknologi, pelatihan serta pendampingan operator desa, monitoring dan evaluasi, serta pengembangan pemanfaatan produk hasil pengolahan sampah. Melalui pendekatan teknologi dan pemberdayaan masyarakat tersebut, proyek HTCI diharapkan dapat membangun model pengelolaan sampah desa yang berkelanjutan, mendukung ekonomi sirkular, meningkatkan kapasitas masyarakat, serta menjadi model yang dapat direplikasi di wilayah lainnya.',
    image: '/images/htci/htci-logo.png',
    gallery: [
      '/images/htci/htci-logo.png',
      '/images/htci/htci-poster.jpg'
    ],
    date: '2026-09-09',
    liveUrl: 'https://htci.netlify.app/',
    sensors: [
      {
        name: 'Suhu Reaktor Subkritis',
        value: 212.5,
        unit: '°C',
        minSafe: 180,
        maxSafe: 250,
        description: 'Temperatur air panas subkritis pemecah polimer selulosa dan biomassa.'
      },
      {
        name: 'Tekanan Reaktor',
        value: 2.45,
        unit: 'MPa',
        minSafe: 2.0,
        maxSafe: 3.0,
        description: 'Tekanan uap tertutup tinggi untuk menjaga fase air subkritis tanpa penguapan liar.'
      },
      {
        name: 'Reduksi Volume',
        value: 86.4,
        unit: '%',
        minSafe: 80,
        maxSafe: 95,
        description: 'Persentase penyusutan timbunan sampah setelah perlakuan reaktor termal.'
      }
    ]
  },
  {
    id: 'smart-water',
    title: 'Smart Water',
    tagline: 'Transformasi Digital Perumda Air Minum Melalui Smart Self Meter Reading Berbasis AI',
    category: 'AI & Smart Utility',
    description: 'Smart Water adalah platform Self Meter Reading berbasis AI-OCR yang memungkinkan pelanggan melakukan pencatatan meter air secara mandiri melalui smartphone disertai validasi foto, timestamp, dan koordinat GPS.',
    fullDescription: 'Transformasi Digital Perumda Air Minum Melalui Smart Self Meter Reading Berbasis AI\n\nMasalah yang Dihadapi PDAM Saat Ini:\n✅ Petugas harus datang ke rumah pelanggan.\n✅ Biaya operasional pembacaan meter tinggi.\n✅ Human error dalam pencatatan angka meter.\n✅ Data terlambat masuk ke sistem.\n✅ Komplain pelanggan terkait tagihan.\n✅ Sulit menjangkau pelanggan di daerah terpencil.\n\nSmart Water adalah platform Self Meter Reading berbasis AI-OCR yang memungkinkan pelanggan melakukan pencatatan meter air secara mandiri melalui smartphone. Solusi ini membantu Perumda Air Minum mengurangi biaya operasional pembacaan meter, meningkatkan akurasi data konsumsi, mempercepat proses penagihan, serta meningkatkan kualitas layanan pelanggan.\n\nManfaat Utama:\n1. Pengurangan biaya operasional petugas meter hingga puluhan persen.\n2. Pengurangan human error pencatatan meter.\n3. Percepatan proses billing dan penagihan pelanggan.\n\nSolusi Smart Water:\n1. Self Meter Reading Berbasis AI-OCR: Pelanggan cukup memfoto meter air. AI akan membaca angka meter secara otomatis.\n2. Tagihan Otomatis Real-Time: Setelah angka terbaca, pemakaian dihitung otomatis, tagihan langsung muncul, dan data tersimpan dalam database cloud.\n3. Validasi Bukti Foto: Setiap pembacaan disertai foto meter, timestamp, dan lokasi GPS untuk akuntabilitas tinggi serta mencegah manipulasi.\n4. Dashboard Monitoring: Manajemen PDAM dapat melihat jumlah pelanggan yang sudah lapor, konsumsi air bulanan, tren penggunaan, dan wilayah dengan anomali pemakaian.\n\nTim Pengembang Smart Grow Lab:\n1. Prof. Dr. Indrarini Dyah Irawati S.T., M.T.\n2. Shara Anjelia\n3. Sirvani Cinta Dewi Mudasir',
    image: '/images/smart-water/smart-water-logo.jpg',
    gallery: [
      '/images/smart-water/smart-water-logo.jpg',
      '/images/smart-water/smart-water-app.jpg'
    ],
    date: '2026-09-10',
    liveUrl: 'https://drive.google.com/file/d/1NNfvmh80qbw0Gg1aB26Eod8DEh-26mh7/view?usp=sharing',
    sensors: [
      {
        name: 'Akurasi Pengenalan OCR',
        value: 98.6,
        unit: '%',
        minSafe: 90.0,
        maxSafe: 100.0,
        description: 'Tingkat akurasi pembacaan angka mekanik meter air oleh model AI Computer Vision.'
      },
      {
        name: 'Rata-rata Waktu Verifikasi',
        value: 1.4,
        unit: 'detik',
        minSafe: 0.5,
        maxSafe: 3.0,
        description: 'Kecepatan ekstraksi angka meter air, inferensi lokal, dan kalkulasi tagihan real-time.'
      },
      {
        name: 'Efisiensi Biaya Operasional',
        value: 68.5,
        unit: '%',
        minSafe: 40.0,
        maxSafe: 85.0,
        description: 'Estimasi reduksi pengeluaran pembacaan lapangan rutin PDAM setelah adopsi mandiri.'
      },
      {
        name: 'Tingkat Pelaporan Mandiri',
        value: 84.2,
        unit: '%',
        minSafe: 60.0,
        maxSafe: 100.0,
        description: 'Persentase pelanggan aktif yang melaporkan angka meter tepat waktu sebelum tanggal cut-off.'
      }
    ]
  },
  {
    id: 'mops',
    title: 'MOPS Kota Bandung',
    tagline: 'Sistem Monitoring & Operasional Persampahan Kota Bandung Berbasis IoT & Smart City',
    category: 'Smart Waste & IoT Smart City',
    description: 'MOPS adalah platform Smart City berbasis IoT dan Web untuk memantau kondisi volume sampah di berbagai TPS Kota Bandung secara real-time, mencegah terjadinya luberan sampah, dan mengefisiensikan rute armada truk sampah.',
    fullDescription: 'MOPS (Sistem Monitoring & Operasional Persampahan Kota Bandung) merupakan platform inovatif Smart City berbasis Internet of Things (IoT) dan Web yang dirancang secara komprehensif untuk memantau kondisi volume sampah di Tempat Pembuangan Sementara (TPS) se-Kota Bandung secara real-time. Melalui integrasi sensor jarak Time-of-Flight (ToF TOF400F) dan ultrasonik industri, kamera IP outdoor cerdas TP-Link VIGI C340, serta control box edge computing, MOPS secara presisi mendeteksi ketinggian dan volume timbunan sampah, mencegah luberan sampah ke badan jalan, mengantisipasi timbulan bau tidak sedap, serta mengoptimalkan rute logistik armada truk sampah Dinas Lingkungan Hidup (DLH).\n\nPlatform ini terbagi ke dalam 2 ekosistem utama:\n1. Portal Publik Warga Bandung: Menyajikan statistik kebersihan kota, peta monitoring interaktif status TPS (Normal, Hampir Penuh, Penuh/Kritis), feed visual CCTV FPS tinggi, artikel edukasi pemilahan sampah 3R, serta formulir aduan luberan sampah dan pengajuan TPS Pintar tingkat RT/RW.\n2. Dashboard Operasional Internal Role-Based: Mendukung 3 tingkat hierarki operasional — Super Admin (manajemen perangkat sensor IoT & tata kelola pengguna), Supervisor (analisis utilisasi armada truk & rekap performa TPS per kecamatan), dan Operator Lapangan (pemantauan status kritis darurat & konfirmasi dispatching truk penjemput).\n\nDibangun menggunakan arsitektur modern React 19, TypeScript, Tailwind CSS, Recharts, Motion, dan konektivitas telemetri sensorik, MOPS menjadi wujud nyata transformasi Bandung Smart City menuju tata kelola lingkungan yang bersih, terukur, dan berkelanjutan.',
    image: '/images/mops/mops-logo.png',
    gallery: [
      '/images/mops/mops-logo.png',
      '/images/mops/mops-hardware-installation.png',
      '/images/mops/mops-logo-badge.jpg'
    ],
    date: '2026-09-14',
    liveUrl: 'https://mops-5f51b.web.app/',
    sensors: [
      {
        name: 'Sensor Node ToF Jarak Sampah (TOF400F)',
        value: 124,
        unit: 'cm',
        minSafe: 40,
        maxSafe: 300,
        description: 'Sensor ToF mengukur jarak permukaan tumpukan sampah ke bibir penampungan untuk estimasi volume kapasitas TPS.'
      },
      {
        name: 'Tingkat Kapasitas TPS Terisi',
        value: 74,
        unit: '%',
        minSafe: 0,
        maxSafe: 85,
        description: 'Persentase tingkat kepenuhan TPS yang memicu status Normal, Hampir Penuh, hingga Penuh (Kritis).'
      },
      {
        name: 'Live CCTV Feed (TP-Link VIGI C340)',
        value: 30,
        unit: 'FPS',
        minSafe: 24,
        maxSafe: 30,
        description: 'Visual monitoring outdoor real-time untuk memantau aktivitas petugas, antrean warga, dan armada truk pengangkut.'
      },
      {
        name: 'Estimasi Beban Sampah Terkumpul',
        value: 3.8,
        unit: 'Ton',
        minSafe: 0.5,
        maxSafe: 5.0,
        description: 'Kalkulasi massa sampah di bak TPS untuk optimasi dispatching dan kapasitas bak truk sampah DLH.'
      }
    ]
  },
  {
    id: 'sapa-jamiyyah',
    title: "SAPA Jam'iyyah SMPI Al Azhar 36 Bandung",
    tagline: "Media Komunikasi Resmi Orang Tua & Sekolah — Aspirasi, Donasi, Catatan, Berita & Angket Transparan",
    category: "Smart Community & EdTech",
    description: "Platform digital resmi Jam'iyyah SMPI Al Azhar 36 Bandung untuk memfasilitasi komunikasi dua arah antara orang tua murid dan pihak sekolah melalui kanal aspirasi terstruktur, penggalangan donasi & infaq transparan, dokumentasi catatan rapat, warta berita sekolah, serta angket partisipatif.",
    fullDescription: "SAPA Jam'iyyah SMPI Al Azhar 36 Bandung (sapajamiyyah.com) merupakan platform web interaktif yang dikembangkan sebagai media komunikasi resmi dan jembatan kolaborasi antara Pengurus Jam'iyyah (komite orang tua murid), pihak manajemen sekolah SMPI Al Azhar 36 Bandung, serta seluruh wali murid.\n\nPlatform ini dirancang dengan prinsip keterbukaan, akuntabilitas, dan partisipasi aktif guna mendukung ekosistem pendidikan berkarakter Islam dan bertaraf unggul. Melalui SAPA Jam'iyyah, setiap pemangku kepentingan dapat mengakses informasi dan layanan kunci tanpa sekat birokrasi yang kaku.\n\nEkosistem Utama SAPA Jam'iyyah:\n1. Aspirasi Terpadu: Kanal penyampaian aspirasi, kritik konstruktif, dan usulan program sekolah dengan nomor tiket pelacakan progres tindak lanjut dari pengurus Jam'iyyah dan pimpinan sekolah.\n2. Donasi & Infaq Berkelanjutan: Sistem penggalangan dana sosial dan infaq kegiatan kesiswaan dengan pelaporan perolehan dana secara real-time, transparan, serta dapat diaudit bersama.\n3. Catatan Rapat & Kebijakan: Arsip resmi notulensi musyawarah, program kerja tahunan, serta transparansi laporan pertanggungjawaban Jam'iyyah 2024–2026.\n4. Warta Berita & Agenda: Informasi terkini seputar prestasi santri/siswa, event akbar sekolah, seminar parenting, dan agenda akademik terpadu.\n5. Angket & Polling Kebijakan: Sarana survei cepat digital untuk menjaring suara dan preferensi orang tua terhadap kebijakan sekolah dan inisiatif Jam'iyyah.\n\nDidukung tata kelola peran multi-level (Admin Jam'iyyah, Pengurus Bidang, Manajemen Sekolah, dan Wali Murid) dengan integrasi keamanan modern untuk mewujudkan sinergi harmonis antara sekolah dan keluarga.",
    image: '/images/sapa-jamiyyah/sapa-jamiyyah-logo.png',
    gallery: [
      '/images/sapa-jamiyyah/sapa-jamiyyah-logo.png',
      '/images/sapa-jamiyyah/sapa-jamiyyah-hero.png',
      '/images/sapa-jamiyyah/sapa-jamiyyah-poster.png'
    ],
    date: '2026-09-14',
    liveUrl: 'https://www.sapajamiyyah.com/',
    sensors: [
      {
        name: 'Tingkat Resolusi Aspirasi Orang Tua',
        value: 94.8,
        unit: '%',
        minSafe: 80,
        maxSafe: 100,
        description: 'Persentase aspirasi dan masukan orang tua yang berhasil ditindaklanjuti dan diselesaikan oleh pengurus.'
      },
      {
        name: 'Transparansi Penyaluran Donasi',
        value: 100,
        unit: '%',
        minSafe: 95,
        maxSafe: 100,
        description: 'Tingkat akuntabilitas dan pencatatan audit digital penyaluran dana infaq serta donasi program unggulan.'
      },
      {
        name: 'Partisipasi Angket & Polling Wali',
        value: 88.5,
        unit: '%',
        minSafe: 70,
        maxSafe: 100,
        description: 'Persentase keterlibatan aktif orang tua murid dalam pengisian angket kebijakan dan evaluasi berkala.'
      },
      {
        name: 'Waktu Rata-rata Respon Komunikasi',
        value: 1.8,
        unit: 'Jam',
        minSafe: 0.5,
        maxSafe: 6.0,
        description: 'Kecepatan rata-rata respon tanggapan pengurus terhadap aduan atau pertanyaan yang diajukan wali murid.'
      }
    ]
  },
  {
    id: 'das-cikapundung',
    title: 'DAS Cikapundung',
    tagline: 'Sistem Telemetri Aliran Sungai & Stasiun Tenaga Surya Mandiri',
    category: 'Smart River & Green Energy',
    description: 'Sistem monitoring telemetri daerah aliran sungai (DAS) Cikapundung berbasis IoT dengan catu daya mandiri panel surya (Off-Grid Solar PV), dilengkapi proteksi MCB, Solar Charge Controller, dual deep-cycle battery, dan sensor hidrometeorologi real-time.',
    fullDescription: "Sistem Pemantauan Daerah Aliran Sungai (DAS) Cikapundung Berbasis IoT & Catu Daya Panel Surya Mandiri\n\nSungai Cikapundung membelah jantung kawasan metropolitan Bandung Raya, berperan vital sebagai sumber air baku dan ekosistem lingkungan, sekaligus jalur rawan limpasan banjir saat intensitas hujan tinggi di kawasan hulu Lembang.\n\nSmart Grow Laboratory menghadirkan stasiun pemantauan terdesentralisasi ramah lingkungan (Off-Grid Clean Energy) yang dipasang di bantaran strategis DAS Cikapundung. Sistem ini beroperasi secara mandiri 24 jam nonstop tanpa bergantung pada jaringan listrik PLN berkat integrasi instalasi panel surya dan panel enclosure catu daya protektif.\n\nKomponen Inti Panel Catu Daya Surya:\n1. Solar Charge Controller (SCC): Mengatur regulasi pengisian daya cerdas dari modul panel surya fotovoltaik (PV) ke bank baterai dengan perlindungan overload, overcharge, dan deep discharge (LVD).\n2. Miniature Circuit Breaker (MCB): Pemutus sirkuit proteksi arus lebih dan hubung singkat untuk menjamin keselamatan modul telemetri dan baterai dari anomali kelistrikan.\n3. Dual Deep-Cycle Battery (VRLA): Bank penyimpan energi kimia berkapasitas tinggi untuk menjamin kontinuitas suplai daya transmisi IoT saat malam hari atau cuaca mendung berkepanjangan.\n4. Terminal Block Terisolasi: Sistem manajemen pengkabelan rapi dengan kode warna standar industri (Merah: Positif +, Hitam: Negatif -, Garis Merah-Hitam: Ke Beban Telemetri).\n\nSensor & Telemetri Terintegrasi:\n- Ketinggian Muka Air Sungai (Ultrasonic Water Level Sensor)\n- Kekeruhan Air (Turbidity Sensor)\n- Keasaman Air (pH Sensor)\n- Suhu Air & Lingkungan\n- Transmisi data nirkabel LoRaWAN / GSM 4G ke Cloud Dashboard",
    image: '/images/das-cikapundung/das-cikapundung-panel.jpg',
    gallery: [
      '/images/das-cikapundung/das-cikapundung-panel.jpg',
      '/images/das-cikapundung/das-cikapundung-poster.png'
    ],
    date: '2026-10-15',
    liveUrl: '#',
    sensors: [
      {
        name: 'Tegangan Baterai Sistem',
        value: 13.6,
        unit: 'V',
        minSafe: 11.5,
        maxSafe: 14.4,
        description: 'Tegangan terminal bank baterai dalam siklus floating charge catu daya surya.'
      },
      {
        name: 'Efisiensi Pengisian Solar Panel',
        value: 94.2,
        unit: '%',
        minSafe: 70,
        maxSafe: 100,
        description: 'Efisiensi konversi daya modul surya fotovoltaik melalui Solar Charge Controller.'
      },
      {
        name: 'Ketinggian Muka Air Sungai',
        value: 1.25,
        unit: 'Meter',
        minSafe: 0.5,
        maxSafe: 3.5,
        description: 'Ketinggian permukaan air sungai terukur secara ultrasonik untuk deteksi dini banjir.'
      },
      {
        name: 'Kekeruhan Air (Turbidity)',
        value: 42,
        unit: 'NTU',
        minSafe: 5,
        maxSafe: 150,
        description: 'Tingkat kejernihan dan partikel lumpur terlarut di aliran Sungai Cikapundung.'
      }
    ]
  },
  {
    id: 'smart-minimarket',
    title: 'Smart Minimarket-QMART',
    tagline: 'Model Inovatif Pengelolaan Teaching Factory & Retail Digital SMK',
    category: 'Smart Retail & Teaching Factory',
    description: 'Implementasi Smart Mini Market berbasis aplikasi Point of Sales (POS) dan teknologi ritel modern sebagai model Teaching Factory di SMK Karya Abadi Sumedang untuk mengasah keterampilan kewirausahaan digital.',
    fullDescription: "Implementasi Smart Mini Market: Model Inovatif Pengelolaan Teaching Factory di SMK Karya Abadi Sumedang\n\nSmart Mini Market merupakan salah satu model Teaching Factory yang dirancang untuk mendukung pembelajaran berbasis praktik di SMK. Melalui pengelolaan mini market berbasis digital, siswa dapat belajar langsung mengenai manajemen ritel, penggunaan teknologi informasi, hingga strategi pemasaran modern.\n\nProgram ini hadir untuk menjawab kebutuhan pendidikan vokasi yang relevan dengan perkembangan industri ritel modern serta membekali siswa dengan keterampilan kewirausahaan di era digital.\n\nMetode Implementasi:\n1. Planning & Development (Maret - Mei 2025):\n- Pembuatan aplikasi Smart Mini Market (QMART)\n- Penyusunan modul pembelajaran & video tutorial interaktif\n- Pengadaan barang dan perlengkapan ritel\n- Identifikasi kebutuhan teaching factory sekolah\n\n2. Implementation (Juni - Juli 2025):\n- Penyediaan fasilitas ritel modern (display area, rak produk, gudang kecil)\n- Sistem Point of Sales (POS) berbasis aplikasi bersama PT. STA\n- Peralatan kasir, papan harga digital, pencahayaan, Wi-Fi, dan signage promosi\n- Simulasi transaksi kasir digital dan pendampingan bagi guru dan siswa\n\n3. Evaluation & Sustainability (Agustus 2025):\n- Monitoring dan evaluasi keberlanjutan program toko ritel\n- Integrasi ke dalam kurikulum Teaching Factory reguler\n- Kolaborasi berkelanjutan dengan perguruan tinggi, mitra industri, dan UMKM lokal\n\nWaktu & Lokasi:\n- Mitra Sekolah: SMK Karya Abadi Sumedang\n- Alamat: Jl. Raya Cijelag No. 329, Desa Cijelag, Kec. Pamulihan, Kab. Sumedang, Jawa Barat 45365\n- Pelaksanaan Utama: Selasa, 26 Agustus 2025\n- Tim Pengabdi: Indrarini Dyah Irawati, Dadan Nur Ramadhan, Didi Supriyadi, Arimbi Dwi Syabillah, Hannani Syadzwana Nur Ritonga, Muhammad Alfachri Akbar (Telkom University)\n- Video Tutorial: https://drive.google.com/file/d/1SUrLFZs9dJEY4fxmZWkd6TtP2E5-ndTk/view",
    image: '/images/smart-minimarket/smart-minimarket-poster.jpg',
    gallery: [
      '/images/smart-minimarket/smart-minimarket-poster.jpg'
    ],
    date: '2025-08-26',
    liveUrl: 'https://drive.google.com/file/d/1SUrLFZs9dJEY4fxmZWkd6TtP2E5-ndTk/view',
    sensors: [
      {
        name: 'Transaksi POS Harian',
        value: 128,
        unit: 'Trx',
        minSafe: 50,
        maxSafe: 500,
        description: 'Volume transaksi kasir tercatat pada sistem aplikasi POS Smart Minimarket.'
      },
      {
        name: 'Akurasi Kasir Digital',
        value: 99.4,
        unit: '%',
        minSafe: 95,
        maxSafe: 100,
        description: 'Tingkat akurasi pemindaian barcode barang dan pencatatan kas kasir.'
      },
      {
        name: 'Ketersediaan Stok Rak',
        value: 98.2,
        unit: '%',
        minSafe: 80,
        maxSafe: 100,
        description: 'Persentase ketersediaan display barang sesuai katalog harga digital.'
      },
      {
        name: 'Keterlibatan Siswa TEFA',
        value: 100,
        unit: '%',
        minSafe: 80,
        maxSafe: 100,
        description: 'Partisipasi aktif siswa SMK dalam rotasi praktik kasir dan merchandising ritel.'
      }
    ]
  },
  {
    id: 'closed-smart-hydroponic',
    title: 'Closed Smart Hydroponic',
    tagline: 'Smart Cabinet & Green Technology',
    category: 'Smart Agriculture & Green Technology',
    description: 'Dokumentasi sistem Closed Smart Hydroponic (Smart Cabinet) berbasis teknologi hijau ramah lingkungan dari Fakultas Ilmu Terapan, Telkom University.',
    fullDescription: "Closed Smart Hydroponic\n\nDokumentasi dan pengujian sistem Closed Smart Hydroponic (Smart Cabinet) untuk budidaya tanaman presisi di dalam ruangan tertutup dengan kontrol pencahayaan grow LED dan sirkulasi udara.\n\nPublikasi Instagram Reel (@indrarini_dya):\n\"Never stop learning because life will never stop teaching. Let's use every opportunity to learn something new anytime and anywhere.\"\n\nTopik & Tagar Resmi:\n#closed #smarthydroponic #smartcabinet #greentechnology #fakultasilmuterapan #telkomuniversity\n\nTanggal Publikasi: 1 September 2023\nInstitusi: Fakultas Ilmu Terapan, Telkom University\nTautan Reel: https://www.instagram.com/reel/CwpE-96NzPK/?utm_source=ig_web_copy_link&exln=MzRlODBiNWFlZA%3D%3D&srtk=MzRlODBiNWFlZA%3D%3D",
    image: '/images/closed-smart-hydroponic/closed-smart-hydroponic.jpg',
    gallery: [
      '/images/closed-smart-hydroponic/closed-smart-hydroponic.jpg'
    ],
    date: '2023-09-01',
    liveUrl: 'https://www.instagram.com/reel/CwpE-96NzPK/?utm_source=ig_web_copy_link&exln=MzRlODBiNWFlZA%3D%3D&srtk=MzRlODBiNWFlZA%3D%3D',
    sensors: [
      {
        name: 'Tingkat Tray Hidroponik',
        value: 2,
        unit: 'Tier',
        minSafe: 1,
        maxSafe: 4,
        description: 'Dua tingkat rak wadah penampung larutan nutrisi dan netpot tanaman.'
      },
      {
        name: 'Pencahayaan Grow LED',
        value: 100,
        unit: '%',
        minSafe: 50,
        maxSafe: 100,
        description: 'Instalasi lampu spektrum fotosintesis di dalam kabinet tertutup.'
      },
      {
        name: 'Sirkulasi Kipas Kabinet',
        value: 100,
        unit: '%',
        minSafe: 50,
        maxSafe: 100,
        description: 'Kipas sirkulasi udara di bagian atas kabinet untuk ventilasi.'
      }
    ]
  },
  {
    id: 'sindulang-netconnect',
    title: 'Sindulang Netconnect Container',
    tagline: 'Stasiun Wi-Fi Publik dan Ruang Komunitas Digital',
    category: 'Pengabdian Masyarakat & Smart Connectivity',
    description: 'Peresmian Sindulang Netconnect Container sebagai stasiun Wi-Fi publik dan ruang komunitas digital di SMK Al Aman Sindulang, hasil program Pengabdian Kepada Masyarakat kolaborasi Universitas Telkom & PT Tigaresi Bangun Nusaperdana.',
    fullDescription: "Smart Office Container Untuk Mendukung Program Sindulang Netconnect Sebagai Stasiun Wi-Fi Publik dan Ruang Komunitas Digital\n\nProgram Pengabdian Kepada Masyarakat (Abdimas)\nKolaborasi: Universitas Telkom & PT Tigaresi Bangun Nusaperdana (PT TBN)\nMitra Sasaran: SMK Al Amah Sindulang, Desa Sindulang, Kec. Cimanggung, Kab. Sumedang, Jawa Barat\nWaktu Pelaksanaan: Semester Genap 2023/2024 | Sabtu, 20 Juli 2024 (08.00 - 16.00 WIB)\n\nTim Pengabdian Masyarakat:\n- Prof. Dr. Indrarini Dyah Irawati., ST., MT\n- Dr. Sugondo Hadiyoso, S.T., M.T.\n- Prof. Dr. Rendy Munadi\n- Dr. Sofia Naning Hertiana\n- Dr. Istikmal, ST., MT.\n- Indri Talitha\n- Sulistyo Winardi\n- Alvino Tunjung Bagaskara\n- Riska Sri Anggraeni\n\n1. Latar Belakang Masalah:\nDesa Sindulang menghadapi tantangan serius dalam akses internet akibat infrastruktur yang kurang memadai, yang berdampak negatif pada perekonomian, pendidikan, dan kesejahteraan masyarakat.\n\n2. Metode Pelaksanaan:\n1. Diskusi antara tim pengabdian masyarakat dengan mitra sasar\n2. Survey lapangan\n3. Merumuskan roadmap kegiatan\n4. Pembuatan model pembelajaran\n5. Implementasi sistem\n\n3. Luaran & Hasil Kegiatan:\n1. Implementasi Wi-Fi publik di smart office container\n2. Modul Pelatihan\n3. Pelatihan instalasi Wi-Fi publik\n4. HaKI\n5. Alat (Unit Smart Office Container)\n\n4. Kesimpulan:\nPengabdian masyarakat Smart Office Container untuk mendukung Program Sindulang Netconnect Sebagai Stasiun Wi-Fi Publik dan Ruang Komunitas Digital berjalan dengan baik berkat kolaborasi dengan SMK Al Amah dan PT Tigaresi Bangun Nusaperdana. Berdasarkan hasil evaluasi, kegiatan ini sesuai dengan kebutuhan mitra dan diharapkan dapat berkelanjutan.",
    image: '/images/sindulang/sindulang-poster.jpg',
    gallery: [
      '/images/sindulang/sindulang-poster.jpg',
      '/images/sindulang/sindulang-spanduk.jpg',
      '/images/sindulang/sindulang-container-side.jpg',
      '/images/sindulang/sindulang-container-door.jpg',
      '/images/sindulang/sindulang-container-angle.jpg'
    ],
    date: '2024-07-20',
    liveUrl: '#',
    sensors: [
      {
        name: 'Ketersediaan Wi-Fi Publik',
        value: 100,
        unit: '%',
        minSafe: 90,
        maxSafe: 100,
        description: 'Ketersediaan akses koneksi nirkabel publik di area SMK Al Aman Sindulang.'
      },
      {
        name: 'Kapasitas Ruang Komunitas',
        value: 20,
        unit: 'Orang',
        minSafe: 10,
        maxSafe: 30,
        description: 'Daya tampung ruang interaksi digital komunal di dalam unit kontainer.'
      },
      {
        name: 'Unit Kontainer Modifikasi',
        value: 1,
        unit: 'Unit',
        minSafe: 1,
        maxSafe: 1,
        description: 'Unit kontainer dilengkapi pintu ganda dan jendela bertralis pengaman.'
      }
    ]
  }
];

export const teamData: TeamMember[] = [
  {
    id: 'mentor-indrarini',
    name: 'Prof. Dr. Indrarini Dyah Irawati, S.T., M.T.',
    role: 'Pembina Lab',
    image: 'mentor-indrarini',
    email: 'indrarini@telkomuniversity.ac.id',
    profileUrl: 'https://www.instagram.com/indrarini_dya/',
    bio: 'Pakar riset sistem telekomunikasi cerdas dan pengolahan sinyal digital. Membimbing Smart Grow Laboratory untuk terus berinovasi dalam memadukan keahlian teknik elektro dengan pemecahan solusi pangan siber.',
    skills: ['IoT Architecture', 'Digital Signal Processing', 'Machine Learning', 'Research Strategy']
  },
  {
    id: 'member-azliny',
    name: 'Azliny Azreen',
    role: 'Asisten Utama Laboratorium',
    image: 'member-azliny',
    email: 'azliny@telkomuniversity.ac.id',
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
    id: 'member-aqila',
    name: 'Aqila Rasha Humairah',
    role: 'Full-stack Developer',
    image: 'member-aqila',
    email: 'aqilarashahumairah@student.telkomuniversity.ac.id',
    bio: 'Berkolaborasi dalam pengembangan sistem backend serverless, database real-time telemetry, dan portal web untuk tim riset bersama Shara.',
    skills: ['React / Vite', 'Node.js', 'Database', 'UI/UX', 'Frontend', 'Backend']
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
    name: 'Sirvani Cinta Dewi Mudasir',
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
    id: 'member-chiko',
    name: 'M. Chiko Dwi Kasa',
    role: 'Hardware & Systems Engineer',
    image: 'member-chiko',
    email: 'mchikodwikasa@student.telkomuniversity.ac.id',
    bio: 'Mengembangkan infrastruktur fisik laboratorium, integrasi kelistrikan instrumen pencahayaan LED, serta kalibrasi mekanik hydroponics.',
    skills: ['System Design', 'Power Electronics', 'Hydroponic Hardware', 'Embedded Control']
  },
  {
    id: 'member-daffa',
    name: 'Daffa Zyaa Ulhaq',
    role: 'Alumni - Firmware Developer',
    image: 'member-daffa',
    email: 'daffa@student.telkomuniversity.ac.id',
    bio: 'Mengembangkan sistem firmware dan protokol transmisi data nirkabel mikrokontroler sensor telemetry riset magang sebelumnya.',
    skills: ['Alumni', 'C/C++', 'ESP32', 'Firmware', 'FreeRTOS', 'IoT Telemetry']
  },
  {
    id: 'member-elyasa',
    name: 'Elyasa Reva',
    role: 'Alumni - UI/UX Designer',
    image: 'member-elyasa',
    email: 'elyasa@student.telkomuniversity.ac.id',
    bio: 'Merancang antarmuka visual (UI/UX) dan pengalaman pengguna untuk platform riset Smart Grow Laboratory.',
    skills: ['Alumni', 'Figma', 'UI/UX Design', 'User Research', 'Prototyping', 'Design Systems']
  },
  {
    id: 'member-humam',
    name: 'Humam Ibadillah',
    role: 'Alumni - Agronomist',
    image: 'member-humam',
    email: 'humam@student.telkomuniversity.ac.id',
    bio: 'Menganalisis kebutuhan hara nutrisi tanaman hidroponik dan kalibrasi parameter larutan riset magang sebelumnya.',
    skills: ['Alumni', 'Agronomy', 'Nutrient Dosage', 'Hydroponic Crops', 'Plant Science']
  },
  {
    id: 'member-hannani',
    name: 'Hannani Syadzwana',
    role: 'Alumni - Full-stack Developer',
    image: 'member-hannani',
    email: 'hannani@student.telkomuniversity.ac.id',
    bio: 'Mengembangkan antarmuka portal analitik dan visualisasi telemetry laboratorium riset magang sebelumnya.',
    skills: ['Alumni', 'Vue.js', 'Node.js', 'WebSockets', 'Frontend', 'Database']
  },
  {
    id: 'member-arimbi',
    name: 'Arimbi Dwi',
    role: 'Alumni - Lead Hardware Engineer',
    image: 'member-arimbi',
    email: 'arimbi@student.telkomuniversity.ac.id',
    bio: 'Mengembangkan integrasi arsitektur fisik laboratorium, sistem kelistrikan LED grow light, dan kalibrasi instrumen riset magang sebelumnya.',
    skills: ['Alumni', 'Hardware Design', 'Embedded Systems', 'Power Electronics', 'PCB Layout']
  },
  {
    id: 'member-alfachri',
    name: 'Muhammad Alfachri Akbar',
    role: 'Alumni - AI Engineer',
    image: 'member-alfachri',
    email: 'alfachriakbar@student.telkomuniversity.ac.id',
    bio: 'Alumni & Asisten Peneliti di Smart Grow Laboratory Telkom University. Berfokus pada integrasi Computer Vision, Deep Learning, dan pemrosesan data otomatisasi pertanian cerdas di Research Center.',
    skills: ['Alumni', 'AI & Machine Learning', 'Computer Vision', 'Deep Learning', 'PyTorch / TensorFlow', 'Smart Agriculture']
  }
];
