'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { isFavorite, toggleFavorite } from '@/types/favorites';

interface FavoriteButtonProps {
  placeId: string;
  size?: 'sm' | 'md' | 'lg';
}

export function FavoriteButton({ placeId, size = 'md' }: FavoriteButtonProps) {
  const [favorite, setFavorite] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFavorite(isFavorite(placeId));
  }, [placeId]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = toggleFavorite(placeId);
    setFavorite(newState);
  };

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  if (!mounted) {
    return <Heart className={`${sizeClasses[size]} text-gray-400`} />;
  }

  return (
    <button
      onClick={handleClick}
      className={`transition-colors ${
        favorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
      }`}
      title={favorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={sizeClasses[size]} fill={favorite ? 'currentColor' : 'none'} />
    </button>
  );
}