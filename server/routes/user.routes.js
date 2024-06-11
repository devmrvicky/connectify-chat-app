import express from "express";
import { login, logout, signup } from "../controller/user.controller.js";
import { checkUserAuthentication } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", checkUserAuthentication, logout);

export default router;
