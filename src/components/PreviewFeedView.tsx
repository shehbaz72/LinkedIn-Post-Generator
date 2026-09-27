import React, { useState } from 'react';
import { DraftPost, EventCampaign } from '../types';
import { LinkedInPreviewCard } from './LinkedInPreviewCard';
import { RECENT_ATTENDEE_ACTIVITIES } from '../data/mockData';

interface PreviewFeedViewProps {
  draft: DraftPost;
  campaign: EventCampaign;
  onUpdateDraft: (updated: Partial<DraftPost>) => void;
  onShowToast: (message: string) => void;
}

export const PreviewFeedView: React.FC<PreviewFeedViewProps> = ({
  draft,
  campaign,
  onUpdateDraft,
  onShowToast,
}) => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');

  return (
    <div className="flex flex-col gap-4">
      {/* Feed Controller Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl shadow-sm border border-[#eaedff]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#004e99] animate-ping" />
            <h1 className="text-xl font-bold text-[#131b2e]">Simulated LinkedIn Feed</h1>
          </div>
          <p className="text-xs text-[#414752] mt-0.5">
            Test how your official spotlight post looks alongside conference trending posts.
          </p>
        </div>

        {/* Device Switcher */}
        <div className="inline-flex p-1 bg-[#eaedff] rounded-lg self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setDeviceMode('mobile')}
            className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              deviceMode === 'mobile'
                ? 'bg-white text-[#0a66c2] shadow-sm font-bold'
                : 'text-[#414752]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">smartphone</span>
            <span>Mobile</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceMode('desktop')}
            className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              deviceMode === 'desktop'
                ? 'bg-white text-[#0a66c2] shadow-sm font-bold'
                : 'text-[#414752]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">computer</span>
            <span>Desktop</span>
          </button>
        </div>
      </div>

      {/* Main Feed Container */}
      <div
        className={`mx-auto w-full transition-all duration-300 ${
          deviceMode === 'mobile' ? 'max-w-md' : 'max-w-2xl'
        }`}
      >
        {/* Your Spotlight Post Badge */}
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-xs font-bold text-[#0a66c2] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">stars</span>
            Your Spotlight Post Preview
          </span>
          <span className="text-[11px] text-[#414752]">Draft Mode</span>
        </div>

        {/* Primary Preview Card */}
        <LinkedInPreviewCard
          draft={draft}
          campaign={campaign}
          onUpdateDraft={onUpdateDraft}
          onShowToast={onShowToast}
        />

        {/* Feed Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px bg-[#eaedff] flex-1" />
          <span className="text-[11px] font-bold text-[#727783] uppercase tracking-wider">
            More from #{campaign.hashtags[0]?.replace('#', '') || 'AISummit2025'}
          </span>
          <div className="h-px bg-[#eaedff] flex-1" />
        </div>

        {/* Other Attendee Feed Cards */}
        <div className="flex flex-col gap-4">
          {RECENT_ATTENDEE_ACTIVITIES.map((act) => (
            <div
              key={act.id}
              className="bg-white rounded-xl shadow-md border border-[#eaedff] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={act.avatarUrl}
                    alt={act.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-[#131b2e]">{act.name}</span>
                      <span className="text-xs text-[#414752]">· 1st</span>
                    </div>
                    <span className="text-xs text-[#414752] line-clamp-1">{act.headline}</span>
                    <div className="flex items-center gap-1 text-[#414752] text-[11px] pt-0.5">
                      <span>{act.timeAgo}</span>
                      <span>•</span>
                      <span className="material-symbols-outlined text-[13px]">public</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#414752] hover:bg-[#eaedff]"
                >
                  <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                </button>
              </div>

              {/* Content */}
              <div className="px-4 pb-3 text-sm text-[#131b2e] leading-relaxed">
                <p>{act.fullContent || act.snippet}</p>
                <p className="text-[#0a66c2] font-semibold pt-2">
                  {campaign.hashtags.join(' ')}
                </p>
              </div>

              {/* Reaction bar */}
              <div className="mx-4 py-2 flex items-center justify-between border-t border-[#eaedff] text-xs text-[#414752]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[12px]">👍 👏 💡</span>
                  <span>{act.likes} reactions</span>
                </div>
                <span>{act.comments} comments</span>
              </div>

              {/* Action buttons */}
              <div className="px-3 py-1.5 flex items-center justify-between border-t border-[#eaedff] bg-white">
                <button
                  type="button"
                  onClick={() => onShowToast(`Liked ${act.name}'s post!`)}
                  className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold text-[#414752] hover:text-[#0a66c2] hover:bg-[#eaedff]"
                >
                  <span className="material-symbols-outlined text-[18px]">thumb_up</span>
                  <span>Like</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast(`Comment on ${act.name}'s post`)}
                  className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold text-[#414752] hover:text-[#0a66c2] hover:bg-[#eaedff]"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Comment</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast(`Reposted ${act.name}'s post!`)}
                  className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold text-[#414752] hover:text-[#0a66c2] hover:bg-[#eaedff]"
                >
                  <span className="material-symbols-outlined text-[18px]">repeat</span>
                  <span>Repost</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Shared post link.')}
                  className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-semibold text-[#414752] hover:text-[#0a66c2] hover:bg-[#eaedff]"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Send</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
