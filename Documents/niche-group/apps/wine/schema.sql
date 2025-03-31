-- Users table
CREATE TABLE IF NOT EXISTS public.users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  receive_updates BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community signups table
CREATE TABLE IF NOT EXISTS public.community_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(user_id) NOT NULL,
  community TEXT NOT NULL,
  signup_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_community_signups_user_id ON public.community_signups(user_id);
CREATE INDEX IF NOT EXISTS idx_community_signups_community ON public.community_signups(community);

-- Set up RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_signups ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated access
CREATE POLICY "Allow authenticated read access to users" 
  ON public.users FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow service role full access to users" 
  ON public.users 
  USING (auth.role() = 'service_role');

CREATE POLICY "Allow authenticated read access to community_signups" 
  ON public.community_signups FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow service role full access to community_signups" 
  ON public.community_signups 
  USING (auth.role() = 'service_role');

-- Allow anonymous insert access for signup form
CREATE POLICY "Allow anonymous insert to users"
  ON public.users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow anonymous insert to community_signups"
  ON public.community_signups FOR INSERT
  WITH CHECK (true); 