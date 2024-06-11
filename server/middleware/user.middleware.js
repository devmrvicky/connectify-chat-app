import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const checkUserAuthentication = async (req, res, next) => {
  try {
    const { jwt: jwtToken } = req.cookies;
    if (!jwtToken) {
      return res
        .status(400)
        .json({ status: false, message: "user unauthorized" });
    }
    const { userId } = jwt.decode(jwtToken);
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: "User doesn't found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: false, message: error.message });
  }
};

export { checkUserAuthentication };
