export type ScreenTab = 'hub' | 'imagem' | 'video' | 'brand' | 'galeria';

export interface TemplateItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  tag: string;
  uses: string;
  imageUrl: string;
  category: 'luxury' | 'streetwear' | 'tech' | 'beverages';
  aspectRatio: '9:16' | '1:1' | '16:9';
  prompt: string;
}

export interface CampaignItem {
  id: string;
  title: string;
  meta: string;
  tag: string;
  timeAgo: string;
  imageUrl: string;
  type: 'image' | 'video';
  seed: string;
  aspect: string;
  format: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  timeAgo: string;
  aspectRatio: string;
  duration?: string;
  badge: string;
  badgeColor: 'primary' | 'secondary' | 'tertiary';
  type: 'video' | 'image';
  imageUrl: string;
  isFavorite?: boolean;
}

export interface BrandIdentityState {
  name: string;
  tagline: string;
  niche: string;
  style: 'minimalist' | 'luxury' | 'cyber' | 'organic';
  colors: string[];
}
