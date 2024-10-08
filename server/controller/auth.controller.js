import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateJWTTokenAndSetCookie } from "../utils/generateJWTToken.js";
import { createOtpDoc, verifyOtp } from "./otp.controller.js";
import { verifiedUsers } from "../service/user.service.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// user signup
const signup = async (req, res) => {
  try {
    const {
      fullName,
      username,
      password,
      confirmPassword,
      gender,
      email,
      phone,
    } = req.body;
    // check for empty fields
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }
    // check for password match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: false, message: "Passwords don't match" });
    }
    // check if any user don't exist with this username
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "This username doesn't exits" });
    }

    let cloudinaryRes;
    // if all validation will be checked then create user and set cookie
    if (req.file) {
      const localFilePath = req.file.path;
      if (!localFilePath) {
        return res
          .status(404)
          .json({ status: false, message: "Didn't find file on server" });
      }
      cloudinaryRes = await uploadOnCloudinary(localFilePath);
      // console.log({ cloudinaryRes });
      if (!cloudinaryRes) {
        return res.status(404).json({
          status: false,
          imgUploadStatus: false,
          message: "failed to upload profile image",
        });
      }
      console.log("profile image upload successfully");
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const isUserVerified = verifiedUsers.isUserVerified({ email, phone });
    if (!isUserVerified) {
      return res.status(400).json({
        status: false,
        message: "user is not verified. Please verify otp first.",
      });
    }

    const newUser = new User({
      fullName,
      username,
      password: hashPassword,
      profilePic: cloudinaryRes?.secure_url
        ? cloudinaryRes?.secure_url
        : gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : `https://avatar.iran.liara.run/public/girl?username=${username}`,
      profilePicPublicId: cloudinaryRes?.public_id,
      gender,
      email,
      phone,
    });

    if (!newUser) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid user data" });
    }

    generateJWTTokenAndSetCookie(newUser._id, res);

    await newUser.save();

    res.status(201).json({
      status: true,
      message: "User signup successfully",
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
        gender: newUser.gender,
        email: newUser?.email,
        phone: newUser?.phone,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

// user login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User doesn't exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ status: false, message: "username or password is incorrect" });
    }
    generateJWTTokenAndSetCookie(user._id, res);
    res.status(200).json({
      status: true,
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user?.email,
        phone: user?.phone,
        profilePic: user.profilePic,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

const verifyUser = async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (!email && !phone) {
      return res
        .status(403)
        .json({ status: false, message: "Please provide email or phone" });
    }
    console.log("email ", email);
    // const user = await User.findOne({ $or: [{ email, phone }] });
    const user = await User.findOne({ email });
    console.log("user ", user);
    return user;
  } catch (error) {
    console.log("error from logout controller: ", error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

// user login with otp
const generateOtpForLogin = async (req, res) => {
  try {
    const user = await verifyUser(req, res);
    console.log("from generate otp for login : ", user);
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "User doesn't exit" });
    }
    await createOtpDoc(req, res);
  } catch (error) {
    console.log("error from logout controller: ", error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};
const verifyAndLogin = async (req, res) => {
  try {
    const result = await verifyOtp(req, res);
    if (!result.status) {
      return res.status(400).json({ status: false, message: result.message });
    }
    const user = await verifyUser(req, res);
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "User doesn't exit" });
    }
    generateJWTTokenAndSetCookie(user._id, res);
    res.status(200).json({
      status: true,
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user?.email,
        phone: user?.phone,
        profilePic: user.profilePic,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.log("error from logout controller: ", error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

// user logout
const logout = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User doesn't found" });
    }
    // logout code here
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ status: true, message: "User logout successfully" });
  } catch (error) {
    console.log("error from logout controller: ", error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

export { signup, login, logout, generateOtpForLogin, verifyAndLogin };
