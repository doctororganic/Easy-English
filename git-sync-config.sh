#!/bin/bash

# Configuration script to set up dual remote sync
# This will help you sync changes between your current repo and the forked repo

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🔧 Git Dual Remote Setup${NC}"
echo "=============================="

# Check current remotes
echo -e "\n${BLUE}Current remotes:${NC}"
git remote -v

# Check if fork remote already exists
if git remote | grep -q "^fork$"; then
    echo -e "\n${YELLOW}⚠️  Fork remote already exists${NC}"
    read -p "Do you want to update it? (y/n): " UPDATE_CHOICE
    if [ "$UPDATE_CHOICE" = "y" ]; then
        git remote remove fork
    else
        echo -e "${GREEN}✅ Keeping existing fork remote${NC}"
        exit 0
    fi
fi

# Add fork remote
FORK_URL="https://github.com/DrKhaled123/websites.git"
echo -e "\n${BLUE}Adding fork remote: ${FORK_URL}${NC}"
git remote add fork ${FORK_URL}

# Verify
echo -e "\n${GREEN}✅ Setup complete!${NC}"
echo -e "\n${BLUE}Updated remotes:${NC}"
git remote -v

echo -e "\n${BLUE}📝 Usage:${NC}"
echo "  To push to both repos:"
echo "    git push origin main"
echo "    git push fork main"
echo ""
echo "  Or use the sync script:"
echo "    ./sync-repos.sh 'Your commit message'"
