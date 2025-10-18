import express from 'express';
import { uploadReport, getReports, getReportById, deleteReport } from '../controllers/report.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// POST /api/reports/upload
router.post('/upload', upload.single('file'), uploadReport);

// GET /api/reports
router.get('/', getReports);

// GET /api/reports/:id
router.get('/:id', getReportById);

// DELETE /api/reports/:id
router.delete('/:id', deleteReport);

export default router;
