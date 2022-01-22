import { useState } from "react";
import { Redirect } from "react-router";
import PageTitle from "../component/pageTitle";
import Chart from "../component/chart";
import cloud from "../component/images/cloud.jpeg";

export default function Dashboard(props) {
  const [redirect, setRedirect] = useState("dashboard");
  const assets = props.assets;
  const sorted = props.sorted;
  const status = props.status;
  const value = props.value;

  const _goToreport = () => {
    setRedirect("report");
  };

  if (redirect === "dashboard") {
    return (
      <div>
        <PageTitle
          title="Dashboard"
          createAsset={props.onCreate}
          onSettingsClicked={() => setRedirect("setings")}
        />
        <div className="row">
          <div className="col-lg-8 card_height_100">
            <div className="white_card mb_20">
              <div className="white_card_body centered" style={{ height: 350 }}>
                {assets.length > 0 ? (
                  <Chart data={sorted} />
                ) : (
                  <span>
                    <h5>No Asset has been added to the system yet!</h5>
                  </span>
                )}
              </div>
            </div>
            <div className="white_card mb_20">
              <div
                className="white_card_body renew_report_card d-flex align-items-center justify-content-between flex-wrap"
                style={{
                  background: `url(${cloud})`,
                }}
              >
                <div className="renew_report_left">
                  <h4 className="f_s_19 f_w_600 color_theme2 mb-0">
                    View And Download Report for Assets
                  </h4>
                  <p className="color_gray2 f_s_12 f_w_600">
                    This could be any information relating to a particular
                    asset.
                  </p>
                </div>
                <div className="create_report_btn">
                  <span
                    type="button"
                    role="button"
                    onClick={() => _goToreport()}
                    className="btn_1 mt-1 mb-1"
                  >
                    View Report
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 card_height_100 mb_20">
            <div className="white_card">
              <div className="white_card_header">
                <div className="box_header m-0">
                  <div className="main-title">
                    <h3 className="m-0">Assets Statistics</h3>
                  </div>
                </div>
              </div>
              <div className="white_card_body p-0">
                <div className="card_container">
                  <div
                    className="card bg-warning"
                    style={{ height: 80, padding: 10, marginTop: 10 }}
                  >
                    Total Number Of Assets:
                    {assets.length > 0 ? (
                      <h3 style={{ textAlign: "right" }}>{assets.length}</h3>
                    ) : (
                      <span>No data found!</span>
                    )}
                  </div>
                  <div
                    className="card"
                    style={{
                      height: 80,
                      backgroundColor: "#17a2c8",
                      padding: 10,
                      marginTop: 10,
                      color: "white",
                    }}
                  >
                    Number Of Active Assets:
                    {assets.length > 0 ? (
                      <h3
                        style={{
                          textAlign: "right",
                        }}
                      >
                        {status.ACTIVE}
                      </h3>
                    ) : (
                      <span>No data found!</span>
                    )}
                  </div>
                  <div
                    className="card"
                    style={{
                      height: 80,
                      backgroundColor: "#17a2e5",
                      padding: 10,
                      marginTop: 10,
                      color: "white",
                    }}
                  >
                    Number Of In-Active Assets:
                    {assets.length > 0 ? (
                      <h3
                        style={{
                          textAlign: "right",
                        }}
                      >
                        {status.IN_ACTIVE}
                      </h3>
                    ) : (
                      <span>No data found!</span>
                    )}
                  </div>
                  <div
                    className="card"
                    style={{
                      height: 80,
                      backgroundColor: "#17a2b8",
                      padding: 10,
                      marginTop: 10,
                      color: "white",
                    }}
                  >
                    Total Value Of Assets:
                    {assets.length > 0 ? (
                      <h3
                        style={{
                          textAlign: "right",
                        }}
                      >
                        GHC {value}
                      </h3>
                    ) : (
                      <span>No data found!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (redirect === "report") {
    return <Redirect to="/main/reports" />;
  } else if (redirect === "setings") {
    return <Redirect to="/main/settings" />;
  }
}
