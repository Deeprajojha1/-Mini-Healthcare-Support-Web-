import { Router } from "express";
import { getLatestContact, submitContact } from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/submit", protect, submitContact);
router.get("/latest", protect, getLatestContact);

export default router;
