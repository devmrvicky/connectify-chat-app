import express from "express";
import { generateAndSendOtp, verifyOtpAndSendRes } from "../controller/otp.controller.js";
import { generateOtpForLogin } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/generate-otp", generateAndSendOtp);
router.post("/verify-otp", verifyOtpAndSendRes);
router.post("/generate-otp-for-login", generateOtpForLogin);

export default router;
