# Supabase Setup Guide for Wine Community

This guide walks you through the process of setting up Supabase for the Wine Community application.

## Step 1: Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up for an account or log in.
2. Create a new project by clicking "New Project".
3. Name your project (e.g., "wine-community").
4. Choose a strong database password.
5. Select a region closest to your users.
6. Click "Create New Project".

## Step 2: Set Up the Database Schema

1. Navigate to the SQL Editor in the Supabase dashboard.
2. Copy the contents of the `schema.sql` file from this repository.
3. Paste the SQL into the SQL Editor.
4. Click "Run" to create the tables, indexes, and security policies.

Alternatively, you can use the Supabase CLI to run the migrations:

```bash
supabase init
cp schema.sql supabase/migrations/20240331000000_schema.sql
supabase migration up
```

## Step 3: Get Connection Details

1. In your Supabase project dashboard, go to Settings > API.
2. Find and copy these values:
   - Project URL (e.g., `https://xyzabcdefg.supabase.co`)
   - `anon` public key
   - `service_role` key (this is secret, never expose it on the client side)

## Step 4: Configure Environment Variables

Create a `.env.local` file (or use the provided `.env.example` as a template) and add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
```

Make sure to replace the placeholder values with your actual Supabase connection details.

## Step 5: Testing the Connection

1. Run the development server:
   ```bash
   pnpm dev
   ```
   
2. Navigate to the signup page and submit the form.
3. Check the Supabase dashboard to verify that the data was stored correctly:
   - Go to "Table Editor"
   - View the `users` and `community_signups` tables

## Security Considerations

- The schema applies Row Level Security (RLS) to protect your data.
- Anonymous access is allowed only for insertions during signup.
- Only authenticated users and the service role can read data.
- Make sure your service role key is never exposed client-side.

## Extending the Schema

As the application grows, you can expand the schema by:

1. Creating new migrations with additional tables.
2. Adding new RLS policies as needed.
3. Creating database functions for complex operations.

Use the Supabase TypeScript codegen to keep your type definitions in sync with the database schema:

```bash
supabase gen types typescript --project-id your-project-id > lib/supabase-types.ts
``` 