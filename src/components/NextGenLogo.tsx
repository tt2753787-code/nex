import React from 'react';

interface NextGenLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const NextGenLogo: React.FC<NextGenLogoProps> = ({ className = '', size = 'md' }) => {
  const heightClasses = {
    sm: 'h-10 text-xs',
    md: 'h-12 text-sm',
    lg: 'h-14 text-base',
  };

  return (
    <div
      className={`w-full flex items-center justify-between bg-[#111315] border border-[#ffc700]/30 rounded-2xl px-3 py-1.5 select-none shadow-md shadow-black/10 transition-all ${heightClasses[size]} ${className}`}
      dir="ltr"
    >
      {/* Brand Icon & Typography */}
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Orange rounded container with modern stylized logistics arrow mark */}
        <div
          className="w-8 h-8 sm:w-9 sm:h-9 bg-[#ffc700] rounded-xl flex items-center justify-center shrink-0 shadow-sm"
          title="NEXT GEN Logistics"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-[#111315] fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.5 3.5L4 12l8.5 8.5 2.5-2.5L9 12l6-6-2.5-2.5z" opacity="0.4" />
            <path d="M18.5 3.5L10 12l8.5 8.5 2.5-2.5L15 12l6-6-2.5-2.5z" />
            <circle cx="5" cy="5" r="2.2" />
          </svg>
        </div>

        {/* Brand Typography */}
        <div className="flex flex-col text-left leading-none tracking-tight">
          <span className="font-black text-white tracking-wider text-[15px] sm:text-[16px]">
            NEXT GEN
          </span>
          <span className="font-extrabold text-[#ffc700] text-[9px] sm:text-[10px] tracking-widest uppercase mt-0.5">
            LOGISTICS MAROC
          </span>
        </div>
      </div>

      {/* Elongated Middle Span / National Fleet Tagline reaching to notifications icon */}
      <div className="flex items-center gap-2 pl-2">
        <div className="hidden xs:flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1 rounded-lg" dir="rtl">
          <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] animate-pulse"></span>
          <span className="text-[11px] font-bold text-white/90 whitespace-nowrap">
            اللوجستيك الوطني
          </span>
        </div>

        {/* Luxury speed dashes */}
        <div className="flex items-center gap-1 opacity-80">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffc700]"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
          <span className="w-3 sm:w-6 h-1 rounded-full bg-[#ffc700]/40"></span>
        </div>
      </div>
    </div>
  );
};
