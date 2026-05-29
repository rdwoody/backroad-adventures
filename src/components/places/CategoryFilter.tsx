'use client';

import { CATEGORIES } from '@/types';

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selected === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === category.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.icon} {category.name}
        </button>
      ))}
    </div>
  );
}