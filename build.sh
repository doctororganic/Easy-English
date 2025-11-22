#!/bin/bash
cd /workspace/english-learning-platform
echo "Starting build process..."
pnpm install --prefer-offline 2>&1 > /tmp/install.out
echo "Install complete, check /tmp/install.out"
pnpm run build 2>&1 > /tmp/build.out
echo "Build complete, check /tmp/build.out"
ls -lh dist/
