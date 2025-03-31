import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get total users count
    const totalUsers = await prisma.user.count();
    
    // Get community signup counts
    const communityCounts = await prisma.communitySignup.groupBy({
      by: ['community'],
      _count: {
        community: true
      }
    });
    
    // Get counts of users in multiple communities
    const multiCommunityUsers = await prisma.$queryRaw`
      SELECT COUNT(DISTINCT user_id) as count
      FROM community_signups
      WHERE user_id IN (
        SELECT user_id
        FROM community_signups
        GROUP BY user_id
        HAVING COUNT(community) > 1
      )
    `;
    
    // Format community counts
    const communities = communityCounts.map(item => ({
      name: item.community,
      count: item._count.community
    }));
    
    return NextResponse.json({
      totalUsers,
      communities,
      multiCommunityUsers: (multiCommunityUsers as any)[0]?.count || 0
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
} 