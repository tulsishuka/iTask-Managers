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
console.log("AUTH HEADER =>", req.headers.authorization);

    const token = authHeader.split(" ")[1];

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
console.log("TOKEN =>", token);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
    console.log("DECODED =>", decoded);
console.log("AUTH USER =>", user);

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
