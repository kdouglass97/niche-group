import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

// Setup for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// Import the prisma client after environment variables are loaded
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function addTestUser() {
  try {
    console.log('Creating test user...');
    
    // Create a unique test user
    const testUser = await prisma.user.create({
      data: {
        id: uuidv4(),
        email: `test_${Date.now()}@example.com`,
        firstName: 'Test',
        lastName: 'User',
        receiveUpdates: true,
        communitySignups: {
          create: {
            id: uuidv4(),
            community: 'wine',
            signupDate: new Date()
          }
        }
      },
      include: {
        communitySignups: true
      }
    });
    
    console.log('✅ Test user created successfully:');
    console.log({
      id: testUser.id,
      name: `${testUser.firstName} ${testUser.lastName}`,
      email: testUser.email,
      communities: testUser.communitySignups.map(signup => signup.community)
    });
    
    // List all users
    const userCount = await prisma.user.count();
    console.log(`Total users in database: ${userCount}`);
    
  } catch (error) {
    console.error('❌ Failed to create test user:', error.message);
    if (error.meta?.cause) {
      console.error('Cause:', error.meta.cause);
    }
  } finally {
    await prisma.$disconnect();
  }
}

addTestUser(); 