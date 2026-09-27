import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 transform translate-y-0 opacity-100 pointer-events-none animate-in fade-in slide-in-from-top-4">
      <div className="flex items-center gap-2 bg-[#283044] text-[#eef0ff] px-4 py-2 rounded-full shadow-xl border border-[#414752]/40">
        <span className="material-symbols-outlined text-[#8cb7ff] text-[20px]">check_circle</span>
        <span className="text-xs font-semibold">{message}</span>
      </div>
    </div>
  );
};
