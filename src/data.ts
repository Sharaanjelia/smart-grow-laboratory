import { NewsItem, ProjectItem, TeamMember } from './types';

export const newsData: NewsItem[] = [
  {
    id: 'hycosmarts-container',
    title: 'HYCOSMARTS: Smart Container-Based Intelligent Farming System',
    category: 'Container Hydroponics',
    date: 'Juli 2026',
    image: '/images/hycosmarts/hycosmarts-3.png',
    excerpt: 'HYCOSMARTS is a smart container-based intelligent farming system designed to manage indoor hydroponic farming automatically, efficiently, and sustainably with pH, TDS, DO, EC, and ultrasonic sensors.',
    content: `HYCOSMARTS is a smart container-based intelligent farming system designed to manage indoor hydroponic farming automatically, efficiently, and sustainably.

The system is equipped with various important sensors such as pH, TDS, DO, EC, and ultrasonic sensors to monitor water quality, nutrient availability, and growing conditions in real time. With artificial intelligence support and integration with web-based dashboards and mobile apps, HYCOSMARTS can precisely regulate plant needs and provide early notifications of potential crop failures.

In addition to being energy-efficient and self-sufficient, the system is also suitable for implementation in 3T areas (remote, frontier, and outer regions) as an innovative solution to enhance agricultural productivity and food self-sufficiency through technology.

### Key Innovations:
* **Multi-Sensor Real-Time Telemetry:** pH, TDS, Dissolved Oxygen (DO), Electrical Conductivity (EC), and Ultrasonic water level sensors.
* **Edge AI & Failure Early Alert System:** Predictive AI models that continuously evaluate growth conditions and alert operators via Web and Mobile Apps before crop failures happen.
* **Suitable for 3T Regions:** Modular, self-sufficient shipping container architecture designed for remote, frontier, and outer regions.`,
    readTime: '5 min',
    comments: [
      {
        id: 'c_hyco1',
        name: 'Dr. Ahmad Rizal',
        email: 'rizal@telkomuniversity.ac.id',
        content: 'Inovasi HYCOSMARTS luar biasa! Penggunaan kontainer kargo yang mandiri dan terintegrasi AI sangat berpotensi meningkatkan ketahanan pangan di wilayah 3T.',
        timestamp: '2026-07-22 14:20'
      }
    ]
  },
  {
    id: 'simona-aquaponics',
    title: 'SIMONA: Aquaponics Monitoring System',
    category: 'Aquaponics IoT',
    date: 'Juli 2026',
    image: '/images/simona/simona-control-box-farm.jpg',
    excerpt: 'SIMONA (Aquaponics Monitoring System) is an integrated smart system designed to support sustainable farming by combining aquaculture and hydroponics with IoT sensors and remote access.',
    content: `SIMONA (Aquaponics Monitoring System) is an integrated smart system designed to support sustainable farming by combining aquaculture and hydroponics in a mutually beneficial ecosystem.

It utilizes a range of sensors to monitor key environmental parameters such as water level, pH, temperature, and Total Dissolved Solids (TDS), ensuring optimal conditions for both fish and plant growth. Powered by microcontrollers like Arduino or Raspberry Pi, SIMONA automates essential functions and displays real-time data through a user-friendly interface.

With IoT connectivity and remote access via a responsive web platform, users can monitor and control the system anytime, anywhere. SIMONA enhances productivity, reduces manual workload, enables early problem detection, and promotes efficient, technology-driven aquaponic farming.

### Key Technological Features:
* **Multi-Sensor Real-Time Telemetry:** Water level (Ultrasonic), pH, Temperature, and TDS sensors.
* **Arduino / Raspberry Pi Microcontroller Integration:** Automated actuation for pumps, aerators, and automated feeders.
* **Blynk & Web Remote Access:** Seamless mobile app connectivity and responsive web dashboard for remote control anywhere.`,
    readTime: '4 min',
    comments: [
      {
        id: 'c_simona1',
        name: 'Budi Santoso',
        email: 'budi@student.telkomuniversity.ac.id',
        content: 'Sistem akuaponik SIMONA sangat membantu menjaga kualitas air kolam ikan sekaligus memberikan nutrisi organik pada sayuran pakcoy!',
        timestamp: '2026-07-23 09:15'
      }
    ]
  },
  {
    id: 'luminet-smart-lighting',
    title: 'LUMINET: Smart Street Lighting Management System',
    category: 'Smart City PJU IoT',
    date: 'Juli 2026',
    image: '/images/luminet/luminet-logo.jpg',
    excerpt: 'LUMINET (Smart Street Lighting Management System) is an Internet of Things (IoT)-based smart system for automatically and efficiently managing public street lighting (PJU).',
    content: `LUMINET (Smart Street Lighting Management System) is an Internet of Things (IoT)-based smart system for automatically and efficiently managing public street lighting (PJU). The system uses XBee communication for centralized monitoring and control via a web dashboard and mobile app.

LUMINET supports multi-point control with automation logic based on time, light intensity (LDR), and Correlated Color Temperature (CCT). The system also monitors electrical conditions (power, voltage, current) in real-time and is equipped with GPS for PJU location identification.

Anomaly notifications are automatically sent to expedite issue resolution. With its modular design, LUMINET is suitable for implementation by local governments, industrial zones, and smart city managers to enhance energy efficiency, reduce operational costs, and accelerate on-site repair responses.`,
    readTime: '5 min',
    comments: [
      {
        id: 'c_luminet1',
        name: 'Deni Kurniawan',
        email: 'deni@bandung.go.id',
        content: 'Sistem LUMINET XBee Mesh terbukti menghemat hingga 45% energi PJU dan sangat membantu pemantauan lokasi node via GIS map!',
        timestamp: '2026-07-24 08:30'
      }
    ]
  },
  {
    id: 'flocify-biofloc-ai',
    title: 'FLOCIFY: IoT & Deep Learning Biofloc Solution',
    category: 'Biofloc AI Aquaculture',
    date: 'Juli 2026',
    image: '/images/flocify/flocify-biofloc-tank-iso.png',
    excerpt: 'Flocify is an innovative Internet of Things (IoT) and Deep Learning-based solution designed to optimize fish farming in biofloc systems.',
    content: `Flocify is an innovative Internet of Things (IoT) and Deep Learning-based solution designed to optimize fish farming in biofloc systems. The platform integrates smart sensing technologies, real-time monitoring, artificial intelligence-driven analytics, and automated control mechanisms to maintain sustainable aquaculture environments.

Through continuous monitoring of critical water quality parameters, including temperature, pH, dissolved oxygen (DO), ammonia concentration, and other relevant environmental indicators, Flocify enables the acquisition of real-time data to support adaptive aquaculture management.

The integration of Deep Learning algorithms facilitates pattern recognition, anomaly detection, and predictive analysis of environmental conditions, thereby enabling early identification of potential risks and supporting evidence-based decision-making.`,
    readTime: '5 min',
    comments: [
      {
        id: 'c_flocify1',
        name: 'Hendra Saputra',
        email: 'hendra@aquaculture.id',
        content: 'Flocify sangat membantu mencegah lonjakan amonia beracun pada kolam biofloc lele dan nila secara real-time!',
        timestamp: '2026-07-24 08:50'
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
    id: 'member-arimbi',
    name: 'Arimbi Dwi',
    role: 'Lead Hardware Engineer',
    image: 'member-arimbi',
    email: 'arimbi@student.telkomuniversity.ac.id',
    bio: 'Merancang algoritma kontrol mekanik, kelistrikan container, serta integrasi motor pneumatik untuk pengaliran nutrisi otomatis.',
    skills: ['Microcontrollers', 'CAD Modeling', 'Pneumatics', 'Electrical Systems']
  },
  {
    id: 'member-daffa',
    name: 'Daffa Zyaa Ulhaq',
    role: 'Firmware Developer',
    image: 'member-daffa',
    email: 'daffazyaa@student.telkomuniversity.ac.id',
    bio: 'Menangani protokol data telemetry, sensor kalibrasi nirkabel, dan konfigurasi mesh network berbasis ESP32 dan LoRa.',
    skills: ['ESP32 Development', 'LoRaWAN', 'Firmware Engineering', 'Python']
  },
  {
    id: 'member-hannani',
    name: 'Hannani Syadzwana',
    role: 'Full-stack Developer',
    image: 'member-hannani',
    email: 'hannani@student.telkomuniversity.ac.id',
    bio: 'Mengembangkan sistem backend serverless, database real-time telemetry, dan portal analitik web untuk tim riset.',
    skills: ['React / Vite', 'Node.js', 'NoSQL Datastores', 'Cloud Run']
  },
  {
    id: 'member-elyasa',
    name: 'Elyasa Reva',
    role: 'UI/UX Designer',
    image: 'member-elyasa',
    email: 'elyasareva@student.telkomuniversity.ac.id',
    bio: 'Fokus pada riset pengguna, visualisasi data grafik sensor interaktif, serta perancangan aplikasi seluler pertanian pintar.',
    skills: ['Figma', 'Interactive Prototyping', 'User Testing', 'Tailwind CSS']
  },
  {
    id: 'member-humam',
    name: 'Humam Ibadillah',
    role: 'Agronomist',
    image: 'member-humam',
    email: 'humam@student.telkomuniversity.ac.id',
    bio: 'Mengkalibrasi respons fisiologis tanaman terhadap spektrum cahaya LED dan memantau formulasi pupuk organik cair makro.',
    skills: ['Plant Physiology', 'Nutrient Formulation', 'Bio-filtration', 'Data Analysis']
  }
];
