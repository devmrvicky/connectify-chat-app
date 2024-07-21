import imageCompression from "browser-image-compression";

async function compressImg(imgFile) {
  console.log("originalFile instanceof Blob", imgFile instanceof Blob); // true
  console.log(`originalFile size ${imgFile.size / 1024 / 1024} MB`);
  const options = {
    maxSizeMB: 1 / 2,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imgFile, options);
    console.log(
      "compressedFile instanceof Blob",
      compressedFile instanceof Blob
    ); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
    return compressedFile;
  } catch (error) {
    console.log(error);
  }
}

export { compressImg };
