import mongoose, { Document } from "mongoose";

// ✅ 1. DEFINE TYPE
export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  orderId: string;
  paymentId?: string;
  amount: number;
  status: "created" | "paid" | "failed";
  plan: "monthly" | "yearly";
  createdAt: Date;
}

// ✅ 2. ADD TYPE TO SCHEMA
const PaymentSchema = new mongoose.Schema<IPayment>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  orderId: { type: String, required: true },

  paymentId: String,

  amount: { type: Number, required: true }, // ✅ make required

  status: {
    type: String,
    enum: ["created", "paid", "failed"],
    default: "created",
  },

  plan: {
    type: String,
    enum: ["monthly", "yearly"],
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ 3. ADD TYPE TO MODEL
export default mongoose.model<IPayment>("Payment", PaymentSchema);