import { useEffect, useState } from "react";

const useRecording = () => {
  const [recordingStarted, setRecordingStarted] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [file, setFile] = useState(null);
  const [recordingTime, setRecordingTime] = useState({
    minutes: 0,
    seconds: 0,
  });

  const createRecordingUrl = (chunks) => {
    console.log(chunks);
    const blob = new Blob(chunks, { type: "audio/webm;codecs=opus" });
    setFile(blob);
    console.log(blob);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      const url = reader.result;
      // console.log(url);
      setAudioUrl(url);
    };
  };

  useEffect(() => {
    const MAX_RECORDER_TIME = 5;
    let recordingInterval = null;

    if (recordingStarted)
      recordingInterval = setInterval(() => {
        setRecordingTime((prevState) => {
          if (
            prevState.minutes === MAX_RECORDER_TIME &&
            prevState.seconds === 0
          ) {
            clearInterval(recordingInterval);
            return prevState;
          }

          if (prevState.seconds >= 0 && prevState.seconds < 59)
            return {
              ...prevState,
              seconds: prevState.seconds + 1,
            };

          if (prevState.seconds === 59)
            return {
              minutes: prevState.minutes + 1,
              seconds: 0,
            };
        });
      }, 1000);
    else clearInterval(recordingInterval);

    return () => clearInterval(recordingInterval);
  });

  useEffect(() => {
    const chunks = [];
    if (mediaRecorder && mediaRecorder.state === "inactive") {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      setRecordingStarted(true);

      mediaRecorder.ondataavailable = (e) => {
        // console.log(e.data);
        chunks.push(e.data);
        console.log("data available");
      };

      mediaRecorder.onstop = (e) => {
        createRecordingUrl(chunks);
        console.log("recording stopped");
        setRecordingStarted(false);
      };

      mediaRecorder.onpause = async (e) => {
        await mediaRecorder.requestData();
        mediaRecorder.ondataavailable = (e) => {
          // console.log(e.data);
          chunks.push(e.data);
          console.log("data available");
          createRecordingUrl(chunks);
          console.log("recording paused");
        };
      };

      mediaRecorder.onresume = () => {
        console.log("recording resume");
      };

      mediaRecorder.onerror = (err) => {
        console.log(err);
      };
    }
    return () => {
      if (mediaRecorder)
        mediaRecorder.stream.getAudioTracks().forEach((track) => track.stop());
    };
  }, [mediaRecorder]);

  useEffect(() => {
    (async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(mediaStream);
        // recorder.onpause
        setMediaRecorder(recorder);
      } catch (error) {
        console.error(error.message);
      }
    })();
  }, []);

  return { mediaRecorder, audioUrl, file, recordingTime };
};

export { useRecording };
