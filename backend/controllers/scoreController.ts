
import { Request, Response } from "express";
import Score from "../models/Score";



export const addScore = async (req: any, res: Response) => {
  try {

    const { value, date } = req.body;

    const userId = req.user._id;

    if (!value || value < 1 || value > 45) {
      return res.status(400).json({
        success: false,
        message: "Score must be between 1 and 45",
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const selectedDate = new Date(date);

    const startDay = new Date(selectedDate);
    startDay.setHours(0, 0, 0, 0);

    const endDay = new Date(selectedDate);
    endDay.setHours(23, 59, 59, 999);

    const existing = await Score.findOne({
      userId,
      date: {
        $gte: startDay,
        $lte: endDay,
      },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Only one score per day allowed",
      });
    }

    // KEEP ONLY LATEST 5 SCORES
    const userScores = await Score.find({ userId }).sort({
      date: 1,
    });

    if (userScores.length >= 5) {
      await Score.findByIdAndDelete(userScores[0]._id);
    }

    const newScore = await Score.create({
      userId,
      value,
      date: selectedDate,
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