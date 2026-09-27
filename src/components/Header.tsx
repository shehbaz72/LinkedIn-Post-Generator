import React, { useState } from 'react';
import { NavTab, RoleMode } from '../types';
import { CURRENT_USER, EVENT_PULSE_LOGO } from '../data/mockData';

interface HeaderProps {
  role: RoleMode;
  onRoleChange: (newRole: RoleMode) => void;
  activeTab: NavTab;
  onNavigateTab: (tab: NavTab) => void;
  onShowToast: (message: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  role,
  onRoleChange,
  activeTab,
  onNavigateTab,
  onShowToast,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const notifications = [
    {
      id: 1,
      title: 'Post Trending',
      message: 'Your #AISummit2025 spotlight post just passed 48 reactions on LinkedIn!',
      time: '12m ago',
      read: false,
    },
    {
      id: 2,
      title: 'Official Speaker Tag',
      message: 'PulseTech Media tagged your profile in the Keynote recap.',
      time: '1h ago',
      read: false,
    },
    {
      id: 3,
      title: 'New Agenda Session',
      message: 'Moscone Stage A: Agentic Architectures starts in 20 minutes.',
      time: '2h ago',
      read: true,
    },
  ];

  // Dynamic subtitle based on role or tab
  const getSubTitle = () => {
    if (role === 'organizer') return 'Analytics';
    switch (activeTab) {
      case 'compose':
        return 'Compose';
      case 'templates':
        return 'Templates';
      case 'preview-feed':
        return 'Preview';
      case 'analytics':
        return 'Analytics';
      case 'schedule':
        return 'Schedule';
      default:
        return 'Compose';
    }
  };

  const handleRoleToggle = (selectedRole: RoleMode) => {
    onRoleChange(selectedRole);
    if (selectedRole === 'organizer') {
      onShowToast('Switched to Organizer Campaign Hub');
    } else {
      onShowToast('Switched to Attendee Spotlight Studio');
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#faf8ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eaedff]">
      <div className="h-28 flex flex-col justify-between px-4 max-w-2xl mx-auto py-1">
        {/* Top row: Brand & Actions */}
        <div className="flex items-center justify-between h-14">
          <button
            onClick={() => {
              onNavigateTab('compose');
              onRoleChange('attendee');
            }}
            className="flex items-center gap-2 text-left focus:outline-none group cursor-pointer"
          >
            <img
              alt="EventPulse Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src={EVENT_PULSE_LOGO}
            />
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#0a66c2] leading-none tracking-tight">
                EventPulse
              </span>
              <span className="text-[11px] text-[#414752] font-bold uppercase tracking-wider mt-0.5">
                {getSubTitle()}
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2">
            {/* Notification Bell */}
            <div className="relative">
              <button
                aria-label="Notifications"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (unreadCount > 0) setUnreadCount(0);
                }}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-[#414752] hover:text-[#0a66c2] hover:bg-[#eaedff] transition-colors relative cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-[#faf8ff] animate-pulse" />
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#c1c6d4]/40 p-3 z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                    <span className="font-bold text-sm text-[#131b2e]">Notifications</span>
                    <span className="text-[11px] text-[#0a66c2] font-semibold bg-[#eaedff] px-2 py-0.5 rounded-full">
                      Live Updates
                    </span>
                  </div>
                  <div className="flex flex-col gap-2.5 mt-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-2 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] transition-colors cursor-pointer text-left"
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-[#131b2e]">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-[#727783]">{n.time}</span>
                        </div>
                        <p className="text-xs text-[#414752] mt-0.5 leading-snug">{n.message}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="w-full text-center text-xs text-[#0a66c2] font-bold pt-2.5 hover:underline"
                  >
                    Close Panel
                  </button>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div
              className="relative flex items-center justify-center cursor-pointer group"
              onClick={() => onShowToast(`Logged in as ${CURRENT_USER.name} (${CURRENT_USER.headline})`)}
              title={`${CURRENT_USER.name} - ${CURRENT_USER.headline}`}
            >
              <img
                alt={CURRENT_USER.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-transparent group-hover:ring-[#0a66c2] transition-all"
                src={CURRENT_USER.avatarUrl}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#004e99] rounded-full ring-2 ring-[#faf8ff]" />
            </div>
          </div>
        </div>

        {/* Role Switcher Pill */}
        <div className="flex items-center justify-center pb-1">
          <div className="inline-flex p-1 bg-[#eaedff] rounded-full w-full max-w-xs justify-between shadow-inner">
            <button
              onClick={() => handleRoleToggle('organizer')}
              className={`flex-1 py-1.5 px-3 rounded-full text-center text-xs font-semibold transition-all cursor-pointer ${
                role === 'organizer'
                  ? 'bg-white text-[#0a66c2] shadow-[0_1px_3px_rgba(15,23,42,0.12)] font-bold'
                  : 'text-[#414752] hover:text-[#131b2e]'
              }`}
            >
              Organizer
            </button>
            <button
              onClick={() => handleRoleToggle('attendee')}
              className={`flex-1 py-1.5 px-3 rounded-full text-center text-xs font-semibold transition-all cursor-pointer ${
                role === 'attendee'
                  ? 'bg-[#0a66c2] text-white shadow-sm font-bold'
                  : 'text-[#414752] hover:text-[#131b2e]'
              }`}
            >
              Attendee View
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
