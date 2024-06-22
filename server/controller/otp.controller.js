import { generate } from "otp-generator";
import { User } from "../model/user.model.js";
import { OTP } from "../model/otp.model.js";
import { verifiedUsers } from "../service/user.service.js";
import { handleError } from "../utils/handleError.js";

const createOtpDoc = async (req, res) => {
  try {
    const { email, phone } = req.body;
    let isOtpExit = await OTP.findOne({ $or: [{ email, phone }] });
    if (isOtpExit) {
      return res.status(400).json({
        status: false,
        message:
          "otp has already been sent on our email. Please check your email or try after some time",
      });
    }

    // generate otp
    let otp = generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    isOtpExit = await OTP.findOne({ otp });
    while (isOtpExit) {
      otp = generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      isOtpExit = await OTP.findOne({ otp });
    }
    const otpBody = await OTP.create({
      email,
      phone,
      otp,
    });
    if (!otpBody) {
      return res
        .status(400)
        .json({ status: false, message: "can't generate otp" });
    }
    res
      .status(200)
      .json({ status: true, message: "otp send successfully", otpBody });
  } catch (error) {
    handleError(error, res);
  }
};

const generateAndSendOtp = async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (!email && !phone) {
      return res.status(400).json({
        status: false,
        message: "Either email or phone number must be provided.",
      });
    }
    const user = await User.findOne({ $or: [{ email, phone }] });
    if (user) {
      return res.status(401).json({
        status: false,
        message: "User is already registered",
      });
    }

    await createOtpDoc(req, res);
  } catch (error) {
    handleError(error, res);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, email, phone } = req.body;
    if (otp === "") {
      return res
        .status(403)
        .json({ status: false, message: "You didn't provide otp" });
    }
    if (!email && !phone) {
      return res.status(400).json({
        status: false,
        message: "Either email or phone number must be provided.",
      });
    }
    if (otp.length !== 6) {
      return res
        .status(403)
        .json({ status: false, message: "length of otp must be 6" });
    }
    const otpBody = await OTP.findOne({ $or: [{ email, phone }] });
    if (!otpBody) {
      return res.status(404).json({
        status: false,
        message: "Didn't find otp. Please first send otp!",
      });
    }
    if (otpBody.otp !== otp) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid otp provided" });
    };
    await OTP.deleteOne({ $or: [{ email, phone }] });
  } catch (error) {
    console.log("error from verify otp ", error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

const verifyOtpAndSendRes = async (req, res) => {
  try {
    await verifyOtp(req, res);
    const { email, phone } = req.body;
    verifiedUsers.setUser({ email, phone });
    res.status(200).json({ status: true, message: "otp verify successfully" });
  } catch (error) {
    console.log("error from verify otp ", error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

export { generateAndSendOtp, verifyOtp, verifyOtpAndSendRes, createOtpDoc };
