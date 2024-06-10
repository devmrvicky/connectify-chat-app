import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { generateJWTTokenAndSetCookie } from "../utils/generateJWTToken.js";

const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    // check for empty fields
    if (!fullName || !username || !password || !confirmPassword || !gender) {
      res
        .status(400)
        .json({ status: false, message: "All fields are required" });
    }
    // check for password match
    if (password !== confirmPassword) {
      res.status(400).json({ status: false, message: "Password don't match" });
    }

    // check if any user don't exist with this username
    const user = await User.findOne({ username });
    if (user) {
      res
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

export { signup };
