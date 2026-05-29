import Link from 'next/link';
import { Compass, Map, Video, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Compass className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          About Backroad Adventures
        </h1>
        <p className="text-xl text-gray-600">
          Your guide to discovering hidden gems down those country roads.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Backroad Adventures started with a simple idea: the best places are often the hardest to find. 
            Between the big cities and tourist traps lie countless antique stores, family-run diners, 
            hidden waterfalls, and quirky road trip stops that never make it into the mainstream guides.
          </p>
          <p className="text-gray-700">
            We believe every backroad adventure deserves to be discovered. Whether you&apos;re a vintage 
            hunter, a foodie chasing the best biscuits in the South, or just someone who loves exploring 
            off the beaten path - this is your community.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Map className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Curated Directory</h3>
              <p className="text-sm text-gray-600">
                Hand-picked places verified by our team and community.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Video className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Video Tours</h3>
              <p className="text-sm text-gray-600">
                See every place before you go with video highlights.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Heart className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-sm text-gray-600">
                Share your favorite finds and discover new ones together.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Involved</h2>
          <p className="text-gray-700 mb-4">
            Know a great place that deserves to be on the map? We&apos;d love to hear about it! 
            Submit any antique store, diner, flea market, or hidden gem you&apos;ve discovered.
          </p>
          <div className="flex gap-4">
            <Link
              href="/submit"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Submit a Place
            </Link>
            <Link
              href="/explore"
              className="inline-block px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300"
            >
              Start Exploring
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">For Businesses</h2>
          <p className="text-gray-700 mb-4">
            Own an antique store, diner, or unique destination? Get featured in front of 
            thousands of adventure seekers! Contact us about featured placement and 
            promotional opportunities.
          </p>
          <a
            href="mailto:hello@backroad.adventures"
            className="inline-block px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600"
          >
            Contact Us About Advertising
          </a>
        </section>
      </div>
    </div>
  );
}