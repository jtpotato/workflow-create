import { useEffect, useRef, useState } from "react";
import { Slide } from "./Slide";

type RecordingControlsProps = {
  slide: Slide;
};

function RecordingControls({ slide }: RecordingControlsProps) {
  const [recording, setRecording] = useState<boolean>(false);

  // Define the constraints for the video stream
  const constraints = {
    audio: true,
    video: true,
  };

  // Define a variable to hold the MediaStream object
  const [mediaStream, setMediaStream] = useState<MediaStream>();

  // Define a variable to hold the MediaRecorder object
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();

  const videoElement = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!slide) {
      setMediaRecorder(undefined);
      return;
    }

    if (recording) {
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        setMediaStream(stream);
        let currentMediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(currentMediaRecorder);

        // Create an array to hold the chunks of recorded video
        const chunks: Blob[] = [];

        currentMediaRecorder.addEventListener("dataavailable", (event) => {
          chunks.push(event.data);
        });

        // Start recording
        currentMediaRecorder.start();

        currentMediaRecorder.addEventListener("stop", () => {
          const recordedBlob = new Blob(chunks, { type: "video/webm" });
          const recordedUrl = URL.createObjectURL(recordedBlob);
          console.log(recordedUrl);

          // Set the video element's source to the recorded URL
          videoElement.current!.src = recordedUrl;
        });
      });
    } else {
      if (mediaRecorder) {
        mediaRecorder?.stop();
        mediaStream?.getTracks().forEach((track) => track.stop());
      }
    }
  }, [recording]);

  return (
    <>
      <button className="bg-gray-400" onClick={() => setRecording(!recording)}>
        Rec
      </button>
      <video ref={videoElement} controls autoPlay />
    </>
  );
}

export default RecordingControls;
