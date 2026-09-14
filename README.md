# Smart Grow Laboratory (SGL) — Telkom University

<div align="center">
  <img src="public/images/smart-grow-logo.png" width="120" alt="Smart Grow Logo" />
  <h3>Pusat Riset IoT, Kecerdasan Buatan & Pertanian Presisi Terintegrasi</h3>
  <p><strong>Bandung Techno Park (BTP) Lt. 2 • Telkom University</strong></p>

  [![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vitejs.dev/)
  [![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)
  [![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%26%20Hosting-FFA611.svg)](https://firebase.google.com/)
  [![License](https://img.shields.io/badge/Telkom%20University-Research%20Project-E00000.svg)](https://telkomuniversity.ac.id/)
</div>

---

## 📌 Tentang Smart Grow Laboratory

**Smart Grow Laboratory (SGL)** adalah pusat penelitian terpadu di bawah naungan **Telkom University** yang berfokus pada integrasi *Cyber-Physical Agriculture Systems*, *Internet of Things (IoT)*, *Wireless Sensor Networks (WSN)*, dan *Artificial Intelligence (AI)* untuk memajukan sektor pertanian presisi dan ketahanan pangan nasional.

Platform web ini menggabungkan dua ekosistem utama:
1. **Portal Publik & Branding Riset**: Etalase publikasi ilmiah, showcase proyek riset hibah (Kedaireka & DIKTI), profil peneliti, dan pendaftaran magang terbuka (*Open Recruitment*).
2. **Learning & Internship Management System (LMS) Multi-Role**: Sistem tata kelola riset laboratorium terpusat untuk Dosen Pembimbing, Asisten Lab, dan Mahasiswa Magang.

---

## 🚀 Proyek Riset Unggulan

| Proyek | Deskripsi Singkat | Tech Stack |
| :--- | :--- | :--- |
| **HYCOS-SMARTS** | *Container Farm Telemetry Gateway* untuk monitoring pH, EC, DO, suhu air, dan otomasi dosis nutrisi hidroponik. | ESP32, XBee Mesh, MQTT, React |
| **LUMINET** | *Smart Crop Vision AI* untuk klasifikasi penyakit daun dan deteksi kematangan tanaman secara otomatis. | YOLOv8, PyTorch, OpenCV, FastAPI |
| **SIMONA** | Sistem monitoring nutrisi dan akuisisi data multi-node terdistribusi. | LoRaWAN, STM32, Modbus RTU |
| **FLOCIFY** | Manajemen budidaya perikanan bioflok berbasis sensor oksigen terlarut dan pengatur aerasi adaptif. | Arduino, Node-RED, InfluxDB |
| **Smart Hydroponics NFT** | Sirkulasi aliran nutrisi tipis (*Nutrient Film Technique*) terotomatisasi dengan jadwal pencahayaan LED grow light. | ESP8266, Relay Controller, Web Dashboard |

---

## 👥 Struktur Peran & Fitur LMS Portal

Sistem LMS SGL mengimplementasikan *Role-Based Access Control (RBAC)* dengan 4 tingkatan hak akses:

### 1. 🎓 Direktur Laboratorium / Dosen Pembimbing Utama (Head of Lab)
- **Monitoring KPI Riset**: Melihat ringkasan seluruh proyek aktif, publikasi, dan metrik keberhasilan.
- **Persetujuan (Approvals)**: Menyetujui usulan pengadaan komponen sensor, revisi modul, dan izin riset.
- **Monitoring Kehadiran Mahasiswa**: Memantau rekapitulasi presensi harian seluruh mahasiswa magang.
- **Evaluasi Portofolio**: Penilaian akhir dan penerbitan sertifikat magang.

### 2. 🛠️ Asisten Laboratorium & Koordinator Magang
- **Manajemen Tugas (Kanban Board)**: Memberikan tugas baru, menentukan deadline, dan meninjau kemajuan.
- **Pemeriksaan & Catatan Revisi**: Menginspeksi laporan tugas mahasiswa, memberikan komentar revisi, dan menyetujui submission.
- **Manajemen Pendaftaran (*Join Submissions*)**: Memvalidasi berkas calon mahasiswa magang baru.
- **Siaran Pengumuman Lab**: Mempublikasikan agenda seminar berkala dan instruksi operasional lab.

### 3. 🌱 Mahasiswa Magang Riset (Intern Student)
- **Dashboard Utama**: Ringkasan aktivitas dan agenda hari ini (*Today's Activities*).
- **Magang Saya**: Showcase detail proyek riset utama, roadmap 9 fase magang, direktori rekan seangkatan, dan jurnal harian (*Daily Logbook*).
- **Presensi GPS & Selfie**: Check-in presensi mandiri dengan validasi lokasi Bandung Techno Park (BTP) dan kamera selfie.
- **Papan Tugas & Progres**: Menyerahkan hasil riset (*Submit Progress*) lengkap dengan tautan GitHub dan dokumen pendukung.
- **Pembimbing Riset**: Profil lengkap dosen pembimbing (Prof. Indrarini) dan asisten lab beserta jadwal asistensi.

### 4. 🛡️ Administrator Sistem
- **Persetujuan Pendaftaran Akun**: Menyetujui registrasi akun baru sebelum dapat login ke sistem.
- **Manajemen Pengguna**: Mengatur role pengguna (*Director, Assistant, Student, Admin*).
- **Audit Log**: Memantau riwayat aktivitas dan keamanan sesi login.

---

## 💻 Tech Stack & Arsitektur

- **Frontend**: React 19, TypeScript, Vite 6
- **Styling**: Tailwind CSS v4 (Glassmorphism, High-contrast Dark/Light Theme)
- **Animasi & Ikon**: Motion, Lucide React
- **Backend & Database**: Firebase Firestore (Realtime NoSQL Database)
- **Autentikasi & Media**: Firebase Authentication & Firebase Cloud Storage
- **Hosting**: Firebase Hosting (CDN Global)

---

## 🔑 Kredensial Demo untuk Pengujian

Gunakan tombol **"Quick Role Select"** pada halaman login atau kredensial berikut:

| Peran (Role) | Nama Pengguna | Email | Akses Fitur |
| :--- | :--- | :--- | :--- |
| **Direktur Lab** | Prof. Dr. Indrarini Dyah Irawati | `indrarini@telkomuniversity.ac.id` | Dashboard KPI, Persetujuan, Monitoring Magang |
| **Asisten Lab** | Azliny Azreen | `azliny@telkomuniversity.ac.id` | Manajemen Tugas, Verifikasi Pendaftar, Presensi |
| **Mahasiswa Magang** | Shara Anjelia | `sharaanjelia@student.telkomuniversity.ac.id` | Presensi GPS/Selfie, Logbook, Submit Tugas |
| **Administrator** | Lab Administrator | `admin@smartgrowlab.id` | Persetujuan Akun, Audit Log, User Management |

---

## 🛠️ Menjalankan Proyek Secara Lokal

### Prasyarat:
- Node.js (versi 18 ke atas)
- npm atau yarn

### Langkah Instalasi:
```bash
# 1. Clone repositori ini
git clone https://github.com/Sharaanjelia/smart-grow-laboratory.git

# 2. Masuk ke direktori proyek
cd smart-grow-laboratory

# 3. Pasang seluruh dependensi
npm install

# 4. Jalankan server pengembang lokal
npm run dev
```
Buka browser di `http://localhost:3000`.

### Build untuk Produksi:
```bash
npm run build
```

---

## 🌐 Tautan Produksi Resmi

- **Live URL**: [https://smart-grow-lab.web.app](https://smart-grow-lab.web.app)
- **Alternatif**: [https://smart-grow-lab.firebaseapp.com](https://smart-grow-lab.firebaseapp.com)

---

<div align="center">
  <p>© 2026 Smart Grow Laboratory — Telkom University. All rights reserved.</p>
</div>
