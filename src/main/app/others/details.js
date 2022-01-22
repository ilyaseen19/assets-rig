import { useState } from "react";
import Loaders from "../component/loaders/round";
import Notifications from "../component/notifications";
import PageTitle from "../component/pageTitle";
import "../main.css";

export default function Details(props) {
  const [edit, setEdit] = useState(false);
  const [editL, setEditL] = useState(false);
  const [editM, setEditM] = useState(false);
  const [editP, setEditP] = useState(false);
  const [editR, setEditR] = useState(false);
  const [showNoti, setShownoti] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");

  const user = props.user;
  const loading = props.loading;
  const notify = props.notify;
  const msg = props.message;
  const type = props.type;

  const _back = () => {
    props.back();
  };

  const _handdleNoti = (check) => {
    if (check === "delete") {
      props.delete(user._id);
    } else {
      setShownoti(false);
      props.changeState();
    }
  };

  const _handleEdit = async (check) => {
    if (check === "f") {
      if (firstName === "") {
        props.changeState();
        return false;
      } else {
        const data = {
          id: user._id,
          firstName: firstName,
          lastName: user.LASTNAME,
          email: user.EMAIL,
          phone: user.PHONE,
          role: user.ROLE,
          password: user.PASSWORD,
        };
        props.editUser(data);
      }
    } else if (check === "l") {
      if (lastName === "") {
        props.changeState();
        return false;
      } else {
        const data = {
          id: user._id,
          firstName: user.FIRSTNAME,
          lastName: lastName,
          email: user.EMAIL,
          phone: user.PHONE,
          role: user.ROLE,
          password: user.PASSWORD,
        };
        props.editUser(data);
      }
    } else if (check === "e") {
      if (email === "") {
        props.changeState();
        return false;
      } else {
        const data = {
          id: user._id,
          firstName: user.FIRSTNAME,
          lastName: user.LASTNAME,
          email: email,
          phone: user.PHONE,
          role: user.ROLE,
          password: user.PASSWORD,
        };
        props.editUser(data);
      }
    } else if (check === "p") {
      if (phone === "") {
        props.changeState();
        return false;
      } else {
        const data = {
          id: user._id,
          firstName: user.FIRSTNAME,
          lastName: user.LASTNAME,
          email: user.EMAIL,
          phone: phone,
          role: user.ROLE,
          password: user.PASSWORD,
        };
        props.editUser(data);
      }
    } else if (check === "r") {
      if (role === "") {
        props.changeState();
        return false;
      } else {
        const data = {
          id: user._id,
          firstName: user.FIRSTNAME,
          lastName: user.LASTNAME,
          email: user.EMAIL,
          phone: user.PHONE,
          role: role,
          password: user.PASSWORD,
        };
        props.editUser(data);
      }
    }
  };

  return (
    <div>
      <PageTitle title="Users" subTitle="user" goBack={_back} />
      <div className="row">
        <div className="col-lg-12 card_height_100">
          <div className="white_card ">
            <div className="white_card_body row">
              <div className="col-md-6">
                {showNoti || notify ? (
                  <Notifications
                    type={showNoti ? "warning" : type}
                    message={showNoti ? "Are you sure you want to delete" : msg}
                    onAction={_handdleNoti}
                  />
                ) : (
                  <span></span>
                )}
                <div className="white_box">
                  <div className="profile-cart_2">
                    <div className="images">
                      <i
                        className="fas fa-user-alt myimg"
                        style={{ color: "GrayText", fontSize: 100 }}
                      ></i>
                    </div>
                    <h1>
                      <small>{user.FIRSTNAME + " " + user.LASTNAME}</small>
                    </h1>
                    <p></p>
                    <div
                      className="social-area"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      {loading ? (
                        <span class="btn btn-outline-primary mb-2">
                          <Loaders loading={loading} />
                        </span>
                      ) : (
                        <button
                          type="button"
                          class="btn btn-outline-primary mb-2"
                          onClick={() => setShownoti(true)}
                        >
                          <i class="fa fa-trash"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="white_box">
                  <div className="profile-cart_0 p-3">
                    <div className="centered">
                      <div className="input-group mb-3">
                        {edit ? (
                          <input
                            type="text"
                            className="form-control"
                            form
                            aria-checked
                            placeholder={user.FIRSTNAME}
                            aria-label="Recipient's username"
                            aria-describedby="button-addon-group"
                            onChange={(e) =>
                              setFirstName(e.target.value.toUpperCase())
                            }
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            form
                            aria-checked
                            placeholder={user.FIRSTNAME}
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
                                  props.stopLoading();
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
                                  onClick={() => _handleEdit("f")}
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
                              onClick={() => setEdit(true)}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="input-group mb-3">
                        {editL ? (
                          <input
                            type="text"
                            className="form-control"
                            form
                            aria-checked
                            placeholder={user.LASTNAME}
                            aria-label="Recipient's username"
                            aria-describedby="button-addon-group"
                            onChange={(e) =>
                              setLastName(e.target.value.toUpperCase())
                            }
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            form
                            aria-checked
                            placeholder={user.LASTNAME}
                            aria-label="Recipient's username"
                            disabled
                            aria-describedby="button-addon-group"
                          />
                        )}

                        <div className="input-group-append">
                          {editL ? (
                            <span>
                              <button
                                className="btn btn-light"
                                type="button"
                                id="button-addon-group"
                                onClick={() => {
                                  props.stopLoading();
                                  setEditL(false);
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
                                  onClick={() => _handleEdit("l")}
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
                              onClick={() => setEditL(true)}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="input-group mb-3">
                        {editM ? (
                          <input
                            type="text"
                            className="form-control"
                            form
                            aria-checked
                            placeholder={user.EMAIL}
                            aria-label="Recipient's username"
                            aria-describedby="button-addon-group"
                            onChange={(e) =>
                              setMail(e.target.value.toUpperCase())
                            }
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            form
                            aria-checked
                            placeholder={user.EMAIL}
                            aria-label="Recipient's username"
                            disabled
                            aria-describedby="button-addon-group"
                          />
                        )}
                        <div className="input-group-append">
                          {editM ? (
                            <span>
                              <button
                                className="btn btn-light"
                                type="button"
                                id="button-addon-group"
                                onClick={() => {
                                  props.stopLoading();
                                  setEditM(false);
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
                                  onClick={() => _handleEdit("e")}
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
                              onClick={() => setEditM(true)}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="input-group mb-3">
                        {editP ? (
                          <input
                            type="number"
                            className="form-control"
                            form
                            aria-checked
                            placeholder={user.PHONE}
                            aria-label="Recipient's username"
                            aria-describedby="button-addon-group"
                            onChange={(e) =>
                              setPhone(e.target.value.toUpperCase())
                            }
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            form
                            aria-checked
                            placeholder={user.PHONE}
                            aria-label="Recipient's username"
                            disabled
                            aria-describedby="button-addon-group"
                          />
                        )}
                        <div className="input-group-append">
                          {editP ? (
                            <span>
                              <button
                                className="btn btn-light"
                                type="button"
                                id="button-addon-group"
                                onClick={() => {
                                  props.stopLoading();
                                  setEditP(false);
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
                                  onClick={() => _handleEdit("p")}
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
                              onClick={() => setEditP(true)}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="input-group mb-3">
                        {editR ? (
                          <select
                            className="form-control"
                            onChange={(e) =>
                              setRole(e.target.value.toUpperCase())
                            }
                          >
                            <option>Select role.....</option>
                            <option value={"ADMINISTRATOR"}>
                              ADMINISTRATOR
                            </option>
                            <option value={"CLARK"}>DATA ENTRY CLARCK</option>
                            <option value={"CEO"}>CEO</option>
                            <option value={"ASSETs MANAGER"}>
                              ASSETs MANAGER
                            </option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            form
                            aria-checked
                            placeholder={user.ROLE}
                            aria-label="Recipient's username"
                            disabled
                            aria-describedby="button-addon-group"
                          />
                        )}
                        <div className="input-group-append">
                          {editR ? (
                            <span>
                              <button
                                className="btn btn-light"
                                type="button"
                                id="button-addon-group"
                                onClick={() => {
                                  props.stopLoading();
                                  setEditR(false);
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
                                  onClick={() => _handleEdit("r")}
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
                              onClick={() => setEditR(true)}
                            >
                              <i className="fa fa-edit"></i>
                            </button>
                          )}
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
}
