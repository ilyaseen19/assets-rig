import { useEffect, useState } from "react";
import setIcon from "./images/img/menu-icon/5.svg";
import { functions } from "../funtions/index";

export default function PageTitle(props) {
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    getKey();
  });

  const getKey = async () => {
    const res = await functions._checkApiKey();
    const company = res.split("-")[1];
    setCompanyName(company);
  };

  const renderTitle = () => {
    if (props.title === "Users") {
      return props.subTitle === "user" ? (
        <div className="row align-items-center justify-content-between">
          <span
            type="button"
            role="button"
            className="white_btn3"
            style={{ marginRight: "10px" }}
            onClick={props.goBack}
          >
            Back
          </span>
        </div>
      ) : (
        <div className="row align-items-center justify-content-between">
          {props.subTitle === "addUser" ? (
            <span>
              <span
                type="button"
                role="button"
                className="white_btn3"
                style={{ marginRight: "10px" }}
                onClick={props.goBack}
              >
                Back
              </span>
            </span>
          ) : (
            <span>
              <span
                type="button"
                role="button"
                className="white_btn3"
                style={{ marginRight: "10px" }}
                onClick={props.addUser}
              >
                Add New User
              </span>
              <span
                type="button"
                role="button"
                className="white_btn3"
                style={{ marginRight: "10px" }}
                onClick={props.goBack}
              >
                Back
              </span>
            </span>
          )}
        </div>
      );
    } else if (props.title === "Add Asset") {
      return (
        <div className="row align-items-center justify-content-between">
          <span
            type="button"
            role="button"
            className="white_btn3"
            style={{ marginRight: "10px" }}
            onClick={props.goBack}
          >
            Back
          </span>
        </div>
      );
    } else if (props.title === "Settings Page") {
      return (
        <div className="row align-items-center justify-content-between"></div>
      );
    } else if (props.title === "About") {
      return (
        <div className="row align-items-center justify-content-between"></div>
      );
    } else if (props.title === "Help Page") {
      return (
        <div className="row align-items-center justify-content-between"></div>
      );
    } else if (props.title === "View Report") {
      return (
        <div className="row align-items-center justify-content-between">
          <span
            type="button"
            role="button"
            className="white_btn3"
            style={{ marginRight: "10px" }}
            onClick={props.goBack}
          >
            Back
          </span>
          <span
            type="button"
            role="button"
            className="white_btn3"
            style={{ marginRight: "10px" }}
          >
            Print
          </span>
        </div>
      );
    } else if (props.title === "Reports") {
      return (
        <div className="row align-items-center justify-content-between">
          <div
            className="profile_info"
            type="button"
            role="button"
            style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}
            onClick={() => props.onSettingsClicked()}
          >
            <img src={setIcon} alt="#" />
          </div>
        </div>
      );
    } else if (props.title === "Asset Details") {
      return (
        <div className="row align-items-center justify-content-between">
          <span
            type="button"
            role="button"
            className="white_btn3"
            style={{ marginRight: "10px" }}
            onClick={props.onBack}
          >
            Back
          </span>
        </div>
      );
    } else if (props.title === "Create Report") {
      return (
        <div className="row align-items-center justify-content-between">
          <span
            type="button"
            role="button"
            className="white_btn3"
            style={{ marginRight: "10px" }}
            onClick={props.goBack}
          >
            Back
          </span>
        </div>
      );
    } else {
      return (
        <div className="row align-items-center justify-content-between">
          <span
            type="button"
            role="button"
            className="white_btn3"
            style={{ marginRight: "10px" }}
            onClick={props.createAsset}
          >
            Create Asset
          </span>
          <div
            className="profile_info"
            type="button"
            role="button"
            style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}
            onClick={() => props.onSettingsClicked()}
          >
            <img src={setIcon} alt="#" />
          </div>
        </div>
      );
    }
  };
  return (
    <div className="row">
      <div className="col-12">
        <div className="page_title_box d-flex align-items-center justify-content-between">
          <div className="page_title_left">
            <h3 className="f_s_30 f_w_700 text_white">{props.title}</h3>
            {props.title === "Users" ? (
              props.subTitle === "user" ? (
                <ol className="breadcrumb page_bradcam mb-0">
                  <li className="breadcrumb-item">
                    <span>AssetsReg </span>
                  </li>
                  <li className="breadcrumb-item">
                    <span>Settings </span>
                  </li>
                  <li className="breadcrumb-item">
                    <span>Users </span>
                  </li>
                  <li className="breadcrumb-item">
                    <span>{props.subTitle}</span>
                  </li>
                </ol>
              ) : props.subTitle === "addUser" ? (
                <ol className="breadcrumb page_bradcam mb-0">
                  <li className="breadcrumb-item">
                    <span>AssetsReg </span>
                  </li>
                  <li className="breadcrumb-item">
                    <span>Settings </span>
                  </li>
                  <li className="breadcrumb-item">
                    <span>users </span>
                  </li>
                  <li className="breadcrumb-item">
                    <span>{props.subTitle}</span>
                  </li>
                </ol>
              ) : (
                <ol className="breadcrumb page_bradcam mb-0">
                  <li className="breadcrumb-item">
                    <span>AssetsReg </span>
                  </li>
                  <li className="breadcrumb-item">
                    <span>Settings </span>
                  </li>
                  <li className="breadcrumb-item">
                    <span>{props.title}</span>
                  </li>
                </ol>
              )
            ) : (
              <ol className="breadcrumb page_bradcam mb-0">
                <li className="breadcrumb-item">
                  <span>AssetsReg </span>
                </li>
                <li className="breadcrumb-item">
                  <span>{props.title}</span>
                </li>
              </ol>
            )}
          </div>
          <div>
            <h2
              style={{
                fontWeight: "bold",
              }}
            >
              {companyName}
            </h2>
          </div>
          {renderTitle()}
        </div>
      </div>
    </div>
  );
}
