import { useState } from "react";
import Loaders from "../component/loaders/round";
import Notifications from "../component/notifications";
import PageTitle from "../component/pageTitle";

export default function AddUser(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const _handleSaveUser = (event) => {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      phone,
      email,
      password,
      role,
    };
    props.onSaveUser(data);
  };

  const _handleClose = () => {
    props.close();
  };

  return (
    <div>
      <PageTitle title="Users" subTitle="addUser" goBack={props.back} />
      <div className="row">
        <div className="col-lg-12 card_height_100">
          {props.notify ? (
            <Notifications
              type={props.type}
              message={props.msg}
              onAction={_handleClose}
            />
          ) : (
            <span></span>
          )}
          <div className="white_card mb_10">
            <div className="white_card_body row">
              <div className="col-md-6">
                <div className="white_box">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon3">
                        First Name:
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="basic-url"
                      aria-describedby="basic-addon3"
                      onChange={(e) =>
                        setFirstName(e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon3">
                        Last Name:
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="basic-url"
                      aria-describedby="basic-addon3"
                      onChange={(e) =>
                        setLastName(e.target.value.toUpperCase())
                      }
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon3">
                        Phone :
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      id="basic-url"
                      aria-describedby="basic-addon3"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  {props.loading ? (
                    <span class="btn btn-primary">
                      <Loaders loading={props.loading} />
                    </span>
                  ) : (
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={_handleSaveUser}
                    >
                      Save User
                    </button>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="white_box">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon3">
                        Email:
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="basic-url"
                      aria-describedby="basic-addon3"
                      onChange={(e) => setMail(e.target.value.toUpperCase())}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon3">
                        Password:
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      id="basic-url"
                      aria-describedby="basic-addon3"
                      type="password"
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text"
                        htmlFor="inputGroupSelect01"
                      >
                        Role
                      </label>
                    </div>
                    <select
                      className="custom-select"
                      id="inputGroupSelect01"
                      onChange={(e) => setRole(e.target.value.toUpperCase())}
                    >
                      <option>Select role.....</option>
                      <option value={"ADMINISTRATOR"}>ADMINISTRATOR</option>
                      <option value={"CLARK"}>
                        DATA ENTRY CLARCK
                      </option>
                      <option value={"CEO"}>CEO</option>
                      <option value={"ASSETS MANAGER"}>ASSETS MANAGER</option>
                    </select>
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
