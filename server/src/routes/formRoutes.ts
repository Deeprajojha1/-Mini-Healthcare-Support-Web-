import { Router } from "express";
import { getLatestForm, submitForm } from "../controllers/formController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/submit", protect, submitForm);
router.get("/latest", protect, getLatestForm);

export default router;
