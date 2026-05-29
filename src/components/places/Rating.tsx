'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  placeId: string;
  initialRating?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

export function Rating({ placeId, initialRating = 0, size = 'md', readonly = false }: RatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // In production, fetch rating from DB
    const stored = localStorage.getItem(`rating-${placeId}`);
    if (stored) setRating(parseInt(stored));
  }, [placeId]);

  const handleClick = (value: number) => {
    if (readonly) return;
    setRating(value);
    localStorage.setItem(`rating-${placeId}`, String(value));
  };

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const displayRating = hoverRating || rating;

  if (!mounted && !readonly) {
    return <div className="flex gap-1">{[1, 2, 3, 4, 5].map(i => <Star key={i} className={sizeClasses[size]} />)}</div>;
  }

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleClick(value)}
          onMouseEnter={() => !readonly && setHoverRating(value)}
          onMouseLeave={() => setHoverRating(0)}
          className={`transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
          disabled={readonly}
        >
          <Star
            className={`${sizeClasses[size]} ${
              value <= displayRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}