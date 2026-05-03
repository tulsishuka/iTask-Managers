import { Request, Response } from "express";
import crypto from "crypto";
import razorpay from "../utils/razorpay";
import Payment from "../models/Payment";
import { User } from "../models/userModel";
import PrizePool from "../models/PrizePool";
import CharityDonation from "../models/CharityDonation";


export const createOrder = async (req: any, res: any) => {
  try {
    const { amount, plan } = req.body;
    const userId = req.user._id;

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });

    await Payment.create({
      userId,
      orderId: order.id,
      amount,
      plan,
      status: "created",
    });

    res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};






export const verifyPayment = async (req: any, res: any) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // 1. VERIFY SIGNATURE
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // 2. GET PAYMENT
    const payment = await Payment.findOne({
      orderId: razorpay_order_id,
      status: "created",
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // 3. MARK PAID
    payment.status = "paid";
    payment.paymentId = razorpay_payment_id;
    await payment.save();

    // 4. GET USER
    const user = await User.findById(payment.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 5. SPLIT MONEY
    const charityPercent = user.donationPercentage || 0;

    const charityAmount = (payment.amount * charityPercent) / 100;
    const prizeAmount = payment.amount * 0.8;
    const systemAmount = payment.amount - charityAmount - prizeAmount;

    // 6. UPDATE PRIZE POOL
    const month = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    await PrizePool.findOneAndUpdate(
      { month },
      { $inc: { totalAmount: prizeAmount } },
      { upsert: true }
    );

    // 7. CREATE CHARITY ENTRY (FIXED 🔥)
    if (charityAmount > 0 && user.selectedCharity) {
      await CharityDonation.create({
        userId: user._id,
        charityId: user.selectedCharity,
        paymentId: razorpay_payment_id,
        amount: charityAmount,
      });
    }

    // 8. ACTIVATE SUBSCRIPTION
    await User.findByIdAndUpdate(user._id, {
      subscriptionStatus: "active",
      subscriptionPlan: payment.plan,
      subscriptionStart: new Date(),
      subscriptionEnd: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ),
    });

    return res.json({
      success: true,
      message: "Payment successful",
      breakdown: {
        charityAmount,
        prizeAmount,
        systemAmount,
      },
    });

  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};


























// export const createOrder = async (req: any, res: Response) => {
//   try {
//     const { amount, plan } = req.body;

//     const userId = req.user._id;

//     const order = await razorpay.orders.create({
//       amount: amount * 100,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     });

//     await Payment.create({
//       userId,
//       orderId: order.id,
//       amount,
//       plan,
//       status: "created",
//     });

//     return res.json({
//       success: true,
//       order,
//       key: process.env.RAZORPAY_KEY_ID,
//     });

//   } catch (error: any) {
//     return res.status(500).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };


// export const verifyPayment = async (req: Request, res: Response) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;

//     // 1. VERIFY SIGNATURE
//     const body = `${razorpay_order_id}|${razorpay_payment_id}`;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({ message: "Invalid Signature" });
//     }

//     // 2. UPDATE PAYMENT
//     const payment = await Payment.findOneAndUpdate(
//       { orderId: razorpay_order_id },
//       { paymentId: razorpay_payment_id, status: "paid" },
//       { new: true }
//     );

//     if (!payment) {
//       return res.status(404).json({ message: "Payment not found" });
//     }

//     // 3. GET USER
//     const user = await User.findById(payment.userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // 4. SPLIT MONEY
//     const charityPercent = user.donationPercentage || 0;

//     const charityAmount = (payment.amount * charityPercent) / 100;
//     const prizeAmount = payment.amount * 0.8;
//     const systemAmount = payment.amount - charityAmount - prizeAmount;

//     // 5. PRIZE POOL UPDATE
//     await PrizePool.findOneAndUpdate(
//       {
//         month: new Date().toLocaleString("default", {
//           month: "long",
//           year: "numeric",
//         }),
//       },
//       { $inc: { totalAmount: prizeAmount } },
//       { upsert: true }
//     );

//     // 6. CHARITY SAVE
//     if (user.selectedCharity && charityAmount > 0) {
//       await CharityDonation.create({
//         userId: user._id,
//         charityId: user.selectedCharity,
//         paymentId: payment.paymentId,
//         amount: charityAmount,
//       });
//     }

//     return res.json({
//       success: true,
//       message: "Payment processed successfully",
//       breakdown: {
//         charityAmount,
//         prizeAmount,
//         systemAmount,
//       },
//     });

//   } catch (err: any) {
//     return res.status(500).json({ error: err.message });
//   }
// };








//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;

//     const body = `${razorpay_order_id}|${razorpay_payment_id}`;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Signature",
//       });
//     }

//     const payment = await Payment.findOneAndUpdate(
//       { orderId: razorpay_order_id },
//       {
//         paymentId: razorpay_payment_id,
//         status: "paid",
//       },
//       { new: true }
//     );

//     if (!payment) {
//       return res.status(404).json({ message: "Payment not found" });
//     }

//     // ============================
//     // 🏆 ADD THIS BLOCK HERE
//     // ============================

//     const month = new Date().toLocaleString("default", {
//       month: "long",
//       year: "numeric",
//     });

//     let pool = await PrizePool.findOne({ month });

//     if (!pool) {
//       pool = await PrizePool.create({
//         month,
//         totalAmount: 0,
//       });
//     }

//     // Example: 80% goes to prize pool
//     const prizeContribution = payment.amount * 0.8;
  
//     pool.totalAmount += prizeContribution;

//     await pool.save();

//     console.log("💰 Prize Pool Updated:", pool.totalAmount);

//     // ============================
//     // 🔥 ACTIVATE SUBSCRIPTION
//     // ============================

//     await User.findByIdAndUpdate(payment.userId, {
//       subscriptionStatus: "active",
//       subscriptionPlan: payment.plan,
//       subscriptionStart: new Date(),
//       subscriptionEnd: new Date(
//         Date.now() + 30 * 24 * 60 * 60 * 1000
//       ),
//     });

//     return res.json({
//       success: true,
//       message: "Payment Verified, Subscription Activated & Prize Pool Updated",
//     });

//   } catch (err: any) {
//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };