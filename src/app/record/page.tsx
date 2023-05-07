"use client";

import { useEffect, useRef, useState } from "react";
import Video from "./Video";
import RecordingIndicator from "./RecordingIndicator";
import VideoScrollList from "./VideoScrollList";
import Logo from "../Logo";

function Record() {
  const [recording, setRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [videoURLs, setVideoURLs] = useState<string[]>([]);
  const webcamPreview = useRef<HTMLVideoElement>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: {
            ideal: 1920,
          },
          height: {
            ideal: 1080,
          },
        },
        audio: {
          sampleRate: {
            ideal: 48000,
          },
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
          sampleSize: {
            ideal: 32,
          },
        },
      })
      .then((stream) => {
        setStream(stream);
        if (webcamPreview.current) {
          webcamPreview.current.srcObject = stream;
        }
      });

    navigator.mediaDevices.enumerateDevices().then((devices) => {
      setDevices(devices);
    });
  }, []);

  useEffect(() => {
    if (recording) {
      const mediaRecorder = new MediaRecorder(stream!);
      setMediaRecorder(mediaRecorder);
      mediaRecorder.start();
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/mp4" });
        const url = URL.createObjectURL(blob);
        setVideoURLs((prev) => [...prev, url]);
      };
    }
    if (!recording) {
      mediaRecorder?.stop();
    }
  }, [recording]);

  function deleteVideo(url: string) {
    setVideoURLs((prev) => prev.filter((u) => u !== url));
  }

  function saveAll() {
    videoURLs.forEach((url) => {
      const a = document.createElement("a");
      a.href = url;
      a.download = "video.webm";
      a.click();
      a.remove();
    });
  }

  return (
    <>
      <div className="bg-black w-screem h-screen">
        <Logo />
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <div className="flex flex-col items-center">
            <video
              ref={webcamPreview}
              autoPlay
              muted
              className="w-96 rounded-lg"
              style={{
                boxShadow: "0 0 50px 15px #FF43F1",
              }}
            ></video>
            <p className="text-neutral-400 text-sm">Preview</p>
          </div>

          <div className="flex space-x-4 flex-row">
            <button
              onClick={() => setRecording(!recording)}
              className={`w-16 h-16 rounded-full flex justify-center items-center hover:brightness-75 ${
                recording ? "bg-[#FF43F1]" : "bg-white"
              }`}
              style={recording ? {
                boxShadow: "0 0 20px 5px #FF43F1",
              } : {}}
            >
              <span className="material-symbols-outlined">videocam</span>
            </button>

            <button
              onClick={saveAll}
              className="bg-white w-16 h-16 flex justify-center items-center rounded-full"
            >
              <span className="material-symbols-outlined">save</span>
            </button>
            <div className="h-full flex items-center">
              <p className="text-white text-sm">{devices[0]?.label}</p>
            </div>
          </div>
          <VideoScrollList videos={videoURLs} deleteVideo={deleteVideo} />
        </div>
      </div>
    </>
  );
}

export default Record;
