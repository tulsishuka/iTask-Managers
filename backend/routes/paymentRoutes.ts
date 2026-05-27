import express from "express";
import { protectedMiddleware as authMiddleware, protectedMiddleware } from "../middlewares/authMiddleware";
import { createOrder, verifyPayment } from "../controllers/paymentController";
const router = express.Router();
router.post("/create-order", authMiddleware, createOrder);
// router.post("/verify", authMiddleware, verifyPayment);
router.post("/verify", protectedMiddleware, verifyPayment);

export default router;