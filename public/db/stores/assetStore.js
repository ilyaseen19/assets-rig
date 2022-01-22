const DataStore = require("nedb-promises");
const Ajv = require("ajv");
const isDev = require("electron-is-dev");
const assetTypeSchema = require("../schemas/assetType");
const { app } = require("electron");
const path = require("path");

class assetTypeStore {
  constructor() {
    const ajv = new Ajv({
      allErrors: true,
      useDefaults: true,
    });

    this.schemaValidator = ajv.compile(assetTypeSchema);
    const userData = app.getAppPath("userData");
    const dbPath = path.join(
      isDev ? userData : process.resourcesPath,
      "DataStore/assets.db"
    );
    this.db = DataStore.create({
      filename: dbPath,
      timestampData: true,
      autoload: true,
    });
  }

  validate(data) {
    return this.schemaValidator(data);
  }

  create(data) {
    return this.db.insert(data);
  }

  read(_id) {
    return this.db.findOne({ _id }).exec();
  }

  readAll() {
    return this.db.find();
  }

  removeDish(_id) {
    return this.db.remove({ _id });
  }

  updateDish(dishData) {
    return this.db.update({ _id: dishData._id }, dishData.data);
  }
}

module.exports = new assetTypeStore();
