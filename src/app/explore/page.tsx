'use client';

import { useState, useEffect } from 'react';
import { Place, CATEGORIES } from '@/types';
import { PlaceCard } from '@/components/places/PlaceCard';
import { MapView } from '@/components/map/MapView';
import { CategoryFilter } from '@/components/places/CategoryFilter';
import { Search, List, Map as MapIcon, Grid3X3 } from 'lucide-react';

// Client component for explore page (has interactive elements)
function ExploreContent() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'map' | 'list' | 'grid'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, this would call the API
    const fetchPlaces = async () => {
      setLoading(true);
      // Mock data - would be API call
      const { MOCK_PLACES } = await import('@/lib/places');
      setPlaces(MOCK_PLACES);
      setLoading(false);
    };
    fetchPlaces();
  }, []);

  const filteredPlaces = places.filter(place => {
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.state?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const mapboxToken = typeof window !== 'undefined' 
    ? (window as any).__NEXT_DATA__?.props?.pageProps?.mapboxToken 
    : null || process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore</h1>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, city, or state..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {/* View Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
            title="Grid View"
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
            title="List View"
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`p-2 rounded-lg ${viewMode === 'map' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
            title="Map View"
          >
            <MapIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading places...</p>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-4">
            {filteredPlaces.length} {filteredPlaces.length === 1 ? 'place' : 'places'} found
          </p>
          
          {viewMode === 'map' ? (
            <MapView places={filteredPlaces} mapboxToken={mapboxToken} />
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'flex flex-col gap-4'
            }>
              {filteredPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          )}

          {filteredPlaces.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No places found. Try a different search or category.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function ExplorePage() {
  return <ExploreContent />;
}