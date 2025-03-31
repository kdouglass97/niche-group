# Wine Enthusiasts Community Platform

## Project Overview
A niche community platform for wine enthusiasts that offers exclusive content, tastings, and networking opportunities. This landing page allows users to join a waitlist ahead of launch.

## Features
- **Modern and Elegant UI**: Designed for a luxury, refined experience
- **Waitlist Signup**: Collects user information for early access
- **Centralized Data Management**: Single database supporting multiple niche platforms
- **Responsive Design**: Works across all devices

## Tech Stack
- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Supabase (PostgreSQL)
- **ORM**: Prisma for type-safe database access
- **Deployment**: Vercel (frontend), Supabase (database)
- **Monorepo Structure**: TurboRepo with PNPM workspace

## Setup & Installation

### Prerequisites
- Node.js 18+ and PNPM 9.0+
- Supabase account

### Local Development
1. Create a Supabase project and set up the database schema:
   - Use the `schema.sql` file in the project root to initialize your database
   - Or run each SQL command manually from the Supabase dashboard

2. Clone the repository and install dependencies:
```bash
git clone <repository-url>
cd niche-group
pnpm install
```

3. Set up the Wine Enthusiasts platform:
```bash
cd apps/wine
pnpm setup
```

This setup script will:
- Create a `.env.local` file from `.env.example` if it doesn't exist
- Generate the Prisma client
- Optionally seed the database with sample data

4. Update the environment variables in the `.env.local` file with your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
DATABASE_URL=your-postgres-connection-string
```

5. Start the development server:
```bash
pnpm dev -- --port 3003
```

6. Visit `http://localhost:3003` to see the Wine Enthusiasts landing page

## Usage Guide
- Visit `http://localhost:3001` to see the Wine Enthusiasts landing page
- Fill out the signup form to join the waitlist
- Data is stored in Supabase for future marketing and launch

## Deployment Details
1. Deploy the frontend to Vercel:
```bash
vercel --prod
```

2. Ensure environment variables are set in the Vercel dashboard.

## Future Roadmap
- User authentication and member-only content
- Online wine tasting event scheduling
- Community forums and discussions
- Integration with wine recommendation API
- E-commerce capabilities for wine purchasing

## Contributors & Contact
- Built by the Niche Group team
- For questions or support, contact support@example.com 