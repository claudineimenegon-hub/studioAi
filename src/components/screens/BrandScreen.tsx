import React, { useState } from 'react';
import { ASSETS } from '../../data/mockData';
import { ScreenTab } from '../../types';

interface BrandScreenProps {
  onShowToast: (msg: string, icon?: string) => void;
  onNavigateToTab: (tab: ScreenTab) => void;
  onOpenPreview: (data: { title: string; imageUrl: string; badge: string; subtitle: string; prompt: string }) => void;
  onDeductCredits: (amount: number) => boolean;
  credits: number;
}

export const BrandScreen: React.FC<BrandScreenProps> = ({
  onShowToast,
  onNavigateToTab,
  onOpenPreview,
  onDeductCredits,
  credits,
}) => {
  const [brandName, setBrandName] = useState('Lumex Studio');
  const [tagline, setTagline] = useState('Haute Couture AI Generative');
  const [niche, setNiche] = useState('Moda & Luxo');
  const [designStyle, setDesignStyle] = useState<'minimalist' | 'luxury' | 'cyber' | 'organic'>('minimalist');
  const [canvasBg, setCanvasBg] = useState<'dark' | 'light' | 'grid'>('dark');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [seedOffset, setSeedOffset] = useState(0);

  const niches = ['Moda & Luxo', 'Tech & SaaS', 'Gastronomia', 'Beleza & Estética', 'Fitness'];

  const styles = [
    {
      id: 'minimalist',
      name: 'Minimalista',
      desc: 'Formas puras',
      icon: 'category',
      color: 'from-[#f751a1] to-[#571bc1]',
    },
    {
      id: 'luxury',
      name: 'Luxo Monograma',
      desc: 'Ligaturas & ouro',
      icon: 'all_inclusive',
      color: 'from-[#571bc1] to-[#d0bcff]',
    },
    {
      id: 'cyber',
      name: 'Neo-Cyber',
      desc: 'Futurista & glow',
      icon: 'terminal',
      color: 'from-[#009eb9] to-[#4cd7f6]',
    },
    {
      id: 'organic',
      name: 'Orgânico Elegante',
      desc: 'Curvas suaves',
      icon: 'grain',
      color: 'from-[#ffb0cd] to-[#4cd7f6]',
    },
  ];

  const colorsPalette = [
    { hex: '#FFB0CD', name: 'Neon Accent', bg: 'bg-[#ffb0cd]' },
    { hex: '#D0BCFF', name: 'Iris Violet', bg: 'bg-[#d0bcff]' },
    { hex: '#4CD7F6', name: 'Cyan Glow', bg: 'bg-[#4cd7f6]' },
    { hex: '#121318', name: 'Obsidian', bg: 'bg-[#121318]' },
  ];

  const handleGenerate = () => {
    if (credits < 2) {
      onShowToast('Créditos insuficientes para geração de logo', 'warning');
      return;
    }
    onDeductCredits(2);
    setIsSynthesizing(true);
    onShowToast('Sintetizando kit vetorial e mockups 3D...', 'diamond');

    setTimeout(() => {
      setIsSynthesizing(false);
      setSeedOffset((prev) => prev + 1);
      onShowToast('Kit de Marca 360° gerado com sucesso!', 'check_circle');
    }, 1400);
  };

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    onShowToast(`Cor ${hex} copiada para a área de transferência!`, 'palette');
  };

  return (
    <div className="flex flex-col w-full pb-24 space-y-6">
      {/* Subheader / Status Bar */}
      <div className="pt-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#ffb0cd] animate-pulse shadow-[0_0_12px_rgba(255,176,205,0.8)]" />
          <span className="font-syne text-lg sm:text-xl font-bold text-white tracking-tight">
            Brand & Logo Lab
          </span>
          <span className="bg-[#292a2f] text-[#4cd7f6] font-space text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-white/5">
            AI Vector 3.0
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#1a1b21] px-3 py-1 rounded-full text-[#d0bcff] font-space text-xs font-semibold border border-white/5">
          <span className="material-symbols-outlined text-sm text-[#ffb0cd]">stars</span>
          <span>{credits} créditos</span>
        </div>
      </div>

      {/* Input Brand & Concept Box */}
      <section className="bg-[#1a1b21]/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xl space-y-4 border border-white/5 relative overflow-hidden">
        <div className="space-y-1.5">
          <label className="font-space text-xs font-semibold text-[#debec8] flex items-center justify-between uppercase tracking-wider">
            <span>Nome da Marca</span>
            <span className="text-[#4cd7f6] lowercase font-normal">obrigatório</span>
          </label>
          <div className="flex items-center bg-[#292a2f]/80 rounded-xl px-3.5 py-2.5 border border-white/5 focus-within:border-[#ffb0cd]/50 transition-all">
            <span className="material-symbols-outlined text-[#a68992] text-lg mr-2">draw</span>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="ex: Lumex Studio"
              className="bg-transparent text-white font-space text-sm w-full focus:outline-none placeholder:text-[#a68992]/60"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-space text-xs font-semibold text-[#debec8] flex items-center justify-between uppercase tracking-wider">
            <span>Slogan ou Tagline</span>
            <span className="text-[#a68992] lowercase font-normal">opcional</span>
          </label>
          <div className="flex items-center bg-[#292a2f]/80 rounded-xl px-3.5 py-2.5 border border-white/5 focus-within:border-[#ffb0cd]/50 transition-all">
            <span className="material-symbols-outlined text-[#a68992] text-lg mr-2">short_text</span>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="ex: Haute Couture AI Generative"
              className="bg-transparent text-white font-space text-sm w-full focus:outline-none placeholder:text-[#a68992]/60"
            />
          </div>
        </div>

        {/* Niche Chips */}
        <div className="space-y-2">
          <span className="font-space text-xs font-semibold text-[#debec8] block uppercase tracking-wider">
            Nicho & Segmento
          </span>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {niches.map((n) => {
              const active = niche === n;
              return (
                <button
                  key={n}
                  onClick={() => setNiche(n)}
                  className={`px-3.5 py-1.5 rounded-full font-space text-xs font-semibold shrink-0 transition-all border ${
                    active
                      ? 'bg-[#ffb0cd] text-black border-[#ffb0cd] shadow-md'
                      : 'bg-[#292a2f] text-[#debec8] border-white/5 hover:bg-[#34343a]'
                  }`}
                  type="button"
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>

        {/* Design Style Selector */}
        <div className="space-y-2">
          <span className="font-space text-xs font-semibold text-[#debec8] block uppercase tracking-wider">
            Estilo de Design Vetorial
          </span>
          <div className="grid grid-cols-2 gap-2">
            {styles.map((s) => {
              const active = designStyle === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setDesignStyle(s.id as any)}
                  className={`p-3 rounded-xl flex items-center gap-2.5 shadow-sm cursor-pointer transition-all border ${
                    active
                      ? 'bg-[#292a2f] border-[#ffb0cd]/50 shadow-md'
                      : 'bg-[#1e1f25] border-white/5 hover:bg-[#292a2f]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      active ? 'bg-[#f751a1] text-white' : 'bg-[#34343a] text-[#debec8]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">{s.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-space text-xs font-bold text-white truncate">{s.name}</p>
                    <p className="font-space text-[10px] text-[#debec8] truncate">{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Primary Generation Button */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={handleGenerate}
          disabled={isSynthesizing}
          className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-[#f751a1] via-[#571bc1] to-[#009eb9] text-white font-space text-sm font-bold shadow-[0_4px_24px_rgba(247,81,161,0.35)] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform disabled:opacity-75"
          type="button"
        >
          <span
            className={`material-symbols-outlined text-xl ${
              isSynthesizing ? 'animate-spin' : ''
            }`}
          >
            {isSynthesizing ? 'progress_activity' : 'auto_awesome'}
          </span>
          <span>{isSynthesizing ? 'Sintetizando Vetores 360°...' : 'Gerar Kit de Marca com IA'}</span>
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
        <div className="flex items-center gap-1.5 font-space text-xs text-[#debec8]">
          <span className="material-symbols-outlined text-xs text-[#4cd7f6]">bolt</span>
          <span>Consumo: 2 créditos • GERAÇÃO 360° COMPLETA (4 variações)</span>
        </div>
      </div>

      {/* Brand Identity 360° Studio Output */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-syne text-lg sm:text-xl font-bold text-white">Brand Identity 360°</h2>
            <p className="font-space text-xs text-[#debec8]">Vetor neural pronto para produção global</p>
          </div>
          <div className="flex bg-[#292a2f] rounded-full p-0.5 border border-white/5">
            <button
              onClick={() => setCanvasBg('dark')}
              className={`p-1.5 rounded-full transition-all ${
                canvasBg === 'dark' ? 'bg-[#0d0e13] text-[#ffb0cd] shadow-sm' : 'text-[#a68992]'
              }`}
              type="button"
              aria-label="Dark canvas"
            >
              <span className="material-symbols-outlined text-xs block">dark_mode</span>
            </button>
            <button
              onClick={() => setCanvasBg('light')}
              className={`p-1.5 rounded-full transition-all ${
                canvasBg === 'light' ? 'bg-[#e3e1e9] text-[#121318] shadow-sm' : 'text-[#a68992]'
              }`}
              type="button"
              aria-label="Light canvas"
            >
              <span className="material-symbols-outlined text-xs block">light_mode</span>
            </button>
            <button
              onClick={() => setCanvasBg('grid')}
              className={`p-1.5 rounded-full transition-all ${
                canvasBg === 'grid' ? 'bg-[#34343a] text-[#4cd7f6] shadow-sm' : 'text-[#a68992]'
              }`}
              type="button"
              aria-label="Grid canvas"
            >
              <span className="material-symbols-outlined text-xs block">grid_view</span>
            </button>
          </div>
        </div>

        {/* Main Dynamic Logo Showcase Canvas */}
        <div
          className={`w-full aspect-[4/3] rounded-3xl flex flex-col items-center justify-center relative p-6 overflow-hidden shadow-2xl transition-colors duration-300 border border-white/10 ${
            canvasBg === 'dark'
              ? 'bg-[#0d0e13]'
              : canvasBg === 'light'
              ? 'bg-[#e3e1e9]'
              : 'bg-[#1a1b21] bg-[radial-gradient(#34343a_1px,transparent_1px)] [background-size:16px_16px]'
          }`}
        >
          {/* Radial glow */}
          <div className="absolute w-48 h-48 bg-[#f751a1]/15 rounded-full blur-2xl pointer-events-none" />

          {/* Dynamic Vector Symbol */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-2">
            <div className="w-20 h-20 relative flex items-center justify-center">
              <svg className="w-full h-full drop-shadow-[0_0_16px_rgba(255,176,205,0.4)]" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="neonGradientBrand" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffb0cd" />
                    <stop offset="50%" stopColor="#d0bcff" />
                    <stop offset="100%" stopColor="#4cd7f6" />
                  </linearGradient>
                </defs>
                {designStyle === 'minimalist' && (
                  <>
                    <path
                      d="M 50 10 L 85 30 L 85 70 L 50 90 L 15 70 L 15 30 Z"
                      fill="none"
                      stroke="url(#neonGradientBrand)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                    />
                    <path
                      d="M 50 25 L 72 38 L 72 62 L 50 75 L 28 62 L 28 38 Z"
                      fill="none"
                      opacity="0.6"
                      stroke="url(#neonGradientBrand)"
                      strokeWidth="2"
                    />
                    <circle cx="50" cy="50" fill="url(#neonGradientBrand)" r="12" />
                    <path d="M 50 38 L 50 62 M 38 50 L 62 50" stroke={canvasBg === 'light' ? '#ffffff' : '#121318'} strokeLinecap="round" strokeWidth="2.5" />
                  </>
                )}
                {designStyle === 'luxury' && (
                  <>
                    <circle cx="50" cy="50" r="38" fill="none" stroke="url(#neonGradientBrand)" strokeWidth="3" />
                    <path
                      d="M 32 30 L 32 70 M 68 30 L 68 70 M 32 50 L 68 50"
                      stroke="url(#neonGradientBrand)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <circle cx="50" cy="50" r="16" fill="none" stroke="#ffb0cd" strokeWidth="2" />
                  </>
                )}
                {designStyle === 'cyber' && (
                  <>
                    <rect x="20" y="20" width="60" height="60" rx="12" fill="none" stroke="url(#neonGradientBrand)" strokeWidth="3" />
                    <path d="M 35 50 L 50 35 L 65 50 L 50 65 Z" fill="url(#neonGradientBrand)" />
                    <line x1="10" y1="50" x2="90" y2="50" stroke="#4cd7f6" strokeWidth="1" strokeDasharray="4 4" />
                  </>
                )}
                {designStyle === 'organic' && (
                  <>
                    <path
                      d="M 50 15 C 75 15 85 35 85 50 C 85 75 65 85 50 85 C 25 85 15 65 15 50 C 15 25 35 15 50 15 Z"
                      fill="none"
                      stroke="url(#neonGradientBrand)"
                      strokeWidth="4"
                    />
                    <path
                      d="M 50 25 C 65 35 70 50 50 75 C 35 55 35 35 50 25 Z"
                      fill="url(#neonGradientBrand)"
                    />
                  </>
                )}
              </svg>
            </div>

            <div className="pt-2">
              <span
                className={`font-syne text-2xl font-bold tracking-tight block ${
                  canvasBg === 'light' ? 'text-[#121318]' : 'text-white'
                }`}
              >
                {(brandName || 'BRAND').toUpperCase()}
              </span>
              <span
                className={`font-space text-[10px] tracking-[0.25em] uppercase block mt-1 ${
                  canvasBg === 'light' ? 'text-[#574048]' : 'text-[#a68992]'
                }`}
              >
                {tagline || 'STUDIO PARIS'}
              </span>
            </div>
          </div>

          {/* Quick Resolution Tag */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            <span className="bg-[#1e1f25]/90 backdrop-blur-md px-3 py-1 rounded-full font-space text-[10px] font-bold text-[#4cd7f6] border border-white/5">
              SVG • Bezier Infinito
            </span>
          </div>

          {/* Regenerate Seed Micro CTA */}
          <button
            onClick={() => {
              setSeedOffset((s) => s + 1);
              onShowToast('Variação de semente vetorial gerada!', 'sync');
            }}
            className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[#1e1f25]/90 backdrop-blur-md flex items-center justify-center text-white hover:text-[#ffb0cd] transition-colors border border-white/5"
            type="button"
            aria-label="Regenerar semente"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
          </button>
        </div>

        {/* Brand System Variations */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {/* Variation 1: Favicon */}
          <div className="bg-[#1a1b21] p-3 rounded-2xl flex flex-col items-center justify-between text-center space-y-2 shadow-md border border-white/5">
            <span className="font-space text-[10px] font-semibold text-[#debec8] uppercase">Favicon / App</span>
            <div className="w-12 h-12 rounded-xl bg-[#0d0e13] flex items-center justify-center shadow-inner border border-white/5">
              <svg className="w-7 h-7" viewBox="0 0 100 100">
                <path d="M 50 10 L 85 30 L 85 70 L 50 90 L 15 70 L 15 30 Z" fill="none" stroke="#ffb0cd" strokeWidth="6" />
                <circle cx="50" cy="50" fill="#4cd7f6" r="16" />
              </svg>
            </div>
            <span className="font-space text-[10px] font-semibold text-white">512px iOS</span>
          </div>

          {/* Variation 2: Horizontal Lockup */}
          <div className="bg-[#1a1b21] p-3 rounded-2xl flex flex-col items-center justify-between text-center space-y-2 shadow-md border border-white/5">
            <span className="font-space text-[10px] font-semibold text-[#debec8] uppercase">Horizontal</span>
            <div className="h-12 w-full rounded-xl bg-[#0d0e13] flex items-center justify-center px-1 shadow-inner border border-white/5">
              <div className="flex items-center gap-1 scale-90">
                <svg className="w-5 h-5" viewBox="0 0 100 100">
                  <polygon fill="none" points="50,10 85,30 85,70 50,90 15,70 15,30" stroke="#d0bcff" strokeWidth="8" />
                </svg>
                <span className="font-syne text-[11px] font-bold text-white truncate max-w-[64px]">
                  {brandName.split(' ')[0] || 'LUMEX'}
                </span>
              </div>
            </div>
            <span className="font-space text-[10px] font-semibold text-white">Navbar Kit</span>
          </div>

          {/* Variation 3: Monochrome Inverted */}
          <div className="bg-[#1a1b21] p-3 rounded-2xl flex flex-col items-center justify-between text-center space-y-2 shadow-md border border-white/5">
            <span className="font-space text-[10px] font-semibold text-[#debec8] uppercase">Monocromo</span>
            <div className="w-12 h-12 rounded-xl bg-[#e3e1e9] flex items-center justify-center shadow-inner">
              <svg className="w-7 h-7 text-[#121318]" viewBox="0 0 100 100">
                <polygon fill="none" points="50,10 85,30 85,70 50,90 15,70 15,30" stroke="#121318" strokeWidth="8" />
                <circle cx="50" cy="50" fill="#121318" r="14" />
              </svg>
            </div>
            <span className="font-space text-[10px] font-semibold text-white">Gravura • Silk</span>
          </div>
        </div>

        {/* Extracted Brand Palette */}
        <div className="bg-[#1a1b21] rounded-2xl p-4 space-y-2 border border-white/5 shadow-md">
          <div className="flex items-center justify-between">
            <span className="font-space text-xs font-semibold text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#ffb0cd]">palette</span>
              <span>Paleta Cromática da Identidade</span>
            </span>
            <span className="font-space text-[10px] text-[#a68992]">Toque no HEX para copiar</span>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-1">
            {colorsPalette.map((col) => (
              <button
                key={col.hex}
                onClick={() => handleCopyHex(col.hex)}
                className="flex flex-col items-center bg-[#292a2f] rounded-xl p-2 hover:bg-[#34343a] transition-all group border border-white/5"
                type="button"
              >
                <div className={`w-full h-8 rounded-lg ${col.bg} shadow-sm mb-1 border border-white/10`} />
                <span className="font-space text-[11px] font-bold text-white group-active:text-[#ffb0cd]">
                  {col.hex}
                </span>
                <span className="font-space text-[9px] text-[#a68992] truncate">{col.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Live 3D Real-World Mockups Carousel */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-syne text-base sm:text-lg font-bold text-white">
              Preview em Mockups Reais
            </h3>
            <p className="font-space text-xs text-[#debec8]">Visualização instantânea 3D no mundo físico</p>
          </div>
          <span className="font-space text-[10px] font-bold text-[#4cd7f6] bg-[#009eb9]/20 px-2.5 py-0.5 rounded-full border border-[#4cd7f6]/30">
            Automático
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar pt-1">
          {/* Mockup 1: Packaging */}
          <div
            onClick={() =>
              onOpenPreview({
                title: `${brandName} • Embalagem Luxo`,
                imageUrl: ASSETS.mockupPackaging,
                badge: 'Embalagem Luxo 3D',
                subtitle: 'Frasco cosmético e caixa texturizada fosca com stamping metálico.',
                prompt: `Luxury matte black packaging box with gold foil stamping for ${brandName}, high fashion editorial`,
              })
            }
            className="w-60 shrink-0 bg-[#1a1b21] rounded-2xl overflow-hidden shadow-xl border border-white/5 flex flex-col group cursor-pointer hover:border-[#ffb0cd]/40 transition-all"
          >
            <div className="h-44 w-full relative overflow-hidden bg-[#34343a]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={ASSETS.mockupPackaging}
                alt="Embalagem Luxo"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b21] via-transparent to-transparent" />
              <span className="absolute top-2 right-2 bg-[#0d0e13]/80 backdrop-blur-md text-white font-space text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/5">
                Embalagem Luxo
              </span>
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className="font-space text-xs font-bold text-white">Cosmetic Bag & Box</span>
              <span className="material-symbols-outlined text-[#ffb0cd] text-base group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Mockup 2: Card */}
          <div
            onClick={() =>
              onOpenPreview({
                title: `${brandName} • Cartão VIP Texturizado`,
                imageUrl: ASSETS.mockupCard,
                badge: 'Cartão VIP 3D',
                subtitle: 'Cartão de algodão nobre sobre ardósia basáltica com hot-stamping luminoso.',
                prompt: `Premium textured thick cotton business card on obsidian slate for ${brandName}`,
              })
            }
            className="w-60 shrink-0 bg-[#1a1b21] rounded-2xl overflow-hidden shadow-xl border border-white/5 flex flex-col group cursor-pointer hover:border-[#ffb0cd]/40 transition-all"
          >
            <div className="h-44 w-full relative overflow-hidden bg-[#34343a]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={ASSETS.mockupCard}
                alt="Cartão VIP"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b21] via-transparent to-transparent" />
              <span className="absolute top-2 right-2 bg-[#0d0e13]/80 backdrop-blur-md text-white font-space text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/5">
                Cartão VIP
              </span>
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className="font-space text-xs font-bold text-white">Cartão Texturizado</span>
              <span className="material-symbols-outlined text-[#ffb0cd] text-base group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Mockup 3: Facade */}
          <div
            onClick={() =>
              onOpenPreview({
                title: `${brandName} • Fachada 3D Corporativa`,
                imageUrl: ASSETS.mockupFacade,
                badge: 'Fachada 3D',
                subtitle: 'Entrada corporativa com letreiro retroiluminado e vidro temperado.',
                prompt: `Modern architecture corporate office entrance facade at dusk with 3D metallic sign of ${brandName}`,
              })
            }
            className="w-60 shrink-0 bg-[#1a1b21] rounded-2xl overflow-hidden shadow-xl border border-white/5 flex flex-col group cursor-pointer hover:border-[#ffb0cd]/40 transition-all"
          >
            <div className="h-44 w-full relative overflow-hidden bg-[#34343a]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={ASSETS.mockupFacade}
                alt="Fachada 3D"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b21] via-transparent to-transparent" />
              <span className="absolute top-2 right-2 bg-[#0d0e13]/80 backdrop-blur-md text-white font-space text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/5">
                Fachada 3D
              </span>
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className="font-space text-xs font-bold text-white">Entrada Corporativa</span>
              <span className="material-symbols-outlined text-[#ffb0cd] text-base group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Continuity Actions */}
      <section className="space-y-2 pt-1">
        {/* Export Master Vector Kit */}
        <button
          onClick={() => onShowToast('Exportando Kit Vetorial ZIP (SVG, PNG 4K, PDF CMYK)...', 'download')}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#292a2f] hover:bg-[#34343a] text-white font-space text-xs sm:text-sm font-semibold flex items-center justify-between shadow-md border border-white/5 transition-all"
          type="button"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#34343a] flex items-center justify-center text-[#4cd7f6]">
              <span className="material-symbols-outlined text-base">download</span>
            </div>
            <div className="text-left">
              <span className="block font-bold">Exportar Kit Vetorial Completo</span>
              <span className="font-space text-[11px] text-[#a68992] block">
                SVG, PNG 4K transparente, PDF CMYK
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-white/50 text-sm">arrow_forward_ios</span>
        </button>

        {/* Create Ad with Logo Button */}
        <button
          onClick={() => {
            onShowToast(`Logo "${brandName}" vinculado ao estúdio de criativos!`, 'auto_awesome');
            onNavigateToTab('imagem');
          }}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#1a1b21] hover:bg-[#292a2f] text-white font-space text-xs sm:text-sm font-semibold flex items-center justify-between shadow-lg relative overflow-hidden border border-[#ffb0cd]/20 transition-all group"
          type="button"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#f751a1]/15 to-transparent pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-[#f751a1] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-base">campaign</span>
            </div>
            <div className="text-left">
              <span className="block text-[#ffb0cd] font-bold">Criar Anúncio com este Logo</span>
              <span className="font-space text-[11px] text-[#debec8] block">
                Inserir no gerador de criativos para Reels & Ads
              </span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#f751a1]/20 flex items-center justify-center text-[#ffb0cd] group-hover:translate-x-1 transition-transform relative z-10">
            <span className="material-symbols-outlined text-base">bolt</span>
          </div>
        </button>
      </section>
    </div>
  );
};
