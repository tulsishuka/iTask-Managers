// // import { Request, Response, NextFunction } from "express";
// // import jwt from "jsonwebtoken";
// // import { User } from "../models/userModel";

// // interface AuthRequest extends Request {
// //   user?: any;
// // }

// // export const protectedMiddleware = async (
// //   req: AuthRequest,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   try {
// //     console.log("🔐 Protected middleware HIT");

// //     const authHeader = req.headers.authorization;
// //     console.log("👉 Auth Header:", authHeader);

// //     if (!authHeader || !authHeader.startsWith("Bearer ")) {
// //       console.log("❌ No token or wrong format");
// //       return res.status(401).json({ message: "No token" });
// //     }

// //     const token = authHeader.split(" ")[1];
// //     console.log("👉 Token:", token);

// //     const decoded: any = jwt.verify(
// //       token,
// //       process.env.JWT_SECRET as string
// //     );

// //     console.log("👉 Decoded:", decoded);

// //     const user = await User.findById(decoded.id).select("-password");
// //     console.log("👉 User from DB:", user);

// //     if (!user) {
// //       console.log("❌ User not found in DB");
// //       return res.status(401).json({ message: "User not found" });
// //     }

// //     req.user = user;

// //     console.log("✅ Auth success, moving to next()");
// //     next();

// //   } catch (err: any) {
// //     console.log("❌ JWT ERROR:", err.message);
// //     return res.status(401).json({ message: "Invalid token" });
// //   }
// // };




// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { User } from "../models/userModel";

// export const protectedMiddleware = async (
//   req: any,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     console.log("🔐 AUTH MIDDLEWARE HIT");

//     const authHeader = req.headers.authorization;
//     console.log("HEADER:", authHeader);

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded: any = jwt.verify(
//       token,
//       process.env.JWT_SECRET as string
//     );

//     console.log("DECODED:", decoded);

//     const user = await User.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     req.user = user;

//     next();

//   } catch (err: any) {
//     console.log("❌ AUTH ERROR:", err.message);

//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };








import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel";

interface AuthRequest extends Request {
  user?: any;
}

export const protectedMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // ✅ FIXED PART (IMPORTANT)
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};