import { useState } from "react";
import LoadingPage from "../component/loaders/loading";
import Notifications from "../component/notifications";
import PageTitle from "../component/pageTitle";
import Users from "../others/users";

export default function Settings(props) {
  const [redirect, setRdirect] = useState("settings");
  const [types, setTypes] = useState("");
  const [depart, setDep] = useState("");
  const [init, setInit] = useState("");
  const [usn, setusn] = useState(false);
  const [usmsg, setusmg] = useState("");
  const [ustype, setusType] = useState("");
  const [branch, setBranch] = useState("");

  const users = props.data;
  const notify = props.notify;
  const msg = props.message;
  const type = props.type;
  const loading = props.loading;
  const userDirect = props.redirect;
  const user = props.user;

  const _handleUsers = () => {
    if (user.ROLE === "CLARK" || user.ROLE === "CEO") {
      setusType("danger");
      setusmg("You are not authorised to view this page!");
      setusn(true);
      return false;
    } else {
      setRdirect("users");
    }
  };

  const _handleBack = () => {
    setRdirect("settings");
  };
  const _handleLogOut = () => {
    localStorage.clear();
    setRdirect("logout");
  };

  const _handleAddType = async (event) => {
    event.preventDefault();
    if (user.ROLE === "CEO") {
      setusType("danger");
      setusmg("You are not authorised to view this page!");
      setusn(true);
      return false;
    } else {
      props.onAddType(types);
    }
  };

  const _handleAddbranch = () => {
    if (user.ROLE === "CEO") {
      setusType("danger");
      setusmg("You are not authorised to view this page!");
      setusn(true);
      return false;
    } else {
      props.onAddBranch(branch);
    }
  };

  const _handleAddDep = async (event) => {
    event.preventDefault();
    if (user.ROLE === "CEO") {
      setusType("danger");
      setusmg("You are not authorised to view this page!");
      setusn(true);
      return false;
    } else {
      props.onAddDep(depart);
    }
  };

  // add company initials to the system
  const _handleAddInit = async () => {
    if (user.ROLE === "CEO") {
      setusType("danger");
      setusmg("You are not authorised to view this page!");
      setusn(true);
      return false;
    } else {
      props.onAddInit(init);
    }
  };

  const _handleClose = (data) => {
    setusn(false);
    props.onClose(data);
  };

  const _handleGetUsers = async (data) => {
    props.fetchUsers(data);
  };

  const _handleAddUsers = (data) => {
    props.onAddUsers(data);
  };

  const _handleDelUser = async (id) => {
    props.onDelUser(id);
  };

  const _handleEditUser = (data) => {
    props.editUser(data);
  };

  const _handleChangeStsate = () => {
    props.changeState();
  };

  if (redirect === "users") {
    return (
      <Users
        back={_handleBack}
        getUsers={_handleGetUsers}
        data={users}
        addUsers={_handleAddUsers}
        notify={notify}
        message={msg}
        type={type}
        loading={loading}
        onClose={_handleClose}
        redirect={userDirect}
        move={props.move}
        delete={_handleDelUser}
        editUser={_handleEditUser}
        onChangeState={_handleChangeStsate}
        stopLoading={() => props.stopLoading()}
      />
    );
  } else if (redirect === "settings") {
    return (
      <div>
        <PageTitle title="Settings Page" onLogOut={_handleLogOut} />
        <div className="row">
          <div className="col-lg-12 card_height_100">
            <div className="white_card mb_20">
              <div className="white_card_body row">
                <div className="col-lg-8 card_height_100">
                  <div className="white_card mb_20">
                    <div className="white_card_header">
                      <div className="box_header m-0">
                        <div className="main-title">
                          <h3 className="m-0">System Settings </h3>
                        </div>
                        <div className="float-lg-right float-none sales_renew_btns justify-content-end" />
                      </div>
                    </div>
                    <div className="white_card_body">
                      <form>
                        {props.notify || usn ? (
                          <Notifications
                            type={props.type || ustype}
                            message={props.message || usmsg}
                            onAction={_handleClose}
                          />
                        ) : (
                          <></>
                        )}
                        <small style={{ color: "red" }}>
                          Enter new asset type and save.
                        </small>
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Add New Asset Type"
                            aria-label="Add New Asset Type"
                            aria-describedby="button-addon-group"
                            onChange={(e) =>
                              setTypes(e.target.value.toUpperCase())
                            }
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-light"
                              type="submit"
                              onClick={_handleAddType}
                            >
                              Save Type
                            </button>
                          </div>
                        </div>
                        <small style={{ color: "red" }}>
                          Enter new department name and save.
                        </small>
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Create Department"
                            aria-label="Create Department"
                            aria-describedby="button-addon-group"
                            onChange={(e) =>
                              setDep(e.target.value.toUpperCase())
                            }
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-light"
                              type="button"
                              role="button"
                              onClick={_handleAddDep}
                            >
                              Save Department
                            </button>
                          </div>
                        </div>
                        <small style={{ color: "red" }}>
                          Enter a branch of your company and save.
                        </small>
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Add new branch"
                            aria-label="Add new branch"
                            onChange={(e) =>
                              setBranch(e.target.value.toUpperCase())
                            }
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-light"
                              type="button"
                              role="button"
                              onClick={(e) => _handleAddbranch(e)}
                            >
                              Add Brach
                            </button>
                          </div>
                        </div>
                        <small style={{ color: "red" }}>
                          Enter your company/organisational code,
                          eg: NHS/ASH/RHD/OE/R34/
                        </small>
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Add Company/Organisation's Iniatials"
                            aria-label="Add Company/Organisation's Iniatials"
                            onChange={(e) =>
                              setInit(e.target.value.toUpperCase())
                            }
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-light"
                              type="button"
                              role="button"
                              onClick={(e) => _handleAddInit(e)}
                            >
                              Add Initials
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn btn-outline-primary mb-3"
                          onClick={() => _handleUsers()}
                        >
                          Users
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 card_height_100 mb_20">
                  <div className="white_card">
                    <div className="white_card_body p-0">
                      <div className="card_container">
                        <div className="white_box">
                          <div className="">
                            <h4
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              {props.user.FIRSTNAME} {props.user.LASTNAME}
                            </h4>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <div> {props.user.EMAIL}</div>
                              <div> {props.user.PHONE}</div>
                              <div> {props.user.ROLE}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (redirect === "logout") {
    return <LoadingPage type="login" />;
  }
}
