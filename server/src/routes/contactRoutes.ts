import { Router } from "express";
import { submitContact } from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/submit", protect, submitContact);

export default router;
