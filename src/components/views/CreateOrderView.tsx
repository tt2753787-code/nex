import React, { useState } from 'react';
import { ASSETS } from '../../data/assets.ts';
import { MOROCCAN_CITIES } from '../../data/mockData.ts';
import { Shipment } from '../../data/types.ts';

interface CreateOrderViewProps {
  onCreateOrder: (newShipment: Shipment) => void;
  onShowToast: (msg: string) => void;
}

export const CreateOrderView: React.FC<CreateOrderViewProps> = ({
  onCreateOrder,
  onShowToast,
}) => {
  // Form State
  const [senderName, setSenderName] = useState('محمد');
  const [senderPhone, setSenderPhone] = useState('06 61 45 88 90');
  const [originCity, setOriginCity] = useState('الدار البيضاء (Casablanca)');
  const [destinationCity, setDestinationCity] = useState('مراكش (Marrakech)');
  const [address, setAddress] = useState(
    'الحي الصناعي سيدي معروف، زنقة 14، رقم 25 (قريب من الديبو الكبير)'
  );
  const [goodsType, setGoodsType] = useState('كراطن ملابس جاهزة وقطع نسيج');
  const [packageCount, setPackageCount] = useState<number>(12);
  const [weightKg, setWeightKg] = useState<number>(85);
  const [notes, setNotes] = useState(
    'سلعة قابلة للكسر، خاص اللي يفرغ معاه، اتصل 30 دقيقة قبل الوصول...'
  );

  // GPS state
  const [isGpsUpdating, setIsGpsUpdating] = useState(false);
  const [coordsText, setCoordsText] = useState('33.5333° N, -7.6324° W');
  const [coordsLocation, setCoordsLocation] = useState('سيدي معروف، كازا');
  const [isGpsConfirmed, setIsGpsConfirmed] = useState(true);

  // Images state
  const [cargoList, setCargoList] = useState<Array<{ url: string; label: string }>>([
    { url: ASSETS.package1, label: 'طرد 1' },
    { url: ASSETS.package2, label: 'طرد 2' },
  ]);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Dynamic calculated price based on weight & package count
  const calculatedPrice = Math.max(180, Math.round(180 + packageCount * 5 + weightKg * 0.8));

  const handleSendGps = () => {
    setIsGpsUpdating(true);
    onShowToast('جاري تحديد موقعك المباشر عبر الساتيليت...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          setCoordsText(`${lat}° N, ${lng}° W`);
          setCoordsLocation('موقعك الفعلي المباشر');
          setIsGpsUpdating(false);
          setIsGpsConfirmed(true);
          onShowToast('تم التقاط إحداثياتك الحالية بدقة عالية! 📍');
        },
        () => {
          // Simulation fallback for Moroccan industrial zone
          setTimeout(() => {
            setCoordsText('33.5333° N, -7.6324° W');
            setCoordsLocation('سيدي معروف، كازا');
            setIsGpsUpdating(false);
            setIsGpsConfirmed(true);
            onShowToast('تم تثبيت إحداثيات نقطة الشحن بنجاح (±4m) 📍');
          }, 800);
        },
        { timeout: 3000 }
      );
    } else {
      setTimeout(() => {
        setIsGpsUpdating(false);
        setIsGpsConfirmed(true);
        onShowToast('تم تثبيت إحداثيات نقطة الشحن بنجاح (±4m) 📍');
      }, 700);
    }
  };

  const handleAddPhoto = () => {
    const newItems = [
      { url: ASSETS.warehouseBoxes, label: `طرد ${cargoList.length + 1}` },
      { url: ASSETS.cargoPallet, label: `طرد ${cargoList.length + 1}` },
    ];
    const picked = newItems[cargoList.length % newItems.length];
    setCargoList((prev) => [...prev, picked]);
    onShowToast('تمت إضافة صورة توثيقية جديدة للسلعة 📸');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderPhone.trim()) {
      onShowToast('المرجو ملء اسم الزبون ورقم الهاتف');
      return;
    }

    setIsSubmitting(true);
    onShowToast('جاري تسجيل الشحنة وإصدار كود التتبع...');

    setTimeout(() => {
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const trackingNumber = `TRK-MA-2026-${randomSuffix}`;

      const newShipment: Shipment = {
        id: `ship-${Date.now()}`,
        trackingNumber,
        status: 'pending',
        statusLabel: 'مسجلة وجاري التوجيه',
        senderName,
        senderPhone,
        originCity: originCity.split(' (')[0],
        originAddress: address,
        destinationCity: destinationCity.split(' (')[0],
        destinationAddress: 'عنوان التسليم المتفق عليه بالمدينة المستقبلة',
        recipientName: 'المستلم المحدد للطلبية',
        recipientPhone: '06XX-XXXXXX',
        goodsType: goodsType || 'سلعة عامة',
        packagesCount: packageCount,
        weightKg,
        priceDh: calculatedPrice,
        notes,
        estimatedDelivery: 'خلال 24 إلى 48 ساعة',
        progressPercent: 15,
        remainingDistanceKm: 240,
        remainingTimeText: 'في طور المعالجة',
        currentRoadText: 'مركز التجميع والتوجيه',
        currentCoords: { lat: 33.5333, lng: -7.6324 },
        cargoImages: cargoList,
        timeline: [
          {
            id: 't-new-1',
            title: 'الطلب تسجل بنجاح فالسيرفيس',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: new Date().toLocaleDateString('fr-FR'),
            locationOrDetail: `${originCity.split(' (')[0]} - جاري تعيين أقرب شاحنة`,
            status: 'completed',
          },
          {
            id: 't-new-2',
            title: 'في انتظار انطلاق الشاحنة المخصصة',
            time: 'قريباً',
            date: 'اليوم',
            locationOrDetail: 'مركز التوزيع واللوجستيك',
            status: 'active',
          },
        ],
        createdAt: new Date().toISOString(),
      };

      onCreateOrder(newShipment);
      setIsSubmitting(false);
      onShowToast(`مبروك! كود التتبع ديالك هو: ${trackingNumber} 🎉`);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-32 pt-2 gap-4">
      {/* Stepper Bar */}
      <section className="bg-white p-3 rounded-xl shadow-xs border border-[#e5e8ef]">
        <div className="flex items-center justify-between gap-1 overflow-x-auto py-1 no-scrollbar">
          {/* Step 1 */}
          <button
            type="button"
            onClick={() => setActiveStep(1)}
            className={`flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-full transition-all ${
              activeStep === 1
                ? 'bg-[#ffc700]/25 text-[#181c21] font-bold'
                : 'text-[#5d5e61]'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full font-bold text-[12px] flex items-center justify-center ${
                activeStep === 1
                  ? 'bg-[#ffc700] text-[#181c21]'
                  : 'bg-[#e5e8ef] text-[#5d5e61]'
              }`}
            >
              1
            </span>
            <span className="text-[12px] whitespace-nowrap">معلومات الزبون</span>
          </button>

          <div className="w-4 h-0.5 bg-[#e5e8ef] shrink-0"></div>

          {/* Step 2 */}
          <button
            type="button"
            onClick={() => setActiveStep(2)}
            className={`flex items-center gap-1.5 shrink-0 px-2 py-1.5 rounded-full transition-all ${
              activeStep === 2
                ? 'bg-[#ffc700]/25 text-[#181c21] font-bold'
                : 'text-[#5d5e61]'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full font-bold text-[12px] flex items-center justify-center ${
                activeStep === 2
                  ? 'bg-[#ffc700] text-[#181c21]'
                  : 'bg-[#e5e8ef] text-[#5d5e61]'
              }`}
            >
              2
            </span>
            <span className="text-[12px] whitespace-nowrap">المدن والعنوان</span>
          </button>

          <div className="w-4 h-0.5 bg-[#e5e8ef] shrink-0"></div>

          {/* Step 3 */}
          <button
            type="button"
            onClick={() => setActiveStep(3)}
            className={`flex items-center gap-1.5 shrink-0 px-2 py-1.5 rounded-full transition-all ${
              activeStep === 3
                ? 'bg-[#ffc700]/25 text-[#181c21] font-bold'
                : 'text-[#5d5e61]'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full font-bold text-[12px] flex items-center justify-center ${
                activeStep === 3
                  ? 'bg-[#ffc700] text-[#181c21]'
                  : 'bg-[#e5e8ef] text-[#5d5e61]'
              }`}
            >
              3
            </span>
            <span className="text-[12px] whitespace-nowrap">تفاصيل السلعة</span>
          </button>

          <div className="w-4 h-0.5 bg-[#e5e8ef] shrink-0"></div>

          {/* Step 4 */}
          <button
            type="button"
            onClick={() => setActiveStep(4)}
            className={`flex items-center gap-1.5 shrink-0 px-2 py-1.5 rounded-full transition-all ${
              activeStep === 4
                ? 'bg-[#ffc700]/25 text-[#181c21] font-bold'
                : 'text-[#5d5e61]'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full font-bold text-[12px] flex items-center justify-center ${
                activeStep === 4
                  ? 'bg-[#ffc700] text-[#181c21]'
                  : 'bg-[#e5e8ef] text-[#5d5e61]'
              }`}
            >
              4
            </span>
            <span className="text-[12px] whitespace-nowrap">التأكيد</span>
          </button>
        </div>
      </section>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Section 1: Customer Info */}
        <section className="bg-white p-4 rounded-xl shadow-xs border border-[#e5e8ef] flex flex-col gap-3">
          <div className="flex items-center gap-2 pb-1 border-b border-[#f1f4fa]">
            <div className="w-8 h-8 rounded-lg bg-[#ffc700]/25 flex items-center justify-center text-[#765b00]">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
            <div>
              <h2 className="font-bold text-[16px] text-[#181c21]">1. شكون مول هاد الإرسالية؟</h2>
              <p className="text-[12px] text-[#5d5e61]">عمر معلومات المرسل باش يسهل التواصل معاه</p>
            </div>
          </div>

          {/* Full Name Input */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] text-[#181c21] font-bold">
              الاسم الكامل ديال الكليان
            </label>
            <div className="h-12 bg-[#f1f4fa] rounded-xl px-3 flex items-center gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#ffc700] transition-all">
              <span className="material-symbols-outlined text-[#5d5e61] text-[20px]">badge</span>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="مثال: محمد"
                className="w-full bg-transparent text-[14px] text-[#181c21] placeholder:text-[#81765f] focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] text-[#181c21] font-bold">
              رقم التيليفون (للتواصل السريع)
            </label>
            <div
              dir="ltr"
              className="h-12 bg-[#f1f4fa] rounded-xl px-3 flex items-center gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#ffc700] transition-all"
            >
              <div className="flex items-center gap-1.5 shrink-0 bg-[#ebeef5] px-2 py-1 rounded-md">
                <span className="text-sm">🇲🇦</span>
                <span className="text-[13px] font-bold text-[#181c21]">+212</span>
              </div>
              <input
                type="tel"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                placeholder="06 XX XX XX XX"
                className="w-full bg-transparent text-[14px] text-[#181c21] placeholder:text-[#81765f] focus:outline-none text-left font-mono font-medium"
              />
              <span
                className="material-symbols-outlined text-[#006c49] text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Cities of Origin and Destination */}
        <section className="bg-white p-4 rounded-xl shadow-xs border border-[#e5e8ef] flex flex-col gap-3">
          <div className="flex items-center gap-2 pb-1 border-b border-[#f1f4fa]">
            <div className="w-8 h-8 rounded-lg bg-[#ffc700]/25 flex items-center justify-center text-[#765b00]">
              <span className="material-symbols-outlined text-[20px]">route</span>
            </div>
            <div>
              <h2 className="font-bold text-[16px] text-[#181c21]">2. مسار الشحنة بين المدن</h2>
              <p className="text-[12px] text-[#5d5e61]">حدد مدينة الشحن والمدينة فاش غاتفرغ</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {/* Origin City */}
            <div className="flex flex-col gap-1">
              <label className="text-[13px] text-[#181c21] font-bold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006c49]"></span>
                مدينة الانطلاق (منين غاتشحن)
              </label>
              <div className="h-12 bg-[#f1f4fa] rounded-xl px-3 flex items-center justify-between border border-transparent focus-within:border-[#ffc700]">
                <span className="material-symbols-outlined text-[#006c49] text-[20px]">
                  trip_origin
                </span>
                <select
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
                  className="w-full bg-transparent text-[14px] text-[#181c21] focus:outline-none pr-2 font-medium"
                >
                  {MOROCCAN_CITIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined text-[#5d5e61] text-[20px] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Destination City */}
            <div className="flex flex-col gap-1">
              <label className="text-[13px] text-[#181c21] font-bold flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffc700]"></span>
                مدينة الوصول (فين غادية توصل)
              </label>
              <div className="h-12 bg-[#f1f4fa] rounded-xl px-3 flex items-center justify-between border border-transparent focus-within:border-[#ffc700]">
                <span className="material-symbols-outlined text-[#765b00] text-[20px]">
                  location_on
                </span>
                <select
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  className="w-full bg-transparent text-[14px] text-[#181c21] focus:outline-none pr-2 font-medium"
                >
                  {MOROCCAN_CITIES.map((c) => (
                    <option key={`dest-${c.code}`} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined text-[#5d5e61] text-[20px] pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive GPS & Detailed Address */}
        <section className="bg-white p-4 rounded-xl shadow-xs border border-[#e5e8ef] flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1 border-b border-[#f1f4fa]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#ffc700]/25 flex items-center justify-center text-[#765b00]">
                <span className="material-symbols-outlined text-[20px]">my_location</span>
              </div>
              <h2 className="font-bold text-[16px] text-[#181c21]">3. العنوان وموقع الـ GPS</h2>
            </div>
            <span className="text-[11px] bg-[#6ffbbe] text-[#002113] px-2.5 py-0.5 rounded-full font-bold">
              حيوي للسائق
            </span>
          </div>

          {/* Street Address */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] text-[#181c21] font-bold">العنوان المفصل للتسلم</label>
            <div className="min-h-14 bg-[#f1f4fa] rounded-xl p-3 flex items-start gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#ffc700] transition-all">
              <span className="material-symbols-outlined text-[#5d5e61] text-[20px] mt-0.5">
                home_pin
              </span>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="مثال: الحي الصناعي سيدي معروف، زنقة 14، رقم 25 (قريب من الديبو الكبير)"
                rows={2}
                className="w-full bg-transparent text-[14px] text-[#181c21] placeholder:text-[#81765f] focus:outline-none resize-none leading-relaxed font-medium"
              ></textarea>
            </div>
          </div>

          {/* High Visibility Live Location Button */}
          <button
            type="button"
            onClick={handleSendGps}
            disabled={isGpsUpdating}
            className="w-full bg-[#181c21] hover:bg-black text-white h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-[14px] shadow-sm active:scale-[0.98] transition-all"
          >
            {isGpsUpdating ? (
              <>
                <span className="material-symbols-outlined text-[#ffc700] animate-spin text-[20px]">
                  sync
                </span>
                <span>جاري تحديث إحداثيات الساتيليت...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[#ffc700] animate-pulse text-[20px]">
                  near_me
                </span>
                <span>📍 صيفط لوكاليزاسيون ديالي الحالية</span>
              </>
            )}
          </button>

          {/* Success Badge */}
          {isGpsConfirmed && (
            <div className="bg-[#f1f4fa] rounded-lg p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006c49] animate-ping"></span>
                <span className="text-[13px] text-[#006c49] font-bold">
                  لوكاليزاسيون ديالك تصيفطات بنجاح
                </span>
              </div>
              <span className="text-[11px] bg-[#006c49]/10 text-[#006c49] px-2 py-0.5 rounded font-bold">
                GPS دقيق ±4m
              </span>
            </div>
          )}

          {/* Interactive Simulated Map Container */}
          <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-inner border border-[#e5e8ef]">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${ASSETS.mapSidiMaarouf}')` }}
            ></div>

            {/* Map Overlay Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#181c21]/80 via-transparent to-transparent pointer-events-none"></div>

            {/* Simulated Floating Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
              <div className="bg-[#ffc700] text-[#181c21] px-2.5 py-0.5 rounded-full text-[11px] font-black shadow-md mb-1 animate-bounce">
                نقطة الشحن 📦
              </div>
              <div className="w-10 h-10 rounded-full bg-[#181c21] ring-2 ring-white flex items-center justify-center text-[#ffc700] shadow-xl">
                <span className="material-symbols-outlined text-[22px]">local_shipping</span>
              </div>
            </div>

            {/* GPS Coordinates HUD Badge */}
            <div className="absolute bottom-2 right-2 left-2 flex items-center justify-between text-white text-[12px]">
              <div className="bg-[#181c21]/90 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5" dir="ltr">
                <span className="material-symbols-outlined text-[14px] text-[#6ffbbe]">satellite_alt</span>
                <span className="font-mono text-[#6ffbbe] font-bold text-[11px]">{coordsText}</span>
              </div>
              <span className="bg-[#181c21]/80 px-2 py-1 rounded-lg text-white font-medium text-[11px]">
                {coordsLocation}
              </span>
            </div>
          </div>

          <p className="text-[12px] text-[#5d5e61] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#765b00]">touch_app</span>
            تأكد من البلاصة اللي بانَت فالخريطة وحرك العلامة يلا بغيتي تدقيق الحومة.
          </p>
        </section>

        {/* Section 4: Merchandise Details & Photos */}
        <section className="bg-white p-4 rounded-xl shadow-xs border border-[#e5e8ef] flex flex-col gap-3">
          <div className="flex items-center gap-2 pb-1 border-b border-[#f1f4fa]">
            <div className="w-8 h-8 rounded-lg bg-[#ffc700]/25 flex items-center justify-center text-[#765b00]">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
            <div>
              <h2 className="font-bold text-[16px] text-[#181c21]">4. صور وتفاصيل السلعة</h2>
              <p className="text-[12px] text-[#5d5e61]">باش نعرفو الكاميون ولا الفولگو اللي غايقدك</p>
            </div>
          </div>

          {/* Photos Upload Zone */}
          <div className="bg-[#f1f4fa] rounded-xl p-3 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#181c21] font-bold">التصاور المباشرة للسلعة</span>
              <span className="text-[11px] bg-[#6ffbbe] text-[#002113] px-2.5 py-0.5 rounded-full font-bold">
                تصويرة السلعة تصيفطات بنجاح ✓
              </span>
            </div>

            {/* Action Upload Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleAddPhoto}
                className="h-11 bg-white hover:bg-[#ebeef5] text-[#181c21] rounded-lg flex items-center justify-center gap-1.5 font-bold text-[13px] shadow-xs active:scale-95 transition-all border border-[#e5e8ef]"
              >
                <span>📸</span>
                <span>صور السلعة دابا</span>
              </button>
              <button
                type="button"
                onClick={handleAddPhoto}
                className="h-11 bg-white hover:bg-[#ebeef5] text-[#181c21] rounded-lg flex items-center justify-center gap-1.5 font-bold text-[13px] shadow-xs active:scale-95 transition-all border border-[#e5e8ef]"
              >
                <span>🖼️</span>
                <span>اختار صورة محفوظة</span>
              </button>
            </div>

            {/* Preview Thumbnail Reel */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
              {cargoList.map((item, idx) => (
                <div
                  key={idx}
                  className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden shadow-xs border border-[#e5e8ef] group"
                >
                  <img
                    src={item.url}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=120&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute top-1 right-1 w-5 h-5 bg-[#006c49] text-white rounded-full flex items-center justify-center shadow">
                    <span className="material-symbols-outlined text-[13px]">check</span>
                  </div>
                  <span className="absolute bottom-1 right-1 left-1 bg-black/70 text-white text-[10px] text-center rounded truncate px-1">
                    {item.label}
                  </span>
                </div>
              ))}

              {/* Add More Button */}
              <button
                type="button"
                onClick={handleAddPhoto}
                className="w-20 h-20 shrink-0 rounded-lg bg-[#e5e8ef] hover:bg-[#e0e2e9] flex flex-col items-center justify-center gap-1 text-[#5d5e61] font-bold text-[11px] shadow-inner transition-colors"
              >
                <span className="material-symbols-outlined text-[24px] text-[#765b00]">
                  add_photo_alternate
                </span>
                <span>➕ زيد تصويرة</span>
              </button>
            </div>
          </div>

          {/* Goods Type Input */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] text-[#181c21] font-bold">
              شنو هي السلعة اللي غاتصيفط؟
            </label>
            <div className="h-12 bg-[#f1f4fa] rounded-xl px-3 flex items-center gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#ffc700] transition-all">
              <span className="material-symbols-outlined text-[#5d5e61] text-[20px]">
                category
              </span>
              <input
                type="text"
                value={goodsType}
                onChange={(e) => setGoodsType(e.target.value)}
                placeholder="مثال: كراطن ملابس جاهزة، أجهزة، قطع غيار..."
                className="w-full bg-transparent text-[14px] text-[#181c21] placeholder:text-[#81765f] focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Package Quantity & Weight Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Quantity */}
            <div className="flex flex-col gap-1">
              <label className="text-[13px] text-[#181c21] font-bold">عدد الطرود (الكمية)</label>
              <div className="h-12 bg-[#f1f4fa] rounded-xl px-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#5d5e61] text-[18px]">
                  package_2
                </span>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={packageCount}
                  onChange={(e) => setPackageCount(parseInt(e.target.value) || 1)}
                  className="w-full bg-transparent text-[15px] text-[#181c21] font-bold focus:outline-none"
                />
              </div>
            </div>

            {/* Weight */}
            <div className="flex flex-col gap-1">
              <label className="text-[13px] text-[#181c21] font-bold">الوزن التقريبي (kg)</label>
              <div className="h-12 bg-[#f1f4fa] rounded-xl px-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#5d5e61] text-[18px]">
                  scale
                </span>
                <input
                  type="number"
                  min={1}
                  max={25000}
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseInt(e.target.value) || 1)}
                  className="w-full bg-transparent text-[15px] text-[#181c21] font-bold focus:outline-none"
                />
                <span className="text-[12px] text-[#5d5e61] font-bold shrink-0">كيلو</span>
              </div>
            </div>
          </div>

          {/* Delivery Notes */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] text-[#181c21] font-bold">
              ملاحظات خاصة وتعليمات للشيفور
            </label>
            <div className="min-h-12 bg-[#f1f4fa] rounded-xl p-3 flex items-start gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#ffc700] transition-all">
              <span className="material-symbols-outlined text-[#5d5e61] text-[18px] mt-0.5">
                speaker_notes
              </span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="سلعة قابلة للكسر، خاص اللي يفرغ معاه، اتصل 30 دقيقة قبل الوصول..."
                rows={2}
                className="w-full bg-transparent text-[13px] text-[#181c21] placeholder:text-[#81765f] focus:outline-none resize-none leading-relaxed font-medium"
              ></textarea>
            </div>
          </div>
        </section>

        {/* Sticky Confirmation Action Bar */}
        <aside className="sticky bottom-20 z-30 bg-[#181c21] text-white rounded-2xl p-4 shadow-2xl flex flex-col gap-3 border border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#d7dae1]">الثمن التقديري للرحلة (TTC)</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[26px] text-[#ffc700] font-black tracking-tight">
                  {calculatedPrice}
                </span>
                <span className="text-[14px] text-white font-bold">درهم مغربي</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <span className="material-symbols-outlined text-[#6ffbbe] text-[18px]">
                verified_user
              </span>
              <span className="text-[12px] text-white font-bold">تأمين الشحن مضمون</span>
            </div>
          </div>

          {/* Submit Primary Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-[#ffc700] hover:bg-[#f5bf00] active:scale-[0.98] text-[#181c21] rounded-xl flex items-center justify-center gap-2 font-bold text-[17px] shadow-lg transition-transform"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[22px]">
                  refresh
                </span>
                <span>جاري تسجيل الشحنة وإصدار الكود...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[24px]">local_shipping</span>
                <span>أكد الطلب وخرج رقم التتبع</span>
              </>
            )}
          </button>
        </aside>
      </form>
    </div>
  );
};
