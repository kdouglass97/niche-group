# Wine App Deployment Guide

This guide explains how to deploy the Wine Enthusiasts app from our monorepo to Vercel.

## Vercel Deployment Setup

The `apps/wine` app is deployed to Vercel with the following settings:

### Project Configuration

- **Root Directory**: `apps/wine`
  - Set in Vercel dashboard > Project > Settings > General.
  - This tells Vercel to treat `apps/wine` as the root of the project.
  
- **Install Command**: `cd ../.. && pnpm install`
  - Overrides the default install to run from the monorepo root, ensuring all dependencies are installed.
  
- **Build Command**: `cd ../.. && turbo run build --filter=wine`
  - Uses TurboRepo to build only the `wine` app and its dependencies.
  
- **Output Directory**: `.next`
  - Default for Next.js, no change needed.

### Environment Variables

The following environment variables must be set in the Vercel dashboard (Project > Settings > Environment Variables):

- `NEXT_PUBLIC_SUPABASE_URL`: The Supabase project URL (e.g., `https://llyzfowuzjhlerhtypzm.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The Supabase anon key for public access
- `SUPABASE_SERVICE_KEY`: The Supabase service key for server-side operations
- `DATABASE_URL`: PostgreSQL connection string for Prisma (e.g., `postgresql://postgres.llyzfowuzjhlerhtypzm:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres`)

**Important**: Ensure these environment variables are set for all environments (Production, Preview, Development).

### Local Development

For local development:

1. Copy `.env.example` to `.env.local` and fill in the required values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   DATABASE_URL=your_database_url
   ```

2. Install dependencies:
   ```bash
   cd ../../
   pnpm install
   ```

3. Start the development server:
   ```bash
   cd apps/wine
   pnpm dev
   ```

### Testing Builds Locally

To test the build locally in a way that matches Vercel's process:

1. From the monorepo root, install dependencies:
   ```bash
   pnpm install
   ```

2. From `apps/wine`, run the build:
   ```bash
   pnpm run build
   ```
   This runs Prisma migrations and generates the Next.js build.

3. Start the app to test:
   ```bash
   pnpm start
   ```

## Troubleshooting

### Common Issues

1. **Missing environment variables**: Verify all required environment variables are set in Vercel.
2. **Build failures**: Check Vercel build logs for specific errors.
3. **Database connection issues**: Ensure your DATABASE_URL is correct and the Supabase instance is accessible from Vercel.

### Prisma Migration Issues

If you're encountering Prisma migration issues:

1. Connect to your database directly to inspect the schema.
2. Run `pnpm prisma migrate reset` locally (caution: this deletes data).
3. Check `prisma/migrations` to ensure all migrations are properly tracked.

## Deployment Checklist

Before deploying, verify:

- [ ] Supabase credentials are set in Vercel dashboard for all environments
- [ ] No `vercel.json` exists at the monorepo root to avoid conflicts
- [ ] `apps/wine/vercel.json` is configured correctly
- [ ] Vercel project settings match the recommendations above
- [ ] Local build works: `cd apps/wine && pnpm run build`
- [ ] No sensitive credentials are in the repo (check with `grep -r "NEXT_PUBLIC_SUPABASE" .`) 