import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { json, urlencoded } from 'express';

// Types
interface AuthRequest extends Request {
  userId?: string;
  userRole?: 'user' | 'admin';
}

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Initialize Express app
const app: Express = express();
const PORT = process.env.API_PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// ===== SECURITY MIDDLEWARE =====

// Helmet for secure HTTP headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  noSniff: true,
  xssFilter: true,
}));

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// ===== REQUEST PARSING =====
app.use(json({ limit: '10mb' }));
app.use(urlencoded({ limit: '10mb', extended: true }));

// ===== LOGGING =====
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ===== REQUEST ID MIDDLEWARE =====
app.use((req: AuthRequest, res: Response, next: NextFunction) => {
  req.id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  res.setHeader('X-Request-Id', req.id);
  next();
});

// ===== JWT AUTHENTICATION MIDDLEWARE =====
const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'No authentication token provided',
    } as ApiResponse);
  }

  try {
    // TODO: Verify JWT token using jsonwebtoken library
    // const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    // req.userId = decoded.userId;
    // req.userRole = decoded.role;
    
    // Mock verification for now
    req.userId = 'user-id';
    req.userRole = 'user';
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Invalid token',
    } as ApiResponse);
  }
};

// ===== ERROR HANDLING MIDDLEWARE =====
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  
  res.status(500).json({
    success: false,
    error: NODE_ENV === 'development' ? err.message : 'Internal Server Error',
    message: NODE_ENV === 'development' ? err.stack : undefined,
  } as ApiResponse);
};

// ===== ROUTE HANDLERS =====

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: NODE_ENV,
    },
  } as ApiResponse);
});

// API version endpoint
app.get('/api/v1/version', (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      version: '1.0.0',
      name: 'Smart Personal Finance & Health Assistant API',
      timestamp: new Date().toISOString(),
    },
  } as ApiResponse);
});

// ===== AUTH ROUTES =====
app.post('/api/v1/auth/register', (req: AuthRequest, res: Response) => {
  const { email, password, name } = req.body;
  
  // Validation
  if (!email || !password || !name) {
    return res.status(400).json({
      success: false,
      error: 'Email, password, and name are required',
    } as ApiResponse);
  }

  // TODO: Hash password with bcrypt
  // TODO: Store user in MongoDB
  // TODO: Return JWT token

  res.status(201).json({
    success: true,
    data: {
      userId: 'new-user-id',
      email,
      name,
      token: 'jwt-token-here',
      message: 'User registered successfully',
    },
  } as ApiResponse);
});

app.post('/api/v1/auth/login', (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password are required',
    } as ApiResponse);
  }

  // TODO: Verify password with bcrypt
  // TODO: Generate JWT token

  res.json({
    success: true,
    data: {
      userId: 'user-id',
      email,
      token: 'jwt-token-here',
      user: {
        id: 'user-id',
        email,
        name: 'User Name',
        role: 'user',
      },
    },
  } as ApiResponse);
});

// ===== FINANCE SERVICE ROUTES =====
app.get('/api/v1/finance/transactions', verifyToken, (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      transactions: [
        {
          id: 'txn-1',
          amount: 50.00,
          category: 'groceries',
          date: new Date().toISOString(),
          description: 'Weekly groceries',
        },
      ],
      total: 1,
    },
  } as ApiResponse);
});

app.post('/api/v1/finance/transactions', verifyToken, (req: AuthRequest, res: Response) => {
  const { amount, category, description } = req.body;
  
  if (!amount || !category) {
    return res.status(400).json({
      success: false,
      error: 'Amount and category are required',
    } as ApiResponse);
  }

  res.status(201).json({
    success: true,
    data: {
      id: 'new-txn-id',
      amount,
      category,
      description,
      date: new Date().toISOString(),
    },
  } as ApiResponse);
});

app.get('/api/v1/finance/analytics', verifyToken, (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      totalExpenses: 1250.50,
      monthlyAverage: 312.63,
      topCategories: [
        { category: 'groceries', amount: 450.00, percentage: 36 },
        { category: 'utilities', amount: 300.00, percentage: 24 },
        { category: 'entertainment', amount: 200.00, percentage: 16 },
      ],
      recentTransactions: 10,
    },
  } as ApiResponse);
});

// ===== HEALTH SERVICE ROUTES =====
app.get('/api/v1/health/logs', verifyToken, (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      logs: [
        {
          id: 'health-log-1',
          date: new Date().toISOString(),
          weight: 75,
          bloodPressure: '120/80',
          steps: 8500,
          sleepHours: 7,
        },
      ],
      total: 1,
    },
  } as ApiResponse);
});

app.post('/api/v1/health/logs', verifyToken, (req: AuthRequest, res: Response) => {
  const { weight, bloodPressure, steps, sleepHours } = req.body;
  
  if (!weight) {
    return res.status(400).json({
      success: false,
      error: 'Weight is required',
    } as ApiResponse);
  }

  res.status(201).json({
    success: true,
    data: {
      id: 'new-health-log-id',
      weight,
      bloodPressure,
      steps,
      sleepHours,
      date: new Date().toISOString(),
    },
  } as ApiResponse);
});

app.get('/api/v1/health/assessment', verifyToken, (req: AuthRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      riskLevel: 'low',
      recommendations: [
        'Maintain current exercise routine',
        'Increase water intake',
        'Monitor sleep patterns',
      ],
      healthScore: 85,
      lastUpdated: new Date().toISOString(),
    },
  } as ApiResponse);
});

// ===== ML INFERENCE ROUTES =====
app.post('/api/v1/ml/finance/classify-expense', verifyToken, (req: AuthRequest, res: Response) => {
  const { description, amount } = req.body;
  
  if (!description) {
    return res.status(400).json({
      success: false,
      error: 'Description is required',
    } as ApiResponse);
  }

  res.json({
    success: true,
    data: {
      description,
      amount,
      predictedCategory: 'groceries',
      confidence: 0.95,
    },
  } as ApiResponse);
});

app.post('/api/v1/ml/health/assess-risk', verifyToken, (req: AuthRequest, res: Response) => {
  const { weight, bloodPressure, steps, sleepHours } = req.body;
  
  res.json({
    success: true,
    data: {
      riskLevel: 'low',
      riskScore: 15,
      recommendations: [
        'Continue current health routine',
        'Increase daily steps to 10000',
      ],
    },
  } as ApiResponse);
});

// ===== 404 HANDLER =====
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.path} not found`,
  } as ApiResponse);
});

// ===== ERROR MIDDLEWARE =====
app.use(errorHandler);

// ===== SERVER STARTUP =====
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`
${'='.repeat(50)}`);
    console.log(`Backend Gateway API Server`);
    console.log(`${'='.repeat(50)}`);
    console.log(`Port: ${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
    console.log(`Health Check: http://localhost:${PORT}/health`);
    console.log(`API Docs: http://localhost:${PORT}/api/v1/version`);
    console.log(`${'='.repeat(50)}\n`);
  });
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

// Start server
startServer();

export default app;
