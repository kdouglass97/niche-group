import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { supabase } from '@/lib/supabase';
import { prisma } from '@/lib/prisma'; // Use shared prisma instance

export async function GET() {
  try {
    // Test Prisma connection
    const prismaResult = await prisma.user.findMany({
      include: {
        communitySignups: true
      },
      take: 5
    });
    
    // Test Supabase connection
    const supabaseResult = await supabase
      .from('users')
      .select('user_id, first_name, last_name, email')
      .limit(5);
    
    return NextResponse.json({
      status: 'success',
      connections: {
        prisma: {
          connected: true,
          users: prismaResult.map(user => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            communities: user.communitySignups.map(s => s.community)
          }))
        },
        supabase: {
          connected: !supabaseResult.error,
          error: supabaseResult.error ? supabaseResult.error.message : null,
          users: supabaseResult.data || []
        }
      }
    });
  } catch (error: any) {
    console.error('Error testing connections:', error);
    return NextResponse.json(
      { 
        error: 'Failed to test connections', 
        message: error?.message || 'Unknown error' 
      },
      { status: 500 }
    );
  }
} 