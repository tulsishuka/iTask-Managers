
import { Response, Request } from "express";
import { User } from "../models/userModel";
import Score from "../models/Score";
import Payment from "../models/Payment";
import Result from "../models/Result";
import Draw from "../models/Draw";
export const getDashboard = async (req: any, res: Response) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate("selectedCharity", "name")
      .lean();

    const scores = await Score.find({ userId }).sort({
      createdAt: -1,
    });

    const totalScore = scores.reduce(
      (sum, s) => sum + (s.value || 0),
      0
    );

    const averageScore =
      scores.length > 0 ? totalScore / scores.length : 0;

    const highestScore =
      scores.length > 0 ? Math.max(...scores.map((s) => s.value)) : 0;

    return res.json({
      success: true,
      data: {
        subscriptionStatus: user?.subscriptionStatus || "inactive",
        subscriptionEnd: user?.subscriptionEnd || null,
        charity: (user?.selectedCharity as any)?.name || "Not Selected",
        contribution: user?.donationPercentage || 0,

        scores,

        totalScore,
        averageScore,
        highestScore,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Dashboard error",
    });
  }
};

export const getMe = async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      user,
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};