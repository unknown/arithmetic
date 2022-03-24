import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import EndPanel from "../components/EndPanel";
import HomePanel from "../components/HomePanel";
import ProblemPanel from "../components/ProblemPanel";

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

export interface Problem {
  a: number;
  b: number;
  solution: number;
  operation: "+" | "-" | "*" | "/";
}

type ProblemScreen = "Home" | "Problem" | "End";

const Home: NextPage = () => {
  const [settings, setSettings] = useState<ArithmeticSettings>({
    seconds: 60,
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
  const [score, setScore] = useState(0);
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
    setScore(0);
    setSeconds(settings.seconds);
  };

  const onCancel = () => {
    setScreen("Home");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.currentTarget.value) === problem.solution) {
      setScore(score + 1);
      setProblem(generateProblem());
      setValue("");
    } else {
      setValue(event.currentTarget.value);
    }
  };

  return (
    <div>
      <Head>
        <title>Arithmetic</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="A fast-paced arithmetic drill." />
      </Head>
      {screen === "Home" && <HomePanel onStart={onStart} />}
      {screen === "Problem" && (
        <ProblemPanel
          onCancel={onCancel}
          handleChange={handleChange}
          seconds={seconds}
          score={score}
          problem={problem}
          value={value}
        />
      )}
      {screen === "End" && <EndPanel onStart={onStart} score={score} />}
    </div>
  );
};

export default Home;
