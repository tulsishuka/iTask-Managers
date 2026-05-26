
import express from "express";
import { protectedMiddleware } from "../middlewares/authMiddleware";
import { selectCharity, updateDonationPercentage } from "../controllers/charityController";

const router = express.Router();
router.post("/select", protectedMiddleware, selectCharity);

router.put(
  "/update-percentage",
  protectedMiddleware,
  updateDonationPercentage
);

export default router;