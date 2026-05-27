
import mongoose, { Document } from "mongoose";

export interface IResult extends Document {

  userId: mongoose.Types.ObjectId;

  drawId: mongoose.Types.ObjectId;

  matchedNumbers: number;

  rewardType: "jackpot" | "medium" | "small" | "none";

  winnings: number;

  verificationStatus:
    | "not_submitted"
    | "pending"
    | "approved"
    | "rejected";

  paymentStatus:
    | "pending"
    | "paid";

  proofImage: string;

}

const resultSchema = new mongoose.Schema<IResult>(
  {

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    drawId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Draw",
    },

    matchedNumbers: {
      type: Number,
      default: 0,
    },

    rewardType: {
      type: String,
      enum: ["jackpot", "medium", "small", "none"],
      default: "none",
    },

    winnings: {
      type: Number,
      default: 0,
    },

    verificationStatus: {
      type: String,
      enum: [
        "not_submitted",
        "pending",
        "approved",
        "rejected",
      ],
      default: "not_submitted",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },

    proofImage: {
      type: String,
      default: "",
    },

  },

  { timestamps: true }
);

export default mongoose.model<IResult>(
  "Result",
  resultSchema
);