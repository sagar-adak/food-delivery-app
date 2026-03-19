import express from 'express';
import {
  createFood,
  updateFood,
  deleteFood,
} from '../controllers/foodController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/foods').post(protect, admin, createFood);

router
  .route('/foods/:id')
  .put(protect, admin, updateFood)
  .delete(protect, admin, deleteFood);

export default router;
