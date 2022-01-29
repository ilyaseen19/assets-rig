import { useState } from "react";
import Loaders from "../component/loaders/round";
import Notifications from "../component/notifications";
import PageTitle from "../component/pageTitle";

export default function AddAsset(props) {
  const [type, setType] = useState("");
  const [depart, setDepart] = useState("");
  const [brand, setBrand] = useState("");
  const [branch, setBranch] = useState("");
  const [Qt, setQ] = useState("");
  const [dp, setDP] = useState("");
  const [dntBy, setdntBy] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [date, setDate] = useState("");
  const [init, setInit] = useState("");

  const [mtype, setmType] = useState("");
  const [msg, setMsg] = useState("");
  const [notify, setNotify] = useState(false);

  const types = props.assetTypes;
  const deps = props.departments;
  const initials = props.initials;
  const loading = props.loader;
  const user = props.user;
  const branches = props.branches;

  const _handleCreatAsset = async () => {
    if (user.ROLE === "CEO") {
      setmType("danger");
      setMsg("You are not authorised to perform this task!");
      setNotify(true);
    } else if (
      type === "" ||
      depart === "" ||
      brand === "" ||
      dp === "" ||
      price === "" ||
      condition === "" ||
      date === "" ||
      Qt === "" ||
      init === ""
    ) {
      setmType("danger");
      setMsg("All fields are required!");
      setNotify(true);
    } else if (dp === "DONATED" && dntBy === "") {
      setmType("danger");
      setMsg("Please provide a doner!");
      setNotify(true);
    } else {
      const data = {
        type,
        depart,
        brand,
        dp,
        price,
        condition,
        date,
        init,
        Qt,
        branch,
        dntBy,
      };
      props.onAdd(data);
    }
  };

  const _goback = () => {
    props.stopLoading();
    props.onBack();
  };

  return (
    <div>
      <PageTitle title="Add Asset" goBack={() => _goback()} />
      <div className="row">
        <div className="col-lg-12 card_height_100">
          <div className="white_card mb_10">
            {props.notify || notify ? (
              <Notifications
                type={props.type || mtype}
                message={props.message || msg}
                onAction={() => setNotify(false)}
              />
            ) : (
              <></>
            )}
            <div className="white_card_body row">
              <div className="col-md-6">
                <div className="white_box">
                  {types.length === 0 ? (
                    <small style={{ color: "red" }}>
                      Please add asset type in seetings page first.
                    </small>
                  ) : (
                    <span></span>
                  )}
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text"
                        htmlFor="inputGroupSelect01"
                      >
                        Asset Type:
                      </label>
                    </div>
                    {types.length === 0 ? (
                      <select className="custom-select" disabled>
                        <option>No asset type added yet</option>
                      </select>
                    ) : (
                      <select
                        className="custom-select"
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option>Select asset type</option>
                        {types.map((item, index) => {
                          return (
                            <option value={item.type} key={index}>
                              {item.type}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  </div>
                  {branches.length === 0 ? (
                    <small style={{ color: "red" }}>
                      Please add a branch in settings page first!.
                    </small>
                  ) : (
                    <small style={{ color: "red" }}>
                      Branch is not required!.
                    </small>
                  )}
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text"
                        htmlFor="inputGroupSelect01"
                      >
                        Branch:
                      </label>
                    </div>
                    {branches.length === 0 ? (
                      <select className="custom-select" disabled>
                        <option>Select Branch</option>
                      </select>
                    ) : (
                      <select
                        className="custom-select"
                        onChange={(e) => setBranch(e.target.value)}
                      >
                        <option>Select Branch</option>
                        {branches.map((item, index) => {
                          return (
                            <option value={item.type} key={index}>
                              {item.type}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  </div>
                  {deps.length === 0 ? (
                    <small style={{ color: "red" }}>
                      Please add department in settings page first!.
                    </small>
                  ) : (
                    <span></span>
                  )}
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text"
                        htmlFor="inputGroupSelect01"
                      >
                        Department:
                      </label>
                    </div>
                    {deps.length === 0 ? (
                      <select className="custom-select" disabled>
                        <option>No department added yet</option>
                      </select>
                    ) : (
                      <select
                        className="custom-select"
                        onChange={(e) => setDepart(e.target.value)}
                      >
                        <option>Select department</option>
                        {deps.map((item, index) => {
                          return (
                            <option value={item.type} key={index}>
                              {item.type}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon3">
                        Brand:
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setBrand(e.target.value.toUpperCase())}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text"
                        htmlFor="inputGroupSelect01"
                      >
                        Donated / Purchased:
                      </label>
                    </div>
                    <select
                      className="custom-select"
                      onChange={(e) => setDP(e.target.value.toUpperCase())}
                    >
                      <option>Choose...</option>
                      <option value={"DONATED"}>DONATED</option>
                      <option value={"PURCHASED"}>PURCHASED</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="white_box">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text"
                        htmlFor="inputGroupSelect01"
                      >
                        Organisation's Code:
                      </label>
                    </div>
                    {initials.length === 0 ? (
                      <select className="custom-select" disabled>
                        <option>No Organisational Code added yet</option>
                      </select>
                    ) : (
                      <select
                        className="custom-select"
                        onChange={(e) => setInit(e.target.value)}
                      >
                        <option>Select Organisation's code</option>
                        {initials.map((item, index) => {
                          return (
                            <option value={item.data} key={index}>
                              {item.data}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon3">
                        Value:
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => setPrice(e.target.value.toUpperCase())}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon3">
                        Quantity:
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => setQ(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon3">
                        Condition:
                      </span>
                    </div>
                    <select
                      className="custom-select"
                      onChange={(e) =>
                        setCondition(e.target.value.toUpperCase())
                      }
                    >
                      <option>Select condition</option>
                      <option value={"NEW"}>NEW</option>
                      <option value={"OLD"}>OLD</option>
                      <option value={"REPAIRS"}>REPAIRS</option>
                      <option value={"DAMAGED"}>DAMAGED</option>
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon3">
                        Date Purchased / Donated:
                      </span>
                    </div>
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  {dp === "DONATED" ? (
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon3">
                          Donated BY:
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setdntBy(e.target.value.toUpperCase())}
                      />
                    </div>
                  ) : (
                    <span></span>
                  )}
                  {loading ? (
                    <span className="btn btn-primary">
                      <Loaders loading={loading} />
                    </span>
                  ) : (
                    <span
                      type="button"
                      className="btn btn-primary"
                      onClick={() => _handleCreatAsset()}
                    >
                      Save Asset
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
