import express from "express";

import { login, signup } from "../controllers/auth.js";
import { getAllUsers, updateProfile } from "../controllers/users.js";
import auth from "../middleware/auth.js";
import { orders, verifyPayment } from "../controllers/Payment.js";
import { subscribe } from "../controllers/Subscriptions.js";
import { generateOtp, verifyOtp } from "../controllers/verification.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post('/authenticate',generateOtp);
router.post('/verifyOtp',verifyOtp);

router.post('/verify',verifyPayment);
router.post('/orders',orders)
router.post('/subscribe/:id',subscribe);

router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", auth, updateProfile);

export default router;
