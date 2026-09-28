import React, { useState } from 'react';
import { ASSETS } from '../../data/assets.ts';

interface DriverTasksViewProps {
  onOpenCargoPhoto: (imageUrl: string, title: string) => void;
  onOpenPodModal: () => void;
  onOpenIncidentModal: () => void;
  onShowToast: (msg: string) => void;
}

export const DriverTasksView: React.FC<DriverTasksViewProps> = ({
  onOpenCargoPhoto,
  onOpenPodModal,
  onOpenIncidentModal,
  onShowToast,
}) => {
  const [isOnline, setIsOnline] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'current' | 'pickup' | 'done'>('current');
  const [missionStatus, setMissionStatus] = useState<'pickup' | 'en_route' | 'delivered'>('en_route');
  const [isGpsPinging, setIsGpsPinging] = useState(false);
  const [gpsTimestamp, setGpsTimestamp] = useState('قبل دقيقة واحدة');

  const handleToggleOnline = () => {
    const nextState = !isOnline;
    setIsOnline(nextState);
    if (nextState) {
      onShowToast('أنت الآن متصل ومستعد لتلقي مهام الشحن 🟢');
    } else {
      onShowToast('تم وضع الشاحنة في حالة استراحة (موقف مؤقت) ⏸️');
    }
  };

  const handleSendGpsPing = () => {
    setIsGpsPinging(true);
    onShowToast('جاري إرسال إحداثيات التيليماتيك للإدارة...');
    setTimeout(() => {
      setIsGpsPinging(false);
      setGpsTimestamp('دابا عاد');
      onShowToast('تم تحديث موقع الشاحنة المباشر فالخريطة المركزية 📡');
    }, 750);
  };

  const handleConfirmPickup = () => {
    setMissionStatus('pickup');
    onShowToast('تم تأكيد استلام السلعة وفحص البواليط ✅');
  };

  const handleStartHighway = () => {
    setMissionStatus('en_route');
    onShowToast('تم تسجيل الانطلاق فاللوطوروت نحو طنجة 🚚💨');
  };

  return (
    <div className="flex flex-col w-full pb-32 pt-2 gap-4">
      {/* Driver Header & Quick Status Strip */}
      <div className="px-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-xs border border-[#e5e8ef]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={ASSETS.driverYounes}
                alt="يونس المرابط"
                className="w-14 h-14 rounded-full object-cover shadow-xs border border-[#e0e2e9]"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop';
                }}
              />
              <span
                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                  isOnline ? 'bg-[#006c49]' : 'bg-[#5d5e61]'
                }`}
              ></span>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[17px] font-bold text-[#181c21] truncate">صباح الخير يونس!</span>
                <span
                  className="material-symbols-outlined text-[#765b00] text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
              </div>
              <span className="text-[13px] text-[#5d5e61] truncate">
                عندك 3 مهام مبرمجة اليوم
              </span>
            </div>
          </div>

          {/* Live Status Switcher Pill */}
          <button
            onClick={handleToggleOnline}
            className="flex items-center gap-2 bg-[#f1f4fa] hover:bg-[#e5e8ef] px-3 py-2 rounded-full active:scale-95 transition-all text-right border border-[#e0e2e9]"
            type="button"
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isOnline ? 'bg-[#006c49] animate-pulse' : 'bg-[#5d5e61]'
              }`}
            ></span>
            <span
              className={`text-[12px] font-bold whitespace-nowrap ${
                isOnline ? 'text-[#006c49]' : 'text-[#5d5e61]'
              }`}
            >
              {isOnline ? 'متصل وجاهز' : 'فـ استراحة'}
            </span>
          </button>
        </div>

        {/* Truck Info Capsule */}
        <div className="flex items-center justify-between bg-[#e5e8ef] px-4 py-2.5 rounded-xl text-[#181c21]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#765b00] text-[20px]">
              local_shipping
            </span>
            <span className="text-[13px] font-bold">شاحنة رقم #08 (ميرسيديس - كازا)</span>
          </div>
          <div className="flex items-center gap-1 text-[#4f4632]">
            <span className="material-symbols-outlined text-[16px] text-[#006c49]">sensors</span>
            <span className="text-[11px] font-bold">GPS نشط</span>
          </div>
        </div>
      </div>

      {/* Operational Filter Chips */}
      <div className="px-4 flex gap-2 overflow-x-auto no-scrollbar py-0.5">
        <button
          type="button"
          onClick={() => setActiveFilter('current')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-[12px] whitespace-nowrap transition-all ${
            activeFilter === 'current'
              ? 'bg-[#ffc700] text-[#181c21] shadow-xs'
              : 'bg-[#ebeef5] text-[#5d5e61]'
          }`}
        >
          <span>المهام الحالية</span>
          <span className="w-5 h-5 rounded-full bg-[#181c21] text-white text-[10px] flex items-center justify-center font-bold">
            1
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('pickup')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-[12px] whitespace-nowrap transition-all ${
            activeFilter === 'pickup'
              ? 'bg-[#ffc700] text-[#181c21] shadow-xs'
              : 'bg-[#ebeef5] text-[#5d5e61]'
          }`}
        >
          <span>مهام الاستلام</span>
          <span className="w-5 h-5 rounded-full bg-[#e0e2e9] text-[#181c21] text-[10px] flex items-center justify-center font-bold">
            1
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('done')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-[12px] whitespace-nowrap transition-all ${
            activeFilter === 'done'
              ? 'bg-[#ffc700] text-[#181c21] shadow-xs'
              : 'bg-[#ebeef5] text-[#5d5e61]'
          }`}
        >
          <span>مكتملة اليوم</span>
          <span className="w-5 h-5 rounded-full bg-[#e0e2e9] text-[#181c21] text-[10px] flex items-center justify-center font-bold">
            2
          </span>
        </button>
      </div>

      {/* Main Missions Section */}
      <div className="px-4 flex flex-col gap-4">
        {/* PRIORITY MISSION CARD */}
        <div className="bg-white rounded-2xl shadow-md border border-[#e5e8ef] overflow-hidden flex flex-col">
          {/* Card Banner / Status Header */}
          <div className="bg-[#ffdf94]/40 px-4 py-3 flex items-center justify-between border-b border-[#ffc700]/30">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#765b00] animate-ping"></span>
              <span className="text-[13px] font-bold text-[#594400]">
                السلعة اللي خاصك توصلها دابا
              </span>
            </div>
            <span className="text-[11px] font-mono bg-[#ffc700] text-[#181c21] px-2.5 py-0.5 rounded-full font-black">
              TRK-MA-2026-000482
            </span>
          </div>

          <div className="p-4 flex flex-col gap-3.5">
            {/* Route Visualizer */}
            <div className="flex items-start gap-3 bg-[#f1f4fa] p-3.5 rounded-xl">
              <div className="flex flex-col items-center pt-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-[#006c49]"></span>
                <div className="w-0.5 h-9 bg-[#d2c5ab] my-1"></div>
                <span className="w-3.5 h-3.5 rounded-full bg-[#ffc700] ring-2 ring-[#765b00]"></span>
              </div>
              <div className="flex flex-col justify-between flex-1 gap-2">
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#5d5e61]">منين شحنتي (المغادرة)</span>
                  <span className="text-[15px] text-[#181c21] font-bold">
                    الدار البيضاء - الميناء الجاف
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] text-[#5d5e61]">فين غادية توصل (الوجهة النهائية)</span>
                  <span className="text-[15px] text-[#181c21] font-bold">طنجة بلفيدير</span>
                </div>
              </div>
            </div>

            {/* Cargo Package Summary + Photo Trigger */}
            <div className="flex items-center justify-between p-3 bg-[#ebeef5] rounded-xl border border-[#e0e2e9]">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#765b00] text-[26px]">
                  inventory_2
                </span>
                <div className="flex flex-col">
                  <span className="text-[13px] text-[#181c21] font-bold">8 كراطن متفرقة</span>
                  <span className="text-[12px] text-[#5d5e61]">الوزن الإجمالي: 210 كلغ</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  onOpenCargoPhoto(
                    ASSETS.cargoVanBoxes,
                    'تصويرة حمولة الكراطن (8 قطع) - طنجة'
                  )
                }
                className="px-3 py-2 bg-white hover:bg-[#f1f4fa] text-[#181c21] text-[12px] font-bold rounded-lg shadow-xs flex items-center gap-1.5 active:scale-95 transition-all border border-[#e5e8ef]"
              >
                <span className="material-symbols-outlined text-[16px] text-[#765b00]">
                  photo_camera
                </span>
                <span>تصويرة السلعة</span>
              </button>
            </div>

            {/* Client & Contact Container */}
            <div className="flex items-center justify-between bg-[#f1f4fa] p-3 rounded-xl">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#e2e2e5] flex items-center justify-center text-[#181c21]">
                  <span className="material-symbols-outlined text-[20px]">person</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-[#181c21] font-bold">عثمان</span>
                  <span className="text-[12px] text-[#5d5e61] font-mono" dir="ltr">
                    0662-889911
                  </span>
                </div>
              </div>
              <a
                href="tel:0662889911"
                className="h-11 px-4 bg-[#181c21] hover:bg-black text-white rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span className="text-[13px] font-bold">عيط للزبون</span>
              </a>
            </div>

            {/* Location & Live Route Preview */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-[#181c21] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">
                    pin_drop
                  </span>
                  عنوان التوصيل الدقيق:
                </span>
                <span className="text-[11px] text-[#5d5e61] font-mono">
                  35.7721° N, 5.8032° W
                </span>
              </div>

              <p className="text-[13px] text-[#181c21] bg-[#f1f4fa] p-3 rounded-xl border border-[#e5e8ef] leading-relaxed">
                شارع مولاي يوسف، عمارة 14 (قرب صيدلية البوغاز)، طنجة
              </p>

              {/* Route Map Visual */}
              <div
                className="w-full h-36 bg-cover bg-center rounded-xl shadow-inner relative overflow-hidden flex items-end p-3 border border-[#e5e8ef]"
                style={{ backgroundImage: `url('${ASSETS.mapTangier}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#181c21]/80 via-transparent to-transparent"></div>
                <div className="relative z-10 flex items-center justify-between w-full text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#ffc700] text-[18px]">
                      near_me
                    </span>
                    <span className="text-[12px] font-bold">
                      باقي ليك 18 كلم (حوالي 25 دقيقة)
                    </span>
                  </div>
                  <span className="bg-white/90 text-[#181c21] text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
                    طريق سالكة
                  </span>
                </div>
              </div>

              {/* Primary Navigation Action */}
              <button
                type="button"
                onClick={() =>
                  onShowToast('فتح الملاحة الصوتية المباشرة على Google Maps نحو طنجة... 🧭')
                }
                className="w-full h-14 bg-[#ffc700] hover:bg-[#f5bf00] active:scale-[0.98] text-[#181c21] rounded-xl flex items-center justify-center gap-2 font-bold text-[16px] shadow-md transition-all mt-1"
              >
                <span className="material-symbols-outlined text-[22px]">navigation</span>
                <span>🧭 حل الطريق فـ Google Maps</span>
              </button>
            </div>

            {/* Quick Status Progression Buttons */}
            <div className="flex flex-col gap-2 pt-2 border-t border-[#f1f4fa]">
              <span className="text-[12px] text-[#5d5e61] font-bold">
                تحديث حالة المهمة فوراً:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {/* Pickup Done */}
                <button
                  type="button"
                  onClick={handleConfirmPickup}
                  className={`h-12 rounded-xl flex items-center justify-center gap-1.5 text-[13px] font-bold transition-all border ${
                    missionStatus === 'pickup'
                      ? 'bg-[#006c49] text-white border-[#006c49]'
                      : 'bg-[#f1f4fa] hover:bg-[#e5e8ef] text-[#181c21] border-[#e0e2e9]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">check_box</span>
                  <span>📦 استلمات السلعة</span>
                </button>

                {/* On the Road */}
                <button
                  type="button"
                  onClick={handleStartHighway}
                  className={`h-12 rounded-xl flex items-center justify-center gap-1.5 text-[13px] font-bold transition-all border ${
                    missionStatus === 'en_route'
                      ? 'bg-[#ffc700] text-[#181c21] border-[#765b00]'
                      : 'bg-[#f1f4fa] hover:bg-[#e5e8ef] text-[#181c21] border-[#e0e2e9]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  <span>🚚 فطريقك للمدينة</span>
                </button>
              </div>

              {/* Finish Delivery Trigger (POD) */}
              <button
                type="button"
                onClick={onOpenPodModal}
                className="w-full h-14 bg-[#006c49] hover:bg-[#005236] text-white rounded-xl flex items-center justify-center gap-2 font-bold text-[16px] active:scale-[0.98] shadow-md transition-all"
              >
                <span className="material-symbols-outlined text-[22px]">verified_user</span>
                <span>✅ تم التوصيل وتأكيد الاستلام</span>
              </button>

              {/* Report Problem Button */}
              <button
                type="button"
                onClick={onOpenIncidentModal}
                className="w-full h-11 bg-[#ffdad6] hover:bg-[#ffc5bf] text-[#ba1a1a] rounded-xl flex items-center justify-center gap-1.5 text-[13px] font-bold active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">warning</span>
                <span>⚠️ بلغ على مشكل فالطريق (عطب / تأخير)</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECOND MISSION CARD (NEXT IN LINE) */}
        <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#e5e8ef] flex flex-col gap-2.5 opacity-95">
          <div className="flex items-center justify-between">
            <span className="text-[11px] bg-[#e2e2e5] text-[#181c21] px-2.5 py-1 rounded-full font-bold">
              المهمة الموالية (استلام)
            </span>
            <div className="flex items-center gap-1 text-[#5d5e61] text-[12px] font-semibold">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>الميعاد: 15:00</span>
            </div>
          </div>

          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col">
              <h2 className="text-[15px] font-bold text-[#181c21]">
                جمع سلعة من مستودع عين السبع
              </h2>
              <span className="text-[12px] text-[#5d5e61] leading-relaxed">
                المنطقة الصناعية رقم 2، قبالة رونو، الدار البيضاء
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#f1f4fa] flex items-center justify-center text-[#765b00] shrink-0 border border-[#e5e8ef]">
              <span className="material-symbols-outlined text-[24px]">move_to_inbox</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-[#181c21]">
            <span className="text-[12px] font-bold">الكمية المقدرة: 3 منصات خشبية</span>
            <button
              type="button"
              onClick={() => onShowToast('تفاصيل مهمة عين السبع: استلام 3 منصات متجهة نحو فاس')}
              className="px-3.5 py-1.5 bg-[#ebeef5] hover:bg-[#e0e2e9] rounded-lg text-[12px] font-bold active:scale-95 transition-transform"
            >
              عرض التفاصيل
            </button>
          </div>
        </div>

        {/* Quick Telematics GPS Ping Section */}
        <div className="bg-[#ebeef5] p-3.5 rounded-xl flex items-center justify-between border border-[#e0e2e9] shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#ffc700] text-[#181c21] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">share_location</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#181c21]">إحداثيات الشاحنة المباشرة</span>
              <span className="text-[11px] text-[#5d5e61]">آخر تحديث {gpsTimestamp}</span>
            </div>
          </div>

          <button
            type="button"
            disabled={isGpsPinging}
            onClick={handleSendGpsPing}
            className="h-10 px-3.5 bg-[#181c21] hover:bg-black text-white rounded-xl text-[12px] font-bold flex items-center gap-1 active:scale-95 transition-transform shrink-0"
          >
            {isGpsPinging ? (
              <span>جاري الإرسال...</span>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px] text-[#ffc700]">
                  satellite_alt
                </span>
                <span>تحديث GPS دابا</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
