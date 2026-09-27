import React from 'react';
import { EventCampaign } from '../types';

interface OfficialEventSpotlightProps {
  campaign: EventCampaign;
  onTagClick?: (tag: string) => void;
  onShowToast: (message: string) => void;
}

export const OfficialEventSpotlight: React.FC<OfficialEventSpotlightProps> = ({
  campaign,
  onTagClick,
  onShowToast,
}) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#004e99] via-[#0b5394] to-[#283044] text-white p-6 shadow-md">
      {/* Decorative blurred background aura */}
      <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#8cb7ff]/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#0a66c2]/30 rounded-full blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-1.5">
        {/* Verified spotlight badge */}
        <div className="inline-flex items-center gap-1.5 text-[#d6e3ff] text-[11px] font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[16px] text-[#8cb7ff]">verified</span>
          Official Event Spotlight
        </div>

        {/* Event Title */}
        <h1 className="text-[22px] font-bold text-white leading-tight mt-0.5">
          {campaign.name}
        </h1>

        {/* Location & Host */}
        <div className="flex items-center gap-1.5 text-[#e2e7ff] text-[12px] pt-0.5">
          <span className="material-symbols-outlined text-[16px] text-[#8cb7ff]">place</span>
          <span>
            Hosted by {campaign.organizerName.split('&')[0]?.trim() || campaign.organizerName} · {campaign.location}
          </span>
        </div>

        {/* Social Pills */}
        <div className="flex items-center gap-1.5 flex-wrap pt-2">
          {campaign.hashtags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                if (onTagClick) onTagClick(tag);
                onShowToast(`Tag ${tag} active in draft`);
              }}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-white text-[11px] font-bold bg-white/15 backdrop-blur-sm hover:bg-white/25 active:scale-95 transition-all cursor-pointer border border-white/10"
            >
              {tag}
            </button>
          ))}

          {/* Social Handle */}
          <span
            onClick={() => onShowToast(`Tagged ${campaign.twitterHandle} in mentions`)}
            className="inline-flex items-center px-2.5 py-1 rounded-full text-[#d6e3ff] text-[11px] font-bold bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-all cursor-pointer border border-white/10"
          >
            {campaign.twitterHandle}
          </span>

          {/* Website Link */}
          <a
            href={campaign.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-[11px] font-bold bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-colors border border-white/10"
          >
            <span className="material-symbols-outlined text-[13px]">public</span>
            {campaign.websiteUrl.replace('https://', '')}
          </a>
        </div>

        {/* Microcopy description */}
        <p className="text-[12px] text-[#dae2fd]/90 pt-1.5">
          Generate your official attendee spotlight post in seconds.
        </p>
      </div>
    </div>
  );
};
