import crypto from "crypto";
import razorpay from "../utils/razorpay";
import Payment from "../models/Payment";
import { User } from "../models/userModel";
import PrizePool from "../models/PrizePool";
import CharityDonation from "../models/CharityDonation";

export const createOrder = async (req: any, res: any) => {
  try {

    console.log("RAZORPAY KEY =>", process.env.RAZORPAY_KEY_ID);

    const { amount, plan } = req.body;
    const userId = req.user._id;

console.log("CREATE ORDER USER =>", req.user);
console.log("CREATE ORDER BODY =>", req.body);

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    });
const savedPayment = await Payment.create({
  userId,
  orderId: order.id,
  amount,
  plan,
  status: "created",
});

console.log("SAVED PAYMENT =>", savedPayment);

    return res.json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });

  } catch (err: any) {

    console.log("CREATE ORDER ERROR =>", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const verifyPayment = async (req: any, res: any) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

// const payment = await Payment.findOne({
//   orderId: razorpay_order_id,
//   userId: req.user._id,
// });
const payment = await Payment.findOne({
  orderId: razorpay_order_id,
});

console.log("FOUND PAYMENT =>", payment);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    payment.status = "paid";
    payment.paymentId = razorpay_payment_id;
    await payment.save();

    const user = await User.findById(payment.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const charityPercent = user.donationPercentage || 0;

    const charityAmount = (payment.amount * charityPercent) / 100;
    const prizeAmount = payment.amount * 0.8;
    const systemAmount = payment.amount - charityAmount - prizeAmount;

    const month = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    await PrizePool.findOneAndUpdate(
      { month },
      { $inc: { totalAmount: prizeAmount } },
      { upsert: true }
    );
console.log("Prize pool updated for month:", month, "with amount:", prizeAmount);
    if (charityAmount > 0 && user.selectedCharity) {
      await CharityDonation.create({
        userId: user._id,
        charityId: user.selectedCharity,
        paymentId: razorpay_payment_id,
        amount: charityAmount,
      });
    
    }

    const updatedUser = await User.findByIdAndUpdate(
  user._id,
  {
    subscriptionStatus: "active",
    subscriptionPlan: payment.plan,
    subscriptionStart: new Date(),
    subscriptionEnd: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ),
  },
  { new: true }
);

    // await User.findByIdAndUpdate(user._id, {
    //   subscriptionStatus: "active",
    //   subscriptionPlan: payment.plan,
    //   subscriptionStart: new Date(),
    //   subscriptionEnd: new Date(
    //     Date.now() + 30 * 24 * 60 * 60 * 1000
    //   ),
    // });

  

console.log("User subscription updated for user:", user._id, "plan:", payment.plan);
    // return res.json({
    //   success: true,
    //   message: "Payment successful",
    //   breakdown: {
    //     charityAmount,
    //     prizeAmount,
    //     systemAmount,
    //   },
    // });

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



// export const verifyPayment = async (req: any, res: any) => {

//   try {

//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;

//     const body =
//       `${razorpay_order_id}|${razorpay_payment_id}`;

//     const expectedSignature = crypto
//       .createHmac(
//         "sha256",
//         process.env.RAZORPAY_KEY_SECRET!
//       )
//       .update(body)
//       .digest("hex");

//     // VERIFY SIGNATURE
//     if (
//       expectedSignature !==
//       razorpay_signature
//     ) {

//       return res.status(400).json({
//         success: false,
//         message: "Invalid signature",
//       });
//     }

//     // FIND PAYMENT
//     const payment = await Payment.findOne({
//       orderId: razorpay_order_id,
//     });

//     console.log(
//       "FOUND PAYMENT =>",
//       payment
//     );

//     if (!payment) {

//       return res.status(404).json({
//         success: false,
//         message: "Payment not found",
//       });
//     }

//     // UPDATE PAYMENT
//     payment.status = "paid";

//     payment.paymentId =
//       razorpay_payment_id;

//     await payment.save();

//     // FIND USER
//     const user = await User.findById(
//       payment.userId
//     );

//     if (!user) {

//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const charityPercent =
//       user.donationPercentage || 0;

//     const charityAmount =
//       (payment.amount * charityPercent) / 100;

//     const prizeAmount =
//       payment.amount * 0.8;

//     const systemAmount =
//       payment.amount -
//       charityAmount -
//       prizeAmount;

//     const month = new Date().toLocaleString(
//       "default",
//       {
//         month: "long",
//         year: "numeric",
//       }
//     );

//     // UPDATE PRIZE POOL
//     await PrizePool.findOneAndUpdate(
//       { month },
//       {
//         $inc: {
//           totalAmount: prizeAmount,
//         },
//       },
//       { upsert: true }
//     );

//     console.log(
//       "Prize pool updated"
//     );

//     // SAVE CHARITY DONATION
//     if (
//       charityAmount > 0 &&
//       user.selectedCharity
//     ) {

//       await CharityDonation.create({
//         userId: user._id,
//         charityId: user.selectedCharity,
//         paymentId: razorpay_payment_id,
//         amount: charityAmount,
//       });
//     }

//     // SUBSCRIPTION END DATE
//     const subscriptionEnd =
//       new Date(
//         Date.now() +
//         (
//           payment.plan === "yearly"
//             ? 365
//             : 30
//         ) *
//         24 *
//         60 *
//         60 *
//         1000
//       );

//     // UPDATE USER SUBSCRIPTION
//     const updatedUser =
//       await User.findByIdAndUpdate(
//         user._id,
//         {
//           subscriptionStatus: "active",

//           subscriptionPlan:
//             payment.plan,

//           subscriptionStart:
//             new Date(),

//           subscriptionEnd,
//         },
//         { new: true }
//       );

//     console.log(
//       "UPDATED USER =>",
//       updatedUser
//     );

//     // RETURN UPDATED USER
//     return res.status(200).json({
//       success: true,

//       message:
//         "Payment successful",

//       user: updatedUser,

//       breakdown: {
//         charityAmount,
//         prizeAmount,
//         systemAmount,
//       },
//     });

//   } catch (err: any) {

//     console.log(
//       "VERIFY PAYMENT ERROR =>",
//       err
//     );

//     return res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };