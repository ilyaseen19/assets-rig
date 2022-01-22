import React from "react";
import "../../others/style.css";

export const PrintInvDetails = React.forwardRef((props, ref) => {
  const data = props.data;
  return (
    <div className="printme" ref={ref}>
      <div className="row ">
        <div className="col-12 QA_section">
          <div className="card QA_table ">
            <div
              className="card-header"
              style={{
                fontSize: 22,
              }}
            >
              ASSETS RIG
              <span className="float-right">
                <span
                  style={{
                    marginRight: "10px",
                    fontSize: 22,
                  }}
                >
                  Inventory Details
                </span>
              </span>{" "}
            </div>
            <div className="card-body">
              <div className="row">
                <div
                  className="col-6"
                  style={{
                    fontSize: 22,
                  }}
                >
                  Asset Type
                </div>
                <div
                  className="col-6"
                  style={{
                    fontSize: 22,
                  }}
                >
                  {data.ASSETTYPE}
                </div>
                <div
                  className="col-6"
                  style={{
                    fontSize: 22,
                  }}
                >
                  Total Numer Of Assets
                </div>
                <div
                  className="col-6"
                  style={{
                    fontSize: 22,
                  }}
                >
                  {data.assetCount}
                </div>
                <div
                  className="col-6"
                  style={{
                    fontSize: 22,
                  }}
                >
                  Total Numer Of Active Assets
                </div>
                <div
                  className="col-6"
                  style={{
                    fontSize: 22,
                  }}
                >
                  {data.active}
                </div>
                <div
                  className="col-6"
                  style={{
                    fontSize: 22,
                  }}
                >
                  Total Numer Of In-Active Assets
                </div>
                <div
                  className="col-6"
                  style={{
                    fontSize: 22,
                  }}
                >
                  {data.inActive}
                </div>
                <div
                  className="col-6"
                  style={{
                    fontSize: 22,
                  }}
                >
                  Total Value Of Assets
                </div>
                <div
                  className="col-6"
                  style={{
                    fontSize: 22,
                  }}
                >
                  {data.value}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
