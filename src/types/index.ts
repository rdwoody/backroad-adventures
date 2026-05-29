export interface Place {
  id: string;
  name: string;
  description: string | null;
  category: string;
  address: string | null;
  city: string | null;
  state: string | null;
  latitude: number | null;
  longitude: number | null;
  website: string | null;
  video_url: string | null;
  thumbnail_url: string | null;
  is_featured: boolean;
  submitted_by: string | null;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

export interface PlaceFormData {
  name: string;
  description: string;
  category: string;
  address: string;
  city: string;
  state: string;
  website: string;
  video_url: string;
}

export const CATEGORIES: Category[] = [
  { id: 'antique', name: 'Antique Store', icon: '🏪', color: 'bg-amber-700' },
  { id: 'flea_market', name: 'Flea Market', icon: '🛍️', color: 'bg-orange-600' },
  { id: 'diner', name: 'Diner', icon: '🍳', color: 'bg-red-600' },
  { id: 'nature', name: 'Nature/Hidden Gem', icon: '🌲', color: 'bg-green-700' },
  { id: 'roadtrip', name: 'Road Trip Stop', icon: '🚗', color: 'bg-blue-600' },
  { id: 'historic', name: 'Historic Site', icon: '🏛️', color: 'bg-purple-700' },
  { id: 'other', name: 'Other', icon: '📍', color: 'bg-gray-600' },
];