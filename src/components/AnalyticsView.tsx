import React from 'react';
import { EventCampaign, RoleMode } from '../types';

interface AnalyticsViewProps {
  campaign: EventCampaign;
  onSwitchToOrganizer: (role: RoleMode) => void;
  onOpenQR: () => void;
  onShowToast: (message: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  campaign,
  onSwitchToOrganizer,
  onOpenQR,
  onShowToast,
}) => {
  const hashtagPerformance = [
    { tag: '#AISummit2025', posts: 852, reach: '42.8k', engagementRate: '5.4%' },
    { tag: '#FutureOfWork', posts: 614, reach: '31.2k', engagementRate: '4.8%' },
    { tag: '#PulseTech', posts: 420, reach: '24.1k', engagementRate: '6.1%' },
    { tag: '#AIInnovation', posts: 298, reach: '18.7k', engagementRate: '4.2%' },
  ];

  const hourlyVelocity = [
    { hour: '8 AM', count: 42 },
    { hour: '9 AM', count: 184 },
    { hour: '10 AM', count: 260 },
    { hour: '11 AM', count: 195 },
    { hour: '12 PM', count: 88 },
    { hour: '1 PM', count: 124 },
    { hour: '2 PM', count: 156 },
  ];

  const maxVelocity = Math.max(...hourlyVelocity.map((h) => h.count));

  return (
    <div className="flex flex-col gap-6">
      {/* Analytics Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#0a66c2] mb-1">
            <span className="material-symbols-outlined text-[16px]">insights</span>
            <span className="text-[11px] font-bold uppercase tracking-wider">Campaign Performance</span>
          </div>
          <h1 className="text-2xl font-bold text-[#131b2e]">Live Social Impact</h1>
          <p className="text-sm text-[#414752]">
            Real-time telemetry measuring attendee organic social amplification across LinkedIn.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenQR}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#c1c6d4] text-xs font-bold text-[#131b2e] hover:bg-[#eaedff] transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px] text-[#0a66c2]">qr_code_2</span>
            <span>Badge QR</span>
          </button>
          <button
            type="button"
            onClick={() => onSwitchToOrganizer('organizer')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0a66c2] text-white text-xs font-bold hover:bg-[#004e99] transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">edit_calendar</span>
            <span>Edit Campaign</span>
          </button>
        </div>
      </div>

      {/* KPI Highlight Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-[#eaedff] shadow-sm">
          <span className="text-xs text-[#727783] font-semibold">Attendees Joined</span>
          <div className="text-2xl font-bold text-[#131b2e] mt-1">{campaign.stats.joined.toLocaleString()}</div>
          <span className="text-[11px] text-[#004e99] font-bold flex items-center gap-0.5 mt-1">
            <span className="material-symbols-outlined text-[12px]">trending_up</span> +14% vs avg
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#eaedff] shadow-sm">
          <span className="text-xs text-[#727783] font-semibold">Posts Generated</span>
          <div className="text-2xl font-bold text-[#131b2e] mt-1">{campaign.stats.generated.toLocaleString()}</div>
          <span className="text-[11px] text-[#2f5ea1] font-bold flex items-center gap-0.5 mt-1">
            <span className="material-symbols-outlined text-[12px]">bolt</span> 68% conversion
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#eaedff] shadow-sm">
          <span className="text-xs text-[#727783] font-semibold">Est. LinkedIn Reach</span>
          <div className="text-2xl font-bold text-[#131b2e] mt-1">{campaign.stats.estReach}</div>
          <span className="text-[11px] text-[#005287] font-bold flex items-center gap-0.5 mt-1">
            <span className="material-symbols-outlined text-[12px]">hub</span> 1st & 2nd deg
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#eaedff] shadow-sm">
          <span className="text-xs text-[#727783] font-semibold">Total Impressions</span>
          <div className="text-2xl font-bold text-[#131b2e] mt-1">{campaign.stats.impressions.toLocaleString()}</div>
          <span className="text-[11px] text-[#004e99] font-bold flex items-center gap-0.5 mt-1">
            <span className="material-symbols-outlined text-[12px]">visibility</span> Organic feed
          </span>
        </div>
      </div>

      {/* Hourly Velocity Chart */}
      <div className="bg-white p-5 rounded-xl border border-[#eaedff] shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0a66c2]">bar_chart</span>
            <h3 className="font-bold text-base text-[#131b2e]">Post Generation Velocity</h3>
          </div>
          <span className="text-xs text-[#0a66c2] bg-[#eaedff] px-2.5 py-0.5 rounded-full font-bold">
            Keynote Spike at 10 AM
          </span>
        </div>

        <div className="flex items-end justify-between gap-2 h-44 pt-4 px-2">
          {hourlyVelocity.map((item) => {
            const heightPercent = Math.round((item.count / maxVelocity) * 100);
            return (
              <div key={item.hour} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="text-[10px] font-bold text-[#414752]">{item.count}</span>
                <div
                  style={{ height: `${heightPercent}%` }}
                  className="w-full max-w-[36px] bg-gradient-to-t from-[#004e99] to-[#8cb7ff] rounded-t-md hover:brightness-110 transition-all cursor-pointer"
                  title={`${item.hour}: ${item.count} posts generated`}
                />
                <span className="text-[11px] font-medium text-[#727783] whitespace-nowrap">{item.hour}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hashtag Performance Table */}
      <div className="bg-white p-5 rounded-xl border border-[#eaedff] shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[#131b2e]">Official Hashtag Breakdown</h3>
          <button
            type="button"
            onClick={() => onShowToast('Exported CSV of social engagement metrics.')}
            className="text-xs font-bold text-[#0a66c2] hover:underline"
          >
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#eaedff] text-[#727783]">
                <th className="py-2.5 font-semibold">Hashtag</th>
                <th className="py-2.5 font-semibold">Posts</th>
                <th className="py-2.5 font-semibold">Reach</th>
                <th className="py-2.5 font-semibold">Engagement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaedff]">
              {hashtagPerformance.map((row) => (
                <tr key={row.tag} className="hover:bg-[#f2f3ff]/60 transition-colors">
                  <td className="py-2.5 font-bold text-[#0a66c2]">{row.tag}</td>
                  <td className="py-2.5 text-[#131b2e]">{row.posts}</td>
                  <td className="py-2.5 text-[#131b2e]">{row.reach}</td>
                  <td className="py-2.5 font-semibold text-[#004e99]">{row.engagementRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
