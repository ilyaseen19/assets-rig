import React from "react";
import PrintTable from "../../component/tables/printTables";
import "../../others/style.css";

export const BranchAssets = React.forwardRef((props, ref) => {
  const assets = props.assets;
  //   const _va = () => {
  //     var res = 0;
  //     console.log(assets.assets);
  //     // assets.assets.forEach((element) => {
  //     //   return (res += parseInt(element.VALUE));
  //     // });
  //     return res;
  //   };
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
                  Branch: {assets.branch}
                </span>
                <span
                  style={{
                    marginRight: "20px",
                    fontSize: 22,
                  }}
                >
                  Total Number of Assets:{" "}
                  {assets === null ||
                  assets === undefined ||
                  assets.assets === undefined
                    ? 0
                    : assets.assets.length}
                </span>
              </span>
            </div>
            <div className="card-body">
              <PrintTable data={assets.assets} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
