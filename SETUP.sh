#!/bin/bash

# Smart Personal Assistant - Complete Setup Script
# This script creates all project files and folders

echo "🚀 Setting up Smart Personal Assistant project..."

# Create directory structure
mkdir -p frontend/src/{components,pages,services,context,charts}
mkdir -p frontend/public
mkdir -p backend/src/{config,models,routes,controllers,services,middleware,utils}
mkdir -p backend/tests
mkdir -p ml/{scripts,notebooks,models/{finance,health}}
mkdir -p docker
mkdir -p .devcontainer
mkdir -p infra/github-actions

echo "✅ Created directory structure"

# The actual code files will be created via individual file uploads
# This script mainly creates the directory tree

echo ""
echo "📋 Directory structure created. Now follow these steps:"
echo ""
echo "1. Copy all code files from the GitHub repo into their respective folders"
echo "2. Run: npm install --prefix frontend"
echo "3. Run: npm install --prefix backend"
echo "4. Run: pip install -r ml/requirements.txt"
echo "5. Copy .env.example to .env and fill in your values"
echo "6. Run: docker compose -f docker/docker-compose.dev.yml up --build"
echo ""
echo "🎉 Setup complete! The app will be available at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000/api"
echo "   ML API:   http://localhost:8000"
