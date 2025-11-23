#!/bin/bash

# Script to sync changes to both repositories
# Usage: ./sync-repos.sh [commit-message]

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Repository remotes
ORIGIN_REMOTE="origin"
FORK_REMOTE="fork"
BRANCH="main"

echo -e "${BLUE}🔄 Repository Sync Script${NC}"
echo "================================"

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Error: Not in a git repository${NC}"
    exit 1
fi

# Check if fork remote exists, if not add it
if ! git remote | grep -q "^${FORK_REMOTE}$"; then
    echo -e "${YELLOW}⚠️  Fork remote not found. Adding...${NC}"
    read -p "Enter fork repository URL: " FORK_URL
    git remote add ${FORK_REMOTE} ${FORK_URL}
    echo -e "${GREEN}✅ Fork remote added${NC}"
fi

# Show current remotes
echo -e "\n${BLUE}Current remotes:${NC}"
git remote -v

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo -e "\n${YELLOW}⚠️  You have uncommitted changes${NC}"
    read -p "Do you want to commit them? (y/n): " COMMIT_CHOICE
    
    if [ "$COMMIT_CHOICE" = "y" ]; then
        if [ -z "$1" ]; then
            read -p "Enter commit message: " COMMIT_MSG
        else
            COMMIT_MSG="$1"
        fi
        
        git add .
        git commit -m "$COMMIT_MSG"
        echo -e "${GREEN}✅ Changes committed${NC}"
    else
        echo -e "${YELLOW}⚠️  Skipping commit. Please commit changes first.${NC}"
        exit 1
    fi
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo -e "\n${BLUE}Current branch: ${CURRENT_BRANCH}${NC}"

# Push to origin
echo -e "\n${BLUE}📤 Pushing to origin (original repo)...${NC}"
if git push ${ORIGIN_REMOTE} ${CURRENT_BRANCH}; then
    echo -e "${GREEN}✅ Successfully pushed to origin${NC}"
else
    echo -e "${RED}❌ Failed to push to origin${NC}"
    exit 1
fi

# Push to fork
echo -e "\n${BLUE}📤 Pushing to fork (DrKhaled123/websites)...${NC}"
if git push ${FORK_REMOTE} ${CURRENT_BRANCH}; then
    echo -e "${GREEN}✅ Successfully pushed to fork${NC}"
else
    echo -e "${RED}❌ Failed to push to fork${NC}"
    echo -e "${YELLOW}⚠️  You may need to set up authentication${NC}"
    exit 1
fi

echo -e "\n${GREEN}🎉 Successfully synced to both repositories!${NC}"
echo -e "${BLUE}Origin:${NC} $(git remote get-url ${ORIGIN_REMOTE})"
echo -e "${BLUE}Fork:${NC} $(git remote get-url ${FORK_REMOTE})"
