import express from 'express';
import {
  registerUser,
  loginUser,
  loginInfo,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/login', loginInfo);

export default router;
