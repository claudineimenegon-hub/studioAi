import React, { useState } from 'react';
import { ASSETS, GALLERY_ITEMS } from '../../data/mockData';
import { GalleryItem } from '../../types';

interface GalleryScreenProps {
  onShowToast: (msg: string, icon?: string) => void;
  onOpenPreview: (data: { title: string; imageUrl: string; badge: string; subtitle: string; prompt: string }) => void;
}

export const GalleryScreen: React.FC<GalleryScreenProps> = ({
  onShowToast,
  onOpenPreview,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'image' | 'favorites'>('all');
  const [selectedVariant, setSelectedVariant] = useState<'A' | 'B'>('A');
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter items
  const filteredItems = GALLERY_ITEMS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.badge.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'video') return item.type === 'video';
    if (activeFilter === 'image') return item.type === 'image';
    if (activeFilter === 'favorites') return !!item.isFavorite;
    return true;
  });

  const handleExport = (channel: string) => {
    onShowToast(`Baixando pacote pronto para ${channel}...`, 'cloud_done');
  };

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText('https://advibe.ai/c/campanha-892-review-v4');
    setCopiedLink(true);
    onShowToast('Link de aprovação copiado com sucesso!', 'content_copy');
    setTimeout(() => setCopiedLink(false), 2600);
  };

  return (
    <div className="flex flex-col w-full pb-24 space-y-6">
      {/* Search & Dynamic Filter Chips */}
      <section className="flex flex-col gap-3 w-full pt-1">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#a68992]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por campanha, seed ou canal..."
            className="w-full bg-[#1a1b21] text-white font-space text-xs sm:text-sm pl-10 pr-12 py-3 rounded-full outline-none placeholder:text-[#a68992]/60 focus:bg-[#292a2f] border border-white/5 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-10 my-auto text-[#a68992] hover:text-white"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
          <button
            aria-label="Filtros avançados"
            onClick={() => onShowToast('Filtro por tags e seeds ativado', 'tune')}
            className="absolute inset-y-0 right-1.5 my-auto h-8 w-8 flex items-center justify-center rounded-full bg-[#292a2f] text-[#4cd7f6] hover:text-white transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setActiveFilter('all')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full font-space text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              activeFilter === 'all'
                ? 'bg-[#ffb0cd] text-black border-[#ffb0cd] shadow-md'
                : 'bg-[#1a1b21] text-[#debec8] border-white/5 hover:bg-[#292a2f]'
            }`}
            type="button"
          >
            <span>Todos</span>
            <span className="opacity-75 text-[11px]">(38)</span>
          </button>

          <button
            onClick={() => setActiveFilter('video')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full font-space text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              activeFilter === 'video'
                ? 'bg-[#ffb0cd] text-black border-[#ffb0cd] shadow-md'
                : 'bg-[#1a1b21] text-[#debec8] border-white/5 hover:bg-[#292a2f]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[15px] text-[#4cd7f6]">movie</span>
            <span>Vídeos Motion</span>
            <span className="text-[#a68992] text-[11px]">(14)</span>
          </button>

          <button
            onClick={() => setActiveFilter('image')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full font-space text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              activeFilter === 'image'
                ? 'bg-[#ffb0cd] text-black border-[#ffb0cd] shadow-md'
                : 'bg-[#1a1b21] text-[#debec8] border-white/5 hover:bg-[#292a2f]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[15px] text-[#ffb0cd]">image</span>
            <span>Imagens 4K</span>
            <span className="text-[#a68992] text-[11px]">(24)</span>
          </button>

          <button
            onClick={() => setActiveFilter('favorites')}
            className={`shrink-0 px-3.5 py-1.5 rounded-full font-space text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              activeFilter === 'favorites'
                ? 'bg-[#ffb0cd] text-black border-[#ffb0cd] shadow-md'
                : 'bg-[#1a1b21] text-[#debec8] border-white/5 hover:bg-[#292a2f]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[15px] text-[#d0bcff]" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span>Favoritos</span>
          </button>
        </div>
      </section>

      {/* Hero Card: Criativo em Destaque & Previsão A/B */}
      <section className="flex flex-col w-full bg-[#1a1b21] rounded-2xl p-4 sm:p-5 gap-4 shadow-xl border border-white/5 relative overflow-hidden">
        {/* Ambient directional glow */}
        <div className="absolute -right-12 -top-12 w-44 h-44 bg-[#f751a1]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-40 h-40 bg-[#571bc1]/25 rounded-full blur-3xl pointer-events-none" />

        {/* Header bar within Card */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-ping" />
            <span className="font-space text-xs text-[#4cd7f6] font-bold tracking-wider uppercase">
              Criativo Ativo #892
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#292a2f]/90 px-3 py-1 rounded-full text-[#d0bcff] font-space text-xs font-semibold border border-white/5">
            <span className="material-symbols-outlined text-[14px] text-[#4cd7f6]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span>Aprovado para Meta Ads</span>
          </div>
        </div>

        {/* Mockup Preview & Headlines */}
        <div className="flex flex-col gap-2 z-10">
          <div
            onClick={() =>
              onOpenPreview({
                title: 'Campanha Haute Couture • Criativo #892',
                imageUrl: selectedVariant === 'A' ? ASSETS.galleryFeatured : ASSETS.galleryVarB,
                badge: selectedVariant === 'A' ? 'Versão A • Fundo Dark' : 'Versão B • Neon Vibrante',
                subtitle: 'Eleve sua presença. Alta performance visual com renderização neural 4K.',
                prompt: 'Cinematic luxury fashion visual campaign with deep obsidian backdrop and cybernetic magenta neon streaks',
              })
            }
            className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-[#0d0e13] border border-white/10 group cursor-pointer"
          >
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src={selectedVariant === 'A' ? ASSETS.galleryFeatured : ASSETS.galleryVarB}
              alt="Criativo em Destaque"
              referrerPolicy="no-referrer"
            />
            {/* Mockup Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e13]/90 via-[#0d0e13]/30 to-transparent flex flex-col justify-between p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 bg-[#0d0e13]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-white border border-white/5">
                  <span className="material-symbols-outlined text-[14px] text-[#ffb0cd]">play_circle</span>
                  <span className="font-space text-xs font-semibold">0:15 • 9:16</span>
                </div>
                <span className="material-symbols-outlined text-white/80 text-[20px]">fullscreen</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[#ffd9e4] font-space text-[10px] font-bold uppercase tracking-wider">
                  Headline Gerada
                </span>
                <p className="font-syne text-lg sm:text-xl font-bold text-white line-clamp-1">
                  Eleve sua presença.
                </p>
                <p className="font-space text-xs text-[#debec8] line-clamp-1">
                  Alta performance visual com renderização neural 4K.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparative A/B Test Mini-Matrix */}
        <div className="flex flex-col gap-2 bg-[#1e1f25]/90 backdrop-blur-md p-3.5 rounded-xl z-10 border border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#4cd7f6] text-[16px]">insights</span>
              <span className="font-space text-xs font-bold text-white">Previsão Neural A/B</span>
            </div>
            <span className="bg-[#f751a1]/25 text-[#ffb0cd] font-space text-xs px-2.5 py-0.5 rounded-full font-bold border border-[#ffb0cd]/30">
              Versão A +24% CTR
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            {/* Variant A */}
            <div
              onClick={() => setSelectedVariant('A')}
              className={`flex items-center gap-2.5 p-2 rounded-xl cursor-pointer transition-all border ${
                selectedVariant === 'A'
                  ? 'bg-[#292a2f] border-[#ffb0cd]/60 shadow-sm'
                  : 'bg-[#1a1b21] border-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 relative bg-[#0d0e13]">
                <img
                  className="w-full h-full object-cover"
                  src={ASSETS.galleryVarA}
                  alt="Variant A"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 bg-[#ffb0cd] text-black text-[9px] font-bold px-1 rounded-tl-md">
                  A
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-space text-xs font-bold text-white truncate">Fundo Dark</span>
                <span className="font-space text-[11px] text-[#4cd7f6] font-semibold truncate">
                  4.8% Est. CTR
                </span>
              </div>
            </div>

            {/* Variant B */}
            <div
              onClick={() => setSelectedVariant('B')}
              className={`flex items-center gap-2.5 p-2 rounded-xl cursor-pointer transition-all border ${
                selectedVariant === 'B'
                  ? 'bg-[#292a2f] border-[#ffb0cd]/60 shadow-sm'
                  : 'bg-[#1a1b21] border-white/5 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 relative bg-[#0d0e13]">
                <img
                  className="w-full h-full object-cover"
                  src={ASSETS.galleryVarB}
                  alt="Variant B"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 bg-[#38393f] text-white text-[9px] font-bold px-1 rounded-tl-md">
                  B
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-space text-xs font-bold text-[#debec8] truncate">Neon Vibrante</span>
                <span className="font-space text-[11px] text-[#a68992] truncate">3.7% Est. CTR</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready Creatives Gallery (2 Columns) */}
      <section className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between">
          <h2 className="font-syne text-lg sm:text-xl font-bold text-white">Biblioteca Recente</h2>
          <button
            onClick={() => onShowToast('Ordenação por data mais recente')}
            className="text-[#4cd7f6] font-space text-xs font-semibold flex items-center gap-1 hover:underline"
            type="button"
          >
            <span>Organizar</span>
            <span className="material-symbols-outlined text-[16px]">swap_vert</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() =>
                onOpenPreview({
                  title: item.title,
                  imageUrl: item.imageUrl,
                  badge: `${item.badge} • ${item.aspectRatio}`,
                  subtitle: `${item.timeAgo} • Formato Otimizado para Mídia Digital`,
                  prompt: `High performance commercial render for ${item.title} in ${item.aspectRatio}`,
                })
              }
              className="flex flex-col bg-[#1a1b21] rounded-2xl overflow-hidden shadow-md group relative border border-white/5 hover:border-[#ffb0cd]/40 transition-all cursor-pointer"
            >
              <div className="relative w-full aspect-[9/14] bg-[#0d0e13]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <span className="bg-[#0d0e13]/80 backdrop-blur-md text-[#4cd7f6] font-space text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/5">
                    {item.aspectRatio}
                  </span>
                  {item.duration && (
                    <span className="bg-[#0d0e13]/80 backdrop-blur-md text-white font-space text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/5">
                      {item.duration}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 left-2">
                  <span
                    className={`backdrop-blur-sm font-space text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      item.badgeColor === 'primary'
                        ? 'bg-[#f751a1]/80 text-white border-[#f751a1]/50'
                        : item.badgeColor === 'secondary'
                        ? 'bg-[#571bc1]/80 text-[#d0bcff] border-[#d0bcff]/40'
                        : 'bg-[#009eb9]/80 text-[#4cd7f6] border-[#4cd7f6]/40'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
              </div>

              <div className="p-3 flex flex-col gap-0.5 bg-[#1e1f25]">
                <p className="font-space text-xs sm:text-sm font-bold text-white truncate">
                  {item.title}
                </p>
                <span className="font-space text-[11px] text-[#a68992]">{item.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Export Hub (Multi-Canal) */}
      <section className="flex flex-col w-full bg-[#1a1b21] rounded-2xl p-4 sm:p-5 gap-4 shadow-2xl border border-white/5 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#4cd7f6]/20 flex items-center justify-center text-[#4cd7f6] border border-[#4cd7f6]/30">
              <span className="material-symbols-outlined text-[18px]">cloud_download</span>
            </div>
            <div>
              <h3 className="font-syne text-base sm:text-lg font-bold text-white leading-tight">
                Quick Export Hub
              </h3>
              <p className="font-space text-xs text-[#debec8]">Formatos pré-calibrados em 1 toque</p>
            </div>
          </div>
          <span className="bg-[#0d0e13] px-2.5 py-1 rounded-full text-[#4cd7f6] font-space text-[10px] font-bold border border-white/5">
            Ultra Speed
          </span>
        </div>

        {/* Export Action Options */}
        <div className="flex flex-col gap-2">
          {/* Option 1: TikTok Ads */}
          <button
            onClick={() => handleExport('TikTok Ads')}
            className="w-full flex items-center justify-between p-3 bg-[#1e1f25] hover:bg-[#292a2f] rounded-xl transition-all group text-left border border-white/5 shadow-sm active:scale-[0.98]"
            type="button"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#0d0e13] flex items-center justify-center shrink-0 group-hover:bg-[#ffb0cd]/20 transition-colors border border-white/5">
                <span className="material-symbols-outlined text-[#ffb0cd] text-[20px]">music_note</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-space text-xs sm:text-sm font-bold text-white truncate">
                  Otimizado TikTok Ads
                </span>
                <span className="font-space text-[11px] text-[#debec8] truncate">
                  MP4 • 9:16 • 60fps • Sem tarjas
                </span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#292a2f] flex items-center justify-center text-[#debec8] group-hover:bg-[#ffb0cd] group-hover:text-black transition-all">
              <span className="material-symbols-outlined text-[16px]">download</span>
            </div>
          </button>

          {/* Option 2: Meta / Reels */}
          <button
            onClick={() => handleExport('Meta Ads')}
            className="w-full flex items-center justify-between p-3 bg-[#1e1f25] hover:bg-[#292a2f] rounded-xl transition-all group text-left border border-white/5 shadow-sm active:scale-[0.98]"
            type="button"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#0d0e13] flex items-center justify-center shrink-0 group-hover:bg-[#d0bcff]/20 transition-colors border border-white/5">
                <span className="material-symbols-outlined text-[#d0bcff] text-[20px]">all_inclusive</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-space text-xs sm:text-sm font-bold text-white truncate">
                  Meta Reels & Stories
                </span>
                <span className="font-space text-[11px] text-[#debec8] truncate">
                  MP4 Vídeo + JPG Carrossel HD
                </span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#292a2f] flex items-center justify-center text-[#debec8] group-hover:bg-[#d0bcff] group-hover:text-black transition-all">
              <span className="material-symbols-outlined text-[16px]">download</span>
            </div>
          </button>

          {/* Option 3: Google Performance Max */}
          <button
            onClick={() => handleExport('Google PMax')}
            className="w-full flex items-center justify-between p-3 bg-[#1e1f25] hover:bg-[#292a2f] rounded-xl transition-all group text-left border border-white/5 shadow-sm active:scale-[0.98]"
            type="button"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#0d0e13] flex items-center justify-center shrink-0 group-hover:bg-[#4cd7f6]/20 transition-colors border border-white/5">
                <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">folder_zip</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-space text-xs sm:text-sm font-bold text-white truncate">
                  Google Performance Max
                </span>
                <span className="font-space text-[11px] text-[#debec8] truncate">
                  Pacote ZIP (16:9, 1:1, 9:16 + Tags)
                </span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#292a2f] flex items-center justify-center text-[#debec8] group-hover:bg-[#4cd7f6] group-hover:text-black transition-all">
              <span className="material-symbols-outlined text-[16px]">download</span>
            </div>
          </button>
        </div>

        {/* Secondary Link Share Action */}
        <div className="flex flex-col pt-1">
          <button
            onClick={handleCopyShareLink}
            className={`w-full py-3 px-4 bg-[#0d0e13] hover:bg-[#292a2f] rounded-full font-space text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border border-white/5 active:scale-[0.98] ${
              copiedLink ? 'text-[#4cd7f6]' : 'text-white'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ffb0cd]">
              {copiedLink ? 'check' : 'link'}
            </span>
            <span>{copiedLink ? 'Link Copiado com Sucesso!' : 'Copiar Link para Equipe / Cliente'}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
