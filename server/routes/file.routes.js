import express from "express";
import { checkUserAuthentication } from "../middleware/user.middleware.js";
import { fileDownload } from "../controller/file.controller.js";

const router = express.Router();

router.get("/download", checkUserAuthentication, fileDownload);

export default router;
