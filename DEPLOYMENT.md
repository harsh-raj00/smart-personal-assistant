# 🚀 Deployment Guide

## Production Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Go to vercel.com → Import project
3. Set env var: `VITE_API_URL=https://your-backend.render.com/api`
4. Deploy automatically on push

### Backend (Render)
1. Create new Web Service on render.com
2. Connect GitHub repo
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables:
   - MONGODB_URI
   - JWT_SECRET
   - ML_SERVICE_URL
   - LOG_LEVEL
6. Deploy

### ML Service (Render)
1. Create new Web Service
2. Set start command: `cd ml && python -m uvicorn scripts.api:app --host 0.0.0.0 --port 8000`
3. Upload pre-trained models to ml/models/
4. Deploy
5. Update backend's ML_SERVICE_URL environment variable

### MongoDB Atlas
1. Create cluster at mongodb.com
2. Create database user
3. Whitelist all IPs (0.0.0.0)
4. Copy connection string
5. Set as MONGODB_URI in backend

## Local Development with Docker

```bash
docker compose -f docker/docker-compose.dev.yml up --build
```

## GitHub Codespaces (Recommended)

```bash
# Codespaces terminal
cp .env.example .env
# Edit .env with your MongoDB URI
docker compose -f docker/docker-compose.dev.yml up --build
```

## Database Migrations

Seeding demo data:
```bash
cd backend
npm run seed
```

## ML Model Training

Train in Google Colab:
1. Upload `ml/notebooks/finance_training.ipynb` to Colab
2. Mount Google Drive
3. Run all cells
4. Download trained models
5. Upload to ml/models/ folder

OR train locally:
```bash
cd ml
python scripts/train_finance.py
python scripts/train_health.py
```
