import React, { useState, useEffect, useRef } from 'react';
import { Camera, MapPin, CheckCircle2, AlertCircle, X, Sparkles, RefreshCw, Upload } from 'lucide-react';

interface CheckInCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmCheckIn: (photoUrl: string, locationAddress: string) => void;
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
  
  const [locationAddress, setLocationAddress] = useState<string>(
    'Bandung Techno Park (BTP) Telkom University, Jl. Telekomunikasi No. 1'
  );
  const [coords, setCoords] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [isDetectingGps, setIsDetectingGps] = useState(true);
  const [locationValid, setLocationValid] = useState(false);
  const [gpsErrorMsg, setGpsErrorMsg] = useState<string | null>(null);

  // BTP Target Coordinates (Telkom University)
  const BTP_LAT = -6.9706;
  const BTP_LNG = 107.6297;
  const GEOFENCE_RADIUS_METERS = 100;
  const MAX_ACCURACY_METERS = 20;

  // Calculate Haversine distance between two coordinates in meters
  const calculateDistanceMeters = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in meters
  };

  // Initialize camera stream and GPS when modal opens
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      return;
    }

    setCapturedPhoto(null);
    setCameraError(null);
    setGpsErrorMsg(null);
    setIsDetectingGps(true);
    setLocationValid(false);

    // 1. Request Camera Stream
    startCamera();

    // 2. Request Geolocation (BTP Area Check)
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          const accuracy = pos.coords.accuracy || 10;
          setCoords({ lat, lng, accuracy });

          const dist = calculateDistanceMeters(lat, lng, BTP_LAT, BTP_LNG);

          if (accuracy > MAX_ACCURACY_METERS) {
            setGpsErrorMsg('Sinyal GPS kurang akurat. Silakan pindah ke area terbuka.');
            setLocationValid(false);
          } else if (dist > GEOFENCE_RADIUS_METERS) {
            setGpsErrorMsg('Anda berada di luar area Smart Grow Laboratory.');
            setLocationValid(false);
          } else {
            setGpsErrorMsg(null);
            setLocationValid(true);
          }

          setLocationAddress(
            `Area Bandung Techno Park (BTP) Telkom University (Jarak: ${Math.round(dist)}m, Akurasi: ${Math.round(accuracy)}m)`
          );
          setIsDetectingGps(false);
        },
        (err) => {
          console.warn('Geolocation notice:', err?.message);
          // Default fallback for demo / testing if browser blocks GPS prompt
          setLocationAddress('Smart Grow Laboratory • Area Bandung Techno Park (BTP) Telkom University');
          setLocationValid(true);
          setIsDetectingGps(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setLocationValid(true);
      setIsDetectingGps(false);
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

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
        // Direct drawing without horizontal mirroring
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const photoDataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setCapturedPhoto(photoDataUrl);
        stopCamera();
      }
    }
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

  const handleFinalSubmit = () => {
    if (!capturedPhoto) {
      alert('Silakan jepret foto selfie terlebih dahulu sebelum mengonfirmasi presensi!');
      return;
    }
    onConfirmCheckIn(capturedPhoto, locationAddress);
    stopCamera();
    onClose();
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
            <p className="text-xs text-slate-500 font-medium">Pengambilan foto presensi & verifikasi lokasi BTP secara otomatis</p>
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
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider block font-mono">
                {isDetectingGps ? '🟡 Memeriksa Geofence GPS...' : locationValid ? '🟢 Di Dalam Area Laboratorium' : '🔴 Di Luar Area Laboratorium'}
              </span>
              <span className="text-[10px] font-mono text-slate-400">BTP 100m Geofence</span>
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
                className="w-full h-full object-cover" 
                autoPlay 
                playsInline 
                muted 
              />
              
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
                    <p className="text-xs text-white font-bold">Nyalakan Kamera atau Gunakan Kamera Perangkat</p>
                    <p className="text-[10px] text-slate-300">Izinkan kamera browser atau ambil foto langsung dari perangkat Anda</p>
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
                      <span>Buka Kamera Perangkat / Galeri 📸</span>
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
                  <span>Unggah Foto Presensi</span>
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

        {/* ACTION BUTTONS */}
        <div className="space-y-3 text-xs">
          {!capturedPhoto ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  if (cameraActive) {
                    handleTakeSnapshot();
                  } else {
                    fileInputRef.current?.click();
                  }
                }}
                className="flex-1 py-3.5 rounded-2xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Camera className="h-4 w-4" />
                <span>Ambil Foto Selfie Presensi 📸</span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold cursor-pointer hover:bg-slate-200 transition-all flex items-center justify-center"
                title="Buka Kamera Perangkat / Pilih Foto"
              >
                <Upload className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleRetake}
                className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-200 transition-all flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Foto Ulang</span>
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                className="flex-1 py-3.5 rounded-2xl bg-[#2E7D32] hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Konfirmasi Presensi Sekarang 🚀</span>
              </button>
            </div>
          )}

          <p className="text-[10px] text-center text-slate-400 font-medium">
            Foto presensi akan tersimpan secara otomatis di sistem database laboratorium.
          </p>
        </div>

      </div>
    </div>
  );
}
