import express from "express";
import { checkUserAuthentication } from "../middleware/user.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { fileDownload, uploadFile } from "../controller/file.controller.js";

const router = express.Router();

router.post(
  "/upload",
  checkUserAuthentication,
  upload.single("file"),
  uploadFile
);
router.get("/download", checkUserAuthentication, fileDownload);

export default router;
