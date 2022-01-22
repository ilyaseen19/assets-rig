import React from "react";
import "../../others/style.css";

export const PrintQrCode = React.forwardRef((props, ref) => {
  const qr = props.qr;
  return (
    <div className="printme centered" ref={ref}>
      <div className="align-self-center" style={{width: "50%"}}>
        <img
          src={qr}
          alt="qr-code"
          className="mx-auto d-block"
          height={500}
          width={500}
        />
      </div>
    </div>
  );
});
