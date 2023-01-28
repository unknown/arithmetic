import React, { useState } from "react";
import HomePanel from "@/components/panels/HomePanel";
import ProblemPanel from "@/components/panels/ProblemPanel";
import EndPanel from "@/components/panels/EndPanel";

export type ArithmeticSettings = {
  seconds: number;
  additionEnabled: boolean;
  subtractionEnabled: boolean;
  multiplicationEnabled: boolean;
  divisionEnabled: boolean;
  addendRange1: [number, number];
  addendRange2: [number, number];
  factorRange1: [number, number];
  factorRange2: [number, number];
};

export type ArithmeticScreen = "Home" | "Problem" | "End";

type ArithmeticProps = {};

const Arithmetic: React.FC<ArithmeticProps> = () => {
  const [settings, setSettings] = useState<ArithmeticSettings>({
    seconds: 60,
    additionEnabled: true,
    subtractionEnabled: true,
    multiplicationEnabled: true,
    divisionEnabled: true,
    addendRange1: [2, 100],
    addendRange2: [2, 100],
    factorRange1: [2, 12],
    factorRange2: [2, 100],
  });
  const [screen, setScreen] = useState<ArithmeticScreen>("Home");
  const [score, setScore] = useState(0);

  let panel;
  if (screen === "Home") {
    panel = <HomePanel onStart={() => setScreen("Problem")} />;
  } else if (screen === "Problem") {
    panel = (
      <ProblemPanel
        settings={settings}
        onCancel={() => setScreen("Home")}
        onFinish={(finalScore) => {
          setScore(finalScore);
          setScreen("End");
        }}
      />
    );
  } else {
    panel = <EndPanel score={score} onStart={() => setScreen("Problem")} />;
  }

  return panel;
};

Arithmetic.displayName = "Arithmetic";

export default Arithmetic;
