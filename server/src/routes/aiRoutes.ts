import { Router } from "express";
import { getAdvice } from "../controllers/aiController.js";

const router = Router();

router.post("/advice", getAdvice);

export default router;
