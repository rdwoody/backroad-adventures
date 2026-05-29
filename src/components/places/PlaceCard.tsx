'use client';

import { Place, CATEGORIES } from '@/types';
import Link from 'next/link';
import { MapPin, Star, Play } from 'lucide-react';

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  const category = CATEGORIES.find(c => c.id === place.category) || CATEGORIES[CATEGORIES.length - 1];

  const getYoutubeId = (url: string | null): string | null => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getYoutubeId(place.video_url);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {videoId && (
        <div className="relative aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={place.name}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white ${category.color}`}>
              {category.name}
            </span>
            {place.is_featured && (
              <span className="ml-2 inline-block px-2 py-1 rounded-full text-xs font-medium text-amber-700 bg-amber-100">
                Featured
              </span>
            )}
          </div>
        </div>
        
        <Link href={`/place/${place.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 mb-1">
            {place.name}
          </h3>
        </Link>
        
        {place.city && place.state && (
          <p className="text-sm text-gray-600 flex items-center mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            {place.city}, {place.state}
          </p>
        )}
        
        {place.description && (
          <p className="text-sm text-gray-700 line-clamp-2">
            {place.description}
          </p>
        )}
        
        {place.video_url && !videoId && (
          <a 
            href={place.video_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            <Play className="w-4 h-4 mr-1" />
            Watch Video
          </a>
        )}
      </div>
    </div>
  );
}