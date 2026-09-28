import React, { useRef, useState, useEffect, useCallback } from 'react';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageUrl: string, label: string) => void;
  onOpenFallbackFilePicker: () => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture,
  onOpenFallbackFilePicker,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isFlashActive, setIsFlashActive] = useState(false);

  const startCamera = useCallback(async (facing: 'environment' | 'user') => {
    setCameraError(null);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('متصفحك لا يدعم فتح الكاميرا المباشرة، المرجو استخدام ملتقط الصور الأصلي');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facing },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: unknown) {
      console.warn('Camera access issue:', err);
      setCameraError('تعذر فتح الكاميرا المباشرة مباشرة، يمكنك استعمال كاميرا الهاتف عبر الزر أسفله');
    }
  }, [stream]);

  useEffect(() => {
    if (isOpen) {
      startCamera(facingMode);
    } else {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  const handleFlipCamera = () => {
    const nextFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextFacing);
    startCamera(nextFacing);
  };

  const handleCaptureSnapshot = () => {
    if (!videoRef.current) return;

    setIsFlashActive(true);
    setTimeout(() => setIsFlashActive(false), 200);

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);

    onCapture(dataUrl, `صورة الكاميرا (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between animate-in fade-in duration-200"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 z-20 bg-gradient-to-b from-black/80 to-transparent text-white">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffc700] animate-ping"></span>
          <span className="font-bold text-[15px]">الكاميرا المباشرة للسلعة</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleFlipCamera}
            className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center active:scale-90 transition-transform"
            aria-label="قلب الكاميرا"
          >
            <span className="material-symbols-outlined text-[20px]">flip_camera_ios</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center active:scale-90 transition-transform"
            aria-label="إغلاق"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-black">
        {/* Flash Effect Overlay */}
        {isFlashActive && <div className="absolute inset-0 bg-white z-30 pointer-events-none"></div>}

        {cameraError ? (
          <div className="p-6 bg-[#181c21] rounded-2xl max-w-xs text-center border border-white/20 flex flex-col items-center gap-3 text-white">
            <span className="material-symbols-outlined text-[#ffc700] text-[40px]">photo_camera</span>
            <p className="text-[13px] leading-relaxed text-[#d7dae1]">{cameraError}</p>
            <button
              type="button"
              onClick={() => {
                onOpenFallbackFilePicker();
                onClose();
              }}
              className="w-full py-3 bg-[#ffc700] text-[#181c21] font-bold text-[14px] rounded-xl shadow-md active:scale-95 transition-all"
            >
              📸 فتح كاميرا الهاتف الآن
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* Viewfinder Target Reticle */}
            <div className="absolute inset-8 border border-white/30 rounded-2xl pointer-events-none flex flex-col justify-between p-4">
              <div className="flex justify-between">
                <span className="w-5 h-5 border-t-2 border-r-2 border-[#ffc700]"></span>
                <span className="w-5 h-5 border-t-2 border-l-2 border-[#ffc700]"></span>
              </div>
              <div className="self-center bg-black/50 text-[#ffdf94] text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                ضع السلعة وسط الإطار 📦
              </div>
              <div className="flex justify-between">
                <span className="w-5 h-5 border-b-2 border-r-2 border-[#ffc700]"></span>
                <span className="w-5 h-5 border-b-2 border-l-2 border-[#ffc700]"></span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Controls Bar */}
      <div className="p-6 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-around z-20">
        {/* Open Native Camera / Gallery Alternative */}
        <button
          type="button"
          onClick={() => {
            onOpenFallbackFilePicker();
            onClose();
          }}
          className="text-white/80 hover:text-white flex flex-col items-center gap-1 text-[11px] font-bold"
        >
          <span className="material-symbols-outlined text-[26px]">photo_library</span>
          <span>معرض الهاتف</span>
        </button>

        {/* Circular Shutter Button */}
        <button
          type="button"
          onClick={handleCaptureSnapshot}
          disabled={!!cameraError}
          className="w-18 h-18 rounded-full border-4 border-white flex items-center justify-center active:scale-90 transition-transform bg-white/20 p-1 disabled:opacity-50"
          aria-label="التقاط الصورة"
        >
          <div className="w-full h-full rounded-full bg-[#ffc700] hover:bg-[#f5bf00] flex items-center justify-center text-[#181c21] shadow-lg">
            <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              camera
            </span>
          </div>
        </button>

        {/* Cancel */}
        <button
          type="button"
          onClick={onClose}
          className="text-white/80 hover:text-white flex flex-col items-center gap-1 text-[11px] font-bold"
        >
          <span className="material-symbols-outlined text-[26px]">cancel</span>
          <span>إلغاء</span>
        </button>
      </div>
    </div>
  );
};
