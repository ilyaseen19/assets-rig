import { useState } from "react";
import Loaders from "../component/loaders/round";
import Notifications from "../component/notifications";
import PageTitle from "../component/pageTitle";

export default function CreReport(props) {
  const [msg, setMsg] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [notify, setNotify] = useState(false);
  const [type, settype] = useState("");

  const asset = props.data;
  const loading = props.loading;
  const user = props.user;

  const _handleGoBack = () => {
    props.back();
  };

  const _handleAction = () => {
    setNotify(false)
  }

  const _handleSaveRep = () => {
    if (msg === "") {
      settype("danger");
      setMessage("Message cannot be empty!");
      setNotify(true);
    } else {
      const data = {
        serialNumber: asset.SERIALNUMER,
        assetType: asset.ASSETTYPE,
        message: msg,
        notes: notes,
        creator: user.FIRSTNAME + " " + user.LASTNAME,
      };
      props.onAddRep(data);
    }
  };

  return (
    <div>
      <PageTitle title="Create Report" goBack={_handleGoBack} />
      <div className="row ">
        <div className="col-12 QA_section">
          <div className="card QA_table ">
            <div className="card-header">
              Asset Serial Number: <strong>{asset.SERIALNUMER}</strong>
              <span className="float-right">
                {" "}
                <strong>Created By:</strong> User Name
              </span>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-sm-6">
                  <h6>
                    Serial Number: <strong>{asset.SERIALNUMER}</strong>
                  </h6>
                  <h6 className="mb-3">
                    ASSET TYPE: <strong>{asset.ASSETTYPE}</strong>
                  </h6>
                  <div>
                    <strong>Status:</strong>
                  </div>
                  <h6>
                    <strong>{asset.STATUS}</strong>
                  </h6>
                  <div>
                    <strong>Codition:</strong>
                  </div>
                  <h6>
                    <strong>{asset.CONDITION}</strong>
                  </h6>
                  <div>Brand:</div>
                  <div>
                    <strong>{asset.BRAND}</strong>
                  </div>
                  <div>Department:</div>
                  <div>
                    <strong>{asset.DEPARTMENT}</strong>
                  </div>
                </div>
                <div className="col-sm-6">
                  {notify || props.notify ? (
                    <Notifications
                      type={type || props.type}
                      message={message || props.msg}
                      onAction={_handleAction}
                    />
                  ) : (
                    <span></span>
                  )}
                  <h6 className="mb-3">Report</h6>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Report Message</span>
                    </div>
                    <textarea
                      className="form-control"
                      aria-label="with textarea"
                      placeholder="Type your report message here"
                      style={{ marginTop: 0, marginBottom: 0, height: 66 }}
                      onChange={(e) => setMsg(e.target.value)}
                    ></textarea>
                  </div>
                  <div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          Additional Notes
                        </span>
                      </div>
                      <textarea
                        className="form-control"
                        aria-label="with textarea"
                        placeholder="Type any additional notes here"
                        style={{ marginTop: 0, marginBottom: 0, height: 66 }}
                        onChange={(e) => setNotes(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  {loading ? (
                    <Loaders loading={loading} />
                  ) : (
                    <span
                      type="button"
                      role="button"
                      className="btn green_bg text-white px-4 d-inline-block ml-2"
                      onClick={() => _handleSaveRep()}
                    >
                      <i className="fa fa-save mr-3" />
                      Save Report
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
