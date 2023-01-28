import React from "react";
import Panel from "@/components/Panel";

type HomePanelElement = React.ElementRef<"div">;
type HomePanelProps = React.ComponentPropsWithoutRef<"div"> & {
  onStart: () => void;
};

const HomePanel = React.forwardRef<HomePanelElement, HomePanelProps>(
  ({ onStart, ...props }, forwardedRef) => {
    return (
      <Panel {...props} ref={forwardedRef}>
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
      </Panel>
    );
  }
);

HomePanel.displayName = "HomePanel";

export default HomePanel;
