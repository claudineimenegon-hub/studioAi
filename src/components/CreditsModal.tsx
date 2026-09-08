import React from 'react';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  credits: number;
  onAddCredits: (amount: number) => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({
  isOpen,
  onClose,
  credits,
  onAddCredits,
}) => {
  if (!isOpen) return null;

  const packages = [
    { name: 'Starter Boost', amount: 150, price: 'R$ 49', bonus: '' },
    { name: 'Studio Pro', amount: 500, price: 'R$ 129', bonus: '+50 Bônus', popular: true },
    { name: 'Agency Scale', amount: 2000, price: 'R$ 399', bonus: '+300 Bônus' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#1a1b21] border border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#f751a1]/20 border border-[#f751a1]/40 flex items-center justify-center text-[#ffb0cd]">
            <span className="material-symbols-outlined text-2xl">bolt</span>
          </div>
          <div>
            <h3 className="font-syne text-xl font-bold text-white">Saldo de Créditos</h3>
            <p className="text-xs text-[#debec8]">Potência de renderização neural H100</p>
          </div>
        </div>

        <div className="bg-[#121318] p-4 rounded-2xl border border-white/5 mb-6 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#a68992] uppercase font-semibold">Créditos Disponíveis</span>
            <div className="text-3xl font-syne font-bold text-[#4cd7f6]">{credits}</div>
          </div>
          <span className="bg-[#009eb9]/20 text-[#4cd7f6] text-xs font-semibold px-3 py-1 rounded-full border border-[#4cd7f6]/30">
            Pro Tier Ativo
          </span>
        </div>

        <div className="space-y-3 mb-6">
          <p className="text-xs font-semibold text-[#debec8] uppercase tracking-wider">Recarregar Créditos</p>
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                pkg.popular
                  ? 'bg-gradient-to-r from-[#f751a1]/15 to-[#571bc1]/20 border-[#ffb0cd]/50 shadow-lg'
                  : 'bg-[#292a2f]/60 hover:bg-[#292a2f] border-white/5'
              }`}
              onClick={() => {
                onAddCredits(pkg.amount);
                onClose();
              }}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{pkg.name}</span>
                  {pkg.bonus && (
                    <span className="text-[10px] bg-[#f751a1] text-white px-2 py-0.5 rounded-full font-bold">
                      {pkg.bonus}
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#4cd7f6] font-medium">{pkg.amount} Créditos</span>
              </div>
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#ffb0cd] hover:text-black font-space text-xs font-bold text-white transition-colors"
              >
                {pkg.price}
              </button>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-center text-[#a68992]">
          Gerações de imagem: 12 créditos • Vídeos 4K: 25 créditos • Kits vetoriais: 2 créditos
        </p>
      </div>
    </div>
  );
};
