import { Router } from "express";
import { submitForm } from "../controllers/formController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/submit", protect, submitForm);

export default router;
