import { NextRequest, NextResponse } from 'next/server';
import { submitPlace, PlaceFormData } from '@/lib/places';

export async function POST(request: NextRequest) {
  try {
    const body: PlaceFormData = await request.json();

    // Validation
    if (!body.name || !body.category) {
      return NextResponse.json(
        { error: 'Name and category are required' },
        { status: 400 }
      );
    }

    const place = await submitPlace(body);
    return NextResponse.json(place, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit place' }, { status: 500 });
  }
}