import type { NextPage } from "next";
import { useEffect, useState } from "react";

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

  interface Problem {
    a: number;
    b: number;
    solution: number;
    operation: "+" | "-" | "*" | "/";
  }

  type ProblemScreen = "Home" | "Problem" | "End";

  const [settings, setSettings] = useState<ArithmeticSettings>({
    seconds: 2,
    additionEnabled: true,
    addendRange1: [2, 100],
    addendRange2: [2, 100],
    subtractionEnabled: true,
    multiplicationEnabled: true,
    factorRange1: [2, 12],
    factorRange2: [2, 100],
    divisionEnabled: true,
  });

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

  const [problem, setProblem] = useState<Problem>(generateProblem());
  const [screen, setScreen] = useState<ProblemScreen>("Home");
  const [correct, setCorrect] = useState(0);
  const [seconds, setSeconds] = useState(settings.seconds);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (screen !== "Problem") {
      return;
    }
    if (seconds <= 0) {
      setScreen("End");
      return;
    }
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [screen, seconds]);

  const onStart = () => {
    setProblem(generateProblem());
    setScreen("Problem");
    setCorrect(0);
    setSeconds(settings.seconds);
  };

  const onCancel = () => {
    setScreen("Home");
  };

  const homeLayout = (
    <>
      <div className="sm:basis-1/6 lg:basis-1/4" />
      <div className="basis-1/3 flex flex-col w-full md:w-2/3 lg:w-5/12 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Arithmetic</h1>
        </div>
        <div className="flex flex-col h-full items-center">
          <div className="py-4" />
          <p className="text-xl">
            Practice your arithmetic skills by solving as many problems as
            possible in a fast-paced drill.
          </p>
          <button
            onClick={onStart}
            className="mt-auto text-xl underline decoration-2"
          >
            Start
          </button>
        </div>
      </div>
    </>
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.currentTarget.value) === problem.solution) {
      setCorrect(correct + 1);
      setProblem(generateProblem());
      setValue("");
    } else {
      setValue(event.currentTarget.value);
    }
  };

  const problemLayout = (
    <>
      <div className="sm:basis-1/6 lg:basis-1/4" />
      <div className="basis-1/3 flex flex-col w-full md:w-2/3 lg:w-5/12 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Seconds: {seconds}</h1>
          <p className="text-2xl">{correct}</p>
        </div>
        <div className="flex flex-col h-full items-center">
          <div className="py-4" />
          <p className="text-xl">
            {problem?.a} {problem?.operation} {problem?.b} =
          </p>
          <div className="py-2" />
          <input
            onChange={handleChange}
            value={value}
            type="text"
            className="h-10 w-36 rounded-lg bg-gray-50 text-xl shadow-inner"
            name="arithmetic-input"
            autoFocus
          />

          <button
            onClick={onCancel}
            className="mt-auto text-xl underline decoration-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );

  const endLayout = (
    <>
      <div className="sm:basis-1/6 lg:basis-1/4" />
      <div className="basis-1/3 flex flex-col w-full md:w-2/3 lg:w-5/12 p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Arithmetic</h1>
        </div>
        <div className="flex flex-col h-full items-center">
          <div className="py-4" />
          <p className="text-xl">Score: {correct}</p>

          <button
            onClick={onStart}
            className="mt-auto text-xl underline decoration-2"
          >
            Try again
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="h-screen flex flex-col items-center justify-start">
      {screen === "Home" && homeLayout}
      {screen === "Problem" && problemLayout}
      {screen === "End" && endLayout}
    </div>
  );
};

export default Home;
