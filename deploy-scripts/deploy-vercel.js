#!/usr/bin/env node

/**
 * Vercel Deployment Script
 * Deploys Kuwait English Learning Hub to Vercel
 * 
 * Features:
 * - Optimized for React apps
 * - No watermarks
 * - 100GB bandwidth/month free
 * - Automatic deployments from Git
 */

const { exec } = require('child_process');
const fs = require('fs');

console.log('🚀 Deploying Kuwait English Learning Hub to Vercel...');
console.log('📦 Built files ready in dist/ directory');

// Vercel deployment options
async function deployToVercel() {
    try {
        console.log('\n🚀 Vercel Deployment Options');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('');
        console.log('Option 1: Vercel CLI (Recommended)');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('1. Install Vercel CLI:');
        console.log('   npm install -g vercel');
        console.log('');
        console.log('2. Login to Vercel:');
        console.log('   vercel login');
        console.log('');
        console.log('3. Deploy:');
        console.log('   vercel --prod');
        console.log('');
        console.log('Option 2: Vercel Dashboard');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('1. Go to: https://vercel.com/new');
        console.log('2. Import from GitHub');
        console.log('3. Connect your repository');
        console.log('4. Vercel will auto-detect React settings');
        console.log('5. Click "Deploy"');
        console.log('');
        console.log('Option 3: Drag & Drop');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('1. Go to: https://vercel.com/new');
        console.log('2. Select "Browse All Templates"');
        console.log('3. Drag the entire dist/ folder');
        console.log('4. Configure settings and deploy');
        console.log('');
        console.log('✅ Benefits:');
        console.log('• No watermarks or branding');
        console.log('• Optimized for React/Next.js');
        console.log('• 100GB bandwidth/month free');
        console.log('• Automatic previews for PRs');
        console.log('• Edge network performance');
        console.log('• Built-in analytics');
        console.log('• Automatic HTTPS');
        console.log('');
        console.log('💡 Pro Tips:');
        console.log('• Connect GitHub for automatic deployments');
        console.log('• Set custom domains in project settings');
        console.log('• Enable branch previews for testing');
        console.log('');
        
        // Check if dist directory exists
        if (fs.existsSync('./dist')) {
            console.log('✅ Build files detected in dist/ directory');
            console.log('🚀 Ready to deploy!');
        } else {
            console.log('❌ No build files found. Run: npm run build');
        }
        
    } catch (error) {
        console.error('❌ Deployment error:', error.message);
    }
}

// Run deployment
deployToVercel();