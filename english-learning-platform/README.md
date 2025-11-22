# English Learning Platform

A comprehensive English learning web application built with React, TypeScript, Tailwind CSS, and Supabase.

## 🌟 Features

### ✅ Implemented Features

1. **100+ Conversation Topics** (5 sample topics deployed, database ready for more)
   - Categorized by topic (Morals, Crime, History, AI, Cryptocurrency, Environment, etc.)
   - Three difficulty levels (Beginner, Intermediate, Advanced)
   - Rich content with descriptions and key vocabulary
   - Search and filter functionality

2. **Comprehensive Vocabulary Database** (15 words deployed, expandable)
   - English words with Arabic translations
   - Phonetic pronunciations
   - Usage examples
   - Categorization and difficulty levels
   - Audio pronunciation with Web Speech API

3. **IELTS Preparation Module**
   - Speaking sections (Part 1, 2, 3)
   - Writing tasks (Task 1 & 2)
   - Reading strategies
   - Listening tips

4. **Advanced Audio Features**
   - Text-to-Speech (TTS) with Web Speech API
   - Adjustable speed (0.5x, 1x, 1.5x, 2x)
   - Repeat functionality (1x, 2x, 3x)
   - Individual word pronunciation

5. **PDF Generation**
   - Download study guides for topics
   - Includes content, vocabulary, and examples

6. **Study Materials Section**
   - Topic study guides
   - Vocabulary lists
   - Practice exercises

## 🚀 Live Demo

**Deployed Application**: https://qqjf3mhyt40p.space.minimax.io

## 🏗️ Technical Stack

- **Frontend**: React 18.3 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase
  - PostgreSQL database
  - Edge Functions
  - Storage buckets
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📦 Project Structure

```
english-learning-platform/
├── src/
│   ├── lib/
│   │   └── supabase.ts   # Supabase client configuration
│   ├── App.tsx           # Main application component
│   ├── App.css           # Application styles
│   └── main.tsx          # Application entry point
├── supabase/
│   └── functions/
│       ├── generate-pdf/     # PDF generation edge function
│       └── text-to-speech/   # TTS edge function
└── public/              # Static assets
```

## 🔧 Database Schema

### Tables

1. **conversation_topics** - Stores conversation topics
2. **vocabulary** - Vocabulary words with translations
3. **user_progress** - User learning progress tracking
4. **ielts_materials** - IELTS preparation content
5. **generated_content** - PDF and audio files metadata

### Storage Buckets

1. **audio-files** - Audio files (50MB limit)
2. **study-materials** - PDF downloads (10MB limit)

## 🚀 Deployment Options

### Option 1: Deploy to Netlify

1. Build the project:
   ```bash
   pnpm run build
   ```

2. Deploy:
   ```bash
   npm i -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

### Option 2: Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

### Option 3: Deploy to GitHub Pages

1. Update `vite.config.ts` base path
2. Build: `pnpm run build`
3. Deploy: `git subtree push --prefix dist origin gh-pages`

### Option 4: Deploy to Your Server

1. Build: `pnpm run build`
2. Upload `dist/` folder to your web server

## 🗄️ Setting Up Your Own Supabase

### 1. Create Project
- Visit https://supabase.com
- Create new project
- Get Project URL and Anon Key

### 2. Update Configuration

Edit `src/lib/supabase.ts`:
```typescript
const supabaseUrl = "YOUR_SUPABASE_URL"
const supabaseAnonKey = "YOUR_ANON_KEY"
```

### 3. Create Database Tables

Run in Supabase SQL Editor:
```sql
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

CREATE TABLE vocabulary (
  id SERIAL PRIMARY KEY,
  word VARCHAR(200) NOT NULL,
  arabic_translation VARCHAR(500) NOT NULL,
  phonetic VARCHAR(300),
  difficulty_level VARCHAR(50),
  category VARCHAR(100),
  usage_example TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

See `/workspace/data/` for complete SQL schema and sample data.

### 4. Create Storage Buckets

- `audio-files` (public, 50MB)
- `study-materials` (public, 10MB)

### 5. Deploy Edge Functions

```bash
supabase functions deploy generate-pdf
supabase functions deploy text-to-speech
```

## 📝 Adding Content

### Add Topics
```sql
INSERT INTO conversation_topics (title, category, difficulty_level, description, content, vocabulary)
VALUES ('Title', 'Category', 'Beginner', 'Description', 'Content...', ARRAY['word1', 'word2']);
```

### Add Vocabulary
```sql
INSERT INTO vocabulary (word, arabic_translation, phonetic, difficulty_level, category, usage_example)
VALUES ('word', 'translation', '/phonetic/', 'Beginner', 'Category', 'Example sentence.');
```

## 🎯 Future Enhancements

- User authentication and progress tracking
- Expand to 10,000+ vocabulary words
- Add 100+ conversation topics
- Professional TTS integration (Google Cloud TTS, ElevenLabs)
- Interactive exercises and quizzes
- Mobile app (React Native)
- Spaced repetition system
- Gamification features

## 📄 License

Open source - available for educational purposes.

## 🙏 Credits

Built with React, TypeScript, Tailwind CSS, and Supabase.

---

**All data files and setup instructions available in `/workspace/` directory**
