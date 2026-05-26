import mongoose from "mongoose";

const charitySchema = new mongoose.Schema({
  name: String,
  description: String,

  percentage: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

});

export default mongoose.model("Charity", charitySchema); 

