import React from "react";
import "../../others/style.css";

export const PrintDepDetails = React.forwardRef((props, ref) => {
  return (
    <div className="printme" ref={ref}>
      <div className="col-12 QA_section">
        <div className="card QA_table ">
          <div className="card-header">
            Department: <strong>{props.department}</strong>
            <span className="float-right">
              <span
                style={{
                  marginRight: "10px",
                  fontSize: 22,
                }}
              >
                ASSETS RIG
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
                  fontSize: 22,
                }}
              >
                Department Name:
              </span>
              <span
                style={{
                  width: "50%",
                  marginBottom: "20px",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {props.department}
              </span>
              <span
                style={{
                  width: "50%",
                  paddingLeft: "70px",
                  marginBottom: "20px",
                  fontSize: 22,
                }}
              >
                Total Number Of Assets:
              </span>
              <span
                style={{
                  width: "50%",
                  marginBottom: "20px",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {props.assetCount}
              </span>
              <span
                style={{
                  width: "50%",
                  paddingLeft: "70px",
                  marginBottom: "20px",
                  fontSize: 22,
                }}
              >
                Total Number Of Active Assets:
              </span>
              <span
                style={{
                  width: "50%",
                  marginBottom: "20px",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {props.active()}
              </span>
              <span
                style={{
                  width: "50%",
                  paddingLeft: "70px",
                  marginBottom: "20px",
                  fontSize: 22,
                }}
              >
                Total Number Of In-Active Assets:
              </span>
              <span
                style={{
                  width: "50%",
                  marginBottom: "20px",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {props.in_active()}
              </span>
              <span
                style={{
                  width: "50%",
                  paddingLeft: "70px",
                  marginBottom: "20px",
                  fontSize: 22,
                }}
              >
                Total Number Of New Assets:
              </span>
              <span
                style={{
                  width: "50%",
                  marginBottom: "20px",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {props.newAss()}
              </span>
              <span
                style={{
                  width: "50%",
                  paddingLeft: "70px",
                  marginBottom: "20px",
                  fontSize: 22,
                }}
              >
                Total Number Of Old Assets:
              </span>
              <span
                style={{
                  width: "50%",
                  marginBottom: "20px",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {props.old()}
              </span>
              <span
                style={{
                  width: "50%",
                  paddingLeft: "70px",
                  marginBottom: "20px",
                  fontSize: 22,
                }}
              >
                Total Number Of Damaged Assets:
              </span>
              <span
                style={{
                  width: "50%",
                  marginBottom: "20px",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {props.damaged()}
              </span>
              <span
                style={{
                  width: "50%",
                  paddingLeft: "70px",
                  marginBottom: "20px",
                  fontSize: 22,
                }}
              >
                Total Number Of Assets At Repairs:
              </span>
              <span
                style={{
                  width: "50%",
                  marginBottom: "20px",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {props.repairs()}
              </span>
              <span
                style={{
                  width: "50%",
                  paddingLeft: "70px",
                  marginBottom: "20px",
                  fontSize: 22,
                }}
              >
                Number Of Donated Assets:
              </span>
              <span
                style={{
                  width: "50%",
                  marginBottom: "20px",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {props.donated()}
              </span>
              <span
                style={{
                  width: "50%",
                  paddingLeft: "70px",
                  marginBottom: "20px",
                  fontSize: 22,
                }}
              >
                Number Of Purchased Assets:
              </span>
              <span
                style={{
                  width: "50%",
                  marginBottom: "20px",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {props.purchased()}
              </span>
              <span
                style={{
                  width: "50%",
                  paddingLeft: "70px",
                  marginBottom: "20px",
                  fontSize: 22,
                }}
              >
                Total Value Of Assets:
              </span>
              <span
                style={{
                  width: "50%",
                  marginBottom: "20px",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {props.value()}
              </span>
              <span
                style={{
                  width: "50%",
                  paddingLeft: "70px",
                  marginBottom: "20px",
                  fontSize: 22,
                }}
              >
                Types Of Assets In The Department:
              </span>
              <span
                style={{
                  width: "50%",
                  marginBottom: "20px",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
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
  );
});
