# Cloudflare Pages Drag-and-Drop Deployment Guide

## Quick Deployment Steps (2-3 minutes total)

### Step 1: Access Cloudflare Pages
1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Sign in to your Cloudflare account (create one if needed - free)

### Step 2: Create New Project
1. Click **"Create a project"**
2. Select **"Upload assets"** (drag-and-drop option)
3. Click **"Upload assets"** again

### Step 3: Upload Your Files
1. **Drag the entire `dist` folder** from your computer to the upload area
   - Or click "Browse files" and select the `dist` folder
   - Make sure you upload the `dist` folder, NOT individual files inside it
2. Wait for upload to complete (usually takes 10-30 seconds)

### Step 4: Configure Project
1. **Project name**: Enter `kuwait-english-learning-hub` (or your preferred name)
2. **Production branch**: Leave as default
3. Click **"Deploy site"**

### Step 5: Wait for Deployment
1. Cloudflare will automatically:
   - Build your site
   - Deploy to their global CDN
   - Provide you with a free URL (like `kuwait-english-learning-hub.pages.dev`)
2. Wait 30-60 seconds for deployment to complete

### Step 6: Test Your Site
1. Click the provided URL to test your site
2. Verify that:
   - No MiniMax watermarks appear
   - All features work correctly
   - Site loads fast

## That's it! ✅

Your site is now live on Cloudflare Pages with:
- ✅ No watermarks or branding
- ✅ Unlimited bandwidth
- ✅ Global CDN for fast loading
- ✅ Free SSL certificate
- ✅ Custom domain support (if you want)

## Optional: Custom Domain
If you want to use your own domain:
1. Go to your project settings
2. Click **"Custom domains"**
3. Follow Cloudflare's instructions to point your domain

## Important Notes
- The first upload is manual, but future updates can be automated with GitHub Actions
- Your site will be available immediately at the provided URL
- No monthly limits or bandwidth restrictions