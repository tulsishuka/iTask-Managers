
import { Router } from "express";
import { protectedMiddleware } from "../middlewares/authMiddleware";
import { checkSubscription } from "../middlewares/checkSubscription";
import { getDashboard, getMe } from "../controllers/userController";

const router = Router();

// 👤 USER BASIC INFO (FOR SUBSCRIPTION PAGE)
router.get(
  "/me",
  protectedMiddleware,
  getMe
);

// 📊 DASHBOARD DATA
router.get(
  "/dashboard",
  protectedMiddleware,
  checkSubscription,
  getDashboard
);

export default router;