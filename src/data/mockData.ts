import { AttendeeActivity, AttendeeProfile, EventCampaign, AgendaSession, PostAttachment, PostTemplate, ToneType } from '../types';

export const EVENT_PULSE_LOGO = 'https://lh3.googleusercontent.com/aida/AEtjO1X_WBZKS9at2l1UwlOvhRd11ZornDo4t9XxhmXlyOJYfEEETW1DLazKHFMdfGAJ4ZD_NBdPnwhd11OU6caLoZg3ECpD06bZdHsLUCkC-XewGmAYUxkKevlEsuVxnQJEADMvdRAPwcKzCZ71SGFq38B5MDq-hzvAsfxJTyCsHTK6YxaZIu-9tWIEWVrqV1XJyaTpRrO7_APXsgyJnHQVV47Z3vJxKRbN7-XcFG5oSv4UlhKJVJ4qv3k8Lw';

export const CURRENT_USER: AttendeeProfile = {
  name: 'Elena Vance',
  headline: 'Senior AI Product Lead at Horizon | Tech Speaker',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCT5YxWtCfS_rkeDuPITweesoVPSHdVzt00uR1Fm2NysBVOkYZjt3dOIE-Ptvx2RNIaHCsXWVv4pXDBXG-SM0fDxPsyVdhnG3HBOJN-rcjUl5iG8TkpecVOh4dpVqSgcJX_d0HYCCIRiSuquWaqc2qvl-CtKDsIfXef9UV8GIb8nC8XvqGDsz_TGGG4ZPE0-HYVsoF8WpWmHQvYWNNE5Eo9L8H9sgbRhLa19efPhbPnvKQPoeOxJxp8',
  connectionDegree: '1st',
};

export const DEFAULT_ATTACHMENT: PostAttachment = {
  name: 'IMG_keynote_hall.jpg',
  size: '1.4 MB',
  badge: 'Live Keynote',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFI-Gw5YOKHZUQdiUpJXkeJS6AAeo4lvvkk9GGfgfIO3Ad9O7fcHPcn02D_9URGx7E7cy3jevFa8d3ZOzyoYH55W_YTv0NbxshPdIB7Sr8d2I77xbN5ifHEHou0iXC3q5Bpayjpv8O4bvW-8hB7py25DJw31eGwa7aYrT39zGHc_ho9x4nl_PuF14JYDPmIjqWH7njmJxILmr3Z7dsO-08LskUW6YZreLwfHdS1e4ntQtQ7GkHGuU_',
  caption: 'Moscone Center · Stage A',
};

export const CONFERENCE_STOCK_PHOTOS: PostAttachment[] = [
  DEFAULT_ATTACHMENT,
  {
    name: 'IMG_expo_hall_networking.jpg',
    size: '2.1 MB',
    badge: 'Expo Showcase',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    caption: 'Moscone Center · Innovation Hub',
  },
  {
    name: 'IMG_ai_workshop_lab.jpg',
    size: '1.8 MB',
    badge: 'Hands-on Lab',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    caption: 'Stage C · Agentic Architectures',
  },
  {
    name: 'IMG_panel_discussion.jpg',
    size: '1.6 MB',
    badge: 'Executive Panel',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    caption: 'Grand Ballroom · Enterprise AI',
  },
  {
    name: 'IMG_networking_evening.jpg',
    size: '2.4 MB',
    badge: 'VIP Lounge',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    caption: 'Moscone Terrace · VIP Reception',
  }
];

export const INITIAL_CAMPAIGN: EventCampaign = {
  id: 'global-ai-summit-2025',
  name: 'Global AI Summit 2025: Next Frontier',
  organizerName: 'PulseTech Media & Innovate AI',
  location: 'Moscone Center · San Francisco, CA',
  hashtags: ['#AISummit2025', '#FutureOfWork', '#PulseTech'],
  linkedinPage: 'linkedin.com/company/pulsetech-ai',
  twitterHandle: '@PulseTechAI',
  websiteUrl: 'https://innovateai2025.pulse.io',
  attendeeSlug: 'eventpulse.io/attend/ai-summit-2025',
  stats: {
    joined: 1248,
    joinedGrowth: '+14%',
    generated: 852,
    generationRate: '68% rate',
    estReach: '42.8k',
    impressions: 118400,
  },
};

export const INITIAL_TAKEAWAYS_INPUT =
  'Mind blown by the Keynote on Agentic Workflows! Met incredible founders and learned how multi-agent swarms will transform enterprise ops in 2025.';

export const GENERATED_POST_VARIANTS: Record<ToneType, { hook: string; takeaways: string[]; cta: string }> = {
  professional: {
    hook: "Incredible energy on Day 1 of the #AISummit2025 hosted by @PulseTech Media! 🚀\n\nThree game-changing takeaways from this morning's keynote:",
    takeaways: [
      'Agentic reasoning loops are redefining automated workflows across global cloud stacks.',
      'Cross-team collaboration between human engineers and autonomous agents is the new baseline.',
      'Data orchestration privacy has graduated to a non-negotiable core architecture priority.'
    ],
    cta: 'Excited to connect with fellow builders! Who else is attending? Drop a comment below 👇'
  },
  grateful: {
    hook: "Truly grateful to be here at #AISummit2025 surrounded by the most passionate innovators and pioneers in tech! 🙏 Hosted seamlessly by @PulseTech Media.",
    takeaways: [
      'The generosity in knowledge sharing across the keynote stage and hallway tracks is unparalleled.',
      'Honored to reconnect with old colleagues and exchange visions on the future of autonomous systems.',
      'Huge thank you to the organizers for curating such a world-class gathering of minds.'
    ],
    cta: "If you're at Moscone Center today or tomorrow, let's grab coffee! Drop me a message or comment below ✨"
  },
  takeaways: {
    hook: "Direct synthesis from the #AISummit2025 keynote stage today by @PulseTech Media. Here are the 3 architectural pivots every tech leader should track:",
    takeaways: [
      'Shift from prompt engineering to compound agentic graph orchestration.',
      'Low-latency edge inferences will capture 40% of real-time enterprise decision pipelines by Q4.',
      'Evaluation benchmarks must evolve from raw accuracy to multi-step reasoning durability.'
    ],
    cta: "Bookmark this summary for your engineering syncs. What was your #1 takeaway from today's sessions? 👇"
  }
};

export const RECENT_ATTENDEE_ACTIVITIES: AttendeeActivity[] = [
  {
    id: 'act-1',
    name: 'Marcus Vance',
    headline: 'VP of AI Research at NextGen Labs',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI9Y4yQ-HtjqtSMU-FzRyof7XqFu2lJdvPGtrQY3MK_WgW3P3UcD7n2oUE6m8S_XULXe_iLoAX5kG7UgeG-DsbfDhW4jFEbvaCdmhOWK6myY_5rs5z6dxAVS3RZFiU0ILvQV18BD7Ek3RXgsnG2LhjQeZ4ZcPzcxZfOAJzLprOb-b-L-UqqFg2MeJhcdpE27PL3OxUrT0kFCyiASFqatYdB3xeILRcouoNtaqsMXPgdespj7PZerLQ',
    timeAgo: '3 mins ago',
    action: 'Shared Post',
    snippet: '“Grateful to represent at #AISummit2025 discussing transformative models and agentic infrastructure...”',
    fullContent: 'Grateful to represent at #AISummit2025 discussing transformative models and agentic infrastructure with over 1,200 colleagues. The speed of evolution in open-source reasoning models is breathtaking.',
    likes: 34,
    comments: 8,
  },
  {
    id: 'act-2',
    name: 'Sarah Chen',
    headline: 'Founding Partner, Silicon AI Ventures',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    timeAgo: '14 mins ago',
    action: 'Shared Post',
    snippet: '“San Francisco is buzzing! The #FutureOfWork track highlighted how human-agent teams are scaling...”',
    fullContent: 'San Francisco is buzzing! The #FutureOfWork track at #AISummit2025 highlighted how human-agent teams are scaling 10x faster. Proud to see our portfolio companies presenting on main stage!',
    likes: 92,
    comments: 19,
  },
  {
    id: 'act-3',
    name: 'Devon Miller',
    headline: 'Principal Infrastructure Architect',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    timeAgo: '28 mins ago',
    action: 'Generated Post',
    snippet: '“Keynote hall was packed to the brim! High-bandwidth clusters are the secret sauce of 2025...”',
    fullContent: 'Keynote hall was packed to the brim! High-bandwidth clusters and sovereign cloud infrastructure are the secret sauce for next-gen models. Kudos @PulseTech Media.',
    likes: 51,
    comments: 11,
  },
  {
    id: 'act-4',
    name: 'Amina Al-Mansoor',
    headline: 'Chief Data Officer @ FinEdge Global',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    timeAgo: '42 mins ago',
    action: 'Shared Post',
    snippet: '“Data orchestration privacy is now a board-level conversation. Essential takeaways from Day 1...”',
    fullContent: 'Data orchestration privacy is now a board-level conversation. Essential takeaways from Day 1 at #AISummit2025 in Moscone Center.',
    likes: 67,
    comments: 14,
  }
];

export const POST_TEMPLATES: PostTemplate[] = [
  {
    id: 'tpl-keynote',
    title: 'Keynote & Industry Shift',
    category: 'Thought Leadership',
    badge: 'Popular',
    description: 'Break down high-level themes from the opening keynote and share 3 strategic insights.',
    highlights: 'Mind blown by the Keynote on Agentic Workflows! Met incredible founders and learned how multi-agent swarms will transform enterprise ops in 2025.',
    tone: 'professional'
  },
  {
    id: 'tpl-gratitude',
    title: 'Grateful Attendee & Networking',
    category: 'Community',
    badge: 'Warm & Engaging',
    description: 'Express appreciation to the conference organizers and invite connections for coffee chats.',
    highlights: 'Blown away by the vibrant community here in SF! Grateful to connect with fellow researchers, exchange war stories, and discuss ethical AI deployment.',
    tone: 'grateful'
  },
  {
    id: 'tpl-technical',
    title: 'Technical Deep Dive & Code',
    category: 'Engineering',
    badge: 'Architecture',
    description: 'Share tactical, engineering-level takeaways, benchmarks, and architecture best practices.',
    highlights: 'Attended the hands-on session on low-latency inference loops. Key takeaway: speculative decoding + distributed kv-cache caching reduces TTFT by 62%.',
    tone: 'takeaways'
  },
  {
    id: 'tpl-speaker',
    title: 'Speaker & Panelist Spotlight',
    category: 'Speaking',
    badge: 'Stage Presence',
    description: 'Highlight a panel you spoke on or attended, tagging co-panelists and summarizing discussion.',
    highlights: 'Honored to take the stage at Moscone Center discussing Autonomous Agents in Enterprise Stacks! Thanks to our lively audience for challenging Q&A.',
    tone: 'professional'
  },
  {
    id: 'tpl-booth',
    title: 'Live Demo & Expo Hall',
    category: 'Exhibitor',
    badge: 'Showcase',
    description: 'Guide attendees to your booth or product demo with an exciting preview hook.',
    highlights: 'Come see live multi-agent orchestration running on bare-metal clusters at Booth #412 in Innovation Alley! Giving away limited edition builder swag.',
    tone: 'professional'
  },
  {
    id: 'tpl-recap',
    title: 'End of Day 1 Wrap-up',
    category: 'Summary',
    badge: 'Day Review',
    description: 'Consolidate the top moments, favorite speakers, and teaser for tomorrow’s track.',
    highlights: 'Wrapping up an electric Day 1 at #AISummit2025. Over 10,000 steps, 15 new LinkedIn connections, and enough paradigm-shifting ideas to fill a notebook.',
    tone: 'takeaways'
  }
];

export const AGENDA_SESSIONS: AgendaSession[] = [
  {
    id: 'session-1',
    day: 'Day 1',
    time: '09:00 AM - 10:15 AM',
    title: 'Official Keynote: Agentic Workflows & The Next Frontier of AI',
    speaker: 'Dr. Aris Thorne & Sarah Lin',
    speakerRole: 'VP of AI Research, PulseTech & Horizon',
    room: 'Moscone Stage A (Main Hall)',
    track: 'Keynote',
    keyTakeaway: 'Autonomous agent swarms and multi-step reasoning architectures are replacing isolated microservices across global enterprise deployments.'
  },
  {
    id: 'session-2',
    day: 'Day 1',
    time: '10:45 AM - 11:45 AM',
    title: 'Executive Panel: Balancing Speed, Sovereignty & Model Governance',
    speaker: 'Elena Vance & Marcus Vance',
    speakerRole: 'Senior AI Product Lead & VP AI Research',
    room: 'Grand Ballroom 102',
    track: 'Enterprise Strategy',
    keyTakeaway: 'Data orchestration privacy has graduated to a non-negotiable core architecture priority for Fortune 500 CISOs.'
  },
  {
    id: 'session-3',
    day: 'Day 1',
    time: '01:30 PM - 02:45 PM',
    title: 'Hands-on Lab: Deploying Real-time Reasoning Graphs at Scale',
    speaker: 'Devon Miller & Chen Wei',
    speakerRole: 'Principal Infrastructure Engineers',
    room: 'Lab Pavilion B',
    track: 'Technical Workshop',
    keyTakeaway: 'Speculative decoding paired with distributed KV-caching slashes time-to-first-token by over 60%.'
  },
  {
    id: 'session-4',
    day: 'Day 1',
    time: '03:15 PM - 04:30 PM',
    title: 'Future of Work: Human-Agent Teaming in Mission-Critical Ops',
    speaker: 'Amina Al-Mansoor',
    speakerRole: 'Chief Data Officer, FinEdge',
    room: 'Stage C',
    track: 'Future of Work',
    keyTakeaway: 'The benchmark of modern engineering organizations is cross-team collaboration between human domain experts and autonomous agents.'
  },
  {
    id: 'session-5',
    day: 'Day 1',
    time: '05:00 PM - 07:30 PM',
    title: 'Executive Networking Reception & Builders Showcase',
    speaker: 'PulseTech Media Team',
    speakerRole: 'Summit Organizers',
    room: 'Moscone Rooftop Terrace',
    track: 'Networking',
    keyTakeaway: 'Connect 1-on-1 with founders, investors, researchers, and builders shaping 2025 AI roadmaps.'
  }
];
