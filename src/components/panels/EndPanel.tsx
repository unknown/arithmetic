import React from "react";
import Panel from "@/components/Panel";

type EndPanelElement = React.ElementRef<"div">;
type EndPanelProps = React.ComponentPropsWithoutRef<"div"> & {
  score: number;
  onStart: () => void;
};

const EndPanel = React.forwardRef<EndPanelElement, EndPanelProps>(
  ({ score, onStart, ...props }, forwardedRef) => {
    return (
      <Panel {...props} ref={forwardedRef}>
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
      </Panel>
    );
  }
);

EndPanel.displayName = "EndPanel";

export default EndPanel;
