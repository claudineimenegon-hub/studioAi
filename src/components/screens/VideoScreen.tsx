import React, { useState, useEffect } from 'react';
import { ASSETS } from '../../data/mockData';

interface VideoScreenProps {
  credits: number;
  onDeductCredits: (amount: number) => boolean;
  onShowToast: (msg: string, icon?: string) => void;
  onOpenPreview: (data: { title: string; imageUrl: string; badge: string; subtitle: string; prompt: string }) => void;
}

export const VideoScreen: React.FC<VideoScreenProps> = ({
  credits,
  onDeductCredits,
  onShowToast,
  onOpenPreview,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playProgress, setPlayProgress] = useState(42); // percentage
  const [cameraRig, setCameraRig] = useState<'orbit' | 'zoom' | 'fly' | 'pan' | 'pedestal'>('orbit');
  const [intensity, setIntensity] = useState(65);

  // Post production effects toggles
  const [effectVolumetric, setEffectVolumetric] = useState(true);
  const [effectParticles, setEffectParticles] = useState(true);
  const [effectBackground, setEffectBackground] = useState(false);

  // Audio toggles
  const [soundtrackActive, setSoundtrackActive] = useState(true);
  const [voiceoverActive, setVoiceoverActive] = useState(true);

  const [isRendering, setIsRendering] = useState(false);

  // Simulated play loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlayProgress((prev) => {
          if (prev >= 98) return 0;
          return prev + 2;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentTimeFormatted = `00:0${((playProgress / 100) * 8).toFixed(1)}`;

  const handleRenderVideo = () => {
    if (credits < 25) {
      onShowToast('Saldo insuficiente. 25 créditos necessários para Render 4K.', 'warning');
      return;
    }
    const ok = onDeductCredits(25);
    if (!ok) return;

    setIsRendering(true);
    onShowToast('Disparando render neural no Cluster H100...', 'movie');

    setTimeout(() => {
      setIsRendering(false);
      onShowToast('Vídeo 4K ProRes 422 renderizado com sucesso!', 'check_circle');
      onOpenPreview({
        title: 'Motion Director Lab • Render 4K',
        imageUrl: ASSETS.videoPreviewCanvas,
        badge: 'Vídeo 60fps • ProRes 422',
        subtitle: `Trajetória ${cameraRig.toUpperCase()} • Intensidade ${intensity}% • Seed #84920`,
        prompt: 'Luxury perfume bottle levitating against deep obsidian mist with vibrant magenta neon ambient streaks and cyan volumetric light refractions, 8k fashion advertising',
      });
    }, 2500);
  };

  const handlePlaySampleAudio = () => {
    onShowToast('Reproduzindo amostra de voz Sofia (Estúdio Premium PT-BR)...', 'graphic_eq');
    // synthesize simple tone or acknowledge
    try {
      const synth = window.speechSynthesis;
      if (synth) {
        const utter = new SpeechSynthesisUtterance(
          'Eleve sua presença com a nova fragrância Lumière Éternelle.'
        );
        utter.lang = 'pt-BR';
        utter.rate = 0.95;
        synth.speak(utter);
      }
    } catch {
      // ignore
    }
  };

  return (
    <div className="flex flex-col w-full pb-24 space-y-5">
      {/* Dynamic Creative Ambient Header Section */}
      <div className="pt-1 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#f751a1]/20 text-[#ffb0cd] font-space text-[10px] font-bold uppercase tracking-wider mb-1 border border-[#ffb0cd]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb0cd] animate-pulse" />
            <span>Direção Neural 4K</span>
          </div>
          <h2 className="font-syne text-xl font-bold text-white">Motion Director Lab</h2>
        </div>
        <div className="flex items-center gap-1.5 bg-[#292a2f] px-3 py-1.5 rounded-full text-[#d0bcff] font-space text-xs font-semibold border border-white/5">
          <span className="material-symbols-outlined text-sm text-[#4cd7f6]">auto_videocam</span>
          <span>Seed #84920</span>
        </div>
      </div>

      {/* Video Canvas & Playback Studio */}
      <div className="w-full">
        <div className="relative w-full aspect-[9/16] max-h-[440px] rounded-2xl overflow-hidden bg-[#0d0e13] shadow-2xl flex flex-col justify-between p-4 border border-white/10 group">
          {/* Media Canvas Image */}
          <img
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
            src={ASSETS.videoPreviewCanvas}
            alt="Video frame canvas"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e13]/90 via-transparent to-[#0d0e13]/60 pointer-events-none" />

          {/* Top Scrim Badges */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 bg-[#0d0e13]/80 backdrop-blur-md px-3 py-1 rounded-full text-[#4cd7f6] font-space text-xs font-semibold border border-white/5">
              <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-ping" />
              <span>Preview 1080p 60fps</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-[#0d0e13]/70 backdrop-blur-md flex items-center justify-center text-white hover:text-[#ffb0cd] transition-colors border border-white/5"
              >
                <span className="material-symbols-outlined text-base">aspect_ratio</span>
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-[#0d0e13]/70 backdrop-blur-md flex items-center justify-center text-white hover:text-[#ffb0cd] transition-colors border border-white/5"
              >
                <span className="material-symbols-outlined text-base">hd</span>
              </button>
            </div>
          </div>

          {/* Centered Interactive Play Trigger */}
          <div className="relative z-10 self-center my-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-[#0d0e13]/70 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white shadow-[0_0_30px_rgba(247,81,161,0.4)] hover:scale-110 active:scale-95 transition-all"
              type="button"
              aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
            >
              <span className="material-symbols-outlined text-3xl text-[#ffb0cd]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </div>

          {/* Scrim Timeline Overlay with Scrubbing */}
          <div className="relative z-10 w-full bg-[#0d0e13]/85 backdrop-blur-lg rounded-xl p-3 flex flex-col gap-2 border border-white/5">
            <div className="flex items-center justify-between text-[#debec8] font-space text-xs">
              <span className="text-white font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-[#ffb0cd]">motion_photos_on</span>
                {currentTimeFormatted}
              </span>
              <span className="text-[#4cd7f6] font-mono">00:08.0</span>
            </div>

            {/* Custom Scrubber Bar */}
            <div
              className="relative w-full h-4 flex items-center cursor-pointer group/bar"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newPct = Math.max(0, Math.min(100, Math.round((clickX / rect.width) * 100)));
                setPlayProgress(newPct);
              }}
            >
              <div className="w-full h-1.5 bg-[#34343a] rounded-full overflow-hidden flex items-center">
                <div
                  className="h-full bg-gradient-to-r from-[#f751a1] to-[#571bc1] rounded-full transition-all"
                  style={{ width: `${playProgress}%` }}
                />
              </div>
              <div
                className="absolute -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_12px_#f751a1] flex items-center justify-center transition-all group-hover/bar:scale-125"
                style={{ left: `${playProgress}%` }}
              >
                <div className="w-1.5 h-1.5 bg-[#f751a1] rounded-full" />
              </div>
            </div>

            {/* Quick Camera Anchor Indicator */}
            <div className="flex items-center justify-between text-[11px] px-0.5">
              <span className="text-[#debec8] flex items-center gap-1 font-space">
                <span className="material-symbols-outlined text-xs text-[#d0bcff]">videocam</span>
                <span>{cameraRig.toUpperCase()} Activo</span>
              </span>
              <span className="text-[#d0bcff] font-space">Interpolando Keyframes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Rig Control */}
      <div className="bg-[#1a1b21] rounded-2xl p-4 shadow-lg border border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#f751a1]/20 flex items-center justify-center text-[#ffb0cd] border border-[#ffb0cd]/30">
              <span className="material-symbols-outlined text-sm">3d_rotation</span>
            </div>
            <div>
              <h3 className="font-syne text-base font-bold text-white leading-tight">
                Direção de Câmera 3D
              </h3>
              <p className="font-space text-xs text-[#debec8]">Trajetória e física do sensor cinemático</p>
            </div>
          </div>
          <span className="font-space text-[10px] font-bold bg-[#292a2f] px-2.5 py-1 rounded-full text-[#ffb0cd] border border-white/5">
            Cinematic AI
          </span>
        </div>

        {/* 3D Camera Movement Selector Pill Matrix */}
        <div className="flex gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar">
          {[
            { id: 'orbit', label: 'Orbit 360°', icon: 'sync' },
            { id: 'zoom', label: 'Dynamic Zoom In', icon: 'zoom_in' },
            { id: 'fly', label: 'Flythrough', icon: 'fast_forward' },
            { id: 'pan', label: 'Slow Motion Pan', icon: 'slow_motion_video' },
            { id: 'pedestal', label: 'Pedestal Up', icon: 'vertical_align_top' },
          ].map((item) => {
            const active = cameraRig === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCameraRig(item.id as any)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full font-space text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#f751a1] text-white shadow-[0_0_16px_rgba(247,81,161,0.4)]'
                    : 'bg-[#292a2f] text-[#e3e1e9] hover:bg-[#34343a] border border-white/5'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Motion Intensity Slider Section */}
        <div className="bg-[#1e1f25] rounded-xl p-3.5 space-y-2 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="font-space text-xs font-semibold text-white flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base text-[#4cd7f6]">speed</span>
              <span>Intensidade do Movimento</span>
            </span>
            <span className="font-syne text-base font-bold text-[#4cd7f6]">{intensity}%</span>
          </div>

          <div className="relative w-full flex items-center pt-1">
            <input
              type="range"
              min="15"
              max="85"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-[#34343a] rounded-full appearance-none cursor-pointer accent-[#4cd7f6]"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-space text-[#a68992]">
            <span>Sutil (15%)</span>
            <span className="text-[#4cd7f6] font-medium">Equilibrado Comercial</span>
            <span>Alta Energia (85%)</span>
          </div>
        </div>
      </div>

      {/* AI Post-Production Effects Grid */}
      <div className="bg-[#1a1b21] rounded-2xl p-4 shadow-lg border border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#571bc1]/30 flex items-center justify-center text-[#d0bcff] border border-[#d0bcff]/30">
              <span className="material-symbols-outlined text-sm">magic_button</span>
            </div>
            <div>
              <h3 className="font-syne text-base font-bold text-white leading-tight">
                Efeitos de Pós-Produção IA
              </h3>
              <p className="font-space text-xs text-[#debec8]">Renderização volumétrica & partículas</p>
            </div>
          </div>
          <span className="font-space text-xs text-[#d0bcff] font-bold">
            {[effectVolumetric, effectParticles, effectBackground].filter(Boolean).length} ativos
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {/* Effect 1: Volumetric Lighting */}
          <div
            onClick={() => setEffectVolumetric(!effectVolumetric)}
            className="flex items-center justify-between p-3 bg-[#1e1f25] rounded-xl cursor-pointer hover:bg-[#292a2f] transition-colors border border-white/5"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#34343a] flex items-center justify-center text-[#4cd7f6] shrink-0">
                <span className="material-symbols-outlined text-lg">wb_twilight</span>
              </div>
              <div className="min-w-0">
                <span className="font-space text-xs sm:text-sm font-semibold text-white block truncate">
                  Iluminação Volumétrica
                </span>
                <span className="font-space text-xs text-[#debec8] block truncate">
                  God rays com refração em neon magenta
                </span>
              </div>
            </div>
            <div
              className={`w-11 h-6 rounded-full flex items-center transition-colors p-0.5 shrink-0 ${
                effectVolumetric ? 'bg-[#f751a1]' : 'bg-[#34343a]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform shadow-md ${
                  effectVolumetric ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </div>

          {/* Effect 2: Suspended Neon Dust */}
          <div
            onClick={() => setEffectParticles(!effectParticles)}
            className="flex items-center justify-between p-3 bg-[#1e1f25] rounded-xl cursor-pointer hover:bg-[#292a2f] transition-colors border border-white/5"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#34343a] flex items-center justify-center text-[#ffb0cd] shrink-0">
                <span className="material-symbols-outlined text-lg">grain</span>
              </div>
              <div className="min-w-0">
                <span className="font-space text-xs sm:text-sm font-semibold text-white block truncate">
                  Partículas Neon Suspensas
                </span>
                <span className="font-space text-xs text-[#debec8] block truncate">
                  Micro-faíscas flutuantes em gravidade zero
                </span>
              </div>
            </div>
            <div
              className={`w-11 h-6 rounded-full flex items-center transition-colors p-0.5 shrink-0 ${
                effectParticles ? 'bg-[#f751a1]' : 'bg-[#34343a]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform shadow-md ${
                  effectParticles ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </div>

          {/* Effect 3: Dynamic Ambient Replacement */}
          <div
            onClick={() => setEffectBackground(!effectBackground)}
            className="flex items-center justify-between p-3 bg-[#1e1f25] rounded-xl cursor-pointer hover:bg-[#292a2f] transition-colors border border-white/5"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#34343a] flex items-center justify-center text-[#d0bcff] shrink-0">
                <span className="material-symbols-outlined text-lg">hdr_auto</span>
              </div>
              <div className="min-w-0">
                <span className="font-space text-xs sm:text-sm font-semibold text-white block truncate">
                  Troca Dinâmica de Fundo
                </span>
                <span className="font-space text-xs text-[#debec8] block truncate">
                  Obsidian Hall Minimalista & Reflexos
                </span>
              </div>
            </div>
            <div
              className={`w-11 h-6 rounded-full flex items-center transition-colors p-0.5 shrink-0 ${
                effectBackground ? 'bg-[#f751a1]' : 'bg-[#34343a]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform shadow-md ${
                  effectBackground ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Commercial Audio & Voiceover Section */}
      <div className="bg-[#1a1b21] rounded-2xl p-4 shadow-lg border border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#009eb9]/30 flex items-center justify-center text-[#4cd7f6] border border-[#4cd7f6]/30">
              <span className="material-symbols-outlined text-sm">graphic_eq</span>
            </div>
            <div>
              <h3 className="font-syne text-base font-bold text-white leading-tight">
                Áudio & Locução Comercial
              </h3>
              <p className="font-space text-xs text-[#debec8]">Sincronização rítmica por IA</p>
            </div>
          </div>
        </div>

        {/* Soundtrack AI Module */}
        <div className="bg-[#1e1f25] rounded-xl p-3 border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#292a2f] flex items-center justify-center text-[#4cd7f6]">
                <span className="material-symbols-outlined text-lg">music_note</span>
              </div>
              <div className="min-w-0">
                <span className="font-space text-xs sm:text-sm font-semibold text-white block truncate">
                  Trilha Sonora por IA
                </span>
                <span className="font-space text-xs text-[#debec8] flex items-center gap-1">
                  <span className="text-[#4cd7f6] font-medium">Cinematic Tech Beat</span> • 128 BPM
                </span>
              </div>
            </div>
            <div
              onClick={() => setSoundtrackActive(!soundtrackActive)}
              className={`w-11 h-6 rounded-full flex items-center transition-colors p-0.5 cursor-pointer shrink-0 ${
                soundtrackActive ? 'bg-[#009eb9]' : 'bg-[#34343a]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform shadow-md ${
                  soundtrackActive ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </div>

          {/* Audio Wave Visual Mini Scrim */}
          <div className="flex items-center gap-1 h-6 px-3 bg-[#0d0e13]/60 rounded-full overflow-hidden border border-white/5">
            {[2, 4, 3, 5, 2, 4, 3, 5, 1, 4, 3, 5].map((h, i) => (
              <span
                key={i}
                className={`w-1 rounded-full bg-[#4cd7f6] transition-all ${
                  isPlaying ? 'animate-pulse' : ''
                }`}
                style={{ height: `${h * 4}px` }}
              />
            ))}
            <span className="ml-auto font-space text-[10px] text-[#4cd7f6] font-semibold">Drop Sync Auto</span>
          </div>
        </div>

        {/* AI Voiceover Module */}
        <div className="bg-[#1e1f25] rounded-xl p-3 border border-white/5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#292a2f] flex items-center justify-center text-[#ffb0cd]">
                <span className="material-symbols-outlined text-lg">record_voice_over</span>
              </div>
              <div className="min-w-0">
                <span className="font-space text-xs sm:text-sm font-semibold text-white block truncate">
                  Voz IA / Locução de Luxo
                </span>
                <span className="font-space text-xs text-[#debec8] flex items-center gap-1">
                  <span className="text-[#ffb0cd] font-medium">Sofia</span> • Confiante & Elegante
                </span>
              </div>
            </div>
            <div
              onClick={() => setVoiceoverActive(!voiceoverActive)}
              className={`w-11 h-6 rounded-full flex items-center transition-colors p-0.5 cursor-pointer shrink-0 ${
                voiceoverActive ? 'bg-[#f751a1]' : 'bg-[#34343a]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform shadow-md ${
                  voiceoverActive ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-[#292a2f] text-[#debec8] font-space text-xs">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#ffb0cd]">translate</span>
              <span>PT-BR (Estúdio Premium)</span>
            </span>
            <button
              onClick={handlePlaySampleAudio}
              className="text-[#ffb0cd] font-semibold hover:underline"
              type="button"
            >
              Ouvir Amostra
            </button>
          </div>
        </div>
      </div>

      {/* Render Primary Action Bar */}
      <div className="bg-[#1a1b21] rounded-2xl p-4 shadow-xl border border-white/5 flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs text-[#debec8] font-space">
            <span className="flex items-center gap-1.5 text-white">
              <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse" />
              <span>Fila de Render Ultra-Rápida (Cluster H100)</span>
            </span>
            <span className="text-[#4cd7f6] font-bold">Tempo est.: ~18s</span>
          </div>
          <div className="w-full h-1.5 bg-[#34343a] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#4cd7f6] to-[#f751a1] w-[88%] rounded-full" />
          </div>
        </div>

        {/* Main Render Button */}
        <button
          onClick={handleRenderVideo}
          disabled={isRendering}
          className="relative group w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-[#f751a1] via-[#571bc1] to-[#009eb9] text-white font-space text-sm font-semibold shadow-[0_0_24px_rgba(247,81,161,0.4)] hover:shadow-[0_0_36px_rgba(247,81,161,0.6)] active:scale-[0.98] transition-all flex items-center justify-between overflow-hidden disabled:opacity-70"
          type="button"
        >
          <div className="flex items-center gap-2">
            <span
              className={`material-symbols-outlined text-xl text-white ${
                isRendering ? 'animate-spin' : ''
              }`}
            >
              {isRendering ? 'sync' : 'auto_awesome'}
            </span>
            <span className="font-syne text-sm sm:text-base font-bold text-white tracking-tight">
              {isRendering ? 'Renderizando Motion 4K...' : 'Renderizar Vídeo em 4K'}
            </span>
          </div>
          <div className="flex items-center gap-1 bg-[#0d0e13]/60 backdrop-blur-md px-3 py-1 rounded-full text-white font-space text-xs font-bold border border-white/10">
            <span className="material-symbols-outlined text-xs text-[#ffd9e4]">bolt</span>
            <span>25 Créditos</span>
          </div>
        </button>

        <div className="flex items-center justify-center gap-3 text-[#a68992] font-space text-[11px] pt-1">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-[#4cd7f6]">check_circle</span>
            <span>ProRes 422 HQ</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-[#ffb0cd]">aspect_ratio</span>
            <span>9:16 Vertical</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-[#d0bcff]">hdr_on</span>
            <span>HDR10+</span>
          </span>
        </div>
      </div>
    </div>
  );
};
