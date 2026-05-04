

import { Response } from "express";
import { AuthRequest } from "../interfaces/authRequest.interface";
import { User } from "../models/userModel";
import Charity from "../models/Charity";


export const selectCharity = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { charityId } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const charity = await Charity.findById(charityId);
    if (!charity) {
      return res.status(404).json({ message: "Charity not found" });
    }

    // ✅ SAVE SELECTION (NO SUBSCRIPTION CHECK)
    user.selectedCharity = charity._id;
    user.donationPercentage = charity.percentage;

    await user.save();

    return res.json({
      success: true,
      message: "Charity selected successfully",
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};









//   try {
//     console.log("🎯 selectCharity HIT");

//     const userId = req.user?._id;
//     const { charityId, percentage } = req.body;

//     console.log("👉 userId:", userId);
//     console.log("👉 body:", req.body);

//     // 🔐 Auth check
//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized",
//       });
//     }

//     // 🧾 Input validation
//     if (!charityId || percentage === undefined) {
//       return res.status(400).json({
//         success: false,
//         message: "charityId and percentage are required",
//       });
//     }

//     // 🔒 Limit percentage
//     if (percentage < 0 || percentage > 50) {
//       return res.status(400).json({
//         success: false,
//         message: "Percentage must be between 0 and 50",
//       });
//     }

//     // ❤️ Check charity exists
//     const charity = await Charity.findById(charityId);

//     if (!charity) {
//       return res.status(404).json({
//         success: false,
//         message: "Charity not found",
//       });
//     }

//     // 👤 Update user (NO subscription logic)
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     user.selectedCharity = charityId;
//     user.donationPercentage = percentage;

//     await user.save();

//     console.log("✅ Charity saved successfully");

//     return res.status(200).json({
//       success: true,
//       message: "Charity selected successfully",
//       data: {
//         charityId,
//         percentage,
//       },
//     });

//   } catch (err) {
//     console.error("❌ Select Charity Error:", err);

//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };