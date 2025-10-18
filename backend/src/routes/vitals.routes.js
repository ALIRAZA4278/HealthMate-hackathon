import express from 'express';
import { getVitals, addVitals, updateVitals, deleteVitals } from '../controllers/vitals.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// GET /api/vitals
router.get('/', getVitals);

// POST /api/vitals
router.post('/', addVitals);

// PUT /api/vitals/:id
router.put('/:id', updateVitals);

// DELETE /api/vitals/:id
router.delete('/:id', deleteVitals);

export default router;
