import React from "react";
import "../../others/style.css";

export const PrintAsset = React.forwardRef((props, ref) => {
  const item = props.item;
  return (
    <div className="printme row" ref={ref}>
      <div className="col-12 QA_section">
        <div className="card QA_table ">
          <div className="card-header">
            Asset Serial Number: <strong>{item.SERIALNUMBER}</strong>
            <span className="float-right">
              <span
                style={{
                  marginRight: "10px",
                }}
              >
                ASSETS RIG
              </span>{" "}
            </span>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-lg-6 align-self-center">
                <img
                  src={item.QR}
                  alt="qr-code"
                  className="mx-auto d-block sm_w_100"
                  height={700}
                />
              </div>
              {/*end col*/}
              <div className="col-lg-6 align-self-center">
                <div className="single-pro-detail">
                  <p className="mb-1">Asset Details</p>
                  <div className="custom-border mb-3" />
                  <h4 className="pro-title">
                    <span>Asset Type:</span> {item.ASSETTYPE}
                  </h4>
                  <p className="text-muted mb-0">
                    <span>Serial Number:</span>{" "}
                    <strong>{item.SERIALNUMBER}</strong>
                  </p>
                  <p className="text-muted mb-0">
                    Department: {item.DEPARTMENT}
                  </p>
                  <p className="text-muted mb-0">
                    Condition : {item.CONDITION}
                  </p>
                  <p className="text-muted mb-0">Brand : {item.BRAND}</p>
                  <p className="text-muted mb-0">Price : {item.VALUE}</p>
                  <p className="text-muted mb-0">Status : {item.STATUS}</p>
                  <p className="text-muted mb-0">
                    Date Purchased / Donated : {item.DATEOFPURCHASEORDONATED}
                  </p>
                  <p className="text-muted mb-0">
                    Purchased / Donated : {item.DONATEDORPURCHASED}
                  </p>
                  <p className="text-muted mb-0">
                    Date Added :{" "}
                    {item.createdAt !== undefined ? (
                      item.createdAt.split("T")[0]
                    ) : (
                      <></>
                    )}
                  </p>
                </div>
              </div>
              {/*end col*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
