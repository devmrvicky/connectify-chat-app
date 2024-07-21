import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { compressImg } from "../../utils/compressImg";

const useCamera = () => {
  const [isCameraOpening, setIsCameraOpening] = useState(true);
  const [mediaStream, setMediaStream] = useState(null);
  const [capturedImgData, setCapturedImgData] = useState(null);
  const [shouldFaceUser, setShouldFaceUser] = useState(true);
  const [isFacingModeSupport, setIsFacingModeSupport] = useState(false);

  const openCamera = async () => {
    try {
      setIsCameraOpening(true);
      let constraints = { audio: false, video: true };
      // let shouldFaceUser = true;

      // check whether we can use facingMode
      let supports = navigator.mediaDevices.getSupportedConstraints();
      console.log(supports);
      if (supports["facingMode"] === true) {
        // flipBtn.disabled = false;
        setIsFacingModeSupport(true);
      }
      constraints.video = {
        facingMode: shouldFaceUser ? "user" : "environment",
      };
      const media = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(media);
      setMediaStream(media);
    } catch (error) {
      toast.error(error.message, {
        id: "camera open error",
      });
    } finally {
      setIsCameraOpening(false);
    }
  };

  const switchCamera = async () => {
    closeCamera();
    setShouldFaceUser((prev) => !prev);
    openCamera();
  };

  const closeCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
      setMediaStream(null);
      console.log("camera closed");
    }
  };

  function dataURLtoBlob(dataURL) {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  const captureImg = async ({ canvasRef, videoRef }) => {
    // console.log({ canvasRef, videoRef });
    // return;
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL("image/png");
      try {
        const file = await compressImg(dataURLtoBlob(dataURL));
        console.log(file);
        setCapturedImgData({
          name: Date.now() + ".png",
          src: dataURL,
          size: file.size,
          fileType: "image",
          file,
        });
        closeCamera();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const closeImgPrevWindow = async () => {
    await openCamera();
    setCapturedImgData(null);
  };

  return {
    isCameraOpening,
    mediaStream,
    openCamera,
    closeCamera,
    captureImg,
    capturedImgData,
    closeImgPrevWindow,
    switchCamera,
  };
};

export { useCamera };
