import React from "react";
import PrintTable from "../../component/tables/printTables";
import "../../others/style.css";

export const DepAssets = React.forwardRef((props, ref) => {
  const assets = props.assets;
  const title = props.title;
  const branch = props.branch;
  return (
    <div className="printme" ref={ref}>
      <div className="row ">
        <div className="col-12 QA_section">
          <div className="card QA_table ">
            <div className="card-header">
              <span
                style={{
                  marginRight: "20px",
                  fontSize: 22,
                }}
              >
                ASSETS RIG
              </span>
              <span className="float-right">
                <span
                  style={{
                    marginRight: "20px",
                    fontSize: 22,
                  }}
                >
                  Branch: {branch}
                </span>
                <span
                  style={{
                    marginRight: "20px",
                    fontSize: 22,
                  }}
                >
                  Department: {title}
                </span>
                <span
                  style={{
                    marginRight: "20px",
                    fontSize: 22,
                  }}
                >
                  Total Number of Assets:{" "}
                  {assets === null || assets === undefined ? 0 : assets.length}
                </span>
              </span>
            </div>
            <div className="card-body">
              <PrintTable data={assets} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
