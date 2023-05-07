"use client";

import { useState } from "react";
import TokenInput from "./TokenInput";
import ChooseModel from "./ChooseModel";
import { HfInference } from "@huggingface/inference";

function Generate() {
  const [token, setToken] = useState<string | null>(null);
  const [model, setModel] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);

  function generateImg() {
    if (token && model && prompt) {
      const hf = new HfInference(token);
      hf.textToImage({ model: model, inputs: prompt })
    }
  }

  return (
    <>
      <div className="bg-black h-screen w-screen text-white">
        <TokenInput updateToken={setToken} />
        <ChooseModel updateModel={setModel} />
        <textarea
          placeholder="Prompt"
          onChange={(event) => setPrompt(event.target.value)}
        ></textarea>
        <button
          onClick={() => {
            generateImg();
          }}
          className="text-button bg-white text-black"
        >
          Generate
        </button>
      </div>
    </>
  );
}

export default Generate;
