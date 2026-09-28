import React from 'react';

interface NextGenLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const NextGenLogo: React.FC<NextGenLogoProps> = ({ className = '', size = 'md' }) => {
  const heightClasses = {
    sm: 'h-8 text-xs',
    md: 'h-9 text-sm',
    lg: 'h-11 text-base',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-8 h-8',
  };

  return (
    <div
      className={`inline-flex items-center bg-[#111315] border border-white/10 rounded-xl px-2 py-1 gap-2 select-none shadow-sm ${heightClasses[size]} ${className}`}
      dir="ltr"
    >
      {/* Orange rounded container with NEW modern stylized logistics speed arrow icon */}
      <div
        className={`${iconSizes[size]} bg-[#ffc700] rounded-lg flex items-center justify-center shrink-0 shadow-sm`}
        title="NEXT GEN Logistics"
      >
        {/* Modern stylized logistics arrow with speed dynamic bars */}
        <svg
          viewBox="0 0 24 24"
          className="w-[72%] h-[72%] text-[#111315] fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dynamic forward logistics chevron with speed energy bar */}
          <path d="M12.5 3.5L4 12l8.5 8.5 2.5-2.5L9 12l6-6-2.5-2.5z" opacity="0.4" />
          <path d="M18.5 3.5L10 12l8.5 8.5 2.5-2.5L15 12l6-6-2.5-2.5z" />
          <circle cx="5" cy="5" r="2.2" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col text-left leading-none tracking-tight">
        <span className="font-black text-white tracking-wider text-[13px]">
          NEXT GEN
        </span>
        <span className="font-bold text-[#ffc700] text-[8.5px] tracking-widest uppercase">
          LOGISTICS MAROC
        </span>
      </div>
    </div>
  );
};
