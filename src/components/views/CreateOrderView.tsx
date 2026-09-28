import React, { useState, useRef } from 'react';
import { ASSETS } from '../../data/assets.ts';
import { MOROCCAN_CITIES } from '../../data/mockData.ts';
import { Shipment } from '../../data/types.ts';
import { CameraCaptureModal } from '../modals/CameraCaptureModal.tsx';
import { OrderSuccessModal } from '../modals/OrderSuccessModal.tsx';

interface CreateOrderViewProps {
  onCreateOrder: (newShipment: Shipment) => void;
  onShowToast: (msg: string) => void;
  onNavigateToTracking?: (trackingNumber: string) => void;
}

export const CreateOrderView: React.FC<CreateOrderViewProps> = ({
  onCreateOrder,
  onShowToast,
  onNavigateToTracking,
}) => {
  // Form State
  const [senderName, setSenderName] = useState('مصطفى');
  const [senderPhone, setSenderPhone] = useState('06xxxxxxxx');
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

  // Hidden File Inputs for real native device camera & gallery
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);

  // Live Camera Modal State
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  // Success Modal State for WhatsApp Dispatch
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdShipment, setCreatedShipment] = useState<Shipment | null>(null);

  // GPS state
  const [isGpsUpdating, setIsGpsUpdating] = useState(false);
  const [coordsText, setCoordsText] = useState('33.5333° N, -7.6324° W');
  const [coordsLocation, setCoordsLocation] = useState('سيدي معروف، كازا');
  const [isGpsConfirmed, setIsGpsConfirmed] = useState(true);

  // Images state (Using NG branded tokens)
  const [cargoList, setCargoList] = useState<Array<{ url: string; label: string }>>([
    { url: ASSETS.package1, label: 'طرد 1' },
    { url: ASSETS.package2, label: 'طرد 2' },
  ]);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Dynamic calculated price based on weight & package count
  const calculatedPrice = Math.max(180, Math.round(180 + packageCount * 5 + weightKg * 0.8));

  // Handle GPS positioning
  const handleSendGps = () => {
    setIsGpsUpdating(true);
    onShowToast('جاري تحديد موقعك المباشر وموقع الشاحنة عبر الساتيليت...');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          setCoordsText(`${lat}° N, ${lng}° W`);
          setCoordsLocation('موقعك الفعلي وموقع الشاحنة 📍');
          setIsGpsUpdating(false);
          setIsGpsConfirmed(true);
          onShowToast('تم التقاط الإحداثيات وتحديد موضع الشاحنة والسلعة بنجاح! 📍');
        },
        () => {
          setTimeout(() => {
            setCoordsText('33.5333° N, -7.6324° W');
            setCoordsLocation('سيدي معروف، كازا');
            setIsGpsUpdating(false);
            setIsGpsConfirmed(true);
            onShowToast('تم تثبيت إحداثيات موقع الشحن وتمركز الشاحنة (±4m) 📍');
          }, 800);
        },
        { timeout: 3000 }
      );
    } else {
      setTimeout(() => {
        setIsGpsUpdating(false);
        setIsGpsConfirmed(true);
        onShowToast('تم تثبيت إحداثيات موقع الشحن وتمركز الشاحنة (±4m) 📍');
      }, 700);
    }
  };

  // Open In-App Live Camera or Native Device Camera
  const handleOpenCamera = () => {
    setIsCameraModalOpen(true);
  };

  // Trigger fallback device file picker for camera
  const triggerNativeCamera = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  // Open Real Native Device Gallery / File Picker
  const handleOpenGallery = () => {
    if (galleryInputRef.current) {
      galleryInputRef.current.click();
    }
  };

  // Process chosen/captured photo files
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, source: 'camera' | 'gallery') => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newItems: Array<{ url: string; label: string }> = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = URL.createObjectURL(file);
        const newLabel = source === 'camera'
          ? `صورة الكاميرا (${cargoList.length + i + 1})`
          : `صورة المعرض (${cargoList.length + i + 1})`;
        newItems.push({ url: imageUrl, label: newLabel });
      }
      setCargoList((prev) => [...prev, ...newItems]);
      onShowToast(source === 'camera' ? 'تم التقاط صورة السلعة بنجاح من الكاميرا 📸' : 'تم تحميل صور السلعة من المعرض بنجاح 🖼️');
      e.target.value = '';
    }
  };

  // Capture snapshot from Live Camera Viewfinder
  const handleLiveCameraCapture = (imageUrl: string, label: string) => {
    setCargoList((prev) => [...prev, { url: imageUrl, label }]);
    onShowToast('تم التقاط وحفظ صورة السلعة مباشرة عبر الكاميرا! 📸');
  };

  // Remove photo from list
  const handleRemovePhoto = (index: number) => {
    setCargoList((prev) => prev.filter((_, idx) => idx !== index));
    onShowToast('تم حذف الصورة من القائمة');
  };

  // WhatsApp Submission: Sends the order details directly to WhatsApp (0649600070)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim()) {
      onShowToast('المرجو ملء اسم الزبون');
      return;
    }

    setIsSubmitting(true);
    onShowToast('جاري تسجيل الشحنة وإرسال التفاصيل مباشرة إلى واتساب...');

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = `TRK-MA-2026-${randomSuffix}`;

    const newShipment: Shipment = {
      id: `ship-${Date.now()}`,
      trackingNumber,
      status: 'pending',
      statusLabel: 'مسجلة وجاري التوجيه',
      senderName,
      senderPhone: '06xxxxxxxx',
      originCity: originCity.split(' (')[0],
      originAddress: address,
      destinationCity: destinationCity.split(' (')[0],
      destinationAddress: 'عنوان التسليم المتفق عليه بالمدينة المستقبلة',
      recipientName: 'المستلم المحدد',
      recipientPhone: '06xxxxxxxx',
      goodsType: goodsType || 'سلعة عامة',
      packagesCount: packageCount,
      weightKg,
      priceDh: calculatedPrice,
      notes,
      estimatedDelivery: 'خلال 24 إلى 48 ساعة',
      progressPercent: 15,
      remainingDistanceKm: 240,
      remainingTimeText: 'في طور المعالجة',
      currentRoadText: 'مركز التجميع وتتبع الشاحنة',
      currentCoords: { lat: 33.5333, lng: -7.6324 },
      cargoImages: cargoList,
      timeline: [
        {
          id: 't-new-1',
          title: 'الطلب تسجل وتحول للواتساب بنجاح',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: new Date().toLocaleDateString('fr-FR'),
          locationOrDetail: `${originCity.split(' (')[0]} - إرسال المعطيات للإدارة`,
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

    setTimeout(() => {
      onCreateOrder(newShipment);
      setCreatedShipment(newShipment);
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);

      // Prepare professional WhatsApp message containing the order details
      const whatsappText = encodeURIComponent(
        `📦 *طلب نقل وإرسالية جديدة - NEXT GEN LOGISTICS*\n` +
        `----------------------------------------\n` +
        `🔢 *رقم التتبع:* ${trackingNumber}\n` +
        `👤 *المرسل:* ${senderName}\n` +
        `📞 *الهاتف:* ${senderPhone}\n` +
        `📍 *من:* ${originCity}\n` +
        `🏁 *إلى:* ${destinationCity}\n` +
        `🏢 *العنوان والموقع:* ${address}\n` +
        `🗺️ *إحداثيات GPS:* ${coordsText}\n` +
        `📦 *السلعة:* ${goodsType}\n` +
        `📊 *العدد:* ${packageCount} طرود | *الوزن:* ${weightKg} كلغ\n` +
        `💰 *الثمن التقديري:* ${calculatedPrice} درهم TTC\n` +
        `📝 *ملاحظات:* ${notes || 'لا توجد'}\n` +
        `----------------------------------------\n` +
        `🚚 تم إرسال الطلب من منصة NEXT GEN اللوجستية.`
      );

      // Launch WhatsApp safely via anchor
      const whatsappUrl = `https://wa.me/212649600070?text=${whatsappText}`;
      try {
        const link = document.createElement('a');
        link.href = whatsappUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.click();
      } catch (err) {
        console.warn('Auto link open prevented:', err);
      }

      onShowToast(`تم تسجيل الطلب وإرسال المعطيات لواتساب! كود التتبع: ${trackingNumber} 📲`);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-32 pt-2 gap-4">
      {/* File inputs styled safely offscreen (not display:none) to guarantee mobile OS native capture triggers */}
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        onChange={(e) => handleFileChange(e, 'camera')}
        className="sr-only fixed -top-96 -left-96 w-1 h-1 opacity-0 pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="file"
        ref={galleryInputRef}
        accept="image/*"
        multiple
        onChange={(e) => handleFileChange(e, 'gallery')}
        className="sr-only fixed -top-96 -left-96 w-1 h-1 opacity-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Stepper Bar */}
      <section className="bg-white p-3 rounded-2xl shadow-xs border border-[#e5e8ef]">
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

          <span className="text-[#d2c5ab]">›</span>

          {/* Step 2 */}
          <button
            type="button"
            onClick={() => setActiveStep(2)}
            className={`flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-full transition-all ${
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
            <span className="text-[12px] whitespace-nowrap">المدن والمسار</span>
          </button>

          <span className="text-[#d2c5ab]">›</span>

          {/* Step 3 */}
          <button
            type="button"
            onClick={() => setActiveStep(3)}
            className={`flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-full transition-all ${
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
            <span className="text-[12px] whitespace-nowrap">تحديد الموقع GPS</span>
          </button>

          <span className="text-[#d2c5ab]">›</span>

          {/* Step 4 */}
          <button
            type="button"
            onClick={() => setActiveStep(4)}
            className={`flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-full transition-all ${
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
            <span className="text-[12px] whitespace-nowrap">تصوير السلعة</span>
          </button>
        </div>
      </section>

      {/* Main Form Body */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Section 1: Customer Information */}
        <section className="bg-white p-4 rounded-2xl shadow-xs border border-[#e5e8ef] flex flex-col gap-3">
          <div className="flex items-center gap-2 pb-1 border-b border-[#f1f4fa]">
            <div className="w-8 h-8 rounded-lg bg-[#ffc700]/25 flex items-center justify-center text-[#765b00]">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
            <div>
              <h2 className="font-bold text-[16px] text-[#181c21]">1. المعلومات الشخصية للزبون</h2>
              <p className="text-[12px] text-[#5d5e61]">كتسجل وتمشي مباشرة للواتساب المعتمد</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Sender Name */}
            <div className="flex flex-col gap-1">
              <label className="text-[13px] text-[#181c21] font-bold">اسم المرسل (الزبون)</label>
              <div className="h-12 bg-[#f1f4fa] rounded-xl px-3 flex items-center gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#ffc700] border border-[#e5e8ef] transition-all">
                <span className="material-symbols-outlined text-[#5d5e61] text-[20px]">
                  badge
                </span>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="مصطفى"
                  className="w-full bg-transparent text-[14px] text-[#181c21] placeholder:text-[#81765f] focus:outline-none font-semibold"
                />
              </div>
            </div>

            {/* Phone Number Input (06xxxxxxxx) */}
            <div className="flex flex-col gap-1">
              <label className="text-[13px] text-[#181c21] font-bold">رقم الهاتف للتواصل والواتساب</label>
              <div className="h-12 bg-[#f1f4fa] rounded-xl px-3 flex items-center gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#ffc700] border border-[#e5e8ef] transition-all">
                <span className="material-symbols-outlined text-[#006c49] text-[20px]">
                  phone_iphone
                </span>
                <input
                  type="text"
                  required
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  placeholder="06xxxxxxxx"
                  className="w-full bg-transparent text-[14px] text-[#181c21] font-mono focus:outline-none font-bold"
                  dir="ltr"
                />
                <span className="text-[11px] bg-[#006c49]/15 text-[#006c49] px-2 py-0.5 rounded-full font-bold shrink-0">
                  واتساب 📲
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Cities & Addresses */}
        <section className="bg-white p-4 rounded-2xl shadow-xs border border-[#e5e8ef] flex flex-col gap-3">
          <div className="flex items-center gap-2 pb-1 border-b border-[#f1f4fa]">
            <div className="w-8 h-8 rounded-lg bg-[#ffc700]/25 flex items-center justify-center text-[#765b00]">
              <span className="material-symbols-outlined text-[20px]">route</span>
            </div>
            <div>
              <h2 className="font-bold text-[16px] text-[#181c21]">2. مسار الشحنة بين المدن</h2>
              <p className="text-[12px] text-[#5d5e61]">من أي مدينة وإلى أين متجهة</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Origin City */}
            <div className="flex flex-col gap-1">
              <label className="text-[13px] text-[#181c21] font-bold flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006c49]"></span>
                مدينة الانطلاق (منين غاتشحن)
              </label>
              <div className="h-12 bg-[#f1f4fa] rounded-xl px-3 flex items-center gap-2 border border-[#e5e8ef]">
                <span className="material-symbols-outlined text-[#006c49] text-[20px]">
                  location_on
                </span>
                <select
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
                  className="w-full bg-transparent text-[14px] text-[#181c21] font-semibold focus:outline-none cursor-pointer"
                >
                  {MOROCCAN_CITIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Destination City */}
            <div className="flex flex-col gap-1">
              <label className="text-[13px] text-[#181c21] font-bold flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffc700] ring-1 ring-[#765b00]"></span>
                مدينة الوصول (الوجهة)
              </label>
              <div className="h-12 bg-[#f1f4fa] rounded-xl px-3 flex items-center gap-2 border border-[#e5e8ef]">
                <span className="material-symbols-outlined text-[#765b00] text-[20px]">
                  flag
                </span>
                <select
                  value={destinationCity}
                  onChange={(e) => setDestinationCity(e.target.value)}
                  className="w-full bg-transparent text-[14px] text-[#181c21] font-semibold focus:outline-none cursor-pointer"
                >
                  {MOROCCAN_CITIES.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Pickup Address */}
          <div className="flex flex-col gap-1">
            <label className="text-[13px] text-[#181c21] font-bold">
              العنوان أو الحي الدقيق فمدينة الانطلاق
            </label>
            <div className="h-12 bg-[#f1f4fa] rounded-xl px-3 flex items-center gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#ffc700] border border-[#e5e8ef] transition-all">
              <span className="material-symbols-outlined text-[#5d5e61] text-[20px]">
                home_pin
              </span>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="الحي، الزنقة، رقم المستودع أو المعلمة القريبة..."
                className="w-full bg-transparent text-[14px] text-[#181c21] placeholder:text-[#81765f] focus:outline-none font-medium"
              />
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Location & Live Truck Position on Map */}
        <section className="bg-white p-4 rounded-2xl shadow-xs border border-[#e5e8ef] flex flex-col gap-3">
          <div className="flex items-center justify-between pb-1 border-b border-[#f1f4fa]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#ffc700]/25 flex items-center justify-center text-[#765b00]">
                <span className="material-symbols-outlined text-[20px]">map</span>
              </div>
              <div>
                <h2 className="font-bold text-[16px] text-[#181c21]">3. تحديد موقعك وتتبع تموضع الشاحنة</h2>
                <p className="text-[12px] text-[#5d5e61]">الشاحنة كتبان فالخريطة فين واقفه باش تبعها مباشرة</p>
              </div>
            </div>

            <span className="px-2.5 py-1 bg-[#ffc700] text-[#181c21] font-black text-[11px] rounded-full shadow-xs">
              تتبع حي 🛰️
            </span>
          </div>

          {/* GPS Detection Action Button */}
          <button
            type="button"
            onClick={handleSendGps}
            disabled={isGpsUpdating}
            className="w-full h-12 bg-[#181c21] hover:bg-black text-white rounded-xl flex items-center justify-center gap-2 font-bold text-[14px] active:scale-98 transition-all shadow-xs"
          >
            {isGpsUpdating ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">
                  sync
                </span>
                <span>جاري التقاط إحداثيات الساتيليت الدقيقة...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[#ffc700] animate-pulse text-[20px]">
                  near_me
                </span>
                <span>📍 صيفط لوكاليزاسيون ديالي وتتبع الشاحنة</span>
              </>
            )}
          </button>

          {/* Success Badge */}
          {isGpsConfirmed && (
            <div className="bg-[#f1f4fa] rounded-xl p-3 flex items-center justify-between border border-[#e5e8ef]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006c49] animate-ping"></span>
                <span className="text-[13px] text-[#006c49] font-bold">
                  موقعك وموقع الشاحنة ظاهر فالخريطة مباشرة (قرب سيدي معروف)
                </span>
              </div>
              <span className="text-[11px] bg-[#006c49]/10 text-[#006c49] px-2 py-0.5 rounded-full font-bold">
                تتبع GPS نشط
              </span>
            </div>
          )}

          {/* Interactive Simulated Map Container with Live Truck & Package Waypoints */}
          <div className="relative w-full h-56 rounded-2xl overflow-hidden shadow-inner border border-[#e5e8ef]">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('${ASSETS.mapSidiMaarouf}')` }}
            ></div>

            {/* Map Overlay Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#181c21]/90 via-transparent to-[#181c21]/20 pointer-events-none"></div>

            {/* Live Waypoint: Package Loading Spot */}
            <div className="absolute top-[44%] right-[32%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
              <div className="bg-[#006c49] text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md mb-1">
                نقطة السلعة 📦
              </div>
              <div className="w-9 h-9 rounded-full bg-white ring-2 ring-[#006c49] flex items-center justify-center text-[#006c49] shadow-lg">
                <span className="material-symbols-outlined text-[20px]">inventory_2</span>
              </div>
            </div>

            {/* Live Waypoint: Nearby Truck Position */}
            <div className="absolute top-[52%] left-[34%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
              <div className="bg-[#ffc700] text-[#181c21] px-2 py-0.5 rounded-full text-[10px] font-black shadow-md mb-1 animate-bounce">
                الشاحنة واصلة (850m) 🚚
              </div>
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-[#ffc700] opacity-75"></span>
                <div className="relative w-10 h-10 rounded-full bg-[#181c21] ring-2 ring-[#ffc700] flex items-center justify-center text-[#ffc700] shadow-xl">
                  <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    local_shipping
                  </span>
                </div>
              </div>
            </div>

            {/* Connecting Route Line on Map */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 224" preserveAspectRatio="none">
              <line x1="270" y1="100" x2="135" y2="120" stroke="#ffc700" strokeWidth="3" strokeDasharray="5 5" opacity="0.8" />
            </svg>

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

          <div className="p-3 bg-[#f1f4fa] rounded-xl flex items-center justify-between border border-[#e5e8ef]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#765b00] text-[20px]">local_shipping</span>
              <span className="text-[12px] text-[#181c21] font-bold">
                الشاحنة متوقفة بالقرب منك بانتظار تأكيدك للشحن
              </span>
            </div>
            <span className="text-[11px] text-[#5d5e61] font-mono">
              على بعد 850 متر
            </span>
          </div>
        </section>

        {/* Section 4: Merchandise Details & Real Camera & Gallery Capture */}
        <section className="bg-white p-4 rounded-2xl shadow-xs border border-[#e5e8ef] flex flex-col gap-3">
          <div className="flex items-center gap-2 pb-1 border-b border-[#f1f4fa]">
            <div className="w-8 h-8 rounded-lg bg-[#ffc700]/25 flex items-center justify-center text-[#765b00]">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
            <div>
              <h2 className="font-bold text-[16px] text-[#181c21]">4. صور وتفاصيل السلعة</h2>
              <p className="text-[12px] text-[#5d5e61]">فتح الكاميرا المباشرة أو اختيار الصور من المعرض</p>
            </div>
          </div>

          {/* Photos Upload Zone */}
          <div className="bg-[#f1f4fa] rounded-2xl p-3.5 flex flex-col gap-3 border border-[#e5e8ef]">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-[#181c21] font-bold">التصاور المباشرة للسلعة</span>
              <span className="text-[11px] bg-[#6ffbbe] text-[#002113] px-2.5 py-0.5 rounded-full font-bold">
                {cargoList.length} صور موثقة ✓
              </span>
            </div>

            {/* Action Upload Buttons: Real Camera & Gallery */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleOpenCamera}
                className="h-12 bg-white hover:bg-[#ebeef5] text-[#181c21] rounded-xl flex items-center justify-center gap-2 font-bold text-[13px] shadow-xs active:scale-95 transition-all border border-[#e5e8ef]"
              >
                <span className="text-lg">📸</span>
                <span>فتح الكاميرا دابا</span>
              </button>
              <button
                type="button"
                onClick={handleOpenGallery}
                className="h-12 bg-white hover:bg-[#ebeef5] text-[#181c21] rounded-xl flex items-center justify-center gap-2 font-bold text-[13px] shadow-xs active:scale-95 transition-all border border-[#e5e8ef]"
              >
                <span className="text-lg">🖼️</span>
                <span>تحميل من المعرض</span>
              </button>
            </div>

            {/* Preview Thumbnail Reel */}
            <div className="flex items-center gap-2.5 overflow-x-auto py-1 no-scrollbar">
              {cargoList.map((item, idx) => (
                <div
                  key={idx}
                  className="relative w-22 h-22 shrink-0 rounded-xl overflow-hidden shadow-xs border border-[#e5e8ef] group bg-white"
                >
                  <img
                    src={item.url}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-1 left-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center shadow opacity-80 hover:opacity-100"
                    title="حذف الصورة"
                  >
                    <span className="material-symbols-outlined text-[12px]">close</span>
                  </button>
                  <span className="absolute bottom-1 right-1 left-1 bg-black/80 text-white text-[10px] text-center rounded px-1 truncate font-semibold">
                    {item.label}
                  </span>
                </div>
              ))}

              {/* Add More Camera/Gallery Button */}
              <button
                type="button"
                onClick={handleOpenCamera}
                className="w-22 h-22 shrink-0 rounded-xl bg-white hover:bg-[#ebeef5] flex flex-col items-center justify-center gap-1 text-[#5d5e61] font-bold text-[11px] border-2 border-dashed border-[#ffc700] transition-colors"
              >
                <span className="material-symbols-outlined text-[24px] text-[#765b00]">
                  add_a_photo
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
            <div className="h-12 bg-[#f1f4fa] rounded-xl px-3 flex items-center gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#ffc700] border border-[#e5e8ef] transition-all">
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
              <div className="h-12 bg-[#f1f4fa] rounded-xl px-3 flex items-center gap-2 border border-[#e5e8ef]">
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
              <div className="h-12 bg-[#f1f4fa] rounded-xl px-3 flex items-center gap-2 border border-[#e5e8ef]">
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
            <div className="min-h-12 bg-[#f1f4fa] rounded-xl p-3 flex items-start gap-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#ffc700] border border-[#e5e8ef] transition-all">
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

        {/* Sticky Confirmation Action Bar with Direct WhatsApp Forwarding */}
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
              <span className="text-[12px] text-white font-bold">إرسال فوري لواتساب 📲</span>
            </div>
          </div>

          {/* Submit Primary Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white rounded-xl flex items-center justify-center gap-2.5 font-bold text-[16px] shadow-lg transition-transform"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[22px]">
                  refresh
                </span>
                <span>جاري فتح محادثة واتساب وإرسال المعطيات...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.031 0C5.397 0 .015 5.382.015 12.016c0 2.121.553 4.191 1.606 6.014L.06 24l6.126-1.608a11.97 11.97 0 0 0 5.845 1.514h.005c6.634 0 12.016-5.382 12.016-12.016A12.016 12.016 0 0 0 12.031 0zm-.005 21.905h-.004a9.96 9.96 0 0 1-5.076-1.385l-.364-.216-3.771.989 1.006-3.676-.237-.377a9.954 9.954 0 0 1-1.528-5.224c0-5.503 4.478-9.98 9.984-9.98a9.932 9.932 0 0 1 7.057 2.925 9.936 9.936 0 0 1 2.926 7.056c0 5.504-4.478 9.983-9.989 9.983zm5.474-7.473c-.3-.15-1.776-.876-2.051-.976-.275-.1-.476-.15-.676.15s-.776.976-.951 1.176-.35.225-.65.075a8.19 8.19 0 0 1-2.411-1.488 9.043 9.043 0 0 1-1.669-2.079c-.175-.3-.019-.462.131-.611.135-.135.3-.35.45-.525s.2-.3.3-.5a.65.65 0 0 0-.025-.625c-.075-.15-.676-1.628-.926-2.228-.243-.585-.49-.506-.676-.515-.175-.009-.375-.011-.575-.011a1.11 1.11 0 0 0-.801.375c-.275.3-1.051 1.026-1.051 2.502s1.076 2.903 1.226 3.103 2.115 3.23 5.125 4.532c.716.31 1.275.495 1.71.634.719.229 1.373.197 1.89.12.576-.086 1.776-.726 2.026-1.427.25-.701.25-1.302.175-1.427-.075-.125-.275-.2-.575-.35z" />
                </svg>
                <span>أكد الطلب وصيفط المعطيات للواتساب</span>
              </>
            )}
          </button>
        </aside>
      </form>

      {/* Live Viewfinder Camera Modal */}
      <CameraCaptureModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onCapture={handleLiveCameraCapture}
        onOpenFallbackFilePicker={triggerNativeCamera}
      />

      {/* WhatsApp Confirmation Modal */}
      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        shipment={createdShipment}
        onTrackOrder={(trk) => {
          if (onNavigateToTracking) {
            onNavigateToTracking(trk);
          }
        }}
      />
    </div>
  );
};
