import { Place, PlaceFormData } from '@/types';
export type { PlaceFormData };

// Mock data for development - replace with Supabase queries later
export const MOCK_PLACES: Place[] = [
  {
    id: '1',
    name: 'Rusty Relics Antique Mall',
    description: 'Three floors of antiques, vintage furniture, and unique finds. Great for hunting treasure.',
    category: 'antique',
    address: '123 Main St',
    city: 'Franklin',
    state: 'TN',
    latitude: 35.9254,
    longitude: -86.8689,
    website: 'https://example.com',
    video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail_url: null,
    is_featured: true,
    submitted_by: null,
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Tennessee Flea Market',
    description: 'Huge indoor market with over 500 vendors. Everything from antiques to crafts.',
    category: 'flea_market',
    address: '456 Market Rd',
    city: 'Nashville',
    state: 'TN',
    latitude: 36.1627,
    longitude: -86.7816,
    website: null,
    video_url: null,
    thumbnail_url: null,
    is_featured: false,
    submitted_by: null,
    created_at: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Mama\'s Diner',
    description: 'Classic 1950s diner with amazing biscuits and gravy. Been serving since 1962.',
    category: 'diner',
    address: '789 Highway 41',
    city: 'Murfreesboro',
    state: 'TN',
    latitude: 35.8456,
    longitude: -86.3903,
    website: null,
    video_url: null,
    thumbnail_url: null,
    is_featured: true,
    submitted_by: null,
    created_at: '2024-01-03T00:00:00Z',
  },
  {
    id: '4',
    name: 'Cummins Falls',
    description: 'Beautiful waterfall in the heart of Tennessee. Moderate hike to view.',
    category: 'nature',
    address: 'Cummins Falls State Park',
    city: 'Cookeville',
    state: 'TN',
    latitude: 36.2836,
    longitude: -85.5647,
    website: 'https://tnstateparks.com',
    video_url: null,
    thumbnail_url: null,
    is_featured: false,
    submitted_by: null,
    created_at: '2024-01-04T00:00:00Z',
  },
  {
    id: '5',
    name: 'The Pink Cadillac Diner',
    description: 'Retro diner with pink Cadillac theme. Excellent burgers and shakes.',
    category: 'diner',
    address: '321 Elvis Presley Blvd',
    city: 'Memphis',
    state: 'TN',
    latitude: 35.1495,
    longitude: -90.0490,
    website: null,
    video_url: null,
    thumbnail_url: null,
    is_featured: true,
    submitted_by: null,
    created_at: '2024-01-05T00:00:00Z',
  },
  {
    id: '6',
    name: 'Bonny & Boring Antique Store',
    description: 'Local favorite with eclectic mix of vintage items. Friendly owners.',
    category: 'antique',
    address: '555 Historic Blvd',
    city: 'Jonesborough',
    state: 'TN',
    latitude: 36.2943,
    longitude: -82.7396,
    website: null,
    video_url: null,
    thumbnail_url: null,
    is_featured: false,
    submitted_by: null,
    created_at: '2024-01-06T00:00:00Z',
  },
  {
    id: '7',
    name: 'Lookout Mountain',
    description: 'Scenic mountain with stunning views. Popular road trip destination.',
    category: 'roadtrip',
    address: 'Lookout Mountain',
    city: 'Lookout Mountain',
    state: 'TN',
    latitude: 34.9666,
    longitude: -85.3244,
    website: null,
    video_url: null,
    thumbnail_url: null,
    is_featured: true,
    submitted_by: null,
    created_at: '2024-01-07T00:00:00Z',
  },
  {
    id: '8',
    name: 'Bell Mill Antique Shop',
    description: 'Specializing in mid-century modern furniture and vintage decor.',
    category: 'antique',
    address: '888 Vintage Way',
    city: 'Nashville',
    state: 'TN',
    latitude: 36.1627,
    longitude: -86.7816,
    website: null,
    video_url: null,
    thumbnail_url: null,
    is_featured: false,
    submitted_by: null,
    created_at: '2024-01-08T00:00:00Z',
  },
];

// In production, these would be Supabase queries
export async function getPlaces(): Promise<Place[]> {
  // TODO: Replace with Supabase query
  // const { data, error } = await supabase.from('places').select('*');
  return MOCK_PLACES;
}

export async function getFeaturedPlaces(): Promise<Place[]> {
  // TODO: Replace with Supabase query
  return MOCK_PLACES.filter(p => p.is_featured);
}

export async function getPlaceById(id: string): Promise<Place | null> {
  // TODO: Replace with Supabase query
  return MOCK_PLACES.find(p => p.id === id) || null;
}

export async function getPlacesByCategory(category: string): Promise<Place[]> {
  // TODO: Replace with Supabase query
  if (category === 'all') return MOCK_PLACES;
  return MOCK_PLACES.filter(p => p.category === category);
}

export async function searchPlaces(query: string): Promise<Place[]> {
  const lowerQuery = query.toLowerCase();
  return MOCK_PLACES.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.city?.toLowerCase().includes(lowerQuery) ||
    p.state?.toLowerCase().includes(lowerQuery) ||
    p.description?.toLowerCase().includes(lowerQuery)
  );
}

export async function submitPlace(data: PlaceFormData): Promise<Place> {
  // TODO: Replace with Supabase insert
  const newPlace: Place = {
    id: String(MOCK_PLACES.length + 1),
    ...data,
    address: data.address || null,
    city: data.city || null,
    state: data.state || null,
    website: data.website || null,
    video_url: data.video_url || null,
    thumbnail_url: null,
    latitude: null,
    longitude: null,
    is_featured: false,
    submitted_by: null,
    created_at: new Date().toISOString(),
  };
  MOCK_PLACES.push(newPlace);
  return newPlace;
}