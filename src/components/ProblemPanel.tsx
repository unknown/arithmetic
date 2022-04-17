import { Problem } from "@/pages";

interface ProblemPanelProps {
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  seconds: number;
  score: number;
  problem: Problem;
  value: string;
}

const ProblemPanel = ({
  onCancel,
  handleChange,
  seconds,
  score,
  problem,
  value,
}: ProblemPanelProps) => {
  return (
    <div className="h-screen flex flex-col items-center justify-start md:justify-center">
      <div className="max-w-2xl h-80 flex flex-col w-full p-12 md:shadow-xl rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Seconds: {seconds}</h1>
          <p className="text-2xl">{score}</p>
        </div>
        <div className="flex flex-col h-full items-center">
          <div className="py-2" />
          <p className="text-2xl">
            {problem?.num1} {problem?.operation} {problem?.num2} =
          </p>
          <div className="py-2" />
          <input
            onChange={handleChange}
            value={value}
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
      </div>
    </div>
  );
};

export default ProblemPanel;
