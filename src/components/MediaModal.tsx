import React from 'react';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageUrl: string;
  badge?: string;
  subtitle?: string;
  prompt?: string;
  onUsePrompt?: (prompt: string) => void;
  onShowToast: (msg: string) => void;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  title,
  imageUrl,
  badge,
  subtitle,
  prompt,
  onUsePrompt,
  onShowToast,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#1a1b21] border border-white/10 rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl relative flex flex-col max-h-[92vh]">
        {/* Top bar */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {badge && (
              <span className="bg-[#ffb0cd]/20 text-[#ffb0cd] border border-[#ffb0cd]/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {badge}
              </span>
            )}
            <h3 className="font-syne font-bold text-white text-base truncate">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Media Preview Canvas */}
        <div className="relative bg-[#0d0e13] flex items-center justify-center overflow-hidden min-h-[260px] max-h-[460px]">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full max-h-[440px] object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-mono text-[#4cd7f6] border border-white/10">
            Render 4K Ultra
          </div>
        </div>

        {/* Details & Actions */}
        <div className="p-4 space-y-3 overflow-y-auto">
          {subtitle && (
            <p className="text-xs text-[#debec8] leading-relaxed">{subtitle}</p>
          )}

          {prompt && (
            <div className="bg-[#121318] p-3 rounded-xl border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-[#a68992] uppercase font-semibold">
                <span>Prompt Utilizado</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(prompt);
                    onShowToast('Prompt copiado para a área de transferência!');
                  }}
                  className="text-[#ffb0cd] hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[12px]">content_copy</span>
                  <span>Copiar</span>
                </button>
              </div>
              <p className="text-xs text-white/90 italic line-clamp-3">"{prompt}"</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                onShowToast('Iniciando download do arquivo 4K...');
                const a = document.createElement('a');
                a.href = imageUrl;
                a.target = '_blank';
                a.download = `${title.toLowerCase().replace(/\s+/g, '_')}_4k.png`;
                a.click();
              }}
              className="py-2.5 px-3 rounded-xl bg-[#292a2f] hover:bg-[#34343a] text-white font-space text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-sm text-[#4cd7f6]">download</span>
              <span>Baixar Asset</span>
            </button>

            {prompt && onUsePrompt ? (
              <button
                type="button"
                onClick={() => {
                  onUsePrompt(prompt);
                  onClose();
                }}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#f751a1] to-[#571bc1] text-white font-space text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>Usar no Estúdio</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(imageUrl);
                  onShowToast('Link direto copiado!');
                }}
                className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-space text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">link</span>
                <span>Copiar Link</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
