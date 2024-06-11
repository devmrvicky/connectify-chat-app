import express from "express";
import {
  getAllUsers,
  login,
  logout,
  signup,
} from "../controller/user.controller.js";
import { checkUserAuthentication } from "../middleware/user.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", checkUserAuthentication, logout);
router.get("/all-users", checkUserAuthentication, getAllUsers);

export default router;
