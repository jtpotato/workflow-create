"use client";

import FileInput from "@/lib/FileInput";
import { ImgDisplay } from "@/lib/ImgDisplay";
import RecordingControls from "@/lib/RecordingControls";
import { Slide } from "@/lib/Slide";
import VideoCanvas from "@/lib/VideoCanvas";
import { ChangeEvent, useEffect, useState } from "react";

function Home() {
  const [files, setFiles] = useState<File[]>([]);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [slideIndex, setSlideIndex] = useState<number>(0);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    const newSlides: Slide[] = urls.map((url) => ({ background: url }))
    setSlides([...slides, ...newSlides]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <>
      <FileInput
        files={files}
        onFileInputChange={(event) =>
          setFiles(Array.from(event.target.files || []))
        }
      />
      <ImgDisplay slides={slides} onSlideChange={setSlideIndex} />
      <VideoCanvas slides={slides} selectedImageIndex={slideIndex} />
      <RecordingControls slide={slides[slideIndex]} />
    </>
  );
}

export default Home;
