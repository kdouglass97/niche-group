#!/usr/bin/env node

/**
 * Wine Enthusiasts Platform Setup Script
 * This script helps users set up the Wine Enthusiasts platform correctly.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Setup for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(`
╭───────────────────────────────────────────────╮
│                                               │
│   🍷 Wine Enthusiasts Platform Setup 🍷      │
│                                               │
╰───────────────────────────────────────────────╯
`);

// Check if .env.local exists, if not create from example
function setupEnvFile() {
  const envPath = path.join(rootDir, '.env.local');
  const envExamplePath = path.join(rootDir, '.env.example');
  
  if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
    console.log('⏳ Creating .env.local from .env.example...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env.local file');
    console.log('❗ Please update the .env.local file with your Supabase credentials');
  } else if (fs.existsSync(envPath)) {
    console.log('✅ .env.local file already exists');
  } else {
    console.log('⚠️ Could not find .env.example file');
    process.exit(1);
  }
}

// Generate Prisma client
function generatePrismaClient() {
  console.log('⏳ Generating Prisma client...');
  try {
    execSync('npx prisma generate', { stdio: 'inherit', cwd: rootDir });
    console.log('✅ Prisma client generated successfully');
  } catch (error) {
    console.error('❌ Failed to generate Prisma client:', error.message);
    process.exit(1);
  }
}

// Ask if user wants to seed data
function askSeedData() {
  rl.question('Do you want to seed the database with sample data? (y/n): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      seedDatabase();
    } else {
      console.log('Skipping database seeding');
      finishSetup();
    }
  });
}

// Seed the database
function seedDatabase() {
  console.log('⏳ Seeding database...');
  try {
    execSync('node scripts/seed-data.js', { stdio: 'inherit', cwd: rootDir });
    console.log('✅ Database seeded successfully');
    finishSetup();
  } catch (error) {
    console.error('❌ Failed to seed database:', error.message);
    finishSetup();
  }
}

// Final setup instructions
function finishSetup() {
  console.log(`
╭───────────────────────────────────────────────╮
│                                               │
│   🎉 Setup Complete! 🎉                      │
│                                               │
│   To start the development server:            │
│   $ npm run dev -- --port 3003                │
│                                               │
│   Visit: http://localhost:3003                │
│                                               │
╰───────────────────────────────────────────────╯
  `);
  rl.close();
}

// Run setup steps
setupEnvFile();
generatePrismaClient();
askSeedData(); 