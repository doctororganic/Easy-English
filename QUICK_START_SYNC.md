# Quick Start: Sync Two Repositories

## 🎯 Goal
Keep both repositories synchronized:
- Current repo (your workspace)
- Forked repo: https://github.com/DrKhaled123/websites.git

## ⚡ Quick Setup (5 minutes)

### Step 1: Run Setup Script

```bash
cd /workspace
./git-sync-config.sh
```

This will:
- ✅ Add your fork as a second remote named "fork"
- ✅ Configure both remotes
- ✅ Verify the setup

### Step 2: Test the Setup

```bash
# Check remotes
git remote -v

# Should show:
# origin    https://github.com/original/repo.git
# fork      https://github.com/DrKhaled123/websites.git
```

### Step 3: Sync Changes

**Option A: Manual Push (Simple)**
```bash
# Push to original repo
git push origin main

# Push to forked repo
git push fork main
```

**Option B: Use Sync Script (Automated)**
```bash
# Commit your changes first
git add .
git commit -m "Your commit message"

# Sync to both repos
./sync-repos.sh "Your commit message"
```

## 🔄 Daily Workflow

### Making Changes

1. **Make your changes** in the codebase
2. **Commit changes**:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
3. **Sync to both repos**:
   ```bash
   ./sync-repos.sh
   ```
   Or manually:
   ```bash
   git push origin main
   git push fork main
   ```

### Pulling Changes

If changes are made in either repo:

```bash
# Pull from original
git pull origin main

# Pull from fork
git pull fork main

# Then push to both
./sync-repos.sh
```

## 🛠️ Advanced: Automated Push to Both

### Method 1: Git Hook (Recommended)

Create `.git/hooks/post-commit`:

```bash
#!/bin/bash
# Auto-push to both remotes after commit
git push origin main &
git push fork main &
```

Make it executable:
```bash
chmod +x .git/hooks/post-commit
```

### Method 2: Git Alias

Add to your `~/.gitconfig`:

```ini
[alias]
    pushall = !git push origin main && git push fork main
```

Then use:
```bash
git pushall
```

### Method 3: Multiple Push URLs

Edit `.git/config`:

```ini
[remote "origin"]
    url = https://github.com/original/repo.git
    url = https://github.com/DrKhaled123/websites.git
    fetch = +refs/heads/*:refs/remotes/origin/*
```

Then `git push origin main` pushes to both!

## 🔐 Authentication Setup

### For HTTPS (Recommended for beginners)

```bash
# GitHub will prompt for credentials
# Or use Personal Access Token:
git remote set-url origin https://YOUR_TOKEN@github.com/user/repo.git
git remote set-url fork https://YOUR_TOKEN@github.com/DrKhaled123/websites.git
```

### For SSH (More secure)

```bash
# Generate SSH key if you don't have one
ssh-keygen -t ed25519 -C "your_email@example.com"

# Add to GitHub (Settings > SSH Keys)
# Then update remotes:
git remote set-url origin git@github.com:user/repo.git
git remote set-url fork git@github.com:DrKhaled123/websites.git
```

## ✅ Verification Checklist

- [ ] Both remotes configured (`git remote -v`)
- [ ] Can push to origin (`git push origin main`)
- [ ] Can push to fork (`git push fork main`)
- [ ] Sync script works (`./sync-repos.sh`)
- [ ] Authentication works for both repos

## 🐛 Troubleshooting

### "Remote fork already exists"
```bash
git remote remove fork
./git-sync-config.sh
```

### "Permission denied"
- Check SSH keys or Personal Access Token
- Verify repository access permissions

### "Repository not found"
- Verify the fork URL is correct
- Check you have access to the repository

### "Divergent branches"
```bash
# Pull and merge
git pull origin main
git pull fork main
# Resolve conflicts if any
git push origin main
git push fork main
```

## 📝 Best Practices

1. **Always pull before pushing** to avoid conflicts
2. **Use descriptive commit messages**
3. **Test changes before syncing**
4. **Keep both repos in sync** - don't let them diverge
5. **Use branches** for experimental changes

## 🎯 Recommended Workflow

```bash
# 1. Pull latest from both repos
git pull origin main
git pull fork main

# 2. Make your changes
# ... edit files ...

# 3. Commit
git add .
git commit -m "Your changes"

# 4. Sync to both
./sync-repos.sh
```

---

**Need help?** Run `./git-sync-config.sh` to reconfigure!
