import express from 'express';
import passport from 'passport';
import { registerUser, loginUser, getMe, generateToken } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

// Google OAuth login route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Successful authentication, generate token and redirect to frontend with token
    const token = generateToken(req.user._id);
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  }
);

export default router;
