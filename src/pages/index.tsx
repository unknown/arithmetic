import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-start">
      <div className="basis-1/4" />
      <div className="flex flex-col max-w-xl p-6 bg-slate-200">
        <h1 className="text-3xl font-bold">Arithmetic</h1>
        <div className="py-2" />
        <p className="text-xl">
          Practice your arithmetic skills by solving as many problems as
          possible in a fast-paced drill.
        </p>
        <div className="py-4" />
        <button className="text-xl underline underline-offset-4 decoration-2">
          Start
        </button>
      </div>
    </div>
  );
};

export default Home;
