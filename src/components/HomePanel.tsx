interface HomePanelProps {
  onStart: React.MouseEventHandler<HTMLButtonElement>;
}

const HomePanel = ({ onStart }: HomePanelProps) => {
  return (
    <div className="h-screen flex flex-col items-center justify-start md:justify-center">
      <div className="max-w-2xl h-80 flex flex-col w-full p-12 md:shadow-xl rounded-lg">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Arithmetic</h1>
        </div>
        <div className="flex flex-col h-full items-center">
          <div className="py-4" />
          <p className="text-xl">
            Practice your arithmetic skills by solving as many problems as
            possible in a fast-paced drill.
          </p>
          <div className="py-4" />
          <button
            onClick={onStart}
            className="mt-auto text-xl underline decoration-2"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePanel;
