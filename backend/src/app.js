import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
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

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });


connectDB();

const app = express();

// Security
app.use(helmet());
app.use(cookieParser())
// CORS
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5500';
app.use(cors({
    origin: frontendUrl,
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

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CorperCompass API is running' });
});

// Error handler
app.use(errorHandler);

export default app;
