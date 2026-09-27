import React, { useState } from 'react';
import { EventCampaign, PostAttachment, ToneType } from '../types';

interface DraftingStudioProps {
  highlights: string;
  onHighlightsChange: (newHighlights: string) => void;
  tone: ToneType;
  onToneChange: (newTone: ToneType) => void;
  attachment: PostAttachment | null;
  onAttachmentChange: (attachment: PostAttachment | null) => void;
  onOpenPhotoPicker: () => void;
  onGeneratePost: () => void;
  isGenerating?: boolean;
  campaign: EventCampaign;
}

export const DraftingStudio: React.FC<DraftingStudioProps> = ({
  highlights,
  onHighlightsChange,
  tone,
  onToneChange,
  attachment,
  onAttachmentChange,
  onOpenPhotoPicker,
  onGeneratePost,
  isGenerating = false,
  campaign,
}) => {
  const [isShaking, setIsShaking] = useState(false);

  const handleGenerateClick = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 200);
    onGeneratePost();
  };

  const handleQuickAdd = (snippet: string) => {
    if (highlights.includes(snippet)) return;
    const combined = highlights.trim()
      ? `${highlights.trim()} ${snippet}`
      : snippet;
    if (combined.length <= 500) {
      onHighlightsChange(combined);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white rounded-xl p-4 shadow-sm border border-[#eaedff]">
      {/* Studio Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#131b2e] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#0a66c2] text-[22px]">tune</span>
          Drafting Studio
        </h2>
        <span className="px-2.5 py-0.5 rounded-full text-[#0d4788] bg-[#e2e7ff] text-[11px] font-bold">
          Attendee Mode
        </span>
      </div>

      {/* Media Attachment Section */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#131b2e]">
          Event Media Attachment
        </label>

        {attachment ? (
          <div className="relative flex items-center justify-between bg-[#f2f3ff] rounded-lg p-2 shadow-sm border border-[#eaedff]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                onClick={onOpenPhotoPicker}
                className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#eaedff] cursor-pointer group"
                title="Click to view or change photo"
              >
                <img
                  alt={attachment.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  src={attachment.imageUrl}
                />
                <div className="absolute inset-0 bg-[#004e99]/10 group-hover:bg-transparent" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-[#131b2e] truncate max-w-[170px] sm:max-w-xs">
                    {attachment.name}
                  </span>
                  <span
                    className="material-symbols-outlined text-[18px] text-[#004e99]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
                <span className="text-[11px] text-[#414752]">
                  {attachment.size} · High Res · {attachment.badge}
                </span>
              </div>
            </div>
            <button
              type="button"
              aria-label="Remove photo"
              onClick={() => onAttachmentChange(null)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#414752] hover:text-[#ba1a1a] hover:bg-[#dae2fd] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        ) : (
          <div className="p-3 bg-[#f2f3ff] rounded-lg text-center border border-dashed border-[#c1c6d4]">
            <span className="text-xs text-[#414752]">No photo attached.</span>
          </div>
        )}

        {/* Dropzone trigger */}
        <div
          onClick={onOpenPhotoPicker}
          className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-white border border-[#c1c6d4]/60 hover:bg-[#f2f3ff] transition-all cursor-pointer shadow-sm active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[#0a66c2] text-[20px]">cloud_upload</span>
          <span className="text-xs font-bold text-[#0a66c2]">
            {attachment ? 'Tap to change or upload conference photos' : 'Tap to select conference photo'}
          </span>
        </div>
      </div>

      {/* Key Highlights & Takeaways */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-[#131b2e]" htmlFor="takeaways-input">
            Key Highlights & Takeaways
          </label>
          <span className="text-[11px] text-[#414752]">
            {highlights.length} / 500 chars
          </span>
        </div>
        <div className="relative">
          <textarea
            id="takeaways-input"
            rows={3}
            maxLength={500}
            value={highlights}
            onChange={(e) => onHighlightsChange(e.target.value)}
            className="w-full bg-[#f2f3ff] text-[#131b2e] rounded-lg p-3 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#0a66c2] transition-all resize-none border border-transparent focus:border-[#0a66c2]"
            placeholder="What stood out to you at the sessions?"
          />
        </div>

        {/* Quick prompt suggestions */}
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="text-[10px] text-[#727783] font-semibold">Quick add:</span>
          {['Multi-agent loops', 'Zero data leaks', 'Live keynote demo', 'SF networking'].map((snippet) => (
            <button
              key={snippet}
              type="button"
              onClick={() => handleQuickAdd(snippet)}
              className="text-[10px] bg-[#eaedff] text-[#0a66c2] px-2 py-0.5 rounded-full hover:bg-[#d6e3ff] transition-colors cursor-pointer"
            >
              + {snippet}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Tone Chips */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-[#131b2e]">Editorial Tone</label>
        <div className="flex items-center gap-2">
          {/* Professional */}
          <button
            type="button"
            onClick={() => onToneChange('professional')}
            className={`flex-1 py-2 px-2 rounded-full text-xs font-bold text-center transition-all flex items-center justify-center gap-1 cursor-pointer ${
              tone === 'professional'
                ? 'bg-[#0a66c2] text-white shadow-sm ring-2 ring-[#0a66c2]/20'
                : 'bg-[#eaedff] text-[#414752] hover:text-[#131b2e] hover:bg-[#e2e7ff]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: tone === 'professional' ? "'FILL' 1" : "'FILL' 0" }}
            >
              work
            </span>
            <span>Professional</span>
          </button>

          {/* Grateful */}
          <button
            type="button"
            onClick={() => onToneChange('grateful')}
            className={`flex-1 py-2 px-2 rounded-full text-xs font-bold text-center transition-all flex items-center justify-center gap-1 cursor-pointer ${
              tone === 'grateful'
                ? 'bg-[#0a66c2] text-white shadow-sm ring-2 ring-[#0a66c2]/20'
                : 'bg-[#eaedff] text-[#414752] hover:text-[#131b2e] hover:bg-[#e2e7ff]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: tone === 'grateful' ? "'FILL' 1" : "'FILL' 0" }}
            >
              favorite
            </span>
            <span>Grateful</span>
          </button>

          {/* Takeaways */}
          <button
            type="button"
            onClick={() => onToneChange('takeaways')}
            className={`flex-1 py-2 px-2 rounded-full text-xs font-bold text-center transition-all flex items-center justify-center gap-1 cursor-pointer ${
              tone === 'takeaways'
                ? 'bg-[#0a66c2] text-white shadow-sm ring-2 ring-[#0a66c2]/20'
                : 'bg-[#eaedff] text-[#414752] hover:text-[#131b2e] hover:bg-[#e2e7ff]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: tone === 'takeaways' ? "'FILL' 1" : "'FILL' 0" }}
            >
              menu_book
            </span>
            <span>Takeaways</span>
          </button>
        </div>
      </div>

      {/* Primary Action: Generate LinkedIn Post */}
      <button
        type="button"
        id="generate-btn"
        onClick={handleGenerateClick}
        disabled={isGenerating}
        className={`relative group overflow-hidden w-full py-3.5 px-4 rounded-xl bg-[#0a66c2] hover:bg-[#004e99] text-white font-bold text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer ${
          isShaking ? 'scale-[0.98]' : ''
        }`}
      >
        {/* Animated sheen light reflection */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
        <span
          className="material-symbols-outlined text-[24px] animate-pulse"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          auto_awesome
        </span>
        <span>{isGenerating ? 'Synthesizing Official Post...' : 'Generate LinkedIn Post'}</span>
      </button>
    </div>
  );
};
