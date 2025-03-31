import { v4 as uuidv4 } from 'uuid';
import { supabase } from './supabase';
import type { Database } from './supabase-types';

type User = Database['public']['Tables']['users']['Row'];
type CommunitySignup = Database['public']['Tables']['community_signups']['Row'];

/**
 * Signs up a user for the wine community
 */
export async function signupUser(
  firstName: string,
  lastName: string,
  email: string,
  receiveUpdates: boolean = false,
  community: string = 'wine'
): Promise<{ success: boolean; error?: string; userId?: string }> {
  try {
    // Check if user already exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('user_id')
      .eq('email', email)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // Error other than "no rows returned"
      console.error('Error checking for existing user:', fetchError);
      return { success: false, error: 'Error checking for existing user' };
    }

    let userId: string;

    // If user doesn't exist, create a new one
    if (!existingUser) {
      userId = uuidv4();
      const { error: createError } = await supabase
        .from('users')
        .insert({
          user_id: userId,
          email,
          first_name: firstName,
          last_name: lastName,
          receive_updates: receiveUpdates
        });

      if (createError) {
        console.error('Error creating user:', createError);
        return { success: false, error: 'Failed to create user account' };
      }
    } else {
      userId = existingUser.user_id;
    }

    // Create community signup record
    const { error: signupError } = await supabase
      .from('community_signups')
      .insert({
        id: uuidv4(),
        user_id: userId,
        community,
        signup_date: new Date().toISOString()
      });

    if (signupError) {
      console.error('Error recording community signup:', signupError);
      return { success: false, error: 'Failed to record community signup' };
    }

    return { success: true, userId };
  } catch (error) {
    console.error('Unexpected error during signup:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    };
  }
}

/**
 * Gets user data by ID
 */
export async function getUserById(userId: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error fetching user:', error);
    return null;
  }
}

/**
 * Gets all communities a user has signed up for
 */
export async function getUserCommunities(userId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('community_signups')
      .select('community')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user communities:', error);
      return [];
    }

    return data.map(signup => signup.community);
  } catch (error) {
    console.error('Unexpected error fetching user communities:', error);
    return [];
  }
} 