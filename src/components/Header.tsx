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
    <header className="fixed top-0 w-full z-40 pt-safe bg-[#f7f9ff]/95 backdrop-blur-xl border-b border-[#e5e8ef] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="max-w-2xl mx-auto h-16 px-3 flex items-center justify-between gap-2">
        {/* Full-width logo spanning across the header to the notifications icon */}
        <div className="flex-1 flex items-center min-w-0 pr-1">
          <NextGenLogo size="md" className="w-full justify-between" />
        </div>

        {/* Actions (Notifications & Profile) */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Notification Bell */}
          <button
            aria-label="الإشعارات"
            onClick={onOpenNotifications}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-[#e5e8ef] text-[#181c21] hover:bg-[#e5e8ef] active:scale-95 transition-all shadow-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#ba1a1a] ring-2 ring-white animate-pulse"></span>
            )}
          </button>

          {/* Profile Avatar Button with NG badge */}
          <button
            onClick={onOpenProfile}
            aria-label="حساب المستخدم"
            className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-[#111315] text-[#ffc700] border border-[#ffc700]/50 active:scale-95 transition-transform shadow-xs"
            type="button"
          >
            <span className="font-black text-[13px] tracking-wider select-none">
              NG
            </span>
            <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#006c49] ring-1 ring-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
