'use client';

import { useEffect, useRef, useState } from 'react';
import { Place, CATEGORIES } from '@/types';
import Link from 'next/link';
import { MapPin, X } from 'lucide-react';

interface MapViewProps {
  places: Place[];
  mapboxToken?: string;
}

export function MapView({ places, mapboxToken }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Check if Mapbox token is available
    if (!mapboxToken) {
      console.warn('Mapbox token not configured. Map will show as placeholder.');
      return;
    }

    // Dynamically import mapbox-gl
    import('mapbox-gl').then((mapboxgl) => {
      mapboxgl.default.accessToken = mapboxToken;

      const map = new mapboxgl.default.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [-86.5, 35.9], // Tennessee center
        zoom: 6,
      });

      map.addControl(new mapboxgl.default.NavigationControl(), 'top-right');

      map.on('load', () => {
        setMapLoaded(true);
        mapRef.current = map;

        // Add markers for each place
        places.forEach((place) => {
          if (place.latitude != null && place.longitude != null) {
            const category = CATEGORIES.find(c => c.id === place.category);
            
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.fontSize = '24px';
            el.style.cursor = 'pointer';
            el.textContent = category?.icon || '📍';

            const marker = new mapboxgl.default.Marker(el)
              .setLngLat([place.longitude, place.latitude])
              .addTo(map);

            el.addEventListener('click', () => {
              setSelectedPlace(place);
              if (place.latitude != null && place.longitude != null) {
                map.flyTo({
                  center: [place.longitude, place.latitude],
                  zoom: 12,
                });
              }
            });
          }
        });
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [places, mapboxToken]);

  // Fallback map display when no token
  if (!mapboxToken) {
    return (
      <div className="relative w-full h-[500px] bg-green-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Map View</h3>
            <p className="text-gray-600 mb-4">
              Configure Mapbox token to enable interactive map.
            </p>
            <p className="text-sm text-gray-500">
              Set NEXT_PUBLIC_MAPBOX_TOKEN in your environment variables.
            </p>
          </div>
        </div>
        {/* Show place markers as a simple list overlay */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-h-60 overflow-y-auto">
          <h4 className="font-semibold text-sm mb-2">Places ({places.length})</h4>
          <ul className="space-y-1">
            {places.map((place) => (
              <li key={place.id} className="text-sm text-gray-700">
                📍 {place.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
      
      {selectedPlace && (
        <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-lg shadow-lg p-4">
          <button
            onClick={() => setSelectedPlace(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="font-semibold text-lg">{selectedPlace.name}</h3>
          <p className="text-sm text-gray-600">
            {selectedPlace.city}, {selectedPlace.state}
          </p>
          {selectedPlace.description && (
            <p className="text-sm text-gray-700 mt-2 line-clamp-2">
              {selectedPlace.description}
            </p>
          )}
          <Link
            href={`/place/${selectedPlace.id}`}
            className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-800"
          >
            View Details →
          </Link>
        </div>
      )}
    </div>
  );
}