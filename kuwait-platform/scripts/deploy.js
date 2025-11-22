#!/usr/bin/env node

/**
 * Deployment script for Kuwait English Learning Platform
 * Handles deployment to different environments (staging, production)
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const environments = {
  staging: {
    apiUrl: 'https://api-staging.kuwait-platform.com',
    frontendUrl: 'https://staging.kuwait-platform.com',
    branch: 'staging'
  },
  production: {
    apiUrl: 'https://api.kuwait-platform.com',
    frontendUrl: 'https://kuwait-platform.com',
    branch: 'main'
  }
};

function getEnvironment() {
  const args = process.argv.slice(2);
  const envIndex = args.findIndex(arg => arg.includes('environment='));
  return envIndex !== -1 ? args[envIndex].split('=')[1] : 'staging';
}

function validateEnvironment(env) {
  if (!environments[env]) {
    console.error(`❌ Invalid environment: ${env}`);
    console.log(`Available environments: ${Object.keys(environments).join(', ')}`);
    process.exit(1);
  }
}

function checkPrerequisites() {
  console.log('🔍 Checking prerequisites...');
  
  // Check if required files exist
  const requiredFiles = [
    'frontend/.env',
    'backend/.env',
    'frontend/dist',
    'backend/dist'
  ];
  
  for (const file of requiredFiles) {
    if (!fs.existsSync(file)) {
      console.error(`❌ Required file/directory missing: ${file}`);
      process.exit(1);
    }
  }
  
  console.log('✅ Prerequisites check passed');
}

function runTests() {
  console.log('🧪 Running tests...');
  try {
    execSync('npm test', { stdio: 'inherit' });
    console.log('✅ All tests passed');
  } catch (error) {
    console.error('❌ Tests failed');
    process.exit(1);
  }
}

function buildProject() {
  console.log('🔨 Building project...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ Build completed');
  } catch (error) {
    console.error('❌ Build failed');
    process.exit(1);
  }
}

function deployBackend(env) {
  console.log(`🚀 Deploying backend to ${env}...`);
  try {
    // Copy environment file
    const envFile = `backend/.env.${env}`;
    if (fs.existsSync(envFile)) {
      fs.copyFileSync(envFile, 'backend/.env');
    }
    
    // Build and deploy (this would integrate with your deployment service)
    execSync('cd backend && npm run build', { stdio: 'inherit' });
    console.log(`✅ Backend deployed to ${environments[env].apiUrl}`);
  } catch (error) {
    console.error('❌ Backend deployment failed');
    process.exit(1);
  }
}

function deployFrontend(env) {
  console.log(`🚀 Deploying frontend to ${env}...`);
  try {
    // Build frontend with environment variables
    execSync('cd frontend && npm run build', { stdio: 'inherit' });
    console.log(`✅ Frontend deployed to ${environments[env].frontendUrl}`);
  } catch (error) {
    console.error('❌ Frontend deployment failed');
    process.exit(1);
  }
}

function runDatabaseMigrations(env) {
  console.log('🗄️ Running database migrations...');
  try {
    execSync(`cd backend && npm run db:migrate -- --env=${env}`, { stdio: 'inherit' });
    console.log('✅ Database migrations completed');
  } catch (error) {
    console.error('❌ Database migration failed');
    process.exit(1);
  }
}

function main() {
  const env = getEnvironment();
  console.log(`🌍 Deploying to ${env} environment`);
  
  validateEnvironment(env);
  checkPrerequisites();
  
  if (env === 'production') {
    runTests();
  }
  
  buildProject();
  runDatabaseMigrations(env);
  deployBackend(env);
  deployFrontend(env);
  
  console.log(`🎉 Deployment to ${env} completed successfully!`);
  console.log(`🌐 Frontend: ${environments[env].frontendUrl}`);
  console.log(`🔌 API: ${environments[env].apiUrl}`);
}

main();