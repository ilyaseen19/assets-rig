import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Loaders from "../component/loaders/round";
import Notifications from "../component/notifications";
import PageTitle from "../component/pageTitle";
import CreReport from "./createReport";
import { PrintQrCode } from "../funtions/prints/printQrCode";
import { PrintAsset } from "../funtions/prints/printAsset";

export default function AssetDetails(props) {
  const [redirect, setRedirect] = useState(false);
  const [creReport, setCreReport] = useState(false);
  const [report, setReport] = useState({});
  const [edit, setEdit] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [editCondition, setEditCondition] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [condition, setCondition] = useState("");
  const [department, setDepartment] = useState("");
  const [showDelNoti, setShowDel] = useState(false);
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const [errType, setErrType] = useState("");

  const loading = props.loading;
  let item = props.data;
  const departments = props.departments;
  const user = props.user;

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const _handleLoading = () => {
    props.stopLoading();
  };

  const secondRef = useRef();
  const handlePrintAss = useReactToPrint({
    content: () => secondRef.current,
  });

  const _handleAction = (type) => {
    if (type === "close" || type === "clicked") {
      setShowNoti(false);
      setShowDel(false);
    } else {
      // handle delete
      props.onDelete(item._id);
    }
  };

  const _handleDel = () => {
    if (user.ROLE === "CLARK" || user.ROLE === "CEO") {
      setErrType("danger");
      setMsg("You are not authorised to view this page!");
      showNoti(true);
      return false;
    } else {
      setShowDel(true);
    }
  };

  const _handleSave = async (check) => {
    if (check === "d") {
      if (department === "") {
        setMsg("Field is required!");
        setErrType("danger");
        setShowNoti(true);
      } else {
        const data = {
          serialNumber: item.SERIALNUMBER,
          assetType: item.ASSETTYPE,
          brand: item.BRAND,
          department: department,
          condition: item.CONDITION,
          status: item.STATUS,
          value: item.VALUE,
        };
        await props.onEditAsset(data);
      }
    } else if (check === "c") {
      if (condition === "") {
        setMsg("Field is required!");
        setErrType("danger");
        setShowNoti(true);
      } else {
        const data = {
          serialNumber: item.SERIALNUMBER,
          assetType: item.ASSETTYPE,
          brand: item.BRAND,
          department: item.DEPARTMENT,
          condition: condition,
          status: item.STATUS,
          value: item.VALUE,
        };
        props.onEditAsset(data);
      }
    } else {
      if (status === "") {
        setMsg("Field is required!");
        setErrType("danger");
        setShowNoti(true);
      } else {
        const data = {
          serialNumber: item.SERIALNUMBER,
          assetType: item.ASSETTYPE,
          brand: item.BRAND,
          department: item.DEPARTMENT,
          condition: item.CONDITION,
          status: status,
          value: item.VALUE,
        };
        props.onEditAsset(data);
      }
    }
  };

  const _handleAddRep = async (data) => {
    await props.onAddRep(data);
    setCreReport(false);
  };

  const _handleRedirect = () => {
    if (user.ROLE === "CLARK" || user.ROLE === "CEO") {
      setErrType("danger");
      setMsg("You are not authorised to view this page!");
      showNoti(true);
      return false;
    } else {
      setRedirect(true);
    }
  };

  if (creReport) {
    return (
      <CreReport
        back={() => setCreReport(false)}
        data={report}
        loading={loading}
        user={user}
        onAddRep={_handleAddRep}
        type={props.type}
        msg={props.msg}
        notify={props.notify}
      />
    );
  } else {
    return (
      <div>
        <PageTitle title="Asset Details" onBack={props.goBack} />
        <div className="row ">
          <PrintQrCode ref={componentRef} qr={item.QR} />
          <PrintAsset ref={secondRef} item={item} />
          <div className="col-12 QA_section">
            <div className="card QA_table ">
              <div className="card-header">
                Asset Serial Number: <strong>{item.SERIALNUMBER}</strong>
                <span className="float-right">
                  {redirect ? (
                    <span></span>
                  ) : (
                    <span
                      type="button"
                      role="button"
                      style={{
                        marginRight: "10px",
                      }}
                      onClick={() => {
                        handlePrintAss();
                      }}
                    >
                      <i title="print inventory" className="fa fa-print"></i>
                    </span>
                  )}
                </span>
              </div>
              <div className="card-body">
                {showNoti ? (
                  <Notifications
                    type={errType}
                    message={msg}
                    onAction={_handleAction}
                  />
                ) : (
                  <span></span>
                )}
                {redirect ? (
                  <div className="row centered">
                    <div className="col-lg-6 align-self-center">
                      <div className="input-group mb-3">
                        {edit ? (
                          <select
                            className="custom-select"
                            onChange={(e) =>
                              setDepartment(e.target.value.toUpperCase())
                            }
                          >
                            <option>Choose...</option>
                            {departments.map((item, index) => {
                              return (
                                <option value={item.type} key={index}>
                                  {item.type}
                                </option>
                              );
                            })}
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            form
                            placeholder={item.DEPARTMENT}
                            aria-label="Recipient's username"
                            disabled
                            aria-describedby="button-addon-group"
                          />
                        )}
                        <div className="input-group-append">
                          {edit ? (
                            <span>
                              <button
                                className="btn btn-light"
                                type="button"
                                id="button-addon-group"
                                onClick={() => {
                                  _handleLoading();
                                  setEdit(false);
                                }}
                              >
                                <i className="fa fa-times"></i>
                              </button>
                              {loading ? (
                                <span className="btn btn-light">
                                  <Loaders loading={loading} />
                                </span>
                              ) : (
                                <button
                                  className="btn btn-light"
                                  type="button"
                                  id="button-addon-group"
                                  onClick={() => _handleSave("d")}
                                >
                                  <i className="fa fa-save"></i>
                                </button>
                              )}
                            </span>
                          ) : (
                            <button
                              className="btn btn-light"
                              type="button"
                              onClick={() => setEdit(true)}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="input-group mb-3">
                        {editCondition ? (
                          <select
                            className="custom-select"
                            onChange={(e) =>
                              setCondition(e.target.value.toUpperCase())
                            }
                          >
                            <option>Choose...</option>
                            <option value="new">NEW</option>
                            <option value="old">OLD</option>
                            <option value="damaged">DAMAGED</option>
                            <option value="repairs">REPAIRS</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            form
                            placeholder={item.CONDITION}
                            aria-label="Recipient's username"
                            disabled
                            aria-describedby="button-addon-group"
                          />
                        )}
                        <div className="input-group-append">
                          {editCondition ? (
                            <span>
                              <button
                                className="btn btn-light"
                                type="button"
                                id="button-addon-group"
                                onClick={() => {
                                  _handleLoading();
                                  setEditCondition(false);
                                }}
                              >
                                <i className="fa fa-times"></i>
                              </button>
                              {loading ? (
                                <span className="btn btn-light">
                                  <Loaders loading={loading} />
                                </span>
                              ) : (
                                <button
                                  className="btn btn-light"
                                  type="button"
                                  id="button-addon-group"
                                  onClick={() => _handleSave("c")}
                                >
                                  <i className="fa fa-save"></i>
                                </button>
                              )}
                            </span>
                          ) : (
                            <button
                              className="btn btn-light"
                              type="button"
                              id="button-addon-group"
                              onClick={() => setEditCondition(true)}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="input-group mb-3">
                        {editStatus ? (
                          <select
                            className="custom-select"
                            onChange={(e) =>
                              setStatus(e.target.value.toUpperCase())
                            }
                          >
                            <option>Choose status...</option>
                            <option value="active">ACTIVE</option>
                            <option value="in-active">IN-ACTIVE</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            form
                            placeholder={item.STATUS}
                            aria-label="Recipient's username"
                            disabled
                            aria-describedby="button-addon-group"
                          />
                        )}
                        <div className="input-group-append">
                          {editStatus ? (
                            <span>
                              <button
                                className="btn btn-light"
                                type="button"
                                id="button-addon-group"
                                onClick={() => {
                                  _handleLoading();
                                  setEditStatus(false);
                                }}
                              >
                                <i className="fa fa-times"></i>
                              </button>
                              {loading ? (
                                <span className="btn btn-light">
                                  <Loaders loading={loading} />
                                </span>
                              ) : (
                                <button
                                  className="btn btn-light"
                                  type="button"
                                  id="button-addon-group"
                                  onClick={() => _handleSave("s")}
                                >
                                  <i className="fa fa-save"></i>
                                </button>
                              )}
                            </span>
                          ) : (
                            <button
                              className="btn btn-light"
                              type="button"
                              id="button-addon-group"
                              onClick={() => setEditStatus(true)}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary mr-3"
                        onClick={() => setRedirect(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {showDelNoti ? (
                      <Notifications
                        type="warning"
                        message="Proceed To Delete"
                        onAction={_handleAction}
                      />
                    ) : (
                      <span></span>
                    )}
                    <div className="row">
                      <div className="col-lg-6 align-self-center">
                        <img
                          src={item.QR}
                          alt="qr-code"
                          className="mx-auto d-block sm_w_100"
                          height={300}
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
                          <p className="text-muted mb-0">
                            Brand : {item.BRAND}
                          </p>
                          <p className="text-muted mb-0">
                            Price : {item.VALUE}
                          </p>
                          <p className="text-muted mb-0">
                            Status : {item.STATUS}
                          </p>
                          <p className="text-muted mb-0">
                            Date Purchased / Donated :{" "}
                            {item.DATEOFPURCHASEORDONATED}
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
                          <div className="quantity mt-2">
                            <span
                              type="button"
                              role="button"
                              className="btn green_bg text-white px-4 d-inline-block "
                              onClick={handlePrint}
                            >
                              <i className="fa fa-print mr-2" />
                              Print QR Code
                            </span>
                            <span
                              type="button"
                              role="button"
                              className="btn green_bg text-white px-4 d-inline-block ml-2"
                              onClick={() => _handleRedirect()}
                            >
                              <i className="fa fa-edit" />
                            </span>
                            {loading ? (
                              <span className="btn green_bg text-white px-4 d-inline-block ml-2">
                                <Loaders loading={loading} />
                              </span>
                            ) : (
                              <span
                                type="button"
                                role="button"
                                className="btn green_bg text-white px-4 d-inline-block ml-2"
                                onClick={() => {
                                  _handleDel();
                                }}
                              >
                                <i className="fa fa-trash" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      {/*end col*/}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
