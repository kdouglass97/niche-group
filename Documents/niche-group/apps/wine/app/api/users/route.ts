import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const community = searchParams.get('community');
    
    if (community) {
      // Get users from a specific community
      const users = await prisma.user.findMany({
        where: {
          communitySignups: {
            some: {
              community: community
            }
          }
        },
        include: {
          communitySignups: true
        }
      });
      
      return NextResponse.json(users);
    } else {
      // Get all users
      const users = await prisma.user.findMany({
        include: {
          communitySignups: true
        }
      });
      
      return NextResponse.json(users);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, community } = body;
    
    if (!firstName || !lastName || !email || !community) {
      return NextResponse.json(
        { error: 'First name, last name, email, and community are required' },
        { status: 400 }
      );
    }
    
    // Create user and community signup in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Check if user exists
      let user = await tx.user.findUnique({
        where: { email }
      });
      
      // Create user if doesn't exist
      if (!user) {
        user = await tx.user.create({
          data: {
            firstName,
            lastName,
            email
          }
        });
      }
      
      // Check if already signed up for this community
      const existingSignup = await tx.communitySignup.findFirst({
        where: {
          userId: user.id,
          community
        }
      });
      
      if (!existingSignup) {
        // Create community signup
        await tx.communitySignup.create({
          data: {
            userId: user.id,
            community
          }
        });
      }
      
      return user;
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
} 