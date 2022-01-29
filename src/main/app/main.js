import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Aside from "./component/aside";
import Dashboard from "./dashboard/index";
import Assets from "./assets/index";
import Reports from "./reports/index";
import Inventory from "./inventory/index";
import Settings from "./settings/index";
import Users from "./others/users";
import AddAsset from "./others/addAsset";
import { functions } from "./funtions";
import Departments from "./deps";
import Help from "./help";
import Faq from "./faq";
import Branches from "./branches";
import AssetDetails from "./others/assetDetails";

function MainPage(props) {
  const [redirect, setRedirect] = useState(false);
  const [userDirect, setUserDirect] = useState("users");
  const [user, setUser] = useState({});
  const [notify, setNotify] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const [departments, setDeps] = useState([]);
  const [initials, setInit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assetDirect, setAssetDirect] = useState("asset");
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    getUser();
    getTypes();
    getDeps();
    getInit();
    getBranchs();
  }, []);

  const assets = props.assets;
  const sorted = props.sorted;
  const status = props.status;
  const value = props.value;
  const users = props.users;

  const _clicked = () => {
    setRedirect(!redirect);
  };

  const _handleLogOut = () => {
    props.onLogOut();
  };

  const getTypes = async () => {
    const types = await functions._getTypes();
    setTypes(types);
  };

  const getBranchs = async () => {
    const branches = await functions._getBranches();
    setBranches(branches);
  };

  const getDeps = async () => {
    const deps = await functions._getDepartments();
    setDeps(deps);
  };

  const getInit = async () => {
    const res = await functions._getInitials();
    if (res.length > 0) {
      setInit(res);
    }
  };

  const _handleAddType = async (data) => {
    const res = await functions._addTypes(data);
    if (data === "") {
      setType("danger");
      setMsg("Field cannot be empty");
      setNotify(true);
    } else if (res === "This Asset Type Already Exist!") {
      setType("danger");
      setMsg(res);
      setNotify(true);
    } else {
      await getTypes();
      setType("success");
      setMsg(res);
      setNotify(true);
    }
  };

  const _handleAddDep = async (data) => {
    if (data === "") {
      setType("danger");
      setMsg("Field cannot be empty");
      setNotify(true);
    } else {
      const deps = await functions._addDepartment(data);
      if (deps === "This department has already been added!") {
        setType("danger");
        setMsg(deps);
        setNotify(true);
      } else {
        setType("success");
        setMsg(deps);
        setNotify(true);
        await getDeps();
      }
    }
  };

  const _handleAddInit = async (data) => {
    if (data === "") {
      setType("danger");
      setMsg("Field cannot be empty");
      setNotify(true);
    } else {
      const res = await functions._addInitials(data);
      if (res === "Company initials has already been set!") {
        setType("danger");
        setMsg(res);
        setNotify(true);
      } else {
        await getInit();
        setType("success");
        setMsg(res);
        setNotify(true);
      }
    }
  };

  const _handleAddBranch = async (data) => {
    if (data === "") {
      setType("danger");
      setMsg("Field cannot be empty");
      setNotify(true);
    } else {
      const res = await functions._addBranch(data);
      if (res === "Branch has already been added!") {
        setType("danger");
        setMsg(res);
        setNotify(true);
      } else {
        await getBranchs();
        setType("success");
        setMsg(res);
        setNotify(true);
      }
    }
  };

  const _handleMove = (data) => {
    setUserDirect(data);
  };

  const _handleMoveAsset = (data) => {
    setAssetDirect(data);
  };

  const _handleGetAssets = async () => {
    var re = 0;
    const res = await props.getAssets();
    if (res === 1) {
      re = 1;
    } else {
      re = 0;
    }
    return re;
  };

  const _handleAddAsset = async (data) => {
    setLoading(true);
    const res = await functions._createAsset(data);
    if (res.success === 1) {
      const re = await props.getAssets();
      if (re === 1) {
        setRedirect(false);
        setLoading(false);
      }
    } else {
      setLoading(false);
      setType("danger");
      setMsg(res.message);
      setNotify(true);
    }
  };

  const _handleEditAsset = async (data) => {
    var results = false;
    setLoading(true);
    const res = await functions._editAsset(data);
    if (res.success === 1) {
      await props.getAssets();
      results = true;
      setLoading(false);
    } else {
      setType("danger");
      setMsg(res.message);
      setNotify(true);
      setLoading(false);
    }
    return results;
  };

  const _handleClose = (data) => {
    setLoading(false);
    setNotify(false);
    props.onClose(data);
  };

  const getUser = async () => {
    const us = localStorage.getItem("user");
    const user = await JSON.parse(us);
    setUser(user);
  };

  const _handleAddUsers = async (data) => {
    const { fristName, lastName, phone, email, password, role } = data;
    if (
      fristName === "" ||
      lastName === "" ||
      phone === "" ||
      email === "" ||
      password === "" ||
      role === ""
    ) {
      setType("danger");
      setMsg("Please all fields are required!");
      setNotify(true);
    } else if (phone.length < 10) {
      setType("danger");
      setMsg("Please phone number is not correct!");
      setNotify(true);
    } else if (password.length < 8) {
      setType("danger");
      setMsg("Please password must be more than 8 characters!");
      setNotify(true);
    } else {
      setLoading(true);
      const res = await functions._addUser(data);
      if (res.success === 1) {
        await props.getUsers();
        setLoading(false);
        setUserDirect("users");
      } else {
        setLoading(false);
        setType("danger");
        setMsg(res.message);
        setNotify(true);
      }
    }
  };

  const _handleDelUser = async (id) => {
    setLoading(true);
    const res = await functions._delUser(id);
    if (res.success === 1) {
      await props.getUsers();
      setLoading(false);
      setUserDirect("users");
    } else {
      setType("danger");
      setMsg(res.message);
      setNotify(true);
      setLoading(false);
    }
  };

  const _handleEditUser = async (data) => {
    if (
      data.fristName !== "" ||
      data.lastName !== "" ||
      data.email !== "" ||
      data.phone !== "" ||
      data.role !== ""
    ) {
      setLoading(true);
      const res = await functions._editUser(data);
      if (res.success === 1) {
        await props.getUsers();
        setLoading(false);
        setUserDirect("users");
      } else {
        setType("danger");
        setMsg(res.message);
        setNotify(true);
        setLoading(false);
      }
    } else {
      setType("danger");
      setMsg("Filed cannot be empty!");
      setNotify(true);
      setLoading(false);
    }
  };

  const _handleChangestsate = () => {
    setType("danger");
    setMsg("Filed cannot be empty!");
    setNotify(!notify);
  };

  const _handleDelete = async (id) => {
    var results = false;
    setLoading(true);
    const res = await functions._delAsset(id);
    if (res.success === 1) {
      await props.getAssets();
      results = true;
      setLoading(false);
    } else {
      setType("danger");
      setMsg(res.message);
      setNotify(true);
      setLoading(false);
    }
    return results;
  };

  const _handleAddRep = async (data) => {
    setLoading(true);
    const res = await functions._createRep(data);
    if (res.success === 1) {
      await props.getAssets();
      setLoading(false);
    } else {
      setType("danger");
      setMsg(res.message);
      setNotify(true);
      setLoading(false);
    }
  };

  const _handleDelMany = async (ids) => {
    var res = 0;
    const re = await functions._delMany(ids);
    if (re.success === 1) {
      await props.getAssets()
      res = 1;
    } else {
      res = 0;
    }
    return res;
  };

  return (
    <div className="crm_body_bg">
      <Aside />
      <div className="main_content dashboard_part large_header_bg">
        <div className="main_content_iner overly_inner">
          <div className="container-fluid p-0 ">
            {redirect ? (
              <AddAsset
                onBack={_clicked}
                onAdd={_handleAddAsset}
                type={props.type}
                message={props.msg}
                notify={props.notify}
                loader={loading}
                close={() => props.close()}
                assetTypes={types}
                departments={departments}
                initials={initials}
                assetDirect={assetDirect}
                onMoveAsset={_handleMoveAsset}
                user={user}
                stopLoading={() => setLoading(false)}
                branches={branches}
              />
            ) : (
              <Switch>
                <Route
                  path="/main/dashbaord"
                  render={(props) => (
                    <Dashboard
                      {...props}
                      onCreate={_clicked}
                      getAssets={_handleGetAssets}
                      assets={assets}
                      sorted={sorted}
                      status={status}
                      value={value}
                    />
                  )}
                />
                <Route
                  path="/main/assets"
                  render={(props) => (
                    <Assets
                      {...props}
                      onCreate={_clicked}
                      getAssets={_handleGetAssets}
                      assets={assets}
                      loading={loading}
                      msg={msg}
                      type={type}
                      notify={notify}
                      departments={departments}
                      onEditAsset={_handleEditAsset}
                      onDel={_handleDelete}
                      onAddRep={_handleAddRep}
                      user={user}
                      value={value}
                      stopLoading={() => setLoading(false)}
                      delMany={_handleDelMany}
                    />
                  )}
                />
                 <Route
                  path="/main/branches"
                  render={(props) => (
                    <Branches
                      {...props}
                      onCreate={_clicked}
                      getAssets={_handleGetAssets}
                      assets={assets}
                      loading={loading}
                      msg={msg}
                      type={type}
                      notify={notify}
                      departments={departments}
                      onEditAsset={_handleEditAsset}
                      onDel={_handleDelete}
                      user={user}
                      value={value}
                      stopLoading={() => setLoading(false)}
                    />
                  )}
                />
                <Route
                  path="/main/departments"
                  render={(props) => (
                    <Departments
                      {...props}
                      onCreate={_clicked}
                      getAssets={_handleGetAssets}
                      assets={assets}
                    />
                  )}
                />
                <Route
                  path="/main/reports"
                  render={(props) => (
                    <Reports
                      {...props}
                      onCreate={_clicked}
                      getAssets={_handleGetAssets}
                      assets={assets}
                    />
                  )}
                />
                <Route
                  path="/main/Inventory"
                  render={(props) => (
                    <Inventory
                      {...props}
                      onCreate={_clicked}
                      getAssets={_handleGetAssets}
                      assets={assets}
                    />
                  )}
                />
                <Route
                  path="/main/settings"
                  render={(props) => (
                    <Settings
                      {...props}
                      onCreate={_clicked}
                      getAssets={_handleGetAssets}
                      logOut={_handleLogOut}
                      type={type}
                      message={msg}
                      notify={notify}
                      loading={loading}
                      onAddType={_handleAddType}
                      onAddDep={_handleAddDep}
                      onAddInit={_handleAddInit}
                      onAddBranch={_handleAddBranch}
                      onClose={_handleClose}
                      user={user}
                      onAddUsers={_handleAddUsers}
                      data={users}
                      redirect={userDirect}
                      move={_handleMove}
                      onDelUser={_handleDelUser}
                      editUser={_handleEditUser}
                      changeState={_handleChangestsate}
                      stopLoading={() => setLoading(false)}
                    />
                  )}
                />
                <Route
                  path="/main/users"
                  render={(props) => <Users {...props} />}
                />
                <Route
                  path="/main/help"
                  render={(props) => <Help {...props} />}
                />
                <Route
                  path="/main/faq"
                  render={(props) => <Faq {...props} />}
                />
                <Route
                  path="/main/asset-details"
                  render={(props) => <AssetDetails {...props} />}
                />
              </Switch>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
