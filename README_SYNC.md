# 🔄 Repository Sync Guide

## Quick Start

Your repositories are now configured for dual remote sync!

### Current Setup:
- **Origin**: `doctororganic/Easy-English` (original repo)
- **Fork**: `DrKhaled123/websites` (your fork)

## 🎯 Three Ways to Sync

### 1. Automated Script (Easiest) ⭐

```bash
# Make changes, then:
git add .
git commit -m "Your changes"
./sync-repos.sh
```

### 2. Manual Push

```bash
git push origin main    # Push to original
git push fork main      # Push to fork
```

### 3. Git Alias (Fastest)

Add to `~/.gitconfig`:
```ini
[alias]
    pushall = !git push origin main && git push fork main
```

Then use:
```bash
git pushall
```

## 📋 Daily Workflow

```bash
# 1. Pull latest (if others made changes)
git pull origin main
git pull fork main

# 2. Make your changes
# ... edit files ...

# 3. Commit
git add .
git commit -m "Description"

# 4. Sync to both repos
./sync-repos.sh
```

## 🔍 Verify Setup

```bash
# Check remotes
git remote -v

# Test connection
git ls-remote fork
```

## 🐛 Troubleshooting

**"Remote fork already exists"**
```bash
git remote remove fork
git remote add fork https://github.com/DrKhaled123/websites.git
```

**"Permission denied"**
- Check your GitHub authentication
- Use Personal Access Token or SSH keys

**"Repository not found"**
- Verify the fork URL is correct
- Ensure you have access to the repository

## 📚 More Info

See `QUICK_START_SYNC.md` for detailed instructions.
