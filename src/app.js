import express from 'express';
import dotenv from 'dotenv';
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
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();
connectDB();

const app = express();

// Security middleware
app.use(helmet());

// CORS
app.use(cors({
  origin: 'http://localhost:5500', // frontend dev server, adjust as needed
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
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'CorperCompass API is running' });
});

// Error handling middleware (should be last)
app.use(errorHandler);


export default app;
// ... other imports

const app = express();

// Security middleware
app.use(helmet());

// CORS - allow frontend origin
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5500';
app.use(cors({
    origin: frontendUrl,
    credentials: true,
}));

// ... rest of the file
