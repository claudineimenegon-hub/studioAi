import React from 'react';
import { TEMPLATES, CAMPAIGNS } from '../../data/mockData';
import { ScreenTab, TemplateItem, CampaignItem } from '../../types';

interface HubScreenProps {
  onSelectTab: (tab: ScreenTab) => void;
  onOpenTemplate: (template: TemplateItem) => void;
  onOpenCampaign: (campaign: CampaignItem) => void;
  onOpenCredits: () => void;
  credits: number;
}

export const HubScreen: React.FC<HubScreenProps> = ({
  onSelectTab,
  onOpenTemplate,
  onOpenCampaign,
  onOpenCredits,
  credits,
}) => {
  return (
    <div className="flex flex-col w-full pb-24 space-y-6">
      {/* Ambient Atmospheric Backlight Glow */}
      <div className="fixed top-20 -left-20 w-72 h-72 bg-[#f751a1]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed top-1/2 -right-24 w-80 h-80 bg-[#571bc1]/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Hero Banner Card */}
      <div className="relative rounded-2xl bg-[#1a1b21] overflow-hidden shadow-2xl border border-white/[0.08]">
        {/* Generative Backdrop Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#571bc1]/40 via-[#0d0e13]/90 to-[#1a1b21]/95 pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#f751a1]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-[#009eb9]/25 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-7 flex flex-col gap-4">
          {/* Live Engine Pill */}
          <div className="flex items-center gap-2 w-fit bg-[#34343a]/80 backdrop-blur-md px-3 py-1 rounded-full text-[#ffb0cd] font-space text-[10px] font-bold shadow-sm uppercase tracking-wider border border-white/5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ffb0cd] animate-pulse" />
            <span>Diffusion V4 Ultra Active</span>
          </div>

          {/* Headline & Subtext */}
          <div className="space-y-2">
            <h1 className="font-syne text-2xl sm:text-4xl font-extrabold text-[#e3e1e9] tracking-tight leading-tight">
              Crie campanhas publicitárias de nível{' '}
              <span className="bg-gradient-to-r from-[#ffb0cd] via-[#d0bcff] to-[#4cd7f6] bg-clip-text text-transparent">
                cinematográfico
              </span>{' '}
              com IA.
            </h1>
            <p className="font-space text-sm sm:text-base text-[#debec8] max-w-xl leading-relaxed">
              Direção de arte computacional de alta fidelidade para marcas de luxo, moda editorial e tech lifestyle.
            </p>
          </div>

          {/* Action CTAs: Dual Quick Triggers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => onSelectTab('imagem')}
              className="relative group flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-gradient-to-r from-[#f751a1] to-[#571bc1] text-white font-space text-sm font-semibold shadow-[0_4px_24px_rgba(247,81,161,0.35)] hover:opacity-95 active:scale-[0.98] transition-all overflow-hidden"
              type="button"
            >
              <span className="material-symbols-outlined text-lg leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <span>Novo Criativo de Imagem</span>
            </button>

            <button
              onClick={() => onSelectTab('video')}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#292a2f]/90 text-[#e3e1e9] font-space text-sm font-semibold hover:bg-[#38393f] active:scale-[0.98] transition-all backdrop-blur-md shadow-md border border-white/5"
              type="button"
            >
              <span className="material-symbols-outlined text-lg leading-none text-[#4cd7f6]">movie</span>
              <span>Gerar Vídeo Motion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mini Dashboard: Status & Live Metrics Bento */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {/* Metric 1: Credits */}
        <div
          onClick={onOpenCredits}
          className="rounded-2xl bg-[#1a1b21] p-3.5 sm:p-4 flex flex-col justify-between shadow-md border border-white/5 cursor-pointer hover:border-[#ffb0cd]/30 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="font-space text-[10px] sm:text-xs text-[#debec8] uppercase tracking-wider font-semibold">
              Créditos
            </span>
            <span className="material-symbols-outlined text-[#ffb0cd] text-base">token</span>
          </div>
          <div className="mt-2">
            <div className="font-syne text-xl sm:text-2xl font-bold text-white tracking-tight">{credits}</div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4cd7f6]" />
              <span className="font-space text-[10px] sm:text-xs text-[#4cd7f6]">Pro Tier</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Live Renders Pipeline */}
        <div className="rounded-2xl bg-[#1a1b21] p-3.5 sm:p-4 flex flex-col justify-between shadow-md border border-white/5">
          <div className="flex items-center justify-between">
            <span className="font-space text-[10px] sm:text-xs text-[#debec8] uppercase tracking-wider font-semibold">
              Render
            </span>
            <span className="material-symbols-outlined text-[#4cd7f6] text-base animate-spin" style={{ animationDuration: '4s' }}>
              sync
            </span>
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="font-syne text-xl sm:text-2xl font-bold text-white tracking-tight">2</span>
              <span className="font-space text-[10px] sm:text-xs text-[#debec8]">ativos</span>
            </div>
            <div className="w-full bg-[#34343a] h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-[#4cd7f6] to-[#ffb0cd] h-full w-[72%] rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Metric 3: Est. CTR Impact */}
        <div className="rounded-2xl bg-[#1a1b21] p-3.5 sm:p-4 flex flex-col justify-between shadow-md border border-white/5">
          <div className="flex items-center justify-between">
            <span className="font-space text-[10px] sm:text-xs text-[#debec8] uppercase tracking-wider font-semibold">
              Impacto
            </span>
            <span className="material-symbols-outlined text-[#d0bcff] text-base">trending_up</span>
          </div>
          <div className="mt-2">
            <div className="font-syne text-xl sm:text-2xl font-bold text-[#d0bcff] tracking-tight">+38%</div>
            <span className="font-space text-[10px] sm:text-xs text-[#debec8] truncate block">CTR Médio</span>
          </div>
        </div>
      </div>

      {/* Active Diffusion Queue Teaser Bar */}
      <div className="rounded-2xl bg-[#292a2f]/60 backdrop-blur-md p-3.5 flex items-center justify-between shadow-sm border border-white/5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-9 h-9 rounded-full bg-[#34343a] flex items-center justify-center shrink-0 border border-white/10">
            <span className="material-symbols-outlined text-[#4cd7f6] text-base">timelapse</span>
          </div>
          <div className="min-w-0">
            <p className="font-space text-xs sm:text-sm font-semibold text-white truncate">
              Renderizando: Cyberpunk Sneaker Spot 60s
            </p>
            <p className="font-space text-[11px] text-[#debec8] truncate">
              Passo 48/64 • Upscale 4K Latente
            </p>
          </div>
        </div>
        <div className="shrink-0 pl-2">
          <span className="font-space text-xs font-bold text-[#4cd7f6] bg-[#4cd7f6]/10 px-2.5 py-1 rounded-full border border-[#4cd7f6]/30">
            75%
          </span>
        </div>
      </div>

      {/* Section 1: Templates Publicitários em Alta */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-syne text-lg sm:text-xl font-bold text-white">Templates em Alta</h2>
            <p className="font-space text-xs text-[#debec8]">Modelos generativos pré-calibrados por diretores de arte</p>
          </div>
          <button
            onClick={() => onSelectTab('imagem')}
            className="text-[#ffb0cd] font-space text-xs font-semibold flex items-center gap-1 hover:underline"
            type="button"
          >
            <span>Ver todos</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar snap-x snap-mandatory">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => onOpenTemplate(tmpl)}
              className="snap-center shrink-0 w-[240px] sm:w-[260px] rounded-2xl bg-[#1a1b21] overflow-hidden shadow-lg border border-white/5 flex flex-col group cursor-pointer hover:border-[#ffb0cd]/40 active:scale-[0.98] transition-all"
            >
              <div className="relative h-44 w-full overflow-hidden bg-[#34343a]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={tmpl.imageUrl}
                  alt={tmpl.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 bg-[#0d0e13]/80 backdrop-blur-md px-2 py-0.5 rounded-full font-space text-[10px] font-bold text-[#ffb0cd] border border-white/5">
                  {tmpl.badge}
                </div>
                <div className="absolute bottom-2 right-2 bg-[#0d0e13]/80 backdrop-blur-md px-2 py-0.5 rounded-full font-space text-[10px] font-bold text-[#4cd7f6] border border-white/5">
                  {tmpl.tag}
                </div>
              </div>
              <div className="p-3.5 space-y-1">
                <div className="font-space text-sm font-bold text-white truncate">{tmpl.title}</div>
                <p className="font-space text-xs text-[#debec8] line-clamp-2 leading-relaxed">
                  {tmpl.description}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="font-space text-[11px] text-[#d0bcff]">{tmpl.uses}</span>
                  <span className="material-symbols-outlined text-[#ffb0cd] text-base group-hover:translate-x-0.5 transition-transform">
                    north_east
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Campanhas Recentes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-syne text-lg sm:text-xl font-bold text-white">Campanhas Recentes</h2>
            <p className="font-space text-xs text-[#debec8]">Prontas para exportação e veiculação em mídia</p>
          </div>
          <button
            onClick={() => onSelectTab('galeria')}
            className="p-1.5 rounded-full text-[#debec8] hover:text-white bg-[#1e1f25] hover:bg-[#34343a] transition-colors"
            type="button"
            aria-label="Ver galeria"
          >
            <span className="material-symbols-outlined text-lg">filter_list</span>
          </button>
        </div>

        {/* Campaign Cards Stack */}
        <div className="space-y-2.5">
          {CAMPAIGNS.map((camp) => (
            <div
              key={camp.id}
              onClick={() => onOpenCampaign(camp)}
              className="group relative rounded-2xl bg-[#1a1b21] p-3 flex items-center gap-3 shadow-md border border-white/5 hover:bg-[#1e1f25] hover:border-[#ffb0cd]/30 transition-all cursor-pointer"
            >
              <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-[#34343a]">
                <img
                  className="w-full h-full object-cover"
                  src={camp.imageUrl}
                  alt={camp.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#0d0e13]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white text-lg">visibility</span>
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full font-space text-[10px] font-bold bg-[#009eb9]/20 text-[#4cd7f6] border border-[#4cd7f6]/30">
                    {camp.tag}
                  </span>
                  <span className="font-space text-[11px] text-[#a68992]">{camp.timeAgo}</span>
                </div>
                <h3 className="font-space text-xs sm:text-sm font-bold text-white truncate">
                  {camp.title}
                </h3>
                <p className="font-space text-[11px] text-[#debec8] truncate">
                  {camp.meta}
                </p>
              </div>

              <button
                aria-label="Preview da campanha"
                className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-[#292a2f] text-white hover:bg-[#f751a1] transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-lg">play_arrow</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Studio Tools Dock Strip */}
      <div className="rounded-2xl bg-gradient-to-r from-[#1a1b21] via-[#1e1f25] to-[#1a1b21] p-4 shadow-lg border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#571bc1]/40 text-[#d0bcff] flex items-center justify-center shrink-0 border border-[#d0bcff]/30">
            <span className="material-symbols-outlined text-xl">diamond</span>
          </div>
          <div className="min-w-0">
            <p className="font-space text-xs sm:text-sm font-bold text-white truncate">
              Brand & Logo Lab AdVibe™
            </p>
            <p className="font-space text-xs text-[#debec8] truncate">
              Gere identidades vetoriais 360° e mockups 3D em segundos
            </p>
          </div>
        </div>
        <button
          onClick={() => onSelectTab('brand')}
          className="shrink-0 px-4 py-2 rounded-full bg-[#34343a] text-[#ffb0cd] font-space text-xs font-bold hover:bg-[#ffb0cd] hover:text-black transition-colors"
          type="button"
        >
          Explorar
        </button>
      </div>
    </div>
  );
};
