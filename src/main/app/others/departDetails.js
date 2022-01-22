import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { PrintAllAssets } from "../funtions/prints/allAssets";
import { PrintDepDetails } from "../funtions/prints/printDepDetails";

export default function DepartDetails(props) {
  const data = props.data;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const secondRef = useRef();
  const handlePrintAll = useReactToPrint({
    content: () => secondRef.current,
  });

  const _handleActiveAssets = () => {
    var active = 0;
    const assets = data.assets;
    assets.forEach((item) => {
      if (item.STATUS === "ACTIVE") {
        active += 1;
      }
    });
    return active;
  };

  const _handleInActiveAssets = () => {
    var inActive = 0;
    const assets = data.assets;
    assets.forEach((item) => {
      if (item.STATUS === "IN-ACTIVE") {
        inActive += 1;
      }
    });
    return inActive;
  };

  const _handleNewAssets = () => {
    var res = 0;
    const assets = data.assets;
    assets.forEach((item) => {
      if (item.CONDITION === "NEW") {
        res += 1;
      }
    });
    return res;
  };

  const _handleOldAssets = () => {
    var res = 0;
    const assets = data.assets;
    assets.forEach((item) => {
      if (item.CONDITION === "OLD") {
        res += 1;
      }
    });
    return res;
  };

  const _handleDamagedAssets = () => {
    var res = 0;
    const assets = data.assets;
    assets.forEach((item) => {
      if (item.CONDITION === "DAMAGED") {
        res += 1;
      }
    });
    return res;
  };

  const _handleRepairsAssets = () => {
    var res = 0;
    const assets = data.assets;
    assets.forEach((item) => {
      if (item.CONDITION === "REPAIRS") {
        res += 1;
      }
    });
    return res;
  };

  const _handleAssetTypes = () => {
    var res = [];
    const assets = data.assets;
    assets.forEach((item) => {
      if (!res.includes(item.ASSETTYPE)) {
        res.push(item.ASSETTYPE);
      }
    });
    return res;
  };

  const _handleDonated = () => {
    var res = 0;
    const assets = data.assets;
    assets.forEach((item) => {
      if (item.DONATEDORPURCHASED === "DONATED") {
        res += 1;
      }
    });
    return res;
  };

  const _handlePurchased = () => {
    var res = 0;
    const assets = data.assets;
    assets.forEach((item) => {
      if (item.DONATEDORPURCHASED === "PURCHASED") {
        res += 1;
      }
    });
    return res;
  };

  const _handleAssetsValue = () => {
    var res = 0;
    const assets = data.assets;
    assets.forEach((item) => {
      res = res + parseInt(item.VALUE);
    });
    return res;
  };

  return (
    <div>
      <PrintDepDetails
        ref={componentRef}
        department={data.department}
        assetCount={data.assetCount}
        active={_handleActiveAssets}
        in_active={_handleInActiveAssets}
        newAss={_handleNewAssets}
        old={_handleOldAssets}
        damaged={_handleDamagedAssets}
        repairs={_handleRepairsAssets}
        types={_handleAssetTypes}
        donated={_handleDonated}
        purchased={_handlePurchased}
        value={_handleAssetsValue}
      />
      <PrintAllAssets
        ref={secondRef}
        assets={data.assets}
        value={_handleAssetsValue}
      />
      <div className="row ">
        <div className="col-12 QA_section">
          <div className="card QA_table ">
            <div className="card-header">
              Department: <strong>{data.department}</strong>
              <span className="float-right">
                <span
                  style={{
                    marginRight: "10px",
                  }}
                >
                  ASSETS RIG
                </span>
                <span
                  type="button"
                  role="button"
                  onClick={() => props.onBack()}
                  style={{
                    marginRight: "10px",
                  }}
                >
                  <i className="fa fa-arrow-left"></i>
                </span>
                <span
                  type="button"
                  role="button"
                  style={{
                    marginRight: "10px",
                  }}
                  onClick={handlePrint}
                >
                  <i title="print inventory" className="fa fa-print"></i>
                </span>
                <span
                  type="button"
                  role="button"
                  style={{
                    marginRight: "10px",
                  }}
                  onClick={handlePrintAll}
                >
                  <i
                    title="print all assets"
                    className="fa fa-angle-double-down"
                  ></i>
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
                  Department Name:
                </span>
                <span style={{ width: "50%", marginBottom: "20px" }}>
                  {data.department}
                </span>
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
                  {data.assetCount}
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
                  {_handleActiveAssets()}
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
                  {_handleInActiveAssets()}
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
                  {_handleNewAssets()}
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
                  {_handleOldAssets()}
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
                  {_handleDamagedAssets()}
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
                  {_handleRepairsAssets()}
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
                  {_handleDonated()}
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
                  {_handlePurchased()}
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
                  {_handleAssetsValue()}
                </span>
                <span
                  style={{
                    width: "50%",
                    paddingLeft: "70px",
                    marginBottom: "20px",
                  }}
                >
                  Types Of Assets In The Department:
                </span>
                <span style={{ width: "50%", marginBottom: "20px" }}>
                  {_handleAssetTypes().map((item, index) => {
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
}
