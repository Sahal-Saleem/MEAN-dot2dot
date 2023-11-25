import  express  from "express";
const router = express.Router()
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile } from "../Controllers/userController";
    import { protect } from "../Middlewares/authMiddleware";

router.post('/register',registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser);
router.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile);

export default router;