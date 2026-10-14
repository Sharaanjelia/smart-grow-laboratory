import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, CheckCircle2, AlertCircle, X, RefreshCw, Upload, FlipHorizontal } from 'lucide-react';
import { 
  calculateHaversineDistanceMeters, 
  BTP_OFFICIAL_LAT, 
  BTP_OFFICIAL_LNG, 
  BTP_GEOFENCE_RADIUS_METERS 
} from '../../utils/dateUtils';

interface CheckInCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmCheckIn: (
    photoUrl: string, 
    locationAddress: string, 
    coords: { lat: number; lng: number; accuracy: number; distance: number }
  ) => Promise<void> | void;
  studentName: string;
  darkMode?: boolean;
}

export default function CheckInCameraModal({
  isOpen,
  onClose,
  onConfirmCheckIn,
  studentName,
  darkMode = false
}: CheckInCameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isMirrored, setIsMirrored] = useState<boolean>(() => {
    const saved = localStorage.getItem('smart_grow_camera_mirrored');
    return saved !== null ? saved === 'true' : true;
  });

  const toggleMirror = () => {
    setIsMirrored((prev) => {
      const next = !prev;
      localStorage.setItem('smart_grow_camera_mirrored', String(next));
      return next;
    });
  };
  
  const [locationAddress, setLocationAddress] = useState<string>('Mendeteksi lokasi GPS...');
  const [coords, setCoords] = useState<{ lat: number; lng: number; accuracy: number; distance: number } | null>(null);
  const [isDetectingGps, setIsDetectingGps] = useState(true);
  const [locationValid, setLocationValid] = useState(false);
  const [gpsErrorMsg, setGpsErrorMsg] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Initialize camera stream and GPS when modal opens
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setIsSubmitting(false);
      setSubmitSuccess(false);
      return;
    }

    setCapturedPhoto(null);
    setCameraError(null);
    setGpsErrorMsg(null);
    setSubmitError(null);
    setIsDetectingGps(true);
    setLocationValid(false);
    setCoords(null);
    setIsSubmitting(false);
    setSubmitSuccess(false);

    // 1. Request Camera Stream
    startCamera();

    // 2. Request Geolocation
    detectGps();

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const detectGps = () => {
    setIsDetectingGps(true);
    setGpsErrorMsg(null);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const accuracy = Math.round(pos.coords.accuracy || 10);
          const dist = calculateHaversineDistanceMeters(lat, lng, BTP_OFFICIAL_LAT, BTP_OFFICIAL_LNG);
          
          setCoords({ lat, lng, accuracy, distance: dist });

          if (dist <= BTP_GEOFENCE_RADIUS_METERS) {
            setGpsErrorMsg(null);
            setLocationValid(true);
            setLocationAddress(`Area Laboratorium BTP Telkom University (Jarak: ${dist}m, Akurasi: ${accuracy}m)`);
          } else {
            setLocationValid(false);
            setGpsErrorMsg(`Di luar radius resmi BTP Telkom University (Jarak: ${dist}m dari lab, batas maksimal: ${BTP_GEOFENCE_RADIUS_METERS}m).`);
            setLocationAddress(`Di luar area lab (${dist}m dari pusat BTP)`);
          }
          setIsDetectingGps(false);
        },
        (err) => {
          console.warn('Geolocation error:', err?.message);
          setLocationValid(false);
          setGpsErrorMsg(
            err.code === 1 
              ? 'Izin GPS ditolak oleh browser. Mohon izinkan akses lokasi di pengaturan browser Anda untuk presensi.'
              : err.code === 2
              ? 'Sinyal GPS tidak tersedia atau tidak akurat. Coba lagi di area terbuka.'
              : 'Waktu deteksi GPS habis. Silakan periksa koneksi dan refresh izin lokasi.'
          );
          setLocationAddress('GPS Tidak Terdeteksi');
          setIsDetectingGps(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocationValid(false);
      setGpsErrorMsg('Peramban (browser) tidak mendukung Geolocation GPS.');
      setLocationAddress('GPS Tidak Didukung');
      setIsDetectingGps(false);
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      let mediaStream: MediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } } 
        });
      } catch (e) {
        // Fallback for PC webcams that don't support facingMode parameter
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      }

      setStream(mediaStream);
      setCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch(err => console.warn('Video play error:', err));
        };
        videoRef.current.play().catch(() => {});
      }
    } catch (err: any) {
      console.warn('Webcam access error:', err);
      setCameraError('Akses kamera perlu diizinkan di browser Anda. Klik "Izinkan Kamera" di bawah.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraActive(false);
  };

  const handleTakeSnapshot = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (isMirrored) {
          ctx.translate(canvas.width, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        } else {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
        
        const photoDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setCapturedPhoto(photoDataUrl);
        stopCamera();
      }
    }
  };

  const handleFlipCapturedPhoto = () => {
    if (!capturedPhoto) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0);
        setCapturedPhoto(canvas.toDataURL('image/jpeg', 0.85));
      }
    };
    img.src = capturedPhoto;
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
    navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'user' } })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(e => console.warn('Video play notice:', e));
        }
        setCameraActive(true);
      })
      .catch((err) => {
        console.warn('Camera error:', err);
        setCameraError('Gagal membuka kamera kembali.');
      });
  };

  const handleFileUploadFallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedPhoto(reader.result as string);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFinalSubmit = async () => {
    if (!capturedPhoto) {
      setSubmitError('Silakan ambil foto selfie presensi terlebih dahulu.');
      return;
    }
    if (!locationValid || !coords) {
      setSubmitError(`Lokasi Anda belum tervalidasi di dalam area laboratorium BTP (Maks. ${BTP_GEOFENCE_RADIUS_METERS} meter).`);
      return;
    }
    if (coords.distance > BTP_GEOFENCE_RADIUS_METERS) {
      setSubmitError(`Presensi ditolak: Anda berada ${coords.distance}m dari lab (radius maksimal ${BTP_GEOFENCE_RADIUS_METERS}m).`);
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);
    try {
      await onConfirmCheckIn(capturedPhoto, locationAddress, coords);
      setSubmitSuccess(true);
      setTimeout(() => {
        stopCamera();
        setIsSubmitting(false);
        setSubmitSuccess(false);
        onClose();
      }, 900);
    } catch (e: any) {
      console.error('Check-in error:', e);
      setIsSubmitting(false);
      setSubmitError(e?.message || 'Gagal menyimpan presensi. Periksa koneksi internet Anda dan coba lagi.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[92vh] overflow-y-auto">
        
        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Camera className="h-5 w-5 text-[#2E7D32]" />
              <span>Punch Check-In Presensi Selfie</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">Jam Kerja: <span className="font-bold text-emerald-600 dark:text-emerald-400">08:00 - 16:00 WIB</span> (Batas Masuk: 08:30 WIB) • Radius BTP {BTP_GEOFENCE_RADIUS_METERS}m</p>
          </div>
          <button 
            onClick={() => {
              stopCamera();
              onClose();
            }} 
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* GEOLOCATION DETECTED BADGE */}
        <div className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
          isDetectingGps ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 text-amber-800' :
          locationValid ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-800' :
          'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-800'
        }`}>
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
            locationValid ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
          }`}>
            <MapPin className="h-4 w-4 animate-pulse" />
          </div>
          <div className="flex-1 text-xs space-y-0.5">
            <div className="flex items-center justify-between gap-1 flex-wrap">
              <span className="text-[11px] font-extrabold uppercase tracking-wider block font-mono">
                {isDetectingGps ? '🟡 Memeriksa Geofence GPS...' : locationValid ? '🟢 Di Dalam Area Laboratorium' : '🔴 Di Luar Area Laboratorium'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={detectGps}
                  disabled={isDetectingGps}
                  className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  title="Klik untuk deteksi ulang GPS"
                >
                  <RefreshCw className={`h-2.5 w-2.5 ${isDetectingGps ? 'animate-spin' : ''}`} />
                  <span>Cek Ulang GPS</span>
                </button>
                <span className="text-[10px] font-mono text-slate-400">BTP {BTP_GEOFENCE_RADIUS_METERS}m Geofence</span>
              </div>
            </div>
            <p className="font-bold text-slate-800 dark:text-slate-200 text-[11px] leading-tight">
              {locationAddress}
            </p>
            {gpsErrorMsg && (
              <p className="text-[11px] font-extrabold text-rose-600 dark:text-rose-400 pt-0.5">
                ⚠️ {gpsErrorMsg}
              </p>
            )}
          </div>
        </div>

        {/* SUBMIT ERROR NOTIFICATION */}
        {submitError && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200 text-xs flex items-center gap-2.5">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span className="font-medium">{submitError}</span>
          </div>
        )}

        {/* LIVE CAMERA / SNAPSHOT CONTAINER */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video flex items-center justify-center border-2 border-slate-800 shadow-inner">
          
          {capturedPhoto ? (
            <img src={capturedPhoto} alt="Captured Selfie" className="w-full h-full object-cover" />
          ) : (
            <>
              <video 
                ref={(el) => {
                  videoRef.current = el;
                  if (el && stream && el.srcObject !== stream) {
                    el.srcObject = stream;
                    el.play().catch(() => {});
                  }
                }}
                style={{
                  transform: isMirrored ? 'scaleX(-1)' : 'none',
                  WebkitTransform: isMirrored ? 'scaleX(-1)' : 'none',
                }}
                className="w-full h-full object-cover transition-transform duration-200"
                autoPlay 
                playsInline 
                muted 
              />

              {/* Mirror Mode Live Toggle */}
              {cameraActive && (
                <button
                  type="button"
                  onClick={toggleMirror}
                  className={`absolute top-3 right-3 z-30 px-3 py-1.5 rounded-full text-white text-[11px] font-bold border backdrop-blur-md flex items-center gap-1.5 transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95 ${
                    isMirrored 
                      ? 'bg-emerald-700/90 hover:bg-emerald-700 border-emerald-400/50 text-white' 
                      : 'bg-slate-900/90 hover:bg-slate-900 border-white/20 text-slate-200'
                  }`}
                  title="Klik untuk membalik posisi kamera kiri/kanan (Flip Horizontal)"
                >
                  <FlipHorizontal className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{isMirrored ? '🔄 Flip Aktif (Cermin)' : '📷 Mode Asli (Tanpa Flip)'}</span>
                </button>
              )}
              
              {/* Radar Grid Overlay for Camera */}
              {cameraActive ? (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-dashed border-emerald-400/60 rounded-full animate-pulse flex items-center justify-center">
                    <span className="text-[10px] font-mono text-emerald-300 bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-xs">
                      Posisikan Wajah Di Sini
                    </span>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-6 text-center text-white space-y-3 z-10">
                  <Camera className="h-10 w-10 text-emerald-400 animate-pulse" />
                  <div className="space-y-1">
                    <p className="text-xs text-white font-bold">Nyalakan Kamera untuk Selfie Presensi</p>
                    <p className="text-[10px] text-slate-300">Izinkan kamera browser atau ambil foto selfie menggunakan kamera perangkat Anda</p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={startCamera}
                      className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Camera className="h-4 w-4" />
                      <span>Nyalakan Kamera Web 📷</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-lg border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Kamera Perangkat 📸</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Camera Error Fallback */}
          {cameraError && !capturedPhoto && !cameraActive && (
            <div className="absolute inset-0 bg-slate-900/95 flex flex-col items-center justify-center p-6 text-center text-white space-y-3 z-20">
              <AlertCircle className="h-10 w-10 text-amber-400" />
              <p className="text-xs text-slate-300">{cameraError}</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={startCamera}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Camera className="h-4 w-4" />
                  <span>Coba Buka Kamera Lagi</span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs cursor-pointer flex items-center gap-1.5 border border-slate-700"
                >
                  <Upload className="h-4 w-4" />
                  <span>Buka Kamera Perangkat</span>
                </button>
              </div>
            </div>
          )}

          {/* Hidden File Input for Direct Camera/Gallery Capture */}
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            capture="user" 
            className="hidden" 
            onChange={handleFileUploadFallback} 
          />

          {/* Timestamp & User Badge on Camera Overlay */}
          <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white flex items-center justify-between text-[10px] font-mono">
            <span className="font-bold text-emerald-300">{studentName}</span>
            <span>{new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* SUBMIT FEEDBACK NOTIFICATION */}
        {submitSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100 flex items-center gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-xs">Presensi & Foto Berhasil Tersimpan! ✓</p>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-300">Data Anda telah dicatat ke sistem presensi laboratorium.</p>
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="space-y-3 text-xs">
          {!capturedPhoto ? (
            <div className="flex gap-2">
              <button
                type="button"
                disabled={!locationValid || isDetectingGps}
                onClick={() => {
                  if (cameraActive) {
                    handleTakeSnapshot();
                  } else {
                    fileInputRef.current?.click();
                  }
                }}
                className="flex-1 py-3.5 rounded-2xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Camera className="h-4 w-4" />
                <span>Ambil Foto</span>
              </button>

              {cameraActive && (
                <button
                  type="button"
                  onClick={toggleMirror}
                  className="px-4 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold cursor-pointer transition-all flex items-center gap-1.5 text-xs border border-slate-200 dark:border-slate-700"
                  title="Balik posisi kamera kiri/kanan (Flip Horizontal)"
                >
                  <FlipHorizontal className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="hidden sm:inline font-semibold">{isMirrored ? 'Balik Arah' : 'Mode Cermin'}</span>
                </button>
              )}

              <button
                type="button"
                disabled={!locationValid || isDetectingGps}
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold cursor-pointer hover:bg-slate-200 transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed border border-slate-200 dark:border-slate-700"
                title="Buka Kamera Perangkat / Galeri"
              >
                <Upload className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleRetake}
                className="px-3.5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-xs"
              >
                <RefreshCw className={`h-4 w-4 ${isSubmitting ? 'animate-spin' : ''}`} />
                <span>Foto Ulang</span>
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFlipCapturedPhoto}
                className="px-3.5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-xs"
                title="Balik orientasi foto secara horizontal jika tampak terbalik"
              >
                <FlipHorizontal className="h-4 w-4 text-emerald-600" />
                <span>Balik Foto (Flip)</span>
              </button>

              <button
                type="button"
                disabled={isSubmitting || submitSuccess || !locationValid || !coords}
                onClick={handleFinalSubmit}
                className="flex-1 py-3.5 rounded-2xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Menyimpan Presensi & Foto... ⏳</span>
                  </>
                ) : submitSuccess ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Tersimpan! ✓</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Konfirmasi Presensi Sekarang 🚀</span>
                  </>
                )}
              </button>
            </div>
          )}

          {!locationValid && !isDetectingGps && (
            <p className="text-[11px] text-center text-rose-600 dark:text-rose-400 font-bold">
              ⛔ Presensi terkunci: Anda harus berada di area Smart Grow Lab BTP (Maks. {BTP_GEOFENCE_RADIUS_METERS}m) dan mengizinkan GPS.
            </p>
          )}

          <p className="text-[10px] text-center text-slate-400 font-medium">
            Foto presensi dan titik koordinat GPS aktual tersimpan di cloud database laboratorium.
          </p>
        </div>

      </div>
    </div>
  );
}
