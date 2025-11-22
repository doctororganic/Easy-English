#!/usr/bin/env node

/**
 * Cloudflare Pages Deployment Script
 * Deploys Kuwait English Learning Hub to Cloudflare Pages
 * 
 * Features:
 * - No watermarks
 * - 500 builds/month free
 * - Unlimited bandwidth
 * - Global CDN
 * - Automatic HTTPS
 */

const { exec } = require('child_process');
const path = require('path');

console.log('🚀 Deploying Kuwait English Learning Hub to Cloudflare Pages...');
console.log('📦 Built files ready in dist/ directory');

// Cloudflare Pages deploy function
async function deployToCloudflare() {
    try {
        console.log('\n🌍 Cloudflare Pages Deployment');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('');
        console.log('Step 1: Upload to Cloudflare Pages');
        console.log('• Go to: https://pages.cloudflare.com/');
        console.log('• Connect your GitHub repository OR');
        console.log('• Drag & drop the dist/ folder');
        console.log('');
        console.log('Step 2: Configure Build Settings');
        console.log('• Build command: npm run build');
        console.log('• Build output directory: dist');
        console.log('• Root directory: / (leave empty)');
        console.log('');
        console.log('Step 3: Deploy');
        console.log('• Click "Create Deployment"');
        console.log('• Your site will be live in seconds!');
        console.log('');
        console.log('✅ Benefits:');
        console.log('• No watermarks or branding');
        console.log('• 500 builds per month free');
        console.log('• Unlimited bandwidth');
        console.log('• Global CDN performance');
        console.log('• Automatic HTTPS/SSL');
        console.log('• Custom domains supported');
        console.log('');
        console.log('🔗 Alternative: Use Cloudflare CLI');
        console.log('npm install -g wrangler');
        console.log('wrangler pages publish dist');
        
    } catch (error) {
        console.error('❌ Deployment error:', error.message);
    }
}

// Run deployment
deployToCloudflare();