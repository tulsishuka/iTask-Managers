
import { Request, Response } from "express";
import Result from "../models/Result";

export const uploadProof = async (
  req: any,
  res: Response
) => {
  try {

    const result = await Result.findById(
      req.params.resultId
    );

    if (!result) {
      return res.status(404).json({
        message: "Result not found",
      });
    }

    result.proofImage = req.file.filename;

    result.verificationStatus = "pending";

    await result.save();

    return res.json({
      success: true,
      message: "Proof uploaded successfully",
      result,
    });

  } catch (error: any) {

    return res.status(500).json({
      error: error.message,
    });

  }
};


export const verifyWinner = async (
  req: any,
  res: Response
) => {

  try {

    const { status } = req.body;

    const result = await Result.findByIdAndUpdate(
      req.params.id,
      {
        verificationStatus: status,
      },
      { new: true }
    );

    return res.json({
      success: true,
      result,
    });

  } catch (error: any) {

    return res.status(500).json({
      error: error.message,
    });

  }

};



export const getMyResults = async (
  req: any,
  res: Response
) => {

  try {

    const results = await Result.find({
      userId: req.user._id,
    })
      .populate("drawId")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      results,
    });

  } catch (error: any) {

    return res.status(500).json({
      error: error.message,
    });

  }

};

export const getAllResults = async (
  req: Request,
  res: Response
) => {

  try {

    const results = await Result.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      results,
    });

  } catch (error: any) {

    return res.status(500).json({
      error: error.message,
    });

  }
};