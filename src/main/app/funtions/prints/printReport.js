import React from "react";
import "../../others/style.css";

export const PrintReport = React.forwardRef((props, ref) => {
  const assets = props.assets;
  return (
    <div className="printme" ref={ref}>
      <div className="row ">
        <div className="col-12 QA_section">
          <div className="card QA_table ">
            <div className="card-header">
              ASSETS RIG
              <span className="float-right">
                <span
                  style={{
                    marginRight: "10px",
                  }}
                >
                  ASSETS REPORT
                </span>
              </span>
            </div>
            <div className="card-body">
              <span className="row" style={{ width: "100%", display: "flex" }}>
                <span
                  style={{
                    width: "50%",
                    paddingLeft: "70px",
                    marginBottom: "20px",
                  }}
                >
                  Total Number Of Assets:
                </span>
                <span style={{ width: "50%", marginBottom: "20px" }}>
                  {assets.length}
                </span>
                <span
                  style={{
                    width: "50%",
                    paddingLeft: "70px",
                    marginBottom: "20px",
                  }}
                >
                  Total Number Of Active Assets:
                </span>
                <span style={{ width: "50%", marginBottom: "20px" }}>
                  {props.active()}
                </span>
                <span
                  style={{
                    width: "50%",
                    paddingLeft: "70px",
                    marginBottom: "20px",
                  }}
                >
                  Total Number Of In-Active Assets:
                </span>
                <span style={{ width: "50%", marginBottom: "20px" }}>
                  {props.in_active()}
                </span>
                <span
                  style={{
                    width: "50%",
                    paddingLeft: "70px",
                    marginBottom: "20px",
                  }}
                >
                  Total Number Of New Assets:
                </span>
                <span style={{ width: "50%", marginBottom: "20px" }}>
                  {props.newAss()}
                </span>
                <span
                  style={{
                    width: "50%",
                    paddingLeft: "70px",
                    marginBottom: "20px",
                  }}
                >
                  Total Number Of Old Assets:
                </span>
                <span style={{ width: "50%", marginBottom: "20px" }}>
                  {props.old()}
                </span>
                <span
                  style={{
                    width: "50%",
                    paddingLeft: "70px",
                    marginBottom: "20px",
                  }}
                >
                  Total Number Of Damaged Assets:
                </span>
                <span style={{ width: "50%", marginBottom: "20px" }}>
                  {props.damaged()}
                </span>
                <span
                  style={{
                    width: "50%",
                    paddingLeft: "70px",
                    marginBottom: "20px",
                  }}
                >
                  Total Number Of Assets At Repairs:
                </span>
                <span style={{ width: "50%", marginBottom: "20px" }}>
                  {props.repairs()}
                </span>
                <span
                  style={{
                    width: "50%",
                    paddingLeft: "70px",
                    marginBottom: "20px",
                  }}
                >
                  Number Of Donated Assets:
                </span>
                <span style={{ width: "50%", marginBottom: "20px" }}>
                  {props.donated()}
                </span>
                <span
                  style={{
                    width: "50%",
                    paddingLeft: "70px",
                    marginBottom: "20px",
                  }}
                >
                  Number Of Purchased Assets:
                </span>
                <span style={{ width: "50%", marginBottom: "20px" }}>
                  {props.purchased()}
                </span>
                <span
                  style={{
                    width: "50%",
                    paddingLeft: "70px",
                    marginBottom: "20px",
                  }}
                >
                  Total Value Of Assets:
                </span>
                <span style={{ width: "50%", marginBottom: "20px" }}>
                  {props.value()}
                </span>
                <span
                  style={{
                    width: "50%",
                    paddingLeft: "70px",
                    marginBottom: "20px",
                  }}
                >
                  Types Of Assets:
                </span>
                <span style={{ width: "50%", marginBottom: "20px" }}>
                  {props.types().map((item, index) => {
                    return (
                      <span
                        style={{
                          fontSize: 15,
                          fontWeight: "bold",
                          marginRight: "15px",
                        }}
                        key={index}
                      >
                        {item},
                      </span>
                    );
                  })}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
