import React, { useState } from 'react';
import { ASSETS } from '../../data/mockData';

interface ImageScreenProps {
  credits: number;
  onDeductCredits: (amount: number) => boolean;
  onShowToast: (msg: string, icon?: string) => void;
  onOpenPreview: (data: { title: string; imageUrl: string; badge: string; subtitle: string; prompt: string }) => void;
  activePrompt?: string;
}

export const ImageScreen: React.FC<ImageScreenProps> = ({
  credits,
  onDeductCredits,
  onShowToast,
  onOpenPreview,
  activePrompt: initialPrompt,
}) => {
  const [studioMode, setStudioMode] = useState<'assistido' | 'compositing' | 'variacoes'>('assistido');
  const defaultPrompt =
    'Fotografia publicitária comercial de um frasco de perfume de luxo facetado em cristal sobre pedra vulcânica preta molhada, iluminação rim light em magenta e ciano, reflexos dourados cáusticos, profundidade de campo cinematográfica, 8k octanerender.';
  const [prompt, setPrompt] = useState(initialPrompt || defaultPrompt);
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Commercial settings
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [lighting, setLighting] = useState<'neon' | 'golden' | 'softbox' | 'cyber'>('neon');
  const [compositingActive, setCompositingActive] = useState(true);

  // Asset state
  const [assetImage, setAssetImage] = useState(ASSETS.productCutout);
  const [assetName, setAssetName] = useState('parfum_elixir_noir.png');
  const [isRendering, setIsRendering] = useState(false);

  // Quick Chips
  const chips = [
    'Macro 35mm',
    'Reflexos Cáusticos',
    'Vogue Editorial',
    'Gotas de Orvalho',
    'Anamórfico 8k',
    'Fumaça Volumétrica',
  ];

  const handleEnhancePrompt = async () => {
    setIsEnhancing(true);
    try {
      const res = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style: studioMode,
          lighting,
        }),
      });
      const data = await res.json();
      if (data?.enhancedPrompt) {
        setPrompt(data.enhancedPrompt);
        onShowToast(data.lightingAdvice || 'Prompt otimizado com IA Gemini!', 'auto_fix_high');
      } else {
        throw new Error('No prompt returned');
      }
    } catch {
      setPrompt((prev) => {
        const addition =
          ' [Prompt Engineer IA: Iluminação volumétrica Tyndall aprimorada, dispersão subsurface refinada no vidro, contraste de micro-textura na rocha basáltica, color grading cinematográfico com LUT Arri Alexa 65, 8k OctaneRender].';
        return prev.includes('Prompt Engineer IA') ? prev : prev + addition;
      });
      onShowToast('Prompt otimizado com IA de Direção de Arte!', 'auto_fix_high');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleAddChip = (chipText: string) => {
    if (!prompt.toLowerCase().includes(chipText.toLowerCase())) {
      setPrompt((prev) => (prev ? `${prev}, ${chipText.toLowerCase()}` : chipText));
      onShowToast(`Tag "+ ${chipText}" adicionada`);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAssetImage(url);
      setAssetName(file.name);
      onShowToast(`Asset "${file.name}" carregado com fundo removido!`, 'layers');
    }
  };

  const handleGenerate = async () => {
    if (credits < 12) {
      onShowToast('Saldo insuficiente de créditos. Recarregue no topo.', 'warning');
      return;
    }
    const ok = onDeductCredits(12);
    if (!ok) return;

    setIsRendering(true);
    onShowToast('Renderizando com Gemini AI & AdVibe Neural Engine...', 'sync');

    try {
      const [imgRes, copyRes] = await Promise.all([
        fetch('/api/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt, aspectRatio }),
        })
          .then((r) => r.json())
          .catch(() => null),
        fetch('/api/generate-copy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ product: assetName.replace(/\.[^/.]+$/, ''), niche: 'Moda & Luxo' }),
        })
          .then((r) => r.json())
          .catch(() => null),
      ]);

      const generatedUrl =
        imgRes?.imageUrl ||
        (aspectRatio === '1:1' ? ASSETS.variationB : aspectRatio === '16:9' ? ASSETS.galleryFeatured : ASSETS.variationA);
      const headline = copyRes?.headline || 'Eleve sua presença ao extraordinário.';
      const subtitle = copyRes?.subheadline || `Render 4K • ${aspectRatio} • Iluminação ${lighting}`;

      // Save to localStorage for gallery persistence
      try {
        const newItem = {
          id: `gen-${Date.now()}`,
          title: headline,
          type: 'image',
          aspectRatio,
          badge: 'Novo • IA Gerada',
          badgeColor: 'primary',
          timeAgo: 'Agora mesmo',
          imageUrl: generatedUrl,
          prompt,
        };
        const stored = JSON.parse(localStorage.getItem('advibe_custom_gallery') || '[]');
        localStorage.setItem('advibe_custom_gallery', JSON.stringify([newItem, ...stored]));
      } catch {
        // ignore
      }

      onShowToast('Variações geradas com sucesso! Salvas na Galeria.', 'check_circle');
      onOpenPreview({
        title: headline,
        imageUrl: generatedUrl,
        badge: `Render 4K • ${aspectRatio}`,
        subtitle,
        prompt,
      });
    } catch {
      onShowToast('Variações geradas!', 'check_circle');
      onOpenPreview({
        title: 'Variação A • Rim Light Neon',
        imageUrl: ASSETS.variationA,
        badge: `Render 4K • ${aspectRatio}`,
        subtitle: `Iluminação ${lighting} sobre pedra basáltica.`,
        prompt,
      });
    } finally {
      setIsRendering(false);
    }
  };

  return (
    <div className="flex flex-col w-full pb-24 space-y-5">
      {/* Studio Mode Pill Selector */}
      <section className="w-full pt-1">
        <div className="bg-[#0d0e13]/90 backdrop-blur-xl p-1.5 rounded-full flex items-center justify-between gap-1 shadow-lg border border-white/5">
          <button
            onClick={() => setStudioMode('assistido')}
            className={`flex-1 py-2 px-2.5 rounded-full text-center font-space text-xs font-semibold transition-all duration-300 ${
              studioMode === 'assistido'
                ? 'bg-gradient-to-r from-[#f751a1] to-[#571bc1] text-white shadow-sm'
                : 'text-[#debec8] hover:text-white'
            }`}
            type="button"
          >
            Prompt Assistido
          </button>
          <button
            onClick={() => setStudioMode('compositing')}
            className={`flex-1 py-2 px-2.5 rounded-full text-center font-space text-xs font-semibold transition-all duration-300 ${
              studioMode === 'compositing'
                ? 'bg-gradient-to-r from-[#f751a1] to-[#571bc1] text-white shadow-sm'
                : 'text-[#debec8] hover:text-white'
            }`}
            type="button"
          >
            Compositing
          </button>
          <button
            onClick={() => setStudioMode('variacoes')}
            className={`flex-1 py-2 px-2.5 rounded-full text-center font-space text-xs font-semibold transition-all duration-300 ${
              studioMode === 'variacoes'
                ? 'bg-gradient-to-r from-[#f751a1] to-[#571bc1] text-white shadow-sm'
                : 'text-[#debec8] hover:text-white'
            }`}
            type="button"
          >
            Variações
          </button>
        </div>
      </section>

      {/* Prompt Command Box */}
      <section className="w-full">
        <div className="relative bg-[#1e1f25]/90 backdrop-blur-2xl rounded-2xl p-4 shadow-xl border border-white/5 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffb0cd] animate-pulse" />
              <span className="font-syne text-base font-bold text-white tracking-tight">
                Prompt Diretor Criativo
              </span>
            </div>
            <span className="font-space text-[10px] font-bold bg-[#34343a] text-[#4cd7f6] px-2.5 py-1 rounded-full border border-white/5">
              v5.2 Neural Engine
            </span>
          </div>

          <div className="relative">
            <textarea
              className="w-full bg-[#0d0e13]/80 text-[#e3e1e9] font-space text-xs sm:text-sm p-3 rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-[#ffb0cd]/50 leading-relaxed placeholder:text-[#a68992]/60 shadow-inner border border-white/5"
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Descreva o conceito visual da campanha..."
            />
          </div>

          {/* Quick Magic Enhancer & Tags */}
          <div className="flex flex-col gap-2 pt-0.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <button
                onClick={handleEnhancePrompt}
                disabled={isEnhancing}
                className="group flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#34343a] hover:bg-[#38393f] active:scale-95 transition-all text-[#ffb0cd] font-space text-xs font-semibold shadow-sm border border-white/5"
                type="button"
              >
                <span
                  className={`material-symbols-outlined text-[16px] group-hover:rotate-12 transition-transform text-[#ffb0cd] ${
                    isEnhancing ? 'animate-spin' : ''
                  }`}
                >
                  auto_fix_high
                </span>
                <span>{isEnhancing ? 'Aprimorando...' : 'Melhorar com Prompt Engineer IA'}</span>
              </button>

              <button
                onClick={() => {
                  setPrompt('');
                  onShowToast('Prompt limpo');
                }}
                className="text-[#debec8] hover:text-white text-xs font-space px-2 py-1 transition-colors"
                type="button"
              >
                Limpar
              </button>
            </div>

            <div className="flex items-center space-x-1.5 overflow-x-auto py-1 no-scrollbar">
              {chips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleAddChip(chip)}
                  className="flex-shrink-0 px-2.5 py-1 rounded-full bg-[#1a1b21] hover:bg-[#38393f] text-[#debec8] hover:text-white text-[11px] font-space transition-colors border border-white/5"
                  type="button"
                >
                  + {chip}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Asset Upload / Compositing Slot */}
      <section className="w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[#ffb0cd] text-[20px]">layers</span>
            <h3 className="font-syne text-base font-bold text-white">Asset do Produto</h3>
          </div>
          <span className="font-space text-xs text-[#4cd7f6] font-semibold">PNG Transparente</span>
        </div>

        <div className="relative bg-[#1e1f25]/80 rounded-2xl p-4 shadow-lg border border-white/5 overflow-hidden">
          {/* Checkerboard Pattern for Transparency Feedback */}
          <div className="relative w-full h-44 rounded-xl bg-[#0d0e13] flex items-center justify-center overflow-hidden shadow-inner border border-white/5">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />

            {/* Live Cutout Asset Preview */}
            <div className="relative z-10 flex flex-col items-center justify-center p-2">
              <img
                className="h-28 w-auto object-contain drop-shadow-[0_12px_24px_rgba(247,81,161,0.35)] transition-transform hover:scale-105 duration-300"
                src={assetImage}
                alt="Product cutout asset"
                referrerPolicy="no-referrer"
              />
              <div className="mt-2 flex items-center space-x-1.5 bg-[#292a2f]/90 backdrop-blur-md px-3 py-1 rounded-full text-[#4cd7f6] shadow-md border border-white/5">
                <span className="material-symbols-outlined text-[14px] text-[#4cd7f6]">check_circle</span>
                <span className="font-space text-[10px] sm:text-xs font-semibold">
                  Fundo removido automaticamente
                </span>
              </div>
            </div>

            {/* Floating Replace Control */}
            <label className="absolute top-3 right-3 bg-[#292a2f]/90 hover:bg-[#38393f] p-2 rounded-full text-white transition-all shadow-md active:scale-90 cursor-pointer border border-white/10">
              <span className="material-symbols-outlined text-[18px]">sync_alt</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          {/* Asset Metadata */}
          <div className="mt-3 flex items-center justify-between px-1">
            <div className="flex items-center space-x-2 min-w-0">
              <span className="material-symbols-outlined text-[#d0bcff] text-[18px]">image</span>
              <span className="font-space text-xs sm:text-sm text-white font-medium truncate">
                {assetName}
              </span>
            </div>
            <span className="font-space text-xs text-[#a68992]">2400 x 3200 px</span>
          </div>
        </div>
      </section>

      {/* Advanced Commercial Controls */}
      <section className="w-full space-y-4">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">tune</span>
          <h3 className="font-syne text-base font-bold text-white">Configurações Comerciais</h3>
        </div>

        {/* Aspect Ratio Visual Selector */}
        <div className="bg-[#1e1f25]/80 rounded-2xl p-4 shadow-lg border border-white/5 space-y-2.5">
          <label className="font-space text-xs font-semibold text-[#debec8] block uppercase tracking-wider">
            Formato de Saída (Aspect Ratio)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {/* 9:16 */}
            <button
              onClick={() => setAspectRatio('9:16')}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                aspectRatio === '9:16'
                  ? 'bg-[#34343a] text-[#ffb0cd] border-[#ffb0cd]/50 shadow-md'
                  : 'bg-[#1a1b21] text-[#debec8] border-white/5 hover:bg-[#292a2f]'
              }`}
              type="button"
            >
              <div className="w-4 h-7 rounded-sm bg-[#ffb0cd]/20 mb-2 flex items-center justify-center">
                <div className={`w-2.5 h-5 rounded-[2px] ${aspectRatio === '9:16' ? 'bg-[#ffb0cd]' : 'bg-[#a68992]'}`} />
              </div>
              <span className="font-space text-xs font-bold text-white">Story / Reels</span>
              <span className="font-space text-[10px] text-[#4cd7f6] mt-0.5">9:16</span>
            </button>

            {/* 1:1 */}
            <button
              onClick={() => setAspectRatio('1:1')}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                aspectRatio === '1:1'
                  ? 'bg-[#34343a] text-[#ffb0cd] border-[#ffb0cd]/50 shadow-md'
                  : 'bg-[#1a1b21] text-[#debec8] border-white/5 hover:bg-[#292a2f]'
              }`}
              type="button"
            >
              <div className="w-6 h-6 rounded-sm bg-[#1e1f25] mb-2 flex items-center justify-center border border-white/5">
                <div className={`w-4 h-4 rounded-[2px] ${aspectRatio === '1:1' ? 'bg-[#ffb0cd]' : 'bg-[#a68992]'}`} />
              </div>
              <span className="font-space text-xs font-bold text-white">Feed Post</span>
              <span className="font-space text-[10px] text-[#debec8] mt-0.5">1:1</span>
            </button>

            {/* 16:9 */}
            <button
              onClick={() => setAspectRatio('16:9')}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                aspectRatio === '16:9'
                  ? 'bg-[#34343a] text-[#ffb0cd] border-[#ffb0cd]/50 shadow-md'
                  : 'bg-[#1a1b21] text-[#debec8] border-white/5 hover:bg-[#292a2f]'
              }`}
              type="button"
            >
              <div className="w-7 h-4 rounded-sm bg-[#1e1f25] mb-3 flex items-center justify-center border border-white/5">
                <div className={`w-5 h-2.5 rounded-[2px] ${aspectRatio === '16:9' ? 'bg-[#ffb0cd]' : 'bg-[#a68992]'}`} />
              </div>
              <span className="font-space text-xs font-bold text-white">Display Banner</span>
              <span className="font-space text-[10px] text-[#debec8] mt-0.5">16:9</span>
            </button>
          </div>
        </div>

        {/* Studio Lighting Rig */}
        <div className="bg-[#1e1f25]/80 rounded-2xl p-4 shadow-lg border border-white/5 space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="font-space text-xs font-semibold text-[#debec8] uppercase tracking-wider">
              Estilo de Iluminação de Estúdio
            </label>
            <span className="font-space text-[10px] text-[#d0bcff] font-bold">3 Pontos de Luz</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLighting('neon')}
              className={`flex items-center space-x-3 p-3 rounded-xl text-left transition-all border ${
                lighting === 'neon'
                  ? 'bg-[#34343a] border-[#ffb0cd]/50 text-[#ffb0cd] shadow-sm'
                  : 'bg-[#1a1b21] border-white/5 text-[#debec8] hover:bg-[#292a2f]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px] text-[#ffb0cd]">fluorescent</span>
              <div className="min-w-0 flex-1">
                <p className="font-space text-xs font-bold text-white truncate">Neon Glow</p>
                <p className="font-space text-[10px] text-[#4cd7f6] truncate">Rim Ciano & Magenta</p>
              </div>
            </button>

            <button
              onClick={() => setLighting('golden')}
              className={`flex items-center space-x-3 p-3 rounded-xl text-left transition-all border ${
                lighting === 'golden'
                  ? 'bg-[#34343a] border-[#ffb0cd]/50 text-[#ffb0cd] shadow-sm'
                  : 'bg-[#1a1b21] border-white/5 text-[#debec8] hover:bg-[#292a2f]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px] text-[#d0bcff]">wb_twilight</span>
              <div className="min-w-0 flex-1">
                <p className="font-space text-xs font-bold text-white truncate">Golden Hour</p>
                <p className="font-space text-[10px] text-[#debec8] truncate">Cálido & Caústicos</p>
              </div>
            </button>

            <button
              onClick={() => setLighting('softbox')}
              className={`flex items-center space-x-3 p-3 rounded-xl text-left transition-all border ${
                lighting === 'softbox'
                  ? 'bg-[#34343a] border-[#ffb0cd]/50 text-[#ffb0cd] shadow-sm'
                  : 'bg-[#1a1b21] border-white/5 text-[#debec8] hover:bg-[#292a2f]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px] text-[#a68992]">wb_shade</span>
              <div className="min-w-0 flex-1">
                <p className="font-space text-xs font-bold text-white truncate">Softbox Studio</p>
                <p className="font-space text-[10px] text-[#debec8] truncate">Difuso & Editorial</p>
              </div>
            </button>

            <button
              onClick={() => setLighting('cyber')}
              className={`flex items-center space-x-3 p-3 rounded-xl text-left transition-all border ${
                lighting === 'cyber'
                  ? 'bg-[#34343a] border-[#ffb0cd]/50 text-[#ffb0cd] shadow-sm'
                  : 'bg-[#1a1b21] border-white/5 text-[#debec8] hover:bg-[#292a2f]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[24px] text-[#a68992]">contrast</span>
              <div className="min-w-0 flex-1">
                <p className="font-space text-xs font-bold text-white truncate">Cyberpunk Noir</p>
                <p className="font-space text-[10px] text-[#debec8] truncate">Contraste Alto</p>
              </div>
            </button>
          </div>
        </div>

        {/* Engine Quality & Compositing Toggle */}
        <div className="bg-[#1e1f25]/80 rounded-2xl p-4 shadow-lg border border-white/5 space-y-3">
          {/* Quality Model */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-space text-xs sm:text-sm font-bold text-white">Motor Gerador</span>
              <p className="font-space text-xs text-[#debec8]">Ultra-Realism v5.2 (4K HDR)</p>
            </div>
            <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-[#34343a] text-[#4cd7f6] font-space text-xs font-bold border border-white/5">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>HDR 10-bit</span>
            </span>
          </div>

          {/* Toggle Compositing */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <div className="space-y-0.5 pr-4">
              <span className="font-space text-xs sm:text-sm font-bold text-white">
                Composição com IA de Produto
              </span>
              <p className="font-space text-xs text-[#debec8]">
                Preserva rótulos, logo e geometria vetorial exatos.
              </p>
            </div>
            <button
              onClick={() => setCompositingActive(!compositingActive)}
              className={`w-13 h-7 px-0.5 rounded-full flex items-center transition-colors shadow-inner shrink-0 ${
                compositingActive
                  ? 'bg-gradient-to-r from-[#f751a1] to-[#571bc1]'
                  : 'bg-[#34343a]'
              }`}
              type="button"
            >
              <span
                className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                  compositingActive ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Live Variations Gallery Preview Skeleton */}
      <section className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-syne text-base font-bold text-white">Estilo do Deck Criativo</span>
          <span className="font-space text-xs text-[#debec8]">4 Mockups Simultâneos</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div
            onClick={() =>
              onOpenPreview({
                title: 'Variação A • Rim Light Neon',
                imageUrl: ASSETS.variationA,
                badge: 'Var A • Rim Light',
                subtitle: 'Macro publicitário de frasco de cristal sobre rocha basáltica preta.',
                prompt,
              })
            }
            className="relative h-32 sm:h-40 rounded-2xl bg-[#1a1b21] overflow-hidden shadow-md group cursor-pointer border border-white/5 hover:border-[#ffb0cd]/40 transition-all"
          >
            <img
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
              src={ASSETS.variationA}
              alt="Var A"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e13]/85 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 font-space text-[10px] font-bold bg-[#292a2f]/90 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[#ffb0cd] border border-white/5">
              Var A • Rim Light
            </span>
          </div>

          <div
            onClick={() =>
              onOpenPreview({
                title: 'Variação B • Caustics & Water',
                imageUrl: ASSETS.variationB,
                badge: 'Var B • Caustics',
                subtitle: 'Visual amplo com reflexos cáusticos dourados e névoa volumétrica sutil.',
                prompt,
              })
            }
            className="relative h-32 sm:h-40 rounded-2xl bg-[#1a1b21] overflow-hidden shadow-md group cursor-pointer border border-white/5 hover:border-[#4cd7f6]/40 transition-all"
          >
            <img
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
              src={ASSETS.variationB}
              alt="Var B"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e13]/85 via-transparent to-transparent" />
            <span className="absolute bottom-2 left-2 font-space text-[10px] font-bold bg-[#292a2f]/90 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[#4cd7f6] border border-white/5">
              Var B • Caustics
            </span>
          </div>
        </div>
      </section>

      {/* Grand Launch CTA Footer */}
      <section className="w-full pt-1">
        <div className="bg-[#0d0e13]/90 backdrop-blur-xl p-3.5 rounded-3xl shadow-2xl border border-white/5 space-y-2">
          <button
            onClick={handleGenerate}
            disabled={isRendering}
            className="w-full py-4 px-4 rounded-full bg-gradient-to-r from-[#f751a1] via-[#b4136d] to-[#571bc1] text-white font-syne text-sm sm:text-base font-bold tracking-tight flex items-center justify-center space-x-2 shadow-[0_0_28px_rgba(247,81,161,0.4)] hover:shadow-[0_0_36px_rgba(247,81,161,0.6)] active:scale-[0.98] transition-all disabled:opacity-75"
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[24px] ${
                isRendering ? 'animate-spin' : ''
              }`}
            >
              {isRendering ? 'sync' : 'auto_awesome'}
            </span>
            <span>{isRendering ? 'Renderizando 4 Variações 4K...' : 'Gerar 4 Variações Publicitárias'}</span>
          </button>

          <div className="flex items-center justify-around px-2 py-1 text-xs text-[#debec8]">
            <div className="flex items-center space-x-1.5 font-space">
              <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">bolt</span>
              <span>
                Custo: <strong className="text-white">12 Créditos</strong>
              </span>
            </div>
            <div className="h-3 w-px bg-[#34343a]" />
            <div className="flex items-center space-x-1.5 font-space">
              <span className="material-symbols-outlined text-[16px] text-[#d0bcff]">schedule</span>
              <span>
                Tempo estimado: <strong className="text-white">~15s</strong>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
