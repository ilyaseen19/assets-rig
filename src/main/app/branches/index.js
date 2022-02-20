import { useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import PageTitle from "../component/pageTitle";
import { BranchAssets } from "../funtions/prints/branchAssets";
import { DepAssets } from "../funtions/prints/depAssets";
import "../main.css";
import AssetDetails from "../others/assetDetails";

export default function Branches(props) {
  const [redirect, setRedirect] = useState("branch");
  const [branch, setBranch] = useState({});
  const [value, setValue] = useState(0);
  const [deps, setDeps] = useState([]);
  const [depDetails, setDepDetails] = useState([]);
  const [asset, setAsset] = useState({});
  const [depTitle, setDepTitle] = useState("");

  const style = {
    marginLeft: "5px",
    width: "90%",
    fontSize: 15,
    marginTop: "5px",
  };

  const componentRef = useRef();
  const _handlePrintAll = useReactToPrint({
    content: () => componentRef.current,
  });

  const depComponentRef = useRef();
  const _handlePrintDep = useReactToPrint({
    content: () => depComponentRef.current,
  });

  const assets = props.assets;
  const loading = props.loading;
  const departments = props.departments;
  const user = props.user;
  const type = props.type;
  const msg = props.msg;
  const notify = props.notify;

  const _handleBackClick = () => {
    setAsset({});
    setRedirect("branch");
  };

  const _handleClick = (item) => {
    setBranch(item);
    _value(item);
    groupDep(item);
  };

  const _handleDeps = (item) => {
    setDepTitle(item.department);
    setDepDetails(item.assets);
  };

  const group = () => {
    let newArr = [];
    assets.forEach((item) => {
      if (newArr.some((e) => e.branch === item.BRANCH)) {
        newArr.map((e) => {
          if (e.branch === item.BRANCH) {
            e.assets.push(item);
          }
        });
      } else {
        newArr.push({
          branch: item.BRANCH,
          assets: [item],
        });
      }
    });
    return newArr;
  };

  const _value = async (item) => {
    var results = 0;
    const ass = item.assets;
    ass.forEach((item) => {
      results += parseInt(item.VALUE);
    });
    setValue(results);
  };

  const groupDep = (item) => {
    let newArr = [];
    item.assets.forEach((elment) => {
      if (newArr.some((e) => e.department === elment.DEPARTMENT)) {
        newArr.map((e) => {
          if (e.department === elment.DEPARTMENT) {
            e.assets.push(elment);
          }
        });
      } else {
        newArr.push({
          department: elment.DEPARTMENT,
          assets: [elment],
        });
      }
    });
    setDeps(newArr);
  };

  const _handleAssetDetails = (item) => {
    setAsset(item);
    setRedirect("assetDetsils");
  };

  const _handleEditAsset = async (data) => {
    const res = await props.onEditAsset(data);
    if (res) {
      setAsset({});
      setDepDetails([]);
      setRedirect("branch");
    }
  };

  const _handleDel = async (id) => {
    const res = await props.onDel(id);
    if (res) {
      setAsset({});
      setDepDetails([]);
      setRedirect("branch");
    }
  };

  const _handleAssetsValue = () => {
    var res = 0;
    branch.assets.forEach((item) => {
      res = res + parseInt(item.VALUE);
    });
    return res;
  };

  if (redirect === "branch") {
    return (
      <div>
        <PageTitle
          title="Branches"
          createAsset={props.onCreate}
          getAssets={props.getAssets}
          onSettingsClicked={() => setRedirect("settings")}
        />
        <BranchAssets
          ref={componentRef}
          assets={branch}
          value={_handleAssetsValue}
        />
        <DepAssets
          ref={depComponentRef}
          assets={depDetails}
          title={depTitle}
          branch={branch.branch}
        />
        <div className="row">
          <div className="col-lg-4">
            <div className="white_card ">
              <div
                className="white_card_body"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "80vh",
                }}
              >
                <span
                  style={{
                    fontSize: 19,
                    fontWeight: "bold",
                    borderBottom: "solid",
                    borderColor: "GrayText",
                    borderWidth: 1,
                  }}
                >
                  Branch List
                </span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "scroll",
                  }}
                >
                  {group().map((item, index) => {
                    return (
                      <span
                        key={index}
                        style={style}
                        type="button"
                        role="button"
                        onClick={() => _handleClick(item)}
                      >
                        {item.branch}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 card_height_100">
            <div
              className="white_card "
              style={{ height: "80vh", width: "100%" }}
            >
              <div
                className="white_card_body"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <span
                  style={{
                    fontSize: 19,
                    fontWeight: "bold",
                    borderBottom: "solid",
                    borderColor: "GrayText",
                    borderWidth: 1,
                  }}
                >
                  Branch Details
                  {Object.keys(branch).length === 0 ? (
                    <spa></spa>
                  ) : (
                    <span
                      className="float-right"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {branch.branch}
                      <span
                        className="white_btn3 mb-1"
                        style={{
                          height: "7px",
                          width: "7px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: "5px",
                        }}
                        type="button"
                        role="button"
                        title="print branch details"
                        onClick={() => _handlePrintAll()}
                      >
                        <i className="fa fa-print"></i>
                      </span>
                    </span>
                  )}
                </span>
                <span
                  style={{
                    fontSize: 15,
                    borderBottom: "solid",
                    borderColor: "#64c5b1",
                    borderWidth: 0.5,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    color: "#64c5b1",
                    marginTop: "10px",
                  }}
                >
                  <span>
                    # of Assets:{" "}
                    {Object.keys(branch).length === 0 ? (
                      <span></span>
                    ) : (
                      branch.assets.length
                    )}
                  </span>
                  <span>
                    Value of Asset:{" "}
                    {Object.keys(branch).length === 0 ? 0 : value}
                  </span>
                </span>
                <div className="row" style={{ height: "70vh" }}>
                  <div
                    className="col-md-4"
                    style={{
                      height: "100%",
                      borderRight: "solid",
                      borderColor: "#64c5b1",
                      marginRight: "10px",
                      borderWidth: 0.5,
                      display: "flex",
                      flexDirection: "column",
                      overflowY: "scroll",
                    }}
                  >
                    {deps.map((item, index) => {
                      return (
                        <span
                          key={index}
                          className="mt-2 pl-1"
                          type="button"
                          role="button"
                          onClick={() => _handleDeps(item)}
                        >
                          {item.department}
                        </span>
                      );
                    })}
                  </div>
                  <div
                    style={{
                      padding: "3px",
                      height: "65vh",
                      borderBottom: "solid",
                      borderColor: "#64c5b1",
                      borderWidth: 0.5,
                      width: "63%",
                    }}
                  >
                    <div
                      className="row"
                      style={{
                        width: "100%",
                        fontWeight: "bold",
                        borderBottom: "solid",
                        borderWidth: "0.5px",
                      }}
                    >
                      <span className="col-md-7">Serial Number</span>
                      <span className="col-md-5">Asset Type</span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        overflowY: "scroll",
                        height: "60vh",
                      }}
                    >
                      {depDetails.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="row mb-2"
                            style={{ width: "100%" }}
                            type="button"
                            role="button"
                            onClick={() => _handleAssetDetails(item)}
                          >
                            <div className="col-md-7">{item.SERIALNUMBER}</div>
                            <div className="col-md-5">{item.ASSETTYPE}</div>
                          </div>
                        );
                      })}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        height: "10%",
                      }}
                    >
                      <span
                        className="white_btn3 mb-1"
                        style={{
                          height: "5px",
                          width: "7px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: "5px",
                        }}
                        type="button"
                        role="button"
                        title="print assets in department"
                        onClick={() => _handlePrintDep()}
                      >
                        <i className="fa fa-print"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (redirect === "settings") {
    return <Redirect to="/main/settings" />;
  } else if (redirect === "assetDetsils") {
    return (
      <AssetDetails
        data={asset}
        goBack={_handleBackClick}
        loading={loading}
        departments={departments}
        onEditAsset={_handleEditAsset}
        onDelete={_handleDel}
        user={user}
        notify={notify}
        msg={msg}
        type={type}
        stopLoading={() => props.stopLoading()}
      />
    );
  }
}
