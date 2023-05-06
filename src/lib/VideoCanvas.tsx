import { useEffect, useRef } from "react";
import { Slide } from "./Slide";

type VideoCanvasProps = {
  slides: Slide[];
  selectedImageIndex: number;
};

function VideoCanvas({ slides, selectedImageIndex }: VideoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    if (!slides[selectedImageIndex]) return;

    const image = new Image();
    image.src = slides[selectedImageIndex].background;
    image.onload = () => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imageAspectRatio = image.width / image.height;
      const canvasAspectRatio = canvasWidth / canvasHeight;

      let renderWidth = canvasWidth;
      let renderHeight = canvasHeight;

      if (imageAspectRatio > canvasAspectRatio) {
        // Image is wider than canvas, so scale to fill
        renderHeight = canvasHeight;
        renderWidth = renderHeight * imageAspectRatio;
      } else {
        // Image is taller than canvas, so scale to fill
        renderWidth = canvasWidth;
        renderHeight = renderWidth / imageAspectRatio;
      }

      context.drawImage(image, 0, 0, renderWidth, renderHeight);
    };
  }, [slides, selectedImageIndex]);

  return (
    <canvas ref={canvasRef} width={1920} height={1080} className="w-1/2" />
  );
}

export default VideoCanvas;
