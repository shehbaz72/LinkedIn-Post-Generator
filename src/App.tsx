import { useState, useEffect } from 'react';
import {
  AgendaSession,
  DraftPost,
  EventCampaign,
  NavTab,
  PostAttachment,
  PostTemplate,
  RoleMode,
  ToneType,
} from './types';
import {
  DEFAULT_ATTACHMENT,
  GENERATED_POST_VARIANTS,
  INITIAL_CAMPAIGN,
  INITIAL_TAKEAWAYS_INPUT,
} from './data/mockData';
import { Header } from './components/Header';
import { OfficialEventSpotlight } from './components/OfficialEventSpotlight';
import { DraftingStudio } from './components/DraftingStudio';
import { LinkedInPreviewCard } from './components/LinkedInPreviewCard';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { TemplatesView } from './components/TemplatesView';
import { PreviewFeedView } from './components/PreviewFeedView';
import { AnalyticsView } from './components/AnalyticsView';
import { ScheduleView } from './components/ScheduleView';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { PhotoPickerModal } from './components/PhotoPickerModal';
import { QRCodeModal } from './components/QRCodeModal';

export default function App() {
  const [role, setRole] = useState<RoleMode>('attendee');
  const [activeTab, setActiveTab] = useState<NavTab>('compose');

  // Shared state: Campaign configuration
  const [campaign, setCampaign] = useState<EventCampaign>(INITIAL_CAMPAIGN);

  // Attendee Drafting State
  const [highlights, setHighlights] = useState<string>(INITIAL_TAKEAWAYS_INPUT);
  const [tone, setTone] = useState<ToneType>('professional');
  const [attachment, setAttachment] = useState<PostAttachment | null>(DEFAULT_ATTACHMENT);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Draft Post live data
  const [draft, setDraft] = useState<DraftPost>({
    highlights: INITIAL_TAKEAWAYS_INPUT,
    tone: 'professional',
    attachment: DEFAULT_ATTACHMENT,
    generatedText: {
      hook: GENERATED_POST_VARIANTS.professional.hook,
      takeaways: [...GENERATED_POST_VARIANTS.professional.takeaways],
      cta: GENERATED_POST_VARIANTS.professional.cta,
      hashtags: [...INITIAL_CAMPAIGN.hashtags, '#AIInnovation'],
    },
    reactionsCount: 48,
    commentsCount: 12,
    repostsCount: 4,
    userLiked: false,
  });

  // Modals & Feedback
  const [photoPickerOpen, setPhotoPickerOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    window.clearTimeout((window as unknown as { _toastTimer?: number })._toastTimer);
    (window as unknown as { _toastTimer?: number })._toastTimer = window.setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  // Tone switch regenerates live preview immediately with corresponding variant
  const handleToneChange = (newTone: ToneType) => {
    setTone(newTone);
    generatePostForTone(newTone, highlights);
    showToast(`Switched tone to ${newTone.charAt(0).toUpperCase() + newTone.slice(1)}`);
  };

  const generatePostForTone = (selectedTone: ToneType, customHighlights: string) => {
    const variant = GENERATED_POST_VARIANTS[selectedTone];
    const eventShortName = campaign.name.split(':')[0];

    let dynamicHook = variant.hook;
    if (customHighlights && customHighlights !== INITIAL_TAKEAWAYS_INPUT) {
      if (selectedTone === 'professional') {
        dynamicHook = `Exciting reflections from ${eventShortName} hosted by ${campaign.organizerName}! 🚀\n\nKey takeaways from the sessions:`;
      } else if (selectedTone === 'grateful') {
        dynamicHook = `Incredible gratitude for the community at ${eventShortName}! 🙏 Thank you to ${campaign.organizerName} for assembling such inspiring builders.`;
      } else {
        dynamicHook = `Key takeaways from ${eventShortName} by ${campaign.organizerName}. Three pivotal shifts every engineering leader should note:`;
      }
    }

    // Adapt takeaways if user entered specific notes
    let dynamicTakeaways = [...variant.takeaways];
    if (customHighlights && customHighlights.length > 20) {
      const sentences = customHighlights
        .split(/[.!?]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 5);

      if (sentences.length >= 2) {
        dynamicTakeaways = [
          sentences[0],
          sentences[1] || variant.takeaways[1],
          sentences[2] || variant.takeaways[2],
        ];
      }
    }

    setDraft((prev) => ({
      ...prev,
      tone: selectedTone,
      highlights: customHighlights,
      attachment,
      generatedText: {
        hook: dynamicHook,
        takeaways: dynamicTakeaways,
        cta: variant.cta,
        hashtags: [...campaign.hashtags, '#AIInnovation'],
      },
    }));
  };

  const handleGeneratePost = () => {
    setIsGenerating(true);
    setTimeout(() => {
      generatePostForTone(tone, highlights);
      setIsGenerating(false);
      showToast('LinkedIn post synthesized and ready in Live Preview! ✨');
      // Scroll smoothly down to preview card on mobile if needed
      const previewEl = document.getElementById('copy-btn');
      if (previewEl) {
        previewEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 450);
  };

  const handleUpdateDraft = (updated: Partial<DraftPost>) => {
    setDraft((prev) => ({ ...prev, ...updated }));
  };

  const handleUpdateCampaign = (updated: Partial<EventCampaign>) => {
    setCampaign((prev) => {
      const next = { ...prev, ...updated };
      // Also update draft hashtags
      setDraft((d) => ({
        ...d,
        generatedText: {
          ...d.generatedText,
          hashtags: [...next.hashtags, '#AIInnovation'],
        },
      }));
      return next;
    });
  };

  const handleSelectTemplate = (tpl: PostTemplate) => {
    setHighlights(tpl.highlights);
    setTone(tpl.tone);
    generatePostForTone(tpl.tone, tpl.highlights);
  };

  const handleDraftAboutSession = (session: AgendaSession) => {
    const sessionText = `Attended "${session.title}" with ${session.speaker}. Key takeaway: ${session.keyTakeaway}`;
    setHighlights(sessionText);
    setTone('takeaways');
    generatePostForTone('takeaways', sessionText);
  };

  const handleTagClickInSpotlight = (tag: string) => {
    if (!highlights.includes(tag)) {
      const updated = `${highlights} ${tag}`.trim();
      setHighlights(updated);
    }
  };

  // Sync draft attachment when changed
  useEffect(() => {
    setDraft((prev) => ({ ...prev, attachment }));
  }, [attachment]);

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-sans selection:bg-[#d6e3ff]">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Top Fixed Header */}
      <Header
        role={role}
        onRoleChange={setRole}
        activeTab={activeTab}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'analytics' || tab === 'compose') {
            // Keep role in sync if requested
          }
        }}
        onShowToast={showToast}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto pt-32 pb-24 px-4 flex flex-col">
        {/* Render based on Role & Active Tab */}
        {role === 'organizer' ? (
          <OrganizerDashboard
            campaign={campaign}
            onUpdateCampaign={handleUpdateCampaign}
            onNavigateTab={setActiveTab}
            onOpenQR={() => setQrModalOpen(true)}
            onShowToast={showToast}
          />
        ) : (
          /* Attendee View Router */
          <>
            {activeTab === 'compose' && (
              <div className="flex flex-col gap-6">
                {/* 1. Official Event Spotlight Card */}
                <OfficialEventSpotlight
                  campaign={campaign}
                  onTagClick={handleTagClickInSpotlight}
                  onShowToast={showToast}
                />

                {/* 2. Drafting Studio Card */}
                <DraftingStudio
                  highlights={highlights}
                  onHighlightsChange={setHighlights}
                  tone={tone}
                  onToneChange={handleToneChange}
                  attachment={attachment}
                  onAttachmentChange={setAttachment}
                  onOpenPhotoPicker={() => setPhotoPickerOpen(true)}
                  onGeneratePost={handleGeneratePost}
                  isGenerating={isGenerating}
                  campaign={campaign}
                />

                {/* 3. Live Preview Section (Realistic LinkedIn Card) */}
                <LinkedInPreviewCard
                  draft={draft}
                  campaign={campaign}
                  onUpdateDraft={handleUpdateDraft}
                  onShowToast={showToast}
                />
              </div>
            )}

            {activeTab === 'templates' && (
              <TemplatesView
                onSelectTemplate={handleSelectTemplate}
                onNavigateTab={setActiveTab}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'preview-feed' && (
              <PreviewFeedView
                draft={draft}
                campaign={campaign}
                onUpdateDraft={handleUpdateDraft}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsView
                campaign={campaign}
                onSwitchToOrganizer={(newRole) => setRole(newRole)}
                onOpenQR={() => setQrModalOpen(true)}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'schedule' && (
              <ScheduleView
                onDraftAboutSession={handleDraftAboutSession}
                onNavigateTab={setActiveTab}
                onShowToast={showToast}
              />
            )}
          </>
        )}
      </main>

      {/* Bottom Fixed Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          // When switching tabs, if user picks analytics while in attendee, they see analytics
          if (tab === 'analytics' && role === 'organizer') {
            // keep organizer
          }
        }}
      />

      {/* Photo Picker Modal */}
      <PhotoPickerModal
        isOpen={photoPickerOpen}
        onClose={() => setPhotoPickerOpen(false)}
        currentAttachment={attachment}
        onSelectPhoto={(photo) => setAttachment(photo)}
        onShowToast={showToast}
      />

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        campaign={campaign}
        onShowToast={showToast}
      />
    </div>
  );
}
