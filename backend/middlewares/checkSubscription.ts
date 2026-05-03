import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";

export const checkSubscription = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("🚫 checkSubscription HIT");

    const userId = req.user?._id;
    console.log("👉 userId from req:", userId);

    if (!userId) {
      console.log("❌ No userId in request");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    console.log("👉 User from DB:", user);

    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("👉 subscriptionStatus:", user.subscriptionStatus);
    console.log("👉 subscriptionEnd:", user.subscriptionEnd);
    console.log("👉 current time:", new Date());

    if (
      user.subscriptionStatus !== "active" ||
      (user.subscriptionEnd && user.subscriptionEnd < new Date())
    ) {
      console.log("❌ Subscription check FAILED");

      return res.status(403).json({
        success: false,
        message: "Subscription expired or required",
      });
    }

    console.log("✅ Subscription valid, moving next()");
    next();

  } catch (error) {
    console.log("❌ checkSubscription ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};