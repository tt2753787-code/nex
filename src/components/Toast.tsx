import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-300 transform opacity-100 translate-y-0 max-w-[90vw]">
      <div className="bg-[#181c21] text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-white/20 backdrop-blur-md">
        <span className="material-symbols-outlined text-[#ffc700] text-[20px]">
          check_circle
        </span>
        <span className="text-[13px] font-bold tracking-wide">{message}</span>
      </div>
    </div>
  );
};
