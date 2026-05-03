import express from "express";
import {  selectCharity } from "../controllers/charityController";
import { protectedMiddleware } from "../middlewares/authMiddleware";
import { getCharities } from "../controllers/adminController";

const router = express.Router();

// Public route
router.get("/", getCharities);

// ✅ FIXED: Only auth required
router.post(
  "/select",
  protectedMiddleware,
  selectCharity
);



export default router;