import mongoose from "mongoose";

const prizePoolSchema = new mongoose.Schema({
  totalAmount: {
    type: Number,
    default: 0,
  },

  month: String, 

  rolloverAmount: {
    type: Number,
    default: 0,
  },

  distributed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model("PrizePool", prizePoolSchema);