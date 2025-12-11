# ⚡ Quick Start Guide

## 5-Minute Setup (GitHub Codespaces - Recommended)

### Step 1: Open in Codespaces
```
1. Go to: github.com/harsh-raj00/smart-personal-assistant
2. Click: Code → Codespaces → Create codespace on main
3. Wait 2-3 minutes for environment to load
```

### Step 2: Initialize Project
```bash
bash SETUP.sh
cp .env.example .env
```

### Step 3: Edit Environment Variables
```bash
# Edit .env with your MongoDB Atlas connection string
# Get free MongoDB Atlas cluster: https://www.mongodb.com/cloud/atlas
```

### Step 4: Start All Services
```bash
docker compose -f docker/docker-compose.dev.yml up --build
```

### Step 5: Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **ML Service**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

### Step 6: Demo Login
```
Email: demo@example.com
Password: demo123
```

---

## Local Development (Your Machine)

### Prerequisites
- Node.js 20+
- Python 3.11+
- Docker & Docker Compose
- MongoDB Atlas (free tier)

### Installation
```bash
# Clone repository
git clone https://github.com/harsh-raj00/smart-personal-assistant.git
cd smart-personal-assistant

# Run setup script
bash SETUP.sh

# Copy environment template
cp .env.example .env
# Edit .env with your MongoDB URI

# Install dependencies
npm install --prefix frontend
npm install --prefix backend
pip install -r ml/requirements.txt

# Start all services
docker compose -f docker/docker-compose.dev.yml up --build
```

---

## Replit Cloud IDE Setup

1. Go to https://replit.com
2. Click "+ Create" → Import from GitHub
3. Enter: `https://github.com/harsh-raj00/smart-personal-assistant`
4. Click "Import"
5. In Replit shell:
   ```bash
   bash SETUP.sh
   cp .env.example .env
   # Edit .env
   docker compose -f docker/docker-compose.dev.yml up --build
   ```
6. Open "Ports" tab → Forward ports 3000, 5000, 8000

---

## Features Overview

### Finance Dashboard
✅ Real-time expense tracking
✅ Expense category prediction (ML)
✅ Anomaly detection for fraud
✅ 30-day expense forecast
✅ Category breakdowns with charts

### Health Dashboard
✅ Daily health metrics logging
✅ Symptom tracking
✅ Health risk assessment
✅ Personalized recommendations
✅ Health trends visualization

### Admin Dashboard
✅ User management
✅ Analytics & reports
✅ ML model performance monitoring
✅ System health checks

---

## ML Model Training

### In Google Colab (Free GPU)
1. Open `ml/notebooks/finance_training.ipynb` in Colab
2. Mount Google Drive
3. Run all cells
4. Download trained models
5. Upload to `ml/models/finance/` folder

### Locally
```bash
cd ml
python scripts/train_finance.py
python scripts/train_health.py
```

---

## Troubleshooting

### Port already in use
```bash
# Change ports in docker-compose.dev.yml
# Or kill process: lsof -i :3000 (Linux/Mac)
```

### MongoDB connection error
- Check MONGODB_URI in .env
- Ensure IP whitelist includes your address
- Try: mongodb+srv://user:password@cluster.mongodb.net/smartassistant?retryWrites=true&w=majority

### Docker build fails
```bash
docker compose -f docker/docker-compose.dev.yml down
docker compose -f docker/docker-compose.dev.yml up --build --no-cache
```

---

## Deployment to Production

See `DEPLOYMENT.md` for:
- Vercel (Frontend)
- Render (Backend + ML)
- MongoDB Atlas setup
- GitHub Actions CI/CD

---

## Next Steps

1. **Explore the codebase** - Check out frontend/src, backend/src, ml/scripts
2. **Add your data** - Use backend API to create transactions & health logs
3. **Train ML models** - Follow ML training section above
4. **Customize dashboards** - Edit React components in frontend/src/pages
5. **Deploy** - Follow DEPLOYMENT.md

---

## Support

- **Issues**: Open GitHub issues for bugs
- **Docs**: See README.md for detailed documentation
- **API Reference**: Visit http://localhost:5000/api for endpoints

Happy coding! 🚀
