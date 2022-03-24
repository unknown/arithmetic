interface EndPanelProps {
  onStart: React.MouseEventHandler<HTMLButtonElement>;
  score: number;
}

const EndPanel = ({ onStart, score }: EndPanelProps) => {
  return (
    <div className="h-screen flex flex-col items-center justify-start">
      <div className="sm:basis-1/6 lg:basis-1/4" />
      <div className="basis-1/3 flex flex-col w-full md:w-2/3 lg:w-5/12 p-6 md:shadow-xl rounded-lg">
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
