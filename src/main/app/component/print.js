import React from "react";
import "../others/style.css";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  return (
    <div className="printme" ref={ref}>
     
    </div>
  );
});
