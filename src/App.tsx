import { useState, useCallback } from 'react';
import { TabId, UserRole, Shipment, NotificationItem } from './data/types.ts';
import { INITIAL_SHIPMENTS, INITIAL_DRIVERS, INITIAL_NOTIFICATIONS } from './data/mockData.ts';
import { Header } from './components/Header.tsx';
import { BottomNav } from './components/BottomNav.tsx';
import { HomeView } from './components/views/HomeView.tsx';
import { CreateOrderView } from './components/views/CreateOrderView.tsx';
import { TrackingView } from './components/views/TrackingView.tsx';
import { DriverTasksView } from './components/views/DriverTasksView.tsx';
import { AdminFleetView } from './components/views/AdminFleetView.tsx';
import { CargoPhotoModal } from './components/modals/CargoPhotoModal.tsx';
import { PodModal } from './components/modals/PodModal.tsx';
import { IncidentModal } from './components/modals/IncidentModal.tsx';
import { NotificationsDrawer } from './components/modals/NotificationsDrawer.tsx';
import { ProfileModal } from './components/modals/ProfileModal.tsx';
import { Toast } from './components/Toast.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('al-raisiya');
  const [activeRole, setActiveRole] = useState<UserRole>('client');
  const [activeTrackingNumber, setActiveTrackingNumber] = useState<string>('TRK-MA-2026-000482');

  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals state
  const [cargoModal, setCargoModal] = useState<{ isOpen: boolean; imageUrl?: string; title?: string }>({
    isOpen: false,
  });
  const [isPodModalOpen, setIsPodModalOpen] = useState(false);
  const [incidentModal, setIncidentModal] = useState<{ isOpen: boolean; shipmentRef?: string }>({
    isOpen: false,
  });
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  }, []);

  const handleNavigate = (tab: TabId, trackingNumber?: string) => {
    if (trackingNumber) {
      setActiveTrackingNumber(trackingNumber);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateOrder = (newShipment: Shipment) => {
    setShipments((prev) => [newShipment, ...prev]);
    setActiveTrackingNumber(newShipment.trackingNumber);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `تم إنشاء الطلبية ${newShipment.trackingNumber}`,
      message: `مسار الشحنة: ${newShipment.originCity} ← ${newShipment.destinationCity} بمبلغ ${newShipment.priceDh} درهم.`,
      time: 'دابا عاد',
      type: 'status',
      read: false,
      trackingNumber: newShipment.trackingNumber,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Navigate to tracking
    setActiveTab('al-tatabbu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteDelivery = () => {
    setIsPodModalOpen(false);

    // Update active shipment to delivered
    setShipments((prev) =>
      prev.map((s) => {
        if (s.trackingNumber === activeTrackingNumber || s.id === 'ship-1') {
          return {
            ...s,
            status: 'delivered',
            statusLabel: 'تم التوصيل بنجاح',
            progressPercent: 100,
            remainingDistanceKm: 0,
            remainingTimeText: 'تم التوصيل',
            timeline: [
              ...s.timeline,
              {
                id: `t-done-${Date.now()}`,
                title: 'تم التوصيل وتوقيع وصل الاستلام',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                date: new Date().toLocaleDateString('fr-FR'),
                locationOrDetail: 'توقيع إلكتروني مؤكد من طرف الزبون (POD)',
                status: 'completed',
              },
            ],
          };
        }
        return s;
      })
    );

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'تم تأكيد التوصيل (POD)',
      message: `الشحنة ${activeTrackingNumber} تسلمات بنجاح وتوقع الوصل الرقمي.`,
      time: 'دابا عاد',
      type: 'status',
      read: false,
      trackingNumber: activeTrackingNumber,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast('برافو! تم تسجيل تسليم السلعة وتوقيع الوصل الرقمي بنجاح 🚚🎉');
  };

  const handleSubmitIncident = (reason: string) => {
    const ref = incidentModal.shipmentRef || activeTrackingNumber;

    setShipments((prev) =>
      prev.map((s) => {
        if (s.trackingNumber === ref) {
          return {
            ...s,
            status: 'incident',
            statusLabel: 'بلاغ طارئ فالطريق',
            timeline: [
              ...s.timeline,
              {
                id: `t-inc-${Date.now()}`,
                title: 'بلاغ عن حالة طارئة',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                date: new Date().toLocaleDateString('fr-FR'),
                locationOrDetail: reason,
                status: 'active',
                note: 'فريق العمليات فالاستماع وجاري التنسيق',
              },
            ],
          };
        }
        return s;
      })
    );

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `⚠️ بلاغ طارئ للشحنة ${ref}`,
      message: reason,
      time: 'دابا عاد',
      type: 'alert',
      read: false,
      trackingNumber: ref,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast(`تم إرسال البلاغ لغرفة العمليات المركزية: ${reason}`);
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f9ff] text-[#181c21] select-none">
      {/* Toast Alert */}
      <Toast message={toastMessage} />

      {/* Top Application Header */}
      <Header
        activeTab={activeTab}
        unreadCount={unreadNotificationsCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto pt-16">
        {activeTab === 'al-raisiya' && (
          <HomeView
            onNavigate={handleNavigate}
            activeRole={activeRole}
            onRoleChange={setActiveRole}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'talab-jadid' && (
          <CreateOrderView
            onCreateOrder={handleCreateOrder}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'al-tatabbu' && (
          <TrackingView
            shipments={shipments}
            activeTrackingNumber={activeTrackingNumber}
            onSearchTracking={(trk) => {
              setActiveTrackingNumber(trk);
              showToast(`تم العثور على الإرسالية ${trk}`);
            }}
            onOpenCargoPhoto={(url, label) =>
              setCargoModal({ isOpen: true, imageUrl: url, title: label })
            }
            onOpenIncidentModal={(s) =>
              setIncidentModal({ isOpen: true, shipmentRef: s.trackingNumber })
            }
            onShowToast={showToast}
          />
        )}

        {activeTab === 'mahami-diyali' && (
          <DriverTasksView
            onOpenCargoPhoto={(url, title) =>
              setCargoModal({ isOpen: true, imageUrl: url, title })
            }
            onOpenPodModal={() => setIsPodModalOpen(true)}
            onOpenIncidentModal={() =>
              setIncidentModal({ isOpen: true, shipmentRef: activeTrackingNumber })
            }
            onShowToast={showToast}
          />
        )}

        {activeTab === 'al-idara' && (
          <AdminFleetView
            shipments={shipments}
            drivers={INITIAL_DRIVERS}
            onSelectShipment={(trk) => handleNavigate('al-tatabbu', trk)}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Persistent Bottom Tab Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => handleNavigate(tab)}
        driverTaskCount={3}
      />

      {/* Modals */}
      <CargoPhotoModal
        isOpen={cargoModal.isOpen}
        imageUrl={cargoModal.imageUrl}
        title={cargoModal.title}
        onClose={() => setCargoModal({ isOpen: false })}
      />

      <PodModal
        isOpen={isPodModalOpen}
        onClose={() => setIsPodModalOpen(false)}
        onConfirm={handleCompleteDelivery}
      />

      <IncidentModal
        isOpen={incidentModal.isOpen}
        shipmentRef={incidentModal.shipmentRef}
        onClose={() => setIncidentModal({ isOpen: false })}
        onSubmit={handleSubmitIncident}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onSelectNotification={(item) => {
          if (item.trackingNumber) {
            handleNavigate('al-tatabbu', item.trackingNumber);
          }
        }}
        onMarkAllAsRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
          showToast('تم تعليم جميع الإشعارات كمقروءة');
        }}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        activeRole={activeRole}
        onRoleChange={(r) => {
          setActiveRole(r);
          showToast(`تم التبديل إلى وضع ${r === 'client' ? 'الزبون' : r === 'driver' ? 'السائق' : 'الإدارة'}`);
        }}
      />
    </div>
  );
}
