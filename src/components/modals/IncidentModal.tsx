import React, { useState } from 'react';

interface IncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
  shipmentRef?: string;
}

export const IncidentModal: React.FC<IncidentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  shipmentRef = 'TRK-MA-2026-000482',
}) => {
  const [customNote, setCustomNote] = useState('');

  if (!isOpen) return null;

  const reasons = [
    { label: '🔧 عطب ميكانيكي / رويدة فاشوشة', value: 'عطب ميكانيكي بالشاحنة' },
    { label: '🚦 ازدحام خانق أو حادثة سير قدامي', value: 'ازدحام شديد بالطريق السيار' },
    { label: '📵 الزبون طافي تيليفونو وماكيجاوبش', value: 'تعذر الاتصال بالمستلم' },
    { label: '📦 ملاحظة تلف في التغليف قبل التسليم', value: 'إشعار بسلامة الطرود' },
  ];

  const handleSelect = (reason: string) => {
    const finalNote = customNote.trim() ? `${reason} - ${customNote.trim()}` : reason;
    onSubmit(finalNote);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#111315]/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white w-full max-w-sm rounded-2xl p-4 flex flex-col gap-3.5 shadow-2xl border border-[#e5e8ef]">
        <div className="flex items-center justify-between pb-2 border-b border-[#f1f4fa]">
          <span className="text-[16px] font-bold text-[#ba1a1a] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px]">report</span>
            إشعار بحالة طارئة
          </span>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#181c21] hover:bg-[#e0e2e9]"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-mono text-[#5d5e61]">
            رقم الشحنة: {shipmentRef}
          </span>
          <p className="text-[13px] text-[#4f4632] leading-snug">
            شنو هو المشكل اللي طرا فالطريق؟ غادي نبلغو غرفة العمليات فوراً:
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-1">
          {reasons.map((r, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(r.value)}
              className="p-3 text-right bg-[#f1f4fa] hover:bg-[#ebeef5] rounded-xl font-bold text-[13px] text-[#181c21] active:scale-[0.98] transition-all border border-[#e0e2e9]"
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[11px] text-[#5d5e61] font-semibold">ملاحظة إضافية (اختياري):</label>
          <input
            type="text"
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="مثال: متوقف قرب باحة الاستراحة..."
            className="h-10 px-3 bg-[#f1f4fa] text-[13px] rounded-lg border border-[#e5e8ef] focus:outline-none focus:ring-1 focus:ring-[#ba1a1a]"
          />
        </div>

        <button
          type="button"
          onClick={() => handleSelect(customNote || 'بلاغ عام عن طارئ')}
          className="w-full h-11 bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold text-[13px] rounded-xl shadow-xs active:scale-95 transition-transform"
        >
          إرسال الإشعار لغرفة العمليات
        </button>
      </div>
    </div>
  );
};
