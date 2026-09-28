import React, { useState } from 'react';
import { Shipment } from '../../data/types.ts';
import { ASSETS } from '../../data/assets.ts';

interface TrackingViewProps {
  shipments: Shipment[];
  activeTrackingNumber: string;
  onSearchTracking: (trk: string) => void;
  onOpenCargoPhoto: (imageUrl: string, label: string) => void;
  onOpenIncidentModal: (shipment: Shipment) => void;
  onShowToast: (msg: string) => void;
}

export const TrackingView: React.FC<TrackingViewProps> = ({
  shipments,
  activeTrackingNumber,
  onSearchTracking,
  onOpenCargoPhoto,
  onOpenIncidentModal,
  onShowToast,
}) => {
  const [searchInput, setSearchInput] = useState(
    activeTrackingNumber || 'TRK-MA-2026-000482'
  );

  // Find matching shipment or fall back to default
  const currentShipment =
    shipments.find((s) => s.trackingNumber.trim() === (activeTrackingNumber || searchInput).trim()) ||
    shipments[0];

  const [selectedCheckpoint, setSelectedCheckpoint] = useState<string>('larache');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedKm, setSimulatedKm] = useState(currentShipment.remainingDistanceKm);

  // Checkpoints data
  const CHECKPOINTS = [
    { id: 'casa', name: 'كازا (المغادرة)', status: 'انطلقت 09:15', top: '78%', left: '18%', icon: 'inventory_2' },
    { id: 'rabat', name: 'الرباط (بوزنيقة)', status: 'عبرت 10:45', top: '60%', left: '38%', icon: 'done' },
    { id: 'kenitra', name: 'القنيطرة', status: 'عبرت 11:20', top: '48%', left: '50%', icon: 'done' },
    { id: 'larache', name: 'العرائش (الموقع الحالي)', status: 'فالطريق (86 كم/س)', top: '38%', left: '64%', icon: 'local_shipping', active: true },
    { id: 'asilah', name: 'أصيلة (القادمة)', status: 'متوقعة 16:30', top: '24%', left: '76%', icon: 'schedule' },
    { id: 'tanger', name: 'طنجة (الوصول)', status: 'متوقعة 17:30', top: '12%', left: '88%', icon: 'flag' },
  ];

  const handleToggleSimulation = () => {
    if (!isSimulating) {
      setIsSimulating(true);
      onShowToast('تم تشغيل محاكاة تتبع حركة الشاحنة الحية عبر GPS 🛰️');
      const interval = setInterval(() => {
        setSimulatedKm((prev) => {
          if (prev <= 10) {
            clearInterval(interval);
            setIsSimulating(false);
            onShowToast('وصلت الشاحنة إلى مشارف مدينة الوصول! 🏁');
            return 5;
          }
          return prev - 8;
        });
      }, 1500);
    } else {
      setIsSimulating(false);
      onShowToast('تم إيقاف المحاكاة الحية');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onSearchTracking(searchInput.trim());
    onShowToast(`جاري تتبع الشحنة وموقع الشاحنة ${searchInput.trim()}...`);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-32 pt-2 gap-4">
      {/* Search & Tracking Bar */}
      <section className="w-full bg-white p-3.5 rounded-2xl shadow-xs border border-[#e5e8ef]">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <span className="material-symbols-outlined text-[#81765f] absolute right-3 pointer-events-none text-[20px]">
              barcode_scanner
            </span>
            <input
              type="text"
              aria-label="رقم التتبع"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="دخل كود التتبع هنا..."
              className="w-full bg-[#f1f4fa] text-[#181c21] font-mono text-[14px] font-bold h-12 pr-10 pl-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#ffc700] focus:outline-none transition-all border border-[#e5e8ef]"
            />
          </div>
          <button
            type="submit"
            className="h-12 px-4 bg-[#ffc700] hover:bg-[#f5bf00] active:scale-95 text-[#181c21] font-bold text-[14px] rounded-xl flex items-center gap-1 shadow-xs transition-transform shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
            <span>بحث</span>
          </button>
        </form>
      </section>

      {/* High-Priority Alert Strip */}
      <section className="w-full bg-[#ffdf94]/40 p-3.5 rounded-2xl flex items-center justify-between border border-[#ffc700]/30 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="flex relative h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#765b00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#765b00]"></span>
          </span>
          <span className="font-bold text-[13px] text-[#594400]">
            تحديث حي ومباشر لتمركز الشاحنة والسلعة
          </span>
        </div>
        <span className="text-[11px] font-semibold text-[#5d5e61] bg-white px-2.5 py-0.5 rounded-full shadow-xs border border-[#e5e8ef]">
          دابا عاد
        </span>
      </section>

      {/* Primary Shipment Summary Card */}
      <section className="bg-white p-4 rounded-2xl shadow-md border border-[#e5e8ef] flex flex-col gap-3.5">
        {/* Top Badges */}
        <div className="flex items-start justify-between gap-2 border-b border-[#f1f4fa] pb-2">
          <div>
            <span className="text-[11px] text-[#5d5e61] block">رقم الإرسالية (Référence)</span>
            <span className="text-[17px] text-[#181c21] font-mono font-bold tracking-wider">
              {currentShipment.trackingNumber}
            </span>
          </div>

          {/* Live Status Pill */}
          <div className="flex items-center gap-1.5 bg-[#ffc700]/25 text-[#181c21] px-3 py-1.5 rounded-full shadow-xs border border-[#ffc700]/30">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffc700] animate-pulse"></span>
            <span className="text-[12px] font-bold">{currentShipment.statusLabel}</span>
          </div>
        </div>

        {/* Departure & Destination Visual Line */}
        <div className="bg-[#f1f4fa] p-3.5 rounded-2xl border border-[#e5e8ef]">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center pt-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#006c49]"></span>
              <span className="w-0.5 h-10 bg-[#e0e2e9] my-1"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#ffc700] ring-2 ring-[#765b00]"></span>
            </div>

            <div className="flex-1 flex flex-col justify-between space-y-2">
              <div>
                <span className="text-[11px] text-[#006c49] font-bold block">منين تشحنات</span>
                <p className="text-[15px] font-bold text-[#181c21]">
                  {currentShipment.originCity}{' '}
                  <span className="text-[12px] text-[#5d5e61] font-normal">
                    ({currentShipment.originAddress.split('،')[0]})
                  </span>
                </p>
              </div>

              <div>
                <span className="text-[11px] text-[#765b00] font-bold block">فين غادية توصل</span>
                <p className="text-[15px] font-bold text-[#181c21]">
                  {currentShipment.destinationCity}{' '}
                  <span className="text-[12px] text-[#5d5e61] font-normal">
                    ({currentShipment.destinationAddress.split('،')[0]})
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-[#e5e8ef]">
            <div className="flex items-center gap-1.5 text-[#5d5e61]">
              <span className="material-symbols-outlined text-[#765b00] text-[18px]">
                schedule
              </span>
              <span className="text-[12px] font-medium">التقدير ديال الوصول:</span>
            </div>
            <span className="text-[13px] text-[#765b00] font-bold">
              {currentShipment.estimatedDelivery}
            </span>
          </div>
        </div>

        {/* Sender Info without phone numbers */}
        <div className="flex items-center justify-between text-[#5d5e61] px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#5d5e61] text-[20px]">person_pin</span>
            <span className="text-[13px] text-[#181c21]">
              زبون: <strong className="font-bold">{currentShipment.senderName}</strong>
            </span>
          </div>
          <span className="text-[12px] text-[#5d5e61] font-mono bg-[#f1f4fa] px-2.5 py-1 rounded-full border border-[#e5e8ef]">
            {currentShipment.senderPhone}
          </span>
        </div>

        {/* Driver Assignment Card with AI Avatar */}
        {currentShipment.driver && (
          <div className="bg-[#ebeef5]/60 p-3 rounded-2xl flex items-center justify-between gap-3 border border-[#e0e2e9]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-white shadow-sm border border-[#d2c5ab]">
                <img
                  src={currentShipment.driver.avatar}
                  alt={currentShipment.driver.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#006c49] ring-2 ring-white"></span>
              </div>
              <div className="min-w-0">
                <span className="text-[11px] text-[#5d5e61] block leading-tight">السائق المكلف</span>
                <h3 className="text-[15px] font-bold text-[#181c21] truncate">
                  {currentShipment.driver.name}
                </h3>
                <p className="text-[11px] text-[#5d5e61] truncate font-mono">
                  {currentShipment.driver.truckModel} | {currentShipment.driver.matricule}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => onShowToast(`التواصل مع السائق ${currentShipment.driver?.name} عبر المنصة 📞`)}
                aria-label="اتصال بالسائق"
                className="w-10 h-10 rounded-xl bg-[#181c21] hover:bg-black text-white flex items-center justify-center shadow-xs active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">phone</span>
              </button>
              <button
                type="button"
                onClick={() => onShowToast(`فتح قناة الدردشة السريعة مع ${currentShipment.driver?.name} 💬`)}
                aria-label="مراسلة سريعة"
                className="w-10 h-10 rounded-xl bg-[#e5e8ef] hover:bg-[#e0e2e9] text-[#181c21] flex items-center justify-center active:scale-90 transition-transform border border-[#e0e2e9]"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Live GPS Road Map Simulation with Real Truck Position & Road Path */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#765b00]">navigation</span>
            <h2 className="text-[15px] font-bold text-[#181c21]">
              موقع وتمركز الشاحنة فالطريق ({currentShipment.currentRoadText})
            </h2>
          </div>
          <span className="text-[11px] text-[#5d5e61] font-mono">
            {currentShipment.currentCoords.lat}, {currentShipment.currentCoords.lng}
          </span>
        </div>

        {/* Map Viewport */}
        <div className="relative w-full h-76 rounded-2xl overflow-hidden shadow-md border border-[#e5e8ef] bg-[#e5e8ef]">
          {/* Moroccan Road Canvas Map */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('${ASSETS.mapLarache}')` }}
          >
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#181c21]/85 via-transparent to-[#181c21]/20"></div>
          </div>

          {/* Highway Route Line Layer */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 288"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Upcoming route dashed */}
            <path
              d="M 40,250 C 90,220 120,180 170,160 C 230,135 280,100 360,35"
              stroke="#765b00"
              strokeWidth="5"
              strokeDasharray="6 6"
              strokeLinecap="round"
              opacity="0.7"
            />
            {/* Covered route solid green */}
            <path
              d="M 40,250 C 90,220 120,180 170,160 C 230,135 250,115 265,108"
              stroke="#006c49"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Waypoint Casa */}
            <circle cx="40" cy="250" r="6" fill="#006c49" />
            {/* Waypoint Rabat */}
            <circle cx="140" cy="175" r="4.5" fill="#5d5e61" />
            {/* Waypoint Tangier */}
            <circle cx="360" cy="35" r="7" fill="#ffc700" stroke="#181c21" strokeWidth="2" />
          </svg>

          {/* Real Live Moving Truck Marker with precise spot */}
          <div className="absolute top-[38%] left-[64%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-[#ffc700] opacity-60"></span>
              <div className="relative w-11 h-11 bg-[#181c21] text-[#ffc700] rounded-full flex items-center justify-center shadow-xl ring-2 ring-white">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_shipping
                </span>
              </div>
            </div>
            <div className="mt-1 bg-[#181c21]/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md backdrop-blur-sm whitespace-nowrap border border-white/10">
              الشاحنة هنا: فاللوطوروت قريبة للعرائش (86 كم/س)
            </div>
          </div>

          {/* Waypoint: Starting Depot in Casablanca */}
          <div className="absolute bottom-[14%] right-[8%] flex flex-col items-center">
            <span className="bg-[#006c49] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow">
              الانطلاق 📦
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#006c49] ring-2 ring-white mt-0.5"></span>
          </div>

          {/* Waypoint: Arrival in Tangier */}
          <div className="absolute top-[10%] left-[8%] flex flex-col items-center">
            <span className="bg-[#ffc700] text-[#181c21] text-[9px] font-black px-1.5 py-0.5 rounded-full shadow">
              الوصول طنجة 🏁
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffc700] ring-2 ring-white mt-0.5"></span>
          </div>

          {/* Quick Floating Telematics overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-[#e5e8ef]">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-[#f1f4fa] flex items-center justify-center text-[#765b00] border border-[#e5e8ef]">
                <span className="material-symbols-outlined text-[18px]">near_me</span>
              </span>
              <div>
                <span className="text-[11px] text-[#5d5e61] block leading-tight">المسافة الباقية للشاحنة</span>
                <span className="text-[13px] text-[#181c21] font-bold">
                  {simulatedKm} كلم ({currentShipment.remainingTimeText})
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleToggleSimulation}
                className={`px-3 py-1.5 rounded-xl text-[12px] font-bold flex items-center gap-1 transition-all shadow-xs ${
                  isSimulating
                    ? 'bg-[#006c49] text-white animate-pulse'
                    : 'bg-[#181c21] hover:bg-black text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isSimulating ? 'motion_photos_on' : 'play_arrow'}
                </span>
                <span>{isSimulating ? 'حركة حية نشطة' : 'محاكاة GPS'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Moroccan Highway Checkpoints Strip */}
        <div className="bg-white p-3 rounded-2xl border border-[#e5e8ef] shadow-xs flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-[#181c21] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#765b00]">pin_drop</span>
              محطات مسار الشاحنة عبر الأوتوروت:
            </span>
            <span className="text-[11px] bg-[#006c49]/15 text-[#006c49] px-2 py-0.5 rounded-full font-bold">
              تحديث مباشر 🛰️
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
            {CHECKPOINTS.map((cp) => {
              const isCurrent = cp.id === selectedCheckpoint;
              return (
                <button
                  key={cp.id}
                  type="button"
                  onClick={() => {
                    setSelectedCheckpoint(cp.id);
                    onShowToast(`${cp.name}: ${cp.status}`);
                  }}
                  className={`p-2 rounded-xl text-center flex flex-col items-center gap-1 transition-all border ${
                    isCurrent
                      ? 'bg-[#ffc700]/30 border-[#ffc700] text-[#181c21] font-black shadow-xs'
                      : 'bg-[#f1f4fa] border-transparent text-[#5d5e61] hover:bg-[#ebeef5]'
                  }`}
                >
                  <span className="text-[11px] font-bold truncate w-full">{cp.name.split(' (')[0]}</span>
                  <span className="text-[9px] font-mono text-[#5d5e61] truncate w-full">{cp.status.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Timeline */}
      <section className="bg-white p-4 rounded-2xl shadow-md border border-[#e5e8ef] flex flex-col gap-3.5">
        <div className="flex items-center justify-between border-b border-[#f1f4fa] pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#765b00]">timeline</span>
            <h2 className="text-[15px] font-bold text-[#181c21]">
              مراحل التوصيل ومسار الشاحنة
            </h2>
          </div>
          <span className="text-[11px] text-[#5d5e61] font-medium">
            {currentShipment.timeline.filter((s) => s.status === 'completed').length} من{' '}
            {currentShipment.timeline.length} مراحل دازو
          </span>
        </div>

        {/* Step List */}
        <div className="space-y-4 pr-1 relative">
          <div className="absolute right-[17px] top-3 bottom-4 w-0.5 bg-[#e5e8ef]"></div>

          {currentShipment.timeline.map((step) => {
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';

            return (
              <div key={step.id} className="relative flex items-start gap-3">
                {isCompleted ? (
                  <div className="relative z-10 w-6 h-6 rounded-full bg-[#006c49] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                  </div>
                ) : isActive ? (
                  <div className="relative z-10 w-6 h-6 rounded-full bg-[#ffc700] text-[#181c21] flex items-center justify-center shrink-0 shadow-md ring-4 ring-[#ffdf94] mt-0.5 animate-pulse">
                    <span className="material-symbols-outlined text-[15px] font-bold">
                      local_shipping
                    </span>
                  </div>
                ) : (
                  <div className="relative z-10 w-6 h-6 rounded-full bg-[#e5e8ef] text-[#5d5e61] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[12px]">
                      radio_button_unchecked
                    </span>
                  </div>
                )}

                <div
                  className={`flex-1 min-w-0 ${
                    isActive ? 'bg-[#ffdf94]/30 p-2.5 rounded-xl border border-[#ffc700]/30' : ''
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <h4
                      className={`text-[13px] font-bold ${
                        isActive
                          ? 'text-[#594400]'
                          : isCompleted
                          ? 'text-[#181c21]'
                          : 'text-[#5d5e61]'
                      }`}
                    >
                      {step.title}
                    </h4>
                    <span className="text-[11px] text-[#5d5e61] font-mono shrink-0 pr-2">
                      {step.time}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#5d5e61] mt-0.5">{step.locationOrDetail}</p>
                  {step.note && (
                    <div className="mt-1 flex items-center gap-1 text-[#006c49] text-[11px] font-bold">
                      <span className="material-symbols-outlined text-[12px]">speed</span>
                      <span>{step.note}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Goods Details Card (تفاصيل السلعة) with NG Brand Visuals */}
      <section className="bg-white p-4 rounded-2xl shadow-md border border-[#e5e8ef] flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-[#f1f4fa] pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#765b00]">inventory_2</span>
            <h2 className="text-[15px] font-bold text-[#181c21]">تفاصيل السلعة المشحونة</h2>
          </div>
          <span className="bg-[#f1f4fa] px-2.5 py-1 rounded-full text-[12px] text-[#181c21] font-bold border border-[#e5e8ef]">
            {currentShipment.weightKg} كجم كلي
          </span>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#f1f4fa] p-3 rounded-xl border border-[#e5e8ef]">
            <span className="text-[11px] text-[#5d5e61] block">النوع والعدد</span>
            <span className="text-[13px] font-bold text-[#181c21] leading-tight block mt-0.5">
              {currentShipment.goodsType} ({currentShipment.packagesCount} طرود)
            </span>
          </div>
          <div className="bg-[#f1f4fa] p-3 rounded-xl border border-[#e5e8ef]">
            <span className="text-[11px] text-[#5d5e61] block">الحجم / التعبئة</span>
            <span className="text-[13px] font-bold text-[#181c21] leading-tight block mt-0.5">
              باليطة مغلفة ومحمية
            </span>
          </div>
        </div>

        {/* Package Photos - NG Placeholders */}
        <div className="space-y-1.5">
          <span className="text-[11px] text-[#5d5e61] block font-semibold">
            تصاور السلعة الموثقة (NG Verified):
          </span>
          <div className="grid grid-cols-3 gap-2">
            {currentShipment.cargoImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onOpenCargoPhoto(img.url, img.label)}
                className="relative h-20 rounded-xl overflow-hidden bg-[#e5e8ef] shadow-xs group border border-[#e5e8ef]"
              >
                <img
                  src={img.url}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] px-1.5 py-0.5 rounded font-semibold">
                  {img.label}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              onOpenCargoPhoto(
                currentShipment.cargoImages[0]?.url || ASSETS.cargoPallet,
                'ألبوم صور السلعة'
              )
            }
            className="w-full py-2.5 mt-2 bg-[#f1f4fa] hover:bg-[#e5e8ef] text-[#181c21] rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all border border-[#e5e8ef]"
          >
            <span className="material-symbols-outlined text-[16px]">zoom_in</span>
            <span>شوف تصويرة السلعة بحجم كبير</span>
          </button>
        </div>
      </section>

      {/* Problem / Incident Trigger */}
      <section className="bg-[#ffdad6]/40 p-4 rounded-2xl border border-[#ba1a1a]/20 flex flex-col gap-2.5 shadow-xs">
        <div className="flex items-center gap-2 text-[#ba1a1a]">
          <span className="material-symbols-outlined text-[22px]">report_problem</span>
          <h3 className="text-[15px] font-bold">واش كاين شي مشكل فالسلعة؟</h3>
        </div>
        <p className="text-[12px] text-[#5d5e61] leading-relaxed">
          يلا لاحظتي تعطل كبير فالمسار، تالف فالكراطن، أو بغيتي تبدل عنوان التسليم فطنجة، تواصل مع فريق المساعدة المباشرة.
        </p>
        <button
          type="button"
          onClick={() => onOpenIncidentModal(currentShipment)}
          className="w-full h-12 bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-xl text-[14px] font-bold flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]">warning</span>
          <span>بلغ على مشكل ولا دير شكاية</span>
        </button>
      </section>
    </div>
  );
};
