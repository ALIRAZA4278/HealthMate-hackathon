import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import reportRoutes from './routes/report.routes.js';
import vitalsRoutes from './routes/vitals.routes.js';
import familyMemberRoutes from './routes/familyMember.routes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (run async, don't block)
connectDB().catch(err => console.error('MongoDB connection failed:', err));

// Middleware - CORS with all origins for testing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/vitals', vitalsRoutes);
app.use('/api/family-members', familyMemberRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'HealthMate API Root' });
});

// Simple test endpoint
app.get('/test', (req, res) => {
  res.json({ status: 'OK', message: 'Simple test works!' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'HealthMate API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('ERROR:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start server (only in local development, not on Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 API URL: http://localhost:${PORT}`);
    console.log(`🏥 HealthMate Backend - Sehat ka Smart Dost`);
  });
}

// Export for Vercel serverless
export default app;
