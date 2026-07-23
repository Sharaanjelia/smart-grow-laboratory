import { NewsItem, ProjectItem, TeamMember } from './types';

export const newsData: NewsItem[] = [
  {
    id: 'luminet-btp',
    title: 'Luminet: XBee-Based Public Street Lighting Management Intelligence System - BTP Grant',
    category: 'IoT',
    date: 'Juni 2025',
    image: 'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=800&q=80', // High-tech street / IoT theme
    excerpt: 'The implementation of efficient and adaptable public street lighting (PJU) is a critical requirement for the development of smart cities. Funded by the BTP Grant, this project integrates intelligent node mesh network control.',
    content: `Efficient public street lighting (PJU) is a fundamental pillar of smart city infrastructure. Supported by the Bandung Techno Park (BTP) Grant, the Luminet project introduces an advanced intelligent management system powered by XBee-based mesh networking.

The system permits each lighting node to dynamically adapt its brightness based on ambient light levels, vehicular traffic, and specific scheduling rules. By utilizing peer-to-peer communication over XBee modules, the streetlights form a robust, self-healing network that reports energy consumption metrics, lamp status, and structural failures back to a central system dashboard in real time.

### Key Technological Features:
* **XBee Mesh Networking:** Ensures resilient, low-latency node-to-node telemetry across dense urban sectors.
* **Intelligent Dimming Engine:** Saves up to 45% more energy compared to conventional static LED timers by analyzing movement profiles.
* **Predictive Maintenance:** Automates localized diagnosis, allowing the central municipal dispatch to immediately replace failing luminaires before citizen complaints occur.`,
    readTime: '4 min',
    comments: [
      {
        id: 'c1',
        name: 'Rian Kurnia',
        email: 'rian@gmail.com',
        content: 'Luar biasa! Teknologi mesh network XBee ini sangat efisien untuk implementasi smart city di area kampus.',
        timestamp: '2026-06-15 10:30'
      }
    ]
  },
  {
    id: 'smart-hydroponics',
    title: 'Smart Hydroponik: Modular Hydroponic Automated Grow System',
    category: 'Hydroponic',
    date: 'September 2022',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80', // Vertical farm violet lights
    excerpt: 'Modular hydroponic system with customized planting racks. Perfectly calibrated for indoor space farming, integrated with IoT sensing nodes for optimal resource delivery.',
    content: `Our Smart Hydroponik system is an integrated solution engineered specifically to maximize yield in confined space environments. By engineering custom modular planting racks, the system accommodates varying crop types from leafy greens to vine-based cultivars.

With customized LED grow light profiles that mimic sunlight bands essential for photosynthesis, crops experience accelerated development cycles of up to 30%. The modularity allows agriculturalists to easily expand production capacities by stacking trays vertically, making it highly suitable for urban farming initiatives and high-density laboratory research.

### Key Innovations:
* **Spectra-Optimized Lighting:** Tailored purple/blue grow bands that trigger precise growth stages.
* **Precision Dosing pumps:** Delivers micro-nutrients in exact ratios, avoiding nutrient burn and ensuring ideal EC levels.
* **Vertical Bento Design:** Optimizes square footage, achieving high-capacity production within compact footprint structures.`,
    readTime: '3 min',
    comments: [
      {
        id: 'c2',
        name: 'Siti Aminah',
        email: 'siti@mail.com',
        content: 'Rancangan rak modularnya sangat inspiratif, menghemat banyak ruang di lab kami!',
        timestamp: '2022-10-02 14:15'
      }
    ]
  },
  {
    id: 'aquaponics-monitor',
    title: 'Aquaponik Monitor: Multi-Sensor Ecological Telemetry Node',
    category: 'Aquaponics',
    date: 'September 2024',
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=800&q=80', // IoT monitoring rig
    excerpt: 'Integrated monitoring system for temperature, pH, TDS, and water turbidity in closed-loop aquaponic ecosystems, enabling safe co-habitation of aquatic life and organic plants.',
    content: `Aquaponic systems depend heavily on a fragile symbiotic balance between aquatic organisms (fish) and organic flora. The Aquaponik Monitor serves as the central electronic brain that tracks, logs, and alerts operators to shifts in the water chemical balance.

By tracking Temperature, pH, Total Dissolved Solids (TDS), and water Turbidity, the monitor prevents critical failures such as toxic ammonia accumulation, pH crashes, or oxygen depletion. Built on low-power Wi-Fi microcontrollers, all telemetry is instantly broadcasted to a cloud web-dashboard, triggering SMS or email warnings for rapid troubleshooting.

### Integrated Sensors:
* **Analog pH Sensor:** Constantly samples acidity levels to prevent shock in tilapia/carp habitats.
* **TDS Probe:** Analyzes overall nutrient concentration to guarantee crops receive rich minerals from bio-filtered fish waste.
* **Turbidity Meter:** Measures water clarity to monitor filtration system performance and solid waste buildup.`,
    readTime: '5 min',
    comments: []
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: 'hycosmarts',
    title: 'HYCOSMARTS',
    tagline: 'Futuristic Intelligent Container Farming System',
    category: 'Container-based Smart Agriculture',
    description: 'A fully automated, high-yield vertical grow unit designed inside repurposed shipping containers. Powered by custom edge AI diagnostic models and multi-point sensor arrays.',
    fullDescription: 'HYCOSMARTS represents the absolute cutting-edge of climate-controlled, modular agriculture. By utilizing standard shipping container volumes, our team built a hermetically sealed micro-climate unit capable of growing highly nutritious crops in any environment—from dense, congested urban districts to extreme arid regions. Equipped with advanced automated dosing arrays, spectral lighting dimmers, and edge-computing cameras, HYCOSMARTS optimizes resource delivery by continuously analyzing plant transpiration and leaf color spectrums.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80', // Beautiful modern greenhouse container look
    gallery: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=600&q=80'
    ],
    date: '2026-03-15',
    sensors: [
      {
        name: 'Acidity (pH)',
        value: 6.2,
        unit: 'pH',
        minSafe: 5.5,
        maxSafe: 6.5,
        description: 'Measures water pH levels. Optimal pH ensures proper absorption of essential macro and micronutrients.'
      },
      {
        name: 'Nutrients (TDS)',
        value: 1150,
        unit: 'ppm',
        minSafe: 800,
        maxSafe: 1400,
        description: 'Total Dissolved Solids indicates chemical nutrient density inside the active hydroponic reservoir.'
      },
      {
        name: 'Dissolved Oxygen (DO)',
        value: 7.8,
        unit: 'mg/L',
        minSafe: 6.0,
        maxSafe: 9.0,
        description: 'Dissolved oxygen levels prevent root stagnation, rot, and encourage robust root health.'
      },
      {
        name: 'Electrical Conductivity (EC)',
        value: 1.8,
        unit: 'mS/cm',
        minSafe: 1.2,
        maxSafe: 2.2,
        description: 'EC measures the capability of solution to conduct electrical currents, correlating directly to salt concentrations.'
      },
      {
        name: 'Ambient Temperature',
        value: 24.5,
        unit: '°C',
        minSafe: 18.0,
        maxSafe: 28.0,
        description: 'Controlling air temperature stabilizes plant respiration rates and maintains photosynthesis efficiency.'
      }
    ]
  },
  {
    id: 'luminet',
    title: 'LUMINET',
    tagline: 'XBee-Based Public Street Lighting Management Intelligence System',
    category: 'IoT',
    description: 'XBee mesh network controlled public street lighting (PJU) system. Optimizes energy by 45% via pedestrian and vehicular density adaptive dimming.',
    fullDescription: 'Luminet is an advanced street lighting management system funded by the Bandung Techno Park (BTP) Grant. Built on a low-latency XBee-based mesh network, each luminaire acts as an intelligent sensor node that measures local motion density and adjusts light levels dynamically. Telemetry is routed continuously back to municipal dashboards for remote fault analysis.',
    image: 'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=600&q=80'
    ],
    date: '2025-06-20',
    sensors: [
      {
        name: 'Motion Activity',
        value: 78,
        unit: '%',
        minSafe: 0,
        maxSafe: 100,
        description: 'Density percentage of pedestrians and cars detected on active road segments.'
      },
      {
        name: 'Lamp Wattage',
        value: 45,
        unit: 'W',
        minSafe: 10,
        maxSafe: 120,
        description: 'Active energy input. Dims dynamically during midnight and zero activity to save massive grids.'
      },
      {
        name: 'Grid Voltage',
        value: 220.4,
        unit: 'V',
        minSafe: 210.0,
        maxSafe: 230.0,
        description: 'Grid voltage metrics to identify brownouts and surge overloads.'
      }
    ]
  },
  {
    id: 'aquaponics-monitor',
    title: 'AQUAPONIK MONITOR',
    tagline: 'Multi-Sensor Ecological Telemetry Node',
    category: 'Aquaponics',
    description: 'SYmbiotic monitoring node for closed-loop aquaponics, allowing Tilapia aquaculture and organic leafy plants to coexist safely.',
    fullDescription: 'The Aquaponik Monitor serves as the ecological telemetry node tracking biological balances. By measuring pH, temperature, water turbidity, and Total Dissolved Solids, the system warns operators about ammonia spikes and filtration clogging in real time.',
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80'
    ],
    date: '2024-09-10',
    sensors: [
      {
        name: 'Water pH',
        value: 6.8,
        unit: 'pH',
        minSafe: 6.5,
        maxSafe: 7.5,
        description: 'Water pH level, crucial for keeping both fish and vertical organic crops within healthy bio-tolerances.'
      },
      {
        name: 'Turbidity',
        value: 12,
        unit: 'NTU',
        minSafe: 0,
        maxSafe: 25,
        description: 'Water clarity measurement to identify organic waste pile-ups and evaluate active bio-filters.'
      },
      {
        name: 'Water Temperature',
        value: 23.2,
        unit: '°C',
        minSafe: 20.0,
        maxSafe: 28.0,
        description: 'Water temperature control is crucial to prevent aquatic metabolic stress and ensure stable root cell respiration.'
      }
    ]
  },
  {
    id: 'smart-hydroponics-rack',
    title: 'SMART HYDROPONIK',
    tagline: 'Modular Hydroponic Automated Grow System',
    category: 'Hydroponics',
    description: 'Precision stackable modular racks featuring automated nutrient dosing pumps and optimized grow LED spectra.',
    fullDescription: 'Our Smart Hydroponik system utilizes space-saving vertical racks to maximize yield per square meter. Equipped with tailor-made red/blue grow bands and precision peristaltic chemical injectors, it ensures healthy vegetable cultivation for research laboratories.',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80'
    ],
    date: '2022-09-05',
    sensors: [
      {
        name: 'Solution EC',
        value: 1.6,
        unit: 'mS/cm',
        minSafe: 1.0,
        maxSafe: 2.0,
        description: 'Electrical conductivity of mineral liquid, representing active nutrient concentrations in the reservoir.'
      },
      {
        name: 'LED Output',
        value: 85,
        unit: '%',
        minSafe: 50,
        maxSafe: 100,
        description: 'Tailored agricultural light bands active to speed up photosynthetic plant growth cycles.'
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
