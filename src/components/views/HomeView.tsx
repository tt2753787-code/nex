import React, { useState } from 'react';
import { TabId, UserRole } from '../../data/types.ts';
import { ASSETS } from '../../data/assets.ts';

interface HomeViewProps {
  onNavigate: (tab: TabId, trackingNumber?: string) => void;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onShowToast: (msg: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  activeRole,
  onRoleChange,
  onShowToast,
}) => {
  const [trackingInput, setTrackingInput] = useState('TRK-MA-2026-000001');
  const [isHighlighted, setIsHighlighted] = useState(false);

  const handleSearchTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingInput.trim()) {
      onShowToast('المرجو إدخال كود التتبع');
      return;
    }
    onNavigate('al-tatabbu', trackingInput.trim());
  };

  const handleHighlight = () => {
    setIsHighlighted(true);
    setTimeout(() => setIsHighlighted(false), 800);
    onShowToast('تم تحديد شحنتك المباشرة وموضع الشاحنة الحالية');
  };

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 gap-4">
      {/* Role Switcher Pill Bar */}
      <section className="w-full flex items-center justify-between bg-[#e5e8ef] p-1.5 rounded-2xl shadow-inner border border-[#e0e2e9]">
        <button
          className={`role-pill flex-1 py-2 rounded-xl font-semibold text-[13px] transition-all text-center ${
            activeRole === 'client'
              ? 'bg-white text-[#181c21] shadow-xs font-bold'
              : 'text-[#5d5e61] hover:text-[#181c21]'
          }`}
          onClick={() => {
            onRoleChange('client');
            onShowToast('تم التبديل إلى وضع الزبون (Client)');
          }}
          type="button"
        >
          زبون (Client)
        </button>
        <button
          className={`role-pill flex-1 py-2 rounded-xl font-semibold text-[13px] transition-all text-center ${
            activeRole === 'driver'
              ? 'bg-white text-[#181c21] shadow-xs font-bold'
              : 'text-[#5d5e61] hover:text-[#181c21]'
          }`}
          onClick={() => {
            onRoleChange('driver');
            onShowToast('تم التبديل إلى وضع السائق (Chauffeur)');
          }}
          type="button"
        >
          سائق (Chauffeur)
        </button>
        <button
          className={`role-pill flex-1 py-2 rounded-xl font-semibold text-[13px] transition-all text-center ${
            activeRole === 'admin'
              ? 'bg-white text-[#181c21] shadow-xs font-bold'
              : 'text-[#5d5e61] hover:text-[#181c21]'
          }`}
          onClick={() => {
            onRoleChange('admin');
            onShowToast('تم التبديل إلى وضع الإدارة والأسطول (Admin)');
          }}
          type="button"
        >
          إدارة (Admin)
        </button>
      </section>

      {/* Hero Welcome Card */}
      <section className="relative w-full rounded-2xl overflow-hidden bg-white p-5 shadow-sm border border-[#e5e8ef] flex flex-col gap-3.5">
        <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#ffc700]/15 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-8 -right-8 w-36 h-36 rounded-full bg-[#58e7ab]/20 blur-xl pointer-events-none"></div>

        {/* Top Moroccan Network Badge + Direct WhatsApp Button (0649600070 - number hidden, icon only) */}
        <div className="flex items-center gap-2 z-10">
          <a
            href="https://wa.me/212649600070"
            target="_blank"
            rel="noopener noreferrer"
            title="تواصل مباشر عبر واتساب"
            aria-label="واتساب"
            className="w-9 h-9 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform shrink-0"
          >
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.031 0C5.397 0 .015 5.382.015 12.016c0 2.121.553 4.191 1.606 6.014L.06 24l6.126-1.608a11.97 11.97 0 0 0 5.845 1.514h.005c6.634 0 12.016-5.382 12.016-12.016A12.016 12.016 0 0 0 12.031 0zm-.005 21.905h-.004a9.96 9.96 0 0 1-5.076-1.385l-.364-.216-3.771.989 1.006-3.676-.237-.377a9.954 9.954 0 0 1-1.528-5.224c0-5.503 4.478-9.98 9.984-9.98a9.932 9.932 0 0 1 7.057 2.925 9.936 9.936 0 0 1 2.926 7.056c0 5.504-4.478 9.983-9.989 9.983zm5.474-7.473c-.3-.15-1.776-.876-2.051-.976-.275-.1-.476-.15-.676.15s-.776.976-.951 1.176-.35.225-.65.075a8.19 8.19 0 0 1-2.411-1.488 9.043 9.043 0 0 1-1.669-2.079c-.175-.3-.019-.462.131-.611.135-.135.3-.35.45-.525s.2-.3.3-.5a.65.65 0 0 0-.025-.625c-.075-.15-.676-1.628-.926-2.228-.243-.585-.49-.506-.676-.515-.175-.009-.375-.011-.575-.011a1.11 1.11 0 0 0-.801.375c-.275.3-1.051 1.026-1.051 2.502s1.076 2.903 1.226 3.103 2.115 3.23 5.125 4.532c.716.31 1.275.495 1.71.634.719.229 1.373.197 1.89.12.576-.086 1.776-.726 2.026-1.427.25-.701.25-1.302.175-1.427-.075-.125-.275-.2-.575-.35z" />
            </svg>
          </a>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffc700] text-[#181c21] text-[12px] font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#765b00] animate-ping"></span>
            شبكة اللوجستيك الوطنية الأولى
          </span>
        </div>

        {/* Headline & Darija Description */}
        <div className="flex flex-col gap-1.5 z-10">
          <h2 className="text-[21px] font-bold text-[#181c21] tracking-tight leading-snug">
            النقل والتوصيل ديالك بطريقة سهلة وآمنة فالمغرب 🇲🇦
          </h2>
          <p className="text-[14px] text-[#4f4632] leading-relaxed">
            NEXT GEN كتعاونك تصيفط وتنقل السلع ديالك بين المدن المغربية بطريقة منظمة وسهلة وبلا وسيط وبلا صداع راس.
          </p>
        </div>

        {/* Moroccan Inter-City Corridor Badges */}
        <div className="z-10 flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
          {[
            'كازا',
            'طنجة',
            'مراكش',
            'أكادير',
            'فاس',
            'الرباط',
            'وجدة',
            'مكناس',
            'العيون',
          ].map((city) => (
            <span
              key={city}
              className="shrink-0 px-3 py-1 rounded-full bg-[#ebeef5] text-[#4f4632] text-[12px] font-semibold flex items-center gap-1 hover:bg-[#ffc700]/30 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px] text-[#006c49]">near_me</span>
              {city}
            </span>
          ))}
        </div>

        {/* Primary Quick Actions Grid */}
        <div className="grid grid-cols-1 gap-2.5 z-10 pt-1">
          {/* Main Action (Create Order) */}
          <button
            onClick={() => onNavigate('talab-jadid')}
            className="w-full h-14 bg-[#ffc700] hover:bg-[#f5bf00] active:scale-[0.98] text-[#181c21] font-bold text-[17px] rounded-xl shadow-md flex items-center justify-between px-4 transition-all"
            type="button"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                add_circle
              </span>
              <span>صايب طلب جديد</span>
            </div>
            <span className="material-symbols-outlined text-[24px]">local_shipping</span>
          </button>

          {/* Secondary Dual Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => onNavigate('al-tatabbu', 'TRK-MA-2026-000482')}
              className="h-12 bg-[#181c21] hover:bg-black text-white rounded-xl shadow-sm flex items-center justify-center gap-2 px-2 font-bold text-[14px] active:scale-[0.97] transition-transform"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
              <span>تبع السلعة ديالك</span>
            </button>
            <button
              onClick={() => onNavigate('mahami-diyali')}
              className="h-12 bg-[#e5e8ef] hover:bg-[#e0e2e9] text-[#181c21] rounded-xl flex items-center justify-center gap-2 px-2 font-bold text-[14px] transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">account_circle</span>
              <span>دخل للحساب</span>
            </button>
          </div>
        </div>
      </section>

      {/* Direct Tracking Input Field */}
      <section className="w-full bg-white p-4 rounded-2xl shadow-sm border border-[#e5e8ef] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="tracking-num"
            className="font-bold text-[14px] text-[#181c21] flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[20px] text-[#765b00]">search_check</span>
            تتبع فوري بالكود
          </label>
          <span className="text-[12px] font-bold text-[#006c49] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] animate-pulse"></span>
            تحديث مباشر GPS
          </span>
        </div>

        <form onSubmit={handleSearchTracking} className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              id="tracking-num"
              type="text"
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
              placeholder="TRK-MA-2026-000001"
              className="w-full h-12 pr-10 pl-3 bg-[#f1f4fa] text-[#181c21] placeholder:text-[#81765f] font-mono text-[14px] font-bold rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#ffc700] transition-all border border-[#e5e8ef]"
            />
            <span className="material-symbols-outlined absolute right-3 top-3 text-[#5d5e61] pointer-events-none text-[20px]">
              barcode
            </span>
          </div>

          <button
            type="submit"
            className="h-12 px-5 bg-[#181c21] hover:bg-black text-white font-bold text-[14px] rounded-xl flex items-center justify-center gap-1 active:scale-95 transition-transform shrink-0 shadow-sm"
          >
            <span>بحث</span>
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          </button>
        </form>
      </section>

      {/* Live Active Shipment Card (شحنة فطريقها دابا) */}
      <section
        id="live-active-shipment"
        className={`w-full bg-white p-4 rounded-2xl shadow-md border border-[#e5e8ef] flex flex-col gap-3.5 transition-all duration-300 ${
          isHighlighted ? 'ring-4 ring-[#ffc700] scale-[1.01]' : ''
        }`}
      >
        {/* Header of Shipment Card */}
        <div className="flex items-center justify-between pb-1 border-b border-[#f1f4fa]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006c49] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#006c49]"></span>
            </span>
            <span className="font-bold text-[17px] text-[#181c21]">شحنة فطريقها دابا</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#58e7ab]/30 text-[#006544] font-bold text-[12px]">
            فالطريق السريع A1
          </span>
        </div>

        {/* Route Line */}
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center pt-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-[#006c49]"></span>
            <div className="w-0.5 h-11 bg-[#d2c5ab] my-0.5"></div>
            <span className="w-3.5 h-3.5 rounded-full bg-[#ffc700] ring-2 ring-[#765b00]"></span>
          </div>

          <div className="flex-1 flex flex-col justify-between h-18">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-[#5d5e61]">منين تحركات (الإنطلاق)</p>
                <p className="text-[14px] font-bold text-[#181c21]">الدار البيضاء (عين السبع)</p>
              </div>
              <span className="text-[12px] font-semibold text-[#5d5e61] bg-[#f1f4fa] px-2 py-0.5 rounded border border-[#e5e8ef]">
                08:30 صباحاً
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-[11px] text-[#5d5e61]">فين غادية توصل (الوجهة)</p>
                <p className="text-[14px] font-bold text-[#181c21]">طنجة (ميناء طنجة المتوسط)</p>
              </div>
              <span className="text-[12px] font-bold text-[#765b00] bg-[#ffc700]/25 px-2 py-0.5 rounded border border-[#ffc700]/30">
                14:15 متوقعة
              </span>
            </div>
          </div>
        </div>

        {/* Progress & ETA Indicator */}
        <div className="flex flex-col gap-1.5 bg-[#f1f4fa] p-3 rounded-xl border border-[#e5e8ef]">
          <div className="flex items-center justify-between text-[12px]">
            <span className="text-[#181c21] font-semibold">باقي تقريباً 120 كلم (ساعة و 40 دقيقة)</span>
            <span className="text-[#006c49] font-black">68% واصل</span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-[#e0e2e9] overflow-hidden">
            <div
              className="h-full bg-[#006c49] rounded-full transition-all duration-700 ease-out"
              style={{ width: '68%' }}
            ></div>
          </div>
        </div>

        {/* Driver Info & Action Row with AI Avatar */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <img
              src={ASSETS.driverBoushaib}
              alt="السي بوشعيب"
              className="w-11 h-11 rounded-full object-cover shadow-sm border border-[#e0e2e9]"
            />
            <div className="flex flex-col">
              <p className="text-[14px] font-bold text-[#181c21] leading-tight">السي بوشعيب</p>
              <p className="text-[11px] text-[#5d5e61]">شاحنة رونو 14 طن (ماتريكول 26-أ)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onShowToast('تواصل مع السائق عبر تطبيق NEXT GEN 📞')}
              className="w-10 h-10 rounded-full bg-[#ebeef5] hover:bg-[#e0e2e9] flex items-center justify-center text-[#181c21] active:scale-90 transition-all border border-[#e0e2e9]"
              aria-label="اتصال بالسائق"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
            </button>

            <button
              onClick={() => onNavigate('al-tatabbu', 'TRK-MA-2026-000001')}
              className="px-3.5 h-10 rounded-full bg-[#181c21] hover:bg-black text-white text-[13px] font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
              type="button"
            >
              <span>الخريطة</span>
              <span className="material-symbols-outlined text-[16px]">navigation</span>
            </button>
          </div>
        </div>
      </section>

      {/* Statistics Summary Row */}
      <section className="grid grid-cols-3 gap-2.5 w-full">
        <div className="bg-white p-3 rounded-2xl shadow-xs border border-[#e5e8ef] flex flex-col items-center text-center gap-1">
          <div className="w-8 h-8 rounded-full bg-[#ffc700] flex items-center justify-center text-[#181c21]">
            <span className="material-symbols-outlined text-[18px]">domain</span>
          </div>
          <span className="text-[18px] font-bold text-[#181c21] mt-0.5 leading-none">38</span>
          <span className="text-[11px] text-[#5d5e61] font-medium">مدينة مغطية</span>
        </div>

        <div className="bg-white p-3 rounded-2xl shadow-xs border border-[#e5e8ef] flex flex-col items-center text-center gap-1">
          <div className="w-8 h-8 rounded-full bg-[#58e7ab]/30 flex items-center justify-center text-[#006c49]">
            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
          </div>
          <span className="text-[18px] font-bold text-[#181c21] mt-0.5 leading-none">+12,400</span>
          <span className="text-[11px] text-[#5d5e61] font-medium">سلعة موصلة</span>
        </div>

        <div className="bg-white p-3 rounded-2xl shadow-xs border border-[#e5e8ef] flex flex-col items-center text-center gap-1">
          <div className="w-8 h-8 rounded-full bg-[#e2e2e5] flex items-center justify-center text-[#454749]">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
          <span className="text-[18px] font-bold text-[#181c21] mt-0.5 leading-none">99.4%</span>
          <span className="text-[11px] text-[#5d5e61] font-medium">أمان فالوقت</span>
        </div>
      </section>

      {/* Logistics Visual Highlight Banner (NG Branded Luxury Theme) */}
      <section className="relative w-full h-36 rounded-2xl overflow-hidden shadow-sm border border-[#e5e8ef] flex flex-col justify-end p-4 bg-[#111315]">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <span className="font-black text-[120px] text-[#ffc700]">NG</span>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[12px] font-bold text-[#ffdf94]">أسطول متكامل</span>
            <h3 className="text-[18px] font-bold text-white tracking-wide">
              من طنجة للڭويرة فكل وقت
            </h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#ffc700] text-[#181c21] text-[12px] font-black shadow-sm">
            شحن 24/7
          </span>
        </div>
      </section>

      {/* Moroccan Logistics Pro Tip Card (NG Branded) */}
      <section className="w-full bg-[#f1f4fa] p-4 rounded-2xl border border-[#e0e2e9] flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-[#765b00]">
          <span className="material-symbols-outlined text-[22px]">lightbulb</span>
          <h3 className="font-bold text-[15px] text-[#181c21]">نصيحة دالصالون للمرسل الذكي</h3>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-16 h-16 rounded-xl bg-[#111315] text-[#ffc700] border-2 border-[#ffc700] flex items-center justify-center font-black text-lg shrink-0 select-none shadow-sm">
            NG
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <h4 className="text-[13px] font-bold text-[#181c21]">
              كيفاش تصور السلعة بطريقة صحيحة قبل ما تصيفطها؟
            </h4>
            <p className="text-[12px] text-[#4f4632] leading-snug">
              خد 3 تصاور واضحة: وحدة للكرطونة كاملة، وحدة للستيكر ديال الوجهة، ووحدة مع السائق وهو كيشحن لضمان حقك وتفادي أي غلط.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
