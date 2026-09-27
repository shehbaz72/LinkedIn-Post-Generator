import React, { useState } from 'react';
import { EventCampaign, NavTab } from '../types';
import { RECENT_ATTENDEE_ACTIVITIES } from '../data/mockData';

interface OrganizerDashboardProps {
  campaign: EventCampaign;
  onUpdateCampaign: (updated: Partial<EventCampaign>) => void;
  onNavigateTab: (tab: NavTab) => void;
  onOpenQR: () => void;
  onShowToast: (message: string) => void;
}

export const OrganizerDashboard: React.FC<OrganizerDashboardProps> = ({
  campaign,
  onUpdateCampaign,
  onNavigateTab,
  onOpenQR,
  onShowToast,
}) => {
  // Local form state
  const [eventName, setEventName] = useState(campaign.name);
  const [orgName, setOrgName] = useState(campaign.organizerName);
  const [hashtags, setHashtags] = useState<string[]>(campaign.hashtags);
  const [linkedinPage, setLinkedinPage] = useState(campaign.linkedinPage);
  const [twitterHandle, setTwitterHandle] = useState(campaign.twitterHandle);
  const [websiteUrl, setWebsiteUrl] = useState(campaign.websiteUrl);

  const [isSaving, setIsSaving] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');

  const handleCopyLink = () => {
    const fullUrl = `https://${campaign.attendeeSlug}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullUrl);
    }
    setCopiedLink(true);
    onShowToast('Attendee generator link copied!');
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updated = hashtags.filter((t) => t !== tagToRemove);
    setHashtags(updated);
    onShowToast(`Removed ${tagToRemove}`);
  };

  const handleAddTagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    const cleanTag = newTagInput.trim().startsWith('#')
      ? newTagInput.trim()
      : `#${newTagInput.trim()}`;
    if (!hashtags.includes(cleanTag)) {
      setHashtags([...hashtags, cleanTag]);
      onShowToast(`Added ${cleanTag} to campaign tags.`);
    }
    setNewTagInput('');
    setShowAddTagModal(false);
  };

  const handleSaveCampaign = () => {
    setIsSaving(true);
    setTimeout(() => {
      onUpdateCampaign({
        name: eventName,
        organizerName: orgName,
        hashtags,
        linkedinPage,
        twitterHandle,
        websiteUrl,
      });
      setIsSaving(false);
      onShowToast(`${eventName} campaign updated & synced across templates!`);
    }, 700);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Intro Header */}
      <section className="flex flex-col gap-1.5 mt-1">
        <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#0a66c2]">
          <span className="material-symbols-outlined text-[16px]">campaign</span>
          <span className="text-[11px] font-bold uppercase tracking-wider">Campaign Hub</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#131b2e] tracking-tight">
          Organizer Dashboard
        </h1>
        <p className="text-sm text-[#414752]">
          Create event campaigns and distribute instant post-generator links to your attendees to amplify LinkedIn organic reach.
        </p>
      </section>

      {/* Active Campaign Card */}
      <section className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-[#eaedff]">
        {/* Banner */}
        <div className="relative bg-gradient-to-r from-[#004e99] to-[#0a66c2] p-4 text-white">
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a9c7ff] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d6e3ff]" />
              </span>
              <span>Active Campaign</span>
            </div>
            <span className="text-xs bg-white/15 px-2.5 py-0.5 rounded text-white font-medium">
              Live Now
            </span>
          </div>

          <div className="mt-3 flex flex-col">
            <h2 className="text-xl font-bold tracking-tight text-white">{campaign.name.split(':')[0]}</h2>
            <div className="flex items-center gap-1.5 text-xs text-[#dbe6ff] mt-0.5">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
              <span>{campaign.location}</span>
            </div>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-[#f2f3ff]">
          <div className="flex flex-col bg-white p-2.5 rounded-lg shadow-sm border border-[#eaedff]">
            <div className="flex items-center justify-between text-[#414752] mb-1">
              <span className="text-[11px] font-semibold">Joined</span>
              <span className="material-symbols-outlined text-[16px] text-[#004e99]">group</span>
            </div>
            <span className="text-lg font-bold text-[#131b2e]">
              {campaign.stats.joined.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#004e99] font-semibold flex items-center gap-0.5 mt-0.5">
              <span className="material-symbols-outlined text-[12px]">trending_up</span>{' '}
              {campaign.stats.joinedGrowth}
            </span>
          </div>

          <div className="flex flex-col bg-white p-2.5 rounded-lg shadow-sm border border-[#eaedff]">
            <div className="flex items-center justify-between text-[#414752] mb-1">
              <span className="text-[11px] font-semibold">Generated</span>
              <span className="material-symbols-outlined text-[16px] text-[#2f5ea1]">feed</span>
            </div>
            <span className="text-lg font-bold text-[#131b2e]">
              {campaign.stats.generated.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#2f5ea1] font-semibold flex items-center gap-0.5 mt-0.5">
              <span className="material-symbols-outlined text-[12px]">bolt</span>{' '}
              {campaign.stats.generationRate}
            </span>
          </div>

          <div className="flex flex-col bg-white p-2.5 rounded-lg shadow-sm border border-[#eaedff]">
            <div className="flex items-center justify-between text-[#414752] mb-1">
              <span className="text-[11px] font-semibold">Est. Reach</span>
              <span className="material-symbols-outlined text-[16px] text-[#005287]">query_stats</span>
            </div>
            <span className="text-lg font-bold text-[#131b2e]">{campaign.stats.estReach}</span>
            <span className="text-[11px] text-[#005287] font-semibold flex items-center gap-0.5 mt-0.5">
              <span className="material-symbols-outlined text-[12px]">hub</span> LinkedIn
            </span>
          </div>
        </div>

        {/* Shareable Link Box */}
        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="attendeeLinkInput"
              className="text-xs font-bold text-[#131b2e] flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px] text-[#004e99]">link</span>
              Attendee Generator Link
            </label>
            <span className="text-[11px] text-[#414752]">Instant 1-Click Access</span>
          </div>

          <div className="flex items-center bg-[#f2f3ff] rounded-lg p-1.5 shadow-sm border border-[#eaedff]">
            <span className="material-symbols-outlined text-[#414752] ml-2 text-[20px]">public</span>
            <input
              id="attendeeLinkInput"
              readOnly
              type="text"
              value={campaign.attendeeSlug}
              className="bg-transparent text-xs text-[#131b2e] flex-1 px-2.5 outline-none font-mono truncate select-all"
            />
            <button
              type="button"
              id="copyAttendeeBtn"
              onClick={handleCopyLink}
              className="flex items-center gap-1 bg-[#004e99] hover:bg-[#0a66c2] text-white px-3 py-1.5 rounded-md text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedLink ? 'check' : 'content_copy'}
              </span>
              <span>{copiedLink ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              id="qrCodeTrigger"
              onClick={onOpenQR}
              className="flex items-center justify-center gap-1.5 bg-[#eaedff] py-2.5 px-3 rounded-lg text-[#131b2e] text-xs font-semibold hover:bg-[#e2e7ff] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#414752]">qr_code_2</span>
              <span>Download QR</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('analytics')}
              className="flex items-center justify-center gap-1.5 bg-[#eaedff] py-2.5 px-3 rounded-lg text-[#131b2e] text-xs font-semibold hover:bg-[#e2e7ff] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#414752]">analytics</span>
              <span>View Analytics</span>
            </button>
          </div>
        </div>
      </section>

      {/* Event Information Configuration Form */}
      <section className="flex flex-col bg-white rounded-xl shadow-md p-4 gap-4 border border-[#eaedff]">
        <div className="flex items-center justify-between pb-1 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#e2e7ff] flex items-center justify-center text-[#0a66c2]">
              <span className="material-symbols-outlined text-[22px]">event_note</span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-base font-bold text-[#131b2e]">Event Information</h2>
              <span className="text-xs text-[#414752]">Configure attendees' LinkedIn presets</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-[#004e99] bg-[#eaedff] px-2.5 py-0.5 rounded-full text-xs font-semibold">
            <span className="material-symbols-outlined text-[14px]">tune</span> Setup
          </span>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSaveCampaign(); }} className="flex flex-col gap-4">
          {/* Event Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="eventName" className="text-xs font-semibold text-[#131b2e] flex items-center justify-between">
              <span>Event Name</span>
              <span className="text-[11px] text-[#414752] font-normal">Displayed in posts</span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#414752] text-[20px] pointer-events-none">
                local_activity
              </span>
              <input
                id="eventName"
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full bg-[#f2f3ff] pl-10 pr-3 py-2.5 rounded-lg text-sm text-[#131b2e] outline-none focus:bg-white focus:ring-2 focus:ring-[#0a66c2] transition-all border border-[#eaedff]"
                placeholder="e.g. Global AI Summit 2025: Next Frontier"
              />
            </div>
          </div>

          {/* Organizer / Company Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="orgName" className="text-xs font-semibold text-[#131b2e] flex items-center justify-between">
              <span>Organizer / Company Name</span>
              <span className="text-[11px] text-[#414752] font-normal">Host entity</span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#414752] text-[20px] pointer-events-none">
                corporate_fare
              </span>
              <input
                id="orgName"
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-[#f2f3ff] pl-10 pr-3 py-2.5 rounded-lg text-sm text-[#131b2e] outline-none focus:bg-white focus:ring-2 focus:ring-[#0a66c2] transition-all border border-[#eaedff]"
                placeholder="e.g. PulseTech Media & Innovate AI"
              />
            </div>
          </div>

          {/* Official Event Hashtags */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#131b2e]">Official Event Hashtags</label>
              <span className="text-[11px] text-[#414752]">Appended to drafted posts</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 p-2.5 rounded-lg bg-[#f2f3ff] border border-[#eaedff]">
              {hashtags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-white text-[#0a66c2] text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm border border-[#eaedff]"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    aria-label={`Remove tag ${tag}`}
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-[#ba1a1a] transition-colors flex items-center cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              ))}

              {/* Add Tag Button */}
              <button
                type="button"
                id="addTagBtn"
                onClick={() => setShowAddTagModal(true)}
                className="inline-flex items-center gap-1 bg-[#eaedff] hover:bg-[#e2e7ff] text-[#414752] text-xs font-semibold px-2.5 py-1 rounded-full transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
                <span>Add tag</span>
              </button>
            </div>
          </div>

          {/* Social Media & Official Link Profiles */}
          <div className="flex flex-col gap-3 pt-1">
            <span className="text-xs font-semibold text-[#131b2e] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#004e99]">share</span>
              Social & Web Links
            </span>

            {/* LinkedIn URL */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[#414752]">
                <span className="text-xs font-semibold flex items-center gap-1 text-[#004e99]">
                  <span className="material-symbols-outlined text-[14px]">group_add</span> LinkedIn Page
                </span>
                <span className="text-[11px]">Tagged in mentions</span>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#004e99] text-[20px] pointer-events-none">
                  tag
                </span>
                <input
                  type="text"
                  value={linkedinPage}
                  onChange={(e) => setLinkedinPage(e.target.value)}
                  className="w-full bg-[#f2f3ff] pl-10 pr-3 py-2 rounded-lg text-xs text-[#131b2e] outline-none focus:bg-white focus:ring-2 focus:ring-[#0a66c2] transition-all border border-[#eaedff]"
                />
              </div>
            </div>

            {/* Twitter Handle */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[#414752]">
                <span className="text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">alternate_email</span> X / Twitter Handle
                </span>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#414752] text-[20px] pointer-events-none">
                  alternate_email
                </span>
                <input
                  type="text"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value)}
                  className="w-full bg-[#f2f3ff] pl-10 pr-3 py-2 rounded-lg text-xs text-[#131b2e] outline-none focus:bg-white focus:ring-2 focus:ring-[#0a66c2] transition-all border border-[#eaedff]"
                />
              </div>
            </div>

            {/* Official Website */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between text-[#414752]">
                <span className="text-xs font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">language</span> Official Website
                </span>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#414752] text-[20px] pointer-events-none">
                  public
                </span>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full bg-[#f2f3ff] pl-10 pr-3 py-2 rounded-lg text-xs text-[#131b2e] outline-none focus:bg-white focus:ring-2 focus:ring-[#0a66c2] transition-all border border-[#eaedff]"
                />
              </div>
            </div>
          </div>

          {/* Action Button: Save & Publish */}
          <button
            type="submit"
            id="saveCampaignBtn"
            disabled={isSaving}
            className="w-full mt-2 bg-[#0a66c2] hover:bg-[#004e99] text-white py-3 px-4 rounded-xl text-sm font-bold shadow-md hover:shadow-lg active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isSaving ? 'hourglass_empty' : 'cloud_done'}
            </span>
            <span>
              {isSaving ? 'Publishing Changes...' : 'Save & Publish Event Campaign'}
            </span>
          </button>
          <p className="text-[11px] text-center text-[#414752]">
            Updates sync instantly across all attendee post generator templates.
          </p>
        </form>
      </section>

      {/* Recent Attendee Activity Section */}
      <section className="flex flex-col bg-white rounded-xl shadow-md p-4 gap-3 border border-[#eaedff]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004e99] text-[20px]">thumb_up</span>
            <h3 className="text-base font-bold text-[#131b2e]">Recent Attendee Activity</h3>
          </div>
          <span className="text-xs text-[#414752]">Live Feed</span>
        </div>

        <div className="flex flex-col gap-2">
          {RECENT_ATTENDEE_ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3 p-3 bg-[#f2f3ff] rounded-lg hover:bg-[#eaedff] transition-colors border border-[#eaedff]"
            >
              <img
                src={activity.avatarUrl}
                alt={activity.name}
                className="w-10 h-10 rounded-full object-cover shadow-sm shrink-0"
              />
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#131b2e] truncate">{activity.name}</span>
                  <span className="text-[11px] text-[#004e99] font-semibold">{activity.action}</span>
                </div>
                <p className="text-xs text-[#414752] truncate">{activity.snippet}</p>
                <div className="flex items-center gap-2 text-[10px] text-[#727783] mt-0.5">
                  <span>{activity.timeAgo}</span>
                  <span>•</span>
                  <span>{activity.likes} reactions</span>
                  <span>•</span>
                  <span>{activity.comments} comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Tag Modal Dialog */}
      {showAddTagModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-2xl border border-[#c1c6d4]/60">
            <h3 className="font-bold text-sm text-[#131b2e] mb-2">Add Official Event Hashtag</h3>
            <form onSubmit={handleAddTagSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                autoFocus
                placeholder="e.g. #TechLeaders2025"
                value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                className="bg-[#f2f3ff] p-2.5 rounded-lg text-sm text-[#131b2e] outline-none border border-[#eaedff] focus:border-[#0a66c2]"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTagModal(false)}
                  className="px-3 py-1.5 text-xs text-[#414752] hover:bg-[#eaedff] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-[#0a66c2] hover:bg-[#004e99] rounded-lg shadow-sm"
                >
                  Add Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
