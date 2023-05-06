/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Slide } from "./Slide";

type ImgDisplayProps = {
  slides: Slide[];
  onSlideChange: (index: number) => void;
};

export const ImgDisplay = ({ slides, onSlideChange }: ImgDisplayProps) => {
  return (
    <div className="flex flex-row space-x-4">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="flex flex-col items-center"
          onClick={() => onSlideChange(index)}
        >
          <img src={slide.background} alt={`Image ${index}`} className="w-32 outline" />
          <p className="text-neutral-400">{index}</p>
        </div>
      ))}
    </div>
  );
};
