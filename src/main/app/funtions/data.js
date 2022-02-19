// local db instances
const { remote } = require("electron");
const assetTypeDbInstance = remote.getGlobal("assetTypeStore");
const departmentDbInstance = remote.getGlobal("departmentStore");
const keyStoreDbInstance = remote.getGlobal("keyStore");
const initDbInstance = remote.getGlobal("initStore");
const branchDbInstance = remote.getGlobal("branchStore");

// cloud base urls
const apiKeyCheckUrl =
  "https://assets-regis.herokuapp.com/admin/customers/getCustomer/4768-Administration-657-admin-7643-c";
const usersBaseUrl = "https://assets-regis.herokuapp.com/customers/users/";
const assetBaseUrl = "https://assets-regis.herokuapp.com/customers/assets/";

// export data
export const Data = {
  assetTypeDbInstance,
  departmentDbInstance,
  keyStoreDbInstance,
  apiKeyCheckUrl,
  usersBaseUrl,
  assetBaseUrl,
  initDbInstance,
  branchDbInstance,
};
