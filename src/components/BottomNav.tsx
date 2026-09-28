import React from 'react';
import { TabId } from '../data/types.ts';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  driverTaskCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  driverTaskCount = 3,
}) => {
  const tabs = [
    { id: 'al-raisiya' as TabId, label: 'الرئيسية', icon: 'dashboard' },
    { id: 'talab-jadid' as TabId, label: 'طلب جديد', icon: 'add_box' },
    { id: 'al-tatabbu' as TabId, label: 'التتبع', icon: 'local_shipping' },
    {
      id: 'mahami-diyali' as TabId,
      label: 'المهام ديالي',
      icon: 'checklist',
      badge: driverTaskCount,
    },
    { id: 'al-idara' as TabId, label: 'الإدارة', icon: 'admin_panel_settings' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#f7f9ff]/90 backdrop-blur-xl border-t border-[#e5e8ef] shadow-[0_-2px_12px_rgba(0,0,0,0.05)]">
      <div className="max-w-2xl mx-auto flex justify-between items-center h-18 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1.5 transition-all relative ${
                isActive
                  ? 'text-[#765b00] font-bold'
                  : 'text-[#5d5e61] hover:text-[#181c21]'
              }`}
              type="button"
            >
              {/* Active top pill indicator */}
              {isActive && (
                <span className="absolute top-0 w-8 h-1 bg-[#ffc700] rounded-b-full"></span>
              )}

              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
                {tab.badge && tab.badge > 0 && !isActive && (
                  <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#ffc700] text-[#181c21] text-[10px] font-black flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[12px] mt-0.5 tracking-tight font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
