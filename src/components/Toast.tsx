import React from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#34343a]/95 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-full flex items-center gap-2.5 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-3 duration-300">
      <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">{icon}</span>
      <span className="font-space text-xs sm:text-sm font-medium text-white tracking-wide">{message}</span>
    </div>
  );
};
