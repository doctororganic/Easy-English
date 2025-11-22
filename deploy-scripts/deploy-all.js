#!/usr/bin/env node

/**
 * Complete Deployment Script for Kuwait English Learning Hub
 * Provides deployment options for multiple platforms
 */

const inquirer = require('inquirer');
const { exec } = require('child_process');
const fs = require('fs');

async function main() {
    console.log('\n🎯 Kuwait English Learning Hub - Deployment Options');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('Your React app is ready to deploy! Choose a platform:');
    console.log('');
    console.log('🌟 1. Cloudflare Pages (Recommended)');
    console.log('   • 500 builds/month, unlimited bandwidth');
    console.log('   • No watermarks, global CDN');
    console.log('   • Drag & drop or Git integration');
    console.log('');
    console.log('🚀 2. Vercel (Best for React)');
    console.log('   • 100GB bandwidth/month free');
    console.log('   • Optimized for React/Next.js');
    console.log('   • Automatic previews and deployments');
    console.log('');
    console.log('📱 3. Netlify (Easy Drag & Drop)');
    console.log('   • 100GB bandwidth/month free');
    console.log('   • Instant drag & drop deploy');
    console.log('   • Form handling and serverless functions');
    console.log('');
    console.log('🎯 4. GitHub Pages (100% Free)');
    console.log('   • Unlimited traffic and storage');
    console.log('   • Perfect for open source projects');
    console.log('   • Automatic GitHub Actions deployment');
    console.log('');
    console.log('❌ 5. Exit');
    
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'platform',
            message: 'Choose your deployment platform:',
            choices: [
                'Cloudflare Pages (Recommended)',
                'Vercel (Best for React)',
                'Netlify (Easy Drag & Drop)',
                'GitHub Pages (100% Free)',
                'Exit'
            ]
        }
    ]);

    switch (answers.platform) {
        case 'Cloudflare Pages (Recommended)':
            deployCloudflare();
            break;
        case 'Vercel (Best for React)':
            deployVercel();
            break;
        case 'Netlify (Easy Drag & Drop)':
            deployNetlify();
            break;
        case 'GitHub Pages (100% Free)':
            deployGitHubPages();
            break;
        case 'Exit':
            console.log('👋 Thanks for using Kuwait English Learning Hub!');
            process.exit(0);
    }
}

function deployCloudflare() {
    console.log('\n🌟 Deploying to Cloudflare Pages');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('📋 Instructions:');
    console.log('1. Open: https://pages.cloudflare.com/');
    console.log('2. Click "Create a project"');
    console.log('3. Choose "Upload assets"');
    console.log('4. Drag the entire "dist" folder');
    console.log('5. Configure project name and deploy!');
    console.log('');
    console.log('✅ Benefits:');
    console.log('• 500 builds per month free');
    console.log('• Unlimited bandwidth');
    console.log('• No watermarks or branding');
    console.log('• Global CDN performance');
    console.log('• Automatic HTTPS');
    console.log('');
    console.log('🔧 Alternative: Git Integration');
    console.log('• Connect GitHub repository');
    console.log('• Automatic deployments on every push');
    console.log('• Build settings auto-detected');
}

function deployVercel() {
    console.log('\n🚀 Deploying to Vercel');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('📋 Instructions:');
    console.log('1. Install Vercel CLI: npm install -g vercel');
    console.log('2. Login: vercel login');
    console.log('3. Deploy: vercel --prod');
    console.log('');
    console.log('🌐 Or use web interface:');
    console.log('1. Open: https://vercel.com/new');
    console.log('2. Import from GitHub or drag dist folder');
    console.log('3. Deploy instantly!');
    console.log('');
    console.log('✅ Benefits:');
    console.log('• Optimized for React applications');
    console.log('• 100GB bandwidth/month free');
    console.log('• Automatic previews for PRs');
    console.log('• Edge network performance');
    console.log('• Built-in analytics');
}

function deployNetlify() {
    console.log('\n📱 Deploying to Netlify');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('🎯 Easiest Method: Drag & Drop');
    console.log('1. Open: https://app.netlify.com/drop');
    console.log('2. Drag the "dist" folder');
    console.log('3. Instant deployment!');
    console.log('');
    console.log('🔧 Alternative: Netlify CLI');
    console.log('1. Install: npm install -g netlify-cli');
    console.log('2. Login: netlify login');
    console.log('3. Deploy: netlify deploy --prod --dir=dist');
    console.log('');
    console.log('✅ Benefits:');
    console.log('• 100GB bandwidth/month free');
    console.log('• Instant global CDN');
    console.log('• Form handling support');
    console.log('• Serverless functions');
    console.log('• Branch deploys for testing');
}

function deployGitHubPages() {
    console.log('\n🎯 Deploying to GitHub Pages');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('📋 Instructions:');
    console.log('1. Push code to GitHub repository');
    console.log('2. Go to Repository Settings → Pages');
    console.log('3. Source: "GitHub Actions"');
    console.log('4. Push to main branch to trigger deploy');
    console.log('');
    console.log('🚀 Quick Setup Script:');
    console.log('npm install -g gh-pages');
    console.log('gh-pages -d dist');
    console.log('');
    console.log('✅ Benefits:');
    console.log('• 100% Free (no credit card)');
    console.log('• Unlimited traffic and storage');
    console.log('• Automatic GitHub Actions');
    console.log('• Repository integration');
    console.log('• Perfect for open source');
}

// Check if inquirer is available
try {
    require('inquirer');
    main().catch(console.error);
} catch (error) {
    console.log('\n📝 Simple Deployment Guide:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('');
    console.log('To deploy your Kuwait English Learning Hub:');
    console.log('');
    console.log('1. Build the project: npm run build');
    console.log('2. Choose a platform and follow instructions above');
    console.log('3. Upload the "dist" folder contents');
    console.log('');
    console.log('🚀 Recommended: Cloudflare Pages (drag & drop at pages.cloudflare.com)');
    console.log('📱 Easiest: Netlify (drag & drop at app.netlify.com/drop)');
}