import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { DraftPost, EventCampaign } from '../types';
import { CURRENT_USER } from '../data/mockData';

interface LinkedInPreviewCardProps {
  draft: DraftPost;
  campaign: EventCampaign;
  onUpdateDraft: (updated: Partial<DraftPost>) => void;
  onShowToast: (message: string) => void;
}

export const LinkedInPreviewCard: React.FC<LinkedInPreviewCardProps> = ({
  draft,
  campaign,
  onUpdateDraft,
  onShowToast,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [customText, setCustomText] = useState('');
  const [copied, setCopied] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [commentsList, setCommentsList] = useState([
    {
      id: 1,
      author: 'David K., Chief AI Officer',
      text: 'Agreed on point #2! Autonomous swarms need robust human-in-the-loop guardrails.',
      time: '4m ago',
    },
    {
      id: 2,
      author: 'Priya Sharma, Staff ML Engineer',
      text: 'Great seeing you at Moscone, Elena! Are you attending the 3 PM workshop?',
      time: '1m ago',
    }
  ]);
  const [newCommentInput, setNewCommentInput] = useState('');

  // Assemble full text for copying & sharing
  const getFullFormattedText = () => {
    if (customText.trim() && isEditing) return customText;

    const hook = draft.generatedText.hook;
    const bullets = draft.generatedText.takeaways
      .map((item, idx) => `${idx + 1}. ${item}`)
      .join('\n\n');
    const cta = draft.generatedText.cta;
    const tags = draft.generatedText.hashtags.join(' ');

    return `${hook}\n\n${bullets}\n\n${cta}\n\n${tags}`;
  };

  const handleCopyText = async () => {
    const textToCopy = getFullFormattedText();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      onShowToast('Post copied to clipboard! Ready to paste into LinkedIn ✨');

      // Trigger delightful light confetti
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#0a66c2', '#004e99', '#8cb7ff', '#ffffff'],
      });

      setTimeout(() => setCopied(false), 2200);
    } catch {
      onShowToast('Text selected! Use Ctrl+C / Cmd+C to copy.');
    }
  };

  const handleLikeToggle = () => {
    const newLiked = !draft.userLiked;
    onUpdateDraft({
      userLiked: newLiked,
      reactionsCount: newLiked ? draft.reactionsCount + 1 : draft.reactionsCount - 1,
    });
    if (newLiked) {
      onShowToast('You liked this post preview!');
    }
  };

  const handleOpenLinkedIn = () => {
    handleCopyText();
    // LinkedIn share URL with campaign reference
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      campaign.websiteUrl
    )}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentInput.trim()) return;
    const newEntry = {
      id: Date.now(),
      author: `${CURRENT_USER.name} (You)`,
      text: newCommentInput.trim(),
      time: 'Just now',
    };
    setCommentsList([newEntry, ...commentsList]);
    setNewCommentInput('');
    onUpdateDraft({ commentsCount: draft.commentsCount + 1 });
    onShowToast('Comment added to live simulator!');
  };

  return (
    <div className="flex flex-col gap-2.5">
      {/* Live Preview Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#131b2e]">Live Preview</span>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#004e99] text-[11px] font-bold uppercase tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#004e99] animate-pulse" />
            LinkedIn Format
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (!isEditing) setCustomText(getFullFormattedText());
              setIsEditing(!isEditing);
            }}
            className="text-[11px] text-[#0a66c2] hover:underline font-semibold flex items-center gap-0.5"
          >
            <span className="material-symbols-outlined text-[14px]">
              {isEditing ? 'done' : 'edit_note'}
            </span>
            <span>{isEditing ? 'Done Editing' : 'Customize Text'}</span>
          </button>
          <span className="text-[#414752] text-[11px]">High Fidelity</span>
        </div>
      </div>

      {/* Realistic LinkedIn Card Frame */}
      <div className="bg-white rounded-xl shadow-md border border-[#eaedff] overflow-hidden flex flex-col transition-all">
        {/* Post Header: Author row */}
        <div className="p-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[#eaedff]">
              <img
                alt={CURRENT_USER.name}
                className="w-full h-full object-cover"
                src={CURRENT_USER.avatarUrl}
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-[#131b2e]">{CURRENT_USER.name}</span>
                <span className="text-xs text-[#414752]">· {CURRENT_USER.connectionDegree}</span>
              </div>
              <span className="text-xs text-[#414752] line-clamp-1 leading-snug">
                {CURRENT_USER.headline}
              </span>
              <div className="flex items-center gap-1 text-[#414752] text-[11px] pt-0.5">
                <span>Just now</span>
                <span>•</span>
                <span className="material-symbols-outlined text-[13px]">public</span>
                <span>Edited</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="LinkedIn post options"
            onClick={() => onShowToast('LinkedIn post options: Save post, Embed post, Report')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#414752] hover:bg-[#eaedff] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">more_horiz</span>
          </button>
        </div>

        {/* Post Body Content */}
        {isEditing ? (
          <div className="px-4 pb-3">
            <textarea
              rows={8}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full p-2.5 bg-[#f2f3ff] rounded-lg text-sm text-[#131b2e] leading-relaxed border border-[#0a66c2] focus:outline-none"
              placeholder="Edit your LinkedIn post directly..."
            />
          </div>
        ) : (
          <div className="px-4 pb-3 text-sm text-[#131b2e] leading-relaxed flex flex-col gap-2.5">
            {/* Hook */}
            <p className="whitespace-pre-line">
              {draft.generatedText.hook.split(/(#[A-Za-z0-9_]+|@[A-Za-z0-9_]+)/g).map((part, i) => {
                if (part.startsWith('#') || part.startsWith('@')) {
                  return (
                    <span
                      key={i}
                      className="text-[#0a66c2] font-semibold hover:underline cursor-pointer"
                      onClick={() => onShowToast(`Filter by ${part}`)}
                    >
                      {part}
                    </span>
                  );
                }
                return part;
              })}
            </p>

            {/* Bullets */}
            <div className="flex flex-col gap-2 pl-0.5">
              {draft.generatedText.takeaways.map((point, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="font-bold text-[#0a66c2]">{index + 1}.</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <p className="pt-1">{draft.generatedText.cta}</p>

            {/* Hashtags */}
            <p className="text-[#0a66c2] font-semibold flex flex-wrap gap-1.5 pt-0.5">
              {draft.generatedText.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="hover:underline cursor-pointer"
                  onClick={() => onShowToast(`Tag: ${tag}`)}
                >
                  {tag}
                </span>
              ))}
            </p>
          </div>
        )}

        {/* Embedded Media Container */}
        {draft.attachment && (
          <div className="w-full px-4 pb-3">
            <div className="relative w-full rounded-lg overflow-hidden shadow-sm bg-[#eaedff]">
              <img
                alt={draft.attachment.name}
                className="w-full h-auto object-cover max-h-72"
                src={draft.attachment.imageUrl}
              />
              <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-[#283044]/85 text-[#eef0ff] text-[11px] font-medium backdrop-blur-sm shadow">
                {draft.attachment.caption}
              </div>
            </div>
          </div>
        )}

        {/* Social Engagement Metrics Bar */}
        <div className="mx-4 py-2 flex items-center justify-between bg-[#f2f3ff]/60 px-3 rounded-lg my-1 text-xs text-[#414752]">
          <div className="flex items-center gap-2">
            {/* Stacked Reaction Icons (Authentic LinkedIn style) */}
            <div className="flex items-center -space-x-1">
              <span className="w-5 h-5 rounded-full bg-[#0a66c2] flex items-center justify-center text-white text-[10px] shadow-sm">
                👍
              </span>
              <span className="w-5 h-5 rounded-full bg-[#2f5ea1] flex items-center justify-center text-white text-[10px] shadow-sm">
                👏
              </span>
              <span className="w-5 h-5 rounded-full bg-[#005287] flex items-center justify-center text-white text-[10px] shadow-sm">
                💡
              </span>
            </div>
            <span className="font-semibold text-[#131b2e]">
              {draft.reactionsCount} reactions
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCommentsModal(true)}
              className="hover:text-[#0a66c2] hover:underline cursor-pointer"
            >
              {draft.commentsCount} comments
            </button>
            <span>·</span>
            <span>{draft.repostsCount} reposts</span>
          </div>
        </div>

        {/* Action Bar: Like, Comment, Repost, Send */}
        <div className="px-3 py-1.5 flex items-center justify-between border-t border-[#eaedff] bg-white">
          <button
            type="button"
            onClick={handleLikeToggle}
            className={`flex items-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              draft.userLiked
                ? 'text-[#0a66c2] bg-[#eaedff]'
                : 'text-[#414752] hover:text-[#0a66c2] hover:bg-[#eaedff]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[19px]"
              style={{ fontVariationSettings: draft.userLiked ? "'FILL' 1" : "'FILL' 0" }}
            >
              thumb_up
            </span>
            <span>Like</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCommentsModal(!showCommentsModal)}
            className="flex items-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold text-[#414752] hover:text-[#0a66c2] hover:bg-[#eaedff] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[19px]">chat</span>
            <span>Comment</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onUpdateDraft({ repostsCount: draft.repostsCount + 1 });
              onShowToast('Reposted to simulated conference feed!');
            }}
            className="flex items-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold text-[#414752] hover:text-[#0a66c2] hover:bg-[#eaedff] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[19px]">repeat</span>
            <span>Repost</span>
          </button>

          <button
            type="button"
            onClick={() => {
              handleCopyText();
              onShowToast('Post link copied! Send via DM.');
            }}
            className="flex items-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-semibold text-[#414752] hover:text-[#0a66c2] hover:bg-[#eaedff] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[19px]">send</span>
            <span>Send</span>
          </button>
        </div>

        {/* Live Comments Simulator Drawer */}
        {showCommentsModal && (
          <div className="p-3 bg-[#faf8ff] border-t border-[#eaedff] flex flex-col gap-2.5 animate-in slide-in-from-top-2 duration-150">
            <span className="text-xs font-bold text-[#131b2e]">Simulated Feed Comments</span>
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newCommentInput}
                onChange={(e) => setNewCommentInput(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-white border border-[#c1c6d4] text-xs p-2 rounded-lg outline-none focus:border-[#0a66c2]"
              />
              <button
                type="submit"
                className="bg-[#0a66c2] text-white text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-[#004e99]"
              >
                Post
              </button>
            </form>

            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pt-1">
              {commentsList.map((c) => (
                <div key={c.id} className="bg-white p-2.5 rounded-lg border border-[#eaedff] text-xs">
                  <div className="flex items-center justify-between text-[#727783] mb-0.5">
                    <span className="font-bold text-[#131b2e]">{c.author}</span>
                    <span>{c.time}</span>
                  </div>
                  <p className="text-[#414752]">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons Below Preview */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="grid grid-cols-2 gap-2">
          {/* Copy Text Button */}
          <button
            type="button"
            id="copy-btn"
            onClick={handleCopyText}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-white text-[#131b2e] text-xs font-bold shadow-sm hover:bg-[#eaedff] active:scale-[0.98] transition-all cursor-pointer border border-[#eaedff] ${
              copied ? 'bg-[#e2e7ff] text-[#004e99]' : ''
            }`}
          >
            <span className="material-symbols-outlined text-[20px] text-[#0a66c2]">
              {copied ? 'check' : 'content_copy'}
            </span>
            <span id="copy-label">{copied ? 'Copied to Clipboard! ✨' : 'Copy Text'}</span>
          </button>

          {/* Registration Link Button */}
          <a
            href={campaign.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onShowToast(`Opening ${campaign.websiteUrl}`)}
            className="flex items-center justify-center gap-2 py-3 px-3 rounded-lg bg-white text-[#131b2e] text-xs font-bold shadow-sm hover:bg-[#eaedff] active:scale-[0.98] transition-all border border-[#eaedff]"
          >
            <span className="material-symbols-outlined text-[20px] text-[#0a66c2]">link</span>
            <span>Registration</span>
          </a>
        </div>

        {/* Open LinkedIn Primary CTA */}
        <button
          type="button"
          onClick={handleOpenLinkedIn}
          className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#0a66c2] hover:bg-[#004e99] text-white font-bold text-base shadow-md hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer group"
        >
          <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.4 9.74V9.92H5.06v8.58z" />
          </svg>
          <span>Open LinkedIn to Publish</span>
        </button>
      </div>
    </div>
  );
};
