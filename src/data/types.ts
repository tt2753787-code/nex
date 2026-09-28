export type UserRole = 'client' | 'driver' | 'admin';

export type TabId = 'al-raisiya' | 'talab-jadid' | 'al-tatabbu' | 'mahami-diyali' | 'al-idara';

export interface TimelineStep {
  id: string;
  title: string;
  time: string;
  date: string;
  locationOrDetail: string;
  status: 'completed' | 'active' | 'upcoming';
  note?: string;
}

export interface DriverInfo {
  id: string;
  name: string;
  phone: string;
  truckModel: string;
  matricule: string;
  avatar: string;
  isOnline: boolean;
  activeShipmentId?: string;
}

export interface Shipment {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in_transit' | 'delivered' | 'incident';
  statusLabel: string;
  senderName: string;
  senderPhone: string;
  originCity: string;
  originAddress: string;
  destinationCity: string;
  destinationAddress: string;
  recipientName: string;
  recipientPhone: string;
  goodsType: string;
  packagesCount: number;
  weightKg: number;
  priceDh: number;
  notes?: string;
  driver?: DriverInfo;
  estimatedDelivery: string;
  progressPercent: number;
  remainingDistanceKm: number;
  remainingTimeText: string;
  currentRoadText: string;
  currentCoords: { lat: number; lng: number };
  timeline: TimelineStep[];
  cargoImages: { url: string; label: string }[];
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'status' | 'alert' | 'assignment';
  read: boolean;
  trackingNumber?: string;
}
