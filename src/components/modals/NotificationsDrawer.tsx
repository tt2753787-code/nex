import React from 'react';
import { NotificationItem } from '../../data/types.ts';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onSelectNotification: (item: NotificationItem) => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onSelectNotification,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#111315]/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col p-4 gap-3 border border-[#e5e8ef] max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-[#f1f4fa]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#765b00] text-[24px]">
              notifications
            </span>
            <span className="text-[17px] font-bold text-[#181c21]">
              الإشعارات واللوجستيك
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-[11px] font-bold text-[#765b00] hover:underline"
              type="button"
            >
              تعليم الكل كمقروء
            </button>
            <button
              onClick={onClose}
              aria-label="إغلاق"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#181c21] hover:bg-[#e0e2e9]"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-2 pt-1">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                onSelectNotification(notif);
                onClose();
              }}
              className={`p-3 rounded-xl flex flex-col gap-1 cursor-pointer transition-all border ${
                notif.read
                  ? 'bg-white border-[#e5e8ef]'
                  : 'bg-[#ffdf94]/20 border-[#ffc700]/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[13px] font-bold ${
                    notif.read ? 'text-[#181c21]' : 'text-[#765b00]'
                  }`}
                >
                  {notif.title}
                </span>
                <span className="text-[10px] text-[#5d5e61] font-medium">{notif.time}</span>
              </div>
              <p className="text-[12px] text-[#4f4632] leading-snug">{notif.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
