'use client';

import { useState, useEffect } from 'react';
import { Place } from '@/types';
import { PlaceCard } from '@/components/places/PlaceCard';
import { getFavorites } from '@/types/favorites';
import { Heart, Search } from 'lucide-react';

function FavoritesContent() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritePlaces = async () => {
      setLoading(true);
      const { MOCK_PLACES } = await import('@/lib/places');
      const favoriteIds = getFavorites().map(f => f.placeId);
      const favoritePlaces = MOCK_PLACES.filter(p => favoriteIds.includes(p.id));
      setPlaces(favoritePlaces);
      setLoading(false);
    };
    fetchFavoritePlaces();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-8 h-8 text-red-500 fill-current" />
        <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading favorites...</p>
        </div>
      ) : places.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No favorites yet
          </h2>
          <p className="text-gray-600 mb-4">
            Start exploring and save your favorite places!
          </p>
          <a
            href="/explore"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <Search className="w-4 h-4 mr-1" />
            Explore Places
          </a>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            You have {places.length} favorite{places.length === 1 ? '' : 's'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function FavoritesPage() {
  return <FavoritesContent />;
}