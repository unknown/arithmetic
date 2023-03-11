import React, { useEffect, useState } from "react";
import { ArithmeticSettings } from "@/components/Arithmetic";
import Panel from "@/components/Panel";

export type ArithmeticProblem = {
  num1: number;
  num2: number;
  solution: number;
  operation: "+" | "-" | "*" | "/";
};

const randomNumber = (range: [number, number]) => {
  const [min, max] = range;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateProblem = (settings: ArithmeticSettings): ArithmeticProblem => {
  // create a list of valid operations
  let operations: Array<"+" | "-" | "*" | "/"> = [];
  settings.additionEnabled && operations.push("+");
  settings.subtractionEnabled && operations.push("-");
  settings.multiplicationEnabled && operations.push("*");
  settings.divisionEnabled && operations.push("/");

  // randomly select an operation for the problem
  const operation = operations[Math.floor(Math.random() * operations.length)];

  // generate and return a problem
  if (operation === "+" || operation === "-") {
    const a = randomNumber(settings.addendRange1);
    const b = randomNumber(settings.addendRange2);
    return {
      num1: operation == "+" ? a : a + b,
      num2: operation == "+" ? b : a,
      operation: operation,
      solution: operation == "+" ? a + b : b,
    };
  } else {
    const a = randomNumber(settings.factorRange1);
    const b = randomNumber(settings.factorRange2);
    return {
      num1: operation == "*" ? a : a * b,
      num2: operation == "*" ? b : a,
      operation: operation,
      solution: operation == "*" ? a * b : b,
    };
  }
};

type ProblemPanelElement = React.ElementRef<"div">;
type ProblemPanelProps = React.ComponentPropsWithoutRef<"div"> & {
  settings: ArithmeticSettings;
  onCancel: () => void;
  onFinish: (finalScore: number) => void;
};

const ProblemPanel = React.forwardRef<ProblemPanelElement, ProblemPanelProps>(
  ({ settings, onCancel, onFinish, ...props }, forwardedRef) => {
    const [problem, setProblem] = useState<ArithmeticProblem>(
      generateProblem(settings)
    );
    const [timeRemaining, setTimeRemaining] = useState(settings.seconds);
    const [score, setScore] = useState(0);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
      // if the clock is over, finish
      if (timeRemaining <= 0) {
        onFinish(score);
        return;
      }
      // update seconds remaining
      const interval = setInterval(() => {
        setTimeRemaining((timeRemaining) => timeRemaining - 1);
      }, 1000);
      // cleanup interval
      return () => clearInterval(interval);
    }, [timeRemaining]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (parseInt(event.currentTarget.value) === problem.solution) {
        setScore((score) => score + 1);
        setProblem(generateProblem(settings));
        setInputValue("");
      } else {
        setInputValue(event.currentTarget.value);
      }
    };

    return (
      <Panel {...props} ref={forwardedRef}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Seconds: {timeRemaining}</h1>
          <p className="text-2xl">{score}</p>
        </div>

        <div className="flex flex-col h-full items-center">
          <div className="py-2" />
          <p className="text-2xl">
            {problem.num1} {problem.operation} {problem.num2} =
          </p>
          <div className="py-2" />
          <input
            onChange={handleChange}
            value={inputValue}
            type="number"
            inputMode="numeric"
            className="h-10 w-36 rounded-lg bg-gray-50 text-2xl shadow-inner"
            name="arithmetic-input"
            autoFocus
          />
          <div className="py-4" />
          <button
            onClick={onCancel}
            className="mt-auto text-xl underline decoration-2"
          >
            Cancel
          </button>
        </div>
      </Panel>
    );
  }
);

ProblemPanel.displayName = "ProblemPanel";

export default ProblemPanel;
