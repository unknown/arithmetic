import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  interface ArithmeticSettings {
    seconds: number;
    additionEnabled: boolean;
    addendRange1: [number, number];
    addendRange2: [number, number];
    subtractionEnabled: boolean;
    multiplicationEnabled: boolean;
    factorRange1: [number, number];
    factorRange2: [number, number];
    divisionEnabled: boolean;
  }

  const [settings, setSettings] = useState<ArithmeticSettings>({
    seconds: 120,
    additionEnabled: true,
    addendRange1: [2, 100],
    addendRange2: [2, 100],
    subtractionEnabled: true,
    multiplicationEnabled: true,
    factorRange1: [2, 12],
    factorRange2: [2, 100],
    divisionEnabled: true,
  });

  interface Problem {
    a: number;
    b: number;
    solution: number;
    operation: "+" | "-" | "*" | "/";
  }

  const [problem, setProblem] = useState<Problem>();

  const generateProblem = (): Problem => {
    let operations: Array<"+" | "-" | "*" | "/"> = [];
    settings.additionEnabled && operations.push("+");
    settings.subtractionEnabled && operations.push("-");
    settings.multiplicationEnabled && operations.push("*");
    settings.divisionEnabled && operations.push("/");

    const operation = operations[Math.floor(Math.random() * operations.length)];
    if (operation === "+" || operation === "-") {
      const num1 =
        Math.floor(Math.random() * settings.addendRange1[1]) +
        settings.addendRange1[0];
      const num2 =
        Math.floor(Math.random() * settings.addendRange1[1]) +
        settings.addendRange1[0];
      return {
        a: operation == "+" ? num1 : num1 + num2,
        b: operation == "+" ? num2 : num1,
        operation: operation,
        solution: operation == "+" ? num1 + num2 : num2,
      };
    } else {
      const num1 =
        Math.floor(Math.random() * settings.factorRange1[1]) +
        settings.factorRange1[0];
      const num2 =
        Math.floor(Math.random() * settings.factorRange2[1]) +
        settings.factorRange2[0];
      return {
        a: operation == "*" ? num1 : num1 * num2,
        b: operation == "*" ? num2 : num1,
        operation: operation,
        solution: operation == "*" ? num1 * num2 : num2,
      };
    }
  };

  const onStart = () => {
    setProblem(generateProblem());
  };

  return (
    <div className="h-screen flex flex-col items-center justify-start">
      <div className="basis-1/4" />
      <div className="basis-1/3 flex flex-col max-w-xl p-6 bg-slate-200">
        <h1 className="text-3xl font-bold">Arithmetic</h1>
        <div className="py-2" />
        <p className="text-xl">
          Practice your arithmetic skills by solving as many problems as
          possible in a fast-paced drill.
        </p>

        <p>
          {problem && problem.a} {problem && problem.operation}{" "}
          {problem && problem.b} = {problem && problem.solution}
        </p>
        <button
          onClick={onStart}
          className="mt-auto text-xl underline underline-offset-4 decoration-2"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Home;
