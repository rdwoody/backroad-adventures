'use client';

import { useState, useEffect } from 'react';
import { Place, CATEGORIES } from '@/types';
import { PlaceCard } from '@/components/places/PlaceCard';
import { Settings, Users, Plus, Edit, Trash2 } from 'lucide-react';

function AdminContent() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'places' | 'submissions' | 'users'>('places');

  useEffect(() => {
    // In production, this would call the API
    const fetchPlaces = async () => {
      setLoading(true);
      const { MOCK_PLACES } = await import('@/lib/places');
      setPlaces(MOCK_PLACES);
      setLoading(false);
    };
    fetchPlaces();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('places')}
          className={`flex items-center gap-2 pb-3 px-2 font-medium transition-colors ${
            activeTab === 'places'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          All Places ({places.length})
        </button>
        <button
          onClick={() => setActiveTab('submissions')}
          className={`flex items-center gap-2 pb-3 px-2 font-medium transition-colors ${
            activeTab === 'submissions'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Plus className="w-4 h-4" />
          Submissions (0)
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 pb-3 px-2 font-medium transition-colors ${
            activeTab === 'users'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users className="w-4 h-4" />
          Users (1)
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : (
        <>
          {activeTab === 'places' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">Manage all places in the directory</p>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Place
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">Name</th>
                      <th className="text-left p-4 font-medium text-gray-600">Category</th>
                      <th className="text-left p-4 font-medium text-gray-600">Location</th>
                      <th className="text-left p-4 font-medium text-gray-600">Featured</th>
                      <th className="text-left p-4 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {places.map((place) => (
                      <tr key={place.id} className="border-t">
                        <td className="p-4">{place.name}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100">
                            {place.category}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">
                          {place.city}, {place.state}
                        </td>
                        <td className="p-4">
                          {place.is_featured ? (
                            <span className="text-green-600">✓ Yes</span>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="text-center py-12">
              <p className="text-gray-600">No pending submissions.</p>
              <p className="text-sm text-gray-500 mt-2">
                User submissions will appear here for review.
              </p>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <table className="w-full bg-white rounded-lg shadow overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-600">Email</th>
                    <th className="text-left p-4 font-medium text-gray-600">Role</th>
                    <th className="text-left p-4 font-medium text-gray-600">Created</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4">admin@example.com</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        admin
                      </span>
                    </td>
                    <td className="p-4 text-gray-600">—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function AdminPage() {
  return <AdminContent />;
}