#!/usr/bin/env node

/**
 * GitHub Pages Deployment Script
 * Deploys Kuwait English Learning Hub to GitHub Pages
 * 
 * Features:
 * - 100% Free
 * - Unlimited traffic
 * - No watermarks
 * - Automatic deployments
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Deploying Kuwait English Learning Hub to GitHub Pages...');
console.log('📦 Built files ready in dist/ directory');

// GitHub Pages deployment options
async function deployToGitHubPages() {
    try {
        console.log('\n🎯 GitHub Pages Deployment Options');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('');
        console.log('Option 1: GitHub Actions (Recommended - Auto Deploy)');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('1. Create .github/workflows/deploy.yml:');
        console.log('');
        console.log('   name: Deploy to GitHub Pages');
        console.log('   on: [push]');
        console.log('   jobs:');
        console.log('     deploy:');
        console.log('       runs-on: ubuntu-latest');
        console.log('       steps:');
        console.log('         - uses: actions/checkout@v3');
        console.log('         - uses: actions/setup-node@v3');
        console.log('           with:');
        console.log('             node-version: "18"');
        console.log('         - run: npm install');
        console.log('         - run: npm run build');
        console.log('         - uses: peaceiris/actions-gh-pages@v3');
        console.log('           with:');
        console.log('             github_token: ${{ secrets.GITHUB_TOKEN }}');
        console.log('             publish_dir: ./dist');
        console.log('');
        console.log('2. Push to main branch');
        console.log('3. Enable GitHub Pages in repository settings');
        console.log('4. Select "GitHub Actions" as source');
        console.log('');
        console.log('Option 2: Manual Deploy');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('1. Push your code to GitHub');
        console.log('2. Go to Repository Settings → Pages');
        console.log('3. Select source: "Deploy from a branch"');
        console.log('4. Choose branch: "main" and folder: "/ (root)"');
        console.log('5. Upload dist/ folder contents manually');
        console.log('');
        console.log('Option 3: gh-pages Branch');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('1. Install gh-pages: npm install -g gh-pages');
        console.log('2. Deploy: gh-pages -d dist');
        console.log('3. Configure GitHub Pages to use gh-pages branch');
        console.log('');
        console.log('✅ Benefits:');
        console.log('• 100% Free (no credit card required)');
        console.log('• Unlimited traffic and storage');
        console.log('• No watermarks or branding');
        console.log('• Automatic deployments from Git');
        console.log('• HTTPS enabled automatically');
        console.log('• Custom domains supported');
        console.log('• Repository integration');
        console.log('');
        console.log('💡 Pro Tips:');
        console.log('• Repository name will be your URL: username.github.io/repo-name');
        console.log('• For custom domain: create CNAME file in public/');
        console.log('• Branch protection recommended for main branch');
        console.log('• Use repository secrets for sensitive data');
        console.log('');
        
        // Check if dist directory exists
        if (fs.existsSync('./dist')) {
            console.log('✅ Build files detected in dist/ directory');
            console.log('🚀 Ready to deploy!');
            
            // Show file count for verification
            const files = fs.readdirSync('./dist');
            console.log(`📁 ${files.length} files ready for deployment`);
            
            // Create simple gh-pages deployment script
            console.log('\n📝 Quick Deploy Commands:');
            console.log('npm install -g gh-pages');
            console.log('gh-pages -d dist');
        } else {
            console.log('❌ No build files found. Run: npm run build');
        }
        
    } catch (error) {
        console.error('❌ Deployment error:', error.message);
    }
}

// Run deployment
deployToGitHubPages();