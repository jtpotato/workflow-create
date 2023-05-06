import { Slide } from "../Slide";

const drawVideo = (slide: Slide, canvas: HTMLCanvasElement, video: HTMLVideoElement) => {
  if (!slide.video) return;
  video.src = slide.video;
};

export default drawVideo;
