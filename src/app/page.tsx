"use client";

import Link from "next/link";
import Logo from "./Logo";

function Home() {
  return (
    <>
      <div className="w-screen h-screen bg-black">
        <Logo />
        <div className="flex justify-center items-center flex-row h-full">
          <Link href="/record">
            <div className="rounded-lg bg-neutral-700 text-white bg-[url('/record-bg.jpeg')] bg-cover h-48">
              <div className="backdrop-blur-lg w-full p-4 rounded-t-lg">
                <p className="font-bold">Record</p>
                <p className="text-sm">Quickly record and reject footage.</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
