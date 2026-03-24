import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });
import cors from 'cors';
import helmet from 'helmet';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import areaRoutes from './routes/areaRoutes.js';
import lodgeRoutes from './routes/lodgeRoutes.js';
import checklistRoutes from './routes/checklistRoutes.js';
import cultureRoutes from './routes/cultureRoutes.js';
import budgetRoutes from './routes/budgetRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import negotiationRoutes from './routes/negotiationRoutes.js';
import mapRoutes from './routes/mapRoutes.js';          // NEW
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser'
import { generalLimiter } from './middleware/rateLimitMiddleware.js';



connectDB();

const app = express();
app.set('trust proxy', 1);
// Security
app.use(helmet());
app.use(cookieParser())
// Rate Limiting
app.use(generalLimiter)
// CORS
const allowedOrigins = [
    process.env.FRONTEND_URL || 'http://localhost:5500',
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'https://corper-compass-frontend.vercel.app'
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed'));
        }
    },
    credentials: true,
}));

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/areas', areaRoutes);
app.use('/api/lodges', lodgeRoutes);
app.use('/api/checklist', checklistRoutes);
app.use('/api/culture', cultureRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/negotiations', negotiationRoutes);
app.use('/api/map', mapRoutes);                         // NEW
app.use('/api/admin', adminRoutes);

app.get('/api', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'CorperCompass API is running',
    version: '1.0.0'
  });
});


// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CorperCompass API is running' });
});

// Error handler
app.use(errorHandler);

export default app;
