import React, { useState } from 'react';
import { NavTab, PostTemplate } from '../types';
import { POST_TEMPLATES } from '../data/mockData';

interface TemplatesViewProps {
  onSelectTemplate: (template: PostTemplate) => void;
  onNavigateTab: (tab: NavTab) => void;
  onShowToast: (message: string) => void;
}

export const TemplatesView: React.FC<TemplatesViewProps> = ({
  onSelectTemplate,
  onNavigateTab,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Thought Leadership', 'Community', 'Engineering', 'Speaking', 'Exhibitor'];

  const filtered = selectedCategory === 'All'
    ? POST_TEMPLATES
    : POST_TEMPLATES.filter((t) => t.category === selectedCategory);

  const handleApply = (tpl: PostTemplate) => {
    onSelectTemplate(tpl);
    onNavigateTab('compose');
    onShowToast(`Loaded "${tpl.title}" template into Drafting Studio!`);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* View Header */}
      <div className="flex flex-col gap-1">
        <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#0a66c2]">
          <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
          <span className="text-[11px] font-bold uppercase tracking-wider">Formula Library</span>
        </div>
        <h1 className="text-2xl font-bold text-[#131b2e]">Attendee Post Templates</h1>
        <p className="text-sm text-[#414752]">
          Tested templates engineered for high viral organic reach, authentic thought leadership, and connection building.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#0a66c2] text-white shadow-sm font-bold'
                : 'bg-white text-[#414752] border border-[#eaedff] hover:bg-[#f2f3ff]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            className="flex flex-col justify-between bg-white rounded-xl p-4 shadow-sm border border-[#eaedff] hover:border-[#8cb7ff] hover:shadow-md transition-all group"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#004e99] bg-[#eaedff] px-2 py-0.5 rounded-full">
                  {tpl.category}
                </span>
                <span className="text-[10px] text-[#2f5ea1] bg-[#d6e3ff]/60 px-2 py-0.5 rounded-md font-semibold">
                  {tpl.badge}
                </span>
              </div>

              <h3 className="text-base font-bold text-[#131b2e] group-hover:text-[#0a66c2] transition-colors">
                {tpl.title}
              </h3>
              <p className="text-xs text-[#414752] leading-relaxed">
                {tpl.description}
              </p>

              <div className="p-2.5 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] italic line-clamp-3 border border-[#eaedff]">
                “{tpl.highlights}”
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#eaedff]">
              <span className="text-[11px] text-[#727783] capitalize">
                Tone: <strong className="text-[#131b2e]">{tpl.tone}</strong>
              </span>
              <button
                type="button"
                onClick={() => handleApply(tpl)}
                className="flex items-center gap-1 bg-[#0a66c2] hover:bg-[#004e99] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <span>Use Template</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
