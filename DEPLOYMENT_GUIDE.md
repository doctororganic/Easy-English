# Deployment Guide - English Learning Platform

This guide provides step-by-step instructions for deploying the English Learning Platform to your own server or hosting platform.

## 📋 Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Supabase account (free tier available)
- Git installed (for version control)

## 🗂️ Project Files Location

All project files are located in: `/workspace/english-learning-platform/`

## 🚀 Quick Start - Deploy to GitHub Repository

### Step 1: Prepare Your GitHub Repository

1. **Create a new repository** on GitHub.com
   - Repository name: `english-learning-platform` (or your choice)
   - Keep it public or private
   - Do NOT initialize with README (we already have one)

2. **Get your repository URL**:
   ```
   https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

### Step 2: Push Code to GitHub

```bash
# Navigate to project directory
cd /workspace/english-learning-platform

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: English Learning Platform"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy from GitHub

After pushing to GitHub, you can deploy using:

#### **Option A: Netlify (Recommended)**

1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Build settings:
   - Build command: `pnpm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

Your site will be live in ~2 minutes!

#### **Option B: Vercel**

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite settings
5. Click "Deploy"

#### **Option C: GitHub Pages**

1. Update `vite.config.ts`:
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: '/english-learning-platform/', // Your repo name
   })
   ```

2. Build and deploy:
   ```bash
   pnpm run build
   git add dist -f
   git commit -m "Add build files"
   git subtree push --prefix dist origin gh-pages
   ```

3. Enable GitHub Pages:
   - Go to repo Settings → Pages
   - Source: `gh-pages` branch
   - Save

## 🖥️ Deploy to Your Own Server

### Step 1: Build the Project

```bash
cd /workspace/english-learning-platform
pnpm install
pnpm run build
```

This creates a `dist/` folder with all static files.

### Step 2: Upload to Server

#### **Via FTP/SFTP**:
1. Connect to your server using FileZilla or similar
2. Upload contents of `dist/` folder to your web root (e.g., `public_html/`)

#### **Via SSH**:
```bash
# On your server
scp -r dist/* user@yourserver.com:/var/www/html/

# Or using rsync
rsync -avz dist/ user@yourserver.com:/var/www/html/
```

### Step 3: Configure Web Server

#### **Nginx** (`/etc/nginx/sites-available/english-learning`):
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### **Apache** (`.htaccess` in dist folder):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 🗄️ Set Up Your Own Supabase Backend

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up/Login
3. Click "New Project"
4. Fill in:
   - Name: English Learning Platform
   - Database Password: (save this!)
   - Region: Choose closest to your users
5. Wait ~2 minutes for provisioning

### Step 2: Get Your Credentials

From Supabase Dashboard → Settings → API:
- **Project URL**: `https://xxxxx.supabase.co`
- **Anon/Public Key**: `eyJhbG...` (long string)

### Step 3: Update Application Code

Edit `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "YOUR_PROJECT_URL_HERE"
const supabaseAnonKey = "YOUR_ANON_KEY_HERE"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### Step 4: Create Database Tables

1. Go to Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Copy and paste this SQL:

```sql
-- Conversation Topics
CREATE TABLE conversation_topics (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  category VARCHAR(100) NOT NULL,
  difficulty_level VARCHAR(50) NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  vocabulary TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

-- Vocabulary
CREATE TABLE vocabulary (
  id SERIAL PRIMARY KEY,
  word VARCHAR(200) NOT NULL,
  arabic_translation VARCHAR(500) NOT NULL,
  phonetic VARCHAR(300),
  difficulty_level VARCHAR(50),
  category VARCHAR(100),
  usage_example TEXT,
  audio_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Progress
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  topic_id INTEGER,
  vocabulary_id INTEGER,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER,
  last_practiced_at TIMESTAMP DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- IELTS Materials
CREATE TABLE ielts_materials (
  id SERIAL PRIMARY KEY,
  section VARCHAR(100) NOT NULL,
  type VARCHAR(100) NOT NULL,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  difficulty_level VARCHAR(50),
  audio_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Generated Content
CREATE TABLE generated_content (
  id SERIAL PRIMARY KEY,
  content_type VARCHAR(100) NOT NULL,
  title VARCHAR(500) NOT NULL,
  file_url VARCHAR(500),
  metadata JSONB,
  user_id UUID,
  created_at TIMESTAMP DEFAULT NOW()
);
```

4. Click "Run" to execute

### Step 5: Create Storage Buckets

1. Go to Storage → Create bucket
2. Create bucket:
   - Name: `audio-files`
   - Public: Yes
3. Create another:
   - Name: `study-materials`
   - Public: Yes

### Step 6: Insert Sample Data

Use the SQL from `/workspace/data/conversation_topics.sql` to add sample topics.

For vocabulary, run:
```sql
INSERT INTO vocabulary (word, arabic_translation, phonetic, difficulty_level, category, usage_example)
VALUES 
('honesty', 'الصدق', '/ˈɒnɪsti/', 'Beginner', 'Morals', 'Honesty is the best policy.'),
('integrity', 'النزاهة', '/ɪnˈtɛɡrɪti/', 'Intermediate', 'Morals', 'He showed great integrity.'),
-- Add more from /workspace/data/sample_vocabulary.json
```

### Step 7: Deploy Edge Functions (Optional)

If you have Supabase CLI installed:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Deploy functions
supabase functions deploy generate-pdf
supabase functions deploy text-to-speech
```

## 🔄 Rebuild and Redeploy After Changes

Whenever you make changes to the code:

```bash
# 1. Make your changes
# 2. Rebuild
pnpm run build

# 3. Redeploy based on your method:

# For Netlify (drag & drop)
# Upload new dist/ folder

# For Vercel
git push origin main  # Auto-deploys

# For GitHub Pages
git add dist -f
git commit -m "Update build"
git subtree push --prefix dist origin gh-pages

# For your server
scp -r dist/* user@server:/var/www/html/
```

## 🌍 Using a Custom Domain

### Netlify:
1. Domain settings → Add custom domain
2. Update DNS records as instructed

### Vercel:
1. Project settings → Domains
2. Add domain and follow DNS instructions

### Your Server:
1. Point domain's A record to server IP
2. Update server configuration with domain name

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules dist
pnpm install
pnpm run build
```

### Supabase Connection Issues
- Verify URL and Key in `src/lib/supabase.ts`
- Check Supabase project is active
- Verify tables are created

### Deployment Issues
- Ensure `dist/` folder contains `index.html`
- Check server has proper file permissions
- Verify web server is configured for SPA

## 📚 Additional Resources

- **Supabase Docs**: https://supabase.com/docs
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html
- **React Docs**: https://react.dev

## ✅ Deployment Checklist

Before going live:

- [ ] Updated Supabase credentials in code
- [ ] Created all database tables
- [ ] Inserted sample/production data
- [ ] Created storage buckets
- [ ] Built project (`pnpm run build`)
- [ ] Tested build locally
- [ ] Deployed to hosting platform
- [ ] Verified all features work on deployed site
- [ ] Set up custom domain (optional)
- [ ] Configured SSL certificate

---

**Need help?** Check `/workspace/test-progress.md` for testing documentation.
