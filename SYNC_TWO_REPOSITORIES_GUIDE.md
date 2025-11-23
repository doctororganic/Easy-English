# Guide: Syncing Changes Between Two Repositories

## 🎯 Goal
Keep both repositories in sync:
- **Current repo**: (your current workspace)
- **Forked repo**: https://github.com/DrKhaled123/websites.git

## 📋 Setup Options

### Option 1: Dual Remote Setup (Recommended) ✅

This allows you to push to both repositories from one local repo.

### Option 2: Fork Relationship Setup

Set up proper fork relationship with upstream tracking.

### Option 3: Automated Sync Script

Create a script to automatically sync changes.

---

## 🚀 Implementation: Option 1 (Dual Remote)

### Step 1: Check Current Remotes

```bash
git remote -v
```

### Step 2: Add Second Remote

```bash
# Add your forked repo as a second remote
git remote add fork https://github.com/DrKhaled123/websites.git

# Or if you prefer SSH
git remote add fork git@github.com:DrKhaled123/websites.git
```

### Step 3: Verify Remotes

```bash
git remote -v
# Should show:
# origin    https://github.com/original/repo.git (fetch)
# origin    https://github.com/original/repo.git (push)
# fork      https://github.com/DrKhaled123/websites.git (fetch)
# fork      https://github.com/DrKhaled123/websites.git (push)
```

### Step 4: Push to Both Repos

```bash
# Push to original repo
git push origin main

# Push to forked repo
git push fork main

# Or push to both at once (see script below)
```

---

## 🔧 Option 2: Fork Relationship Setup

### Step 1: Set Up Upstream

```bash
# If origin is your fork, rename it
git remote rename origin fork

# Add original repo as upstream
git remote add origin https://github.com/original/repo.git

# Or vice versa - set your fork as origin
git remote set-url origin https://github.com/DrKhaled123/websites.git
git remote add upstream https://github.com/original/repo.git
```

### Step 2: Sync Workflow

```bash
# Fetch from upstream
git fetch upstream

# Merge upstream changes
git merge upstream/main

# Push to your fork
git push origin main
```

---

## 🤖 Option 3: Automated Sync Script

I'll create a script that automatically pushes to both repos.
