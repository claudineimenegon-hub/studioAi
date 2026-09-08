import React from 'react';
import { ScreenTab } from '../types';

interface BottomNavProps {
  currentTab: ScreenTab;
  onSelectTab: (tab: ScreenTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const navItems: { id: ScreenTab; label: string; icon: string }[] = [
    { id: 'hub', label: 'Hub', icon: 'grid_view' },
    { id: 'imagem', label: 'Imagem', icon: 'auto_awesome' },
    { id: 'video', label: 'Vídeo', icon: 'movie' },
    { id: 'brand', label: 'Brand Lab', icon: 'diamond' },
    { id: 'galeria', label: 'Galeria', icon: 'folder_open' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#0d0e13]/90 backdrop-blur-xl border-t border-white/[0.08] shadow-[0_-4px_24px_rgba(0,0,0,0.5)]">
      <div className="max-w-md md:max-w-2xl mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] sm:min-w-[68px] min-h-[44px] transition-all duration-200 relative ${
                isActive
                  ? 'text-[#ffb0cd]'
                  : 'text-[#a68992] hover:text-[#e3e1e9]'
              }`}
              type="button"
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={`material-symbols-outlined text-[24px] transition-transform ${
                    isActive ? 'scale-110' : ''
                  }`}
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#ffb0cd] shadow-[0_0_8px_#ffb0cd]" />
                )}
              </div>
              <span className={`font-space text-[10px] tracking-wide mt-1 font-semibold ${
                isActive ? 'text-[#ffb0cd]' : 'text-[#a68992]'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
