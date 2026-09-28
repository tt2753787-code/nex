import React from 'react';
import { TabId } from '../data/types.ts';
import { NextGenLogo } from './NextGenLogo.tsx';

interface HeaderProps {
  activeTab: TabId;
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab: _activeTab,
  unreadCount,
  onOpenNotifications,
  onOpenProfile,
}) => {
  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#f7f9ff]/90 backdrop-blur-xl border-b border-[#e5e8ef] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
      <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-between gap-3">
        {/* Brand without the sub-title (حذف طلب جديد اللي تحت نيكست جن) */}
        <div className="flex items-center gap-3">
          <NextGenLogo size="md" />
        </div>

        {/* Actions (Notifications & Profile) */}
        <div className="flex items-center gap-2">
          {/* Notification Bell */}
          <button
            aria-label="الإشعارات"
            onClick={onOpenNotifications}
            className="relative w-11 h-11 flex items-center justify-center rounded-full text-[#181c21] hover:bg-[#e5e8ef] active:scale-95 transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#ba1a1a] ring-2 ring-[#f7f9ff] animate-pulse"></span>
            )}
          </button>

          {/* Profile Avatar Button with NG badge instead of young man image (حذف صورة الدري الشاب وتعويضها بـ NG) */}
          <button
            onClick={onOpenProfile}
            aria-label="حساب المستخدم"
            className="relative w-10 h-10 flex items-center justify-center rounded-full active:scale-95 transition-transform"
            type="button"
          >
            <div className="w-9 h-9 rounded-full bg-[#181c21] text-[#ffc700] font-black text-[13px] flex items-center justify-center border-2 border-[#ffc700] shadow-sm select-none">
              NG
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#006c49] ring-2 ring-[#f7f9ff]"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
