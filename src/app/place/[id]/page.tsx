import { getPlaceById } from '@/lib/places';
import { CATEGORIES } from '@/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Globe, ArrowLeft, Play } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PlacePage({ params }: PageProps) {
  const { id } = await params;
  const place = await getPlaceById(id);

  if (!place) {
    notFound();
  }

  const category = CATEGORIES.find(c => c.id === place.category) || CATEGORIES[CATEGORIES.length - 1];

  const getYoutubeId = (url: string | null): string | null => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };

  const videoId = getYoutubeId(place.video_url);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/explore"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Explore
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Video Section */}
        {videoId && (
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={place.name}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${category.color}`}>
                {category.name}
              </span>
              {place.is_featured && (
                <span className="ml-2 inline-block px-3 py-1 rounded-full text-sm font-medium text-amber-700 bg-amber-100">
                  Featured
                </span>
              )}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {place.name}
          </h1>

          {(place.city || place.state) && (
            <p className="text-lg text-gray-600 flex items-center mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              {[place.address, place.city, place.state].filter(Boolean).join(', ')}
            </p>
          )}

          {place.description && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                About
              </h2>
              <p className="text-gray-700">
                {place.description}
              </p>
            </div>
          )}

          {place.website && (
            <div className="mb-6">
              <a
                href={place.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <Globe className="w-4 h-4 mr-2" />
                Visit Website
              </a>
            </div>
          )}

          {!videoId && place.video_url && (
            <div className="mb-6">
              <a
                href={place.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Video
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}