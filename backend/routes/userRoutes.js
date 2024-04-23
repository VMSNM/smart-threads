import express from 'express';
import { followUnfollowUser, getFollowers, getFollowingUsers, getSuggestedUsers, getUserProfile, loginUser, logoutUser, signupUser, updateUser } from '../controllers/userController.js';
import protectRoute from '../middlewares/protectRoute.js';

const router = express.Router();

router.get('/profile/:query', getUserProfile);
router.get('/suggested', getSuggestedUsers);
router.get('/following', protectRoute, getFollowingUsers);
router.get('/followers', protectRoute, getFollowers);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/logout', protectRoute, logoutUser);
router.post('/follow/:id', protectRoute, followUnfollowUser);
router.post('/update', protectRoute, updateUser);

export default router;