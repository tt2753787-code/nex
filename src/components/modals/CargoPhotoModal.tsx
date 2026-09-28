import React from 'react';
import { ASSETS } from '../../data/assets.ts';

interface CargoPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  title?: string;
}

export const CargoPhotoModal: React.FC<CargoPhotoModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title = 'تصويرة حمولة الكراطن (8 قطع)',
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#111315]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-[#e5e8ef]">
        <div className="p-4 flex items-center justify-between bg-[#f1f4fa] border-b border-[#e5e8ef]">
          <span className="font-bold text-[15px] text-[#181c21] truncate">{title}</span>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#181c21] hover:bg-[#e0e2e9] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-4 flex flex-col gap-3">
          <div className="w-full h-64 rounded-xl overflow-hidden bg-[#ebeef5] shadow-inner relative">
            <img
              src={imageUrl || ASSETS.cargoVanBoxes}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = ASSETS.warehouseBoxes;
              }}
            />
          </div>

          <p className="text-[13px] text-[#5d5e61] leading-relaxed">
            تم التقاط الصورة عند نقطة الشحن من مستودع كازا لضمان سلامة التغليف قبل الإنطلاق.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="w-full h-12 bg-[#ffc700] hover:bg-[#f5bf00] text-[#181c21] font-bold text-[14px] rounded-xl active:scale-98 transition-transform shadow-xs"
          >
            واضح، رجوع للمهام
          </button>
        </div>
      </div>
    </div>
  );
};
