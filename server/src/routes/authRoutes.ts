import { Router } from "express";
import { getCurrentUser, login, logout, signup } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getCurrentUser);
router.post("/logout", logout);

export default router;
