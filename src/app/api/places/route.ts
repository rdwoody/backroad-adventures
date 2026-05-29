import { NextRequest, NextResponse } from 'next/server';
import { getPlaces, getPlacesByCategory, searchPlaces, getFeaturedPlaces } from '@/lib/places';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const featured = searchParams.get('featured');

  try {
    if (featured === 'true') {
      const places = await getFeaturedPlaces();
      return NextResponse.json(places);
    }

    if (category) {
      const places = await getPlacesByCategory(category);
      return NextResponse.json(places);
    }

    if (search) {
      const places = await searchPlaces(search);
      return NextResponse.json(places);
    }

    const places = await getPlaces();
    return NextResponse.json(places);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch places' }, { status: 500 });
  }
}