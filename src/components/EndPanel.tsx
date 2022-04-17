interface EndPanelProps {
  onStart: React.MouseEventHandler<HTMLButtonElement>;
  score: number;
}

const EndPanel = ({ onStart, score }: EndPanelProps) => {
  return (
    <div className="h-screen flex flex-col items-center justify-start md:justify-center">
      <div className="max-w-2xl h-80 flex flex-col w-full p-12 md:shadow-xl rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Arithmetic</h1>
        </div>
        <div className="flex flex-col h-full items-center">
          <div className="py-4" />
          <p className="text-2xl">Score: {score}</p>
          <div className="py-4" />
          <button
            onClick={onStart}
            className="mt-auto text-xl underline decoration-2"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndPanel;
