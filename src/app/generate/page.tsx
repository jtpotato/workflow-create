"use client";

import { useState } from "react";
import TokenInput from "./TokenInput";
import ChooseModel from "./ChooseModel";

function Generate() {
    const [token, setToken] = useState<string | null>(null);
    const [model, setModel] = useState<string | null>(null);

  return (
    <>
      <div className="bg-black h-screen w-screen text-white">
        <TokenInput updateToken={setToken} />
        <ChooseModel updateModel={setModel} />
        <textarea placeholder="Prompt"></textarea>
      </div>
    </>
  );
}

export default Generate;
