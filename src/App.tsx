import React, { useState } from 'react';
import { ScreenTab, TemplateItem, CampaignItem } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HubScreen } from './components/screens/HubScreen';
import { ImageScreen } from './components/screens/ImageScreen';
import { VideoScreen } from './components/screens/VideoScreen';
import { BrandScreen } from './components/screens/BrandScreen';
import { GalleryScreen } from './components/screens/GalleryScreen';
import { Toast } from './components/Toast';
import { CreditsModal } from './components/CreditsModal';
import { MediaModal } from './components/MediaModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ScreenTab>('hub');
  const [credits, setCredits] = useState<number>(450);
  const [toast, setToast] = useState<{ message: string | null; icon?: string }>({
    message: null,
    icon: 'check_circle',
  });
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const [previewModalData, setPreviewModalData] = useState<{
    title: string;
    imageUrl: string;
    badge?: string;
    subtitle?: string;
    prompt?: string;
  } | null>(null);

  const [activePrompt, setActivePrompt] = useState<string>('');

  const showToast = (message: string, icon = 'check_circle') => {
    setToast({ message, icon });
    setTimeout(() => {
      setToast({ message: null });
    }, 2800);
  };

  const handleDeductCredits = (amount: number): boolean => {
    if (credits < amount) {
      showToast('Créditos insuficientes! Recarregue no topo.', 'warning');
      setIsCreditsModalOpen(true);
      return false;
    }
    setCredits((prev) => prev - amount);
    return true;
  };

  const handleAddCredits = (amount: number) => {
    setCredits((prev) => prev + amount);
    showToast(`+${amount} créditos adicionados com sucesso!`, 'bolt');
  };

  const handleOpenTemplate = (template: TemplateItem) => {
    setPreviewModalData({
      title: template.title,
      imageUrl: template.imageUrl,
      badge: `${template.badge} • ${template.aspectRatio}`,
      subtitle: `${template.description} (${template.uses})`,
      prompt: template.prompt,
    });
  };

  const handleOpenCampaign = (campaign: CampaignItem) => {
    setPreviewModalData({
      title: campaign.title,
      imageUrl: campaign.imageUrl,
      badge: `${campaign.tag} • ${campaign.aspect}`,
      subtitle: `${campaign.meta} • ${campaign.timeAgo}`,
      prompt: `Publicity campaign shoot for ${campaign.title} in format ${campaign.format} with cinematic lighting`,
    });
  };

  const handleUsePromptInStudio = (promptText: string) => {
    setActivePrompt(promptText);
    setCurrentTab('imagem');
    showToast('Prompt carregado no estúdio de Imagem!', 'auto_awesome');
  };

  return (
    <div className="min-h-screen bg-[#121318] text-[#e3e1e9] font-space flex flex-col antialiased selection:bg-[#ffb0cd]/30 selection:text-[#ffb0cd]">
      {/* Top Fixed Header */}
      <Header
        currentTab={currentTab}
        credits={credits}
        onOpenCreditsModal={() => setIsCreditsModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-xl md:max-w-2xl mx-auto px-3.5 sm:px-5 pt-20">
        {currentTab === 'hub' && (
          <HubScreen
            onSelectTab={setCurrentTab}
            onOpenTemplate={handleOpenTemplate}
            onOpenCampaign={handleOpenCampaign}
            onOpenCredits={() => setIsCreditsModalOpen(true)}
            credits={credits}
          />
        )}

        {currentTab === 'imagem' && (
          <ImageScreen
            credits={credits}
            onDeductCredits={handleDeductCredits}
            onShowToast={showToast}
            onOpenPreview={(data) => setPreviewModalData(data)}
            activePrompt={activePrompt}
          />
        )}

        {currentTab === 'video' && (
          <VideoScreen
            credits={credits}
            onDeductCredits={handleDeductCredits}
            onShowToast={showToast}
            onOpenPreview={(data) => setPreviewModalData(data)}
          />
        )}

        {currentTab === 'brand' && (
          <BrandScreen
            onShowToast={showToast}
            onNavigateToTab={setCurrentTab}
            onOpenPreview={(data) => setPreviewModalData(data)}
            onDeductCredits={handleDeductCredits}
            credits={credits}
          />
        )}

        {currentTab === 'galeria' && (
          <GalleryScreen
            onShowToast={showToast}
            onOpenPreview={(data) => setPreviewModalData(data)}
          />
        )}
      </main>

      {/* Bottom Navigation Dock */}
      <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Toast Feedback */}
      <Toast
        message={toast.message}
        icon={toast.icon}
        onClose={() => setToast({ message: null })}
      />

      {/* Credits Reload Modal */}
      <CreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
        credits={credits}
        onAddCredits={handleAddCredits}
      />

      {/* High-Res Media Inspector / Prompt Modal */}
      {previewModalData && (
        <MediaModal
          isOpen={!!previewModalData}
          onClose={() => setPreviewModalData(null)}
          title={previewModalData.title}
          imageUrl={previewModalData.imageUrl}
          badge={previewModalData.badge}
          subtitle={previewModalData.subtitle}
          prompt={previewModalData.prompt}
          onUsePrompt={handleUsePromptInStudio}
          onShowToast={showToast}
        />
      )}
    </div>
  );
}
