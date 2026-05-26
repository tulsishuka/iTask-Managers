
import { Request, Response } from "express";
import Score from "../models/Score";

// ADD SCORE
export const addScore = async (req: any, res: Response) => {
  try {
    const { value } = req.body;
    const userId = req.user._id;

    if (!value || value < 1 || value > 45) {
      return res.status(400).json({
        success: false,
        message: "Score must be between 1 and 45",
      });
    }

    // daily limit
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const existing = await Score.findOne({
      userId,
      date: { $gte: today, $lt: tomorrow },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Only one score per day allowed",
      });
    }

    const newScore = await Score.create({
      userId,
      value,
      date: new Date(),
    });

    return res.json({
      success: true,
      data: newScore,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error adding score",
    });
  }
};

// GET SCORES
export const getScores = async (req: any, res: Response) => {
  try {
    const scores = await Score.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      data: scores,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching scores",
    });
  }
};