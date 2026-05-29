// Favorites store - in production this would be Supabase
// For now, using localStorage on the client side

export interface Favorite {
  placeId: string;
  addedAt: string;
}

export function getFavorites(): Favorite[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('backroad-favorites');
  return stored ? JSON.parse(stored) : [];
}

export function addFavorite(placeId: string): void {
  const favorites = getFavorites();
  if (!favorites.find(f => f.placeId === placeId)) {
    favorites.push({ placeId, addedAt: new Date().toISOString() });
    localStorage.setItem('backroad-favorites', JSON.stringify(favorites));
  }
}

export function removeFavorite(placeId: string): void {
  const favorites = getFavorites().filter(f => f.placeId !== placeId);
  localStorage.setItem('backroad-favorites', JSON.stringify(favorites));
}

export function isFavorite(placeId: string): boolean {
  return getFavorites().some(f => f.placeId === placeId);
}

export function toggleFavorite(placeId: string): boolean {
  if (isFavorite(placeId)) {
    removeFavorite(placeId);
    return false;
  } else {
    addFavorite(placeId);
    return true;
  }
}