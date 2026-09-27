export type RoleMode = 'organizer' | 'attendee';

export type NavTab = 'compose' | 'templates' | 'preview-feed' | 'analytics' | 'schedule';

export type ToneType = 'professional' | 'grateful' | 'takeaways';

export interface EventCampaign {
  id: string;
  name: string;
  organizerName: string;
  location: string;
  hashtags: string[];
  linkedinPage: string;
  twitterHandle: string;
  websiteUrl: string;
  attendeeSlug: string;
  stats: {
    joined: number;
    joinedGrowth: string;
    generated: number;
    generationRate: string;
    estReach: string;
    impressions: number;
  };
}

export interface AttendeeProfile {
  name: string;
  headline: string;
  avatarUrl: string;
  connectionDegree: string;
}

export interface PostAttachment {
  name: string;
  size: string;
  badge: string;
  imageUrl: string;
  caption: string;
}

export interface DraftPost {
  highlights: string;
  tone: ToneType;
  attachment: PostAttachment | null;
  generatedText: {
    hook: string;
    takeaways: string[];
    cta: string;
    hashtags: string[];
  };
  reactionsCount: number;
  commentsCount: number;
  repostsCount: number;
  userLiked: boolean;
}

export interface PostTemplate {
  id: string;
  title: string;
  category: string;
  description: string;
  badge: string;
  highlights: string;
  tone: ToneType;
}

export interface AttendeeActivity {
  id: string;
  name: string;
  headline: string;
  avatarUrl: string;
  timeAgo: string;
  action: string;
  snippet: string;
  fullContent?: string;
  imageUrl?: string;
  likes: number;
  comments: number;
}

export interface AgendaSession {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  time: string;
  day: 'Day 1' | 'Day 2';
  room: string;
  track: string;
  keyTakeaway: string;
}
