import React, { useState } from 'react';
import { Shipment, DriverInfo } from '../../data/types.ts';
import { ASSETS } from '../../data/assets.ts';

interface AdminFleetViewProps {
  shipments: Shipment[];
  drivers: DriverInfo[];
  onSelectShipment: (trk: string) => void;
  onShowToast: (msg: string) => void;
}

export const AdminFleetView: React.FC<AdminFleetViewProps> = ({
  shipments,
  drivers,
  onSelectShipment,
  onShowToast,
}) => {
  const [filter, setFilter] = useState<'all' | 'in_transit' | 'delivered'>('all');

  const filteredShipments = shipments.filter((s) => {
    if (filter === 'in_transit') return s.status === 'in_transit';
    if (filter === 'delivered') return s.status === 'delivered';
    return true;
  });

  return (
    <div className="flex flex-col w-full px-4 pb-32 pt-2 gap-4">
      {/* Header Banner */}
      <section className="bg-white p-4 rounded-2xl shadow-xs border border-[#e5e8ef] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#ffc700] text-[#181c21] flex items-center justify-center font-bold shadow-xs">
              <span className="material-symbols-outlined text-[24px]">admin_panel_settings</span>
            </div>
            <div>
              <h2 className="text-[17px] font-bold text-[#181c21]">غرفة القيادة والأسطول</h2>
              <p className="text-[12px] text-[#5d5e61]">
                تتبع حركة الشاحنات، الإرساليات، ومداخيل الشحن المباشرة
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-[#006c49]/10 text-[#006c49] text-[11px] font-bold rounded-full flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#006c49] animate-pulse"></span>
            مراقبة 24/7
          </span>
        </div>

        {/* Fleet KPI Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <div className="bg-[#f1f4fa] p-3 rounded-xl flex flex-col">
            <span className="text-[11px] text-[#5d5e61]">شاحنات فالطريق دابا</span>
            <span className="text-[20px] font-bold text-[#181c21] mt-0.5">24 شاحنة</span>
            <span className="text-[10px] text-[#006c49] font-semibold mt-1">
              ✓ كلها موصولة بالـ GPS
            </span>
          </div>

          <div className="bg-[#f1f4fa] p-3 rounded-xl flex flex-col">
            <span className="text-[11px] text-[#5d5e61]">إرساليات اليوم</span>
            <span className="text-[20px] font-bold text-[#181c21] mt-0.5">148 إرسالية</span>
            <span className="text-[10px] text-[#765b00] font-semibold mt-1">
              +18% مقارنة بالأمس
            </span>
          </div>

          <div className="bg-[#f1f4fa] p-3 rounded-xl flex flex-col">
            <span className="text-[11px] text-[#5d5e61]">نسبة الالتزام بالوقت</span>
            <span className="text-[20px] font-bold text-[#006c49] mt-0.5">99.4%</span>
            <span className="text-[10px] text-[#5d5e61] font-semibold mt-1">
              معيار ممتاز فاللوطوروت
            </span>
          </div>

          <div className="bg-[#f1f4fa] p-3 rounded-xl flex flex-col">
            <span className="text-[11px] text-[#5d5e61]">مداخيل الشحن (MAD)</span>
            <span className="text-[20px] font-bold text-[#765b00] mt-0.5">58,400 د.م</span>
            <span className="text-[10px] text-[#006c49] font-semibold mt-1">
              TTC مؤمنة بالكامل
            </span>
          </div>
        </div>
      </section>

      {/* Active Fleet Drivers Strip */}
      <section className="bg-white p-4 rounded-2xl shadow-xs border border-[#e5e8ef] flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-[#f1f4fa] pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#765b00]">badge</span>
            <h3 className="text-[15px] font-bold text-[#181c21]">شوفورات الأسطول النشطين</h3>
          </div>
          <span className="text-[12px] text-[#5d5e61]">3 شوفورات متصلين</span>
        </div>

        <div className="flex flex-col gap-2.5">
          {drivers.map((drv) => (
            <div
              key={drv.id}
              className="flex items-center justify-between p-3 bg-[#f1f4fa] rounded-xl border border-[#e0e2e9]"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={drv.avatar}
                    alt={drv.name}
                    className="w-11 h-11 rounded-full object-cover border border-white shadow-xs"
                    onError={(e) => {
                      e.currentTarget.src = ASSETS.driverBoushaib;
                    }}
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-white ${
                      drv.isOnline ? 'bg-[#006c49]' : 'bg-[#5d5e61]'
                    }`}
                  ></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#181c21]">{drv.name}</span>
                  <span className="text-[11px] text-[#5d5e61] font-mono">
                    {drv.truckModel} • {drv.matricule}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {drv.activeShipmentId && (
                  <button
                    type="button"
                    onClick={() => onSelectShipment(drv.activeShipmentId!)}
                    className="px-2.5 py-1 bg-[#ffc700] text-[#181c21] rounded-lg text-[11px] font-bold shadow-xs active:scale-95 transition-transform"
                  >
                    تتبع الرحلة
                  </button>
                )}
                <a
                  href={`tel:${drv.phone}`}
                  className="w-9 h-9 rounded-full bg-[#181c21] hover:bg-black text-white flex items-center justify-center active:scale-90 transition-transform"
                  aria-label="اتصال"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shipments Ledger */}
      <section className="bg-white p-4 rounded-2xl shadow-xs border border-[#e5e8ef] flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-[#f1f4fa] pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#765b00]">local_shipping</span>
            <h3 className="text-[15px] font-bold text-[#181c21]">سجل الشحنات المباشرة</h3>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-[#ebeef5] p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                filter === 'all' ? 'bg-white text-[#181c21] shadow-xs' : 'text-[#5d5e61]'
              }`}
            >
              الكل ({shipments.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('in_transit')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                filter === 'in_transit' ? 'bg-white text-[#181c21] shadow-xs' : 'text-[#5d5e61]'
              }`}
            >
              فالطريق
            </button>
            <button
              type="button"
              onClick={() => setFilter('delivered')}
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold transition-all ${
                filter === 'delivered' ? 'bg-white text-[#181c21] shadow-xs' : 'text-[#5d5e61]'
              }`}
            >
              واصلة
            </button>
          </div>
        </div>

        {/* Shipment Cards */}
        <div className="flex flex-col gap-2.5">
          {filteredShipments.map((s) => (
            <div
              key={s.id}
              className="p-3 bg-[#f1f4fa] hover:bg-[#ebeef5] rounded-xl flex flex-col gap-2 transition-colors cursor-pointer border border-[#e0e2e9]"
              onClick={() => onSelectShipment(s.trackingNumber)}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] font-bold text-[#181c21]">
                  {s.trackingNumber}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    s.status === 'delivered'
                      ? 'bg-[#006c49]/15 text-[#006c49]'
                      : s.status === 'in_transit'
                      ? 'bg-[#ffc700]/30 text-[#765b00]'
                      : 'bg-[#e0e2e9] text-[#5d5e61]'
                  }`}
                >
                  {s.statusLabel}
                </span>
              </div>

              <div className="flex items-center justify-between text-[13px]">
                <div className="flex items-center gap-1 font-semibold text-[#181c21]">
                  <span>{s.originCity}</span>
                  <span className="material-symbols-outlined text-[14px] text-[#5d5e61]">
                    arrow_back
                  </span>
                  <span>{s.destinationCity}</span>
                </div>
                <span className="text-[13px] font-bold text-[#765b00]">{s.priceDh} درهم</span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#5d5e61] pt-1 border-t border-[#e0e2e9]/60">
                <span>المرسل: {s.senderName}</span>
                <span>
                  {s.packagesCount} طرود • {s.weightKg} كجم
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
