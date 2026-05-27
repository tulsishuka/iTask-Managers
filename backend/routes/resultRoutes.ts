// import express from "express";
// import {
//   getAllResults,
//   verifyWinner,
//   rejectWinner,
// } from "../controllers/resultController";

// import { protectedMiddleware } from "../middlewares/authMiddleware";
// import { adminMiddleware } from "../middlewares/adminMiddleware";

// const router = express.Router();

// router.get("/", protectedMiddleware, adminMiddleware, getAllResults);
// router.put("/verify/:resultId", protectedMiddleware, adminMiddleware, verifyWinner);
// router.put("/reject/:resultId", protectedMiddleware, adminMiddleware, rejectWinner);

// export default router;
import express from "express";

import {
  getAllResults,
  getMyResults,
  uploadProof,
  verifyWinner,
} from "../controllers/resultController";

import { protectedMiddleware } from "../middlewares/authMiddleware";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { upload } from "../middlewares/uploadMiddleware";

const router = express.Router();


// USER RESULTS
router.get(
  "/my-results",
  protectedMiddleware,
  getMyResults
);


// ADMIN RESULTS
router.get(
  "/all",
  protectedMiddleware,
  adminMiddleware,
  getAllResults
);


// USER UPLOAD
router.post(
  "/upload-proof/:resultId",
  protectedMiddleware,
  upload.single("image"),
  uploadProof
);


// ADMIN VERIFY
router.put(
  "/verify/:id",
  protectedMiddleware,
  adminMiddleware,
  verifyWinner
);

export default router;