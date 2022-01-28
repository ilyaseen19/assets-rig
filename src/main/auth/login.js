import { useState } from "react";
import LoadingPage from "../app/component/loaders/loading";
import Notifications from "../app/component/notifications";
import log_bg from "../app/component/images/log_bg.jpg";
import loginback from "../app/component/images/login-hero.svg";
import logo from "../app/component/images/assets_reg_1.png";
import "../app/main.css";

function Login(props) {
  const [key, setKey] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _handleLogin = () => {
    const data = {
      email,
      password,
    };
    props._login(data);
  };

  // handle api key
  const _handleConfi = async () => {
    props.configure(key);
  };

  const _handleFetchAll = async () => {
    props.loadAllData();
  };

  if (props._redirect) {
    return (
      <LoadingPage
        type="loading"
        loaded={props.moveTODash}
        _fetchAll={_handleFetchAll}
      />
    );
  } else {
    return (
      <div id="login-container">
        <div className="col">
          <div
            className="row justify-content-center"
            style={{
              backgroundColor: "#64c5b1",
              height: "100%",
            }}
          >
            <div
              style={{
                height: "20%",
                background: `url(${log_bg})`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <img src={logo} width={100} height={100} alt="assets rig" />
              <span
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 30,
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                <span>Best Cloud Based Assets Managenent System</span>
                <div>ASSETS REG</div>
                <span> Record, Identify, Report</span>
              </span>
            </div>
            {/* <div
              className="col-md-6"
              style={{
                width: "80%",
                height: "80%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: `url(${loginback})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div> */}
            <div className="col-md-6">
              {/* sign_in  */}
              {props.myKey !== "" ? (
                <div className="modal-content cs_modal">
                  <div className="modal-header justify-content-center theme_bg_1">
                    <h5 className="modal-title text_white">
                      <strong>ASSETS</strong>
                      <strong> RIG</strong>
                    </h5>
                  </div>
                  <div className="modal-body">
                    <form>
                      {props.notify ? (
                        <Notifications
                          type={props.type}
                          message={props.message}
                          onAction={props.close}
                        />
                      ) : (
                        <span></span>
                      )}
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Your Email"
                          required
                          aria-required
                          onChange={(e) =>
                            setEmail(e.target.value.toUpperCase())
                          }
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                        />
                      </div>
                      {props.loader ? (
                        <Notifications
                          type="info_load"
                          message="Loging into system, Please wait!"
                        />
                      ) : (
                        <span
                          className="btn_1 full_width text-center"
                          type="button"
                          role="button"
                          onClick={() => _handleLogin()}
                        >
                          Log in
                        </span>
                      )}
                    </form>
                  </div>
                </div>
              ) : (
                <div className="modal-content cs_modal">
                  <div className="modal-header justify-content-center theme_bg_1">
                    <h5 className="modal-title text_white">
                      <strong>ASSETS</strong>
                      <strong> RIG</strong>
                    </h5>
                  </div>
                  <div className="modal-body">
                    <form>
                      {props.notify ? (
                        <Notifications
                          type={props.type}
                          message={props.message}
                          onAction={props.close}
                        />
                      ) : (
                        <span></span>
                      )}
                      <h3 className="centered">
                        Please Enter Your Api Key to Configure Your System
                      </h3>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          style={{ textAlign: "center" }}
                          placeholder="Enter Your API KEY Here"
                          required
                          aria-required
                          onChange={(e) => setKey(e.target.value)}
                        />
                      </div>
                      {props.loader ? (
                        <Notifications
                          type="info_load"
                          message="configuring system, Please wait!"
                        />
                      ) : (
                        <span
                          className="btn_1 full_width text-center"
                          type="button"
                          role="button"
                          onClick={() => _handleConfi()}
                        >
                          Configure
                        </span>
                      )}
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default Login;
