// This script will add test data to your Supabase database
// Run with "node scripts/seed-data.js"

import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Test data
const communities = ['wine', 'cigars', 'travel', 'fashion', 'watches'];
const users = [
  { firstName: 'John', lastName: 'Smith', email: 'john@example.com', communities: ['wine', 'cigars'] },
  { firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', communities: ['wine', 'travel'] },
  { firstName: 'Robert', lastName: 'Williams', email: 'robert@example.com', communities: ['cigars'] },
  { firstName: 'Emily', lastName: 'Brown', email: 'emily@example.com', communities: ['wine', 'fashion', 'watches'] },
  { firstName: 'Michael', lastName: 'Davis', email: 'michael@example.com', communities: ['travel', 'watches'] },
  { firstName: 'Sarah', lastName: 'Miller', email: 'sarah@example.com', communities: ['fashion'] },
  { firstName: 'David', lastName: 'Wilson', email: 'david@example.com', communities: ['wine', 'cigars', 'watches'] },
  { firstName: 'Jennifer', lastName: 'Moore', email: 'jennifer@example.com', communities: ['travel'] },
  { firstName: 'James', lastName: 'Taylor', email: 'james@example.com', communities: ['wine'] },
  { firstName: 'Lisa', lastName: 'Anderson', email: 'lisa@example.com', communities: ['wine', 'travel', 'fashion'] }
];

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  console.log('Starting database seeding...');
  
  try {
    for (const user of users) {
      console.log(`Processing user: ${user.email}`);
      
      // Check if user already exists
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('user_id')
        .eq('email', user.email)
        .single();
        
      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error(`Error checking for existing user ${user.email}:`, fetchError);
        continue;
      }
      
      let userId;
      
      if (!existingUser) {
        // Create new user
        userId = uuidv4();
        const { error: createError } = await supabase
          .from('users')
          .insert({
            user_id: userId,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName,
            receive_updates: Math.random() > 0.5
          });
          
        if (createError) {
          console.error(`Error creating user ${user.email}:`, createError);
          continue;
        }
        
        console.log(`Created user: ${user.email} with ID: ${userId}`);
      } else {
        userId = existingUser.user_id;
        console.log(`User ${user.email} already exists with ID: ${userId}`);
      }
      
      // Add community signups
      for (const community of user.communities) {
        // Check if already signed up
        const { data: existingSignup, error: checkSignupError } = await supabase
          .from('community_signups')
          .select('id')
          .eq('user_id', userId)
          .eq('community', community)
          .single();
          
        if (checkSignupError && checkSignupError.code !== 'PGRST116') {
          console.error(`Error checking if user ${user.email} is already in ${community}:`, checkSignupError);
          continue;
        }
        
        if (!existingSignup) {
          // Create signup
          const { error: signupError } = await supabase
            .from('community_signups')
            .insert({
              id: uuidv4(),
              user_id: userId,
              community,
              signup_date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString()
            });
            
          if (signupError) {
            console.error(`Error adding user ${user.email} to ${community}:`, signupError);
            continue;
          }
          
          console.log(`Added user ${user.email} to community: ${community}`);
        } else {
          console.log(`User ${user.email} already in community: ${community}`);
        }
      }
    }
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Unexpected error during seeding:', error);
  }
}

// Run the seed function
seedDatabase(); 