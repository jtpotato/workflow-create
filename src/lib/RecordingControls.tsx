import { useState, useEffect, useRef } from "react";

type RecordingControlsProps = {
  onFinishRecording?: (url: string) => void;
}

const RecordingControls = ({ onFinishRecording = () => {} }: RecordingControlsProps) => {
  const [recording, setRecording] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorderState, setMediaRecorderState] =
    useState<MediaRecorder | null>(null);
  const [videoPreviewURL, setVideoPreviewURL] = useState<string>("");

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
    });

    if (recording) {
      const chunks: Blob[] = [];
      const mediaRecorder = new MediaRecorder(stream!);
      mediaRecorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
      });
      mediaRecorder.start();
      setMediaRecorderState(mediaRecorder);
      console.log("Start recording")

      mediaRecorder.addEventListener("stop", () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoPreviewURL(url);
        onFinishRecording(url);
      });
    } else {
      console.log("not recording");
      mediaRecorderState?.stop();
    }
  }, [recording]);

  return (
    <div>
      <button onClick={() => setRecording(!recording)}>Rec</button>
      <video src={videoPreviewURL} controls hidden />
    </div>
  );
};

export default RecordingControls;
