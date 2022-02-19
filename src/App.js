import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./main/auth/login";
import LoadingPage from "./main/app/component/loaders/loading";
import MainPage from "./main/app/main";
import _fetchAssets from "./main/app/funtions";
import { functions } from "./main/app/funtions";
const { Data } = require("./main/app/funtions/data");
const keyStoreDbInstance = Data.keyStoreDbInstance;
const typesStore = Data.assetTypeDbInstance;
const departmentStore = Data.departmentDbInstance;
const apiKeyUrl = Data.apiKeyCheckUrl;
const usersBaseUrl = Data.usersBaseUrl;
const initialsStore = Data.initDbInstance;

function App() {
  const [isKey, setIsKey] = useState("");
  const [loader, setLoader] = useState(false);
  const [notify, setNotify] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");
  const [logDriect, setLogDirect] = useState(false);
  const [move, setMove] = useState("loading");
  const [assets, setAssets] = useState([]);
  const [users, setUsers] = useState([]);
  const [types, setTypes] = useState([]);
  const [department, setDepartment] = useState([]);
  const [initials, setInitials] = useState([]);
  const [sortedCond, setSortedCond] = useState({});
  const [sortedStatus, setSortedStauts] = useState({});
  const [value, setValue] = useState(0);

  useEffect(() => {
    _checkApiKey();
    _getTypes();
    _getDepartments();
    _getInitial();
  }, []);

  // check api key
  const _checkApiKey = async () => {
    await keyStoreDbInstance.readAll().then((res) => {
      if (res.length !== 0) {
        setIsKey(res[0].key);
      }
    });
  };

  // read all asset types
  const _getTypes = async () => {
    await typesStore.readAll().then((res) => {
      if (res.length !== 0) {
        return setTypes(res);
      }
    });
  };

  // read all departments
  const _getDepartments = async () => {
    await departmentStore.readAll().then((res) => {
      if (res.length !== 0) {
        setDepartment(res);
      }
    });
  };

  // read all initilas
  const _getInitial = async () => {
    const res = await functions._getInitials();
    if (res.length > 0) {
      setInitials(res[0].data);
    }
  };

  // configure system with  api key
  const _handleConfig = async (key) => {
    if (key === "") {
      setType("danger");
      setMsg("Please the field cannot be empty!");
      setNotify(true);
    } else if (key.length < 10) {
      setType("danger");
      setMsg("Invalid key, Please try again!");
      setNotify(true);
    } else {
      setLoader(true);
      fetch(apiKeyUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: key,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success === 1) {
            keyStoreDbInstance.create({ key: key });
            setIsKey(key);
            setLoader(false);
          } else {
            setLoader(false);
            setType("danger");
            setMsg(res.message);
            setNotify(true);
          }
        });
    }
  };

  // handle login
  const _handleLog = async (data) => {
    const { email, password } = data;
    const apiKey = isKey + "-u";
    if (email === "" || password === "") {
      setType("danger");
      setMsg("Please the field cannot be empty!");
      setNotify(true);
    } else if (password < 10) {
      setType("danger");
      setMsg("Either email or password is wrong, Please try again!");
      setNotify(true);
    } else {
      setLoader(true);
      fetch(usersBaseUrl + "login/" + apiKey, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          if (res.success === 1) {
            const data = res.data;
            localStorage.setItem("user", JSON.stringify(data));
            setLoader(false);
            setMove("loading");
            setLogDirect(true);
          } else {
            setLoader(false);
            setType("danger");
            setMsg(res.message);
            setNotify(true);
          }
        });
    }
  };

  // load data concurently
  const _fetchAll = async () => {
    const data = await functions._FetchallDAta(isKey);
    if (data.length > 0) {
      const users = data[0];
      const assets = data[1];
      if (users.success === 0) {
        // setType("danger");
        // setMsg(
        //   "No Users found on the system, Please use the right api key provided to you!"
        // );
        // setNotify(true);
        return false;
      } else {
        setUsers(users.data);
        setLoader(false);
        setMove("dashboard");
      }
      if (assets.success === 0) {
        // setType("danger");
        // setMsg(
        //   "No Assets found on the system, Please use the right api key provided to you!"
        // );
        // setNotify(true);
        return false;
      } else {
        setAssets(assets.data);
        setLoader(false);
        _sortAssetsCond(assets.data);
        _sortAssetsStatus(assets.data);
        _valuateAssets(assets.data);
        setMove("dashboard");
      }
    } else {
      setType("danger");
      setMsg(
        "No Data found on the system, Please use the right api key provided to you!"
      );
      setNotify(true);
    }
  };

  const _handlegetUsers = async () => {
    const us = await functions._getUsers();
    setUsers(us);
  };

  const _handleGetAssets = async () => {
    var res = 0;
    const as = await functions._fetchAssets();
    if (as !== null) {
      setAssets(as);
      _sortAssetsCond(as);
      _sortAssetsStatus(as);
      _valuateAssets(as);
      res = 1;
    } else {
      setAssets([]);
      res = 0;
    }
    return res;
  };

  // handle sort assets
  const _sortAssetsCond = async (data) => {
    if (data !== null || data !== undefined) {
      const groupInfo = data.reduce((groups, item) => {
        const {
          NEW = 0,
          OLD = 0,
          DAMAGED = 0,
          REPAIRS = 0,
          TRANSFERED = 0,
        } = groups;
        if (item.CONDITION === "NEW") {
          return { ...groups, NEW: NEW + 1 };
        } else if (item.CONDITION === "OLD") {
          return { ...groups, OLD: OLD + 1 };
        } else if (item.CONDITION === "DAMAGED") {
          return { ...groups, DAMAGED: DAMAGED + 1 };
        } else if (item.CONDITION === "REPAIRS") {
          return { ...groups, REPAIRS: REPAIRS + 1 };
        } else if (item.CONDITION === "TRANSFERED") {
          return { ...groups, TRANSFERED: TRANSFERED + 1 };
        }
      }, {});
      setSortedCond(groupInfo);
    }
  };

  // handle sort assets
  const _sortAssetsStatus = async (data) => {
    if (data !== null || data !== undefined) {
      const groupInfo = data.reduce((groups, item) => {
        const { ACTIVE = 0, IN_ACTIVE = 0 } = groups;
        if (item.STATUS === "ACTIVE") {
          return { ...groups, ACTIVE: ACTIVE + 1 };
        } else if (item.STATUS === "IN-ACTIVE") {
          return { ...groups, IN_ACTIVE: IN_ACTIVE + 1 };
        }
      }, {});
      setSortedStauts(groupInfo);
    }
  };

  // handle valuate assets
  const _valuateAssets = async (data) => {
    if (data !== null || data !== undefined) {
      let value = 0;
      data.forEach((item) => {
        value += parseInt(item.VALUE);
      });
      setValue(value);
    }
  };

  // handle add assets type
  const _addTypes = async (data) => {
    if (data === "") {
      setType("danger");
      setMsg("Asset Type cannot be empty!");
      setNotify(true);
    } else if (types.some((item) => item.type === data)) {
      setType("danger");
      setMsg("This Asset Type Already Exist!");
      setNotify(true);
    } else {
      setType("success");
      setMsg("Asset type added succefully!");
      setNotify(true);
      typesStore.create({ type: data });
      _getTypes();
    }
  };

  // handle add department
  const _addDepartment = async (data) => {
    if (data === "") {
      setType("danger");
      setMsg("Department cannot be empty!");
      setNotify(true);
    } else if (department.some((item) => item.data === data)) {
      setType("danger");
      setMsg("This department has already been added!");
      setNotify(true);
    } else {
      departmentStore.create({ data });
      setType("success");
      setMsg("Department saved successfully!");
      setNotify(true);
      _getDepartments();
    }
  };

  // handle add initials
  const _addInitials = (data) => {
    if (data === "") {
      setType("danger");
      setMsg("Initials cannot be empty!");
      setNotify(true);
    } else if (initials.length > 0) {
      setType("danger");
      setMsg("Initials has been set already!");
      setNotify(true);
    } else {
      initialsStore.create({ data });
      setType("success");
      setMsg("Initials saved successfully!");
      setNotify(true);
      _getInitial();
    }
  };

  // close notification bar
  const _handleClose = () => {
    setNotify(false);
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Login
                {...props}
                myKey={isKey}
                configure={_handleConfig}
                loader={loader}
                notify={notify}
                message={msg}
                type={type}
                _login={_handleLog}
                _redirect={logDriect}
                moveTODash={move}
                close={() => setNotify(false)}
                loadAllData={_fetchAll}
              />
            )}
          />
          <Route
            path="/loading"
            render={(props) => <LoadingPage {...props} />}
          />
          <Route
            path="/main"
            render={(props) => (
              <MainPage
                {...props}
                assets={assets}
                users={users}
                types={types}
                initials={initials}
                sorted={sortedCond}
                status={sortedStatus}
                value={value}
                onAddType={_addTypes}
                onAddDep={_addDepartment}
                addInit={_addInitials}
                type={type}
                message={msg}
                notify={notify}
                getUsers={_handlegetUsers}
                getAssets={_handleGetAssets}
                onClose={_handleClose}
                isKey={isKey}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
