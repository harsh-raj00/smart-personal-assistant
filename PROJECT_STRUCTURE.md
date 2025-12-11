# Project Structure - Smart Personal Finance & Health Assistant

## Architecture Overview

This is an **industrial-grade, microservices-based full-stack application** featuring:
- **Frontend**: React with Tailwind CSS + Shadcn/UI for excellent UI/UX
- **Backend**: Node.js + Express API Gateway with microservices architecture
- **ML Services**: Python FastAPI services for AI-powered predictions
- **Database**: MongoDB Atlas for cloud scalability
- **Infrastructure**: Docker, docker-compose, and GitHub Actions CI/CD
- **Deployment**: Cloud-ready for Vercel (frontend), Render/AWS (backend & ML)

## Directory Structure

```
smart-personal-assistant/
├── frontend/                          # React.js web application
├── backend-gateway/                  # Express.js API Gateway (auth, routing, orchestration)
├── services/                         # Microservices
│   ├── finance-service/              # Finance microservice (transactions, budgets, alerts)
│   ├── health-service/               # Health microservice (logs, recommendations)
│   ├── ml-finance/                   # ML service for finance predictions
│   └── ml-health/                    # ML service for health predictions
├── ml/                               # Shared ML utilities & models
│   ├── notebooks/                    # Colab training notebooks
│   ├── scripts/                      # ML training and inference scripts
│   ├── models/                       # Trained model artifacts (.pkl files)
│   └── requirements.txt               # Python dependencies
├── db/                               # Database
│   ├── migrations/                    # SQL/MongoDB migration scripts
│   ├── schemas/                      # Database schema definitions
│   └── seed/                         # Demo data seeds
├── infra/                            # Infrastructure & deployment
│   ├── docker/                       # Docker & docker-compose files
│   │   ├── Dockerfile.frontend        # Frontend Docker image
│   │   ├── Dockerfile.backend         # Backend gateway Docker image
│   │   ├── Dockerfile.finance-service # Finance service Docker image
│   │   ├── Dockerfile.health-service  # Health service Docker image
│   │   ├── Dockerfile.ml-service      # ML services Docker image
│   │   └── docker-compose.yml          # Multi-container orchestration
│   ├── ci-cd/                       # GitHub Actions workflows
│   │   ├── lint-and-test.yml          # Linting and unit tests
│   │   ├── build-and-deploy.yml       # Build and push to registries
│   │   └── security-scan.yml          # Security scanning
│   └── terraform/                  # IaC for AWS/cloud deployment
├── docs/                             # Documentation
│   ├── api/                         # OpenAPI/Swagger specifications
│   ├── deployment/                 # Deployment guides
│   ├── architecture.md              # Architecture decision records
│   └── DEVELOPMENT.md               # Development guide
├── tests/                            # Integration tests
├── .github/                         # GitHub-specific files
├── .env.example                      # Environment variables template
├── docker-compose.yml                # Root docker-compose
├── package.json                      # Root npm scripts
├── README.md                         # Project overview
├── DEPLOYMENT.md                     # Deployment instructions
├── SETUP.sh                          # Quick setup script
├── QUICKSTART.md                     # Quick start guide
├── .gitignore                        # Git ignore rules
└── LICENSE                           # MIT License
```

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for ultra-fast development
- **Styling**: Tailwind CSS + Shadcn/UI (premium components)
- **Charts**: Recharts for interactive data visualization
- **State Management**: TanStack Query + Zustand
- **Auth**: JWT with httpOnly cookies
- **Deployment**: Vercel

### Backend
- **API Gateway**: Node.js + Express.js + TypeScript
- **Auth**: JWT + bcrypt + passport
- **Validation**: Zod + express-validator
- **Logging**: Winston + Morgan
- **Rate Limiting**: express-rate-limit
- **CORS & Security**: helmet, cors
- **Database Client**: MongoDB driver + Mongoose (optional)
- **Deployment**: Render/Heroku/AWS

### Microservices
- **Framework**: Express.js (Node.js) for service APIs
- **Communication**: REST (HTTP) with service registry pattern
- **Configuration**: Environment-based service discovery

### ML Services
- **Framework**: FastAPI (Python)
- **ML Libraries**: scikit-learn, XGBoost, Prophet, NLTK
- **Model Serialization**: joblib/pickle
- **API Documentation**: Auto-generated with Swagger

### Database
- **Primary**: MongoDB Atlas (cloud-hosted, fully managed)
- **Collections**:
  - users: User profiles, auth, preferences
  - transactions: Financial transactions
  - expenses: Expense records with categories
  - budgets: User-defined budgets
  - finance_alerts: Anomaly alerts
  - health_logs: Daily health data
  - health_symptoms: Symptom reports
  - recommendations: AI-generated recommendations
  - audit_logs: System audit trail

### Infrastructure
- **Containerization**: Docker + docker-compose
- **CI/CD**: GitHub Actions
- **Container Registry**: Docker Hub or AWS ECR
- **Monitoring**: (Optional) Datadog/NewRelic
- **Logging**: (Optional) ELK Stack / CloudWatch

## Service Responsibilities

### Backend Gateway
- JWT authentication & authorization
- Route orchestration to microservices
- Request validation & error handling
- Rate limiting & API security
- Admin dashboard endpoints
- User management

### Finance Service
- CRUD for transactions
- Expense categorization
- Budget management
- Alert generation
- Forecast endpoints (calls ML service)
- Anomaly detection alerts

### Health Service
- Health log CRUD
- Symptom tracking
- Recommendation endpoints (calls ML service)
- Risk assessment
- Health metrics aggregation

### ML Finance Service
- Expense classifier (NLP)
- Anomaly detector (Isolation Forest)
- Time-series forecaster (Prophet)
- Real-time inference API

### ML Health Service
- Risk classifier (Random Forest)
- Recommendation engine
- Health metric analysis
- Real-time inference API

## Key Features

### User Features
1. **Authentication**
   - Secure JWT-based login/register
   - Profile management
   - Password reset flow
   - Session management

2. **Finance Dashboard**
   - Real-time expense analytics
   - Interactive charts (pie, line, bar)
   - Budget tracking with alerts
   - Anomaly detection notifications
   - Monthly/yearly forecasts
   - Export to CSV/PDF

3. **Health Dashboard**
   - Daily health metrics input
   - Symptom tracking
   - Risk assessment display
   - AI-powered health recommendations
   - Progress visualization
   - Health reports generation

4. **AI/ML Predictions**
   - Automated expense classification
   - Fraud/anomaly alerts
   - Future expense forecasting
   - Health risk assessment
   - Personalized recommendations

### Admin Features
1. **User Management**
   - View all users
   - User activity logs
   - Manage roles & permissions
   - User statistics

2. **System Monitoring**
   - API performance metrics
   - Error rate monitoring
   - ML model performance
   - Service health status
   - Database statistics

3. **Analytics**
   - User engagement metrics
   - Feature usage analytics
   - Revenue/cost tracking
   - System audit logs

## Development Workflow

### Local Setup
1. Clone repository
2. Run `./SETUP.sh` to initialize directory structure
3. Configure `.env` from `.env.example`
4. Install dependencies: `npm install` (root) + each service
5. Start services: `docker-compose up`

### Cloud IDE (Codespaces/Gitpod/Replit)
1. Open project in cloud IDE
2. Terminal auto-detects Node.js environment
3. Run SETUP.sh and install deps
4. Start dev servers (localhost forwarding handled by IDE)

### ML Model Training
1. Open `ml/notebooks/finance_training.ipynb` in Google Colab
2. Train expense classifier, anomaly detector, forecaster
3. Models auto-save to `/content/models/finance`
4. Download to `ml/models/finance/`
5. Repeat for `ml/notebooks/health_training.ipynb`
6. Commit models to repo (or use external model registry)

## Deployment

### Frontend (Vercel)
```bash
vercel --prod
```

### Backend & Services (Render/Heroku/AWS)
```bash
git push heroku main
# or
docker push <registry>/service-name
```

### Full Stack (Docker Compose)
```bash
docker-compose up -d
```

See `DEPLOYMENT.md` and `docs/deployment/` for detailed instructions.

## Environment Variables

See `.env.example` for complete configuration. Key variables:
- `MONGODB_URI`: Cloud database connection
- `JWT_SECRET`: Signing secret for tokens
- `NODE_ENV`: development/production
- `API_PORT`: Gateway port
- `SERVICE_PORTS`: Individual service ports
- `ML_SERVICE_URL`: ML inference service endpoint

## Testing

- Unit tests: Jest (Node.js), Pytest (Python)
- Integration tests: Supertest (API), pytest (services)
- E2E tests: Playwright (frontend)
- Coverage: >80% target

Run tests:
```bash
npm run test          # All services
npm run test:unit    # Unit only
npm run test:e2e     # E2E only
```

## Security & Best Practices

- All secrets in environment variables (12-factor app)
- HTTPS in production
- CORS properly configured
- Rate limiting on all endpoints
- Input validation on all inputs
- SQL injection prevention (Mongoose schemas)
- XSS protection (React auto-escaping)
- CSRF tokens for state-changing operations
- Regular security audits (npm audit, OWASP scanning)
- Principle of least privilege for service permissions

## Performance Optimizations

- Database indexing on frequently queried fields
- Caching layer (Redis, optional)
- CDN for static assets (Vercel/CloudFront)
- API response compression (gzip)
- Connection pooling for database
- ML model caching in service memory
- Frontend code splitting & lazy loading
- Image optimization & responsive images

## Documentation

- **API Docs**: Swagger UI at `/api/docs`
- **Architecture**: `docs/architecture.md`
- **Deployment**: `docs/deployment/*.md`
- **Development**: `docs/DEVELOPMENT.md`
- **Quick Start**: `QUICKSTART.md`

## Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes and test locally
3. Push to GitHub and create Pull Request
4. CI/CD pipeline runs automated checks
5. Code review required before merge
6. Merge to main triggers deployment

## License

MIT License - See LICENSE file

---

**Status**: Production-Ready Industrial-Grade Application
**UI/UX Level**: Premium (Tailwind CSS + Shadcn/UI)
**Scalability**: Microservices architecture with cloud deployment ready
