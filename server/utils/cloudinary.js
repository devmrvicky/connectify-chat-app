import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload file
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file has been uploaded successful
    console.log("file uploaded on cloudinary successfully ", response);
    // if file successfully upload on cloudinary then remove file from the server that is exist in ./public/temp folder
    // fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // fs.unlinkSync(localFilePath);
    console.log(error.message);
    return null;
  } finally {
    fs.unlinkSync(localFilePath);
  }
};

const deleteAssetFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    const res = await cloudinary.uploader.destroy(publicId);
    return res;
  } catch (error) {
    throw new Error(error.message);
  }
  // .then(result => console.log(result));
};

export { uploadOnCloudinary, deleteAssetFromCloudinary };
