import React from 'react';
import { UserRole } from '../../data/types.ts';
import { ASSETS } from '../../data/assets.ts';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  activeRole,
  onRoleChange,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#111315]/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col p-5 gap-4 border border-[#e5e8ef]">
        <div className="flex items-center justify-between pb-2 border-b border-[#f1f4fa]">
          <span className="text-[17px] font-bold text-[#181c21]">الملف الشخصي والحساب</span>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#181c21] hover:bg-[#e0e2e9] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* User Card - Now named مصطفى as requested */}
        <div className="flex items-center gap-3.5 p-3.5 bg-[#f1f4fa] rounded-2xl border border-[#e0e2e9]">
          <div className="w-14 h-14 rounded-2xl bg-[#111315] text-[#ffc700] border-2 border-[#ffc700] flex items-center justify-center font-black text-[20px] shadow-sm shrink-0 select-none">
            NG
          </div>
          <div className="flex flex-col">
            <h3 className="text-[16px] font-bold text-[#181c21]">مصطفى</h3>
            <span className="text-[12px] text-[#5d5e61] font-mono">06xxxxxxxx</span>
            <span className="text-[11px] text-[#006c49] font-bold mt-0.5">
              🇲🇦 حساب مغربي موثق (CIN Verified)
            </span>
          </div>
        </div>

        {/* Role Switcher in Profile */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[13px] text-[#5d5e61] font-bold">نوع الحساب النشط:</span>
          <div className="grid grid-cols-3 gap-1.5 bg-[#ebeef5] p-1.5 rounded-xl border border-[#e0e2e9]">
            <button
              type="button"
              onClick={() => onRoleChange('client')}
              className={`py-2 rounded-lg text-[13px] font-bold transition-all ${
                activeRole === 'client' ? 'bg-white text-[#181c21] shadow-xs' : 'text-[#5d5e61]'
              }`}
            >
              زبون
            </button>
            <button
              type="button"
              onClick={() => onRoleChange('driver')}
              className={`py-2 rounded-lg text-[13px] font-bold transition-all ${
                activeRole === 'driver' ? 'bg-white text-[#181c21] shadow-xs' : 'text-[#5d5e61]'
              }`}
            >
              سائق
            </button>
            <button
              type="button"
              onClick={() => onRoleChange('admin')}
              className={`py-2 rounded-lg text-[13px] font-bold transition-all ${
                activeRole === 'admin' ? 'bg-white text-[#181c21] shadow-xs' : 'text-[#5d5e61]'
              }`}
            >
              إدارة
            </button>
          </div>
        </div>

        {/* Quick App Info without any fake numbers */}
        <div className="flex flex-col gap-1.5 pt-1 text-[13px] text-[#5d5e61]">
          <div className="flex justify-between py-1.5 border-b border-[#f1f4fa]">
            <span>نسخة التطبيق:</span>
            <span className="font-mono font-bold text-[#181c21]">v2.6.4 (Atlas Fleet Pro)</span>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#f1f4fa]">
            <span>التغطية الترابية:</span>
            <span className="font-bold text-[#181c21]">كافة أقاليم المملكة المغربية 🇲🇦</span>
          </div>
          <div className="flex justify-between py-1.5">
            <span>مركز الدعم والتواصل:</span>
            <span className="font-bold text-[#006c49]">عبر واتساب المعتمد</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full h-12 bg-[#181c21] hover:bg-black text-white font-bold text-[14px] rounded-xl active:scale-98 transition-transform shadow-sm"
        >
          تم، إغلاق
        </button>
      </div>
    </div>
  );
};
