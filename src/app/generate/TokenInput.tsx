"use client";

import { useEffect, useRef } from "react";

function TokenInput(props: { updateToken: (token: string) => void; }) {
    const tokenInputRef = useRef<HTMLInputElement>(null);

  function onTokenChange(event: React.ChangeEvent<HTMLInputElement>) {
    const token = event.target.value;
    props.updateToken(token)
    localStorage.setItem("HF_TOKEN", token);
  }

  useEffect(() => {
    const token = localStorage.getItem("HF_TOKEN");
    if (token) {
      const input = tokenInputRef.current;
      if (input) {
        input.value = token;
        props.updateToken(token)
        // console.log(token)
      }
    }
  }, [])

  return (
    <>
      <input
      ref={tokenInputRef}
        type="password"
        placeholder="HuggingFace Token 🤗"
        onChange={onTokenChange}
        className="bg-neutral-700"
      />
      <p className="text-xs">The API key is NOT securely stored. It is stored on-device, in localStorage. If you suspect your key has been leaked, please change it.</p>
    </>
  );
}

export default TokenInput;
