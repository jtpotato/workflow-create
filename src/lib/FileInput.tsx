"use client";

import { ChangeEvent, useState } from "react";
import { ImgDisplay } from "./ImgDisplay";

type FileInputProps = {
  files: File[];
  onFileInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function FileInput({ files, onFileInputChange }: FileInputProps) {
  return (
    <>
      <input
        type="file"
        multiple
        onChange={onFileInputChange}
        accept="image/*"
      ></input>
    </>
  );
}

export default FileInput;
