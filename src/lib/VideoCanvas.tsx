import { useEffect, useRef } from "react";
import { Slide } from "./Slide";
import drawBackground from "./canvas/drawBackground";
import drawVideo from "./canvas/drawVideo";

type VideoCanvasProps = {
  slides: Slide[];
  selectedImageIndex: number;
};

function VideoCanvas({ slides, selectedImageIndex }: VideoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    if (!slides[selectedImageIndex]) return;

    const image = new Image();
    image.src = slides[selectedImageIndex].background;
    image.onload = () => {
      drawBackground(canvas, context, image);
    };

    drawVideo(slides[selectedImageIndex], canvas, videoRef.current!);
  }, [slides, selectedImageIndex]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    // Wait for the video metadata to load
    video.addEventListener("loadedmetadata", () => {
      const imageAspectRatio = video.videoWidth / video.videoHeight;
      // Play the video
      video.play();

      // Draw the video frame onto the canvas every 16ms (60fps)
      setInterval(() => {
        canvas.getContext("2d")?.drawImage(video, 0, 0, 150, 150 / imageAspectRatio);
      }, 16);
    });
  }, []);

  return (
    <>
      <canvas ref={canvasRef} width={1920} height={1080} className="w-1/2" />
      <video ref={videoRef} controls hidden />
    </>
  );
}

export default VideoCanvas;
