import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import EndPanel from "@/components/EndPanel";
import HomePanel from "@/components/HomePanel";
import ProblemPanel from "@/components/ProblemPanel";

export interface Problem {
  num1: number;
  num2: number;
  solution: number;
  operation: "+" | "-" | "*" | "/";
}

type ProblemScreen = "Home" | "Problem" | "End";

const Home: NextPage = () => {
  const [settings, setSettings] = useState({
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

  const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const generateProblem = (): Problem => {
    let operations: Array<"+" | "-" | "*" | "/"> = [];
    settings.additionEnabled && operations.push("+");
    settings.subtractionEnabled && operations.push("-");
    settings.multiplicationEnabled && operations.push("*");
    settings.divisionEnabled && operations.push("/");

    const operation = operations[Math.floor(Math.random() * operations.length)];
    if (operation === "+" || operation === "-") {
      const a = randomNumber(
        settings.addendRange1[0],
        settings.addendRange1[1]
      );
      const b = randomNumber(
        settings.addendRange2[0],
        settings.addendRange2[1]
      );
      return {
        num1: operation == "+" ? a : a + b,
        num2: operation == "+" ? b : a,
        operation: operation,
        solution: operation == "+" ? a + b : b,
      };
    } else {
      const a = randomNumber(
        settings.factorRange1[0],
        settings.factorRange1[1]
      );
      const b = randomNumber(
        settings.factorRange2[0],
        settings.factorRange2[1]
      );
      return {
        num1: operation == "*" ? a : a * b,
        num2: operation == "*" ? b : a,
        operation: operation,
        solution: operation == "*" ? a * b : b,
      };
    }
  };

  const [problem, setProblem] = useState<Problem>(generateProblem());
  const [screen, setScreen] = useState<ProblemScreen>("Home");
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(settings.seconds);
  const [value, setValue] = useState("");
  const lastSolvedTime = useRef(new Date());

  useEffect(() => {
    if (screen !== "Problem") {
      return;
    }
    if (seconds <= 0) {
      setScreen("End");

      const body = { score };
      fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

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
    setValue("");
    setScore(0);
    setSeconds(settings.seconds);
    lastSolvedTime.current = new Date();
  };

  const onCancel = () => {
    setScreen("Home");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.currentTarget.value) === problem.solution) {
      const currentTime = new Date();
      const elapsedTime =
        (currentTime.getTime() - lastSolvedTime.current.getTime()) / 1000;
      setScore(score + 1);
      setProblem(generateProblem());
      setValue("");
      lastSolvedTime.current = currentTime;

      const body = {
        num1: problem.num1,
        num2: problem.num2,
        operation: problem.operation,
        duration: elapsedTime,
      };
      fetch("/api/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
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
