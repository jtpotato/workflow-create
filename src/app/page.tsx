"use client";

import Link from "next/link";
import Logo from "./Logo";

function Home() {
  return (
    <>
      <div className="w-screen h-screen bg-black">
        <Logo />
        <div className=""></div>
        <Link href="/record">Record</Link>
      </div>
    </>
  );
}

export default Home;
