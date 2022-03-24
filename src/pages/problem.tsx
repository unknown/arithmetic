import { NextPage } from "next";

const Problem: NextPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-start">
      <div className="basis-1/4" />
      <div className="basis-1/3 flex flex-col sm:w-full md:w-2/3 lg:w-5/12 p-6 bg-slate-200">
        <h1 className="text-3xl font-bold">Arithmetic</h1>
      </div>
    </div>
  );
};

export default Problem;
