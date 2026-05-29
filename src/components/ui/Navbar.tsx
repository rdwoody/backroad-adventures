'use client';

import Link from 'next/link';
import { Map, Compass, Plus, User, Heart, Info, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Compass className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              Backroad Adventures
            </span>
          </Link>

          <div className="flex items-center space-x-2">
            <Link
              href="/explore"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/explore')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Map className="w-4 h-4" />
              <span className="hidden md:inline">Explore</span>
            </Link>

            <Link
              href="/favorites"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/favorites')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span className="hidden md:inline">Favorites</span>
            </Link>

            <Link
              href="/submit"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/submit')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">Submit</span>
            </Link>

            <Link
              href="/about"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/about')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Info className="w-4 h-4" />
              <span className="hidden md:inline">About</span>
            </Link>

            <Link
              href="/contact"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span className="hidden md:inline">Contact</span>
            </Link>

            <Link
              href="/admin"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/admin')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <User className="w-4 h-4" />
              <span className="hidden md:inline">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}