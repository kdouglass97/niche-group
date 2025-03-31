# Supabase Management Control Panel (MCP) Setup Guide

This guide explains how to set up and use Supabase with MCP for the Wine Enthusiasts platform.

## Prerequisites

- Supabase account
- Supabase project created
- Schema from `schema.sql` applied to your database

## Setup Steps

### 1. Configure Environment Variables

In each niche community app, create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
DATABASE_URL=your_database_connection_string
```

The PostgreSQL connection string format:
```
postgresql://postgres.<project_ref>:<password>@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

For example:
```
DATABASE_URL=postgresql://postgres.llyzfowuzjhlerhtypzm:[N1ch3T3staejt]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

Replace placeholders with actual values from your Supabase dashboard (Settings > API).

### 2. MCP Functions for Database Management

The Wine Enthusiasts platform provides two ways to access the database:

#### Option 1: Supabase Client API

Use the Supabase client for simpler operations:

- `signupUser`: Registers a user for a specific community
- `getUserById`: Retrieves user data by user ID
- `getUserCommunities`: Gets all communities a user has joined

These functions are available in `lib/supabase-utils.ts` and should be shared across all niche sites.

#### Option 2: Prisma ORM (Direct Database Access)

For more complex database operations, we use Prisma ORM. Prisma provides:

- Type-safe database queries
- Complex joins and relations
- Transaction support
- Raw SQL when needed

Prisma is set up with:
- `prisma/schema.prisma`: Database schema definition
- `lib/prisma.ts`: Prisma client initialization
- API routes in `app/api/` using Prisma

### 3. Database Schema Design

The database schema is designed to handle multiple niche communities:

- `users` table: Stores user information centrally
- `community_signups` table: Links users to specific communities they've joined

This design enables cross-community analytics to determine user overlap between niches.

### 4. Testing Supabase MCP Integration

To test if your Supabase MCP is working correctly:

1. Run your app locally using `pnpm dev`
2. Navigate to the signup page and submit the form
3. Check your Supabase dashboard to confirm data was correctly stored:
   - Go to Table Editor > users
   - Go to Table Editor > community_signups
   - Verify that the entries were created with correct data

### 5. API Endpoints

The platform provides several API endpoints:

- `POST /api/signup`: Sign up a user using Supabase client
- `GET /api/users`: Get all users (with optional community filter) using Prisma
- `POST /api/users`: Create a user with Prisma
- `GET /api/analytics`: Get community analytics (counts, overlap)

### 6. Cross-Community Functionality

To check if a user has signed up for multiple communities:

```typescript
import { getUserCommunities } from '@/lib/supabase-utils';

// Get all communities a user belongs to
const communities = await getUserCommunities(userId);

// Check if user belongs to multiple communities
const isMultiCommunityUser = communities.length > 1;
```

Or using Prisma for more complex analysis:

```typescript
import { prisma } from '@/lib/prisma';

// Get users who belong to multiple communities
const multiCommunityUsers = await prisma.user.findMany({
  where: {
    communitySignups: {
      some: { community: 'wine' }
    },
    AND: {
      communitySignups: {
        some: { community: 'cigars' }
      }
    }
  }
});
```

## Expanding to New Niche Communities

When creating new niche community sites:

1. Copy the wine app structure
2. Update content, styling, and theme
3. Change the community name in the API endpoints
4. Reuse the Supabase utilities, types, and Prisma schema

The central database design ensures all user data is consolidated, enabling cross-community analytics. 