import React, { useState } from 'react';
import { AgendaSession, NavTab } from '../types';
import { AGENDA_SESSIONS } from '../data/mockData';

interface ScheduleViewProps {
  onDraftAboutSession: (session: AgendaSession) => void;
  onNavigateTab: (tab: NavTab) => void;
  onShowToast: (message: string) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  onDraftAboutSession,
  onNavigateTab,
  onShowToast,
}) => {
  const [selectedDay, setSelectedDay] = useState<'Day 1' | 'Day 2'>('Day 1');

  const filteredSessions = AGENDA_SESSIONS.filter((s) => s.day === selectedDay);

  const handleDraftClick = (session: AgendaSession) => {
    onDraftAboutSession(session);
    onNavigateTab('compose');
    onShowToast(`Session "${session.title}" loaded into Drafting Studio!`);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Schedule Header */}
      <div className="flex flex-col gap-1">
        <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#0a66c2]">
          <span className="material-symbols-outlined text-[16px]">calendar_month</span>
          <span className="text-[11px] font-bold uppercase tracking-wider">Summit Agenda</span>
        </div>
        <h1 className="text-2xl font-bold text-[#131b2e]">Conference Program</h1>
        <p className="text-sm text-[#414752]">
          Tap any session to instantly synthesize an executive recap post for LinkedIn.
        </p>
      </div>

      {/* Day Selector Tabs */}
      <div className="inline-flex p-1 bg-[#eaedff] rounded-xl self-start">
        <button
          type="button"
          onClick={() => setSelectedDay('Day 1')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            selectedDay === 'Day 1'
              ? 'bg-[#0a66c2] text-white shadow-sm'
              : 'text-[#414752] hover:text-[#131b2e]'
          }`}
        >
          Day 1 (Today)
        </button>
        <button
          type="button"
          onClick={() => setSelectedDay('Day 2')}
          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            selectedDay === 'Day 2'
              ? 'bg-[#0a66c2] text-white shadow-sm'
              : 'text-[#414752] hover:text-[#131b2e]'
          }`}
        >
          Day 2 (Tomorrow)
        </button>
      </div>

      {/* Sessions Timeline */}
      <div className="flex flex-col gap-3">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            className="flex flex-col gap-2 bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] hover:border-[#8cb7ff] transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#004e99] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                {session.time}
              </span>
              <span className="text-[11px] font-semibold text-[#0a66c2] bg-[#eaedff] px-2.5 py-0.5 rounded-full">
                {session.track}
              </span>
            </div>

            <h3 className="text-base font-bold text-[#131b2e] group-hover:text-[#0a66c2] transition-colors">
              {session.title}
            </h3>

            <div className="flex items-center gap-2 text-xs text-[#414752]">
              <span className="material-symbols-outlined text-[16px] text-[#727783]">person</span>
              <span className="font-semibold text-[#131b2e]">{session.speaker}</span>
              <span>·</span>
              <span className="text-[#727783]">{session.speakerRole}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#727783]">
              <span className="material-symbols-outlined text-[15px]">meeting_room</span>
              <span>{session.room}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] mt-1 border border-[#eaedff]">
              <strong className="text-[#0a66c2]">Key Insight: </strong>
              <span>{session.keyTakeaway}</span>
            </div>

            <div className="pt-2 mt-1 flex justify-end">
              <button
                type="button"
                onClick={() => handleDraftClick(session)}
                className="flex items-center gap-1.5 bg-[#0a66c2] hover:bg-[#004e99] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">edit_square</span>
                <span>Draft Post About This</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
