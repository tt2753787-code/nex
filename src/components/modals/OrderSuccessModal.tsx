import React from 'react';
import { Shipment } from '../../data/types.ts';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: Shipment | null;
  onTrackOrder: (trackingNumber: string) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  shipment,
  onTrackOrder,
}) => {
  if (!isOpen || !shipment) return null;

  const whatsappMessage = encodeURIComponent(
    `📦 *طلب نقل وإرسالية جديدة - NEXT GEN LOGISTICS*\n` +
    `----------------------------------------\n` +
    `🔢 *رقم التتبع:* ${shipment.trackingNumber}\n` +
    `👤 *المرسل:* ${shipment.senderName}\n` +
    `📞 *الهاتف:* ${shipment.senderPhone}\n` +
    `📍 *من:* ${shipment.originCity} - ${shipment.originAddress}\n` +
    `🏁 *إلى:* ${shipment.destinationCity}\n` +
    `📦 *السلعة:* ${shipment.goodsType}\n` +
    `📊 *العدد:* ${shipment.packagesCount} طرود | *الوزن:* ${shipment.weightKg} كلغ\n` +
    `💰 *الثمن:* ${shipment.priceDh} درهم TTC\n` +
    `📝 *ملاحظات:* ${shipment.notes || 'لا توجد'}\n` +
    `🗺️ *إحداثيات GPS:* ${shipment.currentCoords.lat}, ${shipment.currentCoords.lng}\n` +
    `----------------------------------------\n` +
    `🚚 تم إرسال الطلب من منصة NEXT GEN اللوجستية.`
  );

  const whatsappUrl = `https://wa.me/212649600070?text=${whatsappMessage}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#111315]/85 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col p-5 gap-4 border border-[#e5e8ef] text-right">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#f1f4fa]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#006c49] animate-ping"></span>
            <span className="text-[17px] font-bold text-[#181c21]">
              تم تسجيل الطلب وإرساله للواتساب!
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="إغلاق"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#181c21] hover:bg-[#e0e2e9] transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tracking Pill & Success Banner */}
        <div className="bg-[#f1f4fa] p-4 rounded-2xl flex flex-col gap-2 border border-[#e5e8ef]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#5d5e61] font-bold">كود التتبع المخصص:</span>
            <span className="text-[11px] bg-[#006c49]/15 text-[#006c49] font-bold px-2.5 py-0.5 rounded-full">
              مؤكد ومسجل ✓
            </span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#e0e2e9] flex items-center justify-between font-mono font-black text-[16px] text-[#181c21]">
            <span>{shipment.trackingNumber}</span>
            <span className="material-symbols-outlined text-[#765b00]">qr_code_2</span>
          </div>
        </div>

        {/* Summary Details */}
        <div className="flex flex-col gap-1.5 text-[13px] bg-[#ebeef5]/60 p-3.5 rounded-xl border border-[#e0e2e9]">
          <div className="flex justify-between py-1 border-b border-white/60">
            <span className="text-[#5d5e61]">المرسل:</span>
            <span className="font-bold text-[#181c21]">{shipment.senderName} ({shipment.senderPhone})</span>
          </div>
          <div className="flex justify-between py-1 border-b border-white/60">
            <span className="text-[#5d5e61]">مسار الشحنة:</span>
            <span className="font-bold text-[#181c21]">{shipment.originCity} ← {shipment.destinationCity}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-white/60">
            <span className="text-[#5d5e61]">تفاصيل السلعة:</span>
            <span className="font-bold text-[#181c21]">{shipment.goodsType} ({shipment.packagesCount} طرود / {shipment.weightKg} كلغ)</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[#5d5e61]">الثمن التقديري:</span>
            <span className="font-extrabold text-[#765b00]">{shipment.priceDh} درهم TTC</span>
          </div>
        </div>

        {/* Direct WhatsApp Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-[15px] rounded-xl flex items-center justify-center gap-2.5 shadow-lg active:scale-98 transition-all"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.031 0C5.397 0 .015 5.382.015 12.016c0 2.121.553 4.191 1.606 6.014L.06 24l6.126-1.608a11.97 11.97 0 0 0 5.845 1.514h.005c6.634 0 12.016-5.382 12.016-12.016A12.016 12.016 0 0 0 12.031 0zm-.005 21.905h-.004a9.96 9.96 0 0 1-5.076-1.385l-.364-.216-3.771.989 1.006-3.676-.237-.377a9.954 9.954 0 0 1-1.528-5.224c0-5.503 4.478-9.98 9.984-9.98a9.932 9.932 0 0 1 7.057 2.925 9.936 9.936 0 0 1 2.926 7.056c0 5.504-4.478 9.983-9.989 9.983zm5.474-7.473c-.3-.15-1.776-.876-2.051-.976-.275-.1-.476-.15-.676.15s-.776.976-.951 1.176-.35.225-.65.075a8.19 8.19 0 0 1-2.411-1.488 9.043 9.043 0 0 1-1.669-2.079c-.175-.3-.019-.462.131-.611.135-.135.3-.35.45-.525s.2-.3.3-.5a.65.65 0 0 0-.025-.625c-.075-.15-.676-1.628-.926-2.228-.243-.585-.49-.506-.676-.515-.175-.009-.375-.011-.575-.011a1.11 1.11 0 0 0-.801.375c-.275.3-1.051 1.026-1.051 2.502s1.076 2.903 1.226 3.103 2.115 3.23 5.125 4.532c.716.31 1.275.495 1.71.634.719.229 1.373.197 1.89.12.576-.086 1.776-.726 2.026-1.427.25-.701.25-1.302.175-1.427-.075-.125-.275-.2-.575-.35z" />
          </svg>
          <span>فتح واتساب الآن وتأكيد الإرسالية (0649600070)</span>
        </a>

        {/* View on Map Button */}
        <button
          type="button"
          onClick={() => {
            onClose();
            onTrackOrder(shipment.trackingNumber);
          }}
          className="w-full h-12 bg-[#181c21] hover:bg-black text-white font-bold text-[14px] rounded-xl flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <span className="material-symbols-outlined text-[20px] text-[#ffc700]">local_shipping</span>
          <span>تتبع الشاحنة وموقع السلعة فالخريطة 🗺️</span>
        </button>
      </div>
    </div>
  );
};
