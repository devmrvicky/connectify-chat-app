import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateJWTTokenAndSetCookie } from "../utils/generateJWTToken.js";

// user signup
const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
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
        .json({ status: false, message: "Password don't match" });
    }

    // check if any user don't exist with this username
    const user = await User.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ status: false, message: "This username doesn't exits" });
    }

    // if all validation will be checked then create user and set cookie

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      password: hashPassword,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
      gender,
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
        profilePic: user.profilePic,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.log(error.message);
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
    res
      .status(200)
      .json({ status: false, message: "User logout successfully" });
  } catch (error) {
    console.log("error from logout controller: ", error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

// get all users for sidebar
const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    res.status(200).json({ status: false, message: "get all users", users });
  } catch (error) {
    console.log("error from getAllUsers controller ", error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

export { signup, login, logout, getAllUsers };
