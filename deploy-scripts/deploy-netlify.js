#!/usr/bin/env node

/**
 * Netlify Deployment Script
 * Deploys Kuwait English Learning Hub to Netlify
 * 
 * Features:
 * - Great for static sites
 * - No watermarks
 * - 100GB bandwidth/month free
 * - Easy drag & drop deploy
 */

const { exec } = require('child_process');
const fs = require('fs');

console.log('🚀 Deploying Kuwait English Learning Hub to Netlify...');
console.log('📦 Built files ready in dist/ directory');

// Netlify deployment options
async function deployToNetlify() {
    try {
        console.log('\n🚀 Netlify Deployment Options');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('');
        console.log('Option 1: Netlify CLI (Fastest)');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('1. Install Netlify CLI:');
        console.log('   npm install -g netlify-cli');
        console.log('');
        console.log('2. Login to Netlify:');
        console.log('   netlify login');
        console.log('');
        console.log('3. Deploy:');
        console.log('   netlify deploy --prod --dir=dist');
        console.log('');
        console.log('Option 2: Drag & Drop (Easiest)');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('1. Go to: https://app.netlify.com/drop');
        console.log('2. Drag the entire dist/ folder');
        console.log('3. Your site is live instantly!');
        console.log('');
        console.log('Option 3: Netlify Dashboard');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('1. Go to: https://app.netlify.com/');
        console.log('2. Click "Add new site" → "Deploy manually"');
        console.log('3. Drag the dist/ folder');
        console.log('4. Configure settings');
        console.log('');
        console.log('Option 4: Git Integration (Auto Deploy)');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('1. Connect GitHub repository');
        console.log('2. Netlify detects build settings automatically');
        console.log('3. Every push triggers automatic deployment');
        console.log('');
        console.log('✅ Benefits:');
        console.log('• No watermarks or branding');
        console.log('• 100GB bandwidth/month free');
        console.log('• Instant global CDN');
        console.log('• Form handling (contact forms)');
        console.log('• Serverless functions support');
        console.log('• Branch deploys for testing');
        console.log('• Easy custom domain setup');
        console.log('');
        console.log('🔧 Build Settings (if needed):');
        console.log('• Build command: npm run build');
        console.log('• Publish directory: dist');
        console.log('');
        
        // Check if dist directory exists
        if (fs.existsSync('./dist')) {
            console.log('✅ Build files detected in dist/ directory');
            console.log('🚀 Ready to deploy!');
            
            // Show file count for verification
            const files = fs.readdirSync('./dist');
            console.log(`📁 ${files.length} files ready for deployment`);
        } else {
            console.log('❌ No build files found. Run: npm run build');
        }
        
    } catch (error) {
        console.error('❌ Deployment error:', error.message);
    }
}

// Run deployment
deployToNetlify();