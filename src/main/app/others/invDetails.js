import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { PrintInvDetails } from "../funtions/prints/invDetailsPrint";

export default function InvDetails(props) {
  const data = props.data;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <PrintInvDetails ref={componentRef} data={data} />
      <div className="row ">
        <div className="col-12 QA_section">
          <div className="card QA_table ">
            <div className="card-header">
              Inventory Details
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
              </span>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-6">Asset Type</div>
                <div className="col-6">{data.ASSETTYPE}</div>
                <div className="col-6">Total Numer Of Assets</div>
                <div className="col-6">{data.assetCount}</div>
                <div className="col-6">Total Numer Of Active Assets</div>
                <div className="col-6">{data.active}</div>
                <div className="col-6">Total Numer Of In-Active Assets</div>
                <div className="col-6">{data.inActive}</div>
                <div className="col-6">Total Value Of Assets</div>
                <div className="col-6">{data.value}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
