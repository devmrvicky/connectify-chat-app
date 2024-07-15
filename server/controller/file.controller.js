// import axios from "axios";
// import pkg from "fs-extra";
// import { basename, join, dirname } from "path";
// import { fileURLToPath } from "url";

// const { ensureDir, createWriteStream } = pkg;

// // Manually define __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Route to handle file download
// const fileDownload = async (req, res) => {
//   // File URL to download
//   const fileUrl = req.query.url;
//   console.log({ fileUrl });
//   // Extract file name from URL
//   const fileName = basename(fileUrl);

//   // Define the download folder path
//   const downloadFolder = join(
//     "'C:\\Users\\Vikash Kumar\\OneDrive\\download\\",
//     "connectify"
//   );
//   console.log({ downloadFolder });
//   try {
//     // Ensure the download folder exists
//     await ensureDir(downloadFolder);

//     // Define the full file path
//     const filePath = join(downloadFolder, fileName);

//     // Download the file
//     const response = await axios({
//       url: fileUrl,
//       method: "GET",
//       responseType: "stream",
//     });

//     // Set headers to prompt download
//     res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
//     res.setHeader("Content-Type", response.headers["content-type"]);

//     // Create a write stream to save the file
//     const writer = createWriteStream(filePath);

//     // Pipe the response data to the file
//     response.data.pipe(writer);

//     // Handle stream events
//     writer.on("finish", () => {
//       return res
//         .status(200)
//         .json({ status: true, message: "File downloaded successfully" });
//     });

//     writer.on("error", (error) => {
//       console.error("Error writing the file:", error);
//       return res
//         .status(500)
//         .json({ status: false, message: "Internal server error" });
//     });
//   } catch (error) {
//     console.error("Error downloading the file:", error);
//     res.status(500).json({ status: false, message: "Internal server error" });
//   }
// };

// export { fileDownload };

import axios from "axios";
import { basename, extname } from "path";

// Route to handle file download
const fileDownload = async (req, res) => {
  // File URL to download
  const fileUrl = req.query.url;
  console.log({ fileUrl });

  if (!fileUrl) {
    return res
      .status(400)
      .json({ status: false, message: "File URL is required" });
  }

  try {
    // Fetch the file from the URL
    const response = await axios({
      url: fileUrl,
      method: "GET",
      responseType: "stream",
    });

    // Extract file name from URL
    const fileName = basename(fileUrl);

    // Set headers to prompt download
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.setHeader("Content-Type", response.headers["content-type"]);

    // Pipe the response data to the client
    response.data.pipe(res).on("error", (err) => {
      console.error("Error piping the response:", err);
      res.status(500).json({ status: false, message: "Internal server error" });
    });
  } catch (error) {
    console.error("Error downloading the file:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export { fileDownload };
