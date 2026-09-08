import React, { useState } from 'react';
import { ASSETS } from '../data/mockData';
import { ScreenTab } from '../types';

interface HeaderProps {
  currentTab: ScreenTab;
  credits: number;
  onOpenCreditsModal: () => void;
}

const TAB_TITLES: Record<ScreenTab, string> = {
  hub: 'Hub',
  imagem: 'Criar Imagem',
  video: 'Criar Vídeo',
  brand: 'Brand & Logo Lab',
  galeria: 'Galeria',
};

export const Header: React.FC<HeaderProps> = ({ currentTab, credits, onOpenCreditsModal }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#0d0e13]/85 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="h-16 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2.5">
          <img
            alt="AdVibe AI Studio Logo"
            className="h-8 w-auto object-contain cursor-pointer"
            src={ASSETS.logo}
            referrerPolicy="no-referrer"
          />
          <div className="flex items-baseline gap-1.5">
            <span className="font-syne text-xl font-bold tracking-tight text-white hidden sm:inline">
              AdVibe
            </span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span className="font-syne text-lg sm:text-base font-semibold text-[#ffb0cd] tracking-tight">
              {TAB_TITLES[currentTab]}
            </span>
          </div>
        </div>

        {/* Right Actions: Credits Pill & Profile */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenCreditsModal}
            className="flex items-center gap-1.5 bg-[#292a2f]/90 hover:bg-[#34343a] px-3 py-1.5 rounded-full text-[#4cd7f6] font-space text-xs font-semibold shadow-[0_1px_8px_rgba(0,0,0,0.3)] transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] leading-none text-[#4cd7f6]">bolt</span>
            <span>{credits} Pro Credits</span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 flex items-center justify-center rounded-full ring-1 ring-white/15 hover:ring-[#ffb0cd]/50 hover:opacity-95 transition-all"
              type="button"
              aria-label="Perfil"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src={ASSETS.profile}
                referrerPolicy="no-referrer"
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#1a1b21] border border-white/10 shadow-2xl p-2 z-50 backdrop-blur-xl">
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <p className="text-sm font-semibold text-white">Creative Studio Pro</p>
                  <p className="text-xs text-[#a68992]">claudineimenegon@gmail.com</p>
                </div>
                <div className="text-xs space-y-1">
                  <button
                    onClick={() => {
                      onOpenCreditsModal();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-[#e3e1e9] hover:bg-[#292a2f] flex items-center justify-between"
                  >
                    <span>Plano & Créditos</span>
                    <span className="text-[#4cd7f6] font-bold">{credits}</span>
                  </button>
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full text-left px-3 py-2 rounded-xl text-[#e3e1e9] hover:bg-[#292a2f] flex items-center justify-between"
                  >
                    <span>GPU Cluster</span>
                    <span className="text-xs text-emerald-400">H100 Ativo</span>
                  </button>
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full text-left px-3 py-2 rounded-xl text-[#e3e1e9] hover:bg-[#292a2f]"
                  >
                    Configurações de Exportação
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
