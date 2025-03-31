import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log('Using connection string:', process.env.DATABASE_URL.replace(/(postgres:\/\/[^:]+:)([^@]+)(@.*)/, '$1[PASSWORD_HIDDEN]$3'));
    
    // Try to query the database
    const usersCount = await prisma.user.count();
    console.log(`✅ Connection successful! Found ${usersCount} users in the database.`);
    
    // If successful, get some more information about the database
    const signupsCount = await prisma.communitySignup.count();
    console.log(`Found ${signupsCount} community signups in the database.`);
    
    if (usersCount > 0) {
      // Get first user as a sample
      const sampleUser = await prisma.user.findFirst();
      console.log('Sample user:', {
        id: sampleUser.id,
        firstName: sampleUser.firstName,
        lastName: sampleUser.lastName,
        email: sampleUser.email
      });
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    if (error.meta?.cause) {
      console.error('Cause:', error.meta.cause);
    }
    console.error('Please check your connection string and ensure the database is accessible.');
  } finally {
    await prisma.$disconnect();
  }
}

testConnection(); 