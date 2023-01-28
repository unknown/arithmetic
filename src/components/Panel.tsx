import React from "react";

type PanelElement = React.ElementRef<"div">;
type PanelProps = React.ComponentPropsWithoutRef<"div"> & {};

const Panel = React.forwardRef<PanelElement, PanelProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <div
        className="max-w-2xl h-80 flex flex-col w-full p-12 md:shadow-xl rounded-lg"
        ref={forwardedRef}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Panel.displayName = "Panel";

export default Panel;
