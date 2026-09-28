import React, { useRef, useState, useEffect } from 'react';

interface PodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  recipientName?: string;
}

export const PodModal: React.FC<PodModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  recipientName = 'عثمان',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#181c21';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasSignature(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#111315]/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col p-4 gap-3.5 border border-[#e5e8ef] max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-[#f1f4fa]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006c49] text-[26px]">
              task_alt
            </span>
            <span className="text-[17px] font-bold text-[#181c21]">
              إثبات تسليم السلعة (POD)
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#181c21] hover:bg-[#e0e2e9]"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <p className="text-[13px] text-[#5d5e61] leading-relaxed">
          المرجو أخذ صورة للسلعة بعد إنزالها وتوقيع الزبون على الشاشة للتأكيد القانوني.
        </p>

        {/* Action Dual Blocks */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setHasPhoto(!hasPhoto)}
            className={`h-24 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-all border ${
              hasPhoto
                ? 'bg-[#006c49]/10 border-[#006c49] text-[#006c49]'
                : 'bg-[#f1f4fa] border-[#e0e2e9] text-[#181c21] hover:bg-[#ebeef5]'
            }`}
          >
            <span className="material-symbols-outlined text-[26px]">
              {hasPhoto ? 'check_circle' : 'add_a_photo'}
            </span>
            <span className="text-[12px] font-bold">
              {hasPhoto ? 'تم توثيق الصورة ✓' : 'تصوير البون والسلعة'}
            </span>
          </button>

          <div className="h-24 bg-[#f1f4fa] border border-[#e0e2e9] rounded-xl flex flex-col items-center justify-center gap-1 text-[#181c21] p-2 text-center">
            <span className="material-symbols-outlined text-[#006c49] text-[24px]">
              draw
            </span>
            <span className="text-[12px] font-bold">توقيع المستلم أسفله</span>
            <span className="text-[10px] text-[#5d5e61]">بإصبع اليد على الشاشة</span>
          </div>
        </div>

        {/* Interactive Signature Area */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-[#181c21] font-bold">
              مساحة التوقيع الرقمي للزبون ({recipientName}):
            </span>
            {hasSignature && (
              <button
                type="button"
                onClick={clearSignature}
                className="text-[#ba1a1a] hover:underline text-[11px] font-semibold"
              >
                مسح التوقيع
              </button>
            )}
          </div>

          <div className="relative w-full h-28 bg-[#f1f4fa] rounded-xl border border-dashed border-[#81765f]/50 overflow-hidden touch-none flex items-center justify-center">
            {!hasSignature && (
              <span className="absolute text-[#81765f] text-[12px] pointer-events-none select-none font-medium">
                ارسم التوقيع هنا ✍️
              </span>
            )}
            <canvas
              ref={canvasRef}
              width={380}
              height={112}
              className="w-full h-full cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
        </div>

        {/* Confirm Primary */}
        <button
          type="button"
          onClick={onConfirm}
          className="w-full h-14 bg-[#006c49] hover:bg-[#005236] text-white font-bold text-[16px] rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all mt-1"
        >
          <span className="material-symbols-outlined text-[22px]">verified</span>
          <span>تأكيد التسليم النهائي دابا</span>
        </button>
      </div>
    </div>
  );
};
