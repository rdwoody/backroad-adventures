import { getFeaturedPlaces } from '@/lib/places';
import { PlaceCard } from '@/components/places/PlaceCard';
import { MapView } from '@/components/map/MapView';
import Link from 'next/link';
import { Compass, ArrowRight, Map, Play } from 'lucide-react';

export default async function Home() {
  const featuredPlaces = await getFeaturedPlaces();
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Compass className="w-16 h-16 text-blue-300" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Backroad Adventures
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover antique stores, hidden gems, diners, and the adventures 
              waiting down those country roads.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/explore"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                <Map className="w-5 h-5 mr-2" />
                Explore the Map
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Play className="w-5 h-5 mr-2" />
                Submit a Place
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map Preview */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Explore the Map
            </h2>
            <Link
              href="/explore"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View Full Map <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <MapView places={featuredPlaces} mapboxToken={mapboxToken} />
        </div>
      </section>

      {/* Featured Places */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Featured Adventures
            </h2>
            <Link
              href="/explore"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Know a Great Place?
          </h2>
          <p className="text-gray-700 mb-6">
            Found an amazing antique store, a great diner, or a hidden gem? 
            Let us know and we&apos;ll add it to the map!
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit a Place
          </Link>
        </div>
      </section>
    </div>
  );
}