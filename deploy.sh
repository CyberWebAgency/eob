#!/bin/bash

echo "🔨 Building East Ocyon Bio website..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    echo "📦 Adding changes to git..."
    git add .
    
    echo "💾 Committing changes..."
    read -p "Enter commit message (or press Enter for default): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    git commit -m "$commit_msg"
    
    echo "🚀 Pushing to GitHub..."
    git push origin main
    
    echo ""
    echo "🎉 Deployment initiated!"
    echo "📋 Check GitHub Actions for progress: https://github.com/CyberWebAgency/eob/actions"
    echo "🌐 Site will be available at: https://cyberwebagency.github.io/eob/"
    echo ""
    echo "⏱️  It may take a few minutes for changes to appear on the live site."
else
    echo "❌ Build failed! Please fix the errors and try again."
    exit 1
fi 