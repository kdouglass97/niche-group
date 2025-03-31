import { NextRequest, NextResponse } from 'next/server';
import { signupUser } from '@/lib/supabase-utils';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { firstName, lastName, email, preferences = false } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
        { status: 400 }
      );
    }

    // Use the utility function to sign up the user
    const result = await signupUser(firstName, lastName, email, preferences, 'wine');

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to sign up' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully added to waitlist', userId: result.userId },
      { status: 200 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 