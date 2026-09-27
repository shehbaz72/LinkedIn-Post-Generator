import React from 'react';
import { NavTab } from '../types';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const navItems: { tab: NavTab; label: string; icon: string }[] = [
    { tab: 'compose', label: 'Compose', icon: 'edit_square' },
    { tab: 'templates', label: 'Templates', icon: 'auto_awesome' },
    { tab: 'preview-feed', label: 'Preview', icon: 'visibility' },
    { tab: 'analytics', label: 'Analytics', icon: 'insights' },
    { tab: 'schedule', label: 'Schedule', icon: 'calendar_month' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#faf8ff]/95 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.06)] border-t border-[#eaedff]">
      <div className="flex justify-around items-center h-16 max-w-2xl mx-auto px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.tab}
              type="button"
              onClick={() => onTabChange(item.tab)}
              className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] gap-0.5 transition-colors cursor-pointer ${
                isActive
                  ? 'text-[#0a66c2] font-bold'
                  : 'text-[#414752] hover:text-[#0a66c2]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="text-[11px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
