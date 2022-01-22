const { Data } = require("../data/data");
const keyStoreDbInstance = Data.keyStoreDbInstance;
const typesStore = Data.assetTypeDbInstance;
const departmentStore = Data.departmentDbInstance;
const apiKeyUrl = Data.apiKeyCheckUrl;
const usersBaseUrl = Data.usersBaseUrl;
const assetsBaseUrl = Data.assetBaseUrl;
const initialsStore = Data.initDbInstance;

// check api key
const _checkApiKey = async () => {
  let key = "";
  await keyStoreDbInstance.readAll().then((res) => {
    if (res.length !== 0) {
      return (key = res[0].key);
    }
  });
  return key;
};

// read all asset types
const _getTypes = async () => {
  let key = [];
  await typesStore.readAll().then((res) => {
    if (res.length !== 0) {
      return (key = res);
    }
  });
  return key;
};

// get departments
const _getDepartments = async () => {
  let deps = [];
  await departmentStore.readAll().then((res) => {
    if (res.length !== 0) {
      return (deps = res);
    }
  });
  return deps;
};

// get initilas
const _getInitials = async () => {
  var init;
  await initialsStore.readAll().then((res) => {
    init = res;
  });
  return init;
};

// configure system with  api key
const _configureSystem = async (key) => {
  var value;
  if (key === "") {
    value = "empty";
  } else if (key.length < 10) {
    value = "wrong";
  } else {
    value = "loaderStart";
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
          value = res.success;
        }
      });
  }
  return value;
};

// load data concurently
const _FetchallDAta = async (key) => {
  var result;
  const usersUrl = usersBaseUrl + "getUsers/" + key + "-u";
  const assetsUrl = assetsBaseUrl + "fetchAssets/" + key + "-a";
  await Promise.all([
    fetch(usersUrl).then((response) => response.json()),
    fetch(assetsUrl).then((response) => response.json()),
  ]).then((results) => {
    result = results;
  });
  return result;
};

// local storage fetch
const _getData = async () => {
  const assets = localStorage.getItem("Assets");
  const users = localStorage.getItem("Users");
  const Assets = await JSON.parse(assets);
  const Users = await JSON.parse(users);
  const dataSet = {
    Assets,
    Users,
  };
  return dataSet;
};

// handle sort assets
const _sortAssets = async (data) => {
  let active = [];
  let in_active = [];
  let newAss = [];
  let old = [];
  let damaged = [];
  let repairs = [];
  data.forEach((item) => {
    if (item.STATUS === "ACTIVE") {
      active.push(item);
    } else if (item.STATUS === "IN-ACTIVE") {
      in_active.push(item);
    } else if (item.CONDITION === "NEW") {
      newAss.push(item);
    } else if (item.CONDITION === "OLD") {
      old.push(item);
    } else if (item.CONDITION === "DAMAGED") {
      damaged.push(item);
    } else if (item.CONDITION === "REPAIRS") {
      repairs.push(item);
    }
  });
  const sorted = {
    active,
    in_active,
    newAss,
    old,
    damaged,
    repairs,
  };
  return sorted;
};

const _valuateAssets = async (data) => {
  let value = 0;
  data.forEach((item) => {
    return (value += parseInt(item.VALUE));
  });
  return value;
};

const _addTypes = async (data) => {
  var results;
  const types = await _getTypes();
  if (types.some((item) => item.type === data)) {
    results = "This Asset Type Already Exist!";
  } else {
    typesStore.create({ type: data });
    results = "Type Added successfully!";
  }
  return results;
};

const _addDepartment = async (data) => {
  var results;
  const getDeparts = await _getDepartments();
  if (getDeparts.some((item) => item.type === data)) {
    results = "This department has already been added!";
  } else {
    departmentStore.create({ type: data });
    results = "Department saved successfully!";
  }
  return results;
};

const _addInitials = async (data) => {
  var results;
  const getinit = await _getInitials();
  if (getinit.length > 1) {
    results = "Company initials has already been set!";
  } else {
    initialsStore.create({ data });
    results = "Initials is successfully set!";
  }
  return results;
};

const _createAsset = async (data) => {
  var response;
  const { type, depart, brand, dp, price, condition, date, initials } = data;
  const key = await _checkApiKey();
  const assetsUrl = assetsBaseUrl + "createAsset/" + key + "-a";
  await fetch(assetsUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assetType: type,
      department: depart,
      brand: brand,
      dp: dp,
      value: price,
      initials: initials,
      condition: condition,
      date: date,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      response = res;
    });
  return response;
};

const _fetchAssets = async () => {
  var results;
  const key = await _checkApiKey();
  const assetsUrl = assetsBaseUrl + "fetchAssets/" + key + "-a";
  const ass = await fetch(assetsUrl);
  const asset = await ass.json();
  results = asset.data;
  return results;
};

const _getUsers = async () => {
  var results;
  const key = await _checkApiKey();
  const usersUrl = usersBaseUrl + "getUsers/" + key + "-u";
  const usersData = await fetch(usersUrl);
  const us = await usersData.json();
  const users = us.data;
  results = users;
  return results;
};

const _addUser = async (data) => {
  var result;
  const key = await _checkApiKey();
  const usersUrl = usersBaseUrl + "newUser/" + key + "-u";
  await fetch(usersUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      password: data.password,
      role: data.role,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      result = res;
    });
  return result;
};

const _delUser = async (id) => {
  var results;
  const key = await _checkApiKey();
  const userUrl = usersBaseUrl + "deleteUser/" + key + "-u";
  await fetch(userUrl, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: id,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      results = res;
    });
  return results;
};

const _editUser = async (data) => {
  var results;
  const key = await _checkApiKey();
  const userUrl = usersBaseUrl + "updateUser/" + key + "-u";
  await fetch(userUrl, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      role: data.role,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      results = res;
    });
  return results;
};

const _editAsset = async (data) => {
  var results;
  const key = await _checkApiKey();
  const assetsUrl = assetsBaseUrl + "updateAsset/" + key + "-a";
  await fetch(assetsUrl, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      serialNumber: data.serialNumber,
      assetType: data.assetType,
      brand: data.brand,
      department: data.department,
      condition: data.condition,
      status: data.status,
      value: data.value,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      results = res;
    });
  return results;
};

const _delAsset = async (id) => {
  var results;
  const key = await _checkApiKey();
  const assetsUrl = assetsBaseUrl + "deleteAseet/" + key + "-a";
  await fetch(assetsUrl, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: id,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      results = res;
    });
  return results;
};

const _createRep = async (data) => {
  var results;
  const key = await _checkApiKey();
  const assetsUrl = assetsBaseUrl + "createReport/" + key + "-a";
  await fetch(assetsUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      serialNumber: data.serialNumber,
      creator: data.creator,
      assetType: data.assetType,
      message: data.message,
      note: data.notes,
    }),
  })
    .then((response) => response.json())
    .then((res) => {
      results = res;
    });
  return results;
};

export const functions = {
  _FetchallDAta,
  _checkApiKey,
  _configureSystem,
  _getData,
  _sortAssets,
  _valuateAssets,
  _addTypes,
  _getTypes,
  _addDepartment,
  _getDepartments,
  _addInitials,
  _createAsset,
  _fetchAssets,
  _addUser,
  _getUsers,
  _delUser,
  _editUser,
  _getInitials,
  _editAsset,
  _delAsset,
  _createRep,
};
