import express from 'express';
import {
  getAllFamilyMembers,
  createFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
  getFamilyMemberById,
} from '../controllers/familyMember.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/', getAllFamilyMembers);
router.post('/', createFamilyMember);
router.get('/:id', getFamilyMemberById);
router.put('/:id', updateFamilyMember);
router.delete('/:id', deleteFamilyMember);

export default router;
